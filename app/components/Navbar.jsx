"use client"
import TransitionLink from "../utils/TransitionLink"
import Image from "next/image"
import logo from "../../assets/LogoExoticDigitalStudioWhite.png"
import { forwardRef } from "react"

const Navbar = forwardRef(function index(props,ref) {

    return (
        <header className="fixed w-full z-20  ">
            <nav className="flex justify-between font-bold items-center p-3 uppercase text-[#5F0F40] text-2xl">
                <TransitionLink href='/' label={<Image src={logo} alt="logo de la compagnie" width={150} height={60} />}/> 
                <ul className="flex gap-6 mr-6 items-center mix-blend-difference">
                    <li className="transition z-20">
                        <TransitionLink href="/" label="Accueil"/>
                    </li >
                    <li className=" transition z-20">
                        <TransitionLink href="/pricing" label="Tarifs"/>
                    </li>
                    <li  className="transition z-20">
                        <TransitionLink href="/contact" label="Contact"/>
                    </li>
                    <li className=" relative transition flex justify-center items-center cursor-pointer  w-[35px] h-[18px] p-[30px]">
                        <div className="fixed flex justify-center w-full items-center ">
                            <div className="burger-menu">
                                <div ref={ref} className="bounds" >
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
})

export default Navbar;
