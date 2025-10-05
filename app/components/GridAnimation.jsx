'use client';
import Image from 'next/image'
import d2semImg from '../../public/media/d2sem.png'
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
                        if (video) {
                            video.play().catch(() => {
                                console.log('Video autoplay prevented');
                            });
                        }
                    },

                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [videoRefs])

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
        <div id='pricing' className='h-full w-full flex flex-col items-center justify-center z-[6] pt-24 pb-[50vh]' >
            <div ref={containerRef} className='w-full z-[1] flex flex-col justify-center h-full'>
                <div className='relative w-full h-full flex flex-col mt-[10px] lg:mt-[50px]'>
                    <div className='card-img-container flex flex-col lg:flex-row gap-10 h-full my-4 '>
                        <div ref={el => videoRefs.current[0] = el} className='card-img overflow-hidden'>
                            <Image src={d2semImg} alt="logo de l'entreprise Exotik Digital Studio" className='z-[4]' />

                        </div>
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2 border-b-white border-b">
                            <h2 className=' text-xl lg:text-6xl text-left w-full uppercase tracking-tighter'>D2SEM</h2>
                            <TextReveal classValue="text-black text-[14px] lg:text-[32px]">
                                <p className='flex text-wrap tracking-tighter text-[14px] lg:text-[32px] leading-none'>Nous transformons vos idées en applications web sur mesure, performantes et adaptées à vos besoins. Nous utilisons les dernières technologies pour garantir une expérience utilisateur fluide, sécurisée et accessible sur tous les supports.</p>
                            </TextReveal>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsWeb.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <hr /> */}
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
                        <div className="flex flex-col items-start gap-6 justify-center w-full lg:w-1/2 border-b-white border-b">
                            <h2 className='text-xl lg:text-6xl tracking-tighter'>Le bon plan réunion</h2>
                            <TextReveal classValue="text-black text-[14px] lg:text-[32px]">
                                <p>Donnez vie à vos support grâce à l'art du Motion Design</p>
                            </TextReveal>
                            <div className='flex gap-2 lg:gap-4 flex-wrap'>
                                {tagsMotion.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <hr /> */}

                </div>
            </div>
        </div>
    )
}