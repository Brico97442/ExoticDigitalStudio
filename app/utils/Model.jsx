
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";

export default function Model(props) {
    const {scene} = useGLTF("/media/reunion.glb");
    // const { viewport } = useThree();
    return <primitive object={scene} {...props} />
}