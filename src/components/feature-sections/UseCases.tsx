"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AppScene } from "@/components/product/AppScene";
import { Waveform } from "@/components/hero/Waveform";
import { useCases } from "@/data/content";

/**
 * Four use cases, each with a distinct miniature visual narrative and layout
 * — deliberately not four identical icon cards.
 */
export function UseCases() {
  return (
    <Section id="use-cases">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="In practice"
            title="Made for the videos you actually ship."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {/* Product demos — wide, framed capture on a stage */}
          <Reveal index={0} className="md:col-span-4">
            <article className="flex h-full flex-col justify-between overflow-hidden card-hover rounded-lg border border-subtle bg-surface-1 p-6">
              <div>
                <p className="eyebrow">{useCases[0].audience}</p>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">
                  {useCases[0].title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-text-secondary">
                  {useCases[0].copy}
                </p>
              </div>
              <div
                className="mt-6 flex aspect-[16/7] items-center justify-center overflow-hidden rounded-md p-[5%]"
                style={{ background: "linear-gradient(135deg,#7b5cff,#ff77c7)" }}
              >
                <div className="aspect-video w-[60%] overflow-hidden rounded shadow-window">
                  <AppScene variant="inbox" />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Tutorials — tall, focused on captions/keystrokes */}
          <Reveal index={1} className="md:col-span-2">
            <article className="flex h-full flex-col overflow-hidden card-hover rounded-lg border border-subtle bg-surface-1 p-6">
              <p className="eyebrow">{useCases[1].audience}</p>
              <h3 className="mt-2 text-xl font-semibold text-text-primary">
                {useCases[1].title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{useCases[1].copy}</p>
              <div className="mt-6 flex flex-1 flex-col justify-end gap-2">
                {["Open settings", "⌘ ,", "Toggle dark mode"].map((t, i) => (
                  <span
                    key={t}
                    className={
                      i === 1
                        ? "self-start rounded-md border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-xs font-semibold text-white"
                        : "rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white"
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Documentation — GIF loop feel */}
          <Reveal index={2} className="md:col-span-2">
            <article className="flex h-full flex-col overflow-hidden card-hover rounded-lg border border-subtle bg-surface-1 p-6">
              <p className="eyebrow">{useCases[2].audience}</p>
              <h3 className="mt-2 text-xl font-semibold text-text-primary">
                {useCases[2].title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{useCases[2].copy}</p>
              <div className="mt-6 flex items-center justify-between rounded-md border border-subtle bg-surface-2 px-4 py-3">
                <span className="font-mono text-xs text-text-muted">demo.gif</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-success" />
                  15 fps · loops
                </span>
              </div>
            </article>
          </Reveal>

          {/* Outreach — wide, audio-forward */}
          <Reveal index={3} className="md:col-span-4">
            <article className="flex h-full flex-col justify-between overflow-hidden card-hover rounded-lg border border-subtle bg-surface-1 p-6 sm:flex-row sm:items-center sm:gap-8">
              <div>
                <p className="eyebrow">{useCases[3].audience}</p>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">
                  {useCases[3].title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-text-secondary">
                  {useCases[3].copy}
                </p>
              </div>
              <div className="mt-6 h-16 w-full max-w-[220px] shrink-0 sm:mt-0">
                <Waveform bars={40} seed={33} className="h-full" />
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
