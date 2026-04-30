"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { flaw } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Structural Flaw — denim-textured pipeline that TEARS at point-of-sale.
 * Particle/thread explosion at the break, post-break icons drift apart.
 */
export default function StructuralFlaw() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // tear progresses as section enters mid-viewport
  const tearProgress = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  // pre-computed shrapnel offsets
  const shards = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return {
          dx: Math.cos(a) * (60 + (i % 4) * 20),
          dy: Math.sin(a) * (40 + (i % 3) * 18),
          rot: (i % 2 ? 1 : -1) * (20 + i * 4),
          delay: 0.9 + i * 0.025,
          size: 6 + (i % 4) * 3,
          color: i % 3 === 0 ? "#C9A961" : i % 3 === 1 ? "#0A1F3D" : "#E2CE9C",
        };
      }),
    []
  );
  const threads = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2 + 0.2;
        const r1 = 30 + (i % 3) * 10;
        const r2 = r1 + 60 + (i % 4) * 20;
        return {
          x1: 100 + Math.cos(a) * r1,
          y1: 100 + Math.sin(a) * r1,
          x2: 100 + Math.cos(a) * r2,
          y2: 100 + Math.sin(a) * r2,
          delay: 1.0 + i * 0.04,
          color: i % 2 ? "#C9A961" : "#0A1F3D",
        };
      }),
    []
  );

  return (
    <section
      ref={ref}
      id="flaw"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      {/* denim cross-hatch overlay */}
      <div className="pointer-events-none absolute inset-0 pattern-denim opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{flaw.eyebrow}</div>
        </Reveal>

        <h2 className="font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The Structural Flaw — The Pipeline That Breaks at the Point of Sale." />
        </h2>

        <div className="relative mt-24" style={{ perspective: 1400 }}>
          {/* Pipeline rail (left half = controlled) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute left-0 right-1/2 top-1/2 h-[6px] -translate-y-1/2 rounded-full gold-thread"
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
            {/* PRE — controlled boxes, factory-line pop */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {flaw.pre.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 30, rotateY: -25, z: -40 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: 0.4 + i * 0.18,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative aspect-square rounded-md border-[3px] border-navy bg-cream shadow-[0_20px_30px_-20px_rgba(10,31,61,0.5)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 pattern-denim opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-[11px] font-semibold uppercase tracking-wide text-navy md:text-xs">
                    {p}
                  </div>
                  {[
                    [3, 3],
                    [3, "calc(100% - 11px)"],
                    ["calc(100% - 11px)", 3],
                    ["calc(100% - 11px)", "calc(100% - 11px)"],
                  ].map(([t, l], k) => (
                    <span
                      key={k}
                      style={{ top: t as string, left: l as string }}
                      className="absolute h-2 w-2 rounded-full bg-navy"
                    />
                  ))}
                </motion.div>
              ))}
            </div>

            {/* TEAR — fabric ripping with shrapnel + threads */}
            <div className="relative h-44 w-full md:h-56 md:w-44">
              <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
                {/* fabric body */}
                <motion.path
                  d="M40 60 L160 60 L160 140 L40 140 Z"
                  fill="#0A1F3D"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.02 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                />
                {/* tear gap */}
                <motion.path
                  d="M100 40 L94 80 L106 100 L92 120 L108 160 L100 180"
                  stroke="#C9A961"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                {/* shrapnel */}
                {shards.map((s, i) => (
                  <motion.rect
                    key={i}
                    x="98"
                    y="98"
                    width={s.size}
                    height={s.size * 0.4}
                    fill={s.color}
                    initial={{ x: 98, y: 98, opacity: 0, rotate: 0 }}
                    whileInView={{
                      x: 98 + s.dx,
                      y: 98 + s.dy,
                      opacity: [0, 1, 0],
                      rotate: s.rot,
                    }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{
                      duration: 1.2,
                      delay: s.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
                {/* loose threads radiating */}
                {threads.map((t, i) => (
                  <motion.line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={t.x2}
                    y2={t.y2}
                    stroke={t.color}
                    strokeOpacity="0.85"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.8, delay: t.delay }}
                  />
                ))}
                {/* central spark */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="6"
                  fill="#C9A961"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 2, 0] }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, delay: 0.85 }}
                />
              </svg>

              <motion.div
                style={{ opacity: tearProgress }}
                className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-deep"
              >
                Point of Sale · Break
              </motion.div>
            </div>

            {/* POST — disconnected icons, drift apart */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {flaw.post.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: 1.6 + i * 0.18,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center justify-center gap-2 drift"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan/70 bg-cyan-light/20 text-cyan-deep shadow-[0_0_30px_-5px_rgba(45,212,224,0.4)]">
                    <PostIcon kind={p} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-cyan-deep md:text-sm">
                    {p}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Captions */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            <Reveal delay={0.2}>
              <p className="border-l-2 border-navy pl-4 text-sm leading-relaxed text-ink md:text-base">
                <span className="font-semibold text-navy">{flaw.preCaption}</span>
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="border-l-2 border-cyan pl-4 text-sm leading-relaxed text-ink md:text-base">
                <span className="font-semibold text-cyan-deep">{flaw.postCaption}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostIcon({ kind }: { kind: string }) {
  if (kind === "Fit") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="6" r="2.4" />
        <path d="M9 11h6l-1 8h-4l-1-8z" />
      </svg>
    );
  }
  if (kind === "Occasion") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 8h11l3 3v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
