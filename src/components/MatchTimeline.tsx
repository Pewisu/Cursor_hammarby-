"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

function EventIcon({ type }: { type: string }) {
  if (type === "goal") {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-sm shadow-lg shadow-yellow-500/20">
        ⚽
      </div>
    );
  }
  if (type === "yellow_card") {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
        <div className="w-3 h-4 bg-yellow-300 rounded-sm" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-xs shadow-lg">
      🔄
    </div>
  );
}

export function MatchTimeline({ data }: Props) {
  const events = data.matchEvents;

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.12s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Matchhändelser
      </h3>
      <p className="text-sm text-slate-400 mb-6">Alla mål, kort och byten i kronologisk ordning</p>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700 -translate-x-1/2" />

        <div className="space-y-4">
          {/* Kick-off */}
          <div className="flex items-center justify-center">
            <div className="px-3 py-1 rounded-full bg-slate-700 text-xs text-slate-300 font-medium z-10">
              Avspark
            </div>
          </div>

          {events.map((event, i) => {
            const isHome = event.team === "home";
            const isGoal = event.type === "goal";

            return (
              <div key={i} className={`flex items-center gap-3 ${isHome ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`flex-1 ${isHome ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block rounded-xl px-4 py-2.5 ${
                      isGoal
                        ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-500/30"
                        : event.type === "yellow_card"
                          ? "bg-yellow-500/10 border border-yellow-500/20"
                          : "bg-slate-700/50 border border-slate-600/30"
                    }`}
                  >
                    <div className={`font-semibold text-sm ${isGoal ? "text-yellow-300" : "text-white"}`}>
                      {event.player}
                    </div>
                    {event.detail && (
                      <div className="text-xs text-slate-400 mt-0.5">{event.detail}</div>
                    )}
                    {event.type === "yellow_card" && (
                      <div className="text-xs text-yellow-400 mt-0.5">Gult kort</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center z-10">
                  <EventIcon type={event.type} />
                  <span className="text-xs text-slate-400 mt-1 font-mono">{event.minute}&apos;</span>
                </div>

                <div className="flex-1" />
              </div>
            );
          })}

          {/* Full time */}
          <div className="flex items-center justify-center pt-2">
            <div className="px-3 py-1 rounded-full bg-slate-700 text-xs text-slate-300 font-medium z-10">
              Slutsignal &middot; 2-0
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          {data.home.shortName}
        </div>
        <div className="flex items-center gap-1.5">
          {data.away.shortName}
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
}
