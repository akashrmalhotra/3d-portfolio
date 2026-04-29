"use client";

import { motion } from "framer-motion";
import { shift } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function ModelShift() {
  return (
    <section
      id="shift"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {shift.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Model Shift: Before vs. After." />
        </h2>

        <div className="overflow-hidden rounded-2xl border border-navy/15 bg-cream/95 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.3)]">
          {/* Header row */}
          <div className="grid grid-cols-1 border-b border-navy/15 bg-navy text-cream md:grid-cols-[1fr_1fr_1fr]">
            <div className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold/80">
              Dimension
            </div>
            <div className="border-l border-navy-light/40 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-cream/80">
              The Linear Pipeline · Before
            </div>
            <div className="border-l border-navy-light/40 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan">
              The Multi-Sided Platform · After
            </div>
          </div>

          {shift.rows.map((r, i) => (
            <motion.div
              key={r.dim}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 items-stretch border-t border-navy/10 transition-colors hover:bg-cream-warm/40 md:grid-cols-[1fr_1fr_1fr]"
            >
              <div className="px-6 py-6 font-serif text-lg font-bold text-navy md:text-xl">
                {r.dim}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.12 + 0.15, duration: 0.7 }}
                className="border-t border-navy/10 px-6 py-6 text-sm leading-relaxed text-ink md:border-l md:border-t-0 md:text-base"
              >
                {r.before}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.12 + 0.25, duration: 0.7 }}
                className="border-t border-navy/10 px-6 py-6 text-sm font-medium leading-relaxed text-navy md:border-l md:border-t-0 md:text-base"
              >
                {r.after}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
