"use client";

import { motion } from "framer-motion";
import { catalyst } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal, TiltCard } from "@/components/ui/Scroll";

export default function Catalyst() {
  return (
    <section
      id="catalyst"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {catalyst.eyebrow}
          </div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Catalyst: The Technology That Changes Everything." />
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {catalyst.pillars.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full" intensity={6}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-navy p-8 text-cream shadow-[0_30px_80px_-30px_rgba(10,31,61,0.5)] transition-all hover:shadow-[0_30px_80px_-20px_rgba(45,212,224,0.35)]">
                  {/* Cyan accent */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/20 blur-3xl transition-all group-hover:bg-cyan/30" />

                  <div className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                    <span>{p.tag}</span>
                    <span className="h-px w-10 bg-gold/60" />
                  </div>

                  <h3 className="font-serif text-2xl leading-tight md:text-3xl">
                    {p.name}
                  </h3>

                  <ul className="mt-6 space-y-4 text-sm leading-relaxed text-cream/85">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <PillarIcon kind={p.tag} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarIcon({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className="absolute bottom-6 right-6 h-14 w-14 opacity-30 transition-opacity group-hover:opacity-60"
      fill="none"
      stroke="#2DD4E0"
      strokeWidth="1.4"
    >
      {kind === "01" && (
        <>
          <path d="M30 12h20l5 8v40l-5 8H30l-5-8V20l5-8z" />
          <circle cx="40" cy="40" r="6" />
          <path d="M40 28v-4M40 56v-4M28 40h-4M56 40h-4" />
        </>
      )}
      {kind === "02" && (
        <>
          <circle cx="40" cy="40" r="22" />
          <path d="M28 40c4 8 20 8 24 0" />
          <circle cx="32" cy="34" r="2" fill="#2DD4E0" />
          <circle cx="48" cy="34" r="2" fill="#2DD4E0" />
        </>
      )}
      {kind === "03" && (
        <>
          <path d="M14 60l12-16 10 8 14-22 16 10" />
          <circle cx="14" cy="60" r="2" fill="#2DD4E0" />
          <circle cx="66" cy="40" r="2" fill="#2DD4E0" />
        </>
      )}
    </svg>
  );
}
