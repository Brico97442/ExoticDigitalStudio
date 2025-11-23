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
  const { viewport, size, scene, camera } = useThree();
  const scaleFactor = size.width < 768 ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  const containerRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const targetPositionsRef = useRef(null);
  
  // Réutiliser les objets pour éviter les allocations
  const tempVec3 = useRef(new THREE.Vector3());
  const mouseWorld = useRef(new THREE.Vector3());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));

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

  // Initialiser le tableau des positions cibles
  useEffect(() => {
    targetPositionsRef.current = new Float32Array(sampledPositions.length);
    for (let i = 0; i < sampledPositions.length; i++) {
      targetPositionsRef.current[i] = sampledPositions[i];
    }
  }, [sampledPositions]);

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
      island.current.visible = true;
    }

    animateIsland(island);
  }, [island]);

  // Mouse move - throttled pour performance
  useEffect(() => {
    if (isMobile) return;
    
    let rafId = null;
    let pendingUpdate = false;
    
    const handleMouseMove = (e) => {
      if (!pendingUpdate) {
        pendingUpdate = true;
        
        rafId = requestAnimationFrame(() => {
          // Normaliser les coordonnées de la souris (-1 à +1)
          mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
          
          pendingUpdate = false;
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
    if (!containerRef.current || !island.current || !targetPositionsRef.current) return;

    const t = state.clock.getElapsedTime();

    // Flottement global
    containerRef.current.position.y = Math.sin(t) * 0.02;
    containerRef.current.position.x = Math.sin(t * 0.5) * 0.015;

    // Rotation with mouse
    if (!isMobile) {
      const maxYaw = 0.1;
      const targetY = mouseRef.current.x * maxYaw;
      containerRef.current.rotation.y += (targetY - containerRef.current.rotation.y) * 0.4;
    }

    const positions = pointsGeometry.attributes.position.array;
    const targetPositions = targetPositionsRef.current;
    
    // Paramètres de répulsion (pré-calculés)
    const repulsionRadius = 2.5;
    const repulsionRadiusSq = repulsionRadius * repulsionRadius;
    const repulsionStrength = 5;
    const returnSpeed = 0.15;
    
    // Calculer la position de la souris une seule fois par frame
    let hasMouseIntersection = false;
    if (!isMobile) {
      raycaster.current.setFromCamera(mouseRef.current, camera);
      hasMouseIntersection = raycaster.current.ray.intersectPlane(plane.current, mouseWorld.current);
    }

    // Pré-calculer la matrice de transformation une seule fois
    const worldMatrix = island.current.matrixWorld;
    
    // Réutiliser le même vecteur temporaire
    const worldPos = tempVec3.current;

    // Batch update des positions
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

      // Répulsion souris (seulement sur desktop)
      if (hasMouseIntersection) {
        // Réutiliser worldPos au lieu de créer un nouveau Vector3
        worldPos.set(positions[i], positions[i + 1], positions[i + 2]);
        worldPos.applyMatrix4(worldMatrix);
        
        // Distance 2D au carré (éviter sqrt)
        const dx = worldPos.x - mouseWorld.current.x;
        const dy = worldPos.y - mouseWorld.current.y;
        const distSq = dx * dx + dy * dy;
        
        // Si dans le rayon de répulsion
        if (distSq < repulsionRadiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          
          // Calcul de la force (optimisé)
          const invRadius = 1 / repulsionRadius;
          const factor = 1 - (dist * invRadius);
          const force = factor * factor * repulsionStrength;
          
          // Direction normalisée (réutiliser invDist)
          const invDist = 1 / dist;
          const dirX = dx * invDist;
          const dirY = dy * invDist;
          
          // Appliquer en espace local
          targetX += dirX * force;
          targetY += dirY * force;
          targetZ += force * 0.1;
        }
      }

      // Stocker les positions cibles
      targetPositions[i] = targetX;
      targetPositions[i + 1] = targetY;
      targetPositions[i + 2] = targetZ;

      // Interpolation smooth vers la cible
      positions[i] += (targetX - positions[i]) * returnSpeed;
      positions[i + 1] += (targetY - positions[i + 1]) * returnSpeed;
      positions[i + 2] += (targetZ - positions[i + 2]) * returnSpeed;
    }

    // Marquer pour mise à jour GPU (une seule fois par frame)
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
          position={position}
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
      position={[-0, 0, -0]}
      scale={[0.25, 0.25, 0.25]}
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
      scale={[0.015, 0.015, 0.015]}
    />
  );
}

function ThirdModel(props) {
  const { nodes } = useGLTF('/media/dev.glb', true, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
  });

  return (
    <ParticleIslandBase 
      {...props} 
      nodes={nodes}
      position={[-0.1, 0.05, -0.4]}
      scale={[0.018, 0.018, 0.018]}
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

  useFrame(() => {
    if (island.current && island.current.material) {
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.1;
      island.current.material.opacity = opacityRef.current;
      island.current.material.needsUpdate = true;
    }
  });

  React.useEffect(() => {
    if (modelIndex !== currentModel) {
      setTargetOpacity(0);
      
      const fadeOutTimer = setTimeout(() => {
        setCurrentModel(modelIndex);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTargetOpacity(1);
          });
        });
      }, 500);
      
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