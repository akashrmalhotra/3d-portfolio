"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { glance } from "@/lib/content";
import { Reveal } from "@/components/ui/Scroll";
import { MaskText } from "@/components/ui/Cinematic";

/**
 * "The Illusion of Control" — pinstripe fabric, 4 metric circles on a golden
 * timeline. Each circle has a fabric-fill animation; numbers count up; callout
 * unfolds like paper.
 */
export default function RaymondGlance() {
  return (
    <section
      id="glance"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0 pattern-pinstripe-soft" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{glance.eyebrow}</div>
        </Reveal>

        <h2 className="font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text={glance.title} />
        </h2>

        {/* Timeline */}
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
              <Metric key={i} value={m.value} label={m.label} index={i} />
            ))}
          </div>
        </div>

        <Reveal delay={0.4}>
          <UnfoldCallout text={glance.footer} />
        </Reveal>
      </div>
    </section>
  );
}

function Metric({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ delay: 0.4 + index * 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <FabricCircle delay={0.5 + index * 0.18} />
      <div className="drift-slow mt-8 font-serif text-4xl font-bold text-navy md:text-5xl lg:text-6xl" style={{ animationDelay: `${index * 0.6}s` }}>
        <CountUp text={value} />
      </div>
      <div className="mt-3 max-w-[220px] text-base leading-snug text-ink md:text-lg">{label}</div>
    </motion.div>
  );
}

function FabricCircle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, rotate: 4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="relative h-[120px] w-[120px]"
    >
      {/* outer ring */}
      <div className="absolute inset-0 rounded-full border-[5px] border-navy bg-cream" />
      {/* fabric weave fill */}
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 100%)" }}
        whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[10px] rounded-full pattern-weave bg-cream-warm"
      />
      {/* gold ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full ring-2 ring-gold/0"
        whileHover={{ boxShadow: "0 0 0 4px rgba(201,169,97,0.35)" }}
      />
      {/* shimmer */}
      <motion.div
        className="absolute inset-[10px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 90deg, rgba(255,255,255,0.4) 110deg, transparent 130deg 360deg)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/** Counts up numeric portions of a string (handles ~, %, +, units). */
function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const match = text.match(/(\D*)([\d,]+)(.*)$/);
  const raw = match ? match[2].replace(/,/g, "") : "";
  const target = match ? parseFloat(raw) : NaN;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => {
    const n = Math.round(v);
    return `${prefix}${n.toLocaleString("en-IN")}${suffix}`;
  });

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const c = animate(mv, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, target, mv]);

  if (Number.isNaN(target))
    return (
      <span ref={ref} className="inline-block">
        {text}
      </span>
    );

  return (
    <motion.span ref={ref} className="inline-block tabular-nums">
      {display}
    </motion.span>
  );
}

function UnfoldCallout({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ rotateX: -85, opacity: 0, y: 20 }}
      whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "50% 0%", transformPerspective: 1200 }}
      className="mt-24 max-w-3xl rounded-xl border border-navy/30 bg-cream/85 p-6 shadow-[0_30px_70px_-30px_rgba(10,31,61,0.35)] md:p-8"
    >
      <div className="absolute -top-2 left-6 right-6 h-px bg-gold/40" />
      <p className="font-serif text-xl italic leading-relaxed text-navy md:text-2xl lg:text-3xl">
        {text}
      </p>
    </motion.div>
  );
}
