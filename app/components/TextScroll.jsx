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
                gsap.from(splitText.words, {
                    scrollTrigger: {
                        trigger: textRef,
                        start: 'top 80%',
                        end: 'top 25%',
                        scrub: true,
                        markers: false,
                    },
                    y: `${100}vh`,
                    opacity: 1,
                    ease: "power4.inOut",
                    visibility: "visible",
                    duration: .2,
                    stagger: 0.08,
                    delay: 0.6
                });
            }
        });




    }, []);

    return (
        <div className='text-scroll text-black text-7xl w-full h-[120vh] flex items-center justify-center p-20'>
            <div>
                <h1 ref={el => textRefs.current[0] = el} className="text-target text-gray-200 leading-normal ">{value}</h1>
            </div >

        </div>
    );
}
