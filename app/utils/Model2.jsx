'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// -------------------------------------------------------------------
// Base component qui reçoit les `nodes` (peu importe le modèle choisi)
// -------------------------------------------------------------------
function ParticleIslandBase({ island, color = '#6a1b9a', nodes }) {
  const { viewport, size, scene } = useThree();

  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const containerRef = useRef(null);
  const mouseRef = useRef([0, 0]);

  // --- Échantillonnage des vertices ---
  const { sampledPositions, sampledColors } = useMemo(() => {
    const geom = nodes.reunion.geometry;
    const pos = geom.attributes.position.array;
    const col = geom.attributes.color ? geom.attributes.color.array : null;

    const sampledPos = [];
    const sampledCol = [];
    const step = 10;

    for (let i = 0; i < pos.length; i += 3 * step) {
      sampledPos.push(pos[i], pos[i + 1], pos[i + 2]);
      if (col) {
        sampledCol.push(col[i], col[i + 1], col[i + 2]);
      } else {
        sampledCol.push(0, 0.2, 0.8);
      }
    }

    return {
      sampledPositions: new Float32Array(sampledPos),
      sampledColors: new Float32Array(sampledCol),
    };
  }, [nodes]);

  // --- Geometry avec positions modifiables ---
  const pointsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const modifiablePositions = new Float32Array(sampledPositions);
    geom.setAttribute('position', new THREE.BufferAttribute(modifiablePositions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(sampledColors, 3));
    return geom;
  }, [sampledPositions, sampledColors]);

  // --- Positions originales ---
  const originalPositions = useMemo(() => new Float32Array(sampledPositions), [sampledPositions]);

  // --- Material ---
  const pointsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(color),
      vertexColors: false,
      size: 0.01,
      transparent: true,
      opacity: 1.0,
    });
  }, [color]);

  // --- Lumière ---
  useEffect(() => {
    if (!scene || isMobile) return;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    return () => scene.remove(directionalLight);
  }, [scene]);

  // --- Animation d'intro ---
  useEffect(() => {
    if (!island.current) return;
    island.current.rotation.set(25 * Math.PI / 180, -80 * Math.PI / 180, 0.1);
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

  // --- Mouse move ---
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      mouseRef.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Animation loop ---
  useFrame((state) => {
    if (!containerRef.current || !island.current) return;
    const t = state.clock.getElapsedTime();

    // Flottement
    const floatAmp = 0.02;
    const floatSpeed = 1;
    containerRef.current.position.y = Math.sin(t * floatSpeed) * floatAmp;

    // Rotation avec la souris
    if (!isMobile) {
      const maxYaw = 0.1;
      const targetY = mouseRef.current[0] * maxYaw;
      containerRef.current.rotation.y += (targetY - containerRef.current.rotation.y) * 0.40;
    }

    // Répulsion souris
    const positions = pointsGeometry.attributes.position.array;
    if (!isMobile) {
      const mouseX = mouseRef.current[0] * 80;
      const mouseY = mouseRef.current[1] * 20;

      const repulsionRadius = 10;
      const repulsionStrength = 6;
      const returnSpeed = 0.2;

      for (let i = 0; i < positions.length; i += 3) {
        const dx = originalPositions[i] - mouseX;
        const dy = originalPositions[i + 1] - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius && distance > 0.1) {
          const force = (2 - distance / repulsionRadius) * repulsionStrength;
          const pushX = (dx / distance) * force;
          const pushY = (dy / distance) * force;
          positions[i] = originalPositions[i] + pushX;
          positions[i + 1] = originalPositions[i + 1] + pushY;
          positions[i + 2] = originalPositions[i + 2];
        } else {
          positions[i] += (originalPositions[i] - positions[i]) * returnSpeed;
          positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * returnSpeed;
          positions[i + 2] += (originalPositions[i + 2] - positions[i + 2]) * returnSpeed;
        }
      }
    } else {
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (originalPositions[i] - positions[i]) * 0.05;
        positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * 0.05;
        positions[i + 2] += (originalPositions[i + 2] - positions[i + 2]) * 0.05;
      }
    }

    pointsGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <group scale={groupScale}>
      <group ref={containerRef}>
        <points
          ref={island}
          geometry={pointsGeometry}
          material={pointsMaterial}
          scale={[0.015, 0.015, 0.015]}
          position={[-0.08, 0.08, -0.3]}
        />
      </group>
    </group>
  );
}

// -------------------------------------------------------------------
// Composants spécifiques (chargent chacun un modèle différent)
// -------------------------------------------------------------------
function ReunionModel(props) {
  const { nodes } = useGLTF('/media/reunion23.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });
  return <ParticleIslandBase {...props} nodes={nodes} />;
}

function DracoModel(props) {
  const { nodes } = useGLTF('/media/reunion-draco2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });
  return <ParticleIslandBase {...props} nodes={nodes} />;
}

// -------------------------------------------------------------------
// Choix du modèle selon la taille de l'écran
// -------------------------------------------------------------------
export default function ParticleIsland(props) {
  const { size } = useThree();
  return size.width < 768 ? <ReunionModel {...props} /> : <DracoModel {...props} />;
}
