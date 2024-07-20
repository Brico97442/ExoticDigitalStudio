'use client';
import { GeistSans } from 'geist/font/sans';
import { useRef } from "react";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import StickyCursor from "./utils/StickyCursor";
import Template from "./utils/template";


const metadata = {
  title: "Create Next App",
  description: "Site Web de la compagnie Exotic Digitale Studio",
};

export default function RootLayout({ children }) {
  const stickyElement = useRef(null);

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Template>
          <main className="flex w-full min-h-screen flex-col bg-[#FFECD1]">
            <Navbar ref={stickyElement} />
            <StickyCursor stickyElement={stickyElement} />
            {children}
          </main>
        </Template>

      </body>
    </html >
  );
}
