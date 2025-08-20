"use client"
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Détection mobile simple
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function Model({ island }) {
  const { nodes } = useGLTF('/media/reunion2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  });
  
  const { viewport, size } = useThree();
  const materialRef = useRef();

  // Calcul de l'échelle responsive
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  // Initialisation des animations
  useEffect(() => {
    if (!island.current) return;

    // Configuration initiale
    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);
    island.current.rotation.set(initialRotationX, initialRotationY, 0);
    island.current.visible = false;

    // Lancement des animations
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
        scale={[0.015, 0.015, 0.015]}
        position={[-0.08, 0.08, -0.3]}
        frustumCulled
      >
        <meshBasicMaterial
          ref={materialRef}
          color="#003053"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}