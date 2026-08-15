import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { BeforeAfter } from "@/components/feature-sections/BeforeAfter";
import { CaptureModes } from "@/components/feature-sections/CaptureModes";
import { CanvasStyling } from "@/components/feature-sections/CanvasStyling";
import { AutoZoom } from "@/components/feature-sections/AutoZoom";
import { CursorEffects } from "@/components/feature-sections/CursorEffects";
import { VideoEnhancement } from "@/components/feature-sections/VideoEnhancement";
import { Interstitial } from "@/components/feature-sections/Interstitial";
import { AudioStudio } from "@/components/feature-sections/AudioStudio";
import { VoiceAI } from "@/components/feature-sections/VoiceAI";
import { CaptionsKeystrokes } from "@/components/feature-sections/CaptionsKeystrokes";
import { TimelineEditor } from "@/components/timeline/TimelineEditor";
import { ExportPanel } from "@/components/export/ExportPanel";
import { Privacy } from "@/components/feature-sections/Privacy";
import { UseCases } from "@/components/feature-sections/UseCases";
import { Principles } from "@/components/feature-sections/Principles";
import { Pricing } from "@/components/pricing/Pricing";
import { Faq } from "@/components/faq/Faq";
import { FinalCta } from "@/components/feature-sections/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BeforeAfter />
        <div className="hairline shell" />
        <CaptureModes />
        <CanvasStyling />
        <AutoZoom />
        <CursorEffects />
        <VideoEnhancement />
        <Interstitial
          kicker="One window"
          lead="Record once."
          rest="Then shape every zoom, cursor move, and caption in the same place you captured them — and export without opening another app."
        />
        <AudioStudio />
        <VoiceAI />
        <CaptionsKeystrokes />
        <TimelineEditor />
        <ExportPanel />
        <Privacy />
        <UseCases />
        <Principles />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
