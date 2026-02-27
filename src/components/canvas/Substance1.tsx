import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

export function Substance1(props: React.JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <icosahedronGeometry args={[1.8, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={1}
        resolution={128}
        thickness={1.5}
        roughness={0.2}
        chromaticAberration={0.5}
        anisotropy={0.2}
        distortion={0.2}
        distortionScale={0.15}
        temporalDistortion={0.05}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[0, 1400]}
        clearcoat={0.1}
        color="#ffffff"
      />
    </mesh>
  );
}
