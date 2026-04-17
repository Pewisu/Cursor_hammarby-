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
  gameweek: number;
  date: string;
  matchName: string;
  opponent: string;
  sourceUrl: string;
  metrics: Record<MatchAnalysisMetricKey, MatchAnalysisMetricSample>;
}

export const hammarbyMatchAnalysisRounds: HammarbyMatchAnalysisRound[] = [
  {
    gameweek: 1,
    date: "2026-04-04",
    matchName: "Hammarby - Mjällby, 3-0",
    opponent: "Mjällby",
    sourceUrl:
      "https://www.hammarbyfotboll.se/matcher/2026-04-04-15-00-hammarby-mj-llby-aif",
    metrics: {
      ball_possession_pct: {
        value: 0.55,
        seasonAverage: 0.5,
        periods: [0.7, 0.61, 0.52, 0.5, 0.49, 0.48],
      },
      num_possessions_final_third: {
        value: 52,
        seasonAverage: 46.32,
        periods: [13, 7, 7, 9, 10, 6],
      },
      num_box_entries: {
        value: 10,
        seasonAverage: 7.91,
        periods: [3, 1, 2, 2, 1, 1],
      },
      xt_within_10s_after_recovery: {
        value: 1.08,
        seasonAverage: 0.64,
        periods: [0.14, 0.13, 0.24, 0.21, 0.22, 0.14],
      },
      num_recoveries_att_half: {
        value: 21,
        seasonAverage: 8,
        periods: [5, 2, 2, 4, 5, 3],
      },
      ppda: {
        value: 3.19,
        seasonAverage: 5.42,
        periods: [2.9, 2.65, 3.47, 4.7, 3.45, 2.85],
      },
      defensive_action_height_m: {
        value: 49.26,
        seasonAverage: 41.97,
        periods: [59.43, 55.45, 44, 40.08, 50.29, 45.03],
      },
      opp_num_box_entries: {
        value: 14,
        seasonAverage: 0,
        periods: [0, 0, 4, 1, 3, 6],
      },
      time_to_defensive_action_after_loss_att_half_s: {
        value: 5.44,
        seasonAverage: 5.9,
        periods: [5.28, 5.42, 4.38, 11.42, 6.2, 3.98],
      },
      xt: {
        value: 1.11,
        seasonAverage: 1.39,
        periods: [0.37, 0.1, 0.17, 0.22, 0.19, 0.06],
      },
      opp_xt: {
        value: 1.02,
        seasonAverage: 0,
        periods: [0.05, 0.09, 0.18, 0.18, 0.18, 0.35],
      },
      np_xg: {
        value: 1.8,
        seasonAverage: 1.3,
        periods: [0.61, 0.07, 0.79, 0.19, 0.03, 0.12],
      },
      opp_np_xg: {
        value: 0.74,
        seasonAverage: 0,
        periods: [0, 0, 0.09, 0.04, 0.1, 0.51],
      },
      np_xg_per_shot: {
        value: 0.11,
        seasonAverage: 0.11,
        periods: [0.1, 0.07, 0.2, 0.06, 0.03, 0.12],
      },
      opp_np_xg_per_shot: {
        value: 0.05,
        seasonAverage: 0,
        periods: [0, 0, 0.04, 0.01, 0.05, 0.09],
      },
    },
  },
  {
    gameweek: 2,
    date: "2026-04-13",
    matchName: "Sirius - Hammarby, 2-0",
    opponent: "Sirius",
    sourceUrl:
      "https://www.hammarbyfotboll.se/matcher/2026-04-13-19-00-ik-sirius-fk-hammarby",
    metrics: {
      ball_possession_pct: {
        value: 0.72,
        seasonAverage: 0.5,
        periods: [0.74, 0.82, 0.59, 0.65, 0.71, 0.79],
      },
      num_possessions_final_third: {
        value: 57,
        seasonAverage: 46.84,
        periods: [9, 14, 4, 11, 8, 11],
      },
      num_box_entries: {
        value: 13,
        seasonAverage: 7.91,
        periods: [1, 3, 1, 4, 1, 3],
      },
      xt_within_10s_after_recovery: {
        value: 0.74,
        seasonAverage: 0.66,
        periods: [0.08, 0.16, 0.14, 0.15, 0.05, 0.16],
      },
      num_recoveries_att_half: {
        value: 8,
        seasonAverage: 8,
        periods: [1, 1, 1, 1, 1, 3],
      },
      ppda: {
        value: 3.57,
        seasonAverage: 5.64,
        periods: [7, 3, 3.89, 3.29, 5.63, 1.92],
      },
      defensive_action_height_m: {
        value: 40.09,
        seasonAverage: 41.52,
        periods: [29.58, 52.94, 31.91, 40.08, 40.39, 42.83],
      },
      opp_num_box_entries: {
        value: 3,
        seasonAverage: 0,
        periods: [1, 0, 0, 1, 1, 0],
      },
      time_to_defensive_action_after_loss_att_half_s: {
        value: 5.3,
        seasonAverage: 5.97,
        periods: [4.56, 5.42, 5.55, 4.74, 13.29, 3.06],
      },
      xt: {
        value: 1.81,
        seasonAverage: 1.36,
        periods: [0.16, 0.29, 0.45, 0.27, 0.25, 0.38],
      },
      opp_xt: {
        value: 0.49,
        seasonAverage: 0,
        periods: [-0.15, 0.03, 0.19, 0.15, 0.17, 0.09],
      },
      np_xg: {
        value: 1.41,
        seasonAverage: 1.35,
        periods: [0.51, 0.1, 0.03, 0.05, 0.33, 0.39],
      },
      opp_np_xg: {
        value: 0.96,
        seasonAverage: 0,
        periods: [0.07, 0, 0.18, 0.15, 0.53, 0.04],
      },
      np_xg_per_shot: {
        value: 0.09,
        seasonAverage: 0.12,
        periods: [0.17, 0.03, 0.02, 0.03, 0.11, 0.13],
      },
      opp_np_xg_per_shot: {
        value: 0.12,
        seasonAverage: 0,
        periods: [0.04, 0, 0.09, 0.15, 0.26, 0.04],
      },
    },
  },
];
