'use client'

import Hero from "./components/Hero";
import Button from "./components/Button";
import Lenis from 'lenis';
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lines from './components/Lines'
import Slideshow from './components/Slider'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './components/Carousel'
import ContactForm from './components/ContactForm'
import TextScroll from "./components/TextScroll";

const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
  const island = useRef(null);
  const targetRef = useRef(null);
  const target = useRef(null);

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
    <main id="main" className="flex w-full relative min-h-screen flex-col ">
      <Scene island={island} targetRef={targetRef} />
      {/* {animationComplete && ( */}
      <div className='h-screen flex flex-col justify-center items-start w-full max-w-[85vw] m-auto relative'>
        <div className=' flex flex-col justify-center'>
          <h1 id='hero-title' className=' pointer-events-none text-[12.5em] leading-none 	tracking-tighter bg-clip-text w-full text-transparent bg-gradient-to-r from-black to-neutral-950/80'>Web<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A4161A] to-[#666666] tracking-tighter">Design</span></h1>
          <h1 id='hero-title' className=' pointer-events-none text-[12.5em] leading-none 	tracking-tighter z-[3] w-full bg-clip-text'><span className="bg-clip-text  text-transparent bg-gradient-to-r from-[#A4161A] to-[#666666] ">Motion</span>Design</h1>
          <h1 id='hero-title' className=' pointer-events-none text-[12.5em] leading-none	tracking-tighter  z-[3] w-full text-black '>Ui<span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#A4161A] to-[#666666]"><span className="text-[0.6em]">&</span>Ux</span></h1>
          <h2 className='z-[3] text-[2.5em] mt-6 leading-none w-2/3'> Offrez à vos visiteurs une aventure web captivante et inoubliable parce que chaque clic mérite une touche de magie.</h2>
        </div>
        <Button position='mb-[200px] right-20 bottom-0 absolute'/>
      </div>
      <div id="about" className="h-screen flex flex-col justify-center items-start w-full max-w-[85vw] m-auto relative z-[3] sticky">
        <h1 id='about-title' className='text-[9.375em] z-[3] bg-clip-text text-align-left tracking-tight my-20 bg-gradient-to-r from-black to-neutral-950/80'>Qui somme nous ?</h1>
        <div className='w-full flex justify-end'>
          <Lines  strokeColor="stroke-black"/>
        </div>
        <div className='h-full w-full flex flex-col justify-between sticky z-[3]'>
          <div className="w-full flex justify-end">
            <p ref={target} id='target-text' className='flex  w-1/2 h-full justify-center leading-normal text-[24px] text-right'>
              Exotik Digital Studio est un studio de design et de création de produits digital localisé au Tampon à l'ile de la réunion.
              Spécialisé dans la création de site internet qui place l'utilisateur au cœur d'une expérience unique axée sur l'UI, l'UX et le motion design.
              Vous cherchez une touche d’exception pour votre site web ? Ne cherchez pas plus loin, nous avons la recette parfaite ! Basés à l’île de la Réunion, au cœur vibrant du Tampon, nous sommes le mélange idéal entre expertise numérique et flair tropical.
            </p>
          </div>
          <h2 className="text-[4em] w-1/2 leading-none">Studio de création digitale et de plateformes web localisé à la Réunion</h2>
        </div>
      </div>
      <Hero target={targetRef} />
      <div className="z-[4] h-screen w-full sticky">
        <div id="3d-carousel" className="w-full h-screen sticky relative">
          <div className="w-full absolute top-0 left-0 z-[5]">
            <div className="max-w-[85vw] m-auto">
              <h1 className="text-[12.5em] mt-20 ">Nos Prestations</h1>
        <Button position="absolute right-[6vw] top-[20vh]"/>
            </div>
          </div>
          <div className="h-screen w-full flex fixed z-[1]">
            <Canvas>
              <Suspense fallback={null}>
                <Carousel />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
      <div id="contact" className="z-[4] max-w-[85vw] m-auto w-full min-h-screen relative">
        <h1 className="text-[12.5em] mt-10 mb-10 leading-none">Démarrons</h1>
        <h1 className="text-[12.5em] mb-10 leading-none">un projet</h1>
        <h2 className="absolute right-0 top-[35vh] text-[2em] w-1/4 text-right">"Les grandes histoires commençent souvent par un Hey!"</h2>
        <Lines strokeColor="stroke-black"/>
        <ContactForm/>
      </div>
      {/* )} */}
    </main>
  );
}
