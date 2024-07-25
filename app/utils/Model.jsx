// import * as THREE from 'three';

// import { useGLTF,MeshTransmissionMaterial } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import React, { useRef } from "react";

// export default function Model(props) {
//     const { scene } = useGLTF("/media/reunion.glb");

//     useFrame(() => {
//         scene.rotation.y += 0.002;
//     });

//     // Traverse the scene to find all meshes and apply the material
//     scene.traverse((child) => {
//         if (child.isMesh) {
//             child.material = new THREE.MeshStandardMaterial({ color: 'teal' } );
//         }
//     });

//     return (
//         <primitive object={scene} {...props} />
//     );
// }
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

    return (
        <group scale={viewport.width / 3.75} >
            <Text position={[0, 0, -1]} fontSize={0.5} color="teal" anchorX="center" anchorY="middle">
                hello world!
            </Text>
            <mesh ref={island} {...nodes.reunion}>
            <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}