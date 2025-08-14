'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { animateCounter, animateHeroIntro, animateNavLinksIntro, prepareNavLinksIntro } from '../utils/animation';
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
    const scrollLockYRef = useRef(0);


    useEffect(() => {
        setMounted(true);
        const body = document.body;
        const html = document.documentElement;

        const lockScroll = () => {
            scrollLockYRef.current = window.scrollY || window.pageYOffset || 0;
            // Assure-toi de démarrer en haut
            if (scrollLockYRef.current !== 0) {
                window.scrollTo(0, 0);
                scrollLockYRef.current = 0;
            }
            body.style.position = 'fixed';
            body.style.top = `-${scrollLockYRef.current}px`;
            body.style.left = '0';
            body.style.right = '0';
            body.style.width = '100%';
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
            html.style.overscrollBehavior = 'none';
        };

        const unlockScroll = () => {
            const y = Math.abs(parseInt(body.style.top || '0', 10)) || 0;
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.width = '';
            body.style.overflow = '';
            html.style.overflow = '';
            html.style.overscrollBehavior = '';
            window.scrollTo(0, y);
        };

        if (!loadingComplete) {
            // Masquer les liens pendant le préchargement pour éviter tout flash
            try { body.classList.add('preloading-active'); } catch {}
            lockScroll();
        } else {
            try { body.classList.remove('preloading-active'); } catch {}
            unlockScroll();
        }

        return () => {
            // Toujours déverrouiller au démontage par sécurité
            if (!loadingComplete) {
                unlockScroll();
            }
        };
    }, [loadingComplete]);

    useEffect(() => {
        if (!mounted || !container.current) return;

        // Prépare l'intro des liens (navbar/logo/aside) pour éviter tout flash à l'arrivée
        try { prepareNavLinksIntro(); } catch {}

        if (!mounted || !counterNumberRef.current) return;
        // Lance le compteur et, lorsqu'il termine, joue la sortie du preloader puis libère le scroll
        animateCounter(counterNumberRef, () => {
            if (!container.current) return;
            gsap.to(container.current, {
                yPercent: -100,
                ease: "power4.out",
                duration: 0.8,
                onComplete: () => {
                    // Dernier filet: garder les liens masqués jusqu'au déclenchement effectif des intros
                    try { document.body.classList.add('preloading-active'); } catch {}
                    // S'assurer que les liens sont encore masqués juste avant l'apparition
                    try { prepareNavLinksIntro(); } catch {}
                    setLoadingComplete(true);
                    if (container.current) {
                        container.current.style.display = 'none';
                    }
                    // Signale la fin du preloader et déclenche l'intro du hero
                    try { window.__preloaderDone = true; window.dispatchEvent(new Event('preloaderDone')); } catch {}
                    requestAnimationFrame(() => {
                        animateHeroIntro();
                        try {
                            animateNavLinksIntro();
                            // Marque cette route comme animée pour éviter un deuxième déclenchement immédiat
                            window.__navLinksIntroPlayedForPath = window.location?.pathname || '/';
                        } catch {}
                        // Retire la classe de masquage une fois les intros parties
                        try { document.body.classList.remove('preloading-active'); } catch {}
                    });
                }
            });
        });

        if (videoRef.current) {
            videoRef.current.play();
        }

    }, [mounted, loadingComplete]);

    if (!mounted) return null;


    return (
        <div className="w-screen h-[100dvh] bg-black justify-center items-center z-[11] fixed flex left-0 " ref={container}>
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