"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/content";

export default function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((x): x is HTMLElement => Boolean(x));

    const obs = new IntersectionObserver(
      (entries) => {
        let topVisible: { i: number; ratio: number } | null = null;
        entries.forEach((e) => {
          const i = els.indexOf(e.target as HTMLElement);
          if (i < 0) return;
          if (e.isIntersecting) {
            if (!topVisible || e.intersectionRatio > topVisible.ratio) {
              topVisible = { i, ratio: e.intersectionRatio };
            }
          }
        });
        if (topVisible !== null) setActive((topVisible as { i: number }).i);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => goTo(s.id)}
          aria-label={`Jump to ${s.label}`}
          className="group relative flex items-center"
        >
          <span className={`rail-dot ${i === active ? "active" : ""}`} />
          <span className="pointer-events-none absolute left-5 whitespace-nowrap rounded bg-navy/90 px-2 py-0.5 text-[11px] font-medium uppercase tracking-widest text-cream opacity-0 transition group-hover:opacity-100">
            {String(i + 1).padStart(2, "0")} · {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
