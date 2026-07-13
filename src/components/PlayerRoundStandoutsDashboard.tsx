"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getRunningMatchForGameweek,
  RoundRunningStatsSection,
} from "@/components/RoundRunningStatsSection";
import {
  type PlayerTrendMatch,
  type PlayerTrendMetrics,
} from "@/lib/hammarbyPlayerTrendData";
import type { RunningMatchStat } from "@/lib/hammarbyRunningData";

type TrendMetricKey = keyof PlayerTrendMetrics;

type TrendMetricOption = {
  key: TrendMetricKey;
  label: string;
  cardLabel: string;
  description: string;
  unit: "" | "%" | "st" | "xG";
  decimals: number;
};

type MetricPlayerSnapshot = {
  playerId: number;
  playerName: string;
  roleName: string;
  minutes: number;
  matchValue: number;
  rawMatchValue: number;
};

type RoundMetricSummary = {
  metric: TrendMetricOption;
  leader: MetricPlayerSnapshot | null;
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
    cardLabel: "Pass%",
    description: "Visar hur trygg spelaren är i uppbyggnadsfasen.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "passesToFinalThird",
    label: "Passningar till sista tredjedelen",
    cardLabel: "PST",
    description: "Hur mycket spelaren bidrar till att flytta spelet framåt.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "keyPasses",
    label: "Nyckelpassningar",
    cardLabel: "NP",
    description: "Passningar som leder till avslut.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "xA",
    label: "xA (förväntade assister)",
    cardLabel: "xA",
    description: "Hur bra målchanser spelaren skapar.",
    unit: "xG",
    decimals: 2,
  },
  {
    key: "xG",
    label: "xG (förväntade mål)",
    cardLabel: "xG",
    description: "Kvaliteten på spelarens egna målchanser.",
    unit: "xG",
    decimals: 2,
  },
  {
    key: "shotsOnTarget",
    label: "Skott på mål",
    cardLabel: "SPM",
    description: "Direkt hot mot mål.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "touchesInBox",
    label: "Bollkontakter i box",
    cardLabel: "BiB",
    description: "Hur ofta spelaren kommer till farliga ytor.",
    unit: "st",
    decimals: 0,
  },
  {
    key: "dribbleSuccess",
    label: "Lyckade dribblingar",
    cardLabel: "Dribb%",
    description: "Förmåga att slå sin motståndare 1 mot 1.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "defensiveDuelWinRate",
    label: "Vunna defensiva dueller",
    cardLabel: "DefDuell%",
    description: "Defensiv styrka i närkamper.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "aerialDuelWinRate",
    label: "Vunna luftdueller",
    cardLabel: "Luft%",
    description: "Styrka i spelet i luften.",
    unit: "%",
    decimals: 1,
  },
  {
    key: "recoveries",
    label: "Återerövringar",
    cardLabel: "ÅE",
    description: "Hur ofta spelaren vinner tillbaka bollen.",
    unit: "st",
    decimals: 0,
  },
];

const FEATURED_METRICS: TrendMetricKey[] = [
  "passAccuracy",
  "keyPasses",
  "xA",
  "xG",
  "recoveries",
  "shotsOnTarget",
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

export function PlayerRoundStandoutsDashboard({
  matches,
  runningMatches = [],
}: {
  matches: PlayerTrendMatch[];
  runningMatches?: RunningMatchStat[];
}) {
  const [selectedGameweek, setSelectedGameweek] = useState<number>(
    matches[matches.length - 1]?.gameweek ?? matches[0]?.gameweek ?? 1
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

  const roleOptions = useMemo(() => {
    const roles = new Set(
      matches
        .flatMap((match) => match.players)
        .map((player) => normalizeRole(player.playerName, player.roleName))
    );
    return ["Alla", ...Array.from(roles)];
  }, [matches]);

  const selectedRoundMatch = useMemo(() => {
    return matches.find((match) => match.gameweek === selectedGameweek) ?? null;
  }, [matches, selectedGameweek]);

  const selectedRunningMatch = useMemo(() => {
    return getRunningMatchForGameweek(runningMatches, selectedGameweek);
  }, [runningMatches, selectedGameweek]);

  const roundMetricSummaries = useMemo<RoundMetricSummary[]>(() => {
    if (!selectedRoundMatch) return [];
    return FEATURED_METRICS.map((metricKey) => {
      const metric = metricByKey(metricKey);
      const snapshots = selectedRoundMatch.players
        .filter((player) => player.minutes >= minMinutes)
        .filter((player) => {
          const normalizedRole = normalizeRole(player.playerName, player.roleName);
          return selectedRole === "Alla" || normalizedRole === selectedRole;
        })
        .flatMap((player): MetricPlayerSnapshot[] => {
          const rawMatchValue = player.metrics[metricKey];
          const matchValue = normalizeValueForStandout(rawMatchValue, player.minutes, metric);
          return [
            {
              playerId: player.playerId,
              playerName: player.playerName,
              roleName: normalizeRole(player.playerName, player.roleName),
              minutes: player.minutes,
              matchValue,
              rawMatchValue,
            },
          ];
        });

      const byMatchValue = [...snapshots].sort(
        (left, right) => right.matchValue - left.matchValue
      );
      return {
        metric,
        leader: byMatchValue[0] ?? null,
      };
    });
  }, [matches, minMinutes, selectedRole, selectedRoundMatch]);

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
          <Link href="/lopdata" className="text-slate-400 hover:text-slate-200">
            Till löpdata
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
            Fast nyckeltalspaket för omgången. Vi visar vem som var bäst i varje nyckeltal i
            den valda matchen.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Omgång
              <select
                value={selectedGameweek}
                onChange={(event) => {
                  setSelectedGameweek(Number(event.target.value));
                }}
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              >
                {gameweekOptions.map((gameweek) => (
                  <option key={gameweek} value={gameweek}>
                    Omgång {gameweek}
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
            <strong className="text-slate-100">Nyckeltal:</strong>{" "}
            {FEATURED_METRICS.map((key) => metricByKey(key).cardLabel).join(" · ")}
          </div>
          <div className="mt-2 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs text-slate-300">
            För räkneparametrar (st) normaliseras jämförelsen till per 90 för rättvisare bild.
          </div>
        </section>

        {selectedRunningMatch ? (
          <RoundRunningStatsSection
            match={selectedRunningMatch}
            allDetailMatches={runningMatches}
          />
        ) : null}

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Bäst per nyckeltal i omgången</h2>
              <p className="mt-1 text-sm text-slate-400">
                Varje kort visar omgångens bästa spelare i nyckeltalet.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300">
                {selectedRoundMatch
                  ? `Omgång ${selectedRoundMatch.gameweek}`
                  : "Ingen omgång vald"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {roundMetricSummaries.map((summary) => {
              const leader = summary.leader;
              const showPer90 = shouldNormalizePer90(summary.metric);
              return (
                <article
                  key={summary.metric.key}
                  className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{summary.metric.label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{summary.metric.description}</p>
                    </div>
                    <span className="rounded-full border border-slate-600 bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-200">
                      {summary.metric.cardLabel}
                    </span>
                  </div>

                  {!leader && (
                    <p className="mt-3 text-xs text-slate-400">
                      Ingen spelare matchar filtren för detta nyckeltal i vald omgång.
                    </p>
                  )}

                  {leader && (
                    <>
                      <div className="mt-3 rounded-lg border border-slate-700/70 bg-slate-950/60 p-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                          Bäst i omgången
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {leader.playerName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {roleLabel(leader.roleName)} • {leader.minutes} min
                        </p>
                        <p className="mt-1 text-sm font-semibold text-sky-300">
                          {formatMetricValue(leader.matchValue, summary.metric)}
                        </p>
                        {showPer90 && (
                          <p className="text-[11px] text-slate-400">
                            Råvärde: {formatMetricValue(leader.rawMatchValue, summary.metric)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
