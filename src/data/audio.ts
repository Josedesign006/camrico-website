import type { AudioTrack } from "@/types";

// Small hand-tuned waveforms (0–1) so previews are deterministic and SSR-safe.
export const audioTracks: AudioTrack[] = [
  {
    id: "ambient-flow",
    title: "Ambient Flow",
    mood: "Calm · warm pads",
    bpm: "70 BPM",
    waveform: [0.3, 0.4, 0.35, 0.5, 0.42, 0.55, 0.48, 0.6, 0.5, 0.44, 0.52, 0.4],
  },
  {
    id: "gentle-keys",
    title: "Gentle Keys",
    mood: "Soft · piano feel",
    bpm: "68 BPM",
    waveform: [0.25, 0.5, 0.32, 0.6, 0.4, 0.7, 0.44, 0.55, 0.36, 0.62, 0.3, 0.48],
  },
  {
    id: "lofi-beat",
    title: "Lofi Beat",
    mood: "Chill · downtempo",
    bpm: "82 BPM",
    waveform: [0.6, 0.35, 0.7, 0.4, 0.66, 0.38, 0.72, 0.42, 0.64, 0.36, 0.7, 0.4],
  },
  {
    id: "uplift-pulse",
    title: "Uplift Pulse",
    mood: "Upbeat · product demo",
    bpm: "120 BPM",
    waveform: [0.5, 0.75, 0.55, 0.8, 0.6, 0.85, 0.58, 0.78, 0.62, 0.82, 0.56, 0.7],
  },
  {
    id: "minimal-tech",
    title: "Minimal Tech",
    mood: "Focused · subtle",
    bpm: "110 BPM",
    waveform: [0.4, 0.44, 0.5, 0.46, 0.54, 0.48, 0.56, 0.5, 0.52, 0.47, 0.55, 0.45],
  },
  {
    id: "night-drive",
    title: "Night Drive",
    mood: "Smooth · retro synth",
    bpm: "104 BPM",
    waveform: [0.45, 0.6, 0.5, 0.68, 0.54, 0.72, 0.5, 0.66, 0.58, 0.7, 0.52, 0.6],
  },
];

export const voiceEnhancements = [
  { label: "Noise cleanup", detail: "Removes fans, hiss, and background hum." },
  { label: "Voice levelling", detail: "Keeps your volume steady across takes." },
  { label: "Room reduction", detail: "Tames echo from untreated spaces." },
  { label: "Plosive control", detail: "Softens hard p and b pops." },
  { label: "De-essing", detail: "Eases harsh s and t sounds." },
  { label: "Loudness match", detail: "Normalises to a consistent target." },
];

/* ---------- Voice AI: studio enhance (noisy -> studio) ---------- */

// Deterministic 32-band waveforms so the before/after is SSR-safe.
export const studioEnhance = {
  // Ragged, low, uneven — buried under noise.
  noisy: [
    0.22, 0.34, 0.18, 0.41, 0.26, 0.15, 0.38, 0.29, 0.2, 0.44, 0.24, 0.17,
    0.36, 0.3, 0.19, 0.42, 0.27, 0.16, 0.39, 0.23, 0.33, 0.2, 0.4, 0.25,
    0.18, 0.37, 0.28, 0.21, 0.43, 0.24, 0.19, 0.31,
  ],
  // Full, even, controlled — clean studio output.
  studio: [
    0.52, 0.7, 0.6, 0.82, 0.66, 0.58, 0.78, 0.68, 0.62, 0.85, 0.64, 0.6,
    0.8, 0.72, 0.63, 0.84, 0.67, 0.59, 0.81, 0.65, 0.74, 0.61, 0.83, 0.66,
    0.6, 0.79, 0.7, 0.64, 0.86, 0.65, 0.61, 0.73,
  ],
  metrics: {
    noisy: [
      { label: "Noise floor", value: "−26 dB" },
      { label: "Clarity", value: "41%" },
      { label: "Loudness", value: "−19 LUFS" },
    ],
    studio: [
      { label: "Noise floor", value: "−61 dB" },
      { label: "Clarity", value: "98%" },
      { label: "Loudness", value: "−14 LUFS" },
    ],
  },
};

/* ---------- Voice AI: voice replacement (change your voice) ---------- */

export type VoiceProfile = {
  id: string;
  name: string;
  tone: string;
  pitch: number; // 0–1, for the character meter
  waveform: number[];
};

export const voiceProfiles: VoiceProfile[] = [
  {
    id: "you",
    name: "Your voice",
    tone: "Natural · unchanged",
    pitch: 0.5,
    waveform: [0.4, 0.62, 0.48, 0.7, 0.52, 0.66, 0.5, 0.6, 0.46, 0.68, 0.44, 0.58, 0.5, 0.64, 0.47, 0.6],
  },
  {
    id: "narrator",
    name: "Narrator",
    tone: "Warm · deep",
    pitch: 0.3,
    waveform: [0.55, 0.72, 0.6, 0.8, 0.64, 0.76, 0.58, 0.7, 0.62, 0.82, 0.56, 0.68, 0.6, 0.78, 0.57, 0.7],
  },
  {
    id: "bright",
    name: "Bright",
    tone: "Crisp · energetic",
    pitch: 0.74,
    waveform: [0.35, 0.6, 0.42, 0.72, 0.4, 0.68, 0.46, 0.64, 0.38, 0.7, 0.34, 0.62, 0.44, 0.66, 0.4, 0.58],
  },
  {
    id: "broadcast",
    name: "Broadcast",
    tone: "Polished · radio",
    pitch: 0.44,
    waveform: [0.5, 0.66, 0.56, 0.74, 0.6, 0.7, 0.54, 0.68, 0.58, 0.76, 0.52, 0.64, 0.56, 0.72, 0.55, 0.66],
  },
  {
    id: "calm",
    name: "Calm",
    tone: "Soft · measured",
    pitch: 0.4,
    waveform: [0.32, 0.46, 0.38, 0.52, 0.4, 0.5, 0.36, 0.48, 0.42, 0.54, 0.34, 0.44, 0.38, 0.5, 0.37, 0.46],
  },
  {
    id: "announcer",
    name: "Announcer",
    tone: "Bold · cinematic",
    pitch: 0.24,
    waveform: [0.6, 0.8, 0.66, 0.88, 0.7, 0.82, 0.64, 0.78, 0.68, 0.9, 0.62, 0.74, 0.66, 0.84, 0.63, 0.76],
  },
];
