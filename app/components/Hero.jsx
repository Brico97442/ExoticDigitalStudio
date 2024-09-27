'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/media/art1.jpg'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function Hero() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    return (
        <div className="relative h-[300vh]">
            <div className=" top-0 h-screen flex items-center justify-center bg-red-500" ref={containerRef}>
                <motion.div
                    style={{
                        scale,
                    }}
                    className="flex justify-center items-center w-[25vw] h-[25vh]"

                >
                    <Image
                        src={HeroImg}
                        alt="oeuvre photographique d'une femme"
                    />
                </motion.div>
            </div>
        </div>
    );
}