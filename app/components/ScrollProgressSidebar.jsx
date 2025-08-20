"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressSidebar() {
  const circleRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let animationFrame;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      // Mettre à jour le DOM directement pour fluidité
      if (barRef.current) barRef.current.style.height = `${scrolled}%`;
      if (circleRef.current) circleRef.current.style.top = `calc(${scrolled}% - 8px)`;

      animationFrame = requestAnimationFrame(updateScroll);
    };

    animationFrame = requestAnimationFrame(updateScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={sidebarContainerStyle}>
      <div ref={barRef} style={progressBarStyle} className="blur-sm" />
      <div ref={circleRef} style={circleStyle} />
    </div>
  );
}

// Styles inline modernes
const sidebarContainerStyle = {
  position:"fixed",
  right: 40,
  width: "6px",
  height: "20svh",
  backgroundColor: "#ECECEC",
  borderRadius: "6px",
  overflow: "hidden",
  zIndex: 8,
  border:"none",
  outline:"none",
};

const progressBarStyle = {
  width: "100%",
  background: "linear-gradient(to bottom, #072737, #00cfff)",
  borderRadius: "6px",
  border:"none",
  outline:"none",
};

const circleStyle = {
  position: "absolute",
  width: "6px",
  height: "40px",
  backgroundColor: "#771A66",
  borderRadius: "6px",
  border:"none",
  outline:"none",
};
