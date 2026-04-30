"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { blindspot } from "@/lib/content";
import { MaskText } from "@/components/ui/Cinematic";
import { Reveal } from "@/components/ui/Scroll";

/**
 * The Blind Spot — five actors orbit Raymond at the center.
 * - Continuous rotation (CSS-free, requestAnimationFrame, can be paused)
 * - Mouse drag to spin the orbit (with momentum / inertia)
 * - Hover an actor: card lifts, orbit pauses, golden thread to center pulses
 * - Radial weave fabric pattern slowly counter-rotates underneath
 */
export default function BlindSpot() {
  const actors = blindspot.actors;
  const total = actors.length;

  const orbitRef = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const angularVelocity = useRef(0); // rad/sec
  const baseSpeed = 0.18; // rad/sec idle
  const [hovering, setHovering] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  // RAF rotation
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!dragging) {
        // Glide to base speed unless hovering (which freezes)
        const target = hovering !== null ? 0 : baseSpeed;
        angularVelocity.current += (target - angularVelocity.current) * 0.04;
      }
      angle.set(angle.get() + angularVelocity.current * dt);
      // friction when freely rotating
      if (!dragging) angularVelocity.current *= 0.985;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, dragging, hovering]);

  // Drag handling
  const dragStart = useRef({ x: 0, a: 0 });
  const dragLast = useRef({ x: 0, t: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, a: angle.get() };
    dragLast.current = { x: e.clientX, t: performance.now() };
    angularVelocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const r = orbitRef.current?.getBoundingClientRect();
    const radius = (r?.width ?? 600) / 2;
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
      id="blindspot"
      className="section-pane relative isolate min-h-screen w-full overflow-hidden py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="eyebrow mb-3 text-navy/60">{blindspot.eyebrow}</div>
        </Reveal>

        <h2 className="mb-12 font-serif text-[2.6rem] leading-[1.02] text-navy md:text-7xl lg:text-[6rem]">
          <MaskText text="The Blind Spot — The Five Actors Raymond Cannot See." />
        </h2>

        <div
          ref={orbitRef}
          className="relative mx-auto aspect-square w-full max-w-[860px] touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Counter-rotating radial weave background */}
          <CounterWeave />

          {/* Orbit rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full border border-dashed border-navy/30"
          />
          <div className="absolute inset-[12%] rounded-full border border-navy/30" />
          <div className="absolute inset-[26%] rounded-full bg-cream-warm/60 ring-1 ring-navy/10" />

          {/* Pulsing golden threads from center → actors */}
          <ThreadConnections angle={angle} total={total} hovering={hovering} />

          {/* Center — Raymond */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 z-10 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-navy text-cream shadow-[0_30px_80px_-20px_rgba(10,31,61,0.55)]">
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                Raymond
              </div>
              <div className="font-serif text-2xl font-bold md:text-3xl">Sees</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-cream/70">
                fabric only
              </div>
            </div>
          </motion.div>

          {/* Orbiting actor cards */}
          {actors.map((a, i) => (
            <OrbitingActor
              key={a.name}
              index={i}
              total={total}
              angle={angle}
              actor={a}
              isHovered={hovering === i}
              onEnter={() => setHovering(i)}
              onLeave={() => setHovering((h) => (h === i ? null : h))}
            />
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-16 max-w-2xl border-l-2 border-navy pl-4 text-base leading-relaxed text-ink md:text-lg">
            <span className="font-semibold text-navy">{blindspot.footer}</span>
          </p>
        </Reveal>

        <div className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-navy/45">
          Drag to spin · hover to focus
        </div>
      </div>
    </section>
  );
}

function CounterWeave() {
  return (
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      className="absolute inset-[-8%] rounded-full pattern-radial-weave opacity-50"
      style={{
        WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 80%)",
        maskImage: "radial-gradient(circle, black 60%, transparent 80%)",
      }}
    />
  );
}

function OrbitingActor({
  actor,
  index,
  total,
  angle,
  isHovered,
  onEnter,
  onLeave,
}: {
  actor: { name: string; body: string };
  index: number;
  total: number;
  angle: ReturnType<typeof useMotionValue<number>>;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const a = (index / total) * Math.PI * 2 + angle.get() - Math.PI / 2;
      const r = 0.42; // ratio of half size
      const x = 50 + Math.cos(a) * r * 100;
      const y = 50 + Math.sin(a) * r * 100;
      if (ref.current) {
        ref.current.style.left = `${x}%`;
        ref.current.style.top = `${y}%`;
      }
    };
    const unsub = angle.on("change", update);
    update();
    return () => unsub();
  }, [angle, index, total]);

  return (
    <motion.div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      data-cursor="expand"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ delay: 0.6 + index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group relative w-[150px] cursor-pointer rounded-xl border bg-cream/95 p-4 shadow-[0_20px_50px_-20px_rgba(10,31,61,0.4)] transition-colors md:w-[180px] ${
          isHovered ? "border-gold" : "border-navy/15"
        }`}
      >
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-navy/30 bg-cream">
          <ActorIcon i={index} />
        </div>
        <div className="font-serif text-sm font-bold leading-tight text-navy md:text-[15px]">
          {actor.name}
        </div>
        <div className="mt-1.5 text-[11px] leading-snug text-ink md:text-xs">
          {actor.body}
        </div>
        {isHovered && (
          <motion.div
            layoutId="actor-spotlight"
            className="absolute -inset-px rounded-xl ring-2 ring-gold/40"
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function ActorIcon({ i }: { i: number }) {
  const stroke = "#0A1F3D";
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.4">
      {i === 0 && <circle cx="12" cy="9" r="3.5" />}
      {i === 0 && <path d="M5 19c1-3.5 5-5 7-5s6 1.5 7 5" />}
      {i === 1 && <path d="M6 19V8l6-4 6 4v11M9 19V12h6v7" />}
      {i === 2 && <rect x="4" y="6" width="16" height="14" rx="2" />}
      {i === 2 && <path d="M9 6V3h6v3M9 12h6M9 16h4" />}
      {i === 3 && <path d="M12 4v6l4 2-1 5-3-1-3 1-1-5 4-2z" />}
      {i === 4 && <rect x="5" y="3" width="14" height="18" rx="2" />}
      {i === 4 && <path d="M9 7h6M9 11h6M9 15h6" />}
    </svg>
  );
}

function ThreadConnections({
  angle,
  total,
  hovering,
}: {
  angle: ReturnType<typeof useMotionValue<number>>;
  total: number;
  hovering: number | null;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const update = () => {
      const svg = ref.current;
      if (!svg) return;
      const lines = svg.querySelectorAll<SVGLineElement>("line[data-spoke]");
      lines.forEach((line, i) => {
        const a = (i / total) * Math.PI * 2 + angle.get() - Math.PI / 2;
        const r = 42;
        const x = 50 + Math.cos(a) * r;
        const y = 50 + Math.sin(a) * r;
        line.setAttribute("x2", `${x}`);
        line.setAttribute("y2", `${y}`);
        line.setAttribute(
          "stroke-opacity",
          hovering === i ? "1" : "0.45"
        );
        line.setAttribute("stroke-width", hovering === i ? "0.7" : "0.35");
      });
    };
    const unsub = angle.on("change", update);
    update();
    return () => unsub();
  }, [angle, total, hovering]);

  return (
    <svg ref={ref} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      {Array.from({ length: total }).map((_, i) => (
        <line
          key={i}
          data-spoke
          x1="50"
          y1="50"
          x2="50"
          y2="50"
          stroke="#C9A961"
          strokeWidth="0.35"
          strokeOpacity="0.45"
          strokeDasharray="6 6"
        />
      ))}
    </svg>
  );
}
