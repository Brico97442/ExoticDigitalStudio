const vertexShader = `
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float opacity;
uniform vec3 color;
uniform float gridScale;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float grid = abs(sin(vUv.x * gridScale) * sin(vUv.y * gridScale));

  // Assurer que le mélange de couleur reste cohérent
  vec3 gridColor = mix(color, vec3(0.8), min(grid, 0.5));
  gl_FragColor = vec4(gridColor, opacity);
}
`;

import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { ShaderMaterial, Color, InstancedMesh, Object3D } from 'three';
import { animateIsland, animateIslandIntro } from './animation';

// Détection mobile optimisée
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth < 768 ||
         ('ontouchstart' in window);
};

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF('/media/reunion2.glb');
  const { viewport, size, gl } = useThree();
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Références pour les deux types de mesh
  const meshRef = useRef();
  const instancedMeshRef = useRef();
  const tempObject = useRef(new Object3D());

  // Configuration adaptative selon le device
  const config = useMemo(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    
    return {
      isMobile: mobile,
      scaleFactor: mobile ? 1.8 : 0.5,
      instanceCount: mobile ? 1 : 3, // Pas d'instances sur mobile
      wireframe: !mobile, // Pas de wireframe sur mobile
      gridScale: mobile ? 5.0 : 10.0,
      pixelRatio: mobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio,
      opacity: mobile ? 0.8 : 1.0 // Moins opaque sur mobile
    };
  }, []);

  const groupScale = viewport.width / 2.4 * config.scaleFactor;

  // Matériau shader optimisé
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        opacity: { value: 0.0 },
        color: { 
          value: new Color(0, 48/255, 73/255) 
        },
        gridScale: { value: config.gridScale }
      },
      vertexShader,
      fragmentShader,
      wireframe: config.wireframe,
      transparent: true,
      depthTest: false,
      alphaTest: config.isMobile ? 0.1 : true
    });
  }, [config.wireframe, config.gridScale, config.isMobile]);

  // Setup des instances pour desktop
  const instanceData = useMemo(() => {
    if (config.isMobile) return [];
    
    const data = [];
    for (let i = 0; i < config.instanceCount; i++) {
      data.push({
        position: [
          -0.08 + (i * 0.02),
          0.08 + (i * 0.01), 
          -0.3 + (i * 0.05)
        ],
        scale: [0.015, 0.015, 0.015]
      });
    }
    return data;
  }, [config.instanceCount, config.isMobile]);

  useEffect(() => {
    // Configuration du renderer pour mobile
    if (config.isMobile) {
      gl.setPixelRatio(config.pixelRatio);
      if (gl.antialias !== undefined) {
        gl.antialias = false;
      }
    }

    // Sélection de la référence appropriée
    const currentRef = config.isMobile ? meshRef : instancedMeshRef;
    if (!currentRef.current) return;

    // Assigner la référence à island pour les animations externes
    island.current = currentRef.current;

    // Rotation initiale du Modèle 3D
    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);

    setInitialRotation({ x: initialRotationX, y: initialRotationY });
    currentRef.current.rotation.set(initialRotationX, initialRotationY, 0);

    // Application du matériau
    if (config.isMobile) {
      // Mesh simple sur mobile
      currentRef.current.material = shaderMaterial;
    } else {
      // InstancedMesh sur desktop
      for (let i = 0; i < config.instanceCount; i++) {
        const instance = instanceData[i];
        tempObject.current.position.set(...instance.position);
        tempObject.current.scale.set(...instance.scale);
        tempObject.current.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, tempObject.current.matrix);
      }
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
      instancedMeshRef.current.material = shaderMaterial;
    }

    // Masquer l'île à l'arrivée, évite tout flash
    currentRef.current.visible = false;

    // Intro page d'accueil: si le preloader est déjà passé, on lance tout de suite.
    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== 'undefined' && window.__preloaderDone) {
      runIntro();
    } else {
      window.addEventListener('preloaderDone', runIntro, { once: true });
    }

    // Scroll/scene animations ensuite
    animateIsland(island);

    return () => {
      window.removeEventListener('preloaderDone', runIntro);
    };
  }, [island, shaderMaterial, config, instanceData]);

  // Mouse tracking optimisé (désactivé sur mobile)
  useFrame(() => {
    if (config.isMobile || !mousePosition) return;
    
    const currentRef = instancedMeshRef.current || meshRef.current;
    if (currentRef) {
      const rotationFactor = -0.04;
      let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
      let rotationY = initialRotation.y + mousePosition.x * rotationFactor;
      
      // Throttling pour économiser les ressources
      if (Math.abs(rotationX - currentRef.rotation.x) > 0.001 ||
          Math.abs(rotationY - currentRef.rotation.y) > 0.001) {
        currentRef.rotation.x = rotationX;
        currentRef.rotation.y = rotationY;
      }
    }
  });

  return (
    <group scale={groupScale}>
      <group>
        {config.isMobile ? (
          // Version mobile - Mesh simple
          <mesh 
            ref={meshRef} 
            geometry={nodes.reunion.geometry} 
            scale={[0.015, 0.015, 0.015]} 
            position={[-0.08, 0.08, -0.3]} 
          />
        ) : (
          // Version desktop - InstancedMesh
          <instancedMesh
            ref={instancedMeshRef}
            args={[nodes.reunion.geometry, null, config.instanceCount]}
          />
        )}
      </group>
      {/* Lumière conditionnelle - désactivée sur mobile */}
      {!config.isMobile && (
        <pointLight position={[0, 0, 1]} intensity={8} color={'red'} />
      )}
    </group>
  );
}