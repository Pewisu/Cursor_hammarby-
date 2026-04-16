"use client";

import Link from "next/link";
import { matchData } from "@/lib/matchData";
import { MatchHeader } from "@/components/MatchHeader";
import { MatchTimeline } from "@/components/MatchTimeline";
import { LineupFormation } from "@/components/LineupFormation";
import { StatComparison } from "@/components/StatComparison";
import { StandoutPlayers } from "@/components/StandoutPlayers";
import { XgTimeline } from "@/components/XgTimeline";
import { MomentumChart } from "@/components/MomentumChart";
import { ShotMap } from "@/components/ShotMap";
import { KeyInsights } from "@/components/KeyInsights";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Matchstatistik
            </span>
          </div>
          <div className="text-sm text-slate-400">
            Källa:{" "}
            <a
              href="https://bolldata.se/allsvenskan/matcher/2026/2026-04-13/sirius-hammarby-2-0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              bolldata.se
            </a>
            {" · "}
            <Link
              href="/lopdata"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Hammarby löpdata
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <MatchHeader data={matchData} />

        <StandoutPlayers data={matchData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatComparison data={matchData} />
          <MatchTimeline data={matchData} />
        </div>

        <LineupFormation data={matchData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <XgTimeline data={matchData} />
          <ShotMap data={matchData} />
        </div>

        <MomentumChart data={matchData} />
        <KeyInsights data={matchData} />

        <footer className="text-center text-sm text-slate-500 pb-8 pt-4 border-t border-slate-700/30">
          <div className="space-y-1">
            <div>
              Data från{" "}
              <a
                href="https://bolldata.se/allsvenskan/matcher/2026/2026-04-13/sirius-hammarby-2-0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                bolldata.se
              </a>
              ,{" "}
              <a href="https://www.bbc.com/sport/football/live/cwykp40jg18t" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                BBC Sport
              </a>
              {" "}&amp;{" "}
              <a href="https://www.espn.com/soccer/matchstats/_/gameId/401842672" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                ESPN
              </a>
            </div>
            <div>
              {matchData.competition} {matchData.round} &middot; {matchData.date} &middot; {matchData.venue}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
