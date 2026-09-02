"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  HammarbyPlusMinusSeason,
  PlusMinusPlayerSeason,
  PlusMinusRole,
} from "@/lib/hammarbyPlusMinusData";

const ROLE_LABELS: Record<PlusMinusRole | string, string> = {
  Goalkeeper: "Målvakt",
  Defender: "Försvarare",
  Midfielder: "Mittfältare",
  Forward: "Anfallare",
  Unknown: "Okänd",
};

const ROLE_FILTERS: Array<{ key: "all" | PlusMinusRole; label: string }> = [
  { key: "all", label: "Alla" },
  { key: "Goalkeeper", label: "Målvakt" },
  { key: "Defender", label: "Försvarare" },
  { key: "Midfielder", label: "Mittfältare" },
  { key: "Forward", label: "Anfallare" },
];

type SortKey =
  | "plusMinus"
  | "goalsForOnPitch"
  | "goalsAgainstOnPitch"
  | "minutes"
  | "plusMinusPer90"
  | "playerName"
  | "matchesPlayed";

function formatSigned(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function DiffBadge({ value }: { value: number }) {
  const tone =
    value > 0
      ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
      : value < 0
        ? "bg-rose-500/15 text-rose-300 ring-rose-500/30"
        : "bg-slate-500/15 text-slate-300 ring-slate-500/30";
  return (
    <span
      className={`inline-flex min-w-[3.25rem] justify-center rounded-md px-2 py-0.5 text-sm font-semibold ring-1 ring-inset ${tone}`}
    >
      {formatSigned(value)}
    </span>
  );
}

function sortPlayers(players: PlusMinusPlayerSeason[], sortKey: SortKey, ascending: boolean) {
  const sorted = [...players].sort((a, b) => {
    const left = a[sortKey];
    const right = b[sortKey];
    if (typeof left === "string" && typeof right === "string") {
      return left.localeCompare(right, "sv");
    }
    return Number(left) - Number(right);
  });
  return ascending ? sorted : sorted.reverse();
}

export function PlusMinusDashboard({ season }: { season: HammarbyPlusMinusSeason }) {
  const [roleFilter, setRoleFilter] = useState<"all" | PlusMinusRole>("all");
  const [minMinutes, setMinMinutes] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("plusMinus");
  const [ascending, setAscending] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(
    season.players[0]?.playerId ?? null
  );

  const filteredPlayers = useMemo(() => {
    const base = season.players.filter((player) => {
      if (roleFilter !== "all" && player.roleName !== roleFilter) return false;
      if (player.minutes < minMinutes) return false;
      return true;
    });
    return sortPlayers(base, sortKey, ascending);
  }, [season.players, roleFilter, minMinutes, sortKey, ascending]);

  const selectedPlayer =
    filteredPlayers.find((player) => player.playerId === selectedPlayerId) ??
    filteredPlayers[0] ??
    null;

  const leaders = useMemo(() => {
    const withMinutes = season.players.filter((player) => player.minutes >= 450);
    return {
      best: [...withMinutes].sort((a, b) => b.plusMinus - a.plusMinus)[0] ?? null,
      worst: [...withMinutes].sort((a, b) => a.plusMinus - b.plusMinus)[0] ?? null,
      rate: [...withMinutes].sort((a, b) => b.plusMinusPer90 - a.plusMinusPer90)[0] ?? null,
    };
  }, [season.players]);

  function toggleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setAscending((value) => !value);
      return;
    }
    setSortKey(nextKey);
    setAscending(nextKey === "playerName" || nextKey === "goalsAgainstOnPitch");
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-sky-400">
            <Link href="/spelarstatistik" className="hover:text-sky-300">
              Spelarstatistik
            </Link>
            <span className="text-slate-600">/</span>
            <span>Plus/minus</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Plus/minus · Allsvenskan {season.season}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Vilka Hammarbyspelare var på plan när laget gjorde respektive släppte in mål.
            Beräknat från Bolldata: startelva/byten (`minuteIn`/`minuteOut`) matchas mot
            målhändelser minut för minut.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Matcher</p>
              <p className="text-xl font-semibold text-white">{season.matchesPlayed}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-emerald-300/80">Gjorda</p>
              <p className="text-xl font-semibold text-emerald-300">{season.goalsFor}</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-rose-300/80">Insläppta</p>
              <p className="text-xl font-semibold text-rose-300">{season.goalsAgainst}</p>
            </div>
            <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-sky-300/80">Målskillnad</p>
              <p className="text-xl font-semibold text-sky-300">
                {formatSigned(season.goalDiff)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Bäst +/-",
              player: leaders.best,
              value: leaders.best ? formatSigned(leaders.best.plusMinus) : "–",
              hint: "Minst 450 min",
            },
            {
              title: "Sämst +/-",
              player: leaders.worst,
              value: leaders.worst ? formatSigned(leaders.worst.plusMinus) : "–",
              hint: "Minst 450 min",
            },
            {
              title: "Högst +/- per 90",
              player: leaders.rate,
              value: leaders.rate ? formatSigned(leaders.rate.plusMinusPer90) : "–",
              hint: "Tempojusterat",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">{card.title}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {card.player?.playerName ?? "–"}
              </p>
              <p className="mt-1 text-lg text-sky-300">{card.value}</p>
              <p className="mt-2 text-xs text-slate-500">{card.hint}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Spelartabell</h2>
              <p className="mt-1 text-sm text-slate-400">
                Klicka en rad för matchlogg. Sortera via kolumnrubrikerna.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {ROLE_FILTERS.map((filter) => {
                const active = roleFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setRoleFilter(filter.key)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/40"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
              <label className="ml-1 flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
                Min.
                <select
                  value={minMinutes}
                  onChange={(event) => setMinMinutes(Number(event.target.value))}
                  className="rounded bg-slate-900 px-2 py-0.5 text-white outline-none"
                >
                  <option value={0}>0+</option>
                  <option value={90}>90+</option>
                  <option value={450}>450+</option>
                  <option value={900}>900+</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  {(
                    [
                      ["playerName", "Spelare"],
                      ["matchesPlayed", "M"],
                      ["minutes", "Min"],
                      ["goalsForOnPitch", "GF"],
                      ["goalsAgainstOnPitch", "GA"],
                      ["plusMinus", "+/−"],
                      ["plusMinusPer90", "+/−/90"],
                    ] as Array<[SortKey, string]>
                  ).map(([key, label]) => (
                    <th key={key} className="px-2 py-3 font-medium">
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                        className="hover:text-white"
                      >
                        {label}
                        {sortKey === key ? (ascending ? " ↑" : " ↓") : ""}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player) => {
                  const active = selectedPlayer?.playerId === player.playerId;
                  return (
                    <tr
                      key={player.playerId}
                      onClick={() => setSelectedPlayerId(player.playerId)}
                      className={`cursor-pointer border-b border-slate-800/80 transition-colors ${
                        active ? "bg-sky-500/10" : "hover:bg-slate-800/60"
                      }`}
                    >
                      <td className="px-2 py-3">
                        <div className="font-medium text-white">{player.playerName}</div>
                        <div className="text-xs text-slate-400">
                          {ROLE_LABELS[player.roleName] ?? player.roleName}
                          {player.starts > 0 ? ` · ${player.starts} start` : ""}
                        </div>
                      </td>
                      <td className="px-2 py-3 text-slate-300">{player.matchesPlayed}</td>
                      <td className="px-2 py-3 text-slate-300">{player.minutes}</td>
                      <td className="px-2 py-3 text-emerald-300">{player.goalsForOnPitch}</td>
                      <td className="px-2 py-3 text-rose-300">{player.goalsAgainstOnPitch}</td>
                      <td className="px-2 py-3">
                        <DiffBadge value={player.plusMinus} />
                      </td>
                      <td className="px-2 py-3 text-slate-300">
                        {formatSigned(player.plusMinusPer90)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {selectedPlayer ? (
          <section className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 md:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Matchlogg · {selectedPlayer.playerName}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {ROLE_LABELS[selectedPlayer.roleName] ?? selectedPlayer.roleName} ·{" "}
                  {selectedPlayer.minutes} min ·{" "}
                  <DiffBadge value={selectedPlayer.plusMinus} />
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-2 py-3 font-medium">Omg</th>
                    <th className="px-2 py-3 font-medium">Motståndare</th>
                    <th className="px-2 py-3 font-medium">Min</th>
                    <th className="px-2 py-3 font-medium">På plan</th>
                    <th className="px-2 py-3 font-medium">GF</th>
                    <th className="px-2 py-3 font-medium">GA</th>
                    <th className="px-2 py-3 font-medium">+/−</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlayer.matchLogs.map((log) => (
                    <tr
                      key={log.matchId}
                      className="border-b border-slate-800/80 text-slate-300"
                    >
                      <td className="px-2 py-3">{log.gameweek}</td>
                      <td className="px-2 py-3 text-white">
                        {log.isHome ? "H" : "B"} · {log.opponent}
                      </td>
                      <td className="px-2 py-3">{log.minutes}</td>
                      <td className="px-2 py-3">
                        {log.minuteIn}–
                        {log.minuteOut === null ? "FT" : log.minuteOut}
                        {log.started ? "" : " (in)"}
                      </td>
                      <td className="px-2 py-3 text-emerald-300">{log.goalsForOnPitch}</td>
                      <td className="px-2 py-3 text-rose-300">{log.goalsAgainstOnPitch}</td>
                      <td className="px-2 py-3">
                        <DiffBadge value={log.plusMinus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-slate-700/60 bg-slate-950/40 p-5 text-sm text-slate-400">
          <h2 className="font-semibold text-slate-200">Metod</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Källa: Bolldata Allsvenskan {season.season} (`matches`, `matches/player/stats`,
              `matches/goals`). Senast synkad {new Date(season.generatedAt).toLocaleString("sv-SE")}.
            </li>
            <li>
              En spelare räknas som på plan om målets minut ligger mellan `minuteIn` och
              `minuteOut` (inkl.). `minuteOut` 999999 tolkas som full tid.
            </li>
            <li>
              Plus när Hammarby gör mål, minus när motståndaren gör mål. Självmål följer
              Bolldatas team-fält (laget som får målet på tavlan).
            </li>
            <li>
              +/−/90 = (plusMinus × 90) / minuter. Säsongens lagresultat: {season.goalsFor}–
              {season.goalsAgainst}.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
