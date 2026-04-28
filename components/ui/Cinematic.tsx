"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useVelocity,
  MotionValue,
  wrap,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/* ----------------------------- Horizontal scroll ---------------------------- */

export function HorizontalScroll({
  children,
  className,
  panels = 3,
}: {
  children: ReactNode;
  className?: string;
  panels?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Scroll from 0 → -((panels - 1) / panels) * 100%
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(1 - 1 / panels) * 100}%`]
  );
  const xSmooth = useSpring(x, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <section
      ref={ref}
      style={{ height: `${panels * 100}vh` }}
      className={className}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x: xSmooth, width: `${panels * 100}vw`, willChange: "transform" }}
          className="flex h-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- Scroll-velocity marquee ------------------------ */

export function VelocityMarquee({
  children,
  baseVelocity = 5,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -45, v)}%`);

  const directionFactor = useRef(1);
  useEffect(() => {
    let rafId = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      let moveBy = directionFactor.current * baseVelocity * dt;
      if (velocityFactor.get() < 0) directionFactor.current = -1;
      else if (velocityFactor.get() > 0) directionFactor.current = 1;
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [baseVelocity, baseX, velocityFactor]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="inline-block" style={{ x }}>
        <span className="mx-8 inline-block">{children}</span>
        <span className="mx-8 inline-block">{children}</span>
        <span className="mx-8 inline-block">{children}</span>
        <span className="mx-8 inline-block">{children}</span>
      </motion.div>
    </div>
  );
}

/* ----------------------------- Mask text reveal ----------------------------- */

export function MaskText({
  text,
  className,
  delay = 0,
  splitBy = "word",
}: {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
}) {
  const parts =
    splitBy === "word" ? text.split(" ") : Array.from(text);
  return (
    <span className={`inline-block ${className ?? ""}`}>
      {parts.map((p, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: splitBy === "word" ? "0.25em" : 0 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * (splitBy === "word" ? 0.06 : 0.02),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {p === " " ? " " : p}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ----------------------------- Clip-path image ------------------------------ */

export function ClipReveal({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const initialClip = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 0% 0% 100%)",
    right: "inset(0% 100% 0% 0%)",
  }[direction];

  return (
    <motion.div
      initial={{ clipPath: initialClip, scale: 1.18 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ willChange: "clip-path, transform" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------- Expanding hover-aware cursor ------------------------ */

export function HoverCursor() {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<"default" | "expand" | "view">("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 26, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (t?.closest('a, button, [data-cursor="view"]')) {
        setVariant(t.closest('[data-cursor="view"]') ? "view" : "expand");
      } else {
        setVariant("default");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!mounted) return null;

  const size = variant === "default" ? 14 : variant === "view" ? 96 : 56;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden items-center justify-center rounded-full mix-blend-difference lg:flex"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="h-full w-full rounded-full bg-cream"
      />
      {variant === "view" && (
        <span className="absolute text-[10px] font-semibold uppercase tracking-[0.2em] text-navy mix-blend-normal">
          view
        </span>
      )}
    </motion.div>
  );
}

/* --------------------------- Background color stage ------------------------- */
// Animates the page background color through stops based on which section is in view.

export function BackgroundStage({ stops }: { stops: string[] }) {
  const { scrollYProgress } = useScroll();
  // Build interpolation domain like [0, 1/(n-1), 2/(n-1), …, 1]
  const domain = stops.map((_, i) => i / Math.max(1, stops.length - 1));
  const bg = useTransform(scrollYProgress, domain, stops);

  useEffect(() => {
    const unsub = bg.on("change", (c: string) => {
      document.body.style.backgroundColor = c;
    });
    return () => unsub();
  }, [bg]);

  return null;
}

/* ----------------------------- Pinned scrub frame --------------------------- */
// Pins a section while children crossfade by scroll progress.

export function PinnedScrub({
  scenes,
  className,
}: {
  scenes: { node: ReactNode; bg?: string }[];
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
      style={{ height: `${scenes.length * 100}vh` }}
      className={className}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {scenes.map((s, i) => (
          <Scene
            key={i}
            index={i}
            total={scenes.length}
            progress={scrollYProgress}
            bg={s.bg}
          >
            {s.node}
          </Scene>
        ))}
      </div>
    </div>
  );
}

function Scene({
  index,
  total,
  progress,
  children,
  bg,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
  bg?: string;
}) {
  const step = 1 / total;
  const pre = Math.max(0, index * step - step * 0.35);
  const start = index * step;
  const end = (index + 1) * step;
  const post = Math.min(1, end + step * 0.35);
  const opacity = useTransform(progress, [pre, start, end, post], [0, 1, 1, 0]);
  const scale = useTransform(progress, [pre, start, end, post], [1.08, 1, 1, 0.96]);
  const y = useTransform(progress, [pre, start, end, post], [40, 0, 0, -40]);
  return (
    <motion.div
      style={{ opacity, scale, y, background: bg, willChange: "opacity, transform" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

/* --------------------- Scroll-velocity skew on a wrapper -------------------- */

export function VelocitySkew({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const sv = useSpring(v, { stiffness: 220, damping: 30, mass: 0.4 });
  const skew = useTransform(sv, [-3000, 0, 3000], [max, 0, -max], { clamp: true });
  return (
    <motion.div style={{ skewY: skew, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------- Number scrubber on scroll ------------------------ */

export function ScrollNumber({
  from = 0,
  to,
  format,
  className,
}: {
  from?: number;
  to: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });
  const v = useTransform(scrollYProgress, [0, 1], [from, to]);
  const [text, setText] = useState(format ? format(from) : `${from}`);
  useMotionValueEvent(v, "change", (val) => {
    setText(format ? format(val) : `${Math.round(val)}`);
  });
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
