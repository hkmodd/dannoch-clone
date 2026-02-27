import { MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

export function Substance2(props: React.JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.05;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <MeshDistortMaterial
        color="#a0a0a0"
        envMapIntensity={3}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={1}
        roughness={0.1}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}
