"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 220]), {
    stiffness: 100,
    damping: 26,
  });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.5, 0]);
  const threadX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const words = hero.title.split(" ");

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Cream grid background */}
      <div className="absolute inset-0 pattern-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-warm/40" />

      {/* Floating navy panel with title — hugs the slide composition */}
      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 shadow-[0_50px_120px_-30px_rgba(10,31,61,0.55)] ring-1 ring-navy-light/40 md:px-16 md:py-24"
        >
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-soft/80"
          >
            <span className="h-px w-8 bg-gold/60" />
            {hero.eyebrow}
          </motion.div>

          <h1 className="font-serif text-4xl font-bold leading-[1.02] tracking-tight text-cream md:text-7xl lg:text-[5.5rem]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
                <motion.span
                  initial={{ y: "110%", rotateX: -40 }}
                  animate={{ y: "0%", rotateX: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.07,
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                  style={{ transformOrigin: "0% 100%" }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Frayed gold thread */}
          <motion.div
            style={{ x: threadX }}
            className="pointer-events-none absolute bottom-[36%] left-0 right-0 h-px"
          >
            <svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="h-12 w-full"
            >
              <motion.path
                d="M0 30 Q 200 20, 420 32 T 820 28 Q 950 27 1010 30"
                stroke="#C9A961"
                strokeWidth="1.6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* frayed ends */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.path
                  key={i}
                  d={`M1010 30 Q ${1040 + i * 4} ${22 + (i % 3) * 6}, ${1100 + i * 8} ${10 + i * 5}`}
                  stroke="#C9A961"
                  strokeWidth="0.9"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.65 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.8 + i * 0.07,
                    ease: "easeOut",
                  }}
                />
              ))}
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-16 max-w-2xl font-serif text-xl italic text-gold md:text-2xl"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.3em] text-navy/50"
        >
          <div>scroll to enter</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-2 h-7 w-px bg-navy/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
