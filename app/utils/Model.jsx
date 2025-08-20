// Model.jsx optimisé pour mobile
"use client"
import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  ShaderMaterial,
  Color,
  Vector3,
  DirectionalLight
} from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Détection mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Version simplifiée du shader pour mobile
const mobileVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mobileFragmentShader = `
  uniform float opacity;
  uniform vec3 color;
  varying vec3 vNormal;
  
  void main() {
    // Éclairage simple pour mobile
    float lightFactor = max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.5);
    vec3 finalColor = color * lightFactor;
    gl_FragColor = vec4(finalColor, opacity);
  }
`;

// Shader desktop plus complexe
const desktopVertexShader = `
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

const desktopFragmentShader = `
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
    vec3 lightDirection = normalize(lightPosition - vPosition);
    float lightFactor = max(dot(vNormal, lightDirection), 0.4) * lightIntensity;
    
    // Grid pattern réduit pour mobile
    float grid = abs(sin(vUv.x * gridScale * 0.5) * sin(vUv.y * gridScale * 0.5));
    vec3 gridColor = mix(color, vec3(0.8), min(grid, 0.3));
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

  // Créer le matériau une seule fois avec useMemo
  const shaderMaterial = useMemo(() => {
    const material = new ShaderMaterial({
      uniforms: isMobile ? {
        opacity: { value: 0.0 },
        color: { value: new Color(0, 48 / 255, 83 / 255) }
      } : {
        opacity: { value: 0.0 },
        color: { value: new Color(0, 48 / 255, 83 / 255) },
        gridScale: { value: isMobile ? 75.0 : 150.0 }, // Grille moins dense sur mobile
        lightPosition: { value: new Vector3(-0.2, -0.2, 20) },
        lightColor: { value: new Color(1, 1, 1) },
        lightIntensity: { value: isMobile ? 4 : 8 } // Intensité réduite sur mobile
      },
      vertexShader: isMobile ? mobileVertexShader : desktopVertexShader,
      fragmentShader: isMobile ? mobileFragmentShader : desktopFragmentShader,
      wireframe: true,
      transparent: true,
      depthTest: false,
      alphaTest: true
    });

    return material;
  }, []);

  // Ajout de lumière plus simple
  useEffect(() => {
    if (!scene || isMobile) return; // Pas de lumière supplémentaire sur mobile

    const directionalLight = new DirectionalLight(0xffffff, 0.5, 100);
    directionalLight.position.set(-5, -5, 5);
    scene.add(directionalLight);

    return () => {
      scene.remove(directionalLight);
    };
  }, [scene]);

  // Initialisation optimisée
  useEffect(() => {
    if (!island.current) return;

    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);

    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    island.current.rotation.set(initialRotationX, initialRotationY, 0);
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
  }, [island, shaderMaterial]);

  // Animation frame optimisée
  useFrame(() => {
    if (!island.current?.material?.uniforms || isMobile) return; // Pas d'animation de lumière sur mobile

    const newPos = new Vector3(
      mousePosition.x * 5, // Réduire l'amplitude
      mousePosition.y * 5,
      -5
    );

    island.current.material.uniforms.lightPosition.value.copy(newPos);
  });

  return (
    <group scale={groupScale}>
      <group>
        <mesh
          ref={island}
          geometry={nodes.reunion.geometry}
          scale={[0.015, 0.015, 0.015]}
          position={[-0.08, 0.08, -0.3]}
          castShadow={!isMobile} // Pas d'ombres sur mobile
          receiveShadow={!isMobile}
        />
      </group>
    </group>
  );
}