"use client";

import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DownloadButton, SecondaryButton } from "@/components/ui/Button";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <Section id="download" className="overflow-hidden">
      <div className="shell">
        <Reveal>
          <div className="studio-wash relative overflow-hidden rounded-xl border border-subtle bg-surface-1 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="grain pointer-events-none absolute inset-0" />
            <div className="relative">
              <span className="eyebrow mb-5 justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-record" />
                Ready when you are
              </span>
              <h2 className="type-display mx-auto max-w-3xl text-balance text-4xl leading-[1.08] text-text-primary sm:text-6xl">
                Make your next screen recording worth watching.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-text-secondary">
                Capture, polish, and publish from one focused macOS app.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <DownloadButton href={site.download.href} size="lg" />
                <SecondaryButton href={site.demoHref} size="lg">
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Watch the demo
                </SecondaryButton>
              </div>

              <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-subtle pt-8 sm:grid-cols-4">
                {[
                  ["Requires", site.download.macOS],
                  ["Chip", site.download.silicon],
                  ["Size", site.download.size],
                  ["Version", site.download.version],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm text-text-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-mono text-[11px] text-text-muted">
                Compatibility details are placeholders — confirm before publishing.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
