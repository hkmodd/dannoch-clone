import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Substance3(props: JSX.IntrinsicElements['group']) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y -= delta * 0.15;
    }
    if (coreRef.current) {
      // Pulsating core
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Wireframe Outer */}
      <mesh>
        <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          emissive="#333333"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color="#ffffff" intensity={5} distance={10} />
    </group>
  );
}
