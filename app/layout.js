'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar"
import StickyCursor from "./components/StickyCursor";
import Layout from "./components/Layout";
import { useRef } from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Site Web de la compagnie Exotic Digitale Studio",
// };

export default function RootLayout({ children }) {

const stickyElement = useRef(null)

  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar ref={stickyElement}/>
        <StickyCursor stickyElement={stickyElement}/>
        {children}</body>
    </html>
  );
}
