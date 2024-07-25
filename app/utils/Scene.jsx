// Scene.js
'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls,Environment} from '@react-three/drei';


export default function Scene() {

  
  return (
    <div className='h-screen fixed w-full flex z-[204]'>
      <Canvas >
        <Model />
        <ambientLight position={[0, 3, 2]} intensity={3} />
        <Environment preset="forest"/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
