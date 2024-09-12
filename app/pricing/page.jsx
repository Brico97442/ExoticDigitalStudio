'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import HackHover from '../components/hackHoverEffect'
import PricingCard from '../components/PricingCard'


export default function Pricing() {


    const textRef = useRef([]);

    useEffect(() => {
        const splitTextInstances = textRef.current.map((ref) => {
            return new SplitType(ref, { types: 'chars, words' });
        });

        splitTextInstances.forEach((splitText) => {
            gsap.from(splitText.chars, {
                opacity: 0,
                ease: "power4.inOut",
                visibility: "visible",
                duration: .2,
                stagger: 0.05,
                delay: 2,
            });
        });
    }, []);

    return (

        <div className="h-full min-h-screen w-full flex flex-col z-[1] relative overflow-hidden">
            <HackHover ref={(el) => textRef.current[0] = el} data='Nos tarifs' classValue='text-[120px] mt-40 ml-40 text-black text-left z-[2]' />
            <div className='w-[85vw] ml-40 flex flex-col gap-6'>
                <h2 className='text-[30px] font-bold'> Choisissez l’offre qui vous ressemble</h2>
                <p className='text-[18px] w-2/3'>Chez nous, la qualité n’est pas optionnelle, et les solutions adaptées à vos besoins ne le sont pas non plus. Vous trouverez ici des offres conçues pour répondre à tous les projets, des plus simples aux plus ambitieux.
                    Que vous ayez besoin d’une application web performante, d’un site flambant neuf, d’un design qui claque ou d’un référencement qui propulse votre site en haut de Google, nous avons ce qu’il vous faut. Et si vous avez une idée bien précise (ou un peu folle), nos packs sur-mesure sont là pour ça !
                    Parcourez nos options, choisissez celle qui vous convient le mieux, et laissez-nous transformer vos idées en réalité. </p>
            </div>
            <div id='card-wrapper' className='w-[90vw] h-full m-auto mt-20 mb-20'>
                <PricingCard/>
            </div>
        </div>
    );
}
