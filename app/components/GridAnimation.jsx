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
import Button from './Button';

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
                <div className=' relative w-full h-full m-auto flex flex-col gap-10'>
                    <div className='card-img-container h-[80vh] absolute sticky top-0 border-black border-solid border-[1px] rounded-3xl overflow-hidden p-[40px] bg-gray-500/70'>
                        <div className='card-img justify-end w-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[0] = el} src={Img} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-between w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Web Site & Co</p>
                            <p className='flex text-wrap w-1/2 text-[20px]'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                            <Button />
                        </div>
                    </div>
                    <div className='card-img-container justify-end h-[80vh] absolute sticky top-0 border-black border-solid border-[1px] rounded-3xl overflow-hidden p-[40px]'>
                        <div className=" flex flex-col items-start  justify-between w-1/2 pr-10 mb-6 mt-10 ">
                            <p className='text-6xl font-bold mb-6'>Refonte Site Web</p>
                            <p className='flex text-wrap text-right text-[20px]'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports. Confiez-nous la conception de votre application web et bénéficiez d'une solution évolutive, pensée pour accompagner la croissance de votre entreprise.</p>
                            <Button />
                        </div>
                        <div className='card-img justify-start W-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[1] = el} src={Img2} alt='Grid Element' />
                        </div>
                    </div>
                    <div className='card-img-container h-[80vh] sticky top-0 border-black border-solid border-[1px] rounded-3xl overflow-hidden p-[40px]'>
                        <div className='card-img justify-end w-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[2] = el} src={Img3} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start  justify-between w-1/2 pl-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Référencement <br/> Web SEO</p>
                            <p className='flex text-wrap text-[20px]'>Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nos experts en SEO optimisent votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés. Vous aussi reservez votre audit SEO, nous mettons en œuvre les meilleures pratiques pour assurer une croissance durable de votre trafic. Ne laissez pas votre site passer inaperçu : optez pour un référencement web performant et faites de votre présence en ligne un véritable atout.</p>
                            <Button />

                        </div>
                    </div>
                    <div className='card-img-container justify-end h-[80vh] sticky top-0 border-black border-solid border-[1px] rounded-3xl overflow-hidden p-[40px]'>
                        <div className=" flex flex-col items-start justify-between w-1/2 pr-10 mb-6 mt-10">
                            <p className='text-6xl font-bold mb-6'>Design Web</p>
                            <p className='flex text-wrap w-1/2 text-right text-[20px]'>   On mélange créativité,  et une touche de magie pour que chaque pixel ait du style et chaque clic, du sens</p>
                            <Button/>
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
