'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import Template from "./utils/template";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

// Note: `metadata` n'est pas supporté dans un layout marqué "use client".

export default function RootLayout({ children }) {
  const stickyElement = useRef(null);

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
