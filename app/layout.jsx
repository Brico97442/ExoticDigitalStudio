import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import AppWrapper from "./AppWrapper";
import Script from "next/script";

export const metadata = {
  title: "Exotik Digital Studio",
  description: "Agence créative digitale spécialisée en design, motion design et développement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
       <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/170026edcd1587e1b0028584/script.js"
          strategy="afterInteractive"
        />
      <body className={GeistSans.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

