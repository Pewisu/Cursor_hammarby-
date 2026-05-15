import type { Metadata } from "next";
import Link from "next/link";
import {
  categories,
  styleComparison,
  spiderAxes,
  summaryInsights,
  glossary,
  teamInfo,
} from "@/lib/hammarbyVsHtffData";
import type { ComparisonMetric } from "@/lib/hammarbyVsHtffData";
import SpiderComparisonChart from "@/components/SpiderComparisonChart";

export const metadata: Metadata = {
  title: "Hammarby vs Hammarby TFF | Intern jämförelse 2026",
  description:
    "Datadriven jämförelse mellan Hammarby (Allsvenskan) och Hammarby TFF (Ettan Norra) baserat på Twelve Football season reports 2026.",
};

function formatValue(value: number, unit: string): string {
  if (unit === "%") return `${value}%`;
  if (unit === "s") return `${value}s`;
  if (unit === "m") return `${value}m`;
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2);
}

function getWinner(
  metric: ComparisonMetric
): "hammarby" | "htff" | "tie" {
  if (metric.hammarbyValue === metric.htffValue) return "tie";
  if (metric.direction === "higher") {
    return metric.hammarbyValue > metric.htffValue ? "hammarby" : "htff";
  }
  return metric.hammarbyValue < metric.htffValue ? "hammarby" : "htff";
}

function getBarWidths(
  hammarbyVal: number,
  htffVal: number
): { left: number; right: number } {
  const total = hammarbyVal + htffVal;
  if (total === 0) return { left: 50, right: 50 };
  const left = (hammarbyVal / total) * 100;
  return { left, right: 100 - left };
}

function getCategoryWinner(
  metrics: ComparisonMetric[]
): "hammarby" | "htff" | "tie" {
  let hammarbyWins = 0;
  let htffWins = 0;
  for (const m of metrics) {
    const w = getWinner(m);
    if (w === "hammarby") hammarbyWins++;
    else if (w === "htff") htffWins++;
  }
  if (hammarbyWins > htffWins) return "hammarby";
  if (htffWins > hammarbyWins) return "htff";
  return "tie";
}

const toneStyles: Record<"emerald" | "amber" | "blue", string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/10",
  amber: "border-amber-400/30 bg-amber-400/10",
  blue: "border-slate-400/40 bg-slate-600/30",
};

export default function HammarbyVsHtffPage() {
  const hammarby = teamInfo.hammarby;
  const htff = teamInfo.htff;

  let totalHammarbyWins = 0;
  let totalHtffWins = 0;
  for (const cat of categories) {
    for (const m of cat.metrics) {
      const w = getWinner(m);
      if (w === "hammarby") totalHammarbyWins++;
      else if (w === "htff") totalHtffWins++;
    }
  }

  return (
    <div className="min-h-screen bg-[#13231d]">
      <header className="border-b border-emerald-800/45 bg-[#163028]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
            Intern jämförelse
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
            Hammarby vs Hammarby TFF
          </h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-300 md:text-base">
            Jämförelse av spelstil och nyckeltal mellan A-laget (Allsvenskan)
            och talanglagets (Ettan Norra) säsongsrapporter från Twelve Football
            2026. Visar tydligt vad som är likt, vad som skiljer sig och vilket
            lag som presterar bäst i varje kategori.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/matchstatistik"
              className="rounded-lg border border-slate-500/75 bg-slate-900/35 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-300 hover:text-white"
            >
              ← Matchstatistik översikt
            </Link>
            <Link
              href="/matchstatistik/kommande"
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-100 hover:border-amber-300"
            >
              Kommande motståndare
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {/* Team cards */}
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
              A-laget
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-50">
              {hammarby.name}
            </h2>
            <p className="mt-1 text-sm text-emerald-100/80">
              {hammarby.league}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
                <p className="text-2xl font-bold text-emerald-100">
                  {hammarby.pointsPerMatch}
                </p>
                <p className="text-[11px] text-emerald-200/70">Poäng/match</p>
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
                <p className="text-2xl font-bold text-emerald-100">
                  {hammarby.goalsPerMatch}-{hammarby.oppGoalsPerMatch}
                </p>
                <p className="text-[11px] text-emerald-200/70">
                  Mål för/emot per match
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
                <p className="text-2xl font-bold text-emerald-100">
                  {hammarby.xgPerMatch}
                </p>
                <p className="text-[11px] text-emerald-200/70">xG/match</p>
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
                <p className="text-2xl font-bold text-emerald-100">
                  {hammarby.possession}%
                </p>
                <p className="text-[11px] text-emerald-200/70">Bollinnehav</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/90">
              Talanglag
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-50">
              {htff.name}
            </h2>
            <p className="mt-1 text-sm text-amber-100/80">{htff.league}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3">
                <p className="text-2xl font-bold text-amber-100">
                  {htff.pointsPerMatch}
                </p>
                <p className="text-[11px] text-amber-200/70">Poäng/match</p>
              </div>
              <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3">
                <p className="text-2xl font-bold text-amber-100">
                  {htff.goalsPerMatch}-{htff.oppGoalsPerMatch}
                </p>
                <p className="text-[11px] text-amber-200/70">
                  Mål för/emot per match
                </p>
              </div>
              <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3">
                <p className="text-2xl font-bold text-amber-100">
                  {htff.xgPerMatch}
                </p>
                <p className="text-[11px] text-amber-200/70">xG/match</p>
              </div>
              <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3">
                <p className="text-2xl font-bold text-amber-100">
                  {htff.possession}%
                </p>
                <p className="text-[11px] text-amber-200/70">Bollinnehav</p>
              </div>
            </div>
          </article>
        </section>

        {/* Scoreboard */}
        <section className="rounded-2xl border border-slate-600/50 bg-[#1a2d26] p-5">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-300">
            Totalt – vem vinner flest nyckeltal?
          </h2>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-300">
                {totalHammarbyWins}
              </p>
              <p className="text-xs text-emerald-200/70">Hammarby</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-400">vs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-300">
                {totalHtffWins}
              </p>
              <p className="text-xs text-amber-200/70">HTFF</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Antal nyckeltal där respektive lag har bäst värde (av{" "}
            {totalHammarbyWins + totalHtffWins +
              categories.reduce(
                (acc, c) =>
                  acc + c.metrics.filter((m) => getWinner(m) === "tie").length,
                0
              )}{" "}
            totalt)
          </p>
        </section>

        {/* Summary insights */}
        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {summaryInsights.map((insight) => (
            <article
              key={insight.title}
              className={`rounded-xl border p-4 ${toneStyles[insight.tone]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-white/90">
                {insight.title}
              </p>
              <p className="mt-2 text-sm text-slate-200">{insight.body}</p>
            </article>
          ))}
        </section>

        {/* Spider chart */}
        <details
          className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6"
          open
        >
          <summary className="cursor-pointer text-sm font-semibold text-slate-100">
            Spindel-jämförelse Hammarby vs HTFF (visa/dölj)
          </summary>
          <p className="mt-1 text-xs text-slate-400">
            Normaliserade poäng (0-100) baserat på ligaplacering och
            råvärden från Twelve Football season reports.
          </p>
          <SpiderComparisonChart
            axes={spiderAxes}
            opponentLabel="HTFF"
          />
        </details>

        {/* Style comparison */}
        <details className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6">
          <summary className="cursor-pointer text-sm font-semibold text-slate-100">
            Spelstilsjämförelse (visa)
          </summary>
          <p className="mt-2 text-xs text-slate-400">
            Hammarbys och HTFF:s positionering på Twelve Footballs stilaxlar.
          </p>
          <div className="mt-4 space-y-5">
            {styleComparison.map((axis) => (
              <div
                key={axis.label}
                className="rounded-lg border border-slate-600/60 bg-white/5 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                  {axis.label}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{axis.leftLabel}</span>
                  <span>{axis.rightLabel}</span>
                </div>
                <div className="relative mt-1.5 h-3 rounded-full bg-slate-700/55">
                  <div
                    className="absolute top-0 h-3 w-3 rounded-full border-2 border-emerald-300 bg-emerald-500"
                    style={{ left: `calc(${axis.hammarbyScore}% - 6px)` }}
                    title={`Hammarby: ${axis.hammarbyPosition}`}
                  />
                  <div
                    className="absolute top-0 h-3 w-3 rounded-full border-2 border-amber-300 bg-amber-500"
                    style={{ left: `calc(${axis.htffScore}% - 6px)` }}
                    title={`HTFF: ${axis.htffPosition}`}
                  />
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    HIF: {axis.hammarbyPosition}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded border border-amber-400/25 bg-amber-400/10 px-1.5 py-0.5 text-amber-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    HTFF: {axis.htffPosition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Category-by-category comparison */}
        {categories.map((category) => {
          const winner = getCategoryWinner(category.metrics);
          const winnerLabel =
            winner === "hammarby"
              ? "Hammarby"
              : winner === "htff"
                ? "HTFF"
                : "Oavgjort";
          const winnerBorder =
            winner === "hammarby"
              ? "border-emerald-500/40"
              : winner === "htff"
                ? "border-amber-400/40"
                : "border-slate-500/40";
          const winnerBg =
            winner === "hammarby"
              ? "bg-emerald-500/15"
              : winner === "htff"
                ? "bg-amber-400/15"
                : "bg-slate-500/15";
          const winnerText =
            winner === "hammarby"
              ? "text-emerald-200"
              : winner === "htff"
                ? "text-amber-200"
                : "text-slate-200";

          return (
            <details
              key={category.id}
              className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6"
            >
              <summary className="cursor-pointer">
                <div className="inline-flex w-full items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-100">
                    {category.title}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-[11px] font-medium ${winnerBorder} ${winnerBg} ${winnerText}`}
                  >
                    {winnerLabel}
                  </span>
                </div>
              </summary>

              <p className="mt-2 text-xs text-slate-400">
                {category.description}
              </p>

              {/* Verdicts */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/8 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">
                    Hammarby
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {category.hammarbyVerdict}
                  </p>
                </div>
                <div className="rounded-lg border border-amber-400/25 bg-amber-400/8 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-200">
                    HTFF
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {category.htffVerdict}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-5 space-y-4">
                {category.metrics.map((metric) => {
                  const metricWinner = getWinner(metric);
                  const { left, right } = getBarWidths(
                    metric.hammarbyValue,
                    metric.htffValue
                  );

                  return (
                    <div key={`${category.id}-${metric.label}`}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                        <span
                          className={`font-mono ${metricWinner === "hammarby" ? "font-bold text-emerald-200" : "text-emerald-300/70"}`}
                        >
                          {formatValue(metric.hammarbyValue, metric.unit)}
                        </span>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[11px] uppercase tracking-wide text-slate-400">
                            {metric.label}
                          </span>
                          {metricWinner !== "tie" && (
                            <span
                              className={`text-[10px] font-medium ${metricWinner === "hammarby" ? "text-emerald-300" : "text-amber-300"}`}
                            >
                              {metricWinner === "hammarby"
                                ? "← HIF bäst"
                                : "HTFF bäst →"}
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-mono ${metricWinner === "htff" ? "font-bold text-amber-200" : "text-amber-300/70"}`}
                        >
                          {formatValue(metric.htffValue, metric.unit)}
                        </span>
                      </div>
                      <div className="flex h-2.5 gap-0.5 rounded-full bg-slate-700/60">
                        <div
                          className="rounded-l-full transition-all duration-500"
                          style={{
                            width: `${left}%`,
                            background:
                              metricWinner === "hammarby"
                                ? "linear-gradient(90deg, #059669, #34d399)"
                                : "linear-gradient(90deg, #064e3b, #047857)",
                          }}
                        />
                        <div
                          className="rounded-r-full transition-all duration-500"
                          style={{
                            width: `${right}%`,
                            background:
                              metricWinner === "htff"
                                ? "linear-gradient(90deg, #d97706, #fbbf24)"
                                : "linear-gradient(90deg, #78350f, #92400e)",
                          }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                        {metric.hammarbyRank && (
                          <span>Rank: {metric.hammarbyRank}</span>
                        )}
                        {!metric.hammarbyRank && <span />}
                        {metric.htffRank && (
                          <span>Rank: {metric.htffRank}</span>
                        )}
                      </div>
                      {metric.note && (
                        <p className="mt-1 text-[11px] text-slate-500">
                          {metric.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </details>
          );
        })}

        {/* Glossary */}
        <details className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6">
          <summary className="cursor-pointer text-sm font-semibold text-slate-100">
            Ordlista (visa)
          </summary>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {glossary.map((item) => (
              <li
                key={item.term}
                className="rounded-lg border border-slate-600/60 bg-white/5 p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                  {item.term}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.explanation}
                </p>
              </li>
            ))}
          </ul>
        </details>

        {/* Data sources */}
        <article className="rounded-2xl border border-slate-600/70 bg-slate-900/35 p-5">
          <h3 className="text-sm font-semibold text-slate-100">Datakällor</h3>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            <li>
              •{" "}
              <a
                href="https://reports.twelve.football/reports/hammarby-season-report-9FKTw5a6Xg.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-200 underline decoration-emerald-400/70 underline-offset-2 hover:text-emerald-100"
              >
                Twelve Football – Hammarby Allsvenskan 2026 Season Report
              </a>
            </li>
            <li>
              •{" "}
              <a
                href="https://reports.twelve.football/reports/hammarby-talang-season-report-5cGwA2cwX7.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-200 underline decoration-emerald-400/70 underline-offset-2 hover:text-emerald-100"
              >
                Twelve Football – Hammarby Talang Ettan 2026 Season Report
              </a>
            </li>
          </ul>
        </article>
      </main>
    </div>
  );
}
