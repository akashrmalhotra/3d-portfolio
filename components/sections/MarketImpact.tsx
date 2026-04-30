"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { impact } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal, TiltCard } from "@/components/ui/Scroll";

const SECTOR_COLORS: Record<string, string> = {
  "Asymmetry of Timing":  "from-gold/20 to-gold/5",
  "Formalization Squeeze":"from-navy/12 to-navy/4",
  "Consolidation":        "from-cyan/20 to-cyan/5",
  "Capability Gap":       "from-gold-soft/30 to-gold-soft/5",
};
const SECTOR_ACCENT: Record<string, string> = {
  "Asymmetry of Timing":  "#C9A961",
  "Formalization Squeeze":"#0A1F3D",
  "Consolidation":        "#2DD4E0",
  "Capability Gap":       "#E2CE9C",
};

export default function MarketImpact() {
  return (
    <section
      id="impact"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{impact.eyebrow}</div>
        </Reveal>
        <h2 className="mb-16 font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The Market Impact — Who Gets Disrupted, and How." />
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {impact.cells.map((c, i) => (
            <ImpactCard key={c.who} cell={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCard({ cell, index }: { cell: typeof impact.cells[0]; index: number }) {
  const [shaking, setShaking] = useState(false);
  const accent = SECTOR_ACCENT[cell.mech] ?? "#C9A961";
  const gradient = SECTOR_COLORS[cell.mech] ?? "from-navy/10 to-transparent";

  const shake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={shake}
    >
      <TiltCard className="h-full" intensity={6}>
        <motion.div
          animate={shaking ? { x: [-3, 3, -2, 2, 0] } : {}}
          transition={{ duration: 0.45 }}
          data-cursor="expand"
          className={`group relative h-full overflow-hidden rounded-2xl border border-navy/15 bg-gradient-to-br ${gradient} bg-cream/95 p-7 shadow-[0_20px_60px_-30px_rgba(10,31,61,0.35)] transition-all hover:shadow-[0_30px_80px_-20px_rgba(10,31,61,0.5)]`}
        >
          {/* fabric-tear corner hover effect */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 origin-top-right opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              background: accent,
            }}
          />
          {/* diagonal stitch pattern on hover */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pattern-denim"
          />

          <div className="relative">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ background: `${accent}22`, color: accent }}
            >
              {cell.mech}
            </div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-navy md:text-3xl">
              {cell.who}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">{cell.body}</p>

            {/* impact bar */}
            <motion.div
              className="mt-6 h-1 w-0 rounded-full"
              style={{ background: accent }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
