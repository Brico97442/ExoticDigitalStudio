import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

           
                <div className='w-10 h-10 rounded-full border-black border-[1px]'></div>
         
        )
    }

    return (
        <div className='h-full w-full z-[0] flex items-center justify-center overflow-hidden'>
            <div id='hero-scroll' className='flex flex-col items-center bg-blur-sm uppercase tracking-tighter font-bold absolute'>
                <div ref={slider} className='flex relative whitespace-nowrap' >
                    <h1 ref={text1} className='absolute left-[100%] text-[270px] flex items-center leading-none'>SiteWeb<Dot />Design<Dot />Seo<Dot />Ui-Ux<Dot/></h1>
                    <h1 ref={text2} className=' text-[270px] flex items-center leading-none'>SiteWeb<Dot />Design<Dot />Seo<Dot />Ui-Ux<Dot /></h1>
                </div>
            </div>
        </div >
    )
}

export default HorizontalScroll
