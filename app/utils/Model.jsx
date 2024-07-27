import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

export default function Model() {
    const { nodes } = useGLTF('/media/reunion.glb');
    const { viewport } = useThree();
    const island = useRef(null);
    const materialRef = useRef(null);

    useEffect(() => {
        if (island.current && materialRef.current) {
            // Initialisation des propriétés du matériau
            materialRef.current.color.set('#0f4c5c');
            materialRef.current.transparent = true;
            materialRef.current.opacity = 0.7;

            // Position initiale et animation
            island.current.position.set(0, 0, -1.5); // Position initiale de l'île
            // Rotation initiale de 90 degrés (Math.PI / 2 radians) sur l'axe Y
            const initialRotationY = 100 * (Math.PI / 180); // Convertir les degrés en radians
            island.current.rotation.set(0, initialRotationY, 0);
            // Animation de la position de l'île
            gsap.to(island.current.position, 
                { 
                    // z: -2,
                    duration: 2,
                    onComplete: () => {
                        gsap.to(island.current.position, {
                            z: -4,
                            y: -0.8,
                            x: 1.5,
                            delay: 3,
                        });
                    }
                }
            );
        }
    }, []);

    useFrame(() => {
        if (island.current && island.current.position.x === 1.5) {
            // Rotation continue sur l'axe Y
            island.current.rotation.y += 0.001;

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
