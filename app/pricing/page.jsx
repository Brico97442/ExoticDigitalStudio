'use client';
import gsap from 'gsap';
import { useEffect, useState, useRef } from 'react';

export default function Pricing() {
    const sliderData = [
        {
            title: "Web ",
            description: "Web Starter Pack 300€",
            classNameColor: "bg-teal-800",
        },
        {
            title: "Web",
            description: "Web Starter Pack 600€",
            classNameColor: "bg-teal-500",
        },
        {
            title: "Web",
            description: "Web Starter Pack 700€",
            classNameColor: "bg-teal-300",
        },
        {
            title: "Web",
            description: "Web Starter Pack 900€",
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

    const handleMouseEnter = (index) => {
        gsap.to(overlays.current[index], {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3,
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(overlays.current[index], {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.3,
        });
    };

    return (
        <section className="bg-black h-screen w-full relative m-auto">
            <div className="flex flex-col w-full w-1/2 gap-20">
                <h1 className='flex pricing text-[12vh] leading-none mt-20' id='price-title'>Nos Tarifs</h1>
                <p id='title-text' className='text-2xl w-3/4'>Exotik Digital Studio, vous propose des formules adaptées à tout type de budget. Que vous soyez une petite ou moyenne entreprise, particulier ou professionnel, retrouvez la formule qui correspond à vos besoins.</p>
            </div>
            <div className='flex text-black h-full w-full relative cursor-pointer'>
        
                {sliderData.map((data, index) => (
                    <div
                        key={index}
                        className={`${data.classNameColor} flex items-center justify-center h-full w-1/4 transition-all`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        {data.title}
                        <div
                            ref={el => overlays.current[index] = el}
                            className='flex-col bg-red-500 absolute w-full p-6 right-full h-3/6 bottom-0 transition-all'
                            style={{ opacity: 0, visibility: 'hidden' }}
                        >
                            {data.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

