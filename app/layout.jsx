'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import Template from "./utils/template";
import { LoadingProvider } from './context/animationContext';
import { useAnimation } from './context/animationContext'; // Importez votre hook personnalisé
import Footer from "../app/components/Footer";
import PreLoader from "./components/PreLoader";
// import CookieConsent from './components/CookieConsent'
const metadata = {
  title: "Create Next App",
  description: "Site Web de la compagnie Exotic Digitale Studio",
};

export default function RootLayout({ children }) {
  const stickyElement = useRef(null);

  return (
    // <LoadingProvider>
      <html lang="fr">
        <head>
        </head>
        <body className={GeistSans.className}>
          {/* <PreLoader /> */}
          <Template>
            <Navbar ref={stickyElement} />
            <main className="flex w-full h-full bg-gradient-to-b from-[#F0EAEA] to-[#737373]">
            {/* <StickyCursor stickyElement={stickyElement} heroSection='#hero' /> */}
              {children}
            </main>
          </Template>
          <Footer />
        </body>
      </html>
    // </LoadingProvider>
  );
}
