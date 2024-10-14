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
import { animateIsland, animateTextScene } from './animation';
import gsap from 'gsap';

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb');
  const { viewport } = useThree();
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const location = useRef(null);
  const { nodes: locationNodes } = useGLTF('/media/location.glb');
  const locationMaterialRef = useRef(null);

  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false)



  const hoverEnter = () => {
    setIsHovered(true)
  }
  const hoverLeave = () => {
    setIsHovered(false)
  }


  useEffect(() => {
    if (textRef1.current) textRef1.current.material.transparent = true;
    if (textRef2.current) textRef2.current.material.transparent = true;
    if (island.current) {


      //Rotation initiale du Modèle 3D
      const initialRotationX = 5 * (Math.PI / 180);
      const initialRotationY = -80 * (Math.PI / 180);

      setInitialRotation({ x: initialRotationX, y: initialRotationY });
      island.current.rotation.set(initialRotationX, initialRotationY, 0);

      animateIsland()

      // Définir le matériau du shader
      const shaderMaterial = new ShaderMaterial({
        uniforms: {
          opacity: { value: isHovered ? 1 : 0.03 }, // Opacité du modèle
          color: { value: new Color(isHovered ? '#660708' : 'teal') }, // Couleur du quadrillage
          depthTest: false

        },
        vertexShader,
        fragmentShader,
        wireframe: true, // Active le wireframe
        transparent: true,
        depthTest: false,
        alphaTest: true
      });

      // Appliquer le matériau shader à l'île
      island.current.material = shaderMaterial


      if (!isHovered) {
        island.current.material.opacity = 0.01
      }
    }
    const tl = gsap.timeline();

    tl.fromTo(
      [textRef1.current.material, textRef2.current.material],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        yoyo: true,
        ease: "power2.In",
        stagger: 1,
        delay:0.4,
         // Décalage entre les animations des deux textes
      }
    );

    // Nettoyage
    return () => {
      tl.kill();
    };

  }, [island, isHovered]);

  useFrame(() => {
    if (island.current) {
      const rotationFactor = 0.04;
      let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
      let rotationY = initialRotation.y + mousePosition.x * rotationFactor;

      island.current.rotation.set(rotationX, rotationY, 0);
    
    
      if (textRef1.current && textRef2.current) {
        textRef1.current.rotation.set(0, -rotationY, 0);
        textRef2.current.rotation.set(0, -rotationY, 0);
        animateTextScene(textRef1);

      }
    }
    if (location.current) {
      location.current.rotation.y += 0.01;
    }
    if (textRef1.current) {
      animateTextScene(textRef1)
    }

  });

  return (
    <group scale={viewport.width / 3}>
      <group >
        <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]} position={[0, 0.08, -0.28]} fragmentShader vertexShader wireframe >
          <Text
            ref={textRef1}
            position={[20, 2, 16]}
            fontSize={2.2}
            color="white"
          >
            Reunion Island
          </Text>
          <Text
            ref={textRef2}
            position={[28, 0, 8]}
            fontSize={1.5}
            color="white"
          >
            Le Tampon
            <mesh ref={location} geometry={locationNodes.location.geometry} scale={[0.1, 0.1, 0.1]} position={[0, -2, 3]}>
              <meshStandardMaterial ref={locationMaterialRef} />
            </mesh>
          </Text>
        </mesh>
      </group>
      <pointLight position={[0, 0, 1]} intensity={8} color={'purple'} />
    </group>
  );
}
