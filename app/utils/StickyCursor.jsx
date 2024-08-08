"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMousePosition from "./CursorTest";

export default function StickyCursor({ stickyElement }) {

  const { x, y } = useMousePosition(); // Hook pour obtenir la position de la souris 

  const [isHovered, setIsHovered] = useState(false); // État pour gérer le survol du curseur

  const curSorSize = isHovered ? 80 : 40;

  // Définir la valeur de mouvement et les paramètres pour le mouvement fluide

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOptions = {
    damping: 25,
    stiffness: 200,
    mass: 0.5,
  };

  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    if (stickyElement.current) {
      const { left, top, width, height } = stickyElement.current.getBoundingClientRect();
      const center = { x: left + width / 2, y: top + height / 2 };

      // Mettre à jour les valeurs de mouvement pour le curseur fluide
      if (isHovered) {
        mouseX.set(center.x - curSorSize / 2);
        mouseY.set(center.y - curSorSize / 2);
      } else {
        mouseX.set(x - curSorSize / 2);
        mouseY.set(y - curSorSize / 2);
      }
    } else {
      // Cas où stickyElement.current est null
      mouseX.set(x - curSorSize / 2);
      mouseY.set(y - curSorSize / 2);
    }
  }, [x, y, curSorSize, isHovered, stickyElement]);

  // Gestion du survol via les props en utilisant React
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const navBarElement = stickyElement.current;

    if (navBarElement) {
      // Utiliser les gestionnaires d'événements React pour gérer le survol
      navBarElement.addEventListener("mouseenter", handleMouseOver);
      navBarElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        navBarElement.removeEventListener("mouseenter", handleMouseOver);
        navBarElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [stickyElement]);

  return (
    <motion.div
      style={{ left: smoothMouseX, top: smoothMouseY }}
      animate={{ width: curSorSize, height: curSorSize }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      className="fixed rounded-full flex justify-center items-center bg-red-500 curser-auto mix-blend-difference z-10"
    >Eds</motion.div>
  );
}
