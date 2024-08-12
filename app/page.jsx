'use client'

import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import Lenis from 'lenis';
import TextScroll from './components/TextScroll';
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
});

export default function Home() {
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
    <main id="main" className="flex w-full relative min-h-screen flex-col ">
      <Scene island={island} targetRef={targetRef} />
      {/* {animationComplete && ( */}
        <Hero target={targetRef} />
        <SkillsSection />
        {/* <VisualTextAnimation /> */}
      {/* )} */}
    </main>
  );
}
