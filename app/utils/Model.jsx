
import React, { useRef } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva';


export default function Model() {
    const { nodes } = useGLTF("/media/reunion.glb");
    const { viewport } = useThree()
    const island = useRef(null);

    const materialProps = useControls({

        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0, min: 0, max: 1, step: 0.1 },

        transmission: {value: 1, min: 0, max: 1, step: 0.1},

        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 0.02, min: 0, max: 1},

        backside: { value: true},

    })

    useFrame((state, delta) => {
        if (island.current) {
          island.current.rotation.y += 0.002; // Rotation sur l'axe Y
        }
      });
    

    return (
        <group scale={viewport.width /3.5}position={[0,0,-6]}>
            <mesh  ref={island} {...nodes.reunion}>
            <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}