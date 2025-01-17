const vertexShader = `
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float opacity;
uniform vec3 color;
uniform float gridScale;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float grid = abs(sin(vUv.x * gridScale) * sin(vUv.y * gridScale));

  vec3 gridColor = mix(color, vec3(1.0), grid);
  gl_FragColor = vec4(gridColor, opacity);
}
`;

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { ShaderMaterial, Color } from 'three';
import gsap from 'gsap';
import { animateIsland, animateLocation } from './animation';

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb');
  const { viewport } = useThree();
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (island.current) {

      //Rotation initiale du Modèle 3D
      const initialRotationX = 8 * (Math.PI / 180);
      const initialRotationY = -80 * (Math.PI / 180);

      setInitialRotation({ x: initialRotationX, y: initialRotationY });
      island.current.rotation.set(initialRotationX, initialRotationY, 0);

      // Définition du matériau du shader
      const shaderMaterial = new ShaderMaterial({
        uniforms: {
          opacity: { value: 0.03 }, // Opacité du modèle
          color: { value: new Color('teal') }, // Couleur du quadrillage
          depthTest: false
        },
        vertexShader,
        fragmentShader,
        wireframe: true, // Activation du wireframe
        transparent: true,
        depthTest: false,
        alphaTest: true
      });

      // Appliquer le matériau shader à l'île
      island.current.material = shaderMaterial
      animateIsland(island)
      console.log(island)
    }

  }, [island]);

  // useFrame(() => {
  //   if (island.current) {
  //     const rotationFactor = -0.04;
  //     let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
  //     let rotationY = initialRotation.y + mousePosition.x * rotationFactor;
  //   }
   
  // });

  return (
    <group scale={viewport.width/2.4}>
      <group >
        <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]} position={[-0.08, 0.08, -0.3]} fragmentShader vertexShader wireframe >
        </mesh>
      </group>
      <pointLight position={[0, 0, 1]} intensity={8} color={'red'} />
    </group>
  );
}
