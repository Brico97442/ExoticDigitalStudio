'use client'

import Hero from "./components/Hero";
import Button from "./components/Button";
import Lenis from 'lenis';
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lines from './components/Lines'
import ContactForm from './components/ContactForm'
// import TextScroll from "./components/TextScroll";
import GridAnimation from "./components/GridAnimation";
import HorizontalScroll from "./components/HorizontalScroll";
import PreLoader from "./components/PreLoader";
const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
  const island = useRef(null);
  const targetRef = useRef(null);
  const target = useRef(null);
  const animationComplete = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function to avoid memory leaks
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main id="main" className="flex w-full h-full relative min-h-screen flex-col ">
      {/* <Scene island={island} targetRef={targetRef} animationComplete={animationComplete} /> */}
      {/* { animationComplete && ( */}
      <div>
        <div id='hero' className=' w-full flex flex-col  items-center relative sticky z-[1] top-0 '>
          <div className='flex flex-col items-start justify-between mt-[40px] w-full h-full relative px-[80px] pt-[80px]'>
            <h1 id='hero-title' className=' pointer-events-none  leading-none text-[24px]	tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-black to-neutral-950/80'>Créateur de solutions digitales *</h1>
            <h3 className=' pointer-events-none mt-[45px] leading-none text-[48px]  w-1/3	tracking-tighter z-[3]'>Offrez à vos visiteurs une expérience web captivante, parce que chaque clic mérite sa touche de magie.</h3>
            <svg className="mt-[85px]" width="47" height="24" viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.0607 13.0607C46.6464 12.4749 46.6464 11.5251 46.0607 10.9393L36.5147 1.3934C35.9289 0.807612 34.9792 0.807612 34.3934 1.3934C33.8076 1.97918 33.8076 2.92893 34.3934 3.51472L42.8787 12L34.3934 20.4853C33.8076 21.0711 33.8076 22.0208 34.3934 22.6066C34.9792 23.1924 35.9289 23.1924 36.5147 22.6066L46.0607 13.0607ZM0 13.5H45V10.5H0V13.5Z" fill="black" />
            </svg>
            <h2 id='hero-title' className='mt-[100px] pointer-events-none leading-none text-[16px] tracking-tighter z-[3] w-full text-black '>Reunion Island Studio **</h2>
          </div>
          <HorizontalScroll />
        </div>
        <div id="about" className="h-full flex flex-col justify-center items-start w-full relative z-[4] sticky bg-red-600 rounded-tl-[50px] rounded-tr-[50px] sticky top-0">
          <div className=" flex flex-col items-start z-[4] h-full w-[90vw] m-auto" >
            <h1 id='about-title' className='text-[150px] z-[3] bg-clip-text text-align-left tracking-tight my-20 bg-gradient-to-r from-black to-neutral-950/80'>Qui somme nous ?</h1>
            <div className='flex justify-center w-full'>
              <Lines strokeColor="stroke-black" />
            </div>
            <div className='h-full w-full flex flex-col justify-between z-[3]'>
              <div className="w-full flex justify-end">
                <p ref={target} id='target-text' className='flex  w-1/2 h-full justify-center leading-normal text-[24px] text-right'>
                  Exotik Digital Studio est un studio de design et de création de produits digital localisé au Tampon à l'ile de la réunion.
                  Spécialisé dans la création de site internet qui place l'utilisateur au cœur d'une expérience unique axée sur l'UI, l'UX et le design moderne.
                  Vous cherchez une touche d’exception pour votre site web ? Ne cherchez pas plus loin, nous avons la recette parfaite ! Basés à l’île de la Réunion, au cœur vibrant du Tampon, nous sommes le mélange idéal entre expertise numérique et flair tropical.
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* <Hero target={targetRef} />
          <div className="z-[6] bg-gray-200 min-h-screen h-full w-full">
            <div className="z-[2] w-[85vw] m-auto">
              <h1 className="text-[12.5em] mt-[5vh]">Nos Prestations</h1>
              <GridAnimation />
            </div>
          </div>

          <div id="contact" className="z-[2] max-w-[85vw] m-auto w-full min-h-screen relative">
            <h1 className="text-[12.5em] mt-10 mb-10 leading-none">Démarrons</h1>
            <h1 className="text-[12.5em] mb-10 leading-none">un projet</h1>
            <h2 className="absolute right-0 top-[35vh] text-[2em] w-1/4 text-right">"Les grandes histoires commençent souvent par un Hey!"</h2>
            <Lines strokeColor="stroke-black" />
            <ContactForm />
          </div> */}
      </div>

      {/* )} */}
    </main>
  );
}
