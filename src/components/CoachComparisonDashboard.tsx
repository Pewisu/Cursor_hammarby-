"use client";

import { useMemo } from "react";
import { type HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";

// Matches managed by each coach in the 2026 season.
// Kalle Karlsson: gameweeks 1–11 (sequential Hammarby match index)
// Henrik Rydström: gameweeks 12–13 (Elfsborg away + Kalmar home)
const KARLSSON_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
const RYDSTROM_GAMEWEEKS = new Set([12, 13]);

type MetricRow = {
  key: string;
  label: string;
  sublabel?: string;
  section: "offensiv" | "press" | "defensiv";
  format: "pct" | "decimal" | "int" | "m" | "s" | "diff";
  higherIsBetter: boolean;
  decimals?: number;
};

const METRICS: MetricRow[] = [
  { key: "ball_possession_pct",   label: "Bollinnehav",                          section: "offensiv", format: "pct",     higherIsBetter: true  },
  { key: "num_possessions_final_third", label: "Anfall i sista tredjedelen",     section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "num_box_entries",       label: "Inträden i straffområdet",             section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "xt_within_10s_after_recovery", label: "xT efter bollinvst, 10 sek",   section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "np_xg",                 label: "Egen npxG",                            section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "np_shots",              label: "Antal skott",                          section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "np_xg_per_shot",        label: "Egen npxG per skott",                  section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 3 },
  { key: "num_recoveries_att_half", label: "Höga återerövringar",               section: "press",    format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "ppda",                  label: "PPDA",                sublabel: "lägre = bättre press", section: "press", format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "defensive_action_height_m", label: "Defensiv höjd",                   section: "press",    format: "m",       higherIsBetter: true,  decimals: 1 },
  { key: "opp_num_box_entries",   label: "Inträden i eget straffområde",         section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 1 },
  { key: "time_to_defensive_action_after_loss_att_half_s", label: "Tid till def aktion efter bollapp", sublabel: "lägre = snabbare", section: "defensiv", format: "s", higherIsBetter: false, decimals: 2 },
  { key: "_xg_diff",              label: "npxG-övertag",                         section: "defensiv", format: "diff",    higherIsBetter: true,  decimals: 2 },
  { key: "opp_np_xg_per_shot",    label: "Motståndarnas npxG per skott",         section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 3 },
];

const SECTION_LABELS: Record<MetricRow["section"], string> = {
  offensiv: "Offensiv",
  press: "Press & territorium",
  defensiv: "Defensivt utfall",
};

function formatValue(value: number, row: MetricRow): string {
  if (value === null || value === undefined || isNaN(value)) return "–";
  const d = row.decimals ?? 2;
  if (row.format === "pct") return `${(value * 100).toFixed(1)} %`;
  if (row.format === "m") return `${value.toFixed(d)} m`;
  if (row.format === "s") return `${value.toFixed(d)} s`;
  if (row.format === "diff") return `${value >= 0 ? "+" : ""}${value.toFixed(d)}`;
  return value.toFixed(d);
}

function computeAverages(
  rounds: HammarbyMatchAnalysisRound[]
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const row of METRICS) {
    if (row.key === "_xg_diff") continue;
    const vals = rounds
      .map((r) => r.metrics?.[row.key as keyof typeof r.metrics]?.value)
      .filter((v): v is number => typeof v === "number" && !isNaN(v));
    result[row.key] = vals.length
      ? vals.reduce((s, v) => s + v, 0) / vals.length
      : NaN;
  }
  // Derived: xG differential
  const npXg = rounds
    .map((r) => r.metrics?.np_xg?.value)
    .filter((v): v is number => typeof v === "number");
  const oppXg = rounds
    .map((r) => r.metrics?.opp_np_xg?.value)
    .filter((v): v is number => typeof v === "number");
  const npAvg = npXg.reduce((s, v) => s + v, 0) / (npXg.length || 1);
  const oppAvg = oppXg.reduce((s, v) => s + v, 0) / (oppXg.length || 1);
  result["_xg_diff"] = npAvg - oppAvg;
  return result;
}

export function CoachComparisonDashboard({
  rounds,
}: {
  rounds: HammarbyMatchAnalysisRound[];
}) {
  const rounds2026 = useMemo(
    () => rounds.filter((r) => r.season === 2026),
    [rounds]
  );

  const karlssonRounds = useMemo(
    () => rounds2026.filter((r) => KARLSSON_GAMEWEEKS.has(r.gameweek)),
    [rounds2026]
  );
  const rydstromRounds = useMemo(
    () => rounds2026.filter((r) => RYDSTROM_GAMEWEEKS.has(r.gameweek)),
    [rounds2026]
  );

  const karlssonAvg = useMemo(() => computeAverages(karlssonRounds), [karlssonRounds]);
  const rydstromAvg = useMemo(() => computeAverages(rydstromRounds), [rydstromRounds]);

  if (karlssonRounds.length === 0 || rydstromRounds.length === 0) return null;

  const rydstromMatchLabels = rydstromRounds.map((r) => r.opponent).join(" & ");

  let prevSection: MetricRow["section"] | null = null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
      {/* Header */}
      <div className="border-b border-slate-700/50 px-6 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Coachjämförelse · Allsvenskan 2026
        </p>
        <h2 className="mt-1 text-xl font-bold text-white">
          Rydström vs Karlsson
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Snitt per match under respektive period. Rydström:{" "}
          <span className="text-green-300">{rydstromMatchLabels}</span> ({rydstromRounds.length} matcher). Karlsson:{" "}
          <span className="text-slate-300">{karlssonRounds.length} matcher</span>.
        </p>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-700/50 bg-slate-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
        <div className="text-left text-slate-200">
          Kalle Karlsson
          <span className="ml-1.5 text-slate-500">({karlssonRounds.length} matcher)</span>
        </div>
        <div className="w-44 text-center text-slate-500">Nyckeltal</div>
        <div className="text-right text-green-300">
          Henrik Rydström
          <span className="ml-1.5 text-slate-500">({rydstromRounds.length} matcher)</span>
        </div>
      </div>

      {/* Metric rows */}
      <div className="divide-y divide-slate-700/30">
        {METRICS.map((row) => {
          const kVal = karlssonAvg[row.key];
          const rVal = rydstromAvg[row.key];
          const showSection = row.section !== prevSection;
          prevSection = row.section;

          const kBetter = !isNaN(kVal) && !isNaN(rVal) && (
            row.higherIsBetter ? kVal > rVal : kVal < rVal
          );
          const rBetter = !isNaN(kVal) && !isNaN(rVal) && (
            row.higherIsBetter ? rVal > kVal : rVal < kVal
          );
          const diff = Math.abs(kVal - rVal);
          const base = Math.max(Math.abs(kVal), Math.abs(rVal), 0.001);
          const diffPct = diff / base;
          const isSignificant = diffPct > 0.05;

          return (
            <div key={row.key}>
              {showSection && (
                <div className="bg-slate-900/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {SECTION_LABELS[row.section]}
                </div>
              )}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2.5">
                {/* Karlsson value */}
                <div className="text-left">
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                      kBetter && isSignificant
                        ? "bg-slate-200 text-slate-900"
                        : "bg-slate-700/50 text-slate-200"
                    }`}
                  >
                    {formatValue(kVal, row)}
                  </span>
                </div>

                {/* Metric label */}
                <div className="w-44 px-2 text-center">
                  <p className="text-[11px] text-slate-400">{row.label}</p>
                  {row.sublabel && (
                    <p className="text-[9px] text-slate-600">{row.sublabel}</p>
                  )}
                </div>

                {/* Rydström value */}
                <div className="text-right">
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                      rBetter && isSignificant
                        ? "bg-green-400 text-slate-900"
                        : "bg-slate-700/50 text-slate-200"
                    }`}
                  >
                    {formatValue(rVal, row)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Biggest improvement callout */}
      <div className="border-t border-slate-700/50 bg-green-950/30 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-400">
          Tydligaste förändringen
        </p>
        <p className="mt-1 text-sm font-semibold text-green-200">
          Motståndarnas avslut är {Math.round((1 - rydstromAvg["opp_np_xg_per_shot"] / karlssonAvg["opp_np_xg_per_shot"]) * 100)}% mindre farliga per skott under Rydström
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          npxG/skott mot: {formatValue(rydstromAvg["opp_np_xg_per_shot"], METRICS.find(m => m.key === "opp_np_xg_per_shot")!)} (Rydström) vs {formatValue(karlssonAvg["opp_np_xg_per_shot"], METRICS.find(m => m.key === "opp_np_xg_per_shot")!)} (Karlsson)
        </p>
      </div>

      <div className="border-t border-slate-700/50 px-5 py-3 text-[10px] leading-relaxed text-slate-500">
        Data: Twelve / hammarbyfotboll.se · Källa gw-12 (Elfsborg borta) + gw-13 (Kalmar hemma) för Rydström; gw-1–gw-11 för Karlsson.
      </div>
    </section>
  );
}
