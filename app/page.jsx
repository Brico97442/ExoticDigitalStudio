'use client'
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import VisualTextAnimation from "./components/VisualTextAnimation";
import Lenis from 'lenis'
import TextScroll from './components/TextScroll'
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <main className="flex w-full min-h-screen flex-col bg-[#FFECD1]">
      <div className="flex item-center justify-center w-screen bg-[#FFECD1] ">
        <Hero />
      </div>
      <SkillsSection />
      <VisualTextAnimation />
      <TextScroll value="La technologie avance tellement vite, ne nous laissons pas dépassé"/>
    </main>
  );
}

