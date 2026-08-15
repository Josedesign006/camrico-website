"use client";

import { useCallback, useRef, useState } from "react";
import { Scissors, Undo2, Redo2, Plus, ZoomIn, Trash2, MousePointer2, Hand } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { Waveform } from "@/components/hero/Waveform";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** Clips, expressed as fractions of the 15s timeline so the playhead lines up. */
const ZOOM_CLIPS = [
  { start: 0.3, end: 0.54, level: 2.0, label: "2.0×" },
  { start: 0.66, end: 0.84, level: 1.6, label: "1.6×" },
];
const CAPTION_CLIPS = [
  { start: 0.06, end: 0.34, text: "Opening the dashboard…" },
  { start: 0.4, end: 0.74, text: "Revenue is up 12% this week." },
];
const CURSOR_MARKS = [0.12, 0.42, 0.74];

function fmt(frac: number, total: number) {
  const s = Math.max(0, Math.round(frac * total));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function TimelineEditor() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(15);
  const [p, setP] = useState(0);
  const laneRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  /** Seek the underlying video to a 0–1 position on the timeline. */
  const seekTo = useCallback((frac: number) => {
    const v = videoRef.current;
    if (v && v.duration) v.currentTime = frac * v.duration;
  }, []);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = laneRef.current?.getBoundingClientRect();
      if (!rect) return;
      const frac = clamp((clientX - rect.left) / rect.width, 0, 1);
      setP(frac);
      seekTo(frac);
    },
    [seekTo]
  );

  const nudge = (delta: number) =>
    setP((v) => {
      const nv = clamp(v + delta, 0, 1);
      seekTo(nv);
      return nv;
    });

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-0.02); }
    if (e.key === "ArrowRight") { e.preventDefault(); nudge(0.02); }
    if (e.key === "Home") { e.preventDefault(); nudge(-1); }
    if (e.key === "End") { e.preventDefault(); nudge(1); }
  };

  // Derived live state from the playhead (drives the timeline lanes below)
  const activeZoom = ZOOM_CLIPS.find((c) => p >= c.start && p <= c.end);
  const activeCaption = CAPTION_CLIPS.find((c) => p >= c.start && p <= c.end);

  return (
    <Section id="timeline">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="The editor · try it"
            title="Drag the playhead. Watch it respond."
            copy="Everything you need for a polished screen video, without the complexity of a full production suite. This one is live — scrub the timeline below."
          />
        </Reveal>

        <Reveal index={1} className="mt-12">
          <WindowChrome
            title="Recording 2026-07-13 at 21.58.08"
            trailing={
              <span className="flex items-center gap-1.5 rounded-md bg-accent-blue px-2.5 py-1 text-[11px] font-semibold text-white">
                Export
              </span>
            }
            bodyClassName="p-4 sm:p-5"
          >
            {/* Product recording — autoplays muted, loops, no play button */}
            <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-black shadow-window">
              {reduced ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/lastbanner-poster.webp"
                  alt="Slate editor walkthrough"
                  className="aspect-[1152/744] w-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="aspect-[1152/744] w-full cursor-pointer"
                  src="/lastbanner.mp4"
                  poster="/lastbanner-poster.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Slate editor walkthrough"
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration || 15)
                  }
                  onTimeUpdate={(e) => {
                    if (dragging.current) return;
                    const v = e.currentTarget;
                    if (v.duration) setP(v.currentTime / v.duration);
                  }}
                  onClick={(e) => {
                    const v = e.currentTarget;
                    if (v.paused) v.play();
                    else v.pause();
                  }}
                />
              )}
            </div>

            {/* Toolbar */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {[
                { icon: Scissors, label: "Split" },
                { icon: ZoomIn, label: "Zoom" },
                { icon: Plus, label: "Add" },
                { icon: Trash2, label: "Delete" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-1.5 rounded-md border border-subtle bg-surface-2 px-2.5 py-1.5 text-xs text-text-secondary"
                >
                  <b.icon className="h-3.5 w-3.5" /> {b.label}
                </span>
              ))}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-subtle bg-surface-2 text-text-secondary">
                  <Undo2 className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-subtle bg-surface-2 text-text-secondary">
                  <Redo2 className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Tracks + scrubbable playhead */}
            <div className="flex gap-3">
              {/* labels */}
              <div className="w-14 shrink-0 space-y-2 pt-6 text-right">
                {["Video", "Audio", "Zoom", "Cursor", "Captions", "Music"].map((l) => (
                  <div key={l} className="flex h-8 items-center justify-end font-mono text-[10px] text-text-muted">
                    {l}
                  </div>
                ))}
              </div>

              {/* lanes = scrub surface */}
              <div
                ref={laneRef}
                role="slider"
                tabIndex={0}
                aria-label="Playhead position"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(p * 100)}
                aria-valuetext={fmt(p, duration)}
                onKeyDown={onKey}
                onPointerDown={(e) => {
                  dragging.current = true;
                  (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
                  setFromClientX(e.clientX);
                }}
                onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
                className="relative flex-1 cursor-ew-resize touch-none select-none pt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                {/* ruler */}
                <div className="absolute inset-x-0 top-0 flex justify-between font-mono text-[9px] text-text-muted">
                  {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                    <span key={f}>{fmt(f, duration)}</span>
                  ))}
                </div>

                <div className="space-y-2">
                  {/* Video */}
                  <div className="relative h-8 overflow-hidden rounded-md bg-surface-2">
                    <Waveform bars={64} seed={5} className="absolute inset-0 px-2 py-1.5" animate={false} />
                  </div>
                  {/* Audio */}
                  <Lane>
                    <Clip left="4%" width="92%" color="#2c6b4f" label="Voice" />
                  </Lane>
                  {/* Zoom */}
                  <Lane>
                    {ZOOM_CLIPS.map((c) => (
                      <Clip
                        key={c.label}
                        left={`${c.start * 100}%`}
                        width={`${(c.end - c.start) * 100}%`}
                        color="#6f5bff"
                        label={c.label}
                        active={activeZoom === c}
                      />
                    ))}
                  </Lane>
                  {/* Cursor */}
                  <Lane>
                    {CURSOR_MARKS.map((m) => {
                      const near = Math.abs(p - m) < 0.04;
                      return (
                        <span
                          key={m}
                          className={cn(
                            "absolute top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all",
                            near
                              ? "scale-110 border-accent-blue bg-accent-blue text-white"
                              : "border-subtle bg-surface-3 text-text-muted"
                          )}
                          style={{ left: `${m * 100}%` }}
                        >
                          <MousePointer2 className="h-2.5 w-2.5" />
                        </span>
                      );
                    })}
                  </Lane>
                  {/* Captions */}
                  <Lane>
                    {CAPTION_CLIPS.map((c, i) => (
                      <Clip
                        key={i}
                        left={`${c.start * 100}%`}
                        width={`${(c.end - c.start) * 100}%`}
                        color="#8a6d3b"
                        label="Aa"
                        active={activeCaption === c}
                      />
                    ))}
                  </Lane>
                  {/* Music */}
                  <Lane>
                    <Clip left="4%" width="92%" color="#b0567f" label="Uplift Pulse" />
                  </Lane>
                </div>

                {/* Playhead */}
                <div
                  className="pointer-events-none absolute bottom-0 top-3 z-20 w-px bg-accent-record"
                  style={{ left: `${p * 100}%` }}
                >
                  <span className="absolute -left-[7px] -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-record shadow-lift">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 border-t border-subtle pt-4 text-xs text-text-muted">
              <Hand className="h-3.5 w-3.5" />
              Drag the playhead to scrub the video (or focus it and use ← →).
              Click the video to play or pause.
            </p>
          </WindowChrome>
        </Reveal>
      </div>
    </Section>
  );
}

function Lane({ children }: { children: React.ReactNode }) {
  return <div className="relative h-8 rounded-md bg-surface-2">{children}</div>;
}

function Clip({
  left,
  width,
  color,
  label,
  active,
}: {
  left: string;
  width: string;
  color: string;
  label?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "absolute inset-y-1 flex items-center rounded-[5px] px-2 text-[9px] font-semibold text-white/90 transition-all duration-200",
        active ? "ring-2 ring-white/70 brightness-110" : ""
      )}
      style={{ left, width, background: color }}
    >
      {label}
    </span>
  );
}
