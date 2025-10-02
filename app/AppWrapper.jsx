'use client';

import { useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import { prepareHeroIntro } from "./utils/animation";
import Template from "./utils/template";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

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
        <Navbar ref={stickyElement} />
        <main className="flex w-full h-full bg-gradient-to-b from-[#0E0E0E] to-[#737373]" id="main">
          <StickyCursor stickyElement={stickyElement} heroSection="#hero" />
          {children}
        </main>
      </Template>
      <Footer />
    </>
  );
}
