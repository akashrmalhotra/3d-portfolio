"use client";

import { motion } from "framer-motion";
import { closing } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function Closing() {
  return (
    <section
      id="closing"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid-on-navy" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-deep" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">
            {closing.eyebrow}
          </div>
        </Reveal>

        {/* Tape measure morphing into digital network */}
        <div className="relative my-12 h-32 w-full md:h-40">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="h-full w-full">
            {/* Tape (gold) — left half */}
            <motion.rect
              x="0"
              y="60"
              width="600"
              height="40"
              fill="#C9A961"
              initial={{ x: -600 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Tape ticks */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.line
                key={i}
                x1={20 + i * 19}
                y1="60"
                x2={20 + i * 19}
                y2={i % 5 === 0 ? "85" : "75"}
                stroke="#0A1F3D"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.4 + i * 0.02, duration: 0.4 }}
              />
            ))}

            {/* Digital wave/network — right half */}
            {Array.from({ length: 12 }).map((_, i) => {
              const x1 = 600 + i * 50;
              const y1 = 80 + Math.sin(i * 0.7) * 22;
              const x2 = 600 + (i + 1) * 50;
              const y2 = 80 + Math.sin((i + 1) * 0.7) * 22;
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#2DD4E0"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 1.0 + i * 0.06, duration: 0.6 }}
                />
              );
            })}
            {Array.from({ length: 13 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={600 + i * 50}
                cy={80 + Math.sin(i * 0.7) * 22}
                r="3"
                fill="#2DD4E0"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
              />
            ))}
          </svg>
        </div>

        <h2 className="font-serif text-4xl leading-tight text-cream md:text-6xl lg:text-7xl">
          <MaskText text={closing.title} />
        </h2>

        <Reveal delay={0.6}>
          <p className="mt-12 font-serif text-3xl italic text-gold md:text-5xl">
            "{closing.lead}"
          </p>
        </Reveal>

        <Reveal delay={0.9}>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-cream/85 md:text-lg">
            {closing.body}
          </p>
        </Reveal>

        <Reveal delay={1.2}>
          <div className="mt-16 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/60">
            <span className="h-px w-16 bg-gold/40" />
            <span>End of Memo</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
