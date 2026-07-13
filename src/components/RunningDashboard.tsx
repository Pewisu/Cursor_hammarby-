"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type RunningMatchStat } from "@/lib/hammarbyRunningData";
import {
  hammarbyTeamDistanceHistory,
  type TeamDistanceHistoryEntry,
} from "@/lib/hammarbyTeamDistanceHistoryData";

const ALLSVENSKAN_RECORD_DISTANCE_M = 14059;
const ELITE_SINGLE_MATCH_THRESHOLD_M = 13800;

type CombinedMatchEntry = {
  matchId: number;
  season: number;
  round: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  hammarbyWasHome: boolean;
  hammarbyTeamDistanceMeters: number;
  hasPlayerDetail: boolean;
};

function buildCombinedHistory(
  detailMatches: RunningMatchStat[],
  history: TeamDistanceHistoryEntry[]
): CombinedMatchEntry[] {
  const detailIds = new Set(detailMatches.map((m) => m.matchId));

  const fromDetail: CombinedMatchEntry[] = detailMatches.map((m) => ({
    matchId: m.matchId,
    season: 2026,
    round: m.round,
    date: m.date,
    homeTeam: m.homeTeam,
    awayTeam: m.awayTeam,
    hammarbyWasHome: m.hammarbyWasHome,
    hammarbyTeamDistanceMeters: m.hammarbyTeamDistanceMeters,
    hasPlayerDetail: true,
  }));

  const fromHistory: CombinedMatchEntry[] = history
    .filter((h) => !detailIds.has(h.matchId))
    .map((h) => ({
      ...h,
      hasPlayerDetail: false,
    }));

  return [...fromDetail, ...fromHistory].sort(
    (a, b) => b.hammarbyTeamDistanceMeters - a.hammarbyTeamDistanceMeters
  );
}

type PlayerAggregate = {
  name: string;
  shirtNumber: number;
  position: string;
  totalDistanceMeters: number;
  totalMinutes: number;
  peakMaxSpeedKmh: number;
  sumMaxSpeedKmh: number;
  averageMaxSpeedKmh: number;
  matches: number;
  metersPerMinute: number;
};

type SortDirection = "asc" | "desc";
type MatchSortKey =
  | "name"
  | "distanceMeters"
  | "minutesPlayed"
  | "metersPerMinute"
  | "maxSpeedKmh";
type TotalSortKey =
  | "name"
  | "totalDistanceMeters"
  | "totalMinutes"
  | "metersPerMinute"
  | "peakMaxSpeedKmh"
  | "averageMaxSpeedKmh"
  | "matches";

type TrendSeriesPoint = {
  matchId: number;
  round: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  matchIndex: number;
  maxSpeedKmh: number;
  metersPerMinute: number;
};

function formatMeters(meters: number) {
  return `${meters.toLocaleString("sv-SE")} m`;
}

function formatKilometers(meters: number) {
  return `${(meters / 1000).toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} km`;
}

function aggregatePlayers(matches: RunningMatchStat[]): PlayerAggregate[] {
  const byPlayer = new Map<string, PlayerAggregate>();

  for (const match of matches) {
    for (const player of match.players) {
      const existing = byPlayer.get(player.name);

      if (existing) {
        existing.totalDistanceMeters += player.distanceMeters;
        existing.totalMinutes += player.minutesPlayed;
        existing.peakMaxSpeedKmh = Math.max(
          existing.peakMaxSpeedKmh,
          player.maxSpeedKmh
        );
        existing.sumMaxSpeedKmh += player.maxSpeedKmh;
        existing.matches += 1;
      } else {
        byPlayer.set(player.name, {
          name: player.name,
          shirtNumber: player.shirtNumber,
          position: player.position,
          totalDistanceMeters: player.distanceMeters,
          totalMinutes: player.minutesPlayed,
          peakMaxSpeedKmh: player.maxSpeedKmh,
          sumMaxSpeedKmh: player.maxSpeedKmh,
          averageMaxSpeedKmh: player.maxSpeedKmh,
          matches: 1,
          metersPerMinute: 0,
        });
      }
    }
  }

  const aggregated = Array.from(byPlayer.values());
  for (const player of aggregated) {
    player.metersPerMinute = player.totalDistanceMeters / player.totalMinutes;
    player.averageMaxSpeedKmh = player.sumMaxSpeedKmh / player.matches;
  }

  return aggregated.sort((a, b) => b.totalDistanceMeters - a.totalDistanceMeters);
}

function buildTrendPath(
  points: { x: number; y: number }[],
  yFloor: number
): string {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x - 0.001} ${yFloor} L ${p.x} ${p.y}`;
  }

  return points
    .map((p, index) => `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
}

function buildPlayerTrendSeries(
  matches: RunningMatchStat[],
  playerName: string
): TrendSeriesPoint[] {
  return matches
    .map((match, matchIndex) => {
      const playerRow = match.players.find((player) => player.name === playerName);
      if (!playerRow) {
        return null;
      }

      return {
        matchId: match.matchId,
        round: match.round,
        date: match.date,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        matchIndex,
        maxSpeedKmh: playerRow.maxSpeedKmh,
        metersPerMinute: playerRow.metersPerMinute,
      };
    })
    .filter((row): row is TrendSeriesPoint => row !== null);
}

type SortHeaderProps = {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
  align?: "left" | "right";
};

function SortHeader({
  label,
  active,
  direction,
  onClick,
  align = "left",
}: SortHeaderProps) {
  const arrow = active ? (direction === "desc" ? "↓" : "↑") : "↕";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center gap-1.5 ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <span>{label}</span>
      <span className={active ? "text-green-300" : "text-slate-500"}>{arrow}</span>
    </button>
  );
}

export function RunningDashboard({ matches }: { matches: RunningMatchStat[] }) {
  const playerTotals = useMemo(() => aggregatePlayers(matches), [matches]);
  const allPlayerRows = useMemo(() => matches.flatMap((match) => match.players), [matches]);
  const playerNames = useMemo(() => playerTotals.map((player) => player.name), [playerTotals]);

  const [matchSort, setMatchSort] = useState<{
    key: MatchSortKey;
    direction: SortDirection;
  }>({
    key: "distanceMeters",
    direction: "desc",
  });

  const [totalSort, setTotalSort] = useState<{
    key: TotalSortKey;
    direction: SortDirection;
  }>({
    key: "totalDistanceMeters",
    direction: "desc",
  });

  const [trendPrimaryPlayerName, setTrendPrimaryPlayerName] = useState(
    playerTotals[0]?.name ?? ""
  );
  const [trendSecondaryPlayerName, setTrendSecondaryPlayerName] = useState(
    playerTotals[1]?.name ?? playerTotals[0]?.name ?? ""
  );
  const [expandedMatchIds, setExpandedMatchIds] = useState<
    Record<number, boolean>
  >(() => {
    const latestMatch = matches[matches.length - 1];
    return latestMatch ? { [latestMatch.matchId]: true } : {};
  });

  const overallDistance = matches.reduce(
    (sum, match) => sum + match.hammarbyTeamDistanceMeters,
    0
  );
  const overallMinutes = matches.reduce(
    (sum, match) => sum + match.hammarbyTeamMinutes,
    0
  );
  const overallMetersPerMinute = overallDistance / overallMinutes;
  const overallPeakSpeed = Math.max(
    ...matches.map((match) => match.hammarbyTopSpeedKmh)
  );
  const overallAverageMaxSpeed =
    allPlayerRows.reduce((sum, row) => sum + row.maxSpeedKmh, 0) /
    allPlayerRows.length;

  const fastestPlayers = [...playerTotals]
    .sort((a, b) => b.peakMaxSpeedKmh - a.peakMaxSpeedKmh)
    .slice(0, 5);

  const highestTempoPlayers = [...playerTotals]
    .filter((player) => player.totalMinutes >= 20)
    .sort((a, b) => b.metersPerMinute - a.metersPerMinute)
    .slice(0, 5);

  const maxMatchDistance = Math.max(
    ...matches.map((match) => match.hammarbyTeamDistanceMeters)
  );

  const rankInHistory = (matchId: number) =>
    combinedHistory.findIndex((e) => e.matchId === matchId) + 1;

  const sortedMatches = useMemo(() => {
    return matches.map((match) => {
      const sortedPlayers = [...match.players].sort((a, b) => {
        if (matchSort.key === "name") {
          const compare = a.name.localeCompare(b.name, "sv");
          return matchSort.direction === "desc" ? -compare : compare;
        }

        const compare = a[matchSort.key] - b[matchSort.key];
        return matchSort.direction === "desc" ? -compare : compare;
      });

      const averageMaxSpeed =
        match.players.reduce((sum, player) => sum + player.maxSpeedKmh, 0) /
        match.players.length;

      return {
        ...match,
        averageMaxSpeed,
        sortedPlayers,
      };
    });
  }, [matchSort, matches]);

  const sortedTotals = useMemo(() => {
    return [...playerTotals].sort((a, b) => {
      if (totalSort.key === "name") {
        const compare = a.name.localeCompare(b.name, "sv");
        return totalSort.direction === "desc" ? -compare : compare;
      }

      const compare = a[totalSort.key] - b[totalSort.key];
      return totalSort.direction === "desc" ? -compare : compare;
    });
  }, [playerTotals, totalSort]);

  const combinedHistory = useMemo(
    () => buildCombinedHistory(matches, hammarbyTeamDistanceHistory),
    [matches]
  );

  const primaryTrendSeries = useMemo(
    () => buildPlayerTrendSeries(matches, trendPrimaryPlayerName),
    [matches, trendPrimaryPlayerName]
  );
  const secondaryTrendSeries = useMemo(
    () => buildPlayerTrendSeries(matches, trendSecondaryPlayerName),
    [matches, trendSecondaryPlayerName]
  );

  const chartHeight = 232;
  const chartWidth = 640;
  const chartPadding = { top: 18, right: 16, bottom: 44, left: 40 };
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  const minSpeed = Math.floor(Math.min(...allPlayerRows.map((p) => p.maxSpeedKmh)) - 1);
  const maxSpeed = Math.ceil(Math.max(...allPlayerRows.map((p) => p.maxSpeedKmh)) + 1);
  const speedRange = Math.max(maxSpeed - minSpeed, 1);
  const minMetersPerMinute = Math.floor(
    Math.min(...allPlayerRows.map((p) => p.metersPerMinute)) - 2
  );
  const maxMetersPerMinute = Math.ceil(
    Math.max(...allPlayerRows.map((p) => p.metersPerMinute)) + 2
  );
  const metersPerMinuteRange = Math.max(maxMetersPerMinute - minMetersPerMinute, 1);

  const xForMatch = (index: number) => {
    if (matches.length <= 1) {
      return chartPadding.left + plotWidth / 2;
    }
    const innerPadding = Math.min(44, plotWidth * 0.12);
    const usableWidth = Math.max(plotWidth - innerPadding * 2, 1);
    return (
      chartPadding.left +
      innerPadding +
      (index / (matches.length - 1)) * usableWidth
    );
  };

  const yForSpeed = (value: number) =>
    chartPadding.top + ((maxSpeed - value) / speedRange) * plotHeight;
  const yForMetersPerMinute = (value: number) =>
    chartPadding.top +
    ((maxMetersPerMinute - value) / metersPerMinuteRange) * plotHeight;

  const primaryTrendPoints = primaryTrendSeries.map((row) => ({
    ...row,
    x: xForMatch(row.matchIndex),
    y: yForSpeed(row.maxSpeedKmh),
  }));
  const secondaryTrendPoints = secondaryTrendSeries.map((row) => ({
    ...row,
    x: xForMatch(row.matchIndex),
    y: yForSpeed(row.maxSpeedKmh),
  }));
  const primaryMetersPerMinuteTrendPoints = primaryTrendSeries.map((row) => ({
    ...row,
    x: xForMatch(row.matchIndex),
    y: yForMetersPerMinute(row.metersPerMinute),
  }));
  const secondaryMetersPerMinuteTrendPoints = secondaryTrendSeries.map((row) => ({
    ...row,
    x: xForMatch(row.matchIndex),
    y: yForMetersPerMinute(row.metersPerMinute),
  }));

  const primaryTrendPath = buildTrendPath(
    primaryTrendPoints,
    chartPadding.top + plotHeight
  );
  const secondaryTrendPath = buildTrendPath(
    secondaryTrendPoints,
    chartPadding.top + plotHeight
  );
  const primaryMetersPerMinuteTrendPath = buildTrendPath(
    primaryMetersPerMinuteTrendPoints,
    chartPadding.top + plotHeight
  );
  const secondaryMetersPerMinuteTrendPath = buildTrendPath(
    secondaryMetersPerMinuteTrendPoints,
    chartPadding.top + plotHeight
  );

  const speedTicks = Array.from({ length: speedRange + 1 }, (_, i) => minSpeed + i)
    .filter((value) => (value - minSpeed) % 2 === 0);
  const metersPerMinuteTickStep = Math.max(
    Math.ceil((metersPerMinuteRange / 6) / 5) * 5,
    1
  );
  const metersPerMinuteTicks = Array.from(
    {
      length:
        Math.floor(
          (maxMetersPerMinute - minMetersPerMinute) / metersPerMinuteTickStep
        ) + 1,
    },
    (_, index) => minMetersPerMinute + index * metersPerMinuteTickStep
  );

  const primaryTrendDelta =
    primaryTrendSeries.length >= 2
      ? primaryTrendSeries[primaryTrendSeries.length - 1].maxSpeedKmh -
        primaryTrendSeries[0].maxSpeedKmh
      : 0;
  const secondaryTrendDelta =
    secondaryTrendSeries.length >= 2
      ? secondaryTrendSeries[secondaryTrendSeries.length - 1].maxSpeedKmh -
        secondaryTrendSeries[0].maxSpeedKmh
      : 0;
  const primaryTrendAverage =
    primaryTrendSeries.reduce((sum, row) => sum + row.maxSpeedKmh, 0) /
    Math.max(primaryTrendSeries.length, 1);
  const secondaryTrendAverage =
    secondaryTrendSeries.reduce((sum, row) => sum + row.maxSpeedKmh, 0) /
    Math.max(secondaryTrendSeries.length, 1);
  const primaryMetersPerMinuteTrendDelta =
    primaryTrendSeries.length >= 2
      ? primaryTrendSeries[primaryTrendSeries.length - 1].metersPerMinute -
        primaryTrendSeries[0].metersPerMinute
      : 0;
  const secondaryMetersPerMinuteTrendDelta =
    secondaryTrendSeries.length >= 2
      ? secondaryTrendSeries[secondaryTrendSeries.length - 1].metersPerMinute -
        secondaryTrendSeries[0].metersPerMinute
      : 0;
  const primaryMetersPerMinuteTrendAverage =
    primaryTrendSeries.reduce((sum, row) => sum + row.metersPerMinute, 0) /
    Math.max(primaryTrendSeries.length, 1);
  const secondaryMetersPerMinuteTrendAverage =
    secondaryTrendSeries.reduce((sum, row) => sum + row.metersPerMinute, 0) /
    Math.max(secondaryTrendSeries.length, 1);

  const handleMatchSort = (key: MatchSortKey) => {
    setMatchSort((current) => ({
      key,
      direction:
        current.key === key ? (current.direction === "desc" ? "asc" : "desc") : "desc",
    }));
  };

  const handleTotalSort = (key: TotalSortKey) => {
    setTotalSort((current) => ({
      key,
      direction:
        current.key === key ? (current.direction === "desc" ? "asc" : "desc") : "desc",
    }));
  };

  const toggleMatchExpanded = (matchId: number) => {
    setExpandedMatchIds((current) => ({
      ...current,
      [matchId]: !current[matchId],
    }));
  };

  const pickAlternativePlayer = (excludeName: string) =>
    playerNames.find((name) => name !== excludeName) ?? excludeName;

  const handlePrimaryTrendPlayerChange = (nextName: string) => {
    setTrendPrimaryPlayerName(nextName);
    if (nextName === trendSecondaryPlayerName) {
      setTrendSecondaryPlayerName(pickAlternativePlayer(nextName));
    }
  };

  const handleSecondaryTrendPlayerChange = (nextName: string) => {
    setTrendSecondaryPlayerName(nextName);
    if (nextName === trendPrimaryPlayerName) {
      setTrendPrimaryPlayerName(pickAlternativePlayer(nextName));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-400">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">
              Löpdata per spelare ({matches.length} matcher)
            </h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: allsvenskan.se & bolldata.se</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-slate-100 hover:border-slate-400 hover:text-white"
            >
              🏠 Huvudsida
            </Link>
            <Link
              href="/matchstatistik"
              className="inline-flex text-slate-300 hover:text-white"
            >
              ← Till matchstatistik
            </Link>
            <Link
              href="/spelarstatistik"
              className="inline-flex text-blue-300 hover:text-blue-200"
            >
              Till spelarstatistik →
            </Link>
            <Link
              href="/spelarstatistik/omgangsstandout"
              className="inline-flex text-sky-300 hover:text-sky-200"
            >
              Till standout i omgång →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
        {matches.some((m) =>
          m.players.some((p) => p.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M)
        ) && (
          <section className="rounded-2xl border border-amber-500/40 bg-amber-500/8 p-5">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/20 text-xl">
                🥈
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">
                  Allsvenskan-historik
                </p>
                {matches
                  .flatMap((m) =>
                    m.players
                      .filter((p) => p.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M)
                      .map((p) => ({ player: p, match: m }))
                  )
                  .sort((a, b) => b.player.distanceMeters - a.player.distanceMeters)
                  .map(({ player, match }) => (
                    <p key={`${match.matchId}-${player.name}`} className="mt-1 text-sm font-semibold text-amber-100">
                      {player.name} – {formatMeters(player.distanceMeters)} mot {match.homeTeam === "Hammarby" ? match.awayTeam : match.homeTeam} ({match.round})
                    </p>
                  ))}
                <p className="mt-1.5 text-xs text-amber-200/70">
                  Näst högsta löpdistansen uppmätt i Allsvenskan sedan GPS-mätningarna startade 2024.
                  Allsvenskan-rekordet är {ALLSVENSKAN_RECORD_DISTANCE_M.toLocaleString("sv-SE")} m (Besfort Zeneli, IF Elfsborg, säsongen 2025).
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
          <div className="border-b border-slate-700/50 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Matchranking – lagets löpsträcka
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Alla Hammarby-matcher med tillgänglig löpdata, sorterade efter lagets löpsträcka.
              Säsong 2026 (detaljdata) · Säsong 2025 (lagdistans). Data saknas för 2024.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-right">#</th>
                  <th className="px-4 py-3">Match</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Säsong</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Löpsträcka</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {combinedHistory.slice(0, 15).map((entry, index) => {
                  const isCurrent2026 = entry.hasPlayerDetail;
                  const isTop3 = index < 3;
                  const rankLabel =
                    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`;
                  const distancePct =
                    (entry.hammarbyTeamDistanceMeters /
                      combinedHistory[0].hammarbyTeamDistanceMeters) *
                    100;
                  return (
                    <tr
                      key={entry.matchId}
                      className={`border-t text-slate-200 ${
                        isCurrent2026
                          ? isTop3
                            ? "border-green-500/30 bg-green-500/8"
                            : "border-green-700/30 bg-green-900/10"
                          : "border-slate-700/50"
                      }`}
                    >
                      <td className="px-4 py-2.5 text-right text-base font-bold">
                        <span className={isCurrent2026 && isTop3 ? "text-green-300" : "text-slate-400"}>
                          {rankLabel}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`font-medium ${isCurrent2026 ? "text-white" : "text-slate-300"}`}>
                            {entry.homeTeam} – {entry.awayTeam}
                          </span>
                          {isCurrent2026 && (
                            <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-green-300">
                              2026
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">{entry.round}</div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-400">{entry.season}</td>
                      <td className="px-4 py-2.5 text-right">
                        <div className={`font-semibold ${isCurrent2026 && isTop3 ? "text-green-200" : "text-white"}`}>
                          {formatMeters(entry.hammarbyTeamDistanceMeters)}
                        </div>
                        <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-700/60 ml-auto">
                          <div
                            className={`h-full rounded-full ${isCurrent2026 ? "bg-green-500" : "bg-slate-500"}`}
                            style={{ width: `${distancePct}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                        {isCurrent2026 ? "Detaljer ↑" : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {combinedHistory.length > 15 && (
            <div className="border-t border-slate-700/50 px-6 py-3 text-xs text-slate-500">
              Visar topp 15 av {combinedHistory.length} matcher.
            </div>
          )}
        </section>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Total löpsträcka</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatKilometers(overallDistance)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Snitt löpmeter/minut</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {overallMetersPerMinute.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Högsta maxhastighet</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {overallPeakSpeed.toFixed(2)} km/h
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Snitt maxhastighet</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {overallAverageMaxSpeed.toFixed(2)} km/h
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Spelare i datan</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {playerTotals.length}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Per match</h2>
          <p className="mt-1 text-sm text-slate-400">
            Totala löpmeter, maxhastighet och löpmeter/minut för Hammarby.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {sortedMatches.map((match) => {
              const metersPerMinute =
                match.hammarbyTeamDistanceMeters / match.hammarbyTeamMinutes;
              const distanceWidth =
                (match.hammarbyTeamDistanceMeters / maxMatchDistance) * 100;

              return (
                <article
                  key={match.matchId}
                  className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-slate-400">
                        {match.round} • {match.date}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-white">
                        {match.homeTeam} - {match.awayTeam}
                      </h3>
                    </div>
                    {(() => {
                      const rank = rankInHistory(match.matchId);
                      const rankLabel = rank === 1 ? "🥇 #1" : rank === 2 ? "🥈 #2" : rank === 3 ? "🥉 #3" : `#${rank}`;
                      const rankColor =
                        rank === 1
                          ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-300"
                          : rank === 2
                          ? "border-slate-400/50 bg-slate-400/15 text-slate-300"
                          : rank === 3
                          ? "border-orange-500/50 bg-orange-500/15 text-orange-300"
                          : rank <= 10
                          ? "border-green-500/40 bg-green-500/10 text-green-300"
                          : "border-slate-600/40 bg-slate-600/10 text-slate-400";
                      return (
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-bold ${rankColor}`}>
                          {rankLabel}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-slate-300">Löpsträcka</span>
                        <span className="font-medium text-white">
                          {formatMeters(match.hammarbyTeamDistanceMeters)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-700/70">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${distanceWidth}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-lg bg-slate-800/90 p-3">
                        <p className="text-xs text-slate-400">Peak max</p>
                        <p className="mt-1 font-semibold text-white">
                          {match.hammarbyTopSpeedKmh.toFixed(2)} km/h
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-800/90 p-3">
                        <p className="text-xs text-slate-400">Snitt max</p>
                        <p className="mt-1 font-semibold text-white">
                          {match.averageMaxSpeed.toFixed(2)} km/h
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-800/90 p-3">
                        <p className="text-xs text-slate-400">Löpmeter/min</p>
                        <p className="mt-1 font-semibold text-white">
                          {metersPerMinute.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <a
                      href={match.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-xs text-blue-400 hover:text-blue-300"
                    >
                      Öppna matchkälla
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Per match och spelare
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Matcherna är kollapsade som standard. Öppna en match och klicka på
            kolumnrubriker för att sortera högst/lägst.
          </p>

          <div className="mt-5 space-y-6">
            {sortedMatches.map((match) => {
              const isExpanded = Boolean(expandedMatchIds[match.matchId]);
              const topRunner = match.sortedPlayers[0];

              return (
                <article
                  key={`players-${match.matchId}`}
                  className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60"
                >
                  <div className="border-b border-slate-700/50 px-4 py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          {match.round} • {match.date}
                        </p>
                        <h3 className="text-sm font-semibold text-white">
                          {match.homeTeam} - {match.awayTeam}
                        </h3>
                        {topRunner && (
                          <p className="mt-1 text-xs text-slate-400">
                            Topp löpmeter just nu: #{topRunner.shirtNumber}{" "}
                            {topRunner.name} ({formatMeters(topRunner.distanceMeters)})
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleMatchExpanded(match.matchId)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-slate-600 px-3 py-1 text-xs text-slate-200 hover:border-slate-400 hover:text-white"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Dölj spelare" : "Visa spelare"}
                        <span>{isExpanded ? "▲" : "▼"}</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-slate-950/40 text-left text-xs uppercase tracking-wide text-slate-400">
                          <tr>
                        <th className="sticky left-0 z-20 min-w-[190px] bg-slate-950/95 px-4 py-3 shadow-[8px_0_12px_-10px_rgba(0,0,0,0.9)]">
                              <SortHeader
                                label="Spelare"
                                active={matchSort.key === "name"}
                                direction={matchSort.direction}
                                onClick={() => handleMatchSort("name")}
                              />
                            </th>
                        <th className="px-4 py-3 text-right whitespace-nowrap">
                              <SortHeader
                                label="Löpmeter"
                                align="right"
                                active={matchSort.key === "distanceMeters"}
                                direction={matchSort.direction}
                                onClick={() => handleMatchSort("distanceMeters")}
                              />
                            </th>
                        <th className="px-4 py-3 text-right whitespace-nowrap">
                              <SortHeader
                                label="Minuter"
                                align="right"
                                active={matchSort.key === "minutesPlayed"}
                                direction={matchSort.direction}
                                onClick={() => handleMatchSort("minutesPlayed")}
                              />
                            </th>
                        <th className="px-4 py-3 text-right whitespace-nowrap">
                              <SortHeader
                                label="Löpmeter/min"
                                align="right"
                                active={matchSort.key === "metersPerMinute"}
                                direction={matchSort.direction}
                                onClick={() => handleMatchSort("metersPerMinute")}
                              />
                            </th>
                        <th className="px-4 py-3 text-right whitespace-nowrap">
                              <SortHeader
                                label="Maxhastighet"
                                align="right"
                                active={matchSort.key === "maxSpeedKmh"}
                                direction={matchSort.direction}
                                onClick={() => handleMatchSort("maxSpeedKmh")}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {match.sortedPlayers.map((player) => {
                            const isElite = player.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M;
                            return (
                              <tr
                                key={`${match.matchId}-${player.name}`}
                                className={`border-t text-slate-200 ${
                                  isElite
                                    ? "border-amber-500/30 bg-amber-500/8"
                                    : "border-slate-700/50"
                                }`}
                              >
                                <td className={`sticky left-0 z-10 min-w-[190px] px-4 py-2.5 shadow-[8px_0_12px_-10px_rgba(0,0,0,0.9)] ${
                                  isElite ? "bg-amber-950/60" : "bg-slate-900/95"
                                }`}>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className={`font-medium ${isElite ? "text-amber-100" : "text-white"}`}>
                                      #{player.shirtNumber} {player.name}
                                    </span>
                                    {isElite && (
                                      <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-400/50 bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-bold leading-none text-amber-300">
                                        🥈 Allsvenskan-historik
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className={`px-4 py-2.5 text-right font-semibold whitespace-nowrap ${
                                  isElite ? "text-amber-300" : "text-white"
                                }`}>
                                  {formatMeters(player.distanceMeters)}
                                  {isElite && (
                                    <span className="ml-1 text-[10px] text-amber-500">
                                      ({Math.round((player.distanceMeters / ALLSVENSKAN_RECORD_DISTANCE_M) * 100)}% av rek.)
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                  {player.minutesPlayed.toFixed(2)}
                                </td>
                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                  {player.metersPerMinute.toFixed(2)}
                                </td>
                                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                  {player.maxSpeedKmh.toFixed(2)} km/h
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">
              Snabbaste spelare (peak)
            </h2>
            <ul className="mt-4 space-y-2">
              {fastestPlayers.map((player) => (
                <li
                  key={player.name}
                  className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="text-slate-200">
                    #{player.shirtNumber} {player.name}
                  </span>
                  <span className="font-semibold text-white">
                    {player.peakMaxSpeedKmh.toFixed(2)} km/h
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">
              Högst tempo (m/min)
            </h2>
            <ul className="mt-4 space-y-2">
              {highestTempoPlayers.map((player) => (
                <li
                  key={player.name}
                  className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="text-slate-200">
                    #{player.shirtNumber} {player.name}
                  </span>
                  <span className="font-semibold text-white">
                    {player.metersPerMinute.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
          <div className="border-b border-slate-700/50 p-6">
            <h2 className="text-lg font-semibold text-white">
              Totalt per spelare (alla matcherna)
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Klicka på kolumnrubriker för sortering.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="sticky left-0 z-20 min-w-[190px] bg-slate-900/95 px-4 py-3 shadow-[8px_0_12px_-10px_rgba(0,0,0,0.9)]">
                    <SortHeader
                      label="Spelare"
                      active={totalSort.key === "name"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("name")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Löpmeter"
                      align="right"
                      active={totalSort.key === "totalDistanceMeters"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("totalDistanceMeters")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Minuter"
                      align="right"
                      active={totalSort.key === "totalMinutes"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("totalMinutes")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Löpmeter/min"
                      align="right"
                      active={totalSort.key === "metersPerMinute"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("metersPerMinute")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Peak max"
                      align="right"
                      active={totalSort.key === "peakMaxSpeedKmh"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("peakMaxSpeedKmh")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Snitt max"
                      align="right"
                      active={totalSort.key === "averageMaxSpeedKmh"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("averageMaxSpeedKmh")}
                    />
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    <SortHeader
                      label="Matcher"
                      align="right"
                      active={totalSort.key === "matches"}
                      direction={totalSort.direction}
                      onClick={() => handleTotalSort("matches")}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTotals.map((player) => {
                  const hasEliteSingleMatch = matches
                    .flatMap((m) => m.players)
                    .some(
                      (p) =>
                        p.name === player.name &&
                        p.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M
                    );
                  return (
                    <tr
                      key={player.name}
                      className={`border-t text-slate-200 ${
                        hasEliteSingleMatch
                          ? "border-amber-500/30 bg-amber-500/8"
                          : "border-slate-700/50"
                      }`}
                    >
                      <td className={`sticky left-0 z-10 min-w-[190px] px-4 py-3 shadow-[8px_0_12px_-10px_rgba(0,0,0,0.9)] ${
                        hasEliteSingleMatch ? "bg-amber-950/60" : "bg-slate-800/95"
                      }`}>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`font-medium ${hasEliteSingleMatch ? "text-amber-100" : "text-white"}`}>
                            #{player.shirtNumber} {player.name}
                          </span>
                          {hasEliteSingleMatch && (
                            <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-400/50 bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-bold leading-none text-amber-300">
                              🥈
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{player.position}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-white whitespace-nowrap">
                        {formatMeters(player.totalDistanceMeters)}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {player.totalMinutes.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {player.metersPerMinute.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {player.peakMaxSpeedKmh.toFixed(2)} km/h
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {player.averageMaxSpeedKmh.toFixed(2)} km/h
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">{player.matches}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Trendkurva: maxhastighet per spelare
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Välj två spelare för att jämföra maxhastighet över matcherna.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Spelare A
              <select
                value={trendPrimaryPlayerName}
                onChange={(event) =>
                  handlePrimaryTrendPlayerChange(event.target.value)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-green-400"
              >
                {playerTotals.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.shirtNumber} {player.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Spelare B
              <select
                value={trendSecondaryPlayerName}
                onChange={(event) =>
                  handleSecondaryTrendPlayerChange(event.target.value)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {playerTotals.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.shirtNumber} {player.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-2 text-xs text-slate-300 lg:grid-cols-2 lg:text-sm">
            <div className="rounded-lg border border-green-500/30 bg-green-950/20 px-3 py-2">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="font-medium text-green-200">
                  {trendPrimaryPlayerName || "Spelare A"}
                </span>
              </div>
              <div>
                Snitt max:{" "}
                <span className="font-semibold text-white">
                  {primaryTrendAverage.toFixed(2)}{" "}
                  km/h
                </span>
              </div>
              <div>
                Trend:{" "}
                <span
                  className={`font-semibold ${
                    primaryTrendDelta >= 0 ? "text-green-300" : "text-rose-300"
                  }`}
                >
                  {primaryTrendDelta >= 0 ? "+" : ""}
                  {primaryTrendDelta.toFixed(2)} km/h
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 px-3 py-2">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <span className="font-medium text-blue-200">
                  {trendSecondaryPlayerName || "Spelare B"}
                </span>
              </div>
              <div>
                Snitt max:{" "}
                <span className="font-semibold text-white">
                  {secondaryTrendAverage.toFixed(2)} km/h
                </span>
              </div>
              <div>
                Trend:{" "}
                <span
                  className={`font-semibold ${
                    secondaryTrendDelta >= 0 ? "text-green-300" : "text-rose-300"
                  }`}
                >
                  {secondaryTrendDelta >= 0 ? "+" : ""}
                  {secondaryTrendDelta.toFixed(2)} km/h
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto lg:overflow-visible">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full min-w-[320px] lg:min-w-0"
            >
              {speedTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={chartPadding.left}
                    x2={chartPadding.left + plotWidth}
                    y1={yForSpeed(tick)}
                    y2={yForSpeed(tick)}
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x={chartPadding.left - 8}
                    y={yForSpeed(tick) + 4}
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {matches.map((match, index) => (
                <g key={match.matchId}>
                  <line
                    x1={xForMatch(index)}
                    x2={xForMatch(index)}
                    y1={chartPadding.top}
                    y2={chartPadding.top + plotHeight}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={xForMatch(index)}
                    y={chartHeight - 22}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {match.round}
                  </text>
                  <text
                    x={xForMatch(index)}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                  >
                    {match.date}
                  </text>
                </g>
              ))}

              {primaryTrendPath && (
                <path
                  d={primaryTrendPath}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {secondaryTrendPath && (
                <path
                  d={secondaryTrendPath}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {primaryTrendPoints.map((point) => (
                <g key={point.matchId}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#22c55e" />
                  <text
                    x={point.x}
                    y={point.y - 10}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {point.maxSpeedKmh.toFixed(2)}
                  </text>
                </g>
              ))}

              {secondaryTrendPoints.map((point) => (
                <g key={`secondary-${point.matchId}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#60a5fa" />
                  <text
                    x={point.x}
                    y={point.y + 16}
                    textAnchor="middle"
                    fill="#bfdbfe"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {point.maxSpeedKmh.toFixed(2)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Trendkurva: löpmeter per minut per spelare
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Välj två spelare för att jämföra tempo över matcherna.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Spelare A
              <select
                value={trendPrimaryPlayerName}
                onChange={(event) =>
                  handlePrimaryTrendPlayerChange(event.target.value)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-green-400"
              >
                {playerTotals.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.shirtNumber} {player.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Spelare B
              <select
                value={trendSecondaryPlayerName}
                onChange={(event) =>
                  handleSecondaryTrendPlayerChange(event.target.value)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {playerTotals.map((player) => (
                  <option key={player.name} value={player.name}>
                    #{player.shirtNumber} {player.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-2 text-xs text-slate-300 lg:grid-cols-2 lg:text-sm">
            <div className="rounded-lg border border-green-500/30 bg-green-950/20 px-3 py-2">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="font-medium text-green-200">
                  {trendPrimaryPlayerName || "Spelare A"}
                </span>
              </div>
              <div>
                Snitt löpmeter/min:{" "}
                <span className="font-semibold text-white">
                  {primaryMetersPerMinuteTrendAverage.toFixed(2)}
                </span>
              </div>
              <div>
                Trend:{" "}
                <span
                  className={`font-semibold ${
                    primaryMetersPerMinuteTrendDelta >= 0
                      ? "text-green-300"
                      : "text-rose-300"
                  }`}
                >
                  {primaryMetersPerMinuteTrendDelta >= 0 ? "+" : ""}
                  {primaryMetersPerMinuteTrendDelta.toFixed(2)} m/min
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 px-3 py-2">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <span className="font-medium text-blue-200">
                  {trendSecondaryPlayerName || "Spelare B"}
                </span>
              </div>
              <div>
                Snitt löpmeter/min:{" "}
                <span className="font-semibold text-white">
                  {secondaryMetersPerMinuteTrendAverage.toFixed(2)}
                </span>
              </div>
              <div>
                Trend:{" "}
                <span
                  className={`font-semibold ${
                    secondaryMetersPerMinuteTrendDelta >= 0
                      ? "text-green-300"
                      : "text-rose-300"
                  }`}
                >
                  {secondaryMetersPerMinuteTrendDelta >= 0 ? "+" : ""}
                  {secondaryMetersPerMinuteTrendDelta.toFixed(2)} m/min
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto lg:overflow-visible">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full min-w-[320px] lg:min-w-0"
            >
              {metersPerMinuteTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={chartPadding.left}
                    x2={chartPadding.left + plotWidth}
                    y1={yForMetersPerMinute(tick)}
                    y2={yForMetersPerMinute(tick)}
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x={chartPadding.left - 8}
                    y={yForMetersPerMinute(tick) + 4}
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {matches.map((match, index) => (
                <g key={`mpm-${match.matchId}`}>
                  <line
                    x1={xForMatch(index)}
                    x2={xForMatch(index)}
                    y1={chartPadding.top}
                    y2={chartPadding.top + plotHeight}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={xForMatch(index)}
                    y={chartHeight - 22}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {match.round}
                  </text>
                  <text
                    x={xForMatch(index)}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                  >
                    {match.date}
                  </text>
                </g>
              ))}

              {primaryMetersPerMinuteTrendPath && (
                <path
                  d={primaryMetersPerMinuteTrendPath}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {secondaryMetersPerMinuteTrendPath && (
                <path
                  d={secondaryMetersPerMinuteTrendPath}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {primaryMetersPerMinuteTrendPoints.map((point) => (
                <g key={`mpm-primary-${point.matchId}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#22c55e" />
                  <text
                    x={point.x}
                    y={point.y - 10}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {point.metersPerMinute.toFixed(1)}
                  </text>
                </g>
              ))}

              {secondaryMetersPerMinuteTrendPoints.map((point) => (
                <g key={`mpm-secondary-${point.matchId}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#60a5fa" />
                  <text
                    x={point.x}
                    y={point.y + 16}
                    textAnchor="middle"
                    fill="#bfdbfe"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {point.metersPerMinute.toFixed(1)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            <strong className="text-slate-300">Metod:</strong> Löpmeter och
            maxhastighet är hämtade från matchlänkarna via samma datakälla.
            Spelade minuter är beräknade från startelva + byteshändelser med
            matchtid (inklusive stopptid), vilket möjliggör beräkning av
            löpmeter per spelad minut.
          </p>
        </footer>
      </main>
    </div>
  );
}
