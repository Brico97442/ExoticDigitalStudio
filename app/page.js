import Image from "next/image";
import Header from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import Word from "./components/Word";

const paragraphe = "C'est  ici  et  maintenant  que  tout  se  joue  saisissez  l'opportunité  d'une  expérience  unique" 

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col">
      <div className=" absolute flex justify-center items-center h-full w-full z-30 top-0 left-0" ></div>
      <div className="flex item-center justify-center w-screen bg-black">
      <Hero/>
      </div>
      <div className="h-[100vh] bg-black"></div>
      {/* <TextScroll value={paragraphe}/> */}
      <Word value={paragraphe} />
      <div className="h-[100vh] bg-black"></div>
      <SkillsSection/>
    </main>
  );
}
