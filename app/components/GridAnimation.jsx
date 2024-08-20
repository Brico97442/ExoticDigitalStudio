'use client';

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Img from '../../public/media/galerie-item-2.jpg'
import Img2 from '../../public/media/galerie-item-3.jpg'
import Img3 from '../../public/media/galerie-item-4.jpg'
import Img4 from '../../public/media/galerie-item-5.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function GridAnimation() {
    const containerRef = useRef(null)
    const imageRefs = useRef([])

    useEffect(() => {
        const images = imageRefs.current.filter(Boolean)

        images.forEach((img, index) => {
            const isReverse = index === 2 || index === 4 || index=== 0

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
                duration: 2,
                scrollTrigger: {
                    trigger: img,
                    start: 'top 50%', // Ajuste le déclencheur pour une meilleure visibilité
                    end: 'bottom 80%',
                    scrub: 1,
                    markers: true
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div id='pricing' className='container h-full w-full flex flex-col items-center justify-center z-[1] m-auto'>
            <div ref={containerRef} className='w-[85vw] m-auto mt-60'>
                <div className='w-full'>
                    <div className='card-img-container'>
                        <div className='card-img justify-end overflow-hidden'>
                            <Image ref={el => imageRefs.current[0] = el} src={Img} alt='Grid Element' />
                        </div>
                        <p>Title</p>
                    </div>
                    <div className='card-img-container justify-end'>
                        <p>Title</p>
                        <div className='card-img justify-start h-1/2 overflow-hidden'>
                            <Image ref={el => imageRefs.current[1] = el} src={Img2} alt='Grid Element'/>
                        </div>
                    </div>
                    <div className='card-img-container'>
                        <div className='card-img justify-end overflow-hidden'>
                            <Image ref={el => imageRefs.current[2] = el} src={Img3} alt='Grid Element'/>
                        </div>
                        <p>Title</p>
                    </div>
                    <div className='card-img-container justify-end'>
                        <p>Title</p>
                        <div className='card-img overflow-hidden'>
                            <Image ref={el => imageRefs.current[3] = el} src={Img4} alt='Grid Element' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
