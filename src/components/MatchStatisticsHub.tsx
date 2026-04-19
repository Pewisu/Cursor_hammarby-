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
import {
  hammarbyRoundPlayerHighlights,
  type HammarbyRoundHighlight,
} from "@/lib/hammarbyRoundPlayerHighlightsData";

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

type RoundVsDualSeasonPeriodRow = {
  label: string;
  roundValue: number;
  season2026Value: number | null;
  season2025Value: number | null;
  deltaVs2026: number | null;
  deltaVs2025: number | null;
};

type HistoricalComparisonCandidate = {
  key: string;
  label: string;
  context: string;
  isRecommended: boolean;
};

type SeasonVsSeasonPeriodRow = {
  label: string;
  seasonAValue: number;
  seasonBValue: number;
  delta: number;
};

type MatchAnalysisAverage = {
  value: number;
  periods: [number, number, number, number, number, number];
  matches: number;
};


type SeasonComparisonMode = "full" | "played";
type MatchAnalysisViewMode = "round" | "season-average";
type HistoricalComparisonMode = "recommended" | "any";

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

type HighlightTone = "cyan" | "emerald" | "amber" | "violet";

type PlaystyleLensDefinition = {
  id: string;
  title: string;
  icon: string;
  description: string;
  tone: HighlightTone;
  primaryMetricKey: MatchAnalysisMetricKey;
  secondaryMetricKey?: MatchAnalysisMetricKey;
};

type PlaystyleMetricSnapshot = {
  metric: MatchAnalysisMetricDefinition;
  currentValue: number;
  average2026: number | null;
  average2025: number | null;
  deltaVs2026: number | null;
  deltaVs2025: number | null;
};

type PlaystyleProfileCard = {
  id: string;
  title: string;
  icon: string;
  description: string;
  tone: HighlightTone;
  primary: PlaystyleMetricSnapshot;
  secondary: PlaystyleMetricSnapshot | null;
};

const HIGHLIGHT_TONE_STYLES: Record<
  HighlightTone,
  { border: string; bg: string; text: string; chip: string }
> = {
  cyan: {
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    text: "text-cyan-200",
    chip: "bg-cyan-500/20 text-cyan-100",
  },
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-200",
    chip: "bg-emerald-500/20 text-emerald-100",
  },
  amber: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-200",
    chip: "bg-amber-500/20 text-amber-100",
  },
  violet: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-200",
    chip: "bg-violet-500/20 text-violet-100",
  },
};

const MATCH_ANALYSIS_METRIC_DEFINITION_BY_KEY = new Map(
  hammarbyMatchAnalysisMetricDefinitions.map((metric) => [metric.key, metric] as const)
);

const PLAYSTYLE_LENS_DEFINITIONS: PlaystyleLensDefinition[] = [
  {
    id: "control",
    title: "Kontrollspel",
    icon: "🧭",
    description: "Hur väl Hammarby styr matchbilden med boll och etablering.",
    tone: "violet",
    primaryMetricKey: "ball_possession_pct",
    secondaryMetricKey: "num_possessions_final_third",
  },
  {
    id: "penetration",
    title: "Genombrottshot",
    icon: "⚡",
    description: "Hur ofta laget kommer till farliga ytor och skapar framåthot.",
    tone: "amber",
    primaryMetricKey: "num_box_entries",
    secondaryMetricKey: "xt",
  },
  {
    id: "pressing",
    title: "Press & återerövring",
    icon: "🔁",
    description: "Intensitet i återerövring och press på motståndaren.",
    tone: "emerald",
    primaryMetricKey: "num_recoveries_att_half",
    secondaryMetricKey: "ppda",
  },
  {
    id: "defensive-balance",
    title: "Defensiv balans",
    icon: "🛡️",
    description: "Hur väl laget begränsar motståndarens chanskvalitet.",
    tone: "cyan",
    primaryMetricKey: "opp_np_xg",
    secondaryMetricKey: "defensive_action_height_m",
  },
];

const MATCH_ANALYSIS_ROUND_BY_KEY = new Map(
  hammarbyMatchAnalysisRounds.map((roundRow) => [roundRow.key, roundRow] as const)
);

const MATCH_ANALYSIS_SEASON_METRIC_AVERAGES = new Map<
  number,
  Partial<Record<MatchAnalysisMetricKey, number>>
>(
  Array.from(new Set(hammarbyMatchAnalysisRounds.map((row) => row.season)))
    .sort((a, b) => a - b)
    .map((season) => {
      const seasonRows = hammarbyMatchAnalysisRounds.filter((row) => row.season === season);
      const averagesByMetric: Partial<Record<MatchAnalysisMetricKey, number>> = {};
      if (seasonRows.length === 0) {
        return [season, averagesByMetric] as const;
      }

      for (const metric of hammarbyMatchAnalysisMetricDefinitions) {
        averagesByMetric[metric.key] =
          seasonRows.reduce((sum, row) => sum + row.metrics[metric.key].value, 0) /
          seasonRows.length;
      }
      return [season, averagesByMetric] as const;
    })
);

function getRoundHighlightCards(roundData: HammarbyRoundHighlight) {
  return roundData.players.map((player, index) => {
    const toneByCategory: Record<
      HammarbyRoundHighlight["players"][number]["category"],
      HighlightTone
    > = {
      creative: "violet",
      finishing: "amber",
      recoveries: "emerald",
      distribution: "cyan",
    };

    return {
      id: `${player.category}-${player.playerId}-${index}`,
      title: player.badge,
      icon:
        player.category === "creative"
          ? "🪄"
          : player.category === "finishing"
            ? "🎯"
            : player.category === "recoveries"
              ? "🛡️"
              : "🧠",
      tone: toneByCategory[player.category],
      player,
      metricLabel: `${player.primaryStatLabel} / ${player.secondaryStatLabel}`,
      metricValue: `${player.primaryStatValue} ${player.primaryStatLabel.toLowerCase()} • ${player.secondaryStatValue} ${player.secondaryStatLabel.toLowerCase()}`,
    };
  });
}

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
const PREFERRED_ROUND_FOCUS_SEASON = 2026;

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

function getRelativeMetricBarWidth(
  value: number,
  comparisonValues: number[]
): string {
  const maxReference = Math.max(
    ...comparisonValues.map((entry) => Math.max(entry, 0)),
    Number.EPSILON
  );
  const width = (Math.max(value, 0) / maxReference) * 100;
  return `${Math.min(100, Math.max(width, 8))}%`;
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

function averageMatchAnalysisRows(rows: MatchAnalysisRoundRow[]): MatchAnalysisAverage | null {
  if (rows.length === 0) return null;

  const periodTotals: [number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0];
  const valueTotal = rows.reduce((sum, row) => {
    for (let index = 0; index < 6; index += 1) {
      periodTotals[index] += row.periods[index];
    }
    return sum + row.value;
  }, 0);

  return {
    value: valueTotal / rows.length,
    periods: periodTotals.map((periodTotal) => periodTotal / rows.length) as [
      number,
      number,
      number,
      number,
      number,
      number,
    ],
    matches: rows.length,
  };
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

function getStatContextLabel(stat: StatRow, mode: MatchStatisticsHubProps["mode"]): string {
  if (mode === "round") {
    return "Matchvärde";
  }
  return stat.format === "percent" || stat.format === "decimal"
    ? "Snitt per omgång"
    : "Total (alla spelade omgångar)";
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
  const [seasonComparisonMode, setSeasonComparisonMode] =
    useState<SeasonComparisonMode>("played");
  const [showSeasonComparisonPeriods, setShowSeasonComparisonPeriods] = useState<boolean>(false);
  const [matchAnalysisViewMode, setMatchAnalysisViewMode] = useState<MatchAnalysisViewMode>(
    mode === "combined" ? "season-average" : "round"
  );
  const [selectedSingleRoundComparisonMode, setSelectedSingleRoundComparisonMode] = useState<
    "season-average" | "previous-season-match"
  >("season-average");
  const [seasonVenueFilter, setSeasonVenueFilter] = useState<"all" | "home" | "away">("all");
  const [seasonOpponentSearch, setSeasonOpponentSearch] = useState<string>("");
  const [historicalComparisonMode] = useState<HistoricalComparisonMode>("recommended");
  const [seasonViewRoundA, setSeasonViewRoundA] = useState<string>("");
  const [seasonViewRoundB, setSeasonViewRoundB] = useState<string>("");
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
  const standoutPlayersForRound =
    mode === "round" && typeof round === "number"
      ? hammarbyRoundPlayerHighlights.find((entry) => entry.gameweek === round) ?? null
      : null;
  const standoutPlayerCards = standoutPlayersForRound
    ? getRoundHighlightCards(standoutPlayersForRound)
    : [];
  const combinedOverview = mode === "combined" ? buildCombinedOverview(sortedMatches) : null;
  const current = mode === "combined" ? combinedOverview : roundOverview;
  const effectiveMatchAnalysisViewMode: MatchAnalysisViewMode =
    mode === "combined" ? "season-average" : matchAnalysisViewMode;

  const navItems = [
    { href: "/matchstatistik", label: "Översikt", active: false },
    { href: "/matchstatistik/sasong", label: "Säsong", active: mode === "combined" },
    { href: "/matchstatistik/omgang", label: "Omgångar", active: mode === "round" },
  ];
  const currentRoundIndex =
    mode === "round" && typeof round === "number"
      ? sortedMatches.findIndex((item) => item.gameweek === round)
      : -1;
  const previousRound = currentRoundIndex > 0 ? sortedMatches[currentRoundIndex - 1] : null;
  const nextRound =
    currentRoundIndex >= 0 && currentRoundIndex < sortedMatches.length - 1
      ? sortedMatches[currentRoundIndex + 1]
      : null;
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
  const preferredFocusSeasonRows = matchAnalysisRows.filter(
    (row) => row.season === PREFERRED_ROUND_FOCUS_SEASON
  );
  const fallbackFocusSeasonRows = matchAnalysisRows.filter(
    (row) => row.season === selectedMatchAnalysisSeason
  );
  const defaultRoundFocusRow =
    preferredFocusSeasonRows[preferredFocusSeasonRows.length - 1] ??
    fallbackFocusSeasonRows[fallbackFocusSeasonRows.length - 1] ??
    null;
  const effectiveSelectedSeason =
    effectiveMatchAnalysisViewMode === "round" && defaultRoundFocusRow
      ? defaultRoundFocusRow.season
      : selectedMatchAnalysisSeason;
  const seasonRows = matchAnalysisRows.filter((row) => row.season === effectiveSelectedSeason);
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
    : effectiveMatchAnalysisViewMode === "round" && defaultRoundFocusRow && seasonRows.length > 0
      ? defaultRoundFocusRow.key
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
  const seasonRows2025 = matchAnalysisRows.filter((row) => row.season === 2025);
  const seasonRows2026 = matchAnalysisRows.filter((row) => row.season === 2026);
  const seasonOpponentSearchNormalized = normalizeOpponentName(seasonOpponentSearch.trim());
  const seasonOpponentOptions = Array.from(
    new Map(
      [...seasonRows2025, ...seasonRows2026]
        .sort((a, b) => a.opponent.localeCompare(b.opponent, "sv-SE"))
        .map((row) => [normalizeOpponentName(row.opponent), row.opponent] as const)
    ).entries()
  ).map(([, opponent]) => opponent);
  const filteredSeasonRows2025 = seasonRows2025.filter((row) => {
    if (seasonVenueFilter === "home" && !row.isHome) return false;
    if (seasonVenueFilter === "away" && row.isHome) return false;
    if (!seasonOpponentSearchNormalized) return true;
    return normalizeOpponentName(row.opponent).includes(seasonOpponentSearchNormalized);
  });
  const filteredSeasonRows2026 = seasonRows2026.filter((row) => {
    if (seasonVenueFilter === "home" && !row.isHome) return false;
    if (seasonVenueFilter === "away" && row.isHome) return false;
    if (!seasonOpponentSearchNormalized) return true;
    return normalizeOpponentName(row.opponent).includes(seasonOpponentSearchNormalized);
  });
  const seasonRowsForSelectedFilters2025 =
    seasonOpponentSearchNormalized || seasonVenueFilter !== "all"
      ? filteredSeasonRows2025
      : seasonRows2025;
  const seasonRowsForSelectedFilters2026 =
    seasonOpponentSearchNormalized || seasonVenueFilter !== "all"
      ? filteredSeasonRows2026
      : seasonRows2026;
  const filteredSeasonAverage2025 = averageMatchAnalysisRows(seasonRowsForSelectedFilters2025);
  const filteredSeasonAverage2026 = averageMatchAnalysisRows(seasonRowsForSelectedFilters2026);
  const filteredSeasonAverageDifference =
    (filteredSeasonAverage2026?.value ?? 0) - (filteredSeasonAverage2025?.value ?? 0);
  const filteredSeasonVsSeasonPeriodRows: SeasonVsSeasonPeriodRow[] =
    filteredSeasonAverage2025 && filteredSeasonAverage2026
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
          label,
          seasonAValue: filteredSeasonAverage2025.periods[index],
          seasonBValue: filteredSeasonAverage2026.periods[index],
          delta:
            filteredSeasonAverage2026.periods[index] - filteredSeasonAverage2025.periods[index],
        }))
      : [];
  const usedSeason2025Keys = new Set<string>();
  const playedSeasonPairs = seasonRowsForSelectedFilters2026.reduce<
    Array<{ season2025: MatchAnalysisRoundRow; season2026: MatchAnalysisRoundRow }>
  >((pairs, row2026) => {
    const strictCandidates = seasonRowsForSelectedFilters2025.filter((row2025) => {
      const sameOpponent =
        row2026.opponentTeamId !== null && row2025.opponentTeamId !== null
          ? row2025.opponentTeamId === row2026.opponentTeamId
          : normalizeOpponentName(row2025.opponent) === normalizeOpponentName(row2026.opponent);
      return sameOpponent && row2025.isHome === row2026.isHome;
    });
    const fallbackCandidates =
      strictCandidates.length > 0
        ? strictCandidates
        : seasonRowsForSelectedFilters2025.filter((row2025) => {
            const sameOpponent =
              row2026.opponentTeamId !== null && row2025.opponentTeamId !== null
                ? row2025.opponentTeamId === row2026.opponentTeamId
                : normalizeOpponentName(row2025.opponent) === normalizeOpponentName(row2026.opponent);
            return sameOpponent;
          });
    const availableCandidate = fallbackCandidates
      .sort((a, b) => a.gameweek - b.gameweek)
      .find((candidate) => !usedSeason2025Keys.has(candidate.key));
    if (!availableCandidate) return pairs;
    usedSeason2025Keys.add(availableCandidate.key);
    pairs.push({ season2025: availableCandidate, season2026: row2026 });
    return pairs;
  }, []);
  const playedSeasonPairCount = playedSeasonPairs.length;
  const playedSeasonAverage2025 =
    playedSeasonPairCount > 0
      ? playedSeasonPairs.reduce((sum, pair) => sum + pair.season2025.value, 0) / playedSeasonPairCount
      : 0;
  const playedSeasonAverage2026 =
    playedSeasonPairCount > 0
      ? playedSeasonPairs.reduce((sum, pair) => sum + pair.season2026.value, 0) / playedSeasonPairCount
      : 0;
  const playedSeasonDelta = playedSeasonAverage2026 - playedSeasonAverage2025;
  const playedSeasonPeriodRows: SeasonVsSeasonPeriodRow[] =
    playedSeasonPairCount > 0
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => {
          const seasonAValue =
            playedSeasonPairs.reduce((sum, pair) => sum + pair.season2025.periods[index], 0) /
            playedSeasonPairCount;
          const seasonBValue =
            playedSeasonPairs.reduce((sum, pair) => sum + pair.season2026.periods[index], 0) /
            playedSeasonPairCount;
          return {
            label,
            seasonAValue,
            seasonBValue,
            delta: seasonBValue - seasonAValue,
          };
        })
      : [];
  const activeSeasonComparisonAverage2025 =
    seasonComparisonMode === "full"
      ? (filteredSeasonAverage2025?.value ?? 0)
      : playedSeasonAverage2025;
  const activeSeasonComparisonAverage2026 =
    seasonComparisonMode === "full"
      ? (filteredSeasonAverage2026?.value ?? 0)
      : playedSeasonAverage2026;
  const activeSeasonComparisonDelta =
    seasonComparisonMode === "full" ? filteredSeasonAverageDifference : playedSeasonDelta;
  const activeSeasonComparisonPeriodRows =
    seasonComparisonMode === "full" ? filteredSeasonVsSeasonPeriodRows : playedSeasonPeriodRows;
  const seasonFiltersActive = seasonVenueFilter !== "all" || seasonOpponentSearchNormalized.length > 0;
  const seasonAvailableRowsCount =
    seasonRowsForSelectedFilters2025.length + seasonRowsForSelectedFilters2026.length;
  const seasonComparisonSelectedPairCount = playedSeasonPairCount;
  const seasonFilterSummary = [
    seasonVenueFilter === "all"
      ? "Hemma + borta"
      : seasonVenueFilter === "home"
        ? "Endast hemma"
        : "Endast borta",
    seasonOpponentSearchNormalized
      ? `Motståndare: ${seasonOpponentSearch.trim()}`
      : "Alla motståndare",
  ].join(" • ");
  const fallbackSeasonViewRoundAKey = seasonRowsForSelectedFilters2026[0]?.key ?? "";
  const fallbackSeasonViewRoundBKey = seasonRowsForSelectedFilters2025[0]?.key ?? "";
  const effectiveSeasonViewRoundA = seasonRowsForSelectedFilters2026.some(
    (row) => row.key === seasonViewRoundA
  )
    ? seasonViewRoundA
    : fallbackSeasonViewRoundAKey;
  const effectiveSeasonViewRoundB = seasonRowsForSelectedFilters2025.some(
    (row) => row.key === seasonViewRoundB
  )
    ? seasonViewRoundB
    : fallbackSeasonViewRoundBKey;
  const seasonViewComparisonRoundA =
    seasonRowsForSelectedFilters2026.find((row) => row.key === effectiveSeasonViewRoundA) ?? null;
  const seasonViewComparisonRoundB =
    seasonRowsForSelectedFilters2025.find((row) => row.key === effectiveSeasonViewRoundB) ?? null;
  const seasonViewComparisonDelta =
    seasonViewComparisonRoundA && seasonViewComparisonRoundB
      ? seasonViewComparisonRoundA.value - seasonViewComparisonRoundB.value
      : 0;
  const seasonViewComparisonPeriodRows: ComparisonPeriodRow[] =
    seasonViewComparisonRoundA && seasonViewComparisonRoundB
      ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => ({
          label,
          roundAValue: seasonViewComparisonRoundB.periods[index],
          roundBValue: seasonViewComparisonRoundA.periods[index],
          delta: seasonViewComparisonRoundA.periods[index] - seasonViewComparisonRoundB.periods[index],
        }))
      : [];
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
  const selectedRoundData = roundVsSeasonRow
    ? MATCH_ANALYSIS_ROUND_BY_KEY.get(roundVsSeasonRow.key) ?? null
    : null;
  const selectedRoundMetricValue = (metricKey: MatchAnalysisMetricKey): number | null =>
    selectedRoundData ? selectedRoundData.metrics[metricKey].value : null;
  const seasonAverageForMetric = (
    season: number,
    metricKey: MatchAnalysisMetricKey
  ): number | null =>
    MATCH_ANALYSIS_SEASON_METRIC_AVERAGES.get(season)?.[metricKey] ?? null;
  const buildPlaystyleSnapshot = (metricKey: MatchAnalysisMetricKey): PlaystyleMetricSnapshot | null => {
    const metricDefinition = MATCH_ANALYSIS_METRIC_DEFINITION_BY_KEY.get(metricKey);
    const currentValue = selectedRoundMetricValue(metricKey);
    if (!metricDefinition || currentValue === null) {
      return null;
    }

    const average2026 = seasonAverageForMetric(2026, metricKey);
    const average2025 = seasonAverageForMetric(2025, metricKey);

    return {
      metric: metricDefinition,
      currentValue,
      average2026,
      average2025,
      deltaVs2026: average2026 === null ? null : currentValue - average2026,
      deltaVs2025: average2025 === null ? null : currentValue - average2025,
    };
  };
  const playstyleProfiles: PlaystyleProfileCard[] =
    mode === "round" && effectiveMatchAnalysisViewMode === "round" && selectedRoundData
      ? PLAYSTYLE_LENS_DEFINITIONS.flatMap((lens) => {
          const primarySnapshot = buildPlaystyleSnapshot(lens.primaryMetricKey);
          if (!primarySnapshot) return [];

          const secondarySnapshot = lens.secondaryMetricKey
            ? buildPlaystyleSnapshot(lens.secondaryMetricKey)
            : null;

          return [
            {
              id: lens.id,
              title: lens.title,
              icon: lens.icon,
              description: lens.description,
              tone: lens.tone,
              primary: primarySnapshot,
              secondary: secondarySnapshot,
            },
          ];
        })
      : [];
  const matchAnalysisAverage2026 = averageMatchAnalysisRows(seasonRows2026);
  const matchAnalysisAverage2025 = averageMatchAnalysisRows(seasonRows2025);
  const roundVsSeasonAverage2026Delta =
    roundVsSeasonRow && matchAnalysisAverage2026
      ? roundVsSeasonRow.value - matchAnalysisAverage2026.value
      : null;
  const roundVsSeasonAverage2025Delta =
    roundVsSeasonRow && matchAnalysisAverage2025
      ? roundVsSeasonRow.value - matchAnalysisAverage2025.value
      : null;
  const roundVsDualSeasonPeriodRows: RoundVsDualSeasonPeriodRow[] = roundVsSeasonRow
    ? MATCH_ANALYSIS_PERIOD_LABELS.map((label, index) => {
        const period2026 = matchAnalysisAverage2026?.periods[index] ?? null;
        const period2025 = matchAnalysisAverage2025?.periods[index] ?? null;
        return {
          label,
          roundValue: roundVsSeasonRow.periods[index],
          season2026Value: period2026,
          season2025Value: period2025,
          deltaVs2026: period2026 === null ? null : roundVsSeasonRow.periods[index] - period2026,
          deltaVs2025: period2025 === null ? null : roundVsSeasonRow.periods[index] - period2025,
        };
      })
    : [];
  const formatDeltaWithMeaning = (
    value: number | null,
    metric: MatchAnalysisMetricDefinition
  ): string => {
    if (value === null) return "–";
    return `${formatMatchAnalysisDelta(value, metric)} (${getMatchAnalysisDeltaMeaning(
      value,
      metric.direction
    )})`;
  };
  const roundVsSeasonDelta = roundVsSeasonRow
    ? roundVsSeasonRow.value - matchAnalysisAverage
    : 0;
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
  const allPreviousSeasonCandidates =
    roundVsSeasonRow && previousSeason
      ? matchAnalysisRows.filter((row) => row.season === previousSeason)
      : [];
  const recommendedHistoricalKey =
    (strictHistoricalCandidates[0] ?? fallbackHistoricalCandidates[0])?.key ?? null;
  const historicalComparisonCandidates: HistoricalComparisonCandidate[] =
    allPreviousSeasonCandidates.map((row) => ({
      key: row.key,
      label: `S${row.season} Omg ${row.gameweek} (${row.opponent})`,
      context: row.isHome ? "Hemma" : "Borta",
      isRecommended: row.key === recommendedHistoricalKey,
    }));
  const recommendedHistoricalCandidates = historicalComparisonCandidates.filter(
    (candidate) => candidate.isRecommended
  );
  const selectableHistoricalCandidates =
    historicalComparisonMode === "recommended" && recommendedHistoricalCandidates.length > 0
      ? recommendedHistoricalCandidates
      : historicalComparisonCandidates;

  const effectiveHistoricalComparisonKey =
    selectableHistoricalCandidates.length === 0
      ? "none"
      : selectableHistoricalCandidates.some(
            (candidate) => candidate.key === selectedHistoricalComparisonKey
          )
        ? selectedHistoricalComparisonKey
        : selectableHistoricalCandidates[0].key;
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
  const hasPreviousMatchComparison =
    selectedMatchAnalysisSeason === 2026 &&
    previousSeason !== null &&
    historicalComparisonCandidates.length > 0;
  const singleRoundComparisonMode: "season-average" | "previous-season-match" =
    hasPreviousMatchComparison && selectedSingleRoundComparisonMode === "previous-season-match"
      ? "previous-season-match"
      : "season-average";

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
          <Link href="/spelarstatistik" className="text-xs text-purple-300 hover:text-purple-200">
            Spelarstatistik
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-500/50 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-slate-300 hover:bg-slate-800"
          >
            🏠 Huvudsida
          </Link>
          {mode === "round" && typeof round === "number" && (
            <div className="ml-auto flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-2 py-1">
              {previousRound ? (
                <Link
                  href={`/matchstatistik/omgang/${previousRound.gameweek}`}
                  className="rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 hover:text-white"
                >
                  ← Omg {previousRound.gameweek}
                </Link>
              ) : (
                <span className="px-2 py-1 text-[11px] text-slate-500">←</span>
              )}
              <span className="text-[11px] text-slate-300">Nu: Omg {round}</span>
              {nextRound ? (
                <Link
                  href={`/matchstatistik/omgang/${nextRound.gameweek}`}
                  className="rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 hover:text-white"
                >
                  Omg {nextRound.gameweek} →
                </Link>
              ) : (
                <span className="px-2 py-1 text-[11px] text-slate-500">→</span>
              )}
            </div>
          )}
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

        {mode === "round" && standoutPlayersForRound && (
          <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Standout-spelare (Hammarby, omgång {standoutPlayersForRound.gameweek})
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Lyfter spelare som utmärkte sig i olika roller i matchen.
                </p>
              </div>
              <a
                href={standoutPlayersForRound.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500 hover:text-white"
              >
                Datakälla
              </a>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {standoutPlayerCards.map((card) => {
                const tone = HIGHLIGHT_TONE_STYLES[card.tone];
                return (
                  <article
                    key={`standout-${card.id}`}
                    className={`rounded-xl border p-3 ${tone.border} ${tone.bg}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-semibold uppercase tracking-wide ${tone.text}`}>
                        {card.icon} {card.title}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone.chip}`}
                      >
                        {card.player.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-base font-semibold text-white">{card.player.name}</p>
                    <p className="text-xs text-slate-400">{card.player.roleName}</p>
                    <p className="mt-2 text-[11px] text-slate-300">
                      {card.metricLabel}: <span className="font-semibold text-slate-100">{card.metricValue}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {card.player.minutesOnField} min • {card.player.secondaryStatLabel}:{" "}
                      {card.player.secondaryStatValue}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {mode === "round" &&
          effectiveMatchAnalysisViewMode === "round" &&
          selectedRoundData &&
          playstyleProfiles.length > 0 && (
            <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Spelstil & spelsätt som stack ut (omgång {roundVsSeasonRow?.gameweek})
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Profilkort som visar hur matchen skiljde sig mot säsongssnitt 2026 och 2025.
                  </p>
                </div>
                <a
                  href={selectedRoundData.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500 hover:text-white"
                >
                  Matchanalyskälla
                </a>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {playstyleProfiles.map((profile) => {
                  const tone = HIGHLIGHT_TONE_STYLES[profile.tone];
                  const renderSnapshot = (
                    snapshot: PlaystyleMetricSnapshot,
                    snapshotLabel: string
                  ) => {
                    const comparisonValues = [
                      snapshot.currentValue,
                      snapshot.average2026 ?? 0,
                      snapshot.average2025 ?? 0,
                    ];
                    return (
                      <div className="rounded-lg border border-slate-700/60 bg-slate-950/60 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                          {snapshotLabel}
                        </p>
                        <p className={`mt-1 text-sm font-semibold ${tone.text}`}>
                          {snapshot.metric.label}
                        </p>
                        <div className="mt-2 space-y-2 text-[11px]">
                          <div>
                            <div className="mb-1 flex items-center justify-between text-slate-300">
                              <span>Vald match</span>
                              <span className="font-semibold text-white">
                                {formatMatchAnalysisValue(snapshot.currentValue, snapshot.metric)}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800">
                              <div
                                className="h-1.5 rounded-full bg-blue-400"
                                style={{
                                  width: getRelativeMetricBarWidth(
                                    snapshot.currentValue,
                                    comparisonValues
                                  ),
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-slate-300">
                              <span>Snitt 2026</span>
                              <span className="font-semibold text-white">
                                {snapshot.average2026 === null
                                  ? "–"
                                  : formatMatchAnalysisValue(snapshot.average2026, snapshot.metric)}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800">
                              <div
                                className="h-1.5 rounded-full bg-emerald-400"
                                style={{
                                  width: getRelativeMetricBarWidth(
                                    snapshot.average2026 ?? 0,
                                    comparisonValues
                                  ),
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-slate-300">
                              <span>Snitt 2025</span>
                              <span className="font-semibold text-white">
                                {snapshot.average2025 === null
                                  ? "–"
                                  : formatMatchAnalysisValue(snapshot.average2025, snapshot.metric)}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800">
                              <div
                                className="h-1.5 rounded-full bg-amber-400"
                                style={{
                                  width: getRelativeMetricBarWidth(
                                    snapshot.average2025 ?? 0,
                                    comparisonValues
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-2">
                          <div className="rounded border border-slate-700/60 bg-slate-900/70 px-2 py-1.5">
                            <p className="text-slate-500">Δ vs 2026</p>
                            <p
                              className={`font-semibold ${
                                snapshot.deltaVs2026 === null
                                  ? "text-slate-300"
                                  : getMatchAnalysisDeltaTone(
                                      snapshot.deltaVs2026,
                                      snapshot.metric.direction
                                    )
                              }`}
                            >
                              {formatDeltaWithMeaning(snapshot.deltaVs2026, snapshot.metric)}
                            </p>
                          </div>
                          <div className="rounded border border-slate-700/60 bg-slate-900/70 px-2 py-1.5">
                            <p className="text-slate-500">Δ vs 2025</p>
                            <p
                              className={`font-semibold ${
                                snapshot.deltaVs2025 === null
                                  ? "text-slate-300"
                                  : getMatchAnalysisDeltaTone(
                                      snapshot.deltaVs2025,
                                      snapshot.metric.direction
                                    )
                              }`}
                            >
                              {formatDeltaWithMeaning(snapshot.deltaVs2025, snapshot.metric)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <article
                      key={`playstyle-${profile.id}`}
                      className={`rounded-xl border p-4 ${tone.border} ${tone.bg}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-semibold ${tone.text}`}>
                          {profile.icon} {profile.title}
                        </p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone.chip}`}>
                          Matchprofil
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300">{profile.description}</p>
                      <div className="mt-3 space-y-3">
                        {renderSnapshot(profile.primary, "Primär KPI")}
                        {profile.secondary && renderSnapshot(profile.secondary, "Stöd-KPI")}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Nyckeltal (vad du ser)</h2>
          <p className="mt-1 text-sm text-slate-400">
            Värdena visar totalen för det valda urvalet. I kombinerat läge är det summerat över
            alla spelade omgångar.
          </p>
          {mode === "combined" && (
            <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs text-slate-300">
              <p>
                Per omgång (snitt):{" "}
                <span className="font-semibold text-slate-100">
                  {current.subtitle.match(/Omgång/g)?.length ?? 1}
                </span>{" "}
                spelade omgångar i urvalet.
              </p>
              <p className="mt-1 text-slate-400">
                Exempel: Passningar = total i urvalet, medan passningsprocent visas som procent.
              </p>
            </div>
          )}
          <div className="mt-5 space-y-4">
            {current.stats.map((stat) => {
              const leftWidth = getBarWidth(stat.home, stat.away);
              const rightWidth = 100 - leftWidth;
              const roundsInView = mode === "combined" ? Math.max(sortedMatches.length, 1) : 1;
              const perRoundHome = stat.home / roundsInView;
              const perRoundAway = stat.away / roundsInView;
              const showPerRound = mode === "combined" && stat.format !== "percent";
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
                  {showPerRound && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Snitt/omgång: {current.leftTeam}{" "}
                      {formatCompactValue(perRoundHome, stat.format)} • {current.rightTeam}{" "}
                      {formatCompactValue(perRoundAway, stat.format)}
                    </p>
                  )}
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
              Visning
              <select
                value={effectiveMatchAnalysisViewMode}
                onChange={(event) =>
                  setMatchAnalysisViewMode(event.target.value as MatchAnalysisViewMode)
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                disabled={mode === "combined"}
              >
                <option value="round">Omgång</option>
                <option value="season-average">Säsongsgenomsnitt</option>
              </select>
            </label>
            {mode === "round" && (
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
            )}
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
          {mode === "round" && (
            <div className="mt-3 grid gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowSeasonRows((currentValue) => !currentValue)}
                className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-left text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                {showSeasonRows ? "Dölj omgångslista" : "Visa omgångslista"}
              </button>
            </div>
          )}

          {mode === "round" &&
            effectiveMatchAnalysisViewMode === "round" &&
            comparisonRowA &&
            comparisonRowB && (
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

          {effectiveMatchAnalysisViewMode === "season-average" && (
            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Säsongsgenomsnitt</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Jämför säsong mot säsong och valda omgångar mot 2025.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSeasonComparisonMode("full")}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      seasonComparisonMode === "full"
                        ? "border-blue-500/50 bg-blue-500/20 text-blue-100"
                        : "border-slate-600 bg-slate-950/70 text-slate-300 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    Hela säsongen
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeasonComparisonMode("played")}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      seasonComparisonMode === "played"
                        ? "border-blue-500/50 bg-blue-500/20 text-blue-100"
                        : "border-slate-600 bg-slate-950/70 text-slate-300 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    Spelade motsvarande matcher
                  </button>
                </div>
              </div>
              {mode === "combined" && (
                <div className="mt-3 rounded-lg border border-slate-700/60 bg-slate-950/50 p-3">
                  <div className="flex flex-wrap items-end gap-3">
                    <label className="flex min-w-[150px] flex-col gap-1 text-xs text-slate-300">
                      Hemma/Borta
                      <select
                        value={seasonVenueFilter}
                        onChange={(event) =>
                          setSeasonVenueFilter(event.target.value as "all" | "home" | "away")
                        }
                        className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                      >
                        <option value="all">Alla matcher</option>
                        <option value="home">Endast hemma</option>
                        <option value="away">Endast borta</option>
                      </select>
                    </label>
                    <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs text-slate-300">
                      Sök motståndare
                      <input
                        type="search"
                        value={seasonOpponentSearch}
                        onChange={(event) => setSeasonOpponentSearch(event.target.value)}
                        list="season-opponent-options"
                        placeholder="T.ex. Sirius, Malmö, AIK"
                        className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                      />
                      <datalist id="season-opponent-options">
                        {seasonOpponentOptions.map((opponent) => (
                          <option key={`season-opponent-option-${opponent}`} value={opponent} />
                        ))}
                      </datalist>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSeasonVenueFilter("all");
                        setSeasonOpponentSearch("");
                      }}
                      disabled={!seasonFiltersActive}
                      className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Nollställ filter
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">{seasonFilterSummary}</p>
                </div>
              )}
              <p className="mt-2 text-xs text-slate-500">
                {seasonComparisonMode === "full"
                  ? `Visar säsongssnitt för urvalet (${seasonRowsForSelectedFilters2026.length} matcher 2026, ${seasonRowsForSelectedFilters2025.length} matcher 2025).`
                  : `Visar endast ${seasonComparisonSelectedPairCount} matchpar: 2026 spelade omgångar mot motsvarande matcher 2025 i nuvarande filter.`}
              </p>
              {mode === "combined" && (
                <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-4">
                  <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                    <p className="text-slate-400">Matcher i urval 2026</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonRowsForSelectedFilters2026.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                    <p className="text-slate-400">Matcher i urval 2025</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonRowsForSelectedFilters2025.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                    <p className="text-slate-400">Parade matcher</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonComparisonSelectedPairCount}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                    <p className="text-slate-400">Totalt i filter</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonAvailableRowsCount}
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowSeasonComparisonPeriods((currentValue) => !currentValue)}
                  className="rounded-lg border border-slate-600 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                >
                  {showSeasonComparisonPeriods ? "Dölj perioddetaljer" : "Visa perioddetaljer"}
                </button>
              </div>
              {seasonAvailableRowsCount === 0 && (
                <p className="mt-2 text-xs text-rose-300">
                  Inga matcher matchar nuvarande filter. Justera filter för att se säsongsjämförelsen.
                </p>
              )}
              {seasonComparisonMode === "played" && playedSeasonPairCount > 0 && (
                <div className="mt-2 rounded-lg border border-slate-700/60 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-300">
                  <p className="font-medium text-slate-200">Parade matcher (2026 mot 2025)</p>
                  <div className="mt-1 grid gap-1">
                    {playedSeasonPairs.map((pair) => (
                      <p key={`played-pair-${pair.season2026.key}`}>
                        Omg {pair.season2026.gameweek}: {pair.season2026.opponent} (
                        {pair.season2026.isHome ? "hemma" : "borta"}) ↔ Omg {pair.season2025.gameweek}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Säsong 2025</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      activeSeasonComparisonAverage2025,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Säsong 2026</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      activeSeasonComparisonAverage2026,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  <p className="text-slate-400">Skillnad (2026 - 2025)</p>
                  <p
                    className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                      activeSeasonComparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(
                      activeSeasonComparisonDelta,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {getMatchAnalysisDeltaMeaning(
                      activeSeasonComparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}
                  </p>
                </div>
              </div>
              {showSeasonComparisonPeriods && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                  {activeSeasonComparisonPeriodRows.map((periodRow) => (
                    <div
                      key={`season-compare-period-${periodRow.label}`}
                      className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                    >
                      <p className="text-slate-500">{periodRow.label}</p>
                      <p className="text-slate-300">
                        {formatMatchAnalysisValue(periodRow.seasonAValue, selectedMatchAnalysisMetric)} vs{" "}
                        {formatMatchAnalysisValue(periodRow.seasonBValue, selectedMatchAnalysisMetric)}
                      </p>
                      <p
                        className={`font-semibold ${getMatchAnalysisDeltaTone(
                          periodRow.delta,
                          selectedMatchAnalysisMetric.direction
                        )}`}
                      >
                        {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
                <p className="text-xs font-semibold text-slate-100">Valda omgångar: 2026 vs 2025</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Jämför en vald omgång 2026 mot en vald omgång 2025 med samma KPI.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-xs text-slate-300">
                    Omgång 2026
                    <select
                      value={seasonViewRoundA}
                      onChange={(event) => setSeasonViewRoundA(event.target.value)}
                      disabled={seasonRowsForSelectedFilters2026.length === 0}
                      className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {seasonRowsForSelectedFilters2026.map((row) => (
                        <option key={`season-view-a-${row.key}`} value={row.key}>
                          Omg {row.gameweek} ({row.opponent})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-slate-300">
                    Omgång 2025
                    <select
                      value={seasonViewRoundB}
                      onChange={(event) => setSeasonViewRoundB(event.target.value)}
                      disabled={seasonRowsForSelectedFilters2025.length === 0}
                      className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {seasonRowsForSelectedFilters2025.map((row) => (
                        <option key={`season-view-b-${row.key}`} value={row.key}>
                          Omg {row.gameweek} ({row.opponent})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {seasonViewComparisonRoundA && seasonViewComparisonRoundB && (
                  <>
                    <div className="mt-3 grid gap-2 text-[11px] text-slate-300 sm:grid-cols-3">
                      <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                        <p className="text-slate-500">2025 vald</p>
                        <p className="font-semibold text-white">
                          {formatMatchAnalysisValue(
                            seasonViewComparisonRoundB.value,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                      </div>
                      <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                        <p className="text-slate-500">2026 vald</p>
                        <p className="font-semibold text-white">
                          {formatMatchAnalysisValue(
                            seasonViewComparisonRoundA.value,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                      </div>
                      <div className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5">
                        <p className="text-slate-500">Skillnad (2026 - 2025)</p>
                        <p
                          className={`font-semibold ${getMatchAnalysisDeltaTone(
                            seasonViewComparisonDelta,
                            selectedMatchAnalysisMetric.direction
                          )}`}
                        >
                          {formatMatchAnalysisDelta(
                            seasonViewComparisonDelta,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                      {seasonViewComparisonPeriodRows.map((periodRow) => (
                        <div
                          key={`season-view-period-${periodRow.label}`}
                          className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
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
                            {formatMatchAnalysisDelta(periodRow.delta, selectedMatchAnalysisMetric)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {effectiveMatchAnalysisViewMode === "round" && roundVsSeasonRow && (
            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">Jämför vald omgång</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    Omgång (fokus)
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
                    Visning
                    <select
                      value={selectedSingleRoundComparisonMode}
                      onChange={(event) =>
                        setSelectedSingleRoundComparisonMode(
                          event.target.value as "season-average" | "previous-season-match"
                        )
                      }
                      className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      <option value="season-average">Säsongssnitt</option>
                      <option value="previous-season-match">
                        Match från säsong 2025
                      </option>
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

              {singleRoundComparisonMode === "previous-season-match" ? (
                <div className="mt-3 rounded-lg border border-blue-500/25 bg-slate-900/70 p-3">
                  {previousSeason && historicalComparisonCandidates.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Ingen motsvarande match hittades i föregående säsong för vald omgång.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-4">
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                      <p className="text-slate-400">Vald omgång</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {formatMatchAnalysisValue(roundVsSeasonRow.value, selectedMatchAnalysisMetric)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                      <p className="text-slate-400">Säsongssnitt 2026</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {matchAnalysisAverage2026
                          ? formatMatchAnalysisValue(
                              matchAnalysisAverage2026.value,
                              selectedMatchAnalysisMetric
                            )
                          : "–"}
                      </p>
                      <p
                        className={`mt-1 text-[11px] ${
                          roundVsSeasonAverage2026Delta === null
                            ? "text-slate-400"
                            : getMatchAnalysisDeltaTone(
                                roundVsSeasonAverage2026Delta,
                                selectedMatchAnalysisMetric.direction
                              )
                        }`}
                      >
                        Δ:{" "}
                        {formatDeltaWithMeaning(
                          roundVsSeasonAverage2026Delta,
                          selectedMatchAnalysisMetric
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                      <p className="text-slate-400">Säsongssnitt 2025</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {matchAnalysisAverage2025
                          ? formatMatchAnalysisValue(
                              matchAnalysisAverage2025.value,
                              selectedMatchAnalysisMetric
                            )
                          : "–"}
                      </p>
                      <p
                        className={`mt-1 text-[11px] ${
                          roundVsSeasonAverage2025Delta === null
                            ? "text-slate-400"
                            : getMatchAnalysisDeltaTone(
                                roundVsSeasonAverage2025Delta,
                                selectedMatchAnalysisMetric.direction
                              )
                        }`}
                      >
                        Δ:{" "}
                        {formatDeltaWithMeaning(
                          roundVsSeasonAverage2025Delta,
                          selectedMatchAnalysisMetric
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                      <p className="text-slate-400">Skillnad (omgång - aktivt snitt)</p>
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

                  <div className="mt-3 grid grid-cols-1 gap-2 text-[11px] sm:grid-cols-2">
                    {roundVsDualSeasonPeriodRows.map((periodRow) => (
                      <div
                        key={`round-vs-season-${periodRow.label}`}
                        className="rounded border border-slate-700/60 bg-slate-950/60 px-2 py-1.5"
                      >
                        <p className="text-slate-500">{periodRow.label}</p>
                        <p className="text-slate-300">
                          {formatMatchAnalysisValue(
                            periodRow.roundValue,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                        <p className="mt-0.5 text-slate-400">
                          2026:{" "}
                          {periodRow.season2026Value === null
                            ? "–"
                            : formatMatchAnalysisValue(
                                periodRow.season2026Value,
                                selectedMatchAnalysisMetric
                              )}
                          {" • "}2025:{" "}
                          {periodRow.season2025Value === null
                            ? "–"
                            : formatMatchAnalysisValue(
                                periodRow.season2025Value,
                                selectedMatchAnalysisMetric
                              )}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Δ vs 2026:{" "}
                          <span
                            className={
                              periodRow.deltaVs2026 === null
                                ? "text-slate-400"
                                : getMatchAnalysisDeltaTone(
                                    periodRow.deltaVs2026,
                                    selectedMatchAnalysisMetric.direction
                                  )
                            }
                          >
                            {formatDeltaWithMeaning(
                              periodRow.deltaVs2026,
                              selectedMatchAnalysisMetric
                            )}
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Δ vs 2025:{" "}
                          <span
                            className={
                              periodRow.deltaVs2025 === null
                                ? "text-slate-400"
                                : getMatchAnalysisDeltaTone(
                                    periodRow.deltaVs2025,
                                    selectedMatchAnalysisMetric.direction
                                  )
                            }
                          >
                            {formatDeltaWithMeaning(
                              periodRow.deltaVs2025,
                              selectedMatchAnalysisMetric
                            )}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {mode === "round" && showSeasonRows && (
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
          )}

          {mode === "round" && showSeasonRows && (
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
          )}
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
