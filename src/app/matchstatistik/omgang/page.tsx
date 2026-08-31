import Link from "next/link";
import type { Metadata } from "next";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

export const metadata: Metadata = {
  title: "Matchstatistik Omgångar | Hammarby 2026",
  description: "Navigera direkt till enskilda omgångar i matchstatistiken.",
};

export default function MatchStatisticsRoundsIndexPage() {
  const rounds = [...hammarbyRoundMatchStats].sort((a, b) => a.gameweek - b.gameweek);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Matchstatistik</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Omgångar</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Välj en omgång för att öppna detaljerad matchanalys och jämförelser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/matchstatistik"
              className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500 hover:text-white"
            >
              ← Matchstatistik översikt
            </Link>
            <Link
              href="/matchstatistik/sasong"
              className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200 hover:border-blue-400"
            >
              Säsongsstatistik
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rounds.map((round) => (
            <Link
              key={round.key}
              href={`/matchstatistik/omgang/${round.gameweek}`}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-4 transition-colors hover:border-blue-400/50 hover:bg-slate-800"
            >
              <p className="text-sm font-semibold text-white">Omgång {round.gameweek}</p>
              <p className="mt-1 text-xs text-slate-400">{round.matchName}</p>
              <p className="mt-1 text-xs text-slate-500">{round.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
