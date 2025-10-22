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
            label: "Tarifs",
            href: "/pricing",
        },
        {
            label: "Realisations",
            href: "/realisations",
        },
        {
            label: "Contact",
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
            className='h-full w-full fixed top-0 flex right-0 justify-center items-center z-[7] bg-[#003049]'
            onClick={handleOverlayClick}
        >
            <div className='fixed w-full h-screen'></div>
            <aside ref={contentRef} className='w-full flex h-full justify-center items-start flex-col'>
        
                <div className='border-box w-full'>
                    {/* <h1 className='leading-none text-[1.5em]'></h1> */}
                    <nav id='navlink-menu'>
                        <ul ref={overlayTextRef} className='flex flex-col items-center'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <TransitionLink
                                        href={item.href}
                                        label={item.label}
                                        onClick={handleLinkClick}
                                    >
                                     <HackHover data={item.label} iterationTiming='40' classValue='tracking-tighter uppercase leading-none hover:text-[#771A66] text-[32px] lg:text-[150px] text-white w-full'/>
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