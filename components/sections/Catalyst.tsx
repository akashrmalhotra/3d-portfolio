"use client";

import { motion } from "framer-motion";
import { catalyst } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal, TiltCard } from "@/components/ui/Scroll";

export default function Catalyst() {
  return (
    <section
      id="catalyst"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0 pattern-grid-fine opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{catalyst.eyebrow}</div>
        </Reveal>

        <h2 className="mb-16 font-serif text-4xl leading-tight text-navy md:text-5xl">
          <MaskText text="The Catalyst — The Technology That Changes Everything." />
        </h2>

        <div
          className="relative grid grid-cols-1 gap-8 md:grid-cols-3"
          style={{ perspective: 1800 }}
        >
          <FiberConnections />

          {catalyst.pillars.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 40, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: 0.2 + i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard className="h-full" intensity={8}>
                <div
                  data-cursor="expand"
                  className="group relative h-full overflow-hidden rounded-2xl bg-navy p-8 text-cream shadow-[0_40px_100px_-30px_rgba(10,31,61,0.6)] transition-all hover:shadow-[0_30px_80px_-15px_rgba(45,212,224,0.45)]"
                >
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 35%, rgba(45,212,224,0.18) 50%, transparent 65%)",
                    }}
                    animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/20 blur-3xl transition-all group-hover:bg-cyan/30" />

                  <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                    <span>{p.tag}</span>
                    <span className="h-px w-10 bg-gold/60" />
                  </div>

                  <h3 className="font-serif text-2xl leading-tight md:text-3xl">{p.name}</h3>

                  <div className="my-6 h-32 w-full rounded-lg border border-cyan/15 bg-navy-deep/40 p-3">
                    {p.tag === "01" && <PhoneScan />}
                    {p.tag === "02" && <NeuralNet />}
                    {p.tag === "03" && <DemandWave />}
                  </div>

                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-cream/85">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneScan() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <rect x="60" y="10" width="80" height="80" rx="6" fill="none" stroke="#2DD4E0" strokeWidth="1.4" />
      <motion.path
        d="M100 28 c -8 0 -8 12 0 12 c 8 0 8 -12 0 -12 z M88 50 h24 l-2 30 h-20 z"
        fill="#2DD4E0"
        fillOpacity="0.18"
        stroke="#2DD4E0"
        strokeWidth="0.8"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.line
        x1="64"
        y1="20"
        x2="136"
        y2="20"
        stroke="#2DD4E0"
        strokeWidth="0.8"
        animate={{ y1: [20, 78, 20], y2: [20, 78, 20] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {[30, 50, 70].map((y, i) => (
        <line key={i} x1="50" y1={y} x2="58" y2={y} stroke="#C9A961" strokeWidth="0.8" />
      ))}
      {[30, 50, 70].map((y, i) => (
        <line key={`r-${i}`} x1="142" y1={y} x2="150" y2={y} stroke="#C9A961" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

function NeuralNet() {
  const layers = [
    [25, 50, 75],
    [20, 40, 60, 80],
    [25, 50, 75],
    [50],
  ];
  const xs = [30, 80, 130, 175];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {layers.map((layer, i) =>
        layer.map((y, j) => (
          <g key={`${i}-${j}`}>
            {i < layers.length - 1 &&
              layers[i + 1].map((y2, k) => (
                <motion.line
                  key={k}
                  x1={xs[i]}
                  y1={y}
                  x2={xs[i + 1]}
                  y2={y2}
                  stroke="#2DD4E0"
                  strokeOpacity="0.45"
                  strokeWidth="0.6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 + j * 0.05 }}
                />
              ))}
            <circle cx={xs[i]} cy={y} r="3" fill="#0A1F3D" stroke="#2DD4E0" strokeWidth="1" />
          </g>
        ))
      )}
    </svg>
  );
}

function DemandWave() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <motion.path
        d="M0 70 Q 25 30 50 60 T 100 50 T 150 60 T 200 40"
        stroke="#2DD4E0"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {[0, 50, 100, 150, 200].map((x, i) => {
        const y = i === 0 ? 70 : i === 1 ? 60 : i === 2 ? 50 : i === 3 ? 60 : 40;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2.5"
            fill="#C9A961"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 + i * 0.12, duration: 0.4 }}
          />
        );
      })}
      {[20, 70, 120, 170].map((x, i) => (
        <motion.rect
          key={i}
          x={x}
          y={80}
          width="6"
          fill="#2DD4E0"
          fillOpacity="0.25"
          initial={{ height: 0 }}
          whileInView={{ height: 12 + i * 4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
        />
      ))}
    </svg>
  );
}

function FiberConnections() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
      <defs>
        <linearGradient id="fiber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2DD4E0" stopOpacity="0" />
          <stop offset="50%" stopColor="#2DD4E0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2DD4E0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.line
        x1="16.66%"
        y1="50%"
        x2="50%"
        y2="50%"
        stroke="url(#fiber)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
      />
      <motion.line
        x1="50%"
        y1="50%"
        x2="83.33%"
        y2="50%"
        stroke="url(#fiber)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 1 }}
      />
    </svg>
  );
}
