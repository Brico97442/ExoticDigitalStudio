"use client"
import React, { useEffect, useRef } from "react"
import { useScroll, motion } from "framer-motion"

export default function TextScroll({ value }) {
    const element = useRef(null)
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.5', 'start start']
    })

    useEffect(() => {
        scrollYProgress.on("change", e => console.log(e))
    }, [element])
    
    return (
        <motion.p style={{ opacity: scrollYProgress }} ref={element} className="flex h-[100vh] text-[40px] mw-[1280px] p-40 opacity[0]">{value}</motion.p>
    )
}
