"use client";

import { motion } from "framer-motion";
import { Circle, Scissors, Upload, FileVideo } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const stages = [
  { label: "Record", icon: Circle },
  { label: "Edit", icon: Scissors },
  { label: "Export", icon: Upload },
];

const points = [
  "Recording, editing, and speech enhancement run on your Mac.",
  "No forced cloud upload — your footage never leaves the device unless you send it.",
  "Every project is a .screenproj file you own and can move anywhere.",
  "Extract the original raw recordings whenever you need them.",
];

export function Privacy() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section id="privacy">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="On-device"
              title="Your recordings stay on your Mac."
              copy="The whole workflow happens locally. You decide if and when a file is shared."
            />
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-success" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Quiet local-file visualisation */}
          <Reveal index={1}>
            <div className="relative rounded-lg border border-subtle bg-surface-1 p-8">
              <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-text-muted">
                This Mac
              </p>
              <div className="relative flex items-center justify-between">
                {/* connecting line */}
                <div className="absolute inset-x-8 top-6 h-px bg-border-subtle" />

                {stages.map((s, i) => (
                  <div key={s.label} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-strong bg-surface-2 text-text-secondary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-text-secondary">{s.label}</span>
                    <span className="font-mono text-[9px] text-text-muted">
                      {i === 0 ? "capture" : i === 1 ? "timeline" : "video · gif"}
                    </span>
                  </div>
                ))}

                {/* Traveling project file */}
                {!reduced ? (
                  <motion.div
                    className="absolute top-3.5 z-20"
                    animate={{ left: ["4%", "50%", "50%", "92%", "92%", "4%"] }}
                    transition={{ duration: 6, times: [0, 0.28, 0.4, 0.68, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginLeft: -10 }}
                  >
                    <div className="flex items-center gap-1 rounded-md bg-accent-blue px-1.5 py-0.5 shadow-lift">
                      <FileVideo className="h-3 w-3 text-white" />
                      <span className="font-mono text-[8px] text-white">.screenproj</span>
                    </div>
                  </motion.div>
                ) : null}
              </div>

              <p className="mt-8 border-t border-subtle pt-4 text-center text-xs text-text-muted">
                The project file moves between stages — and never leaves the device.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
