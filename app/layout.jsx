'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import Template from "./utils/template";
import { AnimationProvider } from './context/animationContext';

const metadata = {
  title: "Create Next App",
  description: "Site Web de la compagnie Exotic Digitale Studio",
};

export default function RootLayout({ children }) {

  const stickyElement = useRef(null);

  return (
    <AnimationProvider>
      <html lang="en">
        <head>
        </head>
        <body className={GeistSans.className}>
          <Template>
            <Navbar ref={stickyElement} />
            <StickyCursor stickyElement={stickyElement} />
            <main className="flex w-full min-h-screen flex-col bg-gradient-to-tr from-indigo-600 via-sky-300 to-black">
              {children}
            </main>
          </Template>
        </body>
      </html>
    </AnimationProvider>
  );
}
