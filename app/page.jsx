'use client'
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import Word from "./components/Word";
import VisualTextAnimation from "./components/VisualTextAnimation";



const paragraphe = " Saisissez  l'opportunité  d'une  expérience  unique"
import Template from "./utils/template";
export default function Home() {

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

