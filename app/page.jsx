'use client'

import Hero2 from "./components/Hero2";
import Lenis from 'lenis';
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'
import TextReveal from "./components/TextReveal";
import TextReveal2 from "./components/TextReveal2";
import HorizontalScroll from "./components/HorizontalScroll";
// import HorizontalScroll3D from "./components/HorizontalScroll3d";
// import Button from "./components/Button";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateAbout, animateAboutText, animateHero, animateHeroIntro, prepareHeroIntro } from "./utils/animation";
import HackHover from './components/HackHoverEffect'
import Arrow from '../assets/Vector.png'
import Arrow2 from '../public/media/arrow2.png'
import CookieConsent from "./components/CookieConsent"
import localFont from 'next/font/local'
import { useRouter, usePathname } from 'next/navigation'
import ScrollProgressSidebar from "./components/ScrollProgressSidebar";
import HorizontalSection from "./components/HorizontalSection";
import TextScroll from "./components/TextScroll";
import Link from "next/link";
import Services from "./components/Services";
import LiquidEther from "./utils/LiquiEther";
import LightRays from "./utils/LightRays";
import TransitionLink from "./utils/TransitionLink";
import logo from "../assets/LogoExoticDigitalStudioWhite.webp"
import Magnetic from "../app/utils/Magnetic"

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
  const pathname = usePathname();
  const island = useRef(null);
  const targetRef = useRef(null);
  const arrowRef = useRef(null);
  const aboutRef = useRef(null);
  const textScroll = useRef(null);
  const heroSection = useRef(null)
  const locationRef = useRef(null)
  // const stickyElement = useRef(null);
  // Réinitialiser les animations hero quand on revient sur la page
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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
      // Toujours tenter une réinitialisation des éléments du hero
      resetHeroElements();
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
      // Sauvegarder la référence originale pour le cleanup
      window.__originalPushState = originalPushState;
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('preloaderDone', handlePreloaderDone);
        window.removeEventListener('popstate', handleRouteChange);
        // Restaurer la fonction originale
        if (window.__originalPushState) {
          history.pushState = window.__originalPushState;
          delete window.__originalPushState;
        }
      }
    };
  }, []);


  useEffect(() => {

    // Détecter si on est sur mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const lenis = new Lenis({
      duration: 2.2,
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
        if (isMobile) {

          // Forcer le scroll à être activé
          body.style.overflow = 'auto';
          html.style.overflow = 'auto';
        }
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
    // Lancer l'intro du hero juste après préparation
    setTimeout(() => {
      try {
        prepareHeroIntro();
        animateHeroIntro();
      } catch { }
    }, 50);

    animateAbout()
    // animateAboutText()
    animateHero(textScroll);
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 55%',
      end: 'bottom top',  // Pin pendant 100vh supplémentaires
      pin: '#sticky-texts-container',
      pinSpacing: false,
      markers: false,  // Retirez en production
      onUpdate: (self) => {
        // Fade out progressif quand on scroll
        const opacity = 1 - self.progress;
        gsap.set('#sticky-texts-container', { opacity: opacity });
      }
    });

    // animateHeroTexts();  // ou animateHeroTextsContainer() selon votre choix


    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', doRefresh);
      window.removeEventListener('preloaderDone', doRefresh);
      window.removeEventListener('heroIntroDone', doRefresh);
      window.removeEventListener('preloaderDone', handlePreloaderDone);
    };

  }, [arrowRef, textScroll]);

  // Relancer l'intro du hero sur changement de route vers l'accueil
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname === '/') {
      setTimeout(() => {
        try {
          prepareHeroIntro();
          animateHeroIntro();
        } catch { }
      }, 50);
    }
  }, [pathname]);

  return (
    <main id="main" className={"flex w-full h-full relative min-h-screen flex-col "}>

      <div id="progress" className="flex justify-center items-center fixed my-auto h-full w-[6px] z-[1]">
        {/* <ScrollProgressSidebar /> */}
      </div>

      {/* <CookieConsent/> */}
      {/* <div className="absolute h-full w-full z-[7]"> */}

      {/* <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={50}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.3}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            /> */}
      {/* <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            /> */}

      {/* </div> */}

      {/* <div id="logo-link" className="fixed top-[60px] left-[80px] z-[20] mix-blend-difference">
        <Magnetic>
          <TransitionLink href='/' label={<Image src={logo} alt="logo de la compagnie" className="z-[10] mix-blend-difference" width={80} height={55.83} />} />
        </Magnetic>
      </div> */}
      <div id="hero-container" className="z-[1] flex w-full h-full min-h-screen flex-col relative ">
        <Scene island={island} />
        <div ref={heroSection} id="hero" className='h-screen sticky w-full flex flex-col items-center top-0 z-[3]'>
          <div className='h-screen flex flex-col items-start justify-between w-full px-[20px] lg:px-[80px] pt-[20px] lg:pt-[100px] relative z-[3]'>
            <div className="lg:w-full flex justify-center w-full lg:justify-center">

              <TextReveal staggerValue={"0.03"} classValue="leading-none lg:w-full lg:justify-center text-center">
                <h2 id='hero-subtitle' className='lg:w-full pointer-events-none mt-[20vh] overflow-hidden text-[#ECECEC] text-[1.618rem] tracking-tighter leading-none lg:text-[2.618rem] lg:mt-[10vh] text-center'>
                  Offrez à vos visiteurs <strong>des sites web captivant</strong><br /> parce que chaque clic mérite sa touche de magie.</h2>
              </TextReveal>
            </div>
            <div className="hero-sticky-texts absolute w-full">
            </div>
            <div id="sticky-texts-container" className="absolute bottom-[0px] left-0 w-full h-auto z-[6]">
              {/* Reunion Island Digital Studio */}
              <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                className={`w-auto absolute right-[20px] bottom-[20px] lg:bottom-[50px] lg:right-[80px] backdrop-blur-sm bg-opacity-70 leading-none`}>
                <HackHover
                  id="hero-title"
                  data='Reunion Island Digital Studio'
                  classValue='h-auto w-auto text-[1.618rem] pr-[0px] lg:text-[2.618rem] text-[#ECECEC] cursor-default tracking-tighter leading-none rounded-lg mix-blend-difference'
                />
              </div>

              <div className="overflow-hidden absolute bottom-[60px] lg:bottom-[0px] right-[0px] lg:left-[50px] mb-0 lg:mb-[50px] text-[#ECECEC]">
                <TextReveal staggerValue={"0.03"} classValue="leading-none h-auto w-auto lg:w-full">
                  <h2 id='studio-text' className='overflow-hidden text-[#ECECEC] pointer-events-none leading-none text-[1rem] lg:text-[1.618rem] font-bold-sm tracking-tighter backdrop-blur-sm bg-opacity-50 py-0 px-[20px] rounded-lg mix-blend-difference'>
                    Créateur de solutions digitales
                  </h2>
                </TextReveal>
              </div>
            </div>

            <div className="absolute right-[0px] bottom-[50vh] flex flex-col items-end justify-center mr-[20px] lg:mr-[80px]  text-[#ECECEC]">
              <div id="coordinates-gps" className="flex flex-col items-end text-[0.618rem] w-full lg:text-[1rem] tracking-tighter ">
                <TextReveal staggerValue={"0.1"} classValue="leading-none text-right w-full">
                  <p>21° 16&apos; 41″ S</p>
                </TextReveal>
                <TextReveal staggerValue={"0.1"} classValue="leading-none">
                  <p>55° 30&apos; 55″ E</p>
                </TextReveal>
              </div>
            </div>
            <HorizontalScroll />
          </div>
        </div>

        <div className=" flex items-center justify-center fixed top-[50%] left-[30%] z-[10000] opacity-0" id="location-info">
          {/* <HackHover data='Située au Tampon' classValue='z-[0] ml-[20vw] mt-[5vh] w-full h-full text-[14px] z-[3] lg:text-[20px] text-white cursor-default leading-none' /> */}
        </div>

        <div id="about" ref={aboutRef} className="rounded-2xl mix-blend-normal sticky top-0 h-[150vh] lg:h-[300svh] px-[10px] py-[80px] lg:px-[80px] lg:pb-[80px] lg:pt-[50svh] flex flex-col justify-center">
          <div className=" flex flex-col w-full h-full flex-wrap">
            <div className='h-full w-full flex flex-col justify-between'>
              <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="w-full flex flex-col items-start">
                <div id="about-title" className="flex flex-col w-auto h-auto text-[#0E0E0E]">
                  {/* <TextReveal staggerValue={"0.03"} classValue="leading-none h-auto lg:w-full"> */}
                  <HackHover data='Qui' classValue='text-semibold h-auto uppercase w-auto text-[4.236rem] z-[100]  hover:backdrop-blur-sm hover:bg-opacity-70 lg:text-[17.942rem] text-[#0E0E0E] cursor-default tracking-tighter leading-[0.81] rounded-lg  mix-blend-difference' />
                  {/* </TextReveal> */}

                  {/* <TextReveal staggerValue={"0.03"} classValue="leading-none h-auto lg:w-full "> */}
                  <HackHover data='sommes' classValue='text-semibold h-auto uppercase w-auto text-[4.236rem] lg:pl-[8vw] lg:text-[17.942rem]  hover:backdrop-blur-sm bg-opacity-70  text-[#0E0E0E] cursor-default tracking-tighter leading-[0.81] w-auto rounded-lg  mix-blend-difference' />
                  {/* </TextReveal> */}

                  {/* <TextReveal staggerValue={"0.03"} classValue="leading-none h-auto lg:w-full "> */}
                  <HackHover data='nous ?' classValue='text-semibold h-auto uppercase text-[4.236rem] lg:text-[17.942rem]  hover:backdrop-blur-sm bg-opacity-70 text-[#0E0E0E] cursor-default tracking-tighter leading-[0.81] w-auto rounded-lg  mix-blend-difference' />
                  {/* </TextReveal> */}

                </div>
              </div>
              {/* <TextReveal staggerValue={"0.01"} classValue="z-[7] text-left text-[48px] z-[3] lg:text-[180px] leading-none">
                <h1 className=" leading-none tracking-tighter z-[4] text-[48px] lg:text-[150px] text-white">Besoin d'un site internet?</h1>
              </TextReveal> */}
              <div className="w-full flex justify-end relative">
                <TextReveal classValue="flex w-full justify-end text-right" staggerValue={"0.03"} >
                  <p id="about_target-ref" ref={targetRef} className=' pointer-events-none lg:text-right tracking-tighter text-[1.618rem] lg:text-[2.618rem] w-full lg:w-2/3 z-[50] leading-none backdrop-blur-sm rounded-lg bg-opacity-50 pt-[20px] pl-[0px] lg:pl-[50px] pb-[20px] lg:pb-[50px]'>
                    Développeur freelance basée à l&apos;ile de la Réunion je suis spécialisé dans la <strong> création de site internet moderne</strong> qui place l&apos;utilisateur au cœur d&apos;une expérience unique.
                  </p>
                </TextReveal>
              </div>

              <div className="w-full ">
                <TextScroll>
                  <h3 className="leading-none w-full lg:w-3/4 h-full text-[1.618rem] lg:text-[6.854rem] tracking-tighter text-left pointer-events-none backdrop-blur-sm rounded-2xl bg-opacity-50 text-[#0E0E0E] pt-[20px] pr-[20px]  pb-[20px]">&quot;J&apos;accompagne ceux et celles qui veulent se démarquer et oses assumer fièrement leurs différences.&quot;</h3>
                </TextScroll>
              </div>
            </div>
          </div>
        </div>

        {/* <HorizontalScrollReverse /> */}
        <div className="w-full  lg:px-[80px] lg:pb-[50px] pt-[30vh] lg:pt-[30vh] overflow-hidden" id="gallery-section">
          <div className="flex justify-end w-full ">
            <TextReveal staggerValue={"0.03"} classValue="z-[7] w-full #text-[#0E0E0E] text-center lg:text-right z-[3]">
              <h3 className="w-full tracking-tighter h-auto leading-none z-[4] text-[4.236rem] lg:text-[17.942rem]">Changer votre <span className="font-light">vision</span> du <span className="font-light">web</span> moderne</h3>
            </TextReveal>
          </div>
        </div>
        <Hero2 />

        <HorizontalSection />

        <div id="contact" className="w-full lg:h-screen mx-[0px] pt-[80px] pb-[20px] lg:pb-[0px] flex flex-col items-left text-[#0E0E0] h-screen justify-between relative border-none">
          <TextReveal staggerValue={"0.03"} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} classValue=" text-[#0E0E0] cursor-pointer lg:mt-[50px] mx-[10px] lg:mx-[80px] text-[36px]">
            <h3 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="tracking-tighter">Vous avez des questions ou vous souhaitez collaborer avec nous ?</h3>
          </TextReveal>
          <TextReveal staggerValue={"0.03"} classValue="w-full mx-[10px] lg:mx-[80px] text-[1.618rem] lg:text-[1.618rem] lg:text-[28px] z-[1] tracking-tighter">
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
                height={100}
                width={100}
              />
              <HackHover data='CONTACT' classValue=' z-[3]  text-[4.236rem] tracking-tight font-semibold mx-[20px] lg:mx-[50px] lg:text-[17.942rem] leading-none text-[#0E0E0] text-left lg:group-hover:ml-[290px] group-hover:ml-[110px] transition-all duration-500' />
              {/* <svg width="164" height="165" viewBox="0 0 164 165" fill="none" xmlns="http://www.w3.org/2000/svg" id="right-arrow" className="absolute right-0 group-hover:translate-x-full transition-all duration-500 ">
              <path d="M0.741753 91.6101L1.04884 71.0174L124.605 72.86L68.8197 15.3855L83.6586 0.982649L163.99 83.7459L81.2264 164.077L66.8236 149.238L124.298 93.4527L0.741753 91.6101Z" fill="black" />
              </svg> */}
              <Image
                src={Arrow}
                alt='flèche directionnelle indiquant le lien contact'
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                className="absolute -left-[210px] lg:-left-[210px] lg:group-hover:translate-x-[260px] group-hover:translate-x-[180px] transition-all duration-500 "
              />
            </div>
          </Link>
        </div>
      </div>

    </main>
  );
}
