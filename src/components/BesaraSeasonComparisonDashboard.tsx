"use client";

import Link from "next/link";
import { useState } from "react";
import {
  besaraBasicStats,
  bolldataStats2026,
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
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4">
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

// ─── Bolldata section ──────────────────────────────────────────────────────────

function BolldataRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-sm text-slate-200">{label}</p>
        {sub && <p className="text-[11px] text-slate-500">{sub}</p>}
      </div>
      <p className="tabular-nums text-lg font-black text-emerald-200">{value}</p>
    </div>
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
    <div className="min-h-screen bg-[#0c1322]">
      {/* ── Header ── */}
      <header className="border-b border-slate-700/40 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/spelarstatistik"
            className="text-sm font-semibold text-slate-400 hover:text-slate-200"
          >
            ← Spelarstatistik
          </Link>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
                Spelarprofil · Säsongsjämförelse
              </p>
              <h1 className="mt-2 text-4xl font-black uppercase text-white md:text-5xl">
                Nahir Besara
              </h1>
              <p className="mt-1 text-base text-slate-400">
                2025 vs 2026 · Allsvenskan · Hammarby IF
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              {SEASONS.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-3 py-1.5 text-sm font-black ${SEASON_STYLES[s].chipBorder} ${SEASON_STYLES[s].chipBg} ${SEASON_STYLES[s].chipText}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">

        {/* ── Säsongskort ── */}
        <section className="grid gap-4 md:grid-cols-2">
          {[narrative25, narrative26].map((n) => {
            const style = SEASON_STYLES[n.season];
            const stats = n.season === "2025" ? stats25 : stats26;
            return (
              <article
                key={n.season}
                className={`rounded-2xl border bg-slate-800/60 p-6 ${style.chipBorder}`}
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
                    <div key={label} className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-3 text-center">
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
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Per 90 min</p>
          <h2 className="mt-1 text-2xl font-black text-white">Grundläggande nyckeltal</h2>
          <p className="mt-1 text-sm text-slate-400">
            2026-xG och xA är från Bolldata. 2025 saknar bolldata-källa; goals/90 och assists/90 är beräknade.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Mål / 90"
              value2025={stats25.goalsPerNinety.toFixed(2)}
              value2026={stats26.goalsPerNinety.toFixed(2)}
              highlight="2025"
              note="Mål per 90 spelade min"
            />
            <StatCard
              label="Assist / 90"
              value2025={stats25.assistsPerNinety.toFixed(2)}
              value2026={stats26.assistsPerNinety.toFixed(2)}
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
              value2025="–"
              value2026={bolldataStats2026.xGPerNinety.toFixed(2)}
              note="2025 xG/90 ej tillgänglig i Bolldata"
            />
            <StatCard
              label="xA / 90"
              value2025="–"
              value2026={bolldataStats2026.xAPerNinety.toFixed(2)}
              note="2025 xA/90 ej tillgänglig i Bolldata"
            />
            <StatCard
              label="Skottassist / 90"
              value2025="–"
              value2026={bolldataStats2026.shotAssistsPerNinety.toFixed(2)}
              note="SA/90 – Bolldata 2026"
            />
            <StatCard
              label="Nyckelpassningar / 90"
              value2025="–"
              value2026={bolldataStats2026.keyPassesPerNinety.toFixed(2)}
              note="NP/90 – Bolldata 2026"
            />
            <StatCard
              label="Målchanser / 90"
              value2025="–"
              value2026={bolldataStats2026.goalChancesPerNinety.toFixed(2)}
              note="MC/90 – Bolldata 2026"
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
                className="flex gap-3 rounded-xl border border-slate-700/40 bg-slate-800/60 p-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-black text-amber-300">
                  {i + 1}
                </div>
                <p className="text-sm leading-6 text-slate-200">{insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Radardiagram ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-6">
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
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
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
                    className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-3"
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
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-6">
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

        {/* ── Bolldata 2026 ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Bolldata.se · Allsvenskan 2026
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">Detaljerad stats – 2026</h2>
              <p className="mt-1 text-sm text-slate-400">
                14 matcher · 1 147 min · Bolldata.se/spelardata
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-sm font-black text-emerald-200">
              2026
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Mål & xG */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Mål & xG
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="Mål" value={bolldataStats2026.goals.toString()} />
                <BolldataRow label="Mål / 90" value={bolldataStats2026.goalsPerNinety.toFixed(2)} />
                <BolldataRow label="xG" value={bolldataStats2026.xG.toFixed(2)} />
                <BolldataRow label="xG / 90" value={bolldataStats2026.xGPerNinety.toFixed(2)} />
                <BolldataRow
                  label="Mål vs xG"
                  value={`+${bolldataStats2026.goalsOverXG.toFixed(2)}`}
                  sub="Mål utöver förväntat"
                />
              </div>
            </div>

            {/* Assist & xA */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Assist & xA
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="Assist" value={bolldataStats2026.assists.toString()} />
                <BolldataRow label="Assist / 90" value={bolldataStats2026.xAPerNinety.toFixed(2)} sub="xA/90" />
                <BolldataRow label="xA" value={bolldataStats2026.xA.toFixed(2)} />
                <BolldataRow label="xA / 90" value={bolldataStats2026.xAPerNinety.toFixed(2)} />
                <BolldataRow label="G+A totalt" value={`${bolldataStats2026.goals + bolldataStats2026.assists}`} />
              </div>
            </div>

            {/* Poäng & xP */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Poäng & xP
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="G+A (poäng)" value={bolldataStats2026.points.toString()} />
                <BolldataRow label="Poäng / 90" value={bolldataStats2026.pointsPerNinety.toFixed(2)} />
                <BolldataRow label="xP" value={bolldataStats2026.xP.toFixed(2)} />
                <BolldataRow label="xP / 90" value={bolldataStats2026.xPPerNinety.toFixed(2)} />
                <BolldataRow
                  label="P vs xP (±)"
                  value={`+${bolldataStats2026.goalsOverXG.toFixed(2)}`}
                  sub="Faktisk vs förväntad"
                />
              </div>
            </div>

            {/* Passningsspel */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Passningsspel
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="Skottassist (SA)" value={bolldataStats2026.shotAssists.toString()} />
                <BolldataRow label="SA / 90" value={bolldataStats2026.shotAssistsPerNinety.toFixed(2)} />
                <BolldataRow label="Nyckelpassningar" value={bolldataStats2026.keyPasses.toString()} />
                <BolldataRow label="NP / 90" value={bolldataStats2026.keyPassesPerNinety.toFixed(2)} />
                <BolldataRow label="Smarta passningar" value={bolldataStats2026.smartPasses.toString()} />
              </div>
            </div>

            {/* Fasta situationer */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Fasta situationer
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="Hörnor sparkade" value={bolldataStats2026.cornerKicks.toString()} />
                <BolldataRow label="Hörnor / 90" value={bolldataStats2026.cornerKicksPerNinety.toFixed(2)} />
                <BolldataRow label="Frisparkar" value={bolldataStats2026.freekicks.toString()} />
                <BolldataRow label="FS farlig zon (DAF)" value={bolldataStats2026.freekicksDangerousArea.toString()} />
                <BolldataRow label="xA frisparkar" value={bolldataStats2026.freekicksXA.toFixed(2)} />
              </div>
            </div>

            {/* Övrigt */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                Övrigt
              </p>
              <div className="divide-y divide-slate-700/30">
                <BolldataRow label="Målchanser (MC)" value={bolldataStats2026.goalChances.toString()} />
                <BolldataRow label="MC / 90" value={bolldataStats2026.goalChancesPerNinety.toFixed(2)} />
                <BolldataRow label="Straff (S/M)" value={`${bolldataStats2026.penalties}/${bolldataStats2026.penaltiesScored}`} sub="Sparkade / Gjorda" />
                <BolldataRow label="Offensiv ranking (OP)" value={bolldataStats2026.offensiveRating.toLocaleString("sv-SE")} />
                <BolldataRow label="OP / 90" value={bolldataStats2026.offensiveRatingPerNinety.toFixed(2)} />
              </div>
            </div>
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
              <span className="font-semibold text-slate-300">Bolldata (2026):</span>{" "}
              bolldata.se/spelardata – detaljerad Allsvenskan-statistik per 2026. Bolldata saknar 2025-data för Besara.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
