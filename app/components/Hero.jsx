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
      ease: 'power4.inOut',
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
      xPercent: -200,
      opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
      ease: 'power4.inOut',
      duration: 1 ,

      scrollTrigger: {
        trigger: target2.current,
        markers: true,
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
      <div className='h-[100vh] flex flex-col justify-center items-center z-50'>
        <div className='gap-6 flex flex-col' data-speed='0.3'>
          <h1 id='hero-title' className='text-[10vh] z-50  text-[#5F0F40]'>Besoin d'un site web</h1>
          <p id='title-text' className='title-text text-6xl text-[#5F0F40] leading-[1vh] z-50'> <br />à la <span className='text-teal-700 text-6xl font-bold uppercase'>Réunion </span>?</p>
          <button id='hero-button' className='w-full mt-6 text-lg text-white font-bold border-[1px] bg-[#5F0F40] hover:bg-teal-700 max-w-[250px] rounded-lg p-3 z-50'>Nous contacter</button>
        </div>
      </div>
      <div className="flex flex-col h-screen p-56 gap-10 z-50 overflow-hidden">
        {/* <hr className='w-full bg-white h-[2px]'/> */}
        <Lines/>
        <div className='flex gap-10' >
          <div ref={target2} className='w-1/2 flex items-start z-50 justify-center'>
            <video className='bg-neutral-950 z-50'  width={`${100}%`} loop autoPlay muted>
              <source src="/media/motion.mp4" type="video/mp4" />
            </video>
          </div>
          <div className='w-1/2 h-full flex justify-center z-50'>
            <p ref={target} id='target-text' className='flex h-full justify-center leading-normal text-gray-200 text-xl z-50'> Exotik Digital Studio est un studio de design et de création de produits digital spécialisé dans la création de site internet qui place l'utilisateur au coeur d'une expérience unique, localisé au Tampon à l'ile de la réunion. Clairement orienter vers l'UI , l'UX et le motion design </p>
          </div>
        </div>

      </div>
      <TextScroll className='z-50' value="Plonger au coeur de solution web innovante"/>
      <div className="flex h-[250vh]  relative w-full mt-[50vh] z-50"  ref={container}>

        <div className=" parrallaxe flex h-[100vh] w-full top-0 left-0 sticky overflow-hidden z-50 ">
          {
            pictures.map(({ src, scale }, index) => {
              return <motion.div style={{ scale }} transition={{ type: 'inertia', velocity: 450 }} key={index} className="el z-50 flex items-center justify-center h-full w-full top-0 absolute">

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
