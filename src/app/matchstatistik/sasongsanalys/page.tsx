import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  bolldataSpiderMetrics,
  goalPatternInsights,
  season2026LeagueMetrics,
  seasonHeadlines,
  sourceNotes,
  twelveIdentityMetrics,
  type BolldataSpiderMetric,
  type GoalPatternInsight,
  type SeasonIdentityMetric,
  type SeasonKey,
} from "@/lib/hammarbySeasonAnalysisData";

export const metadata: Metadata = {
  title: "Hammarby säsongsanalys 2026 | Twelve + Bolldata",
  description:
    "Visuell analys av Hammarbys säsong 2026 jämfört med Allsvenskan och Hammarbys säsonger 2024 och 2025.",
};

const seasonStyles: Record<
  SeasonKey,
  {
    label: string;
    stroke: string;
    fill: string;
    chip: string;
    text: string;
    dot: string;
  }
> = {
  "2026": {
    label: "2026",
    stroke: "#34d399",
    fill: "rgba(52, 211, 153, 0.24)",
    chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
    text: "text-emerald-200",
    dot: "bg-emerald-300",
  },
  "2025": {
    label: "2025",
    stroke: "#60a5fa",
    fill: "rgba(96, 165, 250, 0.18)",
    chip: "border-sky-400/40 bg-sky-400/10 text-sky-100",
    text: "text-sky-200",
    dot: "bg-sky-300",
  },
  "2024": {
    label: "2024",
    stroke: "#fbbf24",
    fill: "rgba(251, 191, 36, 0.16)",
    chip: "border-amber-300/40 bg-amber-300/10 text-amber-100",
    text: "text-amber-200",
    dot: "bg-amber-300",
  },
};

const seasons: SeasonKey[] = ["2026", "2025", "2024"];
const center = 165;
const radius = 112;
const labelRadius = 132;

const creamSlideStyle: CSSProperties = {
  backgroundColor: "#f7f8ef",
  backgroundImage:
    "radial-gradient(circle at 1px 1px, rgba(12, 64, 38, 0.055) 1px, transparent 0)",
  backgroundSize: "18px 18px",
};

const darkSlideStyle: CSSProperties = {
  backgroundColor: "#07351f",
  backgroundImage:
    "radial-gradient(circle at 20% 10%, rgba(250, 204, 21, 0.16), transparent 18%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.2), transparent 22%), radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.045) 1px, transparent 0)",
  backgroundSize: "auto, auto, 18px 18px",
};

function SlideShell({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`overflow-hidden rounded-[28px] border p-5 shadow-xl md:p-8 ${
        dark
          ? "border-emerald-900/80 text-white shadow-emerald-950/30"
          : "border-stone-200 text-[#12351f] shadow-stone-300/40"
      }`}
      style={dark ? darkSlideStyle : creamSlideStyle}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded-full bg-[#d6a51d]" />
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.22em] ${dark ? "text-amber-200" : "text-[#d6a51d]"}`}>
            {eyebrow}
          </p>
          <h2 className={`mt-1 text-2xl font-black uppercase tracking-tight md:text-3xl ${dark ? "text-white" : "text-[#0b3b22]"}`}>
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function rankScore(rank: number, total: number) {
  return ((total - rank + 1) / total) * 100;
}

function pointFor(index: number, total: number, score: number, targetRadius = radius) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const distance = (score / 100) * targetRadius;

  return {
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance,
    angle,
  };
}

function polygonPoints(scores: number[]) {
  return scores
    .map((score, index) => pointFor(index, scores.length, score))
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
}

function labelAnchor(angle: number) {
  const cos = Math.cos(angle);
  if (cos > 0.35) return "start";
  if (cos < -0.35) return "end";
  return "middle";
}

function labelDy(angle: number) {
  const sin = Math.sin(angle);
  if (sin < -0.6) return -7;
  if (sin > 0.6) return 11;
  return 3;
}

function RadarChart({
  title,
  metrics,
  getValue,
}: {
  title: string;
  metrics: Array<SeasonIdentityMetric | BolldataSpiderMetric>;
  getValue: (metric: SeasonIdentityMetric | BolldataSpiderMetric, season: SeasonKey) => { rank: number; total: number };
}) {
  const ringScores = [25, 50, 75, 100];
  const axisCount = metrics.length;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-lg shadow-stone-300/30">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6a51d]">Spindeldiagram</p>
          <h3 className="mt-1 text-2xl font-black text-[#0b3b22]">{title}</h3>
          <p className="mt-1 text-sm text-stone-600">Ligarang omräknat till 0-100.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <span
              key={season}
              className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-bold text-[#0b3b22]"
            >
              {season}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg viewBox="0 0 330 330" className="mx-auto h-[330px] w-full min-w-[310px]" role="img" aria-label={title}>
          {ringScores.map((score) => (
            <polygon
              key={score}
              points={polygonPoints(Array(axisCount).fill(score))}
              fill={score === 100 ? "rgba(255, 255, 255, 0.72)" : "none"}
              stroke={score === 100 ? "rgba(12, 64, 38, 0.5)" : "rgba(87, 83, 78, 0.22)"}
              strokeWidth={score === 100 ? 1.6 : 1}
            />
          ))}

          {metrics.map((metric, index) => {
            const outerPoint = pointFor(index, axisCount, 100);
            const textPoint = pointFor(index, axisCount, 100, labelRadius);

            return (
              <g key={metric.id}>
                <line
                  x1={center}
                  y1={center}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke="rgba(12, 64, 38, 0.22)"
                />
                <text
                  x={textPoint.x}
                  y={textPoint.y}
                  textAnchor={labelAnchor(textPoint.angle)}
                  dy={labelDy(textPoint.angle)}
                  fill="#0b3b22"
                  fontSize="9"
                  fontWeight="800"
                >
                  {metric.shortLabel}
                </text>
              </g>
            );
          })}

          {seasons.map((season) => {
            const scores = metrics.map((metric) => {
              const value = getValue(metric, season);
              return rankScore(value.rank, value.total);
            });

            return (
              <polygon
                key={season}
                points={polygonPoints(scores)}
                fill={seasonStyles[season].fill}
                stroke={seasonStyles[season].stroke}
                strokeWidth={2.2}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {seasons.map((season) => (
          <div key={season} className="rounded-2xl border border-stone-200 bg-white/80 p-3">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${seasonStyles[season].dot}`} />
              <span className="text-sm font-black text-[#0b3b22]">{season}</span>
            </div>
            <p className="mt-1 text-xs text-stone-600">
              Yta nära ytterkant betyder topprank i Allsvenskan den säsongen.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricBar({ value, rank, total }: { value: string; rank: number; total: number }) {
  const width = rankScore(rank, total);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-black text-[#0b3b22]">{value}</span>
        <span className="rounded-full bg-[#f4e7b1] px-2 py-0.5 font-bold text-[#705410]">
          {rank}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-stone-200">
        <div className="h-2 rounded-full bg-gradient-to-r from-[#0b7a3a] to-[#d6a51d]" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function rawSeasonScore(metric: SeasonIdentityMetric, season: SeasonKey) {
  const values = seasons.map((seasonKey) => metric.values[seasonKey].value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const current = metric.values[season].value;

  if (max === min) return 100;

  const relative =
    metric.direction === "higher"
      ? (current - min) / (max - min)
      : (max - current) / (max - min);

  return 28 + relative * 72;
}

function getBestSeason(metric: SeasonIdentityMetric) {
  return seasons.reduce((bestSeason, currentSeason) => {
    const bestValue = metric.values[bestSeason].value;
    const currentValue = metric.values[currentSeason].value;

    if (metric.direction === "higher") {
      return currentValue > bestValue ? currentSeason : bestSeason;
    }

    return currentValue < bestValue ? currentSeason : bestSeason;
  }, seasons[0]);
}

function formatDelta(metric: SeasonIdentityMetric, comparisonSeason: SeasonKey) {
  const delta = metric.values["2026"].value - metric.values[comparisonSeason].value;
  const isBetter =
    metric.direction === "higher"
      ? delta > 0
      : delta < 0;
  const isEven = Math.abs(delta) < 0.005;
  const formattedDelta = Math.abs(delta).toLocaleString("sv-SE", {
    minimumFractionDigits: Math.abs(delta) >= 10 ? 1 : 2,
    maximumFractionDigits: Math.abs(delta) >= 10 ? 1 : 2,
  });

  return {
    label: `2026 vs ${comparisonSeason}`,
    value: `${delta >= 0 ? "+" : "-"}${formattedDelta}`,
    tone: isEven ? "neutral" : isBetter ? "better" : "worse",
  };
}

function GraphicMetricComparison({ metric }: { metric: SeasonIdentityMetric }) {
  const bestSeason = getBestSeason(metric);
  const deltas = [formatDelta(metric, "2025"), formatDelta(metric, "2024")];

  return (
    <article className="rounded-3xl border border-stone-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-[#0b3b22]">{metric.label}</h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-stone-600">{metric.explanation}</p>
        </div>
        <span className="rounded-full border border-[#d6a51d]/40 bg-[#fbf1c4] px-3 py-1 text-xs font-black text-[#705410]">
          {metric.direction === "higher" ? "Högre är bättre" : "Lägre är bättre"}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {seasons.map((season) => {
          const value = metric.values[season];
          const score = rawSeasonScore(metric, season);
          const isBest = season === bestSeason;

          return (
            <div
              key={season}
              className={`rounded-2xl border bg-[#f7f8ef] p-3 ${
                isBest ? "border-[#0b7a3a] ring-2 ring-emerald-100" : "border-stone-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: seasonStyles[season].stroke }}
                  />
                  <span className="text-sm font-black text-[#0b3b22]">{season}</span>
                  {isBest && (
                    <span className="rounded-full bg-[#0b7a3a] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                      Bäst nivå
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-[#0b3b22]">{value.valueLabel}</p>
                  <p className="text-xs font-bold text-stone-500">
                    Rank {value.rank}/{value.total}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-3 rounded-full bg-stone-200">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${score}%`,
                    backgroundColor: seasonStyles[season].stroke,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {deltas.map((delta) => (
          <div
            key={delta.label}
            className={`rounded-2xl border px-4 py-3 text-base ${
              delta.tone === "better"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : delta.tone === "worse"
                  ? "border-amber-200 bg-amber-50 text-amber-900"
                  : "border-stone-200 bg-stone-50 text-stone-700"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wide">{delta.label}</p>
            <p className="mt-1 text-lg font-black">
              {delta.value} · {delta.tone === "better" ? "bättre" : delta.tone === "worse" ? "sämre" : "jämnt"}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function GoalPatternCard({ insight }: { insight: GoalPatternInsight }) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6a51d]">{insight.question}</p>
          <h3 className="mt-1 text-xl font-black text-[#0b3b22]">{insight.title}</h3>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {seasons.map((season) => (
          <div key={season} className="rounded-2xl border border-stone-200 bg-[#f7f8ef] p-3">
            <div className="flex items-start gap-3">
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: seasonStyles[season].stroke }}
              />
              <div>
                <p className="text-sm font-black text-[#0b3b22]">{season}</p>
                <p className="mt-1 text-base font-black text-[#12351f]">{insight.values[season].primary}</p>
                <p className="mt-1 text-sm leading-5 text-stone-600">{insight.values[season].secondary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-[#d6a51d]/35 bg-[#fff4c7] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#705410]">Tolkning</p>
        <p className="mt-2 break-words text-sm font-semibold leading-7 text-[#12351f]">{insight.takeaway}</p>
      </div>
    </article>
  );
}

export default function HammarbySeasonAnalysisPage() {
  const headline2026 = seasonHeadlines[0];
  const mainWarning = season2026LeagueMetrics.find((metric) => metric.id === "opp-np-xg");

  return (
    <div className="min-h-screen bg-[#dfe4d7] text-[#12351f]">
      <header className="px-3 py-4 md:px-6 md:py-8">
        <div
          className="mx-auto overflow-hidden rounded-[30px] border border-emerald-950/60 px-5 py-7 text-white shadow-2xl shadow-emerald-950/30 md:max-w-7xl md:px-10 md:py-12"
          style={darkSlideStyle}
        >
          <Link href="/matchstatistik" className="text-sm font-bold text-amber-200 hover:text-amber-100">
            ← Till matchstatistik
          </Link>
          <div className="mx-auto mt-6 max-w-5xl text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-amber-200">
              Säsongsanalys · Twelve + Bolldata
            </p>
            <div className="mx-auto mt-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-amber-300/80 bg-[#0b4a2a] shadow-xl shadow-black/20">
              <span className="text-3xl font-black leading-none text-white">HIF</span>
              <span className="mt-1 text-sm font-black tracking-[0.24em] text-amber-200">2026</span>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Bäst tryck i serien.
              <span className="block text-amber-200">Inte bäst balans.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-emerald-50/90 md:text-lg">
              En pitchvänlig berättelse om Hammarbys 2026 hittills: först jämfört med Allsvenskan,
              sedan mot Hammarbys 2024 och 2025.
            </p>
            <div className="mx-auto mt-7 grid max-w-3xl gap-3 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-200">Offensiv</p>
                <p className="mt-1 text-2xl font-black">2025+</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-200">Varningslampa</p>
                <p className="mt-1 text-2xl font-black">{mainWarning?.valueLabel} xG emot</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-200">Liga</p>
                <p className="mt-1 text-2xl font-black">Rank {mainWarning?.rank}/{mainWarning?.total}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-3 pb-8 md:px-6">
        <SlideShell eyebrow="Från 2024 till nuläget" title="Säsongerna i en bild">
          <div className="grid gap-4 md:grid-cols-3">
            {seasonHeadlines.map((season) => (
              <article key={season.season} className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-[#0b3b22]">{season.label}</h3>
                  <span className="rounded-full border border-[#d6a51d]/40 bg-[#f8edbd] px-2 py-1 text-xs font-black text-[#73540b]">
                    {season.leaguePosition}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Matcher", season.matches],
                    ["Poäng/match", season.pointsPerMatch.toFixed(2)],
                    ["Rad", season.record],
                    ["Mål", `${season.goalsFor}-${season.goalsAgainst}`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-stone-200 bg-[#f7f8ef] p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{label}</p>
                      <p className="mt-1 text-2xl font-black text-[#0b3b22]">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-700">{season.shortRead}</p>
              </article>
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Mot Allsvenskan 2026" title="Det mesta i spelet är toppklass">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.45fr]">
            <p className="text-base leading-7 text-stone-700">
              Ligarank gör storyn enkel: lågt ranknummer är bäst. 2026 är Hammarby etta i xG,
              avslut, territorium, boxnärvaro och press, men poängsnitt och xG emot släpar.
            </p>
            <div className="rounded-2xl border border-[#d6a51d]/35 bg-[#fbf1c4] p-4 text-sm font-semibold leading-6 text-[#664d0b]">
              Varningen: spelövertag räcker inte när motståndarna får för bra chanser.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {season2026LeagueMetrics.map((metric) => (
              <article key={metric.id} className="rounded-2xl border border-stone-200 bg-white/90 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-black text-[#0b3b22]">{metric.label}</h3>
                  <span className="rounded-full border border-stone-200 bg-[#f7f8ef] px-2 py-0.5 text-[11px] font-bold text-stone-600">
                    {metric.source}
                  </span>
                </div>
                <div className="mt-4">
                  <MetricBar value={metric.valueLabel} rank={metric.rank} total={metric.total} />
                </div>
                <p className="mt-3 text-xs leading-5 text-stone-600">{metric.explanation}</p>
              </article>
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Spindeldiagram från två källor" title="Samma story, två datalinser">
          <div className="grid gap-5 xl:grid-cols-2">
            <RadarChart
              title="TWELVE: SPELIDENTITET"
              metrics={twelveIdentityMetrics}
              getValue={(metric, season) => (metric as SeasonIdentityMetric).values[season]}
            />
            <RadarChart
              title="BOLLDATA: SPINDELDATA"
              metrics={bolldataSpiderMetrics}
              getValue={(metric, season) => (metric as BolldataSpiderMetric).values[season]}
            />
          </div>
        </SlideShell>

        <SlideShell eyebrow="Så säljer du in analysen" title="Tre meningar räcker">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              "Hammarby 2026 trycker ner motståndare mer än någon annan i serien.",
              "Offensiven har tagit ett tydligt steg från 2024 och ligger minst på 2025-nivå.",
              "Skillnaden mot 2025 är defensiv balans: motståndarnas xG är för hög.",
            ].map((text, index) => (
              <div key={text} className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6a51d] text-lg font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-[#12351f]">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Stor grön yta", "2026 ligger nära toppen i ligan på den axeln."],
              ["Blå linje", "2025 är referensen för komplett Hammarby-balans."],
              ["Gul linje", "2024 visar hur stort offensivt steg laget tagit."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-[#f7f8ef] p-4">
                <p className="font-black text-[#0b3b22]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
              </div>
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Grafisk jämförelse" title="Se skillnaden per säsong">
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            {[
              ["Färgad stapel", "Visar säsongens råa nivå jämfört med de andra två åren."],
              ["Rank-badge", "Visar hur Hammarby stod sig mot resten av Allsvenskan samma år."],
              ["Delta-rutor", "Visar exakt hur 2026 skiljer sig från 2025 och 2024."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                <p className="font-black text-[#0b3b22]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {twelveIdentityMetrics.map((metric) => (
              <GraphicMetricComparison key={metric.id} metric={metric} />
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Bolldata målrelaterat" title="Hur målen görs och släpps in">
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            {[
              ["Inte bara totalsiffror", "Här jämförs målens typ, plats och timing mellan 2024, 2025 och 2026."],
              ["Långskottshypotesen", "2024 var inte extremt på mål utanför boxen; 2025 hade både fler och högre andel."],
              ["2026-signalen", "Insläppta mål kommer fortsatt från boxen, samtidigt som matchstarter sticker ut negativt."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                <p className="font-black text-[#0b3b22]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {goalPatternInsights.map((insight) => (
              <GoalPatternCard key={insight.id} insight={insight} />
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Källor" title="Underlaget bakom decket">
          <ul className="grid gap-3 text-sm leading-6 text-stone-700 md:grid-cols-3">
            {sourceNotes.map((note) => (
              <li key={note} className="rounded-2xl border border-stone-200 bg-white/80 p-4">
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold text-stone-500">
            Hammarby 2026 avser läget efter {headline2026.matches} matcher i hämtat underlag.
          </p>
        </SlideShell>
      </main>
    </div>
  );
}
