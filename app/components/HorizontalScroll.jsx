import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import localFont from 'next/font/local'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const Guisol = localFont({
    src: '../font/Guisol.woff2',// Vous pouvez ajouter des options supplémentaires ici
    variable: '--font-guisol', // Pour utiliser la police en tant que variable CSS
})

function HorizontalScroll() {
    const text1 = useRef(null)
    const text2 = useRef(null)
    const slider = useRef(null)
    let xPercent = 0;



    useEffect(() => {
        gsap.set(text2.current, { left: text2.current.getBoundingClientRect().width })
        requestAnimationFrame(animate);
    }, [])


    let direction = -1;

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        }
        else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(text1.current, { xPercent: xPercent })
        gsap.set(text2.current, { xPercent: xPercent })
        requestAnimationFrame(animate);
        xPercent += 0.01 * direction;
    }


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: window.innerHeight,
            scrub: 0.5,
            onUpdate: (self) => {
              direction = self.direction * -1;
            },
          });
          
        requestAnimationFrame(animate);
    }, [])




    useEffect(() => {
        if (text1.current) {
            gsap.set(text1.current, {
                x: xPercent,
            })
            gsap.to(text1.current, {
                x: -xPercent,
                duration: 20,
                ease: 'linear',
                scrollTrigger: {
                    trigger: text1.current,
                    start: 'top 90%',
                    scrub: true,
                    markers: false,
                    duration: 20,

                }
            })
            gsap.set(text2.current, {
                x: xPercent,
            })
            gsap.to(text2.current, {
                x: -xPercent,
                duration: 20,
                ease: 'linear',
                scrollTrigger: {
                    trigger: text2.current,
                    start: 'top 90%',
                    scrub: true,
                    markers: false,
                    duration: 20,

                }
            })
        }

        // Animation du scale de #hero-scroll de 1 à 0 lors du scroll
        if ('#hero-scroll-container') {
            gsap.fromTo(
                "#hero-scroll-container",
                {scale: 1, opacity:1 },
                
                {
                    scale: 2,
                    opacity: 0,
                    ease: "power1.inOut",
                    // transformOrigin: "center bottom",
                    scrollTrigger: {
                        trigger: "#hero-scroll-container",
                        start: "top 40%", // quand le haut de #hero-scroll atteint le bas de la fenêtre
                        end: "center top",      // jusqu'à ce qu'il atteigne le haut de la fenêtre
                        scrub: true,
                        markers: false,
                    }
                }
            );

        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const Dot = () => {
        return (
            <div className='w-4 h-4 lg:w-10 lg:h-10 rounded-full inset-[#000]/60 bg-[#000] border-[2px] mx-[10px] backdrop-blur-lg bg-opacity-70'></div>
        )
    }

    return (
        <div id='hero-scroll-container' className={`absolute text-[#ECECEC] bottom-[37vh] lg:bottom-[18vh] h-[7vh] lg:h-[25vh] left-0 w-full z-[5] flex items-center justify-center`}>
            <div id='hero-scroll' className='flex flex-col items-center uppercase font-bold absolute top-0 z-[6] backdrop-blur-[2px] mask-t-from-50% bg-opacity-[50%] rounded-[20%] '>
                <div id='slider' ref={slider} className='flex items-center justify-center relative whitespace-nowrap z-[6] pointer-events-none' >
                    {/* <TextReveal staggerValue={"0.03"} classValue="leading-none lg:w-full flex"> */}
                        <h1 ref={text1} className='absolute z-[6] left-[100%] text-[10vh] flex-row lg:text-[17.942rem] flex items-center pointer-events-none tracking-tighter font-semibold drop-shadow-lg leading-none mix-blend-difference'>
                            studio<Dot />Creativ<Dot />Web<Dot /></h1>
                    {/* </TextReveal> */}
                    {/* <TextReveal staggerValue={"0.03"} classValue="leading-none lg:w-full flex"> */}
                        <h1 ref={text2} className=' text-[10vh] z-[6] lg:text-[17.942rem] flex flex-row items-center pointer-events-none tracking-tighter font-semibold drop-shadow-lg leading-none mix-blend-difference'>studio<Dot />Creativ<Dot />Web<Dot /></h1>
                    {/* </TextReveal> */}

                </div>
            </div>
        </div >
    )
}

export default HorizontalScroll
