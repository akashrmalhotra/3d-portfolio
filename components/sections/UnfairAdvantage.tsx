"use client";

import { motion } from "framer-motion";
import { advantage } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Unfair Advantage — comparison table.
 * Left (challenge): distressed fabric with sepia overlay.
 * Right (asset): premium cream with gold-thread connector.
 * A pulsing gold thread visually connects each asset to center.
 */
export default function UnfairAdvantage() {
  return (
    <section
      id="advantage"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      {/* Two-tone fabric split */}
      <div className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(230,215,185,0.28) 0%, rgba(230,215,185,0.28) 50%, transparent 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{advantage.eyebrow}</div>
        </Reveal>
        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Unfair Advantage — The Capital Cost of Catching Up." />
        </h2>

        <div className="grid grid-cols-1 gap-5 md:gap-6">
          {/* Header */}
          <div className="hidden grid-cols-2 gap-6 md:grid">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-ink/70">
              <span className="text-lg">⚠</span> The Startup Challenge
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-warm">
              <span>◆</span> Raymond's Asset
            </div>
          </div>

          {advantage.rows.map((r, i) => (
            <ComparisonRow key={r.challenge} row={r} index={i} />
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 rounded-2xl bg-navy p-8 text-center shadow-[0_30px_80px_-30px_rgba(10,31,61,0.55)] ring-1 ring-gold/20">
            <div className="eyebrow mb-3 text-gold">Synthesis Callout</div>
            <p className="font-serif text-lg italic leading-relaxed text-cream md:text-2xl">
              &ldquo;{advantage.synthesis}&rdquo;
            </p>
            {/* decorative gold thread border */}
            <motion.div
              className="mx-auto mt-6 h-px gold-thread"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonRow({ row, index }: { row: typeof advantage.rows[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0"
    >
      {/* Challenge — distressed / sepia */}
      <motion.div
        initial={{ x: -24 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        className="relative rounded-l-xl border border-r-0 border-ink/20 bg-cream-warm/70 p-5 md:rounded-r-none"
        style={{ filter: "sepia(0.18)" }}
      >
        <div className="eyebrow mb-2 text-ink/60">
          ⚠ {row.challenge}
        </div>
        <p className="text-sm leading-relaxed text-ink md:text-base">{row.challengeBody}</p>
      </motion.div>

      {/* Gold thread connector */}
      <div className="pointer-events-none absolute hidden h-full md:flex md:items-center" style={{ left: "50%", transform: "translateX(-50%)" }}>
        <motion.div
          className="h-px w-8 gold-thread"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        />
      </div>

      {/* Asset — premium with gold threading */}
      <motion.div
        initial={{ x: 24 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: index * 0.1 + 0.1, duration: 0.8 }}
        className="relative rounded-r-xl border border-l-0 border-gold/35 bg-cream/90 p-5 md:rounded-l-none"
      >
        {/* gold thread top-left accent */}
        <span className="absolute left-3 top-3 h-3 w-3 rotate-45 bg-gold opacity-60" />
        <div className="eyebrow mb-2 text-gold-warm">
          ◆ {row.asset}
        </div>
        <p className="text-sm leading-relaxed text-ink md:text-base">{row.assetBody}</p>
      </motion.div>
    </motion.div>
  );
}
