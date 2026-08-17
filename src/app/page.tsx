/* Ported 1:1 from the camrico-main static redesign (index.html). */
import type { CSSProperties } from "react";

/* CSS custom properties in style attributes */
const css = (o: Record<string, string>) => o as CSSProperties;

export default function Page() {
  return (
    <>

        {/* ─── The Island ─────────────────────────────────────────────── */}
        <div className="island" id="island" data-state="boot" role="navigation" aria-label="Main">
          <div className="island__inner">

            {/* glass header bar (top of page) */}
            <div className="island__bar">
              <a className="bar__logo" href="#top" data-scroll>
                <img src="/assets/logo.png" alt="Camrico" />
              </a>
              <nav className="bar__nav" aria-label="Sections">
                <a href="#capture" data-scroll>Capture</a>
                <a href="#editor" data-scroll>Editor</a>
                <a href="#export" data-scroll>Export</a>
                <a href="#faq" data-scroll>FAQ</a>
              </nav>
              <a className="bar__cta" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
                <span className="btn__dot" aria-hidden="true"></span> Download
              </a>
            </div>

            {/* transport: logo · chapter readout · download, with scrubber */}
            <div className="island__rec">
              <a className="rec-logo" href="#top" data-scroll aria-label="Camrico — back to top">
                <img src="/assets/logo.png" alt="" />
              </a>
              <button className="rec-main" id="recBtn" aria-label="Open chapter navigation">
                <span className="rec-dot" aria-hidden="true"></span>
                <span className="rec-time" id="recTime">0:00</span>
                <span className="rec-chap" id="chapLabel">Intro</span>
                <span className="rec-count mono" id="chapCount">— / —</span>
              </button>
              <a className="rec-dl" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
                <svg width="10" height="12" viewBox="0 0 13 15" fill="none"><path d="M6.5 1v9M3 6.5 6.5 10 10 6.5M1.5 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download
              </a>
              <span className="track" id="track" aria-hidden="true"><i id="trackFill"></i><u id="trackHead"></u></span>
            </div>

            {/* section announcement content */}
            <div className="island__announce" id="announce" aria-live="polite"></div>

            {/* expanded chapter menu */}
            <div className="island__menu" id="menu" role="dialog" aria-label="Chapter navigation">
              <div className="menu__top">
                <span className="rec-dot" aria-hidden="true"></span>
                <span className="rec-time" id="menuTime">0:00</span>
                <span className="menu__hint mono">Jump to chapter</span>
                <button className="menu__close" id="menuClose" aria-label="Close chapter navigation">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className="menu__chips" id="menuChips"></div>
              <div className="menu__actions">
                <a className="menu__dl" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
                  <svg width="11" height="13" viewBox="0 0 13 15" fill="none"><path d="M6.5 1v9M3 6.5 6.5 10 10 6.5M1.5 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download for Mac</a>
                <button className="menu__copy" id="copyLink">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="4" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.3"/><path d="M4 4V2.6A1.6 1.6 0 0 1 5.6 1H9.4A1.6 1.6 0 0 1 11 2.6v3.8A1.6 1.6 0 0 1 9.4 8H8" stroke="currentColor" strokeWidth="1.3"/></svg>
                  <span id="copyText">Copy link</span></button>
              </div>
            </div>

            {/* download feedback */}
            <div className="island__dl" id="dlLayer" aria-live="polite"></div>

            {/* final CTA content */}
            <a className="island__cta" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden="true"><path d="M6.5 1v9M3 6.5 6.5 10 10 6.5M1.5 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download for Mac
            </a>

          </div>
        </div>

        {/* ─── Hero ───────────────────────────────────────────────────── */}
        <header className="hero" id="top">
          <h1 className="hero__title reveal-lines">
            <span className="line"><span className="inner">Record your screen,</span></span>
            <span className="line"><span className="inner">with a <em>studio built in.</em></span></span>
          </h1>

          <p className="hero__sub" data-reveal data-delay="1">
            A screen recorder with studio-grade audio enhancement — add music
            and effects, smooth the pointer, and let Camrico clean up your sound
            as you capture.
          </p>

          <div className="hero__actions" data-reveal data-delay="2">
            <a className="btn btn--primary" id="magneticBtn" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
              <span className="btn__dot" aria-hidden="true"></span> Download for Mac
            </a>
          </div>

          <div className="showcase" data-reveal data-delay="3" id="heroCard">
            <figure className="canvas-card">
              <video src="/assets/hero-banner.mp4" muted autoPlay loop playsInline></video>
            </figure>
          </div>

          <p className="hero__note mono" data-reveal data-delay="4">Every video on this page was made with Camrico.</p>
        </header>

        {/* ─── Capture modes ─────────────────────────────────────────── */}
        <section className="feature feature--wide" id="capture" data-announce="Capture · 4 modes" data-announce-icon="capture">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Capture</p>
            <h2 data-reveal data-delay="1">Capture exactly <em>what you need.</em></h2>
            <p className="feature__sub feature__sub--center" data-reveal data-delay="2">
              Four ways in — the whole display, one app window, a dragged-out region,
              or an iPhone mirrored over USB at native resolution.
            </p>
          </div>

          <div className="showcase" data-reveal data-delay="3">
            <figure className="canvas-card">
              <video src="/assets/capture-modes.mp4" muted autoPlay loop playsInline></video>
            </figure>
          </div>
        </section>

        {/* ─── Styling section ───────────────────────────────────────── */}
        <section className="feature feature--wide" id="styling" data-announce="Presentation styling" data-announce-icon="stage">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Presentation styling</p>
            <h2 data-reveal data-delay="1">Give every recording <em>a stage.</em></h2>
            <p className="feature__sub feature__sub--center" data-reveal data-delay="2">
              Backgrounds, framing, and shadows live right next to your timeline.
              The gradient, the rounded frame, the camera bubble — all of it is one
              checkbox, not an evening in a compositor.
            </p>
            <div className="chips chips--center" data-reveal data-delay="3">
              <span className="chip">Padding, radius, shadow &amp; inset sliders</span>
              <span className="chip">Gradient, texture, or your own image</span>
              <span className="chip">Aspect-ratio presets per destination</span>
            </div>
          </div>

          <div className="showcase" data-reveal data-delay="3">
            <figure className="canvas-card">
              <video src="/assets/canvas-styling.mp4" muted autoPlay loop playsInline></video>
            </figure>
          </div>
        </section>

        {/* ─── Cursor section ────────────────────────────────────────── */}
        <section className="feature feature--wide" id="cursor" data-announce="Cursor effects · 1.4×" data-announce-icon="cursor">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Cursor effects</p>
            <h2 data-reveal data-delay="1">Every movement, <em>easier to follow.</em></h2>
            <p className="feature__sub feature__sub--center" data-reveal data-delay="2">
              Smooth the path, size the pointer, and mark clicks — so viewers always
              know where to look. The oversized cursor below isn&rsquo;t an effect we
              added to the website. It&rsquo;s the export.
            </p>
            <div className="chips chips--center" data-reveal data-delay="3">
              <span className="chip">Path smoothing &amp; hide-when-idle</span>
              <span className="chip">Click spotlight that dims around the pointer</span>
              <span className="chip">Automatic zoom follows your actions</span>
            </div>
          </div>

          <div className="showcase" data-reveal data-delay="3">
            <figure className="canvas-card">
              <video src="/assets/cursor-effects.mp4" muted autoPlay loop playsInline></video>
            </figure>
          </div>
        </section>

        {/* ─── Layer model (sticky scroll interaction) ───────────────── */}
        <section className="layers" id="layers" data-announce="Made with Camrico" data-announce-icon="check">
          <div className="layers__pin">
            <div className="layers__center">
              <p className="eyebrow mono">In practice</p>
              <h2>Made for the videos<br /><em>you actually ship.</em></h2>
              <p className="layers__sub">
                Streamers, teachers, sales teams, and support crews —
                if it happens on a screen, Camrico makes it worth watching.
              </p>
            </div>
            {/* Photo cards. Drop the matching images into assets/people/ —
                 any missing file falls back to its pastel tint automatically. */}
            <div className="layers__field" aria-hidden="true">
              <div className="lcard" data-x="-0.52" data-y="-0.95" data-d="0" style={css({ "--tint": "#E4E9FB", "--s": "1.06" })}>
                <img src="/assets/people/streamers.jpg" alt="" />
                <span className="lcard__tag">Streaming highlights</span>
              </div>
              <div className="lcard" data-x="0.72" data-y="-0.82" data-d="0.06" style={css({ "--tint": "#DCEBFF", "--s": "0.92" })}>
                <img src="/assets/people/async-viewer.jpg" alt="" />
                <span className="lcard__tag">Async updates</span>
              </div>
              <div className="lcard" data-x="1.04" data-y="0.02" data-d="0.12" style={css({ "--tint": "#DFF6E6", "--s": "1.12" })}>
                <img src="/assets/people/sales-demo.jpg" alt="" />
                <span className="lcard__tag">Sales demos</span>
              </div>
              <div className="lcard" data-x="0.66" data-y="0.85" data-d="0.18" style={css({ "--tint": "#FFE3D6", "--s": "0.9" })}>
                <img src="/assets/people/photographer.jpg" alt="" />
                <span className="lcard__tag">Editing tutorials</span>
              </div>
              <div className="lcard" data-x="0.05" data-y="1.05" data-d="0.24" style={css({ "--tint": "#FFDCEA", "--s": "1.04" })}>
                <img src="/assets/people/podcaster.jpg" alt="" />
                <span className="lcard__tag">Voice &amp; narration</span>
              </div>
              <div className="lcard" data-x="-0.68" data-y="0.8" data-d="0.3" style={css({ "--tint": "#FFF4D9", "--s": "0.95" })}>
                <img src="/assets/people/course-creator.jpg" alt="" />
                <span className="lcard__tag">Course creators</span>
              </div>
              <div className="lcard" data-x="-1.06" data-y="-0.05" data-d="0.36" style={css({ "--tint": "#EAE4FB", "--s": "1.0" })}>
                <img src="/assets/people/team-onboarding.jpg" alt="" />
                <span className="lcard__tag">Team onboarding</span>
              </div>
              <div className="lcard" data-x="-0.88" data-y="-0.55" data-d="0.42" style={css({ "--tint": "#E0F3F1", "--s": "0.88" })}>
                <img src="/assets/people/client-walkthroughs.jpg" alt="" />
                <span className="lcard__tag">Client walkthroughs</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Editor / timeline ─────────────────────────────────────── */}
        <section className="feature feature--wide" id="editor" data-announce="Timeline · Auto zoom 2.0×" data-announce-icon="timeline">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>The editor</p>
            <h2 data-reveal data-delay="1">A timeline built for <em>screen recordings.</em></h2>
            <p className="feature__sub feature__sub--center" data-reveal data-delay="2">
              Not film production — screen production. Video, microphone and system audio,
              zoom segments, cursor, and captions each get their own track, in the same
              window you recorded in.
            </p>
          </div>

          <div className="timeline-mock" data-reveal data-delay="2" aria-hidden="true">
            <div className="timeline-mock__head mono">
              <span><span className="chrome-dot"></span> Recording 2026-07-13 at 21.58.08</span>
              <span>0:00.00 / 2:19.05 &nbsp;·&nbsp; Split · Zoom · Export</span>
            </div>
            <div className="tl-row"><span className="tl-label mono">Video</span><div className="tl-track"><i className="tl-clip tl-clip--video"></i></div></div>
            <div className="tl-row"><span className="tl-label mono">Mic</span><div className="tl-track"><i className="tl-clip tl-clip--mic"></i></div></div>
            <div className="tl-row"><span className="tl-label mono">Sys</span><div className="tl-track"><i className="tl-clip tl-clip--sys"></i></div></div>
            <div className="tl-row"><span className="tl-label mono">Zoom</span><div className="tl-track">
              <i className="tl-zoom" style={{ left: "8%", width: "14%" }}>2.0×</i>
              <i className="tl-zoom" style={{ left: "34%", width: "10%" }}>1.6×</i>
              <i className="tl-zoom" style={{ left: "58%", width: "16%" }}>2.0×</i>
              <i className="tl-zoom" style={{ left: "84%", width: "9%" }}>1.4×</i>
            </div></div>
            <div className="tl-row"><span className="tl-label mono">Caption</span><div className="tl-track">
              <i className="tl-cap" style={{ left: "12%", width: "22%" }}>Aa</i>
              <i className="tl-cap" style={{ left: "52%", width: "30%" }}>Aa</i>
            </div></div>
            <i className="tl-playhead" style={{ left: "46%" }} aria-hidden="true"></i>
          </div>

          <div className="editor-points" data-stagger>
            <div className="point"><h4>Automatic zoom</h4><p>Follows important actions and keeps the viewer focused — no keyframing, no bounce.</p></div>
            <div className="point"><h4>Layout sliders</h4><p>Padding, corner radius, shadow, and inset shape the frame while you watch.</p></div>
            <div className="point"><h4>Non-destructive</h4><p>Every edit is a layer over the raw capture. Extract the original files any time.</p></div>
          </div>
        </section>

        {/* ─── Audio ─────────────────────────────────────────────────── */}
        <section className="feature" id="audio" data-announce="Audio · −14 LUFS" data-announce-icon="audio">
          <div className="feature__copy">
            <p className="eyebrow mono" data-reveal>Audio</p>
            <h2 data-reveal data-delay="1">Sound like you <em>planned it.</em></h2>
            <p className="feature__sub" data-reveal data-delay="2">
              Your microphone and system audio record on separate tracks, so you can
              balance them after the fact. Then a local enhancement pass cleans the
              take — on this Mac, never in the cloud.
            </p>
            <div className="chips" data-reveal data-delay="3">
              <span className="chip">Noise cleanup</span>
              <span className="chip">Voice levelling</span>
              <span className="chip">Room reduction</span>
              <span className="chip">Plosive control</span>
              <span className="chip">De-essing</span>
              <span className="chip">Loudness match</span>
            </div>
          </div>

          <div className="feature__stage">
            <div className="mix-card" data-reveal data-delay="2">
              <p className="mono mix-card__title">Audio · Mix — try it</p>
              <div className="mix-row"><span>Microphone</span><input className="mix-range" type="range" min="0" max="100" defaultValue="80" aria-label="Microphone level" /><span className="mono">0.80</span></div>
              <div className="mix-row"><span>System audio</span><input className="mix-range" type="range" min="0" max="100" defaultValue="55" aria-label="System audio level" /><span className="mono">0.55</span></div>
              <div className="mix-divider"></div>
              <p className="mono mix-card__title">Voice · Studio enhance</p>
              <div className="mix-row mix-row--stat"><span>Noise floor</span><span className="mono">−61 dB</span></div>
              <div className="mix-row mix-row--stat"><span>Clarity</span><span className="mono">98%</span></div>
              <div className="mix-row mix-row--stat"><span>Loudness</span><span className="mono">−14 LUFS</span></div>
              <p className="mix-card__note mono">Runs entirely on this Mac — audio is never uploaded.</p>
            </div>
          </div>
        </section>

        {/* ─── Export ────────────────────────────────────────────────── */}
        <section className="feature feature--wide" id="export" data-announce="Export · 4K HEVC" data-announce-icon="export">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Export</p>
            <h2 data-reveal data-delay="1">Export once. <em>Publish anywhere.</em></h2>
            <p className="feature__sub feature__sub--center" data-reveal data-delay="2">
              Pick a destination and the codec, resolution, and frame rate follow.
              Estimated file size before you commit. No render farm required.
            </p>
          </div>

          <div className="presets" data-stagger role="listbox" aria-label="Export presets">
            <button className="preset is-selected" data-spec="HEVC · 3840 × 2160 · 60 fps" data-size="≈ 148 MB">
              <svg viewBox="0 0 22 16" width="22" height="16" fill="none"><rect x="1" y="1" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.2v5.6L14 8 9 5.2z" fill="currentColor"/></svg>
              <h4>YouTube</h4><p className="mono">4K · 60 · HEVC</p>
            </button>
            <button className="preset" data-spec="H.264 · 1920 × 1080 · 60 fps" data-size="≈ 62 MB">
              <svg viewBox="0 0 18 18" width="18" height="18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1.5 9h15M9 1.5c-4.6 4.8-4.6 10.2 0 15 4.6-4.8 4.6-10.2 0-15z" stroke="currentColor" strokeWidth="1.3"/></svg>
              <h4>Web</h4><p className="mono">1080p · 60 · H.264</p>
            </button>
            <button className="preset" data-spec="ProRes 422 · 3840 × 2160 · 60 fps" data-size="≈ 1.9 GB">
              <svg viewBox="0 0 20 16" width="20" height="16" fill="none"><rect x="1" y="1" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v14M15 1v14M1 5.5h4M1 10.5h4M15 5.5h4M15 10.5h4" stroke="currentColor" strokeWidth="1.2"/></svg>
              <h4>Editing</h4><p className="mono">4K · 60 · ProRes</p>
            </button>
            <button className="preset" data-spec="GIF · 960 px wide · 15 fps · loops" data-size="≈ 9 MB">
              <svg viewBox="0 0 18 18" width="18" height="18" fill="none"><path d="M15.5 9a6.5 6.5 0 1 1-2-4.7M15.5 1.5v3.2h-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h4>README GIF</h4><p className="mono">15 fps · loops</p>
            </button>
            <button className="preset" data-spec="AAC · voice track only · m4a" data-size="≈ 3 MB">
              <svg viewBox="0 0 20 16" width="20" height="16" fill="none"><path d="M2 6.5v3M6 4v8M10 1.5v13M14 5v6M18 6.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              <h4>Audio only</h4><p className="mono">voice track · m4a</p>
            </button>
          </div>
          <p className="presets__out mono" data-reveal><span id="presetSpec">HEVC · 3840 × 2160 · 60 fps</span> &nbsp;·&nbsp; <span id="presetSize" className="presets__size">≈ 148 MB</span> estimated before you export</p>
        </section>

        {/* ─── Everything else ───────────────────────────────────────── */}
        <section className="feature feature--wide" id="more">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Also in the box</p>
            <h2 data-reveal data-delay="1">The details that make it <em>complete.</em></h2>
          </div>
          <div className="grid" data-stagger>
            <div className="cell"><h4>Captions &amp; keystrokes</h4><p>Recordings transcribe in the background. Generate captions, edit the text, and show the shortcuts you press — with sensitive ones hidden.</p></div>
            <div className="cell"><h4>Camera bubble</h4><p>Drop your camera into a corner as a rounded bubble — the one you've seen in every video on this page.</p></div>
            <div className="cell"><h4>iPhone &amp; iPad mirroring</h4><p>Plug in over USB, tap “Trust This Computer”, and record the device screen at native resolution with device audio.</p></div>
            <div className="cell"><h4>Royalty-free music</h4><p>A small library of tasteful tracks with fade in/out and level control — or bring your own file.</p></div>
            <div className="cell"><h4>Projects you own</h4><p>Every project is a portable <span className="mono-inline">.screenproj</span> file. Extract the raw recordings whenever you need them.</p></div>
            <div className="cell"><h4>Private by default</h4><p>Recording, editing, and speech enhancement all run locally. Nothing leaves this Mac unless you send it.</p></div>
          </div>
        </section>

        {/* ─── Feedback + destinations ───────────────────────────────── */}
        <section className="reviews" id="reviews" data-announce="Loved by recorders" data-announce-icon="check">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Customer feedback</p>
            <h2 data-reveal data-delay="1">People press record, <em>then write us.</em></h2>
          </div>

          {/* Placeholder voices — swap for real customer quotes as they arrive. */}
          <div className="marquee" data-reveal data-delay="2">
            <div className="marquee__track">
              <div className="marquee__group">
                <figure className="rcard"><blockquote>Cut my demo-video time from an afternoon to twenty minutes. The auto zoom alone is worth it.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#DCEBFF" })}>MK</span><span><b>Maya K.</b><i>Product designer</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>First screen recorder where my voice doesn't sound like a phone call from 2009.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#DFF6E6" })}>TR</span><span><b>Tomas R.</b><i>Course creator</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Our changelog videos went from skipped to watched-to-the-end. Viewers notice the polish.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFE3D6" })}>PS</span><span><b>Priya S.</b><i>Developer advocate</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>I dragged one slider and my messy capture looked like a keynote. Sold.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#EAE4FB" })}>JB</span><span><b>Jon B.</b><i>Indie founder</i></span></figcaption></figure>
              </div>
              <div className="marquee__group" aria-hidden="true">
                <figure className="rcard"><blockquote>Cut my demo-video time from an afternoon to twenty minutes. The auto zoom alone is worth it.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#DCEBFF" })}>MK</span><span><b>Maya K.</b><i>Product designer</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>First screen recorder where my voice doesn't sound like a phone call from 2009.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#DFF6E6" })}>TR</span><span><b>Tomas R.</b><i>Course creator</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Our changelog videos went from skipped to watched-to-the-end. Viewers notice the polish.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFE3D6" })}>PS</span><span><b>Priya S.</b><i>Developer advocate</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>I dragged one slider and my messy capture looked like a keynote. Sold.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#EAE4FB" })}>JB</span><span><b>Jon B.</b><i>Indie founder</i></span></figcaption></figure>
              </div>
            </div>
          </div>
          <div className="marquee marquee--reverse" data-reveal data-delay="3">
            <div className="marquee__track">
              <div className="marquee__group">
                <figure className="rcard"><blockquote>The GIF export lives in every README we ship now.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFF4D9" })}>AM</span><span><b>Alex M.</b><i>Open-source maintainer</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Recorded Monday, tutorial series live Wednesday. It removes every excuse.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFDCEA" })}>SL</span><span><b>Sara L.</b><i>YouTube educator</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Support replies with a 40-second video beat three paragraphs of steps, every time.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#E0F3F1" })}>DN</span><span><b>Dev N.</b><i>Support lead</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>My sales walkthroughs finally look like the product deserves. Prospects reply now.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#E4E9FB" })}>RG</span><span><b>Rhea G.</b><i>Account executive</i></span></figcaption></figure>
              </div>
              <div className="marquee__group" aria-hidden="true">
                <figure className="rcard"><blockquote>The GIF export lives in every README we ship now.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFF4D9" })}>AM</span><span><b>Alex M.</b><i>Open-source maintainer</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Recorded Monday, tutorial series live Wednesday. It removes every excuse.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#FFDCEA" })}>SL</span><span><b>Sara L.</b><i>YouTube educator</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>Support replies with a 40-second video beat three paragraphs of steps, every time.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#E0F3F1" })}>DN</span><span><b>Dev N.</b><i>Support lead</i></span></figcaption></figure>
                <figure className="rcard"><blockquote>My sales walkthroughs finally look like the product deserves. Prospects reply now.</blockquote><figcaption><span className="rcard__ava" style={css({ "--tint": "#E4E9FB" })}>RG</span><span><b>Rhea G.</b><i>Account executive</i></span></figcaption></figure>
              </div>
            </div>
          </div>

          <p className="stack__label mono" data-reveal>Exports land straight in</p>
          <div className="stack" data-reveal data-delay="1">
            <span className="stack__item">
              <svg viewBox="0 0 24 17" width="24" height="17" fill="none"><rect x="0.5" y="0.5" width="23" height="16" rx="4.5" fill="currentColor"/><path d="M9.8 5.2v6.6L15.6 8.5 9.8 5.2z" fill="#faf8f4"/></svg>
              YouTube</span>
            <span className="stack__item stack__item--wordmark">vimeo</span>
            <span className="stack__item">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><rect x="8.2" y="1" width="3.6" height="8.2" rx="1.8"/><rect x="8.2" y="10.8" width="3.6" height="8.2" rx="1.8"/><rect x="1" y="8.2" width="8.2" height="3.6" rx="1.8"/><rect x="10.8" y="8.2" width="8.2" height="3.6" rx="1.8"/></svg>
              Slack</span>
            <span className="stack__item">
              <svg viewBox="0 0 18 18" width="17" height="17" fill="none"><rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M5.5 13V5.4l7 7.6V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Notion</span>
            <span className="stack__item">
              <svg viewBox="0 0 18 18" width="17" height="17" fill="none"><path d="M9 1.5a7.5 7.5 0 0 0-2.4 14.6c.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-.9-2.5-.9-.4-.9-.9-1.1-.9-1.1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.7-.2-3.4-.8-3.4-3.7 0-.8.3-1.5.8-2-.1-.2-.3-1 .1-2 0 0 .6-.2 2 .8a7 7 0 0 1 3.8 0c1.4-1 2-.8 2-.8.4 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 2.9-1.7 3.5-3.4 3.7.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4A7.5 7.5 0 0 0 9 1.5z" fill="currentColor"/></svg>
              GitHub</span>
            <span className="stack__item"><b className="stack__badge">Pr</b> Premiere Pro</span>
            <span className="stack__item"><b className="stack__badge stack__badge--fc">FC</b> Final Cut Pro</span>
          </div>
        </section>

        {/* ─── Pricing ───────────────────────────────────────────────── */}
        <section className="feature feature--wide" id="pricing" data-announce="Pricing · one-time" data-announce-icon="check">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>Pricing</p>
            <h2 data-reveal data-delay="1">Simple to start. <em>Yours to keep.</em></h2>
          </div>
          <div className="plans" data-stagger>
            <div className="plan">
              <p className="mono plan__tag">Free trial</p>
              <p className="plan__price">Free</p>
              <ul className="ticks">
                <li>Full editor access</li>
                <li>All capture modes</li>
                <li>Watermarked exports</li>
                <li>No account required</li>
              </ul>
            </div>
            <div className="plan plan--hot">
              <p className="mono plan__tag">One-time licence</p>
              <p className="plan__price">$TBD <span className="mono">one-time</span></p>
              <ul className="ticks">
                <li>Every capture mode, up to 4K</li>
                <li>Automatic zoom &amp; cursor effects</li>
                <li>Speech enhancement &amp; captions</li>
                <li>All export formats and presets</li>
              </ul>
            </div>
          </div>
          <p className="plans__note mono" data-reveal>Prices are placeholders until the model is confirmed. No subscription planned.</p>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────────── */}
        <section className="faq" id="faq">
          <div className="feature__copy feature__copy--center">
            <p className="eyebrow mono" data-reveal>FAQ</p>
            <h2 data-reveal data-delay="1">Questions, <em>answered.</em></h2>
          </div>
          <div className="faq__list" data-reveal data-delay="2">
            <details>
              <summary>Does it record system audio?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>Yes. You can capture system audio and your microphone together — each lands on its own track, so you balance the two levels in the editor afterwards.</p>
            </details>
            <details>
              <summary>Can I record a specific window or area?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>Both. Window mode lists every open window with live thumbnails; Area mode lets you drag out a precise region with pixel dimensions shown as you drag.</p>
            </details>
            <details>
              <summary>Can I record an iPhone or iPad?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>Connect the device with a USB cable, unlock it, and tap “Trust This Computer”. Camrico mirrors the screen at native resolution and can record device audio too.</p>
            </details>
            <details>
              <summary>Does it support 4K and my camera?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>Record in 1080p or 4K at up to 60 fps, and optionally include any connected camera as a floating bubble you can reposition in the editor.</p>
            </details>
            <details>
              <summary>Does it work offline?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>Completely. Recording, editing, speech enhancement, and export all run on your Mac. Nothing is uploaded, ever — you decide if and when a file is shared.</p>
            </details>
            <details>
              <summary>Which Macs are supported?<span className="faq__x" aria-hidden="true"></span></summary>
              <p>macOS 14 Sonoma or later, on Apple Silicon and Intel. (Compatibility details are placeholders until release.)</p>
            </details>
          </div>
        </section>

        {/* ─── Download ──────────────────────────────────────────────── */}
        <div className="outro">
        <section className="download" id="download" data-announce="Saved · Camrico.dmg" data-announce-icon="check">
          <h2 className="download__title reveal-lines">
            <span className="line"><span className="inner">Make your next recording</span></span>
            <span className="line"><span className="inner"><em>worth watching.</em></span></span>
          </h2>
          <p className="download__sub" data-reveal data-delay="1">Capture, polish, and publish from one focused macOS&nbsp;app.</p>
          <div className="hero__actions" data-reveal data-delay="2">
            <a className="btn btn--primary" href="https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg">
              <span className="btn__dot" aria-hidden="true"></span> Download for Mac
            </a>
          </div>
          <p className="download__meta mono" data-reveal data-delay="3">macOS 14 Sonoma or later · Universal · 10 MB</p>
        </section>

        <footer className="footer mono">
          © 2026 Camrico · A concept marketing site — not affiliated with Apple.
        </footer>
        </div>

    </>
  );
}
