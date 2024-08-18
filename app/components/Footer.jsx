import React from 'react'
import Image from 'next/image'
import logo from "../../assets/LogoExoticDigitalStudioWhite.png"
function Footer() {
    return (
        <footer className='z-[4] h-screen text-white w-full bg-black sticky '>
            <Image className='z-[4]' src={logo} alt="logo de la compagnie" width={150} height={100} />
            <h1 className='z-[4]'>footer fan!</h1>
        </footer>
    )
}

export default Footer
