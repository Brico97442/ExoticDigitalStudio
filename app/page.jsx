'use client'

import Hero2 from "./components/Hero2";
import Lenis from 'lenis';
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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


gsap.registerPlugin(ScrollTrigger)

import gsap from "gsap";
import TextScroll from "./components/TextScroll";
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



    if (arrowRef.current && textScroll.current) {
      animateHero(arrowRef, textScroll);
      const tl = gsap.timeline();

      tl.fromTo(
        textScroll.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
          delay: 11.5,
          yoyo: true
        }
      );

      tl.fromTo(
        textScroll.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 2,
          ease: "power2.in",
          delay: 0.4,
          scrollTrigger: {
            trigger: '#hero',
            start: "top top",
            end: "45% 40%",
            scrub: 1,
            markers: false,
          }
        }
      );


      return () => {
        tl.kill();
      };
    }
    return () => {
      cancelAnimationFrame(raf);
    };

  }, [arrowRef, textScroll]);



  return (
    <main id="main" className="flex w-full h-full relative min-h-screen flex-col ">
      <div className="z-[1] flex w-full h-full min-h-screen flex-col relative  ">
        <Scene island={island} />
        <div ref ={heroSection} id='hero' className='h-screen sticky w-full flex flex-col  items-center top-0 z-[6]'>
          <div className='flex flex-col items-start justify-between mt-[20px] w-full h-full px-[50px] pt-[100px] relative'>
            <h1 className="text-[140px] uppercase tracking-tighter left-0">Studio Web</h1>
            <h2 id='hero-subtitle' className=' pointer-events-none mt-[40px] leading-none text-[31px]  w-1/4 tracking-tighter '>Offrez à vos visiteurs une expérience web captivante, parce que chaque clic mérite sa touche de magie.</h2>
            <h1 id='hero-title' className='absolute right-[50px] bottom-0 pointer-events-none leading-none text-[24px] font-bold-sm tracking-tighter'>Reunion Island Digital Studio </h1>
            <svg ref={arrowRef} className="mt-[80px] ml-[10px]" width="30" height="24" viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.0607 13.0607C46.6464 12.4749 46.6464 11.5251 46.0607 10.9393L36.5147 1.3934C35.9289 0.807612 34.9792 0.807612 34.3934 1.3934C33.8076 1.97918 33.8076 2.92893 34.3934 3.51472L42.8787 12L34.3934 20.4853C33.8076 21.0711 33.8076 22.0208 34.3934 22.6066C34.9792 23.1924 35.9289 23.1924 36.5147 22.6066L46.0607 13.0607ZM0 13.5H45V10.5H0V13.5Z" fill="black" />
            </svg>
            {/* <div ref={textScroll} className="absolute text-[18px] bottom-0 flex justify-center items-end fixed w-full h-screen ">
              <span className="w-[1px] bg-gradient-to-b from-black from-10% via-transparent via-30% to-[#666666] to-90% h-[8vh] absolute" >
              </span>
              <p className="mb-[32px]">Scrollez pour découvrir</p>
            </div> */}
            <div className=" absolute right-0 h-full flex flex-col items-end justify-center mr-[50px]">
              <div id="coordinates-gps" className="flex flex-col items-end text-[16px] ">
                <p>21° 16' 41″ S </p>
                <p>55° 30' 55″ E</p>
              </div>
            </div>
            <h2 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} id='studio-text' className='mt-[40px] pointer-events-none leading-none text-[24px] font-bold-sm tracking-tighter text-black '>Créateur de solutions digitales</h2>
          </div>
          <HorizontalScroll />
        </div>
        <div id="about" ref={aboutRef} className="sticky top-0 h-screen px-[50px] py-[50px] flex flex-col justify-center z-[2]">
          <div className=" flex flex-col w-full h-full">
            <div className='h-full flex flex-col justify-between'>
              {/* <HackHover data='Qui sommes nous ?' classValue='text-[120px] uppercase' /> */}
              <h1 id="about-title" className="text-[120px] uppercase tracking-tighter">Qui sommes nous ?</h1>
              <div className="w-full flex justify-end">
                <p ref={targetRef} id='target-text' className='pointer-events-none overflow-hidden tracking-tighter w-1/2 h-full pl-20 text-[31px] text-right'>
                  Exotik Digital Studio est un studio de design et de création de produits digital
                  spécialisé dans la création de site internet, qui place l'utilisateur au cœur d'une expérience unique axée sur l'UI, l'UX et le design moderne.
                </p>
              </div>
              <div className="bottom-0 left-0 leading-none w-full text-left">
                <p id="target-text-2" className="flex w-1/2 h-full justify-center text-[48px] text-left pointer-events-none">Studio de création digitale web moderne basée à l’ile de la Réunion</p>
              </div>
            </div>
          </div>
        </div>
        {/* <HorizontalScrollReverse /> */}
        <div className="w-full pt-20 bg-black overflow-hidden">
          <div className="bottom-0 left-0 leading-none w-full text-left">
            <TextScroll value="Changer votre vision du web moderne" />
          </div>
          <Hero2 />
        </div>

        <div className=" w-full z-[1] py-[50px]">
          <GridAnimation />
        </div>
        {/* <div id="contact" className="W-full py-[50px] px-[50px] h-screen w-full relative z-[1]">
          <div>
            <HackHover data='Démarrer un projet' classValue='text-[120px] leading-none text-black text-left' />
          </div>
          <ContactForm />
          <h2 className="absolute right-[50px] top-40 text-[2em] w-1/4 text-right z-[1]">"Les grandes histoires commençent souvent par un Hey!"</h2>
        </div> */}
      </div>

    </main>
  );
}
