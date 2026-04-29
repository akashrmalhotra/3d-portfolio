"use client";

import { motion } from "framer-motion";
import { exchange } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function ValueExchange() {
  const stages = exchange.stages;
  const total = stages.length;

  return (
    <section
      id="exchange"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {exchange.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Value Exchange: A Moat That Gets Deeper Every Day." />
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Flywheel */}
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute inset-[8%] rounded-full border-2 border-dashed border-gold/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, ease: "linear", repeat: Infinity }}
              className="absolute inset-[18%] rounded-full border border-navy/20"
            />

            {/* Center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-navy p-4 text-center text-cream shadow-[0_30px_80px_-20px_rgba(10,31,61,0.55)]">
                <p className="font-serif text-xs italic leading-tight text-cream/95 md:text-sm">
                  {exchange.center}
                </p>
              </div>
            </motion.div>

            {/* Stage badges */}
            {stages.map((s, i) => {
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 44;
              const y = 50 + Math.sin(angle) * 44;
              return (
                <motion.div
                  key={s.n}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: 0.4 + i * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ scale: 1.12 }}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gold text-navy shadow-[0_10px_30px_-10px_rgba(201,169,97,0.7)] md:h-20 md:w-20">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      Stage
                    </div>
                    <div className="font-serif text-xl font-bold md:text-2xl">
                      {s.n}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Arrows between stages */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {stages.map((_, i) => {
                const a = (i / total) * Math.PI * 2 - Math.PI / 2;
                const b = ((i + 1) / total) * Math.PI * 2 - Math.PI / 2;
                const r = 38;
                const x1 = 50 + Math.cos(a) * r;
                const y1 = 50 + Math.sin(a) * r;
                const x2 = 50 + Math.cos(b) * r;
                const y2 = 50 + Math.sin(b) * r;
                return (
                  <motion.path
                    key={i}
                    d={`M${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                    stroke="#2DD4E0"
                    strokeWidth="0.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.7 }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Stage descriptions */}
          <div className="space-y-4">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
                className="group flex items-start gap-4 rounded-xl border border-navy/10 bg-cream/80 p-5 transition-all hover:border-gold hover:bg-cream"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy font-serif text-base font-bold text-gold">
                  {s.n}
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-warm">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-ink md:text-base">
                    {s.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
