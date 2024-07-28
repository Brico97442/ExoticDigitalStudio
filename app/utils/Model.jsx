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

  // Store the initial rotation
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });

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
        delay: 5,
        duration: 1,
        onUpdate: () => {
            materialRef.current.transparent = false;
            materialRef.current.opacity = 1;
            setInitialRotation({ x: initialRotationX, y: initialRotationY });
            island.current.rotation.set(initialRotationX, -45 * (Math.PI / 180), 0);
          
        }
      });
    }
  }, []);

  useFrame(() => {
    if (island.current) {
      const rotationFactor = 0.6;
      island.current.rotation.y = initialRotation.y + mousePosition.x * rotationFactor;
      island.current.rotation.x = initialRotation.x - mousePosition.y * rotationFactor;
    }
  });

  return (
    <group scale={viewport.width / 3.5}>
      <mesh ref={island} geometry={nodes.reunion.geometry}>
        <meshStandardMaterial ref={materialRef} />
        <Text
          position={[1, 0.25, 0.7]}
          fontSize={0.08}
          color="#0000"
          rotation={[0, 85 * Math.PI / 180, 0]}
        >
          Réunion Island
        </Text>
        <Text
          position={[1, 0.1, 0.4]}
          fontSize={0.05}
          color="#0000"
          rotation={[0, 85 * Math.PI / 180, 0]}
        >
          Le Tampon
        </Text>
        <pointLight position={[1.08, -0.1, 0.33]} intensity={55} color={'red'} />
      </mesh>
    </group>
  );
}
