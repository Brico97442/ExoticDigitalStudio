import React, { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';



gsap.registerPlugin(ScrollTrigger);

export default function Scene({ island }) {
  const divRef = useRef(null); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); 

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

  }, [island]);

  return (
    <div id='scene' ref={divRef} className={`  w-full z-[2] absolute h-screen top-0 flex-col items-center justify-center`}>
   
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
