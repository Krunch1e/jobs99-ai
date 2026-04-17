"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const AnimatedObject = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#312e81"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
          emissive="#1e1b4b"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <AnimatedObject />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
