'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from '../components/Carousel'
export default function Pricing() {

    const sliderData = [
        {
            title: "Web starter 300€",
            description: "Idéal pour les petites entreprises ou les entrepreneurs qui ont besoin d'une présence en ligne professionnelle sans fonctionnalités complexes.",
            classNameColor: "bg-teal-800",
        },
        {
            title: "Web Standard 500€",
            description: "Parfait pour les entreprises de taille moyenne qui veulent un site web plus complet avec des fonctionnalités additionnelles.",
            classNameColor: "bg-teal-500",
        },
        {
            title: "Web Premium 1000€",
            description: "Pour les entreprises ou associations qui ont besoin d'un site web complet et performant avec des fonctionnalités sur mesure.",
            classNameColor: "bg-teal-300",
        },
        {
            title: "Formule Référencement SEO 150€",
            description: "Améliorez votre visibilité en ligne et attirez plus de visiteurs grâce à notre service de référencement SEO.",
            classNameColor: "bg-teal-100",
        }
    ];

    const textRef = useRef([]);
    const overlays = useRef([]);

    useEffect(() => {
        const splitTextInstances = textRef.current.map((ref) => {
            return new SplitType(ref, { types: 'chars, words' });
        });

        splitTextInstances.forEach((splitText) => {
            gsap.to(splitText.chars, {
                y: 0,
                opacity: 1,
                ease: "power4.inOut",
                visibility: "visible",
                duration: .2,
                stagger: 0.05,
                delay: 0.6
            });
        });

        gsap.fromTo("#title-text",
            {
                x: `${-100}vh`,
                opacity: 0,
                visibility: "hidden",
                ease: "power4.inOut",
                duration: 0.4,
            },
            {
                x: 0,
                opacity: 1,
                visibility: "visible",
                stagger: 0.07,
                delay: 1.6
            });
    }, []);

    const onContainerEnter = () => {
        gsap.to("#title-text", {
            visibility: "hidden",
            ease: "sine.in",
        });
    };

    const onContainerExit = () => {
        gsap.to("#title-text", {
            visibility: "visible",
            opacity: 1,
            ease: "sine.out",
        });
    };

    const handleMouseEnter = (index) => {
        gsap.to(overlays.current[index], {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            ease: "sine.in",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(overlays.current[index], {
            opacity: 1,
            visibility: 'hidden',
            duration: 0.5,
            ease: "sine.out",
        });
    };

    return (
        <section className="pricing h-screen w-full relative m-auto">
            <div className="pricing-text flex flex-col w-full w-1/2 gap-20 z-[3]">
                <h1 id='price-title' ref={(el) => textRef.current[0] = el} className='text-[12vh] leading-none mt-20 ' >Nos Tarifs</h1>
                <p id='title-text' className='text-xl w-3/4'>Exotik Digital Studio, vous propose des formules adaptées à tout type de budget. Que vous soyez une petite ou moyenne entreprise, particulier ou professionnel, retrouvez la formule qui correspond à vos besoins.</p>
            </div>
            <div id='price-container' onMouseEnter={onContainerEnter} onMouseLeave={onContainerExit}
                className='flex text-black h-full w-full justify-center items-center relative cursor-pointer z-[3]'>
                {sliderData.map((data, index) => (
                    <div
                        key={index}
                        className={`${data.classNameColor} flex items-center justify-center h-full w-1/4 transition-all hover:w-full`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div className='flex flex-col items-center justify-between gap-6 h-2/6'>
                            <h3 className='text-center'>{data.title}</h3>
                        </div>
                        <div
                            ref={(el) => overlays.current[index] = el}
                            className='flex-col absolute w-full rounded-lg right-full bottom-0 bg-gray-500/50 bg-opacity-0.5 mx-6 transition-all h-4/6 p-6 text-white text-xl'
                            style={{ opacity: 0, visibility: 'hidden' }}
                        >
                            <p className='w-3/4'>{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-screen w-full flex z-[1]">
            <Canvas>
              <Suspense fallback={null}>
                <Carousel />
              </Suspense>
            </Canvas>
          </div>
        </section>
    );
}
