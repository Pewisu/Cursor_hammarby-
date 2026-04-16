"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

export function MatchHeader({ data }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-green-600/10" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />

        <div className="relative px-6 pt-6 pb-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300 flex-wrap justify-center">
            <span>{data.competition}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>{data.round}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>{data.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>{data.time}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 space-x-2">
            <span>{data.venue}</span>
            <span>&middot;</span>
            <span>Publik: {data.attendance.toLocaleString("sv-SE")}</span>
            <span>&middot;</span>
            <span>Domare: {data.referee}</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-6 sm:gap-12 px-6 py-8">
          <div className="flex-1 text-center">
            <div className="text-5xl sm:text-6xl mb-3">{data.home.logo}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{data.home.shortName}</h2>
            <p className="text-sm text-slate-400 mt-1">{data.home.name}</p>
            <div className="mt-2 text-xs text-slate-500">{data.home.formation}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="text-5xl sm:text-7xl font-black text-white tabular-nums">{data.home.goals}</span>
              <span className="text-2xl sm:text-3xl font-light text-slate-500">–</span>
              <span className="text-5xl sm:text-7xl font-black text-white tabular-nums">{data.away.goals}</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">HT 1-0</div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-blue-400">xG {data.teamStats[0].home}</span>
              <span className="text-slate-600">|</span>
              <span className="text-green-400">xG {data.teamStats[0].away}</span>
            </div>
            <div className="mt-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
              Slutresultat
            </div>
          </div>

          <div className="flex-1 text-center">
            <div className="text-5xl sm:text-6xl mb-3">{data.away.logo}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{data.away.shortName}</h2>
            <p className="text-sm text-slate-400 mt-1">{data.away.name}</p>
            <div className="mt-2 text-xs text-slate-500">{data.away.formation}</div>
          </div>
        </div>

        {/* Goal scorers */}
        <div className="relative px-6 pb-6">
          <div className="flex justify-center gap-8 text-sm">
            <div className="text-right space-y-1">
              {data.matchEvents
                .filter((e) => e.type === "goal" && e.team === "home")
                .map((e, i) => (
                  <div key={i} className="text-blue-300">
                    <span className="font-semibold">{e.player}</span>
                    <span className="text-blue-400/60 ml-1">{e.minute}&apos;</span>
                  </div>
                ))}
            </div>
            <div className="text-left space-y-1">
              {data.matchEvents
                .filter((e) => e.type === "goal" && e.team === "away")
                .map((e, i) => (
                  <div key={i} className="text-green-300">
                    <span className="text-green-400/60 mr-1">{e.minute}&apos;</span>
                    <span className="font-semibold">{e.player}</span>
                  </div>
                ))}
              {data.matchEvents.filter((e) => e.type === "goal" && e.team === "away").length === 0 && (
                <div className="text-slate-600 italic text-xs">Inga mål</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
