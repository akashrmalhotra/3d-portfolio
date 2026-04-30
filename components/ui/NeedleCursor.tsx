"use client";

/**
 * Needle + thread cursor.
 * - Needle eye + tip rotates to follow movement direction
 * - A trailing thread (16-segment chain with damped springs) follows behind
 * - Variants:
 *    default   → needle + thread
 *    expand    → larger ring (over links/buttons)
 *    cut       → scissors (data-cursor="cut")
 *    measure   → tape measure ticks (data-cursor="measure")
 */

import { useEffect, useRef, useState } from "react";

type Variant = "default" | "expand" | "cut" | "measure";

const SEGMENTS = 16;

export default function NeedleCursor() {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [pressed, setPressed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let mx = -100,
      my = -100;
    let cx = mx,
      cy = my;
    let vx = 0,
      vy = 0;
    let lastAngle = 0;

    const points: { x: number; y: number }[] = Array.from({ length: SEGMENTS }, () => ({
      x: -100,
      y: -100,
    }));

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cursor="cut"]')) setVariant("cut");
      else if (t?.closest('[data-cursor="measure"]')) setVariant("measure");
      else if (t?.closest('a, button, [data-cursor="expand"]')) setVariant("expand");
      else setVariant("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // ease cursor
      vx = mx - cx;
      vy = my - cy;
      cx += vx * 0.32;
      cy += vy * 0.32;

      // angle of motion (radians)
      const speed = Math.hypot(vx, vy);
      if (speed > 0.4) {
        lastAngle = Math.atan2(vy, vx);
      }

      if (needleRef.current) {
        needleRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${lastAngle}rad)`;
      }

      // thread chain: each point chases previous with critical damping
      points[0].x = cx;
      points[0].y = cy;
      for (let i = 1; i < SEGMENTS; i++) {
        const prev = points[i - 1];
        const p = points[i];
        const dx = prev.x - p.x;
        const dy = prev.y - p.y;
        // distance constraint — keeps segments at ~ROD length
        const ROD = 6 + i * 0.4;
        const d = Math.hypot(dx, dy) || 1;
        const ratio = (d - ROD) / d;
        p.x += dx * Math.min(0.5, ratio + 0.18);
        p.y += dy * Math.min(0.5, ratio + 0.18);
        // tiny gravity pull on rear segments
        p.y += i * 0.04;
      }
      if (threadRef.current) {
        threadRef.current.setAttribute(
          "points",
          points.map((p) => `${p.x},${p.y}`).join(" ")
        );
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden lg:block"
      style={{ mixBlendMode: "normal" }}
    >
      {/* trailing thread */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          ref={threadRef}
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* needle / variants */}
      <div
        ref={needleRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transition: "width .25s ease, height .25s ease" }}
      >
        {variant === "default" && (
          <svg width="44" height="14" viewBox="-2 -2 48 18" className="overflow-visible">
            {/* needle body */}
            <line
              x1="2"
              y1="5"
              x2="42"
              y2="5"
              stroke="#0A1F3D"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* eye */}
            <circle cx="6" cy="5" r="2.4" fill="none" stroke="#0A1F3D" strokeWidth="1.2" />
            {/* sharp tip */}
            <polygon points="42,5 36,3 36,7" fill="#0A1F3D" />
          </svg>
        )}

        {variant === "expand" && (
          <div
            className="rounded-full border border-navy bg-cream/0"
            style={{
              width: pressed ? 28 : 44,
              height: pressed ? 28 : 44,
              transform: "translate(-50%, -50%)",
              transition: "width .2s, height .2s, background .2s",
              background: pressed ? "rgba(201,169,97,0.25)" : "transparent",
              marginLeft: 22,
              marginTop: 5,
            }}
          />
        )}

        {variant === "cut" && (
          <svg width="38" height="38" viewBox="0 0 38 38" className="overflow-visible">
            {/* scissors — opens on press */}
            <g
              style={{
                transformOrigin: "19px 19px",
                transition: "transform .2s",
                transform: pressed ? "rotate(0deg)" : "rotate(-12deg)",
              }}
            >
              <circle cx="9" cy="11" r="4" fill="none" stroke="#0A1F3D" strokeWidth="1.2" />
              <line x1="12" y1="13" x2="32" y2="22" stroke="#0A1F3D" strokeWidth="1.2" />
            </g>
            <g
              style={{
                transformOrigin: "19px 19px",
                transition: "transform .2s",
                transform: pressed ? "rotate(0deg)" : "rotate(12deg)",
              }}
            >
              <circle cx="9" cy="27" r="4" fill="none" stroke="#0A1F3D" strokeWidth="1.2" />
              <line x1="12" y1="25" x2="32" y2="16" stroke="#0A1F3D" strokeWidth="1.2" />
            </g>
            <line x1="20" y1="19" x2="34" y2="19" stroke="#C9A961" strokeWidth="0.8" />
          </svg>
        )}

        {variant === "measure" && (
          <svg width="60" height="20" viewBox="0 0 60 20">
            <rect x="0" y="6" width="60" height="8" fill="#C9A961" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={i}
                x1={4 + i * 6}
                y1="6"
                x2={4 + i * 6}
                y2={i % 5 === 0 ? "16" : "12"}
                stroke="#0A1F3D"
                strokeWidth="0.8"
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
