"use client";

import { motion } from "framer-motion";
import { Building2, Shield, Landmark, Wheat } from "lucide-react";
import { valueProposition } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

const icons: Record<string, typeof Wheat> = {
  "The Farmer": Wheat,
  Banks: Building2,
  Insurers: Shield,
  "Govt Agencies": Landmark,
};

export default function ValueProposition() {
  return (
    <section id="value" className="relative bg-offwhite pattern-iso-faint py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={8}>The Value Proposition</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {valueProposition.title}
        </motion.h2>

        <div className="relative mt-16">
          <svg viewBox="0 0 800 360" className="h-auto w-full">
            <defs>
              <linearGradient id="grnFlow" x1="0" x2="1">
                <stop offset="0%" stopColor="#3A5A2B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#6B7C4A" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="navFlow" x1="0" x2="1">
                <stop offset="0%" stopColor="#0F1E3D" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#1E2F4F" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Source: Satyukt */}
            <rect x="40" y="120" width="120" height="120" rx="6" fill="#C4DCE8" stroke="#0F1E3D" strokeWidth="1.4" />
            <text x="100" y="186" textAnchor="middle" className="fill-navy font-serif" style={{ fontSize: 18, fontWeight: 600 }}>
              Satyukt
            </text>

            {/* Value flow (green band) — top */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              d="M 160 130 C 360 80, 500 40, 700 50 L 700 90 C 500 80, 360 120, 160 170 Z"
              fill="url(#grnFlow)"
            />
            <text x="430" y="80" textAnchor="middle" className="fill-cream font-sans" style={{ fontSize: 14, fontWeight: 700 }}>
              Value Flow
            </text>

            {/* Three navy revenue flows */}
            {[
              "M 160 220 C 380 220, 540 180, 700 170 L 700 200 C 540 210, 380 250, 160 245 Z",
              "M 160 250 C 380 260, 540 240, 700 240 L 700 270 C 540 270, 380 290, 160 275 Z",
              "M 160 280 C 380 300, 540 300, 700 310 L 700 340 C 540 330, 380 320, 160 305 Z",
            ].map((d, i) => (
              <motion.path
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.4 + i * 0.15, duration: 1.4, ease: "easeOut" }}
                d={d}
                fill="url(#navFlow)"
              />
            ))}

            {/* Destination boxes */}
            {[
              { y: 60, label: "The Farmer" },
              { y: 175, label: "Banks" },
              { y: 240, label: "Insurers" },
              { y: 300, label: "Govt Agencies" },
            ].map((node, i) => (
              <g key={node.label}>
                <rect
                  x="700"
                  y={node.y}
                  width="80"
                  height={i === 0 ? 50 : 36}
                  rx="6"
                  fill={i === 0 ? "#3A5A2B" : "#0F1E3D"}
                />
                <text
                  x="740"
                  y={node.y + (i === 0 ? 30 : 22)}
                  textAnchor="middle"
                  className="fill-cream font-sans"
                  style={{ fontSize: 12, fontWeight: 700 }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {valueProposition.flows.map((f, i) => {
            const Icon = icons[f.to] ?? Wheat;
            const isValue = f.kind === "value";
            return (
              <motion.div
                key={f.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`rounded-xl border p-5 ${
                  isValue ? "border-deepGreen/40 bg-deepGreen/10" : "border-navy/15 bg-offwhite"
                }`}
              >
                <div
                  className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                    isValue ? "bg-deepGreen text-cream" : "bg-navy text-cream"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-navy/55">
                  {isValue ? "Value to" : "Pays Satyukt"}
                </div>
                <div className="font-serif text-xl text-navy">{f.to}</div>
                <p className="mt-2 text-sm text-navy/75">{f.body}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl rounded-lg border-l-4 border-sand bg-cream-warm px-5 py-4 text-sm italic text-navy/75">
          {valueProposition.caption}
        </p>
      </div>
    </section>
  );
}
