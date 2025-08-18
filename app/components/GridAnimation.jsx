'use client';

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HackHover from './HackHoverEffect';
import TextScroll from './TextScroll';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger)

const tagsWeb = ["Kap numérik", "Wordpress solution", "Site internet"];
const tagsMotion = ["Animation Logo", "After Effects", "Motion Design"];

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
        <div id='pricing' className='h-full w-full min-h-screen flex flex-col items-center justify-center z-[6] bg-gry-200 pt-24' >
            <div ref={containerRef} className='w-full z-[1] flex flex-col justify-center h-full'>
                <div className='relative w-full h-full flex flex-col mt-[10px] lg:mt-[50px]'>
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full my-4 '>
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
                            <h2 className=' text-xl lg:text-6xl text-left w-full uppercase tracking-tighter'>D2SEM</h2>
                            {/* <p className='flex text-wrap tracking-tighter text-[14px] lg:text-[32px]'>Nous transformons vos idées en applications web sur mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports.</p> */}
                            <TextScroll classValue="text-black text-[14px] lg:text-[32px]" value="Nous transformons vos idées en applications web sur mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports."/>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsWeb.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full overflow-hidden my-4 '>
                        <div ref={el => videoRefs.current[1] = el} className='card-img overflow-hidden'>
                            <video
                                src="/media/LeBonPlan.mp4"
                                preload="metadata"
                                autoPlay
                                muted
                                playsInline
                                className='w-full h-full object-cover'
                                loading="lazy"

                            />
                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2">
                            <h2 className='text-xl lg:text-6xl tracking-tighter'>Le bon plan réunion</h2>
                            {/* <p className='flex text-wrap text-left tracking-tighter text-[14px] lg:text-[32px]'>Donnez vie à vos support grâce à l'art du Motion Design</p> */}
                            <TextScroll classValue="text-black text-[14px] lg:text-[32px]" value="Donnez vie à vos support grâce à l'art du Motion Design"/>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsMotion.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    
                </div>
            </div>
        </div>
    )
}