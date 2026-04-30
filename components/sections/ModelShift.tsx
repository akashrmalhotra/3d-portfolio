"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { shift } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Model Shift — before vs. after comparison table.
 * A vertical "zipper" divides sepia/aged (before) from vibrant (after).
 * The zipper unzips on scroll, revealing the after column row by row.
 */
export default function ModelShift() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zipY = useTransform(scrollYProgress, [0.15, 0.65], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="shift"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{shift.eyebrow}</div>
        </Reveal>
        <h2 className="mb-16 font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The Model Shift — Before vs. After." />
        </h2>

        <div className="overflow-hidden rounded-2xl border border-navy/15 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.3)]">
          {/* Header */}
          <div className="grid grid-cols-1 border-b border-navy/15 bg-navy text-cream md:grid-cols-[1fr_1fr_1fr]">
            <div className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold/80">
              Dimension
            </div>
            <div className="border-l border-navy-light/40 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-cream/80">
              Before · The Linear Pipeline
            </div>
            <div className="border-l border-navy-light/40 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan">
              After · The Platform
            </div>
          </div>

          {/* Zipper rail sits between col 2 & 3 */}
          <div className="relative">
            {/* Hidden md:block absolute zipper line */}
            <div className="pointer-events-none absolute bottom-0 left-[66.66%] top-0 z-20 hidden w-px md:block">
              {/* unzipped section grows from top */}
              <motion.div
                style={{ height: zipY }}
                className="absolute left-0 top-0 w-full bg-gold/60"
              />
              {/* zipper pull (diamond) moves down */}
              <motion.div
                style={{ top: zipY }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="h-4 w-4 rotate-45 border-2 border-gold bg-cream shadow-[0_0_10px_rgba(201,169,97,0.5)]" />
              </motion.div>
              {/* below zipper = still zipped (plain line) */}
              <div className="absolute bottom-0 left-0 top-0 -z-10 w-px bg-navy/20" />
            </div>

            {shift.rows.map((r, i) => (
              <motion.div
                key={r.dim}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 items-stretch border-t border-navy/10 transition-colors hover:bg-cream-warm/40 md:grid-cols-[1fr_1fr_1fr]"
              >
                {/* Dimension */}
                <div className="px-6 py-6 font-serif text-lg font-bold text-navy md:text-xl">
                  {r.dim}
                </div>

                {/* Before — sepia wash */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.1 + 0.12, duration: 0.7 }}
                  className="relative border-t border-navy/10 bg-cream-warm/30 px-6 py-6 text-sm leading-relaxed text-ink/90 md:border-l md:border-t-0 md:text-base"
                  style={{ filter: "sepia(0.28)" }}
                >
                  {r.before}
                </motion.div>

                {/* After — vibrant, glows on entry */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.1 + 0.22, duration: 0.7 }}
                  className="relative border-t border-navy/10 px-6 py-6 text-sm font-medium leading-relaxed text-navy md:border-l md:border-t-0 md:text-base"
                >
                  {/* subtle glow accent */}
                  <span className="absolute inset-y-2 left-3 w-0.5 rounded-full bg-cyan/50" />
                  {r.after}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
