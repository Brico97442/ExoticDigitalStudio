'use client';
import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png'

export default function Scene() {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  console.log(divRef)

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    gsap.to(divRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      // duration: 2,
      delay: 5,
      zIndex: 0,
      ease: "power4.inOut",
      right: 0,
      bottom: 0,
      
      onStart: () => {
        gsap.to(divRef2.current, {
          display: "none",
          opacity: 0,
        })
      }
    })
  }, []);

  function CameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
      gsap.to(camera.position, {
        z: 11,
        x: 0.4,
        y: -0.4,
        duration: 2,
        ease: 'power4.inOut'
      });
    }, [camera]);

    return null;
  }


  return (
    <div ref={divRef} className='h-screen flex-col fixed bg-black items-center justify-center w-full flex z-[206]'>
      <div ref={divRef2} className='absolute z-[207] top-0 left-0'>
        <Image src={logo} alt="logo de la compagnie" width={320} height={50} />
        <h1 className='ml-20'> En chargement . . .</h1>
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ambientLight castShadow position={[0, 0, 0.6]} intensity={10} />
        <Environment preset="forest" />
        {/* <OrbitControls /> */}
        <CameraAnimation position={[-0.4, 0.4, 11]} />
      </Canvas>
    </div>
  );
}
