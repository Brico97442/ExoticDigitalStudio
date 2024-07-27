import React, { useRef, useEffect } from 'react';
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

export default function Model() {
    const { nodes } = useGLTF("/media/reunion.glb");
    const { viewport } = useThree();
    const island = useRef();
    const materialRef = useRef();

    useEffect(() => {
        if (island.current) {
            // Animation de la position de l'île
            gsap.from(island.current.position, {
                y: -1,
                x: 1,
                duration: 2
            });
            gsap.to(island.current.position, {
                z: -4,
                duration: 2
            });
            // Configuration initiale du matériau
            materialRef.current.color.set("#0f4c5c");
            materialRef.current.transparent = true;
            materialRef.current.opacity = 0.5; // Mettre l'opacité à 50%
        }
    }, []);

    useFrame(() => {
        if (island.current) {
            // Rotation sur l'axe Y
            // island.current.rotation.y += 0.001;

            // Exemple d'animation de l'opacité (oscillation)
            // materialRef.current.opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);
        }
    });

    return (
        <group scale={viewport.width / 3.5}>
            <mesh ref={island} geometry={nodes.reunion.geometry}>
                <meshStandardMaterial ref={materialRef} />
            </mesh>
        </group>
    );
}
