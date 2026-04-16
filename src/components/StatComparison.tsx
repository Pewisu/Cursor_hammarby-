"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

function formatValue(
  value: number,
  format: string,
  side: "home" | "away",
  stat: { home: number; away: number; label: string }
) {
  if (format === "percent") return `${value}%`;
  if (format === "decimal") return value.toFixed(2);
  if (stat.label === "Passningar") {
    const total = side === "home" ? 281 : 689;
    return `${value}/${total}`;
  }
  return value.toString();
}

function getBarWidth(value: number, otherValue: number): number {
  const max = Math.max(value, otherValue);
  if (max === 0) return 50;
  return (value / (value + otherValue)) * 100;
}

export function StatComparison({ data }: Props) {
  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.1s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Lagstatistik
      </h3>

      <div className="space-y-5">
        {data.teamStats.map((stat, i) => {
          const homeWidth = getBarWidth(stat.home, stat.away);
          const awayWidth = 100 - homeWidth;
          const homeWins = stat.home > stat.away;
          const awayWins = stat.away > stat.home;

          return (
            <div key={stat.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className={`text-sm font-mono tabular-nums ${homeWins ? "text-blue-300 font-semibold" : "text-slate-400"}`}
                >
                  {formatValue(stat.home, stat.format, "home", stat)}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
                <span
                  className={`text-sm font-mono tabular-nums ${awayWins ? "text-green-300 font-semibold" : "text-slate-400"}`}
                >
                  {formatValue(stat.away, stat.format, "away", stat)}
                </span>
              </div>
              <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-700/50">
                <div
                  className="animate-bar rounded-l-full transition-all duration-700"
                  style={{
                    width: `${homeWidth}%`,
                    background: homeWins
                      ? "linear-gradient(90deg, #1d4ed8, #3b82f6)"
                      : "#475569",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
                <div
                  className="animate-bar rounded-r-full transition-all duration-700"
                  style={{
                    width: `${awayWidth}%`,
                    background: awayWins
                      ? "linear-gradient(90deg, #16a34a, #22c55e)"
                      : "#475569",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
