'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Pricing() {
    const sliderData = [
        {
            title: "Web starter pack 300€",
            description:
                "Idéal pour les petites entreprises ou les entrepreneurs qui ont besoin d'une présence en ligne professionnelle sans fonctionnalités complexes.",
            classNameColor: "bg-teal-800",
        },
        {
            title: "Web Starter Standard 500€",
            description: "Parfait pour les entreprises de taille moyenne qui veulent un site web plus complet avec des fonctionnalités additionnelles.",
            classNameColor: "bg-teal-500",
        },
        {
            title: "Web Starter Premium 1000€",
            description: "Pour les entreprises ou associations qui ont besoin d'un site web complet et performant avec des fonctionnalités sur mesure.",
            classNameColor: "bg-teal-300",
        },
        {
            title: "Formule Référencement SEO 150€",
            description: "Améliorez votre visibilité en ligne et attirez plus de visiteurs grâce à notre service de référencement SEO.",
            classNameColor: "bg-teal-100",
        }
    ];

    useEffect(() => {
        gsap.fromTo(['#price-title', '#title-text'], {
            y: 200,
            opacity: 0,
            bottom: 0
        },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                delay: 1
            });
    }, []);

    const overlays = useRef([]);

    
    const onContainerEnter = () => {
        gsap.to("#title-text", {
            visibility: "hidden",
            ease: "sine.in",
            
        })
    }
    
    const onContainerExit = () => {
        gsap.to("#title-text", {
            visibility: "visible",
            opacity: 1,
            ease: "sine.out",
        })
    }
    const handleMouseEnter = (index) => {
        gsap.to(overlays.current[index], {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            ease: "sine.in",
        })
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
        <section className="bg-black h-screen w-full relative m-auto">
            <div className="flex flex-col w-full w-1/2 gap-20">
                <h1 className='flex pricing text-[12vh] leading-none mt-20' id='price-title'>Nos Tarifs</h1>
                <p id='title-text' className='text-xl w-3/4'>Exotik Digital Studio, vous propose des formules adaptées à tout type de budget. Que vous soyez une petite ou moyenne entreprise, particulier ou professionnel, retrouvez la formule qui correspond à vos besoins.</p>
            </div>
            <div onMouseEnter={() => onContainerEnter()} onMouseLeave={() => onContainerExit()}
                className='flex text-black h-full w-full gap-6 justify-center items-center relative cursor-pointer '>
                {sliderData.map((data, index) => (
                    <div
                        key={index}
                        className={`${data.classNameColor} flex items-center justify-center h-full w-1/4 rounded-lg transition-all hover:w-full`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div className='flex flex-col items-center justify-between gap-6 h-2/6'>
                            <h3 className='text-center'>{data.title}</h3>
                            <button className='border text-white border-white rounded-lg p-1 bg-[#5F0F40] text-sm'>Nous contacter</button>
                        </div>
                        <div
                            ref={el => overlays.current[index] = el}
                            className='flex-col absolute w-full right-full bottom-0 bg-gray-500 bg-opacity-0.5 transition-all h-4/6 p-6 text-white text-xl'
                            style={{ opacity: 0, visibility: 'hidden' }}
                        >
                            <p className='w-3/4'>{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

