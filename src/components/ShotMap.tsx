"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

export function ShotMap({ data }: Props) {
  const shots = data.xgTimeline;

  const maxXg = Math.max(...shots.map((s) => s.xg));

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.15s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Avslut &amp; xG
      </h3>

      <div className="relative bg-slate-900/60 rounded-xl p-4 border border-slate-700/30">
        <div className="relative w-full" style={{ aspectRatio: "2 / 1.3" }}>
          {/* Pitch outline */}
          <div className="absolute inset-0 border-2 border-slate-600/40 rounded-lg" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-b-2 border-l-2 border-r-2 border-slate-600/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-t-2 border-l-2 border-r-2 border-slate-600/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/6 h-[8%] border-b-2 border-l-2 border-r-2 border-slate-600/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/6 h-[8%] border-t-2 border-l-2 border-r-2 border-slate-600/40" />
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-600/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-slate-600/30 rounded-full" />

          {/* Shot dots */}
          {shots.map((shot, i) => {
            const isHome = shot.team === "home";
            const xPercent = 15 + ((shot.minute / 90) * 70);
            const baseY = isHome ? 20 : 80;
            const yJitter = ((i * 17 + 7) % 30) - 15;
            const yPercent = baseY + yJitter;

            const size = 8 + (shot.xg / maxXg) * 20;
            const isGoal = shot.result === "goal";
            const isSaved = shot.result === "saved";

            const color = isHome ? data.home.color : data.away.color;

            return (
              <div
                key={i}
                className="absolute group"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`rounded-full transition-transform hover:scale-150 cursor-pointer ${isGoal ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900" : ""}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    opacity: isSaved ? 0.7 : isGoal ? 1 : 0.45,
                  }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-white">
                  {isHome ? data.home.shortName : data.away.shortName} {shot.minute}&apos;
                  <br />
                  xG: {shot.xg.toFixed(2)} &middot;{" "}
                  {isGoal ? "MÅL!" : isSaved ? "Räddning" : "Miss"}
                </div>
              </div>
            );
          })}

          {/* Labels */}
          <div className="absolute top-2 left-3 text-xs text-blue-400 font-medium">
            {data.home.shortName}
          </div>
          <div className="absolute bottom-2 left-3 text-xs text-green-400 font-medium">
            {data.away.shortName}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white ring-offset-1 ring-offset-slate-900" />
            <span>Mål</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-70" />
            <span>Räddning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-40" />
            <span>Miss</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span>Storlek = xG-värde</span>
          </div>
        </div>
      </div>
    </div>
  );
}
