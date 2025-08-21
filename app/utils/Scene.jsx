import React, { useEffect, useRef, Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { animateScene } from './animation';
import { Stats } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {
  const divRef = useRef(null); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); 
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
      depth: true
    }
  };

  return (
    <div 
      id='scene' 
      ref={divRef} 
      className={`w-[100%] fixed h-[100vh] top-0 flex-col items-center justify-center lg:w-full`}
    >
      <div className='w-full h-full'>
        <Canvas {...canvasConfig} id="three-canvas">
        <Stats />
          <Suspense fallback={null}>
            <Model mousePosition={mousePosition} island={island} />
          {/* <directionalLight position={[2, 2, 2]} intensity={15} color={'red'} /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// Fonction throttle pour limiter les appels
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}