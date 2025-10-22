'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import HackHover from '../components/HackHoverEffect';
import PricingCard from '../components/PricingCard';
import Services from '../components/Services';
import TextReveal from '../components/TextReveal';

export default function Pricing() {

    const textRef = useRef([]);

    const offers = [
        {
            title: 'Starter Pack',
            features: ['Landing Page', 'One Page', 'Responsive design', 'Hébergement offert', 'Suivi complet', 'Référencement SEO Local'],
            price: "1800€"
        },
        {
            title: 'Sur-mesure',
            features: ['Application personnalisée', 'Suivi complet', 'Application évolutive', 'Hébergement premium'],
            price: "Sur devis"
        },
        {
            title: 'Premium Pack',
            features: ['Audit SEO complet', 'Suivi mensuel', 'Integration 3D', 'Animations avancées'],
            price: "à partir de 5000€"
        },

    ];

    return (
        <div className="w-full flex flex-col z-[2] relative pt-[110px] pb-[80px] px-[80px] backdrop-blur-[100px]  bg-opacity-50">
            <div className='relative'>
                <HackHover data='Nos tarifs' classValue='text-[17.942rem] text-white text-left z-[2] tracking-tighter leading-none' />

                {/* <div className='z-[2] w-full'>
                <Services/>
                </div> */}
                <div className='w-full pb-[100px] z-[2] flex flex-col items-center  gap-10 text-white'>
                    <TextReveal staggerValue='0.04'>
                        <h2 className='text-[2.618rem] font-semibold'>Choisissez l’offre qui vous ressemble</h2>
                    </TextReveal>
                    <TextReveal>
                        <p className='text-[1.2rem] w-3/4 tracking-normal text-center'>
                            Chez nous, la qualité n’est pas optionnelle, et les solutions adaptées à vos besoins ne le sont pas non plus.
                            Vous trouverez ici des offres conçues pour répondre à tous les projets, des plus simples aux plus ambitieux.
                            Parcourez nos options, choisissez celle qui vous convient le mieux, et laissez-nous transformer vos idées en réalité.
                        </p>
                    </TextReveal>
                </div>
                <div id='card-wrapper' className='flex gap-10 flex-wrap justify-center h-auto'>
                    {offers.map((offer, index) => (
                        <PricingCard
                            key={index}
                            title={offer.title}
                            features={offer.features}
                            price={offer.price}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
