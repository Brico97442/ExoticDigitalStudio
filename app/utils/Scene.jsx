import React, { useEffect, useRef, Suspense, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import logo from '../../assets/LogoExoticDigitalStudioWhite.png';
import { animatePageIn, animatePageOut } from "../utils/animation";
import { useAnimation } from "../context/animationContext";
import { animateIsland } from './animation';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [loadingComplete, setLoadingComplete] = useState(false);
 
  const [animationComplete, setAnimationComplete] = useState(false);
  // const [isHovered, setIsHovered] = useState(false)

  const body = document.querySelector('body');
  // if (!animationComplete) {
  //   body.classList.add('fixed');

  // } else {
  //   body.classList.remove('fixed');

  // }

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

    if (island?.current) {
      // gsap.to(island.current.position, {
      //   x: 0.2,
      //   y: 0.15,
      //   z: -0.35,
      //   duration: 1,
      //   delay:1,
      //   ease: 'power4.In',
      //   onComplete: () => {
      //     setAnimationComplete(true);
      //     animateIsland()
      //   },
      // });
      animateIsland()
    }

  }, [island]);


  return (
    <div id='scene' ref={divRef} className={`  w-full z-[2] absolute h-screen top-0 flex-col items-center justify-center`}>
      {/* {!animationComplete && (
      )} */}
      <div ref={divRef2} className={`fixed top-0 text-white left-0 h-[200vh] w-screen transition `}>
       
      </div>
      <div className='w-full h-full z-[10]'>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <Model mousePosition={mousePosition} island={island} />
          </Suspense>
          <ambientLight position={[1, 2, -2]} intensity={5} color={'red'} />
        </Canvas>
      </div>

    </div>
  );
}
