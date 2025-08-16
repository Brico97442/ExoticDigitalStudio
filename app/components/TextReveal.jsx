'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, classValue, staggerValue}) {
    const textRef = useRef(null);

    useEffect(() => {
        // if (textRef.current) {
        //     // Split the text into characters and words
        //     const splitText = new SplitType(textRef.current, { types: 'chars, words' });

        //     // Create the animation
        //     gsap.from(splitText.chars, {
        //         scrollTrigger: {
        //             trigger: textRef.current,
        //             start: 'top 80%',
        //             end: 'top 40%',
        //             scrub: 3,
        //             markers: false,
        //             // once:true,
        //             visibility: "hidden",

        //         },
        //         yPercent: 100,
        //         stagger: staggerValue,
        //         duration: 10,
        //         delay: 1,               
        //          opacity: 0,
        //         ease: "power4.inOut",
        //         visibility: "visible",
        //     });
        // }
    }, []);

    return (
        <div className='text-scroll w-full flex items-center tracking-tighter z-[3]'>
            <div ref={textRef} className={`${classValue}h-full leading-none overflow-hidden`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
                {children}
            </div>
        </div>
    );
}
