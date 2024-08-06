gsap.registerPlugin(ScrollTrigger) 
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { LineSegments, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, TextureLoader } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all'
import { inherits } from 'util';

export default function Model({ mousePosition, island }) {
    const { nodes } = useGLTF('/media/reunion2.glb');
    const { viewport } = useThree();
    const islandMaterialRef = useRef(null);
    const texture = useLoader(TextureLoader, '/media/texture.webp');
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    const [lines, setLines] = useState(null);

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

            island.current.transparent = true;
            islandMaterialRef.current.color.set('#0f4c5c');
            islandMaterialRef.current.opacity = 0.8;
            islandMaterialRef.current.map = texture;
            islandMaterialRef.current.depthTest = false;
            // islandMaterialRef.current.side = 1; // THREE.FrontSide is 2, to make the material front-only

            // gsap.to(island.current.position, {
            //     // scrollTrigger: island,
            //     z: -1,
            //     y: -0.2,
            //     x: 0.5,
            //     delay: 10,
            //     opacity: 1,
            //     duration: 1,
            //     onComplete: () => {
            //         setAnimationComplete(true);
            //         islandMaterialRef.current.transparent = false;
            //         islandMaterialRef.current.opacity = 1;
            //     }
            // });
            // ScrollTrigger.create({
            //     trigger: island.current,
            //     start: 'top center',
            //     end: 'bottom center',
            //     onEnter: () => {
            //         gsap.to(island.current.position, {
            //             z: -1,
            //             y: -0.2,
            //             x: 0.5,
            //             opacity: 1,
            //             duration: 1,
            //             onComplete: () => {
            //                 setAnimationComplete(true);
            //                 islandMaterialRef.current.transparent = false;
            //                 islandMaterialRef.current.opacity = 1;
            //             }
            //         });
            //     },
            //     onLeaveBack: () => {
            //         gsap.to(island.current.position, {
            //             z: 0,
            //             y: 0,
            //             x: 0,
            //             opacity: 0.8,
            //             duration: 1,
            //             onComplete: () => {
            //                 setAnimationComplete(false);
            //                 islandMaterialRef.current.transparent = true;
            //                 islandMaterialRef.current.opacity = 0.8;
            //             }
            //         });
            //     }
            // });

        }

        // Animation de la respiration pour les textes
        if (textRef1.current && textRef2.current) {
            gsap.from(textRef1.current.material, {
                opacity: 0.1,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            gsap.from(textRef2.current.material, {
                opacity: 0.1,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }

    }, []);



    useFrame(() => {
        if (island.current) {

            const rotationFactor = 0.2;
            // const translationFactor = 0.12; // Ajustez cette valeur pour contrôler l'amplitude de la translation

            let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
            let rotationY = initialRotation.y + mousePosition.x * rotationFactor;

            // let translationX = mousePosition.x * translationFactor;
            // let translationY = -mousePosition.y * translationFactor;

            // island.current.position.x = translationX;
            // island.current.position.y = -translationY;

            if (animationComplete) {
                rotationX = initialRotation.x;
            }

            island.current.rotation.set(rotationX, rotationY, 0);

            if (textRef1.current && textRef2.current) {
                textRef1.current.rotation.set(0, -rotationY, 0);
                textRef2.current.rotation.set(0, -rotationY, 0);

            }
        }

        if (location.current) {
            location.current.rotation.y += 0.01;
            location.current.oppacity = inherits
            locationMaterialRef.current.color.set('#0000');
            locationMaterialRef.current.transparent = false;
        }


    });

    return (
            <group scale={viewport.width / 3}>
                <group>
                    <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]} object={lines}  >
                        {/* {lines && <primitive object={lines} />} */}
                        <meshStandardMaterial ref={islandMaterialRef} />

                        <Text
                            ref={textRef1}
                            position={[20, 2, 16]}
                            fontSize={2}
                            color="#0000"
                        >
                            Reunion Island
                        </Text>
                        <Text
                            ref={textRef2}
                            position={[28, 0, 8]}
                            fontSize={1.5}
                            color="#0000"
                        >
                            Le Tampon
                            <mesh ref={location} geometry={locationNodes.location.geometry} scale={[0.1, 0.1, 0.1]} position={[0, -2, 3]} >
                                <meshStandardMaterial ref={locationMaterialRef} />
                            </mesh>
                        </Text>
                        <pointLight position={[30, -4, 8]} intensity={10} color={'red'} />
                    </mesh>
                </group>
            </group>

    );
}
