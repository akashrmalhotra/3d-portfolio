"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  className?: string;
  duration?: number;
};

export default function StatCounter({ value, className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const match = value.match(/^(~)?(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : NaN;
  const suffix = match?.[3] ?? "";
  const isNumeric = match && !Number.isNaN(target);

  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    const controls = animate(mv, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, isNumeric, target, mv, duration]);

  if (!isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
