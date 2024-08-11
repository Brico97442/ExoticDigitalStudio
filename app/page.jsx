'use client'

import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import VisualTextAnimation from "./components/VisualTextAnimation";
import Lenis from 'lenis';
import TextScroll from './components/TextScroll';
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useAnimation } from './context/animationContext'; // Importez votre hook personnalisé

const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
  const { animationComplete } = useAnimation(); // Récupérez l'état de l'animation
  const island = useRef(null);
  const targetRef = useRef(null);

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
    <main id="main" className="flex w-full relative min-h-screen flex-col z-[3]">
      <Scene island={island} targetRef={targetRef} />
      {/* {animationComplete && ( */}
        <>
          {/* <Leva hidden={true} /> */}
          <Hero target={targetRef} />
          <SkillsSection />
          {/* <VisualTextAnimation /> */}
          <TextScroll value="La technologie avance tellement vite, ne nous laissons pas dépassés" />
        </>
      {/* )} */}
    </main>
  );
}
