'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import Template from "./utils/template";
import { AnimationProvider } from './context/animationContext';
import { useAnimation } from './context/animationContext'; // Importez votre hook personnalisé
import Footer from "../app/components/Footer";

const metadata = {
  title: "Create Next App",
  description: "Site Web de la compagnie Exotic Digitale Studio",
};

export default function RootLayout({ children }) {

  const stickyElement = useRef(null);

  return (
    <AnimationProvider>
      <html lang="fr">
        <head>
        </head>
        <body className={GeistSans.className}>
          <Template>
            <Navbar ref={stickyElement} />
            <StickyCursor stickyElement={stickyElement} />
            <main className="flex w-full min-h-screen flex-col bg-gradient-to-bl from-zinc-100 to-neutral-100">
              {children}
            </main>
          </Template>
            <Footer/>
        </body>
      </html>
    </AnimationProvider>
  );
}
