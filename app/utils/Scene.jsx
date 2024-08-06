'use client';
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/all';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';

export default function Scene() {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const island = useRef(null);
  const [loading, setLoading] = useState(true); // Ajouter un état pour le chargement

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    ScrollTrigger.create({
      trigger: divRef.current,
      start: 'top top',
      end: '+=500',
      scrub: 1,
      onEnter: () => {
        gsap.to(divRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          duration: 2,
          zIndex: 0,
          ease: 'power4.inOut',
          onStart: () => {
            gsap.to(divRef2.current, {
              opacity: 0,
            });
          },
          
        });
        // Animation de l'île lors du défilement
        gsap.to(island.current.position, {
          x: 0.5,
          y: -0.2,
          z: -0.8,
          duration: 1.5,
          ease: 'power4.inOut',
          onComplete: () => setLoading(false) // Fin du chargement
        });
      },
      onLeaveBack: () => {
        gsap.to(divRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          duration: 1,
          zIndex: 206,
          ease: 'power4.inOut',
        });
        gsap.to(divRef2.current, {
          opacity: 1,
        });
        gsap.to(island.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'power4.inOut',
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

  useEffect(() => {
    const noScroll = document.getElementById('hero')
    if (loading) {
      noScroll.classList.add('no-scroll');
    } else {
      noScroll.classList.remove('no-scroll');
    }

    gsap.from("#counter", {
      width: 0,
      duration: 10,
      stagger: 0.1,
      opacity: 0,

    });
    startLoader()
  }, [loading]);


  return (
    <div ref={divRef} className='h-screen fixed flex-col fixed bg-black items-center justify-center w-full flex z-[206]'>
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
        <p className='text-2xl w-screen h-screen fixed flex justify-center items-end z-[206]'>Scroller pour découvrir</p>
      </div>

      <Canvas camera={{ position: [0,0,6]}}>
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition}  island={island}/>
        </Suspense>
        <ambientLight castShadow position={[1, 4, 1]} intensity={9} color={'white'} />
        <Environment preset="city" />
        {/* <OrbitControls /> */}
        {/* <CameraAnimation /> */}
      </Canvas>
    </div>
  );
}
gsap.registerPlugin(ScrollTrigger);
