import type { Metadata } from "next";
import Link from "next/link";
import { upcomingOpponents, type StyleChip } from "@/lib/upcomingOpponentsData";
import SpiderComparisonChart from "@/components/SpiderComparisonChart";

export const metadata: Metadata = {
  title: "Kommande: Hammarby – BK Häcken · Omgång 16 | 3Arena 9 aug",
  description:
    "Storbild-presentation inför Allsvenskan omgång 16: Hammarby vs BK Häcken. Data från Bolldata lagdata + Twelve season report. Förra mötet: Häcken 3–2 (HT 0–2).",
};

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const trafficCfg = {
  red: {
    cardBg: "bg-gradient-to-br from-rose-950/80 to-neutral-950",
    border: "border-rose-600/40",
    numColor: "text-rose-400",
    badgeBg: "bg-rose-500/20 border-rose-500/50 text-rose-200",
    accent: "bg-rose-500",
    icon: "🔴",
  },
  green: {
    cardBg: "bg-gradient-to-br from-emerald-950/80 to-neutral-950",
    border: "border-emerald-600/40",
    numColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 border-emerald-500/50 text-emerald-200",
    accent: "bg-[#008050]",
    icon: "🟢",
  },
  yellow: {
    cardBg: "bg-gradient-to-br from-amber-950/80 to-neutral-950",
    border: "border-amber-600/40",
    numColor: "text-amber-400",
    badgeBg: "bg-amber-500/20 border-amber-500/50 text-amber-200",
    accent: "bg-amber-500",
    icon: "🟡",
  },
} as const;

function SectionLabel({ num, sub, title }: { num: string; sub: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <span className="shrink-0 text-5xl font-black leading-none tabular-nums text-neutral-800 lg:text-6xl">
        {num}
      </span>
      <div className="h-14 w-1.5 shrink-0 rounded-full bg-[#008050]" />
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#008050]">{sub}</p>
        <h2 className="text-2xl font-black uppercase tracking-[0.08em] leading-tight text-slate-100 lg:text-3xl">
          {title}
        </h2>
      </div>
      <div className="h-px flex-1 bg-neutral-800" />
    </div>
  );
}

function OutcomeCircle({ outcome }: { outcome: "win" | "draw" | "loss" }) {
  const cfg = {
    win: { bg: "bg-[#008050]", text: "text-white", label: "V" },
    draw: { bg: "bg-amber-500", text: "text-neutral-900", label: "O" },
    loss: { bg: "bg-rose-600", text: "text-white", label: "F" },
  }[outcome];
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black lg:h-14 lg:w-14 lg:text-lg ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
}

function shortName(name: string) {
  return name.replace(/ IF$/, "").replace(/ FF$/, "").replace(/ BK$/, "").replace(/ FK$/, "");
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function BroadcasterDashboard() {
  const report = upcomingOpponents.find((r) => !r.hidden);
  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <p className="text-2xl text-neutral-500">Ingen aktiv rapport.</p>
      </div>
    );
  }

  const parts = report.fixture.split("-").map((p) => p.trim());
  const hifShort = shortName(parts[0] ?? "Hammarby");
  const difShort = shortName(parts[1] ?? "Motståndaren");

  const h2hMatches = report.headToHead?.matches ?? [];
  const h2hWins = h2hMatches.filter((m) => m.outcome === "win").length;
  const h2hDraws = h2hMatches.filter((m) => m.outcome === "draw").length;
  const h2hLosses = h2hMatches.filter((m) => m.outcome === "loss").length;
  const h2hHifGoals = h2hMatches.reduce((s, m) => s + m.hammarbyGoals, 0);
  const h2hDifGoals = h2hMatches.reduce((s, m) => s + m.opponentGoals, 0);

  const suspended = report.playersToWatch?.filter((p) => p.scoutBadge?.includes("AVSTÄNGD")) ?? [];

  function rankFor(label: string, side: "hammarby" | "opponent"): string {
    const m = report!.rankedMetrics.find(
      (r) => r.label.toLowerCase().includes(label.toLowerCase()),
    );
    if (!m) return "";
    return side === "hammarby" ? m.hammarbyRank : m.opponentRank;
  }

  const pm = report.previousMeeting;

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100">
      {/* ── Nav bar ── */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 px-6 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2">
          <Link href="/matchstatistik" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
            ← Matchstatistik
          </Link>
          <span className="rounded-full border border-[#008050]/40 bg-[#008050]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-[#008050]">
            Storbild · Broadcaster
          </span>
          <span className="text-sm text-neutral-600">{report.dateLabel}</span>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-10 px-6 py-8 lg:px-10 lg:py-10">

        {/* ══════════════════════════════════════════════════════
            MATCH HEADER  —  full width, landscape-first
        ══════════════════════════════════════════════════════ */}
        <header className="rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">

            {/* Left: Hammarby */}
            <div className="text-center lg:text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#008050]">Hemmalag</p>
              <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-slate-50 lg:text-6xl xl:text-7xl">
                {hifShort}
              </h1>
              <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-end">
                <span className="rounded-xl border border-emerald-700/40 bg-emerald-950/50 px-3 py-1 text-sm font-semibold text-emerald-200">
                  2:a i Allsvenskan
                </span>
                <span className="rounded-xl border border-emerald-700/40 bg-emerald-950/50 px-3 py-1 text-sm font-semibold text-emerald-200">
                  26p
                </span>
              </div>
            </div>

            {/* Centre: match info */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                {report.roundLabel} · {report.venueLabel ?? ""}
              </p>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-neutral-700 bg-neutral-800 text-lg font-black text-neutral-400 lg:h-20 lg:w-20 lg:text-2xl">
                VS
              </div>
              <p className="text-center text-sm font-bold text-neutral-400">
                Söndag 9 aug · 14:00
              </p>
              {/* Intro stat pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {report.introStats?.map((s) => (
                  <span
                    key={s.label}
                    className={`rounded-xl border px-3 py-1 text-sm font-semibold ${
                      s.tone === "emerald"
                        ? "border-emerald-700/50 bg-emerald-950/60 text-emerald-200"
                        : s.tone === "amber"
                          ? "border-amber-700/50 bg-amber-950/60 text-amber-200"
                          : "border-neutral-700 bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    <span className="text-[10px] font-normal opacity-60">{s.label} </span>
                    {s.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Häcken */}
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-500/70">Bortalag</p>
              <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-slate-50 lg:text-6xl xl:text-7xl">
                {difShort}
              </h1>
              <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                <span className="rounded-xl border border-amber-700/40 bg-amber-950/50 px-3 py-1 text-sm font-semibold text-amber-200">
                  3:a i Allsvenskan
                </span>
                <span className="rounded-xl border border-amber-700/40 bg-amber-950/50 px-3 py-1 text-sm font-semibold text-amber-200">
                  25p
                </span>
              </div>
            </div>
          </div>

          {/* H2H strip */}
          {h2hMatches.length > 0 && (
            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-800/40 p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Inbördes möten · Senaste {h2hMatches.length}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex gap-2">
                  {h2hMatches.map((m) => (
                    <OutcomeCircle key={`${m.date}-${m.fixture}`} outcome={m.outcome} />
                  ))}
                </div>
                <div>
                  <p className="text-xl font-black text-slate-200 lg:text-2xl">
                    {h2hWins}V · {h2hDraws}O · {h2hLosses}F
                  </p>
                  <p className="text-sm text-neutral-500">
                    Mål: {hifShort} {h2hHifGoals}–{h2hDifGoals} {difShort}
                  </p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {h2hMatches.map((m) => (
                    <div
                      key={`pill-${m.date}`}
                      className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                        m.outcome === "win"
                          ? "border border-emerald-700/30 bg-emerald-950/40"
                          : m.outcome === "draw"
                            ? "border border-amber-700/30 bg-amber-950/40"
                            : "border border-rose-700/30 bg-rose-950/40"
                      }`}
                    >
                      <span className="font-bold text-neutral-400">{m.date.slice(0, 7)}</span>
                      <span className={`font-black ${
                        m.outcome === "win" ? "text-emerald-300" :
                        m.outcome === "draw" ? "text-amber-300" : "text-rose-300"
                      }`}>{m.result}</span>
                      <span className="text-xs uppercase text-neutral-600">
                        {m.venue === "home" ? "H" : "B"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ══════════════════════════════════════════════════════
            FÖRRA MÖTET  —  narrative section
        ══════════════════════════════════════════════════════ */}
        {pm && (
          <section>
            <SectionLabel num="01" sub="Minnet som bränns" title="Förra mötet" />
            <div className="rounded-3xl border border-rose-800/40 bg-gradient-to-br from-rose-950/30 via-neutral-900 to-neutral-950 p-6 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto]">

                {/* Left: Match facts */}
                <div className="lg:min-w-56">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Omgång 10 · 31 maj 2026
                  </p>
                  <p className="text-sm font-semibold text-neutral-400">{pm.fixture}</p>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-6xl font-black tabular-nums text-rose-400 lg:text-7xl">
                      {pm.result}
                    </span>
                  </div>
                  {pm.halfTimeScore && (
                    <p className="mt-1 text-sm text-neutral-500">
                      Halvtid: <span className="font-bold text-neutral-300">{pm.halfTimeScore}</span>
                    </p>
                  )}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {pm.xgHammarby !== undefined && (
                      <div className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-3 text-center">
                        <p className="text-xl font-black tabular-nums text-[#008050]">{pm.xgHammarby}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-600">HIF xG</p>
                      </div>
                    )}
                    {pm.xgOpponent !== undefined && (
                      <div className="rounded-xl border border-amber-700/40 bg-amber-950/20 p-3 text-center">
                        <p className="text-xl font-black tabular-nums text-amber-400">{pm.xgOpponent}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-600">HÄK xG</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Centre: Goal timeline */}
                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Målkedjan
                  </p>
                  <div className="space-y-2.5">
                    {pm.scorers?.map((s, i) => {
                      const isHif = s.team === "hammarby";
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                            isHif
                              ? "border border-emerald-700/30 bg-emerald-950/30"
                              : "border border-amber-700/30 bg-amber-950/30"
                          }`}
                        >
                          <span className={`shrink-0 text-sm font-black tabular-nums ${isHif ? "text-[#008050]" : "text-amber-400"}`}>
                            {s.minute}&apos;
                          </span>
                          <span className="text-base font-bold text-slate-200">
                            {s.player}
                            {s.isPenalty ? <span className="ml-1.5 text-xs font-normal text-neutral-500">(str)</span> : ""}
                          </span>
                          <span className={`ml-auto text-xs font-bold uppercase tracking-widest ${isHif ? "text-[#008050]/70" : "text-amber-400/70"}`}>
                            {isHif ? hifShort : difShort}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Story + Serien vänt */}
                <div className="lg:min-w-72 xl:min-w-80">
                  <div className="rounded-2xl border border-rose-700/30 bg-rose-950/20 p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rose-500/70">
                      Vad som hände
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">{pm.contextNote}</p>
                  </div>
                  {pm.seriesTurnedNote && (
                    <div
                      className="mt-4 rounded-2xl border border-[#008050]/40 bg-[#008050]/8 p-5"
                      style={{ boxShadow: "0 0 30px rgba(0,128,80,0.10)" }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">↺</span>
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#008050]">
                            Serien har vänt
                          </p>
                          <p className="text-sm leading-relaxed text-slate-200">{pm.seriesTurnedNote}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            KPI-ANALYS  —  3 wide cards
        ══════════════════════════════════════════════════════ */}
        {report.trafficLightCards && report.trafficLightCards.length > 0 && (
          <section>
            <SectionLabel num="02" sub="The Hook" title="KPI-Analys" />
            <div className="grid gap-5 lg:grid-cols-3">
              {report.trafficLightCards.map((card) => {
                const cfg = trafficCfg[card.color];
                return (
                  <div key={card.metric} className={`flex flex-col rounded-3xl border p-7 ${cfg.cardBg} ${cfg.border}`}>
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${cfg.badgeBg}`}>
                        {card.badge}
                      </span>
                      <span className="text-2xl">{cfg.icon}</span>
                    </div>
                    <p className={`mt-5 text-7xl font-black leading-none tabular-nums xl:text-8xl ${cfg.numColor}`}>
                      {card.bigNumber}
                    </p>
                    <p className="mt-3 text-base font-bold uppercase tracking-wide text-slate-200">
                      {card.metric}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{card.rankNote}</p>
                    <div className={`my-4 h-0.5 w-12 rounded-full ${cfg.accent}`} />
                    <p className="flex-1 text-sm leading-relaxed text-neutral-300">{card.explanation}</p>
                    <div className="mt-5 rounded-2xl border border-white/5 bg-black/40 p-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-600">🎙️ Podd</p>
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

        {/* ══════════════════════════════════════════════════════
            MOTSTÅNDARPROFIL + MATCHPLAN  —  side by side
        ══════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel num="03" sub="Spelanalys" title={`Profil & Plan`} />
          <div className="grid gap-5 lg:grid-cols-2">

            {/* Left: Så spelar Häcken */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 lg:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-xl">🔍</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500/80">Motståndarprofil</p>
                  <h3 className="text-xl font-black uppercase tracking-wide text-amber-100">Så spelar {difShort}</h3>
                </div>
              </div>

              {/* Style chips */}
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  ...(report.styleChips ?? []),
                  ...(suspended.length > 0
                    ? [{ label: `🚫 AVSTÄNGDA`, sub: "anfallet försvagat", color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300" } as StyleChip]
                    : []),
                ].map((chip) => (
                  <div key={chip.label} className={`rounded-2xl border px-3 py-2 ${chip.color}`}>
                    <p className="text-xs font-black uppercase tracking-wide">{chip.label}</p>
                    <p className="text-[10px] text-current/60">{chip.sub}</p>
                  </div>
                ))}
              </div>

              {/* Style bars */}
              <div className="space-y-3">
                {report.styleProfile.map((sig) => (
                  <div key={sig.label} className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-3.5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-300">{sig.label}</p>
                      <span className="shrink-0 text-sm font-black tabular-nums text-slate-400">{sig.score}</span>
                    </div>
                    <p className="mb-2 text-xs text-neutral-500">{sig.value}</p>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className={`h-2 rounded-full ${sig.score >= 70 ? "bg-amber-500" : sig.score >= 40 ? "bg-neutral-500" : "bg-rose-600"}`}
                        style={{ width: `${sig.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Key bullets */}
              <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-800/30 p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Spelstil i korthet</p>
                <ul className="space-y-2">
                  {report.opponentStyle.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-snug text-slate-300">
                      <span className="mt-0.5 shrink-0 text-neutral-600">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Matchplanen */}
            <div className="flex flex-col gap-4">

              {/* X-Factor */}
              {report.spotlightKey && (
                <div
                  className="rounded-3xl border border-[#008050]/50 bg-[#008050]/8 p-6"
                  style={{ boxShadow: "0 0 40px rgba(0,128,80,0.12)" }}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008050]/20 text-2xl">
                      ⚡
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#008050]">X-Factor</p>
                      <h3 className="text-lg font-black uppercase tracking-wide text-emerald-100">Nyckeln till 3 poäng</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200">{report.spotlightKey}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Med boll */}
              <div className="flex-1 rounded-3xl border border-emerald-700/40 bg-gradient-to-br from-emerald-950/60 to-neutral-950 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-lg">⚽</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008050]">Anfallsvapen</p>
                    <h3 className="text-lg font-black uppercase tracking-wide text-emerald-100">Med boll</h3>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {report.hammarbyPlan.withBall.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                      <span className="mt-0.5 shrink-0 font-black text-[#008050]">{String(i + 1).padStart(2, "0")}</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Utan boll */}
              <div className="flex-1 rounded-3xl border border-neutral-700 bg-gradient-to-br from-neutral-800/60 to-neutral-950 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-700/50 text-lg">🛡️</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Defensiva nycklar</p>
                    <h3 className="text-lg font-black uppercase tracking-wide text-slate-100">Utan boll</h3>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {report.hammarbyPlan.withoutBall.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                      <span className="mt-0.5 shrink-0 font-black text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {report.hammarbyPlan.matchManagement.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-neutral-700 pt-4">
                    {report.hammarbyPlan.matchManagement.map((pt, i) => (
                      <p key={i} className="flex gap-2 text-xs leading-snug text-neutral-500">
                        <span className="shrink-0 text-[#008050]">↻</span>
                        <span>{pt}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HEAD TO HEAD  —  comparison bars + spider
        ══════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel num="04" sub="The Comparison" title="Head to Head" />
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 lg:p-8">

            {/* Team name row */}
            <div className="mb-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <p className="text-right text-lg font-black uppercase tracking-wider text-[#008050] lg:text-2xl xl:text-3xl">
                {hifShort}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Allsvenskan 2026
              </p>
              <p className="text-left text-lg font-black uppercase tracking-wider text-amber-400 lg:text-2xl xl:text-3xl">
                {difShort}
              </p>
            </div>

            {/* Comparison bars */}
            <div className="grid gap-x-10 gap-y-6 lg:grid-cols-2">
              {report.spiderComparison.slice(0, 6).map((axis) => {
                const hPct = Math.min(axis.hammarbyScore, 100);
                const oPct = Math.min(axis.opponentScore, 100);
                const hRank = rankFor(axis.label, "hammarby");
                const oRank = rankFor(axis.label, "opponent");
                return (
                  <div key={axis.label}>
                    <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-black tabular-nums text-slate-100 lg:text-3xl">
                          {axis.hammarbyValue}
                        </p>
                        {hRank && (
                          <p className="text-[10px] font-bold uppercase tracking-wide text-[#008050]/60">{hRank}</p>
                        )}
                      </div>
                      <p className="min-w-[120px] text-center text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:min-w-[150px] lg:text-[11px]">
                        {axis.label}
                      </p>
                      <div className="text-left">
                        <p className="text-2xl font-black tabular-nums text-slate-100 lg:text-3xl">
                          {axis.opponentValue}
                        </p>
                        {oRank && (
                          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-500/60">{oRank}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_2px_1fr] items-stretch">
                      <div className="flex h-5 justify-end overflow-hidden rounded-l-full bg-neutral-800">
                        <div className="h-5 rounded-l-full bg-[#008050] transition-all" style={{ width: `${hPct}%` }} />
                      </div>
                      <div className="bg-neutral-700" />
                      <div className="flex h-5 justify-start overflow-hidden rounded-r-full bg-neutral-800">
                        <div className="h-5 rounded-r-full bg-amber-500/70 transition-all" style={{ width: `${oPct}%` }} />
                      </div>
                    </div>
                    <p className="mt-1 text-center text-[10px] text-neutral-600 lg:text-[11px]">{axis.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Spider chart */}
            <div className="mt-8 border-t border-neutral-800 pt-7">
              <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Spindel · Bolldata + Twelve
              </p>
              <SpiderComparisonChart axes={report.spiderComparison} opponentLabel={difShort} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MÅLFÖNSTER  —  alongside Scouting
        ══════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel num="05" sub="The Scout" title="Scouting & Målfönster" />
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">

            {/* Player cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {report.playersToWatch?.slice(0, 3).map((player) => {
                const isSuspended = player.scoutBadge?.includes("AVSTÄNGD");
                return (
                  <div
                    key={player.name}
                    className={`flex flex-col overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 ${isSuspended ? "opacity-60" : ""}`}
                  >
                    <div className={`h-1.5 w-full ${
                      isSuspended
                        ? "bg-neutral-700"
                        : "bg-gradient-to-r from-amber-500 via-amber-400/50 to-transparent"
                    }`} />
                    <div className="flex flex-1 flex-col p-6">
                      {player.scoutBadge && (
                        <span className={`mb-4 self-start rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${
                          isSuspended
                            ? "border-neutral-600 bg-neutral-800 text-neutral-500"
                            : "border-amber-500/50 bg-amber-500/15 text-amber-300"
                        }`}>
                          {player.scoutBadge}
                        </span>
                      )}
                      <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-50">
                        {player.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
                        {player.position} · {difShort}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-amber-300">{player.threat}</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {player.stats.map((stat) => (
                          <div key={`${player.name}-${stat.label}`} className="rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-center">
                            <span className="block text-2xl font-black tabular-nums leading-none text-slate-50">
                              {stat.value}
                            </span>
                            <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex-1 rounded-xl border border-neutral-800 bg-neutral-800/40 p-4">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                          Scoutens omdöme
                        </p>
                        <p className="text-sm leading-relaxed text-neutral-400">{player.motivation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Goal windows */}
            {report.goalWindows.length > 0 && (
              <div className="rounded-3xl border border-amber-700/40 bg-gradient-to-b from-amber-950/60 to-neutral-950 p-6 lg:min-w-56">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-lg">⏱️</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500/80">Tidsfönster</p>
                    <h3 className="text-lg font-black uppercase tracking-wide text-amber-100">Målfönster</h3>
                  </div>
                </div>
                <p className="mb-3 text-xs text-neutral-600">HIF-mål vs {difShort} insläppta</p>
                <div className="space-y-2">
                  {report.goalWindows.map((w) => {
                    const total = w.hammarbyGoals + w.opponentConcededGoals;
                    const maxTotal = Math.max(...report.goalWindows.map((x) => x.hammarbyGoals + x.opponentConcededGoals));
                    const isHot = total >= maxTotal - 1;
                    return (
                      <div
                        key={w.window}
                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${
                          isHot
                            ? "border border-amber-500/40 bg-amber-500/15"
                            : "border border-neutral-800 bg-neutral-800/30"
                        }`}
                      >
                        <span className={`text-sm font-bold ${isHot ? "text-amber-200" : "text-neutral-400"}`}>
                          {w.window} {isHot && "🔥"}
                        </span>
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <span className="text-[#008050]">HIF {w.hammarbyGoals}</span>
                          <span className="text-neutral-700">|</span>
                          <span className="text-amber-400">{w.opponentConcededGoals} in</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Datakällor</p>
              <ul className="space-y-1.5">
                {report.dataSources.map((s, i) => (
                  <li key={i} className="text-xs leading-relaxed text-neutral-700">· {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Ordlista</p>
              <dl className="space-y-2">
                {report.glossary.slice(0, 4).map((g) => (
                  <div key={g.term}>
                    <dt className="text-xs font-semibold text-neutral-500">{g.term}</dt>
                    <dd className="text-xs text-neutral-700">{g.explanation}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-800/40 p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Summering</p>
              <p className="text-xs leading-relaxed text-neutral-500">{report.oneLineSummary}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
