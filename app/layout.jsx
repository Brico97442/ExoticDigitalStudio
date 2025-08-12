'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import { useEffect } from 'react';
import { prepareHeroIntro } from './utils/animation';
import Template from "./utils/template";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

// Note: `metadata` n'est pas supporté dans un layout marqué "use client".

export default function RootLayout({ children }) {
  const stickyElement = useRef(null);
  useEffect(() => {
    // Prépare l'état initial des éléments du hero pour éviter le flash
    prepareHeroIntro();
  }, []);

  return (
    <html lang="fr">
      <body className={GeistSans.className}>
        <PreLoader />
        <Template>
          <Navbar ref={stickyElement} />
          <main className="flex w-full h-full bg-gradient-to-b from-[#F0EAEA] to-[#737373]">
            <StickyCursor stickyElement={stickyElement} heroSection="#hero" />
            {children}
          </main>
        </Template>
        <Footer />
      </body>
    </html>
  );
}
