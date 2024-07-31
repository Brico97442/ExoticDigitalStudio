import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export default function Model({ mousePosition }) {
    const { nodes } = useGLTF('/media/reunion.glb');
    const { viewport } = useThree();
    const island = useRef(null);
    const materialRef = useRef(null);
    const texture = useLoader(TextureLoader, '/media/texture.webp');
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    // Store the initial rotation and animation completion state
    const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (island && materialRef) {
            const initialRotationX = 5 * (Math.PI / 180);
            const initialRotationY = -75 * (Math.PI / 180);

            setInitialRotation({ x: initialRotationX, y: initialRotationY });
            island.current.rotation.set(initialRotationX, initialRotationY, 0);

            materialRef.current.color.set('#0f4c5c');
            materialRef.current.transparent = true;
            materialRef.current.opacity = 0.7;
            materialRef.current.map = texture;
            materialRef.current.depthTest = false;

            gsap.to(island.current.position, {
                z: -3,
                y: -0.8,
                x: 1.5,
                delay: 15,
                duration: 1,
                onUpdate: () => {
                    setAnimationComplete(true);
                    materialRef.current.transparent = false;
                    materialRef.current.opacity = 1;
                }
            });
        }
    }, []);

    useEffect(() => {
        // Animation de la respiration pour les textes
        if (textRef1.current && textRef2.current) {
            gsap.to(textRef1.current.material, {
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            gsap.to(textRef2.current.material, {
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
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
                <meshStandardMaterial ref={materialRef} />
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
            </mesh>
        </group>
    );
}
