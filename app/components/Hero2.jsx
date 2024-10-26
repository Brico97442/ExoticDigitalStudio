'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/media/art1.jpg'
import HeroImg2 from '../../public/media/art2.jpg'
import HeroImg3 from '../../public/media/art3.jpg'
import HeroImg4 from '../../public/media/art4.jpg'
import HeroImg5 from '../../public/media/art5.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const containerRef = useRef(null)
    const imagesContainerRef = useRef(null)
    const sectionRef = useRef(null)

    const pictures = [
        { src: HeroImg, width: '12.5vw', height: '12.5vh', top: '0%', left: '0px', scale: 8, zIndex: 10, filter: 'grayscale(100%)' },
        { src: HeroImg2, width: '20vw', height: '32vh', top: '-9.5vh', left: '-20vw', scale: 6, zIndex: 1 },
        { src: HeroImg3, width: '20vw', height: '32vh', top: '86px', left: '20vw', scale: 6, zIndex: 1 },
        { src: HeroImg4, width: '40vw', height: '15vh', top: '-18vh', left: '14vw', scale: 6.2, zIndex: 1 },
        { src: HeroImg5, width: '40vw', height: '15vh', top: '18vh', left: '-14vw', scale: 6.2, zIndex: 1 },
    ]

    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
        }, {
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
                markers: false,
            }
        });

        
        //Créer une animation pour que toutes les images changent de taille simultanément
        gsap.to(imagesContainerRef.current.children, {
            scale: (index, target) => pictures[index].scale,  // Appliquer la valeur de scale spécifique à chaque image
            duration: 2,  
            ease: "linear",  // Courbe d'assouplissement
            scrollTrigger: {
                trigger: imagesContainerRef.current,
                start: "center center",
                end: "bottom 50%",
                scrub: 2,
                markers: false,
            },
        })
        
        return () => {
            pin.kill();
        };
       
    }, [])

    return (
        <div className='h-[200vh] relative flex flex-col' ref={containerRef}>
            <div className='h-[100vh] flex items-center justify-center' ref={sectionRef}>
                <div className='h-full w-full relative flex items-center justify-center' ref={imagesContainerRef}>
                    {pictures.map((picture, index) => (
                        <div className='flex items-center justify-center h-full w-full top-0 absolute' key={index} style={{ zIndex: picture.zIndex }} >
                            <div
                                className='image-container relative'
                                style={{
                                    width: picture.width,
                                    height: picture.height,
                                    top: picture.top,
                                    left: picture.left,
                                    filter: picture.filter || 'none'  // Appliquer le filtre si défini, sinon aucun filtre

                                }}
                            >
                                <Image
                                    src={picture.src}
                                    alt={`oeuvre photographique ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover'}}
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
