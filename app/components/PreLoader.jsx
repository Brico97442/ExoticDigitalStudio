// 'use client'

// import React, { useRef, useEffect, useState } from 'react'
// import gsap from 'gsap';

// function PreLoader() {
//     const textRef = useRef(null);
//     const progressBarLeft = useRef(null);
//     const progressBarRight = useRef(null);
//     const [mounted, setMounted] = useState(false);
//     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'*ù$/#.?!#.?!#.?!#.?!#.?!#.?!#.?!#.?!";

//     useEffect(() => {
//         setMounted(true);
//     }, []);



//     useEffect(() => {
//         if (!mounted) return;

//         if (progressBarLeft.current && progressBarRight.current) {
//             gsap.from(progressBarRight.current, {
//                 width: `${100}%`,
//                 duration: 5,
//                 ease: 'linear',
//             });
//             gsap.to(progressBarLeft.current, {
//                 width: `${100}%`,
//                 duration: 5,
//                 ease: 'linear',
//             });
//         }

//         const handleMouseOver = (event) => {
//             let iteration = 0;

//             const interval = setInterval(() => {
//                 event.target.innerText = event.target.dataset.value
//                     .split("")
//                     .map((letter, index) => {
//                         if (index < iteration) {
//                             return event.target.dataset.value[index];
//                         }
//                         return letters[Math.floor(Math.random() * 26)];
//                     })
//                     .join("");

//                 if (iteration >= event.target.dataset.value.length) {
//                     clearInterval(interval);
//                 }

//                 iteration += 2 / 3;
//             }, 30);
//         };


//         const textElement = textRef.current;
//         if (textElement) {
//             textElement.addEventListener("mouseover", handleMouseOver);
//         }

//         return () => {
//             if (textElement) {
//                 textElement.removeEventListener("mouseover", handleMouseOver);
//             }
//         };
//     }, [mounted]);

//     if (!mounted) return null;

//     return (
//         <div className='w-full h-full bg-black fixed z-[100] top-0 left-0'>
//             <div className='flex  flex-col h-full justify-center items-center'>
//                 <h1
//                     ref={textRef}
//                     className='w-full text-[120px] text-center text-white uppercase'
//                     data-value="Exotik Digital Studio"
//                 >
//                     WELCOME TO
//                 </h1>
//                 <div className='w-full flex justify-center h-[3px]'>
//                     <div id='progress-bar-body' className='w-[30vw] flex-row-reverse flex justify-between h-[3px]'>
//                         <div className='w-full h-[2px]'>
//                             <div ref={progressBarLeft} className='w-[0%] h-[2px] bg-white'></div>
//                         </div>
//                         <div className='w-full h-[2px] bg-white'>
//                             <div ref={progressBarRight} className='w-[0%] h-[2px] bg-black'></div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default PreLoader;
'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

function PreLoader({animationComplete}) {
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
        if ( progressBar.current) {
            // gsap.to(progressBarLeft.current, {
            //     width: '100%',
            //     duration: 1,
            //     ease: 'linear',
            //     delay: 2,
            //     onComplete: () => {
            //         gsap.to(progressBarLeft.current, {
            //             width: '0%',
            //             duration: 0.4,
            //             ease: 'linear',
            //         })
            //     }
            // });

            gsap.to(progressBar.current, {
                scaleX: 0,
                duration: 1,
                ease: 'linear',
                delay: 2,
                onComplete: () => {
                    gsap.to(progressBar.current, {
                        scaleX: 1,
                        duration: 0.4,
                        delay:2,
                        ease: 'linear',
                        onComplete:()=>{
                            gsap.to(progressBar.current, {
                                opacity:0
                            })
                        }
                    })
                }
            });
        }

        gsap.to(textRef.current, {
            x: '-40vw',
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
            onComplete: () => {
                // container.current.style.display = 'none'

            }
        });

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

        }, 10000); // Délai en millisecondes avant de commencer l'effet d'itération

        // Nettoyez le timeout si le composant est démonté
        return () => clearTimeout(timeoutId);

    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className={`w-full h-full bg-black flex justify-center items-center fixed z-[7] top-0 left-0`} ref={container}>
            <div className='flex flex-col justify-center items-center gap-[10px] relative'>
                <h1
                    ref={textRef}
                    className='text-[25px] text-white whitespace-nowrap leading-none'
                    data-value="Exotik Digital Studio"
                >
                    Bienvenue
                </h1>

                <div id='progress-bar-body' className='w-[15vw] flex-row-reverse flex justify-between h-[3px]'>
                    <div className='w-full h-[2px] '>
                        <div ref={progressBar} className='w-full h-[2px] bg-white'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreLoader;
