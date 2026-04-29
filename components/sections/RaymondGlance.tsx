"use client";

import { motion } from "framer-motion";
import { glance } from "@/lib/content";
import { Reveal } from "@/components/ui/Scroll";
import { MaskText } from "@/components/ui/Cinematic";

export default function RaymondGlance() {
  return (
    <section
      id="glance"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {glance.eyebrow}
          </div>
        </Reveal>

        <h2 className="font-serif text-4xl leading-tight text-navy md:text-6xl">
          <MaskText text={glance.title} />
        </h2>

        {/* Timeline with circles */}
        <div className="relative mt-28">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute left-0 right-0 top-[58px] h-[3px] gold-thread"
          />

          <div className="relative grid grid-cols-2 gap-y-16 md:grid-cols-4 md:gap-y-0">
            {glance.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  delay: 0.4 + i * 0.18,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative mb-8"
                >
                  <div className="relative h-[120px] w-[120px] rounded-full border-[6px] border-navy bg-cream">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-gold/0"
                      whileHover={{ borderColor: "rgba(201,169,97,0.8)" }}
                    />
                  </div>
                </motion.div>

                <div className="font-serif text-3xl font-bold text-navy md:text-4xl">
                  {m.value}
                </div>
                <div className="mt-3 max-w-[200px] text-sm leading-snug text-ink">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-24 max-w-3xl rounded-xl border border-navy bg-cream/70 p-6 md:p-8">
            <p className="font-serif text-lg italic leading-relaxed text-navy md:text-xl">
              {glance.footer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
