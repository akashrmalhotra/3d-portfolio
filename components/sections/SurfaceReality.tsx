"use client";

import { motion } from "framer-motion";
import { surfaceReality } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCounter from "@/components/ui/StatCounter";

const tones = [
  "from-sage/20 to-cream",
  "from-skyblue to-cream",
  "from-sand/40 to-cream",
  "from-deepGreen/15 to-cream",
];

export default function SurfaceReality() {
  return (
    <section id="surface" className="relative bg-cream py-32 md:py-40">
      <div className="absolute right-0 top-0 -z-10 h-1/2 w-2/3 opacity-50">
        <div className="h-full w-full bg-gradient-to-bl from-sage/30 via-cream to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={3}>The Surface Reality</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {surfaceReality.title}
        </motion.h2>
        <p className="mt-4 max-w-2xl text-lg text-navy/65">{surfaceReality.subtitle}</p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {surfaceReality.products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, rotateY: 3 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br p-7 ring-1 ring-navy/5 ${tones[i]}`}
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-navy/55">
                  {String(i + 1).padStart(2, "0")} · {p.audience}
                </div>
                <h3 className="mt-3 font-serif text-2xl text-navy">{p.name}</h3>
                <p className="mt-2 text-navy/70">{p.does}</p>
              </div>
              <div className="mt-10 h-px w-12 bg-navy/30" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 rounded-2xl bg-navy px-8 py-8 text-cream md:grid-cols-3 md:gap-12 md:px-12"
        >
          {surfaceReality.stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl text-cream md:text-5xl">
                <StatCounter value={s.value} />
              </div>
              <div className="mt-1 text-sm text-cream/70">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
