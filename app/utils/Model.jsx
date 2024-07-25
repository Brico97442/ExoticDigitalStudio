
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model(props) {
    const { scene } = useGLTF("/media/reunion.glb");

    useFrame(() => {
        scene.rotation.y += 0.002;
    });

    // const { viewport } = useThree();

    return (
    <primitive object={scene} {...props} >
        <mesh>
        </mesh>
    </primitive>
    )
}                                                                                                                                                                                                                                                                                                                                                                                                                                      