import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import localFont from 'next/font/local'

gsap.registerPlugin(ScrollTrigger)

const Guisol = localFont({
    src: '../font/Guisol.woff',// Vous pouvez ajouter des options supplémentaires ici
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
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.5,
                start: 0,
                end: window.innerHeight,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-500px",
        })
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
                    scrub: 15,
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
                    scrub: 15,
                    markers: false,
                    duration: 20,

                }
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const Dot = () => {
        return (
            <div className='w-4 h-4 lg:w-10 lg:h-10 rounded-full border-[#003049] border-[2px] mx-[10px]'></div>
        )
    }

    return (
        <div id='hero-scroll-container' className={` absolute text-[#771A66] bottom-[37vh] lg:bottom-[17vh] h-[7vh] lg:h-[25vh] left-0 w-full z-[6] flex items-center justify-center overflow-hidden`} >
            <div id='hero-scroll' className='flex flex-col items-center uppercase font-bold absolute z-[6]' >
                <div id='slider'ref={slider} className='flex relative whitespace-nowrap z-[6] pointer-events-none' >
                    <h1 ref={text1} className='absolute  z-[6] left-[100%] text-[10vh] lg:text-[200px] flex items-center pointer-events-none tracking-tighter drop-shadow-lg leading-none'>studio<Dot />Creativ<Dot />Web<Dot /></h1>
                    <h1 ref={text2} className=' text-[10vh]  z-[6]  lg:text-[200px] flex items-center pointer-events-none tracking-tighter drop-shadow-lg leading-none'>studio<Dot />Creativ<Dot />Web<Dot /></h1>
                </div>
            </div>
        </div >
    )
}

export default HorizontalScroll
