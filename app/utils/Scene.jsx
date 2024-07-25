// Scene.js
'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Environment } from '@react-three/drei';

import Model from './Model';

export default function Scene() {
  return (
    <div className='h-screen absolute w-screen flex '>
      <Canvas>
        <directionalLight position={[0, 3, 2]} intensity={5} />
        <Environment preset='city'/>
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
