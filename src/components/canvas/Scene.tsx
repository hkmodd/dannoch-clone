import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { Substance1 } from './Substance1';
import { Substance2 } from './Substance2';
import { Substance3 } from './Substance3';

function CameraController() {
  const { camera, pointer } = useThree();
  const location = useLocation();

  useFrame((state, delta) => {
    // Determine target Y based on route
    let targetY = 0;
    if (location.pathname === '/sostanze' || location.pathname.startsWith('/sostanze/')) targetY = 0;
    else if (location.pathname === '/rischi' || location.pathname === '/drugchecking') targetY = -10;
    else if (location.pathname === '/consulenza' || location.pathname === '/contatti') targetY = -20;
    else if (location.pathname === '/news-blog' || location.pathname.startsWith('/news-blog/')) targetY = -15;
    else if (location.pathname === '/sondaggio-online-sui-consumi') targetY = -25;
    else if (['/chi-siamo', '/collabora', '/flyers', '/partner', '/links'].includes(location.pathname)) targetY = -5;
    else targetY = 0; // Home

    // Smoothly interpolate camera Y position
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);

    // Parallax effect on camera X and Z based on pointer — lighter damping
    const targetX = pointer.x * 0.3;
    const targetZ = 6 + pointer.y * 0.3;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);

    // Always look at the center of the current vertical view
    camera.lookAt(0, camera.position.y, 0);
  });
  return null;
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

      <CameraController />

      {/* Reduced particle count for performance — still looks ethereal */}
      <Sparkles count={200} scale={30} size={1.5} speed={0.2} opacity={0.4} color="#ffffff" />
      <Sparkles count={50} scale={20} size={3} speed={0.3} opacity={0.15} color="#4a00e0" />

      <group>
        {/* Substance 1 (Sostanze) */}
        <Float floatIntensity={1.5} speed={1.5} rotationIntensity={0.3}>
          <Substance1 position={[0, 0, 0]} />
        </Float>

        {/* Substance 2 (Rischi / Drugchecking) */}
        <Float floatIntensity={1.5} speed={2} rotationIntensity={0.5}>
          <Substance2 position={[0, -10, 0]} />
        </Float>

        {/* Substance 3 (Consulenza) */}
        <Float floatIntensity={1.5} speed={1} rotationIntensity={0.15}>
          <Substance3 position={[0, -20, 0]} />
        </Float>
      </group>

      {/* Environment lighting — already baked (frames=1) */}
      <Environment resolution={128} frames={1}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
          <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={[20, 0.5, 1]} />
          <Lightformer intensity={0.2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        </group>
      </Environment>
    </>
  );
}
