"use client";

/**
 * Full-screen Three.js shader-driven fabric.
 * - Per-section "wind" + texture mood (silk / cotton / denim / wool / linen / starfield).
 * - Mouse creates a wave ripple; clicks emit pulses.
 * - GPU-only, ~1.2k tri plane. Throttled to 30fps on mobile.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Mood =
  | "silk"      // hero — luxurious flowing
  | "pinstripe" // glance — controlled
  | "linen"     // macro — natural / split
  | "denim"     // structural flaw — industrial
  | "weave"     // blind spot — circular weave
  | "embroidery" // dormant — navy + gold thread
  | "tech"      // catalyst — fabric + grid overlay
  | "cream"     // architecture
  | "mandala"   // exchange
  | "split"     // shift — half old / half new
  | "gradient"  // defensibility
  | "tear"      // impact
  | "twotone"   // advantage
  | "starfield";// closing

const MOOD_BY_ID: Record<string, Mood> = {
  hero: "silk",
  glance: "pinstripe",
  macro: "linen",
  flaw: "denim",
  blindspot: "weave",
  dormant: "embroidery",
  catalyst: "tech",
  architecture: "cream",
  exchange: "mandala",
  shift: "split",
  defensibility: "gradient",
  impact: "tear",
  advantage: "twotone",
  closing: "starfield",
};

const MOOD_INDEX: Record<Mood, number> = {
  silk: 0,
  pinstripe: 1,
  linen: 2,
  denim: 3,
  weave: 4,
  embroidery: 5,
  tech: 6,
  cream: 7,
  mandala: 8,
  split: 9,
  gradient: 10,
  tear: 11,
  twotone: 12,
  starfield: 13,
};

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;       // -1..1
  uniform float uWind;       // 0..1
  uniform float uTear;       // 0..1 fabric tension
  uniform float uPulse;      // click pulse decay 0..1
  uniform vec2 uPulsePos;    // -1..1
  varying vec2 vUv;
  varying float vWave;
  varying float vTension;

  // simple noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Pinning factor: stronger anchoring at corners (top, especially).
    float topPin = smoothstep(0.0, 0.18, 1.0 - uv.y);
    float pin = clamp(1.0 - topPin * 1.4, 0.0, 1.0);

    // Mouse wind force — falls off with distance
    vec2 muv = uv * 2.0 - 1.0;
    float md = length(muv - uMouse);
    float wind = exp(-md * 1.6) * uWind;

    // Hanging waveform
    float t = uTime * 0.6;
    float w1 = sin(uv.x * 6.0 + t * 1.2) * 0.06;
    float w2 = sin(uv.y * 4.0 + t * 0.7 + uv.x * 3.0) * 0.04;
    float w3 = noise(uv * 3.0 + t * 0.2) * 0.05;
    float wave = (w1 + w2 + w3) * pin;

    // Mouse-driven displacement
    pos.z += wave;
    pos.z += wind * 0.45 * pin;
    pos.x += wind * (uMouse.x - muv.x) * 0.15 * pin;
    pos.y += wind * (uMouse.y - muv.y) * 0.10 * pin;

    // Pulse (click): expanding ring
    float pd = length(muv - uPulsePos);
    float ring = exp(-pow((pd - uPulse * 1.4) * 4.0, 2.0));
    pos.z += ring * uPulse * 0.6 * pin;

    // Tension: contracts plane (when active = fabric pulls/tears)
    pos.xy *= 1.0 - uTear * 0.04 * sin(uv.x * 30.0 + t * 4.0);

    vWave = wave + wind * 0.5 + ring * uPulse;
    vTension = uTear;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uMix;       // 0..1 between current/next mood
  uniform int   uMoodA;
  uniform int   uMoodB;
  uniform float uTear;
  uniform vec2  uMouse;
  varying vec2  vUv;
  varying float vWave;
  varying float vTension;

  // Palette
  const vec3 NAVY    = vec3(0.039, 0.122, 0.239);
  const vec3 NAVY_D  = vec3(0.020, 0.078, 0.165);
  const vec3 GOLD    = vec3(0.788, 0.663, 0.380);
  const vec3 GOLD_S  = vec3(0.886, 0.808, 0.612);
  const vec3 CYAN    = vec3(0.176, 0.831, 0.878);
  const vec3 CREAM   = vec3(0.961, 0.945, 0.910);
  const vec3 CREAM_W = vec3(0.937, 0.914, 0.847);
  const vec3 INK     = vec3(0.290, 0.290, 0.290);
  const vec3 SEPIA   = vec3(0.667, 0.580, 0.420);

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  // Weave pattern
  float weave(vec2 uv, float dens) {
    vec2 g = uv * dens;
    float h = abs(sin(g.x * 3.14159));
    float v = abs(sin(g.y * 3.14159));
    return clamp(0.5 + 0.5 * (h - v), 0.0, 1.0);
  }

  // Fabric thread normal (cheap)
  float threadNormal(vec2 uv, float dens) {
    return weave(uv, dens) * 0.8 + fbm(uv * dens * 0.5) * 0.2;
  }

  vec3 silk(vec2 uv, float wave) {
    // smooth gradient cream → cream warm with subtle horizontal sheen
    float sheen = pow(1.0 - abs(uv.y - 0.5) * 1.8, 4.0);
    vec3 base = mix(CREAM, CREAM_W, smoothstep(0.0, 1.0, uv.y));
    float w = threadNormal(uv, 220.0) * 0.07;
    base += GOLD_S * sheen * 0.10;
    base += w + wave * 0.05;
    return base;
  }

  vec3 pinstripe(vec2 uv) {
    vec3 base = mix(CREAM, CREAM_W, uv.y);
    float stripe = step(0.96, fract(uv.x * 70.0));
    base = mix(base, NAVY, stripe * 0.35);
    base += threadNormal(uv, 260.0) * 0.05;
    return base;
  }

  vec3 linen(vec2 uv) {
    vec3 base = mix(CREAM, CREAM_W, fbm(uv * 8.0));
    base += weave(uv, 180.0) * 0.06;
    base = mix(base, GOLD_S, 0.05);
    return base;
  }

  vec3 denim(vec2 uv) {
    vec3 base = mix(NAVY * 1.4, NAVY_D, fbm(uv * 6.0));
    float w = weave(uv, 240.0);
    base += w * 0.07;
    base = mix(base, vec3(0.18, 0.27, 0.42), 0.15);
    return base;
  }

  vec3 woven(vec2 uv, float t) {
    // radial weave around center
    vec2 c = uv - 0.5;
    float r = length(c);
    float a = atan(c.y, c.x);
    float ring = abs(sin(r * 60.0 - t * 0.3));
    float ray = abs(sin(a * 40.0 + t * 0.1));
    vec3 base = mix(CREAM, CREAM_W, smoothstep(0.0, 0.7, r));
    base += GOLD_S * (1.0 - ring) * 0.06;
    base += GOLD * (1.0 - ray) * 0.04;
    base += threadNormal(uv, 220.0) * 0.04;
    return base;
  }

  vec3 embroidery(vec2 uv, float t) {
    vec3 base = mix(NAVY_D, NAVY, fbm(uv * 5.0));
    // thread-like gold filaments
    float thread = abs(sin((uv.x + uv.y) * 60.0 + sin(uv.y * 4.0) * 4.0));
    float th2 = abs(sin((uv.x - uv.y) * 80.0));
    base += GOLD * pow(1.0 - thread, 18.0) * 0.6;
    base += GOLD_S * pow(1.0 - th2, 26.0) * 0.4;
    base += weave(uv, 320.0) * 0.05;
    return base;
  }

  vec3 tech(vec2 uv, float t) {
    vec3 base = mix(CREAM, vec3(0.84, 0.90, 0.96), fbm(uv * 3.0));
    float gridX = step(0.97, fract(uv.x * 30.0));
    float gridY = step(0.97, fract(uv.y * 30.0));
    base = mix(base, CYAN, (gridX + gridY) * 0.10);
    // scan line
    float scan = smoothstep(0.0, 0.005, abs(uv.y - fract(t * 0.07)));
    base += CYAN * (1.0 - scan) * 0.05;
    base += threadNormal(uv, 200.0) * 0.04;
    return base;
  }

  vec3 cream(vec2 uv) {
    vec3 base = mix(CREAM, CREAM_W, smoothstep(0.0, 1.0, uv.y * 0.7 + 0.3));
    base += weave(uv, 200.0) * 0.04;
    return base;
  }

  vec3 mandala(vec2 uv, float t) {
    vec2 c = uv - 0.5;
    float r = length(c);
    float a = atan(c.y, c.x);
    float petal = sin(a * 8.0 + t * 0.15) * 0.5 + 0.5;
    vec3 base = mix(CREAM, CREAM_W, r);
    base += GOLD_S * pow(petal * (1.0 - r * 1.4), 4.0) * 0.4;
    base += threadNormal(uv, 220.0) * 0.04;
    return base;
  }

  vec3 split(vec2 uv) {
    vec3 oldSide = mix(SEPIA * 1.1, CREAM_W * 0.9, uv.y) * (0.85 + fbm(uv * 8.0) * 0.2);
    vec3 newSide = mix(CREAM, vec3(0.92, 0.96, 0.98), uv.y);
    newSide += weave(uv, 220.0) * 0.05;
    float blend = smoothstep(0.49, 0.51, uv.x);
    return mix(oldSide, newSide, blend);
  }

  vec3 gradient(vec2 uv) {
    vec3 top = CREAM_W;
    vec3 bot = NAVY_D;
    vec3 base = mix(top, bot, smoothstep(0.0, 1.0, uv.y));
    base += threadNormal(uv, 180.0) * 0.06 * (1.0 - uv.y * 0.6);
    return base;
  }

  vec3 tear(vec2 uv, float t) {
    vec2 c = uv - 0.5;
    float crack = pow(abs(fbm(uv * 5.0 + t * 0.05) - 0.5) * 2.0, 4.0);
    vec3 base = mix(CREAM_W, CREAM, fbm(uv * 4.0));
    base = mix(base, GOLD_S, crack * 0.5);
    base += weave(uv, 180.0) * 0.05;
    return base;
  }

  vec3 twotone(vec2 uv) {
    vec3 left  = mix(SEPIA * 0.9, CREAM_W * 0.95, uv.y) * (0.9 + fbm(uv * 9.0) * 0.2);
    vec3 right = mix(CREAM, vec3(0.96, 0.93, 0.84), uv.y);
    right += GOLD * pow(weave(uv, 220.0), 4.0) * 0.12;
    float blend = smoothstep(0.48, 0.52, uv.x);
    return mix(left, right, blend);
  }

  vec3 starfield(vec2 uv, float t) {
    vec3 base = mix(NAVY_D * 0.5, NAVY, smoothstep(0.0, 1.0, uv.y));
    // stars: rare bright dots
    vec2 g = floor(uv * 80.0);
    float h = hash(g);
    float twinkle = step(0.992, h) * (0.5 + 0.5 * sin(t * 2.0 + h * 50.0));
    base += vec3(0.95, 0.92, 0.78) * twinkle * 0.7;
    // gold haze
    base += GOLD * fbm(uv * 3.0 + t * 0.02) * 0.05;
    return base;
  }

  vec3 paletteFor(int m, vec2 uv, float t, float wave) {
    if (m == 0)  return silk(uv, wave);
    if (m == 1)  return pinstripe(uv);
    if (m == 2)  return linen(uv);
    if (m == 3)  return denim(uv);
    if (m == 4)  return woven(uv, t);
    if (m == 5)  return embroidery(uv, t);
    if (m == 6)  return tech(uv, t);
    if (m == 7)  return cream(uv);
    if (m == 8)  return mandala(uv, t);
    if (m == 9)  return split(uv);
    if (m == 10) return gradient(uv);
    if (m == 11) return tear(uv, t);
    if (m == 12) return twotone(uv);
    return starfield(uv, t);
  }

  void main() {
    vec3 a = paletteFor(uMoodA, vUv, uTime, vWave);
    vec3 b = paletteFor(uMoodB, vUv, uTime, vWave);
    vec3 col = mix(a, b, uMix);

    // Soft vignette + lighting from upper-left
    vec2 c = vUv - vec2(0.3, 0.7);
    float vign = smoothstep(1.2, 0.0, length(c));
    col *= 0.85 + vign * 0.18;

    // Wave-driven highlight (silk reflections)
    col += vec3(1.0, 0.96, 0.86) * max(vWave * 0.6, 0.0) * 0.25;

    // Tear darkening on tension surge
    col *= 1.0 - vTension * 0.18;

    // Subtle film grain
    float grain = (hash(vUv * 1500.0 + uTime) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ClothBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mount = mountRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ───────────────────────── Three setup ─────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const segments = window.innerWidth < 720 ? 60 : 110;
    const geo = new THREE.PlaneGeometry(4.0, 4.0, segments, segments);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uWind: { value: 0 },
      uTear: { value: 0 },
      uPulse: { value: 0 },
      uPulsePos: { value: new THREE.Vector2(0, 0) },
      uMix: { value: 0 },
      uMoodA: { value: 0 },
      uMoodB: { value: 0 },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // ───────────────────────── Resize ─────────────────────────
    const fit = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // scale plane so it fills viewport (slight overshoot for cloth motion)
      const dist = camera.position.z;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visH = 2 * Math.tan(fovRad / 2) * dist;
      const visW = visH * camera.aspect;
      mesh.scale.set(visW * 1.05, visH * 1.05, 1);
      camera.updateProjectionMatrix();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    // ───────────────────────── Mouse + clicks ─────────────────────────
    const target = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onClick = (e: MouseEvent) => {
      uniforms.uPulsePos.value.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      uniforms.uPulse.value = 1.0;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    // ───────────────────────── Section detection ─────────────────────────
    let moodA = MOOD_INDEX.silk;
    let moodB = MOOD_INDEX.silk;
    let mixTarget = 0;
    let mixCurrent = 0;

    const setMood = (m: Mood) => {
      const idx = MOOD_INDEX[m];
      if (uniforms.uMoodB.value === idx) return;
      // start a transition: A holds previous frame's blended state, B becomes new
      uniforms.uMoodA.value = uniforms.uMoodB.value;
      uniforms.uMoodB.value = idx;
      moodA = uniforms.uMoodA.value as number;
      moodB = idx;
      mixTarget = 1;
      mixCurrent = 0;
      uniforms.uMix.value = 0;
    };

    const tearByMood: Record<string, number> = { flaw: 0.6, tear: 0.5 };

    const detectSection = () => {
      const ids = Object.keys(MOOD_BY_ID);
      let bestId = "hero";
      let bestArea = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        if (visible > bestArea) {
          bestArea = visible;
          bestId = id;
        }
      }
      setMood(MOOD_BY_ID[bestId] ?? "silk");
      uniforms.uTear.value += ((tearByMood[bestId] ?? 0) - uniforms.uTear.value) * 0.04;
    };

    let lastDetect = 0;

    // ───────────────────────── Animate ─────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    const targetFps = window.innerWidth < 720 ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    let lastFrame = 0;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      const dt = clock.getDelta();
      uniforms.uTime.value += dt;

      // ease mouse
      uniforms.uMouse.value.x += (target.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (target.y - uniforms.uMouse.value.y) * 0.05;

      // wind grows when mouse moves; decays
      const md = Math.hypot(target.x - uniforms.uMouse.value.x, target.y - uniforms.uMouse.value.y);
      uniforms.uWind.value += (Math.min(0.6 + md * 2, 1.0) - uniforms.uWind.value) * 0.02;

      // pulse decay
      uniforms.uPulse.value *= 0.96;

      // section transition
      if (now - lastDetect > 180) {
        detectSection();
        lastDetect = now;
      }
      mixCurrent += (mixTarget - mixCurrent) * 0.05;
      uniforms.uMix.value = mixCurrent;
      if (mixCurrent > 0.98) {
        uniforms.uMoodA.value = uniforms.uMoodB.value;
        mixCurrent = 0;
        mixTarget = 0;
        uniforms.uMix.value = 0;
      }

      if (!reduced) renderer.render(scene, camera);
    };
    if (reduced) {
      // single render frame for static look
      uniforms.uMix.value = 0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(render);
    }

    // visibility — pause on hidden tab
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
      style={{ contain: "strict" }}
    />
  );
}
