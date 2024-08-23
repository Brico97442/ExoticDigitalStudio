import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function HorizontalScrollReverse() {
    const band = useRef(null) // Initialize as an array to store multiple refs
    const band2 = useRef(null)

    useEffect(() => {
        if (band.current && band2.current) {

            // Animation for band 1
            gsap.set(band.current, {
                x: `${100}%`,
            })
            gsap.to(band.current, {
                x: `${-100}%`,
                duration: 20,
                ease: 'linear',
                scrollTrigger: {
                    trigger: band.current,
                    start: 'top 90%',
                    scrub: 15,
                    markers: false,
                    duration: 20,

                }
            })



            gsap.set(band2.current, {
                x: `${-100}%`,
            })
            gsap.to(band2.current, {
                x: `${100}%`,
                duration: 20,
                ease: 'linear',
                scrollTrigger: {
                    trigger: band2.current,
                    start: 'top 90%',
                    scrub: 15,
                    markers: false,
                    duration: 20,
                }
            })



        }

        // Cleanup on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div className='h-full w-full z-[2] flex items-center justify-center overflow-hidden mb-20'>
            <div className='w-[120vw] flex flex-col items-center relative bg-gray-200/25 bg-blur-sm uppercase'>

                <div className='w-full flex gap-40 justify-center p-3' ref={band} >

                    <div className='w-full flex gap-20 justify-center p-6'>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience</h1>

                    </div>
                    <div className='w-full flex gap-20 justify-center p-6'>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap  flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience Web</h1>
                    </div>
                    <div className='w-full flex gap-20 justify-center p-6'>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap  flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience Web</h1>
                    </div>
                </div>

                <div className='w-full flex gap-40 justify-center p-3' ref={band2}>

                    <div className='w--full flex gap-20 justify-center p-6' >
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience</h1>

                    </div>
                    <div className='w-full flex gap-20 justify-center p-6'>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap  flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience Web</h1>
                    </div>
                    <div className='w-full flex gap-20 justify-center p-6'>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Développement Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap  flex'>Conception Web</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Réactif</h1>
                        <h1 className='text-5xl  w-full whitespace-nowrap flex'>Expérience Web</h1>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default HorizontalScrollReverse
