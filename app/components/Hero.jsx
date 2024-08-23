'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/media/galerie-item-1.jpg'
import HeroImg2 from '../../public/media/galerie-item-2.jpg'
import HeroImg3 from '../../public/media/galerie-item-3.jpg'
import HeroImg4 from '../../public/media/galerie-item-4.jpg'
import HorizontalScroll from './HorizontalScrollReverse'
import { useScroll, useTransform, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger)

export default function Hero({ }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [0.9, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [0.7, 4]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);

  const target = useRef(null)
  const target2 = useRef(null)


  useEffect(() => {
    gsap.fromTo(['#hero-title'], {
      y: 200,
      opacity: 0,
      bottom: 0
    },
      {
        y: 0,
        opacity: 1,
        ease: "power4.inOut",
        visibility: "visible",
        duration: 2,
        stagger: 0.2,
        delay: 1,
        zIndex: 2
      });

    gsap.fromTo(['.title-text', '#hero-button'], {
      x: -200,
      opacity: 0,
      bottom: 0
    },
      {
        x: 0,
        opacity: 1,
        ease: "power4.inOut",
        visibility: "visible",
        duration: 2,
        stagger: 0.2,
        delay: 2,
        zIndex: 2
      });

    gsap.fromTo(target.current, {
      xPercent: 200,
      opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
      duration: 2,

      scrollTrigger: {
        trigger: target.current,
        markers: false,
        start: '-50% 50% ',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    }
    )
    gsap.fromTo(target2.current, {
      translateZ: `${100}vh`,
      opacity: 0,
    }, {
      translateZ: `${0}vh`,
      opacity: 1,
      ease: 'power4.inOut',
      duration: 2,

      scrollTrigger: {
        trigger: target2.current,
        markers: false,
        start: '-50% 50% ',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    })
  }, []);


  const pictures = [
    {
      src: HeroImg,
      scale: scale4
    },
    {
      src: HeroImg2,
      scale: scale5
    },
    {
      src: HeroImg3,
      scale: scale6
    },
    {
      src: HeroImg4,
      scale: scale7
    },

  ]
  return (

    <div id='hero' className='hero flex flex-col justify-center w-full text-white bg-black sticky z-[5]'>
        {/* <HorizontalScroll/> */}
      <div className='h-screen flex w-full z-[3]'>
        <div className=' w-full max-w-[85vw] flex justify-end items-center '>
        <h2 className='text-[4em] w-1/2 leading-none text-right' >Créez le Futur du Web Innovation, Design et Magie Numérique</h2>
        </div>
      </div>
      <div className="flex h-[250vh] z-[3] relative w-full" ref={container}>
        <div className=" parrallaxe flex h-[100vh] w-full top-0 left-0 sticky overflow-hidden ">
          {
            pictures.map(({ src, scale }, index) => {
              return <motion.div style={{ scale }} transition={{ type: 'inertia', velocity: 200 }} key={index} className="el flex items-center justify-center h-full w-full top-0 absolute grayscale">
                <div className="relative w-[25vw] h-[25vh] image-container ">
                  <Image
                    src={src}
                    alt="oeuvre photographique d'une femme"
                    fill
                    placeholder="blur"
                  />
                </div>
              </motion.div>
            })
          }
        </div>

      </div>
    </div>
  );
}
