import React, { useEffect, useRef, Suspense, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';
import Bodyscrolllock from './Bodyscrolllock'; // Import du composant
import { animatePageIn, animatePageOut } from "../utils/animation";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const callBtn = useRef(null);
  const counterProgressBar = useRef(null);
  const counterNumberRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (counterProgressBar.current && counterNumberRef.current) {
      gsap.to(counterProgressBar.current, {
        width: '100%',
        duration: 10,
        ease: 'linear',
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          counterNumberRef.current.textContent = progress;
        },
        onComplete: () => {
          setLoadingComplete(true);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (loadingComplete && divRef.current && island?.current) {
      gsap.to(divRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        duration: 1,
        ease: 'power4.inOut',
        zIndex: 2,
      });
      gsap.to(island.current.position, {
        x: 0,
        y: 0,
        z: -0.3,
        duration: 2,
        ease: 'power4.inOut',
        onComplete: () => {
          setAnimationComplete(true);
        },
      });
      gsap.to(divRef2.current, {
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        zIndex: 0,
      });
    }
  }, [loadingComplete, island]);

  return (
    <div ref={divRef} className={`${animationComplete ? 'absolute' : 'fixed'} bg-black h-screen top-0 flex-col items-center justify-center w-full flex z-[6]`}>
      <Bodyscrolllock isLocked={!animationComplete} /> {/* Utilisation du composant */}
      <div ref={divRef2} className={`${animationComplete ? 'blur-sm' : 'blur-none'} fixed top-0 text-white left-0 h-screen w-screen transition z-[6]`}>
        <Image src={logo} alt="logo de la compagnie" width={250} height={20} className='ml-8' />
        <h1 ref={counterNumberRef} className='ml-20 text-4xl'>0</h1>
        <div>
          <div id='counter-body' className='absolute ml-20 mb-24 bottom-0 h-1 bg-black w-[30vw]'>
            <div ref={counterProgressBar} className='w-0 h-full bg-white'></div>
          </div>
          <div className='absolute bottom-0 right-0 mr-20 mb-20 text-sm'>
            Reunion Island Studio
          </div>
          <p className='absolute text-xs ml-20 bottom-0 mb-40'>Since 2024</p>
        </div>
        {loadingComplete && (
          <p ref={callBtn} className='text-lg w-screen fixed flex justify-center items-center transition-ease-2 bottom-0 mb-20 hover:scale-100 transition ease-out duration-500 hover:opacity-25'>
            Loading complete
          </p>
        )}
      </div>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} island={island} animationComplete={animationComplete} />
        </Suspense>
        <ambientLight position={[1, 2, -2]} intensity={5} color={'t'} />
      </Canvas>
    </div>
  );
}
