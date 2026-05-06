import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";
import SpiderComparisonChart from "@/components/SpiderComparisonChart";

export const metadata: Metadata = {
  title: "Kommande motståndare | Hammarby 2026",
  description:
    "Taktisk förhandsanalys av kommande motståndare med datadriven jämförelse mot Hammarby.",
};

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
        {upcomingOpponents.map((report) => (
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
              <SpiderComparisonChart axes={report.spiderComparison} />
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
        ))}
      </main>
    </div>
  );
}
