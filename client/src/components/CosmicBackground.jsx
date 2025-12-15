import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function CosmicBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.6} />
      <Stars />
      <FloatingLights />
    </Canvas>
  );
}

function Stars() {
  const ref = useRef();
  const count = 2500;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 40;
  }

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffffff" />
    </points>
  );
}

function FloatingLights() {
  return (
    <>
      <pointLight position={[4, 2, -4]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#0ea5e9" />
    </>
  );
}
