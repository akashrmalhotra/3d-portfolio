"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { macro } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

export default function MacroDisconnect() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashOffset = useTransform(scrollYProgress, [0.1, 0.7], [0, 200]);

  return (
    <section
      ref={ref}
      id="macro"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{macro.eyebrow}</div>
        </Reveal>

        <h2 className="mb-20 font-serif text-4xl leading-tight text-navy md:text-6xl">
          <MaskText text="The Macro Disconnect" />
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 pattern-dots-gold opacity-90" />
            <div className="absolute inset-0 pattern-weave opacity-70" />
            <div className="relative flex h-full items-center justify-center p-12 md:p-16">
              <div className="rounded-xl border border-navy/15 bg-cream/95 p-8 shadow-[0_30px_80px_-30px_rgba(10,31,61,0.30)]">
                <div className="font-serif text-5xl font-bold text-navy md:text-6xl">
                  <StitchedNumber text={macro.left.big} />
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-navy/70">
                  {macro.left.label}
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink">
                  {macro.left.points.map((p, i) => (
                    <StitchListItem key={i} index={i}>
                      {p}
                    </StitchListItem>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="relative hidden w-px md:block">
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 6 600"
            >
              <line x1="3" y1="0" x2="3" y2="600" stroke="#0A1F3D" strokeOpacity="0.18" strokeWidth="1" />
              <motion.line
                x1="3"
                y1="0"
                x2="3"
                y2="600"
                stroke="#C9A961"
                strokeWidth="1.6"
                strokeDasharray="10 6"
                style={{ strokeDashoffset: dashOffset }}
              />
              <motion.path
                d="M3 600 q 6 8 -8 16"
                stroke="#C9A961"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center px-2 md:px-12"
          >
            <div className="font-serif text-5xl font-bold leading-tight text-navy md:text-6xl">
              <StitchedNumber text={macro.right.big} />
            </div>
            <ul className="mt-10 space-y-6 text-lg leading-relaxed text-ink md:text-xl">
              {macro.right.points.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.4 + i * 0.18, duration: 0.7 }}
                  className="border-l-2 border-cyan/60 pl-4"
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

function StitchListItem({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ delay: 0.5 + index * 0.18, duration: 0.7 }}
      className="flex gap-3"
    >
      <span className="mt-2 h-2 w-6 flex-shrink-0 pattern-stitch-h" />
      <span>{children}</span>
    </motion.li>
  );
}

function StitchedNumber({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      {text}
      <motion.span
        className="absolute -bottom-1 left-0 h-[3px] gold-thread"
        initial={{ width: 0 }}
        whileInView={{ width: "85%" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
