"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Cube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.32;
  });
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      <meshStandardMaterial
        color="#050608"
        metalness={0.85}
        roughness={0.18}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.018, 16, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

function FloatingMark({ position, char }: { position: [number, number, number]; char: string }) {
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh position={position}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#C4DCE8" />
      </mesh>
    </Float>
  );
}

export default function BlackBox3D() {
  return (
    <div className="aspect-square w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.8, 6.2], fov: 38 }}
      >
        <color attach="background" args={["#F4F8FB"]} />
        <ambientLight intensity={0.55} />
        <spotLight position={[6, 8, 5]} angle={0.3} penumbra={1} intensity={1.6} castShadow />
        <directionalLight position={[-4, 5, -3]} intensity={0.4} />

        <Suspense fallback={null}>
          <Cube />
          <Ring radius={2.4} tilt={[Math.PI / 2.2, 0, 0]} speed={0.32} color="#0F1E3D" />
          <Ring radius={2.9} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.22} color="#3A5A2B" />
          <Ring radius={3.4} tilt={[Math.PI / 2, 0.8, 0.4]} speed={0.16} color="#0F1E3D" />

          {[
            [2.1, 1.4, 0.6],
            [-2.1, 1.0, 0.4],
            [1.9, -1.3, -0.6],
            [-1.7, -0.9, 0.8],
            [0, 2.4, 0],
            [0, -2.3, 0],
          ].map((p, i) => (
            <FloatingMark key={i} position={p as [number, number, number]} char="?" />
          ))}
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
