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
    cardBg: "bg-gradient-to-b from-rose-950/70 to-neutral-950",
    border: "border-rose-600/40",
    numColor: "text-rose-400",
    badgeBg: "bg-rose-500/20 border-rose-500/50 text-rose-200",
    accent: "bg-rose-500",
    icon: "🔴",
  },
  green: {
    cardBg: "bg-gradient-to-b from-emerald-950/70 to-neutral-950",
    border: "border-emerald-600/40",
    numColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 border-emerald-500/50 text-emerald-200",
    accent: "bg-[#008050]",
    icon: "🟢",
  },
  yellow: {
    cardBg: "bg-gradient-to-b from-amber-950/70 to-neutral-950",
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
      <span className="shrink-0 text-5xl font-black leading-none tabular-nums text-neutral-700">
        {num}
      </span>
      <div className="h-14 w-1 shrink-0 rounded-full bg-[#008050]" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#008050]">{sub}</p>
        <h2 className="text-xl font-black uppercase tracking-[0.1em] leading-tight text-slate-100 sm:text-2xl">
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
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
}

function shortName(name: string) {
  return name.replace(/ IF$/, "").replace(/ FF$/, "").replace(/ BK$/, "").replace(/ FK$/, "");
}

export default function BroadcasterDashboard() {
  const report = upcomingOpponents.find((r) => !r.hidden);
  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <p className="text-xl text-neutral-500">Ingen aktiv rapport.</p>
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
  const suspendedLabel = suspended.map((p) => p.name.split(" ").pop()).join(" + ");

  function rankFor(label: string, side: "hammarby" | "opponent"): string {
    const m = report!.rankedMetrics.find(
      (r) => r.label.toLowerCase().includes(label.toLowerCase()),
    );
    if (!m) return "";
    return side === "hammarby" ? m.hammarbyRank : m.opponentRank;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100">
      {/* Nav */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <Link href="/matchstatistik" className="text-sm text-neutral-500 hover:text-neutral-300">
            ← Matchstatistik
          </Link>
          <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Broadcaster Dashboard
          </span>
          <Link href="/matchstatistik/omgang/12" className="text-sm text-neutral-500 hover:text-neutral-300">
            Omg. 12 →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">

        {/* ══════════════════════════════════
            MATCH HEADER
        ══════════════════════════════════ */}
        <header className="rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[#008050]">
            {report.roundLabel} &nbsp;·&nbsp; {report.dateLabel}
          </p>

          {/* Team names — short + nowrap */}
          <div className="mt-5 flex items-center justify-center gap-4 sm:gap-6">
            <h1 className="min-w-0 flex-1 whitespace-nowrap text-right text-2xl font-extrabold uppercase tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              {hifShort}
            </h1>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-800 text-base font-black text-neutral-500 sm:h-14 sm:w-14 sm:text-lg">
              VS
            </div>
            <h1 className="min-w-0 flex-1 whitespace-nowrap text-left text-2xl font-extrabold uppercase tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              {difShort}
            </h1>
          </div>

          {/* Quick stats */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {report.introStats?.map((s) => (
              <span
                key={s.label}
                className={`rounded-xl border px-3 py-1 text-xs font-semibold sm:px-4 sm:py-1.5 sm:text-sm ${
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

          {/* Suspended */}
          {suspended.length > 0 && (
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-600/40 bg-amber-950/50 px-4 py-2.5">
                <span>🚫</span>
                <span className="text-sm font-bold text-amber-200">{suspendedLabel} AVSTÄNGDA</span>
              </div>
            </div>
          )}

          {/* ── H2H STRIP (mobilvänlig) ── */}
          {h2hMatches.length > 0 && (
            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-800/40 p-4 sm:p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Inbördes möten · Senaste {h2hMatches.length}
              </p>

              {/* Cirklar + summering — radbrytning på mobil */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  {h2hMatches.map((m) => (
                    <OutcomeCircle key={`${m.date}-${m.fixture}`} outcome={m.outcome} />
                  ))}
                </div>
                <div>
                  <p className="text-lg font-black text-slate-200 sm:text-xl">
                    {h2hWins}V &nbsp;·&nbsp; {h2hDraws}O &nbsp;·&nbsp; {h2hLosses}F
                  </p>
                  <p className="text-xs text-neutral-500">
                    Mål: {hifShort} {h2hHifGoals}–{h2hDifGoals} {difShort}
                  </p>
                </div>
              </div>

              {/* Match-pills — horisontell scroll på mobil */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {h2hMatches.map((m) => (
                  <div
                    key={`pill-${m.date}`}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs ${
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
                    <span className="text-[10px] uppercase text-neutral-600">
                      {m.venue === "home" ? "H" : "B"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ══════════════════════════════════
            01 · KPI-ANALYS (The Hook)
        ══════════════════════════════════ */}
        {report.trafficLightCards && report.trafficLightCards.length > 0 && (
          <section>
            <SectionLabel num="01" sub="The Hook" title="KPI-Analys" />
            <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
              {report.trafficLightCards.map((card) => {
                const cfg = trafficCfg[card.color];
                return (
                  <div key={card.metric} className={`flex flex-col rounded-3xl border p-6 sm:p-7 ${cfg.cardBg} ${cfg.border}`}>
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${cfg.badgeBg}`}>
                        {card.badge}
                      </span>
                      <span className="text-xl">{cfg.icon}</span>
                    </div>
                    <p className={`mt-5 text-6xl font-black leading-none tabular-nums sm:text-7xl ${cfg.numColor}`}>
                      {card.bigNumber}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-wide text-slate-200">
                      {card.metric}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{card.rankNote}</p>
                    <div className={`my-4 h-0.5 w-12 rounded-full ${cfg.accent}`} />
                    <p className="flex-1 text-sm leading-relaxed text-neutral-300">{card.explanation}</p>
                    <div className="mt-4 rounded-2xl border border-white/5 bg-black/40 p-4">
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

        {/* ══════════════════════════════════
            02 · SÅ SPELAR DEGERFORS
        ══════════════════════════════════ */}
        <section>
          <SectionLabel num="02" sub="Motståndarprofil" title={`Så spelar ${difShort}`} />

          {/* Style chips */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { label: "HÖG PRESS", sub: "DAH 42,4m · 4:e", color: "border-amber-600/50 bg-amber-950/40 text-amber-200" },
              { label: "SNABB KONTER", sub: "1,83s → framåtpass", color: "border-orange-600/50 bg-orange-950/40 text-orange-200" },
              { label: "SVAG OFFENSIV", sub: "np xG 1,04 · 16:e", color: "border-rose-600/50 bg-rose-950/40 text-rose-300" },
              { label: "VINNER DUELLER", sub: "65,1% def. · 2:a", color: "border-emerald-600/50 bg-emerald-950/40 text-emerald-200" },
              ...(suspended.length > 0
                ? [{ label: `🚫 ${suspendedLabel} BORTA`, sub: "mittfältet försvagat", color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300" }]
                : []),
            ].map((chip) => (
              <div key={chip.label} className={`rounded-2xl border px-4 py-2 ${chip.color}`}>
                <p className="text-xs font-black uppercase tracking-wide">{chip.label}</p>
                <p className="text-[10px] text-current/60">{chip.sub}</p>
              </div>
            ))}
          </div>

          {/* Style profile bars */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {report.styleProfile.map((sig) => (
              <div key={sig.label} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-300">{sig.label}</p>
                  <span className="shrink-0 text-sm font-black tabular-nums text-slate-400">{sig.score}</span>
                </div>
                <p className="mb-2 text-xs text-neutral-400">{sig.value}</p>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className={`h-2 rounded-full ${sig.score >= 70 ? "bg-amber-500" : sig.score >= 40 ? "bg-neutral-500" : "bg-rose-600"}`}
                    style={{ width: `${sig.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key style bullets */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Spelstil i korthet</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {report.opponentStyle.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm leading-snug text-slate-300">
                  <span className="mt-0.5 shrink-0 text-neutral-600">›</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══════════════════════════════════
            03 · MATCHPLANEN: SÅ VINNER HIF
        ══════════════════════════════════ */}
        <section>
          <SectionLabel num="03" sub="The Tactic" title={`Så vinner ${hifShort}`} />

          {/* Spotlight / X-Factor */}
          {report.spotlightKey && (
            <div
              className="mb-6 rounded-3xl border border-[#008050]/50 bg-[#008050]/8 p-6 sm:p-7"
              style={{ boxShadow: "0 0 40px rgba(0,128,80,0.14)" }}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#008050]/20 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                  ⚡
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#008050]">X-Factor</p>
                  <h3 className="text-lg font-black uppercase tracking-wide text-emerald-100 sm:text-xl">
                    Nyckeln till 3 poäng
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                    {report.spotlightKey}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3 kolumner */}
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {/* Med boll */}
            <div className="flex flex-col rounded-3xl border border-emerald-700/40 bg-gradient-to-b from-emerald-950/60 to-neutral-950 p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-xl">⚽</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008050]">Anfallsvapen</p>
                  <h3 className="text-lg font-black uppercase tracking-wide text-emerald-100">Med boll</h3>
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {report.hammarbyPlan.withBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                    <span className="mt-0.5 shrink-0 font-black text-[#008050]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utan boll */}
            <div className="flex flex-col rounded-3xl border border-neutral-700 bg-gradient-to-b from-neutral-800/60 to-neutral-950 p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-700/50 text-xl">🛡️</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Defensiva nycklar</p>
                  <h3 className="text-lg font-black uppercase tracking-wide text-slate-100">Utan boll</h3>
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {report.hammarbyPlan.withoutBall.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-snug text-slate-300">
                    <span className="mt-0.5 shrink-0 font-black text-neutral-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-neutral-700 pt-4">
                {report.hammarbyPlan.matchManagement.map((pt, i) => (
                  <p key={i} className="flex gap-2 text-xs leading-snug text-neutral-500">
                    <span className="shrink-0 text-[#008050]">↻</span>
                    <span>{pt}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Strategiska målfönster */}
            <div className="flex flex-col rounded-3xl border border-amber-700/40 bg-gradient-to-b from-amber-950/60 to-neutral-950 p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-xl">⏱️</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500/80">Tidsfönster</p>
                  <h3 className="text-lg font-black uppercase tracking-wide text-amber-100">Målfönster</h3>
                </div>
              </div>
              <p className="mb-3 text-xs text-neutral-600">HIF-mål vs {difShort} insläppta</p>
              <div className="flex-1 space-y-2">
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
          </div>
        </section>

        {/* ══════════════════════════════════
            04 · HEAD TO HEAD (Comparison)
        ══════════════════════════════════ */}
        <section>
          <SectionLabel num="04" sub="The Comparison" title="Head to Head" />
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
            {/* Team name row */}
            <div className="mb-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
              <p className="text-right text-sm font-black uppercase tracking-wider text-[#008050] sm:text-base lg:text-lg">
                {hifShort}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Allsvenskan 2026
              </p>
              <p className="text-left text-sm font-black uppercase tracking-wider text-amber-400 sm:text-base lg:text-lg">
                {difShort}
              </p>
            </div>

            {/* Bars */}
            <div className="space-y-6">
              {report.spiderComparison.slice(0, 5).map((axis) => {
                const hPct = Math.min(axis.hammarbyScore, 100);
                const oPct = Math.min(axis.opponentScore, 100);
                const hRank = rankFor(axis.label, "hammarby");
                const oRank = rankFor(axis.label, "opponent");
                return (
                  <div key={axis.label}>
                    <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-4">
                      <div className="text-right">
                        <p className="text-xl font-black tabular-nums text-slate-100 sm:text-2xl">
                          {axis.hammarbyValue}
                        </p>
                        {hRank && (
                          <p className="text-[10px] font-bold uppercase tracking-wide text-[#008050]/60">
                            {hRank}
                          </p>
                        )}
                      </div>
                      <p className="min-w-[100px] text-center text-[10px] font-bold uppercase tracking-widest text-neutral-500 sm:min-w-[140px] sm:text-[11px]">
                        {axis.label}
                      </p>
                      <div className="text-left">
                        <p className="text-xl font-black tabular-nums text-slate-100 sm:text-2xl">
                          {axis.opponentValue}
                        </p>
                        {oRank && (
                          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-500/60">
                            {oRank}
                          </p>
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
                    <p className="mt-1 text-center text-[10px] text-neutral-600 sm:text-[11px]">
                      {axis.note}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Spider */}
            <div className="mt-8 border-t border-neutral-800 pt-7">
              <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                Spindel · Bolldata + Twelve
              </p>
              <SpiderComparisonChart axes={report.spiderComparison} opponentLabel={difShort} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            05 · SCOUTING
        ══════════════════════════════════ */}
        {report.playersToWatch && report.playersToWatch.length > 0 && (
          <section>
            <SectionLabel num="05" sub="The Scout" title="Scouting" />
            <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
              {report.playersToWatch.slice(0, 3).map((player) => {
                const isSuspended = player.scoutBadge?.includes("AVSTÄNGD");
                return (
                  <div
                    key={player.name}
                    className={`flex flex-col overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 ${isSuspended ? "opacity-60" : ""}`}
                  >
                    <div className={`h-1.5 w-full ${
                      isSuspended
                        ? "bg-neutral-700"
                        : "bg-gradient-to-r from-rose-500 via-rose-400/50 to-transparent"
                    }`} />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      {player.scoutBadge && (
                        <span className={`mb-4 self-start rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${
                          isSuspended
                            ? "border-neutral-600 bg-neutral-800 text-neutral-500"
                            : "border-rose-500/50 bg-rose-500/15 text-rose-300"
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
                      <p className={`mt-3 text-sm font-semibold ${isSuspended ? "text-neutral-500" : "text-rose-300"}`}>
                        {player.threat}
                      </p>
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {player.stats.map((stat) => (
                          <div key={`${player.name}-${stat.label}`} className="rounded-2xl border border-neutral-700 bg-neutral-800 p-3 text-center">
                            <span className="block text-3xl font-black tabular-nums leading-none text-slate-50">
                              {stat.value}
                            </span>
                            <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex-1 rounded-2xl border border-neutral-800 bg-neutral-800/40 p-4">
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
          </section>
        )}

        {/* Footer */}
        <footer className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Datakällor</p>
              <ul className="space-y-1">
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
          </div>
        </footer>
      </div>
    </div>
  );
}
