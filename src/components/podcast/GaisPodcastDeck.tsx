"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { aikRound19Report as report } from "@/lib/aikRound19UpcomingData";
import {
  calcDomarindex,
  calcFoulDiff,
  calcCardDiff,
  getDomarRating,
  hammarbyRefereeMatches,
} from "@/lib/hammarbyRefereeData";
import {
  getVictorWolfHomeAwayProfile,
  victorWolfAllsvenskan2026Matches,
} from "@/lib/victorWolfReferee2026";

const HIF_GREEN = "#006633";
const OPP_MUTED = "#8a9096";
const OPP_ACCENT = "#c4a035";
const OPP_SHORT = "AIK";
const OPP_FORM_LABEL = "AIK form";

type ViewMode = "mobile" | "desktop" | "bigscreen";

const MATCH_KICKOFF = new Date("2026-08-30T12:00:00Z"); // 14:00 Stockholm (CEST)

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

function StripeDivider({ className = "my-2" }: { className?: string }) {
  return (
    <div
      className={`h-3 w-full ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 14px, #ffffff 14px 28px)`,
        opacity: 0.85,
      }}
      aria-hidden
    />
  );
}

function ColorLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.22em]">
      <span className="inline-flex items-center gap-2" style={{ color: HIF_GREEN }}>
        <span className="inline-block h-2.5 w-5 rounded-sm" style={{ background: HIF_GREEN }} />
        Hammarby
      </span>
      <span className="inline-flex items-center gap-2 text-white/70">
        <span className="inline-block h-2.5 w-5 rounded-sm bg-white" />
        {OPP_SHORT}
      </span>
    </div>
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
                <span style={{ color: OPP_MUTED }}>{OPP_SHORT}</span>
                <span className="tabular-nums text-white">{gaisGoals}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-3 rounded-full"
                  style={{ width: `${(gaisGoals / goalMax) * 100}%`, background: OPP_MUTED }}
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
          const accent = isWin ? HIF_GREEN : isDraw ? "#9ca3af" : OPP_MUTED;
          const outcomeLabel = isWin ? "HIF VINST" : isDraw ? "OAVGJORT" : `${OPP_SHORT} VINST`;
          const homeAway = m.venue === "home" ? "Hemma" : "Borta · Strawberry Arena";
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
                    <p className="text-xs font-black uppercase tracking-widest text-white/55">{OPP_SHORT}</p>
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
                      background: OPP_MUTED,
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
      <polygon points={gais} fill={`${OPP_MUTED}55`} stroke={OPP_MUTED} strokeWidth="2" />
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
      {/* {OPP_SHORT} press wave */}
      <path d="M420 50 Q480 140 420 230" fill="none" stroke={OPP_MUTED} strokeWidth="3" strokeDasharray="6 6" />
      <text x="500" y="145" fill={OPP_MUTED} fontSize="12" fontWeight="700">
        {OPP_SHORT} press
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
      <circle cx="380" cy="200" r="22" fill="none" stroke={OPP_ACCENT} strokeWidth="2" strokeDasharray="4 3" />
      <text x="360" y="240" fill={OPP_ACCENT} fontSize="11" fontWeight="700">
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

  const fixtureParts = report.fixture.split("-").map((p) => p.trim());
  const hammarbyIsAway = !/hammarby/i.test(fixtureParts[0] ?? "Hammarby");
  const homeTeamShort = hammarbyIsAway ? OPP_SHORT : "Hammarby";
  const awayTeamShort = hammarbyIsAway ? "Hammarby" : OPP_SHORT;
  const homeBadges = hammarbyIsAway ? report.opponentBadges : report.hifBadges;
  const awayBadges = hammarbyIsAway ? report.hifBadges : report.opponentBadges;
  const homeForm: ("W" | "D" | "L")[] = hammarbyIsAway
    ? ["W", "D", "L", "W", "W"]
    : ["W", "D", "W", "W", "W"];
  const awayForm: ("W" | "D" | "L")[] = hammarbyIsAway
    ? ["W", "D", "W", "W", "W"]
    : ["W", "D", "L", "W", "W"];
  const homeFormLabel = hammarbyIsAway ? `${OPP_FORM_LABEL} (5)` : "HIF form (5)";
  const awayFormLabel = hammarbyIsAway ? "HIF form (5)" : `${OPP_FORM_LABEL} (5)`;
  const homeIsHif = !hammarbyIsAway;

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
    "Dino Beširović": [
      { x: 50, y: 48, r: 16, opacity: 0.5 },
      { x: 38, y: 52, r: 11, opacity: 0.32 },
      { x: 62, y: 52, r: 11, opacity: 0.32 },
      { x: 50, y: 36, r: 10, opacity: 0.28 },
    ],
    "Linus Carlstrand": [
      { x: 50, y: 16, r: 18, opacity: 0.55 },
      { x: 38, y: 22, r: 11, opacity: 0.32 },
      { x: 62, y: 22, r: 11, opacity: 0.32 },
      { x: 50, y: 28, r: 10, opacity: 0.3 },
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
              {report.roundLabel} · Kommande motstånd
            </p>
            <h1
              className={`mt-4 font-[family-name:var(--font-podcast-display)] font-black uppercase leading-[0.9] text-white ${
                mode === "bigscreen" ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl"
              }`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {homeTeamShort} – {awayTeamShort}
            </h1>
            <p className="mt-3 text-base text-white/55 md:text-lg">
              {report.dateLabel}
              {report.refereePreview && (
                <>
                  {" "}
                  · Domare{" "}
                  <span className="font-semibold text-white/80">{report.refereePreview.name}</span>
                </>
              )}
            </p>

            <div
              className={
                mode === "mobile"
                  ? "mt-10 grid items-center gap-8"
                  : "mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]"
              }
            >
              {/* Hemmalag först (AIK i derbyt) – även i staplad mobilläge */}
              <div
                className={
                  mode === "mobile"
                    ? "flex flex-col items-center gap-4"
                    : "flex flex-col items-center gap-4 lg:items-end"
                }
              >
                <div
                  className={
                    mode === "mobile" ? "text-center" : "text-center lg:text-right"
                  }
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Hemma
                  </p>
                  <p
                    className="font-[family-name:var(--font-podcast-display)] text-4xl font-black uppercase md:text-6xl"
                    style={{ color: homeIsHif ? HIF_GREEN : "rgba(255,255,255,0.88)" }}
                  >
                    {homeTeamShort}
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {(homeBadges ?? []).slice(0, 3).join(" · ")}
                  </p>
                </div>
                <FormPips results={homeForm} label={homeFormLabel} />
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
                  Söndag 30 augusti 2026 · 14:00
                  <br />
                  <span className="font-bold text-white">
                    {report.venueLabel ?? "Strawberry Arena"}
                  </span>
                </p>
              </div>

              <div
                className={
                  mode === "mobile"
                    ? "flex flex-col items-center gap-4"
                    : "flex flex-col items-center gap-4 lg:items-start"
                }
              >
                <div
                  className={
                    mode === "mobile" ? "text-center" : "text-center lg:text-left"
                  }
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Borta
                  </p>
                  <p
                    className="font-[family-name:var(--font-podcast-display)] text-4xl font-black uppercase md:text-6xl"
                    style={{ color: homeIsHif ? "rgba(255,255,255,0.88)" : HIF_GREEN }}
                  >
                    {awayTeamShort}
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    {(awayBadges ?? []).slice(0, 3).join(" · ")}
                  </p>
                </div>
                <FormPips results={awayForm} label={awayFormLabel} />
              </div>
            </div>

            <p className="mt-10 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              {report.oneLineSummary}
            </p>
          </div>
        </header>

        {/* 01 Bakgrund */}
        <SectionShell
          num="01"
          eyebrow="Förra mötet"
          title={
            report.previousMeeting
              ? `${report.previousMeeting.result} · derby maj 2026`
              : "Förra mötet"
          }
          mode={mode}
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
                  {OPP_SHORT}
                </p>
                <p className="font-[family-name:var(--font-podcast-display)] text-5xl font-black tabular-nums text-white md:text-7xl">
                  {report.previousMeeting?.result ?? "–"}
                </p>
                <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: HIF_GREEN }}>
                  HIF
                </p>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                {report.previousMeeting?.fixture} · {report.previousMeeting?.date}
                {report.previousMeeting?.halfTimeScore
                  ? ` · HT ${report.previousMeeting.halfTimeScore}`
                  : ""}
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                {report.previousMeeting?.contextNote}
              </p>
              <p className="mt-4 border-l-4 pl-4 text-base leading-relaxed text-white/60" style={{ borderColor: HIF_GREEN }}>
                {report.previousMeeting?.keyStory}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-sm">
                {report.previousMeeting?.xgHammarby != null && report.previousMeeting?.xgOpponent != null ? (
                  <>
                    <div className="rounded-2xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-black tabular-nums" style={{ color: HIF_GREEN }}>
                        {report.previousMeeting.xgHammarby}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">HIF xG</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-black tabular-nums" style={{ color: OPP_MUTED }}>
                        {report.previousMeeting.xgOpponent}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {OPP_SHORT} xG
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 rounded-2xl bg-white/5 p-4 text-center">
                    <p className="text-sm text-white/55">Cupmöte · xG ej tillgängligt</p>
                    <p className="mt-1 text-xs text-white/40">Resultat och händelser från matchrapport</p>
                  </div>
                )}
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
                {(report.previousMeeting?.scorers ?? []).map((s) => (
                  <div
                    key={`${s.player}-${s.minute}`}
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111]"
                    style={{
                      left: `${(Math.min(s.minute, 90) / 90) * 100}%`,
                      background: s.team === "hammarby" ? HIF_GREEN : OPP_ACCENT,
                    }}
                  />
                ))}
                <span className="absolute -left-0.5 -top-5 text-[10px] font-bold text-white/35">0&apos;</span>
                <span className="absolute -right-1 -top-5 text-[10px] font-bold text-white/35">90+</span>
              </div>
              <div className="space-y-3">
                {(report.previousMeeting?.scorers ?? []).map((s) => (
                  <div
                    key={`${s.player}-${s.minute}-row`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
                  >
                    <span
                      className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-black tabular-nums"
                      style={{
                        background: s.team === "hammarby" ? `${HIF_GREEN}22` : `${OPP_ACCENT}22`,
                        color: s.team === "hammarby" ? HIF_GREEN : OPP_ACCENT,
                      }}
                    >
                      {s.minute}&apos;
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white">⚽ {s.player}</p>
                      <p className="text-xs text-white/50">
                        {s.team === "hammarby" ? "HIF" : OPP_SHORT}
                        {s.isPenalty ? " · straff" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/55">
                {report.previousMeeting?.seriesTurnedNote}
              </p>
            </div>
          </div>
        </SectionShell>

        {/* 02 Inbördesmöten */}
        <SectionShell num="02" eyebrow="Inbördesmöten" title="Senaste cupmöte" mode={mode}>
          {report.headToHead ? (
            <H2HMeetingsBoard h2h={report.headToHead} mode={mode} />
          ) : (
            <p className="text-white/50">Ingen inbördes data tillgänglig.</p>
          )}
        </SectionShell>

        {/* 03 Mätvärden */}
        <SectionShell num="03" eyebrow="Säsongsdata" title="Nyckeltal per match" mode={mode}>
          {report.xpComparison && (
            <div
              className="mb-10 overflow-hidden rounded-3xl border p-5 md:p-8"
              style={{
                borderColor: `${HIF_GREEN}66`,
                background: `linear-gradient(145deg, ${HIF_GREEN}22, #111 55%)`,
              }}
            >
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.35em]" style={{ color: HIF_GREEN }}>
                    {report.xpComparison.title}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-podcast-display)] text-3xl font-black uppercase text-white md:text-4xl">
                    Tabell vs underliggande
                  </h3>
                  <p className="mt-1 text-xs text-white/45">{report.xpComparison.subtitle}</p>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-right md:text-base">
                  {report.xpComparison.headline}
                </p>
              </div>

              <StripeDivider className="mb-5 mt-4" />
              <div className="mb-5">
                <ColorLegend />
              </div>

              <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-1">
                <p className="text-right text-sm font-black uppercase tracking-wider" style={{ color: HIF_GREEN }}>
                  Hammarby
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">vs</p>
                <p className="text-left text-sm font-black uppercase tracking-wider text-white">
                  {OPP_SHORT}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {report.xpComparison.rows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-2xl border bg-black/45 p-4 md:p-5"
                    style={{ borderColor: `${HIF_GREEN}33` }}
                  >
                    <p
                      className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.28em]"
                      style={{ color: HIF_GREEN }}
                    >
                      {row.label}
                    </p>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                      <div className="text-right">
                        <p className="text-3xl font-black tabular-nums md:text-4xl" style={{ color: HIF_GREEN }}>
                          {row.hammarbyValue}
                        </p>
                        {row.hammarbyRank && (
                          <p className="mt-1 text-[11px] font-semibold text-white/45">{row.hammarbyRank}</p>
                        )}
                      </div>
                      <span className="pb-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
                        vs
                      </span>
                      <div className="text-left">
                        <p className="text-3xl font-black tabular-nums text-white md:text-4xl">
                          {row.opponentValue}
                        </p>
                        {row.opponentRank && (
                          <p className="mt-1 text-[11px] font-semibold text-white/45">{row.opponentRank}</p>
                        )}
                      </div>
                    </div>
                    <div
                      className="mt-4 h-1.5 w-full rounded-full"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 8px, #ffffff 8px 16px)`,
                        opacity: 0.7,
                      }}
                      aria-hidden
                    />
                    <p className="mt-3 text-center text-xs leading-snug text-white/50">{row.note}</p>
                  </div>
                ))}
              </div>

              <p
                className="mt-6 rounded-2xl border px-4 py-3 text-sm leading-relaxed text-white/85 md:text-base"
                style={{ borderColor: `${HIF_GREEN}66`, background: `${HIF_GREEN}18` }}
              >
                <span className="font-black uppercase tracking-wide" style={{ color: HIF_GREEN }}>
                  Takeaway ·{" "}
                </span>
                {report.xpComparison.takeaway}
              </p>

              {report.xpComparison.overperformanceDrivers &&
                report.xpComparison.overperformanceDrivers.length > 0 && (
                  <div
                    className="mt-8 rounded-3xl border bg-black/50 p-5 md:p-7"
                    style={{ borderColor: `${HIF_GREEN}44` }}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.35em]" style={{ color: HIF_GREEN }}>
                      {report.xpComparison.overperformanceTitle ?? "Varför överpresterar de?"}
                    </p>
                    <StripeDivider className="mb-4 mt-3" />
                    {report.xpComparison.overperformanceSummary && (
                      <p className="max-w-4xl text-sm leading-relaxed text-white/70 md:text-base">
                        {report.xpComparison.overperformanceSummary}
                      </p>
                    )}
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {report.xpComparison.overperformanceDrivers.map((d) => (
                        <div
                          key={d.label}
                          className="rounded-2xl border bg-white/[0.03] p-4 md:p-5"
                          style={{ borderColor: `${HIF_GREEN}33` }}
                        >
                          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                            <p className="text-sm font-black uppercase tracking-wide text-white">
                              {d.label}
                            </p>
                            <p
                              className="text-sm font-black tabular-nums md:text-base"
                              style={{ color: HIF_GREEN }}
                            >
                              {d.value}
                            </p>
                          </div>
                          <p className="text-xs leading-relaxed text-white/55 md:text-sm">
                            {d.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          <div className="mb-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-white/60">
              Grön stapel = Hammarby. Grå = {OPP_SHORT}. Längre stapel = starkare värde på mätetalet.
              Rankningar är inom respektive liga (Allsvenskan 16 / Ettan 32).
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
                {OPP_SHORT}
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
                            background: OPP_MUTED,
                            opacity: !hLead ? 1 : 0.5,
                            boxShadow: !hLead ? `0 0 16px ${OPP_MUTED}88` : undefined,
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
                <span style={{ color: OPP_MUTED }}>● {OPP_SHORT}</span>
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
                        <span style={{ color: OPP_MUTED }}>{p.opponentRank}</span>
                      </div>
                      <div className="flex h-4 justify-start overflow-hidden rounded-r-full bg-white/5">
                        <div
                          className="h-4 rounded-r-full"
                          style={{ width: `${g}%`, background: OPP_MUTED }}
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
                        <p className="text-xl font-black tabular-nums" style={{ color: OPP_MUTED }}>
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
                          style={{ width: `${oScore}%`, background: OPP_MUTED, opacity: !hBetter ? 1 : 0.5 }}
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
                      card.color === "green" ? HIF_GREEN : card.color === "red" ? "#b91c1c" : OPP_ACCENT,
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
                      card.color === "green" ? HIF_GREEN : card.color === "red" ? "#f87171" : OPP_ACCENT,
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
          <div
            className={`grid gap-6 ${
              (report.playersToWatch?.length ?? 0) <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
            }`}
          >
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
                      <p className="mb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: HIF_GREEN }}>
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

        {/* 06 Domaranalys */}
        {report.refereePreview ? (
        <SectionShell num="06" eyebrow="Domaranalys" title={report.refereePreview.name} mode={mode}>
          {(() => {
            const preview = report.refereePreview!;
            const prior = hammarbyRefereeMatches.filter((m) => m.referee === preview.name);
            const last = prior.length > 0 ? prior[prior.length - 1] : undefined;
            const idx =
              prior.length > 0
                ? Math.round(
                    prior.reduce((sum, m) => sum + calcDomarindex(m), 0) / prior.length,
                  )
                : 0;
            const foulDiff =
              prior.length > 0
                ? Math.round(
                    (prior.reduce((sum, m) => sum + calcFoulDiff(m), 0) / prior.length) * 10,
                  ) / 10
                : 0;
            const cardDiff =
              prior.length > 0
                ? Math.round(
                    (prior.reduce((sum, m) => sum + calcCardDiff(m), 0) / prior.length) * 10,
                  ) / 10
                : 0;
            const rating = getDomarRating(idx);
            const refereeLastName = preview.name.split(" ").slice(-1)[0] ?? preview.name;
            const showWolfLeagueProfile = preview.name === "Victor Wolf";

            return (
              <div className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="mb-4 flex flex-wrap items-end gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                        {preview.role}
                      </p>
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
                        style={{
                          background: `${HIF_GREEN}22`,
                          color: HIF_GREEN,
                          border: `1px solid ${HIF_GREEN}55`,
                        }}
                      >
                        Utsedd · {report.roundLabel}
                      </span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/45">
                      {preview.fixtureLabel}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                      {preview.talkTrack}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {preview.takeaways.map((t) => (
                        <li key={t} className="flex gap-3 text-sm leading-snug text-white/65 md:text-base">
                          <span style={{ color: HIF_GREEN }}>▸</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/matchstatistik/domaranalys"
                      className="mt-6 inline-flex rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition hover:opacity-90"
                      style={{ background: HIF_GREEN }}
                    >
                      Full domarstatistik 2026 →
                    </Link>
                  </div>

                  <div
                    className="rounded-3xl border p-6"
                    style={{ borderColor: `${HIF_GREEN}44`, background: "rgba(0,102,51,0.12)" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                      HIF-facit med {refereeLastName} 2026
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-[family-name:var(--font-podcast-display)] text-5xl font-black tabular-nums md:text-6xl"
                          style={{ color: idx > 0 ? HIF_GREEN : idx < 0 ? "#f87171" : "#fff" }}
                        >
                          {idx > 0 ? `+${idx}` : idx}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">
                          Domarindex
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">{rating.label}</p>
                        <p className="mt-1 text-xs text-white/45">{prior.length} match{prior.length === 1 ? "" : "er"}</p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-black/35 p-4 text-center">
                        <p className="text-2xl font-black tabular-nums text-white">
                          {foulDiff > 0 ? `+${foulDiff}` : foulDiff}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                          Regelfeldiff
                        </p>
                      </div>
                      <div className="rounded-2xl bg-black/35 p-4 text-center">
                        <p className="text-2xl font-black tabular-nums text-white">
                          {cardDiff > 0 ? `+${cardDiff}` : cardDiff}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                          Kortdiff
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {last && (
                  <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                      Senaste möte · Omgång {last.gameweek}
                    </p>
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                      <div>
                        <p className="font-[family-name:var(--font-podcast-display)] text-2xl font-black uppercase text-white md:text-3xl">
                          {last.matchName}
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                          {formatMeetingDate(last.date)} · {last.hammarby.isHome ? "Hemma" : "Borta"}
                        </p>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
                          Regelfel {last.hammarby.fouls}–{last.opponent.fouls}. Frisparkar (set piece){" "}
                          {last.hammarby.freeKicks}–{last.opponent.freeKicks}. Gula kort{" "}
                          {last.hammarby.yellowCards}–{last.opponent.yellowCards}. Röda{" "}
                          {last.hammarby.redCards}–{last.opponent.redCards}.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        {[
                          { l: "Regelfel HIF", v: last.hammarby.fouls, c: HIF_GREEN },
                          { l: "Regelfel Motst.", v: last.opponent.fouls, c: OPP_MUTED },
                          {
                            l: "Gula",
                            v: `${last.hammarby.yellowCards}–${last.opponent.yellowCards}`,
                            c: OPP_ACCENT,
                          },
                          {
                            l: "FK set piece",
                            v: `${last.hammarby.freeKicks}–${last.opponent.freeKicks}`,
                            c: "#fff",
                          },
                        ].map((s) => (
                          <div key={s.l} className="rounded-2xl bg-white/5 p-3 text-center">
                            <p className="text-xl font-black tabular-nums" style={{ color: s.c }}>
                              {s.v}
                            </p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/35">
                              {s.l}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {last.sourceUrl && (
                      <a
                        href={last.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block text-xs text-white/40 underline-offset-2 hover:text-white/70 hover:underline"
                      >
                        Källa: bolldata.se →
                      </a>
                    )}
                  </div>
                )}

                {showWolfLeagueProfile &&
                  (() => {
                  const profile = getVictorWolfHomeAwayProfile();
                  const season = [...victorWolfAllsvenskan2026Matches].reverse();
                  const yMax = Math.max(profile.homeYellowAvg, profile.awayYellowAvg, 0.1);
                  const careerMax = Math.max(profile.careerCards.home, profile.careerCards.away);

                  return (
                    <div className="space-y-6">
                      <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                              Hemma vs borta · Allsvenskan 2026
                            </p>
                            <p className="mt-2 max-w-2xl text-sm text-white/55 md:text-base">
                              {profile.matches} matcher. Bortalag får fler gula i {profile.awayMoreYellows} av{" "}
                              {profile.matches} matcher. Regelfel är nästan jämna hemma/borta.
                            </p>
                          </div>
                          <p className="text-xs font-bold uppercase tracking-widest text-white/35">
                            Resultat när Wolf dömer: {profile.homeWins}H–{profile.draws}O–{profile.awayWins}B
                          </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                          {[
                            {
                              label: "Regelfel / match",
                              home: profile.homeFoulAvg,
                              away: profile.awayFoulAvg,
                              max: Math.max(profile.homeFoulAvg, profile.awayFoulAvg, 0.1),
                              homeNote: "fouls av hemmalag",
                              awayNote: "fouls av bortalag",
                            },
                            {
                              label: "Gula kort / match",
                              home: profile.homeYellowAvg,
                              away: profile.awayYellowAvg,
                              max: yMax,
                              homeNote: `${profile.homeYellowTotal} totalt`,
                              awayNote: `${profile.awayYellowTotal} totalt`,
                            },
                          ].map((row) => (
                            <div key={row.label}>
                              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                                {row.label}
                              </p>
                              <div className="space-y-3">
                                <div>
                                  <div className="mb-1 flex justify-between text-xs font-bold uppercase tracking-wide">
                                    <span style={{ color: HIF_GREEN }}>Hemma</span>
                                    <span className="tabular-nums text-white">
                                      {row.home.toFixed(1).replace(".", ",")}
                                      <span className="ml-2 font-normal text-white/35">{row.homeNote}</span>
                                    </span>
                                  </div>
                                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                                    <div
                                      className="h-3 rounded-full"
                                      style={{
                                        width: `${(row.home / row.max) * 100}%`,
                                        background: HIF_GREEN,
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-1 flex justify-between text-xs font-bold uppercase tracking-wide">
                                    <span style={{ color: OPP_MUTED }}>Borta</span>
                                    <span className="tabular-nums text-white">
                                      {row.away.toFixed(1).replace(".", ",")}
                                      <span className="ml-2 font-normal text-white/35">{row.awayNote}</span>
                                    </span>
                                  </div>
                                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                                    <div
                                      className="h-3 rounded-full"
                                      style={{
                                        width: `${(row.away / row.max) * 100}%`,
                                        background: OPP_MUTED,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          <div className="rounded-2xl bg-white/5 p-4 text-center">
                            <p className="text-2xl font-black tabular-nums text-white">
                              {profile.yellowPerMatch.toFixed(1).replace(".", ",")}
                            </p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Gula / match
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white/5 p-4 text-center">
                            <p className="text-2xl font-black tabular-nums text-white">
                              {profile.homeFoulAvg.toFixed(1).replace(".", ",")}–{profile.awayFoulAvg.toFixed(1).replace(".", ",")}
                            </p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Fouls hemma–borta
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white/5 p-4 text-center">
                            <p className="text-sm font-black text-white">
                              Karriär kort {profile.careerCards.home}–{profile.careerCards.away}
                            </p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Hemma–borta · {profile.careerCards.source}
                            </p>
                            <div className="mt-3 grid grid-cols-[1fr_2px_1fr] items-stretch">
                              <div className="flex h-2 justify-end overflow-hidden rounded-l-full bg-white/5">
                                <div
                                  className="h-2 rounded-l-full"
                                  style={{
                                    width: `${(profile.careerCards.home / careerMax) * 100}%`,
                                    background: HIF_GREEN,
                                  }}
                                />
                              </div>
                              <div className="bg-white/15" />
                              <div className="flex h-2 justify-start overflow-hidden rounded-r-full bg-white/5">
                                <div
                                  className="h-2 rounded-r-full"
                                  style={{
                                    width: `${(profile.careerCards.away / careerMax) * 100}%`,
                                    background: OPP_MUTED,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                          Wolfs seriematcher 2026 · nyast först
                        </p>
                        <div className="space-y-2">
                          {season.map((m) => {
                            const awayCardsLead = m.awayYellow > m.homeYellow;
                            const homeCardsLead = m.homeYellow > m.awayYellow;
                            return (
                              <div
                                key={m.date + m.fixture}
                                className="grid items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 md:grid-cols-[120px_1fr_auto]"
                              >
                                <div>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                                    {formatMeetingDate(m.date)}
                                  </p>
                                  <p className="mt-0.5 text-sm font-black tabular-nums text-white">
                                    {m.homeGoals}–{m.awayGoals}
                                  </p>
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-white/85">{m.fixture}</p>
                                  <p className="mt-1 text-[11px] text-white/40">
                                    Regelfel {m.homeFouls}–{m.awayFouls} · FK set piece {m.homeFreeKicks}–{m.awayFreeKicks}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className="rounded-full px-2.5 py-1 text-[10px] font-black tabular-nums tracking-wide"
                                    style={{
                                      background: homeCardsLead ? `${HIF_GREEN}33` : "rgba(255,255,255,0.06)",
                                      color: homeCardsLead ? HIF_GREEN : "#a1a1aa",
                                    }}
                                  >
                                    H {m.homeYellow}
                                  </span>
                                  <span className="text-[10px] text-white/25">gula</span>
                                  <span
                                    className="rounded-full px-2.5 py-1 text-[10px] font-black tabular-nums tracking-wide"
                                    style={{
                                      background: awayCardsLead ? "rgba(138,144,150,0.35)" : "rgba(255,255,255,0.06)",
                                      color: awayCardsLead ? "#d4d4d8" : "#a1a1aa",
                                    }}
                                  >
                                    B {m.awayYellow}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <p className="mt-3 text-[11px] text-white/35">
                          Källa: bolldata.se · Allsvenskan 2026. Gula = kort mot respektive lag.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {prior.length > 1 && (
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                      Alla HIF-möten med {refereeLastName} 2026 · nyast först
                    </p>
                    <div className="space-y-2">
                      {[...prior].reverse().map((m) => {
                        const mIdx = calcDomarindex(m);
                        return (
                          <div
                            key={m.key}
                            className="grid items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 md:grid-cols-[120px_1fr_auto]"
                          >
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                                Omg {m.gameweek}
                              </p>
                              <p
                                className="mt-0.5 text-sm font-black tabular-nums"
                                style={{
                                  color: mIdx > 0 ? HIF_GREEN : mIdx < 0 ? "#f87171" : "#fff",
                                }}
                              >
                                {mIdx > 0 ? `+${mIdx}` : mIdx}
                              </p>
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-white/85">{m.matchName}</p>
                              <p className="mt-1 text-[11px] text-white/40">
                                Regelfel {m.hammarby.fouls}–{m.opponent.fouls} · Gula{" "}
                                {m.hammarby.yellowCards}–{m.opponent.yellowCards} ·{" "}
                                {m.hammarby.isHome ? "Hemma" : "Borta"}
                              </p>
                            </div>
                            <div className="text-right text-[10px] font-bold uppercase tracking-widest text-white/35">
                              Index
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </SectionShell>
        ) : report.cupSpecial ? (
        <SectionShell num="06" eyebrow="Cup-special" title={report.cupSpecial.title} mode={mode}>
          <p className="max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
            {report.cupSpecial.context}
          </p>
          <ul className="mt-6 space-y-3">
            {report.cupSpecial.tacticalKeys.map((k) => (
              <li key={k} className="flex gap-3 text-sm leading-snug text-white/65 md:text-base">
                <span style={{ color: HIF_GREEN }}>▸</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </SectionShell>
        ) : null}

        {/* 07 Plan */}
        <SectionShell num="07" eyebrow="Matchplan" title="Så kan HIF vinna" mode={mode}>
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

        {/* 08 Goal windows */}
        <SectionShell num="08" eyebrow="Målfönstret" title="När målen faller" mode={mode}>
          {report.goalWindows.length > 0 ? (
            <>
          <p className="mb-6 max-w-3xl text-white/60">
            HIF-mål (grön densitet) vs {OPP_SHORT} insläppta (grå densitet) per 15-minutersfönster. Mörkare =
            högre volym.
          </p>

          {(() => {
            const maxH = Math.max(...report.goalWindows.map((w) => w.hammarbyGoals), 1);
            const maxG = Math.max(...report.goalWindows.map((w) => w.opponentConcededGoals), 1);
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
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: OPP_MUTED }}>
                    {OPP_SHORT} insläppta
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
            </>
          ) : (
            <p className="mb-6 max-w-3xl text-white/60">
              Detaljerade målfönster per 15 minuter saknas för Ettan-jämförelsen. Nedan: cup- och stilnycklar
              från Twelve-rapporten.
            </p>
          )}

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

        {/* 09 Summary */}
        <SectionShell num="09" eyebrow="Summering" title="Källor & ordlista" mode={mode}>
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
              <span className="text-white/55">{OPP_SHORT}</span>
            </p>
            <p className="text-xs text-white/35">
              {homeTeamShort} – {awayTeamShort} · Big Screen Podcast Deck · {report.roundLabel} · 2026
            </p>
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
