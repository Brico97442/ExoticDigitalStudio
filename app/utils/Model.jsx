
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
export default function Model() {
    const mesh = useRef()
    const { nodes } = useGLTF("/media/reunion.glb");
    const { viewport } = useThree();

    useFrame(() => {
        mesh.current.rotation.y += 0.002
    })

    return (
        <group scale={viewport.width / 4.5}>
            <mesh ref={mesh}{...nodes.reunion}>
                <meshBasicMaterial color='orangered' />
            </mesh>
        </group>
    )
}