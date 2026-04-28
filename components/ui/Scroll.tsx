"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, speed * -200]);
  const ySmooth = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: ySmooth, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 40, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ScaleScrollProps = {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
};

export function ScaleScroll({
  children,
  className,
  from = 0.85,
  to = 1.05,
}: ScaleScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 1, 1, 0.2]
  );
  const scaleSmooth = useSpring(scale, { stiffness: 80, damping: 22 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale: scaleSmooth, opacity, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

type RotateScrollProps = {
  children: ReactNode;
  className?: string;
  range?: number;
};

export function RotateScroll({
  children,
  className,
  range = 360,
}: RotateScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, range]);
  const rotateSmooth = useSpring(rotate, { stiffness: 60, damping: 25 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate: rotateSmooth, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

// Tracks scroll velocity to apply skew/blur on fast scrolls
export function useScrollVelocityFx() {
  const { scrollY } = useScroll();
  const velocity = useMotionValue(0);
  const skew = useSpring(velocity, { stiffness: 200, damping: 30, mass: 0.4 });
  const last = useRef({ y: 0, t: performance.now() });

  useMotionValueEvent(scrollY, "change", (y) => {
    const now = performance.now();
    const dt = now - last.current.t || 1;
    const v = ((y - last.current.y) / dt) * 16; // px per frame
    velocity.set(Math.max(-12, Math.min(12, v)));
    last.current = { y, t: now };
  });

  // bleed velocity back to 0 when scroll stops
  useEffect(() => {
    const id = setInterval(() => {
      const v = velocity.get();
      if (Math.abs(v) > 0.01) velocity.set(v * 0.85);
    }, 60);
    return () => clearInterval(id);
  }, [velocity]);

  return skew as MotionValue<number>;
}

// Counter that animates from 0 → end when in view
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 });
}

type StickyRevealProps = {
  children: ReactNode;
  className?: string;
};

// Section that pins, then crossfades a stack of slides as you scroll
export function StickyStack({
  slides,
  className,
}: {
  slides: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      style={{ height: `${slides.length * 100}vh` }}
      className={className}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <Slide key={i} index={i} total={slides.length} progress={scrollYProgress}>
            {slide}
          </Slide>
        ))}
      </div>
    </div>
  );
}

function Slide({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - step * 0.4), start, end, Math.min(1, end + step * 0.4)],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - step * 0.4), start, end, Math.min(1, end + step * 0.4)],
    [60, 0, 0, -60]
  );
  return (
    <motion.div
      style={{ opacity, y, willChange: "transform, opacity" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

// 3-D tilt that follows the cursor on hover
export function TiltCard({
  children,
  className,
  intensity = 12,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Magnetic cursor follower used as a global pointer accent
export function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 25 });
  const sy = useSpring(y, { stiffness: 250, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!mounted) return null;
  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-8 w-8 rounded-full mix-blend-difference lg:block"
    >
      <div className="h-full w-full rounded-full bg-cream opacity-70" />
    </motion.div>
  );
}
