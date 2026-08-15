import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    question: "Does it record system audio?",
    answer:
      "Yes. You can capture system audio and your microphone together, then balance the two levels in the editor.",
  },
  {
    question: "Can I record a specific window?",
    answer:
      "Choose Window mode, pick the application window you want, and only that window is recorded — everything else stays out of frame.",
  },
  {
    question: "Can I record an iPhone or iPad?",
    answer:
      "Connect the device over USB and choose iPhone mode. The screen is recorded at its native resolution, ready for zooms and app-demo styling.",
  },
  {
    question: "Does it support 4K?",
    answer:
      "Yes. Record in 1080p or 4K, and export up to 4K at 60 fps with H.264, HEVC, or ProRes.",
  },
  {
    question: "Can I include my camera?",
    answer:
      "You can add a connected camera as a webcam layer while recording. Choosing a camera is optional.",
  },
  {
    question: "Can I remove background noise?",
    answer:
      "Speech enhancement reduces steady background noise and evens out your voice. It runs on your Mac, so audio stays local.",
  },
  {
    question: "Can I generate captions?",
    answer:
      "New recordings are transcribed automatically in the background. Generate captions, auto-detect the language, and edit the text before export.",
  },
  {
    question: "Can I export GIFs?",
    answer:
      "Yes. Alongside video and audio-only, there is a looping GIF export with a README preset tuned for documentation.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Recording, editing, and speech enhancement run locally. You do not need to be online to capture or edit a project.",
  },
  {
    question: "Where are project files stored?",
    answer:
      "Each project is saved as a .screenproj file on your Mac, in the location you choose. You stay in control of your files.",
  },
  {
    question: "Can I access the raw recordings?",
    answer:
      "Yes. The export panel includes Extract Raw Recording Files, so you can pull the original captures out of a project at any time.",
  },
  {
    question: "Which Mac models and macOS versions are supported?",
    answer:
      "Compatibility details are a placeholder for now — update this answer once the supported macOS versions and Mac models are confirmed.",
  },
];
