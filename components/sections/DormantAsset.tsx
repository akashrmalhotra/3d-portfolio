"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { dormant } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function DormantAsset() {
  const nodes = useMemo(() => {
    // Deterministic pseudo-random nodes for the network.
    const arr: { x: number; y: number; r: number; d: number }[] = [];
    let seed = 17;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 36; i++) {
      arr.push({
        x: 8 + rnd() * 84,
        y: 12 + rnd() * 76,
        r: 1.5 + rnd() * 3,
        d: rnd() * 1.5,
      });
    }
    return arr;
  }, []);

  return (
    <section
      id="dormant"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
              {dormant.eyebrow}
            </div>
          </Reveal>

          <h2 className="font-serif text-4xl leading-tight text-navy md:text-5xl">
            <MaskText text={dormant.title} />
          </h2>

          <div className="mt-10 space-y-6">
            {dormant.points.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.7 }}
                className="text-base leading-relaxed text-ink md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div className="mt-10 inline-block rounded-xl bg-navy px-6 py-5 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.55)]">
              <p className="font-serif text-lg italic leading-relaxed text-gold md:text-xl">
                "{dormant.punch}"
              </p>
            </div>
          </Reveal>
        </div>

        {/* Network */}
        <div className="relative">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-navy/10 bg-cream/80">
            <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
              {/* Connections */}
              {nodes.flatMap((n, i) =>
                nodes
                  .slice(i + 1)
                  .filter((m, j) => {
                    const dx = n.x - m.x;
                    const dy = n.y - m.y;
                    return Math.sqrt(dx * dx + dy * dy) < 22 && (i + j) % 2 === 0;
                  })
                  .map((m, j) => (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={n.x}
                      y1={n.y}
                      x2={m.x}
                      y2={m.y}
                      stroke="#C9A961"
                      strokeWidth="0.18"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.7 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: 0.4 + (i + j) * 0.02, duration: 1.2 }}
                    />
                  ))
              )}
              {/* Nodes */}
              {nodes.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 0.6}
                  fill="#0A1F3D"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.3 + i * 0.025, duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Pulsating big stat overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 1.2, duration: 0.9 }}
                className="rounded-2xl bg-cream/90 px-6 py-4 text-center ring-1 ring-navy/10 backdrop-blur"
              >
                <div className="font-serif text-3xl font-bold text-navy md:text-4xl">
                  20,000 → 2,000,000
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-warm">
                  Tailors → Indirect Customers
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
