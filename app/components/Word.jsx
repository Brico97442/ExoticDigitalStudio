"use client"
import React, { Children, useRef } from "react"
import { useScroll, motion, useTransform } from "framer-motion"

export default function Paragraphe({ value }) {

    const element = useRef(null)
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.25']
    })
    const words = value.split("")

    return (
    <p style={{ opacity: scrollYProgress }} className="<paragraphe gap-2 bg-black leading-none flex h-[100vh] text-[40px] flex-wrap mw-[1000px] p-40 justify-center items-center">
        {
            words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length)
                return <Word key={i} range ={[start,end]} progress={scrollYProgress}>{word}</Word>
            })
        }
    </p>

    )
}
const Word = ({children,range,progress}) => {
    const opacity = useTransform(progress,range, [0,1])
    return(
    <motion.span style={{opacity}} >{children}</motion.span>
)
}
