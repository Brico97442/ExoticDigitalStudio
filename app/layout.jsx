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

const metadata = {
  title: "Create Next App",
  description: "Site Web de la compagnie Exotic Digitale Studio",
};

export default function RootLayout({ children }) {
  const stickyElement = useRef(null);

  return (
    <LoadingProvider>
      <html lang="fr">
        <head>
        </head>
        <body className={GeistSans.className}>
          <PreLoader/>
          <Template>
            <Navbar ref={stickyElement} />
            <StickyCursor stickyElement={stickyElement} />
            <main className="flex w-full h-full bg-gray-300">
              {children}
            </main>
          </Template>
          <Footer />
        </body>
      </html>
    </LoadingProvider>
  );
}
