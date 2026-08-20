"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { gaisRound18Report as report } from "@/lib/gaisRound18UpcomingData";

const HIF_GREEN = "#006633";
const GAIS_MUTED = "#8a9096";
const GAIS_ACCENT = "#c4a035";

type ViewMode = "mobile" | "desktop" | "bigscreen";

const MATCH_KICKOFF = new Date("2026-08-23T14:30:00Z"); // 16:30 Stockholm (CEST)

function rankToScore(rank: number, total = 16) {
  return ((total - rank + 1) / total) * 100;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs, done: diff === 0 };
}

function StripeDivider() {
  return (
    <div
      className="my-2 h-3 w-full"
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 14px, #ffffff 14px 28px)`,
        opacity: 0.85,
      }}
      aria-hidden
    />
  );
}

function SectionShell({
  num,
  eyebrow,
  title,
  children,
  mode,
}: {
  num: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  mode: ViewMode;
}) {
  const pad = mode === "bigscreen" ? "px-10 py-16 lg:px-20 lg:py-20" : mode === "desktop" ? "px-8 py-14" : "px-4 py-10";
  const titleSize =
    mode === "bigscreen"
      ? "text-4xl md:text-6xl lg:text-7xl"
      : mode === "desktop"
        ? "text-3xl md:text-5xl"
        : "text-2xl";
  return (
    <section className={`relative ${pad}`}>
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-end gap-4 md:gap-6">
          <span
            className="font-[family-name:var(--font-podcast-display)] text-6xl font-black leading-none tabular-nums text-white/10 md:text-8xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            {num}
          </span>
          <div className="min-w-0 flex-1 pb-2">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: HIF_GREEN }}>
              {eyebrow}
            </p>
            <h2
              className={`mt-1 font-[family-name:var(--font-podcast-display)] font-black uppercase leading-[0.95] text-white ${titleSize}`}
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h2>
          </div>
        </div>
        <StripeDivider />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function FormPips({ results, label }: { results: ("W" | "D" | "L")[]; label: string }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">{label}</p>
      <div className="flex gap-1.5">
        {results.map((r, i) => (
          <div
            key={`${r}-${i}`}
            className="h-10 w-3 rounded-sm md:h-14 md:w-4"
            style={{
              background:
                r === "W" ? HIF_GREEN : r === "D" ? "#6b7280" : "#3f3f46",
              opacity: r === "L" ? 0.7 : 1,
            }}
            title={r}
          />
        ))}
      </div>
    </div>
  );
}

const SV_MONTHS_SHORT = [
  "jan",
  "feb",
  "mar",
  "apr",
  "maj",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];

function formatMeetingDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${d.getUTCDate()} ${SV_MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function outcomeToPip(outcome: "win" | "draw" | "loss"): "W" | "D" | "L" {
  if (outcome === "win") return "W";
  if (outcome === "draw") return "D";
  return "L";
}

function H2HMeetingsBoard({
  h2h,
  mode,
}: {
  h2h: NonNullable<typeof report.headToHead>;
  mode: ViewMode;
}) {
  const wins = h2h.matches.filter((m) => m.outcome === "win").length;
  const draws = h2h.matches.filter((m) => m.outcome === "draw").length;
  const losses = h2h.matches.filter((m) => m.outcome === "loss").length;
  const hifGoals = h2h.matches.reduce((s, m) => s + m.hammarbyGoals, 0);
  const gaisGoals = h2h.matches.reduce((s, m) => s + m.opponentGoals, 0);
  const goalMax = Math.max(hifGoals, gaisGoals, 1);
  // Chronological for the result ribbon (oldest → newest)
  const chronological = [...h2h.matches].reverse();
  const scoreSize =
    mode === "bigscreen" ? "text-4xl md:text-5xl lg:text-6xl" : mode === "desktop" ? "text-3xl md:text-4xl" : "text-3xl";

  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">{h2h.description}</p>

      {/* Record strip */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            HIF facit · senaste {h2h.sampleSize}
          </p>
          <div className="mt-4 flex items-end gap-4 md:gap-6">
            {[
              { n: wins, l: "V", c: HIF_GREEN },
              { n: draws, l: "O", c: "#9ca3af" },
              { n: losses, l: "F", c: "#71717a" },
            ].map((x) => (
              <div key={x.l} className="text-center">
                <p
                  className="font-[family-name:var(--font-podcast-display)] text-5xl font-black tabular-nums leading-none md:text-6xl"
                  style={{ color: x.c }}
                >
                  {x.n}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-widest text-white/40">{x.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
              Serie (äldst → nyast)
            </p>
            <div className="flex gap-1.5">
              {chronological.map((m) => {
                const pip = outcomeToPip(m.outcome);
                return (
                  <div
                    key={m.date}
                    className="h-3 flex-1 rounded-sm"
                    title={`${formatMeetingDate(m.date)} · ${m.result}`}
                    style={{
                      background:
                        pip === "W" ? HIF_GREEN : pip === "D" ? "#6b7280" : "#3f3f46",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Mål i mötena</p>
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs font-bold uppercase tracking-wide">
                <span style={{ color: HIF_GREEN }}>Hammarby</span>
                <span className="tabular-nums text-white">{hifGoals}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-3 rounded-full"
                  style={{ width: `${(hifGoals / goalMax) * 100}%`, background: HIF_GREEN }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs font-bold uppercase tracking-wide">
                <span style={{ color: GAIS_MUTED }}>GAIS</span>
                <span className="tabular-nums text-white">{gaisGoals}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-3 rounded-full"
                  style={{ width: `${(gaisGoals / goalMax) * 100}%`, background: GAIS_MUTED }}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/45">
            Målskillnad senaste {h2h.sampleSize}: {hifGoals - gaisGoals > 0 ? "+" : ""}
            {hifGoals - gaisGoals}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-6 sm:col-span-3 lg:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Läget kort</p>
          <ul className="mt-4 space-y-3">
            {h2h.trendBullets.slice(0, 3).map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-snug text-white/65">
                <span style={{ color: HIF_GREEN }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Match list */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Match för match</p>
        {h2h.matches.map((m, idx) => {
          const isWin = m.outcome === "win";
          const isDraw = m.outcome === "draw";
          const accent = isWin ? HIF_GREEN : isDraw ? "#9ca3af" : GAIS_MUTED;
          const outcomeLabel = isWin ? "HIF VINST" : isDraw ? "OAVGJORT" : "GAIS VINST";
          const homeAway = m.venue === "home" ? "Hemma · 3Arena" : "Borta";
          const hasXg = m.hammarbyXg > 0 || m.opponentXg > 0;
          const maxGoals = Math.max(m.hammarbyGoals, m.opponentGoals, 1);

          return (
            <article
              key={m.date}
              className="overflow-hidden rounded-3xl border border-white/10 bg-black/35"
              style={{ borderLeftWidth: 4, borderLeftColor: accent }}
            >
              <div
                className={`grid items-center gap-4 p-4 md:p-5 ${
                  mode === "mobile" ? "grid-cols-1" : "md:grid-cols-[140px_1fr_auto]"
                }`}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                    #{String(idx + 1).padStart(2, "0")} · {homeAway}
                  </p>
                  <p className="mt-1 text-sm font-black uppercase tracking-wide text-white/80">
                    {formatMeetingDate(m.date)}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">{m.fixture}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
                  <div className="min-w-[72px] text-right">
                    <p
                      className="text-xs font-black uppercase tracking-widest"
                      style={{ color: HIF_GREEN }}
                    >
                      HIF
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span
                      className={`font-[family-name:var(--font-podcast-display)] font-black tabular-nums leading-none ${scoreSize}`}
                      style={{ color: isWin ? HIF_GREEN : "#fff" }}
                    >
                      {m.hammarbyGoals}
                    </span>
                    <span className="text-2xl font-black text-white/25 md:text-3xl">–</span>
                    <span
                      className={`font-[family-name:var(--font-podcast-display)] font-black tabular-nums leading-none ${scoreSize}`}
                      style={{ color: !isWin && !isDraw ? "#e5e5e5" : "rgba(255,255,255,0.7)" }}
                    >
                      {m.opponentGoals}
                    </span>
                  </div>
                  <div className="min-w-[72px] text-left">
                    <p className="text-xs font-black uppercase tracking-widest text-white/55">GAIS</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                    style={{ background: `${accent}33`, color: accent, border: `1px solid ${accent}66` }}
                  >
                    {outcomeLabel}
                  </span>
                  {hasXg && (
                    <p className="text-[11px] tabular-nums text-white/40">
                      xG {m.hammarbyXg.toFixed(2).replace(".", ",")} –{" "}
                      {m.opponentXg.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </div>
              </div>

              {/* Mini goal bars */}
              <div className="grid grid-cols-[1fr_2px_1fr] gap-0 border-t border-white/5 px-4 py-3 md:px-5">
                <div className="flex h-2 justify-end overflow-hidden rounded-l-full bg-white/5">
                  <div
                    className="h-2 rounded-l-full"
                    style={{
                      width: `${(m.hammarbyGoals / maxGoals) * 100}%`,
                      background: HIF_GREEN,
                      minWidth: m.hammarbyGoals > 0 ? 8 : 0,
                    }}
                  />
                </div>
                <div className="bg-white/10" />
                <div className="flex h-2 justify-start overflow-hidden rounded-r-full bg-white/5">
                  <div
                    className="h-2 rounded-r-full"
                    style={{
                      width: `${(m.opponentGoals / maxGoals) * 100}%`,
                      background: GAIS_MUTED,
                      minWidth: m.opponentGoals > 0 ? 8 : 0,
                    }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PitchHeatmap({
  zones,
  accent,
}: {
  zones: { x: number; y: number; r: number; opacity: number }[];
  accent: string;
}) {
  return (
    <svg viewBox="0 0 100 140" className="h-full w-full" aria-hidden>
      <rect x="2" y="2" width="96" height="136" rx="2" fill="#0a0a0a" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="25" y="2" width="50" height="18" fill="none" stroke="#2a2a2a" strokeWidth="0.8" />
      <rect x="35" y="2" width="30" height="8" fill="none" stroke="#2a2a2a" strokeWidth="0.8" />
      <circle cx="50" cy="70" r="12" fill="none" stroke="#2a2a2a" strokeWidth="0.8" />
      <line x1="2" y1="70" x2="98" y2="70" stroke="#2a2a2a" strokeWidth="0.8" />
      {zones.map((z, i) => (
        <circle key={i} cx={z.x} cy={z.y} r={z.r} fill={accent} opacity={z.opacity} />
      ))}
    </svg>
  );
}

function RadarMini({
  phases,
}: {
  phases: { label: string; hammarbyRank: number; opponentRank: number }[];
}) {
  const cx = 160;
  const cy = 150;
  const R = 100;
  const n = phases.length;
  const ring = [0.25, 0.5, 0.75, 1];

  function pt(i: number, score: number) {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const r = (score / 100) * R;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  }

  const hif = phases.map((p, i) => pt(i, rankToScore(p.hammarbyRank)).join(",")).join(" ");
  const gais = phases.map((p, i) => pt(i, rankToScore(p.opponentRank)).join(",")).join(" ");

  return (
    <svg viewBox="0 0 320 300" className="mx-auto h-auto w-full max-w-md">
      {ring.map((s) => (
        <polygon
          key={s}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1"
          points={phases.map((_, i) => pt(i, s * 100).join(",")).join(" ")}
        />
      ))}
      {phases.map((_, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#2a2a2a" strokeWidth="1" />;
      })}
      <polygon points={gais} fill={`${GAIS_MUTED}55`} stroke={GAIS_MUTED} strokeWidth="2" />
      <polygon points={hif} fill={`${HIF_GREEN}66`} stroke={HIF_GREEN} strokeWidth="2.5" />
      {phases.map((p, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const lx = cx + Math.cos(a) * (R + 22);
        const ly = cy + Math.sin(a) * (R + 22);
        return (
          <text
            key={p.label}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#a1a1aa"
            fontSize="9"
            fontWeight="700"
          >
            {p.label.split(" ")[0]}
          </text>
        );
      })}
    </svg>
  );
}

function TacticDiagram() {
  return (
    <svg viewBox="0 0 640 280" className="h-auto w-full" role="img" aria-label="Taktik: bryt counterpress">
      <rect width="640" height="280" fill="#0a0a0a" rx="12" />
      {/* Pitch lines */}
      <rect x="20" y="20" width="600" height="240" fill="none" stroke="#222" strokeWidth="2" rx="4" />
      <line x1="320" y1="20" x2="320" y2="260" stroke="#222" strokeWidth="1.5" />
      {/* GAIS press wave */}
      <path d="M420 50 Q480 140 420 230" fill="none" stroke={GAIS_MUTED} strokeWidth="3" strokeDasharray="6 6" />
      <text x="500" y="145" fill={GAIS_MUTED} fontSize="12" fontWeight="700">
        GAIS press
      </text>
      {/* HIF circulation */}
      <circle cx="160" cy="140" r="18" fill={HIF_GREEN} />
      <circle cx="230" cy="90" r="14" fill={HIF_GREEN} opacity="0.85" />
      <circle cx="230" cy="190" r="14" fill={HIF_GREEN} opacity="0.85" />
      <circle cx="300" cy="140" r="16" fill="#fff" />
      <path d="M178 140 H214 M230 104 V176 M244 90 Q280 110 284 140 Q280 170 244 190" fill="none" stroke="#fff" strokeWidth="2.5" />
      <text x="140" y="175" fill="#fff" fontSize="11" fontWeight="700">
        Cirkulera
      </text>
      {/* Vertical break */}
      <path d="M316 140 L400 100" stroke={HIF_GREEN} strokeWidth="3" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={HIF_GREEN} />
        </marker>
      </defs>
      <circle cx="430" cy="95" r="14" fill={HIF_GREEN} />
      <text x="450" y="88" fill={HIF_GREEN} fontSize="12" fontWeight="800">
        Vertikal brytning
      </text>
      <text x="450" y="106" fill="#a1a1aa" fontSize="11">
        när pressen faller bakåt
      </text>
      {/* Second ball */}
      <circle cx="380" cy="200" r="22" fill="none" stroke={GAIS_ACCENT} strokeWidth="2" strokeDasharray="4 3" />
      <text x="360" y="240" fill={GAIS_ACCENT} fontSize="11" fontWeight="700">
        Andrabollszon
      </text>
    </svg>
  );
}

export default function GaisPodcastDeck() {
  const [mode, setMode] = useState<ViewMode>("bigscreen");
  const [expandTwelve, setExpandTwelve] = useState(false);
  const countdown = useCountdown(MATCH_KICKOFF);

  const phases = report.twelvePhaseRanks ?? [];
  const boll = report.bolldataRankings ?? [];
  const h2hAxes = report.spiderComparison.slice(0, 6);

  const modeClass = useMemo(() => {
    if (mode === "mobile") return "max-w-md mx-auto text-[15px]";
    if (mode === "desktop") return "max-w-6xl mx-auto";
    return "max-w-[1800px] mx-auto text-[17px] lg:text-[18px]";
  }, [mode]);

  const heroPad =
    mode === "bigscreen" ? "px-10 py-16 lg:px-20 lg:py-24" : mode === "desktop" ? "px-8 py-14" : "px-4 py-10";

  const playerHeat: Record<
    string,
    { x: number; y: number; r: number; opacity: number }[]
  > = {
    "Samuel Salter": [
      { x: 50, y: 18, r: 18, opacity: 0.55 },
      { x: 38, y: 28, r: 12, opacity: 0.35 },
      { x: 62, y: 28, r: 12, opacity: 0.35 },
    ],
    "Rasmus Niklasson Petrovic": [
      { x: 32, y: 40, r: 16, opacity: 0.5 },
      { x: 68, y: 40, r: 14, opacity: 0.4 },
      { x: 50, y: 55, r: 12, opacity: 0.3 },
    ],
    "William Milovanović": [
      { x: 50, y: 70, r: 18, opacity: 0.5 },
      { x: 40, y: 58, r: 12, opacity: 0.35 },
      { x: 60, y: 58, r: 12, opacity: 0.35 },
      { x: 50, y: 45, r: 10, opacity: 0.25 },
    ],
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "#111111",
        fontFamily: "var(--font-podcast-body), system-ui, sans-serif",
      }}
    >
      {/* Sticky mode bar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur-md">
        <div className={`flex flex-wrap items-center justify-between gap-3 py-3 ${heroPad} !py-3`}>
          <Link
            href="/matchstatistik"
            className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white"
          >
            ← Matchstatistik
          </Link>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["mobile", "📱 MOBILE"],
                ["desktop", "💻 DESKTOP"],
                ["bigscreen", "🖥️ BIG SCREEN / PODCAST"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className="rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wide transition"
                style={{
                  background: mode === id ? HIF_GREEN : "transparent",
                  color: mode === id ? "#fff" : "#a1a1aa",
                  border: `1px solid ${mode === id ? HIF_GREEN : "#333"}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={modeClass}>
        {/* 00 HERO */}
        <header className={`relative overflow-hidden ${heroPad}`}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 40px, #fff 40px 80px)`,
            }}
          />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: HIF_GREEN }}>
              Allsvenskan · Omgång 18 · Kommande motstånd
            </p>
            <h1
              className={`mt-4 font-[family-name:var(--font-podcast-display)] font-black uppercase leading-[0.9] text-white ${
                mode === "bigscreen" ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl"
              }`}
              style={{ letterSpacing: "-0.03em" }}
            >
              Hammarby – GAIS
            </h1>
            <p className="mt-3 text-base text-white/55 md:text-lg">
              Söndag 23 augusti 2026 · 16:30 · 3Arena
            </p>

            <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              <div className="flex flex-col items-center gap-4 lg:items-end">
                <div className="text-center lg:text-right">
                  <p
                    className="font-[family-name:var(--font-podcast-display)] text-4xl font-black uppercase md:text-6xl"
                    style={{ color: HIF_GREEN }}
                  >
                    Hammarby
                  </p>
                  <p className="mt-1 text-sm text-white/55">2:a · 33p · Bästa hemmalag</p>
                </div>
                <FormPips results={["W", "W", "D", "W", "W"]} label="HIF form (5)" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 text-2xl font-black"
                  style={{ borderColor: HIF_GREEN, color: HIF_GREEN }}
                >
                  VS
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    [countdown.days, "DAG"],
                    [countdown.hours, "TIM"],
                    [countdown.mins, "MIN"],
                    [countdown.secs, "SEK"],
                  ].map(([v, l]) => (
                    <div key={String(l)} className="min-w-14 rounded-xl bg-white/5 px-2 py-2">
                      <p className="font-[family-name:var(--font-podcast-display)] text-2xl font-black tabular-nums md:text-3xl">
                        {String(v).padStart(2, "0")}
                      </p>
                      <p className="text-[9px] font-bold tracking-widest text-white/40">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="max-w-xs text-center text-sm text-white/60">
                  Söndag 23 augusti 2026 · 16:30
                  <br />
                  <span className="font-bold text-white">3Arena, Stockholm</span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 lg:items-start">
                <div className="text-center lg:text-left">
                  <p className="font-[family-name:var(--font-podcast-display)] text-4xl font-black uppercase text-white/85 md:text-6xl">
                    GAIS
                  </p>
                  <p className="mt-1 text-sm text-white/45">9:a · 23p · 4:a i xP</p>
                </div>
                <FormPips results={["W", "L", "D", "W", "L"]} label="GAIS form (5)" />
              </div>
            </div>

            <p className="mt-10 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              Hammarby 2:a (33p) mot GAIS 9:a (23p). HIF är ligans bästa hemmalag (7V–1O–1F).
              GAIS är 4:a i xP och etta i xGA – starkare under ytan än tabellen visar. Senaste
              mötet: GAIS 2–0 (20 maj).
            </p>
          </div>
        </header>

        {/* 01 Bakgrund */}
        <SectionShell num="01" eyebrow="Förra mötet" title="GAIS 2–0 · 20 maj" mode={mode}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">GAIS</p>
                <p className="font-[family-name:var(--font-podcast-display)] text-5xl font-black tabular-nums text-white md:text-7xl">
                  2–0
                </p>
                <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: HIF_GREEN }}>
                  HIF
                </p>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                GAIS – Hammarby · 20 maj 2026 · HT 1–0
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                {report.previousMeeting?.contextNote}
              </p>
              <p className="mt-4 border-l-4 pl-4 text-base leading-relaxed text-white/60" style={{ borderColor: HIF_GREEN }}>
                {report.previousMeeting?.keyStory}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-sm">
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <p className="text-2xl font-black tabular-nums" style={{ color: HIF_GREEN }}>
                    {report.previousMeeting?.xgHammarby}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">HIF xG</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-center">
                  <p className="text-2xl font-black tabular-nums" style={{ color: GAIS_MUTED }}>
                    {report.previousMeeting?.xgOpponent}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">GAIS xG</p>
                </div>
              </div>
            </div>

            {/* Timeline – vertical list (no overlapping labels) */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                Matchhändelser · 0–90+
              </p>
              <div className="relative mb-6 h-2 rounded-full bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: "100%", background: `linear-gradient(90deg, #222, ${HIF_GREEN}33)` }}
                />
                {[25, 70, 80].map((m) => (
                  <div
                    key={m}
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111]"
                    style={{
                      left: `${(m / 90) * 100}%`,
                      background: m === 70 ? "#ef4444" : GAIS_ACCENT,
                    }}
                  />
                ))}
                <span className="absolute -left-0.5 -top-5 text-[10px] font-bold text-white/35">0&apos;</span>
                <span className="absolute -right-1 -top-5 text-[10px] font-bold text-white/35">90+</span>
              </div>
              <div className="space-y-3">
                {[
                  { m: 25, label: "Petrovic", sub: "1–0 GAIS", tone: "goal" as const },
                  { m: 70, label: "Skoglund", sub: "Rött kort (2:a gula)", tone: "card" as const },
                  { m: 80, label: "Salter", sub: "2–0 GAIS", tone: "goal" as const },
                ].map((ev) => (
                  <div
                    key={ev.m}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
                  >
                    <span
                      className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-black tabular-nums"
                      style={{
                        background: ev.tone === "card" ? "#7f1d1d66" : `${GAIS_ACCENT}22`,
                        color: ev.tone === "card" ? "#fca5a5" : GAIS_ACCENT,
                      }}
                    >
                      {ev.m}&apos;
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white">
                        {ev.tone === "card" ? "🟥" : "⚽"} {ev.label}
                      </p>
                      <p className="text-xs text-white/50">{ev.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/55">
                Sedan den matchen: HIF 4V–1O i senaste fem, senast 4–0 borta mot Kalmar. GAIS
                tog senast 0–1 hemma mot Malmö.
              </p>
            </div>
          </div>
        </SectionShell>

        {/* 02 Inbördesmöten */}
        <SectionShell num="02" eyebrow="Inbördesmöten" title="Senaste fem" mode={mode}>
          {report.headToHead ? (
            <H2HMeetingsBoard h2h={report.headToHead} mode={mode} />
          ) : (
            <p className="text-white/50">Ingen inbördes data tillgänglig.</p>
          )}
        </SectionShell>

        {/* 03 Mätvärden */}
        <SectionShell num="03" eyebrow="Säsongsdata" title="Nyckeltal per match" mode={mode}>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-white/60">
              Grön stapel = Hammarby. Grå = GAIS. Längre stapel = starkare värde på mätetalet.
            </p>
            <button
              type="button"
              onClick={() => setExpandTwelve((v) => !v)}
              className="rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white"
              style={{ background: HIF_GREEN }}
            >
              {expandTwelve ? "Dölj Bolldata-detaljer" : "Visa Bolldata-detaljer"}
            </button>
          </div>

          <div className="mb-10 rounded-3xl border border-white/10 bg-black/30 p-5 md:p-7">
            <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <p className="text-right text-sm font-black uppercase tracking-wider md:text-lg" style={{ color: HIF_GREEN }}>
                Hammarby
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                {report.comparisonLabel ?? "Allsvenskan 2026"}
              </p>
              <p className="text-left text-sm font-black uppercase tracking-wider text-white/70 md:text-lg">
                GAIS
              </p>
            </div>
            <div className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
              {h2hAxes.map((axis) => {
                const hPct = Math.min(axis.hammarbyScore, 100);
                const oPct = Math.min(axis.opponentScore, 100);
                const hLead = axis.hammarbyScore >= axis.opponentScore;
                return (
                  <div key={axis.label}>
                    <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                      <div className="text-right">
                        <p
                          className="text-2xl font-black tabular-nums md:text-3xl"
                          style={{ color: hLead ? HIF_GREEN : "#e5e5e5" }}
                        >
                          {axis.hammarbyValue}
                        </p>
                      </div>
                      <p className="min-w-[110px] text-center text-[10px] font-bold uppercase tracking-widest text-white/45 md:min-w-[140px]">
                        {axis.label}
                      </p>
                      <div className="text-left">
                        <p
                          className="text-2xl font-black tabular-nums md:text-3xl"
                          style={{ color: !hLead ? "#d4d4d8" : "rgba(255,255,255,0.55)" }}
                        >
                          {axis.opponentValue}
                        </p>
                      </div>
                    </div>
                    <div className="relative grid grid-cols-[1fr_2px_1fr] items-stretch">
                      <div className="flex h-5 justify-end overflow-hidden rounded-l-full bg-white/5">
                        <div
                          className="h-5 rounded-l-full transition-all"
                          style={{
                            width: `${hPct}%`,
                            background: HIF_GREEN,
                            opacity: hLead ? 1 : 0.55,
                            boxShadow: hLead ? `0 0 16px ${HIF_GREEN}66` : undefined,
                          }}
                        />
                      </div>
                      <div className="bg-white/20" />
                      <div className="flex h-5 justify-start overflow-hidden rounded-r-full bg-white/5">
                        <div
                          className="h-5 rounded-r-full transition-all"
                          style={{
                            width: `${oPct}%`,
                            background: GAIS_MUTED,
                            opacity: !hLead ? 1 : 0.5,
                            boxShadow: !hLead ? `0 0 16px ${GAIS_MUTED}88` : undefined,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-1.5 text-center text-[11px] text-white/40">{axis.note}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: HIF_GREEN }}>
                Förenklad radar
              </p>
              <RadarMini phases={phases} />
              <div className="mt-2 flex justify-center gap-6 text-xs font-bold uppercase tracking-wide">
                <span style={{ color: HIF_GREEN }}>● Hammarby</span>
                <span style={{ color: GAIS_MUTED }}>● GAIS</span>
              </div>
            </div>

            <div className="space-y-4">
              {phases.map((p) => {
                const h = rankToScore(p.hammarbyRank);
                const g = rankToScore(p.opponentRank);
                return (
                  <div key={p.label}>
                    <div className="mb-1 flex items-end justify-between gap-3">
                      <p className="text-sm font-black uppercase tracking-wide text-white">{p.label}</p>
                      <p className="text-[11px] text-white/40">{p.talkTrack}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <div className="flex h-4 justify-end overflow-hidden rounded-l-full bg-white/5">
                        <div
                          className="h-4 rounded-l-full"
                          style={{ width: `${h}%`, background: HIF_GREEN }}
                        />
                      </div>
                      <div className="flex min-w-16 justify-center gap-2 text-xs font-black tabular-nums">
                        <span style={{ color: HIF_GREEN }}>{p.hammarbyRank}</span>
                        <span className="text-white/20">|</span>
                        <span style={{ color: GAIS_MUTED }}>{p.opponentRank}</span>
                      </div>
                      <div className="flex h-4 justify-start overflow-hidden rounded-r-full bg-white/5">
                        <div
                          className="h-4 rounded-r-full"
                          style={{ width: `${g}%`, background: GAIS_MUTED }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {expandTwelve && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {boll.map((b) => {
                const hBetter = b.hammarbyRank <= b.opponentRank;
                const hScore = rankToScore(b.hammarbyRank);
                const oScore = rankToScore(b.opponentRank);
                return (
                  <div key={b.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                      {b.group} · Bolldata
                    </p>
                    <p className="mt-1 text-sm font-black uppercase text-white">{b.label}</p>
                    <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                      <div className="text-right">
                        <p className="text-xl font-black tabular-nums" style={{ color: HIF_GREEN }}>
                          {b.hammarbyValue}
                        </p>
                        <p className="text-[10px] text-white/40">{b.hammarbyRank}:a</p>
                      </div>
                      <span className="pb-1 text-[10px] text-white/25">vs</span>
                      <div className="text-left">
                        <p className="text-xl font-black tabular-nums" style={{ color: GAIS_MUTED }}>
                          {b.opponentValue}
                        </p>
                        <p className="text-[10px] text-white/40">{b.opponentRank}:a</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-[1fr_2px_1fr] items-stretch">
                      <div className="flex h-2.5 justify-end overflow-hidden rounded-l-full bg-white/5">
                        <div
                          className="h-2.5 rounded-l-full"
                          style={{ width: `${hScore}%`, background: HIF_GREEN, opacity: hBetter ? 1 : 0.5 }}
                        />
                      </div>
                      <div className="bg-white/15" />
                      <div className="flex h-2.5 justify-start overflow-hidden rounded-r-full bg-white/5">
                        <div
                          className="h-2.5 rounded-r-full"
                          style={{ width: `${oScore}%`, background: GAIS_MUTED, opacity: !hBetter ? 1 : 0.5 }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-white/50">{b.talkTrack}</p>
                  </div>
                );
              })}
            </div>
          )}
        </SectionShell>

        {/* 04 Poddens analys */}
        <SectionShell num="04" eyebrow="Analys" title="Tre nyckelpunkter" mode={mode}>
          <div className="grid gap-6 lg:grid-cols-3">
            {(report.trafficLightCards ?? []).map((card) => (
              <article
                key={card.metric}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6"
              >
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20"
                  style={{
                    background:
                      card.color === "green" ? HIF_GREEN : card.color === "red" ? "#b91c1c" : GAIS_ACCENT,
                  }}
                />
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-lg"
                    style={{ background: HIF_GREEN }}
                  >
                    🎙️
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/70">
                    {card.badge}
                  </span>
                </div>
                <p
                  className="font-[family-name:var(--font-podcast-display)] text-6xl font-black leading-none tabular-nums"
                  style={{
                    color:
                      card.color === "green" ? HIF_GREEN : card.color === "red" ? "#f87171" : GAIS_ACCENT,
                  }}
                >
                  {card.bigNumber}
                </p>
                <p className="mt-3 text-lg font-black uppercase tracking-wide text-white">{card.metric}</p>
                <p className="mt-1 text-xs text-white/40">{card.rankNote}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{card.explanation}</p>
                <blockquote
                  className="mt-5 rounded-2xl px-4 py-4 text-sm italic leading-relaxed text-white"
                  style={{ background: `${HIF_GREEN}22`, borderLeft: `4px solid ${HIF_GREEN}` }}
                >
                  “{card.podcastComment}”
                </blockquote>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* 05 Scouting */}
        <SectionShell num="05" eyebrow="Scouting" title="Spelare att bevaka" mode={mode}>
          <div className="grid gap-6 lg:grid-cols-3">
            {(report.playersToWatch ?? []).slice(0, 3).map((player) => (
              <article key={player.name} className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <div className="grid grid-cols-[0.9fr_1.1fr] gap-0">
                  <div className="relative bg-[#0a0a0a] p-4">
                    <div className="aspect-[5/7] w-full">
                      <PitchHeatmap
                        zones={playerHeat[player.name] ?? [{ x: 50, y: 50, r: 14, opacity: 0.4 }]}
                        accent={HIF_GREEN}
                      />
                    </div>
                    <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-widest text-white/35">
                      Aktivitetskarta
                    </p>
                  </div>
                  <div className="p-5">
                    {player.scoutBadge && (
                      <p className="mb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: GAIS_ACCENT }}>
                        {player.scoutBadge}
                      </p>
                    )}
                    <h3 className="font-[family-name:var(--font-podcast-display)] text-2xl font-black uppercase leading-tight text-white">
                      {player.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">
                      {player.position}
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      {player.stats.map((s) => (
                        <div key={s.label} className="rounded-lg bg-white/5 p-2 text-center">
                          <p className="text-lg font-black tabular-nums text-white">{s.value}</p>
                          <p className="text-[9px] uppercase text-white/40">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-sm font-semibold text-white/80">{player.threat}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    <span className="font-bold" style={{ color: HIF_GREEN }}>
                      Scouten:{" "}
                    </span>
                    {player.motivation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* 06 Plan */}
        <SectionShell num="06" eyebrow="Matchplan" title="Så kan HIF vinna" mode={mode}>
          {report.spotlightKey && (
            <div
              className="mb-8 rounded-3xl p-6 md:p-8"
              style={{ background: `linear-gradient(135deg, ${HIF_GREEN}33, #111 60%)`, border: `1px solid ${HIF_GREEN}66` }}
            >
              <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: HIF_GREEN }}>
                Matchnyckel
              </p>
              <p className="mt-3 text-lg leading-relaxed text-white md:text-xl">{report.spotlightKey}</p>
            </div>
          )}

          <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 md:p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              Taktikdiagram · Bryt counterpressen
            </p>
            <TacticDiagram />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border p-6" style={{ borderColor: `${HIF_GREEN}66`, background: `${HIF_GREEN}14` }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: HIF_GREEN }}>
                  ⚔️
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: HIF_GREEN }}>
                    Anfallsvapen
                  </p>
                  <h3 className="font-[family-name:var(--font-podcast-display)] text-2xl font-black uppercase">
                    Med boll
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {report.hammarbyPlan.withBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-white/80 md:text-base">
                    <span className="font-black tabular-nums" style={{ color: HIF_GREEN }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/15 bg-black/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  🛡️
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    Defensiva nycklar
                  </p>
                  <h3 className="font-[family-name:var(--font-podcast-display)] text-2xl font-black uppercase">
                    Utan boll
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {report.hammarbyPlan.withoutBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-white/80 md:text-base">
                    <span className="font-black tabular-nums text-white/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {report.hammarbyPlan.matchManagement.map((pt, i) => (
                  <p key={i} className="text-xs leading-snug text-white/45 md:text-sm">
                    <span style={{ color: HIF_GREEN }}>↻ </span>
                    {pt}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        {/* 07 Goal windows */}
        <SectionShell num="07" eyebrow="Målfönstret" title="När målen faller" mode={mode}>
          <p className="mb-6 max-w-3xl text-white/60">
            HIF-mål (grön densitet) vs GAIS insläppta (grå densitet) per 15-minutersfönster. Mörkare =
            högre volym.
          </p>

          {(() => {
            const maxH = Math.max(...report.goalWindows.map((w) => w.hammarbyGoals));
            const maxG = Math.max(...report.goalWindows.map((w) => w.opponentConcededGoals));
            return (
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: HIF_GREEN }}>
                    Hammarby gjorda mål
                  </p>
                  <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                    {report.goalWindows.map((w) => {
                      const intensity = w.hammarbyGoals / maxH;
                      const hot = w.window.startsWith("46");
                      return (
                        <div key={`h-${w.window}`} className="text-center">
                          <div
                            className="relative flex h-24 items-end justify-center rounded-xl md:h-32"
                            style={{
                              background: `rgba(0,102,51,${0.15 + intensity * 0.85})`,
                              boxShadow: hot ? `0 0 0 2px ${HIF_GREEN}` : undefined,
                            }}
                          >
                            {hot && <span className="absolute right-1 top-1 text-sm">🔥</span>}
                            <span className="pb-2 text-2xl font-black tabular-nums text-white md:text-3xl">
                              {w.hammarbyGoals}
                            </span>
                          </div>
                          <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-white/45">
                            {w.window}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: GAIS_MUTED }}>
                    GAIS insläppta
                  </p>
                  <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                    {report.goalWindows.map((w) => {
                      const intensity = w.opponentConcededGoals / maxG;
                      return (
                        <div key={`g-${w.window}`} className="text-center">
                          <div
                            className="flex h-16 items-end justify-center rounded-xl md:h-20"
                            style={{ background: `rgba(138,144,150,${0.12 + intensity * 0.7})` }}
                          >
                            <span className="pb-1.5 text-xl font-black tabular-nums text-white/80">
                              {w.opponentConcededGoals}
                            </span>
                          </div>
                          <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-white/35">
                            {w.window}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {report.goalTypeNotes.map((n) => (
              <div key={n.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">{n.label}</p>
                <p className="mt-1 text-base font-black text-white">{n.value}</p>
                <p className="mt-1 text-sm text-white/55">{n.interpretation}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* 08 Summary */}
        <SectionShell num="08" eyebrow="Summering" title="Källor & ordlista" mode={mode}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-lg leading-relaxed text-white/75 md:text-xl">{report.oneLineSummary}</p>
              <ul className="mt-6 space-y-2">
                {report.mobileTakeaways.slice(0, 5).map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-white/60 md:text-base">
                    <span style={{ color: HIF_GREEN }}>▸</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: HIF_GREEN }}>
                  Datakällor
                </p>
                <ul className="space-y-2">
                  {report.dataSources.map((s) => {
                    const url = s.match(/https?:\/\/\S+/)?.[0];
                    return (
                      <li key={s}>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 underline-offset-2 hover:border-white/25 hover:text-white hover:underline"
                          >
                            {s}
                          </a>
                        ) : (
                          <span className="text-xs text-white/50">{s}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Ordlista</p>
                <dl className="space-y-3">
                  {report.glossary.slice(0, 5).map((g) => (
                    <div key={g.term}>
                      <dt className="text-sm font-bold text-white">{g.term}</dt>
                      <dd className="text-xs leading-relaxed text-white/50">{g.explanation}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <p className="text-sm font-black uppercase tracking-[0.2em]">
              <span style={{ color: HIF_GREEN }}>Hammarby</span>
              <span className="mx-2 text-white/25">·</span>
              <span className="text-white/55">GAIS</span>
            </p>
            <p className="text-xs text-white/35">
              Hammarby IF · Big Screen Podcast Deck · Omgång 18 2026
            </p>
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
