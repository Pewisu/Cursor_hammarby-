import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";

export const metadata: Metadata = {
  title: "Kommande motståndare | Hammarby 2026",
  description:
    "Taktisk förhandsanalys av kommande motståndare med datadriven jämförelse mot Hammarby.",
};

export default function UpcomingOpponentsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Matchplan
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
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
              className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500 hover:text-white"
            >
              ← Matchstatistik översikt
            </Link>
            <Link
              href="/matchstatistik/omgang"
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200 hover:border-cyan-400"
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
            className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-700/50 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                  Omgång {report.round}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {report.fixture}
                </h2>
                <p className="mt-1 text-sm text-slate-300">{report.dateLabel}</p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                Startpunkt: Omgång 7
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-300">{report.context}</p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-300">
                  Hammarby just nu
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  {report.statusSnapshot.hammarby}
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-xs uppercase tracking-wide text-amber-300">
                  IFK Göteborg just nu
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  {report.statusSnapshot.opponent}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <article className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 lg:col-span-1">
                <h3 className="text-sm font-semibold text-white">Så spelar motståndaren</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {report.opponentIdentity.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 text-emerald-300">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 lg:col-span-1">
                <h3 className="text-sm font-semibold text-white">Styrkor att respektera</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {report.strengths.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 text-green-300">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 lg:col-span-1">
                <h3 className="text-sm font-semibold text-white">Sårbarheter att attackera</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {report.vulnerabilities.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 text-rose-300">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-700/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-200">
                  <tr>
                    <th className="px-3 py-2">Mätpunkt</th>
                    <th className="px-3 py-2">Hammarby</th>
                    <th className="px-3 py-2">IFK Göteborg</th>
                    <th className="px-3 py-2">Tolkning</th>
                  </tr>
                </thead>
                <tbody>
                  {report.keyMetrics.map((metric) => (
                    <tr key={metric.label} className="border-t border-slate-700/50">
                      <td className="px-3 py-2 font-medium text-white">{metric.label}</td>
                      <td className="px-3 py-2 text-emerald-200">{metric.hammarby}</td>
                      <td className="px-3 py-2 text-amber-200">{metric.opponent}</td>
                      <td className="px-3 py-2 text-slate-300">{metric.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <article className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h3 className="text-sm font-semibold text-emerald-200">
                  Hammarby med boll
                </h3>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {report.tacticalPlanForHammarby.inPossession.map((point) => (
                    <li key={point.title}>
                      <p className="font-medium text-white">{point.title}</p>
                      <p className="mt-1 text-slate-300">{point.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <h3 className="text-sm font-semibold text-cyan-200">
                  Hammarby utan boll
                </h3>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {report.tacticalPlanForHammarby.defensivePlay.map((point) => (
                    <li key={point.title}>
                      <p className="font-medium text-white">{point.title}</p>
                      <p className="mt-1 text-slate-300">{point.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                <h3 className="text-sm font-semibold text-violet-200">Matchmanagement</h3>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {report.tacticalPlanForHammarby.gameManagement.map((point) => (
                    <li key={point.title}>
                      <p className="font-medium text-white">{point.title}</p>
                      <p className="mt-1 text-slate-300">{point.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="mt-6 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
              <h3 className="text-sm font-semibold text-white">Förväntad matchbild</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {report.expectedMatchPicture.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-emerald-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="mt-4 rounded-xl border border-slate-700/60 bg-slate-950/50 p-4">
              <h3 className="text-sm font-semibold text-white">Datakällor</h3>
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
