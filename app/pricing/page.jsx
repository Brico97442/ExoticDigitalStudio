'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import HackHover from '../components/HackHoverEffect';
import PricingCard from '../components/PricingCard';

export default function Pricing() {

    const textRef = useRef([]);

    const offers = [
        {
            title: 'Création site web',
            features: ['Responsive design','Application évolutive', 'Hébergement offert', 'Suivi complet'],
            price: "900€"
        },
        {
            title: 'Développement sur-mesure',
            features: ['Application personnalisée', 'Suivi complet','Application évolutive', 'Hébergement premium'],
            price: "Sur devis"
        },
        {
            title: 'Optimisation SEO',
            features: ['Audit SEO complet', 'Mise en place des recommandations', 'Suivi mensuel'],
            price: "350€"
        },

    ];

    return (
        <div className="h-full w-full flex flex-col z-[2] relative min-h-screen">
            <div  className='my-20'>
            <HackHover data='Nos tarifs' classValue='text-[120px] ml-40 text-black text-left z-[2]' />
            <div className='w-[85vw] ml-40 flex flex-col gap-6'>
                <h2 className='text-[30px] font-bold'>Choisissez l’offre qui vous ressemble</h2>
                <p className='text-[18px] w-2/3'>
                    Chez nous, la qualité n’est pas optionnelle, et les solutions adaptées à vos besoins ne le sont pas non plus.
                    Vous trouverez ici des offres conçues pour répondre à tous les projets, des plus simples aux plus ambitieux.
                    Parcourez nos options, choisissez celle qui vous convient le mieux, et laissez-nous transformer vos idées en réalité.
                </p>
            </div>
            <div id='card-wrapper' className='w-[90vw] flex gap-6 flex-wrap justify-center'>
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
