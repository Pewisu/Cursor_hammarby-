"use client";

import { useMemo, useState } from "react";
import { type HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

// Twelve-indexed gameweeks for each coach (2026 season)
const KARLSSON_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
const RYDSTROM_GAMEWEEKS = new Set([12, 13]);

// Bolldata overview gameweeks for each coach (for pass & result data)
const KARLSSON_BD_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]);
const RYDSTROM_BD_GAMEWEEKS = new Set([11, 12]);

type Tab = "oversikt" | "offensiv" | "press" | "defensiv";

type MetricRow = {
  key: string;
  label: string;
  sublabel?: string;
  section: "offensiv" | "press" | "defensiv";
  format: "pct" | "decimal" | "int" | "m" | "s" | "diff";
  higherIsBetter: boolean;
  decimals?: number;
};

type PassMetricRow = {
  key: string;
  label: string;
  sublabel?: string;
  format: "pct" | "decimal" | "int";
  higherIsBetter: boolean;
  decimals?: number;
};

const OFFENSIV_METRICS: MetricRow[] = [
  { key: "ball_possession_pct",         label: "Bollinnehav",                                                           section: "offensiv", format: "pct",     higherIsBetter: true  },
  { key: "field_tilt",                  label: "Field Tilt",          sublabel: "andel avslut på off. planhalva",       section: "offensiv", format: "pct",     higherIsBetter: true, decimals: 1 },
  { key: "xt",                          label: "xT (förväntat hot)",                                                    section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "num_possessions_final_third", label: "Anfall i sista tredjedelen",                                            section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "num_box_entries",             label: "Inträden i straffområdet",                                              section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "np_shots",                    label: "Avslut",                                                                section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "np_xg",                       label: "Egen npxG",                                                             section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "np_xg_per_shot",              label: "Egen npxG per avslut",                                                  section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 3 },
  { key: "xt_within_10s_after_recovery",label: "xT efter bollinvst, 10 sek",                                           section: "offensiv", format: "decimal", higherIsBetter: true,  decimals: 2 },
];

const PRESS_METRICS: MetricRow[] = [
  { key: "num_recoveries_att_half",     label: "Höga återerövringar",                                                   section: "press", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "ppda",                        label: "PPDA",                sublabel: "lägre = bättre press",                 section: "press", format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "defensive_action_height_m",   label: "Defensiv höjd",                                                        section: "press", format: "m",       higherIsBetter: true,  decimals: 1 },
];

const DEFENSIV_METRICS: MetricRow[] = [
  { key: "opp_num_box_entries",         label: "Motståndarnas inträden i box",                                          section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 1 },
  { key: "opp_np_shots",                label: "Motståndarnas avslut",                                                  section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 1 },
  { key: "opp_xt",                      label: "Motståndarnas xT",                                                      section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "opp_np_xg",                   label: "Motståndarnas npxG",                                                    section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "opp_np_xg_per_shot",          label: "Motståndarnas npxG per avslut",                                         section: "defensiv", format: "decimal", higherIsBetter: false, decimals: 3 },
  { key: "time_to_defensive_action_after_loss_att_half_s", label: "Tid till def aktion efter bollapp", sublabel: "lägre = snabbare", section: "defensiv", format: "s", higherIsBetter: false, decimals: 2 },
  { key: "_xg_diff",                    label: "npxG-övertag",                                                          section: "defensiv", format: "diff",    higherIsBetter: true,  decimals: 2 },
];

const PASS_METRICS: PassMetricRow[] = [
  { key: "passes",        label: "Passningar per match",              format: "decimal", higherIsBetter: true,  decimals: 0 },
  { key: "passAccuracy",  label: "Passningsprecision",                format: "pct",     higherIsBetter: true  },
  { key: "shotsOnTarget", label: "Skott på mål",                      format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "touchesInBox",  label: "Bollkontakter i straffområdet",     format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "corners",       label: "Hörnsparkar",                       format: "decimal", higherIsBetter: true,  decimals: 1 },
];

const ALL_METRICS_FOR_AVERAGES = [...OFFENSIV_METRICS, ...PRESS_METRICS, ...DEFENSIV_METRICS];

function formatValue(value: number, row: { format: string; decimals?: number }): string {
  if (value === null || value === undefined || isNaN(value)) return "–";
  const d = row.decimals ?? 2;
  if (row.format === "pct") return `${(value * 100).toFixed(1)} %`;
  if (row.format === "m") return `${value.toFixed(d)} m`;
  if (row.format === "s") return `${value.toFixed(d)} s`;
  if (row.format === "diff") return `${value >= 0 ? "+" : ""}${value.toFixed(d)}`;
  if (row.format === "int") return `${Math.round(value)}`;
  return value.toFixed(d);
}

function computeAnalysisAverages(rounds: HammarbyMatchAnalysisRound[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const row of ALL_METRICS_FOR_AVERAGES) {
    if (row.key === "_xg_diff") continue;
    const vals = rounds
      .map((r) => r.metrics?.[row.key as keyof typeof r.metrics]?.value)
      .filter((v): v is number => typeof v === "number" && !isNaN(v));
    result[row.key] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : NaN;
  }
  // Derived xG differential
  const npXg = rounds.map((r) => r.metrics?.np_xg?.value).filter((v): v is number => typeof v === "number");
  const oppXg = rounds.map((r) => r.metrics?.opp_np_xg?.value).filter((v): v is number => typeof v === "number");
  const npAvg = npXg.reduce((s, v) => s + v, 0) / (npXg.length || 1);
  const oppAvg = oppXg.reduce((s, v) => s + v, 0) / (oppXg.length || 1);
  result["_xg_diff"] = npAvg - oppAvg;
  return result;
}

function computePassAverages(gameweeks: Set<number>): Record<string, number> {
  const rounds = hammarbyRoundMatchStats.filter((r) => gameweeks.has(r.gameweek));
  if (!rounds.length) return {};
  const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
  return {
    passes:        avg(rounds.map((r) => r.hammarby.passes)),
    passAccuracy:  avg(rounds.map((r) => r.hammarby.passesSuccessful / r.hammarby.passes)),
    shotsOnTarget: avg(rounds.map((r) => r.hammarby.shotsOnTarget)),
    touchesInBox:  avg(rounds.map((r) => r.hammarby.touchesInBox)),
    corners:       avg(rounds.map((r) => r.hammarby.corners)),
  };
}

function computeRecord(gameweeks: Set<number>) {
  const rounds = hammarbyRoundMatchStats.filter((r) => gameweeks.has(r.gameweek));
  let w = 0, d = 0, l = 0, gf = 0, gc = 0;
  for (const r of rounds) {
    gf += r.hammarby.goals;
    gc += r.opponent.goals;
    if (r.hammarby.goals > r.opponent.goals) w++;
    else if (r.hammarby.goals === r.opponent.goals) d++;
    else l++;
  }
  const n = rounds.length || 1;
  return { w, d, l, gf, gc, n, ptsPerGame: (w * 3 + d) / n, gfPerGame: gf / n, gcPerGame: gc / n };
}

// ─── Metric rows UI ─────────────────────────────────────────────────────────

function MetricRows({
  metrics,
  kAvg,
  rAvg,
}: {
  metrics: MetricRow[];
  kAvg: Record<string, number>;
  rAvg: Record<string, number>;
}) {
  return (
    <div className="divide-y divide-slate-700/30">
      {metrics.map((row) => {
        const kVal = kAvg[row.key];
        const rVal = rAvg[row.key];
        const kBetter =
          !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? kVal > rVal : kVal < rVal);
        const rBetter =
          !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? rVal > kVal : rVal < kVal);
        const diff = Math.abs(kVal - rVal);
        const base = Math.max(Math.abs(kVal), Math.abs(rVal), 0.001);
        const isSignificant = diff / base > 0.05;

        return (
          <div key={row.key} className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2.5">
            <div className="text-left">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                  kBetter && isSignificant ? "bg-slate-200 text-slate-900" : "bg-slate-700/50 text-slate-200"
                }`}
              >
                {formatValue(kVal, row)}
              </span>
            </div>
            <div className="w-44 px-2 text-center">
              <p className="text-[11px] text-slate-400">{row.label}</p>
              {row.sublabel && <p className="text-[9px] text-slate-600">{row.sublabel}</p>}
            </div>
            <div className="text-right">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                  rBetter && isSignificant ? "bg-green-400 text-slate-900" : "bg-slate-700/50 text-slate-200"
                }`}
              >
                {formatValue(rVal, row)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PassMetricRows({
  metrics,
  kAvg,
  rAvg,
}: {
  metrics: PassMetricRow[];
  kAvg: Record<string, number>;
  rAvg: Record<string, number>;
}) {
  return (
    <div className="divide-y divide-slate-700/30">
      {metrics.map((row) => {
        const kVal = kAvg[row.key];
        const rVal = rAvg[row.key];
        const kBetter =
          !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? kVal > rVal : kVal < rVal);
        const rBetter =
          !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? rVal > kVal : rVal < kVal);
        const diff = Math.abs(kVal - rVal);
        const base = Math.max(Math.abs(kVal), Math.abs(rVal), 0.001);
        const isSignificant = diff / base > 0.05;

        return (
          <div key={row.key} className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2.5">
            <div className="text-left">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                  kBetter && isSignificant ? "bg-slate-200 text-slate-900" : "bg-slate-700/50 text-slate-200"
                }`}
              >
                {formatValue(kVal, row)}
              </span>
            </div>
            <div className="w-44 px-2 text-center">
              <p className="text-[11px] text-slate-400">{row.label}</p>
              {row.sublabel && <p className="text-[9px] text-slate-600">{row.sublabel}</p>}
            </div>
            <div className="text-right">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-sm font-bold tabular-nums ${
                  rBetter && isSignificant ? "bg-green-400 text-slate-900" : "bg-slate-700/50 text-slate-200"
                }`}
              >
                {formatValue(rVal, row)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section header used inside tab content ──────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-slate-900/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
      {title}
    </div>
  );
}

// ─── Record comparison card ───────────────────────────────────────────────────

function RecordCard({
  label,
  kValue,
  rValue,
  higherIsBetter,
  format = "num",
  decimals = 1,
}: {
  label: string;
  kValue: number;
  rValue: number;
  higherIsBetter: boolean;
  format?: "num" | "pct" | "decimal";
  decimals?: number;
}) {
  const kBetter = higherIsBetter ? kValue > rValue : kValue < rValue;
  const rBetter = higherIsBetter ? rValue > kValue : rValue < kValue;
  const fmt = (v: number) => {
    if (format === "pct") return `${(v * 100).toFixed(1)} %`;
    return v.toFixed(decimals);
  };
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 px-4 py-3 text-center">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`rounded-lg px-3 py-1.5 text-lg font-bold tabular-nums ${
            kBetter ? "bg-slate-200 text-slate-900" : "bg-slate-700/50 text-slate-200"
          }`}
        >
          {fmt(kValue)}
        </span>
        <span className="text-[9px] text-slate-600">vs</span>
        <span
          className={`rounded-lg px-3 py-1.5 text-lg font-bold tabular-nums ${
            rBetter ? "bg-green-400 text-slate-900" : "bg-slate-700/50 text-slate-200"
          }`}
        >
          {fmt(rValue)}
        </span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoachComparisonDashboard({ rounds }: { rounds: HammarbyMatchAnalysisRound[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("oversikt");

  const rounds2026 = useMemo(() => rounds.filter((r) => r.season === 2026), [rounds]);

  const karlssonRounds = useMemo(
    () => rounds2026.filter((r) => KARLSSON_GAMEWEEKS.has(r.gameweek)),
    [rounds2026]
  );
  const rydstromRounds = useMemo(
    () => rounds2026.filter((r) => RYDSTROM_GAMEWEEKS.has(r.gameweek)),
    [rounds2026]
  );

  const kAvg = useMemo(() => computeAnalysisAverages(karlssonRounds), [karlssonRounds]);
  const rAvg = useMemo(() => computeAnalysisAverages(rydstromRounds), [rydstromRounds]);

  const kPassAvg = useMemo(() => computePassAverages(KARLSSON_BD_GAMEWEEKS), []);
  const rPassAvg = useMemo(() => computePassAverages(RYDSTROM_BD_GAMEWEEKS), []);

  const kRecord = useMemo(() => computeRecord(KARLSSON_BD_GAMEWEEKS), []);
  const rRecord = useMemo(() => computeRecord(RYDSTROM_BD_GAMEWEEKS), []);

  if (karlssonRounds.length === 0 || rydstromRounds.length === 0) return null;

  const rydstromMatchLabels = rydstromRounds.map((r) => r.opponent).join(" & ");

  const tabs: { id: Tab; label: string }[] = [
    { id: "oversikt", label: "Översikt" },
    { id: "offensiv", label: "Offensiv" },
    { id: "press",    label: "Press" },
    { id: "defensiv", label: "Defensiv" },
  ];

  const biggestImprovement = (() => {
    const oppXgPerShot = DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg_per_shot")!;
    const pct = Math.round(
      (1 - rAvg["opp_np_xg_per_shot"] / kAvg["opp_np_xg_per_shot"]) * 100
    );
    return { pct, kVal: formatValue(kAvg["opp_np_xg_per_shot"], oppXgPerShot), rVal: formatValue(rAvg["opp_np_xg_per_shot"], oppXgPerShot) };
  })();

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
      {/* Header */}
      <div className="border-b border-slate-700/50 px-6 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Coachjämförelse · Allsvenskan 2026
        </p>
        <h2 className="mt-1 text-xl font-bold text-white">Rydström vs Karlsson</h2>
        <p className="mt-1 text-sm text-slate-400">
          Snitt per match under respektive period. Rydström:{" "}
          <span className="text-green-300">{rydstromMatchLabels}</span> ({rydstromRounds.length} matcher). Karlsson:{" "}
          <span className="text-slate-300">{karlssonRounds.length} matcher</span>.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-slate-700/50 bg-slate-900/60">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-green-400 text-green-300"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Column headers (shared, visible on all tabs) */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-700/50 bg-slate-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
        <div className="text-left text-slate-200">
          Kalle Karlsson
          <span className="ml-1.5 text-slate-500">({karlssonRounds.length} m)</span>
        </div>
        <div className="w-44 text-center text-slate-500">Nyckeltal</div>
        <div className="text-right text-green-300">
          Henrik Rydström
          <span className="ml-1.5 text-slate-500">({rydstromRounds.length} m)</span>
        </div>
      </div>

      {/* ── Översikt tab ── */}
      {activeTab === "oversikt" && (
        <div>
          {/* Record comparison */}
          <SectionHeader title="Matchresultat" />
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
            <RecordCard
              label="V/O/F"
              kValue={kRecord.w}
              rValue={rRecord.w}
              higherIsBetter
              format="num"
              decimals={0}
            />
            <RecordCard
              label="Poäng / match"
              kValue={kRecord.ptsPerGame}
              rValue={rRecord.ptsPerGame}
              higherIsBetter
              format="decimal"
              decimals={2}
            />
            <RecordCard
              label="Mål / match"
              kValue={kRecord.gfPerGame}
              rValue={rRecord.gfPerGame}
              higherIsBetter
              format="decimal"
              decimals={2}
            />
            <RecordCard
              label="Insläppta / match"
              kValue={kRecord.gcPerGame}
              rValue={rRecord.gcPerGame}
              higherIsBetter={false}
              format="decimal"
              decimals={2}
            />
          </div>

          {/* Record breakdown */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-700/30 px-4 py-3 text-sm">
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Kalle Karlsson</p>
              <p className="text-base font-bold text-slate-200">
                {kRecord.w}V – {kRecord.d}O – {kRecord.l}F
              </p>
              <p className="text-xs text-slate-500">
                {kRecord.gf} mål gjorda · {kRecord.gc} insläppta · {kRecord.n} matcher
              </p>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-green-500">Henrik Rydström</p>
              <p className="text-base font-bold text-green-200">
                {rRecord.w}V – {rRecord.d}O – {rRecord.l}F
              </p>
              <p className="text-xs text-slate-500">
                {rRecord.gf} mål gjorda · {rRecord.gc} insläppta · {rRecord.n} matcher
              </p>
            </div>
          </div>

          {/* Top highlights */}
          <SectionHeader title="Tydligaste skillnader" />
          <MetricRows
            metrics={[
              DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg_per_shot")!,
              DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg")!,
              PRESS_METRICS.find((m) => m.key === "ppda")!,
              OFFENSIV_METRICS.find((m) => m.key === "np_xg")!,
              OFFENSIV_METRICS.find((m) => m.key === "xt")!,
            ]}
            kAvg={kAvg}
            rAvg={rAvg}
          />

          {/* Biggest improvement callout */}
          <div className="border-t border-slate-700/50 bg-green-950/30 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-400">Tydligaste förändringen</p>
            <p className="mt-1 text-sm font-semibold text-green-200">
              Motståndarnas avslut är {biggestImprovement.pct}% mindre farliga per skott under Rydström
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              npxG/avslut mot: {biggestImprovement.rVal} (Rydström) vs {biggestImprovement.kVal} (Karlsson)
            </p>
          </div>
        </div>
      )}

      {/* ── Offensiv tab ── */}
      {activeTab === "offensiv" && (
        <div>
          <SectionHeader title="Bollkontroll & anfall" />
          <MetricRows metrics={OFFENSIV_METRICS} kAvg={kAvg} rAvg={rAvg} />

          <SectionHeader title="Passningar & bollkontroll (Bolldata)" />
          <PassMetricRows metrics={PASS_METRICS} kAvg={kPassAvg} rAvg={rPassAvg} />
        </div>
      )}

      {/* ── Press tab ── */}
      {activeTab === "press" && (
        <div>
          <SectionHeader title="Press & territorium" />
          <MetricRows metrics={PRESS_METRICS} kAvg={kAvg} rAvg={rAvg} />

          {/* Context box */}
          <div className="border-t border-slate-700/50 bg-slate-900/40 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Kontext</p>
            <p className="mt-1 text-xs text-slate-400">
              Rydström valde ett mer kontrollerat press i debuten mot Elfsborg (PPDA {rAvg["ppda"]?.toFixed(2)}) jämfört med
              säsonsplanen på 4.19. Trots detta vann Hammarby xG-kampen tydligt (2.48 vs 1.03).
            </p>
          </div>
        </div>
      )}

      {/* ── Defensiv tab ── */}
      {activeTab === "defensiv" && (
        <div>
          <SectionHeader title="Defensivt utfall" />
          <MetricRows metrics={DEFENSIV_METRICS} kAvg={kAvg} rAvg={rAvg} />

          {/* Biggest improvement callout */}
          <div className="border-t border-slate-700/50 bg-green-950/30 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-400">Tydligaste förändringen</p>
            <p className="mt-1 text-sm font-semibold text-green-200">
              Motståndarnas avslut är {biggestImprovement.pct}% mindre farliga per skott under Rydström
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              npxG/avslut mot: {biggestImprovement.rVal} (Rydström) vs {biggestImprovement.kVal} (Karlsson)
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-slate-700/50 px-5 py-3 text-[10px] leading-relaxed text-slate-500">
        Twelve/hammarbyfotboll.se (xG, PPDA, press) · Bolldata (passningar, hörnsparkar) · Rydström: gw-12–13; Karlsson: gw-1–11
      </div>
    </section>
  );
}
