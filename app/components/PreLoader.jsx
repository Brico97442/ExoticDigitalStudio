'use client'

import React, { useRef, useEffect, useState } from 'react'

function PreLoader() {
    const textRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'*ù$/#.?!#.?!#.?!#.?!#.?!#.?!#.?!#.?!";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

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
            }, 30);
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
        <div className='w-full h-full bg-black fixed z-[100] top-0 left-0'>
            <div className='flex h-full justify-center items-center'>
                <h1
                    ref={textRef}
                    className='w-full text-[120px] text-center text-white uppercase'
                    data-value="Exotik Digital Studio"
                >
                Exotik Digital Studio

                </h1>
            </div>
        </div>
    )
}

export default PreLoader