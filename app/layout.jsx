import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import AppWrapper from "./AppWrapper";

export const metadata = {
  title: "Exotik Digital Studio",
  description: "Agence créative digitale spécialisée en design, motion design et développement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={GeistSans.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

