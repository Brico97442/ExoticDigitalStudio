"use client"
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  ShaderMaterial,
  Color,
  Vector3,
  PointLight,
  PointLightHelper,
  DirectionalLight
} from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// ========================
// Shaders
// ========================
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
    float lightFactor = max(dot(vNormal, lightDirection), 0.4) * lightIntensity;
    
    // Grid pattern
    float grid = abs(sin(vUv.x * gridScale) * sin(vUv.y * gridScale));
    
    // Mélange couleur + éclairage
    vec3 gridColor = mix(color, vec3(0.8), min(grid, 0.5));
    vec3 finalColor = gridColor * lightColor * lightFactor;
    
    gl_FragColor = vec4(finalColor, opacity);
  }
`;

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  });
  const { viewport, size, scene } = useThree();
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const pointLightRef = useRef();

  // ========================
  // Ajout du helper
  // ========================
  useEffect(() => {
    if (!scene) return;

    // Crée une vraie lumière pour visualiser la position
    const pointLight = new DirectionalLight(0xffffff, 1, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Ajoute un helper visible
    // const helper = new PointLightHelper(pointLight, 0.3, 0xff0000);
    // scene.add(helper);

    // pointLightRef.current = pointLight;

    // return () => {
    //   scene.remove(pointLight);
    //   scene.remove(helper);
    // };
  }, [scene]);

  // ========================
  // Initialisation du shader
  // ========================
  useEffect(() => {
    if (!island.current) return;

    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);

    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    island.current.rotation.set(initialRotationX, initialRotationY, 0);

    const shaderMaterial = new ShaderMaterial({
      uniforms: {
        opacity: { value: 0.0 },
        color: { value: new Color(0, 48 / 255, 83 / 255) },
        gridScale: { value: 150.0 },
        lightPosition: { value: new Vector3(-0.2, -0.2, 20) },
        lightColor: { value: new Color(1, 1, 1) },
        lightIntensity: { value: 8 }
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

  // ========================
  // Animation lumière + helper
  // ========================
  useFrame(() => {
    if (island.current?.material?.uniforms) {
      const newPos = new Vector3(mousePosition.x * 10, mousePosition.y * 10, -5);

      // Mets à jour la position dans le shader
      island.current.material.uniforms.lightPosition.value.copy(newPos);

      // Mets à jour la vraie light (pour le helper)
      if (pointLightRef.current) {
        pointLightRef.current.position.copy(newPos);
      }
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
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}
