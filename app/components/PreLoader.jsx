'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { animateCounter } from '../utils/animation'; // Assurez-vous que le chemin est correct
import Image from 'next/image';
import logo from "../../assets/LogoExoticDigitalStudioWhiteVectorised.webp"

function PreLoader() {
    const container = useRef(null);
    // const progressBar = useRef(null);
    // const counterProgressBar = useRef(null);
    const counterNumberRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false)
    const videoRef = useRef(null);


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
        if (!mounted || !container.current) return;

        const tl = gsap.timeline();

        // Fade out and hide the PreLoader
        // tl.to(container.current, {
        //     yPercent: -100,
        //     ease: "power4.out",
        //     // delay: 5.4,
        //     delay: 7,
        //     duration: 0.8,
        //     onComplete: () => {
        //         if (typeof loadingComplete === 'function') {
        //             loadingComplete(true);
        //         }
        //         if (container.current && loadingComplete) {
        //             container.current.style.display = 'none';
        //         }
        //     }
        // });

        if (!mounted || !counterNumberRef.current) return;
        animateCounter(counterNumberRef);

        if (videoRef.current) {
            videoRef.current.play();
        }

    }, [mounted, loadingComplete]);

    if (!mounted) return null;


    return (
        <div className="w-screen h-screen bg-black justify-center items-center z-[11] fixed flex left-0 " ref={container}>
            <div className='w-full h-full flex justify-center '>
                <div className='relative mx-[20px] lg:mx-[50px] flex justify-center lg:justify-between items-center w-full'>
                    <h2 className='absolute left-0 lg:right-0 top-[20px] lg:top-[50vh] text-white text-sm'>
                        Reunion Island Studio
                    </h2>
                    <div className=' absolute flex w-[200px] lg:w-full h-full flex justify-center items-center'>
                        {/* <Image objectFit="cover" src={logo} className="" alt="logo de la compagnie" width={280} height={100} /> */}
                        <video
                            ref={videoRef}
                            width="300"
                            height="100"
                            autoPlay
                            muted
                            className="object-cover"
                            loading="lazy"
                        >
                            <source src="media/LogoExoticDigitalStudioWhiteVectorised.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p className='absolute left-0 bottom-[20px] lg:bottom-[50vh] text-xs text-white'>Since 2024</p>
                </div>
                <div className='absolute w-full bottom-[20px] lg:bottom-[50px]'>
                    <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className='h-[13vh] lg:h-[20vh] flex items-center relative bottom-[0px] lg:bottom-[0px]'>
                        <h1 ref={counterNumberRef} className='absolute right-[20px] lg:right-[50px] text-[100px] lg:text-[240px] text-white z-[1] leading-none'>0</h1>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default PreLoader;