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

  // Assurer que le mélange de couleur reste cohérent
  vec3 gridColor = mix(color, vec3(0.8), min(grid, 0.5));
  gl_FragColor = vec4(gridColor, opacity);
}
`;

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { ShaderMaterial, Color } from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  })  
  const { viewport, size } = useThree(); // Récupère les dimensions du viewport et de l'écran
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const scaleFactor = size.width < 768 ? 1.6 : 0.95; 
  const groupScale = viewport.width / 2.4 * scaleFactor;

  useEffect(() => {
    if (!island.current) return;

    // Rotation initiale du Modèle 3D
    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);

    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    island.current.rotation.set(initialRotationX, initialRotationY, 0);

    // Définition du matériau du shader
    const shaderMaterial = new ShaderMaterial({
      uniforms: {
        opacity: { value: 0.0 }, // Départ invisible, animé à l'intro
        color: { // Couleur du quadrillage
          value: new Color(0, 48/255, 73/255) 
        }, 
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
    island.current.material = shaderMaterial;
    // Masquer l'île à l'arrivée, évite tout flash
    island.current.visible = false;

    // Intro page d'accueil: si le preloader est déjà passé, on lance tout de suite.
    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== 'undefined' && window.__preloaderDone) {
      runIntro();
    } else {
      window.addEventListener('preloaderDone', runIntro, { once: true });
    }

    // Scroll/scene animations ensuite
    animateIsland(island);

    return () => {
      window.removeEventListener('preloaderDone', runIntro);
    };
  }, [island]);

  // useFrame(() => {
  //   if (island.current) {
  //     const rotationFactor = -0.04;
  //     let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
  //     let rotationY = initialRotation.y + mousePosition.x * rotationFactor;
  //   }
   
  // });

  return (
    <group scale={groupScale}>
      <group >
        <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]} position={[-0.08, 0.08, -0.3]} fragmentShader vertexShader wireframe >
        </mesh>
      </group>
      {/* <pointLight position={[0, 0, 1]} intensity={8} color={'red'} /> */}
    </group>
  );
}
