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

    const pictures = [
        { src: HeroImg, width: '12.5vw', height: '12.5vh', top: '0%', left: '0px', scale: 8, zIndex: 10, filter: 'grayscale(100%)' },
        { src: HeroImg2, width: '20vw', height: '32vh', top: '-86px', left: '-20vw', scale: 6, zIndex: 1 },
        { src: HeroImg3, width: '20vw', height: '32vh', top: '86px', left: '20vw', scale: 5, zIndex: 1 },
        { src: HeroImg4, width: '40vw', height: '15vh', top: '-18vh', left: '14vw', scale: 4, zIndex: 1 },
        { src: HeroImg5, width: '40vw', height: '15vh', top: '18vh', left: '-14vw', scale: 7, zIndex: 1 },
    ]

    useEffect(() => {
        // Créer une animation pour que toutes les images changent de taille simultanément
        gsap.to(imagesContainerRef.current.children, {
            scale: (index, target) => pictures[index].scale,  // Appliquer la valeur de scale spécifique à chaque image
            duration: 2,  
            ease: "linear",  // Courbe d'assouplissement
            scrollTrigger: {
                trigger: containerRef.current,
                start: "35% 49%",
                end: "48% 50%",
                scrub: 2,
                markers: true,
            },
        })
        const grayscaleImage = imagesContainerRef.current.children[1] 
        gsap.to(grayscaleImage.current, {
            filter: 'grayscale(0%)',  // Animer pour faire disparaître le filtre
            scrollTrigger: {
                trigger: containerRef.current,
                start: "50% 49%",
                end: "50% 50%",  // Point de fin de l'animation
                scrub: 2,          // Synchroniser avec le défilement
            },
        })
    }, [])

    return (
        <div className='sticky z-[1] h-[250vh] relative flex flex-col justify-center  ' ref={containerRef}>
            <div className=' top-0  h-[100vh] flex items-center overflow-hidden'>
                <div className='h-full w-full relative flex items-center justify-center pt-[0vh] ' ref={imagesContainerRef}>
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
                                    style={{ objectFit: 'cover' }}
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
