"use client";

import Link from "next/link";
import { useState } from "react";
import {
  besaraBasicStats,
  bolldataStats2025,
  bolldataStats2026,
  finishingData,
  keyInsights,
  rankToPercentile,
  seasonNarratives,
  twelveCategories,
  twelveRanks,
  twelveSubMetrics,
  type BesaraSeason,
  type CategoryKey,
} from "@/lib/besaraSeasonComparisonData";

// ─── Design tokens ─────────────────────────────────────────────────────────────

const SEASON_STYLES: Record<BesaraSeason, {
  label: string;
  stroke: string;
  fill: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
  dot: string;
  textColor: string;
  ringColor: string;
}> = {
  "2025": {
    label: "2025",
    stroke: "#60a5fa",
    fill: "rgba(96, 165, 250, 0.18)",
    chipBorder: "border-sky-400/40",
    chipBg: "bg-sky-400/10",
    chipText: "text-sky-100",
    dot: "bg-sky-300",
    textColor: "text-sky-300",
    ringColor: "ring-sky-400/30",
  },
  "2026": {
    label: "2026",
    stroke: "#34d399",
    fill: "rgba(52, 211, 153, 0.22)",
    chipBorder: "border-emerald-400/40",
    chipBg: "bg-emerald-400/10",
    chipText: "text-emerald-100",
    dot: "bg-emerald-300",
    textColor: "text-emerald-300",
    ringColor: "ring-emerald-400/30",
  },
};

const SEASONS: BesaraSeason[] = ["2025", "2026"];

// ─── Radar chart ───────────────────────────────────────────────────────────────

const CX = 180;
const CY = 180;
const R  = 120;
const LR = 148;

function polarPoint(index: number, total: number, score: number, radius: number) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  return {
    x: CX + Math.cos(angle) * (score / 100) * radius,
    y: CY + Math.sin(angle) * (score / 100) * radius,
    angle,
  };
}

function labelAnchor(angle: number): "start" | "middle" | "end" {
  const c = Math.cos(angle);
  if (c > 0.3) return "start";
  if (c < -0.3) return "end";
  return "middle";
}

function labelDy(angle: number): number {
  const s = Math.sin(angle);
  if (s < -0.5) return -6;
  if (s > 0.5) return 10;
  return 4;
}

function polygonString(scores: number[], axisCount: number) {
  return scores
    .map((score, i) => polarPoint(i, axisCount, score, R))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
}

function RadarChart({ activeSeason }: { activeSeason: BesaraSeason | "both" }) {
  const axes = twelveCategories;
  const n = axes.length;
  const rings = [25, 50, 75, 100];

  return (
    <svg
      viewBox="0 0 360 360"
      className="mx-auto h-[340px] w-full min-w-[300px]"
      role="img"
      aria-label="Radardiagram – Besara 2025 vs 2026"
    >
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygonString(Array(n).fill(ring), n)}
          fill={ring === 100 ? "rgba(255,255,255,0.03)" : "none"}
          stroke={ring === 100 ? "rgba(255,255,255,0.18)" : "rgba(148,163,184,0.2)"}
          strokeWidth={ring === 100 ? 1.5 : 1}
        />
      ))}

      {axes.map((axis, i) => {
        const outer = polarPoint(i, n, 100, R);
        const label = polarPoint(i, n, 100, LR);
        return (
          <g key={axis.key}>
            <line
              x1={CX} y1={CY}
              x2={outer.x} y2={outer.y}
              stroke="rgba(148,163,184,0.25)"
            />
            <text
              x={label.x} y={label.y}
              fontSize={9}
              fill="rgb(203,213,225)"
              textAnchor={labelAnchor(label.angle)}
              dy={labelDy(label.angle)}
            >
              {axis.shortLabel}
            </text>
          </g>
        );
      })}

      {SEASONS.map((season) => {
        if (activeSeason !== "both" && activeSeason !== season) return null;
        const ranks = twelveRanks[season];
        const scores = axes.map((a) =>
          rankToPercentile(ranks[a.key as CategoryKey], ranks.total),
        );
        const style = SEASON_STYLES[season];
        return (
          <polygon
            key={season}
            points={polygonString(scores, n)}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={2}
          />
        );
      })}

      {SEASONS.map((season) => {
        if (activeSeason !== "both" && activeSeason !== season) return null;
        const ranks = twelveRanks[season];
        const style = SEASON_STYLES[season];
        return axes.map((axis, i) => {
          const score = rankToPercentile(ranks[axis.key as CategoryKey], ranks.total);
          const pt = polarPoint(i, n, score, R);
          return (
            <circle
              key={`${season}-${axis.key}`}
              cx={pt.x} cy={pt.y}
              r={3}
              fill={style.stroke}
            />
          );
        });
      })}
    </svg>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value2025,
  value2026,
  highlight,
  note,
}: {
  label: string;
  value2025: string;
  value2026: string;
  highlight?: "2025" | "2026" | "equal";
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-neutral-900 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
        {label}
      </p>
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1">
          <p className={`text-xs font-bold uppercase tracking-wide ${SEASON_STYLES["2025"].textColor}`}>2025</p>
          <p className={`mt-1 text-2xl font-black tabular-nums ${highlight === "2025" ? "text-sky-200" : "text-slate-200"}`}>
            {value2025}
          </p>
        </div>
        <div className="text-slate-600">vs</div>
        <div className="flex-1 text-right">
          <p className={`text-xs font-bold uppercase tracking-wide ${SEASON_STYLES["2026"].textColor}`}>2026</p>
          <p className={`mt-1 text-2xl font-black tabular-nums ${highlight === "2026" ? "text-emerald-200" : "text-slate-200"}`}>
            {value2026}
          </p>
        </div>
      </div>
      {highlight && highlight !== "equal" && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${highlight === "2026" ? "bg-emerald-400" : "bg-sky-400"}`} />
          <p className="text-xs text-slate-400">
            {highlight === "2026" ? "Bättre 2026" : "Bättre 2025"}
          </p>
        </div>
      )}
      {note && <p className="mt-2 text-[11px] text-slate-500">{note}</p>}
    </div>
  );
}

// ─── Bar row for sub-metrics ───────────────────────────────────────────────────

function SubMetricRow({
  label,
  rank2025,
  total2025,
  rank2026,
  total2026,
}: {
  label: string;
  rank2025: number;
  total2025: number;
  rank2026: number;
  total2026: number;
}) {
  const pct25 = rankToPercentile(rank2025, total2025);
  const pct26 = rankToPercentile(rank2026, total2026);
  const better26 = pct26 > pct25 + 3;
  const better25 = pct25 > pct26 + 3;

  return (
    <div className="py-3">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-slate-200">{label}</span>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className={`font-bold ${SEASON_STYLES["2025"].textColor}`}>
            {rank2025}/{total2025}
          </span>
          <span>→</span>
          <span className={`font-bold ${SEASON_STYLES["2026"].textColor}`}>
            {rank2026}/{total2026}
          </span>
          {better26 && <span className="rounded bg-emerald-500/20 px-1 py-0.5 font-black text-emerald-300">↑</span>}
          {better25 && <span className="rounded bg-sky-500/20 px-1 py-0.5 font-black text-sky-300">↓</span>}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-8 text-[10px] text-sky-400">2025</span>
          <div className="h-2 flex-1 rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-sky-400 transition-all"
              style={{ width: `${pct25}%` }}
            />
          </div>
          <span className="w-8 text-right text-[10px] text-slate-400">{pct25}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 text-[10px] text-emerald-400">2026</span>
          <div className="h-2 flex-1 rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-emerald-400 transition-all"
              style={{ width: `${pct26}%` }}
            />
          </div>
          <span className="w-8 text-right text-[10px] text-slate-400">{pct26}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Shot quality section ─────────────────────────────────────────────────────

function GoalVsXGBar({ season, goals, npXG }: { season: BesaraSeason; goals: number; npXG: number }) {
  const style = SEASON_STYLES[season];
  const overPerf = goals - npXG;
  const overPct = Math.round((overPerf / npXG) * 100);
  const maxVal = Math.max(goals, npXG) * 1.1;
  const goalPct = (goals / maxVal) * 100;
  const xgPct  = (npXG  / maxVal) * 100;

  return (
    <div className={`rounded-xl border p-4 ${style.chipBorder} bg-neutral-900/80`}>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-xs font-black uppercase tracking-wide ${style.textColor}`}>{season}</p>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
          overPerf > 2 ? "bg-sky-500/20 text-sky-200" :
          overPerf > 0 ? "bg-emerald-500/20 text-emerald-200" :
                         "bg-slate-700/40 text-slate-400"
        }`}>
          {overPerf > 0 ? `+${overPerf.toFixed(2)}` : overPerf.toFixed(2)} vs xG
          {overPerf > 0.5 && ` (${overPct}%)`}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="font-semibold text-slate-300">Mål</span>
            <span className="font-black text-white">{goals}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <div className="h-3 rounded-full" style={{ width: `${goalPct}%`, backgroundColor: style.stroke }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="font-semibold text-slate-300">np xG</span>
            <span className="font-black text-slate-300">{npXG.toFixed(2)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <div className="h-3 rounded-full opacity-50" style={{ width: `${xgPct}%`, backgroundColor: style.stroke }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShotQualitySection() {
  const fd25 = finishingData.find((d) => d.season === "2025")!;
  const fd26 = finishingData.find((d) => d.season === "2026")!;

  const boxMetrics = [
    { label: "Box-löpningar (carries)",  r25: fd25.boxEntriesRank,    t25: fd25.boxEntriesTotal,    r26: fd26.boxEntriesRank,    t26: fd26.boxEntriesTotal    },
    { label: "Box-beröringar",           r25: fd25.boxTouchesRank,    t25: fd25.boxTouchesTotal,    r26: fd26.boxTouchesRank,    t26: fd26.boxTouchesTotal    },
    { label: "Box-mottagningar",         r25: fd25.boxReceptionsRank, t25: fd25.boxReceptionsTotal, r26: fd26.boxReceptionsRank, t26: fd26.boxReceptionsTotal },
    { label: "np xG per avslut",         r25: fd25.npXGPerShotRank,   t25: fd25.npXGPerShotTotal,   r26: fd26.npXGPerShotRank,   t26: fd26.npXGPerShotTotal   },
  ];

  return (
    <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
        Twelve.football · Box Threat
      </p>
      <h2 className="mt-1 text-2xl font-black text-white">
        Varför färre mål 2026?
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Har avslutsfrekvensen att göra med VAR han kommer till skott?
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {/* Goals vs xG bars */}
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
            Mål vs xG – avslutningsfaktorn
          </p>
          <div className="space-y-3">
            <GoalVsXGBar season="2025" goals={fd25.goals} npXG={fd25.npXG} />
            <GoalVsXGBar season="2026" goals={fd26.goals} npXG={fd26.npXG} />
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">
            2025: +5,15 mål över xG (+43%) – historiskt exceptionellt.
            2026: +0,17 (+3,5%) – normalt avslut. Droppen förklaras till
            stor del av normalisering, inte försämrade skottlägen.
          </p>
        </div>

        {/* Box presence + shot quality bars */}
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
            Boxnärvaro & skottkvalitet – percentil
          </p>
          <div className="space-y-3">
            {boxMetrics.map((m) => {
              const p25 = rankToPercentile(m.r25, m.t25);
              const p26 = rankToPercentile(m.r26, m.t26);
              const up = p26 > p25 + 3;
              const down = p25 > p26 + 3;
              const isQuality = m.label.includes("xG");
              return (
                <div key={m.label} className="rounded-xl border border-slate-700/40 bg-neutral-900/80 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-200">{m.label}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-sky-300">{m.r25}/{m.t25}</span>
                      <span className="text-slate-600">→</span>
                      <span className="text-emerald-300">{m.r26}/{m.t26}</span>
                      {up   && <span className={`font-black ${isQuality ? "text-amber-400" : "text-emerald-400"}`}>
                        {isQuality ? "↓" : "↑"}
                      </span>}
                      {down && <span className={`font-black ${isQuality ? "text-emerald-400" : "text-amber-400"}`}>
                        {isQuality ? "↑" : "↓"}
                      </span>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {(["2025", "2026"] as BesaraSeason[]).map((s) => {
                      const pct = s === "2025" ? p25 : p26;
                      const style = SEASON_STYLES[s];
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <span className="w-6 text-[10px]" style={{ color: style.stroke }}>{s}</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                            <div className="h-2 rounded-full transition-all"
                              style={{ width: `${pct}%`, backgroundColor: style.stroke }}
                            />
                          </div>
                          <span className="w-7 text-right text-[10px] text-slate-500">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                  {isQuality && (
                    <p className="mt-1.5 text-[10px] text-amber-400/70">
                      Skottpositionernas kvalitet sjönk – trots mer boxnärvaro
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-5 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Slutsats</p>
        <p className="mt-1 text-lg font-black text-white">
          Skottlägena är ett litet problem – finishing-normaliseringen är det stora
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              n: "1",
              tone: "emerald",
              title: "Han är MER i boxen 2026",
              body: "Box-löpningar: 61% → 90% percentil. Box-beröringar: 73% → 90%. Han når boxen oftare och bättre – det är inte problemet.",
            },
            {
              n: "2",
              tone: "amber",
              title: "Skottpositionerna är något sämre",
              body: "np xG per avslut sjönk från 72:a till 47:e percentilen. Han får in fler skott men från lite sämre vinklar/lägen. Bidrar delvis.",
            },
            {
              n: "3",
              tone: "sky",
              title: "Huvudorsaken: 2025 var exceptionellt",
              body: "2025 avslutade Besara +5,15 mål ÖVER sitt xG (+43%) – ett av de högsta överprestationerna i ligan. 2026 är han på +0,17 (+3,5%), alltså normalt. Den droppen är statistisk normalisering, inte försämring.",
            },
          ].map(({ n, tone, title, body }) => (
            <div
              key={n}
              className={`flex gap-3 rounded-xl border p-4 ${
                tone === "emerald" ? "border-emerald-500/25 bg-emerald-500/8" :
                tone === "amber"   ? "border-amber-400/25 bg-amber-400/8" :
                                     "border-sky-400/25 bg-sky-400/8"
              }`}
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                tone === "emerald" ? "bg-emerald-500/30 text-emerald-200" :
                tone === "amber"   ? "bg-amber-400/30 text-amber-200" :
                                     "bg-sky-400/30 text-sky-200"
              }`}>
                {n}
              </div>
              <div>
                <p className={`text-sm font-black ${
                  tone === "emerald" ? "text-emerald-200" :
                  tone === "amber"   ? "text-amber-200" :
                                       "text-sky-200"
                }`}>
                  {title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bolldata comparison row ───────────────────────────────────────────────────

function BolldataCmpRow({
  label,
  v25,
  v26,
  highlight,
  sub,
}: {
  label: string;
  v25: string;
  v26: string;
  highlight?: "2025" | "2026" | "equal";
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-2 py-2.5">
      <div className="flex-1">
        <p className="text-xs text-slate-300">{label}</p>
        {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
      </div>
      <p className={`w-16 text-right tabular-nums text-sm font-black ${
        highlight === "2025" ? "text-sky-200" : "text-sky-400"
      }`}>
        {v25}
      </p>
      <p className={`w-16 text-right tabular-nums text-sm font-black ${
        highlight === "2026" ? "text-emerald-200" : "text-emerald-400"
      }`}>
        {v26}
      </p>
    </div>
  );
}

function BolldataGroupCard({
  title,
  rows,
}: {
  title: string;
  rows: Array<{
    label: string;
    v25: string;
    v26: string;
    highlight?: "2025" | "2026" | "equal";
    sub?: string;
  }>;
}) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-neutral-900/80 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400">{title}</p>
        <div className="flex gap-3 text-[10px] font-black">
          <span className="text-sky-400">2025</span>
          <span className="text-emerald-400">2026</span>
        </div>
      </div>
      <div className="divide-y divide-slate-700/30">
        {rows.map((row) => (
          <BolldataCmpRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

// ─── Broadcaster hero helpers ─────────────────────────────────────────────────

function JerseyGraphic() {
  return (
    <svg
      viewBox="0 0 120 140"
      className="h-full w-full"
      role="img"
      aria-label="Hammarby tröja #10"
    >
      <defs>
        <radialGradient id="jerseyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(52,211,153,0.25)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="75" rx="52" ry="58" fill="url(#jerseyGlow)" />
      <path
        d="M42,4 L20,24 L2,18 L12,62 L30,56 L30,136 L90,136 L90,56 L108,62 L118,18 L100,24 L78,4 C75,16 45,16 42,4Z"
        fill="rgba(52,211,153,0.12)"
        stroke="rgba(52,211,153,0.45)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <text
        x="60" y="100"
        textAnchor="middle"
        fontSize="44"
        fontWeight="900"
        fill="rgba(52,211,153,0.85)"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
      >
        10
      </text>
    </svg>
  );
}

function HeroStat({
  label, value, sub, tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "emerald" | "sky" | "amber" | "violet";
}) {
  const colors = {
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    sky:     "border-sky-500/30     bg-sky-500/10     text-sky-200",
    amber:   "border-amber-400/30   bg-amber-400/10   text-amber-200",
    violet:  "border-violet-500/30  bg-violet-500/10  text-violet-200",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 ${colors[tone]}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-0.5 text-2xl font-black tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] opacity-60">{sub}</p>}
    </div>
  );
}

function BroadcasterHero() {
  return (
    <header
      className="relative overflow-hidden border-b border-emerald-500/30 bg-neutral-900/90"
      style={{
        backgroundImage:
          "radial-gradient(circle at 70% 50%, rgba(52,211,153,0.07) 0%, transparent 55%), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
        backgroundSize: "auto, 28px 28px",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <Link
          href="/spelarstatistik"
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-300"
        >
          ← Spelarstatistik
        </Link>

        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto]">
          {/* Left: text */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-300">
                Taktisk Spelarprofil
              </span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400">
                Allsvenskan · Hammarby IF
              </span>
            </div>

            <h1 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
              Nahir Besara
            </h1>
            <p className="mt-1 text-lg font-black text-emerald-400 md:text-xl">
              #10 · Säsong 2025 vs 2026
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">
              Från ligans skarpaste avslutare till kreativ motor och spelstartare.
              Samma xG/90, samma boxhot – men en helt ny offensiv roll.
            </p>
          </div>

          {/* Right: jersey graphic */}
          <div className="flex items-center justify-end">
            <div className="h-36 w-28 opacity-90 md:h-44 md:w-36">
              <JerseyGraphic />
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <HeroStat label="xG / 90 (båda åren)" value="≈ 0,39"      sub="Identisk chansvolym"     tone="emerald" />
          <HeroStat label="Assist / 90 2026"     value="0,39"         sub="vs 0,10 – 2025"          tone="sky"     />
          <HeroStat label="G+A / 90 2026"        value="0,78"         sub="vs 0,66 – 2025 (+18%)"   tone="amber"   />
          <HeroStat label="Box Threat rank"       value="Topp 10"      sub="Elit i båda säsongerna"  tone="violet"  />
        </div>
      </div>
    </header>
  );
}

// ─── Constants section ────────────────────────────────────────────────────────

function ConstantCard({
  label, detail, pct25, pct26, rank25, total25, rank26, total26,
}: {
  label: string;
  detail: string;
  pct25?: number;
  pct26?: number;
  rank25?: string;
  total25?: string;
  rank26?: string;
  total26?: string;
}) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-neutral-900 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-black text-white">{label}</p>
        <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-300">
          Konstant
        </span>
      </div>
      <p className="mt-1 text-xs text-neutral-400">{detail}</p>
      {(pct25 !== undefined && pct26 !== undefined) && (
        <div className="mt-3 space-y-1.5">
          {([["2025", pct25, "#60a5fa"], ["2026", pct26, "#34d399"]] as const).map(([yr, pct, color]) => (
            <div key={yr} className="flex items-center gap-2">
              <span className="w-7 text-[10px] font-bold" style={{ color }}>{yr}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-800">
                <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
              <span className="w-7 text-right text-[10px] text-neutral-500">{pct}%</span>
            </div>
          ))}
        </div>
      )}
      {rank25 && (
        <div className="mt-3 flex items-center gap-3 text-xs">
          <span className="text-sky-400 font-bold">{rank25}/{total25}</span>
          <span className="text-neutral-600">→</span>
          <span className="text-emerald-400 font-bold">{rank26}/{total26}</span>
        </div>
      )}
    </div>
  );
}

function ConstantsSection() {
  return (
    <section className="rounded-2xl border border-emerald-500/25 bg-neutral-900/50 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-xl">🟢</div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Konstanter</p>
          <h2 className="text-xl font-black text-white">Vad som är sig LIKT i Besaras spel</h2>
        </div>
      </div>
      <p className="mt-2 text-sm text-neutral-400">
        Dessa mätvärden håller exakt samma höga Allsvenska elitnivå – eller har förbättrats – oavsett taktisk rollförändring.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ConstantCard
          label="xG / 90 – chansvolym"
          detail="Identisk per minut i båda säsongerna. Han skapar lika farliga lägen för sig själv oavsett roll."
          pct25={rankToPercentile(8, 119)}
          pct26={rankToPercentile(7, 73)}
          rank25="8" total25="119" rank26="7" total26="73"
        />
        <ConstantCard
          label="Box Threat"
          detail="Topp 10 i jämförelsegruppen båda åren. Fortsatt ligatoppklass i hur han hotar från boxen."
          pct25={rankToPercentile(10, 119)}
          pct26={rankToPercentile(10, 73)}
          rank25="10" total25="119" rank26="10" total26="73"
        />
        <ConstantCard
          label="Effektivitet"
          detail="13/119 → 6/73. Förbättrad. Maximerar värdet av varje bollkontakt oavsett hur rollen ser ut."
          pct25={rankToPercentile(13, 119)}
          pct26={rankToPercentile(6, 73)}
          rank25="13" total25="119" rank26="6" total26="73"
        />
        <ConstantCard
          label="xGChain / ball possession"
          detail="Rank 4/119 → 4/73. Oförändrad absolut elitnivå – involveras i ligets farligaste angrepp."
          pct25={rankToPercentile(4, 119)}
          pct26={rankToPercentile(4, 73)}
          rank25="4" total25="119" rank26="4" total26="73"
        />
        <ConstantCard
          label="np xG + xA per 100 touches"
          detail="12/119 → 9/73. Förbättrad. Varje beröring genererar mer förväntad poäng 2026 än 2025."
          pct25={rankToPercentile(12, 119)}
          pct26={rankToPercentile(9, 73)}
          rank25="12" total25="119" rank26="9" total26="73"
        />
        <ConstantCard
          label="G+A / 90 (totalt output)"
          detail="0,66 (2025) → 0,78 (2026). Mer total offensiv output per minut, trots färre mål."
          pct25={Math.round((0.66 / 0.78) * 78)}
          pct26={78}
          rank25="0,66" total25="per 90" rank26="0,78" total26="per 90"
        />
      </div>
    </section>
  );
}

// ─── Changes section ──────────────────────────────────────────────────────────

function ChangeCard({
  label,
  val25,
  val26,
  unit,
  pct25,
  pct26,
  direction,
  tacticTitle,
  tacticBody,
}: {
  label: string;
  val25: string;
  val26: string;
  unit?: string;
  pct25: number;
  pct26: number;
  direction: "up" | "down";
  tacticTitle: string;
  tacticBody: string;
}) {
  const improved = direction === "up";

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-neutral-400">{label}</p>

      {/* Big value display */}
      <div className="mt-3 flex items-end gap-4">
        <div>
          <p className="text-[10px] font-bold text-sky-400 uppercase">2025</p>
          <p className="text-3xl font-black tabular-nums text-sky-200">{val25}<span className="text-lg text-neutral-500">{unit}</span></p>
        </div>
        <div className="mb-1 text-xl font-black text-neutral-600">→</div>
        <div>
          <p className="text-[10px] font-bold text-emerald-400 uppercase">2026</p>
          <p className={`text-3xl font-black tabular-nums ${improved ? "text-emerald-200" : "text-amber-200"}`}>
            {val26}<span className="text-lg text-neutral-500">{unit}</span>
          </p>
        </div>
        <div className="mb-1 ml-auto">
          <span className={`rounded-full px-3 py-1 text-sm font-black ${
            improved ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
          }`}>
            {improved ? "↑ Upp" : "↓ Ned"}
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="mt-4 space-y-1.5">
        {([["2025", pct25, "#60a5fa"], ["2026", pct26, "#34d399"]] as const).map(([yr, pct, color]) => (
          <div key={yr} className="flex items-center gap-2">
            <span className="w-7 text-[10px] font-bold" style={{ color }}>{yr}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
              <div className="h-2.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
            <span className="w-8 text-right text-[10px] text-neutral-500">{pct}%</span>
          </div>
        ))}
      </div>

      {/* Tactical reason box */}
      <div className={`mt-4 rounded-xl border px-4 py-3 ${
        improved
          ? "border-emerald-500/20 bg-emerald-500/8"
          : "border-amber-400/20 bg-amber-400/8"
      }`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${
          improved ? "text-emerald-400" : "text-amber-400"
        }`}>
          🔍 Taktisk orsak
        </p>
        <p className={`mt-1 text-sm font-black ${
          improved ? "text-emerald-200" : "text-amber-200"
        }`}>
          {tacticTitle}
        </p>
        <p className="mt-1 text-xs leading-5 text-neutral-300">{tacticBody}</p>
      </div>
    </div>
  );
}

function ChangesSection() {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-xl">⚡</div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Förändringar</p>
          <h2 className="text-xl font-black text-white">Vad som HAR FÖRÄNDRATS</h2>
        </div>
      </div>
      <p className="mt-2 text-sm text-neutral-400">
        Tydliga mätförändringar med taktisk förklaring – direkt användbart som talpunkter i podden.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ChangeCard
          label="Mål / 90 min"
          val25="0,56" val26="0,39"
          pct25={Math.round((0.56 / 0.78) * 72)}
          pct26={Math.round((0.39 / 0.78) * 72) + 10}
          direction="down"
          tacticTitle="Statistisk normalisering – ej försämring"
          tacticBody="2025 avslutade Besara +43% ÖVER sitt xG (+5,15 mål). Det kallas regression to the mean. 2026 är han på +0,17 – precis på förväntat. Skottlägen och chansvolym är oförändrade."
        />
        <ChangeCard
          label="Assist / 90 min"
          val25="0,10" val26="0,39"
          pct25={13}
          pct26={72}
          direction="up"
          tacticTitle="Rollskifte: från finisher till spelstartare"
          tacticBody="Besara agerar nu som primär bollcirkulatör. Adjei och Johansson gör de löpningar in bakom som Besara tidigare stod för. Resultatet: assists gick från 3 till 5 på hälften av matcherna."
        />
        <ChangeCard
          label="Skapa för lagkamrater (rank)"
          val25="39/119" val26="4/73"
          pct25={rankToPercentile(39, 119)}
          pct26={rankToPercentile(4, 73)}
          direction="up"
          tacticTitle="Central playmaker-roll"
          tacticBody="Från 67:e till 95:e percentilen. Chans-skapande passningar: 15/119 → 2/73 (näst bäst i hela Allsvenskan). Besara är nu laget strategiske spelöppnare, inte primärt anfallaren."
        />
        <ChangeCard
          label="Progression i uppbyggnad (rank)"
          val25="90/119" val26="37/73"
          pct25={rankToPercentile(90, 119)}
          pct26={rankToPercentile(37, 73)}
          direction="up"
          tacticTitle="Friare i uppbyggnadsfasen"
          tacticBody="Från 25:e till 51:a percentilen. Besara kan nu ta fler framåtpassningar och bolla sig upp på planen. Lägre initial position i formationen ger mer involvering i cirkulering."
        />
      </div>
    </section>
  );
}

// ─── Main dashboard ────────────────────────────────────────────────────────────

export function BesaraSeasonComparisonDashboard() {
  const [radarFilter, setRadarFilter] = useState<BesaraSeason | "both">("both");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const stats25 = besaraBasicStats.find((s) => s.season === "2025")!;
  const stats26 = besaraBasicStats.find((s) => s.season === "2026")!;
  const narrative25 = seasonNarratives.find((n) => n.season === "2025")!;
  const narrative26 = seasonNarratives.find((n) => n.season === "2026")!;

  const filteredSubMetrics =
    activeCategory === null
      ? twelveSubMetrics
      : twelveSubMetrics.filter((m) => m.category === activeCategory);

  const categories = Array.from(new Set(twelveSubMetrics.map((m) => m.category)));

  return (
    <div className="min-h-screen bg-neutral-950">
      <BroadcasterHero />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">

        {/* ── Konstanter & förändringar ── */}
        <ConstantsSection />
        <ChangesSection />

        {/* ── Säsongskort ── */}
        <section className="grid gap-4 md:grid-cols-2">
          {[narrative25, narrative26].map((n) => {
            const style = SEASON_STYLES[n.season];
            const stats = n.season === "2025" ? stats25 : stats26;
            return (
              <article
                key={n.season}
                className={`rounded-2xl border bg-neutral-900 p-6 ${style.chipBorder}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs font-black uppercase tracking-wide ${style.textColor}`}>
                      {n.season}
                    </p>
                    <h2 className="mt-1 text-3xl font-black text-white">{n.headline}</h2>
                    <p className="mt-0.5 text-sm text-slate-400">{n.subheadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Minuter</p>
                    <p className={`text-2xl font-black tabular-nums ${style.textColor}`}>
                      {stats.minutesPlayed.toLocaleString("sv-SE")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Mål", value: stats.goals },
                    { label: "Assist", value: stats.assists },
                    { label: "G+A", value: stats.goals + stats.assists },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-slate-700/40 bg-neutral-900/80 p-3 text-center">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className={`mt-1 text-2xl font-black ${style.textColor}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{n.summary}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="mb-1.5 font-black uppercase tracking-wide text-emerald-400">Styrkor</p>
                    {n.strengths.map((s) => (
                      <p key={s} className="mb-1 text-slate-300">+ {s}</p>
                    ))}
                  </div>
                  <div>
                    <p className="mb-1.5 font-black uppercase tracking-wide text-amber-400">Svagheter</p>
                    {n.weaknesses.map((w) => (
                      <p key={w} className="mb-1 text-slate-400">− {w}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ── Per-90-jämförelse ── */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Per 90 min</p>
          <h2 className="mt-1 text-2xl font-black text-white">Grundläggande nyckeltal</h2>
          <p className="mt-1 text-sm text-slate-400">
            Alla värden från Bolldata.se. 2025-data via bolldata.se/spelardata?season_name=2025
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Mål / 90"
              value2025={bolldataStats2025.goalsPerNinety.toFixed(2)}
              value2026={bolldataStats2026.goalsPerNinety.toFixed(2)}
              highlight="2025"
              note="Mål per 90 spelade min"
            />
            <StatCard
              label="Assist / 90"
              value2025={bolldataStats2025.assistsPerNinety.toFixed(2)}
              value2026={bolldataStats2026.assistsPerNinety.toFixed(2)}
              highlight="2026"
              note="Assist per 90 spelade min"
            />
            <StatCard
              label="G+A / 90"
              value2025={stats25.goalsPlusAssistsPerNinety.toFixed(2)}
              value2026={stats26.goalsPlusAssistsPerNinety.toFixed(2)}
              highlight="2026"
              note="Kombinerat G+A per 90"
            />
            <StatCard
              label="xG / 90"
              value2025={bolldataStats2025.xGPerNinety.toFixed(2)}
              value2026={bolldataStats2026.xGPerNinety.toFixed(2)}
              highlight="equal"
              note="Identisk xG/90 – samma chansvolym"
            />
            <StatCard
              label="xA / 90"
              value2025={bolldataStats2025.xAPerNinety.toFixed(2)}
              value2026={bolldataStats2026.xAPerNinety.toFixed(2)}
              highlight="2026"
              note="xA per 90 – dubblerat 2026"
            />
            <StatCard
              label="Skottassist / 90"
              value2025={bolldataStats2025.shotAssistsPerNinety.toFixed(2)}
              value2026={bolldataStats2026.shotAssistsPerNinety.toFixed(2)}
              highlight="2026"
              note="SA/90 – fler chanser skapade per min"
            />
            <StatCard
              label="Målchanser / 90"
              value2025={bolldataStats2025.goalChancesPerNinety.toFixed(2)}
              value2026={bolldataStats2026.goalChancesPerNinety.toFixed(2)}
              highlight="2026"
              note="MC/90 – Bolldata"
            />
            <StatCard
              label="xP / 90"
              value2025={bolldataStats2025.xPPerNinety.toFixed(2)}
              value2026={bolldataStats2026.xPPerNinety.toFixed(2)}
              highlight="2026"
              note="Totalt förväntat G+A per 90"
            />
          </div>
        </section>

        {/* ── Nyckelinsikter ── */}
        <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Analys</p>
          <h2 className="mt-1 text-2xl font-black text-white">Nyckelinsikter</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {keyInsights.map((insight, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-slate-700/40 bg-neutral-900 p-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-black text-amber-300">
                  {i + 1}
                </div>
                <p className="text-sm leading-6 text-slate-200">{insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skottkvalitet & avslut ── */}
        <ShotQualitySection />

        {/* ── Radardiagram ── */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Twelve.football · Spelarprofil
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">Radarjämförelse</h2>
              <p className="mt-1 text-sm text-slate-400">
                Percentil inom spelargrupp (mittfältare). Rang omräknat till 0–100 där 100 = bäst.
              </p>
            </div>
            <div className="flex rounded-xl border border-slate-700 p-1">
              {(["both", "2025", "2026"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRadarFilter(filter)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                    radarFilter === filter
                      ? "bg-slate-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {filter === "both" ? "Båda" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_0.9fr]">
            <div className="rounded-xl border border-slate-700/40 bg-neutral-900/80 p-4">
              <RadarChart activeSeason={radarFilter} />
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                {SEASONS.map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: SEASON_STYLES[s].stroke }}
                    />
                    <span className="text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {twelveCategories.map((cat) => {
                const r25 = twelveRanks["2025"][cat.key as CategoryKey];
                const t25 = twelveRanks["2025"].total;
                const r26 = twelveRanks["2026"][cat.key as CategoryKey];
                const t26 = twelveRanks["2026"].total;
                const p25 = rankToPercentile(r25, t25);
                const p26 = rankToPercentile(r26, t26);
                const up = p26 > p25 + 3;
                const down = p25 > p26 + 3;

                return (
                  <div
                    key={cat.key}
                    className="rounded-xl border border-slate-700/40 bg-neutral-900/80 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-200">{cat.label}</span>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-sky-300">{r25}/{t25}</span>
                        <span className="text-slate-600">→</span>
                        <span className="text-emerald-300">{r26}/{t26}</span>
                        {up && <span className="font-black text-emerald-400">↑</span>}
                        {down && <span className="font-black text-amber-400">↓</span>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {SEASONS.map((s) => {
                        const pct = s === "2025" ? p25 : p26;
                        const style = SEASON_STYLES[s];
                        return (
                          <div key={s} className="flex items-center gap-2">
                            <span className="w-6 text-[10px]" style={{ color: style.stroke }}>
                              {s}
                            </span>
                            <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                              <div
                                className="h-1.5 rounded-full"
                                style={{ width: `${pct}%`, backgroundColor: style.stroke }}
                              />
                            </div>
                            <span className="w-7 text-right text-[10px] text-slate-500">
                              {pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Sub-metriker ── */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Twelve.football</p>
          <h2 className="mt-1 text-2xl font-black text-white">Detaljerade metriker</h2>
          <p className="mt-1 text-sm text-slate-400">
            Percentil per submetrik. Rank visas som X/N där lägre rank = bättre.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                activeCategory === null
                  ? "border-slate-400 bg-slate-600 text-white"
                  : "border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              Alla
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                    : "border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-2 divide-y divide-slate-700/40">
            {filteredSubMetrics.map((metric) => (
              <SubMetricRow
                key={metric.label}
                label={metric.label}
                rank2025={metric.rank2025}
                total2025={metric.total2025}
                rank2026={metric.rank2026}
                total2026={metric.total2026}
              />
            ))}
          </div>
        </section>

        {/* ── Bolldata-jämförelse ── */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Bolldata.se · Allsvenskan
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">Bolldata-jämförelse 2025 vs 2026</h2>
              <p className="mt-1 text-sm text-slate-400">
                2025: 30 matcher · 2 719 min &nbsp;|&nbsp; 2026: 14 matcher · 1 147 min
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm font-black">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sky-200">2025</span>
              <span className="text-slate-600">vs</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">2026</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <BolldataGroupCard
              title="Mål & xG"
              rows={[
                { label: "Mål", v25: "17", v26: "5", highlight: "2025" },
                { label: "Mål / 90", v25: "0,56", v26: "0,39", highlight: "2025" },
                { label: "xG", v25: "11,85", v26: "4,83", highlight: "2025" },
                { label: "xG / 90", v25: "0,39", v26: "0,38", highlight: "equal", sub: "Identiskt per minut" },
                { label: "Mål – xG", v25: "+5,15", v26: "+0,17", highlight: "2025", sub: "Överkurs vs förväntat" },
              ]}
            />

            <BolldataGroupCard
              title="Assist & xA"
              rows={[
                { label: "Assist", v25: "2", v26: "5", highlight: "2026" },
                { label: "Assist / 90", v25: "0,10", v26: "0,39", highlight: "2026" },
                { label: "xA", v25: "4,25", v26: "3,60" },
                { label: "xA / 90", v25: "0,14", v26: "0,28", highlight: "2026" },
                { label: "G+A totalt", v25: "19", v26: "10" },
              ]}
            />

            <BolldataGroupCard
              title="Poäng & xP"
              rows={[
                { label: "G+A (P)", v25: "19", v26: "10", highlight: "2025" },
                { label: "P / 90", v25: "0,63", v26: "0,78", highlight: "2026" },
                { label: "xP", v25: "16,10", v26: "8,43", highlight: "2025" },
                { label: "xP / 90", v25: "0,53", v26: "0,66", highlight: "2026" },
                { label: "P – xP (±)", v25: "+2,90", v26: "+1,57" },
              ]}
            />

            <BolldataGroupCard
              title="Passningsspel / chansskapande"
              rows={[
                { label: "Skottassist (SA)", v25: "49", v26: "34", highlight: "2025" },
                { label: "SA / 90", v25: "1,62", v26: "2,67", highlight: "2026" },
                { label: "Målchanser (MC)", v25: "63", v26: "31", highlight: "2025" },
                { label: "MC / 90", v25: "2,09", v26: "2,43", highlight: "2026" },
                { label: "Nyckelpassningar", v25: "–", v26: "16", sub: "2025 ej i topp-20" },
              ]}
            />

            <BolldataGroupCard
              title="Fasta situationer"
              rows={[
                { label: "Hörnor sparkade", v25: "106", v26: "32", highlight: "2025" },
                { label: "Hörnor / 90", v25: "3,51", v26: "2,51", highlight: "2025" },
                { label: "Frisparkar (FS)", v25: "40", v26: "32", highlight: "2025" },
                { label: "FS farlig zon (DAF)", v25: "16", v26: "6", highlight: "2025" },
                { label: "xA frisparkar", v25: "–", v26: "0,66", sub: "2025 ej tillgänglig" },
              ]}
            />

            <BolldataGroupCard
              title="Övrigt"
              rows={[
                { label: "Straff S/M", v25: "2/1", v26: "1/1" },
                { label: "Offensiv ranking", v25: "–", v26: "557 (43,71/90)", sub: "2025 ej i topp-20" },
                { label: "P%", v25: "21,1%", v26: "18,5%" },
                { label: "Minuter per G+A", v25: String(Math.round(2719 / 19)), v26: String(Math.round(1147 / 10)) },
              ]}
            />
          </div>
        </section>

        {/* ── Källor ── */}
        <section className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Källor</p>
          <div className="mt-3 grid gap-2 text-xs text-slate-400 md:grid-cols-3">
            <p>
              <span className="font-semibold text-slate-300">Twelve (2025):</span>{" "}
              earpiece.twelve.football – spelarprofil, rang av 119 mittfältare, Allsvenskan 25.
            </p>
            <p>
              <span className="font-semibold text-slate-300">Twelve (2026):</span>{" "}
              earpiece.twelve.football – spelarprofil, rang av 73 mittfältare, Allsvenskan 26.
            </p>
            <p>
              <span className="font-semibold text-slate-300">Bolldata (2025 & 2026):</span>{" "}
              bolldata.se/spelardata – detaljerad Allsvenskan-statistik. 2025-data via{" "}
              bolldata.se/spelardata?season_name=2025
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
