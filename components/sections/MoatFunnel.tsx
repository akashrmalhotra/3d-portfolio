"use client";

import { motion } from "framer-motion";
import { Database, Cpu, Leaf } from "lucide-react";
import { moatFunnel } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const icons = [Database, Cpu, Leaf];
const palette = ["bg-sage/30", "bg-sky2", "bg-navy"];
const text = ["text-deepGreen", "text-navy", "text-cream"];
const ring = ["ring-deepGreen/20", "ring-navy/30", "ring-navy/40"];

export default function MoatFunnel() {
  return (
    <section
      id="moat"
      className="relative overflow-hidden bg-cream pattern-iso-faint py-32 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={5}>The Technology</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {moatFunnel.title}
        </motion.h2>

        {/* Funnel: three 3D cylinders + animated flow particles */}
        <div className="relative mt-20 grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {moatFunnel.stages.map((s, i) => {
            const Icon = icons[i];
            const isMoat = !!s.moat;
            return (
              <>
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 60, rotateY: -25 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`relative ${i % 2 === 0 ? "" : ""}`}
                >
                  <div
                    className={`relative rounded-3xl ${palette[i]} p-6 ring-1 ${ring[i]} ${
                      isMoat ? "animate-pulse-slow" : ""
                    }`}
                    style={{
                      boxShadow: isMoat
                        ? "0 30px 60px -20px rgba(15,30,61,0.35), inset 0 0 0 2px rgba(15,30,61,0.15)"
                        : "0 16px 36px -18px rgba(15,30,61,0.25)",
                    }}
                  >
                    {isMoat && (
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="96"
                          height="96"
                          rx="10"
                          fill="none"
                          stroke="rgba(15,30,61,0.5)"
                          strokeWidth="0.6"
                          strokeDasharray="3 3"
                          className="animate-dash-slow"
                        />
                      </svg>
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-offwhite/90 ring-1 ring-navy/10">
                      <Icon className={`h-6 w-6 ${i === 2 ? "text-cream" : "text-navy"}`} strokeWidth={1.6} />
                    </div>
                    <div className={`mt-4 font-serif text-xl ${text[i]}`}>{s.label}</div>
                    <p className={`mt-2 text-sm ${i === 2 ? "text-cream/80" : "text-navy/70"}`}>
                      {s.body}
                    </p>
                  </div>
                  {isMoat && (
                    <div className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-navy/70">
                      Moat Funnel
                    </div>
                  )}
                </motion.div>

                {i < 2 && (
                  <div key={`arr-${i}`} className="relative hidden md:block">
                    <Arrow />
                  </div>
                )}
              </>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 rounded-xl bg-navy px-8 py-6 text-cream md:px-12"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/60">
            Key takeaway
          </div>
          <p className="mt-1 font-serif text-xl md:text-2xl">{moatFunnel.takeaway}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div className="relative h-px w-full">
      <svg viewBox="0 0 80 20" className="h-5 w-full overflow-visible">
        <line x1="0" y1="10" x2="70" y2="10" stroke="#0F1E3D" strokeWidth="1.4" />
        <polyline
          points="64,4 76,10 64,16"
          fill="none"
          stroke="#0F1E3D"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {[0, 1, 2].map((k) => (
          <circle key={k} r="1.6" fill="#3A5A2B">
            <animateMotion
              dur="2.4s"
              begin={`${k * 0.8}s`}
              repeatCount="indefinite"
              path="M0,10 L70,10"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
