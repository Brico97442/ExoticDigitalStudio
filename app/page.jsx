'use client'

import Hero2 from "./components/Hero2";
import Lenis from 'lenis';
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'
import TextReveal from "./components/TextReveal";
import HorizontalScroll from "./components/HorizontalScroll";
// import HorizontalScroll3D from "./components/HorizontalScroll3d";
// import Button from "./components/Button";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateAbout, animateAboutText, animateHero, animateHeroIntro } from "./utils/animation";
import HackHover from './components/HackHoverEffect'
import Arrow from '../assets/VectorWhite.png'
import Arrow2 from '../public/media/arrow2.png'
import CookieConsent from "./components/CookieConsent"
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import ScrollProgressSidebar from "./components/ScrollProgressSidebar";
import HorizontalSection from "./components/HorizontalSection";
import TextScroll from "./components/TextScroll";
import Link from "next/link";
import Services from "./components/Services";


gsap.registerPlugin(ScrollTrigger)
const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

const Guisol = localFont({
  src: './font/Guisol.woff',// Vous pouvez ajouter des options supplémentaires ici
  variable: '--font-guisol', // Pour utiliser la police en tant que variable CSS
})

export default function Home(stickyElement) {
  const router = useRouter();
  const island = useRef(null);
  const targetRef = useRef(null);
  const arrowRef = useRef(null);
  const aboutRef = useRef(null);
  const textScroll = useRef(null);
  const heroSection = useRef(null)
  const locationRef = useRef(null)
  // const stickyElement = useRef(null);
  // Réinitialiser les animations hero quand on revient sur la page
  useEffect(() => {
    let preloaderDone = false;

    const resetHeroElements = () => {
      const heroElements = [
        '#hero-title',
        '#hero-subtitle',
        '#hero-scroll',
        '#studio-text',
        '#coordinates-gps p'
      ];

      // D'abord masquer les éléments
      heroElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          gsap.set(el, {
            y: 100,
            opacity: 0,
            visibility: 'hidden'
          });
        });
      });

      // Puis relancer l'animation hero après un court délai
      setTimeout(() => {
        // Réinitialiser le flag pour permettre une nouvelle animation
        if (typeof window !== 'undefined') {
          window.__heroIntroDone = false;
        }

        // Relancer l'animation hero
        animateHeroIntro();
      }, 100);
    };

    // Marquer que le préloader est terminé
    const handlePreloaderDone = () => {
      preloaderDone = true;
    };

    // Réinitialiser quand on revient sur la page
    const handleRouteChange = () => {
      if (preloaderDone) {
        // Réinitialiser immédiatement sans délai
        resetHeroElements();
      }
    };

    // Ajouter les écouteurs d'événements
    if (typeof window !== 'undefined') {
      // Écouter la fin du préloader
      window.addEventListener('preloaderDone', handlePreloaderDone);

      // Écouter les changements de route
      window.addEventListener('popstate', handleRouteChange);

      // Écouter les événements de navigation Next.js
      const originalPushState = history.pushState;
      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        handleRouteChange();
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('preloaderDone', handlePreloaderDone);
        window.removeEventListener('popstate', handleRouteChange);
        // Restaurer la fonction originale
        history.pushState = history.pushState;
      }
    };
  }, []);


  useEffect(() => {

    // Détecter si on est sur mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Désactiver le smooth scroll sur mobile
      touchMultiplier: 2,
      infinite: false,
      // Désactiver complètement sur mobile si nécessaire
      enabled: !isMobile,
    });

    // Synchronise Lenis et ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Fonction pour déverrouiller le scroll seulement après le préloader
    const forceUnlockScroll = () => {
      // Vérifier si le préloader est terminé
      if (typeof window !== 'undefined' && window.__preloaderDone === true) {
        const body = document.body;
        const html = document.documentElement;

        // Supprimer tous les styles qui pourraient bloquer le scroll
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        html.style.overflow = '';
        html.style.overscrollBehavior = '';

        // Supprimer les classes qui pourraient bloquer le scroll
        body.classList.remove('preloading-active');

        // Forcer le scroll à être activé
        // body.style.overflow = 'auto';
        // html.style.overflow = 'auto';
      }
    };

    // Écouter la fin du préloader pour déverrouiller le scroll
    const handlePreloaderDone = () => {
      setTimeout(forceUnlockScroll);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('preloaderDone', handlePreloaderDone);
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

   

    // Rafraîchir les triggers à l'init, après chargement et après le préloader / intro héros
    const doRefresh = () => {
      ScrollTrigger.refresh();
    };

    ScrollTrigger.refresh();
    window.addEventListener('load', doRefresh);
    window.addEventListener('preloaderDone', doRefresh);
    window.addEventListener('heroIntroDone', doRefresh);

    // Préparer les éléments hero pour l'animation
    const prepareHeroElements = () => {
      const heroElements = [
        '#hero-title',
        '#hero-subtitle',
        '#hero-scroll',
        '#studio-text',
        '#coordinates-gps p'
      ];

      heroElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          gsap.set(el, {
            y: 100,
            opacity: 0,
            visibility: 'hidden'
          });
        });
      });
    };

    // Préparer les éléments au chargement
    prepareHeroElements();

    animateAbout()
    // animateAboutText()
    animateHero(textScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', doRefresh);
      window.removeEventListener('preloaderDone', doRefresh);
      window.removeEventListener('heroIntroDone', doRefresh);
      window.removeEventListener('preloaderDone', handlePreloaderDone);
    };

  }, [arrowRef, textScroll]);

  return (
    <main id="main" className={"flex w-full h-full relative min-h-screen flex-col "}>
      <div id="progress" className="flex justify-center items-center fixed my-auto h-full w-[6px] z-[1]">
        <ScrollProgressSidebar />
      </div>

      {/* <CookieConsent/> */}
      <div id="hero-container" className="z-[1] flex w-full h-full min-h-screen flex-col relative">
        <Scene island={island} />
        <div ref={heroSection} id="hero" className='h-screen sticky w-full flex flex-col items-center top-0 z-[3]'>
          <div className='h-screen flex flex-col items-start justify-between w-full px-[10px] lg:px-[80px] pt-[20px] lg:pt-[100px] relative z-[3]'>
            <div className="lg:w-full flex lg:justify-center">

            <TextReveal staggerValue={"0.03"} classValue="leading-none lg:w-full lg:justify-center text-center">
              <h2 id='hero-subtitle' className='lg:w-full pointer-events-none mt-[98px] overflow-hidden text-[#003049] text-[24px] tracking-tighter leading-none lg:text-[36px] lg:mt-[10vh] text-center'>Offrez à vos visiteurs une expérience web captivante<br /> parce que chaque clic mérite sa touche de magie.</h2>
            </TextReveal>
            </div>

            <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="overflow-hidden absolute right-[10px] bottom-[148px] lg:bottom-[52px] lg:right-[80px]" >
              <h3 id='hero-title' className=' bg-slate-900 pointer-events-none text-[#ECECEC] text-[16px] lg:text-[28px] font-bold-sm tracking-tighter py-2 px-6 rounded-lg '>Reunion Island Digital Studio </h3>
            </div>
            {/* <Image
              src={Arrow2}
              alt='flèche directionnelle indiquant le lien contact'
              style={{ objectFit: 'contain' }}
              placeholder="blur"
              className="absolute bottom-[50vh] h-[5vh] w-auto mt-[0px]"
            /> */}

            <div className="absolute right-[0px] bottom-[50vh] flex flex-col items-end justify-center mr-[10px] lg:mr-[80px]">
              <div id="coordinates-gps" className="flex flex-col items-end text-[8px] w-full lg:text-[16px] tracking-tighter leading-none ">
                <TextReveal staggerValue={"0.1"} classValue="leading-none text-right w-full">
                  <p>21° 16&apos; 41″ S</p>
                </TextReveal>
                <TextReveal staggerValue={"0.1"} classValue="leading-none">
                  <p>55° 30&apos; 55″ E</p>
                </TextReveal>
              </div>
            </div>

            <div className="overflow-hidden mb-[10px] lg:mr-[50px] lg:mb-[80px]">
              <TextReveal staggerValue={"0.03"} classValue="leading-none h-auto lg:w-full ">

                <h2 id='studio-text' className='overflow-hidden text-[#003049] pointer-events-none leading-none text-[24px] lg:text-[36px] font-bold-sm tracking-tighter '>Créateur de solutions digitales</h2>
              </TextReveal>

            </div>
            <HorizontalScroll />
          </div>
        </div>

        <div className=" flex items-center justify-center fixed top-[50%] left-[30%] z-[10000] opacity-0" id="location-info">
          <HackHover data='Située au Tampon' classValue='z-[0] ml-[20vw] mt-[5vh] w-full h-full text-[14px] z-[3] lg:text-[20px] text-white cursor-default leading-none' />
        </div>

        <div id="about" ref={aboutRef} className="rounded-2xl sticky top-0 h-[250svh] px-[10px] py-[80px] lg:px-[80px] lg:pb-[80px] lg:pt-[30svh] flex flex-col justify-center">
          <div className=" flex flex-col w-full h-full">
            <div className='h-full flex flex-col justify-between'>
              <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
                <div id="about-title">
                  <HackHover data='Qui sommes nous ?' classValue='z-[2] w-full h-full text-[48px] z-[3] lg:text-[180px] text-white cursor-default tracking-tighter' />
                </div>
              </div>
              {/* <TextReveal staggerValue={"0.01"} classValue="z-[7] text-left text-[48px] z-[3] lg:text-[180px] leading-none">
                <h1 className=" leading-none tracking-tighter z-[4] text-[48px] lg:text-[150px] text-white">Besoin d'un site internet?</h1>
              </TextReveal> */}
              <div className="w-full flex justify-end">
                <TextReveal classValue="flex w-full justify-end text-right" staggerValue={"0.03"} >
                  <p id="about_target-ref" ref={targetRef} className=' w-full pointer-events-none text-right tracking-tight text-[16px] lg:text-[32px] lg:w-2/3  leading-none text-white'>
                    Développeur freelance basée à l&apos;ile de la Réunion <br />
                    je suis spécialisé dans la <strong> création de site internet moderne</strong>, qui place l&apos;utilisateur au cœur d&apos;une expérience unique.
                  </p>
                </TextReveal>
              </div>
              <div className="w-full text-left">
                <TextReveal staggerValue={"0.03"} classValue="flex w-full justify-start text-right leading-none">
                  <h3 className=" leading-none flex w-3/4 lg:w-2/4 h-full justify-center text-[24px] lg:text-[48px] text-left pointer-events-none text-white">&quot; J&apos;accompagne ceux et celles qui veulent se démarquer et qui oses assumer fièrement leurs différences. &quot;</h3>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>

        {/* <HorizontalScrollReverse /> */}
        <div className="w-full lg:px-[80px] lg:pt-[80vh] bg-[#0E0E0E] overflow-hidden" id="gallery-section">
          <div className="flex justify-end w-full h-[100svh]">
            <TextReveal staggerValue={"0.03"} classValue="z-[7] w-full text-white text-right z-[3] ">
              <h3 className=" leading-none w-full tracking-tighter z-[4] text-[32px] lg:text-[64px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>Changer votre vision du web moderne</h3>
            </TextReveal>
          </div>
        </div>
        <Hero2 />
        {/* Section services */}
        {/* <Services /> */}
        <HorizontalSection/>
        {/* <div className="z-[1] flex justify-center py-[20px] lg:py-[80px] px-[20px] lg:px-[50px]"> */}
        {/* <GridAnimation /> */}
        {/* </div> */}
        <div id="contact" className="w-full lg:h-screen mx-[10px] lg:mx-[0px] flex flex-col items-left text-[#ECECEC] h-[70vh] justify-between relative border-none">
          <TextReveal staggerValue={"0.03"} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} classValue=" text-[#ECECEC] cursor-pointer lg:mt-[50px] mx-[10px] lg:mx-[80px] text-[36px]">
            <h3 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="tracking-tighter">Vous avez des questions ou vous souhaitez collaborer avec nous ?</h3>
          </TextReveal>
          <TextReveal classValue="w-full mx-[10px] lg:mx-[80px] text-[14px] lg:text-[1rem] lg:text-[28px] z-[1] tracking-tighter">
            <h2 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="tracking-tighter">Les grandes histoires commençent souvent par un Hey !</h2>
          </TextReveal>
          <Link href="/contact" className="flex lg:bottom-[0px] justify-between items-center w-full relative group z-[6]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            <div className={`
               
              flex justify-between items-center w-full relative group`}>
              <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute right-0 lg:right-[80px] lg:group-hover:right-0 group-hover:translate-x-full transition-all duration-500"
              />
              <HackHover data='CONTACT' classValue=' z-[3] text-[32px] tracking-tight mx-[10px] lg:mx-[58px] lg:text-[300px] leading-none text-[#ECECEC] text-left group-hover:ml-[290px] transition-all duration-500' />
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
