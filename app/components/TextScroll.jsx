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
                        start: 'top 80%',
                        end: 'top 10%',
                        scrub: true,
                        markers: false,
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.05,
                    duration: 5,
                });
            }
        });




    }, []);

    return (
        <div className='text-black text-8xl w-full h-[120vh] flex items-center justify-center px-20'>
            <div>
                <p ref={el => textRefs.current[0] = el} className="text-target text-teal-700">{value}</p>
            </div >

        </div>
    );
}
