import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import localFont from 'next/font/local'

gsap.registerPlugin(ScrollTrigger)

const Guisol = localFont({
    src: '../font/Guisol.otf',// Vous pouvez ajouter des options supplémentaires ici
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
                <div className='w-4 h-4 lg:w-10 lg:h-10 rounded-full border-black border-[2px]'></div>
        )
    }

    return (
        <div className={`${Guisol.className} absolute h-full w-full z-[6] flex items-center justify-center overflow-hidden`}>
            <div id='hero-scroll' className='flex flex-col items-center bg-transparent uppercase font-bold absolute bottom-[35vh] lg:bottom-[15vh]'>
                <div ref={slider} className='flex relative whitespace-nowrap pointer-events-none' >
                    <h1 ref={text1} className='absolute left-[100%] text-[10vh] lg:text-[300px] mix-blend-difference flex items-center pointer-events-none tracking-wide leading-none'>Studio<Dot />Creativ<Dot />Web<Dot /></h1>
                    <h1 ref={text2} className=' text-[10vh]  lg:text-[300px] flex items-center mix-blend-difference pointer-events-none tracking-wide leading-none'>Studio<Dot />Creativ<Dot />Web<Dot /></h1>
                </div>
            </div>
        </div >
    )
}

export default HorizontalScroll
