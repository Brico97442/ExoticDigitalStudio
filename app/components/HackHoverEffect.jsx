'use client'

import React, { useRef, useEffect} from 'react'
import gsap from 'gsap';

export default function HackHover({data,classValue,iterationTiming}) {
    const textRef = useRef(null);
    const letters = "abcdefghijklmnopqrstuvwxyz";

    useEffect(() => {

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
    }, []);


    return (

            <div>
                <h1
                    ref={textRef}
                    className={`${classValue} tracking-tighter border-box `}
                    data-value={data}
                >
                    {data}
                </h1>
            </div>
    );
}

