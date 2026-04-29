"use client";

import { motion } from "framer-motion";
import { macro } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function MacroDisconnect() {
  return (
    <section
      id="macro"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {macro.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-20 font-serif text-4xl leading-tight text-navy md:text-6xl">
          <MaskText text="The Macro Disconnect" />
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          {/* Left — dot pattern with stat block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 pattern-dots-gold" />
            <div className="relative flex h-full items-center justify-center p-12 md:p-16">
              <div className="rounded-xl border border-navy/10 bg-cream/95 p-8 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.25)]">
                <div className="font-serif text-5xl font-bold text-navy md:text-6xl">
                  {macro.left.big}
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-navy/70">
                  {macro.left.label}
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink">
                  {macro.left.points.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50% 0%" }}
            className="hidden w-px bg-navy/30 md:block"
          />

          {/* Right — clean, stark */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center px-2 md:px-12"
          >
            <div className="font-serif text-5xl font-bold leading-tight text-navy md:text-6xl">
              {macro.right.big}
            </div>
            <ul className="mt-10 space-y-6 text-lg leading-relaxed text-ink md:text-xl">
              {macro.right.points.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
