"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { algorithmicInclusion } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AlgorithmicInclusion() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wipe = useTransform(scrollYProgress, [0.25, 0.7], ["0%", "100%"]);

  return (
    <section id="inclusion" className="relative bg-cream py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={11}>Algorithmic Inclusion</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {algorithmicInclusion.title}
        </motion.h2>

        <div ref={ref} className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* BEFORE */}
          <div className="pattern-topo relative overflow-hidden rounded-2xl p-8 ring-1 ring-brown-dark/20">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brown-dark">
              {algorithmicInclusion.before.label}
            </div>
            <div className="mt-12 flex items-center justify-between">
              <div className="rounded-md bg-brown px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream">
                Farmer
              </div>
              <BrickWall />
              <div className="rounded-md bg-olive px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream">
                Bank
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center">
              <BarbedArrow />
              <div className="mt-3 rounded-md bg-terracotta px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream">
                Moneylender · {algorithmicInclusion.before.rate}
              </div>
            </div>
            <p className="mt-8 text-sm text-navy/75">{algorithmicInclusion.before.body}</p>
          </div>

          {/* AFTER */}
          <div className="pattern-iso relative overflow-hidden rounded-2xl p-8 ring-1 ring-navy/15">
            <motion.div
              style={{ width: wipe }}
              className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-cream-warm/40 mix-blend-multiply"
            />
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy">
              {algorithmicInclusion.after.label}
            </div>
            <div className="mt-12 flex items-center justify-between gap-4">
              <div className="rounded-md bg-navy px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream">
                Farmer
              </div>
              <AlgorithmBridge />
              <div className="rounded-md bg-deepGreen px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream">
                Bank / Insurer
              </div>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-deepGreen/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-deepGreen">
              Lower rates · formal inclusion · growth
            </div>
            <p className="mt-6 text-sm text-navy/75">{algorithmicInclusion.after.body}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 rounded-xl bg-navy px-8 py-6 font-serif text-xl text-cream md:text-2xl"
        >
          <span className="text-cream/55">Takeaway: </span>
          {algorithmicInclusion.takeaway}
        </motion.div>
      </div>
    </section>
  );
}

function BrickWall() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" className="text-brown-dark">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: r % 2 ? 4 : 5 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={r % 2 ? 12 + c * 24 : c * 24}
            y={r * 18}
            width="22"
            height="16"
            fill="#6B4E3D"
            stroke="#4A3426"
            strokeWidth="1"
          />
        ))
      )}
      <text
        x="60"
        y="48"
        textAnchor="middle"
        className="fill-cream font-sans"
        style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1 }}
      >
        EXCLUSION
      </text>
    </svg>
  );
}

function BarbedArrow() {
  return (
    <svg width="240" height="40" viewBox="0 0 240 40">
      <path
        d="M 10 20 L 220 20"
        stroke="#B85042"
        strokeWidth="2.4"
        strokeDasharray="4 4"
      />
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 12}
          y1={14}
          x2={26 + i * 12}
          y2={26}
          stroke="#B85042"
          strokeWidth="1.4"
        />
      ))}
      <polyline
        points="212,14 226,20 212,26"
        fill="none"
        stroke="#B85042"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlgorithmBridge() {
  return (
    <svg width="240" height="60" viewBox="0 0 240 60">
      <defs>
        <linearGradient id="bridge" x1="0" x2="1">
          <stop offset="0%" stopColor="#0F1E3D" />
          <stop offset="100%" stopColor="#3A5A2B" />
        </linearGradient>
      </defs>
      <rect x="20" y="25" width="200" height="14" rx="3" fill="url(#bridge)" opacity="0.95" />
      <rect x="20" y="22" width="200" height="3" rx="1" fill="#C4DCE8" />
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} r="3" fill="#C4DCE8">
          <animateMotion
            dur="2.4s"
            begin={`${k * 0.6}s`}
            repeatCount="indefinite"
            path="M20,32 L220,32"
          />
        </circle>
      ))}
      <text
        x="120"
        y="16"
        textAnchor="middle"
        className="fill-navy font-sans"
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2 }}
      >
        ALGORITHM
      </text>
    </svg>
  );
}
