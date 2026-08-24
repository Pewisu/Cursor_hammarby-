"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  hammarbyRoundMatchStats,
  type RoundMatchStats,
} from "@/lib/matchStatisticsOverviewData";
import {
  MATCH_ANALYSIS_PERIOD_LABELS,
  hammarbyMatchAnalysisMetricDefinitions,
  hammarbyMatchAnalysisRounds,
  type HammarbyMatchAnalysisRound,
  type MatchAnalysisMetricDefinition,
  type MatchAnalysisMetricKey,
} from "@/lib/hammarbyMatchAnalysisData";
import {
  hammarbyRoundPlayerHighlights,
  type HammarbyRoundHighlightCategory,
  type HammarbyRoundHighlight,
  type HammarbyRoundHighlightPlayer,
} from "@/lib/hammarbyRoundPlayerHighlightsData";
import {
  hammarbyPlayerTrendMatches,
  type PlayerTrendMetrics,
} from "@/lib/hammarbyPlayerTrendData";
import PredictionVsOutcome from "@/components/PredictionVsOutcome";
import MatchRecapSection, { type MatchPointsContext } from "@/components/MatchRecapSection";
import { round8PredictionVsOutcome } from "@/lib/predictionVsOutcomeData";
import { round9PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound9Data";
import { round9AikPredictionVsOutcome } from "@/lib/predictionVsOutcomeRound9AikData";
import { round10PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound10Data";
import { round11PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound11Data";
import { round13PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound13Data";
import { round17PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound17Data";
import { round18PredictionVsOutcome } from "@/lib/predictionVsOutcomeRound18Data";
import {
  elfsborgRound11Goals,
  elfsborgRound11MatchSpider,
  elfsborgRound11MatchStory,
  elfsborgRound11Recap,
  elfsborgRound11SnapshotPills,
  elfsborgRound11SnapshotStats,
  elfsborgRound11Takeaways,
} from "@/lib/elfsborgRound11AnalysisData";
import {
  degerforsRound13Goals,
  degerforsRound13MatchSpider,
  degerforsRound13MatchStory,
  degerforsRound13Recap,
  degerforsRound13SnapshotPills,
  degerforsRound13SnapshotStats,
  degerforsRound13Takeaways,
  degerforsYearComparison,
  degerforsYearComparisonMeta,
  type YearOnYearRow,
} from "@/lib/degerforsRound13AnalysisData";
import {
  brommapojkarnaRound14Goals,
  brommapojkarnaRound14MatchSpider,
  brommapojkarnaRound14MatchStory,
  brommapojkarnaRound14Recap,
  brommapojkarnaRound14SnapshotPills,
  brommapojkarnaRound14SnapshotStats,
  brommapojkarnaRound14Takeaways,
} from "@/lib/brommapojkarnaRound14AnalysisData";
import {
  hackenRound16Goals,
  hackenRound16MatchSpider,
  hackenRound16MatchStory,
  hackenRound16Recap,
  hackenRound16SnapshotPills,
  hackenRound16SnapshotStats,
  hackenRound16Takeaways,
  hackenRound16RefereeData,
  hackenRound16Momentum,
  hackenRound16MomentumGoals,
  hackenRound16TwelveKpis,
} from "@/lib/hackenRound16AnalysisData";
import {
  kalmarRound17Goals,
  kalmarRound17MatchSpider,
  kalmarRound17MatchStory,
  kalmarRound17Recap,
  kalmarRound17SnapshotPills,
  kalmarRound17SnapshotStats,
  kalmarRound17Takeaways,
  kalmarRound17RefereeData,
  kalmarRound17Momentum,
  kalmarRound17MomentumGoals,
  kalmarRound17TwelveKpis,
} from "@/lib/kalmarRound17AnalysisData";
import {
  gaisRound18Goals,
  gaisRound18MatchSpider,
  gaisRound18MatchStory,
  gaisRound18Recap,
  gaisRound18SnapshotPills,
  gaisRound18SnapshotStats,
  gaisRound18Takeaways,
  gaisRound18RefereeData,
  gaisRound18Momentum,
  gaisRound18MomentumGoals,
  gaisRound18TwelveKpis,
  gaisRound18FirstHalf,
  ROUND18_HIF_GREEN,
  ROUND18_HIF_LIGHT,
  ROUND18_GAIS_YELLOW,
} from "@/lib/gaisRound18AnalysisData";
import { MatchMomentumChart } from "@/components/MatchMomentumChart";
import {
  calcDomarindex,
  getDomarRating,
  hammarbyRefereeMatches,
} from "@/lib/hammarbyRefereeData";
import { findMatchAnalysisRoundForOverview } from "@/lib/resolveMatchAnalysisRound";
import StandoutPlayerCard from "@/components/StandoutPlayerCard";
import { round8Standout } from "@/lib/round8StandoutData";
import { CoachComparisonDashboard } from "@/components/CoachComparisonDashboard";
import { MatchAnalysisKpiSection } from "@/components/MatchAnalysisKpiSection";
import {
  coachRecords2026,
  getCoachRecordAverages,
} from "@/lib/coachComparison2026Data";
import { hammarbyRunningMatches } from "@/lib/hammarbyRunningData";
import {
  RoundRunningStatsSection,
  getRunningMatchForGameweek,
} from "@/components/RoundRunningStatsSection";

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

type PointsComparisonRow = {
  seasonLabel: string;
  pointsAfterRoundText: string;
  pointsPerRoundText: string;
  seasonAverageText: string;
  note: string;
};

function PointsComparisonSection({
  comparisonRound,
  pointsComparisonRows,
  className,
  matchContext,
}: {
  comparisonRound: number;
  pointsComparisonRows: PointsComparisonRow[];
  className?: string;
  matchContext?: MatchPointsContext | null;
}) {
  const deltaPositive = (matchContext?.matchDeltaVsPpg ?? 0) >= 0;

  return (
    <section
      id="season-points"
      className={
        className ??
        "rounded-2xl border border-white/[0.06] bg-[#161b22] p-4 md:p-5"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white md:text-lg">Poängsnitt & poängprognos</h2>
          <p className="mt-1 text-xs text-neutral-400 md:text-sm">
            Komprimerad jämförelse: poäng efter vald omgång, poängsnitt och säsongssnitt.
          </p>
        </div>
        <span className="rounded-md border border-neutral-700/70 bg-neutral-900/60 px-2 py-1 text-[11px] text-neutral-300">
          Omgång {comparisonRound}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {pointsComparisonRows.map((row) => {
          const is2026 = row.seasonLabel === "2026";
          return (
            <div
              key={`points-compact-${row.seasonLabel}`}
              className={`relative overflow-hidden rounded-xl p-3.5 sm:p-4 ${
                is2026
                  ? "border border-emerald-500/30 bg-emerald-950/25 shadow-[inset_0_0_32px_rgba(16,185,129,0.04)]"
                  : "border border-white/[0.05] bg-white/[0.02]"
              }`}
            >
              {is2026 && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
              )}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                {/* Season label */}
                <div className="flex items-center gap-2">
                  {is2026 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                  )}
                  <span className={`text-sm font-bold tabular-nums ${is2026 ? "text-white" : "text-neutral-500"}`}>
                    {row.seasonLabel}
                  </span>
                  {is2026 && (
                    <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400">
                      Aktiv
                    </span>
                  )}
                </div>
                {/* Stats */}
                <div className="flex gap-4 text-right sm:gap-6">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-600">
                      Efter omg {comparisonRound}
                    </p>
                    <p className={`mt-0.5 text-sm font-bold tabular-nums ${is2026 ? "text-white" : "text-neutral-300"}`}>
                      {row.pointsAfterRoundText}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-600">Snitt/omg</p>
                    <p className={`mt-0.5 text-sm font-bold tabular-nums ${is2026 ? "text-emerald-300" : "text-neutral-300"}`}>
                      {row.pointsPerRoundText}
                    </p>
                  </div>
                  <div>
                    <p className={`text-[9px] font-semibold uppercase tracking-widest ${is2026 ? "text-blue-400/80" : "text-neutral-600"}`}>
                      {is2026 ? "Prognos säsong" : "Slutpoäng"}
                    </p>
                    <p className={`mt-0.5 text-sm font-bold tabular-nums ${is2026 ? "text-blue-300" : "text-neutral-400"}`}>
                      {row.seasonAverageText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {matchContext ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-600/40 bg-emerald-500/10 px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/90">
              Denna match vs snitt
            </p>
            <p className="mt-0.5 text-xs text-neutral-400">
              Jämfört med {matchContext.seasonPpgBefore.toFixed(2).replace(".", ",")} p/omg före matchen
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-emerald-100">{matchContext.matchPoints} p</p>
            <p
              className={`text-sm font-bold ${
                deltaPositive ? "text-emerald-300" : "text-amber-300"
              }`}
            >
              {deltaPositive ? "+" : ""}
              {matchContext.matchDeltaVsPpg.toFixed(2).replace(".", ",")} mot snittet
            </p>
          </div>
        </div>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500">
        {pointsComparisonRows.map((row) => (
          <span key={`points-note-${row.seasonLabel}`}>
            {row.seasonLabel}: {row.note}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-neutral-500">
        2026-poängsnittet räknas på faktisk poäng hittills; 2025/2024 använder slutligt säsongssnitt
        per omgång. ≈ markerar prognos/fallback.
      </p>
    </section>
  );
}

function YearComparisonSection({
  rows,
  meta,
}: {
  rows: YearOnYearRow[];
  meta: typeof degerforsYearComparisonMeta;
}) {
  return (
    <section
      id="year-comparison"
      className="rounded-2xl border border-blue-700/35 bg-[#0f1e2e] overflow-hidden"
    >
      <div className="border-b border-blue-800/40 px-5 py-4 md:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300/90">
          Hammarby vs Degerfors · Hemma 2025 vs 2026
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-50">
          Jämförelse: 2025 mötet vs 2026
        </h2>
        <p className="mt-1 text-sm text-blue-100/80">
          Hur skiljde sig dagens 4-0 seger från fjolårets 1-0 på 3Arena?
        </p>
      </div>

      {/* Match header cards */}
      <div className="grid gap-3 px-5 py-4 md:grid-cols-2 md:px-6">
        <div className="rounded-xl border border-slate-600/40 bg-slate-900/60 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {meta.season2025.label}
          </p>
          <p className="mt-1 text-3xl font-black text-white">{meta.season2025.result}</p>
          <p className="mt-1 text-xs text-slate-400">Mål: {meta.season2025.scorer}</p>
          <p className="mt-0.5 text-xs text-slate-500">Tränare: {meta.season2025.coach}</p>
          <a href={meta.season2025.fotmobUrl} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-block text-[11px] text-blue-400 hover:text-blue-300">
            Fotmob ↗
          </a>
        </div>
        <div className="rounded-xl border border-emerald-600/40 bg-emerald-950/30 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400/80">
            {meta.season2026.label}
          </p>
          <p className="mt-1 text-3xl font-black text-white">{meta.season2026.result}</p>
          <p className="mt-1 text-xs text-emerald-300/80">Mål: {meta.season2026.scorer}</p>
          <p className="mt-0.5 text-xs text-emerald-400/60">Tränare: {meta.season2026.coach}</p>
          <a href={meta.season2026.fotmobUrl} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-block text-[11px] text-blue-400 hover:text-blue-300">
            Fotmob ↗
          </a>
        </div>
      </div>

      {/* Comparison rows */}
      <div className="border-t border-blue-800/30 px-5 pb-5 md:px-6">
        <p className="mb-3 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Nyckeltal
        </p>

        {/* Header row */}
        <div className="mb-1 grid grid-cols-[1fr_auto_auto] gap-2 px-2">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-600">Mätvärde</span>
          <span className="w-16 text-center text-[9px] font-semibold uppercase tracking-wide text-slate-500">2025</span>
          <span className="w-16 text-center text-[9px] font-semibold uppercase tracking-wide text-emerald-400/70">2026</span>
        </div>

        <div className="space-y-1.5">
          {rows.map((row) => {
            const wins2026 = row.trend === "better";
            const wins2025 = row.trend === "worse";
            const similar = row.trend === "similar";

            return (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border border-slate-800/60 bg-slate-900/30 px-3 py-2.5"
              >
                {/* Label + note */}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200">{row.label}</p>
                  {row.note && (
                    <p className="mt-0.5 text-[10px] leading-tight text-slate-500">{row.note}</p>
                  )}
                </div>

                {/* 2025 value */}
                <div
                  className={`flex w-16 flex-col items-center justify-center rounded-md px-1.5 py-1.5 ${
                    wins2025
                      ? "bg-amber-400/15 ring-1 ring-amber-400/40"
                      : wins2026
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      wins2025
                        ? "text-amber-200"
                        : similar
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {row.value2025}
                  </span>
                  {wins2025 && (
                    <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-300">
                      ✓ bäst
                    </span>
                  )}
                </div>

                {/* 2026 value */}
                <div
                  className={`flex w-16 flex-col items-center justify-center rounded-md px-1.5 py-1.5 ${
                    wins2026
                      ? "bg-emerald-500/15 ring-1 ring-emerald-500/40"
                      : wins2025
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      wins2026
                        ? "text-emerald-200"
                        : similar
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {row.value2026}
                  </span>
                  {wins2026 && (
                    <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-emerald-400">
                      ✓ bäst
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Källa: Fotmob/Opta matchdata. Grön cell = bäst för Hammarby i det nyckeltal.
        </p>
      </div>
    </section>
  );
}


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

type TeamStandoutInsight = {
  id: string;
  metric: MatchAnalysisMetricDefinition;
  theme: string;
  narrative: string;
  matchValue: number;
  season2026Value: number | null;
  season2025Value: number | null;
  deltaVs2026: number | null;
  deltaVs2025: number | null;
  relativeVs2026: number | null;
  relativeVs2025: number | null;
  isPositiveVs2026: boolean | null;
  isPositiveVs2025: boolean | null;
  selectedReferenceSeason: 2025 | 2026;
  selectedReferenceValue: number;
  selectedRawDelta: number;
  selectedRelativeDelta: number;
  isPositive: boolean;
  emphasis: "high" | "medium" | "low";
  score: number;
};

type MatchShotStandoutCard = {
  id: "shots" | "shots-on-target";
  label: string;
  matchValue: number;
  season2026Average: number | null;
  season2025Average: number | null;
  deltaVs2026: number | null;
  deltaVs2025: number | null;
  isPositive: boolean;
  summary: string;
};

type StandoutReferenceMetricKey = "xA" | "xG" | "recoveries" | "passes";

type StandoutReferenceDefinition = {
  key: StandoutReferenceMetricKey;
  label: string;
  decimals: number;
};

type StandoutReferenceRow = {
  playerId: number;
  playerName: string;
  roleName: string;
  matchValue: number;
  season2026Average: number;
  season2025Average: number | null;
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
    primaryMetricKey: "field_tilt",
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
    secondaryMetricKey: "xt_within_10s_after_recovery",
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

const TEAM_STANDOUT_COPY_BY_METRIC: Partial<
  Record<MatchAnalysisMetricKey, { theme: string; narrative: string }>
> = {
  np_xg: {
    theme: "Output",
    narrative: "Hammarby skapade hög chanskvalitet i avsluten",
  },
  np_xg_per_shot: {
    theme: "Output",
    narrative: "Avsluten höll hög kvalitet per försök",
  },
  field_tilt: {
    theme: "Territoriell kontroll",
    narrative: "Hammarby drev andelen avslut i matchbilden",
  },
  ball_possession_pct: {
    theme: "Kontrollspel",
    narrative: "Laget drev matchbilden med boll",
  },
  num_possessions_final_third: {
    theme: "Chance creation",
    narrative: "Hammarby etablerade spelet högt och ofta",
  },
  num_box_entries: {
    theme: "Chance creation",
    narrative: "Laget kom in i boxen i hög frekvens",
  },
  xt: {
    theme: "Attacking threat",
    narrative: "Anfallen gav tydligt framåthot",
  },
  xt_within_10s_after_recovery: {
    theme: "Attacking transition",
    narrative: "Omställningarna efter bollvinst var särskilt vassa",
  },
  num_recoveries_att_half: {
    theme: "Press & återerövring",
    narrative: "Hammarby vann tillbaka boll högt upp",
  },
  ppda: {
    theme: "Press & återerövring",
    narrative: "Pressintensiteten var tydlig i matchen",
  },
  defensive_action_height_m: {
    theme: "Defensiv höjd",
    narrative: "Laget försvarade högt och aggressivt",
  },
  opp_num_box_entries: {
    theme: "Defensiv kontroll",
    narrative: "Motståndaren begränsades i boxinträden",
  },
  opp_np_xg: {
    theme: "Defensiv kontroll",
    narrative: "Motståndaren hölls nere i xG",
  },
  opp_np_xg_per_shot: {
    theme: "Defensiv kontroll",
    narrative: "Motståndarens avslut blev lågkvalitativa",
  },
  opp_xt: {
    theme: "Defensiv kontroll",
    narrative: "Motståndarens hotvärde bromsades effektivt",
  },
  time_to_defensive_action_after_loss_att_half_s: {
    theme: "Återpress",
    narrative: "Laget agerade snabbt defensivt efter bolltapp",
  },
};

const ROUND_FOCUS_PRIORITY_METRICS: MatchAnalysisMetricKey[] = [
  "field_tilt",
  "num_possessions_final_third",
  "num_box_entries",
  "num_recoveries_att_half",
  "ppda",
  "np_xg",
];

const STANDOUT_REFERENCE_DEFINITIONS: Record<
  HammarbyRoundHighlightCategory,
  StandoutReferenceDefinition
> = {
  creative: {
    key: "xA",
    label: "xA",
    decimals: 2,
  },
  finishing: {
    key: "xG",
    label: "xG",
    decimals: 2,
  },
  recoveries: {
    key: "recoveries",
    label: "Återerövringar",
    decimals: 0,
  },
  distribution: {
    key: "passes",
    label: "Passningar",
    decimals: 0,
  },
  running: {
    key: "recoveries",
    label: "Löpdata",
    decimals: 0,
  },
};

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
      running: "emerald",
    };

    const iconByCategory: Record<
      HammarbyRoundHighlight["players"][number]["category"],
      string
    > = {
      creative: "🪄",
      finishing: "🎯",
      recoveries: "🛡️",
      distribution: "🧠",
      running: "⚡",
    };

    return {
      id: `${player.category}-${player.playerId}-${index}`,
      title: player.badge,
      icon: iconByCategory[player.category],
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

const DEFAULT_MATCH_ANALYSIS_METRIC_KEY: MatchAnalysisMetricKey = "field_tilt";
const MATCH_ANALYSIS_AVAILABLE_SEASONS = Array.from(
  new Set(hammarbyMatchAnalysisRounds.map((row) => row.season))
).sort((a, b) => a - b);
const DEFAULT_MATCH_ANALYSIS_SEASON =
  MATCH_ANALYSIS_AVAILABLE_SEASONS[MATCH_ANALYSIS_AVAILABLE_SEASONS.length - 1] ?? 2026;
const PREFERRED_ROUND_FOCUS_SEASON = 2026;
const ALLSVENSKAN_TOTAL_ROUNDS = 30;
const ROUND11_SURFACE =
  "rounded-2xl border border-emerald-700/35 bg-[#1a2d26] overflow-hidden";
const HISTORICAL_POINTS_PACE_BASELINES: Array<{
  seasonLabel: string;
  pointsPerRound: number;
  finalPoints: number;
}> = [
  {
    seasonLabel: "2025",
    pointsPerRound: 2.07,
    finalPoints: 62,
  },
  {
    seasonLabel: "2024",
    pointsPerRound: 1.8,
    finalPoints: 54,
  },
];
// Faktiska poäng efter omgång (Hammarby) från "Omgång för omgång i Allsvenskan 2024".
const HISTORICAL_2024_POINTS_BY_ROUND: Record<number, number> = {
  1: 3,
  2: 3,
  3: 6,
  4: 6,
  5: 6,
  6: 9,
  7: 9,
  8: 12,
  9: 12,
  10: 15,
  11: 18,
  12: 21,
  13: 22,
  14: 22,
  15: 25,
  16: 28,
  17: 31,
  18: 32,
  19: 35,
  20: 36,
  21: 39,
  22: 40,
  23: 41,
  24: 44,
  25: 44,
  26: 47,
  27: 50,
  28: 53,
  29: 54,
  30: 54,
};

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

function formatStandoutReferenceValue(value: number, decimals: number): string {
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatRelativeOutcomeDelta(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value * 100).toLocaleString("sv-SE", {
    maximumFractionDigits: 0,
  })}%`;
}

function computeRelativeOutcomeDelta(
  rawDelta: number,
  metric: MatchAnalysisMetricDefinition,
  referenceValue: number
): number {
  const directedDelta = metric.direction === "higher" ? rawDelta : -rawDelta;
  const denominator = Math.max(
    Math.abs(referenceValue),
    metric.format === "percent" ? 0.05 : metric.format === "decimal" ? 0.2 : 1
  );
  return directedDelta / denominator;
}

function getSimpleDeltaTone(value: number | null): string {
  if (value === null || value === 0) return "text-neutral-300";
  return value > 0 ? "text-green-300" : "text-rose-300";
}

function formatSimpleDelta(value: number | null, decimals = 0): string {
  if (value === null) return "–";
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toLocaleString("sv-SE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function getMatchPoints(goalsFor: number, goalsAgainst: number): number {
  if (goalsFor > goalsAgainst) return 3;
  if (goalsFor === goalsAgainst) return 1;
  return 0;
}

function getScoreFromMatchName(matchName: string): { homeGoals: number; awayGoals: number } | null {
  const scoreMatch = matchName.match(/(\d+)\s*-\s*(\d+)\s*$/);
  if (!scoreMatch) return null;
  return {
    homeGoals: Number(scoreMatch[1]),
    awayGoals: Number(scoreMatch[2]),
  };
}

function getPointsFromMatchAnalysisRound(row: HammarbyMatchAnalysisRound): number | null {
  const score = getScoreFromMatchName(row.matchName);
  if (!score) return null;
  const goalsFor = row.isHome ? score.homeGoals : score.awayGoals;
  const goalsAgainst = row.isHome ? score.awayGoals : score.homeGoals;
  return getMatchPoints(goalsFor, goalsAgainst);
}

function formatPointsPerRound(value: number): string {
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatShotsValue(value: number): string {
  return value.toLocaleString("sv-SE", {
    maximumFractionDigits: 0,
  });
}

function getDominantStandoutReference(
  insight: TeamStandoutInsight
): { season: 2025 | 2026; relative: number; isPositive: boolean } | null {
  const candidates = [
    insight.relativeVs2026 === null || insight.isPositiveVs2026 === null
      ? null
      : {
          season: 2026 as const,
          relative: insight.relativeVs2026,
          isPositive: insight.isPositiveVs2026,
        },
    insight.relativeVs2025 === null || insight.isPositiveVs2025 === null
      ? null
      : {
          season: 2025 as const,
          relative: insight.relativeVs2025,
          isPositive: insight.isPositiveVs2025,
        },
  ].filter(
    (
      candidate
    ): candidate is { season: 2025 | 2026; relative: number; isPositive: boolean } =>
      candidate !== null
  );
  if (candidates.length === 0) return null;
  return candidates.sort((left, right) => {
    const byMagnitude = Math.abs(right.relative) - Math.abs(left.relative);
    if (byMagnitude !== 0) return byMagnitude;
    return right.season - left.season;
  })[0];
}

function getStandoutBadgeLabel(insight: TeamStandoutInsight): string {
  const dominantReference = getDominantStandoutReference(insight);
  if (!dominantReference) return "Jämförelse saknas";
  const trendWord = dominantReference.isPositive ? "över snitt" : "under snitt";
  if (insight.emphasis === "high") {
    return `${dominantReference.isPositive ? "Kraftigt" : "Tydligt"} ${trendWord} ${dominantReference.season}`;
  }
  if (insight.emphasis === "medium") {
    return `${dominantReference.isPositive ? "Över" : "Under"} snitt ${dominantReference.season}`;
  }
  return `${dominantReference.isPositive ? "Svagt över" : "Svagt under"} snitt ${dominantReference.season}`;
}

function getStandoutOutcomeLabel(insight: TeamStandoutInsight): string {
  const positiveCount = Number(insight.isPositiveVs2026) + Number(insight.isPositiveVs2025);
  const availableCount =
    Number(insight.isPositiveVs2026 !== null) + Number(insight.isPositiveVs2025 !== null);
  if (availableCount === 0) return "Standout";
  if (positiveCount === availableCount) return "Positiv standout";
  if (positiveCount === 0) return "Negativ standout";
  return "Blandad standout";
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
  if (value === 0) return "text-neutral-300";
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

type MatchRankItem = {
  label: string;
  value: number;
  rank: number;
  total: number;
  isBest: boolean;
  isWorst: boolean;
  format: "number" | "percent" | "decimal";
  decimals: number;
  tone: "green" | "red" | "neutral";
  standoutScore: number;
  rankLabel: string | null;
  isStandout: boolean;
};

function getRankStandoutScore(rank: number, total: number): number {
  if (total <= 1) return 0;
  const midpoint = (total + 1) / 2;
  return Math.abs(rank - midpoint) / (midpoint - 1);
}

function getMatchRankLabel(rank: number, total: number): string | null {
  if (rank === 1) return "Bäst";
  if (rank === total) return "Sämst";
  if (rank === 2) return "Näst bäst";
  if (rank === total - 1) return "Näst sämst";
  if (rank === 3) return "Topp 3";
  if (rank === total - 2) return "Botten 3";
  return null;
}

function sortMatchRankItems(items: MatchRankItem[]): MatchRankItem[] {
  return [...items].sort((a, b) => {
    if (b.standoutScore !== a.standoutScore) {
      return b.standoutScore - a.standoutScore;
    }
    if (a.isStandout !== b.isStandout) {
      return a.isStandout ? -1 : 1;
    }
    if (a.tone !== b.tone) {
      const toneOrder = { green: 0, red: 1, neutral: 2 } as const;
      return toneOrder[a.tone] - toneOrder[b.tone];
    }
    return a.rank - b.rank;
  });
}

function splitMatchRankItems(items: MatchRankItem[]) {
  const standout = items.filter((item) => item.isStandout);
  const average = items.filter((item) => !item.isStandout);
  return { standout, average };
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
  const [selectedTeamStandoutReferenceSeason, setSelectedTeamStandoutReferenceSeason] = useState<
    2025 | 2026
  >(2026);
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
  const [roundTab, setRoundTab] = useState<"matchen" | "analys" | "sasong">("matchen");
  const [showCoachComparison, setShowCoachComparison] = useState(false);

  useEffect(() => {
    if (mode !== "round" || typeof round !== "number") return;
    setRoundVsSeasonRound((currentValue) => {
      const selectedRound = sortedMatches.find((item) => item.gameweek === round);
      const targetRound = selectedRound
        ? findMatchAnalysisRoundForOverview(selectedRound, PREFERRED_ROUND_FOCUS_SEASON)
        : hammarbyMatchAnalysisRounds.find(
            (row) => row.season === PREFERRED_ROUND_FOCUS_SEASON && row.gameweek === round,
          );
      if (targetRound) {
        return targetRound.key;
      }
      return currentValue;
    });
  }, [mode, round, sortedMatches]);

  const selectedRoundMatch =
    mode === "round" && typeof round === "number"
      ? sortedMatches.find((item) => item.gameweek === round) ?? null
      : null;
  const resolvedAnalysisRound = selectedRoundMatch
    ? findMatchAnalysisRoundForOverview(selectedRoundMatch)
    : undefined;
  const roundOverview = mode === "round" && selectedRoundMatch ? buildRoundOverview(selectedRoundMatch) : null;

  const matchRankItems = useMemo(() => {
    if (mode !== "round" || typeof round !== "number") return [];
    const currentAnalysis = resolvedAnalysisRound;
    if (!currentAnalysis) return [];
    const season2026Rows = hammarbyMatchAnalysisRounds.filter(
      (r) => r.season === 2026
    );
    if (season2026Rows.length < 2) return [];

    const items = hammarbyMatchAnalysisMetricDefinitions
      .map((def) => {
        const current = currentAnalysis.metrics[def.key];
        if (!current || current.value === 0) return null;
        const allValues = season2026Rows
          .map((r) => r.metrics[def.key]?.value ?? null)
          .filter((v): v is number => v !== null && v !== 0);
        if (allValues.length < 2) return null;
        const sorted = [...allValues].sort((a, b) =>
          def.direction === "higher" ? b - a : a - b
        );
        const rank = sorted.indexOf(current.value) + 1;
        const total = sorted.length;
        const tone: "green" | "red" | "neutral" =
          rank <= Math.ceil(total * 0.25) ? "green" : rank >= Math.ceil(total * 0.75) ? "red" : "neutral";
        const standoutScore = getRankStandoutScore(rank, total);
        const isStandout = tone !== "neutral" || rank <= 3 || rank >= total - 2;
        return {
          label: def.label,
          value: current.value,
          rank,
          total,
          isBest: rank === 1,
          isWorst: rank === total,
          format: def.format,
          decimals: def.decimals,
          tone,
          standoutScore,
          rankLabel: getMatchRankLabel(rank, total),
          isStandout,
        } satisfies MatchRankItem;
      })
      .filter((item): item is MatchRankItem => item !== null);

    return sortMatchRankItems(items);
  }, [mode, round, resolvedAnalysisRound]);
  const standoutPlayersForRound =
    mode === "round" && typeof round === "number"
      ? hammarbyRoundPlayerHighlights.find((entry) => entry.gameweek === round) ?? null
      : null;
  const standoutPlayerCards = standoutPlayersForRound
    ? getRoundHighlightCards(standoutPlayersForRound)
    : [];
  const combinedOverview = mode === "combined" ? buildCombinedOverview(sortedMatches) : null;
  const current = mode === "combined" ? combinedOverview : roundOverview;
  const season2026Points = sortedMatches.reduce(
    (sum, match) => sum + getMatchPoints(match.hammarby.goals, match.opponent.goals),
    0
  );
  const season2026RoundsPlayed = sortedMatches.length;
  const season2026PointsPerRound =
    season2026RoundsPlayed > 0 ? season2026Points / season2026RoundsPlayed : 0;
  const season2026ProjectedPoints = season2026PointsPerRound * ALLSVENSKAN_TOTAL_ROUNDS;
  const comparisonRound = mode === "round" && typeof round === "number" ? round : season2026RoundsPlayed;
  const season2026PointsThroughRound = sortedMatches
    .filter((match) => match.gameweek <= comparisonRound)
    .reduce((sum, match) => sum + getMatchPoints(match.hammarby.goals, match.opponent.goals), 0);
  const season2025PointsThroughRoundRows = hammarbyMatchAnalysisRounds
    .filter((row) => row.season === 2025 && row.competition === "Allsvenskan" && row.gameweek <= comparisonRound)
    .sort((a, b) => a.gameweek - b.gameweek);
  const season2025PointsThroughRound = season2025PointsThroughRoundRows.reduce((sum, row) => {
    const roundPoints = getPointsFromMatchAnalysisRound(row);
    return roundPoints === null ? sum : sum + roundPoints;
  }, 0);
  const season2025HasAllScores = season2025PointsThroughRoundRows.length > 0
    && season2025PointsThroughRoundRows.every((row) => getPointsFromMatchAnalysisRound(row) !== null);
  const season2025Baseline =
    HISTORICAL_POINTS_PACE_BASELINES.find((item) => item.seasonLabel === "2025") ?? null;
  const season2025EstimatedPointsThroughRound =
    season2025Baseline === null ? null : season2025Baseline.pointsPerRound * comparisonRound;
  const season2024Baseline =
    HISTORICAL_POINTS_PACE_BASELINES.find((item) => item.seasonLabel === "2024") ?? null;
  const season2024ActualPointsThroughRound = HISTORICAL_2024_POINTS_BY_ROUND[comparisonRound] ?? null;
  const season2024EstimatedPointsThroughRound =
    season2024Baseline === null ? null : season2024Baseline.pointsPerRound * comparisonRound;
  const pointsComparisonRows: PointsComparisonRow[] = [
    {
      seasonLabel: "2026",
      pointsAfterRoundText: `${season2026PointsThroughRound} p`,
      pointsPerRoundText: formatPointsPerRound(season2026PointsPerRound),
      seasonAverageText: `≈ ${Math.round(season2026ProjectedPoints)} p`,
      note: `Prognos baserad på ${formatPointsPerRound(season2026PointsPerRound)} p/omg`,
    },
    {
      seasonLabel: "2025",
      pointsAfterRoundText: season2025HasAllScores
        ? `${season2025PointsThroughRound} p`
        : season2025EstimatedPointsThroughRound === null
          ? "–"
          : `≈ ${season2025EstimatedPointsThroughRound.toLocaleString("sv-SE", {
              maximumFractionDigits: 1,
            })} p`,
      pointsPerRoundText:
        season2025Baseline === null ? "–" : formatPointsPerRound(season2025Baseline.pointsPerRound),
      seasonAverageText:
        season2025Baseline === null ? "–" : `${season2025Baseline.finalPoints} p`,
      note:
        season2025Baseline === null
          ? "Saknar referensdata"
          : "Faktisk säsongssiffra",
    },
    {
      seasonLabel: "2024",
      pointsAfterRoundText:
        season2024ActualPointsThroughRound !== null
          ? `${season2024ActualPointsThroughRound} p`
          : season2024EstimatedPointsThroughRound === null
          ? "–"
          : `≈ ${season2024EstimatedPointsThroughRound.toLocaleString("sv-SE", {
              maximumFractionDigits: 1,
            })} p`,
      pointsPerRoundText:
        season2024Baseline === null ? "–" : formatPointsPerRound(season2024Baseline.pointsPerRound),
      seasonAverageText:
        season2024Baseline === null ? "–" : `${season2024Baseline.finalPoints} p`,
      note:
        season2024Baseline === null
          ? "Saknar referensdata"
          : season2024ActualPointsThroughRound !== null
            ? `Faktisk poäng efter omgång ${comparisonRound} (Omgång för omgång i Allsvenskan 2024)`
            : "Faktisk säsongssiffra",
    },
  ];
  const isRound11Dashboard = mode === "round" && round === 11;
  const isRound12Dashboard = mode === "round" && round === 12;
  const isRound13Dashboard = mode === "round" && round === 13;
  const isRound14Dashboard = mode === "round" && round === 14;
  const isRound16Dashboard = mode === "round" && round === 16;
  const isRound17Dashboard = mode === "round" && round === 17;
  const isRound18Dashboard = mode === "round" && round === 18;
  const matchesThroughRound = sortedMatches.filter((match) => match.gameweek <= comparisonRound);
  const matchCountThroughRound = matchesThroughRound.length;
  const round11MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round11PointsBeforeMatch = season2026PointsThroughRound - round11MatchPoints;
  const round11MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round11PpgBefore =
    round11MatchCountBefore > 0 ? round11PointsBeforeMatch / round11MatchCountBefore : 0;
  const round11PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round11PointsContext: MatchPointsContext | null = isRound11Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round11MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round11PpgAfter,
        seasonPpgBefore: round11PpgBefore,
        matchDeltaVsPpg: round11MatchPoints - round11PpgBefore,
        projectedSeasonPoints: Math.round(round11PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round13MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round13PointsBeforeMatch = season2026PointsThroughRound - round13MatchPoints;
  const round13MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round13PpgBefore =
    round13MatchCountBefore > 0 ? round13PointsBeforeMatch / round13MatchCountBefore : 0;
  const round13PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round13PointsContext: MatchPointsContext | null = isRound13Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round13MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round13PpgAfter,
        seasonPpgBefore: round13PpgBefore,
        matchDeltaVsPpg: round13MatchPoints - round13PpgBefore,
        projectedSeasonPoints: Math.round(round13PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round14MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round14PointsBeforeMatch = season2026PointsThroughRound - round14MatchPoints;
  const round14MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round14PpgBefore =
    round14MatchCountBefore > 0 ? round14PointsBeforeMatch / round14MatchCountBefore : 0;
  const round14PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round14PointsContext: MatchPointsContext | null = isRound14Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round14MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round14PpgAfter,
        seasonPpgBefore: round14PpgBefore,
        matchDeltaVsPpg: round14MatchPoints - round14PpgBefore,
        projectedSeasonPoints: Math.round(round14PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round16MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round16PointsBeforeMatch = season2026PointsThroughRound - round16MatchPoints;
  const round16MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round16PpgBefore =
    round16MatchCountBefore > 0 ? round16PointsBeforeMatch / round16MatchCountBefore : 0;
  const round16PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round16PointsContext: MatchPointsContext | null = isRound16Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round16MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round16PpgAfter,
        seasonPpgBefore: round16PpgBefore,
        matchDeltaVsPpg: round16MatchPoints - round16PpgBefore,
        projectedSeasonPoints: Math.round(round16PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round16RefereeMatch = hammarbyRefereeMatches.find((m) => m.gameweek === 16);
  const round16DomarIndex = round16RefereeMatch ? calcDomarindex(round16RefereeMatch) : 0;
  const round16DomarRating = getDomarRating(round16DomarIndex);
  const round9RefereeMatch = hammarbyRefereeMatches.find((m) => m.gameweek === 9);
  const round9DomarIndex = round9RefereeMatch ? calcDomarindex(round9RefereeMatch) : 0;
  const round17MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round17PointsBeforeMatch = season2026PointsThroughRound - round17MatchPoints;
  const round17MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round17PpgBefore =
    round17MatchCountBefore > 0 ? round17PointsBeforeMatch / round17MatchCountBefore : 0;
  const round17PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round17PointsContext: MatchPointsContext | null = isRound17Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round17MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round17PpgAfter,
        seasonPpgBefore: round17PpgBefore,
        matchDeltaVsPpg: round17MatchPoints - round17PpgBefore,
        projectedSeasonPoints: Math.round(round17PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round18MatchPoints =
    selectedRoundMatch === null
      ? 0
      : getMatchPoints(selectedRoundMatch.hammarby.goals, selectedRoundMatch.opponent.goals);
  const round18PointsBeforeMatch = season2026PointsThroughRound - round18MatchPoints;
  const round18MatchCountBefore = Math.max(matchCountThroughRound - 1, 0);
  const round18PpgBefore =
    round18MatchCountBefore > 0 ? round18PointsBeforeMatch / round18MatchCountBefore : 0;
  const round18PpgAfter =
    matchCountThroughRound > 0 ? season2026PointsThroughRound / matchCountThroughRound : 0;
  const round18PointsContext: MatchPointsContext | null = isRound18Dashboard
    ? {
        seasonLabel: "2026",
        roundNumber: comparisonRound,
        matchPoints: round18MatchPoints,
        seasonPointsAfter: season2026PointsThroughRound,
        seasonPpgAfter: round18PpgAfter,
        seasonPpgBefore: round18PpgBefore,
        matchDeltaVsPpg: round18MatchPoints - round18PpgBefore,
        projectedSeasonPoints: Math.round(round18PpgAfter * ALLSVENSKAN_TOTAL_ROUNDS),
        matchesPlayed: matchCountThroughRound,
      }
    : null;
  const round17RefereeMatch = hammarbyRefereeMatches.find((m) => m.gameweek === 17);
  const round17DomarIndex = round17RefereeMatch ? calcDomarindex(round17RefereeMatch) : 0;
  const round17DomarRating = getDomarRating(round17DomarIndex);
  const round18RefereeMatch = hammarbyRefereeMatches.find((m) => m.gameweek === 18);
  const round18DomarIndex = round18RefereeMatch ? calcDomarindex(round18RefereeMatch) : 0;
  const round18DomarRating = getDomarRating(round18DomarIndex);
  const round18RunningMatch = isRound18Dashboard
    ? getRunningMatchForGameweek(hammarbyRunningMatches, 18)
    : null;
  const round3RefereeMatch = hammarbyRefereeMatches.find((m) => m.gameweek === 3);
  const round3DomarIndex = round3RefereeMatch ? calcDomarindex(round3RefereeMatch) : 0;
  const effectiveMatchAnalysisViewMode: MatchAnalysisViewMode =
    mode === "combined" ? "season-average" : matchAnalysisViewMode;

  const navItems = [
    { href: "/matchstatistik", label: "Översikt", active: false },
    { href: "/matchstatistik/sasong", label: "Säsong", active: mode === "combined" },
    { href: "/matchstatistik/omgang", label: "Omgångar", active: mode === "round" },
    { href: "/matchstatistik/coachjamforelse", label: "Rydström vs Karlsson", active: false },
    { href: "/matchstatistik/passningsanalys", label: "Passningsanalys", active: false },
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
  const playerTrendRoundRows =
    mode === "round" && typeof round === "number"
      ? hammarbyPlayerTrendMatches.find((match) => match.gameweek === round)?.players ?? []
      : [];
  const playerTrendRowsWithMinutes = playerTrendRoundRows.filter((player) => player.minutes > 0);

  const primaryStatToTrendMetric: Record<
    HammarbyRoundHighlightPlayer["primaryStatLabel"],
    keyof PlayerTrendMetrics | null
  > = {
    Nyckelpassningar: "keyPasses",
    xG: "xG",
    Återerövringar: "recoveries",
    Passningar: "passes",
    Maxhastighet: null,
  };

  const secondaryStatToTrendMetric: Record<
    HammarbyRoundHighlightPlayer["secondaryStatLabel"],
    keyof PlayerTrendMetrics | null
  > = {
    xA: "xA",
    "Skott på mål": "shotsOnTarget",
    "Vunna defensiva dueller": "defensiveDuels",
    "Lyckade passningar": "passes",
    Löpmeter: null,
  };

  const buildStandoutReferenceRows = (
    player: HammarbyRoundHighlightPlayer,
    metricKey: keyof PlayerTrendMetrics | null
  ): Array<{
    playerId: number;
    playerName: string;
    roleName: string;
    value: number;
    rank: number;
    isHighlighted: boolean;
  }> => {
    if (!metricKey || playerTrendRowsWithMinutes.length === 0) return [];
    const values = playerTrendRowsWithMinutes.map((trendPlayer) => {
      const value = trendPlayer.metrics[metricKey];
      return {
        playerId: trendPlayer.playerId,
        playerName: trendPlayer.playerName,
        roleName: trendPlayer.roleName,
        value: typeof value === "number" ? value : 0,
      };
    });
    const sorted = values
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value);
    const playerIndex = sorted.findIndex((entry) => entry.playerId === player.playerId);
    return sorted.slice(0, 5).map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isHighlighted: playerIndex >= 5 ? entry.playerId === player.playerId : false,
    }));
  };

  const standoutReferenceCards =
    mode === "round" && standoutPlayersForRound
      ? standoutPlayersForRound.players.map((player) => {
          const primaryMetricKey = primaryStatToTrendMetric[player.primaryStatLabel];
          const secondaryMetricKey = secondaryStatToTrendMetric[player.secondaryStatLabel];
          const primaryRows = buildStandoutReferenceRows(player, primaryMetricKey);
          const secondaryRows = buildStandoutReferenceRows(player, secondaryMetricKey);
          const seasonAverageRows = playerTrendRowsWithMinutes;
          const primarySeasonAverage =
            primaryMetricKey && seasonAverageRows.length > 0
              ? seasonAverageRows.reduce((sum, row) => sum + row.metrics[primaryMetricKey], 0) /
                seasonAverageRows.length
              : null;
          const secondarySeasonAverage =
            secondaryMetricKey && seasonAverageRows.length > 0
              ? seasonAverageRows.reduce((sum, row) => sum + row.metrics[secondaryMetricKey], 0) /
                seasonAverageRows.length
              : null;

          return {
            playerId: player.playerId,
            playerName: player.name,
            primaryStatLabel: player.primaryStatLabel,
            secondaryStatLabel: player.secondaryStatLabel,
            primaryRows,
            secondaryRows,
            primarySeasonAverage,
            secondarySeasonAverage,
          };
        })
      : [];
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
  const hammarbyFocusRoundKpiCards =
    mode === "round" && effectiveMatchAnalysisViewMode === "round" && selectedRoundData
      ? ROUND_FOCUS_PRIORITY_METRICS.flatMap((metricKey) => {
          const metric = MATCH_ANALYSIS_METRIC_DEFINITION_BY_KEY.get(metricKey);
          if (!metric) {
            return [];
          }
          const matchValue = selectedRoundData.metrics[metric.key].value;
          const season2026Value = seasonAverageForMetric(2026, metric.key);
          const season2025Value = seasonAverageForMetric(2025, metric.key);

          return [
            {
              metric,
              matchValue,
              season2026Value,
              season2025Value,
              deltaVs2026: season2026Value === null ? null : matchValue - season2026Value,
              deltaVs2025: season2025Value === null ? null : matchValue - season2025Value,
            },
          ];
        })
      : [];
  const teamStandoutInsights =
    mode === "round" && effectiveMatchAnalysisViewMode === "round" && selectedRoundData
      ? hammarbyMatchAnalysisMetricDefinitions
          .flatMap((metric) => {
            const currentValue = selectedRoundData.metrics[metric.key].value;
            const season2026Value = seasonAverageForMetric(2026, metric.key);
            const season2025Value = seasonAverageForMetric(2025, metric.key);
            if (season2026Value === null && season2025Value === null) return [];

            const deltaVs2026 = season2026Value === null ? null : currentValue - season2026Value;
            const deltaVs2025 = season2025Value === null ? null : currentValue - season2025Value;
            const relativeVs2026 =
              deltaVs2026 === null || season2026Value === null
                ? null
                : computeRelativeOutcomeDelta(deltaVs2026, metric, season2026Value);
            const relativeVs2025 =
              deltaVs2025 === null || season2025Value === null
                ? null
                : computeRelativeOutcomeDelta(deltaVs2025, metric, season2025Value);
            const isPositiveVs2026 = relativeVs2026 === null ? null : relativeVs2026 >= 0;
            const isPositiveVs2025 = relativeVs2025 === null ? null : relativeVs2025 >= 0;

            const selectedRawDelta =
              selectedTeamStandoutReferenceSeason === 2026
                ? deltaVs2026 ?? deltaVs2025 ?? 0
                : deltaVs2025 ?? deltaVs2026 ?? 0;
            const selectedRelativeDelta =
              selectedTeamStandoutReferenceSeason === 2026
                ? relativeVs2026 ?? relativeVs2025 ?? 0
                : relativeVs2025 ?? relativeVs2026 ?? 0;
            const selectedIsPositive =
              selectedTeamStandoutReferenceSeason === 2026
                ? isPositiveVs2026 ?? isPositiveVs2025 ?? true
                : isPositiveVs2025 ?? isPositiveVs2026 ?? true;
            const selectedReferenceValue =
              selectedTeamStandoutReferenceSeason === 2026
                ? season2026Value ?? season2025Value ?? currentValue
                : season2025Value ?? season2026Value ?? currentValue;

            const copy = TEAM_STANDOUT_COPY_BY_METRIC[metric.key] ?? {
              theme: "Lagnivå",
              narrative: "Matchbilden påverkades tydligt i den här KPI:n",
            };

            const score = Math.abs(selectedRelativeDelta);
            const emphasis: TeamStandoutInsight["emphasis"] =
              score >= 0.35 ? "high" : score >= 0.2 ? "medium" : "low";

            return [
              {
                id: `${metric.key}-${selectedTeamStandoutReferenceSeason}`,
                metric,
                theme: copy.theme,
                narrative: copy.narrative,
                matchValue: currentValue,
                season2026Value,
                season2025Value,
                deltaVs2026,
                deltaVs2025,
                relativeVs2026,
                relativeVs2025,
                isPositiveVs2026,
                isPositiveVs2025,
                selectedReferenceSeason: selectedTeamStandoutReferenceSeason,
                selectedReferenceValue,
                selectedRawDelta,
                selectedRelativeDelta,
                isPositive: selectedIsPositive,
                emphasis,
                score,
              } satisfies TeamStandoutInsight,
            ];
          })
          .sort((left, right) => right.score - left.score)
      : [];
  const seasonAverageForRoundOverviewMetric = (
    season: 2025 | 2026,
    metricKey: "shots" | "shotsOnTarget"
  ): number | null => {
    const seasonMatches = sourceRounds.filter((match) => match.date.startsWith(`${season}-`));
    if (seasonMatches.length === 0) return null;
    const total = seasonMatches.reduce((sum, match) => sum + match.hammarby[metricKey], 0);
    return total / seasonMatches.length;
  };
  const matchShotStandoutCards: MatchShotStandoutCard[] =
    mode === "round" && effectiveMatchAnalysisViewMode === "round" && selectedRoundMatch
      ? ([
          {
            id: "shots",
            label: "Skott",
            matchValue: selectedRoundMatch.hammarby.shots,
            season2026Average: seasonAverageForRoundOverviewMetric(2026, "shots"),
            season2025Average: seasonAverageForRoundOverviewMetric(2025, "shotsOnTarget"),
          },
          {
            id: "shots-on-target",
            label: "Skott på mål",
            matchValue: selectedRoundMatch.hammarby.shotsOnTarget,
            season2026Average: seasonAverageForRoundOverviewMetric(2026, "shotsOnTarget"),
            season2025Average: seasonAverageForRoundOverviewMetric(2025, "shotsOnTarget"),
          },
        ] satisfies Array<
          Omit<
            MatchShotStandoutCard,
            "deltaVs2026" | "deltaVs2025" | "isPositive" | "summary"
          >
        >).map((card) => {
          const selectedAverage =
            selectedTeamStandoutReferenceSeason === 2026
              ? card.season2026Average ?? card.season2025Average
              : card.season2025Average ?? card.season2026Average;
          const selectedDelta =
            selectedAverage === null ? null : card.matchValue - selectedAverage;
          const summary =
            selectedDelta === null
              ? `Saknar säsongssnitt ${selectedTeamStandoutReferenceSeason} för jämförelse just nu.`
              : selectedDelta >= 0
                ? `${formatSimpleDelta(selectedDelta)} över snitt ${selectedTeamStandoutReferenceSeason}.`
                : `${formatSimpleDelta(selectedDelta)} under snitt ${selectedTeamStandoutReferenceSeason}.`;
          return {
            ...card,
            deltaVs2026:
              card.season2026Average === null ? null : card.matchValue - card.season2026Average,
            deltaVs2025:
              card.season2025Average === null ? null : card.matchValue - card.season2025Average,
            isPositive: selectedDelta === null ? true : selectedDelta >= 0,
            summary,
          };
        })
      : [];
  const notableTeamStandoutInsights = teamStandoutInsights.filter(
    (insight) => Math.abs(insight.selectedRelativeDelta) >= 0.05
  );
  const positiveTeamStandoutInsights = notableTeamStandoutInsights.filter(
    (insight) => insight.selectedRelativeDelta > 0
  );
  const negativeTeamStandoutInsights = notableTeamStandoutInsights.filter(
    (insight) => insight.selectedRelativeDelta < 0
  );
  const teamStandoutTargetCount =
    notableTeamStandoutInsights.length >= 6
      ? 6
      : notableTeamStandoutInsights.length >= 5
        ? 5
        : notableTeamStandoutInsights.length >= 4
          ? 4
          : 3;
  const visibleTeamStandoutInsights = (() => {
    if (notableTeamStandoutInsights.length === 0) {
      return teamStandoutInsights.slice(0, Math.min(3, teamStandoutInsights.length));
    }

    if (positiveTeamStandoutInsights.length > 0 && negativeTeamStandoutInsights.length > 0) {
      const firstPositive = positiveTeamStandoutInsights[0];
      const firstNegative = negativeTeamStandoutInsights[0];
      const selected = [firstPositive, firstNegative];
      const selectedIds = new Set(selected.map((insight) => insight.id));
      const remainingInsights = notableTeamStandoutInsights.filter(
        (insight) => !selectedIds.has(insight.id)
      );
      return [...selected, ...remainingInsights].slice(0, teamStandoutTargetCount);
    }

    return notableTeamStandoutInsights.slice(0, teamStandoutTargetCount);
  })();
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
      <div className="min-h-screen bg-[#0d1117]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-neutral-300">Ingen matchstatistik tillgänglig för detta val.</p>
          <Link href="/" className="mt-4 inline-flex text-sm text-blue-300 hover:text-blue-200">
            ← Till startsidan
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${(isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard) ? "bg-[#13231d]" : "bg-[#0d1117]"}`}>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
          (isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard)
            ? "border-emerald-800/45 bg-[#163028]/95"
            : "border-white/[0.06] bg-[#0d1117]/90"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p
            className={`text-xs uppercase tracking-[0.2em] ${
              (isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard) ? "text-emerald-300/90" : "text-blue-400"
            }`}
          >
            Matchstatistik
          </p>
          <h1 className="text-2xl font-bold text-white">{current.title}</h1>
          <p className="mt-1 text-sm text-neutral-400">
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
                  : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-neutral-600">•</span>
          <Link href="/spelarstatistik" className="text-xs text-purple-300 hover:text-purple-200">
            Spelarstatistik
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-500/50 bg-neutral-900/70 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-slate-300 hover:bg-[#161b22]"
          >
            🏠 Huvudsida
          </Link>
          {mode === "round" && typeof round === "number" && (
            <div className="ml-auto flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-2 py-1">
              {previousRound ? (
                <Link
                  href={`/matchstatistik/omgang/${previousRound.gameweek}`}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-[11px] text-neutral-200 hover:border-slate-500 hover:text-white"
                >
                  ← Omg {previousRound.gameweek}
                </Link>
              ) : (
                <span className="px-2 py-1 text-[11px] text-neutral-500">←</span>
              )}
              <span className="text-[11px] text-neutral-300">Nu: Omg {round}</span>
              {nextRound ? (
                <Link
                  href={`/matchstatistik/omgang/${nextRound.gameweek}`}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-[11px] text-neutral-200 hover:border-slate-500 hover:text-white"
                >
                  Omg {nextRound.gameweek} →
                </Link>
              ) : (
                <span className="px-2 py-1 text-[11px] text-neutral-500">→</span>
              )}
            </div>
          )}
        </div>
        {mode === "round" && (round === 8 || round === 9 || round === 10 || round === 11 || round === 13 || round === 15 || round === 16 || round === 17 || round === 18) && (
          <div
            className={`border-t ${
              (isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard) ? "border-emerald-800/40 bg-[#163028]/95" : "border-white/[0.05] bg-[#0d1117]/95"
            }`}
          >
            <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
              {round === 11 && (
                <>
                  <a
                    href="#season-points"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25"
                  >
                    <span>📈</span>
                    <span>Poängsnitt</span>
                  </a>
                  <a
                    href="#match-recap"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>⚽</span>
                    <span>Match</span>
                  </a>
                  <a
                    href="#bolldata-spider"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>🕸️</span>
                    <span>Bolldata spindel</span>
                  </a>
                  <a
                    href="#match-twelve-ranking"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>📊</span>
                    <span>Matchranking</span>
                  </a>
                  <a
                    href="#prediction-vs-outcome"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>🎯</span>
                    <span>Analys vs utfall</span>
                  </a>
                </>
              )}
              {round === 13 && (
                <>
                  <a
                    href="#season-points"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25"
                  >
                    <span>📈</span>
                    <span>Poängsnitt</span>
                  </a>
                  <a
                    href="#match-recap"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>⚽</span>
                    <span>Match 4-0</span>
                  </a>
                  <a
                    href="#year-comparison"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
                  >
                    <span>📅</span>
                    <span>2025 vs 2026</span>
                  </a>
                  <a
                    href="#prediction-vs-outcome"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>🎯</span>
                    <span>Analys vs utfall</span>
                  </a>
                </>
              )}
              {round === 16 && (
                <>
                  <a
                    href="#season-points"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25"
                  >
                    <span>📈</span>
                    <span>Poängsnitt</span>
                  </a>
                  <a
                    href="#match-recap"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>⚽</span>
                    <span>Match 3-0</span>
                  </a>
                  <a
                    href="#domar-analys"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300/60 hover:bg-amber-400/20"
                  >
                    <span>🟨</span>
                    <span>Domaranalys</span>
                  </a>
                  <a
                    href="#bolldata-spider"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
                  >
                    <span>🕸️</span>
                    <span>Matchspindel</span>
                  </a>
                </>
              )}
              {round === 17 && (
                <>
                  <a
                    href="#season-points"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25"
                  >
                    <span>📈</span>
                    <span>Poängsnitt</span>
                  </a>
                  <a
                    href="#match-recap"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>⚽</span>
                    <span>Match 4-0</span>
                  </a>
                  <a
                    href="#analys-utfall"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <span>🎯</span>
                    <span>Analys vs utfall</span>
                  </a>
                  <a
                    href="#domar-analys"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300/60 hover:bg-amber-400/20"
                  >
                    <span>🟨</span>
                    <span>Domaranalys</span>
                  </a>
                  <a
                    href="#bolldata-spider"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
                  >
                    <span>🕸️</span>
                    <span>Matchspindel</span>
                  </a>
                </>
              )}
              {round === 18 && (
                <>
                  <a
                    href="#first-half"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: `${ROUND18_HIF_GREEN}99`,
                      backgroundColor: `${ROUND18_HIF_GREEN}33`,
                      color: ROUND18_HIF_LIGHT,
                    }}
                  >
                    <span>⚡</span>
                    <span>1:a halvlek</span>
                  </a>
                  <a
                    href="#match-recap"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: `${ROUND18_HIF_GREEN}66`,
                      backgroundColor: `${ROUND18_HIF_GREEN}22`,
                      color: ROUND18_HIF_LIGHT,
                    }}
                  >
                    <span>⚽</span>
                    <span>Match 2-0</span>
                  </a>
                  <a
                    href="#analys-utfall"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: `${ROUND18_HIF_GREEN}66`,
                      backgroundColor: `${ROUND18_HIF_GREEN}22`,
                      color: ROUND18_HIF_LIGHT,
                    }}
                  >
                    <span>🎯</span>
                    <span>Analys vs utfall</span>
                  </a>
                  <a
                    href="#coach-ppg"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: `${ROUND18_GAIS_YELLOW}66`,
                      backgroundColor: `${ROUND18_GAIS_YELLOW}18`,
                      color: ROUND18_GAIS_YELLOW,
                    }}
                  >
                    <span>📈</span>
                    <span>Tränare</span>
                  </a>
                  <a
                    href="#lopdata"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: `${ROUND18_HIF_GREEN}66`,
                      backgroundColor: `${ROUND18_HIF_GREEN}22`,
                      color: ROUND18_HIF_LIGHT,
                    }}
                  >
                    <span>🏃</span>
                    <span>Löpdata</span>
                  </a>
                  <a
                    href="#domar-analys"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: `${ROUND18_GAIS_YELLOW}55`,
                      backgroundColor: `${ROUND18_GAIS_YELLOW}14`,
                      color: ROUND18_GAIS_YELLOW,
                    }}
                  >
                    <span>🟨</span>
                    <span>Domaranalys</span>
                  </a>
                </>
              )}
              {round !== 11 && round !== 13 && round !== 16 && round !== 17 && round !== 18 && (
              <a
                href="#matchgenomgang"
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
              >
                <span>📊</span>
                <span>Matchgenomgång</span>
              </a>
              )}
              {round === 8 && (
                <a
                  href="#matchens-spelare"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300/60 hover:bg-amber-400/20"
                >
                  <span>⭐</span>
                  <span>Omgångens spelare</span>
                </a>
              )}
              {round !== 11 && round !== 13 && round !== 16 && round !== 17 && round !== 18 && (
              <a
                href="#prediction-vs-outcome"
                className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  round === 15
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-200 hover:border-rose-400/60 hover:bg-rose-500/20"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/20"
                }`}
              >
                <span>{round === 15 ? "❌" : "🎯"}</span>
                <span>{round === 15 ? "Vad gick fel?" : "Analys vs Utfall"}</span>
              </a>
              )}
            </div>
          </div>
        )}

        {/* ── Tab navigation (round mode only, not special rounds 11/13/14/16/17) ── */}
        {mode === "round" && !isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && (
          <div className="border-t border-white/[0.05] bg-[#0d1117]/95">
            <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2.5">
              {(
                [
                  { id: "matchen", label: "Matchen" },
                  { id: "analys",  label: "Analys & Spelstil" },
                  { id: "sasong",  label: "Säsong & Trender" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRoundTab(tab.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    roundTab === tab.id
                      ? "bg-green-500/20 text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.15)] ring-1 ring-green-500/50"
                      : "text-neutral-500 hover:bg-[#161b22]/70 hover:text-neutral-300"
                  }`}
                >
                  {tab.label}
                  {roundTab === tab.id && (
                    <span className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-green-400/60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main
        className={`mx-auto flex max-w-6xl flex-col px-4 py-8 ${
          (isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard) ? "gap-4" : "gap-8"
        }`}
      >
        {mode === "round" && isRound11Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round11PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {isRound11Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={elfsborgRound11Recap.headline}
              tagline={elfsborgRound11Recap.tagline}
              dateLabel={elfsborgRound11Recap.dateLabel}
              opponentLabel="Elfsborg"
              opponentScore={elfsborgRound11Recap.opponentScore}
              hammarbyScore={elfsborgRound11Recap.hammarbyScore}
              opponentXg={elfsborgRound11Recap.opponentXg}
              hammarbyXg={elfsborgRound11Recap.hammarbyXg}
              halftimeScore={elfsborgRound11Recap.halftimeScore}
              snapshotStats={elfsborgRound11SnapshotStats}
              snapshotPills={elfsborgRound11SnapshotPills}
              matchStory={elfsborgRound11MatchStory}
              goals={elfsborgRound11Goals}
              takeaways={elfsborgRound11Takeaways}
              spiderAxes={elfsborgRound11MatchSpider}
              sourceUrl={elfsborgRound11Recap.sourceUrl}
              hammarbySourceUrl={elfsborgRound11Recap.hammarbySourceUrl}
            />
            <div className="px-5 pb-5 md:px-6" id="prediction-vs-outcome">
              <PredictionVsOutcome embedded {...round11PredictionVsOutcome} />
            </div>
          </div>
        )}

        {/* ── Round 13: Hammarby 4-0 Degerfors ── */}
        {mode === "round" && isRound13Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round13PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {isRound13Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={degerforsRound13Recap.headline}
              tagline={degerforsRound13Recap.tagline}
              dateLabel={degerforsRound13Recap.dateLabel}
              opponentLabel="Degerfors IF"
              opponentScore={degerforsRound13Recap.opponentScore}
              hammarbyScore={degerforsRound13Recap.hammarbyScore}
              opponentXg={degerforsRound13Recap.opponentXg}
              hammarbyXg={degerforsRound13Recap.hammarbyXg}
              halftimeScore={degerforsRound13Recap.halftimeScore}
              snapshotStats={degerforsRound13SnapshotStats}
              snapshotPills={degerforsRound13SnapshotPills}
              matchStory={degerforsRound13MatchStory}
              goals={degerforsRound13Goals}
              takeaways={degerforsRound13Takeaways}
              spiderAxes={degerforsRound13MatchSpider}
              sourceUrl={degerforsRound13Recap.sourceUrl}
              hammarbySourceUrl={degerforsRound13Recap.hammarbySourceUrl}
            />
            <div className="px-5 pb-5 md:px-6" id="prediction-vs-outcome">
              <PredictionVsOutcome embedded {...round13PredictionVsOutcome} />
            </div>
          </div>
        )}

        {isRound13Dashboard && (
          <YearComparisonSection
            rows={degerforsYearComparison}
            meta={degerforsYearComparisonMeta}
          />
        )}

        {/* ── Round 14: Brommapojkarna 1-1 Hammarby ── */}
        {mode === "round" && isRound14Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round14PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {isRound14Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={brommapojkarnaRound14Recap.headline}
              tagline={brommapojkarnaRound14Recap.tagline}
              dateLabel={brommapojkarnaRound14Recap.dateLabel}
              opponentLabel="IF Brommapojkarna"
              opponentScore={brommapojkarnaRound14Recap.opponentScore}
              hammarbyScore={brommapojkarnaRound14Recap.hammarbyScore}
              opponentXg={brommapojkarnaRound14Recap.opponentXg}
              hammarbyXg={brommapojkarnaRound14Recap.hammarbyXg}
              halftimeScore={brommapojkarnaRound14Recap.halftimeScore}
              snapshotStats={brommapojkarnaRound14SnapshotStats}
              snapshotPills={brommapojkarnaRound14SnapshotPills}
              matchStory={brommapojkarnaRound14MatchStory}
              goals={brommapojkarnaRound14Goals}
              takeaways={brommapojkarnaRound14Takeaways}
              spiderAxes={brommapojkarnaRound14MatchSpider}
              sourceUrl={brommapojkarnaRound14Recap.sourceUrl}
              hammarbySourceUrl={brommapojkarnaRound14Recap.hammarbySourceUrl}
            />
          </div>
        )}

        {/* ── Round 16: Hammarby 3-0 BK Häcken ── */}
        {mode === "round" && isRound16Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round16PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {isRound16Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={hackenRound16Recap.headline}
              tagline={hackenRound16Recap.tagline}
              dateLabel={hackenRound16Recap.dateLabel}
              opponentLabel="BK Häcken"
              opponentScore={hackenRound16Recap.opponentScore}
              hammarbyScore={hackenRound16Recap.hammarbyScore}
              opponentXg={hackenRound16Recap.opponentXg}
              hammarbyXg={hackenRound16Recap.hammarbyXg}
              halftimeScore={hackenRound16Recap.halftimeScore}
              snapshotStats={hackenRound16SnapshotStats}
              snapshotPills={hackenRound16SnapshotPills}
              matchStory={hackenRound16MatchStory}
              goals={hackenRound16Goals}
              takeaways={hackenRound16Takeaways}
              spiderAxes={hackenRound16MatchSpider}
              sourceUrl={hackenRound16Recap.sourceUrl}
              hammarbySourceUrl={hackenRound16Recap.hammarbySourceUrl}
            />
          </div>
        )}

        {/* ── Round 16: Matchmomentum ── */}
        {isRound16Dashboard && (
          <MatchMomentumChart
            momentum={hackenRound16Momentum}
            goals={hackenRound16MomentumGoals}
            homeTeam="Hammarby"
            awayTeam="BK Häcken"
            homeLabel="HIF"
            awayLabel="HÄC"
          />
        )}

        {/* ── Round 16: Twelve KPI – Field Tilt, PPDA, rankings ── */}
        {isRound16Dashboard && (() => {
          const kpi = hackenRound16TwelveKpis;
          type RankKey = keyof typeof kpi.rankings;
          const rankKeys = Object.keys(kpi.rankings) as RankKey[];

          function KpiBar({ value, avg, higherIsBetter }: { value: number; avg: number; higherIsBetter: boolean }) {
            const isBetter = higherIsBetter ? value >= avg : value <= avg;
            const pct = Math.min((value / (avg * 2)) * 100, 100);
            const avgPct = Math.min((avg / (avg * 2)) * 100, 100);
            return (
              <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-emerald-950/60">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${isBetter ? "bg-emerald-400" : "bg-amber-400"}`}
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-white/30"
                  style={{ left: `${avgPct}%` }}
                  title="Säsongssnitt"
                />
              </div>
            );
          }

          function RankBadge({ rank, total, label }: { rank: number; total: number; label: string }) {
            const isTop = rank <= 3;
            const isBottom = rank >= total - 3;
            return (
              <div className={`flex flex-col items-center rounded-xl border px-3 py-2.5 ${
                isTop ? "border-emerald-500/40 bg-emerald-950/30" : isBottom ? "border-rose-500/25 bg-rose-950/20" : "border-white/[0.06] bg-[#1a2d26]"
              }`}>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                  isTop ? "text-emerald-400/80" : isBottom ? "text-rose-400/70" : "text-neutral-500"
                }`}>{label}</span>
                <span className={`mt-1 text-2xl font-black tabular-nums ${
                  isTop ? "text-emerald-300" : isBottom ? "text-rose-400" : "text-neutral-200"
                }`}>
                  #{rank}
                </span>
                <span className="text-[10px] text-neutral-600">av {total}</span>
              </div>
            );
          }

          return (
            <section className="overflow-hidden rounded-2xl border border-emerald-700/35 bg-[#1a2d26]">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 px-5 pt-5 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">Twelve nyckeltal</p>
                  <h3 className="mt-1 text-base font-bold text-white md:text-lg">Field Tilt · PPDA · Matchranking</h3>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Omgång 16 vs säsongssnitt (omg 1–15). Källa: Twelve Football match report.
                  </p>
                </div>
                <a
                  href="https://reports.twelve.football/reports/hammarby-match-report-vs-h%C3%A4cken-tZDmG5YCq5.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-1.5 text-[11px] font-medium text-emerald-300 hover:border-emerald-500/60 hover:text-emerald-200"
                >
                  Twelve rapport →
                </a>
              </div>

              {/* Primary KPI row: Field Tilt + PPDA */}
              <div className="grid grid-cols-2 gap-3 px-5 pb-4 sm:grid-cols-4">
                {/* Field Tilt */}
                <div className="col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70">Field Tilt</p>
                  <p className="mt-1 text-5xl font-black tabular-nums text-emerald-300">
                    {kpi.fieldTiltPct}<span className="text-2xl text-emerald-500/70">%</span>
                  </p>
                  <KpiBar value={kpi.fieldTiltPct} avg={kpi.fieldTiltAvgPct} higherIsBetter />
                  <p className="mt-1.5 text-[10px] text-neutral-500">
                    Snitt: {kpi.fieldTiltAvgPct}% &nbsp;·&nbsp;
                    <span className="text-emerald-400">+{kpi.fieldTiltPct - kpi.fieldTiltAvgPct}pp</span>
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">Andel av det totala anfallstrycket i sista tredjedelen.</p>
                </div>

                {/* PPDA */}
                <div className="col-span-2 rounded-xl border border-amber-500/15 bg-amber-950/10 p-4 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70">PPDA (press)</p>
                  <p className="mt-1 text-5xl font-black tabular-nums text-amber-300">
                    {kpi.ppda.toFixed(2)}
                  </p>
                  <KpiBar value={kpi.ppda} avg={kpi.ppdaAvg} higherIsBetter={false} />
                  <p className="mt-1.5 text-[10px] text-neutral-500">
                    Snitt: {kpi.ppdaAvg.toFixed(2)} &nbsp;·&nbsp;
                    <span className="text-amber-300">+{(kpi.ppda - kpi.ppdaAvg).toFixed(2)} (lägre press)</span>
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">Passningar per defensiv aktion – lägre = hårdare press.</p>
                </div>

                {/* xT */}
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">xT (HIF)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-white">{kpi.xt.toFixed(2)}</p>
                  <KpiBar value={kpi.xt} avg={kpi.xtAvg} higherIsBetter />
                  <p className="mt-1.5 text-[10px] text-neutral-500">Snitt: {kpi.xtAvg.toFixed(2)}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">Förväntat offensivt hot.</p>
                </div>

                {/* Opp xT */}
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">xT (Häcken)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-emerald-200">{kpi.oppXt.toFixed(2)}</p>
                  <KpiBar value={kpi.oppXt} avg={kpi.oppXtAvg} higherIsBetter={false} />
                  <p className="mt-1.5 text-[10px] text-neutral-500">Snitt: {kpi.oppXtAvg.toFixed(2)}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">Häckens offensiva hot.</p>
                </div>
              </div>

              {/* Secondary stats row */}
              <div className="grid grid-cols-3 gap-2 px-5 pb-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Def. aktionshöjd</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.defensiveActionHeightM}<span className="text-sm text-neutral-500"> m</span></p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Snitt: {kpi.defensiveActionHeightAvg} m &nbsp;·&nbsp; <span className="text-emerald-400">kompaktare block</span></p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Box touches (HIF)</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.boxTouches}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Snitt: {kpi.boxTouchesAvg} &nbsp;·&nbsp; <span className="text-emerald-400">+{kpi.boxTouches - kpi.boxTouchesAvg}</span></p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Press (intensity)</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.defensiveIntensity.toFixed(2)}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Snitt: {kpi.defensiveIntensityAvg.toFixed(2)} &nbsp;·&nbsp; <span className="text-amber-400">något lägre</span></p>
                </div>
              </div>

              {/* Twelve match rankings */}
              <div className="border-t border-emerald-700/20 px-5 py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Twelve matchranking (jämfört med alla Hammarby-matcher 2026, ur 28)
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {rankKeys.map((k) => {
                    const r = kpi.rankings[k];
                    return <RankBadge key={k} rank={r.rank} total={r.total} label={r.label} />;
                  })}
                </div>
                <p className="mt-3 text-[10px] text-neutral-500">
                  Källa: Twelve Football match report 9 aug 2026. Ranking avser Hammarbys prestation jämfört med sina egna matcher 2026 – inte mot ligasnitt.
                </p>
              </div>
            </section>
          );
        })()}

        {/* ── Round 16: Domaranalys – Adam Ladebäck ── */}
        {isRound16Dashboard && round16RefereeMatch && (
          <section id="domar-analys" className={`${ROUND11_SURFACE} p-5 md:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80">Domaranalys</p>
                <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                  {hackenRound16RefereeData.refereeName}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-400">Omgång 16 · 9 aug 2026 · Hammarby – BK Häcken</p>
              </div>
              <div className={`flex flex-col items-center rounded-xl border px-5 py-3 ${round16DomarRating.border} ${round16DomarRating.bg}`}>
                <span className="text-2xl">{round16DomarRating.emoji}</span>
                <span className={`mt-1 text-sm font-bold ${round16DomarRating.color}`}>{round16DomarRating.label}</span>
                <span className="mt-0.5 text-[10px] text-neutral-500">Domarindex</span>
                <span className={`text-2xl font-black tabular-nums ${round16DomarIndex > 0 ? "text-emerald-300" : round16DomarIndex < 0 ? "text-rose-400" : "text-slate-300"}`}>
                  {round16DomarIndex > 0 ? `+${round16DomarIndex}` : round16DomarIndex}
                </span>
              </div>
            </div>

            {/* Stat grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (HIF)</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-white">{hackenRound16RefereeData.matchFoulsHIF}</p>
                <p className="mt-1 text-[10px] text-neutral-600">begångna av Hammarby</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (Häcken)</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-emerald-300">{hackenRound16RefereeData.matchFoulsOpp}</p>
                <p className="mt-1 text-[10px] text-neutral-600">begångna av Häcken</p>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-amber-950/20 p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/70">Gula kort</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-amber-300">
                  {hackenRound16RefereeData.matchYellowHIF}–{hackenRound16RefereeData.matchYellowOpp}
                </p>
                <p className="mt-1 text-[10px] text-neutral-600">HIF – Häcken</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Röda kort</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-slate-300">
                  {hackenRound16RefereeData.matchRedHIF}–{hackenRound16RefereeData.matchRedOpp}
                </p>
                <p className="mt-1 text-[10px] text-neutral-600">HIF – Häcken</p>
              </div>
            </div>

            {/* Analysis text */}
            <div className="mt-4 rounded-xl border border-amber-500/15 bg-amber-950/10 p-4">
              <p className="text-sm leading-relaxed text-neutral-300">
                {hackenRound16RefereeData.analysis}
              </p>
            </div>

            {/* Previous match with this referee */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Ladebäcks tidigare Hammarby-match 2026
              </p>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-neutral-300">
                      Omgång {hackenRound16RefereeData.previousMatch.gameweek} · {hackenRound16RefereeData.previousMatch.date}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{hackenRound16RefereeData.previousMatch.matchName}</p>
                    <p className="mt-1 text-[11px] text-neutral-400">{hackenRound16RefereeData.previousMatch.note}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-neutral-500">Domarindex</span>
                    <span className={`text-3xl font-black tabular-nums ${round9DomarIndex > 0 ? "text-emerald-300" : round9DomarIndex < 0 ? "text-rose-400" : "text-slate-300"}`}>
                      {round9DomarIndex > 0 ? `+${round9DomarIndex}` : round9DomarIndex}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">{hackenRound16RefereeData.previousMatch.ratingLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <a
                href="/matchstatistik/domaranalys"
                className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300/60 hover:bg-amber-400/20"
              >
                → Full domarstatistik 2026
              </a>
            </div>
          </section>
        )}

        {/* ── Round 17: Kalmar 0-4 Hammarby ── */}
        {mode === "round" && isRound17Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round17PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {/* ── Round 18: Poängsnitt per tränare (efter GAIS 2–0) ── */}
        {isRound18Dashboard && (() => {
          const karlsson = coachRecords2026.karlsson;
          const rydstrom = coachRecords2026.rydstrom;
          const kAverages = getCoachRecordAverages(karlsson);
          const rAverages = getCoachRecordAverages(rydstrom);
          const K_MATCHES = karlsson.matches, K_POINTS = karlsson.points, K_GF = karlsson.goalsFor, K_GA = karlsson.goalsAgainst;
          const R_MATCHES = rydstrom.matches, R_POINTS = rydstrom.points, R_GF = rydstrom.goalsFor, R_GA = rydstrom.goalsAgainst;
          const totalMatches = K_MATCHES + R_MATCHES;
          const totalPoints  = K_POINTS  + R_POINTS;
          const totalGF = K_GF + R_GF, totalGA = K_GA + R_GA;
          const totalPpg = totalPoints / totalMatches;
          const kPpg     = kAverages.pointsPerGame;
          const rPpg     = rAverages.pointsPerGame;
          const barMax   = Math.max(kPpg, rPpg, 0.001);

          return (
            <section id="coach-ppg" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 px-5 pt-5 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5fd39a]">Tränarjämförelse</p>
                  <h3 className="mt-1 text-base font-bold text-white md:text-lg">Poängsnitt per tränare · Allsvenskan 2026</h3>
                </div>
                <Link
                  href="/matchstatistik/coachjamforelse"
                  className="rounded-lg border border-[#006633]/60 bg-[#006633]/20 px-3 py-1.5 text-[11px] font-medium text-[#5fd39a] hover:border-[#5fd39a]/60 hover:text-white"
                >
                  Full jämförelse →
                </Link>
              </div>

              {/* 2026 totalt */}
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">2026 totalt</p>
                  <p className="mt-0.5 text-2xl font-black tabular-nums text-white">
                    {totalPpg.toFixed(2).replace(".", ",")}
                    <span className="ml-1 text-sm font-normal text-white/45">p/m</span>
                  </p>
                </div>
                <div className="text-right text-xs text-white/35">
                  <p>{totalMatches} matcher · {totalPoints} poäng</p>
                  <p className="mt-0.5">{totalGF}–{totalGA} · MS {totalGF - totalGA > 0 ? "+" : ""}{totalGF - totalGA}</p>
                  <p className="mt-0.5 text-[10px]">Allsvenskan omg 1–18</p>
                </div>
              </div>

              {/* Coach rows */}
              <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
                {/* Karlsson */}
                <div className="bg-white/[0.04] px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/55">K. Karlsson</p>
                  <p className="mt-1 text-3xl font-black tabular-nums text-white">
                    {kPpg.toFixed(2).replace(".", ",")}
                    <span className="ml-1 text-sm font-normal text-white/45">p/m</span>
                  </p>
                  <p className="mt-2 inline-flex rounded-md border border-white/20 bg-white/10 px-2 py-1 text-sm font-bold tabular-nums text-white">
                    {K_POINTS} poäng totalt
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">{K_MATCHES} matcher</p>
                  <p className="mt-0.5 text-[11px] text-white/40">
                    {K_GF}–{K_GA} &nbsp;·&nbsp;
                    <span className="text-white/70">MS {K_GF - K_GA > 0 ? "+" : ""}{K_GF - K_GA}</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/25">{karlsson.roundsLabel}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-white/70" style={{ width: `${(kPpg / barMax) * 100}%` }} />
                  </div>
                </div>

                {/* Rydström */}
                <div className="bg-[#006633]/20 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#5fd39a]">H. Rydström</p>
                  <p className="mt-1 text-3xl font-black tabular-nums text-white">
                    {rPpg.toFixed(2).replace(".", ",")}
                    <span className="ml-1 text-sm font-normal text-[#5fd39a]/70">p/m</span>
                  </p>
                  <p className="mt-2 inline-flex rounded-md border border-[#5fd39a]/35 bg-[#006633]/50 px-2 py-1 text-sm font-bold tabular-nums text-white">
                    {R_POINTS} poäng totalt
                  </p>
                  <p className="mt-1 text-[11px] text-white/45">{R_MATCHES} matcher</p>
                  <p className="mt-0.5 text-[11px] text-white/45">
                    {R_GF}–{R_GA} &nbsp;·&nbsp;
                    <span className="text-[#5fd39a]">MS +{R_GF - R_GA}</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/25">{rydstrom.roundsLabel}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#006633]" style={{ width: `${(rPpg / barMax) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Delta callout */}
              <div className="border-t border-white/10 bg-black/40 px-5 py-3">
                <p className="text-[11px] text-white/55">
                  Efter 2–0 mot GAIS har Rydström gått förbi Karlsson i totalpoäng:{" "}
                  <span className="font-bold text-[#5fd39a]">{R_POINTS} mot {K_POINTS}</span>. Poängsnittet är{" "}
                  <span className="font-bold text-[#5fd39a]">+{((rPpg - kPpg) / kPpg * 100).toFixed(0)}%</span>{" "}
                  högre än Karlsson ({rPpg.toFixed(2).replace(".", ",")} vs {kPpg.toFixed(2).replace(".", ",")} p/m) –
                  med målskillnad {R_GF - R_GA > 0 ? "+" : ""}{R_GF - R_GA} mot {K_GF - K_GA > 0 ? "+" : ""}{K_GF - K_GA}.
                </p>
              </div>
            </section>
          );
        })()}

        {isRound17Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={kalmarRound17Recap.headline}
              tagline={kalmarRound17Recap.tagline}
              dateLabel={kalmarRound17Recap.dateLabel}
              opponentLabel="Kalmar FF"
              opponentScore={kalmarRound17Recap.opponentScore}
              hammarbyScore={kalmarRound17Recap.hammarbyScore}
              opponentXg={kalmarRound17Recap.opponentXg}
              hammarbyXg={kalmarRound17Recap.hammarbyXg}
              halftimeScore={kalmarRound17Recap.halftimeScore}
              snapshotStats={kalmarRound17SnapshotStats}
              snapshotPills={kalmarRound17SnapshotPills}
              matchStory={kalmarRound17MatchStory}
              goals={kalmarRound17Goals}
              takeaways={kalmarRound17Takeaways}
              spiderAxes={kalmarRound17MatchSpider}
              sourceUrl={kalmarRound17Recap.sourceUrl}
              hammarbySourceUrl={kalmarRound17Recap.hammarbySourceUrl}
            />
          </div>
        )}

        {/* ── Round 17: Analys vs utfall ── */}
        {isRound17Dashboard && (
          <div id="analys-utfall" className={ROUND11_SURFACE}>
            <PredictionVsOutcome embedded {...round17PredictionVsOutcome} />
          </div>
        )}

        {/* ── Round 17: Matchmomentum ── */}
        {isRound17Dashboard && (
          <MatchMomentumChart
            momentum={kalmarRound17Momentum}
            goals={kalmarRound17MomentumGoals}
            homeTeam="Kalmar FF"
            awayTeam="Hammarby"
            homeLabel="KAL"
            awayLabel="HIF"
          />
        )}

        {/* ── Round 17: Twelve KPI – Field Tilt, PPDA, rankings ── */}
        {isRound17Dashboard && (() => {
          const kpi = kalmarRound17TwelveKpis;
          type RankKey = keyof typeof kpi.rankings;
          const rankKeys = Object.keys(kpi.rankings) as RankKey[];

          function KpiBar({ value, avg, higherIsBetter }: { value: number; avg: number; higherIsBetter: boolean }) {
            const isBetter = higherIsBetter ? value >= avg : value <= avg;
            const pct = Math.min((value / (avg * 2)) * 100, 100);
            const avgPct = Math.min((avg / (avg * 2)) * 100, 100);
            return (
              <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-emerald-950/60">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${isBetter ? "bg-emerald-400" : "bg-amber-400"}`}
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-white/30"
                  style={{ left: `${avgPct}%` }}
                  title="Säsongssnitt"
                />
              </div>
            );
          }

          function RankBadge({ rank, total, label }: { rank: number; total: number; label: string }) {
            const isTop = rank <= 3;
            const isBottom = rank >= total - 3;
            return (
              <div className={`flex flex-col items-center rounded-xl border px-3 py-2.5 ${
                isTop ? "border-emerald-500/40 bg-emerald-950/30" : isBottom ? "border-rose-500/25 bg-rose-950/20" : "border-white/[0.06] bg-[#1a2d26]"
              }`}>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                  isTop ? "text-emerald-400/80" : isBottom ? "text-rose-400/70" : "text-neutral-500"
                }`}>{label}</span>
                <span className={`mt-1 text-2xl font-black tabular-nums ${
                  isTop ? "text-emerald-300" : isBottom ? "text-rose-400" : "text-neutral-200"
                }`}>
                  #{rank}
                </span>
                <span className="text-[10px] text-neutral-600">av {total}</span>
              </div>
            );
          }

          return (
            <section className="overflow-hidden rounded-2xl border border-emerald-700/35 bg-[#1a2d26]">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 px-5 pt-5 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">Twelve nyckeltal</p>
                  <h3 className="mt-1 text-base font-bold text-white md:text-lg">Field Tilt · PPDA · Matchranking</h3>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Omgång 17 vs säsongssnitt (omg 1–16). Källa: Twelve Football match report.
                  </p>
                </div>
                <a
                  href="https://reports.twelve.football/reports/hammarby-match-report-vs-kalmar-hqPXh2p8ec.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-1.5 text-[11px] font-medium text-emerald-300 hover:border-emerald-500/60 hover:text-emerald-200"
                >
                  Twelve rapport →
                </a>
              </div>

              {/* Primary KPI row: Field Tilt + PPDA */}
              <div className="grid grid-cols-2 gap-3 px-5 pb-4 sm:grid-cols-4">
                {/* Field Tilt */}
                <div className="col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70">Field Tilt</p>
                  <p className="mt-1 text-5xl font-black tabular-nums text-emerald-300">
                    {kpi.fieldTiltPct}<span className="text-2xl text-emerald-500/70">%</span>
                  </p>
                  <KpiBar value={kpi.fieldTiltPct} avg={kpi.fieldTiltAvgPct} higherIsBetter />
                  <p className="mt-1.5 text-[10px] text-neutral-500">
                    Snitt: {kpi.fieldTiltAvgPct}% &nbsp;·&nbsp;
                    <span className="text-emerald-400">+{kpi.fieldTiltPct - kpi.fieldTiltAvgPct}pp</span>
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">Andel av det totala anfallstrycket i sista tredjedelen.</p>
                </div>

                {/* PPDA */}
                <div className="col-span-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70">PPDA (press)</p>
                  <p className="mt-1 text-5xl font-black tabular-nums text-emerald-300">
                    {kpi.ppda.toFixed(2)}
                  </p>
                  <KpiBar value={kpi.ppda} avg={kpi.ppdaAvg} higherIsBetter={false} />
                  <p className="mt-1.5 text-[10px] text-neutral-500">
                    Snitt: {kpi.ppdaAvg.toFixed(2)} &nbsp;·&nbsp;
                    <span className="text-emerald-400">bättre press än snitt</span>
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">Passningar per defensiv aktion – lägre = hårdare press.</p>
                </div>

                {/* xT */}
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">xT (HIF)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-white">{kpi.xt.toFixed(2)}</p>
                  <KpiBar value={kpi.xt} avg={kpi.xtAvg} higherIsBetter />
                  <p className="mt-1.5 text-[10px] text-neutral-500">Snitt: {kpi.xtAvg.toFixed(2)}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">Förväntat offensivt hot.</p>
                </div>

                {/* Opp xT */}
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">xT (Kalmar)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-emerald-200">{kpi.oppXt.toFixed(2)}</p>
                  <KpiBar value={kpi.oppXt} avg={kpi.oppXtAvg} higherIsBetter={false} />
                  <p className="mt-1.5 text-[10px] text-neutral-500">Snitt: {kpi.oppXtAvg.toFixed(2)}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">Kalmars offensiva hot.</p>
                </div>
              </div>

              {/* Secondary stats row */}
              <div className="grid grid-cols-3 gap-2 px-5 pb-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Def. aktionshöjd</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.defensiveActionHeightM}<span className="text-sm text-neutral-500"> m</span></p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Snitt: {kpi.defensiveActionHeightAvg} m &nbsp;·&nbsp; <span className="text-emerald-400">mer aggressivt</span></p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Box touches (HIF)</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.boxTouches}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Snitt: {kpi.boxTouchesAvg} &nbsp;·&nbsp; <span className="text-emerald-400">+{kpi.boxTouches - kpi.boxTouchesAvg}</span></p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#162622] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">High opp. shots</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.rankings.chanceCreation.rank === 3 ? "9" : "–"}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Twelve: högt xG-avslut &nbsp;·&nbsp; <span className="text-emerald-400">9 st</span></p>
                </div>
              </div>

              {/* Twelve match rankings */}
              <div className="border-t border-emerald-700/20 px-5 py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Twelve matchranking (jämfört med alla Hammarby-matcher 2026, ur 28)
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {rankKeys.map((k) => {
                    const r = kpi.rankings[k];
                    return <RankBadge key={k} rank={r.rank} total={r.total} label={r.label} />;
                  })}
                </div>
                <p className="mt-3 text-[10px] text-neutral-500">
                  Källa: Twelve Football match report 16 aug 2026. Ranking avser Hammarbys prestation jämfört med sina egna matcher 2026 – inte mot ligasnitt.
                </p>
              </div>
            </section>
          );
        })()}

        {/* ── Round 17: Expected Threat (xT) ── */}
        {isRound17Dashboard && (() => {
          const PERIODS = ["0–15", "15–30", "30–HT", "45–60", "60–75", "75–FT"];
          const HIF_XT  = [0.34, 0.37, 0.17, 0.51, 0.22, 0.08];
          const KAL_XT  = [0.03, 0.02, 0.12, 0.00, 0.11, 0.27];
          const HIF_TOTAL = 1.68;
          const KAL_TOTAL = 0.55;
          const HIF_AVG   = 1.32;
          const KAL_AVG   = 0.92;
          const barMax = Math.max(...HIF_XT, ...KAL_XT, 0.001);

          return (
            <section className="overflow-hidden rounded-2xl border border-emerald-700/30 bg-[#1a2d26]">
              {/* Header */}
              <div className="border-b border-emerald-800/30 px-5 pt-5 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">Twelve · xT per 15-min period</p>
                <h3 className="mt-1 text-base font-bold text-white md:text-lg">Expected Threat (xT)</h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Uttalas: <span className="font-semibold text-neutral-200">ek-SPEK-tid THRET</span>
                  {" "}– "threat" rimmar med <span className="italic text-neutral-300">met, set, net</span>.{" "}
                  "th" är ett eget engelskt ljud (/θ/, tungan mot tänderna) som inte finns på svenska – svenska talare ersätter det oftast med ett T:{" "}
                  <span className="font-semibold text-neutral-200">ek-SPEK-tid TRET</span>.
                </p>
              </div>

              {/* What is xT */}
              <div className="border-b border-emerald-800/20 bg-emerald-950/20 px-5 py-4">
                <p className="text-[11px] leading-relaxed text-neutral-300">
                  <span className="font-semibold text-white">xT mäter hur mycket ett drag – ett pass eller en löpning – ökar laget sannolikheten att göra mål.</span>{" "}
                  Varje position på planen tilldelas ett värde (0–1) baserat på historiska data: ju närmre motståndarens mål och ju mer centralt, desto högre xT.
                  Ett pass från mitten till straffområdet kan ge ett xT-lyft på 0,05–0,10, medan ett hörnläge i anfallszonen värderas ännu högre.
                  Till skillnad från xG (som bara räknar avslut) fångar xT värdet av <em>hela kedjan</em> som leder fram till chansen.
                </p>
              </div>

              {/* Totals row */}
              <div className="grid grid-cols-2 divide-x divide-emerald-800/30 border-b border-emerald-800/30">
                <div className="px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">Hammarby</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-emerald-300">
                    {HIF_TOTAL.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    Snitt omg 1–16: {HIF_AVG.toFixed(2).replace(".", ",")} &nbsp;·&nbsp;
                    <span className="text-emerald-400">+{(HIF_TOTAL - HIF_AVG).toFixed(2).replace(".", ",")} över snitt</span>
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Kalmar FF</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-neutral-300">
                    {KAL_TOTAL.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    Snitt mot HIF 2026: {KAL_AVG.toFixed(2).replace(".", ",")} &nbsp;·&nbsp;
                    <span className="text-emerald-400/80">−{(KAL_AVG - KAL_TOTAL).toFixed(2).replace(".", ",")} under snitt</span>
                  </p>
                </div>
              </div>

              {/* Period bars */}
              <div className="px-5 py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">xT per 15-minutersperiod</p>
                <div className="space-y-3">
                  {PERIODS.map((period, i) => {
                    const hif = HIF_XT[i];
                    const kal = KAL_XT[i];
                    return (
                      <div key={period}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-neutral-500">{period}</span>
                          <div className="flex gap-3 text-[10px] tabular-nums">
                            <span className="text-emerald-400">HIF {hif.toFixed(2)}</span>
                            <span className="text-neutral-600">KAL {kal.toFixed(2)}</span>
                          </div>
                        </div>
                        {/* HIF bar */}
                        <div className="mb-0.5 h-2 w-full overflow-hidden rounded-full bg-emerald-950/60">
                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{ width: `${(hif / barMax) * 100}%` }}
                          />
                        </div>
                        {/* Kalmar bar */}
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-950/60">
                          <div
                            className="h-full rounded-full bg-neutral-500/50"
                            style={{ width: `${(kal / barMax) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-4 text-[10px] text-neutral-600">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-emerald-400 inline-block" />Hammarby</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm bg-neutral-500/50 inline-block" />Kalmar FF</span>
                </div>
              </div>

              {/* Insight callout */}
              <div className="border-t border-emerald-800/30 bg-emerald-950/30 px-5 py-3">
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Hammarbys totala xT ({HIF_TOTAL.toFixed(2).replace(".", ",")}) var{" "}
                  <span className="font-bold text-emerald-300">
                    {(HIF_TOTAL / KAL_TOTAL).toFixed(1).replace(".", ",")}×
                  </span>{" "}
                  högre än Kalmars ({KAL_TOTAL.toFixed(2).replace(".", ",")}). Toppperioden var 45–60 (0,51 xT) direkt efter paus – samma period Hammarby
                  petade in tre mål. Kalmars högsta period (75–FT: 0,27) kom när matchen redan var avgjord.
                </p>
              </div>
            </section>
          );
        })()}

        {/* ── Round 17: Domaranalys – Granit Maqedonci ── */}
        {isRound17Dashboard && round17RefereeMatch && (
          <section id="domar-analys" className={`${ROUND11_SURFACE} p-5 md:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80">Domaranalys</p>
                <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                  {kalmarRound17RefereeData.refereeName}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-400">Omgång 17 · 16 aug 2026 · Kalmar – Hammarby</p>
              </div>
              <div className={`flex flex-col items-center rounded-xl border px-5 py-3 ${round17DomarRating.border} ${round17DomarRating.bg}`}>
                <span className="text-2xl">{round17DomarRating.emoji}</span>
                <span className={`mt-1 text-sm font-bold ${round17DomarRating.color}`}>{round17DomarRating.label}</span>
                <span className="mt-0.5 text-[10px] text-neutral-500">Domarindex</span>
                <span className={`text-2xl font-black tabular-nums ${round17DomarIndex > 0 ? "text-emerald-300" : round17DomarIndex < 0 ? "text-rose-400" : "text-slate-300"}`}>
                  {round17DomarIndex > 0 ? `+${round17DomarIndex}` : round17DomarIndex}
                </span>
              </div>
            </div>

            {/* Stat grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (HIF)</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-white">{kalmarRound17RefereeData.matchFoulsHIF}</p>
                <p className="mt-1 text-[10px] text-neutral-600">begångna av Hammarby</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (Kalmar)</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-emerald-300">{kalmarRound17RefereeData.matchFoulsOpp}</p>
                <p className="mt-1 text-[10px] text-neutral-600">begångna av Kalmar</p>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-amber-950/20 p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/70">Gula kort</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-amber-300">
                  {kalmarRound17RefereeData.matchYellowHIF}–{kalmarRound17RefereeData.matchYellowOpp}
                </p>
                <p className="mt-1 text-[10px] text-neutral-600">HIF – Kalmar</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Röda kort</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-slate-300">
                  {kalmarRound17RefereeData.matchRedHIF}–{kalmarRound17RefereeData.matchRedOpp}
                </p>
                <p className="mt-1 text-[10px] text-neutral-600">HIF – Kalmar</p>
              </div>
            </div>

            {/* Analysis text */}
            <div className="mt-4 rounded-xl border border-amber-500/15 bg-amber-950/10 p-4">
              <p className="text-sm leading-relaxed text-neutral-300">
                {kalmarRound17RefereeData.analysis}
              </p>
            </div>

            {/* Previous match with this referee */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Maqedonci&#39;s tidigare Hammarby-match 2026
              </p>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-neutral-300">
                      Omgång {kalmarRound17RefereeData.previousMatch.gameweek} · {kalmarRound17RefereeData.previousMatch.date}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{kalmarRound17RefereeData.previousMatch.matchName}</p>
                    <p className="mt-1 text-[11px] text-neutral-400">{kalmarRound17RefereeData.previousMatch.note}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-neutral-500">Domarindex</span>
                    <span className={`text-3xl font-black tabular-nums ${round3DomarIndex > 0 ? "text-emerald-300" : round3DomarIndex < 0 ? "text-rose-400" : "text-slate-300"}`}>
                      {round3DomarIndex > 0 ? `+${round3DomarIndex}` : round3DomarIndex}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{kalmarRound17RefereeData.previousMatch.ratingLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <a
                href="/matchstatistik/domaranalys"
                className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:border-amber-300/60 hover:bg-amber-400/20"
              >
                → Full domarstatistik 2026
              </a>
            </div>
          </section>
        )}

        {/* ── Round 18: Hammarby 2-0 GAIS ── */}
        {mode === "round" && isRound18Dashboard && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
            matchContext={round18PointsContext}
            className={`${ROUND11_SURFACE} p-4 md:p-5`}
          />
        )}

        {isRound18Dashboard && (
          <section
            id="first-half"
            className="overflow-hidden rounded-2xl border bg-[#0b0b0b]"
            style={{ borderColor: `${ROUND18_HIF_GREEN}66` }}
          >
            <div
              className="h-2.5 w-full"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, ${ROUND18_HIF_GREEN} 0 14px, #ffffff 14px 28px)`,
                opacity: 0.9,
              }}
              aria-hidden
            />
            <div className="border-b border-white/10 px-5 pt-5 pb-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: ROUND18_HIF_LIGHT }}
                  >
                    Första halvlek · total överlägsenhet
                  </p>
                  <h3 className="mt-1 text-xl font-black text-white md:text-2xl">
                    {gaisRound18FirstHalf.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{gaisRound18FirstHalf.subtitle}</p>
                </div>
                <div
                  className="rounded-xl border px-4 py-3 text-center"
                  style={{
                    borderColor: `${ROUND18_HIF_GREEN}88`,
                    backgroundColor: `${ROUND18_HIF_GREEN}33`,
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">HT</p>
                  <p className="text-3xl font-black tabular-nums text-white">
                    {gaisRound18FirstHalf.scoreline}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">
                {gaisRound18FirstHalf.narrative}
              </p>
            </div>

            <div className="grid gap-3 px-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
              {gaisRound18FirstHalf.stats.map((stat) => {
                const width = (stat.hammarbyValue / (stat.hammarbyValue + stat.opponentValue || 1)) * 100;
                return (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <p className="text-2xl font-black tabular-nums" style={{ color: ROUND18_HIF_LIGHT }}>
                        {stat.hammarby}
                      </p>
                      <p className="text-lg font-bold tabular-nums" style={{ color: ROUND18_GAIS_YELLOW }}>
                        {stat.opponent}
                      </p>
                    </div>
                    <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full" style={{ width: `${width}%`, backgroundColor: ROUND18_HIF_GREEN }} />
                      <div className="h-full flex-1" style={{ backgroundColor: `${ROUND18_GAIS_YELLOW}55` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-wide">
                      <span style={{ color: ROUND18_HIF_LIGHT }}>HIF</span>
                      <span style={{ color: ROUND18_GAIS_YELLOW }}>GAIS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Twelve · 1H per 15 min (boll % · field tilt · avslut · np-xG)
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {gaisRound18FirstHalf.twelvePeriods.labels.map((label, i) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-[#0f1a14] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ROUND18_HIF_LIGHT }}>
                      {label}
                    </p>
                    <p className="mt-2 text-sm text-white">
                      Boll <span className="font-black tabular-nums">{gaisRound18FirstHalf.twelvePeriods.possessionPct[i]}%</span>
                      {" · "}Tilt{" "}
                      <span className="font-black tabular-nums">{gaisRound18FirstHalf.twelvePeriods.fieldTiltPct[i]}%</span>
                    </p>
                    <p className="mt-1 text-xs text-white/55">
                      {gaisRound18FirstHalf.twelvePeriods.shots[i]} avslut ·{" "}
                      {gaisRound18FirstHalf.twelvePeriods.npXg[i].toFixed(2).replace(".", ",")} xG ·{" "}
                      {gaisRound18FirstHalf.twelvePeriods.xt[i].toFixed(2).replace(".", ",")} xT
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 bg-black/30 px-5 py-4">
              {gaisRound18FirstHalf.callouts.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-white/70">
                  <span className="mr-2 font-bold" style={{ color: ROUND18_HIF_LIGHT }}>▸</span>
                  {line}
                </p>
              ))}
            </div>
          </section>
        )}

        {isRound18Dashboard && (
          <div id="match-recap" className={ROUND11_SURFACE}>
            <MatchRecapSection
              embedded
              headline={gaisRound18Recap.headline}
              tagline={gaisRound18Recap.tagline}
              dateLabel={gaisRound18Recap.dateLabel}
              opponentLabel="GAIS"
              opponentScore={gaisRound18Recap.opponentScore}
              hammarbyScore={gaisRound18Recap.hammarbyScore}
              opponentXg={gaisRound18Recap.opponentXg}
              hammarbyXg={gaisRound18Recap.hammarbyXg}
              halftimeScore={gaisRound18Recap.halftimeScore}
              snapshotStats={gaisRound18SnapshotStats}
              snapshotPills={gaisRound18SnapshotPills}
              matchStory={gaisRound18MatchStory}
              goals={gaisRound18Goals}
              takeaways={gaisRound18Takeaways}
              spiderAxes={gaisRound18MatchSpider}
              sourceUrl={gaisRound18Recap.sourceUrl}
              hammarbySourceUrl={gaisRound18Recap.hammarbySourceUrl}
            />
          </div>
        )}

        {isRound18Dashboard && (
          <div id="analys-utfall" className={ROUND11_SURFACE}>
            <PredictionVsOutcome embedded {...round18PredictionVsOutcome} />
          </div>
        )}

        {isRound18Dashboard && (
          <MatchMomentumChart
            momentum={gaisRound18Momentum}
            goals={gaisRound18MomentumGoals}
            homeTeam="Hammarby"
            awayTeam="GAIS"
            homeLabel="HIF"
            awayLabel="GAIS"
            homeColor={ROUND18_HIF_GREEN}
            awayColor={ROUND18_GAIS_YELLOW}
          />
        )}

        {isRound18Dashboard && (() => {
          const kpi = gaisRound18TwelveKpis;
          type RankKey = keyof typeof kpi.rankings;
          const rankKeys = Object.keys(kpi.rankings) as RankKey[];

          function RankBadge({ rank, total, label }: { rank: number; total: number; label: string }) {
            const isTop = rank <= 3;
            const isBottom = rank >= total - 3;
            return (
              <div
                className="flex flex-col items-center rounded-xl border px-3 py-2.5"
                style={{
                  borderColor: isTop ? `${ROUND18_HIF_GREEN}88` : isBottom ? "#fb718555" : "#ffffff14",
                  backgroundColor: isTop ? `${ROUND18_HIF_GREEN}22` : isBottom ? "#88133733" : "#1a2d26",
                }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-white/45">{label}</span>
                <span
                  className="mt-1 text-2xl font-black tabular-nums"
                  style={{ color: isTop ? ROUND18_HIF_LIGHT : isBottom ? "#fb7185" : "#e5e5e5" }}
                >
                  #{rank}
                </span>
                <span className="text-[10px] text-white/35">av {total}</span>
              </div>
            );
          }

          return (
            <section
              className="overflow-hidden rounded-2xl border bg-[#0b0b0b]"
              style={{ borderColor: `${ROUND18_HIF_GREEN}55` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 px-5 pt-5 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ROUND18_HIF_LIGHT }}>
                    Twelve nyckeltal
                  </p>
                  <h3 className="mt-1 text-base font-bold text-white md:text-lg">Field Tilt · PPDA · Matchranking</h3>
                  <p className="mt-0.5 text-xs text-white/45">
                    Omgång 18 vs säsongssnitt. Källa: Twelve Football match report vs GAIS.
                  </p>
                </div>
                <a
                  href={gaisRound18Recap.twelveReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    borderColor: `${ROUND18_HIF_GREEN}88`,
                    backgroundColor: `${ROUND18_HIF_GREEN}22`,
                    color: ROUND18_HIF_LIGHT,
                  }}
                >
                  Twelve rapport →
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 px-5 pb-4 sm:grid-cols-4">
                <div
                  className="col-span-2 rounded-xl border p-4 sm:col-span-1"
                  style={{ borderColor: `${ROUND18_HIF_GREEN}44`, backgroundColor: `${ROUND18_HIF_GREEN}18` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ROUND18_HIF_LIGHT }}>
                    Field Tilt
                  </p>
                  <p className="mt-1 text-5xl font-black tabular-nums" style={{ color: ROUND18_HIF_LIGHT }}>
                    {kpi.fieldTiltPct}
                    <span className="text-2xl opacity-70">%</span>
                  </p>
                  <p className="mt-1.5 text-[10px] text-white/45">
                    Snitt: {kpi.fieldTiltAvgPct}% · +{kpi.fieldTiltPct - kpi.fieldTiltAvgPct}pp
                  </p>
                </div>
                <div
                  className="col-span-2 rounded-xl border p-4 sm:col-span-1"
                  style={{ borderColor: `${ROUND18_GAIS_YELLOW}44`, backgroundColor: `${ROUND18_GAIS_YELLOW}12` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ROUND18_GAIS_YELLOW }}>
                    PPDA (press)
                  </p>
                  <p className="mt-1 text-5xl font-black tabular-nums text-white">{kpi.ppda.toFixed(2)}</p>
                  <p className="mt-1.5 text-[10px] text-white/45">
                    Snitt: {kpi.ppdaAvg.toFixed(2)} · säsongens hårdaste pressnivå
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">xT (HIF)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums text-white">{kpi.xt.toFixed(2)}</p>
                  <p className="mt-1.5 text-[10px] text-white/40">Snitt: {kpi.xtAvg.toFixed(2)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">xT (GAIS)</p>
                  <p className="mt-1 text-4xl font-black tabular-nums" style={{ color: ROUND18_GAIS_YELLOW }}>
                    {kpi.oppXt.toFixed(2)}
                  </p>
                  <p className="mt-1.5 text-[10px] text-white/40">Snitt emot: {kpi.oppXtAvg.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 px-5 pb-4">
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Def. aktionshöjd</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">
                    {kpi.defensiveActionHeightM}
                    <span className="text-sm text-white/40"> m</span>
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Box touches</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.boxTouches}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">
                    Snitt {kpi.boxTouchesAvg} · +{kpi.boxTouches - kpi.boxTouchesAvg}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">High opp. shots</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white">{kpi.highOppShots}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">Def. intensitet {kpi.defensiveIntensity}</p>
                </div>
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Twelve matchranking (ur 28 lag denna omgång)
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {rankKeys.map((k) => {
                    const r = kpi.rankings[k];
                    return <RankBadge key={k} rank={r.rank} total={r.total} label={r.label} />;
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {isRound18Dashboard && round18RunningMatch && (
          <section id="lopdata" className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2 px-1">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: ROUND18_HIF_LIGHT }}
                >
                  Löpdata · Allsvenskan GPS
                </p>
                <h3 className="mt-1 text-base font-bold text-white md:text-lg">
                  Hammarby mot GAIS · omgång 18
                </h3>
                <p className="mt-0.5 text-xs text-white/45">
                  Lagsträcka {(round18RunningMatch.hammarbyTeamDistanceMeters / 1000).toLocaleString("sv-SE", { maximumFractionDigits: 1 })} km · toppfart{" "}
                  {round18RunningMatch.hammarbyTopSpeedKmh.toLocaleString("sv-SE", { maximumFractionDigits: 1 })} km/h
                </p>
              </div>
              <a
                href={round18RunningMatch.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border px-3 py-1.5 text-[11px] font-medium"
                style={{
                  borderColor: `${ROUND18_HIF_GREEN}88`,
                  backgroundColor: `${ROUND18_HIF_GREEN}22`,
                  color: ROUND18_HIF_LIGHT,
                }}
              >
                Allsvenskan.se →
              </a>
            </div>
            <RoundRunningStatsSection
              match={round18RunningMatch}
              allDetailMatches={hammarbyRunningMatches}
            />
          </section>
        )}

        {isRound18Dashboard && round18RefereeMatch && (
          <section id="domar-analys" className={`${ROUND11_SURFACE} p-5 md:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ROUND18_GAIS_YELLOW }}>
                  Domaranalys
                </p>
                <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                  {gaisRound18RefereeData.refereeName}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-400">Omgång 18 · 23 aug 2026 · Hammarby – GAIS</p>
              </div>
              <div
                className={`flex flex-col items-center rounded-xl border px-5 py-3 ${round18DomarRating.border} ${round18DomarRating.bg}`}
              >
                <span className="text-2xl">{round18DomarRating.emoji}</span>
                <span className={`mt-1 text-sm font-bold ${round18DomarRating.color}`}>{round18DomarRating.label}</span>
                <span className="mt-0.5 text-[10px] text-neutral-500">Domarindex</span>
                <span
                  className={`text-2xl font-black tabular-nums ${
                    round18DomarIndex > 0 ? "text-emerald-300" : round18DomarIndex < 0 ? "text-rose-400" : "text-slate-300"
                  }`}
                >
                  {round18DomarIndex > 0 ? `+${round18DomarIndex}` : round18DomarIndex}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (HIF)</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-white">{gaisRound18RefereeData.matchFoulsHIF}</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Fouls (GAIS)</p>
                <p className="mt-1 text-4xl font-black tabular-nums" style={{ color: ROUND18_GAIS_YELLOW }}>
                  {gaisRound18RefereeData.matchFoulsOpp}
                </p>
              </div>
              <div
                className="rounded-xl border p-4 text-center"
                style={{ borderColor: `${ROUND18_GAIS_YELLOW}33`, backgroundColor: `${ROUND18_GAIS_YELLOW}12` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: ROUND18_GAIS_YELLOW }}>
                  Gula kort
                </p>
                <p className="mt-1 text-4xl font-black tabular-nums" style={{ color: ROUND18_GAIS_YELLOW }}>
                  {gaisRound18RefereeData.matchYellowHIF}–{gaisRound18RefereeData.matchYellowOpp}
                </p>
                <p className="mt-1 text-[10px] text-neutral-600">HIF – GAIS</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Röda kort</p>
                <p className="mt-1 text-4xl font-black tabular-nums text-slate-300">
                  {gaisRound18RefereeData.matchRedHIF}–{gaisRound18RefereeData.matchRedOpp}
                </p>
              </div>
            </div>

            <div
              className="mt-4 rounded-xl border p-4"
              style={{ borderColor: `${ROUND18_GAIS_YELLOW}22`, backgroundColor: `${ROUND18_GAIS_YELLOW}0d` }}
            >
              <p className="text-sm leading-relaxed text-neutral-300">{gaisRound18RefereeData.analysis}</p>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Wolfs tidigare Hammarby-match 2026
              </p>
              <div className="rounded-xl border border-white/[0.06] bg-[#1a2d26] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-neutral-300">
                      Omgång {gaisRound18RefereeData.previousMatch.gameweek} · {gaisRound18RefereeData.previousMatch.date}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {gaisRound18RefereeData.previousMatch.matchName}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">{gaisRound18RefereeData.previousMatch.note}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-neutral-500">Domarindex</span>
                    <span className="text-3xl font-black tabular-nums text-emerald-300">
                      +{gaisRound18RefereeData.previousMatch.domarindex}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {gaisRound18RefereeData.previousMatch.ratingLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <a
                href="/matchstatistik/domaranalys"
                className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: `${ROUND18_GAIS_YELLOW}55`,
                  backgroundColor: `${ROUND18_GAIS_YELLOW}14`,
                  color: ROUND18_GAIS_YELLOW,
                }}
              >
                → Full domarstatistik 2026
              </a>
            </div>
          </section>
        )}

        {!isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && (mode === "combined" || roundTab === "matchen") && (
        <section id="matchgenomgang" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* Hammarby goals */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0d1f12] p-5">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-600/0 via-emerald-500/70 to-emerald-600/0" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/70">Hammarby</p>
            <p className="mt-1 text-5xl font-black tabular-nums text-white">
              {current.leftTeam === "Hammarby"
                ? (current.stats.find((s) => s.key === "goals")?.home ?? 0)
                : (current.stats.find((s) => s.key === "goals")?.away ?? 0)}
            </p>
            <p className="mt-1 text-xs font-medium text-neutral-500">Mål</p>
          </div>
          {/* Opponent goals */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161b22] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              {current.leftTeam === "Hammarby" ? current.rightTeam : current.leftTeam}
            </p>
            <p className="mt-1 text-5xl font-black tabular-nums text-neutral-300">
              {current.leftTeam === "Hammarby"
                ? (current.stats.find((s) => s.key === "goals")?.away ?? 0)
                : (current.stats.find((s) => s.key === "goals")?.home ?? 0)}
            </p>
            <p className="mt-1 text-xs font-medium text-neutral-500">Mål</p>
          </div>
          {/* xG */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161b22] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Hammarby xG</p>
            <p className="mt-1 text-5xl font-black tabular-nums text-white">
              {(current.leftTeam === "Hammarby"
                ? current.stats.find((s) => s.key === "xg")?.home
                : current.stats.find((s) => s.key === "xg")?.away
              )?.toFixed(2) ?? "0.00"}
            </p>
            <p className="mt-1 text-xs font-medium text-neutral-500">Förväntade mål</p>
          </div>
          {/* Possession */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161b22] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Bollinnehav</p>
            <p className="mt-1 text-5xl font-black tabular-nums text-white">
              {current.leftTeam === "Hammarby"
                ? `${current.stats.find((s) => s.key === "possession")?.home ?? 0}`
                : `${current.stats.find((s) => s.key === "possession")?.away ?? 0}`}<span className="text-2xl text-neutral-500">%</span>
            </p>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${current.leftTeam === "Hammarby" ? (current.stats.find((s) => s.key === "possession")?.home ?? 0) : (current.stats.find((s) => s.key === "possession")?.away ?? 0)}%` }}
              />
            </div>
          </div>
        </section>
        )}

        {mode === "round" && !isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && roundTab === "sasong" && (
          <PointsComparisonSection
            comparisonRound={comparisonRound}
            pointsComparisonRows={pointsComparisonRows}
          />
        )}

        {/* ── Matchanalys KPI cards (Twelve data) ── */}
        {mode === "round" && !isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && roundTab === "matchen" && resolvedAnalysisRound && (
          <MatchAnalysisKpiSection
            roundData={resolvedAnalysisRound}
            matchLabel={selectedRoundMatch ? `${selectedRoundMatch.matchName}` : ""}
          />
        )}

        {mode === "round" && standoutPlayersForRound && !isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && roundTab === "matchen" && (
          <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Standout-spelare (Hammarby, omgång {standoutPlayersForRound.gameweek})
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Lyfter spelare som utmärkte sig i olika roller i matchen.
                </p>
              </div>
              <a
                href={standoutPlayersForRound.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs text-neutral-200 hover:border-slate-500 hover:text-white"
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
                    <p className="text-xs text-neutral-400">{card.player.roleName}</p>
                    <p className="mt-2 text-[11px] text-neutral-300">
                      {card.metricLabel}: <span className="font-semibold text-neutral-100">{card.metricValue}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
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
          !isRound11Dashboard &&
          !isRound13Dashboard &&
          roundTab === "analys" &&
          effectiveMatchAnalysisViewMode === "round" &&
          selectedRoundData &&
          visibleTeamStandoutInsights.length > 0 && (
            <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Lagets standout i omgången (det som stack ut)
                  </h2>
                  <p className="mt-1 text-sm text-neutral-400">
                    Kompletterar KPI-översikten ovan med korta insikter om vad som verkligen stack
                    ut i matchbilden. Vanligtvis visas minst 3 punkter, med balans mellan positivt
                    och negativt.
                  </p>
                </div>
                <a
                  href={selectedRoundData.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs text-neutral-200 hover:border-slate-500 hover:text-white"
                >
                  Matchanalyskälla
                </a>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visibleTeamStandoutInsights.map((insight) => {
                  const isPos = insight.isPositive;
                  const badgeLabel = getStandoutOutcomeLabel(insight);
                  // Progress bar: match value vs avg2026 (0–200% scale capped at 100)
                  const avg = insight.season2026Value ?? insight.season2025Value ?? insight.matchValue;
                  const barMatch = avg > 0 ? Math.min(100, (insight.matchValue / (avg * 2)) * 100) : 50;
                  const barAvg   = avg > 0 ? Math.min(100, (avg                / (avg * 2)) * 100) : 50;
                  return (
                    <article
                      key={`team-standout-${insight.id}`}
                      className={`relative overflow-hidden rounded-2xl border p-5 ${
                        isPos
                          ? "border-emerald-500/20 bg-[#0d1f12]"
                          : "border-red-500/20 bg-[#1a0f0f]"
                      }`}
                    >
                      {/* Top accent line */}
                      <div className={`absolute inset-x-0 top-0 h-0.5 ${
                        isPos
                          ? "bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"
                          : "bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
                      }`} />

                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                          {insight.theme}
                        </p>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isPos
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-red-500/15 text-red-300"
                        }`}>
                          {badgeLabel}
                        </span>
                      </div>

                      {/* Metric name + value */}
                      <p className="mt-2 text-sm font-semibold text-neutral-200">{insight.metric.label}</p>
                      <p className={`mt-1 text-2xl font-black tabular-nums ${isPos ? "text-emerald-300" : "text-red-300"}`}>
                        {formatMatchAnalysisValue(insight.matchValue, insight.metric)}
                      </p>

                      {/* Progress bar: match vs avg */}
                      <div className="mt-3 space-y-1.5">
                        <div>
                          <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                            <span>Denna match</span>
                            <span className={isPos ? "text-emerald-400" : "text-red-400"}>
                              {formatMatchAnalysisValue(insight.matchValue, insight.metric)}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${isPos ? "bg-emerald-500" : "bg-red-500"}`}
                              style={{ width: `${barMatch}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                            <span>Snitt 2026</span>
                            <span>{insight.season2026Value !== null ? formatMatchAnalysisValue(insight.season2026Value, insight.metric) : "–"}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                            <div
                              className="h-full rounded-full bg-neutral-500 transition-all duration-700"
                              style={{ width: `${barAvg}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Delta summary */}
                      {insight.deltaVs2026 !== null && (
                        <p className={`mt-3 text-[11px] font-semibold ${
                          getMatchAnalysisDeltaTone(insight.deltaVs2026, insight.metric.direction)
                        }`}>
                          {formatDeltaWithMeaning(insight.deltaVs2026, insight.metric)} vs snitt 2026
                          {insight.relativeVs2026 !== null && (
                            <span className="ml-1 font-normal text-neutral-500">
                              ({formatRelativeOutcomeDelta(insight.relativeVs2026)})
                            </span>
                          )}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

        {mode === "round" &&
          !isRound11Dashboard &&
          !isRound13Dashboard &&
          roundTab === "analys" &&
          effectiveMatchAnalysisViewMode === "round" &&
          selectedRoundData &&
          playstyleProfiles.length > 0 && (
            <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Spelstil & spelsätt som stack ut (omgång {roundVsSeasonRow?.gameweek})
                  </h2>
                  <p className="mt-1 text-sm text-neutral-400">
                    Profilkort som visar hur matchen skiljde sig mot säsongssnitt 2026 och 2025.
                  </p>
                </div>
                <a
                  href={selectedRoundData.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs text-neutral-200 hover:border-slate-500 hover:text-white"
                >
                  Matchanalyskälla
                </a>
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {playstyleProfiles.map((profile) => {
                  const isPos = profile.tone === "emerald" || profile.tone === "cyan";
                  const renderSnapshot = (
                    snapshot: PlaystyleMetricSnapshot,
                    snapshotLabel: string,
                    isPrimary: boolean
                  ) => {
                    const comparisonValues = [
                      snapshot.currentValue,
                      snapshot.average2026 ?? 0,
                      snapshot.average2025 ?? 0,
                    ];
                    const maxVal = Math.max(...comparisonValues, 0.001);
                    const wMatch = `${Math.min(100, (snapshot.currentValue / maxVal) * 100).toFixed(1)}%`;
                    const w2026  = `${Math.min(100, ((snapshot.average2026 ?? 0) / maxVal) * 100).toFixed(1)}%`;
                    const w2025  = `${Math.min(100, ((snapshot.average2025 ?? 0) / maxVal) * 100).toFixed(1)}%`;
                    return (
                      <div className={`rounded-xl border p-4 ${isPrimary ? "border-white/[0.08] bg-neutral-900/80" : "border-white/[0.05] bg-neutral-900/40"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${isPrimary ? "bg-emerald-400" : "bg-neutral-500"}`} />
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">{snapshotLabel}</p>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-neutral-200">{snapshot.metric.label}</p>

                        <div className="mt-3 space-y-2.5">
                          {/* Match bar */}
                          <div>
                            <div className="mb-1 flex justify-between text-[11px]">
                              <span className="text-neutral-400">Denna match</span>
                              <span className="font-bold text-white">{formatMatchAnalysisValue(snapshot.currentValue, snapshot.metric)}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                              <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: wMatch }} />
                            </div>
                          </div>
                          {/* 2026 bar */}
                          <div>
                            <div className="mb-1 flex justify-between text-[11px]">
                              <span className="text-neutral-500">Snitt 2026</span>
                              <span className="text-neutral-300">
                                {snapshot.average2026 !== null ? formatMatchAnalysisValue(snapshot.average2026, snapshot.metric) : "–"}
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                              <div className="h-full rounded-full bg-neutral-500 transition-all duration-700" style={{ width: w2026 }} />
                            </div>
                          </div>
                          {/* 2025 bar */}
                          {snapshot.average2025 !== null && (
                            <div>
                              <div className="mb-1 flex justify-between text-[11px]">
                                <span className="text-neutral-500">Snitt 2025</span>
                                <span className="text-neutral-400">{formatMatchAnalysisValue(snapshot.average2025, snapshot.metric)}</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                                <div className="h-full rounded-full bg-neutral-600 transition-all duration-700" style={{ width: w2025 }} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Delta chips */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {snapshot.deltaVs2026 !== null && (
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              getMatchAnalysisDeltaTone(snapshot.deltaVs2026, snapshot.metric.direction) === "text-green-300"
                                ? "bg-emerald-500/15 text-emerald-300"
                                : getMatchAnalysisDeltaTone(snapshot.deltaVs2026, snapshot.metric.direction) === "text-rose-300"
                                  ? "bg-red-500/15 text-red-300"
                                  : "bg-neutral-800 text-neutral-400"
                            }`}>
                              Δ'26 {formatDeltaWithMeaning(snapshot.deltaVs2026, snapshot.metric)}
                            </span>
                          )}
                          {snapshot.deltaVs2025 !== null && (
                            <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
                              Δ'25 {formatDeltaWithMeaning(snapshot.deltaVs2025, snapshot.metric)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  };

                  return (
                    <article
                      key={`playstyle-${profile.id}`}
                      className={`relative overflow-hidden rounded-2xl border p-5 ${
                        isPos
                          ? "border-emerald-500/20 bg-[#0d1f12]"
                          : "border-red-500/15 bg-[#1a0f0f]"
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-0.5 ${
                        isPos
                          ? "bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                          : "bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                      }`} />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Spelstilsprofil</p>
                          <p className={`mt-1 text-base font-bold ${isPos ? "text-emerald-300" : "text-red-300"}`}>
                            {profile.icon} {profile.title}
                          </p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isPos ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                        }`}>
                          {isPos ? "Positiv" : "Negativ"}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-neutral-400">{profile.description}</p>
                      <div className="mt-4 space-y-3">
                        {renderSnapshot(profile.primary, "Primär KPI", true)}
                        {profile.secondary && renderSnapshot(profile.secondary, "Stöd-KPI", false)}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

        {mode === "round" && matchRankItems.length > 0 && isRound11Dashboard && (() => {
          const { standout, average } = splitMatchRankItems(matchRankItems);
          const getDot = (item: MatchRankItem) => {
            if (item.rank <= 3) return "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]";
            if (item.rank >= item.total - 2) return "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]";
            return "bg-neutral-600";
          };
          const renderRankCard = (item: MatchRankItem) => (
            <div
              key={item.label}
              className={`group relative overflow-hidden rounded-xl border px-4 py-3 transition-colors ${
                item.tone === "red"
                  ? "border-red-500/25 bg-red-950/30 hover:border-red-500/40"
                  : item.tone === "green"
                    ? "border-emerald-500/25 bg-emerald-950/30 hover:border-emerald-500/40"
                    : "border-white/[0.06] bg-[#1c2128] hover:border-white/[0.10]"
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-px ${
                item.tone === "red" ? "bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                  : item.tone === "green" ? "bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                  : "hidden"
              }`} />
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-1.5">
                  <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${getDot(item)}`} />
                  <p className="text-[11px] font-medium leading-snug text-neutral-500">{item.label}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                    item.tone === "red"
                      ? "bg-red-500/15 text-red-300"
                      : item.tone === "green"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  #{item.rank}
                </span>
              </div>
              <p
                className={`mt-2 text-xl font-black tabular-nums tracking-tight ${
                  item.tone === "red"
                    ? "text-red-200"
                    : item.tone === "green"
                      ? "text-emerald-200"
                      : "text-neutral-200"
                }`}
              >
                {item.format === "percent"
                  ? `${(item.value * 100).toFixed(item.decimals)}%`
                  : item.value.toFixed(item.decimals)}
              </p>
              {item.rankLabel && (
                <p className={`mt-0.5 text-[10px] font-medium ${
                  item.tone === "red" ? "text-red-400" : item.tone === "green" ? "text-emerald-400" : "text-neutral-500"
                }`}>
                  {item.rankLabel} av {item.total}
                </p>
              )}
            </div>
          );

          return (
            <section
              id={isRound11Dashboard ? "match-twelve-ranking" : undefined}
              className={
                isRound11Dashboard
                  ? `${ROUND11_SURFACE} p-5`
                  : "rounded-2xl border border-white/[0.06] bg-[#161b22] p-5"
              }
            >
              <h2 className="text-base font-semibold text-white">Matchranking (Twelve)</h2>
              <p className="mt-1 text-xs text-neutral-400">
                Vad som stack ut positivt och negativt jämfört med övriga Hammarbymatcher 2026.
                Genomsnittliga värden visas sist.
              </p>

              <div className={`mt-5 grid gap-6 ${standout.length > 0 && average.length > 0 ? "md:grid-cols-2" : ""}`}>
                {standout.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                        Stod ut
                      </p>
                    </div>
                    <div className="space-y-2">
                      {standout.map(renderRankCard)}
                    </div>
                  </div>
                )}
                {average.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                        Nära snittet
                      </p>
                    </div>
                    <div className="space-y-2">
                      {average.map(renderRankCard)}
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })()}

        {!isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && (mode === "combined" || roundTab === "matchen") && (
        <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
          <h2 className="text-lg font-semibold text-white">Nyckeltal (vad du ser)</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Värdena visar totalen för det valda urvalet. I kombinerat läge är det summerat över
            alla spelade omgångar.
          </p>
          {mode === "combined" && (
            <div className="mt-3 rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2 text-xs text-neutral-300">
              <p>
                Per omgång (snitt):{" "}
                <span className="font-semibold text-neutral-100">
                  {current.subtitle.match(/Omgång/g)?.length ?? 1}
                </span>{" "}
                spelade omgångar i urvalet.
              </p>
              <p className="mt-1 text-neutral-400">
                Exempel: Passningar = total i urvalet, medan passningsprocent visas som procent.
              </p>
            </div>
          )}
          <div className="mt-5 space-y-4">
            {(() => {
              const hammarbyIsLeft = current.leftTeam === "Hammarby";
              const hammarbyGradient = "linear-gradient(90deg, #15803d, #4ade80)";
              const oppGradient = "linear-gradient(90deg, #334155, #64748b)";
              return current.stats.map((stat) => {
                const leftWidth = getBarWidth(stat.home, stat.away);
                const rightWidth = 100 - leftWidth;
                const roundsInView = mode === "combined" ? Math.max(sortedMatches.length, 1) : 1;
                const perRoundHome = stat.home / roundsInView;
                const perRoundAway = stat.away / roundsInView;
                const showPerRound = mode === "combined" && stat.format !== "percent";
                return (
                  <div key={stat.key}>
                    <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                      <span className={`font-mono ${hammarbyIsLeft ? "text-green-300" : "text-neutral-400"}`}>
                        {formatValue(stat.home, stat.format)}
                      </span>
                      <span className="text-center text-xs uppercase tracking-wide text-neutral-400">
                        {stat.label}
                      </span>
                      <span className={`font-mono ${!hammarbyIsLeft ? "text-green-300" : "text-neutral-400"}`}>
                        {formatValue(stat.away, stat.format)}
                      </span>
                    </div>
                    <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-neutral-800/40">
                      <div
                        className="rounded-l-full transition-all"
                        style={{
                          width: `${leftWidth}%`,
                          background: hammarbyIsLeft ? hammarbyGradient : oppGradient,
                        }}
                      />
                      <div
                        className="rounded-r-full transition-all"
                        style={{
                          width: `${rightWidth}%`,
                          background: !hammarbyIsLeft ? hammarbyGradient : oppGradient,
                        }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-neutral-600">
                      <span>{current.leftTeam}</span>
                      <span>{current.rightTeam}</span>
                    </div>
                    {showPerRound && (
                      <p className="mt-1 text-[11px] text-neutral-500">
                        Snitt/omgång: {current.leftTeam}{" "}
                        {formatCompactValue(perRoundHome, stat.format)} • {current.rightTeam}{" "}
                        {formatCompactValue(perRoundAway, stat.format)}
                      </p>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </section>
        )}

        {!isRound11Dashboard && !isRound13Dashboard && !isRound14Dashboard && !isRound16Dashboard && !isRound17Dashboard && !isRound18Dashboard && (mode === "combined" || roundTab === "sasong") && (
        <>
        <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Trend omgång för omgång (Hammarby)
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Jämför hur Hammarby utvecklas mellan omgångarna inom valda nyckeltal.
              </p>
            </div>
            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Parameter
              <select
                value={selectedTrendMetricKey}
                onChange={(event) =>
                  setSelectedTrendMetricKey(event.target.value as TrendMetricKey)
                }
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {TREND_METRIC_OPTIONS.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-3 text-xs text-neutral-300 md:grid-cols-3">
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Senast</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(
                  trendPoints[trendPoints.length - 1]?.value ?? 0,
                  selectedTrendMetric.format
                )}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Snitt</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatCompactValue(trendAverage, selectedTrendMetric.format)}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Trend (första → senaste)</p>
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

          <div className="mt-3 grid gap-2 text-xs text-neutral-400 md:grid-cols-2">
            {trendPoints.map((point) => (
              <div
                key={`legend-${point.gameweek}`}
                className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2"
              >
                Omgång {point.gameweek}: {point.opponent} ({formatDate(point.date)})
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-[#161b22] p-6 [content-visibility:auto] [contain-intrinsic-size:820px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Matchanalys omgång för omgång (Hammarby KPI)
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Hammarbys egna matchanalys-metriker per omgång med perioder 0-15 till 75-FT.
              </p>
            </div>
            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              KPI
              <select
                value={selectedMatchAnalysisMetricKey}
                onChange={(event) =>
                  setSelectedMatchAnalysisMetricKey(
                    event.target.value as MatchAnalysisMetricKey
                  )
                }
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
              >
                {hammarbyMatchAnalysisMetricDefinitions.map((metric) => (
                  <option key={metric.key} value={metric.key}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Tolkning:{" "}
            {selectedMatchAnalysisMetric.direction === "higher"
              ? "högre värde är oftast bättre för den här KPI:n."
              : "lägre värde är oftast bättre för den här KPI:n."}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Färgkodning: <span className="font-semibold text-green-300">Grön = bättre</span>,{" "}
            <span className="font-semibold text-rose-300">Röd = sämre</span> enligt vald KPI
            (inte alltid plus/minus i sig).
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs text-neutral-300">
              Visning
              <select
                value={effectiveMatchAnalysisViewMode}
                onChange={(event) =>
                  setMatchAnalysisViewMode(event.target.value as MatchAnalysisViewMode)
                }
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                disabled={mode === "combined"}
              >
                <option value="round">Omgång</option>
                <option value="season-average">Säsongsgenomsnitt</option>
              </select>
            </label>
            {mode === "round" && (
              <label className="flex flex-col gap-1 text-xs text-neutral-300">
                Säsong
                <select
                  value={selectedMatchAnalysisSeason}
                  onChange={(event) => setSelectedMatchAnalysisSeason(Number(event.target.value))}
                  className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                >
                  {MATCH_ANALYSIS_AVAILABLE_SEASONS.map((seasonValue) => (
                    <option key={`analysis-season-${seasonValue}`} value={seasonValue}>
                      {seasonValue}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {hammarbyFocusRoundKpiCards.length > 0 && roundVsSeasonRow && (
            <div className="mt-4 rounded-xl border border-blue-500/25 bg-neutral-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-blue-100">
                    Hammarby KPI-översikt (omgång {roundVsSeasonRow.gameweek})
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Snabb överblick av omgångens viktigaste KPI:er (inkl. Field Tilt) mot snitt
                    2026 och 2025.
                  </p>
                </div>
                <a
                  href={selectedRoundData?.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-neutral-700 bg-neutral-950/70 px-2 py-1 text-[11px] text-neutral-200 hover:border-slate-500 hover:text-white"
                >
                  Öppna matchanalys
                </a>
              </div>
              <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-2 xl:grid-cols-3">
                {hammarbyFocusRoundKpiCards.map((card) => (
                  <article
                    key={`focus-kpi-${card.metric.key}`}
                    className="rounded-lg border border-white/[0.07] bg-neutral-950/70 px-3 py-2"
                  >
                    <p className="text-neutral-300">{card.metric.label}</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {formatMatchAnalysisValue(card.matchValue, card.metric)}
                    </p>
                    <p className="mt-1 text-neutral-500">
                      2026:{" "}
                      {card.season2026Value === null
                        ? "–"
                        : formatMatchAnalysisValue(card.season2026Value, card.metric)}
                    </p>
                    <p className="text-neutral-500">
                      2025:{" "}
                      {card.season2025Value === null
                        ? "–"
                        : formatMatchAnalysisValue(card.season2025Value, card.metric)}
                    </p>
                    <div className="mt-1 space-y-0.5">
                      <p
                        className={
                          card.deltaVs2026 === null
                            ? "text-neutral-400"
                            : getMatchAnalysisDeltaTone(
                                card.deltaVs2026,
                                card.metric.direction
                              )
                        }
                      >
                        Δ vs 2026: {formatDeltaWithMeaning(card.deltaVs2026, card.metric)}
                      </p>
                      <p
                        className={
                          card.deltaVs2025 === null
                            ? "text-neutral-400"
                            : getMatchAnalysisDeltaTone(
                                card.deltaVs2025,
                                card.metric.direction
                              )
                        }
                      >
                        Δ vs 2025: {formatDeltaWithMeaning(card.deltaVs2025, card.metric)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-3 text-xs text-neutral-300 md:grid-cols-4">
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Senaste omgång</p>
              <p className="mt-1 text-base font-semibold text-white">
                {latestMatchAnalysisRow
                  ? formatMatchAnalysisValue(
                      latestMatchAnalysisRow.value,
                      selectedMatchAnalysisMetric
                    )
                  : "–"}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Snitt (omgångar)</p>
              <p className="mt-1 text-base font-semibold text-white">
                {formatMatchAnalysisValue(matchAnalysisAverage, selectedMatchAnalysisMetric)}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Senaste vs säsongssnitt</p>
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
            <div className="rounded-lg border border-white/[0.07] bg-neutral-900/60 px-3 py-2">
              <p className="text-neutral-400">Trend (första → senaste)</p>
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
                className="rounded-lg border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-left text-neutral-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                {showSeasonRows ? "Dölj omgångslista" : "Visa omgångslista"}
              </button>
            </div>
          )}

          {mode !== "round" &&
            effectiveMatchAnalysisViewMode === "round" &&
            comparisonRowA &&
            comparisonRowB && (
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-neutral-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">Jämför två omgångar</h3>
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                Snabbt sätt att se skillnad mot säsongsnivån.
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                KPI (samma för alla jämförelser):{" "}
                <span className="font-semibold text-neutral-200">
                  {selectedMatchAnalysisMetric.label}
                </span>
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-xs text-neutral-300">
                  Omgång A
                  <select
                    value={comparisonRoundA}
                    onChange={(event) => setComparisonRoundA(event.target.value)}
                    className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                  >
                    {seasonRows.map((row) => (
                      <option key={`round-a-${row.key}`} value={row.key}>
                        Omgång {row.gameweek} ({row.opponent})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs text-neutral-300">
                  Omgång B
                  <select
                    value={comparisonRoundB}
                    onChange={(event) => setComparisonRoundB(event.target.value)}
                    className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-400"
                  >
                    {seasonRows.map((row) => (
                      <option key={`round-b-${row.key}`} value={row.key}>
                        Omgång {row.gameweek} ({row.opponent})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-3 grid gap-3 text-xs text-neutral-300 sm:grid-cols-3">
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">
                    Omg {comparisonRowA.gameweek} → Omg {comparisonRowB.gameweek}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(comparisonRowA.value, selectedMatchAnalysisMetric)} →{" "}
                    {formatMatchAnalysisValue(comparisonRowB.value, selectedMatchAnalysisMetric)}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">Skillnad mellan valda omgångar</p>
                  <p
                    className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                      comparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}`}
                  >
                    {formatMatchAnalysisDelta(comparisonDelta, selectedMatchAnalysisMetric)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    {getMatchAnalysisDeltaMeaning(
                      comparisonDelta,
                      selectedMatchAnalysisMetric.direction
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">Säsongssnitt (referens)</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      seasonAverageReference,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
              </div>

            </div>
          )}

          {mode !== "round" && effectiveMatchAnalysisViewMode === "season-average" && (
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-neutral-900/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Säsongsgenomsnitt</h3>
                  <p className="mt-1 text-xs text-neutral-400">
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
                        : "border-neutral-700 bg-neutral-950/70 text-neutral-300 hover:border-slate-500 hover:text-white"
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
                        : "border-neutral-700 bg-neutral-950/70 text-neutral-300 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    Spelade motsvarande matcher
                  </button>
                </div>
              </div>
              {mode === "combined" && (
                <div className="mt-3 rounded-lg border border-white/[0.07] bg-neutral-950/50 p-3">
                  <div className="flex flex-wrap items-end gap-3">
                    <label className="flex min-w-[150px] flex-col gap-1 text-xs text-neutral-300">
                      Hemma/Borta
                      <select
                        value={seasonVenueFilter}
                        onChange={(event) =>
                          setSeasonVenueFilter(event.target.value as "all" | "home" | "away")
                        }
                        className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                      >
                        <option value="all">Alla matcher</option>
                        <option value="home">Endast hemma</option>
                        <option value="away">Endast borta</option>
                      </select>
                    </label>
                    <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs text-neutral-300">
                      Sök motståndare
                      <input
                        type="search"
                        value={seasonOpponentSearch}
                        onChange={(event) => setSeasonOpponentSearch(event.target.value)}
                        list="season-opponent-options"
                        placeholder="T.ex. Sirius, Malmö, AIK"
                        className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none placeholder:text-neutral-500 focus:border-blue-400"
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
                      className="rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Nollställ filter
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-400">{seasonFilterSummary}</p>
                </div>
              )}
              <p className="mt-2 text-xs text-neutral-500">
                {seasonComparisonMode === "full"
                  ? `Visar säsongssnitt för urvalet (${seasonRowsForSelectedFilters2026.length} matcher 2026, ${seasonRowsForSelectedFilters2025.length} matcher 2025).`
                  : `Visar endast ${seasonComparisonSelectedPairCount} matchpar: 2026 spelade omgångar mot motsvarande matcher 2025 i nuvarande filter.`}
              </p>
              {mode === "combined" && (
                <div className="mt-3 grid gap-3 text-xs text-neutral-300 sm:grid-cols-4">
                  <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                    <p className="text-neutral-400">Matcher i urval 2026</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonRowsForSelectedFilters2026.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                    <p className="text-neutral-400">Matcher i urval 2025</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonRowsForSelectedFilters2025.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                    <p className="text-neutral-400">Parade matcher</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {seasonComparisonSelectedPairCount}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                    <p className="text-neutral-400">Totalt i filter</p>
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
                  className="rounded-lg border border-neutral-700 bg-neutral-950/70 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:border-slate-500 hover:text-white"
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
                <div className="mt-2 rounded-lg border border-white/[0.07] bg-neutral-950/60 px-3 py-2 text-[11px] text-neutral-300">
                  <p className="font-medium text-neutral-200">Parade matcher (2026 mot 2025)</p>
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
              <div className="mt-3 grid gap-3 text-xs text-neutral-300 sm:grid-cols-3">
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">Säsong 2025</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      activeSeasonComparisonAverage2025,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">Säsong 2026</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {formatMatchAnalysisValue(
                      activeSeasonComparisonAverage2026,
                      selectedMatchAnalysisMetric
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                  <p className="text-neutral-400">Skillnad (2026 - 2025)</p>
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
                  <p className="mt-0.5 text-[11px] text-neutral-400">
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
                      className="rounded border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5"
                    >
                      <p className="text-neutral-500">{periodRow.label}</p>
                      <p className="text-neutral-300">
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

              <div className="mt-4 rounded-lg border border-white/[0.07] bg-neutral-900/70 p-3">
                <p className="text-xs font-semibold text-neutral-100">Valda omgångar: 2026 vs 2025</p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Jämför en vald omgång 2026 mot en vald omgång 2025 med samma KPI.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-xs text-neutral-300">
                    Omgång 2026
                    <select
                      value={seasonViewRoundA}
                      onChange={(event) => setSeasonViewRoundA(event.target.value)}
                      disabled={seasonRowsForSelectedFilters2026.length === 0}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {seasonRowsForSelectedFilters2026.map((row) => (
                        <option key={`season-view-a-${row.key}`} value={row.key}>
                          Omg {row.gameweek} ({row.opponent})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-neutral-300">
                    Omgång 2025
                    <select
                      value={seasonViewRoundB}
                      onChange={(event) => setSeasonViewRoundB(event.target.value)}
                      disabled={seasonRowsForSelectedFilters2025.length === 0}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
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
                    <div className="mt-3 grid gap-2 text-[11px] text-neutral-300 sm:grid-cols-3">
                      <div className="rounded border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5">
                        <p className="text-neutral-500">2025 vald</p>
                        <p className="font-semibold text-white">
                          {formatMatchAnalysisValue(
                            seasonViewComparisonRoundB.value,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                      </div>
                      <div className="rounded border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5">
                        <p className="text-neutral-500">2026 vald</p>
                        <p className="font-semibold text-white">
                          {formatMatchAnalysisValue(
                            seasonViewComparisonRoundA.value,
                            selectedMatchAnalysisMetric
                          )}
                        </p>
                      </div>
                      <div className="rounded border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5">
                        <p className="text-neutral-500">Skillnad (2026 - 2025)</p>
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
                          className="rounded border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5"
                        >
                          <p className="text-neutral-500">{periodRow.label}</p>
                          <p className="text-neutral-300">
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

          {mode !== "round" && effectiveMatchAnalysisViewMode === "round" && roundVsSeasonRow && (
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-neutral-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">Jämför vald omgång</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-neutral-300">
                    Omgång (fokus)
                    <select
                      value={roundVsSeasonRound}
                      onChange={(event) => setRoundVsSeasonRound(event.target.value)}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      {seasonRows.map((row) => (
                        <option key={`season-vs-round-${row.key}`} value={row.key}>
                          Omgång {row.gameweek} ({row.opponent})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-300">
                    Visning
                    <select
                      value={selectedSingleRoundComparisonMode}
                      onChange={(event) =>
                        setSelectedSingleRoundComparisonMode(
                          event.target.value as "season-average" | "previous-season-match"
                        )
                      }
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    >
                      <option value="season-average">Säsongssnitt</option>
                      <option value="previous-season-match">
                        Match från säsong 2025
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                KPI (samma för alla jämförelser):{" "}
                <span className="font-semibold text-neutral-200">
                  {selectedMatchAnalysisMetric.label}
                </span>
              </p>

              {singleRoundComparisonMode === "previous-season-match" ? (
                <div className="mt-3 rounded-lg border border-blue-500/25 bg-neutral-900/70 p-3">
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
                          className="rounded-lg border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                        >
                          <option value="none">Välj match</option>
                          {historicalComparisonCandidates.map((candidate) => (
                            <option key={`historical-candidate-${candidate.key}`} value={candidate.key}>
                              {candidate.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-400">
                        Jämförelsen använder samma KPI och perioder (0-15 till 75-FT).
                      </p>
                      {historicalComparisonRow && (
                        <div className="mt-3 grid gap-2 text-[11px] text-neutral-300 sm:grid-cols-3">
                          <div className="rounded border border-white/[0.07] bg-neutral-950/70 px-2 py-1.5">
                            <p className="text-neutral-500">Nuvarande ({roundVsSeasonRow.season})</p>
                            <p className="font-semibold text-white">
                              {formatMatchAnalysisValue(
                                roundVsSeasonRow.value,
                                selectedMatchAnalysisMetric
                              )}
                            </p>
                          </div>
                          <div className="rounded border border-white/[0.07] bg-neutral-950/70 px-2 py-1.5">
                            <p className="text-neutral-500">Motsvarande {previousSeason}</p>
                            <p className="font-semibold text-white">
                              {formatMatchAnalysisValue(
                                historicalComparisonRow.value,
                                selectedMatchAnalysisMetric
                              )}
                            </p>
                          </div>
                          <div className="rounded border border-white/[0.07] bg-neutral-950/70 px-2 py-1.5">
                            <p className="text-neutral-500">
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
                            <p className="text-[10px] text-neutral-500">
                              {getMatchAnalysisDeltaMeaning(
                                roundVsSeasonRow.value - historicalComparisonRow.value,
                                selectedMatchAnalysisMetric.direction
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-neutral-400">
                      Ingen motsvarande match hittades i föregående säsong för vald omgång.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-3 grid gap-3 text-xs text-neutral-300 sm:grid-cols-4">
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                      <p className="text-neutral-400">Vald omgång</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {formatMatchAnalysisValue(roundVsSeasonRow.value, selectedMatchAnalysisMetric)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                      <p className="text-neutral-400">Säsongssnitt 2026</p>
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
                            ? "text-neutral-400"
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
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                      <p className="text-neutral-400">Säsongssnitt 2025</p>
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
                            ? "text-neutral-400"
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
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-900/70 px-3 py-2">
                      <p className="text-neutral-400">Skillnad (omgång - aktivt snitt)</p>
                      <p
                        className={`mt-1 text-base font-semibold ${getMatchAnalysisDeltaTone(
                          roundVsSeasonDelta,
                          selectedMatchAnalysisMetric.direction
                        )}`}
                      >
                        {formatMatchAnalysisDelta(roundVsSeasonDelta, selectedMatchAnalysisMetric)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        {getMatchAnalysisDeltaMeaning(
                          roundVsSeasonDelta,
                          selectedMatchAnalysisMetric.direction
                        )}
                      </p>
                    </div>
                  </div>

                </>
              )}
            </div>
          )}

          {mode === "round" && showSeasonRows && (
            <div className="mt-4 grid gap-3 sm:hidden">
              <p className="text-[11px] text-neutral-500">
                Kompakt lista: visar vald säsong. Full tabell finns på större skärm.
              </p>
              {seasonRows.map((row) => (
                <article
                  key={`mobile-analysis-${row.key}`}
                  className="rounded-xl border border-white/[0.07] bg-neutral-900/60 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Omgång {row.gameweek}</p>
                      <p className="text-xs text-neutral-400">
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
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5">
                      <p className="text-neutral-400">Värde</p>
                      <p className="font-semibold text-white">
                        {formatMatchAnalysisValue(row.value, selectedMatchAnalysisMetric)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/[0.07] bg-neutral-950/60 px-2 py-1.5">
                      <p className="text-neutral-400">Δ mot förra</p>
                      <p
                        className={`font-semibold ${
                          row.deltaFromPrevious === null
                            ? "text-neutral-300"
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
                        className="rounded border border-white/[0.07] bg-neutral-950/50 px-1.5 py-1"
                      >
                        <p className="text-neutral-500">{label}</p>
                        <p className="text-neutral-200">
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
                    <th className="sticky left-0 z-10 w-36 border border-white/[0.07] bg-neutral-900 px-2 py-2 text-left text-neutral-300">
                      Omgång
                    </th>
                    <th className="w-24 border border-white/[0.07] bg-neutral-900 px-2 py-2 text-left text-neutral-300">
                      Värde
                    </th>
                    <th className="w-24 border border-white/[0.07] bg-neutral-900 px-2 py-2 text-left text-neutral-300">
                      Δ mot förra
                    </th>
                    {MATCH_ANALYSIS_PERIOD_LABELS.map((label) => (
                      <th
                        key={label}
                        className="w-24 border border-white/[0.07] bg-neutral-900 px-2 py-2 text-left text-neutral-300"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={`analysis-${row.key}`}>
                      <th className="sticky left-0 z-10 border border-white/[0.07] bg-neutral-950 px-2 py-2 text-left font-medium text-neutral-100">
                        <div>Omg {row.gameweek}</div>
                        <div className="text-[10px] text-neutral-400">
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
                      <td className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 font-semibold text-white">
                        {formatMatchAnalysisValue(row.value, selectedMatchAnalysisMetric)}
                      </td>
                      <td
                        className={`border border-white/[0.07] bg-neutral-900/70 px-2 py-2 ${
                          row.deltaFromPrevious === null
                            ? "text-neutral-400"
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
                          className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 text-neutral-200"
                        >
                          {formatMatchAnalysisValue(periodValue, selectedMatchAnalysisMetric)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {seasonAverageRow && (
                    <tr>
                      <th className="sticky left-0 z-10 border border-white/[0.07] bg-neutral-950 px-2 py-2 text-left font-semibold text-neutral-100">
                        Säsongssnitt ({selectedMatchAnalysisSeason})
                      </th>
                      <td className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 font-semibold text-white">
                        {formatMatchAnalysisValue(seasonAverageRow.value, selectedMatchAnalysisMetric)}
                      </td>
                      <td className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 text-neutral-400">
                        –
                      </td>
                      {seasonAverageRow.periods.map((periodAverage, index) => (
                        <td
                          key={`season-period-row-${selectedMatchAnalysisSeason}-${index}`}
                          className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 text-neutral-200"
                        >
                          {formatMatchAnalysisValue(periodAverage, selectedMatchAnalysisMetric)}
                        </td>
                      ))}
                    </tr>
                  )}
                  <tr>
                    <th className="sticky left-0 z-10 border border-white/[0.07] bg-neutral-950 px-2 py-2 text-left font-semibold text-neutral-100">
                      Snitt (valda omgångar)
                    </th>
                    <td className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 font-semibold text-white">
                      {formatMatchAnalysisValue(matchAnalysisAverage, selectedMatchAnalysisMetric)}
                    </td>
                    <td className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 text-neutral-400">
                      –
                    </td>
                    {averagePeriodValues.map((periodAverage, index) => (
                      <td
                        key={`season-period-${index}`}
                        className="border border-white/[0.07] bg-neutral-900/70 px-2 py-2 text-neutral-200"
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
        </>
        )}

        {mode === "round" && round === 8 && roundTab === "matchen" && (
          <div id="matchens-spelare">
            <StandoutPlayerCard player={round8Standout} />
          </div>
        )}

        {mode === "round" && round === 8 && roundTab === "analys" && (
          <div id="prediction-vs-outcome">
            <PredictionVsOutcome {...round8PredictionVsOutcome} />
          </div>
        )}

        {mode === "round" && round === 9 && roundTab === "analys" && (
          <div id="prediction-vs-outcome">
            <PredictionVsOutcome {...round9AikPredictionVsOutcome} />
          </div>
        )}

        {mode === "round" && round === 10 && roundTab === "analys" && (
          <div id="prediction-vs-outcome">
            <PredictionVsOutcome {...round10PredictionVsOutcome} />
          </div>
        )}

        {mode === "round" && round === 15 && roundTab === "analys" && (
          <div id="prediction-vs-outcome">
            <PredictionVsOutcome {...round9PredictionVsOutcome} />
          </div>
        )}

        {isRound12Dashboard && roundTab === "sasong" && (
          <div id="coachjamforelse" className="rounded-2xl border border-white/[0.06] bg-[#161b22]">
            <button
              type="button"
              onClick={() => setShowCoachComparison((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-800/20"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Tränarskiftet</p>
                <p className="mt-0.5 text-sm font-semibold text-neutral-200">
                  <span className="text-amber-400">Karlsson</span>
                  <span className="mx-1.5 text-neutral-600">→</span>
                  <span className="text-teal-400">Rydström</span>
                  <span className="ml-2 text-neutral-500">— jämförelse per match</span>
                </p>
              </div>
              <span className={`text-neutral-500 transition-transform ${showCoachComparison ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {showCoachComparison && (
              <div className="border-t border-white/[0.06]">
                <CoachComparisonDashboard rounds={hammarbyMatchAnalysisRounds} />
              </div>
            )}
          </div>
        )}

        <footer
          className={
            (isRound11Dashboard || isRound13Dashboard || isRound14Dashboard || isRound16Dashboard || isRound17Dashboard || isRound18Dashboard)
              ? "rounded-2xl border border-emerald-800/35 bg-[#13231d]/80 p-5 text-xs leading-relaxed text-neutral-400"
              : "rounded-2xl border border-white/[0.06] bg-neutral-900/60 p-5 text-xs leading-relaxed text-neutral-400"
          }
        >
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
