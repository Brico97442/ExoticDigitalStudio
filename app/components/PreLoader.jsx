'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { animateCounter } from '../utils/animation'; // Assurez-vous que le chemin est correct
import Image from 'next/image';
import logo from "../../assets/LogoExoticDigitalStudioWhiteVectorised.webp"

function PreLoader() {
    const container = useRef(null);
    const progressBar = useRef(null);
    const counterProgressBar = useRef(null);
    const counterNumberRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false)


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
        tl.to(container.current, {
            yPercent: -100,
            ease: "power4.out",
            delay: 5.4,
            duration: 0.8,
            onComplete: () => {
                if (typeof loadingComplete === 'function') {
                    loadingComplete(true);
                }
                if (container.current && loadingComplete) {
                    container.current.style.display = 'none';

                }
            }
        });

        if (!mounted || !counterNumberRef.current) return;
        animateCounter(counterNumberRef);

    }, [mounted, loadingComplete]);

    if (!mounted) return null;


    return (
        <div className="w-screen h-screen bg-teal-950 justify-center items-center z-[11] fixed flex left-0 " ref={container}>
            <div className='mx-[50px] flex justify-between items-center w-full'>
                <h2 className='text-white mr-20 text-sm'>
                    Reunion Island Studio
                </h2>
                <div className='flex absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
                    <Image objectFit="cover" src={logo} className="" alt="logo de la compagnie" width={280} height={100}/>
                </div>
                <p className='text-xs text-white'>Since 2024</p>
            </div>
                <h1 ref={counterNumberRef} className='absolute left-[50px] bottom-[50px] text-[240px] text-white z-[1]'>0</h1>
        </div>
    );
}

export default PreLoader;