"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FabricShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#0a1f3d") }, // Navy
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Simulating cloth ripples/wind
      float elevation = sin(modelPosition.x * 3.0 + uTime) * 0.1 
                      + sin(modelPosition.y * 2.0 + uTime * 0.8) * 0.1;
      
      modelPosition.z += elevation;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vElevation;
    varying vec2 vUv;

    void main() {
      // Add shading based on fabric ripples
      float colorMix = vElevation * 2.0 + 0.8;
      vec3 finalColor = mix(uColor * 0.5, uColor * 1.2, colorMix);
      
      // Subtle weave texture illusion
      float weave = sin(vUv.x * 200.0) * sin(vUv.y * 200.0) * 0.05;
      
      gl_FragColor = vec4(finalColor + weave, 1.0);
    }
  `
};

function ClothMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
    if (meshRef.current) {
      // Subtle mouse interaction (wind effect)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.mouse.y * 0.1), 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.mouse.x * 0.1), 0.05);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-0.2, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      <planeGeometry args={[10, 10, 128, 128]} />
      <shaderMaterial 
        ref={materialRef}
        args={[FabricShaderMaterial]} 
        wireframe={false} 
      />
    </mesh>
  );
}

export default function FabricBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-navy">
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <ClothMesh />
      </Canvas>
    </div>
  );
}