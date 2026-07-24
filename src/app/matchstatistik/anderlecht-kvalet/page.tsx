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
  type AnalysisSection,
  type MatchPlayer,
} from "@/lib/anderlechtMatchData";

export const metadata: Metadata = {
  title: "Hammarby 1–1 Anderlecht | UEFA EL-kval 23 juli 2026",
  description:
    "Matchanalys baserat på Twelve Football: xG 1,75–0,48, 4 höga chanser, 72% vinstprobabilitet. Hammarby dominerade men fick nöja sig med 1–1 i kvalet.",
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
  neutral:  "border-sky-500/30 bg-sky-500/5",
  warning:  "border-amber-500/30 bg-amber-500/8",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function playerEvents(p: MatchPlayer) {
  const parts: string[] = [];
  if (p.goal)       parts.push(`⚽ ${p.goal}'`);
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
  const homeWins = direction === "neutral" || hNum === null || aNum === null
    ? null
    : direction === "higher" ? hNum > aNum : hNum < aNum;

  return (
    <div className="py-2">
      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
        <span className={`tabular-nums font-black ${homeWins === true ? "text-emerald-200" : homeWins === false ? "text-slate-400" : "text-slate-200"}`}>
          {home}{unit}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-slate-400">{label}</span>
        <span className={`tabular-nums font-black ${homeWins === false ? "text-amber-200" : homeWins === true ? "text-slate-400" : "text-slate-200"}`}>
          {away}{unit}
        </span>
      </div>
      {total !== null && (
        <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-slate-700">
          <div
            className="rounded-l-full transition-all"
            style={{
              width: `${homePct}%`,
              background: homeWins === true
                ? "linear-gradient(90deg,#059669,#34d399)"
                : "linear-gradient(90deg,#0f4c35,#1a6b4a)",
            }}
          />
          <div
            className="rounded-r-full transition-all"
            style={{
              width: `${100 - homePct}%`,
              background: homeWins === false
                ? "linear-gradient(90deg,#b45309,#fbbf24)"
                : "linear-gradient(90deg,#431407,#78350f)",
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
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
        player.goalkeeper
          ? "bg-amber-500/20 text-amber-200"
          : "bg-slate-700 text-slate-300"
      }`}>
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
  return (
    <article className={`rounded-2xl border p-5 ${style.border} ${style.bg}`}>
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

export default function AnderlechtKvaletPage() {
  const summarySection = analysisSections.find((s) => s.id === "summary")!;
  const otherSections = analysisSections.filter((s) => s.id !== "summary");

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
            <span className="font-semibold text-sky-400">{matchInfo.competition}</span>
          </div>

          {/* Score block */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-400">Hemma</p>
                <p className="mt-1 text-xl font-black text-white">{matchInfo.homeTeam}</p>
              </div>
              <div className="rounded-2xl border border-slate-600/50 bg-slate-800/60 px-8 py-4 text-center">
                <p className="text-5xl font-black tabular-nums text-white">
                  {matchInfo.homeScore}–{matchInfo.awayScore}
                </p>
                <p className="mt-1 text-xs text-slate-400">Slutresultat</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-wide text-amber-400">Borta</p>
                <p className="mt-1 text-xl font-black text-white">{matchInfo.awayTeam}</p>
              </div>
            </div>

            <div className="text-right text-sm text-slate-400">
              <p className="font-semibold text-slate-200">{matchInfo.date}</p>
              <p>{matchInfo.venue}</p>
            </div>
          </div>

          {/* Scorers */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-emerald-200">F. Adjei 86' (HIF)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
              <span>⚽</span>
              <span className="font-semibold text-amber-200">D. Sikan 55' (AND)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
              <span>🟥</span>
              <span className="font-semibold text-red-200">N. Saliba (AND) – utvisad</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">

        {/* ── Win probability ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Vinstprobabilitet (Twelve)</p>
          <div className="flex h-8 overflow-hidden rounded-full">
            <div
              className="flex items-center justify-center text-xs font-black text-white"
              style={{ width: "72%", background: "linear-gradient(90deg,#059669,#34d399)" }}
            >
              HIF 72%
            </div>
            <div
              className="flex items-center justify-center text-xs font-black text-slate-300"
              style={{ width: "20%", background: "rgba(100,116,139,0.4)" }}
            >
              20%
            </div>
            <div
              className="flex items-center justify-center text-xs font-black text-amber-200"
              style={{ width: "8%", background: "rgba(120,60,10,0.5)" }}
            >
              8%
            </div>
          </div>
          <div className="mt-2 flex items-center gap-6 text-[11px] text-slate-400">
            <span><span className="font-semibold text-emerald-300">●</span> Hammarby vinner</span>
            <span><span className="font-semibold text-slate-300">●</span> Oavgjort</span>
            <span><span className="font-semibold text-amber-400">●</span> Anderlecht vinner</span>
          </div>
        </section>

        {/* ── Match stats ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Matchstatistik</p>
            <div className="flex items-center gap-4 text-xs font-black">
              <span className="text-emerald-300">Hammarby</span>
              <span className="text-amber-300">Anderlecht</span>
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

        {/* ── Uppställningar ── */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Laguppställningar</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {/* Hammarby */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <p className="text-sm font-black text-emerald-300">Hammarby – Startelvan</p>
              </div>
              <div className="divide-y divide-slate-700/30">
                {hammarbyLineup.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome />
                ))}
              </div>
              <div className="mt-3 border-t border-slate-700/30 pt-3">
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-500">Inbytta</p>
                {hammarbyBench.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome />
                ))}
              </div>
            </div>

            {/* Anderlecht */}
            <div>
              <div className="mb-3 flex items-center justify-end gap-2">
                <p className="text-sm font-black text-amber-300">Anderlecht – Startelvan</p>
                <span className="h-3 w-3 rounded-full bg-amber-400" />
              </div>
              <div className="divide-y divide-slate-700/30">
                {anderlechtLineup.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome={false} />
                ))}
              </div>
              <div className="mt-3 border-t border-slate-700/30 pt-3">
                <p className="mb-2 text-right text-[10px] font-black uppercase tracking-wide text-slate-500">Inbytta</p>
                {anderlechtBench.map((p) => (
                  <PlayerCard key={p.number} player={p} isHome={false} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section analyses ── */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Twelve Football – sektionsanalys</p>
          {otherSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>

        {/* ── Glossary ── */}
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

        {/* ── Source ── */}
        <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-4">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Källa:</span>{" "}
            <a
              href={matchInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 underline decoration-sky-400/50 underline-offset-2 hover:text-sky-300"
            >
              Twelve Football – Shared Match Report
            </a>
            {" · "}
            {matchInfo.competition} · {matchInfo.date}
          </p>
        </div>
      </main>
    </div>
  );
}
