'use client';
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';

export default function Scene() {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    gsap.to(divRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 2,
      delay: 15,
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

  // Numeric counter 
  let counterElement;
  let currentValue = 0;
  const totalDuration = 15000; // Durée totale en ms (10 secondes)
  const updatesCount = 100; // Nombre total de mises à jour
  const delay = totalDuration / updatesCount; // Délai entre chaque mise à jour

  function startLoader() {
    counterElement = document.getElementById('couter-number');
    updateCounter();
  }

  function updateCounter() {
    if (currentValue >= 100) {
      return;
    }
    currentValue++;
    counterElement.textContent = currentValue;
    setTimeout(updateCounter, delay); // Utilisation du délai calculé
  }

  function CameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
      gsap.to(camera.position, {
        z: 30, // Ajustez cette valeur pour éloigner la caméra
        x: 0.4,
        y: -0.4,
        duration: 2,
        ease: 'power4.inOut',
      });

      gsap.fromTo("#counter", {
        width: `${0}%`,
      }, {
        opacity: 0,
        width: `${100}%`,
        duration: 5,
        stagger: 0.1,
      });

    }, [camera]);

    return null;
  }

  useEffect(() => {
    gsap.to("#counter-number",{
      delay: 15,
      ease: "power4.Out",
      opacity:0
    });

    startLoader();
  }, []);

  return (
    <div ref={divRef} className='h-screen fixed flex-col fixed bg-black items-center justify-center w-full flex z-40'>
      <div ref={divRef2} className='fixed top-0 left-0 h-screen w-screen'>
        <Image src={logo} alt="logo de la compagnie" width={320} height={50} />
        {/* <h1 className='ml-20'> Loading . . .</h1> */}
            <h1 id="couter-number" className='ml-20 text-6xl'>0</h1>
        <div>
          <div className=' ml-20 h-10 bg-white w-[400px]'>
            <div id='counter' className='w-full h-full bg-gray-900 border-solid border-x-2 border-y-2 border-white'>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, 15] }}> {/* Initialisez la position de la caméra ici */}
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
