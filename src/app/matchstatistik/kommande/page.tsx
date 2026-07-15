import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";
import SpiderComparisonChart from "@/components/SpiderComparisonChart";

export const metadata: Metadata = {
  title: "Kommande motståndare | Hammarby 2026",
  description:
    "Taktisk förhandsanalys av kommande motståndare med datadriven jämförelse mot Hammarby.",
};

function getOpponentName(fixture: string) {
  return (
    fixture
      .split("-")
      .map((p) => p.trim())
      .find((t) => !t.toLowerCase().includes("hammarby")) ?? "motståndaren"
  );
}

const outcomeStyles: Record<"win" | "draw" | "loss", string> = {
  win: "border-emerald-500/35 bg-emerald-500/15 text-emerald-100",
  draw: "border-slate-400/40 bg-slate-500/15 text-slate-100",
  loss: "border-rose-500/35 bg-rose-500/15 text-rose-100",
};
const outcomeLabels: Record<"win" | "draw" | "loss", string> = {
  win: "HIF-seger",
  draw: "Oavgjort",
  loss: "HIF-förlust",
};
const venueLabels: Record<"home" | "away", string> = {
  home: "Hemma",
  away: "Borta",
};

function formatShortDate(dateValue: string) {
  const d = new Date(`${dateValue}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return dateValue;
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

const trafficColors = {
  red: {
    bg: "bg-rose-950/60",
    border: "border-rose-500/40",
    numColor: "text-rose-400",
    badgeBg: "bg-rose-500/20 border-rose-400/40 text-rose-200",
    glow: "shadow-rose-900/30",
    icon: "🔴",
  },
  green: {
    bg: "bg-emerald-950/60",
    border: "border-emerald-500/40",
    numColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 border-emerald-400/40 text-emerald-200",
    glow: "shadow-emerald-900/30",
    icon: "🟢",
  },
  yellow: {
    bg: "bg-amber-950/60",
    border: "border-amber-500/40",
    numColor: "text-amber-400",
    badgeBg: "bg-amber-500/20 border-amber-400/40 text-amber-200",
    glow: "shadow-amber-900/30",
    icon: "🟡",
  },
} as const;

export default function UpcomingOpponentsPage() {
  const visibleReports = upcomingOpponents.filter((r) => !r.hidden);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* ── Page header ── */}
      <header className="border-b border-emerald-800/40 bg-neutral-950/95">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80">
            Matchplan
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
            Matchförberedelse-dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
            Datadriven matchanalys för podcast och scouting – visuella nyckeltal,
            trafikljusanalys, taktikplatta och spelarscouting.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/matchstatistik"
              className="rounded-lg border border-neutral-600/60 bg-neutral-800/50 px-3 py-1.5 text-xs text-slate-300 hover:border-neutral-400 hover:text-white"
            >
              ← Matchstatistik översikt
            </Link>
            <Link
              href="/matchstatistik/omgang"
              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200 hover:border-amber-300"
            >
              Omgångsstatistik
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {/* ── Last match banner ── */}
        <section className="rounded-2xl border border-emerald-500/35 bg-emerald-950/40 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                Senaste match · Omgång 12
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-50">
                Hammarby – Kalmar FF
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Eftermatchsanalys med Bolldata-spindel, nyckelinsikter och
                jämförelse mot förhandsanalysen.
              </p>
            </div>
            <Link
              href="/matchstatistik/omgang/12"
              className="shrink-0 rounded-lg border border-emerald-400/45 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 hover:border-emerald-300 hover:bg-emerald-500/25"
            >
              Öppna matchanalys →
            </Link>
          </div>
        </section>

        {/* ── Reports ── */}
        {visibleReports.map((report) => {
          const opponentName = getOpponentName(report.fixture);
          return (
            <article
              key={`${report.round}-${report.fixture}`}
              className="space-y-8"
            >
              {/* ═══════════════════════════════════════════
                  MATCH HEADER
              ═══════════════════════════════════════════ */}
              <section className="rounded-2xl border border-neutral-700/50 bg-neutral-900 p-5 md:p-6">
                {/* Title row */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-700/50 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80">
                      {report.roundLabel ?? `Omgång ${report.round}`}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-50 md:text-3xl">
                      {report.fixture}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">{report.dateLabel}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {report.venueLabel && (
                      <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">
                        {report.venueLabel}
                      </span>
                    )}
                    <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      Nästa motstånd
                    </span>
                  </div>
                </div>

                {/* Summary + intro stats */}
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200 md:text-base">
                  {report.oneLineSummary}
                </p>

                {report.introStats && report.introStats.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {report.introStats.map((stat) => (
                      <div
                        key={`${stat.label}-${stat.value}`}
                        className={`rounded-xl border px-3 py-3 ${
                          stat.tone === "emerald"
                            ? "border-emerald-500/30 bg-emerald-950/40"
                            : stat.tone === "amber"
                              ? "border-amber-500/30 bg-amber-950/40"
                              : "border-neutral-600/40 bg-neutral-800/40"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-100">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick status cards */}
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {report.quickStatusCards.map((card) => (
                    <div
                      key={card.title}
                      className={`rounded-xl border p-4 ${
                        card.tone === "emerald"
                          ? "border-emerald-500/30 bg-emerald-950/40"
                          : card.tone === "amber"
                            ? "border-amber-500/30 bg-amber-950/40"
                            : "border-neutral-600/40 bg-neutral-800/40"
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                        {card.title}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-slate-200">
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ═══════════════════════════════════════════
                  SEKTION 1 — MOTSTÅNDARANALYS (TRAFIKLJUS)
              ═══════════════════════════════════════════ */}
              {report.trafficLightCards && report.trafficLightCards.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-neutral-700/60" />
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                        Sektion 1
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-[0.1em] text-slate-200">
                        Motståndaranalys
                      </h3>
                    </div>
                    <span className="h-px flex-1 bg-neutral-700/60" />
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    {report.trafficLightCards.map((card) => {
                      const style = trafficColors[card.color];
                      return (
                        <div
                          key={card.metric}
                          className={`flex flex-col rounded-2xl border p-5 shadow-lg ${style.bg} ${style.border} ${style.glow}`}
                        >
                          {/* Badge + icon */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${style.badgeBg}`}
                            >
                              {card.badge}
                            </span>
                            <span className="text-base">{style.icon}</span>
                          </div>

                          {/* Big number */}
                          <p
                            className={`mt-3 text-5xl font-black leading-none tabular-nums ${style.numColor}`}
                          >
                            {card.bigNumber}
                          </p>

                          {/* Metric label */}
                          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                            {card.metric}
                          </p>

                          {/* Rank note */}
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {card.rankNote}
                          </p>

                          {/* Explanation */}
                          <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-300">
                            {card.explanation}
                          </p>

                          {/* Podcast comment */}
                          <div className="mt-4 rounded-xl border border-white/8 bg-black/30 p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              🎙️ Podd-kommentar
                            </p>
                            <p className="mt-1.5 text-xs italic leading-relaxed text-slate-300">
                              &ldquo;{card.podcastComment}&rdquo;
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ═══════════════════════════════════════════
                  SEKTION 2 — HEAD-TO-HEAD JÄMFÖRELSE
              ═══════════════════════════════════════════ */}
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-neutral-700/60" />
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                      Sektion 2
                    </span>
                    <h3 className="text-base font-bold uppercase tracking-[0.1em] text-slate-200">
                      Head-to-Head Jämförelse
                    </h3>
                  </div>
                  <span className="h-px flex-1 bg-neutral-700/60" />
                </div>

                <div className="rounded-2xl border border-neutral-700/50 bg-neutral-900 p-5 md:p-6">
                  {/* Team labels */}
                  <div className="mb-5 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-emerald-400">
                      Hammarby IF
                    </span>
                    <span className="text-neutral-500">SÄSONG 2026</span>
                    <span className="text-amber-400">{opponentName}</span>
                  </div>

                  <div className="space-y-4">
                    {report.spiderComparison.slice(0, 5).map((axis) => {
                      const hPct = Math.min(axis.hammarbyScore, 100);
                      const oPct = Math.min(axis.opponentScore, 100);
                      return (
                        <div key={axis.label}>
                          {/* Values + label */}
                          <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="font-semibold text-emerald-300">
                              {axis.hammarbyValue}
                              {axis.hammarbyScore >= 95 && (
                                <span className="ml-1 rounded bg-emerald-500/20 px-1 py-0.5 text-[9px] font-bold uppercase text-emerald-300">
                                  {report.rankedMetrics.find((m) => m.label === axis.label)?.hammarbyRank ?? "top"}
                                </span>
                              )}
                            </span>
                            <span className="px-3 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
                              {axis.label}
                            </span>
                            <span className="font-semibold text-amber-300">
                              {axis.opponentValue}
                              {axis.opponentScore <= 50 && (
                                <span className="ml-1 rounded bg-amber-500/20 px-1 py-0.5 text-[9px] font-bold uppercase text-amber-400">
                                  {report.rankedMetrics.find((m) => m.label === axis.label)?.opponentRank ?? ""}
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Dual bars */}
                          <div className="flex h-3 items-center gap-0.5 overflow-hidden rounded-full bg-neutral-800">
                            {/* HIF bar – right-aligned */}
                            <div className="flex flex-1 justify-end">
                              <div
                                className="h-3 rounded-l-full bg-emerald-500 transition-all"
                                style={{ width: `${hPct}%` }}
                              />
                            </div>
                            {/* Divider */}
                            <div className="h-full w-px bg-neutral-600" />
                            {/* Opponent bar – left-aligned */}
                            <div className="flex flex-1 justify-start">
                              <div
                                className="h-3 rounded-r-full bg-amber-500/70 transition-all"
                                style={{ width: `${oPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Note */}
                          <p className="mt-1 text-center text-[11px] text-slate-500">
                            {axis.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Spider chart */}
                  <div className="mt-6 border-t border-neutral-700/50 pt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Spindel-jämförelse · Bolldata Allsvenskan 2026
                    </p>
                    <SpiderComparisonChart
                      axes={report.spiderComparison}
                      opponentLabel={opponentName}
                    />
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════
                  SEKTION 3 — TAKTIKPLATTAN
              ═══════════════════════════════════════════ */}
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-neutral-700/60" />
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                      Sektion 3
                    </span>
                    <h3 className="text-base font-bold uppercase tracking-[0.1em] text-slate-200">
                      Taktikplattan – Så slår vi dem
                    </h3>
                  </div>
                  <span className="h-px flex-1 bg-neutral-700/60" />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {/* KORT 1: Med boll */}
                  <div className="flex flex-col rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-base">
                        ⚽
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70">
                          Med boll
                        </p>
                        <h4 className="text-sm font-bold text-emerald-100">
                          Anfallsvapen
                        </h4>
                      </div>
                    </div>
                    <ul className="mt-4 flex-1 space-y-2.5">
                      {report.hammarbyPlan.withBall.map((point, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                          <span className="mt-0.5 shrink-0 text-emerald-400">›</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* KORT 2: Utan boll */}
                  <div className="flex flex-col rounded-2xl border border-neutral-600/40 bg-neutral-800/50 p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600/30 text-base">
                        🛡️
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Utan boll
                        </p>
                        <h4 className="text-sm font-bold text-slate-100">
                          Defensiva nycklar
                        </h4>
                      </div>
                    </div>
                    <ul className="mt-4 flex-1 space-y-2.5">
                      {report.hammarbyPlan.withoutBall.map((point, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                          <span className="mt-0.5 shrink-0 text-slate-500">›</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* KORT 3: Strategiska målfönster */}
                  <div className="flex flex-col rounded-2xl border border-amber-500/30 bg-amber-950/40 p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-base">
                        ⏱️
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70">
                          Tidsanalys
                        </p>
                        <h4 className="text-sm font-bold text-amber-100">
                          Strategiska målfönster
                        </h4>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500">
                      HIF gjorda mål vs {opponentName} insläppta per tidsfönster
                    </p>

                    <div className="mt-3 flex-1 space-y-2">
                      {report.goalWindows.map((w) => {
                        const totalMax = Math.max(
                          ...report.goalWindows.map((x) => x.hammarbyGoals + x.opponentConcededGoals),
                        );
                        const combined = w.hammarbyGoals + w.opponentConcededGoals;
                        const isHot = combined >= totalMax - 1;
                        return (
                          <div
                            key={w.window}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                              isHot
                                ? "border border-amber-400/30 bg-amber-500/15"
                                : "border border-neutral-700/40 bg-neutral-800/40"
                            }`}
                          >
                            <span
                              className={`font-semibold ${isHot ? "text-amber-200" : "text-slate-300"}`}
                            >
                              {w.window}
                              {isHot && (
                                <span className="ml-1.5 text-[9px] font-bold uppercase text-amber-400">
                                  🔥 Bäst
                                </span>
                              )}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-300">
                                HIF {w.hammarbyGoals}m
                              </span>
                              <span className="text-neutral-600">vs</span>
                              <span className="rounded border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.5 text-amber-300">
                                {w.opponentConcededGoals} insläppta
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Match management pills */}
                    <div className="mt-4 border-t border-amber-500/20 pt-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-400/60">
                        Matchhantering
                      </p>
                      {report.hammarbyPlan.matchManagement.slice(0, 3).map((point, i) => (
                        <p key={i} className="mb-1.5 flex gap-1.5 text-xs leading-relaxed text-slate-400">
                          <span className="mt-0.5 shrink-0 text-amber-400">↻</span>
                          <span>{point}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════
                  SEKTION 4 — SCOUTING CARDS
              ═══════════════════════════════════════════ */}
              {report.playersToWatch && report.playersToWatch.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-neutral-700/60" />
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                        Sektion 4
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-[0.1em] text-slate-200">
                        Spelare att ha extra koll på
                      </h3>
                    </div>
                    <span className="h-px flex-1 bg-neutral-700/60" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {report.playersToWatch.map((player) => {
                      const isSuspended = player.scoutBadge?.includes("AVSTÄNGD");
                      return (
                      <div
                        key={player.name}
                        className={`relative flex flex-col overflow-hidden rounded-2xl border bg-neutral-900 ${
                          isSuspended ? "border-neutral-600/40 opacity-80" : "border-neutral-700/50"
                        }`}
                      >
                        {/* Top accent bar */}
                        <div className={`h-1 w-full bg-gradient-to-r ${
                          isSuspended
                            ? "from-neutral-500/50 via-neutral-400/30 to-transparent"
                            : "from-rose-500/60 via-rose-400/40 to-transparent"
                        }`} />

                        <div className="flex flex-1 flex-col p-5">
                          {/* Scout badge */}
                          {player.scoutBadge && (
                            <span className={`mb-3 self-start rounded-full border px-3 py-1 text-xs font-bold ${
                              isSuspended
                                ? "border-neutral-500/50 bg-neutral-700/50 text-neutral-300"
                                : "border-rose-400/35 bg-rose-500/15 text-rose-200"
                            }`}>
                              {player.scoutBadge}
                            </span>
                          )}

                          {/* Name + position */}
                          <h4 className="text-xl font-black tracking-tight text-slate-50">
                            {player.name}
                          </h4>
                          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {player.position} · {opponentName}
                          </p>

                          {/* Threat line */}
                          <p className="mt-2 text-sm font-medium text-rose-200">
                            {player.threat}
                          </p>

                          {/* Stats row */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {player.stats.map((stat) => (
                              <div
                                key={`${player.name}-${stat.label}`}
                                className="rounded-xl border border-neutral-600/50 bg-neutral-800/70 px-3 py-2 text-center"
                              >
                                <span className="block text-xl font-black tabular-nums text-slate-50">
                                  {stat.value}
                                </span>
                                <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Scout's verdict */}
                          <div className="mt-4 flex-1 rounded-xl border border-neutral-700/40 bg-neutral-800/50 p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              🧭 Scoutens omdöme
                            </p>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
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

              {/* ═══════════════════════════════════════════
                  HISTORISKA MÖTEN
              ═══════════════════════════════════════════ */}
              {report.headToHead && (
                <section className="rounded-2xl border border-neutral-700/50 bg-neutral-900 p-5 md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                      Historiska möten
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                      Senaste {report.headToHead.sampleSize}
                    </span>
                  </div>

                  <p className="mb-4 text-xs text-slate-400">{report.headToHead.description}</p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {report.headToHead.summaryCards.map((card) => (
                      <div
                        key={card.title}
                        className={`rounded-xl border p-3 ${
                          card.tone === "emerald"
                            ? "border-emerald-500/30 bg-emerald-950/40"
                            : card.tone === "amber"
                              ? "border-amber-500/30 bg-amber-950/40"
                              : "border-neutral-600/40 bg-neutral-800/40"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
                          {card.title}
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-50">{card.value}</p>
                        <p className="mt-1 text-[11px] leading-snug text-slate-400">{card.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-xs text-slate-300">
                      <thead>
                        <tr className="border-b border-neutral-700/60 text-[11px] uppercase tracking-wide text-slate-500">
                          <th className="px-2 py-2">Datum</th>
                          <th className="px-2 py-2">Match</th>
                          <th className="px-2 py-2">Utfall</th>
                          <th className="px-2 py-2">xG (HIF–{opponentName})</th>
                          <th className="px-2 py-2">Avslut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.headToHead.matches.map((m) => (
                          <tr
                            key={`${m.date}-${m.fixture}`}
                            className="border-b border-neutral-800/60 align-top"
                          >
                            <td className="px-2 py-2">
                              <p>{formatShortDate(m.date)}</p>
                              <p className="text-[11px] text-slate-500">{venueLabels[m.venue]}</p>
                            </td>
                            <td className="px-2 py-2">
                              <p>{m.fixture}</p>
                              <p className="text-[11px] text-slate-500">
                                {m.result} (HIF {m.hammarbyGoals}–{m.opponentGoals})
                              </p>
                            </td>
                            <td className="px-2 py-2">
                              <span
                                className={`inline-flex rounded border px-2 py-0.5 text-[11px] ${outcomeStyles[m.outcome]}`}
                              >
                                {outcomeLabels[m.outcome]}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              {m.hammarbyXg.toFixed(2)}–{m.opponentXg.toFixed(2)}
                            </td>
                            <td className="px-2 py-2">
                              {m.hammarbyShots}–{m.opponentShots}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* ═══════════════════════════════════════════
                  NYCKELTAL (ranked metrics)
              ═══════════════════════════════════════════ */}
              <section className="rounded-2xl border border-neutral-700/50 bg-neutral-900 p-5 md:p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-200">
                  Nyckeltal med Allsvensk ranking
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {report.rankedMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-neutral-700/50 bg-neutral-800/50 p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {metric.label}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                        <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-emerald-200">
                          HIF: {metric.hammarbyValue}
                        </span>
                        <span className="rounded border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-amber-200">
                          {opponentName}: {metric.opponentValue}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <span className="rounded border border-emerald-500/20 bg-emerald-500/8 px-2 py-1 text-center text-emerald-300">
                          HIF rank: {metric.hammarbyRank}
                        </span>
                        <span className="rounded border border-amber-500/20 bg-amber-500/8 px-2 py-1 text-center text-amber-300">
                          {opponentName}: {metric.opponentRank}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ═══════════════════════════════════════════
                  SAMMANFATTNING (30 sek)
              ═══════════════════════════════════════════ */}
              <section className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Sammanfattning — 30 sekunder
                </h3>
                <ul className="space-y-2">
                  {report.mobileTakeaways.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                      <span className="mt-1 shrink-0 text-emerald-400">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ═══════════════════════════════════════════
                  FOOTER: ORDLISTA + DATAKÄLLOR
              ═══════════════════════════════════════════ */}
              <section className="grid gap-4 md:grid-cols-2">
                {/* Glossary */}
                <div className="rounded-xl border border-neutral-700/50 bg-neutral-900 p-4">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Ordlista
                  </h3>
                  <dl className="space-y-2">
                    {report.glossary.map((item) => (
                      <div key={item.term}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                          {item.term}
                        </dt>
                        <dd className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                          {item.explanation}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Data sources */}
                <div className="rounded-xl border border-neutral-700/50 bg-neutral-900 p-4">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Datakällor
                  </h3>
                  <ul className="space-y-1.5">
                    {report.dataSources.map((source, i) => (
                      <li key={i} className="text-[11px] leading-relaxed text-slate-500">
                        • {source}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </article>
          );
        })}
      </main>
    </div>
  );
}
