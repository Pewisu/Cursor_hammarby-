"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  type PlayerTrendMatch,
  type PlayerTrendMatchPlayer,
  type PlayerTrendMetrics,
} from "@/lib/hammarbyPlayerTrendData";

type TrendMetricKey = keyof PlayerTrendMetrics;

type TrendMetricOption = {
  key: TrendMetricKey;
  label: string;
  shortLabel: string;
  description: string;
  unit: "" | "%" | "st" | "xG";
  decimals: number;
};

type PlayerSummary = {
  playerId: number;
  playerName: string;
  roleName: string;
  totalMinutes: number;
  matchesPlayed: number;
};

type SeriesPoint = {
  matchIndex: number;
  matchId: number;
  matchLabel: string;
  minutes: number;
  value: number;
};

type PlayerSeries = {
  player: PlayerSummary;
  color: string;
  points: SeriesPoint[];
};

const MAX_SELECTED_PLAYERS = 5;

const ROLE_LABELS: Record<string, string> = {
  Defender: "Försvarare",
  Midfielder: "Mittfältare",
  Forward: "Anfallare",
  Goalkeeper: "Målvakt",
  Unknown: "Okänd",
};

const METRIC_OPTIONS: TrendMetricOption[] = [
  {
    key: "passAccuracy",
    label: "Passningsprocent",
    shortLabel: "Pass%",
    description: "Visar hur trygg spelaren är i uppbyggnadsfasen.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "passesToFinalThird",
    label: "Passningar till sista tredjedelen",
    shortLabel: "PST",
    description: "Hur mycket spelaren bidrar till att flytta spelet framåt.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "finalThirdPassAccuracy",
    label: "Lyckade passningar till sista tredjedelen",
    shortLabel: "PST%",
    description: "Kvalitet i avgörande passningar framåt i planen.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "keyPasses",
    label: "Nyckelpassningar",
    shortLabel: "NP",
    description: "Passningar som leder till avslut.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "xA",
    label: "xA (förväntade assister)",
    shortLabel: "xA",
    description: "Hur bra målchanser spelaren skapar.",
    unit: "xG",
    decimals: 2,
  },
  {
    key: "xG",
    label: "xG (förväntade mål)",
    shortLabel: "xG",
    description: "Kvaliteten på spelarens egna målchanser.",
    unit: "xG",
    decimals: 2,
  },
  {
    key: "shotsOnTarget",
    label: "Skott på mål",
    shortLabel: "SPM",
    description: "Direkt hot mot mål.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "touchesInBox",
    label: "Bollkontakter i box",
    shortLabel: "BiB",
    description: "Hur ofta spelaren kommer till farliga ytor.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "dribbleSuccess",
    label: "Lyckade dribblingar",
    shortLabel: "Dribb%",
    description: "Förmåga att slå sin motståndare 1 mot 1.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "defensiveDuelWinRate",
    label: "Vunna defensiva dueller",
    shortLabel: "DefDuell%",
    description: "Defensiv styrka i närkamper.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "aerialDuelWinRate",
    label: "Vunna luftdueller",
    shortLabel: "Luft%",
    description: "Styrka i spelet i luften.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "recoveries",
    label: "Återerövringar",
    shortLabel: "ÅE",
    description: "Hur ofta spelaren vinner tillbaka bollen.",
    unit: "st",
    decimals: 0,
  },
];

const SERIES_COLORS = ["#22c55e", "#60a5fa", "#f59e0b", "#f97316", "#e879f9"];

function roleLabel(roleName: string): string {
  return ROLE_LABELS[roleName] ?? roleName;
}

function metricByKey(metricKey: TrendMetricKey): TrendMetricOption {
  return (
    METRIC_OPTIONS.find((metric) => metric.key === metricKey) ?? METRIC_OPTIONS[0]
  );
}

function formatMetricValue(value: number, metric: TrendMetricOption): string {
  const formatted = value.toLocaleString("sv-SE", {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
  });
  if (metric.unit === "%") return `${formatted}%`;
  if (metric.unit === "st") return `${formatted} st`;
  return `${formatted} ${metric.unit}`;
}

function formatMetricCompact(value: number, metric: TrendMetricOption): string {
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
  });
}

function formatMatchLabel(match: PlayerTrendMatch): string {
  return `Omg ${match.gameweek} (${match.date})`;
}

export function PlayerTrendsDashboard({ matches }: { matches: PlayerTrendMatch[] }) {
  const [selectedMetricKey, setSelectedMetricKey] =
    useState<TrendMetricKey>("passAccuracy");
  const [selectedGameweek, setSelectedGameweek] = useState<number | "all">(
    matches[0]?.gameweek ?? "all"
  );
  const [selectedRole, setSelectedRole] = useState("Alla");
  const [minMinutes, setMinMinutes] = useState(45);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>(
    () =>
      matches
        .flatMap((match) => match.players)
        .reduce<number[]>((acc, playerRow) => {
          if (playerRow.minutes <= 0 || acc.includes(playerRow.playerId)) {
            return acc;
          }
          if (acc.length >= 3) {
            return acc;
          }
          return [...acc, playerRow.playerId];
        }, [])
  );

  const gameweekOptions = useMemo(
    () =>
      Array.from(new Set(matches.map((match) => match.gameweek))).sort(
        (a, b) => a - b
      ),
    [matches]
  );

  const filteredMatches = useMemo(() => {
    if (selectedGameweek === "all") {
      return matches;
    }
    return matches.filter((match) => match.gameweek === selectedGameweek);
  }, [matches, selectedGameweek]);

  const playerSummaries = useMemo(() => {
    const playerMap = new Map<number, PlayerSummary>();

    for (const match of filteredMatches) {
      for (const row of match.players) {
        const existing = playerMap.get(row.playerId);
        const safeRole = row.roleName || "Unknown";
        if (existing) {
          existing.totalMinutes += row.minutes;
          if (row.minutes > 0) {
            existing.matchesPlayed += 1;
          }
          if (existing.roleName === "Unknown" && safeRole !== "Unknown") {
            existing.roleName = safeRole;
          }
        } else {
          playerMap.set(row.playerId, {
            playerId: row.playerId,
            playerName: row.playerName,
            roleName: safeRole,
            totalMinutes: row.minutes,
            matchesPlayed: row.minutes > 0 ? 1 : 0,
          });
        }
      }
    }

    return Array.from(playerMap.values()).sort(
      (a, b) => b.totalMinutes - a.totalMinutes
    );
  }, [filteredMatches]);

  const roleOptions = useMemo(() => {
    const roles = new Set(playerSummaries.map((player) => player.roleName));
    return ["Alla", ...Array.from(roles)];
  }, [playerSummaries]);

  const selectedMetric = metricByKey(selectedMetricKey);

  const playerMatchLookup = useMemo(() => {
    const lookup = new Map<number, Map<number, PlayerTrendMatchPlayer>>();
    for (const match of filteredMatches) {
      for (const row of match.players) {
        if (!lookup.has(row.playerId)) {
          lookup.set(row.playerId, new Map<number, PlayerTrendMatchPlayer>());
        }
        lookup.get(row.playerId)?.set(match.matchId, row);
      }
    }
    return lookup;
  }, [filteredMatches]);

  const playersAfterFilters = useMemo(() => {
    return playerSummaries.filter((player) => {
      if (selectedRole !== "Alla" && player.roleName !== selectedRole) {
        return false;
      }

      return filteredMatches.some((match) => {
        const row = playerMatchLookup.get(player.playerId)?.get(match.matchId);
        return Boolean(row && row.minutes >= minMinutes);
      });
    });
  }, [
    filteredMatches,
    minMinutes,
    playerMatchLookup,
    playerSummaries,
    selectedRole,
  ]);

  const activePlayerIds = useMemo(() => {
    const allowed = new Set(playersAfterFilters.map((player) => player.playerId));
    return selectedPlayerIds.filter((playerId) => allowed.has(playerId));
  }, [playersAfterFilters, selectedPlayerIds]);

  const fallbackPlayerIds = useMemo(
    () => playersAfterFilters.slice(0, 3).map((player) => player.playerId),
    [playersAfterFilters]
  );

  const displayedPlayerIds =
    activePlayerIds.length > 0 ? activePlayerIds : fallbackPlayerIds;

  const displayedPlayers = playersAfterFilters.filter((player) =>
    displayedPlayerIds.includes(player.playerId)
  );

  const series = useMemo<PlayerSeries[]>(() => {
    return displayedPlayers.map((player, index) => {
      const points: SeriesPoint[] = [];
      for (
        let matchIndex = 0;
        matchIndex < filteredMatches.length;
        matchIndex += 1
      ) {
        const match = filteredMatches[matchIndex];
        const row = playerMatchLookup.get(player.playerId)?.get(match.matchId);
        if (!row || row.minutes < minMinutes) continue;

        points.push({
          matchIndex,
          matchId: match.matchId,
          matchLabel: formatMatchLabel(match),
          minutes: row.minutes,
          value: row.metrics[selectedMetricKey],
        });
      }

      return {
        player,
        color: SERIES_COLORS[index % SERIES_COLORS.length],
        points,
      };
    });
  }, [
    displayedPlayers,
    filteredMatches,
    minMinutes,
    playerMatchLookup,
    selectedMetricKey,
  ]);

  const latestMatch = filteredMatches[filteredMatches.length - 1];

  const latestTopList = useMemo(() => {
    if (!latestMatch) return [];
    return latestMatch.players
      .filter((row) => row.minutes >= minMinutes)
      .filter((row) => selectedRole === "Alla" || row.roleName === selectedRole)
      .sort((a, b) => b.metrics[selectedMetricKey] - a.metrics[selectedMetricKey])
      .slice(0, 5);
  }, [latestMatch, minMinutes, selectedMetricKey, selectedRole]);

  const trendRows = useMemo(() => {
    return series
      .map((playerSeries) => {
        if (playerSeries.points.length < 2) return null;
        const first = playerSeries.points[0];
        const last = playerSeries.points[playerSeries.points.length - 1];
        return {
          playerId: playerSeries.player.playerId,
          playerName: playerSeries.player.playerName,
          color: playerSeries.color,
          first: first.value,
          last: last.value,
          delta: last.value - first.value,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null)
      .sort((a, b) => b.delta - a.delta);
  }, [series]);

  const chart = {
    width: 760,
    height: 320,
    padding: { top: 20, right: 18, bottom: 72, left: 52 },
  };
  const plotWidth = chart.width - chart.padding.left - chart.padding.right;
  const plotHeight = chart.height - chart.padding.top - chart.padding.bottom;

  const allValues = series.flatMap((entry) => entry.points.map((point) => point.value));

  let minY = 0;
  let maxY = 1;

  if (selectedMetric.unit === "%") {
    maxY = 100;
  } else if (allValues.length > 0) {
    const rawMin = Math.min(...allValues);
    const rawMax = Math.max(...allValues);
    const range = Math.max(rawMax - rawMin, 1);
    minY = Math.max(0, rawMin - range * 0.15);
    maxY = rawMax + range * 0.15;
  }

  const yRange = Math.max(maxY - minY, 1);
  const xFor = (matchIndex: number) => {
    if (filteredMatches.length <= 1) return chart.padding.left + plotWidth / 2;
    return (
      chart.padding.left +
      (matchIndex / (filteredMatches.length - 1)) * plotWidth
    );
  };
  const yFor = (value: number) =>
    chart.padding.top + ((maxY - value) / yRange) * plotHeight;

  const yTicks = Array.from({ length: 6 }, (_, index) => {
    const value = minY + ((maxY - minY) * index) / 5;
    return value;
  });

  const togglePlayer = (playerId: number) => {
    setSelectedPlayerIds((current) => {
      if (current.includes(playerId)) {
        return current.filter((id) => id !== playerId);
      }
      if (current.length >= MAX_SELECTED_PLAYERS) {
        return current;
      }
      return [...current, playerId];
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">
              Spelartrender över tid
            </h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: bolldata.se API</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 pb-4 text-xs">
          <Link href="/lopdata" className="text-slate-300 hover:text-white">
            ← Till löpdatasidan
          </Link>
          <Link href="/" className="text-slate-400 hover:text-slate-200">
            Till startsidan
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8">
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Parametrar och urval
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Här följer du spelarnas utveckling i de mest relevanta matchparametrarna.
            Visningen är endast för Hammarbys spelare och växer när fler matcher
            spelas.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Omgång
              <select
                value={selectedGameweek}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedGameweek(
                    nextValue === "all" ? "all" : Number(nextValue)
                  );
                }}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              >
                {gameweekOptions.map((gameweek) => (
                  <option key={gameweek} value={gameweek}>
                    Omgång {gameweek}
                  </option>
                ))}
                {gameweekOptions.length > 1 && (
                  <option value="all">Alla omgångar</option>
                )}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Parameter
              <select
                value={selectedMetricKey}
                onChange={(event) =>
                  setSelectedMetricKey(event.target.value as TrendMetricKey)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {METRIC_OPTIONS.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Position
              <select
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-green-400"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role === "Alla" ? "Alla positioner" : roleLabel(role)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Minuter per match (filter)
              <select
                value={minMinutes}
                onChange={(event) => setMinMinutes(Number(event.target.value))}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
              >
                <option value={1}>Minst 1 minut</option>
                <option value={30}>Minst 30 min</option>
                <option value={45}>Minst 45 min</option>
                <option value={60}>Minst 60 min</option>
              </select>
            </label>
          </div>

          <div className="mt-4 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs text-slate-300">
            <strong className="text-slate-100">{selectedMetric.label}:</strong>{" "}
            {selectedMetric.description}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">
              Trendgraf ({selectedMetric.shortLabel})
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Jämför upp till {MAX_SELECTED_PLAYERS} spelare samtidigt.
            </p>

            <div className="mt-5 overflow-x-auto lg:overflow-visible">
              <svg
                viewBox={`0 0 ${chart.width} ${chart.height}`}
                className="w-full min-w-[420px] lg:min-w-0"
              >
                {yTicks.map((tickValue) => (
                  <g key={tickValue}>
                    <line
                      x1={chart.padding.left}
                      x2={chart.padding.left + plotWidth}
                      y1={yFor(tickValue)}
                      y2={yFor(tickValue)}
                      stroke="#334155"
                      strokeWidth="1"
                    />
                    <text
                      x={chart.padding.left - 8}
                      y={yFor(tickValue) + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="10"
                    >
                      {formatMetricCompact(tickValue, selectedMetric)}
                    </text>
                  </g>
                ))}

                {filteredMatches.map((match, index) => (
                  <g key={match.matchId}>
                    <line
                      x1={xFor(index)}
                      x2={xFor(index)}
                      y1={chart.padding.top}
                      y2={chart.padding.top + plotHeight}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                    <text
                      x={xFor(index)}
                      y={chart.height - 26}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                    >
                      Omg {match.gameweek}
                    </text>
                    <text
                      x={xFor(index)}
                      y={chart.height - 10}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="9"
                    >
                      {match.date}
                    </text>
                  </g>
                ))}

                {series.map((playerSeries) => {
                  const path = playerSeries.points
                    .map((point, pointIndex) => {
                      return `${pointIndex === 0 ? "M" : "L"} ${xFor(point.matchIndex)} ${yFor(point.value)}`;
                    })
                    .join(" ");

                  return (
                    <g key={`line-${playerSeries.player.playerId}`}>
                      {path && (
                        <path
                          d={path}
                          fill="none"
                          stroke={playerSeries.color}
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                      )}
                      {playerSeries.points.map((point) => (
                        <g
                          key={`${playerSeries.player.playerId}-${point.matchId}`}
                        >
                          <circle
                            cx={xFor(point.matchIndex)}
                            cy={yFor(point.value)}
                            r="4.5"
                            fill={playerSeries.color}
                          />
                          <title>
                            {playerSeries.player.playerName}:{" "}
                            {formatMetricValue(point.value, selectedMetric)}
                            {"\n"}
                            {point.matchLabel} ({point.minutes} min)
                          </title>
                        </g>
                      ))}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">Välj spelare</h2>
            <p className="mt-1 text-sm text-slate-400">
              Valda spelare: {displayedPlayerIds.length}/{MAX_SELECTED_PLAYERS}
            </p>
            <div className="mt-4 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
              {playersAfterFilters.map((player) => {
                const checked = displayedPlayerIds.includes(player.playerId);
                return (
                  <label
                    key={player.playerId}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                      checked
                        ? "border-blue-500/50 bg-blue-950/30 text-white"
                        : "border-slate-700/60 bg-slate-900/50 text-slate-300"
                    }`}
                  >
                    <span className="flex flex-col">
                      <span>{player.playerName}</span>
                      <span className="text-xs text-slate-400">
                        {roleLabel(player.roleName)} · {player.totalMinutes.toFixed(0)} min
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePlayer(player.playerId)}
                      className="h-4 w-4 accent-blue-500"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h3 className="text-lg font-semibold text-white">
              Formtabell ({selectedMetric.shortLabel})
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-2 py-2">Spelare</th>
                    {filteredMatches.map((match) => (
                      <th key={match.matchId} className="px-2 py-2 text-right">
                        Omg {match.gameweek}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedPlayers.map((player, playerIndex) => (
                    <tr key={player.playerId} className="border-t border-slate-700/50">
                      <td className="px-2 py-2 text-slate-200">
                        <span
                          className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              SERIES_COLORS[playerIndex % SERIES_COLORS.length],
                          }}
                        />
                        {player.playerName}
                      </td>
                      {filteredMatches.map((match) => {
                        const row = playerMatchLookup
                          .get(player.playerId)
                          ?.get(match.matchId);
                        if (!row || row.minutes < minMinutes) {
                          return (
                            <td
                              key={`${player.playerId}-${match.matchId}`}
                              className="px-2 py-2 text-right text-slate-500"
                            >
                              -
                            </td>
                          );
                        }
                        return (
                          <td
                            key={`${player.playerId}-${match.matchId}`}
                            className="px-2 py-2 text-right text-white"
                          >
                            {formatMetricCompact(
                              row.metrics[selectedMetricKey],
                              selectedMetric
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h3 className="text-lg font-semibold text-white">
              Topp i senaste matchen
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {latestMatch
                ? `${latestMatch.name} · ${latestMatch.date}`
                : "Ingen matchdata"}
            </p>
            <ul className="mt-4 space-y-2">
              {latestTopList.map((row) => (
                <li
                  key={row.playerId}
                  className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="text-slate-200">
                    {row.playerName}
                    <span className="ml-2 text-xs text-slate-400">
                      ({row.minutes} min)
                    </span>
                  </span>
                  <span className="font-semibold text-white">
                    {formatMetricValue(row.metrics[selectedMetricKey], selectedMetric)}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Utveckling (för valda spelare)
            </h4>
            <ul className="mt-3 space-y-2">
              {trendRows.length === 0 && (
                <li className="text-sm text-slate-500">
                  Behöver minst två matcher med tillräckligt antal minuter.
                </li>
              )}
              {trendRows.map((row) => (
                <li
                  key={`trend-${row.playerId}`}
                  className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-200">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: row.color }}
                    />
                    {row.playerName}
                  </span>
                  <span
                    className={`font-semibold ${
                      row.delta >= 0 ? "text-green-300" : "text-rose-300"
                    }`}
                  >
                    {row.delta >= 0 ? "+" : ""}
                    {formatMetricCompact(row.delta, selectedMetric)}
                    {selectedMetric.unit === "%" ? "%" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
