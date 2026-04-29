"use client";

import { motion } from "framer-motion";
import { blindspot } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function BlindSpot() {
  const actors = blindspot.actors;
  const total = actors.length;

  return (
    <section
      id="blindspot"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {blindspot.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-12 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Blind Spot: The Five Actors Raymond Cannot See." />
        </h2>

        <div className="relative mx-auto aspect-square w-full max-w-[860px]">
          {/* Concentric rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full border border-dashed border-navy/30"
          />
          <div className="absolute inset-[12%] rounded-full border border-navy/30" />
          <div className="absolute inset-[26%] rounded-full bg-cream-warm/60 ring-1 ring-navy/10" />

          {/* Center — Raymond */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute inset-[-12%] rounded-full border border-gold/40"
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gold text-navy shadow-[0_30px_80px_-20px_rgba(201,169,97,0.6)]">
              <span className="font-serif text-2xl font-bold md:text-3xl">
                Raymond
              </span>
            </div>
          </motion.div>

          {/* Orbiting actors */}
          {actors.map((a, i) => {
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 42;
            return (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  delay: 0.7 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute w-[44%] -translate-x-1/2 -translate-y-1/2 sm:w-[36%] md:w-[28%]"
              >
                <div className="rounded-2xl border border-navy/20 bg-cream/95 p-4 shadow-[0_20px_50px_-20px_rgba(10,31,61,0.35)] backdrop-blur md:p-5">
                  <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-warm">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-gold/40" />
                  </div>
                  <div className="font-serif text-base font-bold leading-tight text-navy md:text-lg">
                    {a.name}
                  </div>
                  <div className="mt-2 text-xs leading-snug text-ink md:text-[13px]">
                    {a.body}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-navy p-6 text-center md:p-8">
            <p className="font-serif text-base italic leading-relaxed text-cream md:text-lg">
              {blindspot.footer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
