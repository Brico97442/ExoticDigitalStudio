'use client'
import useMousePosition from "./CursorTest";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {

  const [isHovered, setIsHovered] = useState(false)
  const { x, y } = useMousePosition()
  const size = isHovered ? 600 : 40;

  return (
    <main className='main-mask-container'>
      <motion.div
        className="mask"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`

        }}
        transition={{ type: 'tween', ease: 'backOut', duration:0.5}}
      >
        <p onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}
          className="w-[1000px] ">
          Vos décisions d'aujourd'hui seront <span className="text-white uppercase">vos réussites et vos succès</span> de demain
        </p>
      </motion.div>
      <div className="body-mask">
        <p className="w-[1000px] text-blue-100">
          Le monde se modernise et les sites internet aussi, aujourd'hui, votre site internet se doit se refléter les valeurs les plus ancrées de votre entreprise
        </p>
      </div>
    </main>
  );
}
