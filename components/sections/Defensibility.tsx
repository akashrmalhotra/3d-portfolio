"use client";

import { motion } from "framer-motion";
import { defensibility } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function Defensibility() {
  return (
    <section
      id="defensibility"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {defensibility.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Defensibility: Operational Lock-In." />
        </h2>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          {/* Funnel SVG */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <svg viewBox="0 0 400 480" className="h-auto w-full">
              {/* Funnel layers — top wide, bottom narrow */}
              {[0, 1, 2, 3].map((i) => {
                const yTop = 30 + i * 100;
                const yBot = 130 + i * 100;
                const wTop = 360 - i * 60;
                const wBot = 300 - i * 60;
                return (
                  <motion.path
                    key={i}
                    d={`M${(400 - wTop) / 2} ${yTop} L${(400 - wTop) / 2 + wTop} ${yTop} L${(400 - wBot) / 2 + wBot} ${yBot} L${(400 - wBot) / 2} ${yBot} Z`}
                    fill={i === 0 ? "rgba(168,230,240,0.28)" : i === 1 ? "rgba(201,169,97,0.22)" : i === 2 ? "rgba(10,31,61,0.10)" : "rgba(10,31,61,0.55)"}
                    stroke="#0A1F3D"
                    strokeWidth="1.2"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ delay: i * 0.18, duration: 0.7 }}
                  />
                );
              })}
              {/* Person at the bottom */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 1, duration: 0.7 }}
                style={{ transformOrigin: "200px 460px" }}
              >
                <circle cx="200" cy="448" r="8" fill="#C9A961" />
                <path d="M188 478c2-12 22-12 24 0" stroke="#C9A961" strokeWidth="3" fill="none" strokeLinecap="round" />
              </motion.g>

              {/* Side labels */}
              <text x="20" y="35" fontSize="11" fill="#0A1F3D" opacity="0.7">Day 1</text>
              <text x="20" y="445" fontSize="11" fill="#C9A961">Year 3+</text>
            </svg>
          </div>

          {/* Layers description */}
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-xl border border-navy/15 bg-cyan-light/30 p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-deep">
                  The Rim
                </div>
                <div className="mt-2 text-sm leading-relaxed text-ink md:text-base">
                  {defensibility.rim}
                </div>
              </div>
            </Reveal>

            {defensibility.layers.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                className="rounded-xl border border-navy/15 bg-cream/90 p-5 transition-all hover:border-gold"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-warm">
                  {l.label}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-ink md:text-base">
                  {l.body}
                </div>
              </motion.div>
            ))}

            <Reveal delay={0.6}>
              <div className="rounded-xl bg-navy p-6 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.55)]">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  The Core Moat
                </div>
                <p className="mt-3 font-serif text-base italic leading-relaxed text-cream md:text-lg">
                  {defensibility.moat}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
