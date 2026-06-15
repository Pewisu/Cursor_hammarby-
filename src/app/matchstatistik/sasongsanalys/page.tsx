import type { Metadata } from "next";
import Link from "next/link";
import {
  bolldataSpiderMetrics,
  season2026LeagueMetrics,
  seasonHeadlines,
  sourceNotes,
  twelveIdentityMetrics,
  type BolldataSpiderMetric,
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
    <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/30">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Spindeldiagram</p>
          <h3 className="mt-1 text-2xl font-black text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">Ligarang omräknat till 0-100.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <span key={season} className={`rounded-full border px-2.5 py-1 text-xs ${seasonStyles[season].chip}`}>
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
              fill={score === 100 ? "rgba(15, 23, 42, 0.8)" : "none"}
              stroke={score === 100 ? "rgba(226, 232, 240, 0.75)" : "rgba(148, 163, 184, 0.28)"}
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
                  stroke="rgba(148, 163, 184, 0.3)"
                />
                <text
                  x={textPoint.x}
                  y={textPoint.y}
                  textAnchor={labelAnchor(textPoint.angle)}
                  dy={labelDy(textPoint.angle)}
                  fill="rgb(203 213 225)"
                  fontSize="9"
                  fontWeight="600"
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
          <div key={season} className="rounded-2xl border border-slate-700/70 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${seasonStyles[season].dot}`} />
              <span className={`text-sm font-semibold ${seasonStyles[season].text}`}>{season}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
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
        <span className="font-semibold text-white">{value}</span>
        <span className="text-slate-400">
          {rank}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-700">
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function HammarbySeasonAnalysisPage() {
  const headline2026 = seasonHeadlines[0];
  const mainWarning = season2026LeagueMetrics.find((metric) => metric.id === "opp-np-xg");

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <header className="border-b border-slate-700/50 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_34%),#0f172a]">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link href="/matchstatistik" className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
            ← Till matchstatistik
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">Twelve + Bolldata</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Hammarby 2026: bäst tryck i serien, men inte bäst balans.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                En visuell berättelse för att förklara säsongen hittills: först mot Allsvenskan 2026,
                sedan mot Hammarbys 2024 och 2025.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5">
              <p className="text-sm font-semibold text-emerald-100">Kort slutsats</p>
              <p className="mt-2 text-2xl font-black text-white">Offensiven är 2025+.</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                Defensiva chanskvaliteten emot är inte 2025: {mainWarning?.valueLabel} motståndar-xG per match och
                rank {mainWarning?.rank}/{mainWarning?.total}.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
        <section className="grid gap-4 md:grid-cols-3">
          {seasonHeadlines.map((season) => (
            <article key={season.season} className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className={`text-xl font-black ${seasonStyles[season.season].text}`}>{season.label}</h2>
                <span className={`rounded-full border px-2 py-1 text-xs ${seasonStyles[season.season].chip}`}>
                  {season.leaguePosition}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/[0.04] p-3">
                  <p className="text-slate-400">Matcher</p>
                  <p className="mt-1 text-2xl font-black text-white">{season.matches}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] p-3">
                  <p className="text-slate-400">Poäng/match</p>
                  <p className="mt-1 text-2xl font-black text-white">{season.pointsPerMatch.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] p-3">
                  <p className="text-slate-400">Rad</p>
                  <p className="mt-1 text-2xl font-black text-white">{season.record}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] p-3">
                  <p className="text-slate-400">Mål</p>
                  <p className="mt-1 text-2xl font-black text-white">
                    {season.goalsFor}-{season.goalsAgainst}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{season.shortRead}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Mot Allsvenskan 2026</p>
              <h2 className="mt-1 text-2xl font-black text-white">Det mesta i spelet är toppklass</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Ligarank gör storyn enkel: lågt ranknummer är bäst. 2026 är Hammarby etta i xG, avslut,
                territorium, boxnärvaro och press, men poängsnitt och xG emot släpar.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
              Varningen: spelövertag räcker inte när motståndarna får för bra chanser.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {season2026LeagueMetrics.map((metric) => (
              <article key={metric.id} className="rounded-2xl border border-slate-700/60 bg-white/[0.035] p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-white">{metric.label}</h3>
                  <span className="rounded-full border border-slate-600 px-2 py-0.5 text-[11px] text-slate-300">
                    {metric.source}
                  </span>
                </div>
                <div className="mt-4">
                  <MetricBar value={metric.valueLabel} rank={metric.rank} total={metric.total} />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-400">{metric.explanation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
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
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Berättelsen att visa</p>
            <h2 className="mt-2 text-2xl font-black text-white">Tre meningar räcker</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-emerald-50/90">
              <li>1. Hammarby 2026 trycker ner motståndare mer än någon annan i serien.</li>
              <li>2. Offensiven har tagit ett tydligt steg från 2024 och ligger minst på 2025-nivå.</li>
              <li>3. Skillnaden mot 2025 är defensiv balans: motståndarnas xG är för hög.</li>
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Så läser man visualiseringen</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="font-bold text-white">Stor grön yta</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  2026 ligger nära toppen i ligan på den axeln.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="font-bold text-white">Blå linje</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  2025 är referensen för komplett Hammarby-balans.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="font-bold text-white">Gul linje</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  2024 visar hur stort offensivt steg laget tagit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <h2 className="text-xl font-black text-white">Detaljrader för presentation</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="py-3 pr-4">Mått</th>
                  {seasons.map((season) => (
                    <th key={season} className="py-3 pr-4">
                      {season}
                    </th>
                  ))}
                  <th className="py-3 pr-4">Tolkning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {twelveIdentityMetrics.map((metric) => (
                  <tr key={metric.id}>
                    <td className="py-3 pr-4 font-semibold text-white">{metric.label}</td>
                    {seasons.map((season) => {
                      const value = metric.values[season];
                      return (
                        <td key={season} className="py-3 pr-4 text-slate-300">
                          {value.valueLabel} · {value.rank}/{value.total}
                        </td>
                      );
                    })}
                    <td className="max-w-md py-3 pr-4 text-slate-400">{metric.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <h2 className="text-lg font-black text-white">Källor</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
            {sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">
            Hammarby 2026 avser läget efter {headline2026.matches} matcher i hämtat underlag.
          </p>
        </section>
      </main>
    </div>
  );
}
