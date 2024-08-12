"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate, motion, transform, useMotionValue, useSpring } from "framer-motion";
import UseMousePosition from "./CursorTest";

export default function StickyCursor({ stickyElement }) {
  const { x, y } = UseMousePosition(); // Hook pour obtenir la position de la souris
  const [isHovered, setIsHovered] = useState(false); // État pour gérer le survol du curseur

  const cursorRef = useRef(null);
  const cursorRef2 = useRef(null);
  const curSorSize = isHovered ? 80 : 30;

  // Définir la valeur de mouvement et les paramètres pour le mouvement fluide
  const mouseX = useMotionValue(x);
  const mouseY = useMotionValue(y);

  const smoothOptions = {
    damping: 20,
    stiffness: 280,
    mass: 0.5,
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    const { left, top, width, height } = stickyElement.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: x - center.x, y: y - center.y };

    // Mettre à jour les valeurs de mouvement pour le curseur
    if (stickyElement.current) {
      if (isHovered) {
        // Rotation du Custom Cursor
        const angle = Math.atan2(distance.y, distance.x);
        animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });

        // Étirer le curseur selon la distance entre le pointer et le Custom cursor
        const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        mouseX.set(center.x + distance.x * 0.1 - curSorSize / 2);
        mouseY.set(center.y + distance.y * 0.1 - curSorSize / 2);
      } else {
        mouseX.set(x - curSorSize / 2);
        mouseY.set(y - curSorSize / 2);
      }
    } else {
      mouseX.set(x - curSorSize / 2);
      mouseY.set(y - curSorSize / 2);
    }
  }, [x, y, curSorSize, isHovered, stickyElement, scale,mouseX,mouseY]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(cursorRef.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 }, { type: "spring" });
  };

  useEffect(() => {
    const navBarElement = stickyElement.current;

    if (navBarElement) {
      navBarElement.addEventListener("mouseenter", handleMouseOver);
      navBarElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        navBarElement.removeEventListener("mouseenter", handleMouseOver);
        navBarElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [stickyElement]);

  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <>
      <motion.div
        transformTemplate={template}
        ref={cursorRef}
        style={{ left: smoothMouseX, top: smoothMouseY, scaleX: scale.x, scaleY: scale.y }}
        animate={{ width: curSorSize, height: curSorSize }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
        className="z-[5] fixed rounded-full flex justify-center items-center pointer-events-none bg-teal-500 cursor-auto mix-blend-difference"
      ></motion.div>
      <div>
        <div className="absolute w-full h-full backdrop-blur-[200px] z-[1]"></div>
        <motion.div
          id="blob"
          ref={cursorRef2}
          style={{ left: smoothMouseX, top: smoothMouseY, transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: 360 }}
          transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
          className="fixed rounded-full flex justify-center items-center h-[300px] w-[300px] bg-gradient-to-r from-red-600 via-indigo-500 to-red-500 cursor-auto pointer-events-none mix-blend-difference"
        ></motion.div>
      </div>
    </>
  );
}

