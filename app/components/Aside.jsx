'use client'
import React, { useEffect, useRef } from 'react'
import { animateOverlayIn, animateOverlayOut, animateOverlayText } from "../utils/animation"
import TransitionLink from "../utils/TransitionLink"
import { motion } from 'framer-motion';
import HackHover from './HackHoverEffect'

function Aside({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const overlayTextRef = useRef(null);
  
    
    const navItems = [
        {
            label: "Le processus",
            href: "/pricing",
        },
        {
            label: "Nos réalisations",
            href: "/works",
        },
        {
            label: "Nous Contactez",
            href: "/contact",
        },
    ]

    useEffect(() => {
        if (isOpen && overlayRef.current && overlayTextRef.current) {
            animateOverlayIn(overlayRef);
            animateOverlayText(overlayTextRef)
        } else if (!isOpen && overlayRef.current && overlayTextRef.current) {
            animateOverlayOut(overlayRef);
        }
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        // Désactivé: on ne ferme plus via le clic hors contenu pour garder le contrôle sur le bouton burger
        return;
    };

    const handleLinkClick = () => {
        if (onClose && typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <div
            id='overlay'
            ref={overlayRef}
            className='h-full w-full fixed top-0 flex right-0 justify-center items-center z-[7]'
            onClick={handleOverlayClick}
        >
            <div className='fixed w-full h-screen bg-[#C1121F] blur-[1px]'></div>
            <aside ref={contentRef} className='w-full flex h-full justify-center items-start flex-col'>
        
                <div className='border-box ml-40'>
                    <h1 className='leading-none text-[1.5em]'></h1>
                    <nav className='w-auto' id='navlink-menu'>
                        <ul ref={overlayTextRef} className='flex flex-col gap-20'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <TransitionLink
                                        href={item.href}
                                        label={item.label}
                                        onClick={handleLinkClick}
                                    >
                                     <HackHover data={item.label} iterationTiming='50' classValue=' leading-none text-[28px] text-white'/>
                                    </TransitionLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Aside