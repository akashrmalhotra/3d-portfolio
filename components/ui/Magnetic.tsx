"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * Magnetic wrapper — children gravitate toward the cursor within range.
 * Used for buttons, cards, and key headings.
 */
export function Magnetic({
  children,
  range = 80,
  strength = 0.35,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
  as?: "div" | "button" | "a" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy);
    if (d > range) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // motion.* tag mapping
  const MotionTag: any =
    Tag === "button" ? motion.button : Tag === "a" ? motion.a : Tag === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
