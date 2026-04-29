"use client";

import { motion } from "framer-motion";
import { flaw } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function StructuralFlaw() {
  return (
    <section
      id="flaw"
      className="relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="absolute inset-0 pattern-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/55">
            {flaw.eyebrow}
          </div>
        </Reveal>

        <h2 className="font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Structural Flaw: The Pipeline That Breaks at the Point of Sale." />
        </h2>

        <div className="relative mt-24">
          {/* Pipeline rail */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute left-0 right-1/2 top-1/2 h-[6px] -translate-y-1/2 gold-thread"
          />

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {/* Pre — controlled */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {flaw.pre.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative aspect-square rounded-md border-[3px] border-navy bg-cream"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-[11px] font-semibold uppercase tracking-wide text-navy md:text-xs">
                    {p}
                  </div>
                  {/* rivet dots */}
                  {[
                    [3, 3],
                    [3, "calc(100% - 11px)"],
                    ["calc(100% - 11px)", 3],
                    ["calc(100% - 11px)", "calc(100% - 11px)"],
                  ].map(([t, l], k) => (
                    <span
                      key={k}
                      style={{ top: t as string, left: l as string }}
                      className="absolute h-2 w-2 rounded-full bg-navy"
                    />
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Break — fabric explosion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-32 w-full md:h-48 md:w-32"
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2;
                  const r = 60 + (i % 3) * 14;
                  return (
                    <motion.path
                      key={i}
                      d={`M100 100 L${100 + Math.cos(angle) * r} ${100 + Math.sin(angle) * r}`}
                      stroke={i % 2 === 0 ? "#0A1F3D" : "#C9A961"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ delay: 1.2 + i * 0.06, duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Post — invisible */}
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {flaw.post.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: 1.4 + i * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan/70 bg-cyan-light/20 text-cyan-deep">
                    <PostIcon kind={p} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-cyan-deep md:text-sm">
                    {p}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Captions */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            <Reveal delay={0.2}>
              <p className="border-l-2 border-navy pl-4 text-sm leading-relaxed text-ink md:text-base">
                <span className="font-semibold text-navy">
                  {flaw.preCaption}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="border-l-2 border-cyan pl-4 text-sm leading-relaxed text-ink md:text-base">
                <span className="font-semibold text-cyan-deep">
                  {flaw.postCaption}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostIcon({ kind }: { kind: string }) {
  if (kind === "Fit") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="6" r="2.4" />
        <path d="M9 11h6l-1 8h-4l-1-8z" />
      </svg>
    );
  }
  if (kind === "Occasion") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
        <path d="M12 13l1 2 2 .3-1.5 1.4.4 2.1L12 17.8l-1.9 1 .4-2.1L9 15.3l2-.3 1-2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 8h11l3 3v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
