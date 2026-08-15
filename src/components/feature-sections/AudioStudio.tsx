"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Sparkles, Upload, Cpu } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { Slider, Toggle } from "@/components/ui/Controls";
import { audioTracks, voiceEnhancements } from "@/data/audio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function TrackWave({
  data,
  playing,
}: {
  data: number[];
  playing: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="flex h-6 items-center gap-[2px]">
      {data.map((h, i) => (
        <motion.span
          key={i}
          className={cn(
            "w-1 rounded-full",
            playing ? "bg-accent-blue" : "bg-text-muted/40"
          )}
          style={{ height: `${h * 100}%` }}
          animate={playing && !reduced ? { scaleY: [1, 0.5, 1] } : { scaleY: 1 }}
          transition={{ duration: 0.8 + (i % 3) * 0.2, repeat: playing ? Infinity : 0, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

export function AudioStudio() {
  const [mic, setMic] = useState(0.8);
  const [system, setSystem] = useState(0.55);
  const [enhance, setEnhance] = useState(true);
  const [playing, setPlaying] = useState<string | null>("uplift-pulse");
  const [volume, setVolume] = useState(0.4);

  return (
    <Section id="audio" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Audio"
            title="Sound like you planned the recording."
            copy="Reduce distracting noise, improve speech clarity, and balance your microphone with system audio."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Mixing + voice enhancement */}
          <Reveal index={1} className="space-y-6">
            <WindowChrome title="Audio · Mix" bodyClassName="p-5">
              <div className="space-y-5">
                <Slider label="Microphone" value={mic} onChange={setMic} display={mic.toFixed(2)} />
                <div className="-mt-2">
                  <TrackWave data={audioTracks[0].waveform} playing={mic > 0.05} />
                </div>
                <Slider label="System audio" value={system} onChange={setSystem} display={system.toFixed(2)} />
              </div>
            </WindowChrome>

            <WindowChrome title="Audio · Voice enhancement" bodyClassName="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-medium text-text-primary">
                    <Sparkles className="h-4 w-4 text-accent-blue" /> Enhance speech
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                    <Cpu className="h-3 w-3" /> Runs on this Mac — audio stays local
                  </p>
                </div>
                <Toggle checked={enhance} onChange={setEnhance} label="Enhance speech" />
              </div>

              <div
                className={cn(
                  "mt-4 grid grid-cols-2 gap-2 transition-opacity duration-300",
                  enhance ? "opacity-100" : "opacity-40"
                )}
              >
                {voiceEnhancements.map((v) => (
                  <div
                    key={v.label}
                    className="rounded-md border border-subtle bg-surface-2 px-3 py-2"
                  >
                    <p className="text-xs font-medium text-text-primary">{v.label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-text-muted">
                      {v.detail}
                    </p>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </Reveal>

          {/* Music library */}
          <Reveal index={2}>
            <WindowChrome
              title="Audio · Music"
              className="h-full"
              bodyClassName="flex h-full flex-col p-5"
            >
              <p className="eyebrow mb-3">Library · royalty-free</p>
              <ul className="flex-1 space-y-1.5">
                {audioTracks.map((t) => {
                  const isPlaying = playing === t.id;
                  return (
                    <li key={t.id}>
                      <button
                        onClick={() => setPlaying(isPlaying ? null : t.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                          isPlaying
                            ? "border-accent-blue/40 bg-accent-blue/[0.06]"
                            : "border-transparent hover:bg-surface-2"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                            isPlaying ? "bg-accent-blue text-white" : "bg-surface-3 text-text-secondary"
                          )}
                        >
                          {isPlaying ? (
                            <Pause className="h-3.5 w-3.5 fill-current" />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-current" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-text-primary">
                            {t.title}
                          </span>
                          <span className="block truncate text-xs text-text-muted">
                            {t.mood} · {t.bpm}
                          </span>
                        </span>
                        <span className="w-16 shrink-0">
                          <TrackWave data={t.waveform} playing={isPlaying} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 space-y-4 border-t border-subtle pt-4">
                <Slider label="Track volume" value={volume} onChange={setVolume} display={volume.toFixed(2)} />
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-surface-2 px-2.5 py-1 text-text-secondary">Fade in</span>
                  <span className="rounded-md bg-surface-2 px-2.5 py-1 text-text-secondary">Fade out</span>
                  <button className="ml-auto flex items-center gap-1.5 rounded-md border border-subtle px-3 py-1.5 text-text-secondary transition-colors hover:bg-surface-2">
                    <Upload className="h-3 w-3" /> Use your own file
                  </button>
                </div>
              </div>
            </WindowChrome>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
