"use client"

import { useRef } from "react";
import { useInView } from "framer-motion";

function AnimatedText({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}
      style={{
        display: "inline-block",
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        zIndex:60
      }}
    >
      {children}
    </span>
  );
}

function Section({ children, className }) {
  return (
    <section className={`h-screen relative z-60 ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div className="h-full z-60">
      <Section className="bg-[#5F0F40] sticky z-60">
        <div className="h-1/4 p-6 text-2xl text-yellow-100	z-60">
          <AnimatedText>Dynamiques</AnimatedText>
        </div>
      </Section>
      <Section className="bg-[#9A031E] sticky z-60">
        <div className="h-1/4 p-6 text-2xl z-60">
          <AnimatedText>Adaptatif</AnimatedText>
        </div>
      </Section>
      <Section className="bg-[#FB8B24] sticky z-60">
        <div className="h-1/4 p-6 text-2xl z-60">
          <AnimatedText>Moderne</AnimatedText>
        </div>
      </Section>
      <Section className="bg-[#E36414] sticky z-60">
        <div className="h-1/4 p-6 text-2xl z-60">
          <AnimatedText>Exotique</AnimatedText>
        </div>
      </Section>
    </div>
  );
}
