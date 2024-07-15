import Image from "next/image";
import Header from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import StickyCursor from "./components/StickyCursor";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col">
      <div className=" absolute flex bg-dark justify-center items-center  h-full w-full z-30 top-0 left-0" ></div>
      <div className="flex item-center  justify-center w-screen bg-black">
      <Hero/>
      </div>
      <SkillsSection/>
    </main>
  );
}
