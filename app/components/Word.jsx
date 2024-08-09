"use client"
import React, { useRef } from "react"
import { useScroll, motion, useTransform } from "framer-motion"

export default function Paragraphe({ value }) {

    const element = useRef(null)
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.3' , 'end 0.7']
    })
    const words = value.split("")

    return (
        <p ref={element} style={{ opacity: scrollYProgress }} className="z-60 flex h-screen flex-wrap bg-[#001524] text-2xl items-center mw-[1280px] p-40 opacity[0]">
            {
                words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length)
                    return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word}</Word>
                })
            }
        </p>

    )
}
const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1])
    return (
            <span className='m-1 flex text-6xl font-bold flex-wrap relative text-orange-500 z-60'>
                <span className="flex w-full absolute opacity-[0.1] text-orange-600 z-60">{children}</span>
                <motion.span style={{ opacity ,zIndex:60 }}>{children}</motion.span>
            </span>
    )

}
