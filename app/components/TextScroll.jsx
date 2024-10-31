'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextScroll({value}) {
    const textRefs = useRef([]);

    useEffect(() => {
        textRefs.current.forEach((textRef) => {
            if (textRef) {
                // Split the text into characters and words
                const splitText = new SplitType(textRef, { types: 'chars, words' });

                // Create the animation
                gsap.from(splitText.chars, {
                    scrollTrigger: {
                        trigger: textRef,
                        start: 'center 90%',
                        end: 'center 60%',
                        scrub: 2,
                        markers: false,
                        // once: true,
                        // toggleActions:"play none none none"
                    },
                    yPercent: 100,
                    opacity: 1,
                    ease: "power4.inOut",
                    visibility: "visible",
                    scrub: 8,
                    duration: 7,
                    stagger: 0.09,
                    delay: 0.7
                });
            }
        });




    }, []);

    return (
        <div className='text-scroll w-screen flex items-center justify-center overflow-hidden z-60'>
            <div>
                <h1 ref={el => textRefs.current[0] = el} className="ml-[50px] text-target text-[148px] w-3/4 tracking-tighter leading-none overflow-hidden text-white" >{value}</h1>
            </div >
        </div>
    );
}
