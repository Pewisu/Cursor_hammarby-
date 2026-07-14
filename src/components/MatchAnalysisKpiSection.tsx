"use client";

import {
  hammarbyMatchAnalysisMetricDefinitions,
  hammarbyMatchAnalysisRounds,
  type HammarbyMatchAnalysisRound,
  type MatchAnalysisMetricKey,
} from "@/lib/hammarbyMatchAnalysisData";

// ─── Metrics featured in the card grid ───────────────────────────────────────

type FeaturedMetric = {
  key: MatchAnalysisMetricKey;
  badge: string;        // short uppercase badge text
  group: "offensiv" | "press" | "defensiv";
  description: (val: number, avg: number, better: boolean) => string;
};

const FEATURED: FeaturedMetric[] = [
  {
    key: "ball_possession_pct",
    badge: "BOLLINNEHAV",
    group: "offensiv",
    description: (v, a, b) =>
      b ? `Dominerade bollen. ${((v - a) * 100).toFixed(1)} pp över snitt.`
        : `Lägre bollinnehav än normalt (snitt ${(a * 100).toFixed(1)}%).`,
  },
  {
    key: "np_xg",
    badge: "OFFENSIVT xG",
    group: "offensiv",
    description: (v, a, b) =>
      b ? `Stark chanskapning. +${(v - a).toFixed(2)} xG vs snitt.`
        : `Under normalt xG-snitt (${a.toFixed(2)}) denna omgång.`,
  },
  {
    key: "num_box_entries",
    badge: "INBRYTNINGAR",
    group: "offensiv",
    description: (v, a, b) =>
      b ? `${Math.round(v)} intränganden i straffom. vs snitt ${a.toFixed(1)}.`
        : `Färre inbrytningar än normalt (snitt ${a.toFixed(1)}).`,
  },
  {
    key: "field_tilt",
    badge: "AVSLUTSDOMINANS",
    group: "offensiv",
    description: (v, a, b) =>
      b ? `${((v - a) * 100).toFixed(1)} pp mer av avsluten på offensiv planhalva.`
        : `Lägre avslutsdominans än säsongssnitt.`,
  },
  {
    key: "ppda",
    badge: "PRESSTÄTHET",
    group: "press",
    description: (v, a, b) =>
      b ? `Hårdare press än normalt. ${(a - v).toFixed(2)} lägre PPDA vs snitt.`
        : `Mer kontrollerat press (PPDA ${v.toFixed(2)} vs snitt ${a.toFixed(2)}).`,
  },
  {
    key: "num_recoveries_att_half",
    badge: "ÅTERERÖVRINGAR",
    group: "press",
    description: (v, a, b) =>
      b ? `${Math.round(v)} höga återerövringar. ${(v - a).toFixed(1)} över snitt.`
        : `Färre höga återerövringar än normalt (snitt ${a.toFixed(1)}).`,
  },
  {
    key: "opp_np_xg",
    badge: "DEFENSIVT xG MOT",
    group: "defensiv",
    description: (v, a, b) =>
      b ? `Motst. skapade ${v.toFixed(2)} xG. Defensivt starkt (snitt ${a.toFixed(2)}).`
        : `Motst. skapade mer xG än normalt (snitt ${a.toFixed(2)}).`,
  },
  {
    key: "np_xg_per_shot",
    badge: "SKOTTKVALITET",
    group: "offensiv",
    description: (v, a, b) =>
      b ? `Hög xG per avslut – skapade farliga lägen. ${(v - a).toFixed(3)} vs snitt.`
        : `Lägre skottkvalitet denna match (snitt ${a.toFixed(3)}).`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtMetricValue(key: MatchAnalysisMetricKey, value: number): string {
  const def = hammarbyMatchAnalysisMetricDefinitions.find((d) => d.key === key);
  if (!def) return value.toFixed(2);
  if (def.format === "percent") return `${(value * 100).toFixed(1)}%`;
  if (def.decimals === 0) return String(Math.round(value));
  return value.toFixed(def.decimals);
}

function getSliderPos(
  value: number,
  avg: number,
  direction: "higher" | "lower"
): number {
  if (avg === 0) return 50;
  const raw = direction === "higher" ? (value / avg) * 50 : (avg / value) * 50;
  return Math.min(95, Math.max(5, raw));
}

function getRankBadge(rank: number, total: number): {
  label: string;
  cls: string;
} {
  if (rank <= 3)
    return { label: `Topp ${rank}/${total}`, cls: "bg-emerald-500/15 text-emerald-300" };
  if (rank >= total - 2)
    return { label: `Botten ${total - rank + 1}/${total}`, cls: "bg-red-500/15 text-red-300" };
  return { label: `#${rank}/${total}`, cls: "bg-neutral-800 text-neutral-500" };
}

function getDotColor(rank: number, total: number): string {
  if (rank <= 3) return "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]";
  if (rank >= total - 2) return "bg-red-400 shadow-[0_0_5px_rgba(248,113,113,0.5)]";
  return "bg-neutral-600";
}

// ─── Period mini bar chart ────────────────────────────────────────────────────

function PeriodBars({ periods, color }: { periods: number[]; color: string }) {
  const max = Math.max(...periods, 0.001);
  const labels = ["0-15", "15-30", "30-HT", "45-60", "60-75", "75-FT"];
  return (
    <div>
      <div className="flex items-end gap-0.5" style={{ height: 28 }}>
        {periods.map((p, i) => (
          <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
            <div
              className={`w-full rounded-t-sm ${color} opacity-80 transition-all group-hover:opacity-100`}
              style={{ height: `${Math.max(4, (p / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between">
        {labels.map((l) => (
          <span key={l} className="flex-1 text-center text-[7px] text-neutral-700">{l}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Single KPI card ─────────────────────────────────────────────────────────

type KpiCardProps = {
  metric: FeaturedMetric;
  roundData: HammarbyMatchAnalysisRound;
  rank: number;
  total: number;
};

function KpiCard({ metric, roundData, rank, total }: KpiCardProps) {
  const def = hammarbyMatchAnalysisMetricDefinitions.find((d) => d.key === metric.key)!;
  const sample = roundData.metrics[metric.key];
  if (!sample) return null;

  const { value, seasonAverage: avg, periods } = sample;
  const direction = def.direction;

  const relDelta = avg !== 0 ? (value - avg) / Math.abs(avg) : 0;
  const isBetter =
    direction === "higher" ? relDelta > 0.1 : relDelta < -0.1;
  const isWorse =
    direction === "higher" ? relDelta < -0.1 : relDelta > 0.1;

  const valueColor = isBetter
    ? "text-emerald-400"
    : isWorse
    ? "text-red-400"
    : "text-amber-300";
  const barColor = isBetter
    ? "bg-emerald-500"
    : isWorse
    ? "bg-red-500"
    : "bg-amber-500";

  const sliderPos = getSliderPos(value, avg, direction);
  const { label: rankLabel, cls: rankCls } = getRankBadge(rank, total);
  const dotColor = getDotColor(rank, total);
  const description = metric.description(value, avg, isBetter);

  // direction-aware delta sign: positive means better
  const deltaGoodDirection = direction === "higher" ? relDelta : -relDelta;

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161b22]">
      {/* Top accent */}
      <div
        className={`h-0.5 w-full ${
          isBetter
            ? "bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent"
            : isWorse
            ? "bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        }`}
      />

      <div className="flex flex-1 flex-col p-4">
        {/* Badge row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
            <span className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              {metric.badge}
            </span>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${rankCls}`}>
            {rankLabel}
          </span>
        </div>

        {/* Large value */}
        <p className={`mt-3 text-4xl font-black tabular-nums leading-none tracking-tight ${valueColor}`}>
          {fmtMetricValue(metric.key, value)}
        </p>

        {/* Context */}
        <div className="mt-1.5 flex items-center gap-2 text-[11px]">
          <span className="text-neutral-500">
            Snitt{" "}
            <span className="font-semibold text-neutral-400">
              {fmtMetricValue(metric.key, avg)}
            </span>
          </span>
          <span className={`font-bold ${deltaGoodDirection >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {deltaGoodDirection >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(deltaGoodDirection * 100).toFixed(0)}%
          </span>
        </div>

        {/* Description */}
        <p className="mt-1.5 text-[11px] leading-snug text-neutral-500">{description}</p>

        {/* Slider: Sämre ──●── Bättre */}
        <div className="mt-3">
          <div className="relative">
            {/* Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className={`h-full rounded-full ${barColor} opacity-30`}
                style={{ width: `${sliderPos}%` }}
              />
            </div>
            {/* Average marker */}
            <div
              className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-neutral-500"
              style={{ left: "50%" }}
            />
            {/* Current value dot */}
            <div
              className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#161b22] ${barColor}`}
              style={{ left: `${sliderPos}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[8px] text-neutral-700">
            <span>Sämre</span>
            <span>Snitt</span>
            <span>Bättre</span>
          </div>
        </div>

        {/* Period mini bars */}
        <div className="mt-3 border-t border-white/[0.04] pt-3">
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-widest text-neutral-700">
            Per period
          </p>
          <PeriodBars periods={Array.from(periods)} color={barColor} />
        </div>
      </div>
    </article>
  );
}

// ─── Group header ─────────────────────────────────────────────────────────────

function GroupLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div className={`flex items-center gap-2 px-1 py-2`}>
      <div className={`h-3 w-0.5 rounded-full ${accent}`} />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{label}</p>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

type Props = {
  roundData: HammarbyMatchAnalysisRound;
  matchLabel: string;
};

export function MatchAnalysisKpiSection({ roundData, matchLabel }: Props) {
  // Compute ranks from all 2026 rounds
  const season2026 = hammarbyMatchAnalysisRounds.filter((r) => r.season === 2026);

  function computeRank(key: MatchAnalysisMetricKey): { rank: number; total: number } {
    const def = hammarbyMatchAnalysisMetricDefinitions.find((d) => d.key === key);
    if (!def) return { rank: 1, total: 1 };
    const current = roundData.metrics[key]?.value;
    if (current == null || current === 0) return { rank: 1, total: 1 };
    const allVals = season2026
      .map((r) => r.metrics[key]?.value ?? null)
      .filter((v): v is number => v !== null && v !== 0);
    if (allVals.length < 2) return { rank: 1, total: allVals.length };
    const sorted = [...allVals].sort((a, b) =>
      def.direction === "higher" ? b - a : a - b
    );
    return { rank: sorted.indexOf(current) + 1, total: sorted.length };
  }

  const groups: { id: FeaturedMetric["group"]; label: string; accent: string }[] = [
    { id: "offensiv", label: "Offensivt", accent: "bg-emerald-500" },
    { id: "press",    label: "Press & territorium", accent: "bg-amber-500" },
    { id: "defensiv", label: "Defensivt", accent: "bg-red-500" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1117]">
      {/* Header */}
      <div className="border-b border-white/[0.05] px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-600">
              Twelve · Matchanalys
            </p>
            <h2 className="mt-1 text-base font-black text-white">
              Hur presterade Hammarby?
            </h2>
            <p className="mt-0.5 text-xs text-neutral-500">{matchLabel}</p>
          </div>
          {/* Twelve logo */}
          <div className="shrink-0 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1.5">
            <p className="text-xs font-black text-neutral-200">
              twelve<sup className="text-[8px] text-emerald-400">12</sup>
            </p>
          </div>
        </div>

        {/* Traffic light legend */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-neutral-600">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>&gt;10% bättre än snitt</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Nära snittet (±10%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span>&gt;10% under snitt</span>
          </div>
        </div>
      </div>

      {/* KPI card groups */}
      <div className="space-y-6 p-5">
        {groups.map((group) => {
          const groupMetrics = FEATURED.filter((m) => m.group === group.id);
          if (groupMetrics.length === 0) return null;
          return (
            <div key={group.id}>
              <GroupLabel label={group.label} accent={group.accent} />
              <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {groupMetrics.map((metric) => {
                  const { rank, total } = computeRank(metric.key);
                  return (
                    <KpiCard
                      key={metric.key}
                      metric={metric}
                      roundData={roundData}
                      rank={rank}
                      total={total}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="px-5 pb-4 text-[9px] text-neutral-700">
        Källa: Twelve / hammarbyfotboll.se · Ranking bland Allsvenskan 2026-omgångar ·
        Trafikljus: grön = &gt;10% bättre, röd = &gt;10% sämre, gul = ±10% mot säsongssnitt
      </p>
    </section>
  );
}
