'use client';
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/all';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';

export default function Scene({ island }) {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loadingComplete, setLoadingComplete] = useState(true); // Ajouter un état pour le chargement

  useEffect(() => {
    // Animation de la couleur de fond du noir à transparent
    ScrollTrigger.create({
      trigger: divRef.current,
      start: 'top top',
      end: '+=500',

      onEnter: () => {
        gsap.to(divRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          duration: 2,
          zIndex: 0,
          delay:1,
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
          duration: 2,
          ease: 'power4.inOut',
          
        });
        setAnimationComplete(true); // Animation terminée
      },

      onLeaveBack: () => {
        setAnimationComplete(false); // Animation terminée
        gsap.to(divRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          duration: 1,
          zIndex:208,
          ease: 'power4.inOut',
        });
        gsap.to(divRef2.current, {
          opacity: 1,
          duration: 1,
          ease: 'power4.inOut',
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

  /////////////////////////////////////////////// Numeric counter /////////////////////////////////////////////////////////////////////////////////////////////
  let counterElement;
  let currentValue = 0;
  const totalDuration = 15000; // Durée totale en ms (10 secondes)
  const updatesCount = 100; // Nombre total de mises à jour
  const delay = totalDuration / updatesCount; // Délai entre chaque mise à jour

  function startNumericLoader() {
    counterElement = document.getElementById('couter-number');
    updateCounter();
  }

  function updateCounter() {
    if (currentValue === 100) {
      setLoadingComplete(true);
      return;
    }else{
      setLoadingComplete(false)
    }

    currentValue++;
    counterElement.textContent = currentValue;

    // Mise à jour de la largeur du compteur
    gsap.to("#counter", {
      width: `${currentValue}%`,
      opacity:1,
      duration: delay / 1000, // Durée de l'animation pour chaque étape (convertie en secondes)
      ease: 'linear',
      onComplete: () => {
        updateCounter()
      },
    });
  }

  // Initialisation de l'animation

  useEffect(() => {
    // const hero = document.getElementById('hero')
    if (!animationComplete) {
      // hero.classList.add('no-scroll')
      setAnimationComplete(false)
      startNumericLoader()
    }else{
      // hero.classList.remove('no-scroll')
    }
  }, [animationComplete]);


  return (
    <div ref={divRef} className={` ${animationComplete ? 'absolute' : 'fixed'} h-screen top-0  flex-col bg-black items-center justify-center w-full flex z-[206] overflow-hidden`}
    >
      <div ref={divRef2} className='fixed top-0 left-0 h-screen w-screen z-[205]'>
        <Image src={logo} alt="logo de la compagnie" width={320} height={50} />
        {/* <h1 className='ml-20'> Loading . . .</h1> */}
        <h1 id="couter-number" className='ml-20 text-6xl'>0</h1>
        <div>
          <div className='absolute ml-20 mb-20 bottom-0 h-10 bg-black w-[400px] border-solid border-x-2 border-y-2 border-white'>
            <div id='counter' className='w-full h-full bg-white '>
            </div>
          </div>
          <div>
          </div>
        </div>
        {loadingComplete && (
          <p className='text-xl w-screen fixed flex justify-center z-[208] bottom-0 mb-20'>
            Scroller pour découvrir
          </p>
        )}
      </div>

      <Canvas camera={{ position: [0, 0, 6] }}>
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} island={island} animationComplete={animationComplete} />
        </Suspense>
        <ambientLight position={[1, 4, 1]} intensity={9} color={'white'} />
        <Environment preset="city" />
        {/* <OrbitControls /> */}
        {/* <CameraAnimation /> */}
      </Canvas>
    </div>
  );
}
gsap.registerPlugin(ScrollTrigger);
