// Version 1: Shader avec éclairage simple intégré
const vertexShader = `
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vPosition = position;
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float opacity;
uniform vec3 color;
uniform float gridScale;
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightIntensity;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Calcul de l'éclairage
  vec3 lightDirection = normalize(lightPosition - vPosition);
  float lightFactor = max(dot(vNormal, lightDirection), 0.3) * lightIntensity;
  
  // Grid pattern
  float grid = abs(sin(vUv.x * gridScale) * sin(vUv.y * gridScale));
  
  // Mélange couleur + éclairage
  vec3 gridColor = mix(color, vec3(0.8), min(grid, 0.5));
  vec3 finalColor = gridColor * lightColor * lightFactor;
  
  gl_FragColor = vec4(finalColor, opacity);
}
`;

// Version 2: Modèle corrigé avec shader éclairé
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { ShaderMaterial, Color, Vector3 } from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  })  
  const { viewport, size } = useThree();
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const scaleFactor = size.width < 768 ? 1.6 : 0.95; 
  const groupScale = viewport.width / 2.4 * scaleFactor;

  useEffect(() => {
    if (!island.current) return;

    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);

    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    island.current.rotation.set(initialRotationX, initialRotationY, 0);

    // Shader avec éclairage intégré
    const shaderMaterial = new ShaderMaterial({
      uniforms: {
        opacity: { value: 0.0 },
        color: { value: new Color(0, 48/255, 83/255) },
        gridScale: { value: 150.0 },
        lightPosition: { value: new Vector3(5, 5, -5) }, // Position de la lumière
        lightColor: { value: new Color(1, 0.2, 0.2) },   // Couleur rouge
        lightIntensity: { value: 5.0 }   // Intensité
      },
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      depthTest: false,
      alphaTest: true
    });

    island.current.material = shaderMaterial;
    island.current.visible = false;

    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== 'undefined' && window.__preloaderDone) {
      runIntro();
    } else {
      window.addEventListener('preloaderDone', runIntro, { once: true });
    }

    animateIsland(island);

    return () => {
      window.removeEventListener('preloaderDone', runIntro);
    };
  }, [island]);

  // Animation en temps réel de la position de la lumière
  useFrame(() => {
    if (island.current?.material?.uniforms) {
      // Faire bouger la lumière avec la souris
      island.current.material.uniforms.lightPosition.value.set(
        mousePosition.x * 10,
        mousePosition.y * 10,
        
      );
    }
  });

  return (
    <group scale={groupScale}>
      <group>
        <mesh 
          ref={island} 
          geometry={nodes.reunion.geometry} 
          scale={[0.015, 0.015, 0.015]} 
          position={[-0.08, 0.08, -0.3]}
        />
        {/* Cette lumière ne sera visible que si vous avez d'autres objets avec matériaux standard */}
        <pointLight position={[1, 1, 1]} intensity={160} color={'green'} />
      </group>
    </group>
  );
}