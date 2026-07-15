import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";
import SpiderComparisonChart from "@/components/SpiderComparisonChart";

export const metadata: Metadata = {
  title: "Broadcaster Dashboard | Hammarby 2026",
  description: "Broadcast-ready matchanalys för Hammarby IF – Allsvenskan 2026.",
};

const trafficCfg = {
  red: {
    cardBg: "bg-gradient-to-b from-rose-950/80 to-neutral-950",
    border: "border-rose-600/40",
    numColor: "text-rose-400",
    badgeBg: "bg-rose-500/20 border-rose-500/50 text-rose-200",
    accent: "bg-rose-500",
    icon: "🔴",
  },
  green: {
    cardBg: "bg-gradient-to-b from-emerald-950/80 to-neutral-950",
    border: "border-emerald-600/40",
    numColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 border-emerald-500/50 text-emerald-200",
    accent: "bg-emerald-500",
    icon: "🟢",
  },
  yellow: {
    cardBg: "bg-gradient-to-b from-amber-950/80 to-neutral-950",
    border: "border-amber-600/40",
    numColor: "text-amber-400",
    badgeBg: "bg-amber-500/20 border-amber-500/50 text-amber-200",
    accent: "bg-amber-500",
    icon: "🟡",
  },
} as const;

function SectionLabel({
  num,
  sub,
  title,
}: {
  num: string;
  sub: string;
  title: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <span className="text-5xl font-black tabular-nums text-neutral-700 leading-none">
        {num}
      </span>
      <div className="w-1 h-14 rounded-full bg-[#008050]" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#008050]">
          {sub}
        </p>
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-slate-100 leading-tight">
          {title}
        </h2>
      </div>
      <div className="flex-1 h-px bg-neutral-800" />
    </div>
  );
}

export default function BroadcasterDashboard() {
  const report = upcomingOpponents.find((r) => !r.hidden);
  if (!report) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500 text-xl">Ingen aktiv rapport.</p>
      </div>
    );
  }

  const opponentName =
    report.fixture
      .split("-")
      .map((p) => p.trim())
      .find((t) => !t.toLowerCase().includes("hammarby")) ?? "Motståndaren";

  const hasSuspended =
    report.playersToWatch?.some((p) => p.scoutBadge?.includes("AVSTÄNGD")) ??
    false;

  const suspendedNames =
    report.playersToWatch
      ?.filter((p) => p.scoutBadge?.includes("AVSTÄNGD"))
      .map((p) => p.name.split(" ").pop())
      .join(" + ") ?? "";

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100">
      {/* ── NAV ── */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/matchstatistik"
            className="text-sm text-neutral-500 hover:text-neutral-300"
          >
            ← Matchstatistik
          </Link>
          <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Broadcaster Dashboard
          </span>
          <Link
            href="/matchstatistik/omgang/12"
            className="text-sm text-neutral-500 hover:text-neutral-300"
          >
            Senaste: Omg. 12 →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-6 py-12">

        {/* ══════════════════════════════════════════════
            MATCH TITLE
        ══════════════════════════════════════════════ */}
        <header className="rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#008050]">
            {report.roundLabel ?? `Omgång ${report.round}`} &nbsp;·&nbsp; {report.dateLabel}
          </p>

          <div className="mt-6 flex items-center justify-center gap-8">
            {/* HIF */}
            <div className="text-right">
              <p className="text-4xl font-black uppercase tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
                Hammarby IF
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-[#008050]">
                Hemmalag · 3Arena
              </p>
            </div>

            {/* VS badge */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-800 text-2xl font-black text-neutral-400">
              VS
            </div>

            {/* Opponent */}
            <div className="text-left">
              <p className="text-4xl font-black uppercase tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
                {opponentName}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-neutral-500">
                Bortalag · 13:e · 10p
              </p>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {report.introStats?.map((s) => (
              <span
                key={s.label}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  s.tone === "emerald"
                    ? "border-emerald-700/50 bg-emerald-950/60 text-emerald-200"
                    : s.tone === "amber"
                      ? "border-amber-700/50 bg-amber-950/60 text-amber-200"
                      : "border-neutral-700 bg-neutral-800 text-neutral-300"
                }`}
              >
                <span className="text-xs font-normal text-current/60">{s.label} &nbsp;</span>
                {s.value}
              </span>
            ))}
          </div>

          {/* Suspended alert */}
          {hasSuspended && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-amber-600/40 bg-amber-950/50 px-6 py-3">
              <span className="text-xl">🚫</span>
              <span className="text-base font-bold text-amber-200">
                {suspendedNames} AVSTÄNGDA
              </span>
              <span className="text-sm text-amber-400/70">— Degerfors utan halva mittfältet</span>
            </div>
          )}
        </header>

        {/* ══════════════════════════════════════════════
            01 · THE HOOK: KPI-ANALYS
        ══════════════════════════════════════════════ */}
        {report.trafficLightCards && report.trafficLightCards.length > 0 && (
          <section>
            <SectionLabel num="01" sub="The Hook" title="KPI-Analys" />

            <div className="grid gap-6 lg:grid-cols-3">
              {report.trafficLightCards.map((card) => {
                const cfg = trafficCfg[card.color];
                return (
                  <div
                    key={card.metric}
                    className={`flex flex-col rounded-3xl border p-7 ${cfg.cardBg} ${cfg.border}`}
                  >
                    {/* Top: icon + badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${cfg.badgeBg}`}
                      >
                        {card.badge}
                      </span>
                      <span className="text-2xl">{cfg.icon}</span>
                    </div>

                    {/* Big number */}
                    <p
                      className={`mt-5 text-7xl font-black leading-none tabular-nums ${cfg.numColor}`}
                    >
                      {card.bigNumber}
                    </p>

                    {/* Metric label */}
                    <p className="mt-3 text-base font-bold uppercase tracking-wide text-slate-200">
                      {card.metric}
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-500">
                      {card.rankNote}
                    </p>

                    {/* Accent bar */}
                    <div className={`my-5 h-0.5 w-12 rounded-full ${cfg.accent}`} />

                    {/* Explanation */}
                    <p className="flex-1 text-sm leading-relaxed text-neutral-300">
                      {card.explanation}
                    </p>

                    {/* Podcast comment */}
                    <div className="mt-5 rounded-2xl border border-white/6 bg-black/40 p-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                        🎙️ Podd
                      </p>
                      <p className="text-sm italic leading-relaxed text-neutral-300">
                        &ldquo;{card.podcastComment}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════
            02 · THE COMPARISON: HEAD TO HEAD
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel num="02" sub="The Comparison" title="Head to Head" />

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
            {/* Team labels */}
            <div className="mb-8 grid grid-cols-[1fr_auto_1fr] items-center text-center gap-4">
              <p className="text-right text-lg font-black uppercase tracking-wider text-[#008050]">
                Hammarby IF
              </p>
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-600">
                Allsvenskan 2026
              </p>
              <p className="text-left text-lg font-black uppercase tracking-wider text-amber-400">
                {opponentName}
              </p>
            </div>

            {/* Bars */}
            <div className="space-y-6">
              {report.spiderComparison.slice(0, 5).map((axis) => {
                const hPct = Math.min(axis.hammarbyScore, 100);
                const oPct = Math.min(axis.opponentScore, 100);
                return (
                  <div key={axis.label}>
                    <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-baseline gap-4">
                      <p className="text-right text-xl font-black tabular-nums text-slate-100">
                        {axis.hammarbyValue}
                      </p>
                      <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500 min-w-[140px]">
                        {axis.label}
                      </p>
                      <p className="text-left text-xl font-black tabular-nums text-slate-100">
                        {axis.opponentValue}
                      </p>
                    </div>
                    <div className="grid grid-cols-[1fr_2px_1fr] items-center gap-0">
                      <div className="flex justify-end overflow-hidden rounded-l-full bg-neutral-800 h-5">
                        <div
                          className="h-5 rounded-l-full bg-[#008050] transition-all"
                          style={{ width: `${hPct}%` }}
                        />
                      </div>
                      <div className="h-6 bg-neutral-700" />
                      <div className="flex justify-start overflow-hidden rounded-r-full bg-neutral-800 h-5">
                        <div
                          className="h-5 rounded-r-full bg-amber-500/70 transition-all"
                          style={{ width: `${oPct}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-1.5 text-center text-xs text-neutral-600">
                      {axis.note}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Spider chart */}
            <div className="mt-10 border-t border-neutral-800 pt-8">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-neutral-600">
                Spindel-jämförelse · Bolldata + Twelve
              </p>
              <SpiderComparisonChart
                axes={report.spiderComparison}
                opponentLabel={opponentName}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            03 · THE TACTIC: MATCHPLANEN
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel num="03" sub="The Tactic" title="Matchplanen" />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Med boll */}
            <div className="flex flex-col rounded-3xl border border-emerald-700/40 bg-gradient-to-b from-emerald-950/60 to-neutral-950 p-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
                  ⚽
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500/80">
                    Anfallsvapen
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-wide text-emerald-100">
                    Med boll
                  </h3>
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {report.hammarbyPlan.withBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                    <span className="mt-0.5 shrink-0 text-[#008050] font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utan boll */}
            <div className="flex flex-col rounded-3xl border border-neutral-700 bg-gradient-to-b from-neutral-800/60 to-neutral-950 p-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-700/50 text-2xl">
                  🛡️
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                    Defensiva nycklar
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-wide text-slate-100">
                    Utan boll
                  </h3>
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {report.hammarbyPlan.withoutBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                    <span className="mt-0.5 shrink-0 text-neutral-500 font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Match management pills */}
              <div className="mt-6 space-y-2 border-t border-neutral-700 pt-5">
                {report.hammarbyPlan.matchManagement.map((pt, i) => (
                  <p
                    key={i}
                    className="flex gap-2 text-xs leading-snug text-neutral-400"
                  >
                    <span className="shrink-0 text-[#008050]">↻</span>
                    <span>{pt}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Målprofil */}
            <div className="flex flex-col rounded-3xl border border-amber-700/40 bg-gradient-to-b from-amber-950/60 to-neutral-950 p-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl">
                  ⏱️
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500/80">
                    Tidsfönster
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-wide text-amber-100">
                    Målprofil
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-xs font-medium text-neutral-600">
                HIF-mål vs {opponentName} insläppta per tidsfönster
              </p>
              <div className="flex-1 space-y-2.5">
                {report.goalWindows.map((w) => {
                  const total = w.hammarbyGoals + w.opponentConcededGoals;
                  const maxTotal = Math.max(
                    ...report.goalWindows.map((x) => x.hammarbyGoals + x.opponentConcededGoals),
                  );
                  const isHot = total >= maxTotal - 1;
                  return (
                    <div
                      key={w.window}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${
                        isHot
                          ? "border border-amber-500/40 bg-amber-500/15"
                          : "border border-neutral-800 bg-neutral-800/40"
                      }`}
                    >
                      <span className={`text-sm font-bold ${isHot ? "text-amber-200" : "text-neutral-400"}`}>
                        {w.window}
                        {isHot && <span className="ml-1.5 text-amber-400">🔥</span>}
                      </span>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-[#008050]">
                          HIF {w.hammarbyGoals}
                        </span>
                        <span className="text-neutral-700">|</span>
                        <span className="font-bold text-amber-400">
                          {w.opponentConcededGoals} in
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Goal type notes */}
              {report.goalTypeNotes.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-amber-700/30 pt-4">
                  {report.goalTypeNotes.slice(0, 2).map((n) => (
                    <div key={n.label}>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-amber-400/60">
                        {n.label}
                      </p>
                      <p className="text-xs text-neutral-400">{n.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            04 · THE SCOUT: SPELARKORT
        ══════════════════════════════════════════════ */}
        {report.playersToWatch && report.playersToWatch.length > 0 && (
          <section>
            <SectionLabel num="04" sub="The Scout" title="Scouting" />

            <div className="grid gap-6 lg:grid-cols-3">
              {report.playersToWatch.slice(0, 3).map((player) => {
                const isSuspended = player.scoutBadge?.includes("AVSTÄNGD");
                return (
                  <div
                    key={player.name}
                    className={`flex flex-col overflow-hidden rounded-3xl border ${
                      isSuspended
                        ? "border-neutral-700 bg-neutral-900/50 opacity-70"
                        : "border-neutral-700 bg-neutral-900"
                    }`}
                  >
                    {/* Color bar */}
                    <div
                      className={`h-1.5 w-full ${
                        isSuspended
                          ? "bg-neutral-700"
                          : "bg-gradient-to-r from-rose-500 via-rose-400/60 to-transparent"
                      }`}
                    />

                    <div className="flex flex-1 flex-col p-7">
                      {/* Badge */}
                      {player.scoutBadge && (
                        <span
                          className={`mb-4 self-start rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${
                            isSuspended
                              ? "border-neutral-600 bg-neutral-800 text-neutral-500"
                              : "border-rose-500/50 bg-rose-500/15 text-rose-300"
                          }`}
                        >
                          {player.scoutBadge}
                        </span>
                      )}

                      {/* Name */}
                      <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-50">
                        {player.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
                        {player.position} · {opponentName}
                      </p>

                      {/* Threat */}
                      <p className={`mt-3 text-sm font-semibold ${isSuspended ? "text-neutral-500" : "text-rose-300"}`}>
                        {player.threat}
                      </p>

                      {/* Stats */}
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {player.stats.map((stat) => (
                          <div
                            key={`${player.name}-${stat.label}`}
                            className={`rounded-2xl border p-3 text-center ${
                              isSuspended
                                ? "border-neutral-700 bg-neutral-800/40"
                                : "border-neutral-700 bg-neutral-800"
                            }`}
                          >
                            <span className="block text-3xl font-black tabular-nums text-slate-50 leading-none">
                              {stat.value}
                            </span>
                            <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Motivation */}
                      <div className="mt-5 flex-1 rounded-2xl border border-neutral-800 bg-neutral-800/40 p-4">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                          Scoutens omdöme
                        </p>
                        <p className="text-sm leading-relaxed text-neutral-400">
                          {player.motivation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════
            SOURCES FOOTER
        ══════════════════════════════════════════════ */}
        <footer className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Datakällor
              </p>
              <ul className="space-y-1">
                {report.dataSources.map((s, i) => (
                  <li key={i} className="text-xs leading-relaxed text-neutral-600">
                    · {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Ordlista
              </p>
              <dl className="space-y-2">
                {report.glossary.slice(0, 4).map((g) => (
                  <div key={g.term}>
                    <dt className="text-xs font-semibold text-neutral-500">{g.term}</dt>
                    <dd className="text-xs text-neutral-700">{g.explanation}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
