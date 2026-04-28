"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.4,
  });
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [120, 200, 30]);
  const background = useTransform(hue, (h) => `hsl(${h} 60% 38%)`);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, background, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-50 h-[3px] w-full"
    />
  );
}
