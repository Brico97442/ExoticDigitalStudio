'use client'
import React, { useEffect, useRef } from 'react'
import { animateOverlayIn, animateOverlayOut, animateOverlayText } from "../utils/animation"
import TransitionLink from "../utils/TransitionLink"
import { motion } from 'framer-motion';
import HackHover from './hackHoverEffect'

function Aside({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const overlayTextRef = useRef(null);
  
    
    const navItems = [
        {
            label: "Accueil",
            href: "/",
        },
        {
            label: "Nos Tarifs",
            href: "/pricing",
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
        if (isOpen && !contentRef.current.contains(e.target)) {
            onClose();
        }
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
            className='h-full w-2/3 fixed top-0 flex right-0 justify-center items-center z-[7]'
            onClick={handleOverlayClick}
        >
            <div className='fixed w-full h-screen bg-gray-500  blur-[1px] border-l border-[#003049]'></div>
            <aside ref={contentRef} className='w-full flex h-full items-center pt-40 flex-col'>
        
                <div className='w-full border-box ml-40 h-full ' >
                    <h1 className='leading-none text-[1.5em]'></h1>
                    <nav>
                        <ul ref={overlayTextRef} className='flex flex-col gap-20 mt-40'>
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