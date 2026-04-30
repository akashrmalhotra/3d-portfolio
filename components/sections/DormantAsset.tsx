"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { dormant } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Dormant Asset — animated network with two tiers (bright tailors,
 * faint customers), pulsing connections, and packets of data flowing
 * along the gold threads. Hover highlights a cluster.
 */
export default function DormantAsset() {
  const tailors = useMemo(() => generateNodes(34, "T"), []);
  const customers = useMemo(() => generateNodes(120, "C"), []);
  const connections = useMemo(
    () => generateConnections(tailors, customers),
    [tailors, customers]
  );

  return (
    <section
      id="dormant"
      className="section-pane dark relative isolate min-h-screen w-full overflow-hidden py-28 text-cream"
    >
      <div className="pointer-events-none absolute inset-0 pattern-grid-on-navy opacity-50" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* LEFT — copy */}
        <div>
          <Reveal>
            <div className="eyebrow mb-3 text-gold/80">{dormant.eyebrow}</div>
          </Reveal>

          <h2 className="font-serif text-4xl leading-tight text-cream md:text-5xl">
            <MaskText text={dormant.title} />
          </h2>

          <div className="mt-10 space-y-6">
            {dormant.points.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.7 }}
                className="border-l-2 border-gold/40 pl-4 text-base leading-relaxed text-cream/85 md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div className="mt-10 inline-block rounded-xl border border-gold/30 bg-navy-light/40 px-6 py-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
              <p className="font-serif text-lg italic leading-relaxed text-gold md:text-xl">
                &ldquo;{dormant.punch}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — network visualization */}
        <NetworkViz tailors={tailors} customers={customers} connections={connections} />
      </div>
    </section>
  );
}

/* ---------- network ---------- */

type Node = { id: string; x: number; y: number; r: number; t: "T" | "C"; cluster: number };

function generateNodes(n: number, t: "T" | "C"): Node[] {
  let seed = t === "T" ? 17 : 91;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const arr: Node[] = [];
  for (let i = 0; i < n; i++) {
    const cluster = Math.floor(rnd() * 6);
    const cx = 12 + (cluster % 3) * 30 + rnd() * 12;
    const cy = 12 + Math.floor(cluster / 3) * 38 + rnd() * 16;
    arr.push({
      id: `${t}-${i}`,
      x: Math.max(4, Math.min(96, cx + (rnd() - 0.5) * 18)),
      y: Math.max(4, Math.min(96, cy + (rnd() - 0.5) * 18)),
      r: t === "T" ? 1.6 + rnd() * 1 : 0.7 + rnd() * 0.6,
      t,
      cluster,
    });
  }
  return arr;
}

function generateConnections(t: Node[], c: Node[]): { a: Node; b: Node }[] {
  const out: { a: Node; b: Node }[] = [];
  for (let i = 0; i < t.length; i++) {
    // each tailor connects to 4-6 nearby customers
    const tailor = t[i];
    const nearest = [...c]
      .map((cn) => ({ cn, d: Math.hypot(cn.x - tailor.x, cn.y - tailor.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 5);
    nearest.forEach(({ cn }) => out.push({ a: tailor, b: cn }));
  }
  // a few tailor-tailor backbone links
  for (let i = 0; i < t.length - 1; i++) {
    if (i % 3 === 0) out.push({ a: t[i], b: t[i + 1] });
  }
  return out;
}

function NetworkViz({
  tailors,
  customers,
  connections,
}: {
  tailors: Node[];
  customers: Node[];
  connections: { a: Node; b: Node }[];
}) {
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  const breatheRef = useRef<SVGGElement>(null);

  // breathing animation: scale all nodes around centroid (50,50)
  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const s = 1 + Math.sin(now / 1400) * 0.012;
      if (breatheRef.current)
        breatheRef.current.setAttribute("transform", `translate(50 50) scale(${s}) translate(-50 -50)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gold/20 bg-navy-deep/40 backdrop-blur">
        {/* embroidery */}
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
             style={{
               background: "radial-gradient(circle at 30% 30%, rgba(201,169,97,0.25) 0, transparent 40%), radial-gradient(circle at 70% 70%, rgba(45,212,224,0.18) 0, transparent 35%)"
             }}
        />

        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <radialGradient id="customer-grad">
              <stop offset="0%" stopColor="#E2CE9C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E2CE9C" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="thread-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A961" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#C9A961" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C9A961" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <g ref={breatheRef}>
            {/* connections */}
            {connections.map((c, i) => {
              const dim = activeCluster !== null && c.a.cluster !== activeCluster && c.b.cluster !== activeCluster;
              return (
                <motion.line
                  key={i}
                  x1={c.a.x}
                  y1={c.a.y}
                  x2={c.b.x}
                  y2={c.b.y}
                  stroke="#C9A961"
                  strokeOpacity={dim ? 0.05 : 0.22}
                  strokeWidth="0.16"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.3 + (i % 30) * 0.018, duration: 1.2 }}
                />
              );
            })}

            {/* customer halos */}
            {customers.map((n) => (
              <circle key={n.id} cx={n.x} cy={n.y} r={n.r * 2.5} fill="url(#customer-grad)" />
            ))}

            {/* customer nodes */}
            {customers.map((n) => (
              <motion.circle
                key={n.id}
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="#E2CE9C"
                opacity={activeCluster !== null && n.cluster !== activeCluster ? 0.15 : 0.55}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: activeCluster !== null && n.cluster !== activeCluster ? 0.15 : 0.55 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.6 + (parseInt(n.id.split("-")[1]) % 25) * 0.02, duration: 0.5 }}
              />
            ))}

            {/* tailor nodes (bright) */}
            {tailors.map((n, i) => (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 1.4}
                  fill="#C9A961"
                  fillOpacity="0.18"
                  className="pulse-soft"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="#C9A961"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.4 + i * 0.018, duration: 0.6 }}
                  style={{ cursor: "pointer" }}
                  onPointerEnter={() => setActiveCluster(n.cluster)}
                  onPointerLeave={() => setActiveCluster(null)}
                />
              </g>
            ))}

            {/* flowing data packets along selected connections */}
            {connections.slice(0, 18).map((c, i) => (
              <DataPacket key={i} a={c.a} b={c.b} delay={i * 0.4} />
            ))}
          </g>
        </svg>

        {/* Stat badge */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="rounded-2xl border border-gold/30 bg-navy/85 px-6 py-4 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <div className="font-serif text-3xl font-bold text-cream md:text-4xl">
              <CountUpNum from={20} to={20} suffix=",000" /> →{" "}
              <CountUpNum from={0} to={2} suffix=",000,000" />
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              Tailors → Indirect Customers
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-cream/55">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" /> 20K Tailors
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold-soft/60" /> 2M Indirect Customers
        </span>
      </div>
    </div>
  );
}

function DataPacket({ a, b, delay }: { a: Node; b: Node; delay: number }) {
  return (
    <motion.circle
      r="0.7"
      fill="#2DD4E0"
      initial={{ cx: a.x, cy: a.y, opacity: 0 }}
      animate={{
        cx: [a.x, b.x],
        cy: [a.y, b.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    />
  );
}

function CountUpNum({ from, to, suffix }: { from: number; to: number; suffix?: string }) {
  const [v, setV] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 1500);
            setV(from + (to - from) * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [from, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(0)}
      {suffix}
    </span>
  );
}
