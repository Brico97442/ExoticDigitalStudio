'use client';

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Img from '../../public/media/galerie-item-2.jpg'
import Img2 from '../../public/media/galerie-item-3.jpg'
import Img3 from '../../public/media/galerie-item-4.jpg'
import Img4 from '../../public/media/galerie-item-5.jpg'
import HackHover from './hackHoverEffect';

gsap.registerPlugin(ScrollTrigger)

export default function GridAnimation() {
    const containerRef = useRef(null)
    const imageRefs = useRef([])

    useEffect(() => {
        const images = imageRefs.current.filter(Boolean)

        images.forEach((img, index) => {
            const isReverse = index === 2 || index === 4 || index === 0

            // Initial state
            gsap.set(img, {
                clipPath: isReverse
                    ? 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' // Start from the right
                    : 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)', // Start from the left
            })

            // Animation
            gsap.to(img, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Full reveal
                ease: 'ease-in-out',
                duration: 6,
                scrollTrigger: {
                    trigger: img,
                    start: 'top 50%', // Ajuste le déclencheur pour une meilleure visibilité
                    end: 'bottom 80%',
                    scrub: 1,
                    markers: false
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div id='pricing' className='container h-full  min-h-screen w-full flex flex-col items-center justify-center m-auto z-[1]' >
            <div ref={containerRef} className='w-[80vw] m-auto  z-[1]'>
                <HackHover  data='Nos Prestations'  classValue='text-[120px] text-left pb-[20px]'/>
                <div className='w-full'>
                    <div className='card-img-container'>
                        <div className='card-img justify-end overflow-hidden'>
                            <Image ref={el => imageRefs.current[0] = el} src={Img} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-between w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-4xl font-bold mb-6'>Web Site & Co</p>
                            <p className='flex text-wrap w-1/2'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Que vous ayez besoin d'une plateforme de e-commerce, d'un portail collaboratif ou d'une application métier, notre équipe d'experts en développement web est à votre service. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                        </div>

                    </div>
                    <div className='card-img-container justify-end'>
                        <div className=" flex flex-col items-end  justify-between w-1/2 pr-10 mb-6 mt-10">
                            <p className='text-4xl font-bold mb-6'>Refonte Site Web</p>
                            <p className='flex text-wrap w-1/2 text-right'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Que vous ayez besoin d'une plateforme de e-commerce, d'un portail collaboratif ou d'une application métier, notre équipe d'experts en développement web est à votre service. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                        </div>
                        <div className='card-img justify-start h-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[1] = el} src={Img2} alt='Grid Element' />
                        </div>
                    </div>
                    <div className='card-img-container'>
                        <div className='card-img justify-end overflow-hidden'>
                            <Image ref={el => imageRefs.current[2] = el} src={Img3} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start  justify-between w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-4xl font-bold mb-6'>Référencement Web et SEO</p>
                            <p className='flex text-wrap w-1/2'>Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nos experts en SEO optimisent votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés. De l'audit SEO à la stratégie de contenu, en passant par l'optimisation technique et la création de backlinks, nous mettons en œuvre les meilleures pratiques pour assurer une croissance durable de votre trafic organique. Ne laissez pas votre site passer inaperçu : optez pour un référencement web performant et faites de votre présence en ligne un véritable atout.</p>
                        </div>
                    </div>
                    <div className='card-img-container justify-end'>
                        <div className=" flex flex-col items-end justify-between w-1/2 pr-10 mb-6 mt-10">
                            <p className='text-4xl font-bold mb-6'>Design Web</p>
                            <p className='flex text-wrap w-1/2 text-right'>votre site devait participer à un concours de beauté, il serait temps de lui offrir un petit relooking. Notre mission ? Créer un design qui ne se contente pas d’être joli, mais qui fait aussi le boulot. On marie l’esthétique à la fonctionnalité pour que chaque pixel ait du style et chaque clic, du sens. On mélange créativité, esthétique, et une touche de magie pour donner vie à vos idées les plus ambitieuses. Et parce qu’on aime bien faire les choses en grand, on vous livre un design qui reflète non seulement votre identité, mais qui fera aussi jalouser la concurrence. Beau, fonctionnel, mémorable… que demander de plus ? Que vous ayez besoin d’un look minimaliste, d’une touche d’audace, ou d’un design qui fait tourner les têtes, on s’occupe de tout. Avec nous, votre site sera aussi agréable à regarder qu’à utiliser. Parce qu’au final, un bon design, c’est un peu comme une bonne tenue : ça change tout.</p>
                        </div>
                        <div className='card-img overflow-hidden'>
                            <Image ref={el => imageRefs.current[3] = el} src={Img4} alt='Grid Element' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
