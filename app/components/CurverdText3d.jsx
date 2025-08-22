import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useControls } from "leva";

const CurvedText3dFinal = ({
  content = "STUDIO • CREATIV • WEB •",
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
    positionZ: { value: 11.6, min: -50, max: 50, step: 0.1 },

    fontSize: { value:2.55, min: 0.1, max: 10, step: 0.05 },
    radius: { value: 15, min: 5, max: 50, step: 0.1 },
    curveHeight: { value: 0.2, min: 0, max: 10, step: 0.1 },
    arcAngle: { value: 6.28, min: 0.1, max: Math.PI * 2, step: 0.01 },
    letterSpacing: { value:1.55, min: 0, max: 5, step: 0.05 },
    wordSpacing: { value: 0.2, min: 0, max: 10, step: 0.1 },

    animationSpeed: { value: 1, min: -10, max: 10, step: 0.1 },
    showDots: false,
    textColor: "#771A66",
  });

  // --- Génération des lettres avec répétitions automatiques ---
  const letters = useMemo(() => {
    // Construire la séquence de base (un cycle du texte)
    const makeCycle = () => {
      const arr = [];
      const words = content.split(" ");
      words.forEach((word, wi) => {
        word.split("").forEach((char) =>
          arr.push({ char, weight: letterSpacing })
        );
        if (wi < words.length - 1 && showDots)
          arr.push({ char: "•", weight: wordSpacing });
      });
      // petit espace après chaque cycle
      arr.push({ char: " ", weight: wordSpacing });
      return arr;
    };

    const baseLetters = makeCycle();
    const baseWeight = baseLetters.reduce((a, l) => a + l.weight, 0);

    // calcul de combien de fois répéter pour couvrir l'arc
    const neededRepeats = Math.ceil((arcAngle * radius) / baseWeight);

    let arr = [];
    for (let r = 0; r < neededRepeats; r++) {
      arr = arr.concat(makeCycle());
    }
    return arr;
  }, [content, letterSpacing, wordSpacing, showDots, arcAngle, radius]);

  const totalWeight = useMemo(
    () => letters.reduce((a, l) => a + l.weight, 0),
    [letters]
  );

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
    animRef.current.offset += animRef.current.speed * delta; // pas de modulo

    const anglePerUnit = arcAngle / totalWeight;

    letters.forEach((_, idx) => {
      const cumulative = letters.slice(0, idx).reduce((a, l) => a + l.weight, 0);

      const angle = ((totalWeight - cumulative) - animRef.current.offset) * anglePerUnit;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;

      const y = Math.sin(angle - arcAngle / 2) * curveHeight;

      const letter = groupRef.current.children[idx];
      if (letter) {
        letter.position.set(x, y, z);
        letter.rotation.set(0, 0, 0);
      }
    });

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
