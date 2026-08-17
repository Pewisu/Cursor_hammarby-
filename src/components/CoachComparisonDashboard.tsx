"use client";

import { useMemo, useState } from "react";
import { type HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

// Twelve-indexed gameweeks per coach (2026 season)
// Rydström from round 11; round 15 (GAIS) was under Karlsson as head coach.
// Twelve analysis data exists for rounds 1–13 and 17 (not 14, 15, 16).
const KARLSSON_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const RYDSTROM_GAMEWEEKS = new Set([11, 12, 13, 17]);

// Bolldata overview gameweeks per coach (pass & result data – all rounds available)
// Karlsson: rounds 1–10 + round 15 (GAIS, Karlsson as HC despite Rydström period)
// Rydström: rounds 11–14, 16–17 (6 matches)
const KARLSSON_BD_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]);
const RYDSTROM_BD_GAMEWEEKS = new Set([11, 12, 13, 14, 16, 17]);

type Tab = "oversikt" | "anfall" | "press" | "defensiv";

type MetricRow = {
  key: string;
  label: string;
  sublabel?: string;
  format: "pct" | "decimal" | "int" | "m" | "s" | "diff";
  higherIsBetter: boolean;
  decimals?: number;
};

// ─── Metric definitions ───────────────────────────────────────────────────────

const ANFALL_METRICS: MetricRow[] = [
  { key: "ball_possession_pct",          label: "Bollinnehav",                format: "pct",     higherIsBetter: true  },
  { key: "field_tilt",                   label: "Avslutsdominans",            sublabel: "andel avslut på offensiv planhalva", format: "pct", higherIsBetter: true, decimals: 1 },
  { key: "xt",                           label: "Förväntat hot (xT)",         format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "num_possessions_final_third",  label: "Attacker in i sista tredj.", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "num_box_entries",              label: "Inbrytningar i straffom.",   format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "np_shots",                     label: "Skott totalt",               format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "np_xg",                        label: "Eget xG (ej straff)",        format: "decimal", higherIsBetter: true,  decimals: 2 },
  { key: "np_xg_per_shot",               label: "Skottkvalitet (xG/skott)",   format: "decimal", higherIsBetter: true,  decimals: 3 },
  { key: "xt_within_10s_after_recovery", label: "Direkthot efter bolltapp",   sublabel: "xT inom 10 sek", format: "decimal", higherIsBetter: true, decimals: 2 },
];

const BYGGSPEL_METRICS: MetricRow[] = [
  { key: "passes",        label: "Passningar / match",          format: "decimal", higherIsBetter: true,  decimals: 0 },
  { key: "passAccuracy",  label: "Passningsprecision",          format: "pct",     higherIsBetter: true  },
  { key: "shotsOnTarget", label: "Skott på mål",                format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "touchesInBox",  label: "Bollkontakter i straffom.",   format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "corners",       label: "Hörnsparkar",                 format: "decimal", higherIsBetter: true,  decimals: 1 },
];

const PRESS_METRICS: MetricRow[] = [
  { key: "num_recoveries_att_half",   label: "Återerövringar offensivt", format: "decimal", higherIsBetter: true,  decimals: 1 },
  { key: "ppda",                      label: "Presstäthet (PPDA)",        sublabel: "passningar per defensiv aktion · lägre = hårdare press", format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "defensive_action_height_m", label: "Presspunkt (m från mål)",   format: "m",       higherIsBetter: true,  decimals: 1 },
];

const DEFENSIV_METRICS: MetricRow[] = [
  { key: "opp_num_box_entries", label: "Motst. inbrytningar i box",  format: "decimal", higherIsBetter: false, decimals: 1 },
  { key: "opp_np_shots",        label: "Motst. skott totalt",        format: "decimal", higherIsBetter: false, decimals: 1 },
  { key: "opp_xt",              label: "Motst. xT (hot mot mål)",    format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "opp_np_xg",           label: "Motst. xG (ej straff)",      format: "decimal", higherIsBetter: false, decimals: 2 },
  { key: "opp_np_xg_per_shot",  label: "Motst. skottkvalitet",       sublabel: "xG per skott · lägre = defensivt starkare", format: "decimal", higherIsBetter: false, decimals: 3 },
  { key: "time_to_defensive_action_after_loss_att_half_s", label: "Reaktionstid efter bollapp", sublabel: "sek tills defensiv aktion · lägre = snabbare", format: "s", higherIsBetter: false, decimals: 2 },
  { key: "_xg_diff",            label: "xG-balans",                  sublabel: "eget xG minus motst. xG per match", format: "diff", higherIsBetter: true, decimals: 2 },
];

const ALL_ANALYSIS_METRICS = [...ANFALL_METRICS, ...PRESS_METRICS, ...DEFENSIV_METRICS];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtVal(value: number, row: { format: string; decimals?: number }): string {
  if (value === null || value === undefined || isNaN(value)) return "–";
  const d = row.decimals ?? 2;
  if (row.format === "pct") return `${(value * 100).toFixed(1)}%`;
  if (row.format === "m") return `${value.toFixed(d)} m`;
  if (row.format === "s") return `${value.toFixed(d)} s`;
  if (row.format === "diff") return `${value >= 0 ? "+" : ""}${value.toFixed(d)}`;
  if (row.format === "int") return `${Math.round(value)}`;
  return value.toFixed(d);
}

function computeAnalysisAverages(rounds: HammarbyMatchAnalysisRound[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const row of ALL_ANALYSIS_METRICS) {
    if (row.key === "_xg_diff") continue;
    const vals = rounds
      .map((r) => r.metrics?.[row.key as keyof typeof r.metrics]?.value)
      .filter((v): v is number => typeof v === "number" && !isNaN(v));
    result[row.key] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : NaN;
  }
  const npXg  = rounds.map((r) => r.metrics?.np_xg?.value).filter((v): v is number => typeof v === "number");
  const oppXg = rounds.map((r) => r.metrics?.opp_np_xg?.value).filter((v): v is number => typeof v === "number");
  result["_xg_diff"] =
    npXg.reduce((s, v) => s + v, 0) / (npXg.length || 1) -
    oppXg.reduce((s, v) => s + v, 0) / (oppXg.length || 1);
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

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ title, accent = false }: { title: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 ${accent ? "bg-teal-950/30" : "bg-slate-900/60"}`}>
      <div className={`h-3.5 w-0.5 rounded-full ${accent ? "bg-teal-500" : "bg-slate-600"}`} />
      <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${accent ? "text-teal-400" : "text-slate-500"}`}>
        {title}
      </span>
    </div>
  );
}

// ─── Single metric comparison row ─────────────────────────────────────────────

function CompareRow({
  row,
  kVal,
  rVal,
}: {
  row: MetricRow;
  kVal: number;
  rVal: number;
}) {
  const kBetter = !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? kVal > rVal : kVal < rVal);
  const rBetter = !isNaN(kVal) && !isNaN(rVal) && (row.higherIsBetter ? rVal > kVal : rVal < kVal);
  const diffPct = (!isNaN(kVal) && !isNaN(rVal) && Math.abs(kVal) > 0.001)
    ? Math.abs((rVal - kVal) / kVal)
    : 0;
  const isSignificant = diffPct > 0.05;
  const deltaLabel = isSignificant
    ? `${rBetter ? "▲" : "▼"} ${Math.round(diffPct * 100)}%`
    : null;

  return (
    <div className="grid grid-cols-[1fr_auto_auto_1fr] items-center gap-1 px-4 py-2.5">
      {/* Karlsson value */}
      <div className="text-left">
        <span
          className={`inline-block rounded px-2.5 py-1 text-sm font-bold tabular-nums ${
            kBetter && isSignificant
              ? "bg-amber-400 text-slate-900"
              : "bg-slate-700/50 text-slate-300"
          }`}
        >
          {fmtVal(kVal, row)}
        </span>
      </div>

      {/* Delta + metric name */}
      <div className="w-40 px-1 text-center">
        {deltaLabel && (
          <p className={`mb-0.5 text-[9px] font-bold ${rBetter ? "text-teal-400" : "text-amber-400"}`}>
            {deltaLabel}
          </p>
        )}
        <p className="text-[11px] leading-snug text-slate-400">{row.label}</p>
        {row.sublabel && <p className="mt-0.5 text-[8px] text-slate-600">{row.sublabel}</p>}
      </div>

      {/* Spacer to keep 4-col layout aligned */}
      <div className="w-1" />

      {/* Rydström value */}
      <div className="text-right">
        <span
          className={`inline-block rounded px-2.5 py-1 text-sm font-bold tabular-nums ${
            rBetter && isSignificant
              ? "bg-teal-400 text-slate-900"
              : "bg-slate-700/50 text-slate-300"
          }`}
        >
          {fmtVal(rVal, row)}
        </span>
      </div>
    </div>
  );
}

// ─── Stat tile used in Facit ──────────────────────────────────────────────────

function StatTile({
  label,
  kVal,
  rVal,
  higherIsBetter,
  fmt,
}: {
  label: string;
  kVal: string;
  rVal: string;
  higherIsBetter: boolean;
  fmt?: "k-better" | "r-better" | "equal";
}) {
  // fmt is derived externally so parent decides colouring
  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-900/60 p-3">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-slate-600">{label}</p>
      <div className="flex items-end justify-between gap-1">
        <div className="text-center">
          <p className={`text-base font-extrabold tabular-nums ${fmt === "k-better" ? "text-amber-300" : "text-slate-400"}`}>
            {kVal}
          </p>
          <p className="mt-0.5 text-[8px] text-slate-600">Karlsson</p>
        </div>
        <div className="pb-4 text-[8px] text-slate-700">|</div>
        <div className="text-center">
          <p className={`text-base font-extrabold tabular-nums ${fmt === "r-better" ? "text-teal-300" : "text-slate-400"}`}>
            {rVal}
          </p>
          <p className="mt-0.5 text-[8px] text-slate-600">Rydström</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoachComparisonDashboard({ rounds }: { rounds: HammarbyMatchAnalysisRound[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("oversikt");

  const rounds2026 = useMemo(() => rounds.filter((r) => r.season === 2026), [rounds]);
  const karlssonRounds = useMemo(() => rounds2026.filter((r) => KARLSSON_GAMEWEEKS.has(r.gameweek)), [rounds2026]);
  const rydstromRounds = useMemo(() => rounds2026.filter((r) => RYDSTROM_GAMEWEEKS.has(r.gameweek)), [rounds2026]);

  const kAvg = useMemo(() => computeAnalysisAverages(karlssonRounds), [karlssonRounds]);
  const rAvg = useMemo(() => computeAnalysisAverages(rydstromRounds), [rydstromRounds]);

  const kPassAvg = useMemo(() => computePassAverages(KARLSSON_BD_GAMEWEEKS), []);
  const rPassAvg = useMemo(() => computePassAverages(RYDSTROM_BD_GAMEWEEKS), []);

  const kRecord = useMemo(() => computeRecord(KARLSSON_BD_GAMEWEEKS), []);
  const rRecord = useMemo(() => computeRecord(RYDSTROM_BD_GAMEWEEKS), []);

  if (karlssonRounds.length === 0 || rydstromRounds.length === 0) return null;

  const rydstromOpponents = rydstromRounds.map((r) => r.opponent).join(" & ");

  const tabs: { id: Tab; label: string }[] = [
    { id: "oversikt", label: "Facit" },
    { id: "anfall",   label: "Anfallsspelet" },
    { id: "press",    label: "Pressintensitet" },
    { id: "defensiv", label: "Defensivt facit" },
  ];

  const oppXgPerShotRow = DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg_per_shot")!;
  const defensePct = Math.round((1 - rAvg["opp_np_xg_per_shot"] / kAvg["opp_np_xg_per_shot"]) * 100);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
      {/* ── Header ── */}
      <div className="border-b border-slate-700/50 bg-slate-900/40 px-5 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Tränarskiftet · Allsvenskan 2026
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          <span className="text-amber-400">Karlsson</span>
          <span className="mx-2 text-slate-600 font-light">→</span>
          <span className="text-teal-400">Rydström</span>
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Matchsnitt under respektive tränarperiod.{" "}
          <span className="text-amber-400/80">{karlssonRounds.length} matcher (Karlsson)</span>
          {" · "}
          <span className="text-teal-400/80">{rydstromRounds.length} matcher – {rydstromOpponents} (Rydström)</span>
        </p>
      </div>

      {/* ── Pill tab navigation ── */}
      <div className="border-b border-slate-700/50 bg-slate-900/60 px-3 py-2">
        <div className="flex gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/40"
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Column labels ── */}
      <div className="grid grid-cols-[1fr_auto_auto_1fr] items-center border-b border-slate-700/30 bg-slate-900/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider">
        <span className="text-amber-500">K. Karlsson</span>
        <span className="w-40 text-center text-slate-600">Mätvärde</span>
        <span className="w-1" />
        <span className="text-right text-teal-400">H. Rydström</span>
      </div>

      {/* ══ FACIT tab ══════════════════════════════════════════════════════════ */}
      {activeTab === "oversikt" && (
        <div>
          {/* Era banners */}
          <div className="grid grid-cols-2 divide-x divide-slate-700/40">
            <div className="bg-amber-950/20 px-4 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Karlsson-eran</p>
              <p className="mt-1 text-2xl font-black text-amber-300">
                {kRecord.w}V {kRecord.d}O {kRecord.l}F
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {kRecord.gf}–{kRecord.gc} · {(kRecord.ptsPerGame).toFixed(2)} p/m
              </p>
            </div>
            <div className="bg-teal-950/20 px-4 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-teal-600">Rydström-eran</p>
              <p className="mt-1 text-2xl font-black text-teal-300">
                {rRecord.w}V {rRecord.d}O {rRecord.l}F
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {rRecord.gf}–{rRecord.gc} · {(rRecord.ptsPerGame).toFixed(2)} p/m
              </p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
            <StatTile
              label="Poäng / match"
              kVal={kRecord.ptsPerGame.toFixed(2)}
              rVal={rRecord.ptsPerGame.toFixed(2)}
              higherIsBetter
              fmt={rRecord.ptsPerGame > kRecord.ptsPerGame ? "r-better" : "k-better"}
            />
            <StatTile
              label="Mål / match"
              kVal={kRecord.gfPerGame.toFixed(2)}
              rVal={rRecord.gfPerGame.toFixed(2)}
              higherIsBetter
              fmt={rRecord.gfPerGame > kRecord.gfPerGame ? "r-better" : kRecord.gfPerGame > rRecord.gfPerGame ? "k-better" : "equal"}
            />
            <StatTile
              label="Insläppta / match"
              kVal={kRecord.gcPerGame.toFixed(2)}
              rVal={rRecord.gcPerGame.toFixed(2)}
              higherIsBetter={false}
              fmt={rRecord.gcPerGame < kRecord.gcPerGame ? "r-better" : "k-better"}
            />
            <StatTile
              label="xG-balans / match"
              kVal={`${kAvg["_xg_diff"] >= 0 ? "+" : ""}${kAvg["_xg_diff"]?.toFixed(2)}`}
              rVal={`${rAvg["_xg_diff"] >= 0 ? "+" : ""}${rAvg["_xg_diff"]?.toFixed(2)}`}
              higherIsBetter
              fmt={rAvg["_xg_diff"] > kAvg["_xg_diff"] ? "r-better" : "k-better"}
            />
          </div>

          {/* Markantaste skiftena */}
          <SectionDivider title="Markantaste skiftena" accent />
          {[
            DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg_per_shot")!,
            DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg")!,
            PRESS_METRICS.find((m) => m.key === "ppda")!,
            ANFALL_METRICS.find((m) => m.key === "np_xg")!,
            ANFALL_METRICS.find((m) => m.key === "xt")!,
          ].map((row) => (
            <CompareRow key={row.key} row={row} kVal={kAvg[row.key]} rVal={rAvg[row.key]} />
          ))}

          {/* Highlight callout */}
          <div className="border-t border-teal-900/50 bg-teal-950/30 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-teal-500">Skarpaste förbättringen</p>
            <p className="mt-1 text-sm font-bold text-teal-200">
              Motståndarna avlossar {defensePct}% farligare skott per avslut under Karlsson
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Skottkvalitet mot: {fmtVal(kAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Karlsson) →{" "}
              {fmtVal(rAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Rydström)
            </p>
          </div>
        </div>
      )}

      {/* ══ ANFALLSSPELET tab ══════════════════════════════════════════════════ */}
      {activeTab === "anfall" && (
        <div>
          <SectionDivider title="Anfallsmönster (Twelve)" />
          {ANFALL_METRICS.map((row) => (
            <CompareRow key={row.key} row={row} kVal={kAvg[row.key]} rVal={rAvg[row.key]} />
          ))}

          <SectionDivider title="Byggspelet (Bolldata)" accent />
          {BYGGSPEL_METRICS.map((row) => {
            const kVal = kPassAvg[row.key];
            const rVal = rPassAvg[row.key];
            return <CompareRow key={row.key} row={row} kVal={kVal} rVal={rVal} />;
          })}
        </div>
      )}

      {/* ══ PRESSINTENSITET tab ════════════════════════════════════════════════ */}
      {activeTab === "press" && (
        <div>
          <SectionDivider title="Press & återerövring" />
          {PRESS_METRICS.map((row) => (
            <CompareRow key={row.key} row={row} kVal={kAvg[row.key]} rVal={rAvg[row.key]} />
          ))}

          <div className="border-t border-slate-700/40 bg-slate-900/40 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Analytikerns not</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Rydström valde ett mer positionsbaserat press i sin debut mot Elfsborg borta (PPDA{" "}
              {rAvg["ppda"]?.toFixed(2)}). Trots lägre pressintensitet vann Hammarby xG-uppgörelsen
              klart (2.48 vs 1.03) — ett tecken på att spelkontrollen var god ändå.
            </p>
          </div>
        </div>
      )}

      {/* ══ DEFENSIVT FACIT tab ════════════════════════════════════════════════ */}
      {activeTab === "defensiv" && (
        <div>
          <SectionDivider title="Defensivt utfall" />
          {DEFENSIV_METRICS.map((row) => (
            <CompareRow key={row.key} row={row} kVal={kAvg[row.key]} rVal={rAvg[row.key]} />
          ))}

          <div className="border-t border-teal-900/50 bg-teal-950/30 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-teal-500">Skarpaste förbättringen</p>
            <p className="mt-1 text-sm font-bold text-teal-200">
              Motståndarna avlossar {defensePct}% farligare skott per avslut under Karlsson
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Skottkvalitet mot: {fmtVal(kAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Karlsson) →{" "}
              {fmtVal(rAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Rydström)
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-slate-700/40 px-5 py-2.5 text-[9px] leading-relaxed text-slate-600">
        Källa: Twelve / hammarbyfotboll.se (xG, PPDA, press) · Bolldata (passningar, hörnsparkar) ·
        Rydström = omg 11–14, 16–17 (6 matcher, exkl. omg 15 GAIS som räknas på Karlsson) · Karlsson = omg 1–10 + 15
      </div>
    </section>
  );
}
