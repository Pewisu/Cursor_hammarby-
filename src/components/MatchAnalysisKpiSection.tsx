"use client";

import {
  hammarbyMatchAnalysisMetricDefinitions,
  hammarbyMatchAnalysisRounds,
  type HammarbyMatchAnalysisRound,
  type MatchAnalysisMetricKey,
} from "@/lib/hammarbyMatchAnalysisData";

// ─── Metric definitions ───────────────────────────────────────────────────────

type FeaturedMetric = {
  key: MatchAnalysisMetricKey;
  badge: string;
  group: "offensiv" | "press" | "defensiv";
  description: (val: number, avg: number, better: boolean) => string;
};

const FEATURED: FeaturedMetric[] = [
  // ── Offensivt ────────────────────────────────────────────────────────────────
  {
    key: "ball_possession_pct",
    badge: "Bollinnehav",
    group: "offensiv",
    description: (v, a, b) =>
      b
        ? `Dominerade bollen – ${((v - a) * 100).toFixed(1)} procentenheter över snitt.`
        : `Lägre bollinnehav än normalt (snitt ${(a * 100).toFixed(1)}%).`,
  },
  {
    key: "np_xg",
    badge: "Offensivt xG",
    group: "offensiv",
    description: (v, a, b) =>
      b
        ? `Stark chanskapning. ${(v - a).toFixed(2)} xG över snittet.`
        : `Under normalt xG-snitt (${a.toFixed(2)}) denna omgång.`,
  },
  {
    key: "num_box_entries",
    badge: "Inbrytningar i box",
    group: "offensiv",
    description: (v, a, b) =>
      b
        ? `${Math.round(v)} intränganden i straffom. – snitt är ${a.toFixed(1)}.`
        : `Färre inbrytningar än normalt (snitt ${a.toFixed(1)}).`,
  },
  {
    key: "np_shots",
    badge: "Avslut",
    group: "offensiv",
    description: (v, a, b) =>
      b
        ? `${Math.round(v)} avslut – ${(v - a).toFixed(1)} fler än snitt.`
        : `Färre avslut än normalt (snitt ${a.toFixed(1)}).`,
  },
  // ── Press & territorium ───────────────────────────────────────────────────────
  {
    key: "ppda",
    badge: "Presstäthet (PPDA)",
    group: "press",
    description: (v, a, b) =>
      b
        ? `Hårdare press än normalt – PPDA ${v.toFixed(2)} vs snitt ${a.toFixed(2)}.`
        : `Mer kontrollerat press – PPDA ${v.toFixed(2)} vs snitt ${a.toFixed(2)}.`,
  },
  {
    key: "num_recoveries_att_half",
    badge: "Återerövringar",
    group: "press",
    description: (v, a, b) =>
      b
        ? `${Math.round(v)} höga återerövringar – ${(v - a).toFixed(1)} över snitt.`
        : `Färre höga återerövringar än normalt (snitt ${a.toFixed(1)}).`,
  },
  {
    key: "defensive_action_height_m",
    badge: "Presspunkt",
    group: "press",
    description: (v, a, b) =>
      b
        ? `Defensiva aktioner sker högt upp (${v.toFixed(1)} m) – ${(v - a).toFixed(1)} m över snitt.`
        : `Lägre presslinje än normalt (snitt ${a.toFixed(1)} m).`,
  },
  // ── Defensivt ─────────────────────────────────────────────────────────────────
  {
    key: "opp_np_xg",
    badge: "Motst. xG",
    group: "defensiv",
    description: (v, a, b) =>
      b
        ? `Motst. skapade bara ${v.toFixed(2)} xG – klart under snitt (${a.toFixed(2)}).`
        : `Motst. skapade ${v.toFixed(2)} xG – mer än normalt (snitt ${a.toFixed(2)}).`,
  },
  {
    key: "opp_np_xg_per_shot",
    badge: "Motst. skottkvalitet",
    group: "defensiv",
    description: (v, a, b) =>
      b
        ? `Motst. avslut var ofarliga – ${v.toFixed(3)} xG/skott vs snitt ${a.toFixed(3)}.`
        : `Motst. skapade farliga lägen – ${v.toFixed(3)} xG/skott vs snitt ${a.toFixed(3)}.`,
  },
  {
    key: "opp_num_box_entries",
    badge: "Motst. inbrytningar",
    group: "defensiv",
    description: (v, a, b) =>
      b
        ? `Motst. kom in i boxen bara ${Math.round(v)} gånger – snitt är ${a.toFixed(1)}.`
        : `Motst. lyckades bryta in ${Math.round(v)} gånger – mer än normalt.`,
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

function getSliderPos(value: number, avg: number, direction: "higher" | "lower"): number {
  if (!avg || avg === 0) return 50;
  const raw = direction === "higher" ? (value / avg) * 50 : (avg / value) * 50;
  return Math.min(95, Math.max(5, raw));
}

function getRankInfo(rank: number, total: number): {
  label: string;
  shortLabel: string;
  cls: string;
  dotCls: string;
} {
  if (rank <= 3) return {
    label: `Topp ${rank} av ${total}`,
    shortLabel: `#${rank}`,
    cls: "bg-emerald-500/25 text-emerald-200 border border-emerald-500/40",
    dotCls: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]",
  };
  if (rank >= total - 2) return {
    label: `Botten ${total - rank + 1} av ${total}`,
    shortLabel: `#${rank}`,
    cls: "bg-red-500/20 text-red-200 border border-red-500/35",
    dotCls: "bg-red-400 shadow-[0_0_5px_rgba(248,113,113,0.6)]",
  };
  return {
    label: `Plats ${rank} av ${total}`,
    shortLabel: `#${rank}`,
    cls: "bg-neutral-700/60 text-neutral-300 border border-neutral-600/50",
    dotCls: "bg-neutral-500",
  };
}

// ─── Period mini bar chart ────────────────────────────────────────────────────

const PERIOD_LABELS = ["0–15", "15–30", "30–HT", "45–60", "60–75", "75–FT"];

function PeriodBars({ periods, barCls }: { periods: number[]; barCls: string }) {
  const max = Math.max(...periods, 0.001);
  return (
    <div>
      <div className="flex items-end gap-0.5" style={{ height: 32 }}>
        {periods.map((p, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end">
            <div
              className={`w-full rounded-t-sm ${barCls}`}
              style={{ height: `${Math.max(8, (p / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex">
        {PERIOD_LABELS.map((l) => (
          <span key={l} className="flex-1 text-center text-[8px] font-medium text-neutral-500">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Single KPI card ──────────────────────────────────────────────────────────

type KpiCardProps = {
  metric: FeaturedMetric;
  roundData: HammarbyMatchAnalysisRound;
  rank: number;
  total: number;
};

function KpiCard({ metric, roundData, rank, total }: KpiCardProps) {
  const def = hammarbyMatchAnalysisMetricDefinitions.find((d) => d.key === metric.key);
  if (!def) return null;
  const sample = roundData.metrics[metric.key];
  if (!sample) return null;

  const { value, seasonAverage: avg, periods } = sample;
  const direction = def.direction;

  const relDelta = avg !== 0 ? (value - avg) / Math.abs(avg) : 0;
  const isBetter = direction === "higher" ? relDelta > 0.1 : relDelta < -0.1;
  const isWorse  = direction === "higher" ? relDelta < -0.1 : relDelta > 0.1;

  const valueColor = isBetter ? "text-emerald-300" : isWorse ? "text-red-300" : "text-amber-300";
  const barCls     = isBetter ? "bg-emerald-500"   : isWorse ? "bg-red-500"   : "bg-amber-500";
  const borderCls  = isBetter
    ? "border-emerald-500/20"
    : isWorse
    ? "border-red-500/20"
    : "border-amber-500/15";
  const topAccent  = isBetter
    ? "from-transparent via-emerald-500/60 to-transparent"
    : isWorse
    ? "from-transparent via-red-500/55 to-transparent"
    : "from-transparent via-amber-500/45 to-transparent";

  const sliderPos = getSliderPos(value, avg, direction);
  const { label: rankLabel, shortLabel, cls: rankCls, dotCls } = getRankInfo(rank, total);

  // Delta in the "good" direction
  const deltaGood = direction === "higher" ? relDelta : -relDelta;
  const deltaSign = deltaGood >= 0 ? "▲" : "▼";
  const deltaColor = deltaGood >= 0 ? "text-emerald-300" : "text-red-300";

  const description = metric.description(value, avg, isBetter);

  return (
    <article className={`relative flex flex-col overflow-hidden rounded-2xl border bg-[#161b22] ${borderCls}`}>
      {/* Top accent line */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${topAccent}`} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Row 1: badge + rank */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 shrink-0 rounded-full ${dotCls}`} />
            <span className="text-[11px] font-bold text-neutral-200">{metric.badge}</span>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-black ${rankCls}`}>
            {shortLabel}
          </span>
        </div>

        {/* Row 2: large value */}
        <div>
          <p className={`text-[44px] font-black leading-none tabular-nums tracking-tight ${valueColor}`}>
            {fmtMetricValue(metric.key, value)}
          </p>
          {/* Rank label below value */}
          <p className="mt-1 text-[11px] font-semibold text-neutral-400">{rankLabel}</p>
        </div>

        {/* Row 3: snitt + delta */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-neutral-400">
            Snitt{" "}
            <span className="font-bold text-neutral-200">{fmtMetricValue(metric.key, avg)}</span>
          </span>
          <span className={`text-[12px] font-black ${deltaColor}`}>
            {deltaSign} {Math.abs(deltaGood * 100).toFixed(0)}%
          </span>
        </div>

        {/* Row 4: description */}
        <p className="text-[12px] leading-relaxed text-neutral-400">{description}</p>

        {/* Row 5: SÄMRE / SNITT / BÄTTRE slider */}
        <div>
          <div className="relative h-3 flex items-center">
            {/* Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-700">
              <div
                className={`h-full rounded-full ${barCls} opacity-40`}
                style={{ width: `${sliderPos}%` }}
              />
            </div>
            {/* Average tick */}
            <div
              className="absolute top-0 h-full w-px bg-neutral-400"
              style={{ left: "50%" }}
            />
            {/* Value dot */}
            <div
              className={`absolute h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#161b22] ${barCls} shadow-lg`}
              style={{ left: `${sliderPos}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-neutral-500">
            <span>Sämre</span>
            <span>Snitt</span>
            <span>Bättre</span>
          </div>
        </div>

        {/* Row 6: period bars */}
        <div className="border-t border-white/[0.06] pt-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            Per period (15 min)
          </p>
          <PeriodBars periods={Array.from(periods)} barCls={barCls} />
        </div>
      </div>
    </article>
  );
}

// ─── Group header ─────────────────────────────────────────────────────────────

function GroupHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className={`h-4 w-0.5 rounded-full ${accent}`} />
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-300">{label}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  roundData: HammarbyMatchAnalysisRound;
  matchLabel: string;
};

export function MatchAnalysisKpiSection({ roundData, matchLabel }: Props) {
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
    const idx = sorted.findIndex((v) => Math.abs(v - current) < 0.0001);
    return { rank: (idx >= 0 ? idx : sorted.length) + 1, total: sorted.length };
  }

  const groups: { id: FeaturedMetric["group"]; label: string; accent: string }[] = [
    { id: "offensiv",  label: "Offensivt",             accent: "bg-emerald-400" },
    { id: "press",     label: "Press & territorium",   accent: "bg-amber-400" },
    { id: "defensiv",  label: "Defensivt",              accent: "bg-red-400" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1117]">
      {/* ── Header ── */}
      <div className="border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
              Twelve · Matchanalys
            </p>
            <h2 className="mt-1 text-lg font-black text-white">
              Hur presterade Hammarby?
            </h2>
            <p className="mt-0.5 text-sm font-medium text-neutral-400">{matchLabel}</p>
          </div>
          <div className="shrink-0 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3 py-1.5">
            <p className="text-sm font-black text-white">
              twelve<sup className="text-[9px] text-emerald-400">12</sup>
            </p>
          </div>
        </div>

        {/* Traffic light legend */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {[
            { dot: "bg-emerald-400", label: ">10% bättre än snitt" },
            { dot: "bg-amber-400",   label: "Nära snittet (±10%)" },
            { dot: "bg-red-400",     label: ">10% under snitt" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="text-[11px] font-medium text-neutral-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI card groups ── */}
      <div className="space-y-7 p-5">
        {groups.map((group) => {
          const metrics = FEATURED.filter((m) => m.group === group.id);
          if (metrics.length === 0) return null;
          return (
            <div key={group.id}>
              <GroupHeader label={group.label} accent={group.accent} />
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map((metric) => {
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

      <p className="px-5 pb-4 text-[10px] font-medium text-neutral-600">
        Källa: Twelve / hammarbyfotboll.se · Ranking bland Allsvenskan 2026 ·
        Grön = &gt;10% bättre, röd = &gt;10% sämre, gul = ±10% vs säsongssnitt
      </p>
    </section>
  );
}
