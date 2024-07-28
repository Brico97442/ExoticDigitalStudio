import React, { useRef, useEffect } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export default function Model() {
    const { nodes } = useGLTF('/media/reunion.glb');
    const { viewport } = useThree();
    const island = useRef(null);
    const materialRef = useRef(null);
    const texture = useLoader(TextureLoader, '/media/texture.webp'); // Charger la texture correctement
    const alphaMap = useLoader(TextureLoader, '/media/calque-reunion.png'); // Charger l'alpha map

    useEffect(() => {
        if (island && materialRef) {

            // Position initiale et animation
            // island.current.position.set(0, 0, 0); // Position initiale de l'île

            // Rotation initiale de 90 degrés (Math.PI / 2 radians) sur l'axe Y
            const initialRotationX = 10 * (Math.PI / 180); // Convertir les degrés en radians
            const initialRotationY = -80 * (Math.PI / 180); // Convertir les degrés en radians
            island.current.rotation.set(initialRotationX, initialRotationY, 0);

            // Initialisation des propriétés du matériau
            materialRef.current.color.set('#0f4c5c');
            materialRef.current.transparent = true;
            materialRef.current.opacity = 0.7;
            materialRef.current.map = texture; // Appliquer la texture comme alphaMap
            materialRef.current.dephtTest = false
            // materialRef.current.alphaMap = alphaMap; 
            // Appliquer la texture comme alphaMap
            // Animation de la position de l'

            gsap.to(island.current.position,
                {
                    z: -3,
                    y: -0.8,
                    x: 1.5,
                    delay: 5,
                    duration: 1,
                    onUpdate: () => {
                        if (materialRef) {
                            materialRef.current.transparent = false;
                            materialRef.current.opacity = 1;

                        }
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
        <>
            <group scale={viewport.width / 3.5}>
                <mesh ref={island} geometry={nodes.reunion.geometry}>
                    <meshStandardMaterial ref={materialRef} />
                    <Text
                        position={[1, 0.25, 0.7]} // Position du texte
                        fontSize={0.08} // Taille du texte
                        color="#0000" // Couleur du texte
                        rotation={[0, 85 * Math.PI / 180, 0]}
                    >
                        Réunion Island
                    </Text>
                    <Text
                        position={[1, 0.1, 0.4]} // Position du texte
                        fontSize={0.05} // Taille du texte
                        color="#0000" // Couleur du texte

                        rotation={[0, 85 * Math.PI / 180, 0]}
                    >
                        Le Tampon
                    </Text>

                    <pointLight position={[1.08, -0.1, 0.33]} intensity={35} color={'red'} />
                </mesh>
            </group>
        </>
    );
}
