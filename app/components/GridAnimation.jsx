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
                    scrub: 2,
                    markers: false
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div id='pricing' className='container h-full min-h-screen w-full flex flex-col m-auto items-center justify-center z-[1]' >
            <div ref={containerRef} className='w-full z-[1] flex flex-col justify-center'>
                <HackHover  data='Nos Prestations'  classValue='text-[120px] text-left'/>
                <div className=' relative w-full h-full m-auto'>
                    <div className='card-img-container h-[90vh] absolute sticky top-0 border-black border-solid border-[1px] '>
                        <div className='card-img justify-end w-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[0] = el} src={Img} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-center w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Web Site & Co</p>
                            <p className='flex text-wrap w-1/2'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                        </div>
                    </div>
                    <div className='card-img-container justify-end h-[90vh] absolute sticky top-0 border-black border-solid border-[1px] border-red'>
                        <div className=" flex flex-col items-end  justify-between w-1/2 pr-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Refonte Site Web</p>
                            <p className='flex text-wrap w-1/2 text-right'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                        </div>
                        <div className='card-img justify-start W-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[1] = el} src={Img2} alt='Grid Element' />
                        </div>
                    </div>
                    <div className='card-img-container h-[90vh] sticky top-0 border-black border-solid border-[1px] border-red'>
                        <div className='card-img justify-end w-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[2] = el} src={Img3} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start  justify-between w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Référencement <br/> Web SEO</p>
                            <p className='flex text-wrap w-1/2'>Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nos experts en SEO optimisent votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés. Vous aussi reservez votre audit SEO, nous mettons en œuvre les meilleures pratiques pour assurer une croissance durable de votre trafic. Ne laissez pas votre site passer inaperçu : optez pour un référencement web performant et faites de votre présence en ligne un véritable atout.</p>
                        </div>
                    </div>
                    <div className='card-img-container justify-end h-[90vh] sticky top-0 border-black border-solid border-[1px] border-red'>
                        <div className=" flex flex-col items-end justify-between w-1/2 pr-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Design Web</p>
                            <p className='flex text-wrap w-1/2 text-right'>   On mélange créativité,  et une touche de magie pour que chaque pixel ait du style et chaque clic, du sens.. Et parce qu’on aime bien faire les choses en grand, on vous livre un design qui reflète non seulement votre identité, mais qui fera aussi jalouser la concurrence. Beau, fonctionnel, mémorable… que demander de plus ? Que vous ayez besoin d’un look minimaliste, d’une touche d’audace, ou d’un design qui fait tourner les têtes, on s’occupe de tout. Avec nous, votre site sera aussi agréable à regarder qu’à utiliser. Parce qu’au final, un bon design, c’est un peu comme une bonne tenue : ça change tout.</p>
                        </div>
                        <div className='card-img overflow-hidden w-1/2'>
                            <Image ref={el => imageRefs.current[3] = el} src={Img4} alt='Grid Element' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
