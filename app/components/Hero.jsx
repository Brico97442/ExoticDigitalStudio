'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import HeroImg from '../../assets/ia.png'
import HeroImg2 from '../../assets/portrait2.jpg'
import HeroImg3 from '../../assets/portrait.jpg'
import HeroImg4 from '../../assets/portrait3.jpg'
import { useScroll, useTransform, motion } from 'framer-motion'
import gsap from 'gsap'
import TextScroll from './TextScroll'


export default function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [0.9, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [0.7, 4]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [0.8, 4]);


  useEffect(() => {
    gsap.fromTo(['#hero-title', '#title-text'], {
      y: 200,
      opacity: 0,
      bottom: 0
    },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
      });
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
    <div className='w-full bg-[#FFECD1]'>
      <div className='h-[100vh] flex flex-col justify-center items-center gap-3'>
        <h1 id='hero-title' className='p-36 text-[10vh] text-[#5F0F40] leading-none'>Besoin d'un site web <span className='text-6xl '> <br />à la <span className=' text-teal-700 text-6xl font-bold uppercase'> Réunion </span>?</span>
        </h1>
        <button className='w-full text-lg text-white font-bold border-[1px] bg-[#5F0F40] hover:bg-teal-700 max-w-[250px] rounded-lg p-3 z-10'>En savoir plus</button>

      </div>
      <TextScroll value="Réimaginer l'expérience du web"/>
      <div className="flex h-[300vh]  relative w-full mt-[50vh]" ref={container}>
        <div className=" parrallaxe flex flex-col h-[100vh] w-full top-0 left-0 sticky overflow-hidden ">
          {
            pictures.map(({ src, scale }, index) => {
              return <motion.div style={{ scale }} transition={{ type: 'inertia', velocity: 450 }} key={index} className="el flex items-center justify-center h-full w-full top-0 absolute">
                <div className="relative w-[25vw] h-[25vh] image-container">
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
