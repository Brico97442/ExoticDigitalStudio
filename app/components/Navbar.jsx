"use client"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioWhite.png"
import { forwardRef } from "react"
import Magnetic from '../utils/Magnetic'
const Navbar = forwardRef(function index(props, ref) {

    return (
        <header className="flex w-full absolute h-[100px] items-center justify-center z-[5]">
            <nav className="flex justify-between w-full font-bold items-center uppercase text-[#660708] text-lg">
                <Magnetic>
                    <TransitionLink href='/' className='mix-blend-difference' label={<Image src={logo} className="ml-[30px] mt-10 " alt="logo de la compagnie" width={100} height={80} />} />
                </Magnetic>
                <ul className="flex gap-6 mr-6 items-center transition">
                    <li className="transition hover:border-t-2 hover:border-white hover:text-white z-[4]">
                        <Magnetic>
                            <TransitionLink href="/" label="Accueil" />
                        </Magnetic>

                    </li >
                    <li className=" transition hover:border-t-2 hover:border-white hover:text-white z-[4]">
                        <Magnetic>
                            <TransitionLink href="/pricing" label="Tarifs" />
                        </Magnetic>

                    </li>
                    <li className="transition hover:border-t-2 hover:border-white hover:text-white z-[4] mix-blend-difference">
                        <Magnetic>
                            <TransitionLink href="/contact" label="Contact" />
                        </Magnetic>

                    </li>
                    <li className=" relative transition flex justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px] ">
                        <div className="fixed flex justify-center w-full items-center ">
                            <Magnetic>
                                <div className="burger-menu">
                                    <div ref={ref} className="bounds">
                                    </div>
                                </div>
                            </Magnetic>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
})

export default Navbar;
