'use client'
import React, { useEffect, useRef } from 'react'
import { animateOverlayIn, animateOverlayOut, animateOverlayText } from "../utils/animation"
import TransitionLink from "../utils/TransitionLink"
import Curve from "./Curve"
import { motion } from 'framer-motion';

function Aside({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const overlayTextRef = useRef(null);
    const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`
    const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`

    // const curve = {
    //     initial: {
    //         d: initialPath
    //     },
    //     enter: {
    //         d: targetPath,
    //         transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    //     },
    //     exit: {
    //         d: initialPath,
    //         transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    //     }
    // }
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
            className='h-full w-1/3 fixed top-0 flex right-0 justify-center items-center z-[2] bg-gray-500'
            onClick={handleOverlayClick}
        >
            <aside ref={contentRef} className='w-full flex h-full items-center pt-40 flex-col'>
        
                <div className='w-full border-box ml-40 h-full ' >
                    <h1 className='leading-none text-[1.5em]'>Navigation</h1>
                    <nav>
                        <hr className='w-[80%] h-[1px] mt-6' />
                        <ul ref={overlayTextRef} className='flex flex-col gap-4 mt-60 text-2xl'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <TransitionLink
                                        href={item.href}
                                        label={item.label}
                                        onClick={handleLinkClick}
                                    >
                                        {item.label}
                                    </TransitionLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
         {/* <Curve /> */}
        </div>
    )
}

export default Aside