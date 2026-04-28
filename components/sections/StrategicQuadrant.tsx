"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { strategicQuadrant } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const layout = ["tl", "tr", "bl", "br"] as const;

const cellStyles: Record<string, string> = {
  reject: "bg-cream-warm/80 text-navy/65 ring-1 ring-navy/10",
  priority1: "bg-navy text-cream ring-2 ring-navy",
  priority2: "bg-sky2 text-navy ring-1 ring-navy/30",
};

export default function StrategicQuadrant() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="quadrant" className="relative bg-offwhite py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
          {strategicQuadrant.eyebrow}
        </div>
        <SectionLabel index={13}>The Strategic Quadrant</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {strategicQuadrant.title}
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative">
            {/* Axis labels */}
            <div className="absolute -left-8 top-0 hidden h-full md:block">
              <div className="origin-top-left -rotate-90 whitespace-nowrap pl-2 text-[11px] font-bold uppercase tracking-[0.3em] text-navy/55">
                Non-Agri ↑ Agri-Finance
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-2">
              {layout.map((pos, i) => {
                const cell = strategicQuadrant.cells.find((c) => c.pos === pos)!;
                const isOpen = active === pos;
                return (
                  <motion.button
                    key={pos}
                    onClick={() => setActive(isOpen ? null : pos)}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                    whileHover={{ y: -4 }}
                    className={`group relative aspect-square cursor-pointer rounded-lg p-6 text-left transition ${cellStyles[cell.tone]}`}
                  >
                    <div className="absolute right-3 top-3">
                      {cell.tone === "reject" ? (
                        <X className="h-4 w-4 text-terracotta" strokeWidth={2.5} />
                      ) : (
                        <Check className="h-4 w-4 text-deepGreen" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-65">
                      {cell.x} · {cell.y}
                    </div>
                    <div className={`mt-3 font-serif text-xl md:text-2xl ${cell.tone === "priority1" ? "text-cream" : "text-navy"}`}>
                      {cell.label}
                    </div>
                    <p className={`mt-3 text-sm ${cell.tone === "priority1" ? "text-cream/85" : "text-navy/75"}`}>
                      {cell.body}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 px-1 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-navy/55">
              <span>India</span>
              <span>Global →</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-2xl bg-navy p-8 text-cream"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/55">
                  Selected
                </div>
                <div className="mt-2 font-serif text-3xl">
                  {strategicQuadrant.cells.find((c) => c.pos === active)!.label}
                </div>
                <p className="mt-4 text-cream/85">
                  {strategicQuadrant.cells.find((c) => c.pos === active)!.body}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-navy/10 bg-cream-warm/40 p-8"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy/55">
                  Click any quadrant
                </div>
                <p className="mt-2 font-serif text-2xl text-navy">
                  Two rejects, two priorities. Follow the moat, not the buyer.
                </p>
                <p className="mt-4 text-navy/65">
                  Priority 1 deepens the existing rail in India. Priority 2 exports it to analog markets where the institutional shape matches.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
