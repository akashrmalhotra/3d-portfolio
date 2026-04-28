"use client";

import { motion } from "framer-motion";
import { synthesis } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Synthesis() {
  return (
    <section id="synthesis" className="relative bg-offwhite py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={10}>The Synthesis</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-4xl font-serif text-3xl text-navy md:text-5xl"
        >
          {synthesis.title}
        </motion.h2>

        {/* Puzzle */}
        <div className="relative mt-16 flex items-center justify-center">
          <svg viewBox="0 0 700 240" className="h-auto w-full max-w-3xl">
            {/* Agriculture piece (left, green) */}
            <motion.g
              initial={{ x: -200, opacity: 0, rotate: -8 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M 40 40 H 280 V 100 a 30 30 0 0 1 0 40 V 200 H 40 Z"
                fill="#3A5A2B"
                stroke="#1A1A1A"
                strokeWidth="1.2"
                opacity="0.92"
              />
              <text x="160" y="130" textAnchor="middle" className="fill-cream font-serif" style={{ fontSize: 26, fontWeight: 600 }}>
                Agriculture
              </text>
            </motion.g>

            {/* Finance piece (right, navy) */}
            <motion.g
              initial={{ x: 200, opacity: 0, rotate: 8 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M 420 40 V 100 a 30 30 0 0 0 0 40 V 200 H 660 V 40 Z"
                fill="#0F1E3D"
                stroke="#1A1A1A"
                strokeWidth="1.2"
                opacity="0.95"
              />
              <text x="540" y="130" textAnchor="middle" className="fill-cream font-serif" style={{ fontSize: 26, fontWeight: 600 }}>
                Finance
              </text>
            </motion.g>

            {/* Center diamond glow */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <rect
                x="330"
                y="80"
                width="80"
                height="80"
                rx="6"
                fill="#E8F2F7"
                transform="rotate(45 370 120)"
                stroke="#0F1E3D"
                strokeWidth="1.3"
              />
              <text
                x="370"
                y="115"
                textAnchor="middle"
                className="fill-navy font-sans"
                style={{ fontSize: 11, fontWeight: 700 }}
              >
                SATYUKT&rsquo;S
              </text>
              <text
                x="370"
                y="130"
                textAnchor="middle"
                className="fill-navy font-sans"
                style={{ fontSize: 11, fontWeight: 700 }}
              >
                MOAT
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Statement analysis */}
        <div className="mt-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy/55">
            Statement analysis
          </div>
          <p className="mt-1 font-serif text-xl text-navy md:text-2xl">
            &ldquo;{synthesis.statement}&rdquo;
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-xl border border-deepGreen/30 bg-deepGreen/5 p-6"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-deepGreen">
                Why it&rsquo;s half right
              </div>
              <ul className="mt-3 space-y-2 text-navy/85">
                {synthesis.halfRight.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-deepGreen">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-xl border border-navy/15 bg-navy/[0.04] p-6"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
                Why it&rsquo;s half wrong
              </div>
              <ul className="mt-3 space-y-2 text-navy/85">
                {synthesis.halfWrong.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-navy">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 rounded-xl bg-navy px-8 py-6 font-serif text-xl text-cream md:text-2xl"
        >
          <span className="text-cream/55">Core insight: </span>
          {synthesis.insight}
        </motion.div>
      </div>
    </section>
  );
}
