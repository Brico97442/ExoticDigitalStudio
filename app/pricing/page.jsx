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
                stagger: 0.2,
                delay: 2

            })
    }, [])

    return (
        <section className="bg-black h-screen w-full">
            <div className="flex pricing text-[12vh] w-full items-center">
                <h1 className=' flex overflow-visible ' id='price-title'>Nos Tarifs</h1>
            </div>
            <div className='flex items-center h-full w-full text-black ' >
                <div className=' flex items-center justify-center bg-teal-600 w-1/4 h-5/6 hover:w-full transition-all fixed '> Pack 1</div>
                <div className='flex items-center justify-center bg-teal-500 w-1/4 h-5/6'>Pack 2</div>
                <div className='flex items-center justify-center bg-teal-300 w-1/4 h-5/6'>Pack 3</div>
                <div className='flex items-center justify-center bg-teal-100 w-1/4 h-5/6'>Pack 4</div>
            </div>
        </section>
    );
}