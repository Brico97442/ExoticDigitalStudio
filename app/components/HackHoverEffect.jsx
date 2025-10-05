'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HackHoverInView({
  data,
  classValue = '',
  iterationTiming = 0.33, // vitesse du scramble
  rootMargin = '0px 0px -9.5% 0px', // quand déclencher l'entrée (ajuste si besoin)
  threshold = 0.01, // proportion visible pour déclencher
  once = true, // déclencher une seule fois
}) {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const timeouts = useRef([]);
  const intervals = useRef([]);
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const [hasEntered, setHasEntered] = useState(false);

  // IntersectionObserver -> déclenche l'animation d'entrée lorsque l'élément est visible
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          if (once && node) obs.unobserve(node);
        }
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once]);

  // Nettoyage helpers
  const clearAll = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    intervals.current.forEach((i) => clearInterval(i));
    timeouts.current = [];
    intervals.current = [];
  };

  // Hover / touch -> scramble lettre par lettre
  useEffect(() => {
    const handleEnter = () => {
      clearAll();

      spansRef.current.forEach((span, idx) => {
        if (!span) return;
        const original = span.dataset.value;

        // espaces : on les laisse comme espace insécable
        if (original === ' ') {
          span.innerText = '\u00A0';
          return;
        }

        // lancer le scramble avec un décalage par lettre pour cascade
        const t = setTimeout(() => {
          let iteration = 0;
          const iv = setInterval(() => {
            if (iteration >= 1) {
              span.innerText = original;
              clearInterval(iv);
            } else {
              span.innerText = letters[Math.floor(Math.random() * letters.length)];
            }
            iteration += iterationTiming;
          }, 35);
          intervals.current.push(iv);
        }, idx * 25); // ajuster le spacing entre lettres si tu veux
        timeouts.current.push(t);
      });
    };

    const node = containerRef.current;
    if (!node) return;

    // pointerenter marche pour souris / stylet ; on ajoute touchstart pour mobile tactile
    node.addEventListener('pointerenter', handleEnter);
    node.addEventListener('touchstart', handleEnter, { passive: true });

    return () => {
      node.removeEventListener('pointerenter', handleEnter);
      node.removeEventListener('touchstart', handleEnter);
      clearAll();
    };
  }, [iterationTiming]);

  // Variants Framer Motion
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.06,
      },
    },
  };

  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      ref={containerRef}
      className={`${classValue} z-[15] outline-none whitespace-pre inline-block `}
      variants={containerVariants}
      initial="hidden"
      animate={hasEntered ? 'visible' : 'hidden'}
    >
      {data.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden" // wrapper pour masquer pendant la translation
          aria-hidden={char === ' ' ? 'true' : undefined}
        >
          <motion.span
            ref={(el) => (spansRef.current[i] = el)}
            className="inline-block"
            data-value={char}
            variants={letterVariants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
