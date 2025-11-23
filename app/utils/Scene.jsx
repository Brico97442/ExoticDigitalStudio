import React, { useEffect, useRef, Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Model2 from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { animateScene, animateScene2 } from './animation';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {

  const divRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modelIndex, setModelIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const throttledMouseMove = useCallback((event) => {
    if (!isMobile) {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    }
  }, [isMobile]);

  useEffect(() => {
    if (divRef.current) {
      animateScene(divRef);
      animateScene2(divRef); // ← Appel de la fonction
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

  // -------------------------------------------
  // 👉 ICI : Animation GSAP pour changer de modèle
  // -------------------------------------------
  useEffect(() => {
    // ScrollTrigger.create({
    //   trigger: "#section1",
    //   start: "top center",
    //   end:"bottom bottom",
    //   onEnter: () => setModelIndex(1),      // modèle suivant
    //   onLeaveBack: () => setModelIndex(0),  // modèle précédent
    //   markers: false,
    // });
    ScrollTrigger.create({
      trigger: "#about",
      start: "45% center",
      end:"bottom bottom",
      onEnter: () => setModelIndex(1),      // modèle suivant
      onLeaveBack: () => setModelIndex(0),  // modèle précédent
      markers: true,
    });

    ScrollTrigger.create({
      trigger: "#section2",
      start: "+=300% center",
      end:"bottom bottom",
      onEnter: () => setModelIndex(2),      // modèle suivant
      onLeaveBack: () => setModelIndex(1),  // modèle précédent
      markers: false,
    });
   
  }, []);
  // -------------------------------------------

  const canvasConfig = {
    camera: { position: [0, 0, 6] },
    style: { zIndex: 0 },
    dpr: isMobile ? Math.min(window.devicePixelRatio, 2) : undefined,
    performance: { min: isMobile ? 0.2 : 0.5, max: isMobile ? 0.8 : 1, debounce: 200 },
    gl: { powerPreference: 'high-performance', alpha: true, antialias: !isMobile }
  };

  return (
    <div id='scene' ref={divRef} className='w-full fixed h-[100vh] top-0  opacity-100'>
      <Canvas {...canvasConfig} id="three-canvas">
        <fog attach="fog" args={['#771A66', 6, 2]} />
        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <Model2 
              mousePosition={mousePosition}
              island={island}
              color="#ECECEC"
              modelIndex={modelIndex}  // <<--- ajout important
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
