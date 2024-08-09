'use client'

import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import VisualTextAnimation from "./components/VisualTextAnimation";
import Lenis from 'lenis'
import TextScroll from './components/TextScroll'
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Leva } from 'leva';

const Scene = dynamic(() => import('./utils/Scene'), {
  ssr: false
})

export default function Home() {

  useEffect(() => {

    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

  }, [])

  const island = useRef(null);
  const targetRef = useRef(null);
  const animationComplete = useRef(null)
  return (

    <main id="main" className="flex w-full bg-gradient-to-b from-slate-950 via-purple-500 to-pink-500 relative min-h-screen 60z- flex-col">
      <Scene island={island} targetRef={targetRef} animationComplete={animationComplete} />
      {animationComplete && (
        <>
          {/* <Leva hidden={true} /> */}
          <Hero target={targetRef} />
          <SkillsSection />
          <VisualTextAnimation />
          <TextScroll value="La technologie avance tellement vite, ne nous laissons pas dépassés" />
        </>
      )}
    </main>
  );
}

