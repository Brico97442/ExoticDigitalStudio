"use client"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioWhite.png"
import { forwardRef, useState } from "react"
import Magnetic from '../utils/Magnetic'
import Aside from './Aside'

const Navbar = forwardRef(function Index(props, ref) {

    const [isActive, setIsActive] = useState(false)
    return (
        <header className="flex w-full absolute h-[100px] items-center justify-center z-[5]">
            <nav className="flex justify-between w-full font-bold items-center uppercase mix-blend-difference">
                <Magnetic>
                    <TransitionLink href='/' className='' label={<Image src={logo} className="ml-[30px] mt-10 " alt="logo de la compagnie" width={100} height={80} />} />
                </Magnetic>
                <ul className="flex gap-6 mr-6 items-center transition  text-[#660708] text-lg">
                    {!isActive&&<div className="flex gap-6 z-[6]">
                        <li className="transition ease hover:border-t-2 hover:border-white hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/" label="Accueil" />
                            </Magnetic>

                        </li >
                        <li className=" transition ease hover:border-t-2 hover:border-white hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/pricing" label="Tarifs" />
                            </Magnetic>

                        </li>
                        <li className="transition ease hover:border-t-2 hover:border-white hover:text-white z-[5]">
                            <Magnetic>
                                <TransitionLink href="/contact" label="Contact" />
                            </Magnetic>

                        </li>
                    </div>}
                    <li className=" relative transition ease flex justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px] z-[5]">
                        <div className="fixed flex justify-center w-full items-center z-[5]">
                            <Magnetic>
                                <div className={`${isActive ? 'burger-active' : 'burger-menu'}`} onClick={() => { setIsActive(!isActive) }}>
                                    <div ref={ref} className="bounds">
                                    </div>
                                </div>
                            </Magnetic>
                        </div>
                    </li>
                </ul>
                {isActive && <Aside />}
            </nav>
        </header>
    )
})

export default Navbar;
