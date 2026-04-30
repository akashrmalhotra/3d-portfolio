"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { exchange } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Value Exchange — rotating flywheel with:
 * - Momentum physics (drag to spin, inertia, friction)
 * - Particle embers that fly off on high speed
 * - Opposing fabric mandala that counter-rotates
 * - Stage highlighting that follows rotation
 * - Glow trail arc that decays
 */
export default function ValueExchange() {
  const stages = exchange.stages;
  const total = stages.length;
  const angle = useMotionValue(0); // radians
  const angularVelocity = useRef(0.3); // rad/sec idle
  const [activeStage, setActiveStage] = useState(0);
  const [dragging, setDragging] = useState(false);
  const hubRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, a: 0 });
  const dragLast = useRef({ x: 0, t: 0 });

  // RAF animation loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!dragging) {
        // ease toward idle speed
        angularVelocity.current += (0.3 - angularVelocity.current) * 0.015;
        angularVelocity.current *= 0.992; // friction
      }

      angle.set(angle.get() + angularVelocity.current * dt);

      // Update active stage
      const normalised = ((angle.get() % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const idx = Math.round((normalised / (Math.PI * 2)) * total) % total;
      setActiveStage(idx);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, dragging, total]);

  // Pointer drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, a: angle.get() };
    dragLast.current = { x: e.clientX, t: performance.now() };
    angularVelocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const r = hubRef.current?.getBoundingClientRect();
    const radius = (r?.width ?? 500) / 2;
    const dx = e.clientX - dragStart.current.x;
    angle.set(dragStart.current.a + dx / radius);
    const now = performance.now();
    const ddx = e.clientX - dragLast.current.x;
    const dt = Math.max(1, now - dragLast.current.t);
    angularVelocity.current = (ddx / radius) * (1000 / dt);
    dragLast.current = { x: e.clientX, t: now };
  };
  const onPointerUp = () => setDragging(false);

  return (
    <section
      id="exchange"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      {/* rotating mandala bg */}
      <MandalaBg />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{exchange.eyebrow}</div>
        </Reveal>

        <h2 className="mb-16 font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The Value Exchange — A Moat That Gets Deeper Every Day." />
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* ── Flywheel ── */}
          <div
            ref={hubRef}
            className="relative mx-auto aspect-square w-full max-w-[560px] touch-none select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ cursor: dragging ? "grabbing" : "grab" }}
          >
            {/* counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, ease: "linear", repeat: Infinity }}
              className="absolute inset-[8%] rounded-full border-2 border-dashed border-gold/35"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute inset-[18%] rounded-full border border-navy/20"
            />

            {/* Glow arc behind active stage */}
            <GlowArc angle={angle} total={total} active={activeStage} />

            {/* Embers */}
            <EmberField angle={angle} />

            {/* Stage nodes */}
            <StageNodes angle={angle} stages={stages} active={activeStage} />

            {/* Center hub */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-navy p-4 text-center text-cream shadow-[0_30px_80px_-20px_rgba(10,31,61,0.55)]">
                <p className="font-serif text-xs italic leading-tight text-cream/95 md:text-sm">
                  {exchange.center}
                </p>
              </div>
            </motion.div>

            <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.4em] text-navy/45">
              Drag to spin the flywheel
            </div>
          </div>

          {/* ── Stage list ── */}
          <div className="space-y-4">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
                className={`group flex items-start gap-4 rounded-xl border p-5 transition-all duration-300 ${
                  activeStage === i
                    ? "border-gold bg-cream shadow-[0_10px_40px_-15px_rgba(201,169,97,0.45)]"
                    : "border-navy/10 bg-cream/80 hover:border-gold/50"
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-serif text-base font-bold transition-colors ${
                    activeStage === i ? "bg-gold text-navy" : "bg-navy text-gold"
                  }`}
                >
                  {s.n}
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-warm">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-ink md:text-base">
                    {s.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── sub-components ─── */

function MandalaBg() {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: -360 }}
      transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full pattern-mandala opacity-50"
    />
  );
}

function StageNodes({
  angle,
  stages,
  active,
}: {
  angle: ReturnType<typeof useMotionValue<number>>;
  stages: typeof exchange.stages;
  active: number;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const total = stages.length;

  useEffect(() => {
    const unsub = angle.on("change", (a) => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const theta = (i / total) * Math.PI * 2 + a - Math.PI / 2;
        const x = 50 + Math.cos(theta) * 44;
        const y = 50 + Math.sin(theta) * 44;
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      });
    });
    return () => unsub();
  }, [angle, total]);

  // Draw connecting arcs via SVG
  return (
    <>
      {/* arc path overlay */}
      <FlywheelArcs angle={angle} total={total} />

      {stages.map((s, i) => (
        <div
          key={s.n}
          ref={(el) => { refs.current[i] = el; }}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            active === i ? "scale-110" : "scale-100"
          }`}
        >
          <div
            className={`flex h-16 w-16 flex-col items-center justify-center rounded-full shadow-[0_10px_30px_-10px_rgba(201,169,97,0.7)] transition-all md:h-20 md:w-20 ${
              active === i ? "bg-gold text-navy ring-4 ring-gold/30" : "bg-gold/80 text-navy"
            }`}
          >
            <div className="text-[9px] font-bold uppercase tracking-[0.2em]">Stage</div>
            <div className="font-serif text-xl font-bold md:text-2xl">{s.n}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function FlywheelArcs({
  angle,
  total,
}: {
  angle: ReturnType<typeof useMotionValue<number>>;
  total: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const unsub = angle.on("change", (a) => {
      const paths = svgRef.current?.querySelectorAll<SVGPathElement>("path[data-arc]");
      if (!paths) return;
      paths.forEach((path, i) => {
        const a1 = (i / total) * Math.PI * 2 + a - Math.PI / 2;
        const a2 = ((i + 1) / total) * Math.PI * 2 + a - Math.PI / 2;
        const r = 38;
        const x1 = 50 + Math.cos(a1) * r;
        const y1 = 50 + Math.sin(a1) * r;
        const x2 = 50 + Math.cos(a2) * r;
        const y2 = 50 + Math.sin(a2) * r;
        path.setAttribute("d", `M${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`);
      });
    });
    return () => unsub();
  }, [angle, total]);

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      {Array.from({ length: total }).map((_, i) => (
        <path
          key={i}
          data-arc
          d=""
          stroke="#2DD4E0"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

function GlowArc({
  angle,
  total,
  active,
}: {
  angle: ReturnType<typeof useMotionValue<number>>;
  total: number;
  active: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  useEffect(() => {
    const unsub = angle.on("change", (a) => {
      const a1 = (active / total) * Math.PI * 2 + a - Math.PI / 2;
      const a2 = ((active + 1) / total) * Math.PI * 2 + a - Math.PI / 2;
      const r = 38;
      const x1 = 50 + Math.cos(a1) * r;
      const y1 = 50 + Math.sin(a1) * r;
      const x2 = 50 + Math.cos(a2) * r;
      const y2 = 50 + Math.sin(a2) * r;
      ref.current?.setAttribute("d", `M${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`);
    });
    return () => unsub();
  }, [angle, total, active]);

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path ref={ref} d="" stroke="#C9A961" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.7" />
    </svg>
  );
}

function EmberField({ angle }: { angle: ReturnType<typeof useMotionValue<number>> }) {
  const [embers, setEmbers] = useState<
    { id: number; x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[]
  >([]);
  const lastAngle = useRef(0);

  useEffect(() => {
    const unsub = angle.on("change", (a) => {
      const speed = Math.abs(a - lastAngle.current) * 60;
      lastAngle.current = a;
      if (speed > 0.4 && Math.random() > 0.7) {
        const theta = Math.random() * Math.PI * 2;
        const r = 38 + (Math.random() - 0.5) * 8;
        setEmbers((prev) => [
          ...prev.slice(-30),
          {
            id: Date.now() + Math.random(),
            x: 50 + Math.cos(theta) * r,
            y: 50 + Math.sin(theta) * r,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -0.8 - Math.random() * 0.8,
            life: 1,
            maxLife: 0.6 + Math.random() * 0.6,
          },
        ]);
      }
    });
    return () => unsub();
  }, [angle]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      setEmbers((prev) =>
        prev
          .map((e) => ({ ...e, x: e.x + e.vx * 0.4, y: e.y + e.vy * 0.4, life: e.life - 0.02 }))
          .filter((e) => e.life > 0)
      );
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
      {embers.map((e) => (
        <circle
          key={e.id}
          cx={e.x}
          cy={e.y}
          r={0.8}
          fill="#C9A961"
          opacity={e.life}
        />
      ))}
    </svg>
  );
}
