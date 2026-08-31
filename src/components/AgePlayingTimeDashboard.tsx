"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ageThresholdLabels,
  ageThresholdOrder,
  type AgeThresholdKey,
  type HammarbyAgePlayingTimeSeason,
} from "@/lib/hammarbyAgePlayingTimeData";

type AgeBucketKey =
  | "u18"
  | "age19"
  | "age20"
  | "age21"
  | "age22"
  | "age23"
  | "peak"
  | "twilight";

type AgeBucket = {
  key: AgeBucketKey;
  label: string;
  description: string;
  minutes: number;
  percentage: number;
  color: string;
};

const bucketMeta: Record<
  AgeBucketKey,
  Pick<AgeBucket, "label" | "description" | "color">
> = {
  u18: {
    label: "U18",
    description: "Yngsta minuterna",
    color: "#7dd3fc",
  },
  age19: {
    label: "19",
    description: "Bryggan från akademi till senior",
    color: "#38bdf8",
  },
  age20: {
    label: "20",
    description: "Tidiga etableringsminuter",
    color: "#22c55e",
  },
  age21: {
    label: "21",
    description: "U21-minuter utanför U20",
    color: "#84cc16",
  },
  age22: {
    label: "22",
    description: "Nästa seniorsteg",
    color: "#facc15",
  },
  age23: {
    label: "23",
    description: "Sista talangåret i U23-måttet",
    color: "#fb923c",
  },
  peak: {
    label: "Peak 24-29",
    description: "Senioråren där spelare ofta är som mest produktiva",
    color: "#94a3b8",
  },
  twilight: {
    label: "Twilight 30+",
    description: "Rutinerade veteranminuter",
    color: "#475569",
  },
};

const thresholdColors: Record<AgeThresholdKey, string> = {
  u23: "#22c55e",
  u22: "#84cc16",
  u21: "#facc15",
  u20: "#38bdf8",
  u19: "#a78bfa",
  u18: "#fb7185",
};

const lineKeys: AgeThresholdKey[] = ["u23", "u21", "u20"];

function formatMinutes(minutes: number) {
  return `${minutes.toLocaleString("sv-SE")} min`;
}

function formatPercentage(value: number) {
  return `${value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;
}

function formatAge(value: number) {
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatDelta(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} p.p.`;
}

function buildBuckets(season: HammarbyAgePlayingTimeSeason): AgeBucket[] {
  const { seniorBreakdown, thresholds, totalAvailableMinutes } = season;
  const rawBuckets: { key: AgeBucketKey; minutes: number }[] = [
    { key: "u18", minutes: thresholds.u18.minutes },
    { key: "age19", minutes: thresholds.u19.minutes - thresholds.u18.minutes },
    { key: "age20", minutes: thresholds.u20.minutes - thresholds.u19.minutes },
    { key: "age21", minutes: thresholds.u21.minutes - thresholds.u20.minutes },
    { key: "age22", minutes: thresholds.u22.minutes - thresholds.u21.minutes },
    { key: "age23", minutes: thresholds.u23.minutes - thresholds.u22.minutes },
    { key: "peak", minutes: seniorBreakdown.peak.minutes },
    { key: "twilight", minutes: seniorBreakdown.twilight.minutes },
  ];

  return rawBuckets.map(({ key, minutes }) => ({
    key,
    ...bucketMeta[key],
    minutes: Math.max(0, minutes),
    percentage: (Math.max(0, minutes) / totalAvailableMinutes) * 100,
  }));
}

function rankLabel(rank: number, teams: number) {
  return `#${rank} av ${teams}`;
}

function miniBarWidth(percentage: number) {
  return `${Math.max(percentage, percentage > 0 ? 0.8 : 0)}%`;
}

function bucketBarLabel(bucket: AgeBucket) {
  if (bucket.key === "peak") return "Peak";
  if (bucket.key === "twilight") return "30+";
  return bucket.label;
}

function AverageAgeSection({
  seasons,
}: {
  seasons: HammarbyAgePlayingTimeSeason[];
}) {
  const maxAge = Math.max(
    ...seasons.flatMap((season) => [
      season.averageAge.totalSquad,
      season.averageAge.startingEleven,
      season.averageAge.bench,
      season.averageAge.substitutions,
    ])
  );
  const rows = [
    {
      key: "totalSquad",
      label: "Truppsnitt",
      description: "Alla matchtruppsminuter i Bolldatas snittålder.",
    },
    {
      key: "startingEleven",
      label: "Startelva",
      description: "Åldern i laget som startar matcherna.",
    },
    {
      key: "bench",
      label: "Bänk",
      description: "Hur ung eller rutinerad reservkraften är.",
    },
    {
      key: "substitutions",
      label: "Inbytta",
      description: "Åldersprofilen på minuterna som kommer från bänken.",
    },
  ] as const;

  return (
    <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/20">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Snittålder
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">
            Hur gammal är matchtruppen?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Här syns samma säsonger som i speltiden, men med Bolldatas
            snittålder uppdelad på total trupp, startelva, bänk och inbytta.
            Det visar om Hammarby blir yngre i talangminuterna eller i hela
            matchtruppens sammansättning.
          </p>
        </div>

        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.key} className="rounded-2xl bg-slate-950/45 p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{row.label}</h3>
                  <p className="mt-1 text-xs text-slate-500">{row.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {seasons.map((season) => {
                  const value = season.averageAge[row.key];
                  return (
                    <div
                      key={`${row.key}-${season.label}`}
                      className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-3 text-sm"
                    >
                      <span className="font-semibold text-slate-300">
                        {season.label}
                      </span>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-emerald-300"
                          style={{ width: `${(value / maxAge) * 100}%` }}
                        />
                      </div>
                      <span className="text-right font-semibold text-white">
                        {formatAge(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendLineChart({
  seasons,
  selectedThreshold,
}: {
  seasons: HammarbyAgePlayingTimeSeason[];
  selectedThreshold: AgeThresholdKey;
}) {
  const displayedLineKeys = lineKeys.includes(selectedThreshold)
    ? lineKeys
    : [...lineKeys, selectedThreshold];
  const width = 640;
  const height = 240;
  const paddingX = 56;
  const paddingY = 34;
  const maxValue =
    Math.ceil(
      Math.max(
        ...seasons.flatMap((season) =>
          displayedLineKeys.map((key) => season.thresholds[key].percentage)
        )
      ) / 10
    ) *
      10 +
    10;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const xForIndex = (index: number) =>
    paddingX + (chartWidth / Math.max(1, seasons.length - 1)) * index;
  const yForValue = (value: number) =>
    paddingY + chartHeight - (value / maxValue) * chartHeight;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/30">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Utveckling i talangminuter</h2>
          <p className="mt-1 text-sm text-slate-400">
            Kumulativ andel av Hammarbys totala spelminuter. Valt mått markeras.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedLineKeys.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                key === selectedThreshold
                  ? "border-white bg-white text-slate-950"
                  : "border-slate-700 bg-slate-950/50 text-slate-200"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: thresholdColors[key] }}
              />
              {ageThresholdLabels[key]}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Linjediagram över Hammarbys speltid under 23, under 21 och under 20"
        className="h-auto w-full"
      >
        {[0, maxValue / 2, maxValue].map((value) => (
          <g key={value}>
            <line
              x1={paddingX}
              x2={width - paddingX}
              y1={yForValue(value)}
              y2={yForValue(value)}
              stroke="#334155"
              strokeDasharray={value === 0 ? "0" : "5 6"}
            />
            <text
              x={paddingX - 12}
              y={yForValue(value) + 4}
              textAnchor="end"
              className="fill-slate-500 text-[11px]"
            >
              {value}%
            </text>
          </g>
        ))}

        {displayedLineKeys.map((key) => {
          const points = seasons.map((season, index) => ({
            x: xForIndex(index),
            y: yForValue(season.thresholds[key].percentage),
            value: season.thresholds[key].percentage,
            season: season.label,
          }));
          const path = points
            .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
            .join(" ");

          return (
            <g key={key}>
              <path
                d={path}
                fill="none"
                stroke={thresholdColors[key]}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={key === selectedThreshold ? 1 : 0.55}
                strokeWidth={key === selectedThreshold ? "5" : "3"}
              />
              {points.map((point) => (
                <g key={`${key}-${point.season}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#0f172a"
                    stroke={thresholdColors[key]}
                    strokeWidth="3"
                  />
                  <title>{`${ageThresholdLabels[key]} ${point.season}: ${formatPercentage(
                    point.value
                  )}`}</title>
                </g>
              ))}
            </g>
          );
        })}

        {seasons.map((season, index) => (
          <text
            key={season.season}
            x={xForIndex(index)}
            y={height - 8}
            textAnchor="middle"
            className="fill-slate-300 text-[12px] font-semibold"
          >
            {season.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function AgePlayingTimeDashboard({
  seasons,
}: {
  seasons: HammarbyAgePlayingTimeSeason[];
}) {
  const [selectedSeasonLabel, setSelectedSeasonLabel] = useState(
    seasons[seasons.length - 1]?.label ?? "2026"
  );
  const [selectedThreshold, setSelectedThreshold] = useState<AgeThresholdKey>("u21");

  const selectedSeason =
    seasons.find((season) => season.label === selectedSeasonLabel) ?? seasons[0];
  const firstSeason = seasons[0];
  const selectedBuckets = useMemo(() => buildBuckets(selectedSeason), [selectedSeason]);
  const selectedPeakBucket = selectedBuckets.find((bucket) => bucket.key === "peak");
  const selectedTwilightBucket = selectedBuckets.find(
    (bucket) => bucket.key === "twilight"
  );
  const selectedDominantBucket = [...selectedBuckets].sort(
    (a, b) => b.minutes - a.minutes
  )[0];

  const thresholdTrend = seasons.map((season) => ({
    season: season.label,
    value: season.thresholds[selectedThreshold].percentage,
    rank: season.thresholds[selectedThreshold].rank,
  }));

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="overflow-hidden border-b border-emerald-400/10 bg-[radial-gradient(circle_at_top_left,#14532d_0,#0f172a_35%,#07111f_72%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <Link href="/" className="transition-colors hover:text-white">
              Start
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/spelarstatistik" className="transition-colors hover:text-white">
              Spelarstatistik
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-200">Speltid per ålderskategori</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Hammarby IF · Bolldata Talangdata
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Speltid per ålderskategori
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Jämför hur Hammarbys minuter fördelas mellan unga spelare och
                etablerad seniorålder under 2024, 2025 och 2026. Vyn bryter
                ned Bolldatas U23-U18-mått och delar dessutom 24+ i Peak
                24-29 och Twilight 30+.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Vald säsong · {selectedSeason.label}</p>
                  <p className="mt-1 text-3xl font-black text-white">
                    {formatPercentage(selectedSeason.thresholds.u23.percentage)}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {rankLabel(
                    selectedSeason.thresholds.u23.rank,
                    selectedSeason.thresholds.u23.teams
                  )}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Hammarbys U23-andel för {selectedSeason.label} är{" "}
                {formatPercentage(selectedSeason.thresholds.u23.percentage)}. U21-andelen
                är {formatDelta(
                  selectedSeason.thresholds.u21.percentage -
                    firstSeason.thresholds.u21.percentage
                )}{" "}
                jämfört med 2024.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:py-10">
        <section className="grid gap-4 md:grid-cols-4">
          {[
            {
              label: `U23-andel ${selectedSeason.label}`,
              value: formatPercentage(selectedSeason.thresholds.u23.percentage),
              caption: rankLabel(
                selectedSeason.thresholds.u23.rank,
                selectedSeason.thresholds.u23.teams
              ),
            },
            {
              label: `U21-utv. 2024-${selectedSeason.label}`,
              value: formatDelta(
                selectedSeason.thresholds.u21.percentage -
                  firstSeason.thresholds.u21.percentage
              ),
              caption: `från ${formatPercentage(
                firstSeason.thresholds.u21.percentage
              )} till ${formatPercentage(selectedSeason.thresholds.u21.percentage)}`,
            },
            {
              label: `Peak 24-29 ${selectedSeason.label}`,
              value: formatPercentage(selectedPeakBucket?.percentage ?? 0),
              caption: `${formatMinutes(selectedPeakBucket?.minutes ?? 0)} · twilight ${formatPercentage(
                selectedTwilightBucket?.percentage ?? 0
              )}`,
            },
            {
              label: `Snittålder ${selectedSeason.label}`,
              value: formatAge(selectedSeason.averageAge.totalSquad),
              caption: rankLabel(selectedSeason.averageAge.rank, selectedSeason.averageAge.teams),
            },
          ].map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20"
            >
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{card.value}</p>
              <p className="mt-2 text-sm text-emerald-200">{card.caption}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Fördelning av minuter per ålderslager
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Unga lager från Bolldata och faktisk 24+ split via spelarnas
                  födelsedatum och matchminuter.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => (
                  <button
                    key={season.label}
                    type="button"
                    onClick={() => setSelectedSeasonLabel(season.label)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      selectedSeasonLabel === season.label
                        ? "bg-emerald-400 text-slate-950"
                        : "border border-slate-700 bg-slate-950/40 text-slate-300 hover:border-emerald-300/70"
                    }`}
                  >
                    {season.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {seasons.map((season) => {
                const buckets = buildBuckets(season);
                return (
                  <div key={season.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-white">{season.label}</span>
                        <span className="ml-2 text-slate-500">{season.status}</span>
                      </div>
                      <span className="text-slate-400">
                        {season.matches} matcher · {formatMinutes(season.totalAvailableMinutes)}
                      </span>
                    </div>
                    <div className="flex h-11 overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800">
                      {buckets.map((bucket) => (
                        <div
                          key={bucket.key}
                          className="group relative h-full border-r border-slate-950/40 last:border-r-0"
                          style={{
                            width: miniBarWidth(bucket.percentage),
                            backgroundColor: bucket.color,
                          }}
                          title={`${bucket.label}: ${formatPercentage(
                            bucket.percentage
                          )}, ${formatMinutes(bucket.minutes)}`}
                        >
                          {bucket.percentage >= 7 && (
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-950">
                              {bucketBarLabel(bucket)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedBuckets.map((bucket) => (
                <span
                  key={bucket.key}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-300"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: bucket.color }}
                  />
                  {bucket.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-950/30 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              UX-läsning
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              {selectedSeason.label}: tyngdpunkten ligger i {selectedDominantBucket?.label}
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80">
              Den största delen av Hammarbys spelminuter i vald säsong finns i
              ålderslagret {selectedDominantBucket?.label}, med{" "}
              {formatPercentage(selectedDominantBucket?.percentage ?? 0)} av
              totalen. Peak visar seniorer 24-29 år, medan Twilight visar 30+
              och gör den äldre delen av truppen mer läsbar.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">U21</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {formatPercentage(selectedSeason.thresholds.u21.percentage)}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">
                  {rankLabel(selectedSeason.thresholds.u21.rank, selectedSeason.thresholds.u21.teams)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">U23</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {formatPercentage(selectedSeason.thresholds.u23.percentage)}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">
                  {rankLabel(selectedSeason.thresholds.u23.rank, selectedSeason.thresholds.u23.teams)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">Peak 24-29</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {formatPercentage(selectedPeakBucket?.percentage ?? 0)}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">
                  {formatMinutes(selectedPeakBucket?.minutes ?? 0)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">Twilight 30+</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {formatPercentage(selectedTwilightBucket?.percentage ?? 0)}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">
                  {formatMinutes(selectedTwilightBucket?.minutes ?? 0)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">Snittålder</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {formatAge(selectedSeason.averageAge.totalSquad)}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">
                  Startelva {formatAge(selectedSeason.averageAge.startingEleven)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <dt className="text-xs text-emerald-200/70">Datastatus</dt>
                <dd className="mt-1 text-2xl font-black text-white">
                  {selectedSeason.matches}
                </dd>
                <dd className="mt-1 text-xs text-slate-300">spelade matcher</dd>
              </div>
            </dl>
          </div>
        </section>

        <AverageAgeSection seasons={seasons} />

        <TrendLineChart seasons={seasons} selectedThreshold={selectedThreshold} />

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
            <h2 className="text-xl font-bold text-white">Följ ett kumulativt mått</h2>
            <p className="mt-1 text-sm text-slate-400">
              Välj åldersgräns och se rank + procent över säsongerna.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ageThresholdOrder.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedThreshold(key)}
                  className={`rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                    selectedThreshold === key
                      ? "bg-white text-slate-950"
                      : "border border-slate-700 bg-slate-950/40 text-slate-300 hover:border-white/50"
                  }`}
                >
                  {ageThresholdLabels[key]}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {thresholdTrend.map((point) => (
                <div key={point.season} className="rounded-2xl bg-slate-950/45 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{point.season}</span>
                    <span className="text-slate-300">
                      {formatPercentage(point.value)} · #{point.rank}
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${point.value}%`,
                        backgroundColor: thresholdColors[selectedThreshold],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70">
            <div className="border-b border-slate-800 p-5">
              <h2 className="text-xl font-bold text-white">Kumulativa Bolldata-tabeller</h2>
              <p className="mt-1 text-sm text-slate-400">
                Minuter, andel och ranking för Hammarby per åldersgräns.
              </p>
            </div>
            <div className="space-y-3 p-4 md:hidden">
              {ageThresholdOrder.map((key) => (
                <article
                  key={key}
                  className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4"
                >
                  <h3 className="font-semibold text-white">{ageThresholdLabels[key]}</h3>
                  <div className="mt-3 space-y-3">
                    {seasons.map((season) => {
                      const metric = season.thresholds[key];
                      return (
                        <div
                          key={`${season.label}-${key}-mobile`}
                          className="rounded-xl bg-slate-900/70 p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-slate-300">
                              {season.label}
                            </span>
                            <span className="text-lg font-black text-white">
                              {formatPercentage(metric.percentage)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between gap-3 text-xs text-slate-400">
                            <span>{formatMinutes(metric.minutes)}</span>
                            <span>{rankLabel(metric.rank, metric.teams)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Mått</th>
                    {seasons.map((season) => (
                      <th key={season.label} className="px-5 py-4">
                        {season.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ageThresholdOrder.map((key) => (
                    <tr key={key} className="align-top">
                      <th className="px-5 py-4 font-semibold text-white">
                        {ageThresholdLabels[key]}
                      </th>
                      {seasons.map((season) => {
                        const metric = season.thresholds[key];
                        return (
                          <td key={`${season.label}-${key}`} className="px-5 py-4">
                            <div className="font-semibold text-white">
                              {formatPercentage(metric.percentage)}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {formatMinutes(metric.minutes)} ·{" "}
                              {rankLabel(metric.rank, metric.teams)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-xl font-bold text-white">Datagrund</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Bolldata publicerar måtten som kumulativa minuter: U23 inkluderar
                alla spelare under 23, U22 är en delmängd av U23 och så vidare.
                Ålderslagren i dashboarden räknas därför fram genom differensen
                mellan intilliggande gränser. Peak 24-29 och Twilight 30+ är
                beräknade från Bolldatas matchspelardata med födelsedatum,
                säsongsår och spelade minuter.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {seasons.map((season) => (
                <a
                  key={season.label}
                  href={season.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 transition-colors hover:border-emerald-300/70"
                >
                  <p className="text-sm font-semibold text-white">Bolldata {season.label}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Talangdata · uppdateras 24 timmar efter match
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
