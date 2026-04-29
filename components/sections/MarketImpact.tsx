"use client";

import { motion } from "framer-motion";
import { impact } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal, TiltCard } from "@/components/ui/Scroll";

export default function MarketImpact() {
  return (
    <section
      id="impact"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {impact.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Market Impact: Who Gets Disrupted, and How." />
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {impact.cells.map((c, i) => (
            <motion.div
              key={c.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="h-full" intensity={5}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-navy/15 bg-cream/95 p-7 shadow-[0_20px_60px_-30px_rgba(10,31,61,0.35)] transition-all hover:shadow-[0_30px_80px_-20px_rgba(10,31,61,0.5)]">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    Disruption Mechanism · {c.mech}
                  </div>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-navy md:text-3xl">
                    {c.who}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">
                    {c.body}
                  </p>

                  {/* corner accent */}
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10 transition-all group-hover:bg-gold/20" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
