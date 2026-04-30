"use client";

import { motion } from "framer-motion";
import { defensibility } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Defensibility — 3-D woven funnel that narrows.
 * A silhouette icon travels downward and gets "caught" in the weave.
 * Thread strands animate from loose → tight as you scroll.
 */
export default function Defensibility() {
  return (
    <section
      id="defensibility"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      {/* gradient fabric */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(245,241,232,0) 0%, rgba(10,31,61,0.06) 100%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{defensibility.eyebrow}</div>
        </Reveal>
        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Defensibility — Operational Lock-In." />
        </h2>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          {/* Woven funnel SVG */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <svg viewBox="0 0 400 520" className="h-auto w-full overflow-visible">
              {/* Funnel layer trapezoids */}
              {[0, 1, 2, 3].map((i) => {
                const yTop = 20 + i * 112;
                const yBot = 120 + i * 112;
                const wTop = 360 - i * 60;
                const wBot = 300 - i * 60;
                const xT = (400 - wTop) / 2;
                const xB = (400 - wBot) / 2;
                return (
                  <g key={i}>
                    <motion.path
                      d={`M${xT} ${yTop} L${xT + wTop} ${yTop} L${xB + wBot} ${yBot} L${xB} ${yBot} Z`}
                      fill={i === 3 ? "rgba(10,31,61,0.50)" : i === 2 ? "rgba(10,31,61,0.12)" : i === 1 ? "rgba(201,169,97,0.18)" : "rgba(168,230,240,0.22)"}
                      stroke="#0A1F3D"
                      strokeWidth="1"
                      initial={{ opacity: 0, y: -16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: i * 0.16, duration: 0.8 }}
                    />
                    {/* horizontal weave threads */}
                    {Array.from({ length: 5 }).map((_, j) => {
                      const fy = yTop + ((yBot - yTop) * (j + 1)) / 6;
                      const fxL = xT + (j / 5) * (xB - xT + (j / 5) * 10);
                      const fxR = xT + wTop - (j / 5) * (xT + wTop - (xB + wBot) + (j / 5) * 10);
                      return (
                        <motion.line
                          key={j}
                          x1={fxL}
                          y1={fy}
                          x2={fxR}
                          y2={fy}
                          stroke="#C9A961"
                          strokeWidth="0.5"
                          strokeOpacity="0.55"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-15%" }}
                          transition={{ delay: i * 0.16 + j * 0.06, duration: 0.7 }}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Traveling person icon */}
              <motion.g
                initial={{ y: 0, opacity: 0 }}
                whileInView={{ y: 360, opacity: [0, 1, 1, 0.7] }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 2.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <circle cx="200" cy="30" r="9" fill="#C9A961" />
                <path d="M188 56c2-14 24-14 24 0" stroke="#C9A961" strokeWidth="3" fill="none" strokeLinecap="round" />
              </motion.g>

              {/* "caught" at bottom — threads wrap icon */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 2.6, duration: 0.7 }}
                style={{ transformOrigin: "200px 480px" }}
              >
                <circle cx="200" cy="480" r="10" fill="#C9A961" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  return (
                    <motion.line
                      key={i}
                      x1="200"
                      y1="480"
                      x2={200 + Math.cos(a) * 22}
                      y2={480 + Math.sin(a) * 14}
                      stroke="#C9A961"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: 2.8 + i * 0.06, duration: 0.5 }}
                    />
                  );
                })}
                <text x="200" y="510" textAnchor="middle" fontSize="10" fill="#0A1F3D" opacity="0.7" fontFamily="serif">
                  Locked in
                </text>
              </motion.g>

              {/* Year labels */}
              <text x="10" y="30" fontSize="11" fill="#0A1F3D" opacity="0.6" fontFamily="sans-serif">Day 1</text>
              <text x="10" y="460" fontSize="11" fill="#C9A961" fontFamily="sans-serif">Year 3+</text>
            </svg>
          </div>

          {/* Layers */}
          <div className="space-y-4">
            <Reveal>
              <div className="rounded-xl border border-cyan/30 bg-cyan-light/20 p-5">
                <div className="eyebrow mb-2 text-cyan-deep">The Rim</div>
                <div className="text-sm leading-relaxed text-ink md:text-base">{defensibility.rim}</div>
              </div>
            </Reveal>

            {defensibility.layers.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                whileHover={{ x: 4 }}
                className="group rounded-xl border border-navy/15 bg-cream/90 p-5 transition-all hover:border-gold"
              >
                <div className="eyebrow mb-2 text-gold-warm">{l.label}</div>
                <div className="text-sm leading-relaxed text-ink md:text-base">{l.body}</div>
              </motion.div>
            ))}

            <Reveal delay={0.6}>
              <div className="rounded-xl bg-navy p-6 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.55)]">
                <div className="eyebrow mb-3 text-gold">The Core Moat</div>
                <p className="font-serif text-base italic leading-relaxed text-cream md:text-lg">
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
