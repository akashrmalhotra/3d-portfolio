"use client";

import { motion } from "framer-motion";
import { advantage } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function UnfairAdvantage() {
  return (
    <section
      id="advantage"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {advantage.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Unfair Advantage: The Capital Cost of Catching Up." />
        </h2>

        <div className="grid grid-cols-1 gap-5 md:gap-6">
          {/* Header */}
          <div className="hidden grid-cols-2 gap-6 md:grid">
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-deep">
              The Startup Challenge
            </div>
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-gold-warm">
              Raymond's Asset
            </div>
          </div>

          {advantage.rows.map((r, i) => (
            <motion.div
              key={r.challenge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            >
              {/* Challenge */}
              <motion.div
                initial={{ x: -30 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative rounded-xl border border-cyan-deep/30 bg-cyan-light/20 p-5"
              >
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-deep">
                  <span className="inline-block">⚠</span> {r.challenge}
                </div>
                <p className="text-sm leading-relaxed text-ink md:text-base">
                  {r.challengeBody}
                </p>
              </motion.div>

              {/* Asset */}
              <motion.div
                initial={{ x: 30 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.8 }}
                className="relative rounded-xl border border-gold/40 bg-cream/90 p-5"
              >
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-warm">
                  <span className="inline-block">◆</span> {r.asset}
                </div>
                <p className="text-sm leading-relaxed text-ink md:text-base">
                  {r.assetBody}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 rounded-2xl bg-navy p-8 text-center shadow-[0_30px_80px_-30px_rgba(10,31,61,0.55)]">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Synthesis Callout
            </div>
            <p className="font-serif text-lg italic leading-relaxed text-cream md:text-2xl">
              "{advantage.synthesis}"
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
