import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Starfield = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points scattered across a wide area (starfield)
  const count = 4000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scatter points widely in all directions
      p[i * 3] = (Math.random() - 0.5) * 50;     // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
    }
    return p;
  }, [count]);

  // Very slow, cinematic drift
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

export const ThreeScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
        <Starfield />
      </Canvas>
    </div>
  );
};
