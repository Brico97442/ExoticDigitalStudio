'use client'

import Hero2 from "./components/Hero2";
import Hero from "./components/Hero";
import Lenis from 'lenis';
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lines from './components/Lines'
import ContactForm from './components/ContactForm'
// import TextScroll from "./components/TextScroll";
import GridAnimation from "./components/GridAnimation";
import HorizontalScroll from "./components/HorizontalScroll";
import Button from "./components/Button";
import { animateArrow, animateAbout } from "./utils/animation";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HackHover from './components/hackHoverEffect'

gsap.registerPlugin(ScrollTrigger)

import gsap from "gsap";
const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
  const island = useRef(null);
  const targetRef = useRef(null);
  const target = useRef(null);
  const arrowRef = useRef(null);
  const aboutRef = useRef(null);
  const textScroll = useRef(null);
  const animationComplete = useRef(null);


  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (arrowRef.current && textScroll.current) {
      animateArrow(arrowRef, textScroll);
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
          yoyo: true // Décalage entre les animations des deux textes
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


      // Nettoyage
      return () => {
        tl.kill();
      };
    }
    // if (aboutRef.current) {
    //   animateAbout(aboutRef);
    // }


    return () => {
      cancelAnimationFrame(raf);
    };

  }, [arrowRef, textScroll]);


  return (
    <main id="main" className="flex w-full h-full relative min-h-screen flex-col ">
      <Scene island={island} targetRef={targetRef} animationComplete={animationComplete} />

      {animationComplete && (
      <div className="z-[2] flex w-full h-full relative min-h-screen flex-col ">
        <div id='hero' className='h-screen w-full flex flex-col  items-center top-0'>
          <div ref={textScroll} className="absolute bottom-[20px] scroll-text text-[18px] flex justify-center items-end fixed w-full h-screen pb-[30vh]">
            <span className="w-[1px] bg-gradient-to-b from-black from-10% via-transparent via-30% to-[#666666] to-90% h-[8vh] absolute" >
            </span>
            <p className="mb-[32px]">Scrollez pour découvrir</p>
          </div>

          <div className="z-[5] h-full max-h-screen absolute right-0 w-full"><Button position="fixed right-[100px] bottom-[34vh]"/></div>

          <div className='flex flex-col items-start justify-between mt-[40px] w-full h-full px-[80px] pt-[80px] relative'>
            <h1 id='hero-title' className=' pointer-events-none  leading-none text-[24px]	tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-black to-neutral-950/80'>Créateur de solutions digitales *</h1>
            <h3 id='hero-subtitle' className=' pointer-events-none mt-[60px] leading-none text-[48px]  w-1/3	tracking-tighter '>Offrez à vos visiteurs une expérience web captivante, parce que chaque clic mérite sa touche de magie.</h3>
            <svg ref={arrowRef} className="mt-[85px]" width="30" height="24" viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.0607 13.0607C46.6464 12.4749 46.6464 11.5251 46.0607 10.9393L36.5147 1.3934C35.9289 0.807612 34.9792 0.807612 34.3934 1.3934C33.8076 1.97918 33.8076 2.92893 34.3934 3.51472L42.8787 12L34.3934 20.4853C33.8076 21.0711 33.8076 22.0208 34.3934 22.6066C34.9792 23.1924 35.9289 23.1924 36.5147 22.6066L46.0607 13.0607ZM0 13.5H45V10.5H0V13.5Z" fill="black" />
            </svg>
            <div className=" absolute right-0 h-full flex flex-col items-end justify-center mr-[80px]">
              <div id="coordinates-gps" className=" text-gray-600 flex flex-col items end text-[16px] mb-[40vh]">
                <p>21° 16' 41″ S </p>
                <p>55° 30' 55″ E</p>
              </div>
            </div>


            <h2 id='studio-text' className='mt-[100px] pointer-events-none leading-none text-[16px] tracking-tighter  w-full text-black '>Reunion Island Studio **</h2>
          </div>
          <HorizontalScroll />
        </div>
        <div id="about" ref={aboutRef} className=" h-screen flex flex-col justify-center items-start w-full  rounded-tl-[50px] rounded-tr-[50px] top-0  bg-[#ECECEC] z-[2]">

          <div className=" flex flex-col items-start  h-[120] w-[80vw] m-auto top-0 sticky">
            <HackHover data='Qui sommes nous ?'  classValue='text-[120px] text-black text-left'/>
            <div className='flex justify-center w-full'>
              <Lines strokeColor="stroke-black" />
            </div>
            <div className='h-full w-full flex flex-col justify-between'>
              <div className="w-full flex justify-end">
                <p ref={target} id='target-text' className='flex w-1/2 h-full justify-center leading-normal text-[24px] text-right'>
                  Exotik Digital Studio est un studio de design et de création de produits digital localisé au Tampon à l'ile de la réunion.
                  Spécialisé dans la création de site internet qui place l'utilisateur au cœur d'une expérience unique axée sur l'UI, l'UX et le design moderne.
                  Vous cherchez une touche d’exception pour votre site web ? Ne cherchez pas plus loin, nous avons la recette parfaite ! Basés à l’île de la Réunion, au cœur vibrant du Tampon, nous sommes le mélange idéal entre expertise numérique et flair tropical.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 text-[54px] leading-none w-1/2 text-left"> Studio de création digitale et de plateformes web moderne localisée à l’ile de la Réunion</div>
            </div>
          </div>

        </div>
        {/* <Hero target={targetRef} /> */}
        <Hero2 />

        <div className=" w-full z-[1]">
            <GridAnimation />
          </div>

        <div id="contact" className="max-w-[85vw] m-auto w-full min-h-screen relative z-[1]">
        <HackHover data='Commençons'  classValue='text-[120px] text-black text-left pb-[20px]'/>
        <HackHover data='un projet'  classValue='text-[120px] text-black text-left pb-[20px]'/>
        <h2 className="absolute right-0 top-[35vh] text-[2em] w-1/4 text-right z-[1]">"Les grandes histoires commençent souvent par un Hey!"</h2>
            <Lines strokeColor="stroke-black z-[1]" />
            <ContactForm />
          </div>

      </div>
       )}
    </main>
  );
}
