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
    // Re-prépare l'état initial seulement si on est sur la home (éléments présents)
    // pour éviter de rendre visibles les éléments quand on revient.
    const prepared = prepareHeroIntro();
    if (!prepared) return;
  });

  return (
    <html lang="fr">
      <body className={GeistSans.className}>
        <PreLoader />
        <Template>
          <Navbar ref={stickyElement} />
          <main className="flex w-full h-full bg-gradient-to-b from-[#F0EAEA] to-[#737373]" id='main'>
            <StickyCursor stickyElement={stickyElement} heroSection="#hero" />
            {children}
          </main>
        </Template>
        <Footer />
      </body>
    </html>
  );
}
