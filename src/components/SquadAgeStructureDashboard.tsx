"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  squadAgeBandDefinitions,
  type HammarbySquadAgeStructureSeason,
  type HammarbySquadPlayer,
  type SquadAgeBandKey,
  type SquadPlayerRole,
} from "@/lib/hammarbySquadAgeStructureData";

type BandSummary = {
  key: SquadAgeBandKey;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  players: HammarbySquadPlayer[];
  playerCount: number;
  minutes: number;
  playerShare: number;
  minuteShare: number;
};

type RoleFilter = "Alla" | SquadPlayerRole;
type SortKey = "minutes" | "age" | "name" | "matches" | "starts";

const roleLabels: Record<SquadPlayerRole, string> = {
  Goalkeeper: "Målvakt",
  Defender: "Försvarare",
  Midfielder: "Mittfältare",
  Forward: "Anfallare",
};

function formatMinutes(minutes: number) {
  return `${minutes.toLocaleString("sv-SE")} min`;
}

function formatPercentage(value: number) {
  return `${value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;
}

function formatAge(value: number) {
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getBandMeta(key: SquadAgeBandKey) {
  return squadAgeBandDefinitions.find((band) => band.key === key) ?? squadAgeBandDefinitions[0];
}

function buildBandSummaries(players: HammarbySquadPlayer[]): BandSummary[] {
  const totalPlayers = players.length;
  const totalMinutes = players.reduce((sum, player) => sum + player.minutes, 0);

  return squadAgeBandDefinitions.map((band) => {
    const bandPlayers = players.filter((player) => player.ageBand === band.key);
    const minutes = bandPlayers.reduce((sum, player) => sum + player.minutes, 0);

    return {
      ...band,
      players: bandPlayers,
      playerCount: bandPlayers.length,
      minutes,
      playerShare: totalPlayers ? (bandPlayers.length / totalPlayers) * 100 : 0,
      minuteShare: totalMinutes ? (minutes / totalMinutes) * 100 : 0,
    };
  });
}

function weightedAverageAge(players: HammarbySquadPlayer[]) {
  const totalMinutes = players.reduce((sum, player) => sum + player.minutes, 0);
  if (!totalMinutes) return 0;
  return (
    players.reduce((sum, player) => sum + player.age * player.minutes, 0) /
    totalMinutes
  );
}

function averageAge(players: HammarbySquadPlayer[]) {
  if (!players.length) return 0;
  return players.reduce((sum, player) => sum + player.age, 0) / players.length;
}

function sortPlayers(players: HammarbySquadPlayer[], sortKey: SortKey) {
  return [...players].sort((a, b) => {
    if (sortKey === "name") return a.name.localeCompare(b.name, "sv");
    return b[sortKey] - a[sortKey];
  });
}

export function SquadAgeStructureDashboard({
  season,
}: {
  season: HammarbySquadAgeStructureSeason;
}) {
  const [selectedBand, setSelectedBand] = useState<SquadAgeBandKey | "all">("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Alla");
  const [sortKey, setSortKey] = useState<SortKey>("minutes");

  const bandSummaries = useMemo(
    () => buildBandSummaries(season.players),
    [season.players]
  );
  const totalMinutes = season.players.reduce((sum, player) => sum + player.minutes, 0);
  const activePlayers = season.players.filter((player) => player.minutes > 0);
  const squadAverageAge = averageAge(season.players);
  const minutesWeightedAge = weightedAverageAge(season.players);
  const youngestPlayer = [...season.players].sort((a, b) => a.age - b.age)[0];
  const oldestPlayer = [...season.players].sort((a, b) => b.age - a.age)[0];
  const dominantMinuteBand = [...bandSummaries].sort(
    (a, b) => b.minuteShare - a.minuteShare
  )[0];
  const largestGapBand = [...bandSummaries].sort(
    (a, b) => Math.abs(b.minuteShare - b.playerShare) - Math.abs(a.minuteShare - a.playerShare)
  )[0];
  const roles: RoleFilter[] = ["Alla", "Goalkeeper", "Defender", "Midfielder", "Forward"];

  const visiblePlayers = useMemo(() => {
    const filtered = season.players.filter((player) => {
      const matchesBand = selectedBand === "all" || player.ageBand === selectedBand;
      const matchesRole = roleFilter === "Alla" || player.roleName === roleFilter;
      return matchesBand && matchesRole;
    });

    return sortPlayers(filtered, sortKey);
  }, [roleFilter, season.players, selectedBand, sortKey]);

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="overflow-hidden border-b border-emerald-400/10 bg-[radial-gradient(circle_at_top_left,#14532d_0,#0f172a_36%,#07111f_74%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <Link href="/" className="transition-colors hover:text-white">
              Start
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-200">Truppsammansättning</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Hammarby IF · Bolldata Trupper {season.label}
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Truppsammansättning
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Egen vy för Hammarbys trupp: vilka spelare som finns i
                truppen, när de är födda och hur mycket speltid varje
                åldersband faktiskt får.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur">
              <p className="text-sm text-slate-400">Läsning {season.label}</p>
              <p className="mt-1 text-3xl font-black text-white">
                {dominantMinuteBand.label}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Störst minutansvar ligger i {dominantMinuteBand.label}:{" "}
                {formatPercentage(dominantMinuteBand.minuteShare)} av minuterna
                från {dominantMinuteBand.playerCount} spelare.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:py-10">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Truppstorlek",
              value: `${season.players.length} spelare`,
              caption: `${activePlayers.length} har minuter`,
            },
            {
              label: "Snittålder trupp",
              value: formatAge(squadAverageAge),
              caption: "oviktat på alla spelare",
            },
            {
              label: "Minutviktad ålder",
              value: formatAge(minutesWeightedAge),
              caption: `${formatMinutes(totalMinutes)} totalt`,
            },
            {
              label: "Yngst / äldst",
              value: `${youngestPlayer.age} / ${oldestPlayer.age}`,
              caption: `${youngestPlayer.name} · ${oldestPlayer.name}`,
            },
          ].map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20"
            >
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{card.value}</p>
              <p className="mt-2 text-sm text-emerald-200">{card.caption}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Truppandel vs minutandel
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Samma åldersband som speltidsvyn, men här jämförs antal
                  spelare med faktiskt minutansvar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBand("all")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedBand === "all"
                    ? "bg-emerald-400 text-slate-950"
                    : "border border-slate-700 bg-slate-950/40 text-slate-300 hover:border-emerald-300/70"
                }`}
              >
                Visa alla
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {bandSummaries.map((band) => {
                const isExpanded = selectedBand === band.key;
                const bandPlayers = sortPlayers(band.players, "minutes");

                return (
                  <article
                    key={band.key}
                    className={`rounded-2xl border p-4 transition-colors ${
                      isExpanded
                        ? "border-emerald-300 bg-emerald-400/10"
                        : "border-slate-800 bg-slate-950/35"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedBand(isExpanded ? "all" : band.key)}
                      className="w-full text-left"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: band.color }}
                          />
                          <div>
                            <p className="font-semibold text-white">{band.label}</p>
                            <p className="text-xs text-slate-500">{band.description}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          {band.playerCount} spelare · {formatMinutes(band.minutes)}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div>
                          <div className="mb-1 flex justify-between text-xs text-slate-400">
                            <span>Truppandel</span>
                            <span>{formatPercentage(band.playerShare)}</span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${band.playerShare}%`,
                                backgroundColor: band.color,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex justify-between text-xs text-slate-400">
                            <span>Minutandel</span>
                            <span>{formatPercentage(band.minuteShare)}</span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${band.minuteShare}%`,
                                backgroundColor: band.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-xs font-semibold text-emerald-200">
                        {isExpanded ? "Dölj spelare" : "Visa spelare i åldersbandet"} →
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 border-t border-emerald-300/20 pt-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                          Spelare i {band.label}
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {bandPlayers.map((player) => (
                            <article
                              key={`${band.key}-${player.playerId}`}
                              className="rounded-2xl border border-slate-800 bg-slate-950/55 p-3"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="font-semibold text-white">
                                    {player.name}
                                  </h3>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {roleLabels[player.roleName]} · född{" "}
                                    {formatDate(player.birthDate)}
                                  </p>
                                </div>
                                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-black text-emerald-200">
                                  {player.minutes.toLocaleString("sv-SE")} min
                                </span>
                              </div>
                              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                <div className="rounded-xl bg-slate-900/70 p-2">
                                  <dt className="text-slate-500">Ålder</dt>
                                  <dd className="mt-1 font-semibold text-white">
                                    {player.age}
                                  </dd>
                                </div>
                                <div className="rounded-xl bg-slate-900/70 p-2">
                                  <dt className="text-slate-500">SM</dt>
                                  <dd className="mt-1 font-semibold text-white">
                                    {player.matches}
                                  </dd>
                                </div>
                                <div className="rounded-xl bg-slate-900/70 p-2">
                                  <dt className="text-slate-500">Starter</dt>
                                  <dd className="mt-1 font-semibold text-white">
                                    {player.starts}
                                  </dd>
                                </div>
                              </dl>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-950/30 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              UX-läsning
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              Truppen är yngre än minuterna
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80">
              Oviktad snittålder är {formatAge(squadAverageAge)}, men
              minutviktad ålder är {formatAge(minutesWeightedAge)}. Det betyder
              att äldre spelare bär en större del av minuterna än deras
              truppandel antyder.
            </p>
            <div className="mt-6 rounded-2xl bg-slate-950/40 p-4">
              <p className="text-xs text-emerald-200/70">
                Störst skillnad mellan trupp och minuter
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {largestGapBand.label}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {formatPercentage(largestGapBand.playerShare)} av truppen, men{" "}
                {formatPercentage(largestGapBand.minuteShare)} av minuterna.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <p className="text-xs text-emerald-200/70">U23-spelare</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {
                    season.players.filter((player) =>
                      ["u18", "u19u21", "u22u23"].includes(player.ageBand)
                    ).length
                  }
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <p className="text-xs text-emerald-200/70">30+ spelare</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {bandSummaries.find((band) => band.key === "twilight")?.playerCount ?? 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Spelare, födelseår och minuter</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filtrera på åldersband och position för att se vilka spelare som
                bygger strukturen.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setRoleFilter(role)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                    roleFilter === role
                      ? "bg-white text-slate-950"
                      : "border border-slate-700 bg-slate-950/40 text-slate-300 hover:border-white/50"
                  }`}
                >
                  {role === "Alla" ? "Alla" : roleLabels[role]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { key: "minutes", label: "Minuter" },
              { key: "age", label: "Ålder" },
              { key: "starts", label: "Starter" },
              { key: "matches", label: "Matcher" },
              { key: "name", label: "Namn" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSortKey(option.key as SortKey)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  sortKey === option.key
                    ? "bg-emerald-400 text-slate-950"
                    : "border border-slate-700 bg-slate-950/40 text-slate-300 hover:border-emerald-300/70"
                }`}
              >
                Sortera: {option.label}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3 md:hidden">
            {visiblePlayers.map((player) => {
              const band = getBandMeta(player.ageBand);
              return (
                <article
                  key={`${player.playerId}-mobile`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{player.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {player.firstName} {player.lastName}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-black text-emerald-200">
                      {player.minutes.toLocaleString("sv-SE")} min
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: band.color }}
                      />
                      {band.label}
                    </span>
                    <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                      {roleLabels[player.roleName]}
                    </span>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-900/70 p-3">
                      <dt className="text-xs text-slate-500">Född</dt>
                      <dd className="mt-1 font-semibold text-white">
                        {formatDate(player.birthDate)}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-slate-900/70 p-3">
                      <dt className="text-xs text-slate-500">Ålder</dt>
                      <dd className="mt-1 font-semibold text-white">{player.age}</dd>
                    </div>
                    <div className="rounded-xl bg-slate-900/70 p-3">
                      <dt className="text-xs text-slate-500">SM / starter</dt>
                      <dd className="mt-1 font-semibold text-white">
                        {player.matches} / {player.starts}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-slate-900/70 p-3">
                      <dt className="text-xs text-slate-500">Inbytta</dt>
                      <dd className="mt-1 font-semibold text-white">{player.subbedIn}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-4">Spelare</th>
                  <th className="px-4 py-4">Född</th>
                  <th className="px-4 py-4">Ålder</th>
                  <th className="px-4 py-4">Åldersband</th>
                  <th className="px-4 py-4">Position</th>
                  <th className="px-4 py-4 text-right">MIN</th>
                  <th className="px-4 py-4 text-right">SM</th>
                  <th className="px-4 py-4 text-right">Starter</th>
                  <th className="px-4 py-4 text-right">Inbytta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {visiblePlayers.map((player) => {
                  const band = getBandMeta(player.ageBand);
                  return (
                    <tr key={player.playerId}>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">{player.name}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {player.firstName} {player.lastName}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        {formatDate(player.birthDate)}
                      </td>
                      <td className="px-4 py-4 font-semibold text-white">
                        {player.age}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: band.color }}
                          />
                          {band.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        {roleLabels[player.roleName]}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-white">
                        {player.minutes.toLocaleString("sv-SE")}
                      </td>
                      <td className="px-4 py-4 text-right text-slate-300">
                        {player.matches}
                      </td>
                      <td className="px-4 py-4 text-right text-slate-300">
                        {player.starts}
                      </td>
                      <td className="px-4 py-4 text-right text-slate-300">
                        {player.subbedIn}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-xl font-bold text-white">Datagrund</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Truppen kommer från Bolldatas truppvy och `team-advanced`-API.
                Ålder räknas som säsongsår minus födelseår, samma metod som
                matchar Bolldatas U23-tabeller. Speltid är `minutesOnField`.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <a
                href={season.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 transition-colors hover:border-emerald-300/70"
              >
                <p className="text-sm font-semibold text-white">Bolldata Trupper</p>
                <p className="mt-1 text-xs text-slate-400">
                  Publik truppvy för Allsvenskan {season.label}
                </p>
              </a>
              <a
                href={season.sourceApiUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 transition-colors hover:border-emerald-300/70"
              >
                <p className="text-sm font-semibold text-white">Bolldata API</p>
                <p className="mt-1 text-xs text-slate-400">
                  Team advanced · spelare, födelsedatum och minuter
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
