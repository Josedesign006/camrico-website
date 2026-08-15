import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type CaptureMode = {
  id: "screen" | "window" | "area" | "iphone";
  label: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  audioLabel: string;
};

export type BackgroundPreset = {
  id: string;
  label: string;
  css: string;
  kind: "gradient" | "solid" | "pattern";
};

export type VideoPreset = {
  id: string;
  label: string;
  description: string;
  filter: string;
};

export type AudioTrack = {
  id: string;
  title: string;
  mood: string;
  bpm: string;
  waveform: number[];
};

export type ExportPreset = {
  id: string;
  label: string;
  summary: string;
  codec: string;
  resolution: string;
  frameRate: string;
  size: string;
  kind: "video" | "gif";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  note?: string;
};

export type UseCase = {
  id: string;
  audience: string;
  title: string;
  copy: string;
};

export type Principle = {
  title: string;
  copy: string;
  icon: LucideIcon;
};
