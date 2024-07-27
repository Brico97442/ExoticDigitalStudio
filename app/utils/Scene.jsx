'use client';
import React, { useEffect, useRef,Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';

export default function Scene() {
  const divRef = useRef(null);

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    gsap.to(divRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 2,
      delay: 5,
      zIndex:0,
    });
    
  }, []);

  return (
    <div ref={divRef} className='h-screen fixed w-screen flex z-[206]' style={{ backgroundColor: 'black' }}>
      <Canvas>
        <Suspense>
          <Model />
        </Suspense>
        <ambientLight position={[0, 3, 2]} intensity={3} />
        <Environment preset="forest" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
