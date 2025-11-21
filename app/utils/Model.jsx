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
function ParticleIslandBase({ island, color = '#6a1b9a', nodes, position = [-0.08, 0.08, -0.3], scale = [0.015, 0.015, 0.015] }) {
  const { viewport, size, scene } = useThree();
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const containerRef = useRef(null);
  const mouseRef = useRef([0, 0]);

  // --- Sampling des vertices ---
  const { sampledPositions, sampledColors } = useMemo(() => {
    const geom = nodes.reunion.geometry;
    const pos = geom.attributes.position.array;
    const col = geom.attributes.color ? geom.attributes.color.array : null;

    const sampledPos = [];
    const sampledCol = [];
    const step = size.width < 768 ? 50 : 30;

    for (let i = 0; i < pos.length; i += 3 * step) {
      sampledPos.push(pos[i], pos[i + 1], pos[i + 2]);

      if (col) sampledCol.push(col[i], col[i + 1], col[i + 2]);
      else sampledCol.push(0, 0.2, 0.8);
    }

    return {
      sampledPositions: new Float32Array(sampledPos),
      sampledColors: new Float32Array(sampledCol),
    };
  }, [nodes]);

  // Point geometry avec positions modifiables
  const pointsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const modifiablePositions = new Float32Array(sampledPositions);
    geom.setAttribute('position', new THREE.BufferAttribute(modifiablePositions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(sampledColors, 3));
    return geom;
  }, [sampledPositions, sampledColors]);

  const originalPositions = useMemo(() => new Float32Array(sampledPositions), [sampledPositions]);

  const pointsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(color),
      vertexColors: false,
      size: 0.01,
      transparent: true,
      opacity: 1.0,
    });
  }, [color]);

  // Lumière
  useEffect(() => {
    if (!scene || isMobile) return;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    return () => scene.remove(directionalLight);
  }, [scene]);

  // Intro animation - ne se joue qu'une seule fois
  useEffect(() => {
    if (!island.current) return;
    
    // Vérifier si l'intro a déjà été jouée
    if (!window.__islandIntroPlayed) {
      island.current.rotation.set(25 * Math.PI/180, -80 * Math.PI/180, 0.1);
      island.current.visible = false;

      const runIntro = () => {
        animateIslandIntro(island);
        window.__islandIntroPlayed = true;
      };
      
      if (typeof window !== 'undefined' && window.__preloaderDone) {
        runIntro();
      } else {
        window.addEventListener("preloaderDone", runIntro, { once: true });
      }

      return () => window.removeEventListener("preloaderDone", runIntro);
    } else {
      // Si l'intro a déjà été jouée, rendre visible immédiatement
      island.current.visible = true;
    }

    animateIsland(island);
  }, [island]);

  // Mouse move
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      mouseRef.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Per-point phases
  const pointPhases = useMemo(() => {
    const phases = [];
    for (let i = 0; i < sampledPositions.length / 3; i++) {
      phases.push({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
        speedX: 0.2 + Math.random() * 0.3,
        speedY: 0.5 + Math.random() * 0.5,
        speedZ: 0.1 + Math.random() * 0.2
      });
    }
    return phases;
  }, [sampledPositions.length]);

  useFrame((state) => {
    if (!containerRef.current || !island.current) return;

    const t = state.clock.getElapsedTime();

    // Flottement global
    containerRef.current.position.y = Math.sin(t) * 0.02;
    containerRef.current.position.x = Math.sin(t * 0.5) * 0.015;

    // Rotation with mouse
    if (!isMobile) {
      const maxYaw = 0.1;
      const targetY = mouseRef.current[0] * maxYaw;
      containerRef.current.rotation.y += (targetY - containerRef.current.rotation.y) * 0.4;
    }

    const positions = pointsGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const idx = i / 3;
      const phase = pointPhases[idx];

      const origX = originalPositions[i];
      const origY = originalPositions[i + 1];
      const origZ = originalPositions[i + 2];

      // Flottement individuel
      const floatX = Math.sin(t * phase.speedX + phase.x) * 0.005;
      const floatY = Math.sin(t * phase.speedY + phase.y) * 0.007;
      const floatZ = Math.sin(t * phase.speedZ + phase.z) * 0.003;

      let targetX = origX + floatX;
      let targetY = origY + floatY;
      let targetZ = origZ + floatZ;

      // Répulsion souris (RESTAURÉE)
     // Répulsion souris naturelle et circulaire
      // Répulsion souris organique - VERSION DEBUG
      if (!isMobile) {
        // Essayer plusieurs échelles pour trouver la bonne
        const scales = [0.1, 0.5, 1, 2, 5, 10, 20, 50];
        
        for (let s of scales) {
          const mouseX = mouseRef.current[0] * s;
          const mouseY = mouseRef.current[1] * s;
          
          const pointX = positions[i];
          const pointY = positions[i + 1];
          const pointZ = positions[i + 2];
          
          const dx = pointX - mouseX;
          const dy = pointY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Test avec rayon large
          const repulsionRadius = 0.3;
          const repulsionStrength = 4;

          if (distance < repulsionRadius && distance > 0.001) {
            const forceFactor = (repulsionRadius - distance) / repulsionRadius;
            const force = forceFactor * repulsionStrength;
            
            targetX += (dx / distance) * force;
            targetY += (dy / distance) * force;
            
            // Log pour debug
            if (idx === 0 && Math.random() < 0.01) {
              console.log(`Scale ${s}: distance=${distance.toFixed(2)}, force=${force.toFixed(4)}`);
            }
            break; // Sortir dès qu'on trouve une échelle qui fonctionne
          }
        }
      }

      const returnSpeed = isMobile ? 0.05 : 0.2;

      positions[i] += (targetX - positions[i]) * returnSpeed;
      positions[i + 1] += (targetY - positions[i + 1]) * returnSpeed;
      positions[i + 2] += (targetZ - positions[i + 2]) * returnSpeed;
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
          scale={scale}
          // position={position}
        />
      </group>
    </group>
  );
}

// -------------------------------------------------------------------
// Composants spécifiques avec leurs positions personnalisées
// -------------------------------------------------------------------
function ReunionModel(props) {
  const { nodes } = useGLTF('/media/ball.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });
  return (
    <ParticleIslandBase 
      {...props} 
      nodes={nodes}
      // position={[-0, 0, -0]}  // Position du modèle 1
      scale={[0.25, 0.25, 0.25]}    // Scale du modèle 1
    />
  );
}

function DracoModel(props) {
  const { nodes } = useGLTF('/media/reunion-draco2.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });
  return (
    <ParticleIslandBase 
      {...props} 
      nodes={nodes}
      // position={[-0.08, 0.08, -0.3]}       // Position du modèle 2 (différente)
      scale={[0.015, 0.015, 0.015]}       // Scale du modèle 2 (différent)
    />
  );
}

// Exemple de 3ème modèle - remplacez par votre propre fichier
function ThirdModel(props) {
  const { nodes } = useGLTF('/media/dev.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });

  return (
    <ParticleIslandBase 
      {...props} 
      nodes={nodes}
      position={[-0.1, 0.05, -0.4]}    // Position du modèle 3 (différente)
      scale={[0.018, 0.018, 0.018]}    // Scale du modèle 3 (différent)
    />
  );
}

// -------------------------------------------------------------------
// Wrapper avec transition fluide
// -------------------------------------------------------------------
function ModelWithTransition({ modelIndex, island, ...props }) {
  const [currentModel, setCurrentModel] = React.useState(modelIndex);
  const [targetOpacity, setTargetOpacity] = React.useState(1);
  const opacityRef = React.useRef(1);

  // Appliquer l'opacité au material dans useFrame
  useFrame(() => {
    if (island.current && island.current.material) {
      // Interpolation smooth vers la target opacity
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.1;
      island.current.material.opacity = opacityRef.current;
      island.current.material.needsUpdate = true;
    }
  });

  React.useEffect(() => {
    if (modelIndex !== currentModel) {
      // Fade out
      setTargetOpacity(0);
      
      // Attendre la fin du fade out avant de changer le modèle
      const fadeOutTimer = setTimeout(() => {
        setCurrentModel(modelIndex);
        
        // Petit délai pour s'assurer que le nouveau modèle est monté
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Fade in
            setTargetOpacity(1);
          });
        });
      }, 500); // Durée du fade out
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [modelIndex, currentModel]);

  const modelProps = { island, ...props };

  switch (currentModel) {
    case 1:
      return <DracoModel {...modelProps} />;
    case 2:
      return <ThirdModel {...modelProps} />;
    default:
      return <ReunionModel {...modelProps} />;
  }
}

// -------------------------------------------------------------------
// Choix dynamique du modèle via modelIndex avec transitions fluides
// -------------------------------------------------------------------
export default function ParticleIsland({ modelIndex = 0, ...props }) {
  return <ModelWithTransition modelIndex={modelIndex} {...props} />;
}