"use client"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioWhite.png"
import { forwardRef } from "react"
import Magnetic from '../utils/Magnetic'
const Navbar = forwardRef(function index(props,ref) {

    return (
        <header className="fixed w-full z-50 mix-blend-difference">
            <nav className="flex justify-between font-bold items-center uppercase text-[#5F0F40] text-lg">
                <TransitionLink href='/' className='mix-blend-difference' label={<Image src={logo} alt="logo de la compagnie" width={150} height={60} />}/> 
                <ul className="flex gap-6 mr-6 items-center mix-blend-difference">
                    <li className="transition z-50">
                        <TransitionLink href="/" label="Accueil"/>
                    </li >
                    <li className=" transition z-50">
                        <TransitionLink href="/pricing" label="Tarifs"/>
                    </li>
                    <li  className="transition z-50">
                        <TransitionLink href="/contact" label="Contact"/>
                    </li>
                    <li className=" relative transition flex justify-center items-center cursor-pointer w-[35px] h-[18px] p-[30px]">
                        <div className="fixed flex justify-center w-full items-center ">
                        <Magnetic>
                            <div className="burger-menu z-50">
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
