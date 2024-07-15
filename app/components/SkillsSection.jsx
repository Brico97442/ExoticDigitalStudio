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
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      {children}
    </span>
  );
}

function Section({ children, className }) {
  return (
    <section className={`h-screen ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div className="mix-blend-difference">
      <Section className="bg-sky-950">
        <div className="h-full p-6 text-2xl text-yellow-100	">
          <AnimatedText>Dynamiques</AnimatedText>
        </div>
      </Section>
      <Section className="bg-teal-700">
        <div className="h-full p-6 text-2xl">
          <AnimatedText>Adaptatif</AnimatedText>
        </div>
      </Section>
      <Section className="bg-orange-500">
        <div className="h-full p-6 text-2xl">
          <AnimatedText>Moderne</AnimatedText>
        </div>
      </Section>
      <Section className="bg-green-600">
        <div className="h-full p-6 text-2xl">
          <AnimatedText>Exotique</AnimatedText>
        </div>
      </Section>
    </div>
  );
}
