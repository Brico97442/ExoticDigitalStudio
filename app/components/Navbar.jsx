import { forwardRef, useState, useEffect } from "react"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioVectorised.webp"
import Magnetic from '../utils/Magnetic'
import Aside from './Aside'

const Navbar = forwardRef(function Index(props, ref) {
    const [isActive, setIsActive] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

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
        <header className="flex w-full absolute h-[150px] items-center justify-center z-[6]">
            <nav className="flex justify-between w-full font-bold items-center px-[50px]">
                <Magnetic>
                    <TransitionLink href='/' label={<Image objectFit="cover" src={logo} className="" alt="logo de la compagnie" width={110} height={80} />} />
                </Magnetic>
                <ul className="flex items-center transition text-black text-lg">
                    <div className={`flex gap-[70px] z-[6] transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[100px]'}`}>
                        <li className=" h-full transition ease hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/" label="Accueil" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/pricing" label="Services" />
                            </Magnetic>
                        </li>
                        <li className=" transition ease hover:text-white  z-[5]">
                            <Magnetic>
                                <TransitionLink href="/contact" label="Contact" />
                            </Magnetic>
                        </li>
                    </div>
                    <li onClick={toggleAside} className={`absolute right-[50px] justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px] z-[6] ${isScrolled ? 'flex opacity-100 max-w-[100px] transition-all ease duration-1000' : 'hidden opacity-0 max-w-0 overflow-hidden  transition-all ease duration-1000'}`}>
                        <div className="fixed flex justify-center w-full items-center z-[6]">
                            <Magnetic>
                                <div className={`${isActive ? 'burger-active' : 'burger-menu'} `}>
                                    <div ref={ref} className="bounds">
                                    </div>
                                </div>
                            </Magnetic>
                        </div>
                    </li>
                </ul>
                <Aside isOpen={isActive} onClose={toggleAside} />
            </nav>
            {isActive && <div className="h-screen fixed top-0 w-full bg-black/25 blur-[1px] z-[0] border-none transition-all duration-1000 opacity-[1]" />}
        </header>
    )
})

export default Navbar;