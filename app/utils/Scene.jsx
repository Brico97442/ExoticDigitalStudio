// Scene.js
'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { OrbitControls,Environment} from '@react-three/drei';


export default function Scene() {

  
  return (
    <div className='h-screen w-full p-20 flex '>
      <Canvas >
        <Model />
        <ambientLight position={[0, 3, 2]} intensity={5} />
        <Environment preset="city"/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
