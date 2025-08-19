'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, classValue, staggerValue }) {
  const textRef2 = useRef(null);

  useEffect(() => {
    let splitText;
    if (textRef2.current) {
      splitText = new SplitType(textRef2.current, { types: 'words' });
  
      const tl = gsap.timeline({ paused: true });
      tl.from(splitText.words, {
        yPercent: 100,
        opacity: 0,
        stagger: staggerValue,
        duration: 0.8,
        ease: "power4.out",
      });
  
      ScrollTrigger.create({
        trigger: textRef2.current,
        start: "top 85%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    }
  
    return () => {
      // Nettoyage
      splitText?.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [staggerValue]);
  

  return (
    <div className="text-scroll flex items-center tracking-tighter z-[3]">
      <div
        ref={textRef2}
        className={`${classValue} h-full leading-none overflow-hidden`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        {children}
      </div>
    </div>
  );
}
