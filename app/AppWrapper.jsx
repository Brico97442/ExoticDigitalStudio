'use client';

import { useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import { prepareHeroIntro } from "./utils/animation";
import Template from "./utils/template";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";
import Magnetic from "./utils/Magnetic"
import logo from "../assets/LogoExoticDigitalStudioWhiteVectorised.webp"
import TransitionLink from "./utils/TransitionLink";
import Image from 'next/image'


export default function AppWrapper({ children }) {
  const stickyElement = useRef(null);

  useEffect(() => {
    const prepared = prepareHeroIntro();
    if (!prepared) return;
  }, []);

  return (
    <>
      <PreLoader />
      <Template>
        <main className="flex w-full h-full bg-gradient-to-b from-[#0E0E0E] to-[#737373]" id="main">
          <div id="logo-link" className="fixed top-[60px] left-[80px] z-[10] mix-blend-difference">
            <Magnetic>
              <TransitionLink href='/' label={<Image src={logo} alt="logo de la compagnie" className="z-[10] mix-blend-difference" width={80} height={55.83} />} />
            </Magnetic>
          </div>
          <Navbar ref={stickyElement} />
          <StickyCursor stickyElement={stickyElement} heroSection="#hero" />
          {children}
        </main>
      </Template>
      <Footer />
    </>
  );
}
