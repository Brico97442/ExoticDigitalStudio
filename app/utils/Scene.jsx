'use client';
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png'

export default function Scene() {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    gsap.to(divRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 2,
      delay: 5,
      zIndex: 0,
      ease: "power4.inOut",
      onStart: () => {
        gsap.to(divRef2.current, {
          display: "none",
          opacity: 0,
        });
      },
    });

    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function CameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
      gsap.to(camera.position, {
        z: 26, // Ajustez cette valeur pour éloigner la caméra
        x: 0.4,
        y: -0.4,
        duration: 2,
        ease: 'power4.inOut',
      });
    }, [camera]);

    return null;
  }

  return (
    <div ref={divRef} className='h-screen relatived flex-col fixed bg-black items-center justify-center w-full flex z-40'>
      <div ref={divRef2} className='fixed top-0 left-0 h-screen w-screen'>
        <Image src={logo} alt="logo de la compagnie" width={320} height={50} />
        <h1 className='ml-20'> En chargement . . .</h1>
      </div>
      <Canvas camera={{ position: [0, 0, 14] }}> {/* Initialisez la position de la caméra ici */}
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} />
        </Suspense>
        <ambientLight castShadow position={[0, 0, 0.8]} intensity={10} />
        <Environment preset="forest" />
        {/* <OrbitControls /> */}
        <CameraAnimation />
      </Canvas>
    </div>
  );
}
