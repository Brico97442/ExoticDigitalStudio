"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMousePosition from "./CursorTest"; // Assurez-vous que le chemin est correct

export default function StickyCursor({ stickyElement }) {
  const { x, y } = useMousePosition(); // Utilisez le hook pour obtenir la position de la souris

  const [isHovered, setIsHovered] = useState(false); // État pour gérer le survol du curseur

  const curSorSize = isHovered ? 80 : 40; // Taille du curseur en fonction du survol

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
    // Mettre à jour les valeurs de mouvement pour le curseur fluide
    mouseX.set(x - curSorSize / 2);
    mouseY.set(y - curSorSize / 2);
  }, [x, y, curSorSize]);

  // Gestion du survol via les props en utilisant React
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const element = stickyElement.current;

    if (element) {
      // Utiliser les gestionnaires d'événements React pour gérer le survol
      element.addEventListener("mouseenter", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [stickyElement]);

  return (
    <motion.div
      style={{
        left: smoothMouseX,
        top: smoothMouseY,
        width: curSorSize,
        height: curSorSize,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      className="fixed rounded-full bg-red-500 curser-auto mix-blend-difference z-10"
    ></motion.div>
  );
}
