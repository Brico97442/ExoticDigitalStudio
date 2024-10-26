'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children }) {
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            // Split the text into characters and words
            const splitText = new SplitType(textRef.current, { types: 'chars, words' });

            // Create the animation
            gsap.from(splitText.chars, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    end: 'top 25%',
                    scrub: true,
                    markers: false,
                },
                y: `${100}vh`,
                opacity: 0,
                ease: "power4.inOut",
                visibility: "visible",
                duration: .4,
                stagger: 0.05,  // Adjust the stagger for smoother animation
                delay: 0.6
            });
        }
    }, []);

    return (
        <div className='text-scroll w-full flex items-center justify-center z-60'>
            <div ref={textRef} className="h-full leading-none overflow-hidden"  style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"} }>
                {children}
            </div>
        </div>
    );
}
