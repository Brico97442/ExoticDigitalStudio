import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useControls } from "leva";

const CurvedText3dFinal = ({
  content = "CREATIVE WEB STUDIO",
  baseSpeed = 1,
}) => {
  const groupRef = useRef();
  const animRef = useRef({ offset: 0, speed: baseSpeed });

  // --- Leva Controls ---
  const {
    positionX,
    positionY,
    positionZ,
    fontSize,
    radius,
    curveHeight,
    arcAngle,
    letterSpacing,
    wordSpacing,
    animationSpeed,
    showDots,
    textColor,
  } = useControls("Curved Text 3D", {
    positionX: { value: 0, min: -50, max: 50, step: 0.1 },
    positionY: { value: 0, min: -50, max: 50, step: 0.1 },
    positionZ: { value: 6, min: -50, max: 50, step: 0.1 },

    fontSize: { value: 1.2, min: 0.1, max: 10, step: 0.05 },
    radius: { value: 15, min: 5, max: 50, step: 0.1 },
    curveHeight: { value: 3, min: 0, max: 10, step: 0.1 },
    arcAngle: { value: Math.PI * 1.5, min: 0.1, max: Math.PI * 2, step: 0.01 },
    letterSpacing: { value: 0.8, min: 0, max: 5, step: 0.05 },
    wordSpacing: { value: 2, min: 0, max: 10, step: 0.1 },

    animationSpeed: { value: 1, min: -10, max: 10, step: 0.1 },
    showDots: true,
    textColor: "#771A66",
  });

  // --- Préparer les lettres avec espacement mots et lettres ---
  const letters = useMemo(() => {
    const arr = [];
    const words = content.split(" ");
    words.forEach((word, wi) => {
      word.split("").forEach((char) => arr.push({ char, weight: letterSpacing }));
      if (wi < words.length - 1 && showDots) arr.push({ char: "•", weight: wordSpacing });
    });
    return arr;
  }, [content, letterSpacing, wordSpacing, showDots]);

  const totalWeight = useMemo(() => letters.reduce((a, l) => a + l.weight, 0), [letters]);

  // --- Scroll inversé ---
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      animRef.current.speed = Math.abs(animationSpeed) * -Math.sign(e.deltaY);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [animationSpeed]);

  // --- Animation ---
  useFrame((_, delta) => {
    animRef.current.offset = (animRef.current.offset + animRef.current.speed * delta) % totalWeight;
    const anglePerUnit = arcAngle / totalWeight;

    letters.forEach((_, idx) => {
      const cumulative = letters.slice(0, idx).reduce((a, l) => a + l.weight, 0);

      // Angle horizontal pour placer sur l'arc
      const angle = ((totalWeight - cumulative) - animRef.current.offset) * anglePerUnit;

      // Position 3D
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;

      // Courbure verticale centrée
      const y = Math.sin(angle - arcAngle / 2) * curveHeight;

      const letter = groupRef.current.children[idx];
      if (letter) {
        letter.position.set(x, y, z);
        letter.rotation.set(0, 0, 0); // lettres droites
      }
    });

    // Déplacer le groupe entier
    groupRef.current.position.set(positionX, positionY, positionZ);
  });

  return (
    <group ref={groupRef}>
      {letters.map((l, i) => (
        <Text
          key={i}
          fontSize={fontSize}
          anchorX="center"
          anchorY="middle"
          color={textColor}
        >
          {l.char}
        </Text>
      ))}
    </group>
  );
};

export default CurvedText3dFinal;
