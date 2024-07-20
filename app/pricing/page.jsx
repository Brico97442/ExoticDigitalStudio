'use client'
gsap.registerPlugin();
import gsap from 'gsap';
import { useEffect } from 'react';

export default function Pricing() {
    useEffect(() => {
        gsap.fromTo('#price-title', {
            y: 200,
            opacity: 0,
            bottom: 0
        },
            {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(0.15,0.13.)",
            stagger: 0.1,
            
            })
    }, [])

    return (
        <section className="bg-black h-screen w-full">
            <div className="flex pricing text-[12vh] w-full items-center">
                <h1 className=' flex overflow-visible ' id='price-title'>Nos Tarifs</h1>
            </div>
        </section>
    );
}