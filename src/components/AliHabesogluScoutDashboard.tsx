"use client";

import Link from "next/link";
import {
  aliHabesogluScout as scout,
  type ScoutSpiderAxis,
} from "@/lib/aliHabesogluScoutData";

const HIF_LIGHT = "#34d399";
const HIF_FILL = "rgba(52, 211, 153, 0.28)";
const WEAK = "#f87171";

const CX = 200;
const CY = 200;
const R = 130;
const LR = 168;

function polar(index: number, total: number, score: number, radius: number) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  return {
    x: CX + Math.cos(angle) * (score / 100) * radius,
    y: CY + Math.sin(angle) * (score / 100) * radius,
    angle,
  };
}

function labelAnchor(angle: number): "start" | "middle" | "end" {
  const c = Math.cos(angle);
  if (c > 0.35) return "start";
  if (c < -0.35) return "end";
  return "middle";
}

function labelDy(angle: number) {
  const s = Math.sin(angle);
  if (s < -0.55) return -8;
  if (s > 0.55) return 12;
  return 4;
}

function polygonPoints(scores: number[], n: number) {
  return scores
    .map((score, i) => polar(i, n, score, R))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
}

function SpiderChart({ axes }: { axes: readonly ScoutSpiderAxis[] }) {
  const n = axes.length;
  const scores = axes.map((a) => a.percentile);
  const rings = [25, 50, 75, 100];

  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto h-auto w-full max-w-[420px]"
      role="img"
      aria-label="Spindeldiagram – Ali Habeşoğlu Turkish 1. Lig 2025/2026"
    >
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygonPoints(Array(n).fill(ring), n)}
          fill={ring === 100 ? "rgba(255,255,255,0.03)" : "none"}
          stroke={
            ring === 100 ? "rgba(255,255,255,0.2)" : "rgba(148,163,184,0.22)"
          }
          strokeWidth={ring === 100 ? 1.5 : 1}
        />
      ))}

      {axes.map((axis, i) => {
        const outer = polar(i, n, 100, R);
        const label = polar(i, n, 100, LR);
        return (
          <g key={axis.key}>
            <line
              x1={CX}
              y1={CY}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(148,163,184,0.28)"
              strokeWidth={1}
            />
            <text
              x={label.x}
              y={label.y}
              textAnchor={labelAnchor(label.angle)}
              dy={labelDy(label.angle)}
              className="fill-slate-200"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              {axis.shortLabel}
            </text>
            <text
              x={label.x}
              y={label.y}
              textAnchor={labelAnchor(label.angle)}
              dy={labelDy(label.angle) + 12}
              className={
                axis.highlight === "strength"
                  ? "fill-emerald-300"
                  : axis.highlight === "weakness"
                    ? "fill-rose-300"
                    : "fill-slate-400"
              }
              style={{ fontSize: 10, fontWeight: 700 }}
            >
              {axis.rank}/{axis.outOf}
            </text>
          </g>
        );
      })}

      <polygon
        points={polygonPoints(scores, n)}
        fill={HIF_FILL}
        stroke={HIF_LIGHT}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {axes.map((axis, i) => {
        const p = polar(i, n, axis.percentile, R);
        return (
          <circle
            key={`dot-${axis.key}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={
              axis.highlight === "strength"
                ? HIF_LIGHT
                : axis.highlight === "weakness"
                  ? WEAK
                  : "#94a3b8"
            }
            stroke="#0f172a"
            strokeWidth={1.5}
          />
        );
      })}
    </svg>
  );
}

function RankBadge({
  rank,
  outOf,
  tone,
}: {
  rank: number;
  outOf: number;
  tone: "strength" | "neutral" | "weakness";
}) {
  const styles =
    tone === "strength"
      ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
      : tone === "weakness"
        ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
        : "border-slate-500/40 bg-slate-700/40 text-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tabular-nums ${styles}`}
    >
      #{rank}/{outOf}
    </span>
  );
}

export function AliHabesogluScoutDashboard() {
  const topAxes = scout.spider.filter((a) => a.highlight === "strength");

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <header className="border-b border-slate-700/50 bg-[#0b1220]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-emerald-300/90">
            <Link href="/spelare" className="hover:text-emerald-200">
              Spelare
            </Link>
            <span className="text-slate-600">/</span>
            <span>Ali Habeşoğlu</span>
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.28em]"
                style={{ color: HIF_LIGHT }}
              >
                Bodrumspor · Turkish 1. Lig · Scouting
              </p>
              <h1 className="mt-2 text-3xl font-black text-white md:text-5xl">
                {scout.player.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                {scout.player.position} · {scout.player.club} ·{" "}
                {scout.player.age} år ({scout.player.birthDate}) ·{" "}
                {scout.player.strongFoot} · {scout.season.competition}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                {scout.contextNote}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Minuter", value: String(scout.season.minutes) },
                {
                  label: "Starter",
                  value: `${scout.season.starts}/${scout.season.matches}`,
                },
                { label: "Mål", value: String(scout.season.goals) },
                { label: "Assist", value: String(scout.season.assists) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-center"
                >
                  <p className="text-lg font-black text-emerald-100">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-emerald-300/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0d2818] via-[#12261c] to-[#0f172a] p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/80">
            Sammanfattning – hur han är som spelare
          </p>
          <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
            {scout.summaryHeader}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300 md:text-base">
            {scout.summary}
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {scout.narrativeBullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-slate-200"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 md:p-6">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Spindel – Twelve-kvaliteter
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {scout.season.comparisonGroup} · {scout.season.minutes} min
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: HIF_LIGHT }}
                  />
                  Styrka
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  Svaghet
                </span>
              </div>
            </div>
            <SpiderChart axes={scout.spider} />
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white">
              Där han utmärker sig
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Kvalitetsranking mot övriga anfallare i 1. Lig
            </p>
            <div className="mt-4 space-y-3">
              {topAxes.map((axis) => (
                <div
                  key={axis.key}
                  className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-emerald-50">
                      {axis.label}
                    </p>
                    <p className="text-[11px] text-emerald-200/70">
                      Percentil {axis.percentile.toFixed(0)}
                    </p>
                  </div>
                  <RankBadge
                    rank={axis.rank}
                    outOf={axis.outOf}
                    tone="strength"
                  />
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-sm font-semibold text-slate-300">
              Utvecklingsområden
            </h3>
            <div className="mt-3 space-y-2">
              {scout.spider
                .filter((a) => a.highlight === "weakness")
                .map((axis) => (
                  <div
                    key={axis.key}
                    className="flex items-center justify-between gap-3 rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2.5"
                  >
                    <p className="text-sm text-rose-50">{axis.label}</p>
                    <RankBadge
                      rank={axis.rank}
                      outOf={axis.outOf}
                      tone="weakness"
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-white">
            Ranking – nyckeltal där han sticker ut
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Topprankade enskilda KPI:er (per 90) i Turkish 1. Lig
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {scout.standoutMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-slate-600/50 bg-slate-800/50 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    {m.category}
                  </p>
                  <RankBadge rank={m.rank} outOf={m.outOf} tone="strength" />
                </div>
                <p className="mt-2 text-sm font-semibold text-white">
                  {m.label}
                </p>
                <p className="mt-1 text-lg font-black tabular-nums text-emerald-200">
                  {m.valuePer90}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <h2 className="text-lg font-semibold text-emerald-100">Styrkor</h2>
            <ul className="mt-4 space-y-4">
              {scout.strengths.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white">{s.name}</p>
                    <RankBadge rank={s.rank} outOf={s.outOf} tone="strength" />
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{s.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
            <h2 className="text-lg font-semibold text-rose-100">Svagheter</h2>
            <ul className="mt-4 space-y-4">
              {scout.weaknesses.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white">{s.name}</p>
                    <RankBadge rank={s.rank} outOf={s.outOf} tone="weakness" />
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{s.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-6 text-xs text-slate-500">
          <p>
            Data: Twelve Earpiece-scoutingrapport ({scout.season.competition}).{" "}
            <a
              href={scout.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Öppna källrapport →
            </a>
          </p>
          <p className="mt-2">
            <Link href="/spelare" className="text-slate-400 hover:text-white">
              ← Tillbaka till Spelare
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
