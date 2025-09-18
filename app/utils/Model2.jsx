"use client"
import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Color, DirectionalLight } from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function Model({ island }) {
  const { nodes } = useGLTF('/media/reunion-draco.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))
  });

  const { viewport, size, scene } = useThree();
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const containerRef = useRef(null);
  const mouseXRef = useRef(0);

  // Matériau
  const basicMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0, 0.2, 0.8),
    depthTest: true,
    transparent: true,
    opacity: 1.0,
  }), []);

  // Lumière desktop
  useEffect(() => {
    if (!scene || isMobile) return;
    const directionalLight = new DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    return () => scene.remove(directionalLight);
  }, [scene]);

  // Initialisation animations
  useEffect(() => {
    if (!island.current) return;
    island.current.rotation.set(25 * Math.PI / 180, -80 * Math.PI / 180, 0);
    island.current.visible = false;

    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== 'undefined' && window.__preloaderDone) {
      runIntro();
    } else {
      window.addEventListener('preloaderDone', runIntro, { once: true });
    }
    animateIsland(island);
    return () => window.removeEventListener('preloaderDone', runIntro);
  }, [island]);

  // Event listener pour la souris
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      // Normalisation de l’axe X [-1, 1]
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Float vertical + rotation Y selon souris
  useFrame((state) => {
    if (!containerRef.current) return;
    const t = state.clock.getElapsedTime();

    // Float vertical
    const floatAmp = 0.02;
    const floatSpeed = 1;
    containerRef.current.position.y = Math.sin(t * floatSpeed) * floatAmp;

    // Rotation Y
    if (!isMobile) {
      const maxYaw = 0.1; // amplitude max
      const targetY = mouseXRef.current * maxYaw;
      // Lerp pour smooth
      containerRef.current.rotation.y += (targetY - containerRef.current.rotation.y) * 0.12;
    }
  });

  return (
    <group scale={groupScale}>
      <group ref={containerRef}>
        <mesh
          ref={island}
          geometry={nodes.reunion.geometry}
          material={basicMaterial}
          scale={[0.015, 0.015, 0.015]}
          position={[-0.08, 0.08, -0.3]}
        />
      </group>
    </group>
  );
}
