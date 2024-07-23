'use client'
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import Word from "./components/Word";
import VisualTextAnimation from "./components/VisualTextAnimation";
import Lenis from 'lenis'

const paragraphe = " Saisissez  l'opportunité  d'une  expérience  unique"
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
      <div className="flex item-center justify-center w-screen bg-[#FFECD1]">
        <Hero />
      </div>
      <div className="h-[100vh] bg-[#FFECD1] "></div>
      <Word value={paragraphe} />
      <div className="h-[100vh] bg-[#FFECD1]" ></div>
      <SkillsSection />
      <VisualTextAnimation />
    </main>
  );
}

