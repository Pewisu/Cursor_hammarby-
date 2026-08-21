"use client";

import Link from "next/link";
import { useState } from "react";
import {
  hammarbyRefereeMatches,
  calcDomarindex,
  calcFoulDiff,
  calcCardDiff,
  getDomarRating,
  type RefereeMatchStats,
} from "@/lib/hammarbyRefereeData";

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  const months = [
    "jan", "feb", "mar", "apr", "maj", "jun",
    "jul", "aug", "sep", "okt", "nov", "dec",
  ];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
}

function formatSeconds(s: number): string {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

function IndexBar({ value, max }: { value: number; max: number }) {
  const isPositive = value >= 0;
  const pct = max > 0 ? Math.abs(value) / max : 0;
  const barWidth = `${Math.round(pct * 100)}%`;

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex h-5 w-40 items-center">
        <div className="absolute inset-0 flex">
          <div className="flex w-1/2 justify-end">
            {!isPositive && (
              <div
                className="h-full rounded-l bg-rose-500/80"
                style={{ width: barWidth }}
              />
            )}
          </div>
          <div className="flex w-1/2 justify-start">
            {isPositive && (
              <div
                className="h-full rounded-r bg-emerald-500/80"
                style={{ width: barWidth }}
              />
            )}
          </div>
        </div>
        <div className="absolute left-1/2 h-full w-px bg-slate-600" />
      </div>
      <span
        className={`w-8 text-right text-xs font-bold tabular-nums ${
          value > 0 ? "text-emerald-300" : value < 0 ? "text-rose-400" : "text-slate-400"
        }`}
      >
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );
}

function CardPip({ color }: { color: "yellow" | "red" }) {
  return (
    <span
      className={`inline-block h-3.5 w-2.5 rounded-sm border ${
        color === "yellow"
          ? "border-yellow-600 bg-yellow-400"
          : "border-red-700 bg-red-500"
      }`}
    />
  );
}

type MatchRow = {
  match: RefereeMatchStats;
  domarindex: number;
  foulDiff: number;
  cardDiff: number;
  stoppageMin: number;
};

function buildRows(): MatchRow[] {
  return [...hammarbyRefereeMatches]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
    match: m,
    domarindex: calcDomarindex(m),
    foulDiff: calcFoulDiff(m),
    cardDiff: calcCardDiff(m),
    stoppageMin: m.totalTimeMin - 90,
  }));
}

type RefereeAggregate = {
  referee: string;
  matches: MatchRow[];
  avgIndex: number;
  avgEffPlayingTimeS: number;
  avgStoppageMin: number;
  avgTotalCards: number;
  totalFoulDiff: number;
  hamTotalFouls: number;
  oppTotalFouls: number;
  hamTotalCards: number;
  oppTotalCards: number;
};

function buildRefereeAggregates(rows: MatchRow[]): RefereeAggregate[] {
  const map = new Map<string, MatchRow[]>();
  for (const row of rows) {
    const r = row.match.referee;
    if (!map.has(r)) map.set(r, []);
    map.get(r)!.push(row);
  }
  return Array.from(map.entries())
    .map(([referee, matches]) => {
      const n = matches.length;
      const avgIndex = matches.reduce((s, r) => s + r.domarindex, 0) / n;
      const avgEffPlayingTimeS = matches.reduce((s, r) => s + r.match.effectivePlayingTimeS, 0) / n;
      const avgStoppageMin = matches.reduce((s, r) => s + r.stoppageMin, 0) / n;
      const avgTotalCards = matches.reduce((s, r) => s + r.match.totalCards, 0) / n;
      const totalFoulDiff = matches.reduce((s, r) => s + r.foulDiff, 0);
      const hamTotalFouls = matches.reduce((s, r) => s + r.match.hammarby.fouls, 0);
      const oppTotalFouls = matches.reduce((s, r) => s + r.match.opponent.fouls, 0);
      const hamTotalCards = matches.reduce(
        (s, r) => s + r.match.hammarby.yellowCards + r.match.hammarby.redCards * 2, 0
      );
      const oppTotalCards = matches.reduce(
        (s, r) => s + r.match.opponent.yellowCards + r.match.opponent.redCards * 2, 0
      );
      return {
        referee, matches, avgIndex, avgEffPlayingTimeS, avgStoppageMin,
        avgTotalCards, totalFoulDiff, hamTotalFouls, oppTotalFouls,
        hamTotalCards, oppTotalCards,
      };
    })
    .sort((a, b) => b.avgIndex - a.avgIndex);
}

type ProfileCard = {
  label: string;
  sublabel: string;
  winner: string;
  value: string;
  valueNote: string;
  accent: string;
  bg: string;
  border: string;
};

function buildProfiles(rows: MatchRow[], aggs: RefereeAggregate[]): ProfileCard[] {
  // Most effective playing time (per avg)
  const mostEff = [...aggs].sort((a, b) => b.avgEffPlayingTimeS - a.avgEffPlayingTimeS)[0];
  // Most stoppage time (per avg)
  const mostStop = [...aggs].sort((a, b) => b.avgStoppageMin - a.avgStoppageMin)[0];
  // Most cards per match avg
  const mostCards = [...aggs].sort((a, b) => b.avgTotalCards - a.avgTotalCards)[0];
  // Most favorable domarindex for Hammarby (single match)
  const bestMatch = [...rows].sort((a, b) => b.domarindex - a.domarindex)[0];
  // Most unfavorable
  const worstMatch = [...rows].sort((a, b) => a.domarindex - b.domarindex)[0];
  // Neutral foul split (closest to 50/50 across all their matches)
  const mostNeutralFouls = [...aggs].sort(
    (a, b) =>
      Math.abs(a.hamTotalFouls - a.oppTotalFouls) -
      Math.abs(b.hamTotalFouls - b.oppTotalFouls)
  )[0];

  return [
    {
      label: "Mest effektiv speltid",
      sublabel: "per match i snitt",
      winner: mostEff.referee,
      value: formatSeconds(Math.round(mostEff.avgEffPlayingTimeS)),
      valueNote: `min eff. speltid/match${mostEff.matches.length > 1 ? ` (snitt ${mostEff.matches.length} matcher)` : ""}`,
      accent: "text-emerald-300",
      bg: "bg-emerald-900/20",
      border: "border-emerald-600/30",
    },
    {
      label: "Mest tilläggstid",
      sublabel: "per match i snitt",
      winner: mostStop.referee,
      value: `+${mostStop.avgStoppageMin % 1 === 0 ? mostStop.avgStoppageMin : mostStop.avgStoppageMin.toFixed(1)} min`,
      valueNote: `tillägg/match${mostStop.matches.length > 1 ? ` (snitt ${mostStop.matches.length} matcher)` : ""}`,
      accent: "text-amber-300",
      bg: "bg-amber-900/20",
      border: "border-amber-600/30",
    },
    {
      label: "Mest kort",
      sublabel: "per match i snitt",
      winner: mostCards.referee,
      value: `${mostCards.avgTotalCards % 1 === 0 ? mostCards.avgTotalCards : mostCards.avgTotalCards.toFixed(1)}`,
      valueNote: `kort/match (gul+röd)`,
      accent: "text-yellow-300",
      bg: "bg-yellow-900/20",
      border: "border-yellow-600/30",
    },
    {
      label: "Neutralast regelfel",
      sublabel: "jämnast fördelning Ham vs Mot",
      winner: mostNeutralFouls.referee,
      value: `${mostNeutralFouls.hamTotalFouls}–${mostNeutralFouls.oppTotalFouls}`,
      valueNote: `Ham–Motst. fouls (${mostNeutralFouls.matches.length > 1 ? `${mostNeutralFouls.matches.length} matcher` : "1 match"})`,
      accent: "text-sky-300",
      bg: "bg-sky-900/20",
      border: "border-sky-600/30",
    },
    {
      label: "Bäst match för Hammarby",
      sublabel: "domarindex enskild match",
      winner: `${bestMatch.match.referee} (ø${bestMatch.match.gameweek})`,
      value: `+${bestMatch.domarindex}`,
      valueNote: bestMatch.match.matchName,
      accent: "text-emerald-300",
      bg: "bg-emerald-900/20",
      border: "border-emerald-600/30",
    },
    {
      label: "Sämst match för Hammarby",
      sublabel: "domarindex enskild match",
      winner: `${worstMatch.match.referee} (ø${worstMatch.match.gameweek})`,
      value: `${worstMatch.domarindex}`,
      valueNote: worstMatch.match.matchName,
      accent: "text-rose-400",
      bg: "bg-rose-900/20",
      border: "border-rose-600/30",
    },
  ];
}

function OmgangensDomare({ rows }: { rows: MatchRow[] }) {
  const chronological = [...rows].sort(
    (a, b) => new Date(a.match.date).getTime() - new Date(b.match.date).getTime()
  );
  const [selectedIdx, setSelectedIdx] = useState(chronological.length - 1);
  const row = chronological[selectedIdx];
  const rating = getDomarRating(row.domarindex);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Segment
          </p>
          <h2 className="text-base font-bold text-white">Omgångens domare</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedIdx((i) => Math.max(0, i - 1))}
            disabled={selectedIdx === 0}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 disabled:opacity-30 hover:border-slate-600 hover:text-white"
          >
            ←
          </button>
          <span className="px-2 text-xs text-slate-400">
            Ø{row.match.gameweek} / {chronological.length}
          </span>
          <button
            onClick={() => setSelectedIdx((i) => Math.min(chronological.length - 1, i + 1))}
            disabled={selectedIdx === chronological.length - 1}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 disabled:opacity-30 hover:border-slate-600 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-6 ${rating.bg} ${rating.border}`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left: referee info */}
          <div className="flex-1">
            <p className="text-xs text-slate-400">
              Omgång {row.match.gameweek} · {formatDate(row.match.date)}
            </p>
            <a
              href={row.match.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg font-semibold text-white hover:text-slate-200"
            >
              {row.match.matchName}
            </a>
            <p className="mt-3 text-2xl font-black text-white">{row.match.referee}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Eff. speltid</p>
                <p className="mt-1 text-lg font-black text-sky-300">
                  {formatSeconds(row.match.effectivePlayingTimeS)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Tilläggstid</p>
                <p className="mt-1 text-lg font-black text-amber-300">+{row.stoppageMin} min</p>
              </div>
              <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Regelfel</p>
                <p className="mt-1 text-lg font-black text-emerald-300">
                  {row.match.hammarby.fouls}
                  <span className="text-slate-500">–</span>
                  {row.match.opponent.fouls}
                </p>
                <p className="text-[9px] text-slate-600">Ham – Mot</p>
              </div>
              <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Kort</p>
                <p className="mt-1 text-lg font-black text-emerald-300">
                  {row.match.hammarby.yellowCards + row.match.hammarby.redCards}
                  <span className="text-slate-500">–</span>
                  {row.match.opponent.yellowCards + row.match.opponent.redCards}
                </p>
                <p className="text-[9px] text-slate-600">Ham – Mot</p>
              </div>
            </div>
          </div>

          {/* Right: rating */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-700/30 bg-slate-900/50 px-8 py-6 text-center md:min-w-[160px]">
            <p className="text-4xl">{rating.emoji}</p>
            <p className={`mt-2 text-3xl font-black ${rating.color}`}>{rating.label}</p>
            <p className={`mt-1 text-4xl font-black tabular-nums ${
              row.domarindex > 0 ? "text-emerald-300" : row.domarindex < 0 ? "text-rose-400" : "text-slate-400"
            }`}>
              {row.domarindex > 0 ? `+${row.domarindex}` : row.domarindex}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">domarindex</p>
            <p className="mt-3 max-w-[140px] text-[10px] leading-relaxed text-slate-400 italic">
              &ldquo;{rating.description}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RefereeAnalysisDashboard() {
  const rows = buildRows();
  const refereeAggregates = buildRefereeAggregates(rows);
  const profiles = buildProfiles(rows, refereeAggregates);
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.domarindex)), 1);
  const maxRefAbs = Math.max(
    ...refereeAggregates.map((r) => Math.abs(r.avgIndex)),
    1
  );

  const totalHamFouls = rows.reduce((s, r) => s + r.match.hammarby.fouls, 0);
  const totalOppFouls = rows.reduce((s, r) => s + r.match.opponent.fouls, 0);
  const totalHamY = rows.reduce((s, r) => s + r.match.hammarby.yellowCards, 0);
  const totalOppY = rows.reduce((s, r) => s + r.match.opponent.yellowCards, 0);
  const totalHamR = rows.reduce((s, r) => s + r.match.hammarby.redCards, 0);
  const totalOppR = rows.reduce((s, r) => s + r.match.opponent.redCards, 0);
  const totalIndex = rows.reduce((s, r) => s + r.domarindex, 0);
  const avgEffS = Math.round(rows.reduce((s, r) => s + r.match.effectivePlayingTimeS, 0) / rows.length);
  const avgStoppage = (rows.reduce((s, r) => s + r.stoppageMin, 0) / rows.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-400">
            <Link href="/matchstatistik" className="hover:text-blue-300">
              Matchstatistik
            </Link>
            <span className="text-slate-600">/</span>
            <span>Domaranalys</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Domarstatistik 2026
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Regelfel (fouls), gula/röda kort, effektiv speltid och tilläggstid per match.{" "}
            <span className="font-medium text-emerald-300">Domarindex</span> =
            (Motst. fouls − Ham. fouls) + (Motst. kort − Ham. kort).
            Positivt = fördel Hammarby.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Källa: bolldata.se · omgång 1–17 · Allsvenskan 2026
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {/* Season summary */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Ham. regelfel</p>
            <p className="mt-1 text-3xl font-black text-emerald-300">{totalHamFouls}</p>
            <p className="mt-0.5 text-xs text-slate-500">Motst. {totalOppFouls}</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Ham. gula</p>
            <p className="mt-1 text-3xl font-black text-yellow-300">{totalHamY}</p>
            <p className="mt-0.5 text-xs text-slate-500">Motst. {totalOppY}</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Ham. röda</p>
            <p className="mt-1 text-3xl font-black text-red-400">{totalHamR}</p>
            <p className="mt-0.5 text-xs text-slate-500">Motst. {totalOppR}</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Tot. domarindex</p>
            <p className={`mt-1 text-3xl font-black ${totalIndex > 0 ? "text-emerald-300" : "text-rose-400"}`}>
              {totalIndex > 0 ? `+${totalIndex}` : totalIndex}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">12 matcher</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Snitt eff. speltid</p>
            <p className="mt-1 text-3xl font-black text-sky-300">{formatSeconds(avgEffS)}</p>
            <p className="mt-0.5 text-xs text-slate-500">min/match</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Snitt tillägg</p>
            <p className="mt-1 text-3xl font-black text-amber-300">+{avgStoppage}</p>
            <p className="mt-0.5 text-xs text-slate-500">min/match</p>
          </div>
        </section>

        {/* Profiles – "Kårens karaktärer" style */}
        <section>
          <h2 className="mb-4 text-base font-semibold text-white">Domarprofilerna</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <div
                key={p.label}
                className={`rounded-2xl border p-5 ${p.bg} ${p.border}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {p.label}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">{p.sublabel}</p>
                <p className="mt-2 text-xl font-bold text-slate-200 leading-tight">
                  {p.winner}
                </p>
                <p className={`mt-2 text-4xl font-black tabular-nums ${p.accent}`}>
                  {p.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{p.valueNote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Omgångens domare */}
        <OmgangensDomare rows={rows} />

        {/* Per-match bar chart */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h2 className="mb-4 text-base font-semibold text-white">Domarindex per match</h2>
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={row.match.key}
                className="grid items-center gap-x-3 gap-y-1 text-xs"
                style={{ gridTemplateColumns: "1.4rem 7rem 1fr auto" }}
              >
                <span className="text-right text-slate-500">{row.match.gameweek}</span>
                <a
                  href={row.match.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-slate-300 hover:text-white"
                  title={row.match.matchName}
                >
                  {row.match.matchName.split(",")[0]}
                </a>
                <IndexBar value={row.domarindex} max={maxAbs} />
                <span className="hidden text-right text-slate-500 sm:block">
                  {row.match.referee.split(" ").slice(-1)[0]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Grön stapel = nettofördel Hammarby. Röd = nackdel.
          </p>
        </section>

        {/* Detailed match table */}
        <section className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/60">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700/50 text-left text-slate-400">
                <th className="px-3 py-3 font-medium">Ø</th>
                <th className="px-3 py-3 font-medium">Match</th>
                <th className="px-3 py-3 font-medium">Domare</th>
                <th className="px-3 py-3 text-center font-medium">Eff. tid</th>
                <th className="px-3 py-3 text-center font-medium">Tillägg</th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>Regelfel</th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>Gula</th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>Röda</th>
                <th className="px-3 py-3 text-right font-medium">Index</th>
                <th className="px-3 py-3 text-right font-medium">Betyg</th>
              </tr>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2 text-center text-[10px]">min</th>
                <th className="px-3 pb-2 text-center text-[10px]">min</th>
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center">Mot</th>
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center">Mot</th>
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center">Mot</th>
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const idx = row.domarindex;
                return (
                  <tr
                    key={row.match.key}
                    className={`border-b border-slate-800/60 transition-colors hover:bg-slate-800/40 ${
                      i % 2 === 0 ? "bg-slate-900/20" : ""
                    }`}
                  >
                    <td className="px-3 py-2.5 text-slate-500">{row.match.gameweek}</td>
                    <td className="px-3 py-2.5">
                      <a
                        href={row.match.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white"
                      >
                        {row.match.matchName}
                      </a>
                      {row.match.hammarby.isHome ? (
                        <span className="ml-1.5 rounded px-1 py-0.5 text-[10px] bg-emerald-900/40 text-emerald-400">H</span>
                      ) : (
                        <span className="ml-1.5 rounded px-1 py-0.5 text-[10px] bg-slate-700/60 text-slate-400">B</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{row.match.referee}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-sky-300">
                      {formatSeconds(row.match.effectivePlayingTimeS)}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono text-amber-300">
                      +{row.stoppageMin}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono font-semibold text-emerald-300">
                      {row.match.hammarby.fouls}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                      {row.match.opponent.fouls}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono font-semibold text-emerald-300">
                        {row.match.hammarby.yellowCards}
                      </span>
                      {row.match.hammarby.yellowCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.hammarby.yellowCards }).map((_, j) => (
                            <CardPip key={j} color="yellow" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono text-slate-400">
                        {row.match.opponent.yellowCards}
                      </span>
                      {row.match.opponent.yellowCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.opponent.yellowCards }).map((_, j) => (
                            <CardPip key={j} color="yellow" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono font-semibold text-emerald-300">
                        {row.match.hammarby.redCards}
                      </span>
                      {row.match.hammarby.redCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.hammarby.redCards }).map((_, j) => (
                            <CardPip key={j} color="red" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono text-slate-400">
                        {row.match.opponent.redCards}
                      </span>
                      {row.match.opponent.redCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.opponent.redCards }).map((_, j) => (
                            <CardPip key={j} color="red" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span
                        className={`font-mono font-bold ${
                          idx > 0 ? "text-emerald-300" : idx < 0 ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        {idx > 0 ? `+${idx}` : idx}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {(() => {
                        const r = getDomarRating(idx);
                        return (
                          <span className={`text-xs font-bold ${r.color}`}>
                            {r.emoji} {r.label}
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-600/50 bg-slate-800/40 font-semibold">
                <td className="px-3 py-2.5 text-slate-400" colSpan={3}>Totalt / snitt</td>
                <td className="px-3 py-2.5 text-center font-mono text-sky-300">
                  {formatSeconds(avgEffS)}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-amber-300">
                  +{avgStoppage}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">{totalHamFouls}</td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">{totalOppFouls}</td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">{totalHamY}</td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">{totalOppY}</td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">{totalHamR}</td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">{totalOppR}</td>
                <td className={`px-3 py-2.5 text-right font-mono font-black ${totalIndex > 0 ? "text-emerald-300" : "text-rose-400"}`}>
                  {totalIndex > 0 ? `+${totalIndex}` : totalIndex}
                </td>
                <td className="px-3 py-2.5" />
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Per-referee aggregate chart */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h2 className="mb-1 text-base font-semibold text-white">
            Domarindex per domare (snitt)
          </h2>
          <p className="mb-4 text-xs text-slate-500">
            Sorterat från mest fördelaktig till mest ogynnsam för Hammarby.
          </p>
          <div className="space-y-3">
            {refereeAggregates.map((agg) => (
              <div key={agg.referee} className="space-y-1">
                <div
                  className="grid items-center gap-x-3 text-xs"
                  style={{ gridTemplateColumns: "9rem 1fr auto" }}
                >
                  <span className="truncate text-slate-200 font-medium">
                    {agg.referee}
                    {agg.matches.length > 1 && (
                      <span className="ml-1.5 text-slate-500">×{agg.matches.length}</span>
                    )}
                  </span>
                  <IndexBar value={parseFloat(agg.avgIndex.toFixed(1))} max={maxRefAbs} />
                  <span className="hidden text-right text-[10px] text-slate-500 sm:block whitespace-nowrap">
                    {formatSeconds(Math.round(agg.avgEffPlayingTimeS))} eff · +{agg.avgStoppageMin % 1 === 0 ? agg.avgStoppageMin : agg.avgStoppageMin.toFixed(1)} min tillägg
                  </span>
                </div>
                {agg.matches.length > 1 && (
                  <div className="ml-36 text-[10px] text-slate-600">
                    {agg.matches
                      .map((m) => `Ø${m.match.gameweek}: ${m.domarindex > 0 ? "+" : ""}${m.domarindex}`)
                      .join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4 text-xs text-slate-500">
          <p>
            <strong className="text-slate-400">Om regelfel:</strong>{" "}
            Domarindex bygger på Bolldatas <em>fouls</em> (totalt antal regelfel per lag), inte på
            set piece-frisparkar. Positiv foul-diff betyder att motståndaren dömdes för fler
            regelfel. Röda kort räknas ×2 i kortdelen av indexet. Effektiv speltid och tilläggstid
            hämtas från bolldata.se (effectivePlayingTimeS / totalTime).
          </p>
        </section>
      </main>
    </div>
  );
}
