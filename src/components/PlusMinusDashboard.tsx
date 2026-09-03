"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  HammarbyPlusMinusSeason,
  PlusMinusPlayerSeason,
  PlusMinusRole,
} from "@/lib/hammarbyPlusMinusData";

/** Hammarbys klubbgrönt – samma nyans som används i kommande-motstånd/storbild-grafiken. */
const HIF_GREEN = "#006633";
/** Ljus, neutral "vit"-sida i det grönvita manéret (mål emot / motståndarsidan). */
const HIF_WHITE = "#e2e8f0";

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
  | "minutesPerMatch"
  | "plusMinusPer90"
  | "plusMinusPer90VsAvg"
  | "playerName"
  | "matchesPlayed";

function formatSigned(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function formatSignedFixed(value: number, decimals = 2) {
  const absolute = Math.abs(value).toFixed(decimals);
  if (value > 0) return `+${absolute}`;
  if (value < 0) return `-${absolute}`;
  return Number(0).toFixed(decimals);
}

/** Diagonal grön/vit stripe – samma dekorativa divider som på kommande motstånd/storbild. */
function StripeDivider({ className = "my-2" }: { className?: string }) {
  return (
    <div
      className={`h-2.5 w-full rounded-full ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 12px, ${HIF_WHITE} 12px 24px)`,
        opacity: 0.85,
      }}
      aria-hidden
    />
  );
}

/** Färglegend som förklarar den grönvita GF/GA-stapeln, samma mönster som H2H-graferna. */
function RateLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-5 rounded-sm"
          style={{ background: HIF_GREEN }}
        />
        Gjorda på plan (GF/90)
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-5 rounded-sm"
          style={{ background: HIF_WHITE }}
        />
        Insläppta på plan (GA/90)
      </span>
    </div>
  );
}

function DiffBadge({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const tone =
    value > 0
      ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
      : value < 0
        ? "bg-rose-500/15 text-rose-300 ring-rose-500/30"
        : "bg-slate-500/15 text-slate-300 ring-slate-500/30";
  const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "•";
  return (
    <span
      className={`inline-flex min-w-[3.5rem] items-center justify-center gap-1 rounded-md px-2 py-1 text-sm font-bold ring-1 ring-inset ${tone}`}
    >
      <span className="text-[10px] leading-none">{arrow}</span>
      {decimals > 0 ? formatSignedFixed(value, decimals) : formatSigned(value)}
    </span>
  );
}

/**
 * Grönvit "center-out" stapel för GF/90 vs GA/90 – samma bolldata-manér som
 * jämförelsestaplarna på kommande motstånd (grön Hammarby-sida mot vit motsida).
 */
function RatePer90Bar({
  goalsForPer90,
  goalsAgainstPer90,
  maxForPer90,
  maxAgainstPer90,
}: {
  goalsForPer90: number;
  goalsAgainstPer90: number;
  maxForPer90: number;
  maxAgainstPer90: number;
}) {
  const forWidth = maxForPer90 > 0 ? (goalsForPer90 / maxForPer90) * 100 : 0;
  const againstWidth =
    maxAgainstPer90 > 0 ? (goalsAgainstPer90 / maxAgainstPer90) * 100 : 0;

  return (
    <div className="w-28">
      <div className="grid h-2 grid-cols-[1fr_2px_1fr] items-stretch">
        <div className="flex justify-end overflow-hidden rounded-l-full bg-white/5">
          <div
            className="h-2 rounded-l-full"
            style={{ width: `${forWidth}%`, background: HIF_GREEN }}
          />
        </div>
        <div className="bg-white/15" />
        <div className="flex justify-start overflow-hidden rounded-r-full bg-white/5">
          <div
            className="h-2 rounded-r-full"
            style={{ width: `${againstWidth}%`, background: HIF_WHITE }}
          />
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-slate-500">
        <span style={{ color: HIF_GREEN }}>{goalsForPer90.toFixed(2)}</span>
        <span className="text-slate-300">{goalsAgainstPer90.toFixed(2)}</span>
      </div>
    </div>
  );
}

function sortPlayers(
  players: PlusMinusPlayerSeason[],
  sortKey: SortKey,
  ascending: boolean
) {
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

/** Bakgrund som matchar sidans mörka yta så den stickiga kolumnen inte blir transparent. */
const STICKY_BG_DEFAULT = "bg-[#0f172a]";
const STICKY_BG_ACTIVE = "bg-[#0f253d]";
const STICKY_BG_HOVER = "group-hover:bg-[#182234]";

export function PlusMinusDashboard({ season }: { season: HammarbyPlusMinusSeason }) {
  const [roleFilter, setRoleFilter] = useState<"all" | PlusMinusRole>("all");
  const [minMinutes, setMinMinutes] = useState(450);
  const [sortKey, setSortKey] = useState<SortKey>("plusMinus");
  const [ascending, setAscending] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(
    season.players[0]?.playerId ?? null
  );

  const averages = season.averages;

  const rateScale = useMemo(
    () => ({
      maxForPer90: Math.max(...season.players.map((p) => p.goalsForPer90), 0.01),
      maxAgainstPer90: Math.max(
        ...season.players.map((p) => p.goalsAgainstPer90),
        0.01
      ),
    }),
    [season.players]
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
      rate: [...withMinutes].sort((a, b) => b.plusMinusPer90 - a.plusMinusPer90)[0] ?? null,
      vsAvg:
        [...withMinutes].sort(
          (a, b) => b.plusMinusPer90VsAvg - a.plusMinusPer90VsAvg
        )[0] ?? null,
    };
  }, [season.players]);

  function toggleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setAscending((value) => !value);
      return;
    }
    setSortKey(nextKey);
    setAscending(
      nextKey === "playerName" || nextKey === "goalsAgainstOnPitch"
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em]">
            <Link
              href="/spelarstatistik"
              className="transition-colors hover:opacity-80"
              style={{ color: HIF_GREEN }}
            >
              Spelarstatistik
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Plus/minus</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Plus/minus · Allsvenskan {season.season}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Vilka Hammarbyspelare var på plan när laget gjorde respektive släppte in mål.
            Tempojusterade snitt (per 90) och snittminuter gör jämförelser rättvisare mellan
            heltidsspelare och inhoppare.
          </p>

          <StripeDivider className="mb-5 mt-5" />

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Matcher</p>
              <p className="text-xl font-semibold text-white">{season.matchesPlayed}</p>
            </div>
            <div
              className="rounded-xl border px-4 py-3"
              style={{ borderColor: `${HIF_GREEN}55`, background: `${HIF_GREEN}22` }}
            >
              <p className="text-xs uppercase tracking-wide" style={{ color: `${HIF_GREEN}` }}>
                Gjorda
              </p>
              <p className="text-xl font-semibold" style={{ color: "#4ade80" }}>
                {season.goalsFor}
              </p>
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
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-violet-300/80">
                Snitt min/match
              </p>
              <p className="text-xl font-semibold text-violet-200">
                {averages.minutesPerMatch.toFixed(1)}
              </p>
            </div>
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-cyan-300/80">
                Trupp +/−/90
              </p>
              <p className="text-xl font-semibold text-cyan-200">
                {formatSignedFixed(averages.plusMinusPer90)}
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
              hint: leaders.best
                ? `${leaders.best.minutesPerMatch.toFixed(1)} min/match`
                : "Minst 450 min",
            },
            {
              title: "Högst +/- per 90",
              player: leaders.rate,
              value: leaders.rate
                ? formatSignedFixed(leaders.rate.plusMinusPer90)
                : "–",
              hint: "Tempojusterat mot speltid",
            },
            {
              title: "Bäst vs truppsnitt",
              player: leaders.vsAvg,
              value: leaders.vsAvg
                ? formatSignedFixed(leaders.vsAvg.plusMinusPer90VsAvg)
                : "–",
              hint: `Referens ${formatSignedFixed(averages.plusMinusPer90)}/90`,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/60"
            >
              <div
                className="h-1.5 w-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${HIF_GREEN} 0 8px, ${HIF_WHITE} 8px 16px)`,
                  opacity: 0.7,
                }}
                aria-hidden
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">{card.title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {card.player?.playerName ?? "–"}
                </p>
                <p className="mt-1 text-lg" style={{ color: HIF_GREEN, filter: "brightness(1.6)" }}>
                  {card.value}
                </p>
                <p className="mt-2 text-xs text-slate-500">{card.hint}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Spelartabell</h2>
              <p className="mt-1 text-sm text-slate-400">
                Standardfilter 450+ min för rättvisare tempojämförelse. Δ/90 är skillnad mot
                truppens minutviktade snitt ({formatSignedFixed(averages.plusMinusPer90)}).
                Spelarkolumnen är fastlåst när du scrollar sidled.
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

          <div className="mt-4">
            <RateLegend />
          </div>

          <div className="mt-3 overflow-x-auto rounded-lg border border-slate-800/70">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th
                    className={`sticky left-0 z-20 border-r border-slate-700/70 px-2 py-3 font-medium ${STICKY_BG_DEFAULT}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort("playerName")}
                      className="hover:text-white"
                    >
                      Spelare
                      {sortKey === "playerName" ? (ascending ? " ↑" : " ↓") : ""}
                    </button>
                  </th>
                  {(
                    [
                      ["matchesPlayed", "M"],
                      ["minutes", "Min"],
                      ["minutesPerMatch", "Min/M"],
                      ["goalsForOnPitch", "GF"],
                      ["goalsAgainstOnPitch", "GA"],
                      ["plusMinus", "+/−"],
                      ["plusMinusPer90", "+/−/90"],
                      ["plusMinusPer90VsAvg", "Δ/90"],
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
                      className={`group cursor-pointer border-b border-slate-800/80 transition-colors ${
                        active ? "bg-sky-500/10" : "hover:bg-slate-800/60"
                      }`}
                    >
                      <td
                        className={`sticky left-0 z-10 border-r border-slate-800/70 px-2 py-3 ${
                          active
                            ? STICKY_BG_ACTIVE
                            : `${STICKY_BG_DEFAULT} ${STICKY_BG_HOVER}`
                        }`}
                      >
                        <div className="font-medium text-white">{player.playerName}</div>
                        <div className="text-xs text-slate-400">
                          {ROLE_LABELS[player.roleName] ?? player.roleName}
                          {player.starts > 0 ? ` · ${player.starts} start` : ""}
                        </div>
                      </td>
                      <td className="px-2 py-3 text-slate-300">{player.matchesPlayed}</td>
                      <td className="px-2 py-3 text-slate-300">{player.minutes}</td>
                      <td className="px-2 py-3 text-violet-200">
                        {player.minutesPerMatch.toFixed(1)}
                      </td>
                      <td className="px-2 py-3 text-emerald-300">{player.goalsForOnPitch}</td>
                      <td className="px-2 py-3 text-rose-300">{player.goalsAgainstOnPitch}</td>
                      <td className="px-2 py-3">
                        <DiffBadge value={player.plusMinus} />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex flex-col gap-1.5">
                          <DiffBadge value={player.plusMinusPer90} decimals={2} />
                          <RatePer90Bar
                            goalsForPer90={player.goalsForPer90}
                            goalsAgainstPer90={player.goalsAgainstPer90}
                            maxForPer90={rateScale.maxForPer90}
                            maxAgainstPer90={rateScale.maxAgainstPer90}
                          />
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <DiffBadge value={player.plusMinusPer90VsAvg} decimals={2} />
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
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  <span>
                    {ROLE_LABELS[selectedPlayer.roleName] ?? selectedPlayer.roleName}
                  </span>
                  <span>·</span>
                  <span>{selectedPlayer.minutes} min</span>
                  <span>·</span>
                  <span>{selectedPlayer.minutesPerMatch.toFixed(1)} min/match</span>
                  <span>·</span>
                  <DiffBadge value={selectedPlayer.plusMinus} />
                  <span>·</span>
                  <span>
                    {formatSignedFixed(selectedPlayer.plusMinusPer90)}/90 (
                    {formatSignedFixed(selectedPlayer.plusMinusPer90VsAvg)} vs snitt)
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-800/70">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th
                      className={`sticky left-0 z-20 border-r border-slate-700/70 px-2 py-3 font-medium ${STICKY_BG_DEFAULT}`}
                    >
                      Match
                    </th>
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
                      className="group border-b border-slate-800/80 text-slate-300"
                    >
                      <td
                        className={`sticky left-0 z-10 border-r border-slate-800/70 px-2 py-3 ${STICKY_BG_DEFAULT} ${STICKY_BG_HOVER}`}
                      >
                        <div className="font-medium text-white">
                          {log.isHome ? "H" : "B"} · {log.opponent}
                        </div>
                        <div className="text-xs text-slate-500">Omgång {log.gameweek}</div>
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
              `matches/goals`). Senast synkad{" "}
              {new Date(season.generatedAt).toLocaleString("sv-SE")}.
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
              Min/M = minuter / matcher. +/−/90 = (plusMinus × 90) / minuter. Den grönvita
              stapeln under +/−/90 visar GF/90 (grönt) mot GA/90 (vitt), skalad mot truppens
              högsta värden.
            </li>
            <li>
              Truppsnitt är minutviktat: summa över alla spelarminuter, så heltidsspelare väger
              tyngre än korta inhopp. Δ/90 = spelarens +/−/90 minus truppsnittet (
              {formatSignedFixed(averages.plusMinusPer90)}, snitt{" "}
              {averages.minutesPerMatch.toFixed(1)} min/match).
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
