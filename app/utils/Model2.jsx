"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  MeshStandardMaterial,
  Color,
  DirectionalLight
} from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Détection mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2363w.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  });
  
  console.log("GLTF nodes:", nodes);
  
  const { viewport, size, scene } = useThree();
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  // Matériau standard bleu
  const basicMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(0, 0.2, 0.8), // Bleu
     depthTest:true,
      transparent: true,
      opacity: 1.0,
    });
  }, []);
  
  // Lumière seulement sur desktop
  useEffect(() => {
    if (!scene || isMobile) return;
    const directionalLight = new DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    return () => {
      scene.remove(directionalLight);
    };
  }, [scene]);

  // Initialisation
  useEffect(() => {
    if (!island.current) return;
    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);
    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    island.current.rotation.set(initialRotationX, initialRotationY, 0);
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

  return (
    <group scale={groupScale}>
      <mesh
        ref={island}
        geometry={nodes.reunion.geometry}
        material={basicMaterial}   // ✅ Matériau appliqué directement
        scale={[0.015, 0.015, 0.015]}
        position={[-0.08, 0.08, -0.3]}
      />
    </group>
  );
}
