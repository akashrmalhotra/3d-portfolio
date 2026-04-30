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

/**
 * The New Architecture — central rotating Raymond hub with 4 glassmorphic
 * sides at the corners; particle trails flow inward (data) and outward (value).
 */
export default function NewArchitecture() {
  return (
    <section
      id="architecture"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0 pattern-weave opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{architecture.eyebrow}</div>
        </Reveal>

        <h2 className="mb-4 font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The New Architecture." />
        </h2>
        <p className="mb-16 max-w-2xl text-base text-ink md:text-lg">
          {architecture.caption}
        </p>

        <div className="relative mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-8">
          {/* Center — Raymond hub (rotates in 3D) */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-first lg:order-none lg:col-start-2 lg:row-start-2"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="mx-auto flex aspect-square w-full max-w-[260px] flex-col items-center justify-center rounded-full bg-gold text-navy shadow-[0_30px_80px_-20px_rgba(201,169,97,0.6)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.3em]">
                The Raymond
              </div>
              <div className="mt-1 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
                Platform
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-navy/70">
                Orchestrator
              </div>
            </motion.div>

            {/* Animated particle-trail flows */}
            <DataFlows />
          </motion.div>

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
              data-cursor="expand"
              className={`group relative rounded-2xl border border-navy/15 glass-cream p-6 shadow-[0_20px_60px_-30px_rgba(10,31,61,0.35)] transition-all hover:border-gold/60 hover:shadow-[0_30px_80px_-20px_rgba(10,31,61,0.5)] ${POSITIONS[s.pos]}`}
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

function DataFlows() {
  // Hidden on mobile, shown around hub on lg+. Particles travel from outside the hub
  // inward (data, cyan) and outward (value, gold) along 4 axes.
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-[-130%] hidden h-[360%] w-[360%] lg:block"
      viewBox="0 0 200 200"
    >
      {[0, 90, 180, 270].map((deg, axisI) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          {/* dashed guide */}
          <motion.path
            d="M100 30 L100 70"
            stroke="#0A1F3D"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + axisI * 0.12, duration: 0.9 }}
          />
          {/* inbound cyan packet */}
          <motion.circle
            r="1.6"
            fill="#2DD4E0"
            animate={{ cy: [30, 70], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.6,
              delay: axisI * 0.4,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeInOut",
            }}
            cx="100"
          />
          {/* outbound gold packet */}
          <motion.circle
            r="1.6"
            fill="#C9A961"
            animate={{ cy: [70, 30], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.6,
              delay: 0.8 + axisI * 0.4,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: "easeInOut",
            }}
            cx="100"
          />
        </g>
      ))}
    </svg>
  );
}
