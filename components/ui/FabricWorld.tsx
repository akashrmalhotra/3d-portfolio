"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
    CANNON: any;
  }
}

export default function FabricWorld() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || !window.THREE) return;
    const container = mountRef.current;
    const THREE = window.THREE;
    const CANNON = window.CANNON;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 34);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const key = new THREE.DirectionalLight(0xc9a961, 1.1);
    key.position.set(8, 12, 8);
    const fill = new THREE.DirectionalLight(0x2dd4e0, 0.7);
    fill.position.set(-8, -6, 6);
    scene.add(ambient, key, fill);

    const world = CANNON ? new CANNON.World() : null;
    if (world) world.gravity.set(0, -9.82, 0);

    const segmentsX = window.innerWidth < 768 ? 20 : 34;
    const segmentsY = window.innerWidth < 768 ? 14 : 24;

    const geometry = new THREE.PlaneGeometry(42, 28, segmentsX, segmentsY);
    const base = geometry.attributes.position.array.slice();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x0a1f3d,
      roughness: 0.52,
      metalness: 0.1,
      sheen: 0.9,
      sheenColor: new THREE.Color("#c9a961"),
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });

    const cloth = new THREE.Mesh(geometry, material);
    cloth.position.set(0, 5, -6);
    scene.add(cloth);

    const pointer = { x: 0, y: 0 };
    let scrollY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      const positions = geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = base[i];
        const y = base[i + 1];

        const waveA = Math.sin(x * 0.22 + t * 1.4) * 0.6;
        const waveB = Math.cos(y * 0.28 + t * 1.15) * 0.45;
        const wind = (pointer.x * x * 0.03 + pointer.y * y * 0.03) * 0.4;
        const tension = Math.sin((scrollY * 0.0015) + x * 0.08) * 0.35;

        const pinStrength = Math.abs(y) > 12 ? 0.2 : 1;
        positions[i + 2] = (waveA + waveB + wind + tension) * pinStrength;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      cloth.rotation.z = pointer.x * 0.08;
      cloth.rotation.x = -0.2 + pointer.y * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 -z-10 opacity-95" aria-hidden />;
}
