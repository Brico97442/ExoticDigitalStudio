'use client'

import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import VisualTextAnimation from "./components/VisualTextAnimation";
import Lenis from 'lenis'
import TextScroll from './components/TextScroll'
import { useEffect,useRef } from "react";
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


  return (

    <main className="flex w-full relative min-h-screen flex-col">
      <Scene island={island} targetRef={targetRef} />
      {/* <Leva hidden={true} /> */}
      <div className="flex item-center justify-center bg-[#FFECD1]">
      <Hero target={targetRef} />
      </div>
      <SkillsSection />
      <VisualTextAnimation />
      <TextScroll value="La technologie avance tellement vite, ne nous laissons pas dépassé" />
    </main>
  );
}

