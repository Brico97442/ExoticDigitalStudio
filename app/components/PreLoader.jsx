'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

function PreLoader() {
    const container = useRef(null);
    const textRef = useRef(null);
    const progressBar = useRef(null);
    const counterProgressBar = useRef(null);
    const counterNumberRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ{²}'*ù$/#.?!#";
        // const body = document.querySelector('body');

    // if (loadingComplete) {
    //     body.classList.add('fixed');

    // } else {
    //     body.classList.remove('fixed');
    // }
    useEffect(() => {
        
        setMounted(true);
        // Déplacez l'accès au document ici
        const body = document.querySelector('body');
        if (loadingComplete) {
            body.classList.add('fixed');
        } else {
            body.classList.remove('fixed');
        }
    }, [loadingComplete]);

    useEffect(() => {
        if (!mounted || !textRef.current || !container.current) return;

        const tl = gsap.timeline();

        if (progressBar.current) {
            tl.to(progressBar.current, {
                scaleX: 0,
                duration: 1,
                ease: 'linear',
                delay: 1,
            })
                .to(progressBar.current, {
                    scaleX: 1,
                    duration: 0.4,
                    delay: 1,
                    ease: 'linear',
                })
                .to(progressBar.current, {
                    opacity: 0,
                  
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

        tl.add(() => applyIterationEffect());

        // Fade out and hide the PreLoader
        tl.to(container.current, {
            yPercent: -100,
            ease: "power4.out",
            delay: 2,
            duration: 0.8,
            onComplete: () => {
                if (typeof loadingComplete === 'function') {
                    loadingComplete(); 
                }
                if (container.current && loadingComplete) {
                    container.current.style.display = 'none';

                }
            }
        });

    }, [mounted, loadingComplete]);

    if (!mounted) return null;

    return (
        <div className="w-screen h-screen bg-teal-950 justify-center items-center z-[11] fixed flex left-0 " ref={container}>
            {/* Rest of the PreLoader content */}
            <div className='my-[150px]'>
                <div className='flex flex-col justify-center items-center gap-[10px] relative'>
                    <h1
                        ref={textRef}
                        className="text-[36px] bg-clip-text text-transparent bg-gradient-to-r from-white to-white whitespace-nowrap leading-none"
                        data-value="Exotik Digital Studio"
                    >
                        Exotik Digital Studio
                    </h1>
                    <div id='progress-bar-body' className='w-[15vw] flex-row-reverse flex justify-between h-[3px]'>
                        <div className='w-full h-[2px] '>
                            <div ref={progressBar} className='w-full h-[2px] bg-white'></div>
                        </div>
                    </div>
                </div>
                <div id='counter'>
                    <div id='counter-body' className='absolute ml-20 mb-24 bottom-[100vh] w-[20vw]'>
                        <div ref={counterProgressBar} className='w-0 h-full bg-white'>0</div>
                    </div>

                </div>
                <h2 className='absolute left-[50px] text-white mr-20 mb-20 text-sm'>
                    Reunion Island Studio
                </h2>
                <p className='absolute right-[50px] text-xs text-white'>Since 2024</p>
            </div>

        </div>
    );
}

export default PreLoader;

// useEffect(() => {
  //   if (counterProgressBar.current && counterNumberRef.current) {
  //     gsap.to(counterProgressBar.current, {
  //       width: '100%',
  //       duration: 4,
  //       ease: 'linear',
  //       onUpdate: function () {
  //         const progress = Math.round(this.progress() * 100);
  //         counterNumberRef.current.textContent = progress;
  //       },
  //       onComplete: () => {
  //         setLoadingComplete(true);
  //       },
  //     });
  //   }
  // }, []);


   {/* <h1 ref={counterNumberRef} className='fixed ml-20 mt-20 text-4xl z-[1]'>0</h1> */}
        {/* <div className='w-[26vw] h-screen bg-[#003049]/10 bg-gradient-to-t from-[#003049]/65 to-transparent/5 blur-[1px] border border-none absolute left-0 top-0'></div> */}
        {/* <div id='counter'>
          <div id='counter-body' className='absolute ml-20 mb-24 bottom-[100vh] h-1 bg-black w-[20vw]'>
            <div ref={counterProgressBar} className='w-0 h-full bg-white'></div>
          </div>
          <div className='absolute bottom-[100vh] right-0 mr-20 mb-20 text-sm'>
            Reunion Island Studio
          </div>
          <p className='absolute text-xs ml-20 bottom-[100vh] mb-40'>Since 2024</p>
        </div> */}
        {/* {loadingComplete && (
          <p ref={callBtn} className='text-lg w-screen fixed flex justify-center items-center transition-ease-2 bottom-[100vh] mb-20 hover:scale-100 transition ease-out duration-500 hover:opacity-25'>
            Loading complete
          </p>
        )} */}