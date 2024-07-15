"use client"
import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/LogoExoticDigitalStudioWhite.png"
import { forwardRef } from "react"

const Navbar = forwardRef(function index(props, ref) {
    return (
        <header className="fixed w-full z-40 mix-blend-difference">
            <nav className="flex justify-between font-bold items-center p-3 uppercase text-yellow-100">
                <Link href='/'><Image src={logo} alt="logo de la compagnie" width={150} height={60} /></Link>
                <ul className="flex gap-6 mr-6 items-center">
                    <li className="transition z-40">
                        <Link href="/">Accueil</Link>
                    </li >
                    <li className=" transition z-40">
                        <Link href="/pricing">Nos Tarifs</Link>
                    </li>
                    <li  className="transition z-40">
                        <Link href="/contact">Contact</Link>
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
