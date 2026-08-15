import { cn } from "@/lib/utils";

/**
 * Believable, art-directed stand-ins for "the app being recorded".
 * Four distinct, original UIs (no third-party branding) so the recorded
 * content never looks like the same grey mock twice.
 *
 * Each variant places `data-target="cta"` on a prominent element in the
 * lower-right so the auto-zoom / cursor demos still have a real thing to
 * lock onto.
 */
export type AppVariant = "analytics" | "editor" | "calendar" | "inbox";

export function AppScene({
  variant = "analytics",
  className,
}: {
  variant?: AppVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-full w-full overflow-hidden text-left", className)}
    >
      {variant === "analytics" && <Analytics />}
      {variant === "editor" && <Editor />}
      {variant === "calendar" && <Calendar />}
      {variant === "inbox" && <Inbox />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics — a light SaaS dashboard with a real chart + KPI deltas  */
/* ------------------------------------------------------------------ */

function Analytics() {
  const kpis = [
    { label: "Revenue", value: "$48.2k", delta: "+12%", up: true },
    { label: "Signups", value: "1,284", delta: "+8%", up: true },
    { label: "Churn", value: "2.1%", delta: "-0.4%", up: true },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-[#f7f8fb] p-[4%] text-[#1a1d24]">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-[5px] bg-[#4f46e5]" />
          <span className="text-[10px] font-semibold tracking-tight">Overview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden rounded-full bg-[#eceef4] px-2 py-0.5 text-[8px] font-medium text-[#6b7280] sm:inline">
            Last 30 days
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4f46e5] text-[8px] font-bold text-white">
            JD
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="mt-[3%] grid grid-cols-3 gap-[3%]">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-[#eceef4] bg-white p-[7%] shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
          >
            <p className="text-[8px] font-medium text-[#6b7280]">{k.label}</p>
            <p className="mt-1 text-[13px] font-semibold leading-none tracking-tight">
              {k.value}
            </p>
            <p className="mt-1 flex items-center gap-0.5 text-[8px] font-semibold text-[#16a34a]">
              <svg viewBox="0 0 8 8" className="h-1.5 w-1.5">
                <path d="M4 1l3 4H1z" fill="currentColor" />
              </svg>
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mt-[3%] flex-1 rounded-lg border border-[#eceef4] bg-white p-[4%]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[9px] font-semibold">Weekly revenue</span>
          <div className="flex items-center gap-2 text-[7px] text-[#6b7280]">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]" /> This week
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7d2fe]" /> Last week
            </span>
          </div>
        </div>
        <svg viewBox="0 0 300 96" preserveAspectRatio="none" className="h-[76%] w-full">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,64 C40,58 55,40 75,44 C110,52 130,22 150,30 C185,44 205,14 225,20 C255,28 275,10 300,16 L300,96 L0,96 Z"
            fill="url(#areaFill)"
          />
          <path
            d="M0,74 C40,70 55,60 75,62 C110,66 130,50 150,54 C185,62 205,44 225,48 C255,54 275,42 300,46"
            fill="none"
            stroke="#c7d2fe"
            strokeWidth="2"
          />
          <path
            d="M0,64 C40,58 55,40 75,44 C110,52 130,22 150,30 C185,44 205,14 225,20 C255,28 275,10 300,16"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* footer action */}
      <div className="mt-[3%] flex items-center justify-between">
        <span className="text-[8px] text-[#6b7280]">Updated just now</span>
        <span
          data-target="cta"
          className="rounded-md bg-[#4f46e5] px-3 py-1 text-[9px] font-semibold text-white shadow-[0_1px_2px_rgba(79,70,229,0.4)]"
        >
          Share report
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Editor — a dark code editor with syntax coloring + Run button      */
/* ------------------------------------------------------------------ */

function Editor() {
  const line = (n: number, children: React.ReactNode, indent = 0) => (
    <div key={n} className="flex gap-2 whitespace-pre">
      <span className="w-4 shrink-0 select-none text-right text-[#4b5263]">{n}</span>
      <span style={{ paddingLeft: indent * 10 }}>{children}</span>
    </div>
  );
  return (
    <div className="flex h-full w-full bg-[#16171e] font-mono text-[9px] leading-[1.8] text-[#c7c9d1]">
      {/* sidebar */}
      <div className="hidden w-1/5 max-w-[96px] flex-col gap-1.5 border-r border-white/5 bg-[#12131a] p-2.5 sm:flex">
        <span className="mb-1 text-[7px] uppercase tracking-wider text-[#4b5263]">
          Explorer
        </span>
        {["app.tsx", "record.ts", "zoom.ts", "utils.ts"].map((f, i) => (
          <span
            key={f}
            className={i === 0 ? "text-[#82aaff]" : "text-[#6b7280]"}
          >
            {f}
          </span>
        ))}
      </div>

      {/* main */}
      <div className="flex flex-1 flex-col">
        {/* tab bar */}
        <div className="flex items-center gap-0 border-b border-white/5 bg-[#12131a] text-[8px]">
          <span className="border-r border-white/5 bg-[#16171e] px-2.5 py-1.5 text-[#e6e6e6]">
            record.ts
          </span>
          <span className="px-2.5 py-1.5 text-[#6b7280]">zoom.ts</span>
        </div>

        {/* code */}
        <div className="flex-1 overflow-hidden p-2.5">
          {line(1, <><span className="text-[#c792ea]">export function</span> <span className="text-[#82aaff]">startRecording</span>() {"{"}</>)}
          {line(2, <><span className="text-[#c792ea]">const</span> stream = <span className="text-[#c792ea]">await</span> capture(<span className="text-[#f78c6c]">"4K"</span>)</>, 1)}
          {line(3, <><span className="text-[#6b7280]">{"// auto-zoom follows the cursor"}</span></>, 1)}
          {line(4, <><span className="text-[#82aaff]">track</span>.zoomTo(target, {"{"} level: <span className="text-[#f78c6c]">2.0</span> {"}"})</>, 1)}
          {line(5, <><span className="text-[#c792ea]">return</span> stream.<span className="text-[#82aaff]">render</span>()</>, 1)}
          {line(6, <>{"}"}</>)}
        </div>

        {/* status bar + run */}
        <div className="flex items-center justify-between border-t border-white/5 bg-[#12131a] px-2.5 py-1.5">
          <span className="text-[8px] text-[#4b5263]">TypeScript · Ln 4</span>
          <span
            data-target="cta"
            className="flex items-center gap-1 rounded bg-[#2ea043] px-2.5 py-1 text-[8px] font-semibold text-white"
          >
            <svg viewBox="0 0 8 8" className="h-2 w-2">
              <path d="M1 1l6 3-6 3z" fill="currentColor" />
            </svg>
            Run
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar — a light week view with coloured event blocks            */
/* ------------------------------------------------------------------ */

function Calendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const events = [
    { col: 0, top: "8%", h: "22%", c: "#4f46e5", t: "Standup" },
    { col: 1, top: "34%", h: "30%", c: "#0d9488", t: "Design review" },
    { col: 2, top: "14%", h: "26%", c: "#d97706", t: "1:1" },
    { col: 3, top: "44%", h: "34%", c: "#4f46e5", t: "Demo record" },
    { col: 4, top: "20%", h: "20%", c: "#be185d", t: "Ship" },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white p-[4%] text-[#1a1d24]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-tight">July 2026</span>
        <div className="flex items-center gap-1 text-[#6b7280]">
          <span className="flex h-4 w-4 items-center justify-center rounded border border-[#eceef4] text-[9px]">
            ‹
          </span>
          <span className="flex h-4 w-4 items-center justify-center rounded border border-[#eceef4] text-[9px]">
            ›
          </span>
        </div>
      </div>

      <div className="mt-[3%] grid flex-1 grid-cols-5 gap-[2%]">
        {days.map((d, col) => (
          <div key={d} className="flex flex-col">
            <span className="mb-1 text-center text-[8px] font-medium text-[#6b7280]">
              {d} <span className="text-[#1a1d24]">{13 + col}</span>
            </span>
            <div className="relative flex-1 rounded-md bg-[#f7f8fb]">
              {events
                .filter((e) => e.col === col)
                .map((e) => (
                  <span
                    key={e.t}
                    className="absolute inset-x-[6%] flex items-start rounded p-1 text-[7px] font-semibold leading-tight text-white"
                    style={{ top: e.top, height: e.h, background: e.c }}
                  >
                    {e.t}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[3%] flex items-center justify-between">
        <span className="text-[8px] text-[#6b7280]">5 events this week</span>
        <span
          data-target="cta"
          className="rounded-md bg-[#4f46e5] px-3 py-1 text-[9px] font-semibold text-white"
        >
          + New event
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inbox — a light mail list with avatars + compose button            */
/* ------------------------------------------------------------------ */

function Inbox() {
  const mail = [
    { i: "AR", c: "#4f46e5", n: "Ana Reyes", s: "Re: launch video draft", t: "9:24", unread: true },
    { i: "TK", c: "#0d9488", n: "Tomo Koike", s: "Captions look great", t: "8:10", unread: true },
    { i: "MC", c: "#d97706", n: "Mara Cole", s: "Export preset for the blog", t: "Tue", unread: false },
    { i: "SL", c: "#be185d", n: "Sam Lund", s: "Feedback on the zoom pacing", t: "Mon", unread: false },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#1a1d24]">
      <div className="flex items-center justify-between border-b border-[#eceef4] px-[4%] py-[3%]">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold">
          Inbox
          <span className="rounded-full bg-[#4f46e5] px-1.5 py-px text-[7px] font-bold text-white">
            2
          </span>
        </span>
        <span className="text-[9px] text-[#6b7280]">Today</span>
      </div>

      <div className="flex-1 divide-y divide-[#f0f1f5]">
        {mail.map((m) => (
          <div key={m.i} className="flex items-center gap-2 px-[4%] py-[2.6%]">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
              style={{ background: m.c }}
            >
              {m.i}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "truncate text-[9px]",
                    m.unread ? "font-semibold" : "font-medium text-[#374151]"
                  )}
                >
                  {m.n}
                </span>
                {m.unread ? (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f46e5]" />
                ) : null}
              </span>
              <span className="block truncate text-[8px] text-[#6b7280]">{m.s}</span>
            </span>
            <span className="shrink-0 text-[7px] text-[#9ca3af]">{m.t}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end border-t border-[#eceef4] px-[4%] py-[3%]">
        <span
          data-target="cta"
          className="flex items-center gap-1 rounded-md bg-[#4f46e5] px-3 py-1 text-[9px] font-semibold text-white"
        >
          Compose
        </span>
      </div>
    </div>
  );
}
