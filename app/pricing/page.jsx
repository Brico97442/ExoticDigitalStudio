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
            title: 'Starter Pack',
            features: ['Landing Page','Responsive design', 'Application évolutive', 'Hébergement offert', 'Suivi complet'],
            price: "1800€"
        },
        {
            title: 'Développement sur-mesure',
            features: ['Application personnalisée', 'Suivi complet', 'Application évolutive', 'Hébergement premium'],
            price: "Sur devis"
        },
        {
            title: 'Premium Pack',
            features: ['Audit SEO complet', 'Mise en place des recommandations', 'Suivi mensuel','Integration 3D','Animations avancées'],
            price: "à partir de 5000€"
        },

    ];

    return (
        <div className="w-full flex flex-col z-[2] relative pt-[110px] pb-[80px] backdrop-blur-[100px]  bg-opacity-50">
            <div className=''>
                <HackHover data='Nos tarifs' classValue='text-[17.942rem] pl-40 text-white text-left z-[2] tracking-tighter' />
                <div className='w-full pl-40 pb-[80px] flex flex-col gap-10 text-white'>
                    <h2 className='text-[30px] font-bold'>Choisissez l’offre qui vous ressemble</h2>
                    <p className='text-[18px] w-2/3'>
                        Chez nous, la qualité n’est pas optionnelle, et les solutions adaptées à vos besoins ne le sont pas non plus.
                        Vous trouverez ici des offres conçues pour répondre à tous les projets, des plus simples aux plus ambitieux.
                        Parcourez nos options, choisissez celle qui vous convient le mieux, et laissez-nous transformer vos idées en réalité.
                    </p>
                </div>
                <div id='card-wrapper' className='flex gap-10 flex-wrap justify-center'>
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
