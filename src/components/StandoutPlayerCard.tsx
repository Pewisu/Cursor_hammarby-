"use client";

import { useState } from "react";

export interface StandoutStat {
  label: string;
  value: string;
  seasonAvg?: string;
  multiplier?: string;
  highlight?: boolean;
}

export interface StandoutPlayerData {
  name: string;
  position: string;
  age: number;
  nationality: string;
  rating: number;
  matchName: string;
  matchDate: string;
  minutes: number;
  heroStats: {
    goals: number;
    assists: number;
    xG: number;
    xA: number;
  };
  highlights: string[];
  topStats: StandoutStat[];
  seasonComparison: StandoutStat[];
  tacticalNotes: string[];
}

function RatingBadge({ rating }: { rating: number }) {
  const circumference = 2 * Math.PI * 42;
  const filled = (rating / 10) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke="rgba(148, 163, 184, 0.15)"
          strokeWidth="6"
        />
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke="url(#rating-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
        <defs>
          <linearGradient id="rating-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <p className="text-2xl font-black text-amber-200">{rating}</p>
        <p className="text-[9px] uppercase tracking-wide text-amber-300/70">Betyg</p>
      </div>
    </div>
  );
}

export default function StandoutPlayerCard({ player }: { player: StandoutPlayerData }) {
  const [showSeason, setShowSeason] = useState(false);

  return (
    <section className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#1a2920] via-[#1a2d26] to-[#1d2a1f] p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-4">
          <RatingBadge rating={player.rating} />
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/80">
              Matchens spelare
            </p>
            <h2 className="text-2xl font-bold text-slate-50">{player.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="rounded border border-slate-600/50 bg-slate-800/50 px-1.5 py-0.5">
                {player.position}
              </span>
              <span>{player.nationality}</span>
              <span>{player.age} år</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">{player.matchName}</p>
          <p className="text-[11px] text-slate-500">{player.matchDate}</p>
          <p className="mt-1 text-xs text-slate-400">{player.minutes} min spelade</p>
        </div>
      </div>

      {/* Hero stats */}
      <div className="mt-5 grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
          <p className="text-3xl font-black text-emerald-200">{player.heroStats.goals}</p>
          <p className="text-[10px] uppercase tracking-wide text-emerald-300/70">Mål</p>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center">
          <p className="text-3xl font-black text-cyan-200">{player.heroStats.assists}</p>
          <p className="text-[10px] uppercase tracking-wide text-cyan-300/70">Assist</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center">
          <p className="text-3xl font-black text-amber-200">{player.heroStats.xG.toFixed(2)}</p>
          <p className="text-[10px] uppercase tracking-wide text-amber-300/70">xG</p>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 text-center">
          <p className="text-3xl font-black text-purple-200">{player.heroStats.xA.toFixed(2)}</p>
          <p className="text-[10px] uppercase tracking-wide text-purple-300/70">xA</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-4 flex flex-wrap gap-2">
        {player.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-100"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Top stats grid */}
      <div className="mt-5 grid gap-2 md:grid-cols-2">
        {player.topStats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
              stat.highlight
                ? "border-emerald-500/30 bg-emerald-500/8"
                : "border-slate-600/40 bg-slate-800/40"
            }`}
          >
            <span className="text-xs text-slate-300">{stat.label}</span>
            <span className={`font-mono text-sm font-semibold ${stat.highlight ? "text-emerald-200" : "text-slate-100"}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Season comparison toggle */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setShowSeason(!showSeason)}
          className="w-full rounded-lg border border-slate-600/50 bg-slate-800/50 px-4 py-2.5 text-left text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400/40 hover:bg-slate-800/80"
        >
          {showSeason ? "▾" : "▸"} Jämfört med säsongssnittet
        </button>

        {showSeason && (
          <div className="mt-3 space-y-2 rounded-xl border border-amber-500/20 bg-[#1a2920]/80 p-4">
            <p className="mb-3 text-[10px] uppercase tracking-wide text-slate-400">
              Omgång 8 vs säsongssnitt (omgång 1-7)
            </p>
            {player.seasonComparison.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-xs text-slate-400">{stat.label}</span>
                <div className="flex flex-1 items-center gap-2">
                  <span className="font-mono text-sm font-bold text-emerald-200">{stat.value}</span>
                  {stat.seasonAvg && (
                    <span className="text-[11px] text-slate-500">
                      (snitt: {stat.seasonAvg})
                    </span>
                  )}
                  {stat.multiplier && (
                    <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-200">
                      {stat.multiplier}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tactical notes */}
      <div className="mt-4 rounded-lg border border-slate-600/40 bg-slate-900/40 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Taktisk kontext
        </p>
        <ul className="mt-2 space-y-1.5">
          {player.tacticalNotes.map((note) => (
            <li key={note} className="flex gap-1.5 text-xs text-slate-300">
              <span className="mt-0.5 text-amber-300">★</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
