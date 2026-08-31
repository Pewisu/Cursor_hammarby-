"use client";

import { useMemo, useState } from "react";
import { type HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";
import {
  coachRecords2026,
  getCoachRecordAverages,
} from "@/lib/coachComparison2026Data";

// Twelve uses the scheduled gameweek, while the site presents matches in played
// order. The postponed GAIS match is therefore the source of a one-round shift:
// Twelve GW11 = Häcken (Karlsson), GW12 = Elfsborg (Rydström).
const KARLSSON_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
const RYDSTROM_GAMEWEEKS = new Set([12, 13, 17, 18, 19]);

// Bolldata overview gameweeks per coach (pass + xG data available through round 19).
const KARLSSON_BD_GAMEWEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]);
const RYDSTROM_BD_GAMEWEEKS = new Set([11, 12, 13, 14, 16, 17, 18, 19]);

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
  { key: "np_xg",                        label: "Eget xG / match",             sublabel: "samtliga matcher t.o.m. omg 18", format: "decimal", higherIsBetter: true,  decimals: 2 },
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
  { key: "opp_np_xg",           label: "Motst. xG / match",           sublabel: "samtliga matcher t.o.m. omg 18", format: "decimal", higherIsBetter: false, decimals: 2 },
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

type SupplementalXgMatch = {
  hammarby: { xg: number };
  opponent: { xg: number };
};

function computeXgAverages(
  gameweeks: Set<number>,
  supplementalMatches: SupplementalXgMatch[] = [],
) {
  const rounds = hammarbyRoundMatchStats.filter((round) => gameweeks.has(round.gameweek));
  const matches = [...rounds, ...supplementalMatches];
  const count = matches.length;
  const hammarbyXg = matches.reduce((sum, match) => sum + match.hammarby.xg, 0) / count;
  const opponentXg = matches.reduce((sum, match) => sum + match.opponent.xg, 0) / count;

  return {
    hammarbyXg,
    opponentXg,
    xgDifference: hammarbyXg - opponentXg,
  };
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ title, accent = false }: { title: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 ${accent ? "bg-[#006633]/20" : "bg-black/50"}`}>
      <div className={`h-3.5 w-0.5 rounded-full ${accent ? "bg-[#006633]" : "bg-[#8a9096]"}`} />
      <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${accent ? "text-[#5fd39a]" : "text-white/45"}`}>
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
              ? "bg-white text-[#006633]"
              : "bg-white/10 text-white/70"
          }`}
        >
          {fmtVal(kVal, row)}
        </span>
      </div>

      {/* Delta + metric name */}
      <div className="w-40 px-1 text-center">
        {deltaLabel && (
          <p className={`mb-0.5 text-[9px] font-bold ${rBetter ? "text-[#5fd39a]" : "text-white/70"}`}>
            {deltaLabel}
          </p>
        )}
        <p className="text-[11px] leading-snug text-white/60">{row.label}</p>
        {row.sublabel && <p className="mt-0.5 text-[8px] text-white/30">{row.sublabel}</p>}
      </div>

      {/* Spacer to keep 4-col layout aligned */}
      <div className="w-1" />

      {/* Rydström value */}
      <div className="text-right">
        <span
          className={`inline-block rounded px-2.5 py-1 text-sm font-bold tabular-nums ${
            rBetter && isSignificant
              ? "bg-[#006633] text-white"
              : "bg-white/10 text-white/70"
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
    <div className="rounded-lg border border-white/10 bg-black/40 p-3">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-white/35">{label}</p>
      <div className="flex items-end justify-between gap-1">
        <div className="text-center">
          <p className={`text-base font-extrabold tabular-nums ${fmt === "k-better" ? "text-white" : "text-white/60"}`}>
            {kVal}
          </p>
          <p className="mt-0.5 text-[8px] text-white/30">Karlsson</p>
        </div>
        <div className="pb-4 text-[8px] text-white/15">|</div>
        <div className="text-center">
          <p className={`text-base font-extrabold tabular-nums ${fmt === "r-better" ? "text-[#5fd39a]" : "text-white/60"}`}>
            {rVal}
          </p>
          <p className="mt-0.5 text-[8px] text-white/30">Rydström</p>
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

  const kAvg = useMemo<Record<string, number>>(() => {
    const analysis = computeAnalysisAverages(karlssonRounds);
    const xg = computeXgAverages(KARLSSON_BD_GAMEWEEKS);
    return {
      ...analysis,
      np_xg: xg.hammarbyXg,
      opp_np_xg: xg.opponentXg,
      _xg_diff: xg.xgDifference,
    };
  }, [karlssonRounds]);
  const rAvg = useMemo<Record<string, number>>(() => {
    const analysis = computeAnalysisAverages(rydstromRounds);
    const xg = computeXgAverages(RYDSTROM_BD_GAMEWEEKS);
    return {
      ...analysis,
      np_xg: xg.hammarbyXg,
      opp_np_xg: xg.opponentXg,
      _xg_diff: xg.xgDifference,
    };
  }, [rydstromRounds]);

  const kPassAvg = useMemo(() => computePassAverages(KARLSSON_BD_GAMEWEEKS), []);
  const rPassAvg = useMemo(() => computePassAverages(RYDSTROM_BD_GAMEWEEKS), []);

  const kRecord = useMemo(() => {
    const averages = getCoachRecordAverages(coachRecords2026.karlsson);
    return {
      ...coachRecords2026.karlsson,
      ...averages,
    };
  }, []);
  const rRecord = useMemo(() => {
    const averages = getCoachRecordAverages(coachRecords2026.rydstrom);
    return {
      ...coachRecords2026.rydstrom,
      ...averages,
    };
  }, []);

  if (karlssonRounds.length === 0 || rydstromRounds.length === 0) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "oversikt", label: "Facit" },
    { id: "anfall",   label: "Anfallsspelet" },
    { id: "press",    label: "Pressintensitet" },
    { id: "defensiv", label: "Defensivt facit" },
  ];

  const oppXgPerShotRow = DEFENSIV_METRICS.find((m) => m.key === "opp_np_xg_per_shot")!;
  const defensePct = Math.round((1 - rAvg["opp_np_xg_per_shot"] / kAvg["opp_np_xg_per_shot"]) * 100);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
      {/* ── Header ── */}
      <div className="border-b border-white/10 bg-black/40 px-5 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
          Tränarskiftet · Allsvenskan 2026
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          <span className="text-white">Karlsson</span>
          <span className="mx-2 font-light text-[#5fd39a]">→</span>
          <span className="text-[#5fd39a]">Rydström</span>
        </h2>
        <p className="mt-1.5 text-xs text-white/40">
          Resultatfacit under respektive tränarperiod.{" "}
          <span className="text-white/75">{kRecord.matches} matcher (Karlsson)</span>
          {" · "}
          <span className="text-[#5fd39a]">{rRecord.matches} matcher (Rydström)</span>
          <span className="mt-1 block text-white/30">
            Twelve-spelmåtten omfattar Rydström-matcher med synkad rapport (bl.a. Elfsborg, Kalmar, GAIS).
            xG-snittet omfattar samtliga 8 matcher t.o.m. omgång 19.
          </span>
        </p>
        <div
          className="mt-4 h-2.5 w-full opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #006633 0 14px, #ffffff 14px 28px)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Pill tab navigation ── */}
      <div className="border-b border-white/10 bg-black/60 px-3 py-2">
        <div className="flex gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#006633] text-white ring-1 ring-[#5fd39a]/50"
                  : "text-white/40 hover:bg-white/5 hover:text-white/75"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Column labels ── */}
      <div className="grid grid-cols-[1fr_auto_auto_1fr] items-center border-b border-white/10 bg-black/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider">
        <span className="text-white/75">K. Karlsson</span>
        <span className="w-40 text-center text-white/30">Mätvärde</span>
        <span className="w-1" />
        <span className="text-right text-[#5fd39a]">H. Rydström</span>
      </div>

      {/* ══ FACIT tab ══════════════════════════════════════════════════════════ */}
      {activeTab === "oversikt" && (
        <div>
          {/* Era banners */}
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="bg-white/[0.04] px-4 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/55">Karlsson-eran</p>
              <p className="mt-1 text-2xl font-black text-white">
                {kRecord.wins}V {kRecord.draws}O {kRecord.losses}F
              </p>
              <p className="mt-2 inline-flex rounded-md border border-white/20 bg-white/10 px-2 py-1 text-sm font-black tabular-nums text-white">
                {kRecord.points} poäng totalt
              </p>
              <p className="mt-0.5 text-xs text-white/40">
                {kRecord.goalsFor}–{kRecord.goalsAgainst} · {kRecord.pointsPerGame.toFixed(2)} p/m
              </p>
            </div>
            <div className="bg-[#006633]/20 px-4 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#5fd39a]">Rydström-eran</p>
              <p className="mt-1 text-2xl font-black text-white">
                {rRecord.wins}V {rRecord.draws}O {rRecord.losses}F
              </p>
              <p className="mt-2 inline-flex rounded-md border border-[#5fd39a]/35 bg-[#006633]/50 px-2 py-1 text-sm font-black tabular-nums text-white">
                {rRecord.points} poäng totalt
              </p>
              <p className="mt-0.5 text-xs text-white/45">
                {rRecord.goalsFor}–{rRecord.goalsAgainst} · {rRecord.pointsPerGame.toFixed(2)} p/m
              </p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
            <StatTile
              label="Poäng / match"
              kVal={kRecord.pointsPerGame.toFixed(2)}
              rVal={rRecord.pointsPerGame.toFixed(2)}
              higherIsBetter
              fmt={rRecord.pointsPerGame > kRecord.pointsPerGame ? "r-better" : "k-better"}
            />
            <StatTile
              label="Mål / match"
              kVal={kRecord.goalsForPerGame.toFixed(2)}
              rVal={rRecord.goalsForPerGame.toFixed(2)}
              higherIsBetter
              fmt={rRecord.goalsForPerGame > kRecord.goalsForPerGame ? "r-better" : kRecord.goalsForPerGame > rRecord.goalsForPerGame ? "k-better" : "equal"}
            />
            <StatTile
              label="Insläppta / match"
              kVal={kRecord.goalsAgainstPerGame.toFixed(2)}
              rVal={rRecord.goalsAgainstPerGame.toFixed(2)}
              higherIsBetter={false}
              fmt={rRecord.goalsAgainstPerGame < kRecord.goalsAgainstPerGame ? "r-better" : "k-better"}
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
          <div className="border-t border-[#006633]/50 bg-[#006633]/20 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5fd39a]">Skarpaste förbättringen</p>
            <p className="mt-1 text-sm font-bold text-white">
              Motståndarna avlossar {defensePct}% farligare skott per avslut under Karlsson
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">
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

          <div className="border-t border-white/10 bg-black/40 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5fd39a]">Analytikerns not</p>
            <p className="mt-1 text-xs leading-relaxed text-white/55">
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

          <div className="border-t border-[#006633]/50 bg-[#006633]/20 px-5 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5fd39a]">Skarpaste förbättringen</p>
            <p className="mt-1 text-sm font-bold text-white">
              Motståndarna avlossar {defensePct}% farligare skott per avslut under Karlsson
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">
              Skottkvalitet mot: {fmtVal(kAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Karlsson) →{" "}
              {fmtVal(rAvg["opp_np_xg_per_shot"], oppXgPerShotRow)} (Rydström)
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 px-5 py-2.5 text-[9px] leading-relaxed text-white/30">
        Resultatfacit efter AIK–Hammarby 3–2: Rydström = omg 11–14, 16–19 (8 matcher,
        19 poäng) · Karlsson = omg 1–10 + 15 (11 matcher, 17 poäng). Övriga spelmått
        bygger fortsatt på tillgängliga Twelve- och Bolldata-rapporter. xG-snittet för
        Rydström omfattar 8 matcher t.o.m. omgång 19.
      </div>
    </section>
  );
}
