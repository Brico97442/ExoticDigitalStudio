'use client'

import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/media/asset1.jpg'
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
  const maskShapeRef = useRef(null)
  const textMaskRef = useRef(null)
  const rectMaskRef = useRef(null)

  const pictures = [
    { src: HeroImg, width: '12.5vw', height: '12.5vh', top: '0vh', left: '0vw', scale: 8, zIndex: 10, filter: 'grayscale(20%)' },
    { src: HeroImg2, width: '20vw', height: '32vh', top: '-9.5vh', left: '-20vw', scale: 6, zIndex: 1, filter: 'grayscale(100%)' },
    { src: HeroImg3, width: '20vw', height: '32vh', top: '9.5vh', left: '20vw', scale: 6, zIndex: 1, filter: 'grayscale(100%)' },
    { src: HeroImg4, width: '40vw', height: '15vh', top: '-18vh', left: '14vw', scale: 6.2, zIndex: 1, filter: 'grayscale(100%)' },
    { src: HeroImg5, width: '40vw', height: '15vh', top: '18vh', left: '-14vw', scale: 6.2, zIndex: 1, filter: 'grayscale(100%)' },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Textes latéraux
      gsap.to('#text-right', {
        xPercent: 100,
        x: 50, // décalage supplémentaire en pixels
        ease: 'power4.inOut',
        duration: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '15% top',
          end: '80% center',
          scrub: 3,
        },
      });
      

      gsap.to('#text-left', {
        xPercent: -100,
        x:-50,
        ease: 'power4.inOut',
        duration: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '15% top',
          end: '80% center',
          scrub: 3,
        },
      })

      gsap.fromTo(
        sectionRef.current,
        {},
        {
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom 100%',
            scrub: 1,
            pin: true,
            markers:false,
          },
        }
      )

      gsap.to(imagesContainerRef.current.children, {
        scale: (index) => pictures[index].scale,
        duration: 2,
        ease: 'linear',
        scrollTrigger: {
          trigger: imagesContainerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 2,
        },
      })

      // Animation de transition du masque rectangle vers texte avec scale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'center bottom',
          scrub: 2,
          markers:true,
        },
      })

      // Réduction du rectangle puis fade vers le texte avec descale
      tl.fromTo(rectMaskRef.current, 
        {
          attr: { 
            width: "100%", 
            height: "100%",
            x: "0%",
            y: "0%"
          }
        },
        { 
          attr: { 
            width: "0%", 
            height: "0%",
            x: "50%",
            y: "50%"
          },
          duration: 10,
          ease: 'power2.inOut'
        }
      )
      .to(rectMaskRef.current, {
        opacity: 0,
        duration: 0.8,
      }, "-=0.1")
      .fromTo(textMaskRef.current, {
        opacity: 0,
        scale: 60,
        transformOrigin: '50% 50%'
      }, {
        opacity: 1,
        scale: 1,
        duration: 10,
        ease: 'power2.inOut'
      }, "-=0.8")
      
    }, sectionRef,containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className='relative flex flex-col h-[400vh]'>
      <div ref={sectionRef} className='sticky flex items-center justify-center h-[100vh] overflow-hidden rounded-none'>
        {/* === SVG Overlay avec masques animés === */}
        <svg className='absolute inset-0 w-full h-full z-[60] pointer-events-none'>
          <defs>
          <mask id='mask-transition'>
              <rect x='0' y='0' width='100%' height='100%' fill='white' />
              
              {/* Masque rectangle (initial) */}
              <rect
                ref={rectMaskRef}
                x='0%' y='0%'
                width='100%' height='100%'
                fill='black'
                style={{ opacity: 1 }}
              />
              
              {/* Masque texte (final) */}
              <g ref={textMaskRef} style={{ opacity: 0 }}>
                <text
                  x='10%' y='40%'
                  textAnchor='start'
                  dominantBaseline='middle'
                  fontSize='8vw'
                  fill='black'
                  fontWeight='bold'
                >
                  OSER
                </text>
                <text
                  x='10%' y='55%'
                  textAnchor='start'
                  dominantBaseline='middle'
                  fontSize='8vw'
                  fill='black'
                  fontWeight='bold'
                >
                  LA DIFFÉRENCE
                </text>
              </g>
            </mask>
          </defs>
          <rect x='0' y='0' width='100%' height='100%' fill='#0E0E0E' mask='url(#mask-transition)' />
        </svg>

        {/* Textes latéraux */}
        <div className='absolute z-[61] flex items-end justify-center w-full h-[100vh] overflow-hidden py-[50px] mx-[50px]'>
          <p id='text-left' className='absolute left-full text-nowrap uppercase mix-blend-difference text-6xl md:text-8xl text-white'>L'attention</p>
          <p id='text-right' className='absolute right-full uppercase mix-blend-difference text-6xl md:text-8xl text-white'>Capter</p>
        </div>

        {/* Contenu animé (images) */}
        <div ref={imagesContainerRef} className='relative z-40 flex items-center justify-center w-full h-full'>
          {pictures.map((picture, index) => (
            <div key={index} className='absolute top-0 flex items-center justify-center w-full h-full' style={{ zIndex: picture.zIndex }}>
              <div
                className='relative z-50'
                style={{
                  width: picture.width,
                  height: picture.height,
                  top: picture.top,
                  left: picture.left,
                  filter: picture.filter || 'none',
                  willChange: 'transform',
                }}
              >
                <Image
                  src={picture.src}
                  alt={`oeuvre photographique ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  placeholder='blur'
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}