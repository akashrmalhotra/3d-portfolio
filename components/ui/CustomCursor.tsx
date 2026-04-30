"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(render);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a961] mix-blend-difference" />
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a961]/50 transition-transform duration-300 ease-out will-change-transform" />
    </>
  );
}