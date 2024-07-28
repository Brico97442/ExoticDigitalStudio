"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function StickyCursorIndex({ stickyElement }) {

  const [isHovered, setIsHovered] = useState(false);
  const curSorSize = isHovered ? 80 : 35;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = {
    damping: 25, stiffness: 210, mass: 0.5
  }

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = stickyElement.current.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };



    if (isHovered) {
      // const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      // const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3])
      // const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8])
      // scale.x.set(newScaleX)
      // scale.y.set(newScaleY)


      mouse.x.set((center.x - curSorSize / 2) + distance.x * 0.1);
      mouse.y.set((center.y - curSorSize / 2) + distance.y * 0.1);
    } else {
      mouse.x.set(clientX - curSorSize / 2);
      mouse.y.set(clientY - curSorSize / 2);
    }
  }

  const manageMouseOver = () => {
    setIsHovered(true);
  }
  const manageMouseLeave = () => {
    setIsHovered(false);
  }

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove)
    stickyElement.current.addEventListener("mouseover", manageMouseOver)
    stickyElement.current.addEventListener("mouseleave", manageMouseLeave)
    return () => {
      window.removeEventListener("mousemove", manageMouseMove)
      stickyElement.current.removeEventListener("mouseover", manageMouseOver)
      stickyElement.current.removeEventListener("mouseleave", manageMouseLeave)
    }
  }, [])
  return (
    <div>
      <motion.div
        style={{ left: smoothMouse.x, top: smoothMouse.y }}
        className="rounded-[50%] w-[60px] h-[60px] bg-orange-400 cursor-auto fixed mix-blend-difference"
        animate={{ width: curSorSize, height: curSorSize, zIndex: 0 }}
      >
      </motion.div>
    </div>

  )
}
