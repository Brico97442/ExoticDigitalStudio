'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animateIsland, animateIslandIntro } from './animation';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

export default function ParticleIsland({ island, color = '#6a1b9a' }) {
  const { viewport, size, scene, camera } = useThree();
  const { nodes } = size.width < 768 ? useGLTF('/media/reunion2.glb', true, true, (loader) => {
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);
    } catch (error) {
      console.warn('DRACOLoader initialization failed:', error);
    }
  }) : useGLTF('/media/reunion-draco2.glb', true, true, (loader) => {
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);
    } catch (error) {
      console.warn('DRACOLoader initialization failed:', error);
    }
  });

  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const containerRef = useRef(null);
  const mouseRef = useRef([0, 0]);

  // --- Échantillonnage des vertices ---
  const { sampledPositions, sampledColors } = useMemo(() => {
    if (!nodes?.reunion?.geometry) {
      return {
        sampledPositions: new Float32Array([]),
        sampledColors: new Float32Array([]),
      };
    }

    const geom = nodes.reunion.geometry;
    const pos = geom.attributes.position?.array;
    const col = geom.attributes.color?.array;

    if (!pos) {
      return {
        sampledPositions: new Float32Array([]),
        sampledColors: new Float32Array([]),
      };
    }

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
    
    if (sampledPositions.length === 0) {
      return geom;
    }
    
    // IMPORTANT: Créer un nouveau Float32Array pour pouvoir le modifier
    const modifiablePositions = new Float32Array(sampledPositions);
    geom.setAttribute('position', new THREE.BufferAttribute(modifiablePositions, 3));
    
    if (sampledColors.length > 0) {
      geom.setAttribute('color', new THREE.Float32BufferAttribute(sampledColors, 3));
    }
    
    return geom;
  }, [sampledPositions, sampledColors]);

  // --- Original positions - copie séparée ---
  const originalPositions = useMemo(() => {
    return sampledPositions.length > 0 ? new Float32Array(sampledPositions) : new Float32Array([]);
  }, [sampledPositions]);

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

  // --- Animations d'intro ---
  useEffect(() => {
    if (!island.current) return;
    island.current.rotation.set(
      25 * Math.PI / 180,
      -80 * Math.PI / 180,
      0.1
    );
    island.current.visible = false;

    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== 'undefined') {
      if (window.__preloaderDone) {
        runIntro();
      } else {
        window.addEventListener('preloaderDone', runIntro, { once: true });
      }
    }
    animateIsland(island);
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('preloaderDone', runIntro);
      }
    };
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

  // --- Loop ---
  useFrame((state) => {
    if (!containerRef.current || !island.current || !pointsGeometry.attributes.position) return;
    const t = state.clock.getElapsedTime();

    // ✅ Flotte
    const floatAmp = 0.02;
    const floatSpeed = 1;
    containerRef.current.position.y = Math.sin(t * floatSpeed) * floatAmp;

    // ✅ Rotation Y selon souris
    if (!isMobile) {
      const maxYaw = 0.1;
      const targetY = mouseRef.current[0] * maxYaw;
      containerRef.current.rotation.y += (targetY - containerRef.current.rotation.y) * 0.40;
    }

    // 🎯 RÉPULSION MOUSE - Version simplifiée
    const positions = pointsGeometry.attributes.position.array;
    
    if (!positions || positions.length === 0) return;

    if (!isMobile) {
      // Convertir les coordonnées souris normalisées vers l'espace du modèle
      // Le modèle est centré autour de 0,0 avec une échelle de ~1 unité
      const mouseX = mouseRef.current[0] * 80; // Ajustement échelle
      const mouseY = mouseRef.current[1] * 20; // Ajustement échelle

      const repulsionRadius = 10; // Rayon d'influence
      const repulsionStrength = 6; // Force de répulsion
      const returnSpeed = 0.2; // Vitesse de retour

      for (let i = 0; i < positions.length; i += 3) {
        const particleX = originalPositions[i];
        const particleY = originalPositions[i + 1];

        // Distance entre particule et souris (ignorons Z pour simplifier)
        const dx = particleX - mouseX;
        const dy = particleY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius && distance > 0.1) {
          // Force décroissante avec la distance
          const force = (2 - distance / repulsionRadius) * repulsionStrength;

          // Direction de répulsion normalisée
          const pushX = (dx / distance) * force;
          const pushY = (dy / distance) * force;

          // Appliquer la répulsion
          positions[i] = originalPositions[i] + pushX;
          positions[i + 1] = originalPositions[i + 1] + pushY;
          positions[i + 2] = originalPositions[i + 2]; // Garder Z original
        } else {
          // Retour progressif vers position originale
          positions[i] += (originalPositions[i] - positions[i]) * returnSpeed;
          positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * returnSpeed;
          positions[i + 2] += (originalPositions[i + 2] - positions[i + 2]) * returnSpeed;
        }
      }
    } else {
      // Sur mobile, juste remettre les positions originales
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