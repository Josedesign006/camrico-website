"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Wand2, Mic, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { SegmentedControl } from "@/components/ui/Controls";
import { studioEnhance, voiceProfiles } from "@/data/audio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/** On-device processing badge shared by both cards. */
function LocalBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-subtle bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-secondary">
      <Cpu className="h-3 w-3 text-accent-blue" /> On-device AI
    </span>
  );
}

/** Waveform that morphs between value sets and pulses while "playing". */
function Bars({
  data,
  active,
  className,
}: {
  data: number[];
  active: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={cn("flex items-center gap-[3px]", className)}>
      {data.map((h, i) => (
        <motion.span
          key={i}
          className={cn(
            "flex-1 rounded-full",
            active ? "bg-accent-blue" : "bg-text-muted/40"
          )}
          animate={{
            height: `${Math.max(6, h * 100)}%`,
            scaleY: active && !reduced ? [1, 0.6, 1] : 1,
          }}
          transition={{
            height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            scaleY: {
              duration: 0.7 + (i % 4) * 0.12,
              repeat: active && !reduced ? Infinity : 0,
              delay: i * 0.03,
            },
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------- Card 1 ------------------------------- */

function StudioEnhanceCard() {
  const [mode, setMode] = useState<"noisy" | "studio">("studio");
  const isStudio = mode === "studio";
  const data = isStudio ? studioEnhance.studio : studioEnhance.noisy;
  const metrics = isStudio
    ? studioEnhance.metrics.studio
    : studioEnhance.metrics.noisy;

  return (
    <WindowChrome
      title="Voice · Studio enhance"
      bodyClassName="p-5"
      trailing={<LocalBadge />}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-medium text-text-primary">
            <Sparkles className="h-4 w-4 text-accent-blue" /> Noisy → studio
          </p>
          <p className="mt-1 text-xs leading-snug text-text-muted">
            A local AI model rebuilds your speech — removing noise, echo, and
            hiss to reach a clean, studio-grade voice.
          </p>
        </div>
        <SegmentedControl
          size="sm"
          label="Enhancement"
          value={mode}
          onChange={(v) => setMode(v)}
          options={[
            { value: "noisy", label: "Raw" },
            { value: "studio", label: "Studio" },
          ]}
        />
      </div>

      {/* Waveform stage */}
      <div className="relative mt-4 overflow-hidden rounded-lg border border-subtle bg-surface-2 p-4">
        {/* noise haze only in raw mode */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            isStudio ? "opacity-0" : "opacity-100"
          )}
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 5px)",
          }}
        />
        <Bars data={data} active={isStudio} className="relative h-16" />
        <div className="relative mt-2 flex items-center justify-between font-mono text-[10px] text-text-muted">
          <span>0:00</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 font-semibold transition-colors",
              isStudio
                ? "bg-accent-blue/15 text-accent-blue"
                : "bg-accent-record/15 text-accent-record"
            )}
          >
            {isStudio ? "STUDIO" : "NOISY"}
          </span>
          <span>0:12</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-subtle bg-surface-2 px-3 py-2"
          >
            <p className="text-[10px] uppercase tracking-wide text-text-muted">
              {m.label}
            </p>
            <p
              className={cn(
                "mt-0.5 font-mono text-sm font-semibold transition-colors",
                isStudio ? "text-accent-blue" : "text-text-secondary"
              )}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-text-muted">
        <Cpu className="h-3 w-3" /> Runs entirely on this Mac — your audio is
        never uploaded.
      </p>
    </WindowChrome>
  );
}

/* ------------------------------- Card 2 ------------------------------- */

function VoiceChangerCard() {
  const [voiceId, setVoiceId] = useState("narrator");
  const voice = voiceProfiles.find((v) => v.id === voiceId)!;
  const isOriginal = voice.id === "you";

  return (
    <WindowChrome
      title="Voice · Replace"
      bodyClassName="p-5"
      trailing={<LocalBadge />}
    >
      <div>
        <p className="flex items-center gap-2 font-medium text-text-primary">
          <Wand2 className="h-4 w-4 text-accent-blue" /> Change your voice
          completely
        </p>
        <p className="mt-1 text-xs leading-snug text-text-muted">
          Keep every word and the exact timing — swap in an entirely different
          speaker. Pick a voice to preview it.
        </p>
      </div>

      {/* Voice picker */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {voiceProfiles.map((v) => {
          const selected = v.id === voiceId;
          return (
            <button
              key={v.id}
              onClick={() => setVoiceId(v.id)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-colors",
                selected
                  ? "border-accent-blue bg-accent-blue/[0.07]"
                  : "border-subtle bg-surface-2 hover:bg-surface-3"
              )}
            >
              <span className="flex w-full items-center justify-between">
                <span className="text-xs font-semibold text-text-primary">
                  {v.name}
                </span>
                {selected ? (
                  <Check className="h-3.5 w-3.5 text-accent-blue" />
                ) : null}
              </span>
              <span className="text-[10px] leading-tight text-text-muted">
                {v.tone}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected voice preview */}
      <div className="mt-4 rounded-lg border border-subtle bg-surface-2 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-text-secondary">
            <Mic className="h-3.5 w-3.5 text-accent-blue" />
            Now speaking as{" "}
            <strong className="text-text-primary">{voice.name}</strong>
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            {isOriginal ? "ORIGINAL" : "AI VOICE"}
          </span>
        </div>
        <Bars data={voice.waveform} active={!isOriginal} className="h-14" />

        {/* Character meter */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-text-muted">
            <span>Deeper</span>
            <span>Character</span>
            <span>Brighter</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-surface-3">
            <motion.span
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent-blue shadow-lift"
              animate={{ left: `calc(${voice.pitch * 100}% - 6px)` }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            />
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-text-muted">
        <Cpu className="h-3 w-3" /> Generated on-device — no accounts, no cloud
        voice servers.
      </p>
    </WindowChrome>
  );
}

/* ------------------------------- Section ------------------------------- */

export function VoiceAI() {
  return (
    <Section id="voice" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Voice AI · on-device"
            title="Two ways to perfect your voice."
            copy="A local AI engine finishes your narration — clean it from noisy to studio-grade, or replace it entirely with a completely different voice. Everything runs on your Mac."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal index={1}>
            <StudioEnhanceCard />
          </Reveal>
          <Reveal index={2}>
            <VoiceChangerCard />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
