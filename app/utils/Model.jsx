import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { LineSegments, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, TextureLoader } from 'three';
import gsap from 'gsap';

export default function Model({ mousePosition }) {
    const { nodes } = useGLTF('/media/reunion2.glb');
    const { viewport } = useThree();
    const island = useRef(null);
    const islandMaterialRef = useRef(null);
    const texture = useLoader(TextureLoader, '/media/texture.webp');
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const [lines, setLines] = useState(null);

    const location = useRef(null);
    const { nodes: locationNodes } = useGLTF('/media/location.glb');
    const locationMaterialRef = useRef(null);


    //Traansformer le mesh en points
    // let sampler 
    // const vertices = []
    // const tempPosition = new THREE.Vector3()
    // let pointsGeometry = new THRE.BufferGeometry()
    // function transformMesh(){
    //     for(let i = 0; i<9000; i++){
    //         sampler.sample(tempPosition);
    //         vertices.push(tempPosition.x,tempPosition.y,tempPosition.z)
    //     }
    //     pointsGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3))
    //     const pointsMaterial = new THREE.PointsMaterial({
    //         color:0x5c0b17,
    //         size:0.02,
    //         blending:THREE.AdditiveBlending,
    //         transparent:true,
    //         opacity:0.8,
    //         dephtWrite:false,
    //         sizeAttenuation:true
    //     })

    //     const points = new THREE.Points(pointsGeometry,pointsMaterial)
    //     scene.add(points)

    // }


    // Store the initial rotation and animation completion state
    const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (island.current && islandMaterialRef.current) {


            const geometry = nodes.reunion.geometry;
            const positions = geometry.attributes.position.array;
            const indices = geometry.index.array;

            // Convert geometry to line segments
            const linesGeometry = new BufferGeometry();
            const vertices = [];

            for (let i = 0; i < indices.length; i += 2) {
                const start = indices[i] * 3;
                const end = indices[i + 1] * 3;

                vertices.push(
                    positions[start], positions[start + 1], positions[start + 2],
                    positions[end], positions[end + 1], positions[end + 2]
                );
            }

            linesGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
            const linesMaterial = new LineBasicMaterial({ color: 0x5c0b17 });

            setLines(new LineSegments(linesGeometry, linesMaterial));


            const initialRotationX = 5 * (Math.PI / 180);
            const initialRotationY = -75 * (Math.PI / 180);

            setInitialRotation({ x: initialRotationX, y: initialRotationY });
            island.current.rotation.set(initialRotationX, initialRotationY, 0);

            islandMaterialRef.current.color.set('#0f4c5c');
            islandMaterialRef.current.transparent = true;
            islandMaterialRef.current.opacity = 0.8;
            islandMaterialRef.current.map = texture;
            islandMaterialRef.current.depthTest = false;

            // gsap.to(island.current.position, {
            //     z: -3,
            //     y: -0.8,
            //     x: 1.5,
            //     delay: 15,
            //     opacity: 1,
            //     duration: 1,
            //     onUpdate: () => {
            //         setAnimationComplete(true);
            //         islandMaterialRef.current.transparent = false;
            //         islandMaterialRef.current.opacity = 1;
            //     }
            // });
        }

        // Animation de la respiration pour les textes
        if (textRef1.current && textRef2.current) {
            gsap.from(textRef1.current.material, {
                opacity: 0.5,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            gsap.from(textRef2.current.material, {
                opacity: 0.5,
                duration: 1.7,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }

        if (location.current && locationMaterialRef.current) {
            locationMaterialRef.current.color.set('#0000');
            locationMaterialRef.current.transparent = false;
            locationMaterialRef.current.depthTest = false;
            locationMaterialRef.current.opacity = 1
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

        if (location.current) {
            location.current.rotation.y += 0.01;
            location.current.oppacity = 1
        }


    });

    return (
        <group scale={viewport.width / 3}>
            <group>
                <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]}>
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
