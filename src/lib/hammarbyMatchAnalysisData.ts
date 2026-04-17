export const MATCH_ANALYSIS_PERIOD_LABELS = [
  "0-15",
  "15-30",
  "30-HT",
  "45-60",
  "60-75",
  "75-FT",
] as const;

export type MatchAnalysisMetricKey =
  | "ball_possession_pct"
  | "num_possessions_final_third"
  | "num_box_entries"
  | "xt_within_10s_after_recovery"
  | "num_recoveries_att_half"
  | "ppda"
  | "defensive_action_height_m"
  | "opp_num_box_entries"
  | "time_to_defensive_action_after_loss_att_half_s"
  | "xt"
  | "opp_xt"
  | "np_xg"
  | "opp_np_xg"
  | "np_xg_per_shot"
  | "opp_np_xg_per_shot";

export type MatchAnalysisMetricDefinition = {
  key: MatchAnalysisMetricKey;
  label: string;
  format: "number" | "decimal" | "percent";
  decimals: number;
  direction: "higher" | "lower";
};

export const hammarbyMatchAnalysisMetricDefinitions: MatchAnalysisMetricDefinition[] = [
  {
    key: "ball_possession_pct",
    label: "Bollinnehav",
    format: "percent",
    decimals: 1,
    direction: "higher",
  },
  {
    key: "num_possessions_final_third",
    label: "Inträden sista tredjedel",
    format: "number",
    decimals: 0,
    direction: "higher",
  },
  {
    key: "num_box_entries",
    label: "Inträden i box",
    format: "number",
    decimals: 0,
    direction: "higher",
  },
  {
    key: "xt_within_10s_after_recovery",
    label: "xT inom 10s efter bollvinst",
    format: "decimal",
    decimals: 2,
    direction: "higher",
  },
  {
    key: "num_recoveries_att_half",
    label: "Bollvinster offensiv planhalva",
    format: "number",
    decimals: 0,
    direction: "higher",
  },
  {
    key: "ppda",
    label: "PPDA",
    format: "decimal",
    decimals: 2,
    direction: "lower",
  },
  {
    key: "defensive_action_height_m",
    label: "Defensiv aktionhöjd (m)",
    format: "decimal",
    decimals: 2,
    direction: "higher",
  },
  {
    key: "opp_num_box_entries",
    label: "Motst. inträden i box",
    format: "number",
    decimals: 0,
    direction: "lower",
  },
  {
    key: "time_to_defensive_action_after_loss_att_half_s",
    label: "Tid till defensiv aktion (s)",
    format: "decimal",
    decimals: 2,
    direction: "lower",
  },
  {
    key: "xt",
    label: "xT",
    format: "decimal",
    decimals: 2,
    direction: "higher",
  },
  {
    key: "opp_xt",
    label: "Motst. xT",
    format: "decimal",
    decimals: 2,
    direction: "lower",
  },
  {
    key: "np_xg",
    label: "xG",
    format: "decimal",
    decimals: 2,
    direction: "higher",
  },
  {
    key: "opp_np_xg",
    label: "Motst. xG",
    format: "decimal",
    decimals: 2,
    direction: "lower",
  },
  {
    key: "np_xg_per_shot",
    label: "xG per avslut",
    format: "decimal",
    decimals: 2,
    direction: "higher",
  },
  {
    key: "opp_np_xg_per_shot",
    label: "Motst. xG per avslut",
    format: "decimal",
    decimals: 2,
    direction: "lower",
  },
];

export type MatchAnalysisMetricSample = {
  value: number;
  seasonAverage: number;
  periods: [number, number, number, number, number, number];
};

export interface HammarbyMatchAnalysisRound {
  key: string;
  season: number;
  competition: string;
  gameweek: number;
  date: string;
  matchName: string;
  opponent: string;
  opponentTeamId: number | null;
  isHome: boolean;
  sourceUrl: string;
  metrics: Record<MatchAnalysisMetricKey, MatchAnalysisMetricSample>;
}
export { hammarbyMatchAnalysisRounds } from "@/lib/hammarbyMatchAnalysisRoundsData";
