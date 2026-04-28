"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { evolution } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const stepShades = [
  { bg: "bg-sky2/60", text: "text-navy" },
  { bg: "bg-sky2/80", text: "text-navy" },
  { bg: "bg-navy-light/90", text: "text-cream" },
  { bg: "bg-navy", text: "text-cream" },
];

export default function Evolution() {
  return (
    <section id="evolution" className="relative overflow-hidden bg-cream pattern-iso-faint py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={9}>The Evolution</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {evolution.title}
        </motion.h2>

        <div className="relative mt-20">
          {/* Y-axis label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute -left-4 top-0 hidden md:block"
          >
            <div className="origin-top-left -rotate-90 text-[11px] font-bold uppercase tracking-[0.3em] text-navy/55">
              ↑ {evolution.yAxis}
            </div>
          </motion.div>

          {/* Stairs */}
          <div className="ml-0 flex items-end gap-4 md:ml-20 md:gap-6">
            {evolution.steps.map((s, i) => {
              const isNext = s.year === "Next";
              const shade = stepShades[i];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 100, scaleY: 0.4 }}
                  whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    delay: i * 0.18,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: "bottom",
                    height: `${140 + i * 50}px`,
                    perspective: 1000,
                  }}
                  className={`relative flex-1 rounded-t-lg ${shade.bg} ring-1 ring-navy/10 transition`}
                >
                  <motion.div
                    whileHover={{ rotateX: -8, y: -4 }}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "bottom" }}
                    className={`flex h-full flex-col justify-end p-4 ${shade.text}`}
                  >
                    {isNext && (
                      <div className="absolute -top-3 right-3 flex items-center gap-1 rounded-full bg-deepGreen px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cream">
                        <ArrowUpRight className="h-3 w-3" /> Next
                      </div>
                    )}
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70">
                      {s.year}
                    </div>
                    <div className="font-serif text-lg leading-tight md:text-xl">
                      {s.label}
                    </div>
                    <p className="mt-2 hidden text-xs opacity-80 md:block">{s.body}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* mobile descriptions */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
            {evolution.steps.map((s) => (
              <div key={s.label} className="text-xs text-navy/70">
                <div className="font-semibold text-navy">{s.year} · {s.label}</div>
                <div>{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 italic text-navy/75">{evolution.footer}</p>
      </div>
    </section>
  );
}
