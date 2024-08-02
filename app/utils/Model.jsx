import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export default function Model({ mousePosition }) {
    const { nodes } = useGLTF('/media/reunion.glb');
    const { viewport } = useThree();
    const island = useRef(null);
    const islandMaterialRef = useRef(null);
    const texture = useLoader(TextureLoader, '/media/texture.webp');
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    const location = useRef(null);
    const { nodes: locationNodes } = useGLTF('/media/location.glb');
    const locationMaterialRef = useRef(null);

    // Store the initial rotation and animation completion state
    const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (island.current && islandMaterialRef.current) {
            const initialRotationX = 5 * (Math.PI / 180);
            const initialRotationY = -75 * (Math.PI / 180);

            setInitialRotation({ x: initialRotationX, y: initialRotationY });
            island.current.rotation.set(initialRotationX, initialRotationY, 0);

            islandMaterialRef.current.color.set('#0f4c5c');
            islandMaterialRef.current.transparent = true;
            islandMaterialRef.current.opacity = 0.7;
            islandMaterialRef.current.map = texture;
            islandMaterialRef.current.depthTest = false;

            gsap.to(island.current.position, {
                z: -3,
                y: -0.8,
                x: 1.5,
                delay: 15,
                opacity: 1,
                duration: 1,
                onUpdate: () => {
                    setAnimationComplete(true);
                    islandMaterialRef.current.transparent = false;
                    islandMaterialRef.current.opacity = 1;
                }
            });
        }

        // Animation de la respiration pour les textes
        if (textRef1.current && textRef2.current) {
            gsap.to(textRef1.current.material, {
                opacity: 0.1,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            gsap.to(textRef2.current.material, {
                opacity: 0.1,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
    }, []);

    useEffect(() => {
        if (location.current && locationMaterialRef.current) {
            locationMaterialRef.current.color.set('#ff0000'); // Set the color for the location mesh
        }
    }, []);

    useFrame(() => {
        if (island.current) {
            const rotationFactor = 0.4;
            let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
            let rotationY = initialRotation.y + mousePosition.x * rotationFactor;

            if (animationComplete) {
                rotationX = initialRotation.x;
            }

            island.current.rotation.set(rotationX, rotationY, 0);

            if (textRef1.current && textRef2.current) {
                textRef1.current.rotation.set(0, -rotationY, 0);
                textRef2.current.rotation.set(0, -rotationY, 0);
            }
        }
    });

    return (
        <group scale={viewport.width / 3.5}>
            <mesh ref={island} geometry={nodes.reunion.geometry}>
                <meshStandardMaterial ref={islandMaterialRef} />
                <Text
                    ref={textRef1}
                    position={[1, 0.25, 0.7]}
                    fontSize={0.08}
                    color="#0000"
                >
                    Reunion Island
                </Text>
                <Text
                    ref={textRef2}
                    position={[1, 0.1, 0.4]}
                    fontSize={0.05}
                    color="#0000"
                >
                    Le Tampon
                </Text>
                <pointLight position={[1.08, -0.1, 0.33]} intensity={55} color={'red'} />
                <mesh ref={location} geometry={locationNodes.location.geometry} scale={[0.01, 0.01, 0.01]}>
                    <meshStandardMaterial ref={locationMaterialRef} />
                </mesh>
            </mesh>

        </group>
    );
}
