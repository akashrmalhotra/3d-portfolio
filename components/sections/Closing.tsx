"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { closing } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Closing — dark navy starfield.
 * 1. Tape measure unrolls left → right (gold, with ticks).
 * 2. Tape measure morphs into a sine wave (cyan).
 * 3. Wave nodes become a network of connected points.
 * 4. Title, lead quote, body text reveal cinematically.
 * 5. Golden particles drift upward.
 */
export default function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // tape → wave transition (0 = tape, 1 = wave)
  const morphT: MotionValue<number> = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      id="closing"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden py-28"
    >
      {/* starfield + navy cloth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-deep" />
      <div className="pointer-events-none absolute inset-0 pattern-grid-on-navy opacity-40" />
      <FloatingParticles />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-gold/80">{closing.eyebrow}</div>
        </Reveal>

        {/* Tape measure → wave → network */}
        <div className="relative my-12 h-36 w-full overflow-visible md:h-44">
          <TapeMorphSvg morphT={morphT} />
        </div>

        <h2 className="font-serif text-4xl leading-tight text-cream md:text-6xl lg:text-7xl">
          <MaskText text={closing.title} />
        </h2>

        <Reveal delay={0.5}>
          <p className="mt-10 font-serif text-2xl italic text-gold md:text-4xl">
            &ldquo;{closing.lead}&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-cream/80 md:text-lg">
            {closing.body}
          </p>
        </Reveal>

        {/* Final network assembly */}
        <Reveal delay={1.1}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-gold/20 bg-navy-deep/60 p-6 backdrop-blur">
            <FinalNetworkViz />
          </div>
        </Reveal>

        <Reveal delay={1.4}>
          <div className="mt-14 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/55">
            <span className="h-px w-16 bg-gold/35" />
            <span>End of Memo · Raymond Platform Strategy</span>
            <span className="h-px flex-1 bg-gold/35" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Tape measure that morphs into sine-wave network ─── */
function TapeMorphSvg({ morphT }: { morphT: MotionValue<number> }) {
  const TICKS = 32;
  const NODES = 14;

  // All useTransform calls at component top level — never inside .map()
  const tapeOpacity  = useTransform(morphT, [0, 0.6], [1, 0]);
  const tickOpacity  = useTransform(morphT, [0, 0.5], [1, 0]);
  const waveOpacity  = useTransform(morphT, [0.3, 1], [0, 1]);
  const nodeOpacity  = useTransform(morphT, [0.5, 1], [0, 1]);
  const connOpacity  = useTransform(morphT, [0.7, 1], [0, 0.45]);

  const wavePath = `M0 80 ${Array.from({ length: NODES + 1 })
    .map((_, i) => `Q ${(i + 0.5) * (1200 / NODES)} ${80 + Math.sin(i * 0.9) * 38} ${(i + 1) * (1200 / NODES)} 80`)
    .join(" ")}`;

  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="tapeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B89348" />
          <stop offset="60%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#E2CE9C" />
        </linearGradient>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2DD4E0" stopOpacity="0" />
          <stop offset="30%" stopColor="#2DD4E0" />
          <stop offset="100%" stopColor="#2DD4E0" />
        </linearGradient>
      </defs>

      {/* Tape body */}
      <motion.rect
        x="0" y="55" height="50"
        fill="url(#tapeGrad)"
        initial={{ width: 0 }}
        whileInView={{ width: 1200 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: tapeOpacity }}
      />

      {/* Tape ticks — shared tickOpacity MotionValue */}
      {Array.from({ length: TICKS }).map((_, i) => (
        <motion.line
          key={i}
          x1={20 + i * 37} y1="55"
          x2={20 + i * 37} y2={i % 4 === 0 ? "90" : "75"}
          stroke="#0A1F3D" strokeWidth="1.4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.5 + i * 0.02, duration: 0.3 }}
          style={{ opacity: tickOpacity }}
        />
      ))}

      {/* Glow numbers — shared tickOpacity */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.text
          key={i}
          x={20 + i * 4 * 37} y="105"
          fontSize="9" fill="#0A1F3D" fillOpacity="0.55"
          textAnchor="middle" fontFamily="monospace"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
          style={{ opacity: tickOpacity }}
        >
          {(i + 1) * 10}
        </motion.text>
      ))}

      {/* Wave path */}
      <motion.path
        d={wavePath}
        stroke="url(#waveGrad)" strokeWidth="2" fill="none"
        style={{ opacity: waveOpacity }}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Wave nodes — shared nodeOpacity */}
      {Array.from({ length: NODES }).map((_, i) => (
        <motion.circle
          key={i}
          cx={(i + 1) * (1200 / NODES)}
          cy={80 + Math.sin(i * 0.9) * 38}
          r="4" fill="#2DD4E0"
          style={{ opacity: nodeOpacity }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 1.6 + i * 0.06, duration: 0.4 }}
        />
      ))}

      {/* Cross-connections — shared connOpacity */}
      {Array.from({ length: NODES - 2 }).map((_, i) => (
        <motion.line
          key={i}
          x1={(i + 1) * (1200 / NODES)}
          y1={80 + Math.sin(i * 0.9) * 38}
          x2={(i + 3) * (1200 / NODES)}
          y2={80 + Math.sin((i + 2) * 0.9) * 38}
          stroke="#C9A961" strokeWidth="0.6"
          style={{ opacity: connOpacity }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 2.0 + i * 0.04, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}

/* ─── Final platform network (assembled on scroll) ─── */
function FinalNetworkViz() {
  const HUB_COUNT = 5;
  const SPOKE_COUNT = 8;
  return (
    <svg viewBox="0 0 800 200" className="w-full" style={{ maxHeight: 160 }}>
      {/* Central hub */}
      <motion.circle
        cx="400"
        cy="100"
        r="18"
        fill="#C9A961"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x="400" y="103" textAnchor="middle" fontSize="7" fill="#0A1F3D" fontFamily="serif" fontWeight="bold">
        RAYMOND
      </text>

      {/* 4 spoke clusters */}
      {[-1, -0.5, 0.5, 1].map((side, si) => {
        const x = 400 + side * 200;
        return (
          <g key={si}>
            <motion.line
              x1="400"
              y1="100"
              x2={x}
              y2="100"
              stroke="#C9A961"
              strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + si * 0.15, duration: 0.9 }}
            />
            <motion.circle
              cx={x}
              cy="100"
              r="10"
              fill="#0A1F3D"
              stroke="#2DD4E0"
              strokeWidth="1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + si * 0.15, duration: 0.6 }}
            />
            {/* micro spokes */}
            {Array.from({ length: 5 }).map((_, j) => {
              const a = ((j - 2) * 0.4) + (si < 2 ? Math.PI : 0);
              const ex = x + Math.cos(a) * 30;
              const ey = 100 + Math.sin(a) * 30;
              return (
                <g key={j}>
                  <motion.line
                    x1={x}
                    y1="100"
                    x2={ex}
                    y2={ey}
                    stroke="#2DD4E0"
                    strokeWidth="0.6"
                    strokeOpacity="0.55"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 + si * 0.12 + j * 0.06, duration: 0.5 }}
                  />
                  <motion.circle
                    cx={ex}
                    cy={ey}
                    r="2.5"
                    fill="#E2CE9C"
                    fillOpacity="0.8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.3 + si * 0.12 + j * 0.05, duration: 0.4 }}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Floating golden particles ─── */
function FloatingParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold"
          style={{
            left: `${5 + (i * 37) % 90}%`,
            bottom: `${(i * 13) % 40}%`,
            opacity: 0.25 + (i % 4) * 0.12,
          }}
          animate={{
            y: [0, -(60 + (i % 5) * 40)],
            opacity: [0.25 + (i % 4) * 0.12, 0],
            x: [(i % 2 ? 8 : -8), 0],
          }}
          transition={{
            duration: 4 + (i % 5),
            delay: (i % 7) * 0.7,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
