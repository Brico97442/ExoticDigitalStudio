'use client';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';

export default function TextReveal({ children, classValue, staggerValue }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Découpage des mots
    const split = new SplitType(textRef.current, { types: 'words' });

    // Wrap chaque mot dans un span avec overflow: hidden
    split.words.forEach((word) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper inline-block overflow-hidden';
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    // Ajout du stagger via transition-delay
    split.words.forEach((word, i) => {
      word.style.transitionDelay = `${i * staggerValue}s`;
    });

    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.word').forEach(w => w.classList.add('is-visible'));
          } else {
            entry.target.querySelectorAll('.word').forEach(w => w.classList.remove('is-visible'));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(textRef.current);

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, [staggerValue]);

  return (
    <div className="overflow-hidden flex items-center z-[3]">
      <div ref={textRef} className={`${classValue} h-full leading-none`}>
        {children}
      </div>
    </div>
  );
}
