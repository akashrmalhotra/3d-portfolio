"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";

/**
 * Hero — "The Complete Man. The Incomplete Platform."
 * - Character-by-character title with rotateX/Y staggered reveal
 * - Frayed gold thread that draws and tears at the end
 * - Needle-and-thread scroll indicator at the bottom
 * - Subtitle types in
 * - Cloth background lives globally (ClothBackground)
 */
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
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.55, 0]);
  const threadX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Split into TWO sentences for separate reveal pacing
  const [sentenceA, sentenceB] = hero.title.split(". ").map((s, i, arr) =>
    i < arr.length - 1 ? s + "." : s
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Soft cream wash so text reads over the live cloth bg */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/15 via-transparent to-cream/30" />
      <div className="pointer-events-none absolute inset-0 pattern-grid-fine opacity-40" />

      {/* Floating eyebrow + crest mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute left-6 top-8 z-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-navy/65 md:left-12 md:top-10"
      >
        <Crest />
        <span>{hero.eyebrow}</span>
      </motion.div>

      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28"
      >
        <h1 className="font-serif font-bold leading-[1.02] tracking-tight text-navy">
          <CharLine
            text={sentenceA}
            className="block text-[2.4rem] leading-[1.05] md:text-7xl lg:text-[5.5rem]"
            delay={0.2}
          />
          <span className="block">
            <CharLine
              text={sentenceB}
              className="block text-[2.4rem] leading-[1.05] md:text-7xl lg:text-[5.5rem]"
              delay={1.0}
              accent
            />
          </span>
        </h1>

        {/* Frayed gold thread that "tears" at the end */}
        <motion.div
          style={{ x: threadX }}
          className="pointer-events-none relative mt-10 h-12 w-full max-w-3xl"
        >
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-full w-full">
            <motion.path
              d="M0 30 Q 200 18, 420 32 T 820 26 Q 950 25 1010 30"
              stroke="#C9A961"
              strokeWidth="1.6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M1010 30 Q ${1040 + i * 4} ${22 + (i % 3) * 6}, ${1100 + i * 8} ${10 + i * 5}`}
                stroke="#C9A961"
                strokeWidth="0.9"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.2, delay: 2.4 + i * 0.06, ease: "easeOut" }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Subtitle, typewriter */}
        <Typewriter
          text={hero.subtitle}
          className="mt-6 max-w-2xl font-serif text-xl italic text-navy/85 md:text-2xl"
          startDelayMs={2400}
        />

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.7 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/60"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold" />
            FY24 Revenue · ₹9,286 Cr
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold" />
            20,000 Tailors
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold" />
            1,500+ EBOs
          </span>
        </motion.div>
      </motion.div>

      {/* Needle-and-thread scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <NeedleScrollIndicator />
        <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.45em] text-navy/55">
          Begin the Memo
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- atoms ---------------------------------- */

function Crest() {
  return (
    <motion.div
      initial={{ rotate: -10, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="relative grid h-7 w-7 place-items-center rounded-full border border-navy/40"
    >
      <div className="h-1 w-1 rounded-full bg-navy" />
      <span className="absolute inset-0 rounded-full ring-1 ring-gold/40" />
    </motion.div>
  );
}

function CharLine({
  text,
  delay = 0,
  className,
  accent,
}: {
  text: string;
  delay?: number;
  className?: string;
  accent?: boolean;
}) {
  const chars = Array.from(text);
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {chars.map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "120%", rotateX: -45 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{
              delay: delay + i * 0.025,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${accent ? "text-navy" : "text-navy"}`}
            style={{
              transformOrigin: "0% 100%",
              backgroundImage: accent
                ? "linear-gradient(180deg, var(--navy) 60%, var(--gold) 100%)"
                : undefined,
              WebkitBackgroundClip: accent ? "text" : undefined,
              backgroundClip: accent ? "text" : undefined,
              color: accent ? "transparent" : undefined,
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Typewriter({
  text,
  className,
  startDelayMs = 0,
}: {
  text: string;
  className?: string;
  startDelayMs?: number;
}) {
  // Single render with CSS-based char reveal driven by Framer's stagger
  const chars = Array.from(text);
  return (
    <p className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.0001,
            delay: startDelayMs / 1000 + i * 0.018,
          }}
          className="inline-block whitespace-pre"
        >
          {c}
        </motion.span>
      ))}
      <motion.span
        aria-hidden
        className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[3px] bg-gold align-baseline"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          delay: startDelayMs / 1000,
          duration: 1.0,
          repeat: 4,
          repeatType: "loop",
        }}
      />
    </p>
  );
}

function NeedleScrollIndicator() {
  return (
    <motion.svg
      width="34"
      height="64"
      viewBox="0 0 34 64"
      className="mx-auto"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* needle shaft */}
      <line x1="17" y1="6" x2="17" y2="42" stroke="#0A1F3D" strokeWidth="1.4" />
      <circle cx="17" cy="9" r="3" fill="none" stroke="#0A1F3D" strokeWidth="1.2" />
      <polygon points="17,46 14,40 20,40" fill="#0A1F3D" />
      {/* trailing thread */}
      <motion.path
        d="M17 12 Q 12 24 18 32 Q 22 40 14 50 Q 10 56 16 64"
        stroke="#C9A961"
        strokeWidth="1.2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.svg>
  );
}
