'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';

export default function HackHover({data,classValue,iterationTiming}) {
    const textRef = useRef(null);
    const progressBarLeft = useRef(null);
    const progressBarRight = useRef(null);
    const [mounted, setMounted] = useState(false);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'*ù$/#.?!#.?!#.?!#.?!#.?!#.?!#.?!#.?!";

    useEffect(() => {
        setMounted(true);
    }, []);



    useEffect(() => {
        if (!mounted) return;

        if (progressBarLeft.current && progressBarRight.current) {
            gsap.from(progressBarRight.current, {
                width: `${100}%`,
                duration: 5,
                ease: 'linear',
            });
            gsap.to(progressBarLeft.current, {
                width: `${100}%`,
                duration: 5,
                ease: 'linear',
            });
        }

        const handleMouseOver = (event) => {
            let iteration = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.dataset.value
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }

                iteration += 2 / 3;
            }, 35);
        };


        const textElement = textRef.current;
        if (textElement) {
            textElement.addEventListener("mouseover", handleMouseOver);
        }

        return () => {
            if (textElement) {
                textElement.removeEventListener("mouseover", handleMouseOver);
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return (

            <div>
                <h1
                    ref={textRef}
                    className={`${classValue} tracking-tighter`}
                    data-value={data}
                >
                    {data}
                </h1>
            </div>
    );
}

