
'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

function PreLoader({ animationComplete }) {
    const container = useRef(null);
    const textRef = useRef(null);
    const progressBar = useRef(null);
    const [mounted, setMounted] = useState(false);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'*ù$/#.?!#.?!#.?!#.?!#.?!#.?!#.?!#.?!";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !textRef.current || !container.current) return;
        if (progressBar.current) {
            gsap.to(progressBar.current, {
                scaleX: 0,
                duration: 1,
                ease: 'linear',
                delay: 2,
                onComplete: () => {
                    gsap.to(progressBar.current, {
                        scaleX: 1,
                        duration: 0.4,
                        delay: 2,
                        ease: 'linear',
                        onComplete: () => {
                            gsap.to(progressBar.current, {
                                opacity: 0
                            })
                        }
                    })
                }
            });

        }

        gsap.to(textRef.current, {
            x: '-37.1vw',
            opacity: 1,
            duration: 1,
            ease: 'linear',
            delay: 6.4,
        });

        gsap.to(container.current, {
            ease: 'power4.inOut',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 1.4,
            delay: 5.6,
        });

        if (!animationComplete && container?.current) {
            gsap.to(container.current.style, {
                zIndex: -1,
                duration: 1.4,
            });
        }

        const applyIterationEffect = () => {
            const textElement = textRef.current;
            let iteration = 0;

            const interval = setInterval(() => {
                textElement.innerText = textElement.dataset.value
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return textElement.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= textElement.dataset.value.length) {
                    clearInterval(interval);
                }

                iteration += 2 / 3;
            }, 40);
        };


        // Ajoutez un délai avant d'exécuter l'effet d'itération
        const timeoutId = setTimeout(() => {
            applyIterationEffect();


        }, 10000); // Délai en millisecondes
        return () => clearTimeout(timeoutId);


    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className={`w-full h-screen bg-black ${animationComplete ? 'hidden' : 'visible'} justify-center items-center z-[6] ${animationComplete ? 'fixed' : 'absolute'} left-0`} ref={container}>
            <div className='flex flex-col justify-center items-center gap-[10px] relative'>
                <h1
                    ref={textRef}
                    className={`text-[36px] bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-red-700 whitespace-nowrap leading-none top-[45vh] ${animationComplete ? 'fixed' : 'absolute'}`}
                    data-value="Exotik Digital Studio"
                >
                    Bienvenue
                </h1>

                <div id='progress-bar-body' className='absolute top-[50vh] w-[15vw] flex-row-reverse flex justify-between h-[3px]'>
                    <div className='w-full h-[2px] '>
                        <div ref={progressBar} className='w-full h-[2px] bg-white'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreLoader;
