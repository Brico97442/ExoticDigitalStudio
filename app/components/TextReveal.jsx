'use client';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';

export default function TextReveal({ children, classValue, staggerValue }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: 'words' });

    // Wrap chaque mot
    split.words.forEach((word) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper inline-block overflow-hidden';
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    // Définir delays entrée ET sortie
    const total = split.words.length;
    split.words.forEach((word, i) => {
      word.style.setProperty('--delay-in', `${i * staggerValue}s`);
      word.style.setProperty('--delay-out', `0s`); // plus de cascade
    });

    // Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-hidden');
          } else {
            entry.target.classList.remove('is-visible');
            entry.target.classList.add('is-hidden');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -25% 0px' }
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
