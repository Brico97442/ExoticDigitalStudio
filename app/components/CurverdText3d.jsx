import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useControls } from "leva";

const CurvedText3d = ({ words = ["CREATIVE", "WEB", "STUDIO","CREATIVE", "WEB", "STUDIO"] }) => {
  const groupRef = useRef();
  const letterRefs = useRef([]);

  const {
    positionX, positionY, positionZ,
    fontSize, textColor,
    arcRadius, arcAngle, verticalArc,
    letterSpacing, wordSpacing,
    baseAnimationSpeed,
    flipText
  } = useControls("Curved Text 3D", {
    positionX: { value: 0, min: -50, max: 50, step: 0.1 },
    positionY: { value: 0, min: -50, max: 50, step: 0.1 },
    positionZ: { value: 6, min: -50, max: 50, step: 0.1 },

    fontSize: { value: 1.2, min: 0.1, max: 10, step: 0.05 },
    textColor: "#771A66",

    arcRadius: { value: 15, min: 5, max: 360, step: 0.5 },
    arcAngle: { value: Math.PI * 1.2, min: 0.5, max: 10, step: 0.05 },
    verticalArc: { value: -2, min: -20, max: 20, step: 0.1 },

    letterSpacing: { value: 0.8, min: 0, max: 5, step: 0.01 },
    wordSpacing: { value: 2, min: 0, max: 5, step: 0.01 },

    baseAnimationSpeed: { value: 1, min: -5, max: 15, step: 0.1 },

    flipText: true
  });

  // --- Lettres avec poids ---
  const letters = useMemo(() => {
    const arr = [];
    words.forEach((word, wi) => {
      word.split("").forEach((char) => arr.push({ char, weight: letterSpacing }));
      if (wi < words.length - 1) arr.push({ char: "•", weight: wordSpacing });
    });
    return arr;
  }, [words, letterSpacing, wordSpacing]);

  const totalWeight = useMemo(() => letters.reduce((acc, l) => acc + l.weight, 0), [letters]);
  const animRef = useRef({ offset: 0, baseSpeed: baseAnimationSpeed });

  // --- Sync vitesse avec slider ---
  useEffect(() => {
    animRef.current.baseSpeed = Math.sign(animRef.current.baseSpeed) * Math.abs(baseAnimationSpeed);
  }, [baseAnimationSpeed]);

  // --- Scroll inversé ---
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      animRef.current.baseSpeed = Math.abs(baseAnimationSpeed) * -Math.sign(e.deltaY);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [baseAnimationSpeed]);

  // --- Animation ---
  useFrame((state, delta) => {
    animRef.current.offset += animRef.current.baseSpeed * delta;

    // Wrap infini
    animRef.current.offset = animRef.current.offset % totalWeight;
    if (animRef.current.offset < 0) animRef.current.offset += totalWeight;

    const anglePerUnit = arcAngle / totalWeight;

    letterRefs.current.forEach((letterRef, idx) => {
      if (!letterRef) return;

      let cumulative = 0;
      for (let i = 0; i < idx; i++) cumulative += letters[i].weight;

      const angle = -arcAngle / 2 + (cumulative - animRef.current.offset) * anglePerUnit;

      const x = Math.cos(angle) * arcRadius;
      const z = Math.sin(angle) * arcRadius;
      const y = Math.sin(angle) * verticalArc; // courbure verticale

      letterRef.position.set(x, y, z);

      let rotationY = -angle + Math.PI / 2;
      if (flipText) rotationY += Math.PI;
      letterRef.rotation.set(0, rotationY, 0);
    });
  });

  letterRefs.current = Array(letters.length);

  return (
    <group ref={groupRef} position={[positionX, positionY, positionZ]}>
      {letters.map((l, i) => (
        <Text
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          fontSize={fontSize}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          // font="/font/mapolice.woff2"
        >
          {l.char}
        </Text>
      ))}
    </group>
  );
};

export default CurvedText3d;
