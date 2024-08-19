import Link from 'next/link'
import { title } from 'process'
import React, { useEffect, useState } from 'react'
import { animatePageIn } from "../utils/animation"

function Aside({ closeAside, openAside }) {
    const [isOpen, setIsOpen] = useState(false)

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

    openAside = () => {
        setIsOpen(true)
    }
    closeAside = () => {
        setIsOpen(false)
    }
    useEffect(()=>{

    },[])

    return (
        <div className='h-full w-1/3 fixed top-0 flex right-0 bg-red-500 justify-center items-center z-[2]'>
            <aside>
                <div>
                    <h1 className='leading-none text-[1.75em] '>Navigation</h1>
                    <nav id='navigation' >
                        <ul className='flex flex-col gap-4 mt-10'>
                            {navItems.map((item, index) => (
                                <li key={index} >
                                    <Link onClick={()=>{closeAside(!isOpen)}} href={item.href}>{item.label}</Link>
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