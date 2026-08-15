import { site } from "@/data/site";

/** A small record-dot mark + wordmark. Restrained, no third-party branding. */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-accent-record/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-record" />
      </span>
      <span className="type-display text-[18px] font-semibold text-text-primary">
        {site.name}
      </span>
    </span>
  );
}
