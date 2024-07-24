// Scene.js
'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

export default function Scene() {
  return (
    <div className='h-screen w-screen flex'>
      <Canvas>
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
