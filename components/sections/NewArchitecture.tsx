"use client";

import { motion } from "framer-motion";
import { architecture } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

const POSITIONS: Record<string, string> = {
  top: "lg:col-start-2 lg:row-start-1",
  right: "lg:col-start-3 lg:row-start-2",
  bottom: "lg:col-start-2 lg:row-start-3",
  left: "lg:col-start-1 lg:row-start-2",
};

export default function NewArchitecture() {
  return (
    <section
      id="architecture"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {architecture.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-4 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The New Architecture." />
        </h2>
        <p className="mb-16 max-w-2xl text-base text-ink md:text-lg">
          {architecture.caption}
        </p>

        <div className="relative mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-8">
          {/* Center — Raymond orchestrator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-first lg:order-none lg:col-start-2 lg:row-start-2"
          >
            <div className="mx-auto flex aspect-square w-full max-w-[260px] flex-col items-center justify-center rounded-full bg-gold text-navy shadow-[0_30px_80px_-20px_rgba(201,169,97,0.6)]">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em]">
                The Raymond
              </div>
              <div className="mt-1 font-serif text-3xl font-bold md:text-4xl">
                Platform
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-navy/70">
                Orchestrator
              </div>
            </div>

            {/* Animated arrows in/out */}
            <div className="pointer-events-none absolute inset-[-40%] hidden lg:block">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                {[0, 90, 180, 270].map((deg, i) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <motion.path
                      d="M100 30 L100 75"
                      stroke="#2DD4E0"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 1 }}
                    />
                    <motion.path
                      d="M105 80 L100 75 L95 80"
                      stroke="#2DD4E0"
                      strokeWidth="1.2"
                      fill="none"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Sides */}
          {architecture.sides.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                delay: 0.4 + i * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl border border-navy/15 bg-cream/95 p-6 shadow-[0_20px_60px_-30px_rgba(10,31,61,0.35)] transition-all hover:shadow-[0_30px_80px_-20px_rgba(10,31,61,0.5)] ${POSITIONS[s.pos]}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="font-serif text-lg font-bold text-navy md:text-xl">
                  {s.name}
                </div>
                <span className="rounded-full bg-cyan-light/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
                  {s.mode}
                </span>
              </div>
              <div className="mb-3 text-sm leading-snug text-ink">
                <span className="font-semibold text-navy">Value · </span>
                {s.value}
              </div>
              <div className="text-sm leading-snug text-ink">
                <span className="font-semibold text-gold-warm">Data · </span>
                {s.data}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
