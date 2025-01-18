'use client';

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HackHover from './hackHoverEffect';

gsap.registerPlugin(ScrollTrigger)

const tagsWeb = ["Création application web", "Wordpress solution", "Webflow solution", "Création site internet"];
const tagsMotion = ["Animation Logo", "GSAP animation", "Motion Design"];
const tagsSEO = ["Optimisation Seo", "Google Analytics", "Google my bisness", "Content Marketing"];
const tagsDesign = ["Création de maquette web", "UI Design", "UX Design"];

export default function GridAnimation() {
    const containerRef = useRef(null)
    const videoRefs = useRef([])

    useEffect(() => {
        const videos = videoRefs.current.filter(Boolean)

        videos.forEach((videoContainer, index) => {
            const isReverse = index === 2 || index === 4 || index === 0
            const video = videoContainer.querySelector('video')

            // Initial state
            gsap.set(videoContainer, {
                clipPath: isReverse
                    ? 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' // Start from the right
                    : 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)', // Start from the left
            })

            // Animation
            gsap.to(videoContainer, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Full reveal
                ease: 'ease-in-out',
                duration: 4,
                scrollTrigger: {
                    trigger: videoContainer,
                    start: 'top 50%',
                    end: 'bottom 80%',
                    scrub: 2,
                    markers: false,
                    onEnter: () => {
                        video.play().catch(() => {
                            console.log('Video autoplay prevented');
                        });
                    },
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const Tag = ({ text }) => {
        return (
            <div className='flex flex-wrap'>
                <div className='flex justify-center tracking-tighter items-center text-[12px] lg:text-[18px] min-w-[40px] lg:min-w-[200px] h-6 lg:h-10 whitespace-nowrap rounded-full border-black border-[2px] p-2'>
                {text}
            </div>
            </div>
            
        )
    }

    return (
        <div id='pricing' className='h-full w-full min-h-screen flex flex-col items-center justify-center z-[6]' >
            <div ref={containerRef} className='w-full z-[1] flex flex-col justify-center h-full'>
                <HackHover data='Nos Services' classValue='text-[32px] lg:text-[210px] tracking-tighter subpixel-antialiased' />

                <div className='relative w-full h-full flex flex-col mt-[50px]'>
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full my-4 bg-blue-400'>
                        <div ref={el => videoRefs.current[0] = el} className='card-img overflow-hidden'>
                            <video
                                src="/media/web.mp4"
                                preload="metadata"
                                autoPlay
                                muted
                                playsInline
                                className='w-full h-full object-cover'
                                loading="lazy"

                            />
                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2">
                            <h2 className=' text-xl lg:text-6xl text-left w-full uppercase'>Web</h2>
                            <p className='flex text-wrap tracking-tighter text-[14px] lg:text-[20px]'>Nous transformons vos idées en applications web sur-mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports.</p>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsWeb.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full overflow-hidden my-4 bg-blue-500'>
                        <div ref={el => videoRefs.current[1] = el} className='card-img overflow-hidden'>
                            <video
                                src="/media/motion_design.mp4"
                                preload="metadata"
                                autoPlay
                                muted
                                playsInline
                                className='w-full h-full object-cover'
                                loading="lazy"

                            />
                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2">
                            <h2 className='text-xl lg:text-6xl uppercase'>Motion Design</h2>
                            <p className='flex text-wrap text-left tracking-tighter text-[14px] lg:text-[20px]'>Donnez vie à vos support grâce à l'art du Motion Design</p>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsMotion.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full overflow-hidden my-4 bg-blue-600'>
                        <div ref={el => videoRefs.current[2] = el} className='card-img overflow-hidden'>
                            <video
                                src="/media/seo.mp4"
                                preload="metadata"
                                autoPlay
                                muted
                                playsInline
                                className='w-full h-full object-cover'
                                loading="lazy"

                            />
                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2">
                            <h2 className='text-xl lg:text-6xl uppercase'>SEO</h2>
                            <p className='flex text-wrap text-left tracking-tighter text-[14px] lg:text-[20px]'>Augmentez votre visibilité sur les moteurs de recherche grâce à notre service de référencement web. Nous optimisons votre site pour qu'il se positionne en tête des résultats de recherche, attirant ainsi plus de visiteurs qualifiés.</p>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsSEO.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 justify-end h-full overflow-hidden my-4'>
                        <div ref={el => videoRefs.current[3] = el} className='card-img overflow-hidden'>
                            <video
                                src="/media/design.mp4"
                                preload="metadata"
                                autoPlay
                                muted
                                playsInline
                                className='w-full h-full object-cover'
                                loading="lazy"

                            />
                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2">
                            <h2 className='text-xl lg:text-6xl uppercase'>Design</h2>
                            <p className='flex text-wrap text-left text-[14px] lg:text-[20px] tracking-tighter'>On mélange créativité, et une touche de magie pour que chaque pixel ait du style et chaque clic, du sens</p>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsDesign.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}