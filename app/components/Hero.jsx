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
import { ScrollTrigger } from 'gsap/all';
import Lines from './Lines'
import Magnetic from '../utils/Magnetic'

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
        duration: .2,
        stagger: 0.2,
        delay: 6,
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
        duration: .3,
        stagger: 0.2,
        delay: 6.3,
        zIndex: 2
      });

    // ScrollTrigger.create({
    //   trigger: target.current,
    //   start: 'top center',
    //   endTrigger: 'body',
    //   end: '+=300',
    //   scrub: 1,
    //   toggleActions:"restart none reverse none",
    //   markers: true, // Epingler l'objet à la cible
    //   onEnter: () => {
    //     gsap.from(target.current.position, {
    //       x: -200,
    //       duration: 3,
    //       ease: 'power4.inOut',
    //     });
    //   },
    //   onLeaveBack: () => {
    //     gsap.to(target.current.position, {
    //       x: 0,
    //       duration: 1.5,
    //       ease: 'power4.inOut',
    //       scrub:1,
    //     });
    //   },

    // });
    gsap.fromTo(target.current, {
      xPercent: 200,
      opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
      duration: 1,

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
      duration: 1,
      delay: 1,

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

    <div id='hero' className='hero w-full'>
      <div className='h-[100vh] flex flex-col justify-center items-center'>
        <div className='gap-6 flex flex-col' data-speed='0.3'>
          <h1 id='hero-title' className='text-[10vh] uppercase bg-clip-text text-transparent bg-gradient-to-r from-violet-200/80 to-teal-100/80'>Solution web</h1>
          <p id='title-text' className='title-text text-6xl leading-[1vh]'> <br />à la <span className='text-6xl font-bold uppercase'>Réunion</span></p>
          <button id='hero-button' className='w-full mt-6 text-lg text-white font-bold bg-[#5F0F40]/15 hover:bg-teal-700 max-w-[250px] rounded-lg p-2'>Nous contacter</button>
        </div>
      </div>

      <div className="flex flex-col h-screen p-56 gap-10 overflow-hidden z-[3]">
        {/* <div className='rounded-full font-bold bg-[#5F0F40]/40 hover:bg-teal-700/50 shadow-xl w-full h-full w-40 h-40 fixed bottom-0 right-0 justify-center mr-40 mb-40 flex items-center' ><p>Nous contacter </p></div> */}
        {/* <hr className='w-full bg-white h-[2px]'/> */}
        <Lines />
        <div className='flex flex-col z-[3]' >
          <div className='flex gap-10 z-[3]'> 
            <TextScroll className=' text-2xl leading-none' value="Exotik Digital Studio est un studio de design et de création de produits digital spécialisé dans la création de site internet qui place l'utilisateur au coeur d'une expérience unique axée sur l'UI, l'UX et le motion design, localisé au Tampon à l'ile de la réunion." />
            {/* <div ref={target2} id='video-target' className='w-1/2 flex items-start justify-center overflow-hidden'>
              <video width={`${100}%`} height={`${100}%`} loop autoPlay muted>
              <source src="/media/motion.mp4" type="video/mp4" />
            </video>
            </div> */}
            <div className='w-1/2 h-full flex justify-center'>
              <p ref={target} id='target-text' className='flex h-full justify-center leading-normal text-gray-200 text-xl'>Exotik Digital Studio est un studio de design et de création de produits digital spécialisé dans la création de site internet qui place l'utilisateur au coeur d'une expérience unique axée sur l'UI, l'UX et le motion design, localisé au Tampon à l'ile de la réunion.</p>
            </div>
          </div>
        <TextScroll className="z-3" value="Plonger au coeur de solution web innovante" />
        </div>

      </div>
      <div className="flex h-[250vh] z-[3] relative w-full mt-[50vh]" ref={container}>

        <div className=" parrallaxe flex h-[100vh] w-full top-0 left-0 sticky overflow-hidden">
          {
            pictures.map(({ src, scale }, index) => {
              return <motion.div style={{ scale }} transition={{ type: 'inertia', velocity: 500 }} key={index} className="el flex items-center justify-center h-full w-full top-0 absolute">

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
