"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, RefreshCw, ChevronDown, Cable } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { SegmentedControl, Toggle } from "@/components/ui/Controls";
import { captureModes } from "@/data/capture";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CaptureMode } from "@/types";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-text-secondary">{label}</span>
      {children}
    </div>
  );
}

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={
        active
          ? "rounded-md bg-accent-blue px-3 py-1 text-xs font-semibold text-white"
          : "rounded-md bg-surface-3 px-3 py-1 text-xs text-text-secondary"
      }
    >
      {children}
    </span>
  );
}

function ModeBody({ mode }: { mode: CaptureMode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      {/* Visual preview of what gets captured */}
      <div className="relative overflow-hidden rounded-lg border border-subtle bg-[#0e1116] p-4">
        <div className="relative aspect-video w-full">
          {mode.id === "screen" && <ScreenPreview />}
          {mode.id === "window" && <WindowPreview />}
          {mode.id === "area" && <AreaPreview />}
          {mode.id === "iphone" && <PhonePreview />}
        </div>
      </div>

      {/* Controls */}
      <div>
        <p className="text-lg font-medium text-text-primary">{mode.headline}</p>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {mode.description}
        </p>

        <div className="mt-4 divide-y divide-white/5 border-t border-subtle">
          {mode.id === "window" ? (
            <Row label="Window">
              <span className="flex items-center gap-2 rounded-md bg-surface-3 px-3 py-1.5 text-xs text-text-secondary">
                Choose a window… <ChevronDown className="h-3 w-3" />
              </span>
            </Row>
          ) : null}

          {mode.id === "area" ? (
            <Row label="Selection">
              <span className="rounded-md bg-surface-3 px-3 py-1.5 font-mono text-xs text-text-secondary">
                1280 × 720
              </span>
            </Row>
          ) : null}

          {mode.id === "iphone" ? (
            <Row label="Device">
              <span className="flex items-center gap-1.5 rounded-md bg-accent-success/15 px-3 py-1.5 text-xs font-medium text-accent-success">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-success" />
                Connected · native res
              </span>
            </Row>
          ) : (
            <Row label="Quality">
              <div className="flex gap-1">
                <Pill>1080p</Pill>
                <Pill active>4K</Pill>
              </div>
            </Row>
          )}

          <Row label="Microphone">
            <span className="rounded-md bg-surface-3 px-3 py-1.5 text-xs text-text-secondary">
              {mode.id === "iphone" ? "iPhone Microphone" : "MacBook Pro Mic"}
            </span>
          </Row>

          <Row label={mode.audioLabel}>
            <Toggle checked onChange={() => {}} label={mode.audioLabel} />
          </Row>

          {mode.id !== "iphone" ? (
            <Row label="Camera">
              <span className="rounded-md bg-surface-3 px-3 py-1.5 text-xs text-text-secondary">
                No Camera
              </span>
            </Row>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-md bg-accent-record py-2.5 text-sm font-semibold text-white">
          <Circle className="h-3 w-3 fill-white" /> Start Recording
        </div>
      </div>
    </div>
  );
}

/* --- Small per-mode preview visuals --- */

function ScreenPreview() {
  return (
    <div className="absolute inset-0 rounded-md border-2 border-accent-blue bg-[#11151b]">
      <div className="flex h-5 items-center gap-1 border-b border-white/5 px-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-6 rounded bg-white/[0.04]" />
        ))}
      </div>
      <span className="absolute -bottom-2.5 right-2 rounded bg-accent-blue px-1.5 py-0.5 font-mono text-[9px] text-white">
        Full display
      </span>
    </div>
  );
}

function WindowPreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0e1116]">
      <div className="grid grid-cols-3 gap-2 opacity-40">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-8 w-12 rounded bg-white/10" />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-accent-blue bg-[#141a22] shadow-lift">
        <div className="flex h-3.5 items-center gap-1 border-b border-white/5 px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        </div>
      </div>
    </div>
  );
}

function AreaPreview() {
  return (
    <div className="absolute inset-0 bg-[#0e1116]">
      <div className="absolute inset-3 rounded border border-dashed border-white/15" />
      <div className="absolute left-[22%] top-[24%] h-[46%] w-[52%] rounded border-2 border-accent-blue bg-accent-blue/10">
        {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
          (p) => (
            <span
              key={p}
              className={`absolute ${p} h-2 w-2 rounded-[2px] border border-accent-blue bg-white`}
            />
          )
        )}
        <span className="absolute -top-6 left-0 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
          1280 × 720
        </span>
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0e1116]">
      <div className="relative h-[86%] w-[42%] rounded-[14px] border-2 border-accent-blue bg-[#11151b] p-1.5">
        <span className="mx-auto mb-1 block h-1 w-6 rounded-full bg-white/25" />
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-6 rounded bg-white/[0.05]" />
          ))}
        </div>
      </div>
      <span className="absolute bottom-2 flex items-center gap-1 font-mono text-[10px] text-text-muted">
        <Cable className="h-3 w-3" /> USB
      </span>
    </div>
  );
}

export function CaptureModes() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<CaptureMode["id"]>("screen");
  const mode = captureModes.find((m) => m.id === active)!;

  return (
    <Section id="capture" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Capture"
            title="Capture exactly what you need."
            copy="Record the whole display, one application, a precise area, or a connected iPhone and iPad."
          />
        </Reveal>

        <Reveal index={1} className="mt-8">
          <SegmentedControl
            label="Capture mode"
            value={active}
            onChange={setActive}
            options={captureModes.map((m) => ({ value: m.id, label: m.label }))}
          />
        </Reveal>

        <Reveal index={2} className="mt-6">
          <WindowChrome title="Screen Presenter" bodyClassName="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ModeBody mode={mode} />
              </motion.div>
            </AnimatePresence>
          </WindowChrome>
        </Reveal>
      </div>
    </Section>
  );
}
