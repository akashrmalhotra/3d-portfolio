"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { modelGovernance } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const BlackBox3D = dynamic(() => import("@/components/3d/BlackBox3D"), { ssr: false });

export default function ModelGovernance() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="governance" className="relative bg-cream pattern-iso-faint py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={12}>The Real Risk</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {modelGovernance.title}
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy/55">
              The Black Box
            </div>
            <p className="mt-3 font-serif text-2xl leading-snug text-navy md:text-3xl">
              {modelGovernance.blackBox}
            </p>
          </motion.div>

          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <BlackBox3D />
          </motion.div>

          {/* Right questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy/55">
              The Unanswered Questions
            </div>
            <ul className="mt-4 space-y-3">
              {modelGovernance.questions.map((q, i) => (
                <li key={q}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-start gap-3 rounded-lg border border-navy/15 bg-offwhite/80 p-4 text-left transition hover:border-navy hover:bg-cream-warm"
                  >
                    <span className="font-serif text-xl text-deepGreen">?</span>
                    <span className="text-navy">{q}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-xl bg-navy px-8 py-6 font-serif text-xl text-cream md:text-2xl"
        >
          <span className="text-cream/55">Key insight: </span>
          {modelGovernance.insight}
        </motion.div>
      </div>
    </section>
  );
}
