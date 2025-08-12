'use client'
import { forwardRef, useState, useEffect } from "react"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioVectorised.webp"
import Magnetic from '../utils/Magnetic'
import Aside from './Aside'

const Navbar = forwardRef(function Index(props, ref) {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAside = () => {
        setIsActive(!isActive)
    }

    return (
        <header className="flex w-full absolute h-[50px] lg:h-[150px] items-center justify-center z-[6]">
            <nav className="flex justify-between w-full items-center px-[10px] lg:px-[50px]">
                <Magnetic>
                    <div className="w-[70px] lg:h-full lg:w-full flex">
                        <TransitionLink href='/' label={<Image src={logo} alt="logo de la compagnie" width={95} height={66.5} />} />
                    </div>
                </Magnetic>
                <ul className="flex items-center transition text-black text-lg">
                    <div id='navlink' className={`flex gap-[50px] lg:visible z-[6] transition-all duration-300 ease-in-out text-[14px] lg:text-[22px] ${isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[100px]'}`}>
                        <li className=" h-full transition ease hover:text-white hover:mix-blend-difference z-[5]">
                            <Magnetic>
                                <TransitionLink href="/" label="Accueil" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/pricing" label="Processus" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/works" label="Réalisations" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-white  z-[5]">
                            <Magnetic>
                                <TransitionLink href="/contact" label="Contact" />
                            </Magnetic>
                        </li>
                    </div>
                    <li onClick={toggleAside} className={`absolute right-[15px] lg:right-[50px] justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px] z-[6] mix-blend-difference ${isScrolled ? 'flex opacity-100 max-w-[100px] transition-all ease duration-1000' : 'hidden opacity-0 max-w-0 overflow-hidden  transition-all ease duration-1000'}`}>
                        <div className="fixed flex justify-center w-full items-center z-[10] mix-blend-difference">
                            <Magnetic>
                                <div className={`${isActive ? 'burger-active' : 'burger-menu'} mix-blend-difference `}>
                                    <div ref={ref} className="bounds">
                                    </div>
                                </div>
                            </Magnetic>
                        </div>
                    </li>
                </ul>
                {/* <Aside isOpen={isActive} onClose={toggleAside} /> */}
            </nav>
            {isActive && <div className="h-screen fixed top-0 w-full bg-black/25 blur-[1px] z-[0] border-none transition-all duration-1000 opacity-[1] mix-blend-difference" />}
        </header>
    )
})

export default Navbar;