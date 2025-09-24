'use client';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextScrollFadeGSAP({ children, className = '' }) {
  const target = useRef(null);

  useEffect(() => {
    const container = target.current;
    if (!container) return;

    // Split texte en lettres et mots (pour préserver les espaces)
    const textElement =
      container.querySelector('p, h1, h2, h3, span, div') || container;
    const split = new SplitType(textElement, { 
      types: 'words,chars',  // Split en mots ET en caractères
      wordClass: 'text-scroll-word',     // Classe CSS personnalisée pour éviter les conflits
      charClass: 'text-scroll-char'      // Classe CSS personnalisée pour les caractères
    });

    // Ajouter les classes Tailwind après le split pour préserver la mise en forme
    if (split.words) {
      split.words.forEach(word => {
        word.classList.add('inline-block', 'whitespace-nowrap');
        // Réinitialiser les styles qui pourraient être appliqués par le CSS global
        gsap.set(word, { 
          opacity: 1, 
          transform: 'none',
          y: 0 
        });
      });
    }
    
    if (split.chars) {
      split.chars.forEach(char => {
        char.classList.add('inline-block');
        // Initialiser les caractères comme visibles par défaut
        gsap.set(char, { opacity: 1 });
      });
    }

    // Animation GSAP sur les caractères
    gsap.fromTo(
      split.chars,  // Utilise les caractères au lieu des mots
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.02, // apparition lettre par lettre
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',  // quand le haut du container atteint 80% de la fenêtre
          end: 'top 40%',    // jusqu'à ce qu'il atteigne 40%
          scrub: true,       // lié au scroll (progressif)
          markers: false,    // affiche les marqueurs pour ajuster visuellement
        },
      }
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={target} className={`text-scroll ${className} h-full leading-none inline-block`}>
      {children}
    </div>
  );
}