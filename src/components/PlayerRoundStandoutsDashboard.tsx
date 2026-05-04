"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  type PlayerTrendMatch,
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

type RoundStandout = {
  playerId: number;
  playerName: string;
  roleName: string;
  minutes: number;
  direction: "positive" | "negative";
  matchValue: number;
  seasonAverage: number;
  rawMatchValue: number;
  rawSeasonAverage: number;
  delta: number;
  relativeDelta: number;
  absoluteRelativeDelta: number;
};

const ROLE_LABELS: Record<string, string> = {
  Defender: "Försvarare",
  Midfielder: "Mittfältare",
  Forward: "Anfallare",
  Goalkeeper: "Målvakt",
  Unknown: "Okänd",
};

const PLAYER_ROLE_OVERRIDES: Record<string, keyof typeof ROLE_LABELS> = {
  "F. Adjei": "Midfielder",
  "I. Fofana": "Defender",
  "O. Hagen": "Forward",
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
    shortLabel: "AE",
    description: "Hur ofta spelaren vinner tillbaka bollen.",
    unit: "st",
    decimals: 0,
  },
];

function roleLabel(roleName: string): string {
  return ROLE_LABELS[roleName] ?? roleName;
}

function normalizeRole(playerName: string, roleName: string): string {
  const overriddenRole = PLAYER_ROLE_OVERRIDES[playerName];
  if (overriddenRole) {
    return overriddenRole;
  }
  return roleName || "Unknown";
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

function relativeDeltaFloor(metric: TrendMetricOption): number {
  if (metric.unit === "%") return 5;
  if (metric.unit === "xG") return 0.2;
  return 1;
}

function shouldNormalizePer90(metric: TrendMetricOption): boolean {
  return metric.unit === "st";
}

function normalizeValueForStandout(
  value: number,
  minutes: number,
  metric: TrendMetricOption
): number {
  if (!shouldNormalizePer90(metric)) return value;
  if (minutes <= 0) return 0;
  return (value / minutes) * 90;
}

function getRoundStandoutBadge(standout: RoundStandout): string {
  const magnitude = standout.absoluteRelativeDelta;
  if (standout.direction === "positive") {
    if (magnitude >= 0.35) return "Kraftigt över eget snitt";
    if (magnitude >= 0.2) return "Över eget snitt";
    return "Svagt över eget snitt";
  }
  if (magnitude >= 0.35) return "Kraftigt under eget snitt";
  if (magnitude >= 0.2) return "Under eget snitt";
  return "Svagt under eget snitt";
}

export function PlayerRoundStandoutsDashboard({
  matches,
}: {
  matches: PlayerTrendMatch[];
}) {
  const [selectedMetricKey, setSelectedMetricKey] =
    useState<TrendMetricKey>("passAccuracy");
  const [selectedGameweek, setSelectedGameweek] = useState<number | "all">(
    matches[matches.length - 1]?.gameweek ?? "all"
  );
  const [selectedRole, setSelectedRole] = useState("Alla");
  const [minMinutes, setMinMinutes] = useState(1);

  const gameweekOptions = useMemo(
    () =>
      Array.from(new Set(matches.map((match) => match.gameweek))).sort(
        (a, b) => a - b
      ),
    [matches]
  );

  const selectedMetric = metricByKey(selectedMetricKey);

  const roleOptions = useMemo(() => {
    const roles = new Set(
      matches
        .flatMap((match) => match.players)
        .map((player) => normalizeRole(player.playerName, player.roleName))
    );
    return ["Alla", ...Array.from(roles)];
  }, [matches]);

  const selectedRoundMatch = useMemo(() => {
    if (selectedGameweek === "all") {
      return null;
    }
    return matches.find((match) => match.gameweek === selectedGameweek) ?? null;
  }, [matches, selectedGameweek]);

  const roundStandouts = useMemo<RoundStandout[]>(() => {
    if (!selectedRoundMatch) return [];

    const valuesByPlayer = new Map<number, number[]>();
    const rawValuesByPlayer = new Map<number, number[]>();
    for (const match of matches) {
      for (const player of match.players) {
        if (player.minutes <= 0) continue;
        const normalizedValues = valuesByPlayer.get(player.playerId) ?? [];
        const rawValues = rawValuesByPlayer.get(player.playerId) ?? [];
        const rawMetricValue = player.metrics[selectedMetricKey];
        normalizedValues.push(
          normalizeValueForStandout(rawMetricValue, player.minutes, selectedMetric)
        );
        rawValues.push(rawMetricValue);
        valuesByPlayer.set(player.playerId, normalizedValues);
        rawValuesByPlayer.set(player.playerId, rawValues);
      }
    }

    return selectedRoundMatch.players
      .filter((player) => player.minutes >= minMinutes)
      .filter((player) => {
        const normalizedRole = normalizeRole(player.playerName, player.roleName);
        return selectedRole === "Alla" || normalizedRole === selectedRole;
      })
      .flatMap((player) => {
        const history = valuesByPlayer.get(player.playerId);
        const rawHistory = rawValuesByPlayer.get(player.playerId);
        if (!history || history.length === 0 || !rawHistory || rawHistory.length === 0) {
          return [];
        }
        const seasonAverage =
          history.reduce((sum, value) => sum + value, 0) / Math.max(history.length, 1);
        const rawSeasonAverage =
          rawHistory.reduce((sum, value) => sum + value, 0) /
          Math.max(rawHistory.length, 1);
        const rawMatchValue = player.metrics[selectedMetricKey];
        const matchValue = normalizeValueForStandout(
          rawMatchValue,
          player.minutes,
          selectedMetric
        );
        const delta = matchValue - seasonAverage;
        const relativeDelta =
          delta / Math.max(Math.abs(seasonAverage), relativeDeltaFloor(selectedMetric));
        const absoluteRelativeDelta = Math.abs(relativeDelta);
        if (absoluteRelativeDelta < 0.12) return [];
        return [
          {
            playerId: player.playerId,
            playerName: player.playerName,
            roleName: normalizeRole(player.playerName, player.roleName),
            minutes: player.minutes,
            direction: delta >= 0 ? "positive" : "negative",
            matchValue,
            seasonAverage,
            rawMatchValue,
            rawSeasonAverage,
            delta,
            relativeDelta,
            absoluteRelativeDelta,
          },
        ];
      })
      .sort((left, right) => right.absoluteRelativeDelta - left.absoluteRelativeDelta)
      .slice(0, 8);
  }, [matches, minMinutes, selectedMetric, selectedMetricKey, selectedRole, selectedRoundMatch]);

  const positiveRoundStandouts = useMemo(
    () => roundStandouts.filter((player) => player.direction === "positive").slice(0, 4),
    [roundStandouts]
  );

  const negativeRoundStandouts = useMemo(
    () => roundStandouts.filter((player) => player.direction === "negative").slice(0, 4),
    [roundStandouts]
  );

  const prioritizedRoundStandouts = useMemo(() => {
    const combined: RoundStandout[] = [];
    const maxCards = 6;
    const pairCount = Math.min(positiveRoundStandouts.length, negativeRoundStandouts.length, 3);

    for (let index = 0; index < pairCount; index += 1) {
      combined.push(positiveRoundStandouts[index], negativeRoundStandouts[index]);
    }

    const remaining = [
      ...positiveRoundStandouts.slice(pairCount),
      ...negativeRoundStandouts.slice(pairCount),
    ].sort((left, right) => right.absoluteRelativeDelta - left.absoluteRelativeDelta);

    for (const standout of remaining) {
      if (combined.length >= maxCards) break;
      combined.push(standout);
    }

    return combined;
  }, [negativeRoundStandouts, positiveRoundStandouts]);

  const fallbackRoundLeaders = useMemo(() => {
    if (!selectedRoundMatch) return [];
    return selectedRoundMatch.players
      .filter((player) => player.minutes >= minMinutes)
      .filter((player) => {
        const normalizedRole = normalizeRole(player.playerName, player.roleName);
        return selectedRole === "Alla" || normalizedRole === selectedRole;
      })
      .sort((left, right) => right.metrics[selectedMetricKey] - left.metrics[selectedMetricKey])
      .slice(0, 6)
      .map((player) => ({
        playerId: player.playerId,
        playerName: player.playerName,
        roleName: normalizeRole(player.playerName, player.roleName),
        minutes: player.minutes,
        value: player.metrics[selectedMetricKey],
      }));
  }, [minMinutes, selectedMetricKey, selectedRole, selectedRoundMatch]);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">Spelare som stack ut i omgången</h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: bolldata.se API</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 pb-4 text-xs">
          <Link
            href="/"
            className="rounded-md border border-slate-500/50 bg-slate-900/70 px-2.5 py-1 text-slate-100 hover:border-slate-300 hover:text-white"
          >
            Huvudsida
          </Link>
          <Link href="/spelarstatistik" className="text-slate-300 hover:text-white">
            Till spelarstatistik
          </Link>
          <Link href="/lopdata/trender" className="text-slate-400 hover:text-slate-200">
            Till spelartrender
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8">
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Filter för omgångens standout</h2>
          <p className="mt-1 text-sm text-slate-400">
            Vyn är separat från spelartrender och fokuserar bara på vilka spelare som stack ut
            mest i vald omgång.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Omgång
              <select
                value={selectedGameweek}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedGameweek(nextValue === "all" ? "all" : Number(nextValue));
                }}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              >
                {gameweekOptions.map((gameweek) => (
                  <option key={gameweek} value={gameweek}>
                    Omgång {gameweek}
                  </option>
                ))}
                {gameweekOptions.length > 1 && <option value="all">Alla omgångar</option>}
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
              Minuter per match
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
          <div className="mt-2 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs text-slate-300">
            For rakneparametrar (st) visas standout-jamforelsen i per 90 min.
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Standout-spelare i vald omgang</h2>
              <p className="mt-1 text-sm text-slate-400">
                Jamfor spelare i vald omgang mot deras eget snitt i{" "}
                <span className="font-semibold text-slate-200">{selectedMetric.label}</span>.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Visar bade positiva och negativa utslag for en tydlig helhetsbild.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300">
                {selectedRoundMatch
                  ? `Omgang ${selectedRoundMatch.gameweek} - ${selectedMetric.shortLabel}`
                  : "Valj en enskild omgang"}
              </div>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200">
                Positivt
              </span>
              <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-1 text-[10px] text-rose-200">
                Negativt
              </span>
            </div>
          </div>

          {!selectedRoundMatch && (
            <p className="mt-3 text-sm text-slate-400">
              Valt "Alla omgangar". Valj en specifik omgang for att visa standout-spelare.
            </p>
          )}

          {selectedRoundMatch && prioritizedRoundStandouts.length === 0 && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-slate-400">
                Inga tydliga standout-utslag för nuvarande filter i den omgången.
              </p>
              {fallbackRoundLeaders.length > 0 && (
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Högsta utfall i omgången ({selectedMetric.shortLabel})
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {fallbackRoundLeaders.map((leader) => (
                      <article
                        key={`fallback-${leader.playerId}`}
                        className="rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2"
                      >
                        <p className="text-sm font-semibold text-white">{leader.playerName}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {roleLabel(leader.roleName)} • {leader.minutes} min
                        </p>
                        <p className="mt-1 text-xs font-semibold text-sky-300">
                          {formatMetricValue(leader.value, selectedMetric)}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedRoundMatch && prioritizedRoundStandouts.length > 0 && (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {prioritizedRoundStandouts.map((player) => {
                const isPositive = player.direction === "positive";
                const toneClasses = isPositive
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-rose-500/30 bg-rose-500/5";
                const badgeClasses = isPositive
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-400/30 bg-rose-500/10 text-rose-200";
                const deltaClasses = isPositive ? "text-emerald-300" : "text-rose-300";
                const sign = player.delta >= 0 ? "+" : "-";
                return (
                  <article
                    key={`${player.direction}-standout-${player.playerId}`}
                    className={`rounded-xl border p-3 ${toneClasses}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">{player.playerName}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${badgeClasses}`}>
                        {getRoundStandoutBadge(player)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {roleLabel(player.roleName)} • {player.minutes} min
                    </p>
                    <div className="mt-2 grid gap-2 text-[11px] sm:grid-cols-2">
                      <div className="rounded border border-slate-700/70 bg-slate-950/60 px-2 py-1.5">
                        <p className="text-slate-500">
                          {shouldNormalizePer90(selectedMetric)
                            ? "Vald omgång (per 90)"
                            : "Vald omgång"}
                        </p>
                        <p className="font-semibold text-white">
                          {formatMetricValue(player.matchValue, selectedMetric)}
                        </p>
                        {shouldNormalizePer90(selectedMetric) && (
                          <p className="mt-0.5 text-slate-400">
                            Råvärde: {formatMetricValue(player.rawMatchValue, selectedMetric)}
                          </p>
                        )}
                      </div>
                      <div className="rounded border border-slate-700/70 bg-slate-950/60 px-2 py-1.5">
                        <p className="text-slate-500">
                          {shouldNormalizePer90(selectedMetric)
                            ? "Eget snitt 2026 (per 90)"
                            : "Eget snitt 2026"}
                        </p>
                        <p className="font-semibold text-white">
                          {formatMetricValue(player.seasonAverage, selectedMetric)}
                        </p>
                        {shouldNormalizePer90(selectedMetric) && (
                          <p className="mt-0.5 text-slate-400">
                            Råsnitt: {formatMetricValue(player.rawSeasonAverage, selectedMetric)}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className={`mt-2 text-[11px] font-semibold ${deltaClasses}`}>
                      Δ: {sign}
                      {formatMetricCompact(Math.abs(player.delta), selectedMetric)}
                      {selectedMetric.unit === "%" ? "%" : selectedMetric.unit === "st" ? " st" : ""}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Utslag: {sign}
                      {Math.abs(player.relativeDelta * 100).toLocaleString("sv-SE", {
                        maximumFractionDigits: 0,
                      })}
                      %
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
