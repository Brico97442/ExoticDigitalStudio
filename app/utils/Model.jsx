const vertexShader = `
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vPosition = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float opacity;
uniform vec3 color;
uniform float gridScale;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Effet de quadrillage
  float grid = abs(sin(vUv.x * gridScale) * sin(vUv.y * gridScale));

  // Combine le quadrillage avec la couleur et l'opacité
  vec3 gridColor = mix(color, vec3(1.0), grid);
  gl_FragColor = vec4(gridColor, opacity);
}
`;

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { ShaderMaterial, Color } from 'three';

export default function Model({ mousePosition, island, animationComplete }) {
    const { nodes } = useGLTF('/media/reunion.glb');
    const { viewport } = useThree();
    const islandMaterialRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    const location = useRef(null);
    const { nodes: locationNodes } = useGLTF('/media/location.glb');
    const locationMaterialRef = useRef(null);

    const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (island.current) {
            const initialRotationX = 5 * (Math.PI / 180);
            const initialRotationY = -75 * (Math.PI / 180);

            setInitialRotation({ x: initialRotationX, y: initialRotationY });
            island.current.rotation.set(initialRotationX, initialRotationY, 0);

            // Définir le matériau du shader
            const shaderMaterial = new ShaderMaterial({
                uniforms: {
                    opacity: { value: 0.05 }, // Opacité du modèle
                    color: { value: new Color('#DEE2E6') }, // Couleur du quadrillage
                    gridScale: { value: 40.0 }, // Taille du quadrillage
                    depthTest: false

                },
                vertexShader,
                fragmentShader,
                wireframe: true, // Activer le wireframe
                transparent: true,
                depthTest: false,
                alphaTest: true
            });

            // Appliquer le matériau shader à l'île
            island.current.material = shaderMaterial;
        }
    }, [island]);

    useFrame(() => {
        if (island.current) {
            const rotationFactor = 0.2;
            let rotationX = initialRotation.x - mousePosition.y * rotationFactor;
            let rotationY = initialRotation.y + mousePosition.x * rotationFactor;

            island.current.rotation.set(rotationX, rotationY, 0);

            if (textRef1.current && textRef2.current) {
                textRef1.current.rotation.set(0, -rotationY, 0);
                textRef2.current.rotation.set(0, -rotationY, 0);
            }
        }

        if (location.current) {
            location.current.rotation.y += 0.01;
        }
    });

    return (
        <group scale={viewport.width / 3}>
            <group>
                <mesh ref={island} geometry={nodes.reunion.geometry} scale={[0.015, 0.015, 0.015]} >
                    <meshStandardMaterial ref={islandMaterialRef} />
                    <Text
                        ref={textRef1}
                        position={[20, 2, 16]}
                        fontSize={2}
                        color="#000"
                    >
                        Reunion Island
                    </Text>
                    <Text
                        ref={textRef2}
                        position={[28, 0, 8]}
                        fontSize={1.5}
                        color="#000"
                    >
                        Le Tampon
                        <mesh ref={location} geometry={locationNodes.location.geometry} scale={[0.1, 0.1, 0.1]} position={[0, -2, 3]}>
                            <meshStandardMaterial ref={locationMaterialRef} />
                        </mesh>
                    </Text>
                    <pointLight position={[0, 0, 0]} intensity={18} color={'blue'} />
                </mesh>
            </group>
        </group>
    );
}
