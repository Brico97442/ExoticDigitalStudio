"use client"
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { MeshBasicMaterial, Color } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { animateIsland, animateIslandIntro } from "./animation";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function Model({ mousePosition, island }) {
  const { nodes } = useGLTF(
    "/media/reunion2.glb",
    true,
    true,
    (loader) => {
      loader.setDRACOLoader(new DRACOLoader().setDecoderPath("/draco/"));
    }
  );

  const { viewport, size } = useThree();
  const scaleFactor = isMobile ? 1.6 : 0.95;
  const groupScale = (viewport.width / 2.4) * scaleFactor;

  useEffect(() => {
    if (!island.current) return;

    // Rotation initiale
    const initialRotationX = 25 * (Math.PI / 180);
    const initialRotationY = -80 * (Math.PI / 180);
    island.current.rotation.set(initialRotationX, initialRotationY, 0);

    // Matériau simple : wireframe, couleur et transparence
    island.current.material = new MeshBasicMaterial({
      color: new Color(0, 48 / 255, 83 / 255),
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    island.current.visible = false;

    const runIntro = () => animateIslandIntro(island);
    if (typeof window !== "undefined" && window.__preloaderDone) {
      runIntro();
    } else {
      window.addEventListener("preloaderDone", runIntro, { once: true });
    }

    animateIsland(island);

    return () => {
      window.removeEventListener("preloaderDone", runIntro);
    };
  }, [island]);

  // Animation légère basée sur la souris
  useFrame(() => {
    if (!island.current) return;
    island.current.rotation.y += mousePosition.x * 0.01;
    island.current.rotation.x += mousePosition.y * 0.01;
  });

  return (
    <group scale={groupScale}>
      <mesh
        ref={island}
        geometry={nodes.reunion.geometry}
        scale={[0.015, 0.015, 0.015]}
        position={[-0.08, 0.08, -0.3]}
        castShadow={!isMobile}
        receiveShadow={!isMobile}
      />
    </group>
  );
}
