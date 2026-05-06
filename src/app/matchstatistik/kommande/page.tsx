import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";

export const metadata: Metadata = {
  title: "Kommande motståndare | Hammarby 2026",
  description:
    "Taktisk förhandsanalys av kommande motståndare med datadriven jämförelse mot Hammarby.",
};

const SPIDER_CENTER_X = 190;
const SPIDER_CENTER_Y = 165;
const SPIDER_RADIUS = 110;
const SPIDER_LABEL_RADIUS = 132;
const SPIDER_RING_STEPS = [20, 40, 60, 80, 100];

const spiderShortLabels: Record<string, string> = {
  "Lyckade anfallsaktioner / match": "Anfallsaktioner",
  "Mål / match": "Mål",
  "xG / match": "xG",
  "Avslut / match": "Avslut",
  "Skott på mål / match": "Skott på mål",
  "Lyckade defensiva aktioner / match": "Def. aktioner",
  "Duellvinster / match": "Duellvinster",
  "Återerövringar / match": "Återerövringar",
  "Hållna nollor (%)": "Hållna nollor",
  "Bollinnehav (%)": "Bollinnehav",
  "Framåtpassningar / match": "Framåtpassningar",
};

function getSpiderPoint(
  index: number,
  total: number,
  score: number,
  radius: number,
) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const scaledRadius = (score / 100) * radius;

  return {
    x: SPIDER_CENTER_X + Math.cos(angle) * scaledRadius,
    y: SPIDER_CENTER_Y + Math.sin(angle) * scaledRadius,
    angle,
  };
}

function getSpiderLabelAnchor(angle: number): "start" | "middle" | "end" {
  const cosValue = Math.cos(angle);
  if (cosValue > 0.35) return "start";
  if (cosValue < -0.35) return "end";
  return "middle";
}

function getSpiderLabelDy(angle: number) {
  const sinValue = Math.sin(angle);
  if (sinValue < -0.6) return -6;
  if (sinValue > 0.6) return 10;
  return 3;
}

function buildSpiderAxisId(round: number, label: string) {
  const normalized = label
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `spider-r${round}-${normalized}`;
}

export default function UpcomingOpponentsPage() {
  const toneStyles: Record<"emerald" | "amber" | "blue", string> = {
    emerald: "border-emerald-500/30 bg-emerald-500/10",
    amber: "border-amber-400/30 bg-amber-400/10",
    blue: "border-slate-400/40 bg-slate-600/30",
  };

  return (
    <div className="min-h-screen bg-[#13231d]">
      <header className="border-b border-emerald-800/45 bg-[#163028]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
            Matchplan
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
            Kommande motståndare
          </h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-300 md:text-base">
            Datadriven scouting av nästa motståndare med fokus på spelstil,
            nyckeltal och en konkret plan för hur Hammarby kan kontrollera
            matchbilden.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/matchstatistik"
              className="rounded-lg border border-slate-500/75 bg-slate-900/35 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-300 hover:text-white"
            >
              ← Matchstatistik översikt
            </Link>
            <Link
              href="/matchstatistik/omgang"
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-100 hover:border-amber-300"
            >
              Omgångsstatistik
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {upcomingOpponents.map((report) => {
          const axisCount = report.spiderComparison.length;
          const ringPolygons = SPIDER_RING_STEPS.map((step) =>
            report.spiderComparison
              .map((_, index) => getSpiderPoint(index, axisCount, step, SPIDER_RADIUS))
              .map((point) => `${point.x},${point.y}`)
              .join(" "),
          );
          const hammarbyPoints = report.spiderComparison.map((axis, index) =>
            getSpiderPoint(index, axisCount, axis.hammarbyScore, SPIDER_RADIUS),
          );
          const opponentPoints = report.spiderComparison.map((axis, index) =>
            getSpiderPoint(index, axisCount, axis.opponentScore, SPIDER_RADIUS),
          );
          const hammarbyPolygonPoints = hammarbyPoints
            .map((point) => `${point.x},${point.y}`)
            .join(" ");
          const opponentPolygonPoints = opponentPoints
            .map((point) => `${point.x},${point.y}`)
            .join(" ");

          return (
            <section
              key={`${report.round}-${report.fixture}`}
              className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6"
            >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-800/45 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
                  Omgång {report.round}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-50">
                  {report.fixture}
                </h2>
                <p className="mt-1 text-sm text-slate-300">{report.dateLabel}</p>
              </div>
              <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
                Startpunkt: Omgång 7
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-100">
              {report.oneLineSummary}
            </p>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {report.quickStatusCards.map((card) => (
                <article
                  key={card.title}
                  className={`rounded-xl border p-4 ${toneStyles[card.tone]}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/90">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-100">{card.body}</p>
                </article>
              ))}
            </div>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Så spelar IFK Göteborg (visa)
              </summary>
              <div className="mt-3 space-y-2">
                {report.styleProfile.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-lg border border-slate-600/60 bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                        {signal.label}
                      </p>
                      <span className="text-xs text-amber-200">{signal.value}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-700/55">
                      <div
                        className="h-1.5 rounded-full bg-emerald-400"
                        style={{ width: `${signal.score}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{signal.explanation}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {report.opponentStyle.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-emerald-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Spindel-jämförelse Hammarby vs IFK (Bolldata) (visa)
              </summary>
              <p className="mt-1 text-xs text-slate-400">
                Axlar från Bolldatas lagjämförelse för Allsvenskan 2026 efter 6 omgångar.
              </p>
              <p className="mt-1 text-xs text-emerald-200/85">
                Tryck på etiketter/punkter i spindeln eller knapparna nedan för att hoppa till respektive mätvärde.
              </p>
              <article className="mt-3 rounded-lg border border-slate-600/60 bg-white/5 p-3">
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 380 340"
                    className="mx-auto h-[320px] w-full min-w-[320px]"
                    role="img"
                    aria-label="Radarjämförelse mellan Hammarby och IFK Göteborg"
                  >
                    {ringPolygons.map((points, index) => {
                      const isOuterRing = index === ringPolygons.length - 1;

                      return (
                        <polygon
                          key={`ring-${SPIDER_RING_STEPS[index]}`}
                          points={points}
                          fill={isOuterRing ? "rgba(250, 204, 21, 0.05)" : "none"}
                          stroke={
                            isOuterRing
                              ? "rgba(250, 204, 21, 0.85)"
                              : "rgba(148, 163, 184, 0.35)"
                          }
                          strokeWidth={isOuterRing ? 2 : 1}
                        />
                      );
                    })}

                    {report.spiderComparison.map((axis, index) => {
                      const axisId = buildSpiderAxisId(report.round, axis.label);
                      const outerPoint = getSpiderPoint(index, axisCount, 100, SPIDER_RADIUS);
                      const labelPoint = getSpiderPoint(
                        index,
                        axisCount,
                        100,
                        SPIDER_LABEL_RADIUS,
                      );

                      return (
                        <g key={axis.label}>
                          <line
                            x1={SPIDER_CENTER_X}
                            y1={SPIDER_CENTER_Y}
                            x2={outerPoint.x}
                            y2={outerPoint.y}
                            stroke="rgba(148, 163, 184, 0.35)"
                            strokeWidth={1}
                          />
                          <a href={`#${axisId}`}>
                            <circle
                              cx={outerPoint.x}
                              cy={outerPoint.y}
                              r={6}
                              fill="transparent"
                            />
                            <text
                              x={labelPoint.x}
                              y={labelPoint.y}
                              fontSize={9}
                              fill="rgb(203 213 225)"
                              textAnchor={getSpiderLabelAnchor(labelPoint.angle)}
                              dy={getSpiderLabelDy(labelPoint.angle)}
                              style={{ cursor: "pointer" }}
                            >
                              {spiderShortLabels[axis.label] ?? axis.label}
                            </text>
                          </a>
                        </g>
                      );
                    })}

                    <polygon
                      points={opponentPolygonPoints}
                      fill="rgba(251, 191, 36, 0.18)"
                      stroke="rgba(253, 224, 71, 0.9)"
                      strokeWidth={2}
                    />
                    <polygon
                      points={hammarbyPolygonPoints}
                      fill="rgba(16, 185, 129, 0.2)"
                      stroke="rgba(52, 211, 153, 0.95)"
                      strokeWidth={2}
                    />

                    {report.spiderComparison.map((axis, index) => {
                      const axisId = buildSpiderAxisId(report.round, axis.label);
                      const opponentPoint = opponentPoints[index];
                      const hammarbyPoint = hammarbyPoints[index];

                      return (
                        <a href={`#${axisId}`} key={`axis-points-${axis.label}`}>
                          <circle
                            cx={opponentPoint.x}
                            cy={opponentPoint.y}
                            r={2.5}
                            fill="rgb(253 224 71)"
                            style={{ cursor: "pointer" }}
                          />
                          <circle
                            cx={hammarbyPoint.x}
                            cy={hammarbyPoint.y}
                            r={2.5}
                            fill="rgb(52 211 153)"
                            style={{ cursor: "pointer" }}
                          />
                        </a>
                      );
                    })}
                  </svg>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <div className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Hammarby
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded border border-amber-400/35 bg-amber-400/10 px-2 py-1">
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    IFK Göteborg
                  </div>
                </div>
              </article>
              <div className="mt-3 overflow-x-auto pb-1">
                <div className="flex min-w-max items-center gap-2">
                  {report.spiderComparison.map((axis) => (
                    <a
                      key={`chip-${axis.label}`}
                      href={`#${buildSpiderAxisId(report.round, axis.label)}`}
                      className="rounded border border-slate-500/50 bg-slate-700/30 px-2 py-1 text-[11px] text-slate-200 hover:border-emerald-300/60 hover:text-white"
                    >
                      {spiderShortLabels[axis.label] ?? axis.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {report.spiderComparison.map((axis) => (
                  <div
                    key={axis.label}
                    id={buildSpiderAxisId(report.round, axis.label)}
                    className="scroll-mt-24 rounded-lg border border-slate-600/60 bg-white/5 p-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                        {axis.label}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-100">
                          HIF {axis.hammarbyValue}
                        </span>
                        <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-100">
                          IFK {axis.opponentValue}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{axis.note}</p>
                  </div>
                ))}
              </div>
            </details>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Nyckeltal med Allsvensk ranking (visa)
              </summary>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {report.rankedMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-slate-600/60 bg-white/5 p-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                      {metric.label}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                      <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-emerald-100">
                        HIF: {metric.hammarbyValue}
                      </span>
                      <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-100">
                        IFK: {metric.opponentValue}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <span className="justify-self-start rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-emerald-100">
                        HIF rank: {metric.hammarbyRank}
                      </span>
                      <span className="justify-self-end rounded border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-100">
                        IFK rank: {metric.opponentRank}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{metric.note}</p>
                  </div>
                ))}
              </div>
            </details>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                När i matchen bör Hammarby trycka? (visa)
              </summary>
              <p className="mt-1 text-xs text-slate-400">
                Hammarbys gjorda mål jämfört med IFK:s insläppta mål per tidsfönster.
              </p>
              <div className="mt-3 grid gap-2">
                {report.goalWindows.map((window) => (
                  <div
                    key={window.window}
                    className="flex items-center justify-between rounded-lg border border-slate-600/60 bg-white/5 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-slate-100">{window.window}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-emerald-100">
                        HIF mål: {window.hammarbyGoals}
                      </span>
                      <span className="rounded border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-100">
                        IFK insläppta: {window.opponentConcededGoals}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Målprofil att ta med till matchplanen (visa)
              </summary>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {report.goalTypeNotes.map((note) => (
                  <div
                    key={note.label}
                    className="rounded-lg border border-slate-600/60 bg-white/5 p-3"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      {note.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-100">{note.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{note.interpretation}</p>
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <article className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <h3 className="text-sm font-semibold text-emerald-100">
                  Hammarby med boll
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {report.hammarbyPlan.withBall.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 text-emerald-300">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-slate-500/45 bg-slate-700/20 p-4">
                <h3 className="text-sm font-semibold text-slate-100">
                  Hammarby utan boll
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {report.hammarbyPlan.withoutBall.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 text-slate-300">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-amber-400/35 bg-amber-400/10 p-4">
                <h3 className="text-sm font-semibold text-amber-100">Matchmanagement</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {report.hammarbyPlan.matchManagement.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 text-amber-200">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="mt-6 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-4">
              <h3 className="text-sm font-semibold text-slate-100">
                Sammanfattning (30 sekunder)
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                {report.mobileTakeaways.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 text-emerald-300">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <details className="mt-6 rounded-xl border border-emerald-800/45 bg-[#213630]/85 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                Ordlista (visa)
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {report.glossary.map((item) => (
                  <li key={item.term} className="rounded-lg border border-slate-600/60 bg-white/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                      {item.term}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.explanation}</p>
                  </li>
                ))}
              </ul>
            </details>

            <article className="mt-4 rounded-xl border border-slate-600/70 bg-slate-900/35 p-4">
              <h3 className="text-sm font-semibold text-slate-100">Datakällor</h3>
              <ul className="mt-2 space-y-1 text-xs text-slate-400">
                {report.dataSources.map((source) => (
                  <li key={source}>• {source}</li>
                ))}
              </ul>
            </article>
            </section>
          );
        })}
      </main>
    </div>
  );
}
