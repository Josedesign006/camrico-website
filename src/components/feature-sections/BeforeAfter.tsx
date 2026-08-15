"use client";

import { useCallback, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp } from "@/lib/utils";

const afterTraits = [
  "Clean background",
  "Rounded frame + shadow",
  "Automatic zoom",
  "Cursor smoothing",
  "Captions",
  "Enhanced voice",
];

export function BeforeAfter() {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState(52);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100, 4, 96));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 4, 4, 96));
    if (e.key === "ArrowRight") setPos((p) => clamp(p + 4, 4, 96));
  };

  return (
    <Section id="outcome">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Recording is only the beginning"
            title="From raw capture to presentation-ready."
            copy="Transform an ordinary screen capture into a clear, focused presentation in minutes. Drag to compare."
          />
        </Reveal>

        <Reveal index={1} className="mt-12">
          <div
            ref={trackRef}
            className="relative aspect-[1600/1034] w-full select-none overflow-hidden rounded-lg border border-subtle bg-surface-1 shadow-window"
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as Element).setPointerCapture?.(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
          >
            {/* AFTER (underneath, full — fills edge to edge) */}
            <div className="absolute inset-0">
              {reduced ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/ba-after-poster.webp"
                  alt="Presentation-ready recording"
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  src="/ba-after.mp4"
                  poster="/ba-after-poster.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Presentation-ready recording"
                />
              )}
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
                Presentation-ready
              </span>
            </div>

            {/* BEFORE (clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {/* raw: same framing as the after side, but visibly un-graded */}
              <div className="relative h-full w-full overflow-hidden opacity-95 [filter:grayscale(0.4)_saturate(0.82)_contrast(0.88)_brightness(0.84)_blur(0.5px)]">
                {reduced ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/ba-raw-poster.webp"
                    alt="Raw screen recording"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    src="/ba-raw.mp4"
                    poster="/ba-raw-poster.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Raw screen recording"
                  />
                )}
                {/* dull, un-graded overlay to keep the raw side looking unfinished */}
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(125% 125% at 50% 38%, transparent 52%, rgba(20,16,12,0.42) 100%)",
                  }}
                />
                <span className="pointer-events-none absolute inset-0 bg-[#2b2417]/10 mix-blend-multiply" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
                Raw recording
              </span>
            </div>

            {/* Handle */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare raw recording and presentation-ready"
              aria-valuenow={Math.round(pos)}
              aria-valuemin={4}
              aria-valuemax={96}
              onKeyDown={onKey}
              className="absolute inset-y-0 z-10 -ml-5 flex w-10 cursor-ew-resize items-center justify-center focus:outline-none"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/80" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/60 backdrop-blur">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none">
                  <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal index={2}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {afterTraits.map((t) => (
              <li
                key={t}
                className="flex items-center gap-1.5 text-sm text-text-secondary"
              >
                <Check className="h-3.5 w-3.5 text-accent-success" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
