"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subRef.current) return;

    // Split text into individual characters for high-end animation
    const titleSplit = new SplitType(titleRef.current, { types: "chars, words" });
    
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(titleSplit.chars, 
      { opacity: 0, y: 100, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: 0.02, delay: 0.5 }
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=1"
    );

    return () => { titleSplit.revert(); };
  }, []);

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center text-center">
      <div className="z-10 max-w-5xl px-6">
        <h1 
          ref={titleRef} 
          className="font-serif text-6xl font-bold tracking-tight text-cream md:text-8xl"
          style={{ perspective: "1000px" }}
        >
          The Complete Man.<br/>
          <span className="text-gold italic">The Incomplete Platform.</span>
        </h1>
        <p ref={subRef} className="mt-8 font-sans text-lg tracking-widest text-cream/70 uppercase">
          A Digital Transformation by Raymond
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-16 w-px bg-gradient-to-b from-gold to-transparent animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-gold/70">Scroll to Unravel</span>
      </div>
    </section>
  );
}
