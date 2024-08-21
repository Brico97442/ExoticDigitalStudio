'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from '../components/Carousel'
export default function Pricing() {


    const textRef = useRef([]);

    useEffect(() => {
        const splitTextInstances = textRef.current.map((ref) => {
            return new SplitType(ref, { types: 'chars, words' });
        });

        splitTextInstances.forEach((splitText) => {
            gsap.from(splitText.chars, {
                y: 200,
                opacity: 0,
                ease: "power4.inOut",
                visibility: "visible",
                duration: .2,
                stagger: 0.05,
                delay:2,
            });
        });
    }, []);

    return (
      
        <div className="h-full min-h-screen w-full flex flex-col items-center z-[1] relative">
            <div className="pricing-text flex flex-col w-full w-[85vw] m-auto absolute ml-60">
                <h1 id='price-title' ref={(el) => textRef.current[0] = el} className='text-[12vh] leading-none mt-20 ' >Nos Tarifs</h1>
            </div>
            <div className='h-screen w-full fixed z-[2]'>
            <Canvas>
                <Suspense fallback={null}>
                    <Carousel />
                </Suspense>
            </Canvas>
            </div>
        </div>
    );
}
