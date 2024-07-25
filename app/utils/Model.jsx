import * as THREE from 'three';

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function Model(props) {
    const { scene } = useGLTF("/media/reunion.glb");

    useFrame(() => {
        scene.rotation.y += 0.002;
    });

    // Traverse the scene to find all meshes and apply the material
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 'teal' });
        }
    });

    return (
        <primitive object={scene} {...props} />
    );
}
