import React, { useEffect, useRef, Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
// import Model from './Model';
import Model2 from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { animateScene } from './animation';
import CurvedText3d from '../components/CurverdText3d';
import { AccumulativeShadows, RandomizedLight, Stats } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, ShaderPass, KawaseBlur } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlurPass } from 'postprocessing';
import LightRays from "./LightRays"
import LiquidEther from './LiquiEther';
gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {
  const divRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const lightRef = useRef();
  const helperRef = useRef();
  // Throttle la fonction de mouvement de souris pour mobile
  const throttledMouseMove = useCallback(
    throttle((event) => {
      if (!isMobile) { // Désactiver le suivi de souris sur mobile
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
      }
    }, 16), // ~60fps max
    [isMobile]
  );
  useEffect(() => {
    if (lightRef.current) {
      helperRef.current = new THREE.PointLightHelper(lightRef.current, 0.3, 0xff0000);
      lightRef.current.parent.add(helperRef.current);
    }

    return () => {
      if (helperRef.current) {
        helperRef.current.parent.remove(helperRef.current);
        helperRef.current.dispose();
      }
    };
  }, []);
  useEffect(() => {
    if (divRef.current) {
      animateScene(divRef);
    }

    if (!isMobile) {
      window.addEventListener('mousemove', throttledMouseMove);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', throttledMouseMove);
      }
    };
  }, [throttledMouseMove, isMobile]);

  // Configuration Canvas optimisée pour mobile
  const canvasConfig = {
    camera: { position: [0, 0, 6] },
    style: { zIndex: 0 },
    // Paramètres de performance pour mobile
    dpr: isMobile ? Math.min(window.devicePixelRatio, 2) : undefined, // Limite la résolution sur mobile
    performance: {
      min: isMobile ? 0.2 : 0.5, // FPS minimum acceptable
      max: isMobile ? 0.8 : 1, // FPS maximum
      debounce: 200 // Délai avant optimisation
    },
    gl: {
      powerPreference: 'high-performance',
      alpha: true,
      antialias: !isMobile, // Désactiver l'antialiasing sur mobile
      stencil: false,
      depth: false
    }
  };

  return (
    <div
      id='scene'
      ref={divRef}
      className={`w-[100%] fixed h-[100vh] top-0 flex-col items-center justify-center lg:w-full `}
    >
        {/* <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.1}
            rayLength={0.5}
            followMouse={true}
            mouseInfluence={0.3}
            noiseAmount={0.05}
            distortion={0.03}
            className="z-0 w-full absolute top-0"
          /> */}
      <div className='w-full h-full relative'>
        {/* <div style={{ width: '100%', height: '100%', position: 'absolute' }}> */}
        {/* </div> */}
        {/* <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={50}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.3}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            /> */}
        <Canvas {...canvasConfig} id="three-canvas" className='' >
          <fog attach="fog" args={['#771A66', 6, 2]} />
          {/* <Stats /> */}
          <Suspense fallback={null}>

            <group position={[0, 0, 0]}>
              <Model2 mousePosition={mousePosition} island={island} color="#ECECEC" />
              {/* <CurvedText3d
              /> */}
              {/* Lumières globales */}
              {/* === Point lumineux déplaçable avec helpers === */}
              {/* <ambientLight intensity={0.2} /> */}
              {/* <pointLight position={[2, 2, 2]} intensity={12} color="#C1121F" distance={10} decay={2} /> */}

              {/* Représentation visuelle de la lumière */}
              {/* <mesh position={[0, 0, 0]}>
                {/* <sphereGeometry args={[0.1, 32, 32]} /> */}
                {/* <meshStandardMaterial
                  emissive="#C1121F"
                  emissiveIntensity={18}
                  color="#C1121F"
                  toneMapped={false} // Pour éviter que le bloom réduise sa luminosité
                /> */}
              {/* </mesh> */}
              {/* 
                Problème : le pointLight de trois.js n'est pas visible par défaut dans la scène, car il n'a pas de représentation visuelle.
                Pour le "voir", il faut utiliser un helper comme PointLightHelper, ou bien placer un objet à la même position pour repérer la lumière.
                Ci-dessous, on ajoute un PointLight ET un PointLightHelper pour le visualiser.
              */}


              {/* Pour rendre le point lumineux déplaçable, il faudrait gérer l'état de position et des events souris */}
              {/* <ambientLight position={mousePosition} color='red' intensity={20} /> */}
              {/* <directionalLight position={mousePosition} intensity={200} color='#C1121F'/> */}

              {/* <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.8} color="red" scale={20} position={[0, -0.005, 0]}> */}
              {/* <RandomizedLight amount={8} radius={6} ambient={0.5} intensity={1} position={[-1.5, 2.5, -2.5]} bias={0.001} /> */}
              {/* </AccumulativeShadows> */}
              {/* <OrbitControls /> */}

            </group>
          </Suspense>

        </Canvas>
      </div>
    </div>
  );
}

// Fonction throttle pour limiter les appels
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}