'use client'
import { forwardRef, useState, useEffect, useRef } from "react"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioWhiteVectorised.png"
import Magnetic from '../utils/Magnetic'
import Aside from './Aside'
import TextReveal from "./TextReveal"

const Navbar = forwardRef(function Index(props, ref) {
    const [isActive, setIsActive] = useState(false);
    const [showAside, setShowAside] = useState(false);
    const hideTimerRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        if (isActive) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        
        // Cleanup au démontage
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isActive]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAside = () => {
        // Annule un éventuel timer de fermeture si on ré-ouvre rapidement
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
            hideTimerRef.current = null
        }

        if (!isActive) {
            // Ouverture: on monte l'aside ET on active l'animation en même temps
            setShowAside(true)
            setIsActive(true) // Suppression du requestAnimationFrame
        } else {
            // Fermeture: lance l'animation de sortie puis démonte après la durée GSAP (~400ms)
            setIsActive(false)
            hideTimerRef.current = setTimeout(() => {
                setShowAside(false)
                hideTimerRef.current = null
            }, 400)
        }
    }

    return (
        <header className="flex w-full fixed h-[80px] lg:h-[180px] items-center justify-center z-[6] ">
            <nav className="flex justify-between w-full items-center px-[10px] lg:px-[80px]   ">
                <Magnetic>
                    {!isActive && (
                      <div id="logo-link" className="flex z-[6]  mix-blend-difference invisible">
                        <TransitionLink href='/' label={<Image src={logo} alt="logo de la compagnie" className="z-[100]" width={80} height={55.83} />} />
                      </div>
                    )}
                </Magnetic>
                <ul className="flex items-center transition text-[#ECECEC] text-lg">
                    <div id='navlink' className={`flex gap-[50px] lg:visible z-[6] transition-all duration-300 ease-in-out text-[14px] lg:text-[22px] ${isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[100px]'}`}>
                        <li className=" transition ease hover:text-[#771A66] z-[5]">
                            <Magnetic>
                                <TransitionLink href="/pricing" label="Tarifs" />
                            </Magnetic>
                        </li>

                        <li className=" transition ease hover:text-[#771A66] z-[5]">
                            <Magnetic>
                                <TransitionLink href="/realisations" label="Réalisations" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-[#771A66]  z-[5]">
                            <Magnetic>
                                <TransitionLink href="/contact" label="Contact" />
                            </Magnetic>
                        </li>
                    </div>
                    <li onClick={toggleAside} className={`absolute mix-blend-difference  right-[15px] lg:right-[80px] justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px] z-[20] ${(isScrolled || isActive) ? 'flex opacity-100 max-w-[100px] transition-all ease duration-500' : 'hidden opacity-0 max-w-0 overflow-hidden  transition-all ease duration-500'}`}>
                        <div className="fixed flex justify-center w-full items-center z-[30] mix-blend-difference">
                            <Magnetic>
                                <div className={`group burger-menu w-auto mix-blend-difference background-difference ${isActive ? 'burger-active' : ''}`}>
                                    <div ref={ref} className=" bounds mix-blend-difference flex justify-center items-center transition-all duration-300 ease-in-out">
                                    </div>
                                         <p
  className={`
    mix-blend-difference p-6 scale-[1] text-[1em] uppercase
    ${isActive ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}
    group-hover:opacity-0 group-hover:scale-0 group-active:opacity-0 group-active:scale-0 group-active:invisible
    transition-all duration-300 ease-in-out
  `}
>
  menu
</p>
                                </div>
                            </Magnetic>
                        </div>
                    </li>
                </ul>
            </nav>
                {showAside && <Aside isOpen={isActive} onClose={toggleAside} />}
        </header>
    )
})

export default Navbar;