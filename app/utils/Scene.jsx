import Image from 'next/image';
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';
import { useAnimation } from '../context/animationContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';


export default function Scene({ island }) {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const callBtn = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loadingComplete, setLoadingComplete] = useState(true);
  const { animationComplete, setAnimationComplete } = useAnimation();

  useEffect(() => {
    if (island) {
      // Configuration de ScrollTrigger
      ScrollTrigger.create({
        trigger: divRef.current,
        start: 'top top',
        end: '+=500',
        onEnter: () => {
          gsap.to(divRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 1,
            delay: 0.2,
            ease: 'power4.inOut',
            zIndex: 2,
            onStart: () => {
              gsap.to(divRef2.current, {
                opacity: 0,
              });
            },
          });

          gsap.to(island.current.position, {
            x: 0.5,
            y: -0.2,
            z: -0.8,
            duration: 1,
            ease: 'power4.inOut',
          });
          setAnimationComplete(true);
          document.body.classList.remove('no-scroll');
        },

        onLeaveBack: () => {
          setAnimationComplete(false);
          document.body.classList.add('no-scroll');
          gsap.to(divRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 1)',
            duration: 1,
            ease: 'power4.inOut',
            zIndex: 9,
          });
          gsap.to(divRef2.current, {
            opacity: 1,
            duration: 1,
            ease: 'power4.inOut',
            zIndex: 6,

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

    }
  }, [island, setAnimationComplete]);

  /////////////////////////////////////////////// Numeric counter /////////////////////////////////////////////////////////////////////////////////////////////

  let counterElement;
  let currentValue = 0;
  const totalDuration = 15000; // Durée totale en ms (15 secondes)
  const updatesCount = 100; // Nombre total de mises à jour
  const delay = totalDuration / updatesCount; // Délai entre chaque mise à jour

  function startNumericLoader() {
    counterElement = document.getElementById('counter-number');
    updateCounter();
  }

  function updateCounter() {
    if (currentValue === 100) {
      setLoadingComplete(true);
      return;
    } else {
      setLoadingComplete(false);
    }

    currentValue++;
    counterElement.textContent = currentValue;

    // Mise à jour de la largeur du compteur
    gsap.to("#counter", {
      width: `${currentValue}%`,
      opacity: 1,
      duration: delay / 1000, // Durée de l'animation pour chaque étape (convertie en secondes)
      ease: 'linear',
      onComplete: () => {
        updateCounter();
      },
    });
  }

  useEffect(() => {
    if (!animationComplete) {
      startNumericLoader();
    }
    // Gestion du mouvement de la souris
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
  }, [animationComplete,startNumericLoader]);

  /////////////////////////////////////Animation clignotement compteur//////////////////////////////////////////////////////////
  
  
  useEffect(() => {
    if (!loadingComplete) {
      gsap.from(["#counter-body", "#counter-number"], {
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        onComplete: () => setLoadingComplete(true),
      });
    }
  }, [loadingComplete]);


  
  return (
    <div ref={divRef} className={` ${animationComplete ? 'absolute' : 'fixed'} bg-black h-screen top-0 flex-col items-center justify-center w-full flex z-[6] `}>
      <div ref={divRef2} className={` ${animationComplete ? 'blur-sm' : 'blur-none'} fixed top-0 text-white left-0 h-screen w-screen transition z-[6]`}>
        <Image src={logo} alt="logo de la compagnie" width={250} height={20} className='ml-8  ' />
        <h1 id="counter-number" className='ml-20 text-4xl'>0</h1>
        <div>
          <div id='counter-body' className='absolute ml-20 mb-24 bottom-0 h-1 bg-black w-[30vw]'>
            <div id='counter' className='w-full h-full bg-white '></div>
          </div>
          <div className='absolute bottom-0 right-0 mr-20 mb-20 text-sm'>
            Reunion Island Studio
          </div>
        </div>
        {loadingComplete && (
          <p ref={callBtn} className='text-lg w-screen fixed flex justify-center items-center transition-ease-2 bottom-0 mb-20 hover:scale-100 transition ease-out duration-500 hover:opacity-25'>
            Scroller pour découvrir
          </p>
        )}
      </div>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Suspense fallback={null}>
          <Model mousePosition={mousePosition} island={island} animationComplete={animationComplete} />
        </Suspense>
        <ambientLight position={[1, 4, 1]} intensity={7} color={'red'} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
