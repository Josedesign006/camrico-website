"use client";

import { cn } from "@/lib/utils";

/* ---------- Segmented control (macOS pill selector) ---------- */

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  label,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  label?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-[10px] border border-subtle bg-surface-2 p-1",
        size === "sm" ? "text-xs" : "text-sm"
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-[7px] font-medium transition-colors duration-200",
              size === "sm" ? "px-2.5 py-1" : "px-3.5 py-1.5",
              active
                ? "bg-accent-blue text-white shadow-lift"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Toggle switch ---------- */

export function Toggle({
  checked,
  onChange,
  label,
  tone = "blue",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  tone?: "blue" | "record";
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-[42px] shrink-0 items-center rounded-full border border-subtle transition-colors duration-200",
        checked
          ? tone === "record"
            ? "bg-accent-record"
            : "bg-accent-blue"
          : "bg-surface-3"
      )}
    >
      <span
        className={cn(
          "inline-block h-[18px] w-[18px] rounded-full bg-white shadow-lift transition-transform duration-200 ease-out-quint",
          checked ? "translate-x-[20px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

/* ---------- Checkbox ---------- */

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary">
      <button
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border transition-colors duration-150",
          checked
            ? "border-accent-blue bg-accent-blue text-white"
            : "border-strong bg-surface-2"
        )}
      >
        {checked ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path
              d="M2.5 6.2l2.2 2.3 4.8-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>
      <span className="select-none">{label}</span>
    </label>
  );
}

/* ---------- Labeled slider ---------- */

export function Slider({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  display?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="font-mono text-xs text-text-muted">
          {display ?? value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--accent-blue) ${pct}%, var(--surface-3) ${pct}%)`,
        }}
        className="w-full"
      />
    </div>
  );
}
