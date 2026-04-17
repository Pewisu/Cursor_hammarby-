"use client";

import Link from "next/link";
import { useState } from "react";
import {
  hammarbyRoundMatchStats,
  type RoundMatchStats,
} from "@/lib/matchStatisticsOverviewData";
import {
  MATCH_ANALYSIS_PERIOD_LABELS,
  hammarbyMatchAnalysisMetricDefinitions,
  hammarbyMatchAnalysisRounds,
  type MatchAnalysisMetricDefinition,
  type MatchAnalysisMetricKey,
} from "@/lib/hammarbyMatchAnalysisData";

type MatchStatisticsHubProps = {
  mode: "combined" | "round";
  round?: number;
  rounds?: RoundMatchStats[];
};

type StatRow = {
  key: string;
  label: string;
  format: "number" | "percent" | "decimal";
  home: number;
  away: number;
};

type TrendMetricKey =
  | "goals"
  | "xg"
  | "shots"
  | "shotsOnTarget"
  | "possessionPercent"
  | "passes"
  | "passesSuccessful"
  | "touchesInBox"
  | "corners";

type TrendMetricOption = {
  key: TrendMetricKey;
  label: string;
  format: "number" | "percent" | "decimal";
};

type TrendPoint = {
  gameweek: number;
  date: string;
  value: number;
  opponent: string;
};

type MatchAnalysisRoundRow = {
  key: string;
  season: number;
  gameweek: number;
  date: string;
  opponent: string;
  sourceMatchName: string;
  isHome: boolean;
  opponentTeamId: number | null;
  sourceUrl: string;
  value: number;
  seasonAverage: number;
  periods: [number, number, number, number, number, number];
  deltaFromPrevious: number | null;
};

type ComparisonPeriodRow = {
  label: string;
  roundAValue: number;
  roundBValue: number;
  delta: number;
};

type RoundVsSeasonPeriodRow = {
  label: string;
  roundValue: number;
  seasonValue: number;
  delta: number;
};

type HistoricalComparisonCandidate = {
  key: string;
  label: string;
  context: string;
};

type SeasonVsSeasonPeriodRow = {
  label: string;
  seasonAValue: number;
  seasonBValue: number;
  delta: number;
};

type OverviewData = {
  id: string;
  title: string;
  subtitle: string;
  dateText: string;
  leftTeam: string;
  rightTeam: string;
  sourceUrl?: string;
  stats: StatRow[];
};

const TREND_METRIC_OPTIONS: TrendMetricOption[] = [
  { key: "possessionPercent", label: "Bollinnehav", format: "percent" },
  { key: "shots", label: "Avslut", format: "number" },
  { key: "shotsOnTarget", label: "Skott på mål", format: "number" },
  { key: "passes", label: "Passningar", format: "number" },
  { key: "passesSuccessful", label: "Lyckade passningar", format: "number" },
  { key: "xg", label: "xG", format: "decimal" },
  { key: "touchesInBox", label: "Bollkontakter i box", format: "number" },
  { key: "corners", label: "Hörnor", format: "number" },
  { key: "goals", label: "Mål", format: "number" },
];

const DEFAULT_MATCH_ANALYSIS_METRIC_KEY: MatchAnalysisMetricKey = "ball_possession_pct";
const MATCH_ANALYSIS_AVAILABLE_SEASONS = Array.from(
  new Set(hammarbyMatchAnalysisRounds.map((row) => row.season))
).sort((a, b) => a - b);
const DEFAULT_MATCH_ANALYSIS_SEASON =
  MATCH_ANALYSIS_AVAILABLE_SEASONS[MATCH_ANALYSIS_AVAILABLE_SEASONS.length - 1] ?? 2026;

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatValue(
  value: number,
  format: "number" | "percent" | "decimal"
): string {
  if (format === "percent") return `${value}%`;
  if (format === "decimal") return value.toFixed(2);
  return value.toString();
}

function formatCompactValue(
  value: number,
  format: "number" | "percent" | "decimal"
): string {
  if (format === "percent") {
    return `${value.toLocaleString("sv-SE", { maximumFractionDigits: 0 })}%`;
  }
  if (format === "decimal") {
    return value.toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value.toLocaleString("sv-SE", {
    maximumFractionDigits: 0,
  });
}

function formatMatchAnalysisValue(
  value: number,
  metric: MatchAnalysisMetricDefinition
): string {
  const normalized = metric.format === "percent" ? value * 100 : value;
  const formatted = normalized.toLocaleString("sv-SE", {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
  });
  return metric.format === "percent" ? `${formatted}%` : formatted;
}

function formatMatchAnalysisDelta(
  value: number,
  metric: MatchAnalysisMetricDefinition
): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  const absValue = Math.abs(metric.format === "percent" ? value * 100 : value);
  const formatted = absValue.toLocaleString("sv-SE", {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
  });
  return `${sign}${formatted}${metric.format === "percent" ? " p" : ""}`;
}

function getMatchAnalysisDeltaTone(
  value: number,
  direction: MatchAnalysisMetricDefinition["direction"]
): string {
  if (value === 0) return "text-slate-300";
  const isPositiveOutcome = direction === "higher" ? value > 0 : value < 0;
  return isPositiveOutcome ? "text-green-300" : "text-rose-300";
}

function getMatchAnalysisDeltaMeaning(
  value: number,
  direction: MatchAnalysisMetricDefinition["direction"]
): "Bättre" | "Sämre" | "Oförändrat" {
  if (value === 0) return "Oförändrat";
  const isPositiveOutcome = direction === "higher" ? value > 0 : value < 0;
  return isPositiveOutcome ? "Bättre" : "Sämre";
}

function normalizeOpponentName(value: string): string {
  return value
    .toLocaleLowerCase("sv-SE")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "");
}

function getBarWidth(left: number, right: number): number {
  const total = left + right;
  if (total === 0) return 50;
  return (left / total) * 100;
}

function buildStatRowsFromRound(round: RoundMatchStats): StatRow[] {
  const home = round.hammarby;
  const away = round.opponent;
  const homePassAccuracy = home.passes
    ? (home.passesSuccessful / home.passes) * 100
    : 0;
  const awayPassAccuracy = away.passes
    ? (away.passesSuccessful / away.passes) * 100
    : 0;

  return [
    { key: "goals", label: "Mål", format: "number", home: home.goals, away: away.goals },
    { key: "xg", label: "xG", format: "decimal", home: home.xg, away: away.xg },
    { key: "shots", label: "Avslut", format: "number", home: home.shots, away: away.shots },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: home.shotsOnTarget,
      away: away.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: home.possessionPercent,
      away: away.possessionPercent,
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: home.passes,
      away: away.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(homePassAccuracy),
      away: Math.round(awayPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: home.touchesInBox,
      away: away.touchesInBox,
    },
    { key: "corners", label: "Hörnor", format: "number", home: home.corners, away: away.corners },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: home.fouls,
      away: away.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: home.yellowCards,
      away: away.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: home.redCards,
      away: away.redCards,
    },
  ];
}

function buildRoundOverview(round: RoundMatchStats): OverviewData {
  return {
    id: round.key,
    title: `Omgång ${round.gameweek}`,
    subtitle: round.matchName,
    dateText: formatDate(round.date),
    leftTeam: round.hammarby.teamName,
    rightTeam: round.opponent.teamName,
    sourceUrl: round.sourceUrl,
    stats: buildStatRowsFromRound(round),
  };
}

function buildCombinedOverview(items: RoundMatchStats[]): OverviewData | null {
  if (items.length === 0) return null;

  const leftTeam = "Hammarby";
  const rightTeam = "Motståndare";
  const rounds = items.map((item) => item.gameweek).sort((a, b) => a - b);
  const matchCount = items.length;
  const dateRange =
    matchCount === 1
      ? formatDate(items[0].date)
      : `${formatDate(items[0].date)} - ${formatDate(items[items.length - 1].date)}`;

  const hammarby = items.reduce(
    (acc, match) => {
      acc.goals += match.hammarby.goals;
      acc.xg += match.hammarby.xg;
      acc.shots += match.hammarby.shots;
      acc.shotsOnTarget += match.hammarby.shotsOnTarget;
      acc.possession += match.hammarby.possessionPercent;
      acc.passes += match.hammarby.passes;
      acc.passesSuccessful += match.hammarby.passesSuccessful;
      acc.touchesInBox += match.hammarby.touchesInBox;
      acc.corners += match.hammarby.corners;
      acc.fouls += match.hammarby.fouls;
      acc.yellowCards += match.hammarby.yellowCards;
      acc.redCards += match.hammarby.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const opponents = items.reduce(
    (acc, match) => {
      acc.goals += match.opponent.goals;
      acc.xg += match.opponent.xg;
      acc.shots += match.opponent.shots;
      acc.shotsOnTarget += match.opponent.shotsOnTarget;
      acc.possession += match.opponent.possessionPercent;
      acc.passes += match.opponent.passes;
      acc.passesSuccessful += match.opponent.passesSuccessful;
      acc.touchesInBox += match.opponent.touchesInBox;
      acc.corners += match.opponent.corners;
      acc.fouls += match.opponent.fouls;
      acc.yellowCards += match.opponent.yellowCards;
      acc.redCards += match.opponent.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const hammarbyPassAccuracy = hammarby.passes
    ? (hammarby.passesSuccessful / hammarby.passes) * 100
    : 0;
  const opponentsPassAccuracy = opponents.passes
    ? (opponents.passesSuccessful / opponents.passes) * 100
    : 0;

  const stats: StatRow[] = [
    {
      key: "goals",
      label: "Mål",
      format: "number",
      home: hammarby.goals,
      away: opponents.goals,
    },
    {
      key: "xg",
      label: "xG",
      format: "decimal",
      home: Number(hammarby.xg.toFixed(2)),
      away: Number(opponents.xg.toFixed(2)),
    },
    {
      key: "shots",
      label: "Avslut",
      format: "number",
      home: hammarby.shots,
      away: opponents.shots,
    },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: hammarby.shotsOnTarget,
      away: opponents.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: Math.round(hammarby.possession / matchCount),
      away: Math.round(opponents.possession / matchCount),
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: hammarby.passes,
      away: opponents.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(hammarbyPassAccuracy),
      away: Math.round(opponentsPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: hammarby.touchesInBox,
      away: opponents.touchesInBox,
    },
    {
      key: "corners",
      label: "Hörnor",
      format: "number",
      home: hammarby.corners,
      away: opponents.corners,
    },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: hammarby.fouls,
      away: opponents.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: hammarby.yellowCards,
      away: opponents.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: hammarby.redCards,
      away: opponents.redCards,
    },
  ];

  return {
    id: "combined",
    title: "Kombinerat (alla spelade omgångar)",
    subtitle: `${leftTeam} vs ${rightTeam} • Omgång ${rounds.join(", ")}`,
    dateText: dateRange,
    leftTeam,
    rightTeam,
    sourceUrl: "https://bolldata.se/",
    stats,
  };
}

export function MatchStatisticsHub({ mode, round, rounds }: MatchStatisticsHubProps) {
  const sourceRounds = rounds ?? hammarbyRoundMatchStats;
  const sortedMatches = [...sourceRounds].sort((a, b) => a.gameweek - b.gameweek);
  const [selectedTrendMetricKey, setSelectedTrendMetricKey] =
    useState<TrendMetricKey>("possessionPercent");
  const [selectedMatchAnalysisMetricKey, setSelectedMatchAnalysisMetricKey] =
    useState<MatchAnalysisMetricKey>(DEFAULT_MATCH_ANALYSIS_METRIC_KEY);
  const [selectedMatchAnalysisSeason, setSelectedMatchAnalysisSeason] = useState<number>(
    DEFAULT_MATCH_ANALYSIS_SEASON
  );
  const [showSeasonRows, setShowSeasonRows] = useState<boolean>(false);
  const [showCrossSeasonCompare, setShowCrossSeasonCompare] = useState<boolean>(true);
  const [comparisonRoundA, setComparisonRoundA] = useState<string>("");
  const [comparisonRoundB, setComparisonRoundB] = useState<string>("");
  const [roundVsSeasonRound, setRoundVsSeasonRound] = useState<string>("");
  const [selectedHistoricalComparisonKey, setSelectedHistoricalComparisonKey] =
    useState<string>("none");

  const roundOverview =
    mode === "round"
      ? (() => {
          const selectedRound = sortedMatches.find((item) => item.gameweek === round);
          return selectedRound ? buildRoundOverview(selectedRound) : null;
        })()
      : null;
  const combinedOverview = mode === "combined" ? buildCombinedOverview(sortedMatches) : null;
  const current = mode === "combined" ? combinedOverview : roundOverview;

  const navItems = [
    { href: "/matchstatistik", label: "Kombinerat", active: mode === "combined" },
    ...sortedMatches.map((item) => ({
      href: `/matchstatistik/omgang/${item.gameweek}`,
      label: `Omgång ${item.gameweek}`,
      active: mode === "round" && round === item.gameweek,
    })),
  ];
  const selectedTrendMetric =
    TREND_METRIC_OPTIONS.find((metric) => metric.key === selectedTrendMetricKey) ??
    TREND_METRIC_OPTIONS[0];
  const trendPoints: TrendPoint[] = sortedMatches.map((item) => ({
    gameweek: item.gameweek,
    date: item.date,
    value: item.hammarby[selectedTrendMetric.key],
    opponent: item.opponent.teamName,
  }));

  const trendHasEnoughPoints = trendPoints.length >= 2;
  const trendDelta = trendHasEnoughPoints
    ? trendPoints[trendPoints.length - 1].value - trendPoints[0].value
    : 0;
  const trendAverage =
    trendPoints.reduce((sum, point) => sum + point.value, 0) /
    Math.max(trendPoints.length, 1);
  const selectedMatchAnalysisMetric =
    hammarbyMatchAnalysisMetricDefinitions.find(
      (metric) => metric.key === selectedMatchAnalysisMetricKey
    ) ?? hammarbyMatchAnalysisMetricDefinitions[0];
  const matchAnalysisRows: MatchAnalysisRoundRow[] = hammarbyMatchAnalysisRounds
    .map((roundData) => {
      const metricSample = roundData.metrics[selectedMatchAnalysisMetric.key];
      return {
        key: roundData.key,
        season: roundData.season,
        gameweek: roundData.gameweek,
        date: roundData.date,
        opponent: roundData.opponent,
        sourceMatchName: roundData.matchName,
        isHome: roundData.isHome,
        opponentTeamId: roundData.opponentTeamId,
        sourceUrl: roundData.sourceUrl,
        value: metricSample.value,
        seasonAverage: metricSample.seasonAverage,
        periods: metricSample.periods,
        deltaFromPrevious: null,
      };
    })
    .sort((a, b) => {
      if (a.season !== b.season) return a.season - b.season;
      return a.gameweek - b.gameweek;
    })
    .map((row, index, items) => {
      const previous =
        index > 0 && items[index - 1].season === row.season ? items[index - 1] : null;
      return {
        ...row,
        deltaFromPrevious: previous ? row.value - previous.value : null,
      };
    });
  const seasonRows = matchAnalysisRows.filter((row) => row.season === selectedMatchAnalysisSeason);
  const fallbackRoundAKey = seasonRows[0]?.key ?? "";
  const fallbackRoundBKey = seasonRows[seasonRows.length - 1]?.key ?? "";
  const effectiveComparisonRoundA = seasonRows.some((row) => row.key === comparisonRoundA)
    ? comparisonRoundA
    : fallbackRoundAKey;
  const effectiveComparisonRoundB = seasonRows.some((row) => row.key === comparisonRoundB)
    ? comparisonRoundB
    : fallbackRoundBKey;
  const effectiveRoundVsSeasonRound = seasonRows.some((row) => row.key === roundVsSeasonRound)
    ? roundVsSeasonRound
    : fallbackRoundBKey;

  const latestMatchAnalysisRow = seasonRows[seasonRows.length - 1] ?? null;
  const matchAnalysisAverage =
    seasonRows.reduce((sum, row) => sum + row.value, 0) / Math.max(seasonRows.length, 1);
  const matchAnalysisTrendDelta =
    seasonRows.length >= 2
      ? seasonRows[seasonRows.length - 1].value - seasonRows[0].value
      : 0;
  const latestVsSeasonAverageDelta = latestMatchAnalysisRow
    ? latestMatchAnalysisRow.value - latestMatchAnalysisRow.seasonAverage
    : 0;
  const seasonAverageReference = latestMatchAnalysisRow?.seasonAverage ?? 0;
  const averagePeriodValues = MATCH_ANALYSIS_PERIOD_LABELS.map((_, periodIndex) => {
    return (
      seasonRows.reduce((sum, row) => sum + row.periods[periodIndex], 0) /
      Math.max(seasonRows.length, 1)
    );
  });
  const seasonAverageRow =
    seasonRows.length > 0
      ? {
          key: `season-average-${selectedMatchAnalysisSeason}`,
          season: selectedMatchAnalysisSeason,
          value:
            seasonRows.reduce((sum, row) => sum + row.seasonAverage, 0) /
            Math.max(seasonRows.length, 1),
          periods: averagePeriodValues as [number, number, number, number, number, number],
        }
      : null;
  const seasonAverage2025 = matchAnalysisRows
    .filter((row) => row.season === 2025)
    .reduce(
      (acc, row, _, arr) => {
        acc.value += row.seasonAverage / arr.length;
        for (let i = 0; i < 6; i += 1) {
          acc.periods[i] += row.periods[i] / arr.length;
        }
        return acc;
      },
      { value: 0, periods: [0, 0, 0, 0, 0, 0] as [number, number, number, number, number, number] }
    );
  const hasSeason2025 = matchAnalysisRows.some((row) => row.season === 2025);
  const seasonAverage2026 = matchAnalysisRows
    .filter((row) => row.season === 2026)
    .reduce(
      (acc, row, _, arr) => {
        acc.value += row.seasonAverage / arr.length;
        for (let i = 0; i < 6; i += 1) {
          acc.periods[i] += row.periods[i] / arr.length;
        }
        return acc;
      },
      { value: 0, periods: [0, 0, 0, 0, 0, 0] as [number, number, number, number, number, number] }
    );
  const hasSeason2026 = matchAnalysisRows.some((row) => row.season === 2026);
  const seasonDelta2026Vs2025 =
    hasSeason2025 && hasSeason2026 ? seasonAverage2026.value - seasonAverage2025.value : 0;
  const seasonVsSeasonPeriodRows: SeasonVsSeasonPeriodRow[] =
    hasSeason2025 && hasSeason2026
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
          label,
          seasonAValue: seasonAverage2025.periods[index],
          seasonBValue: seasonAverage2026.periods[index],
          delta: seasonAverage2026.periods[index] - seasonAverage2025.periods[index],
        }))
      : [];
  const seasonAverage2025Value = hasSeason2025 ? seasonAverage2025.value : 0;
  const seasonAverage2026Value = hasSeason2026 ? seasonAverage2026.value : 0;
  const seasonAverageDifference = seasonAverage2026Value - seasonAverage2025Value;
  const seasonPeriods2025 = hasSeason2025 ? seasonAverage2025.periods : ([0, 0, 0, 0, 0, 0] as const);
  const seasonPeriods2026 = hasSeason2026 ? seasonAverage2026.periods : ([0, 0, 0, 0, 0, 0] as const);
  const crossSeasonRows2025 = matchAnalysisRows.filter((row) => row.season === 2025);
  const crossSeasonRows2026 = matchAnalysisRows.filter((row) => row.season === 2026);
  const fallbackCrossSeasonRound2025 = crossSeasonRows2025[0]?.key ?? "";
  const fallbackCrossSeasonRound2026 = crossSeasonRows2026[0]?.key ?? "";
  const [crossSeasonRound2025Key, setCrossSeasonRound2025Key] = useState<string>(
    fallbackCrossSeasonRound2025
  );
  const [crossSeasonRound2026Key, setCrossSeasonRound2026Key] = useState<string>(
    fallbackCrossSeasonRound2026
  );
  const effectiveCrossSeasonRound2025 = crossSeasonRows2025.some(
    (row) => row.key === crossSeasonRound2025Key
  )
    ? crossSeasonRound2025Key
    : fallbackCrossSeasonRound2025;
  const effectiveCrossSeasonRound2026 = crossSeasonRows2026.some(
    (row) => row.key === crossSeasonRound2026Key
  )
    ? crossSeasonRound2026Key
    : fallbackCrossSeasonRound2026;
  const crossSeasonRow2025 =
    crossSeasonRows2025.find((row) => row.key === effectiveCrossSeasonRound2025) ?? null;
  const crossSeasonRow2026 =
    crossSeasonRows2026.find((row) => row.key === effectiveCrossSeasonRound2026) ?? null;
  const crossSeasonDelta =
    crossSeasonRow2025 && crossSeasonRow2026 ? crossSeasonRow2026.value - crossSeasonRow2025.value : 0;
  const comparisonRowA = seasonRows.find((row) => row.key === effectiveComparisonRoundA) ?? null;
  const comparisonRowB = seasonRows.find((row) => row.key === effectiveComparisonRoundB) ?? null;
  const comparisonDelta =
    comparisonRowA && comparisonRowB ? comparisonRowB.value - comparisonRowA.value : 0;
  const comparisonPeriodRows: ComparisonPeriodRow[] =
    comparisonRowA && comparisonRowB
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
          label,
          roundAValue: comparisonRowA.periods[index],
          roundBValue: comparisonRowB.periods[index],
          delta: comparisonRowB.periods[index] - comparisonRowA.periods[index],
        }))
      : [];
  const roundVsSeasonRow = seasonRows.find((row) => row.key === effectiveRoundVsSeasonRound) ?? null;
  const roundVsSeasonDelta = roundVsSeasonRow
    ? roundVsSeasonRow.value - matchAnalysisAverage
    : 0;
  const roundVsSeasonPeriodRows: RoundVsSeasonPeriodRow[] = roundVsSeasonRow
    ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
        label,
        roundValue: roundVsSeasonRow.periods[index],
        seasonValue: averagePeriodValues[index],
        delta: roundVsSeasonRow.periods[index] - averagePeriodValues[index],
      }))
    : [];
  const previousSeason = roundVsSeasonRow ? roundVsSeasonRow.season - 1 : null;
  const strictHistoricalCandidates =
    roundVsSeasonRow && previousSeason
      ? matchAnalysisRows.filter((row) => {
          if (row.season !== previousSeason) return false;
          const sameOpponent =
            roundVsSeasonRow.opponentTeamId !== null && row.opponentTeamId !== null
              ? row.opponentTeamId === roundVsSeasonRow.opponentTeamId
              : normalizeOpponentName(row.opponent) === normalizeOpponentName(roundVsSeasonRow.opponent);
          return sameOpponent && row.isHome === roundVsSeasonRow.isHome;
        })
      : [];
  const fallbackHistoricalCandidates =
    roundVsSeasonRow && previousSeason && strictHistoricalCandidates.length === 0
      ? matchAnalysisRows.filter((row) => {
          if (row.season !== previousSeason) return false;
          return roundVsSeasonRow.opponentTeamId !== null && row.opponentTeamId !== null
            ? row.opponentTeamId === roundVsSeasonRow.opponentTeamId
            : normalizeOpponentName(row.opponent) === normalizeOpponentName(roundVsSeasonRow.opponent);
        })
      : [];
  const historicalComparisonCandidates: HistoricalComparisonCandidate[] = (
    strictHistoricalCandidates.length > 0
      ? strictHistoricalCandidates
      : fallbackHistoricalCandidates
  ).map((row) => ({
    key: row.key,
    label: `S${row.season} Omg ${row.gameweek} (${row.opponent})`,
    context: row.isHome ? "Hemma" : "Borta",
  }));

  const effectiveHistoricalComparisonKey =
    historicalComparisonCandidates.length === 0
      ? "none"
      : historicalComparisonCandidates.some(
            (candidate) => candidate.key === selectedHistoricalComparisonKey
          )
        ? selectedHistoricalComparisonKey
        : historicalComparisonCandidates[0].key;
  const historicalComparisonRow =
    effectiveHistoricalComparisonKey === "none"
      ? null
      : matchAnalysisRows.find((row) => row.key === effectiveHistoricalComparisonKey) ?? null;
  const historicalComparisonPeriodRows: ComparisonPeriodRow[] =
    roundVsSeasonRow && historicalComparisonRow
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
          label,
          roundAValue: historicalComparisonRow.periods[index],
          roundBValue: roundVsSeasonRow.periods[index],
          delta: roundVsSeasonRow.periods[index] - historicalComparisonRow.periods[index],
        }))
      : [];

  const chart = {
    width: 760,
    height: 260,
    padding: { top: 16, right: 18, bottom: 56, left: 48 },
  };
  const plotWidth = chart.width - chart.padding.left - chart.padding.right;
  const plotHeight = chart.height - chart.padding.top - chart.padding.bottom;
  const xFor = (index: number) => {
    if (trendPoints.length <= 1) return chart.padding.left + plotWidth / 2;
    return chart.padding.left + (index / (trendPoints.length - 1)) * plotWidth;
  };

  let minY = 0;
  let maxY = 1;
  if (selectedTrendMetric.format === "percent") {
    maxY = 100;
  } else if (trendPoints.length > 0) {
    const values = trendPoints.map((point) => point.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const range = Math.max(rawMax - rawMin, 1);
    minY = Math.max(0, rawMin - range * 0.2);
    maxY = rawMax + range * 0.2;
  }
  const yRange = Math.max(maxY - minY, 1);
  const yFor = (value: number) =>
    chart.padding.top + ((maxY - value) / yRange) * plotHeight;
  const yTicks = Array.from({ length: 5 }, (_, index) => {
    const value = minY + ((maxY - minY) * index) / 4;
    return value;
  });
  const trendPath = trendPoints
    .map((point, index) => {
      const x = xFor(index);
      const y = yFor(point.value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  if (!current || current.stats.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-slate-300">Ingen matchstatistik tillgänglig för detta val.</p>
          <Link href="/" className="mt-4 inline-flex text-sm text-blue-300 hover:text-blue-200">
            ← Till startsidan
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Matchstatistik</p>
          <h1 className="text-2xl font-bold text-white">{current.title}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {current.subtitle} • {current.dateText}
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                item.active
                  ? "border-blue-500/40 bg-blue-500/20 text-blue-200"
                  : "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-slate-600">•</span>
          <Link href="/lopdata" className="text-xs text-green-300 hover:text-green-200">
            Löpdata
          </Link>
          <Link href="/lopdata/trender" className="text-xs text-purple-300 hover:text-purple-200">
            Spelartrender
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-500/50 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-slate-300 hover:bg-slate-800"
          >
            🏠 Huvudsida
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.leftTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.home ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.rightTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.away ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby xG</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {(
                current.leftTeam === "Hammarby"
                  ? current.stats.find((stat) => stat.key === "xg")?.home
                  : current.stats.find((stat) => stat.key === "xg")?.away
              )?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-xs text-slate-500">Förväntade mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby bollinnehav</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.leftTeam === "Hammarby"
                ? `${current.stats.find((stat) => stat.key === "possession")?.home ?? 0}%`
                : `${current.stats.find((stat) => stat.key === "possession")?.away ?? 0}%`}
            </p>
            <p className="text-xs text-slate-500">Andel av boll</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Nyckeltal</h2>
          <p className="mt-1 text-sm text-slate-400">
            Jämförelse per lag med fokus på målproduktion, passningsspel och defensiv disciplin.
          </p>
          <div className="mt-5 space-y-4">
            {current.stats.map((stat) => {
              const leftWidth = getBarWidth(stat.home, stat.away);
              const rightWidth = 100 - leftWidth;
              return (
                <div key={stat.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-blue-200">
                      {formatValue(stat.home, stat.format)}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </span>
                    <span className="font-mono text-green-200">
                      {formatValue(stat.away, stat.format)}
                    </span>
                  </div>
                  <div className="flex h-3 gap-1 rounded-full bg-slate-700/60">
                    <div
                      className="rounded-l-full"
                      style={{
                        width: `${leftWidth}%`,
                        background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                      }}
                    />
                    <div
                      className="rounded-r-full"
                      style={{
                        width: `${rightWidth}%`,
                        background: "linear-gradient(90deg, #16a34a, #4ade80)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Säsongssnitt: 2025 vs 2026 (vald KPI)
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Snabb överblick av skillnad i KPI-snitt mellan säsongerna.
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300">
              Byt KPI här
              <select
                value={selectedMatchAnalysisMetricKey}
                onChange={(event) =>
                  setSelectedMatchAnalysisMetricKey(
                    event.target.value as MatchAnalysisMetricKey
                  )
                }
                className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
              >
                {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
                  <option key={`season-summary-kpi-${metric.key}`} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
              <p className="text-slate-400">Säsong 2025</p>
              <p className="mt-1 text-base font-semibold text-white">
                {seasonAverage2025
                  ? formatMatchAnalysisValue(seasonAverage2025.value, selectedMatchAnalysisMetric)
                  : "–"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
              <p className="text-slate-400">Säsong 2026</p>
              <p className="mt-1 text-base font-semibold text-white">
                {seasonAverage2026
                  ? formatMatchAnalysisValue(seasonAverage2026.value, selectedMatchAnalysisMetric)
                  : "–"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
              <p className="text-slate-400">Skillnad (2026 - 2025)</p>
              <p
                className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                  seasonDelta2026Vs2025,
                  selectedMatchAnalysisMetric.direction
                )}`}
              >
                {formatMatchAnalysisDelta(seasonDelta2026Vs2025, selectedMatchAnalysisMetric)}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {getMatchAnalysisDeltaMeaning(
                  seasonDelta2026Vs2025,
                  selectedMatchAnalysisMetric.direction
                )}
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
            {MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => {
              const periodDelta = seasonPeriods2026[index] - seasonPeriods2025[index];
              return (
                <div
                  key={`season-delta-period-${label}`}
                  className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                >
                  <p className="text-slate-500">{label}</p>
                  <p className="text-slate-300">
                    {formatMatchAnalysisValue(seasonPeriods2025[index], selectedMatchAnalysisMetric)} vs{" "}
                    {formatMatchAnalysisValue(seasonPeriods2026[index], selectedMatchAnalysisMetric)}
                  </p>
                  <p
                    className={`font-semibold ${getMatchAnalysisDeltaTone(
                      periodDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(periodDelta, selectedMatchAnalysisMetric)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Trend omgång för omgång (Hammarby)
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Jämför hur Hammarby utvecklas mellan omgångarna inom valda nyckeltal.
              </p>
            </div>
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              Parameter
              <select
                value={selectedTrendMetricKey}
                onChange={(event) =>
                  setSelectedTrendMetricKey(event.target.value as TrendMetricKey)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {TREND_METRIC_OPTIONS.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-3 text-xs text-slate-300 md:grid-cols-3">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Senast</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(
                  trendPoints[trendPoints.length - 1]?.value ?? 0,
                  selectedTrendMetric.format
                )}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Snitt</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(trendAverage, selectedTrendMetric.format)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Trend (första → senaste)</p>
              <p
                className={`mt-1 text-base font-semibold ${
                  trendDelta >= 0 ? "text-green-300" : "text-rose-300"
                }`}
              >
                {trendDelta >= 0 ? "+" : ""}
                {formatCompactValue(trendDelta, selectedTrendMetric.format)}
                {selectedTrendMetric.format === "percent" ? "p" : ""}
              </p>
            </div>
          </div>

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
                    {formatCompactValue(tickValue, selectedTrendMetric.format)}
                  </text>
                </g>
              ))}

              {trendPoints.map((point, index) => (
                <g key={point.gameweek}>
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
                    y={chart.height - 24}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    Omg {point.gameweek}
                  </text>
                  <text
                    x={xFor(index)}
                    y={chart.height - 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                  >
                    {formatDate(point.date)}
                  </text>
                </g>
              ))}

              {trendPath && (
                <path
                  d={trendPath}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              )}

              {trendPoints.map((point, index) => (
                <g key={`point-${point.gameweek}`}>
                  <circle cx={xFor(index)} cy={yFor(point.value)} r="5" fill="#22c55e" />
                  <text
                    x={xFor(index)}
                    y={yFor(point.value) - 10}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {formatCompactValue(point.value, selectedTrendMetric.format)}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-slate-400 md:grid-cols-2">
            {trendPoints.map((point) => (
              <div
                key={`legend-${point.gameweek}`}
                className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2"
              >
                Omgång {point.gameweek}: {point.opponent} ({formatDate(point.date)})
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Matchanalys omgång för omgång (Hammarby KPI)
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Hammarbys egna matchanalys-metriker per omgång med perioder 0-15 till 75-FT.
              </p>
            </div>
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              KPI
              <select
                value={selectedMatchAnalysisMetricKey}
                onChange={(event) =>
                  setSelectedMatchAnalysisMetricKey(
                    event.target.value as MatchAnalysisMetricKey
                  )
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Tolkning:{" "}
            {selectedMatchAnalysisMetric.direction === "higher"
              ? "högre värde är oftast bättre för den här KPI:n."
              : "lägre värde är oftast bättre för den här KPI:n."}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Färgkodning: <span className="font-semibold text-green-300">Grön = bättre</span>,{" "}
            <span className="font-semibold text-rose-300">Röd = sämre</span> enligt vald KPI
            (inte alltid plus/minus i sig).
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs text-slate-300">
              Säsong
              <select
                value={selectedMatchAnalysisSeason}
                onChange={(event) => setSelectedMatchAnalysisSeason(Number(event.target.value))}
                className="rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
              >
                {MATCH_ANALYSIS_AVAILABLE_SEASONS.map((seasonValue) => (
                  <option key={`analysis-season-${seasonValue}`} value={seasonValue}>
                    {seasonValue}
                  </option>
                ))}
              </select>
            </label>
            {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
              <button
                key={`quick-metric-${metric.key}`}
                type="button"
                onClick={() => setSelectedMatchAnalysisMetricKey(metric.key)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  metric.key === selectedMatchAnalysisMetricKey
                    ? "border-blue-500/40 bg-blue-500/20 text-blue-100"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 text-xs text-slate-300 md:grid-cols-4">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Senaste omgång</p>
              <p className="mt-1 text-base font-semibold text-white">
                {latestMatchAnalysisRow
                  ? formatMatchAnalysisValue(
                      latestMatchAnalysisRow.value,
                      selectedMatchAnalysisMetric
                    )
                  : "–"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Snitt (omgångar)</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatMatchAnalysisValue(matchAnalysisAverage, selectedMatchAnalysisMetric)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Senaste vs säsongssnitt</p>
              <p
                className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                  latestVsSeasonAverageDelta,
                  selectedMatchAnalysisMetric.direction
                )}`}
              >
                {formatMatchAnalysisDelta(
                  latestVsSeasonAverageDelta,
                  selectedMatchAnalysisMetric
                )}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2">
              <p className="text-slate-400">Trend (första → senaste)</p>
              <p
                className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                  matchAnalysisTrendDelta,
                  selectedMatchAnalysisMetric.direction
                )}`}
              >
                {formatMatchAnalysisDelta(matchAnalysisTrendDelta, selectedMatchAnalysisMetric)}
              </p>
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowSeasonRows((currentValue) => !currentValue)}
              className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-left text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              {showSeasonRows ? "Dölj omgångslista" : "Visa omgångslista"}
            </button>
          </div>

          {comparisonRowA && comparisonRowB && (
            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">Jämför två omgångar</h3>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  Byt KPI här
                  <select
                    value={selectedMatchAnalysisMetricKey}
                    onChange={(event) =>
                      setSelectedMatchAnalysisMetricKey(
                        event.target.value as MatchAnalysisMetricKey
                      )
                    }
                    className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                  >
                    {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
                      <option key={`comparison-kpi-${metric.key}`} value={metric.key}>
                        {metric.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Snabbt sätt att se skillnad mot säsongsnivån.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                KPI (samma för alla jämförelser):{" "}
                <span className="font-semibold text-slate-200">
                  {selectedMatchAnalysisMetric.label}
                </span>
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-xs text-slate-300">
                  Omgång A
                  <select
                    value={comparisonRoundA}
                    onChange={(event) => setComparisonRoundA(event.target.value)}
                    className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                  >
                    {seasonRows.map((row) => (
                      <option key={`round-a-${row.key}`} value={row.key}>
                        Omgång {row.gameweek} ({row.opponent})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs text-slate-300">
                  Omgång B
                  <select
                    value={comparisonRoundB}
                    onChange={(event) => setComparisonRoundB(event.target.value)}
                    className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                  >
                    {seasonRows.map((row) => (
                      <option key={`round-b-${row.key}`} value={row.key}>
                        Omgång {row.gameweek} ({row.opponent})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {historicalComparisonRow && (
                <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
                  <p className="text-xs text-slate-400">
                    Periodskillnad (2025 motsvarande → vald omgång 2026)
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                    {historicalComparisonPeriodRows.map((periodRow) => (
                      <div
                        key={`historical-period-${periodRow.label}`}
                        className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                      >
                        <p className="text-slate-500">{periodRow.label}</p>
                        <p className="text-slate-300">
                          {formatMatchAnalysisValue(
                            periodRow.roundAValue,
                            selectedMatchAnalysisMetric
                          )}{" "}
                          →{" "}
                          {formatMatchAnalysisValue(
                            periodRow.roundBValue,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                        <p
                          className={`font-semibold ${getMatchAnalysisDeltaTone(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}`}
                        >
                          {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {getMatchAnalysisDeltaMeaning(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {historicalComparisonPeriodRows.length > 0 && (
                <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
                  <p className="text-xs text-slate-400">Periodskillnad mot motsvarande 2025</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                    {historicalComparisonPeriodRows.map((periodRow) => (
                      <div
                        key={`historical-period-${periodRow.label}`}
                        className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                      >
                        <p className="text-slate-500">{periodRow.label}</p>
                        <p className="text-slate-300">
                          {formatMatchAnalysisValue(
                            periodRow.roundAValue,
                            selectedMatchAnalysisMetric
                          )}{" "}
                          →{" "}
                          {formatMatchAnalysisValue(
                            periodRow.roundBValue,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                        <p
                          className={`font-semibold ${getMatchAnalysisDeltaTone(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}`}
                        >
                          {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {getMatchAnalysisDeltaMeaning(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">
                    Omg {comparisonRowA.gameweek} → Omg {comparisonRowB.gameweek}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(comparisonRowA.value, selectedMatchAnalysisMetric)} →{" "}
                    {formatMatchAnalysisValue(comparisonRowB.value, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Skillnad mellan valda omgångar</p>
                  <p
                    className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                      comparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(comparisonDelta, selectedMatchAnalysisMetric)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {getMatchAnalysisDeltaMeaning(
                      comparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Säsongssnitt (referens)</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      seasonAverageReference,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
              </div>

              {comparisonPeriodRows.length > 0 && (
                <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
                  <p className="text-xs text-slate-400">
                    Periodskillnad (Omgång {comparisonRowA.gameweek} → Omgång{" "}
                    {comparisonRowB.gameweek})
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                    {comparisonPeriodRows.map((periodRow) => (
                      <div
                        key={`comparison-period-${periodRow.label}`}
                        className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                      >
                        <p className="text-slate-500">{periodRow.label}</p>
                        <p className="text-slate-300">
                          {formatMatchAnalysisValue(
                            periodRow.roundAValue,
                            selectedMatchAnalysisMetric
                          )}{" "}
                          →{" "}
                          {formatMatchAnalysisValue(
                            periodRow.roundBValue,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                        <p
                          className={`font-semibold ${getMatchAnalysisDeltaTone(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}`}
                        >
                          {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {getMatchAnalysisDeltaMeaning(
                            periodRow.delta,
                            selectedMatchAnalysisMetric.direction
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
            <h3 className="text-sm font-semibold text-white">
              Jämför 2025 vs 2026 (valfri omgång)
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Välj en omgång från varje säsong för direkt KPI-jämförelse.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Omgång 2025
                <select
                  value={crossSeasonRound2025Key}
                  onChange={(event) => setCrossSeasonRound2025Key(event.target.value)}
                  className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                >
                  {crossSeasonRows2025.map((row) => (
                    <option key={`cross-2025-${row.key}`} value={row.key}>
                      Omgång {row.gameweek} ({row.opponent})
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Omgång 2026
                <select
                  value={crossSeasonRound2026Key}
                  onChange={(event) => setCrossSeasonRound2026Key(event.target.value)}
                  className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                >
                  {crossSeasonRows2026.map((row) => (
                    <option key={`cross-2026-${row.key}`} value={row.key}>
                      Omgång {row.gameweek} ({row.opponent})
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {crossSeasonRow2025 && crossSeasonRow2026 && (
              <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">2025</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(crossSeasonRow2025.value, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">2026</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(crossSeasonRow2026.value, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Skillnad (2026 - 2025)</p>
                  <p
                    className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                      crossSeasonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(crossSeasonDelta, selectedMatchAnalysisMetric)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {getMatchAnalysisDeltaMeaning(
                      crossSeasonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {roundVsSeasonRow && (
            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  Jämför omgång mot säsongssnitt
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    Omgång
                    <select
                      value={roundVsSeasonRound}
                      onChange={(event) => setRoundVsSeasonRound(event.target.value)}
                      className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {seasonRows.map((row) => (
                        <option key={`season-vs-round-${row.key}`} value={row.key}>
                          Omgång {row.gameweek} ({row.opponent})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    Byt KPI här
                    <select
                      value={selectedMatchAnalysisMetricKey}
                      onChange={(event) =>
                        setSelectedMatchAnalysisMetricKey(
                          event.target.value as MatchAnalysisMetricKey
                        )
                      }
                      className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
                        <option key={`round-vs-season-kpi-${metric.key}`} value={metric.key}>
                          {metric.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                KPI (samma för alla jämförelser):{" "}
                <span className="font-semibold text-slate-200">
                  {selectedMatchAnalysisMetric.label}
                </span>
              </p>

              <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
                <p className="text-xs font-semibold text-slate-100">
                  Jämför säsongssnitt 2025 vs 2026
                </p>
                <div className="mt-2 grid gap-2 text-[11px] text-slate-300 sm:grid-cols-3">
                  <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                    <p className="text-slate-500">Snitt 2025</p>
                    <p className="font-semibold text-white">
                      {formatMatchAnalysisValue(seasonAverage2025Value, selectedMatchAnalysisMetric)}
                    </p>
                  </div>
                  <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                    <p className="text-slate-500">Snitt 2026</p>
                    <p className="font-semibold text-white">
                      {formatMatchAnalysisValue(seasonAverage2026Value, selectedMatchAnalysisMetric)}
                    </p>
                  </div>
                  <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                    <p className="text-slate-500">Skillnad (2026 - 2025)</p>
                    <p
                      className={`font-semibold ${getMatchAnalysisDeltaTone(
                        seasonAverageDifference,
                        selectedMatchAnalysisMetric.direction
                      )}`}
                    >
                      {formatMatchAnalysisDelta(
                        seasonAverageDifference,
                        selectedMatchAnalysisMetric
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {getMatchAnalysisDeltaMeaning(
                        seasonAverageDifference,
                        selectedMatchAnalysisMetric.direction
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {selectedMatchAnalysisSeason === 2026 &&
                roundVsSeasonRow &&
                previousSeason &&
                historicalComparisonCandidates.length > 0 && (
                  <div className="mt-3 rounded-lg border border-blue-500/25 bg-slate-900/70 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold text-blue-200">
                        Jämför med motsvarande match {previousSeason}
                      </p>
                      <select
                        value={selectedHistoricalComparisonKey}
                        onChange={(event) =>
                          setSelectedHistoricalComparisonKey(event.target.value)
                        }
                        className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                      >
                        <option value="none">Välj match</option>
                        {historicalComparisonCandidates.map((candidate) => (
                          <option key={`historical-candidate-${candidate.key}`} value={candidate.key}>
                            {candidate.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Jämförelsen använder samma KPI och perioder (0-15 till 75-FT).
                    </p>
                    {historicalComparisonRow && (
                      <div className="mt-3 grid gap-2 text-[11px] text-slate-300 sm:grid-cols-3">
                        <div className="rounded border border-slate-700/60 bg-slate-950/70 px-2 py-1.5">
                          <p className="text-slate-500">Nuvarande ({roundVsSeasonRow.season})</p>
                          <p className="font-semibold text-white">
                            {formatMatchAnalysisValue(
                              roundVsSeasonRow.value,
                              selectedMatchAnalysisMetric
                            )}
                          </p>
                        </div>
                        <div className="rounded border border-slate-700/60 bg-slate-950/70 px-2 py-1.5">
                          <p className="text-slate-500">Motsvarande {previousSeason}</p>
                          <p className="font-semibold text-white">
                            {formatMatchAnalysisValue(
                              historicalComparisonRow.value,
                              selectedMatchAnalysisMetric
                            )}
                          </p>
                        </div>
                        <div className="rounded border border-slate-700/60 bg-slate-950/70 px-2 py-1.5">
                          <p className="text-slate-500">
                            Skillnad ({roundVsSeasonRow.season} - {previousSeason})
                          </p>
                          <p
                            className={`font-semibold ${getMatchAnalysisDeltaTone(
                              roundVsSeasonRow.value - historicalComparisonRow.value,
                              selectedMatchAnalysisMetric.direction
                            )}`}
                          >
                            {formatMatchAnalysisDelta(
                              roundVsSeasonRow.value - historicalComparisonRow.value,
                              selectedMatchAnalysisMetric
                            )}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {getMatchAnalysisDeltaMeaning(
                              roundVsSeasonRow.value - historicalComparisonRow.value,
                              selectedMatchAnalysisMetric.direction
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                    {historicalComparisonRow && historicalComparisonPeriodRows.length > 0 && (
                      <div className="mt-3 rounded border border-slate-700/60 bg-slate-950/60 p-2 text-[11px]">
                        <p className="text-slate-500">
                          Perioder: {roundVsSeasonRow.sourceMatchName} vs{" "}
                          {historicalComparisonRow.sourceMatchName}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {historicalComparisonPeriodRows.map((periodRow) => (
                            <div
                              key={`historical-period-${periodRow.label}`}
                              className="rounded border border-slate-700/60 bg-slate-900/70 px-2 py-1.5"
                            >
                              <p className="text-slate-500">{periodRow.label}</p>
                              <p className="text-slate-300">
                                {formatMatchAnalysisValue(
                                  periodRow.roundAValue,
                                  selectedMatchAnalysisMetric
                                )}{" "}
                                vs{" "}
                                {formatMatchAnalysisValue(
                                  periodRow.roundBValue,
                                  selectedMatchAnalysisMetric
                                )}
                              </p>
                              <p
                                className={`font-semibold ${getMatchAnalysisDeltaTone(
                                  periodRow.delta,
                                  selectedMatchAnalysisMetric.direction
                                )}`}
                              >
                                {formatMatchAnalysisDelta(
                                  periodRow.delta,
                                  selectedMatchAnalysisMetric
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Vald omgång</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(roundVsSeasonRow.value, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Säsongssnitt</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(matchAnalysisAverage, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Skillnad (omgång - snitt)</p>
                  <p
                    className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                      roundVsSeasonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(roundVsSeasonDelta, selectedMatchAnalysisMetric)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {getMatchAnalysisDeltaMeaning(
                      roundVsSeasonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                {roundVsSeasonPeriodRows.map((periodRow) => (
                  <div
                    key={`round-vs-season-${periodRow.label}`}
                    className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                  >
                    <p className="text-slate-500">{periodRow.label}</p>
                    <p className="text-slate-300">
                      {formatMatchAnalysisValue(
                        periodRow.roundValue,
                        selectedMatchAnalysisMetric
                      )}{" "}
                      vs{" "}
                      {formatMatchAnalysisValue(
                        periodRow.seasonValue,
                        selectedMatchAnalysisMetric
                      )}
                    </p>
                    <p
                      className={`font-semibold ${getMatchAnalysisDeltaTone(
                        periodRow.delta,
                        selectedMatchAnalysisMetric.direction
                      )}`}
                    >
                      {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {getMatchAnalysisDeltaMeaning(
                        periodRow.delta,
                        selectedMatchAnalysisMetric.direction
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:hidden">
            <p className="text-[11px] text-slate-500">
              Kompakt lista: visar vald säsong. Full tabell finns på större skärm.
            </p>
            {seasonRows.map((row) => (
              <article
                key={`mobile-analysis-${row.key}`}
                className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Omgång {row.gameweek}</p>
                    <p className="text-xs text-slate-400">
                      {row.opponent} • {formatDate(row.date)}
                    </p>
                  </div>
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-300 hover:text-blue-200"
                  >
                    Matchanalys
                  </a>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                    <p className="text-slate-400">Värde</p>
                    <p className="font-semibold text-white">
                      {formatMatchAnalysisValue(row.value, selectedMatchAnalysisMetric)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                    <p className="text-slate-400">Δ mot förra</p>
                    <p
                      className={`font-semibold ${
                        row.deltaFromPrevious === null
                          ? "text-slate-300"
                          : getMatchAnalysisDeltaTone(
                              row.deltaFromPrevious,
                              selectedMatchAnalysisMetric.direction
                            )
                      }`}
                    >
                      {row.deltaFromPrevious === null
                        ? "–"
                        : formatMatchAnalysisDelta(
                            row.deltaFromPrevious,
                            selectedMatchAnalysisMetric
                          )}
                    </p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1 text-[11px]">
                  {MATCH_ANALYSIS_PERIOD_LABELS.map((label, idx) => (
                    <div
                      key={`mobile-period-${row.gameweek}-${label}`}
                      className="rounded border border-slate-700/60 bg-slate-950/50 px-1.5 py-1"
                    >
                      <p className="text-slate-500">{label}</p>
                      <p className="text-slate-200">
                        {formatMatchAnalysisValue(row.periods[idx], selectedMatchAnalysisMetric)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="min-w-[900px] table-fixed border-separate border-spacing-0 text-xs">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-36 border border-slate-700/60 bg-slate-900 px-2 py-2 text-left text-slate-300">
                    Omgång
                  </th>
                  <th className="w-24 border border-slate-700/60 bg-slate-900 px-2 py-2 text-left text-slate-300">
                    Värde
                  </th>
                  <th className="w-24 border border-slate-700/60 bg-slate-900 px-2 py-2 text-left text-slate-300">
                    Δ mot förra
                  </th>
                  {MATCH_ANALYSIS_PERIOD_LABELS.map((label) => (
                    <th
                      key={label}
                      className="w-24 border border-slate-700/60 bg-slate-900 px-2 py-2 text-left text-slate-300"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasonRows.map((row) => (
                  <tr key={`analysis-${row.key}`}>
                    <th className="sticky left-0 z-10 border border-slate-700/60 bg-slate-950 px-2 py-2 text-left font-medium text-slate-100">
                      <div>Omg {row.gameweek}</div>
                      <div className="text-[10px] text-slate-400">
                        {row.opponent}, {formatDate(row.date)}
                      </div>
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-300 hover:text-blue-200"
                      >
                        Matchanalys
                      </a>
                    </th>
                    <td className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 font-semibold text-white">
                      {formatMatchAnalysisValue(row.value, selectedMatchAnalysisMetric)}
                    </td>
                    <td
                      className={`border border-slate-700/60 bg-slate-900/70 px-2 py-2 ${
                        row.deltaFromPrevious === null
                          ? "text-slate-400"
                          : getMatchAnalysisDeltaTone(
                              row.deltaFromPrevious,
                              selectedMatchAnalysisMetric.direction
                            )
                      }`}
                    >
                      {row.deltaFromPrevious === null
                        ? "–"
                        : formatMatchAnalysisDelta(
                            row.deltaFromPrevious,
                            selectedMatchAnalysisMetric
                          )}
                    </td>
                    {row.periods.map((periodValue, index) => (
                      <td
                        key={`period-${row.gameweek}-${index}`}
                        className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 text-slate-200"
                      >
                        {formatMatchAnalysisValue(periodValue, selectedMatchAnalysisMetric)}
                      </td>
                    ))}
                  </tr>
                ))}
                {seasonAverageRow && (
                  <tr>
                    <th className="sticky left-0 z-10 border border-slate-700/60 bg-slate-950 px-2 py-2 text-left font-semibold text-slate-100">
                      Säsongssnitt ({selectedMatchAnalysisSeason})
                    </th>
                    <td className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 font-semibold text-white">
                      {formatMatchAnalysisValue(seasonAverageRow.value, selectedMatchAnalysisMetric)}
                    </td>
                    <td className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 text-slate-400">
                      –
                    </td>
                    {seasonAverageRow.periods.map((periodAverage, index) => (
                      <td
                        key={`season-period-row-${selectedMatchAnalysisSeason}-${index}`}
                        className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 text-slate-200"
                      >
                        {formatMatchAnalysisValue(periodAverage, selectedMatchAnalysisMetric)}
                      </td>
                    ))}
                  </tr>
                )}
                <tr>
                  <th className="sticky left-0 z-10 border border-slate-700/60 bg-slate-950 px-2 py-2 text-left font-semibold text-slate-100">
                    Snitt (valda omgångar)
                  </th>
                  <td className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 font-semibold text-white">
                    {formatMatchAnalysisValue(matchAnalysisAverage, selectedMatchAnalysisMetric)}
                  </td>
                  <td className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 text-slate-400">
                    –
                  </td>
                  {averagePeriodValues.map((periodAverage, index) => (
                    <td
                      key={`season-period-${index}`}
                      className="border border-slate-700/60 bg-slate-900/70 px-2 py-2 text-slate-200"
                    >
                      {formatMatchAnalysisValue(periodAverage, selectedMatchAnalysisMetric)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            Datakälla:{" "}
            <a
              href={current.sourceUrl ?? "https://bolldata.se/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200"
            >
              bolldata.se
            </a>
            . Kombinerat-läget summerar räknetal (mål, avslut, passningar osv.) och
            använder snitt för procenttal. Matchanalys KPI bygger på Hammarbys matchanalys
            (Twelve/Wyscout) för Allsvenskan 2025-2026 per omgång.
          </p>
        </footer>
      </main>
    </div>
  );
}
