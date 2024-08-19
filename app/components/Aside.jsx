import React, { useEffect, useRef } from 'react'
import { animateOverlayIn, animateOverlayOut ,animateOverlayText} from "../utils/animation"
import TransitionLink from "../utils/TransitionLink"

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
            className='h-full w-1/3 fixed top-0 flex right-0 bg-red-500 justify-center items-center z-[2]'
            onClick={handleOverlayClick}
        >
            <aside ref={contentRef} className='w-full flex items-center flex-col'>
                <div className='w-full border-box ' ref={overlayTextRef}>
                    <h1 className='leading-none text-[1.5em] '>Navigation</h1>
                    <nav>
                    <hr className=' w-[80%] mt-6'/>
                        <ul className='flex flex-col gap-4 mt-10'>
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
        </div>
    )
}

export default Aside