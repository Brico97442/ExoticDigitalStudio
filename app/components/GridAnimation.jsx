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
        <div id='pricing' className='h-full w-full min-h-screen flex flex-col items-center justify-center z-[1]' >
            
            <div ref={containerRef} className='w-full z-[1] flex flex-col justify-center h-full'>

                <HackHover data='Services' classValue='text-[210px] uppercase tracking-tighter'/>
                
                <div className='relative w-full h-full flex flex-col gap-4 mt-[50px]'>
                    <div className='card-img-container flex gap-10 h-[50vh] absolute sticky top-0 overflow-hidden'>
                        <div className='card-img overflow-hidden'>
                            <Image ref={el => imageRefs.current[0] = el} src={Img} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-center w-1/2">
                            <h2 className='text-6xl mb-6 text-left w-full uppercase'>Web</h2>
                            <p className='flex text-wrap text-[20px]'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports.</p>
                        </div>
                    </div>
                    
                    <div className='card-img-container  flex gap-10 h-[50vh] absolute sticky top-0 overflow-hidden'>
                        <div className='card-img  overflow-hidden'>
                            <Image ref={el => imageRefs.current[1] = el} src={Img2} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-center w-1/2">
                            <h2 className='text-6xl mb-6 uppercase'>Motion</h2>
                            <p className='flex text-wrap text-left text-[20px]'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports.</p>
                        </div>
                    </div>
                    
                    <div className='card-img-container  flex gap-10 h-[50vh] sticky top-0 overflow-hidden'>
                        <div className='card-img overflow-hidden'>
                            <Image ref={el => imageRefs.current[2] = el} src={Img3} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-center w-1/2">
                            <h2 className='text-6xl mb-6 uppercase'>SEO</h2>
                            <p className='flex text-wrap text-left text-[20px]'>Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nos experts en SEO optimisent votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés.</p>
                        </div>
                    </div>
                    
                    <div className='card-img-container  flex gap-10 justify-end h-[50vh] sticky top-0 overflow-hidden '>
                        <div className='card-img overflow-hidden'>
                            <Image ref={el => imageRefs.current[3] = el} src={Img4} alt='Grid Element' />
                        </div>
                        <div className=" flex flex-col items-start justify-center w-1/2">
                            <h2 className='text-6xl mb-6 uppercase'>Design</h2>
                            <p className='flex text-wrap text-left text-[20px]'>On mélange créativité, et une touche de magie pour que chaque pixel ait du style et chaque clic, du sens</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
