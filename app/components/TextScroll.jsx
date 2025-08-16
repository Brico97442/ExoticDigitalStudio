"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextScroll({ value , classValue}) {
    const textRefs = useRef([]);

    useEffect(() => {
        // textRefs.current.forEach((textRef) => {
        //     if (textRef) {
        //         // Split the text into characters and words
        //         const splitText = new SplitType(textRef, { types: 'chars, words' });

        //         // Create the animation
        //         gsap.from(splitText.chars, {
        //             scrollTrigger: {
        //                 trigger: textRef,
        //                 start: 'center 80%',
        //                 end: 'center 60%',
        //                 scrub: 1,
        //                 markers: false,
        //                 // once: true,
        //                 // toggleActions:"play none none none"
        //             },
        //             yPercent: 100,
        //             opacity: 1,
        //             ease: "power4.inOut",
        //             visibility: "visible",
        //             scrub: 1,
        //             duration: 10,
        //             stagger: 0.09,
        //             delay: 1
        //         });
        //     }
        // });




    }, []);

    return (
        <div className='text-scroll flex overflow-hidden z-60'>
            <div>
                <p ref={el => textRefs.current[0] = el} className={`${classValue} mr-[10px] lg:mr-[50px] text-target tracking-tighter leading-none overflow-hidden`} >{value}</p>
            </div >
        </div>
    );
}
