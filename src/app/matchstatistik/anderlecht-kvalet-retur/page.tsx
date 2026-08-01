import type { Metadata } from "next";
import Link from "next/link";
import {
  analysisSections,
  anderlechtBench,
  anderlechtLineup,
  glossary,
  hammarbyBench,
  hammarbyLineup,
  keyInsights,
  matchInfo,
  matchStats,
  halftimeInfo,
  type AnalysisSection,
  type MatchPlayer,
} from "@/lib/anderlechtReturnMatchData";

export const metadata: Metadata = {
  title: "Anderlecht 3–1 Hammarby | UEFA EL-kval Retur 30 juli 2026",
  description:
    "Matchanalys: Anderlecht 3–1 HIF (retur, agg. 4–2). Abraham 0–1 i minut 2, halvtidsbyten vände loppet. Varför tog Anderlecht över helt i andra halvlek?",
};

// ─── Verdict styles ───────────────────────────────────────────────────────────

const verdictStyles = {
  positive: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/8",
    badge: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    badgeLabel: "Positiv",
    iconBg: "bg-emerald-500/20 text-emerald-300",
  },
  neutral: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
    badge: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    badgeLabel: "Neutral",
    iconBg: "bg-sky-500/20 text-sky-300",
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/8",
    badge: "border-amber-400/40 bg-amber-400/10 text-amber-200",
    badgeLabel: "Förbättringsyta",
    iconBg: "bg-amber-500/20 text-amber-300",
  },
} as const;

const insightStyles = {
  positive: "border-emerald-500/30 bg-emerald-500/8",
  neutral: "border-sky-500/30 bg-sky-500/5",
  warning: "border-amber-500/30 bg-amber-500/8",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function playerEvents(p: MatchPlayer) {
  const parts: string[] = [];
  if (p.goal)       parts.push(`⚽ ${p.goal}'`);
  if (p.assist)     parts.push(`🎯 ${p.assist}'`);
  if (p.yellowCard) parts.push("🟨");
  if (p.redCard)    parts.push("🟥");
  if (p.subOff)     parts.push(`↓${p.subOff}'`);
  if (p.subOn)      parts.push(`↑${p.subOn}'`);
  return parts.join(" ");
}

function StatBar({
  label, home, away, unit, direction,
}: {
  label: string;
  home: number | string;
  away: number | string;
  unit?: string;
  direction?: "higher" | "lower" | "neutral";
}) {
  const hNum = typeof home === "number" ? home : null;
  const aNum = typeof away === "number" ? away : null;
  const total = hNum !== null && aNum !== null ? hNum + aNum : null;
  const homePct = total ? (hNum! / total) * 100 : 50;
  const homeWins =
    direction === "neutral" || hNum === null || aNum === null
      ? null
      : direction === "higher"
        ? hNum > aNum
        : hNum < aNum;

  return (
    <div className="py-2">
      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
        <span className={`tabular-nums font-black ${homeWins === true ? "text-amber-200" : homeWins === false ? "text-slate-400" : "text-slate-200"}`}>
          {home}{unit}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-slate-400">{label}</span>
        <span className={`tabular-nums font-black ${homeWins === false ? "text-emerald-200" : homeWins === true ? "text-slate-400" : "text-slate-200"}`}>
          {away}{unit}
        </span>
      </div>
      {total !== null && (
        <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-slate-700">
          <div
            className="rounded-l-full transition-all"
            style={{
              width: `${homePct}%`,
              background:
                homeWins === true
                  ? "linear-gradient(90deg,#b45309,#fbbf24)"
                  : "linear-gradient(90deg,#431407,#78350f)",
            }}
          />
          <div
            className="rounded-r-full transition-all"
            style={{
              width: `${100 - homePct}%`,
              background:
                homeWins === false
                  ? "linear-gradient(90deg,#059669,#34d399)"
                  : "linear-gradient(90deg,#0f4c35,#1a6b4a)",
            }}
          />
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player, isHome }: { player: MatchPlayer; isHome: boolean }) {
  const events = playerEvents(player);
  return (
    <div className={`flex items-center gap-2 py-1.5 text-sm ${isHome ? "" : "flex-row-reverse"}`}>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
          player.goalkeeper
            ? "bg-amber-500/20 text-amber-200"
            : "bg-slate-700 text-slate-300"
        }`}
      >
        {player.number}
      </span>
      <span className={`flex-1 font-medium text-slate-200 ${isHome ? "" : "text-right"}`}>
        {player.name}
      </span>
      {events && (
        <span className="text-xs text-slate-400">{events}</span>
      )}
    </div>
  );
}

function SectionCard({ section }: { section: AnalysisSection }) {
  const style = verdictStyles[section.verdict];
  const isHighlight = section.id === "second-half-explanation";
  return (
    <article
      className={`rounded-2xl border p-5 ${style.border} ${style.bg} ${isHighlight ? "ring-2 ring-amber-400/30" : ""}`}
    >
      {isHighlight && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-200">
          🔎 Djupanalys – Andra halvlekens vändning
        </div>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl ${style.iconBg}`}>
            {section.icon}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              {section.title}
            </p>
            <h3 className="mt-0.5 text-base font-black text-white">
              {section.subTitle}
            </h3>
          </div>
        </div>
        <span className={`rounded-full border px-3 py-0.5 text-[11px] font-bold ${style.badge}`}>
          {style.badgeLabel}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{section.summary}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {section.metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-slate-700/40 bg-slate-900/50 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{m.label}</p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-white">
              {m.value}{m.unit}
            </p>
            {m.note && <p className="mt-0.5 text-[10px] text-slate-500">{m.note}</p>}
          </div>
        ))}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnderlechtReturPage() {
  const summarySection = analysisSections.find((s) => s.id === "summary")!;
  const secondHalfSection = analysisSections.find((s) => s.id === "second-half-explanation")!;
  const otherSections = analysisSections.filter(
    (s) => s.id !== "summary" && s.id !== "second-half-explanation"
  );

  return (
    <div className="min-h-screen bg-[#07101e]">

      {/* ── Header ── */}
      <header className="border-b border-slate-700/40 bg-[#0a1628]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link href="/matchstatistik" className="text-slate-400 hover:text-slate-200">
              ← Matchstatistik
            </Link>
            <span className="text-slate-600">·</span>
            <Link href="/matchstatistik/anderlecht-kvalet" className="text-slate-400 hover:text-slate-200">
              Leg 1 (1–1, 23 juli)
            </Link>
            <span className="text-slate-600">·</span>
            <span className="font-semibold text-amber-400">{matchInfo.competition}</span>
          </div>

          {/* Aggregate banner */}
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <span className="text-xs font-black uppercase tracking-wide text-red-300">Totalt aggregat</span>
                <p className="mt-0.5 text-xl font-black text-white">
                  Anderlecht 4–2 Hammarby
                  <span className="ml-2 text-sm font-semibold text-red-300">Anderlecht vidare</span>
                </p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>Leg 1: {matchInfo.firstLegResult}</p>
                <p>Leg 2: {matchInfo.venue}, {matchInfo.date}</p>
              </div>
            </div>
          </div>

          {/* Score block */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-wide text-amber-400">Hemma</p>
                <p className="mt-1 text-xl font-black text-white">{matchInfo.homeTeam}</p>
              </div>
              <div className="rounded-2xl border border-slate-600/50 bg-slate-800/60 px-8 py-4 text-center">
                <p className="text-5xl font-black tabular-nums text-white">
                  {matchInfo.homeScore}–{matchInfo.awayScore}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  HT 0–1 · Slutresultat
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-400">Borta</p>
                <p className="mt-1 text-xl font-black text-white">{matchInfo.awayTeam}</p>
              </div>
            </div>

            <div className="text-right text-sm text-slate-400">
              <p className="font-semibold text-slate-200">{matchInfo.date}</p>
              <p>{matchInfo.venue}</p>
            </div>
          </div>

          {/* Goals and cards */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-emerald-200">P. Abraham 2' (HIF)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-amber-200">D. Sikan 48' (AND)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-amber-200">M. Cvetković 81' (AND)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-amber-200">T. Degreef 89' (AND)</span>
            </div>
          </div>

          {/* xG teaser */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/8 px-3 py-1.5 text-xs">
              <span className="text-slate-400">xG AND: </span>
              <span className="font-black text-amber-200">4,55</span>
              <span className="ml-2 text-slate-400">xG HIF: </span>
              <span className="font-black text-emerald-300">1,47</span>
              <span className="ml-2 text-[10px] text-slate-500">– AND tre gånger mer förväntade mål</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">

        {/* ── Halvtid/Helhet ── */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Halvtid</p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-black tabular-nums text-amber-200">{halftimeInfo.homeScore}</p>
                <p className="text-[10px] text-slate-400">AND</p>
              </div>
              <span className="text-xl font-black text-slate-500">–</span>
              <div className="text-center">
                <p className="text-3xl font-black tabular-nums text-emerald-200">{halftimeInfo.awayScore}</p>
                <p className="text-[10px] text-slate-400">HIF</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-500">Avslut 1:a HT (AND)</p>
                <p className="font-black text-amber-200">{halftimeInfo.homeShots}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Avslut 1:a HT (HIF)</p>
                <p className="font-black text-emerald-300">{halftimeInfo.awayShots}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Hörnor 1:a HT (AND)</p>
                <p className="font-black text-amber-200">{halftimeInfo.homeCorners}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">HIF ledde</p>
                <p className="font-black text-emerald-300">0–1 HT</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Bollinnehav (helhet)</p>
            <div className="flex h-10 overflow-hidden rounded-full">
              <div
                className="flex items-center justify-center text-sm font-black text-amber-100"
                style={{ width: "56%", background: "linear-gradient(90deg,#b45309,#fbbf24)" }}
              >
                AND 56%
              </div>
              <div
                className="flex items-center justify-center text-sm font-black text-emerald-200"
                style={{ width: "44%", background: "rgba(5,150,105,0.5)" }}
              >
                HIF 44%
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-500">Hörnor</p>
                <p className="font-black text-amber-200">10 – 0</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Avslut totalt</p>
                <p className="font-black text-slate-200">21 – 10</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">xG (Twelve)</p>
                <p className="font-black text-amber-200">4,55 – 1,47</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Field tilt</p>
                <p className="font-black text-amber-200">68% AND</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Match stats ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Matchstatistik</p>
            <div className="flex items-center gap-4 text-xs font-black">
              <span className="text-amber-300">Anderlecht</span>
              <span className="text-emerald-300">Hammarby</span>
            </div>
          </div>
          <div className="divide-y divide-slate-700/30">
            {matchStats.map((s) => (
              <StatBar key={s.label} {...s} />
            ))}
          </div>
        </section>

        {/* ── Nyckelinsikter ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Nyckelinsikter</p>
          <h2 className="mt-1 text-xl font-black text-white">Vad berättar datan?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {keyInsights.map((insight) => (
              <article
                key={insight.title}
                className={`rounded-xl border p-4 ${insightStyles[insight.tone]}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{insight.icon}</span>
                  <p className="text-xs font-black uppercase tracking-wide text-white">{insight.title}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{insight.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Sammanfattning ── */}
        <SectionCard section={summarySection} />

        {/* ── Andra halvleksanalys (highlighted) ── */}
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
            🔎 Djupanalys – Varför tog Anderlecht över i andra halvlek?
          </p>
          <SectionCard section={secondHalfSection} />
        </div>

        {/* ── Uppställningar ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Laguppställningar</p>
          <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>Anderlecht: 4-4-2 (V. Bruno)</span>
            <span>·</span>
            <span>Hammarby: 4-2-3-1 (H. Rydström)</span>
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {/* Anderlecht */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <p className="text-sm font-black text-amber-300">Anderlecht – Startelvan</p>
              </div>
              <div className="divide-y divide-slate-700/30">
                {anderlechtLineup.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome />
                ))}
              </div>
              <div className="mt-3 border-t border-slate-700/30 pt-3">
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-500">Inbytta</p>
                {anderlechtBench.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome />
                ))}
              </div>
            </div>

            {/* Hammarby */}
            <div>
              <div className="mb-3 flex items-center justify-end gap-2">
                <p className="text-sm font-black text-emerald-300">Hammarby – Startelvan</p>
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="divide-y divide-slate-700/30">
                {hammarbyLineup.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome={false} />
                ))}
              </div>
              <div className="mt-3 border-t border-slate-700/30 pt-3">
                <p className="mb-2 text-right text-[10px] font-black uppercase tracking-wide text-slate-500">Inbytta</p>
                {hammarbyBench.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome={false} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Halvtidsbyten – specialvy ── */}
        <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Halvtidsbyten – Anderlecht</p>
          <p className="mt-1 text-sm text-slate-300">
            Vitor Bruno bytte dubbelt i paus. Ndiaye gav mer offensivt stöd på LB-positionen; Cvetković
            adderade energi och kreativitet på mittfältet. Effekten: Sikan kvitterade i 48' och
            Cvetković scorade sedan det avgörande 2–1-målet i 81'.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-amber-300">46' – Vänsterback</p>
              <p className="mt-1 text-sm text-slate-400">
                <span className="text-red-300">↓ L. Augustinsson</span>
                {" → "}
                <span className="font-bold text-green-300">↑ M. Ndiaye</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Mer offensiv LB, ökad bredd</p>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-wide text-amber-300">46' – Centralmittfältare</p>
              <p className="mt-1 text-sm text-slate-400">
                <span className="text-red-300">↓ J. Bethume</span>
                {" → "}
                <span className="font-bold text-green-300">↑ M. Cvetković ⚽ 81'</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Avgörande sub – scorade 2–1</p>
            </div>
          </div>
        </section>

        {/* ── Övriga analysavsnitt ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Detaljanalys per spelaspekt</p>
          {otherSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>

        {/* ── Länk till leg 1 ── */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">Leg 1</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-black text-white">HIF 1–1 Anderlecht · 23 juli 2026</p>
              <p className="mt-0.5 text-sm text-slate-400">
                xG 1,75–0,48 · 4 höga chanser · Anderlecht fick rött
              </p>
            </div>
            <Link
              href="/matchstatistik/anderlecht-kvalet"
              className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-bold text-sky-200 hover:bg-sky-500/25"
            >
              Öppna Leg 1 →
            </Link>
          </div>
        </div>

        {/* ── Ordlista ── */}
        <details className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-5">
          <summary className="cursor-pointer text-sm font-black text-slate-300">
            Ordlista (visa/dölj)
          </summary>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {glossary.map((g) => (
              <div key={g.term} className="rounded-lg border border-slate-700/40 bg-slate-900/50 p-3">
                <p className="text-xs font-black uppercase tracking-wide text-slate-200">{g.term}</p>
                <p className="mt-1 text-xs text-slate-400">{g.explanation}</p>
              </div>
            ))}
          </div>
        </details>

        {/* ── Källa ── */}
        <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-4">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Primärkälla (Twelve Football):</span>{" "}
            <a
              href={matchInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 underline decoration-sky-400/50 underline-offset-2 hover:text-sky-300"
            >
              Twelve Football – Shared Match Report (retur)
            </a>
            {" · "}Kompletterande statistik: OFStats, Soccerhub, DailyGoal
            {" · "}{matchInfo.competition} · {matchInfo.date}
          </p>
        </div>
      </main>
    </div>
  );
}
