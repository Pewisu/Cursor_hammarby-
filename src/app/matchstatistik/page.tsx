import type { Metadata } from "next";
import Link from "next/link";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

export const metadata: Metadata = {
  title: "Matchstatistik | Hammarby 2026",
  description:
    "Översiktssida för matchstatistik med tydliga val: kombinerat läge, omgång för omgång och senaste omgång.",
};

export default function MatchStatisticsRoutePage() {
  const sortedRounds = [...hammarbyRoundMatchStats].sort((a, b) => a.gameweek - b.gameweek);
  const latestRound = sortedRounds[sortedRounds.length - 1] ?? null;

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Matchstatistik</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Välj vad du vill göra
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Tydlig ingång till matchanalys: börja i kombinerad översikt eller gå direkt till
            omgång för omgång.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/matchstatistik/kombinerat"
            className="group rounded-2xl border border-blue-500/30 bg-slate-800/80 p-6 transition-colors hover:border-blue-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
              📊
            </div>
            <h2 className="text-xl font-semibold text-white">Kombinerat</h2>
            <p className="mt-2 text-sm text-slate-300">
              Se hela bilden med nyckeltal, trender och säsongsjämförelser i en samlad vy.
            </p>
            <p className="mt-4 text-sm font-medium text-blue-300 group-hover:text-blue-200">
              Öppna kombinerat →
            </p>
          </Link>

          <Link
            href="/matchstatistik/omgang"
            className="group rounded-2xl border border-cyan-500/30 bg-slate-800/80 p-6 transition-colors hover:border-cyan-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
              🗂️
            </div>
            <h2 className="text-xl font-semibold text-white">Omgång för omgång</h2>
            <p className="mt-2 text-sm text-slate-300">
              Välj en specifik omgång och navigera snabbt mellan tidigare och nästa match.
            </p>
            <p className="mt-4 text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
              Öppna omgångar →
            </p>
          </Link>

          {latestRound ? (
            <Link
              href={`/matchstatistik/omgang/${latestRound.gameweek}`}
              className="group rounded-2xl border border-emerald-500/30 bg-slate-800/80 p-6 transition-colors hover:border-emerald-400/60 hover:bg-slate-800"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                ⚡
              </div>
              <h2 className="text-xl font-semibold text-white">Senaste omgång</h2>
              <p className="mt-2 text-sm text-slate-300">
                Gå direkt till aktuell omgång ({latestRound.gameweek}) för snabb uppföljning.
              </p>
              <p className="mt-4 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
                Öppna senaste →
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
              <h2 className="text-xl font-semibold text-white">Senaste omgång</h2>
              <p className="mt-2 text-sm text-slate-300">
                Ingen omgång tillgänglig ännu.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h3 className="text-sm font-semibold text-white">Tips för bättre överblick</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>Starta i Kombinerat för helhetsbilden av KPI:er och säsongsjämförelser.</li>
            <li>Byt till Omgångar när du vill djupdyka i en enskild match.</li>
            <li>Använd jämförelselägena ett i taget för tydligare tolkning.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
