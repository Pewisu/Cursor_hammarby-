"use client";

import Link from "next/link";
import { useState } from "react";
import {
  hammarbyRoundMatchStats,
  type RoundMatchStats,
} from "@/lib/matchStatisticsOverviewData";

type MatchStatisticsHubProps = {
  mode: "combined" | "round";
  round?: number;
  rounds?: RoundMatchStats[];
};

type StatRow = {
  key: string;
  label: string;
  format: "number" | "percent" | "decimal";
  home: number;
  away: number;
};

type TrendMetricKey =
  | "goals"
  | "xg"
  | "shots"
  | "shotsOnTarget"
  | "possessionPercent"
  | "passes"
  | "passesSuccessful"
  | "touchesInBox"
  | "corners";

type TrendMetricOption = {
  key: TrendMetricKey;
  label: string;
  format: "number" | "percent" | "decimal";
};

type TrendPoint = {
  gameweek: number;
  date: string;
  value: number;
  opponent: string;
};

type OverviewData = {
  id: string;
  title: string;
  subtitle: string;
  dateText: string;
  leftTeam: string;
  rightTeam: string;
  sourceUrl?: string;
  stats: StatRow[];
};

const TREND_METRIC_OPTIONS: TrendMetricOption[] = [
  { key: "possessionPercent", label: "Bollinnehav", format: "percent" },
  { key: "shots", label: "Avslut", format: "number" },
  { key: "shotsOnTarget", label: "Skott på mål", format: "number" },
  { key: "passes", label: "Passningar", format: "number" },
  { key: "passesSuccessful", label: "Lyckade passningar", format: "number" },
  { key: "xg", label: "xG", format: "decimal" },
  { key: "touchesInBox", label: "Bollkontakter i box", format: "number" },
  { key: "corners", label: "Hörnor", format: "number" },
  { key: "goals", label: "Mål", format: "number" },
];

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatValue(
  value: number,
  format: "number" | "percent" | "decimal"
): string {
  if (format === "percent") return `${value}%`;
  if (format === "decimal") return value.toFixed(2);
  return value.toString();
}

function formatCompactValue(
  value: number,
  format: "number" | "percent" | "decimal"
): string {
  if (format === "percent") {
    return `${value.toLocaleString("sv-SE", { maximumFractionDigits: 0 })}%`;
  }
  if (format === "decimal") {
    return value.toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value.toLocaleString("sv-SE", {
    maximumFractionDigits: 0,
  });
}

function getBarWidth(left: number, right: number): number {
  const total = left + right;
  if (total === 0) return 50;
  return (left / total) * 100;
}

function buildStatRowsFromRound(round: RoundMatchStats): StatRow[] {
  const home = round.hammarby;
  const away = round.opponent;
  const homePassAccuracy = home.passes
    ? (home.passesSuccessful / home.passes) * 100
    : 0;
  const awayPassAccuracy = away.passes
    ? (away.passesSuccessful / away.passes) * 100
    : 0;

  return [
    { key: "goals", label: "Mål", format: "number", home: home.goals, away: away.goals },
    { key: "xg", label: "xG", format: "decimal", home: home.xg, away: away.xg },
    { key: "shots", label: "Avslut", format: "number", home: home.shots, away: away.shots },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: home.shotsOnTarget,
      away: away.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: home.possessionPercent,
      away: away.possessionPercent,
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: home.passes,
      away: away.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(homePassAccuracy),
      away: Math.round(awayPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: home.touchesInBox,
      away: away.touchesInBox,
    },
    { key: "corners", label: "Hörnor", format: "number", home: home.corners, away: away.corners },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: home.fouls,
      away: away.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: home.yellowCards,
      away: away.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: home.redCards,
      away: away.redCards,
    },
  ];
}

function buildRoundOverview(round: RoundMatchStats): OverviewData {
  return {
    id: round.key,
    title: `Omgång ${round.gameweek}`,
    subtitle: round.matchName,
    dateText: formatDate(round.date),
    leftTeam: round.hammarby.teamName,
    rightTeam: round.opponent.teamName,
    sourceUrl: round.sourceUrl,
    stats: buildStatRowsFromRound(round),
  };
}

function buildCombinedOverview(items: RoundMatchStats[]): OverviewData | null {
  if (items.length === 0) return null;

  const leftTeam = "Hammarby";
  const rightTeam = "Motståndare";
  const rounds = items.map((item) => item.gameweek).sort((a, b) => a - b);
  const matchCount = items.length;
  const dateRange =
    matchCount === 1
      ? formatDate(items[0].date)
      : `${formatDate(items[0].date)} - ${formatDate(items[items.length - 1].date)}`;

  const hammarby = items.reduce(
    (acc, match) => {
      acc.goals += match.hammarby.goals;
      acc.xg += match.hammarby.xg;
      acc.shots += match.hammarby.shots;
      acc.shotsOnTarget += match.hammarby.shotsOnTarget;
      acc.possession += match.hammarby.possessionPercent;
      acc.passes += match.hammarby.passes;
      acc.passesSuccessful += match.hammarby.passesSuccessful;
      acc.touchesInBox += match.hammarby.touchesInBox;
      acc.corners += match.hammarby.corners;
      acc.fouls += match.hammarby.fouls;
      acc.yellowCards += match.hammarby.yellowCards;
      acc.redCards += match.hammarby.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const opponents = items.reduce(
    (acc, match) => {
      acc.goals += match.opponent.goals;
      acc.xg += match.opponent.xg;
      acc.shots += match.opponent.shots;
      acc.shotsOnTarget += match.opponent.shotsOnTarget;
      acc.possession += match.opponent.possessionPercent;
      acc.passes += match.opponent.passes;
      acc.passesSuccessful += match.opponent.passesSuccessful;
      acc.touchesInBox += match.opponent.touchesInBox;
      acc.corners += match.opponent.corners;
      acc.fouls += match.opponent.fouls;
      acc.yellowCards += match.opponent.yellowCards;
      acc.redCards += match.opponent.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const hammarbyPassAccuracy = hammarby.passes
    ? (hammarby.passesSuccessful / hammarby.passes) * 100
    : 0;
  const opponentsPassAccuracy = opponents.passes
    ? (opponents.passesSuccessful / opponents.passes) * 100
    : 0;

  const stats: StatRow[] = [
    {
      key: "goals",
      label: "Mål",
      format: "number",
      home: hammarby.goals,
      away: opponents.goals,
    },
    {
      key: "xg",
      label: "xG",
      format: "decimal",
      home: Number(hammarby.xg.toFixed(2)),
      away: Number(opponents.xg.toFixed(2)),
    },
    {
      key: "shots",
      label: "Avslut",
      format: "number",
      home: hammarby.shots,
      away: opponents.shots,
    },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: hammarby.shotsOnTarget,
      away: opponents.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: Math.round(hammarby.possession / matchCount),
      away: Math.round(opponents.possession / matchCount),
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: hammarby.passes,
      away: opponents.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(hammarbyPassAccuracy),
      away: Math.round(opponentsPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: hammarby.touchesInBox,
      away: opponents.touchesInBox,
    },
    {
      key: "corners",
      label: "Hörnor",
      format: "number",
      home: hammarby.corners,
      away: opponents.corners,
    },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: hammarby.fouls,
      away: opponents.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: hammarby.yellowCards,
      away: opponents.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: hammarby.redCards,
      away: opponents.redCards,
    },
  ];

  return {
    id: "combined",
    title: "Kombinerat (alla spelade omgångar)",
    subtitle: `${leftTeam} vs ${rightTeam} • Omgång ${rounds.join(", ")}`,
    dateText: dateRange,
    leftTeam,
    rightTeam,
    sourceUrl: "https://bolldata.se/",
    stats,
  };
}

export function MatchStatisticsHub({ mode, round, rounds }: MatchStatisticsHubProps) {
  const sourceRounds = rounds ?? hammarbyRoundMatchStats;
  const sortedMatches = [...sourceRounds].sort((a, b) => a.gameweek - b.gameweek);
  const [selectedTrendMetricKey, setSelectedTrendMetricKey] =
    useState<TrendMetricKey>("possessionPercent");

  const roundOverview =
    mode === "round"
      ? (() => {
          const selectedRound = sortedMatches.find((item) => item.gameweek === round);
          return selectedRound ? buildRoundOverview(selectedRound) : null;
        })()
      : null;
  const combinedOverview = mode === "combined" ? buildCombinedOverview(sortedMatches) : null;
  const current = mode === "combined" ? combinedOverview : roundOverview;

  const navItems = [
    { href: "/matchstatistik", label: "Kombinerat", active: mode === "combined" },
    ...sortedMatches.map((item) => ({
      href: `/matchstatistik/omgang/${item.gameweek}`,
      label: `Omgång ${item.gameweek}`,
      active: mode === "round" && round === item.gameweek,
    })),
  ];
  const selectedTrendMetric =
    TREND_METRIC_OPTIONS.find((metric) => metric.key === selectedTrendMetricKey) ??
    TREND_METRIC_OPTIONS[0];
  const trendPoints: TrendPoint[] = sortedMatches.map((item) => ({
    gameweek: item.gameweek,
    date: item.date,
    value: item.hammarby[selectedTrendMetric.key],
    opponent: item.opponent.teamName,
  }));

  const trendHasEnoughPoints = trendPoints.length >= 2;
  const trendDelta = trendHasEnoughPoints
    ? trendPoints[trendPoints.length - 1].value - trendPoints[0].value
    : 0;
  const trendAverage =
    trendPoints.reduce((sum, point) => sum + point.value, 0) /
    Math.max(trendPoints.length, 1);

  const chart = {
    width: 760,
    height: 260,
    padding: { top: 16, right: 18, bottom: 56, left: 48 },
  };
  const plotWidth = chart.width - chart.padding.left - chart.padding.right;
  const plotHeight = chart.height - chart.padding.top - chart.padding.bottom;
  const xFor = (index: number) => {
    if (trendPoints.length <= 1) return chart.padding.left + plotWidth / 2;
    return chart.padding.left + (index / (trendPoints.length - 1)) * plotWidth;
  };

  let minY = 0;
  let maxY = 1;
  if (selectedTrendMetric.format === "percent") {
    maxY = 100;
  } else if (trendPoints.length > 0) {
    const values = trendPoints.map((point) => point.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const range = Math.max(rawMax - rawMin, 1);
    minY = Math.max(0, rawMin - range * 0.2);
    maxY = rawMax + range * 0.2;
  }
  const yRange = Math.max(maxY - minY, 1);
  const yFor = (value: number) =>
    chart.padding.top + ((maxY - value) / yRange) * plotHeight;
  const yTicks = Array.from({ length: 5 }, (_, index) => {
    const value = minY + ((maxY - minY) * index) / 4;
    return value;
  });
  const trendPath = trendPoints
    .map((point, index) => {
      const x = xFor(index);
      const y = yFor(point.value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  if (!current || current.stats.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-slate-300">Ingen matchstatistik tillgänglig för detta val.</p>
          <Link href="/" className="mt-4 inline-flex text-sm text-blue-300 hover:text-blue-200">
            ← Till startsidan
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Matchstatistik</p>
          <h1 className="text-2xl font-bold text-white">{current.title}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {current.subtitle} • {current.dateText}
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                item.active
                  ? "border-blue-500/40 bg-blue-500/20 text-blue-200"
                  : "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-slate-600">•</span>
          <Link href="/lopdata" className="text-xs text-green-300 hover:text-green-200">
            Löpdata
          </Link>
          <Link href="/lopdata/trender" className="text-xs text-purple-300 hover:text-purple-200">
            Spelartrender
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-500/50 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-slate-300 hover:bg-slate-800"
          >
            🏠 Huvudsida
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.leftTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.home ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.rightTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.away ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby xG</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {(
                current.leftTeam === "Hammarby"
                  ? current.stats.find((stat) => stat.key === "xg")?.home
                  : current.stats.find((stat) => stat.key === "xg")?.away
              )?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-xs text-slate-500">Förväntade mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby bollinnehav</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.leftTeam === "Hammarby"
                ? `${current.stats.find((stat) => stat.key === "possession")?.home ?? 0}%`
                : `${current.stats.find((stat) => stat.key === "possession")?.away ?? 0}%`}
            </p>
            <p className="text-xs text-slate-500">Andel av boll</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Nyckeltal</h2>
          <p className="mt-1 text-sm text-slate-400">
            Jämförelse per lag med fokus på målproduktion, passningsspel och defensiv disciplin.
          </p>
          <div className="mt-5 space-y-4">
            {current.stats.map((stat) => {
              const leftWidth = getBarWidth(stat.home, stat.away);
              const rightWidth = 100 - leftWidth;
              return (
                <div key={stat.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-blue-200">
                      {formatValue(stat.home, stat.format)}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </span>
                    <span className="font-mono text-green-200">
                      {formatValue(stat.away, stat.format)}
                    </span>
                  </div>
                  <div className="flex h-3 gap-1 rounded-full bg-slate-700/60">
                    <div
                      className="rounded-l-full"
                      style={{
                        width: `${leftWidth}%`,
                        background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                      }}
                    />
                    <div
                      className="rounded-r-full"
                      style={{
                        width: `${rightWidth}%`,
                        background: "linear-gradient(90deg, #16a34a, #4ade80)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Trend omgång för omgång (Hammarby)
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Jämför hur Hammarby utvecklas mellan omgångarna inom valda nyckeltal.
              </p>
            </div>
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Parameter
              <select
                value={selectedTrendMetricKey}
                onChange={(event) =>
                  setSelectedTrendMetricKey(event.target.value as TrendMetricKey)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {TREND_METRIC_OPTIONS.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-3 text-xs text-slate-300 md:grid-cols-3">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Senast</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(
                  trendPoints[trendPoints.length - 1]?.value ?? 0,
                  selectedTrendMetric.format
                )}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Snitt</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(trendAverage, selectedTrendMetric.format)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Trend (första → senaste)</p>
              <p
                className={`mt-1 text-base font-semibold ${
                  trendDelta >= 0 ? "text-green-300" : "text-rose-300"
                }`}
              >
                {trendDelta >= 0 ? "+" : ""}
                {formatCompactValue(trendDelta, selectedTrendMetric.format)}
                {selectedTrendMetric.format === "percent" ? "p" : ""}
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto lg:overflow-visible">
            <svg
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              className="w-full min-w-[420px] lg:min-w-0"
            >
              {yTicks.map((tickValue) => (
                <g key={tickValue}>
                  <line
                    x1={chart.padding.left}
                    x2={chart.padding.left + plotWidth}
                    y1={yFor(tickValue)}
                    y2={yFor(tickValue)}
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x={chart.padding.left - 8}
                    y={yFor(tickValue) + 4}
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {formatCompactValue(tickValue, selectedTrendMetric.format)}
                  </text>
                </g>
              ))}

              {trendPoints.map((point, index) => (
                <g key={point.gameweek}>
                  <line
                    x1={xFor(index)}
                    x2={xFor(index)}
                    y1={chart.padding.top}
                    y2={chart.padding.top + plotHeight}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={xFor(index)}
                    y={chart.height - 24}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    Omg {point.gameweek}
                  </text>
                  <text
                    x={xFor(index)}
                    y={chart.height - 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                  >
                    {formatDate(point.date)}
                  </text>
                </g>
              ))}

              {trendPath && (
                <path
                  d={trendPath}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {trendPoints.map((point, index) => (
                <g key={`point-${point.gameweek}`}>
                  <circle cx={xFor(index)} cy={yFor(point.value)} r="5" fill="#22c55e" />
                  <text
                    x={xFor(index)}
                    y={yFor(point.value) - 10}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {formatCompactValue(point.value, selectedTrendMetric.format)}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-slate-400 md:grid-cols-2">
            {trendPoints.map((point) => (
              <div
                key={`legend-${point.gameweek}`}
                className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2"
              >
                Omgång {point.gameweek}: {point.opponent} ({formatDate(point.date)})
              </div>
            ))}
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            Datakälla:{" "}
            <a
              href={current.sourceUrl ?? "https://bolldata.se/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200"
            >
              bolldata.se
            </a>
            . Kombinerat-läget summerar räknetal (mål, avslut, passningar osv.) och
            använder snitt för procenttal.
          </p>
        </footer>
      </main>
    </div>
  );
}
