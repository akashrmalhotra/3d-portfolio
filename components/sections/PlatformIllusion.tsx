"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { platformIllusion } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const positions = [
  { x: -1, y: -1 }, // top-left  (Farmers)
  { x: 1, y: -1 },  // top-right (Banks)
  { x: -1, y: 1 },  // bot-left  (Insurers)
  { x: 1, y: 1 },   // bot-right (Agri)
];

export default function PlatformIllusion() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="platform"
      className="relative overflow-hidden bg-skyblue pattern-iso py-32 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={6}>The Platform Illusion</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {platformIllusion.title}
        </motion.h2>
        <p className="mt-4 max-w-xl text-navy/65">
          A multi-product data business — but the loops back to Satyukt are weak. No flywheel.
        </p>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* SVG diagram */}
          <div className="relative aspect-square w-full max-w-2xl">
            <svg
              viewBox="-300 -300 600 600"
              className="absolute inset-0 h-full w-full"
            >
              {/* arrows from center to each spoke */}
              {positions.map((p, i) => {
                const x = p.x * 200;
                const y = p.y * 200;
                const dim = active !== null && active !== i;
                return (
                  <g key={`a-${i}`} opacity={dim ? 0.2 : 1}>
                    <line
                      x1={p.x * 60}
                      y1={p.y * 60}
                      x2={x - p.x * 70}
                      y2={y - p.y * 70}
                      stroke="#0F1E3D"
                      strokeWidth="1.6"
                    />
                    <line
                      x1={p.x * 60 + 6 * p.y}
                      y1={p.y * 60 - 6 * p.x}
                      x2={x - p.x * 70 + 6 * p.y}
                      y2={y - p.y * 70 - 6 * p.x}
                      stroke="#0F1E3D"
                      strokeWidth="1.6"
                    />
                    {/* dashed weak loop */}
                    <circle
                      cx={x}
                      cy={y}
                      r="60"
                      fill="none"
                      stroke="#B85042"
                      strokeWidth="1.6"
                      strokeDasharray="4 6"
                      className="animate-spin-slower"
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                    <text
                      x={x + p.x * 80}
                      y={y - p.y * 80}
                      textAnchor="middle"
                      className="fill-terracotta font-sans"
                      style={{ fontSize: 14, fontWeight: 700 }}
                    >
                      WEAK
                    </text>
                  </g>
                );
              })}

              {/* center node */}
              <g>
                <rect x="-65" y="-50" width="130" height="100" rx="10" fill="#C4DCE8" stroke="#0F1E3D" strokeWidth="1.4" />
                <text x="0" y="6" textAnchor="middle" className="fill-navy font-serif" style={{ fontSize: 24, fontWeight: 600 }}>
                  Satyukt
                </text>
              </g>

              {/* spoke nodes */}
              {platformIllusion.spokes.map((s, i) => {
                const p = positions[i];
                const x = p.x * 200;
                const y = p.y * 200;
                const dim = active !== null && active !== i;
                return (
                  <g
                    key={s.who}
                    opacity={dim ? 0.3 : 1}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(active === i ? null : i)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x={x - 70} y={y - 35} width="140" height="70" rx="8" fill="#FAFAF7" stroke="#0F1E3D" strokeWidth="1.4" />
                    <text x={x} y={y - 4} textAnchor="middle" className="fill-navy font-sans" style={{ fontSize: 13, fontWeight: 700 }}>
                      {s.who.replace(/\s\(.*\)/, "")}
                    </text>
                    <text x={x} y={y + 14} textAnchor="middle" className="fill-navy/70 font-sans" style={{ fontSize: 11 }}>
                      {s.who.match(/\((.*)\)/)?.[1]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* right side: insight + reasons */}
          <div>
            <div className="rounded-2xl bg-navy p-8 text-cream">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/60">
                The verdict
              </div>
              <p className="mt-2 font-serif text-xl md:text-2xl">{platformIllusion.verdict}</p>
            </div>

            <div className="mt-6 space-y-4">
              {platformIllusion.spokes.map((s, i) => (
                <motion.div
                  key={s.who}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`rounded-xl border bg-offwhite p-4 transition ${
                    active === i ? "border-navy ring-2 ring-navy/40" : "border-navy/10"
                  }`}
                >
                  <div className="text-sm font-semibold text-navy">{s.who}</div>
                  <div className="text-xs text-navy/55">{s.flow}</div>
                  <p className="mt-2 text-sm text-navy/75">{s.reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
