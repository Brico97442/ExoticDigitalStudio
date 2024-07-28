'use client';
import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png'

export default function Scene() {
  const divRef = useRef(null);
  const divRef2 = useRef(null);

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    gsap.to(divRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      // duration: 2,
      delay: 5,
      zIndex: 0,
      ease: "power4.inOut",
      onComplete:()=>{
        gsap.to(divRef2.current,{
          display:"none",
          opacity:0,
        })
      }
    });

  }, []);

  return (
    <div ref={divRef} className='border-4 h-screen flex-col fixed items-center justify-center w-full flex z-[206]' style={{ backgroundColor: 'black' }}>
       <div ref={divRef2}className='absolute z-[207] top-0 left-0'>
       <Image src={logo} alt="logo de la compagnie" width={320} height={50} />     
       <h1 className='ml-20'> En chargement . . .</h1>
       </div>

      <Canvas>
        <Suspense>
          <Model />
        </Suspense>
        <ambientLight castShadow position={[0.2, -0.2, -1]} intensity={7} />
        <Environment preset="forest" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
