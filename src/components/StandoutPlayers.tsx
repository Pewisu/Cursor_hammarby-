"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

export function StandoutPlayers({ data }: Props) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        Matchens nyckelspelare
      </h3>
      <p className="text-sm text-slate-400 mb-5">De spelare som stack ut mest i matchen</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.standoutPlayers.map((player, i) => {
          const isHome = player.team === "home";
          const teamColor = isHome ? data.home.color : data.away.color;
          const teamName = isHome ? data.home.shortName : data.away.shortName;

          return (
            <div
              key={i}
              className="rounded-xl bg-slate-800/60 border border-slate-700/40 overflow-hidden transition-transform hover:scale-[1.02] hover:border-slate-600/60"
            >
              <div
                className="h-1.5"
                style={{
                  background: `linear-gradient(90deg, ${teamColor}, ${teamColor}88)`,
                }}
              />
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{ backgroundColor: teamColor }}
                  >
                    {player.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{player.name}</div>
                    <div className="text-xs text-slate-400">
                      {teamName} &middot; {player.position}
                    </div>
                    <div
                      className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        backgroundColor: `${teamColor}25`,
                        color: isHome ? "#93c5fd" : "#86efac",
                      }}
                    >
                      {player.highlight}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">{player.description}</p>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(player.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="px-2 py-1 rounded-md bg-slate-700/50 text-[11px]"
                    >
                      <span className="text-slate-400">{key}: </span>
                      <span className="text-white font-semibold">
                        {typeof value === "number" && key === "precision" ? `${value}%` : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
