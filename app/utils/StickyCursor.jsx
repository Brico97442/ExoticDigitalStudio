"use client";
import React, { useState, useEffect, useRef } from "react";
import { animate, motion, transform, useMotionValue, useSpring } from "framer-motion";
import UseMousePosition from "./CursorTest";
import { usePathname } from 'next/navigation';

export default function StickyCursor({ stickyElement, heroSection }) {
    const pathname = usePathname();
  const { x, y } = UseMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  const cursorRef = useRef(null);
  const cursorRef2 = useRef(null);
  const curSorSize = isHovered ? 80 : 20;
  const curSorSize2 = isHeroHovered ? 120 : 20;
  const mouseX = useMotionValue(x);
  const mouseY = useMotionValue(y);

  
  const smoothOptions = {
    damping: 20,
    stiffness: 350,
    mass: 0.4,
  };
  
  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };
  
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);
  
  const currentCursorSize = isHeroHovered ? curSorSize2 : curSorSize;
  const effectiveCursorSize = isLinkHovered ? 0 : currentCursorSize;


  //   // Vérifier si nous sommes sur la page d'accueil
  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  useEffect(() => {
    if (!stickyElement || !stickyElement.current) return;

    const { left, top, width, height } = stickyElement.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: x - center.x, y: y - center.y };

    // Déterminer quelle taille de curseur utiliser

    if (stickyElement.current) {
      if (isHovered) {
        const angle = Math.atan2(distance.y, distance.x);
        animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });
        const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        mouseX.set(center.x + distance.x * 0.1 - effectiveCursorSize / 2);
        mouseY.set(center.y + distance.y * 0.1 - effectiveCursorSize / 2);
      } else {
        mouseX.set(x - effectiveCursorSize / 2);
        mouseY.set(y - effectiveCursorSize / 2);
        animate(cursorRef.current, { rotate: 0 }, { duration: 0 });
      }
    }

  }, [x, y, curSorSize, curSorSize2, isHovered, isHeroHovered, isLinkHovered, stickyElement, scale, mouseX, mouseY, effectiveCursorSize]);

  const handleMouseOver = () => {
    setIsHovered(true);
    setIsHeroHovered(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(cursorRef.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 });
  };

  const heroMouseOver = () => {
      setIsHeroHovered(true);
      setIsHovered(false); // S'assurer que le hover du sticky element est désactivé
      setCursorText("Scrollez"); // Définis le texte lors du survol du hero
 
  };

  const heroMouseLeave = () => {
    setIsHeroHovered(false);
    setCursorText("");
    animate(cursorRef.current, { scaleX: 1, scaleY: 1}, { duration: 0.1 });
  };

  useEffect(() => {
    const navBarElement = stickyElement.current;
    const heroElement = document.querySelector('#hero'); // Utiliser querySelector au lieu de .current
    
    if (navBarElement) {
      navBarElement.addEventListener("mouseenter", handleMouseOver);
      navBarElement.addEventListener("mouseleave", handleMouseLeave);
    }

    if (heroElement && isHomePage) {
      heroElement.addEventListener("mouseenter", heroMouseOver);
      heroElement.addEventListener("mouseleave", heroMouseLeave);
    }

    return () => {
      if (navBarElement) {
        navBarElement.removeEventListener("mouseenter", handleMouseOver);
        navBarElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (heroElement && isHomePage) {
        heroElement.removeEventListener("mouseenter", heroMouseOver);
        heroElement.removeEventListener("mouseleave", heroMouseLeave);
      }
    };
  }, [stickyElement,isHomePage]);

  // Réduire le curseur à 0 lors du hover sur n'importe quel lien TransitionLink (#navigation-link)
  useEffect(() => {
    const handleOver = (event) => {
      const linkAncestor = event.target && event.target.closest ? event.target.closest('#navigation-link') : null;
      if (linkAncestor) {
        setIsLinkHovered(true);
      }
    };
    const handleOut = (event) => {
      const fromLink = event.target && event.target.closest ? event.target.closest('#navigation-link') : null;
      if (fromLink) {
        const toElement = event.relatedTarget;
        const stillInsideLink = toElement && toElement.closest && toElement.closest('#navigation-link') === fromLink;
        if (!stillInsideLink) {
          setIsLinkHovered(false);
        }
      }
    };

    document.addEventListener('mouseover', handleOver, true);
    document.addEventListener('mouseout', handleOut, true);

    return () => {
      document.removeEventListener('mouseover', handleOver, true);
      document.removeEventListener('mouseout', handleOut, true);
    };
  }, [pathname]);

  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <>
      <motion.div
        transformTemplate={template}
        ref={cursorRef}
        style={{ left: smoothMouseX, top: smoothMouseY, scaleX: scale.x, scaleY: scale.y }}
        animate={{ width: effectiveCursorSize, height: effectiveCursorSize }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
        className={`z-[6] fixed rounded-full invisible lg:visible flex justify-center ${isHeroHovered? 'backdrop-blur-sm': 'backdrop-blur-sm'} items-center pointer-events-none bg-purple-500 cursor-auto mix-blend-difference`}
      >
        <span className="text-black text-lg mix-blend-normal text-center flex justify-center items-center tracking-tighter">
          {cursorText}
        </span></motion.div>
      <div>
        <div className="fixed w-full h-[300vh] top-0 backdrop-blur-[130px] z-[1]" />
        <motion.div
          id="blob"
          ref={cursorRef2}
          animate={{ rotate: 360 }}
          style={{ left: smoothMouseX, top: smoothMouseY, transform: 'translate(-50%, -50%)' }}
          transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
          className="fixed rounded-full flex justify-center items-center h-[180px] w-[180px] bg-gradient-to-r from-teal-950 to-purple-950 cursor-auto pointer-events-none"
        />
      </div>
    </>
  );
}