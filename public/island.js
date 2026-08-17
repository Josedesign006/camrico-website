/* ── Camrico Island — one pill, five states ─────────────────────── */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Next.js port: run load-dependent setup even if `load` already fired,
     and restore the `muted` attribute React SSR drops from <video>. */
  const onLoaded = (fn) =>
    document.readyState === "complete" ? fn() : addEventListener("load", fn);
  document.querySelectorAll("video[autoplay]").forEach((v) => {
    v.muted = true;
    if (v.play) v.play().catch(() => {});
  });

  const island = document.getElementById("island");
  const recTime = document.getElementById("recTime");
  const menuTime = document.getElementById("menuTime");
  const announceEl = document.getElementById("announce");
  const chapLabel = document.getElementById("chapLabel");
  const chapCount = document.getElementById("chapCount");
  const trackEl = document.getElementById("track");
  const trackFill = document.getElementById("trackFill");
  const trackHead = document.getElementById("trackHead");
  const menuEl = document.getElementById("menu");
  const dlLayer = document.getElementById("dlLayer");

  /* widths for each state (announce measured dynamically) */
  const WIDTHS = { rec: 584, cta: 210, dl: 332 };
  const PAGE_DURATION = 139; // the page "runs" 2:19, like the editor demo

  /* page chapters, in order */
  const CHAPTERS = [
    { id: "capture", label: "Capture" },
    { id: "styling", label: "Styling" },
    { id: "cursor", label: "Cursor" },
    { id: "editor", label: "Editor" },
    { id: "audio", label: "Audio" },
    { id: "export", label: "Export" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "download", label: "Download" },
  ].map((c) => ({ ...c, el: document.getElementById(c.id), top: 0, frac: 0 }));
  const pad = (n) => String(n).padStart(2, "0");

  function measureChapters() {
    const span = document.documentElement.scrollHeight - innerHeight;
    for (const c of CHAPTERS) {
      /* rect-based: immune to positioned ancestors (offsetTop is not) */
      c.top = c.el.getBoundingClientRect().top + scrollY;
      c.frac = Math.min(0.97, Math.max(0.03, c.top / (span > 1 ? span : 1)));
    }
  }
  /* chapter ticks on the scrubber */
  const ticks = CHAPTERS.map(() => {
    const b = document.createElement("b");
    trackEl.appendChild(b);
    return b;
  });
  function layoutTicks() {
    measureChapters();
    CHAPTERS.forEach((c, i) => (ticks[i].style.left = c.frac * 100 + "%"));
  }

  const ICONS = {
    stage:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="2.5" stroke="currentColor" stroke-width="1.4"/><rect x="4" y="5" width="6" height="4" rx="1.2" fill="currentColor" opacity=".55"/></svg>',
    cursor:
      '<svg width="13" height="14" viewBox="0 0 11 12" fill="none"><path d="M1 1l3.5 9.5L6 7l3.5-1.5L1 1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    check:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.4" opacity=".5"/><path d="M4.4 7.2l1.8 1.8 3.4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    capture:
      '<svg width="15" height="13" viewBox="0 0 15 13" fill="none"><rect x="1" y="1" width="13" height="9" rx="1.6" stroke="currentColor" stroke-width="1.4"/><path d="M5 12h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    timeline:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11M1.5 7h7M1.5 10.5h9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    audio:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 7h1.4l1.6-3.4 2 6.8 1.8-5.2 1.3 1.8h2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    export:
      '<svg width="13" height="14" viewBox="0 0 13 14" fill="none"><path d="M6.5 9V1M3.5 4 6.5 1l3 3M1.5 12.5h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  /* capture-mode copy for the recorder mock */
  const MODES = {
    screen: {
      title: "The whole display",
      text: "Capture everything on your Mac in 1080p or 4K, with your microphone and system audio recorded on separate tracks.",
      hint: "Multi-display aware · menu bar & dock included",
    },
    window: {
      title: "One app, no clutter",
      text: "Pick any open window from a live-thumbnail grid. The recording stays locked to it, even when you move other things around.",
      hint: "Live thumbnails · searchable window list",
    },
    area: {
      title: "A precise region",
      text: "Drag to select exactly the pixels that matter. Dimensions and position show as you drag, so 781 × 707 means 781 × 707.",
      hint: "Pixel-exact · press ESC to cancel capture",
    },
    iphone: {
      title: "A connected iPhone or iPad",
      text: "Plug in with USB, unlock, and tap “Trust This Computer”. The device screen mirrors at native resolution — device audio included.",
      hint: "Native resolution · device audio toggle",
    },
  };

  let state = "boot";
  let baseState = "bar"; // what announce falls back to: bar | rec | cta
  let announceTimer = null;

  function setState(next, width) {
    state = next;
    island.dataset.state = next;
    /* bar/boot widths come from CSS; pill states use --w */
    if (next !== "bar" && next !== "boot") {
      island.style.setProperty("--w", (width ?? WIDTHS[next]) + "px");
    }
  }

  /* ── boot: glass bar slides in ── */
  setTimeout(() => setState("bar"), reduceMotion ? 0 : 180);

  /* ── scroll: timer, scrubber, chapter readout, state switching ── */
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  let chapIdx = -2; // -1 = intro, 0.. = chapter index
  function setChapter(idx) {
    if (idx === chapIdx) return;
    chapIdx = idx;
    const label = idx < 0 ? "Intro" : CHAPTERS[idx].label;
    const count = idx < 0 ? `— / ${pad(CHAPTERS.length)}` : `${pad(idx + 1)} / ${pad(CHAPTERS.length)}`;
    if (reduceMotion) {
      chapLabel.textContent = label;
      chapCount.textContent = count;
      return;
    }
    chapLabel.classList.add("swap");
    setTimeout(() => {
      chapLabel.textContent = label;
      chapCount.textContent = count;
      chapLabel.classList.remove("swap");
    }, 150);
  }

  function onScroll() {
    {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const t = fmt(p * PAGE_DURATION);
      recTime.textContent = t;
      menuTime.textContent = t;

      /* scrubber */
      trackFill.style.width = p * 100 + "%";
      trackHead.style.left = p * 100 + "%";
      CHAPTERS.forEach((c, i) => ticks[i].classList.toggle("done", p >= c.frac));

      /* current chapter = last one whose top has crossed the upper third */
      const ref = scrollY + innerHeight * 0.35;
      let idx = -1;
      for (let i = 0; i < CHAPTERS.length; i++) if (ref >= CHAPTERS[i].top) idx = i;
      setChapter(idx);

      const next = p > 0.94 ? "cta" : scrollY > innerHeight * 0.45 ? "rec" : "bar";
      baseState = next;
      if (state !== "announce" && state !== "boot" && state !== "menu" && state !== "dl" && state !== next)
        setState(next);
    }
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", layoutTicks, { passive: true });
  onLoaded(() => {
    layoutTicks();
    onScroll();
    /* late layout shifts (videos/fonts) move section offsets */
    setTimeout(layoutTicks, 1200);
  });
  layoutTicks();

  /* ── section announcements (only while in recording mode) ── */
  function announce(text, icon) {
    if (reduceMotion || baseState !== "rec" || state === "menu" || state === "dl") return;
    clearTimeout(announceTimer);
    announceEl.innerHTML =
      `<span class="a-red">${ICONS[icon] || ""}</span><span>${text}</span>`;
    /* measure content, then morph wide */
    const w = Math.max(200, Math.ceil(announceEl.scrollWidth) + 48);
    setState("announce", w);
    announceTimer = setTimeout(() => {
      if (state === "announce") setState(baseState);
    }, 1700);
  }

  const seen = new Set();
  const announceIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || seen.has(e.target)) continue;
        seen.add(e.target); // announce each section once per visit
        announce(e.target.dataset.announce, e.target.dataset.announceIcon);
      }
    },
    { threshold: 0.35 }
  );
  document.querySelectorAll("[data-announce]").forEach((el) => announceIO.observe(el));

  /* ── expanded chapter menu ── */
  const menuChips = document.getElementById("menuChips");
  const copyBtn = document.getElementById("copyLink");
  const copyText = document.getElementById("copyText");

  CHAPTERS.forEach((c, i) => {
    const b = document.createElement("button");
    b.innerHTML = `<span class="n">${pad(i + 1)}</span>${c.label}`;
    b.addEventListener("click", () => {
      closeMenu();
      c.el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
    menuChips.appendChild(b);
  });
  const chips = [...menuChips.children];

  function openMenu() {
    if (state !== "rec") return;
    chips.forEach((chip, i) => chip.classList.toggle("is-now", i === chapIdx));
    copyText.textContent = `Copy link${chapIdx >= 0 ? " to " + CHAPTERS[chapIdx].label : ""}`;
    const targetW = Math.min(560, innerWidth - 32);
    menuEl.style.width = targetW + "px"; /* measure wrap at final width */
    setState("menu", targetW);
    island.style.height = menuEl.offsetHeight + "px";
  }
  function closeMenu(toState) {
    if (state !== "menu") return;
    island.style.height = "";
    menuEl.style.width = "";
    setState(toState || baseState);
  }
  document.getElementById("recBtn").addEventListener("click", openMenu);
  document.getElementById("menuClose").addEventListener("click", () => closeMenu());
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => {
    if (state === "menu" && !island.contains(e.target)) closeMenu();
  });

  copyBtn.addEventListener("click", () => {
    const hash = chapIdx >= 0 ? "#" + CHAPTERS[chapIdx].id : "";
    const url = location.origin + location.pathname + hash;
    const done = () => {
      copyText.textContent = "Copied ✓";
      setTimeout(() => {
        copyText.textContent = `Copy link${chapIdx >= 0 ? " to " + CHAPTERS[chapIdx].label : ""}`;
      }, 1400);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(done, done);
    else done();
  });

  /* ── download feedback ── */
  let dlT1, dlT2;
  function showDownloadFeedback() {
    if (state === "menu") closeMenu();
    clearTimeout(dlT1);
    clearTimeout(dlT2);
    dlLayer.classList.add("is-loading");
    dlLayer.innerHTML =
      '<svg width="12" height="14" viewBox="0 0 13 15" fill="none"><path d="M6.5 1v9M3 6.5 6.5 10 10 6.5M1.5 13h10" stroke="#ff9a9d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "<span>Downloading Camrico.dmg…</span>";
    setState("dl", WIDTHS.dl);
    dlT1 = setTimeout(() => {
      dlLayer.classList.remove("is-loading");
      dlLayer.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#37d86b" stroke-width="1.4" opacity=".5"/><path d="M4.4 7.2l1.8 1.8 3.4-4" stroke="#37d86b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span class="ok">Saved to Downloads</span>';
      setState("dl", 252);
    }, reduceMotion ? 400 : 2000);
    dlT2 = setTimeout(() => {
      if (state === "dl") setState(baseState);
    }, reduceMotion ? 1200 : 3900);
  }
  document.querySelectorAll('a[href$="Camrico.dmg"]').forEach((a) =>
    a.addEventListener("click", showDownloadFeedback)
  );

  /* ── layer-model cluster: scroll-scrubbed orbit ── */
  const layersSection = document.getElementById("layers");
  if (layersSection) {
    const cards = [...layersSection.querySelectorAll(".lcard")];
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (t) => Math.max(0, Math.min(1, t));
    let target = 0, current = reduceMotion ? 1 : 0;

    /* Tedy-style: each card zooms in from huge & transparent, settling into
       its scattered spot on its own staggered window of the scrub.
       Landing spots are clamped so every card + label stays fully inside the
       pinned viewport (below the island, above the fold) at any size. */
    const apply = (p) => {
      const baseX = Math.min(560, innerWidth * 0.42);
      const baseY = Math.min(330, innerHeight * 0.36);
      for (const card of cards) {
        const dx = parseFloat(card.dataset.x);
        const dy = parseFloat(card.dataset.y);
        const d = parseFloat(card.dataset.d);
        const half = (150 * (parseFloat(card.style.getPropertyValue("--s")) || 1)) / 2;

        const limX = Math.max(60, innerWidth / 2 - half - 40);
        const limTop = Math.max(60, innerHeight / 2 - half - 88); /* island clearance */
        const limBot = Math.max(60, innerHeight / 2 - half - 48); /* label overhang */
        const tx = Math.max(-limX, Math.min(limX, dx * baseX));
        const ty = Math.max(-limTop, Math.min(limBot, dy * baseY));

        const local = clamp01((p - d) / 0.55);
        const e = easeOutCubic(local);
        const x = tx * (0.45 + 0.55 * e);
        const y = ty * (0.45 + 0.55 * e);
        const scale = 2.6 - 1.6 * e;
        card.style.transform =
          `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        card.style.opacity = clamp01(local * 2.8);
        card.style.setProperty("--tag-o", clamp01((local - 0.7) * 3.5));
      }
    };

    if (reduceMotion) {
      apply(1);
    } else {
      const measure = () => {
        const rect = layersSection.getBoundingClientRect();
        const span = rect.height - innerHeight;
        target = Math.max(0, Math.min(1, -rect.top / (span > 1 ? span : 1)));
      };
      addEventListener("scroll", measure, { passive: true });
      addEventListener("resize", measure, { passive: true });
      measure();
      (function layersTick() {
        requestAnimationFrame(layersTick);
        if (Math.abs(target - current) < 0.001) return;
        current += (target - current) * 0.09;
        apply(current);
      })();
      apply(0);
    }
  }

  /* ── recorder mock: capture-mode tabs ── */
  const modeDesc = document.getElementById("modeDesc");
  if (modeDesc) {
    const tabs = document.querySelectorAll(".recorder__tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const mode = MODES[tab.dataset.mode];
        if (!mode || tab.classList.contains("is-active")) return;
        tabs.forEach((t) => {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        modeDesc.classList.add("is-switching");
        setTimeout(() => {
          document.getElementById("modeTitle").textContent = mode.title;
          document.getElementById("modeText").textContent = mode.text;
          document.getElementById("modeHint").textContent = mode.hint;
          document.getElementById("modeFig").dataset.mode = tab.dataset.mode;
          modeDesc.classList.remove("is-switching");
        }, reduceMotion ? 0 : 200);
      });
    });
  }

  /* ── audio mixer: live sliders ── */
  document.querySelectorAll(".mix-range").forEach((range) => {
    range.addEventListener("input", () => {
      range.nextElementSibling.textContent = (range.value / 100).toFixed(2);
    });
  });

  /* ── export presets: pick a destination, specs follow ── */
  const presetSpec = document.getElementById("presetSpec");
  const presetSize = document.getElementById("presetSize");
  if (presetSpec) {
    const presets = [...document.querySelectorAll(".preset")];
    presets.forEach((p) => {
      p.addEventListener("click", () => {
        presets.forEach((q) => q.classList.toggle("is-selected", q === p));
        presetSpec.textContent = p.dataset.spec;
        presetSize.textContent = p.dataset.size;
      });
    });
  }

  /* ── magnetic primary button (hero) ── */
  const mag = document.getElementById("magneticBtn");
  if (mag && !reduceMotion && matchMedia("(hover: hover)").matches) {
    mag.addEventListener("mousemove", (e) => {
      const r = mag.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      mag.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    mag.addEventListener("mouseleave", () => (mag.style.transform = ""));
  }

  /* ── smooth-scroll for island + in-page links ── */
  document.querySelectorAll("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ── scroll reveals ── */
  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealIO.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  document.querySelectorAll("[data-reveal], .reveal-lines, [data-stagger]").forEach((el) => revealIO.observe(el));

  /* hero lines reveal immediately after boot */
  onLoaded(() => {
    document.querySelectorAll(".hero [data-reveal], .hero .reveal-lines").forEach((el) =>
      el.classList.add("is-visible")
    );
  });
})();
