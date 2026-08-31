"use client";

import Link from "next/link";
import { useMemo } from "react";
import { type PlayerTrendMatch } from "@/lib/hammarbyPlayerTrendData";
import { type HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";
import { type RoundMatchStats } from "@/lib/matchStatisticsOverviewData";

// ─── helpers ────────────────────────────────────────────────────────────────

function getMetric(metrics: object, key: string): number {
  return (metrics as Record<string, number>)[key] ?? 0;
}

function sum(match: PlayerTrendMatch, key: string): number {
  return match.players.reduce(
    (s, p) => s + getMetric(p.metrics, key),
    0
  );
}

function weightedAccuracy(match: PlayerTrendMatch, accKey: string, totKey: string): number {
  const totalPasses = sum(match, totKey);
  if (totalPasses === 0) return 0;
  const successful = match.players.reduce((s, p) => {
    const acc = getMetric(p.metrics, accKey) / 100;
    const tot = getMetric(p.metrics, totKey);
    return s + acc * tot;
  }, 0);
  return successful / totalPasses;
}

function avg(rows: MatchPassRow[], key: keyof MatchPassRow): number {
  if (rows.length === 0) return 0;
  return rows.reduce((s, r) => s + (r[key] as number), 0) / rows.length;
}

function pct(n: number, total: number) {
  return total > 0 ? Math.round((n / total) * 100) : 0;
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("sv-SE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── types ───────────────────────────────────────────────────────────────────

type MatchPassRow = {
  gameweek: number;
  name: string;
  passes: number;
  forwardPasses: number;
  passesToFinalThird: number;
  passesToPenaltyArea: number;
  crosses: number;
  crossSuccessful: number;
  keyPasses: number;
  xA: number;
  passAccuracy: number;
  forwardPassAccuracy: number;
  finalThirdPassAccuracy: number;
};

// ─── pitch zone SVG ──────────────────────────────────────────────────────────

function PitchZoneBar({
  backward,
  midForward,
  finalThird,
  penaltyArea,
}: {
  backward: number;
  midForward: number;
  finalThird: number;
  penaltyArea: number;
}) {
  const total = backward + midForward + finalThird + penaltyArea;
  const bPct = pct(backward, total);
  const mPct = pct(midForward, total);
  const fPct = pct(finalThird, total);
  const pPct = pct(penaltyArea, total);

  return (
    <div className="space-y-3">
      {/* Pitch visual */}
      <div className="relative overflow-hidden rounded-lg border border-slate-600/40 bg-[#1a2820]">
        <svg viewBox="0 0 400 120" className="w-full">
          {/* Pitch background */}
          <rect x="0" y="0" width="400" height="120" fill="#1a2820" />
          {/* Zone dividers */}
          <line x1="133" y1="0" x2="133" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="267" y1="0" x2="267" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
          {/* Penalty area (right) */}
          <rect x="330" y="30" width="70" height="60" fill="none" stroke="#334155" strokeWidth="1" />
          {/* Center circle */}
          <circle cx="200" cy="60" r="25" fill="none" stroke="#334155" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="120" stroke="#334155" strokeWidth="0.5" />

          {/* Zone fills proportional to pass % */}
          {/* Backward/own half zone */}
          <rect x="0" y="8" width={`${bPct * 1.33}`} height="104" rx="2" fill="#3b82f6" fillOpacity="0.15" />
          {/* Mid forward zone */}
          <rect x={`${133}`} y="8" width={`${mPct * 1.34}`} height="104" rx="2" fill="#22c55e" fillOpacity="0.15" />
          {/* Final third zone */}
          <rect x={`${267}`} y="8" width={`${fPct * 1.33}`} height="104" rx="2" fill="#f59e0b" fillOpacity="0.20" />
          {/* Penalty area zone */}
          <rect x="330" y="30" width={`${pPct * 0.7}`} height="60" rx="2" fill="#ef4444" fillOpacity="0.25" />

          {/* Zone labels */}
          <text x="66" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">DEFENSIVT</text>
          <text x="66" y="67" textAnchor="middle" fill="#94a3b8" fontSize="9">& LATERALT</text>
          <text x="200" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">PROGRESSIVT</text>
          <text x="200" y="67" textAnchor="middle" fill="#94a3b8" fontSize="9">FRAMÅT</text>
          <text x="290" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">SISTA</text>
          <text x="290" y="67" textAnchor="middle" fill="#94a3b8" fontSize="9">TREDJEDELEN</text>

          {/* % labels */}
          <text x="66" y="100" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">{bPct}%</text>
          <text x="200" y="100" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">{mPct}%</text>
          <text x="290" y="100" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">{fPct}%</text>
          <text x="356" y="68" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">{pPct}%</text>
        </svg>
      </div>

      {/* Stat row under pitch */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/8 p-2">
          <p className="font-semibold text-blue-300">{fmt(backward)}</p>
          <p className="mt-0.5 text-slate-500">Bakåt/lateralt</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/8 p-2">
          <p className="font-semibold text-green-300">{fmt(midForward)}</p>
          <p className="mt-0.5 text-slate-500">Progressivt</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 p-2">
          <p className="font-semibold text-amber-300">{fmt(finalThird)}</p>
          <p className="mt-0.5 text-slate-500">Sista tredjedel</p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/8 p-2">
          <p className="font-semibold text-red-300">{fmt(penaltyArea)}</p>
          <p className="mt-0.5 text-slate-500">Straffområdet</p>
        </div>
      </div>
    </div>
  );
}

// ─── bar comparison ───────────────────────────────────────────────────────────

type BarRowProps = {
  label: string;
  hammarby: number;
  opponent: number;
  max: number;
  formatFn?: (n: number) => string;
  higherIsBetter?: boolean;
  unit?: string;
};

function BarRow({ label, hammarby, opponent, max, formatFn, higherIsBetter = true, unit = "" }: BarRowProps) {
  const fmt2 = formatFn ?? ((n: number) => n.toFixed(0));
  const hamPct = (hammarby / max) * 100;
  const oppPct = (opponent / max) * 100;
  const hamBetter = higherIsBetter ? hammarby >= opponent : hammarby <= opponent;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium">{label}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className={`w-20 text-right text-xs font-bold ${hamBetter ? "text-green-300" : "text-slate-300"}`}>
            {fmt2(hammarby)}{unit}
          </span>
          <div className="flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
              <div
                className={`h-full rounded-full ${hamBetter ? "bg-green-500" : "bg-slate-400"}`}
                style={{ width: `${Math.min(hamPct, 100)}%` }}
              />
            </div>
          </div>
          <span className="w-14 text-[10px] text-green-400">Hammarby</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-20 text-right text-xs font-bold ${!hamBetter ? "text-red-300" : "text-slate-400"}`}>
            {fmt2(opponent)}{unit}
          </span>
          <div className="flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
              <div
                className={`h-full rounded-full ${!hamBetter ? "bg-red-400" : "bg-slate-500"}`}
                style={{ width: `${Math.min(oppPct, 100)}%` }}
              />
            </div>
          </div>
          <span className="w-14 text-[10px] text-slate-500">Motst.</span>
        </div>
      </div>
    </div>
  );
}

// ─── sparkline ───────────────────────────────────────────────────────────────

function Sparkline({
  rows,
  valueKey,
  color = "#22c55e",
  label,
  formatFn,
}: {
  rows: MatchPassRow[];
  valueKey: keyof MatchPassRow;
  color?: string;
  label: string;
  formatFn?: (n: number) => string;
}) {
  const values = rows.map((r) => r[valueKey] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 300;
  const H = 56;
  const pad = 8;
  const pts = rows.map((r, i) => {
    const x = pad + (i / Math.max(rows.length - 1, 1)) * (W - pad * 2);
    const y = H - pad - ((r[valueKey] as number - min) / range) * (H - pad * 2);
    return { x, y, val: r[valueKey] as number, gw: r.gameweek };
  });

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fmt3 = formatFn ?? ((n: number) => n.toFixed(0));

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        {pts.map((p) => (
          <g key={p.gw}>
            <circle cx={p.x} cy={p.y} r="3" fill={color} />
            <text x={p.x} y={H - 1} textAnchor="middle" fill="#475569" fontSize="7">
              {p.gw}
            </text>
          </g>
        ))}
        <text x={pts[pts.length - 1].x} y={pts[pts.length - 1].y - 6} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">
          {fmt3(pts[pts.length - 1].val)}
        </text>
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-slate-600">
        <span>Min: {fmt3(min)}</span>
        <span>Snitt: {fmt3(values.reduce((s, v) => s + v, 0) / values.length)}</span>
        <span>Max: {fmt3(max)}</span>
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export function PassingAnalysisDashboard({
  playerTrendMatches,
  analysisRounds,
  overviewStats,
}: {
  playerTrendMatches: PlayerTrendMatch[];
  analysisRounds: HammarbyMatchAnalysisRound[];
  overviewStats: RoundMatchStats[];
}) {
  const rows2026: MatchPassRow[] = useMemo(
    () =>
      playerTrendMatches
        .filter((m) => m.players.length > 0)
        .map((m) => ({
          gameweek: m.gameweek,
          name: m.name,
          passes: sum(m, "passes"),
          forwardPasses: sum(m, "forwardPasses"),
          passesToFinalThird: sum(m, "passesToFinalThird"),
          passesToPenaltyArea: sum(m, "passesToPenaltyArea"),
          crosses: sum(m, "crosses"),
          crossSuccessful: Math.round(sum(m, "crosses") * weightedAccuracy(m, "crossAccuracy", "crosses")),
          keyPasses: sum(m, "keyPasses"),
          xA: sum(m, "xA"),
          passAccuracy: weightedAccuracy(m, "passAccuracy", "passes"),
          forwardPassAccuracy: weightedAccuracy(m, "forwardPassAccuracy", "forwardPasses"),
          finalThirdPassAccuracy: weightedAccuracy(m, "finalThirdPassAccuracy", "passesToFinalThird"),
        }))
        .sort((a, b) => a.gameweek - b.gameweek),
    [playerTrendMatches]
  );

  const rounds2026 = useMemo(
    () => analysisRounds.filter((r) => r.season === 2026),
    [analysisRounds]
  );

  // Average passing stats
  const hamPasses = avg(rows2026, "passes");
  const hamFwdPasses = avg(rows2026, "forwardPasses");
  const hamFinalThird = avg(rows2026, "passesToFinalThird");
  const hamPenArea = avg(rows2026, "passesToPenaltyArea");
  const hamCrosses = avg(rows2026, "crosses");
  const hamKeyPasses = avg(rows2026, "keyPasses");
  const hamXa = avg(rows2026, "xA");
  const hamPassAcc = avg(rows2026, "passAccuracy");
  const hamFwdAcc = avg(rows2026, "forwardPassAccuracy");
  const hamFinalThirdAcc = avg(rows2026, "finalThirdPassAccuracy");

  // Pitch zone breakdown (avg per match)
  const zoneBwd = hamPasses - hamFwdPasses;
  const zoneMid = hamFwdPasses - hamFinalThird;
  const zoneFinal = hamFinalThird - hamPenArea;
  const zonePen = hamPenArea;

  // Opponent averages from overview stats
  const oppOverview = useMemo(
    () => overviewStats.filter((s) => Number(s.gameweek) >= 1),
    [overviewStats]
  );
  const oppPasses = oppOverview.reduce((s, r) => s + r.opponent.passes, 0) / (oppOverview.length || 1);
  const oppPassAcc = oppOverview.reduce((s, r) => s + (r.opponent.passesSuccessful / (r.opponent.passes || 1)), 0) / (oppOverview.length || 1);
  const oppTouchesBox = oppOverview.reduce((s, r) => s + r.opponent.touchesInBox, 0) / (oppOverview.length || 1);
  const hamTouchesBox = oppOverview.reduce((s, r) => s + r.hammarby.touchesInBox, 0) / (oppOverview.length || 1);

  // Tactical metrics from Twelve (analysis rounds)
  const r2026avg = (key: string) => {
    const vals = rounds2026
      .map((r) => r.metrics?.[key as keyof typeof r.metrics]?.value)
      .filter((v): v is number => typeof v === "number");
    return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
  };

  const hamBoxEntries = r2026avg("num_box_entries");
  const oppBoxEntries = r2026avg("opp_num_box_entries");
  const hamFinalThirdPoss = r2026avg("num_possessions_final_third");
  const ppda = r2026avg("ppda");
  const recoveries = r2026avg("num_recoveries_att_half");
  const defHeight = r2026avg("defensive_action_height_m");
  const hamNpXg = r2026avg("np_xg");
  const oppNpXg = r2026avg("opp_np_xg");
  const hamNpXgPerShot = r2026avg("np_xg_per_shot");
  const oppNpXgPerShot = r2026avg("opp_np_xg_per_shot");
  const hamNpShots = r2026avg("np_shots");
  const oppNpShots = r2026avg("opp_np_shots");
  const xtAfterRecovery = r2026avg("xt_within_10s_after_recovery");

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-400">Hammarby IF</p>
            <h1 className="text-xl font-bold text-white">Passningsanalys & nyckeltal</h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: bolldata.se · Twelve</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/" className="inline-flex items-center gap-1 rounded-md border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-slate-100 hover:border-slate-400">
              🏠 Huvudsida
            </Link>
            <Link href="/matchstatistik" className="text-slate-300 hover:text-white">← Till matchstatistik</Link>
            <Link href="/matchstatistik/coachjamforelse" className="text-purple-300 hover:text-purple-200">Rydström vs Karlsson →</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">

        {/* ── KPI OVERVIEW ─────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {[
            { label: "Passningar/match", value: fmt(hamPasses), sub: "Hammarby snitt" },
            { label: "Passningsprecision", value: `${Math.round(hamPassAcc * 100)} %`, sub: `Motst: ${Math.round(oppPassAcc * 100)} %` },
            { label: "Framåtpassningar", value: `${pct(hamFwdPasses, hamPasses)} %`, sub: `${fmt(hamFwdPasses)} pass/match` },
            { label: "Till sista tredjedelen", value: fmt(hamFinalThird), sub: "pass/match" },
            { label: "Till straffområdet", value: fmt(hamPenArea), sub: "pass/match" },
            { label: "Nyckelpassningar", value: fmt(hamKeyPasses, 1), sub: "pass/match" },
            { label: "xA", value: hamXa.toFixed(2), sub: "assist-förväntan/match" },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{card.sub}</p>
            </div>
          ))}
        </section>

        {/* ── PASSNINGAR PÅ PLAN ───────────────────────────────── */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Spelplan</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Var på plan passas bollen?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Genomsnitt per match baserat på passningsdestination. Bakåt/lateralt inkluderar alla passningar som inte går mot motståndarens mål.
            </p>
          </div>
          <PitchZoneBar
            backward={Math.round(zoneBwd)}
            midForward={Math.round(zoneMid)}
            finalThird={Math.round(zoneFinal)}
            penaltyArea={Math.round(zonePen)}
          />

          {/* Accuracy breakdown per zone */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Framåtpass-precision</p>
              <p className="mt-2 text-2xl font-bold text-green-300">{Math.round(hamFwdAcc * 100)} %</p>
              <p className="mt-0.5 text-xs text-slate-500">av {fmt(hamFwdPasses)} framåtpass/match</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Precision i sista tredjedelen</p>
              <p className="mt-2 text-2xl font-bold text-amber-300">{Math.round(hamFinalThirdAcc * 100)} %</p>
              <p className="mt-0.5 text-xs text-slate-500">av {fmt(hamFinalThird)} pass till sista tredjedelen/match</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Inläggsprecision</p>
              <p className="mt-2 text-2xl font-bold text-purple-300">
                {rows2026.length > 0
                  ? Math.round(
                      rows2026.reduce((s, r) => {
                        const acc = weightedAccuracy(
                          playerTrendMatches.find((m) => m.gameweek === r.gameweek)!,
                          "crossAccuracy",
                          "crosses"
                        );
                        return s + acc;
                      }, 0) / rows2026.length * 100
                    )
                  : 0}{" "}
                %
              </p>
              <p className="mt-0.5 text-xs text-slate-500">av {fmt(hamCrosses, 1)} inlägg/match</p>
            </div>
          </div>
        </section>

        {/* ── OFFENSIVA NYCKELTAL ──────────────────────────────── */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-green-400">Offensiv</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Offensiva nyckeltal – Hammarby vs motståndare</h2>
            <p className="mt-1 text-sm text-slate-400">
              Genomsnitt per match. Grön stapel = Hammarby, röd = motståndare.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <BarRow
                label="Passningar"
                hammarby={hamPasses}
                opponent={oppPasses}
                max={Math.max(hamPasses, oppPasses) * 1.1}
                formatFn={(n) => fmt(n)}
              />
              <BarRow
                label="Passningsprecision"
                hammarby={hamPassAcc * 100}
                opponent={oppPassAcc * 100}
                max={100}
                formatFn={(n) => `${n.toFixed(0)} %`}
              />
              <BarRow
                label="Passningar till sista tredjedelen"
                hammarby={hamFinalThird}
                opponent={0}
                max={hamFinalThird * 1.2}
                formatFn={(n) => fmt(n)}
              />
              <BarRow
                label="Passningar till straffområdet"
                hammarby={hamPenArea}
                opponent={0}
                max={hamPenArea * 1.2}
                formatFn={(n) => fmt(n)}
              />
            </div>
            <div className="space-y-5">
              <BarRow
                label="Inträden i motståndarens straffområde"
                hammarby={hamBoxEntries}
                opponent={oppBoxEntries}
                max={Math.max(hamBoxEntries, oppBoxEntries) * 1.15}
                formatFn={(n) => n.toFixed(1)}
              />
              <BarRow
                label="Anfall i sista tredjedelen"
                hammarby={hamFinalThirdPoss}
                opponent={0}
                max={hamFinalThirdPoss * 1.2}
                formatFn={(n) => n.toFixed(1)}
              />
              <BarRow
                label="npxG per match"
                hammarby={hamNpXg}
                opponent={oppNpXg}
                max={Math.max(hamNpXg, oppNpXg) * 1.2}
                formatFn={(n) => n.toFixed(2)}
              />
              <BarRow
                label="Skott utan straff/frispark"
                hammarby={hamNpShots}
                opponent={oppNpShots}
                max={Math.max(hamNpShots, oppNpShots) * 1.15}
                formatFn={(n) => n.toFixed(1)}
              />
            </div>
          </div>

          {/* xG quality cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Nyckelpassningar/match", value: hamKeyPasses.toFixed(1), color: "text-cyan-300", border: "border-cyan-500/30", bg: "bg-cyan-500/8" },
              { label: "xA/match", value: hamXa.toFixed(2), color: "text-cyan-200", border: "border-cyan-500/30", bg: "bg-cyan-500/8" },
              { label: "npxG/skott (Hammarby)", value: hamNpXgPerShot.toFixed(3), color: "text-green-300", border: "border-green-500/30", bg: "bg-green-500/8" },
              { label: "xT efter bollinvst (10 sek)", value: xtAfterRecovery.toFixed(2), color: "text-amber-300", border: "border-amber-500/30", bg: "bg-amber-500/8" },
            ].map((c) => (
              <div key={c.label} className={`rounded-xl border p-4 ${c.border} ${c.bg}`}>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">{c.label}</p>
                <p className={`mt-2 text-2xl font-bold ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEFENSIVA NYCKELTAL ──────────────────────────────── */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-rose-400">Defensiv</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Defensiva nyckeltal</h2>
            <p className="mt-1 text-sm text-slate-400">
              Pressingeffektivitet, defensiv organisation och vad motståndarna lyckas skapa.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Press & block */}
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Press & pressningshöjd</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3">
                    <div>
                      <p className="text-xs text-slate-400">PPDA</p>
                      <p className="text-[10px] text-slate-600">Lägre = bättre press. Passningar tillåtna per defensiv aktion</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{ppda.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3">
                    <div>
                      <p className="text-xs text-slate-400">Höga återerövringar/match</p>
                      <p className="text-[10px] text-slate-600">Bollar vunna i motståndarens halvlek</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{recoveries.toFixed(1)}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3">
                    <div>
                      <p className="text-xs text-slate-400">Defensiv höjd</p>
                      <p className="text-[10px] text-slate-600">Genomsnittsposition för defensiva aktioner (meter från eget mål)</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{defHeight.toFixed(1)} m</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Opponent creation */}
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Motståndarens chansskapande</p>
                <div className="space-y-4">
                  <BarRow
                    label="Motståndarens passningar"
                    hammarby={hamPasses}
                    opponent={oppPasses}
                    max={Math.max(hamPasses, oppPasses) * 1.1}
                    formatFn={(n) => fmt(n)}
                    higherIsBetter={true}
                  />
                  <BarRow
                    label="Motståndarens inträden i straffområdet"
                    hammarby={hamBoxEntries}
                    opponent={oppBoxEntries}
                    max={Math.max(hamBoxEntries, oppBoxEntries) * 1.15}
                    formatFn={(n) => n.toFixed(1)}
                    higherIsBetter={true}
                  />
                  <BarRow
                    label="Motståndarens npxG"
                    hammarby={hamNpXg}
                    opponent={oppNpXg}
                    max={Math.max(hamNpXg, oppNpXg) * 1.2}
                    formatFn={(n) => n.toFixed(2)}
                    higherIsBetter={true}
                  />
                  <BarRow
                    label="Motst. npxG/skott (skottkvalitet)"
                    hammarby={hamNpXgPerShot}
                    opponent={oppNpXgPerShot}
                    max={Math.max(hamNpXgPerShot, oppNpXgPerShot) * 1.2}
                    formatFn={(n) => n.toFixed(3)}
                    higherIsBetter={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Touches in box comparison */}
          {oppOverview.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-green-500/25 bg-green-500/5 p-4">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Hammarbys bollkontakter i box</p>
                <p className="mt-2 text-2xl font-bold text-green-300">{hamTouchesBox.toFixed(1)}</p>
                <p className="mt-0.5 text-xs text-slate-500">per match (snitt)</p>
              </div>
              <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Motståndarens bollkontakter i box</p>
                <p className="mt-2 text-2xl font-bold text-rose-300">{oppTouchesBox.toFixed(1)}</p>
                <p className="mt-0.5 text-xs text-slate-500">per match (snitt)</p>
              </div>
              <div className="rounded-xl border border-slate-600/50 bg-slate-900/50 p-4">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Fördel Hammarby i box</p>
                <p className={`mt-2 text-2xl font-bold ${hamTouchesBox > oppTouchesBox ? "text-green-300" : "text-rose-300"}`}>
                  {hamTouchesBox > oppTouchesBox ? "+" : ""}{(hamTouchesBox - oppTouchesBox).toFixed(1)}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">kontakter per match</p>
              </div>
            </div>
          )}
        </section>

        {/* ── TRENDS PER MATCH ─────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Trend</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Passningsutveckling per match</h2>
            <p className="mt-1 text-sm text-slate-400">
              Siffrorna på x-axeln är omgångsnummer. Data från bolldata.se (spelartrenddata).
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Sparkline rows={rows2026} valueKey="passes" color="#3b82f6" label="Totalt antal passningar" />
            <Sparkline rows={rows2026} valueKey="passesToFinalThird" color="#22c55e" label="Passningar till sista tredjedelen" />
            <Sparkline rows={rows2026} valueKey="passesToPenaltyArea" color="#f59e0b" label="Passningar till straffområdet" />
            <Sparkline rows={rows2026} valueKey="crosses" color="#a855f7" label="Inlägg" />
            <Sparkline rows={rows2026} valueKey="keyPasses" color="#06b6d4" label="Nyckelpassningar" />
            <Sparkline rows={rows2026} valueKey="xA" color="#10b981" label="xA (assist-förväntan)" formatFn={(n) => n.toFixed(2)} />
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            <strong className="text-slate-300">Metod:</strong> Passningszoner beräknade från spelarnivådata (bolldata.se) aggregerade per match. &quot;Bakåt/lateralt&quot; = totala passningar minus framåtpassningar. Defensiva nyckeltal (PPDA, höga återerövringar, defensiv höjd) från Twelve/Wyscout via hammarbyfotboll.se. xG, npxG och inträden från Twelve API. Data för 2026 omgång 1–12 (12 matcher med spelardata tillgängliga).
          </p>
        </footer>
      </main>
    </div>
  );
}
