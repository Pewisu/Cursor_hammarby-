"use client";

import { matchData } from "@/lib/matchData";
import { useState } from "react";

type Props = { data: typeof matchData };

function formatValue(value: number, format: string) {
  if (format === "percent") return `${value}%`;
  if (format === "decimal") return value.toFixed(2);
  return value.toString();
}

function getBarWidth(value: number, otherValue: number): number {
  const total = value + otherValue;
  if (total === 0) return 50;
  return (value / total) * 100;
}

const categories: Record<string, string[]> = {
  Översikt: ["xG", "Avslut", "Skott på mål", "Bollinnehav", "Hörnor"],
  Passningar: ["Passningar", "Lyckade passningar", "Passningsprocent"],
  Försvar: ["Tacklingar", "Vunna tacklingar", "Frisparkar", "Regelbrott", "Gula kort"],
  Detaljer: ["Skott utanför", "Blockerade skott", "Bollkontakter i box", "Offsides", "Målvaktsräddningar"],
};

export function StatComparison({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState("Översikt");

  const visibleStats = data.teamStats.filter((s) =>
    categories[activeCategory]?.includes(s.label)
  );

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.1s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Lagstatistik
      </h3>

      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleStats.map((stat, i) => {
          const homeWidth = getBarWidth(stat.home, stat.away);
          const awayWidth = 100 - homeWidth;
          const homeWins = stat.home > stat.away;
          const awayWins = stat.away > stat.home;
          const isNegativeStat = ["Regelbrott", "Gula kort", "Offsides"].includes(stat.label);
          const homeHighlight = isNegativeStat ? !homeWins : homeWins;
          const awayHighlight = isNegativeStat ? !awayWins : awayWins;

          return (
            <div key={stat.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className={`text-sm font-mono tabular-nums ${homeHighlight ? "text-blue-300 font-semibold" : "text-slate-400"}`}>
                  {formatValue(stat.home, stat.format)}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{stat.label}</span>
                <span className={`text-sm font-mono tabular-nums ${awayHighlight ? "text-green-300 font-semibold" : "text-slate-400"}`}>
                  {formatValue(stat.away, stat.format)}
                </span>
              </div>
              <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-700/50">
                <div
                  className="animate-bar rounded-l-full transition-all duration-700"
                  style={{
                    width: `${homeWidth}%`,
                    background: homeHighlight ? "linear-gradient(90deg, #1d4ed8, #3b82f6)" : "#475569",
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
                <div
                  className="animate-bar rounded-r-full transition-all duration-700"
                  style={{
                    width: `${awayWidth}%`,
                    background: awayHighlight ? "linear-gradient(90deg, #16a34a, #22c55e)" : "#475569",
                    animationDelay: `${i * 0.06}s`,
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
