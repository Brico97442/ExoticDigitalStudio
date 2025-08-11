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
import Arrow from '../assets/VectorWhite.png'
import CookieConsent from "./components/CookieConsent"
import localFont from 'next/font/local'


gsap.registerPlugin(ScrollTrigger)

import gsap from "gsap";
import TextScroll from "./components/TextScroll";
import Link from "next/link";
const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

const Guisol = localFont({
  src: './font/Guisol.woff',// Vous pouvez ajouter des options supplémentaires ici
  variable: '--font-guisol', // Pour utiliser la police en tant que variable CSS
})

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
    // animateAboutText()
    animateHero(textScroll);
    return () => {
      cancelAnimationFrame(raf);
    };

  }, [arrowRef, textScroll]);



  return (
    <main id="main" className={"flex w-full h-full relative min-h-screen flex-col "}>
      {/* <CookieConsent/> */}
      <div id="hero-container" className="z-[1] flex w-full h-full min-h-screen flex-col relative">
        <Scene island={island} />
        <div ref={heroSection} id="hero" className='h-screen sticky w-full flex flex-col items-center top-0 z-[3]'>
          <div className='h-screen flex flex-col items-start justify-between w-full px-[10px] lg:px-[50px] pt-[20px] lg:pt-[100px] relative z-[3]'>
            <TextReveal staggerValue={"0.1"} classValue="leading-none lg:w-3/6 ">
              <h2 id='hero-subtitle' style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className='lg:w-full pointer-events-none mt-[98px] overflow-hidden text-[24px] tracking-tighter lg:text-[36px] lg:mt-[7vh] '>Offrez à vos visiteurs une expérience web captivante<br /> parce que chaque clic mérite sa touche de magie.</h2>
            </TextReveal>

            <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="overflow-hidden absolute right-[10px] bottom-[148px] lg:bottom-[50px] lg:right-[50px]" >
            <h3 id='hero-title'  className=' bg-slate-900 pointer-events-none text-[#ECECEC] text-[16px] lg:text-[28px] font-bold-sm tracking-tighter py-2 px-6 rounded-lg'>Reunion Island Digital Studio </h3>
            </div>
            <Image
              src={Arrow}
              alt='flèche directionnelle indiquant le lien contact'
              style={{ objectFit: 'contain' }}
              placeholder="blur"
              className="absolute bottom-[50vh] h-[5vh] w-auto mt-[0px]"
            />

            <div className="absolute right-[0px] bottom-[50vh] flex flex-col items-end justify-center mr-[10px] lg:mr-[50px]">
              <div id="coordinates-gps" className="flex flex-col items-end text-[8px]  lg:text-[16px] tracking-tighter leading-none">
                <TextReveal staggerValue={"0.1"} classValue="leading-none">
                  <p>21° 16' 41″ S </p>
                </TextReveal>
                <TextReveal staggerValue={"0.1"} classValue="leading-none">
                  <p>55° 30' 55″ E</p>
                </TextReveal>
              </div>
            </div>
            
            <div className="overflow-hidden mb-[10px] lg:mr-[50px] lg:mb-[50px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
              <h2 id='studio-text' className='overflow-hidden text-[#003049] pointer-events-none leading-none text-[24px] lg:text-[36px] font-bold-sm tracking-tighter '>Créateur de solutions digitales</h2>
            </div>

            <HorizontalScroll />
          </div>
        </div>

        <div id="about" ref={aboutRef} className="sticky top-0 h-[200svh] px-[10px] py-[50px] lg:px-[50px] lg:pb-[80px] lg:pt-[30svh] flex flex-col justify-center text-white">
          <div className=" flex flex-col w-full h-full">
            <div className='h-full flex flex-col justify-between'>
              <TextReveal staggerValue={"0"} classValue="z-[7] text-white text-left text-[48px] z-[3] lg:text-[180px] leading-none">
                {/* <HackHover id="about-title" data='Qui sommes nous ?' classValue='z-[3] w-full h-full text-[48px] z-[3] lg:text-[180px]'/> */}
                <h1 className=" leading-none tracking-tighter z-[4] text-[48px] lg:text-[150px]">Qui sommes nous?</h1>
              </TextReveal>
              <div className="w-full flex justify-end">
                <TextReveal classValue="flex w-full justify-end text-right">
                  <p ref={targetRef} className='w-full h-full absolute pointer-events-none overflow-hidden text-right lg:text-right tracking-tighter text-[16px] lg:text-[32px] lg:w-3/6 leading-none'>
                    Une agence web basée à l'ile de la Réunion <br />
                    spécialisé dans la  <strong> création de site internet moderne</strong>, qui place l'utilisateur au cœur d'une expérience unique.
                  </p>
                </TextReveal>
              </div>
              <div className="w-full text-left">
                <TextReveal staggerValue={"0"} classValue="flex w-full justify-start text-right leading-none">
                  <h3  className=" leading-none flex w-3/4 lg:w-2/4 h-full justify-center text-[24px] lg:text-[48px] text-left pointer-events-none">Nous accompagnons ceux et celles qui veulent se démarquer et qui oses assumer leur différence</h3>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>

        {/* <HorizontalScrollReverse /> */}
        <div className="w-full lg:p-[50px] bg-[#0E0E0E] overflow-hidden" id="gallery-section">
          <div className="flex justify-end leading-none w-full h-[100svh]">
            <TextReveal staggerValue={"0.1"} classValue="z-[7] w-full text-white text-right z-[3]">
              <h3 className=" leading-none w-full tracking-tighter z-[4] text-[32px] lg:text-[64px]">Changer votre vision du web moderne</h3>
            </TextReveal>
          </div>
          <Hero2 />
        </div>
        {/* Section services */}
        <div className="z-[1] flex justify-center py-[20px] lg:py-[80px] px-[20px] lg:px-[50px]">
          {/* <GridAnimation /> */}
        </div>
        <div id="contact" className="w-full mx-[10px] lg:mx-[0px] flex flex-col items-left text-[#ECECEC]
          h-[70vh] justify-between relative">
          <TextScroll style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} classValue="cursor-pointer lg:mt-[50px] mx-[10px] lg:mx-[50px] text-[36px]"
            value="Vous avez des questions ou vous souhaitez collaborer avec nous ?">
          </TextScroll>
          <TextReveal classValue="w-full mx-[10px] lg:mx-[50px] text-[14px] lg:text-[1rem] lg:text-[28px] z-[1] tracking-tighter">
            <h2 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="tracking-tighter">Les grandes histoires commençent souvent par un Hey !</h2>
          </TextReveal>
          <Link href="/contact" className="flex lg:bottom-[0px] justify-between items-center w-full relative group z-[6]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            <div className={`${Guisol.className} flex justify-between items-center w-full relative group`}>
              <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute right-0 lg:right-[50px] lg:group-hover:right-0 group-hover:translate-x-full transition-all duration-500"
              />
              <HackHover data='CONTACT' classValue='z-[3] text-[32px] tracking-wide mx-[10px] lg:mx-[50px] lg:text-[300px] leading-none text-[#ECECEC] text-left group-hover:ml-[290px] transition-all duration-500' />
              {/* <svg width="164" height="165" viewBox="0 0 164 165" fill="none" xmlns="http://www.w3.org/2000/svg" id="right-arrow" className="absolute right-0 group-hover:translate-x-full transition-all duration-500 ">
              <path d="M0.741753 91.6101L1.04884 71.0174L124.605 72.86L68.8197 15.3855L83.6586 0.982649L163.99 83.7459L81.2264 164.077L66.8236 149.238L124.298 93.4527L0.741753 91.6101Z" fill="black" />
              </svg> */}
              <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute -left-[210px] group-hover:translate-x-[260px] transition-all duration-500 "
              />
            </div>
          </Link>
        </div>
      </div>

    </main>
  );
}
