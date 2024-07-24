import { useGLTF } from "@react-three/drei";

export default function Model() {
    const { nodes } = useGLTF("/media/reunion.glb");

    return (
        <group>
            <mesh {...nodes.reunion}>
                <meshBasicMaterial color='gray' />
            </mesh>
        </group>
    )
}