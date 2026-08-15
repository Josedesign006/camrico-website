"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE = 'a,button,[role="slider"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],input[type="range"],[data-cursor]';

/**
 * A trailing ring that follows the pointer with easing and grows over
 * interactive elements. The native cursor stays visible underneath, so it
 * never hurts usability. Skipped on touch devices and under reduced motion.
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
      }
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element)?.closest?.(INTERACTIVE);
      ring.classList.toggle("cursor-ring--active", !!hit);
    };
    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return <div ref={ringRef} aria-hidden="true" className="cursor-ring" />;
}
