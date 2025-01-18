'use client'

import Hero2 from "./components/Hero2";
import Lenis from 'lenis';
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'
import Lines from './components/Lines'
import ContactForm from './components/ContactForm'
import TextReveal from "./components/TextReveal";
import GridAnimation from "./components/GridAnimation";
import HorizontalScroll from "./components/HorizontalScroll";
import HorizontalScrollReverse from "./components/HorizontalScrollReverse";
import Button from "./components/Button";
import { animateAbout, animateAboutText, animateHero } from "./utils/animation";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HackHover from './components/hackHoverEffect'
import { animateTextSimple } from './utils/textAnimation';
import { useLoader } from './context/animationContext';
import Arrow from '../assets/arrow.png'


gsap.registerPlugin(ScrollTrigger)

import gsap from "gsap";
import TextScroll from "./components/TextScroll";
import Link from "next/link";
const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
  const island = useRef(null);
  const targetRef = useRef(null);
  const arrowRef = useRef(null);
  const aboutRef = useRef(null);
  const textScroll = useRef(null);
  const heroSection = useRef(null)


  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    animateAbout()
    animateAboutText()



    // if (arrowRef.current && textScroll.current) {
    //   animateHero(arrowRef, textScroll);
    //   const tl = gsap.timeline();

    //   tl.fromTo(
    //     textScroll.current,
    //     {
    //       opacity: 0,
    //     },
    //     {
    //       opacity: 1,
    //       duration: 1,
    //       ease: "power2.in",
    //       delay: 11.5,
    //       yoyo: true
    //     }
    //   );

    //   tl.fromTo(
    //     textScroll.current,
    //     { opacity: 1 },
    //     {
    //       opacity: 0,
    //       duration: 2,
    //       ease: "power2.in",
    //       delay: 0.4,
    //       scrollTrigger: {
    //         trigger: '#hero',
    //         start: "top top",
    //         end: "45% 40%",
    //         scrub: 1,
    //         markers: false,
    //       }
    //     }
    //   );


    //   return () => {
    //     tl.kill();
    //   };
    // }
    return () => {
      cancelAnimationFrame(raf);
    };

  }, [arrowRef, textScroll]);



  return (
    <main id="main" className="flex w-full h-full relative min-h-screen flex-col ">
      <div className="z-[1] flex w-full h-full min-h-screen flex-col relative">
        <Scene island={island} />
        <div ref={heroSection} id='hero' className='h-screen sticky w-full flex flex-col  items-center top-0 z-[6]'>
          <div className='h-screen flex flex-col items-start justify-between w-full px-[10px] lg:px-[50px] pt-[20px] lg:pt-[100px] relative'>
            <h2 id='hero-subtitle' className=' pointer-events-none mt-[50px] leading-none text-[1.4rem] w-full tracking-tighter lg:w-1/4 lg:text-[31px] lg:mt-[40px] '>Offrez à vos visiteurs une expérience web captivante, parce que chaque clic mérite sa touche de magie.</h2>
            <h1 id='hero-title' className='absolute right-[20px] bottom-[20px] pointer-events-none leading-none text-[1rem] font-bold-sm tracking-tighter lg:bottom-[20px] lg:right-[50px] bg-red-500 p-1'>Reunion Island Digital Studio </h1>
            {/* <svg ref={arrowRef} className="ml-[10px] mb-[20vh]" width="30" height="24" viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.0607 13.0607C46.6464 12.4749 46.6464 11.5251 46.0607 10.9393L36.5147 1.3934C35.9289 0.807612 34.9792 0.807612 34.3934 1.3934C33.8076 1.97918 33.8076 2.92893 34.3934 3.51472L42.8787 12L34.3934 20.4853C33.8076 21.0711 33.8076 22.0208 34.3934 22.6066C34.9792 23.1924 35.9289 23.1924 36.5147 22.6066L46.0607 13.0607ZM0 13.5H45V10.5H0V13.5Z" fill="black" />
            </svg> */}
             <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="h-[5vh] w-auto"
              />
            {/* <div ref={textScroll} className="absolute text-[18px] bottom-0 flex justify-center items-end fixed w-full h-screen ">
              <span className="w-[1px] bg-gradient-to-b from-black from-10% via-transparent via-30% to-[#666666] to-90% h-[8vh] absolute" >
              </span>
              <p className="mb-[32px]">Scrollez pour découvrir</p>
            </div> */}
            <div className=" absolute right-0 bottom-[15vh] flex flex-col items-end justify-center mr-[10px] lg:mr-[50px]  ">
              <div id="coordinates-gps" className="flex flex-col items-end text-[0.8rem] tracking-tighter leaading-none">
                <p>21° 16' 41″ S </p>
                <p>55° 30' 55″ E</p>
              </div>
            </div>
            <h2 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} id='studio-text' className='pointer-events-none leading-none text-[1rem] font-bold-sm tracking-tighter text-black mb-[20px] lg:mr-[50px] mb-[50px]'>Créateur de solutions digitales</h2>
          </div>
          <HorizontalScroll />
        </div>
        <div id="about" ref={aboutRef} className="sticky top-0 h-screen px-[50px] py-[50px] flex flex-col justify-center z-[2] bg-red-500">
          <div className=" flex flex-col w-full h-full">
            <div className='h-full flex flex-col justify-between z-[4]'>
              {/* <HackHover data='Qui sommes nous ?' classValue='text-[120px] uppercase' /> */}
              {/* <h1 id="about-title" className="text-[28px] leading-none uppercase tracking-tighter  z-[4] lg:text-[210px] ">Qui sommes <br />nous ?</h1> */}
              {/* <div className="w-full flex justify-end">
                <p ref={targetRef} id='target-text' className='pointer-events-none overflow-hidden tracking-tighter w-full h-full pl-20 text-[14px] lg:text-[31px] lg:w-1/2 text-right'>
                  Exotik Digital Studio est un studio de design et de création de produits digital basée à l'ile de la Réunion
                  spécialisé dans la création de site internet moderne, qui place l'utilisateur au cœur d'une expérience unique axée sur l'UI, l'UX.
                </p>
              </div> */}
              {/* <div className="bottom-0 left-0 leading-none w-full text-left">
                <p id="target-text-2" className="flex w-3/4 lg:w-1/2 h-full justify-center text-[18px] lg:text-[48px] text-left pointer-events-none">Nous accompagnons ceux et celles qui veulent se démarquer et qui oses asssumer leur différence</p>
              </div> */}
            </div>
          </div>
        </div>
        {/* <HorizontalScrollReverse /> */}
        {/* <div className="w-full pt-20 bg-black overflow-hidden">
          <div className="flex justify-end leading-none w-full text-right">
            <TextScroll value="Changer votre vision du web moderne" />
          </div>
          <Hero2 />
        </div> */}
        {/* <div className="z-[1] flex justify-center py-[20px] lg:py-[80px] px-[20px] lg:px-[50px]">
          <GridAnimation />
        </div> */}
        <div id="contact" className="W-full py-[50px] px-[50px] flex items-center h-screen w-full relative ">
          <Link href="/contact" className="flex justify-between items-center w-full relative group" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            {/* <svg width="164" height="165" viewBox="0 0 164 165" fill="none" xmlns="http://www.w3.org/2000/svg" id="left-arrow" className="absolute left-0 -translate-x-full group-hover:translate-x-[0px] transition-all duration-500 ">
              <path d="M0.741753 91.6101L1.04884 71.0174L124.605 72.86L68.8197 15.3855L83.6586 0.982649L163.99 83.7459L81.2264 164.077L66.8236 149.238L124.298 93.4527L0.741753 91.6101Z" fill="black" />
            </svg> */}
              {/* <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute right-0 group-hover:translate-x-full transition-all duration-500"
              /> */}
            {/* <HackHover data='CONTACT' classValue='text-[28px] lg:text-[210px] leading-none text-black text-left group-hover:translate-x-[170px] transition-all duration-500' /> */}
            {/* <svg width="164" height="165" viewBox="0 0 164 165" fill="none" xmlns="http://www.w3.org/2000/svg" id="right-arrow" className="absolute right-0 group-hover:translate-x-full transition-all duration-500 ">
              <path d="M0.741753 91.6101L1.04884 71.0174L124.605 72.86L68.8197 15.3855L83.6586 0.982649L163.99 83.7459L81.2264 164.077L66.8236 149.238L124.298 93.4527L0.741753 91.6101Z" fill="black" />
            </svg> */}
             {/* <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute -left-[170px] group-hover:translate-x-[170px] transition-all duration-500 "
              /> */}
          </Link>
          {/* <h2 className="absolute right-[50px] top-40 text-[0.5em] lg:text-[2em] w-1/4 text-right z-[1] tracking-tighter">"Les grandes histoires commençent souvent par un Hey!"</h2> */}
        </div>
      </div>

    </main>
  );
}
