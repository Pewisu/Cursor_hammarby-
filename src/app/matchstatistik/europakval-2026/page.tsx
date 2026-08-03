import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Europakval 2026 – Hammarbys väg | EL Q2 + UECL Playoff",
  description:
    "Hammarby IF:s europeiska resa 2026: EL Q2 mot Anderlecht (4-2 agg, eliminerade) och UECL Playoff mot Raków Częstochowa (om historiiskt gruppspel). Kampanjöversikt med matchanalyser och taktisk genomgång.",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface CampaignMatch {
  id: string;
  round: string;
  competition: string;
  opponent: string;
  opponentFlag: string;
  venue: "home" | "away";
  result?: string;
  aggregate?: string;
  outcome?: "win" | "draw" | "loss" | "pending";
  date: string;
  xgHome?: string;
  xgAway?: string;
  highlight: string;
  href?: string;
  sourceUrl?: string;
}

// ─── Campaign data ─────────────────────────────────────────────────────────

const campaignMatches: CampaignMatch[] = [
  {
    id: "el-q2-1",
    round: "EL Q2 · Hinmatch",
    competition: "UEFA Europa League – Kval 2026",
    opponent: "Anderlecht",
    opponentFlag: "🇧🇪",
    venue: "home",
    result: "1–1",
    date: "23 juli 2026",
    outcome: "draw",
    xgHome: "1,75",
    xgAway: "0,48",
    highlight:
      "Hammarby dominerade (72% vinstprob., 4 höga chanser) men fick nöja sig med 1–1. Adjei kvitterade på 86'. Anderlecht reducerade med 10 man på planen.",
    href: "/matchstatistik/anderlecht-kvalet",
    sourceUrl: "https://earpiece.twelve.football/shared-reports/d51465ed-e48b-4567-8e65-7f6167e49e9d",
  },
  {
    id: "el-q2-2",
    round: "EL Q2 · Retur",
    competition: "UEFA Europa League – Kval 2026",
    opponent: "Anderlecht",
    opponentFlag: "🇧🇪",
    venue: "away",
    result: "3–1",
    aggregate: "Anderlecht avancerar 4–2",
    date: "30 juli 2026",
    outcome: "loss",
    xgHome: "4,55",
    xgAway: "1,47",
    highlight:
      "Abraham chockade med 0–1 i minut 2, men Anderlechts halvtidsbyten vände loppet. 3 mål i 2H. Agg. 4–2 – Anderlecht avancerar till EL. Hammarby kliver ner till UECL.",
    href: "/matchstatistik/anderlecht-kvalet-retur",
    sourceUrl: "https://earpiece.twelve.football/shared-reports/65e75344-255e-4133-b43f-cb19713c4464",
  },
  {
    id: "uecl-po-1",
    round: "UECL Playoff · Hinmatch",
    competition: "UEFA Conference League – Playoff 2026",
    opponent: "Raków Częstochowa",
    opponentFlag: "🇵🇱",
    venue: "home",
    result: undefined,
    date: "Augusti 2026 · Tele2 Arena",
    outcome: "pending",
    highlight:
      "Raków – polska mästare 2024/25 – möter Hammarby i UECL-playoff. Likvärdig truppstyrka (~€35m vs €31,55m). Vinnaren är klar för UECL-gruppspelet – Hammarbys första europeiska gruppspel någonsin.",
    href: "/matchstatistik/kommande",
    sourceUrl: "https://earpiece.twelve.football/shared-reports/8327cfe8-afa5-40ca-8b19-10da7dd5df26",
  },
  {
    id: "uecl-po-2",
    round: "UECL Playoff · Retur",
    competition: "UEFA Conference League – Playoff 2026",
    opponent: "Raków Częstochowa",
    opponentFlag: "🇵🇱",
    venue: "away",
    result: undefined,
    date: "Augusti 2026 · Częstochowa",
    outcome: "pending",
    highlight:
      "Returmatch på Raków:s hemmaarena. Raków – med erfarenhet från UECL-gruppen 2022/23 och 2023/24 – spelar på hemmaplan. Hammarbys insats i Tele2 är avgörande.",
    sourceUrl: "https://earpiece.twelve.football/shared-reports/74257486-e0bc-4bdf-a45b-95dabaa6ac0c",
  },
];

const keyStats = [
  { label: "EL Q2-matcher", value: "2" },
  { label: "Mål gjorda (EL)", value: "2" },
  { label: "Mål insläppta (EL)", value: "4" },
  { label: "xG totalt hemma (EL)", value: "1,75" },
  { label: "xG totalt borta (EL)", value: "1,47" },
  { label: "UECL Playoff", value: "Kommande" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function outcomeColor(outcome?: CampaignMatch["outcome"]) {
  switch (outcome) {
    case "win":   return { border: "border-emerald-500/50", bg: "bg-emerald-950/40", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", label: "Vinst" };
    case "draw":  return { border: "border-amber-500/50",   bg: "bg-amber-950/30",   badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",     label: "Oavgjort" };
    case "loss":  return { border: "border-rose-500/50",    bg: "bg-rose-950/30",    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",         label: "Förlust" };
    default:      return { border: "border-sky-500/40",     bg: "bg-sky-950/20",     badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",            label: "Kommande" };
  }
}

export default function EuropakvalPage() {
  const completedMatches = campaignMatches.filter((m) => m.outcome && m.outcome !== "pending");
  const pendingMatches   = campaignMatches.filter((m) => m.outcome === "pending");

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* ── Header ── */}
      <header className="border-b border-slate-700/40 bg-gradient-to-b from-[#0f172a] to-[#0a0f1a]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href="/matchstatistik"
              className="text-xs font-medium text-slate-500 hover:text-slate-300"
            >
              ← Matchstatistik
            </Link>
            <span className="text-slate-700">/</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-sky-400">
              🇪🇺 Europakval 2026
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Hammarby IF – Europakval 2026
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Komplett kampanjöversikt: UEFA Europa League Q2 mot Anderlecht (4–2 agg, eliminerade)
            och UECL Playoff mot Raków Częstochowa. Vinnaren av playoffen spelar i Conference League-gruppspelet 2026/27.
          </p>

          {/* key stats strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {keyStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-3 text-center">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-16">

        {/* ── EL Q2 Campaign ── */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="shrink-0 text-4xl font-black text-slate-700">01</span>
            <div className="h-12 w-1 rounded-full bg-sky-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sky-400">Omgång 1</p>
              <h2 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
                UEFA Europa League Q2
              </h2>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
            <span className="shrink-0 rounded-lg border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-xs font-bold text-rose-300">
              Eliminerade · Agg 4–2
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {completedMatches.map((m) => {
              const c = outcomeColor(m.outcome);
              const card = (
                <div className={`rounded-2xl border ${c.border} ${c.bg} p-5 transition-colors`}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        {m.round}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{m.date}</p>
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${c.badge}`}>
                      {c.label}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{m.opponentFlag}</span>
                    <div>
                      <p className="text-base font-black text-white">
                        {m.venue === "home" ? `HIF – ${m.opponent}` : `${m.opponent} – HIF`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {m.venue === "home" ? "Hemma · Tele2 Arena" : "Borta · Lotto Park"}
                      </p>
                    </div>
                    {m.result && (
                      <span className="ml-auto text-2xl font-black text-white tabular-nums">
                        {m.result}
                      </span>
                    )}
                  </div>

                  {(m.xgHome || m.xgAway) && (
                    <div className="mb-3 flex gap-4 text-xs text-slate-400">
                      <span>xG {m.venue === "home" ? `HIF ${m.xgHome}` : `${m.xgHome}`} – {m.venue === "home" ? m.xgAway : `HIF ${m.xgAway}`}</span>
                    </div>
                  )}

                  <p className="text-sm leading-5 text-slate-300">{m.highlight}</p>

                  {m.aggregate && (
                    <p className="mt-3 text-xs font-bold text-rose-400">{m.aggregate}</p>
                  )}

                  {m.href && (
                    <Link
                      href={m.href}
                      className="mt-3 inline-block text-xs font-medium text-sky-400 hover:text-sky-300"
                    >
                      Öppna matchanalys →
                    </Link>
                  )}
                  {m.sourceUrl && (
                    <p className="mt-2 text-[10px] text-slate-600">
                      Källa:{" "}
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-slate-400"
                      >
                        Twelve Earpiece Report
                      </a>
                    </p>
                  )}
                </div>
              );

              return <div key={m.id}>{card}</div>;
            })}
          </div>

          {/* EL analysis note */}
          <div className="mt-4 rounded-xl border border-slate-700/30 bg-slate-800/20 p-4">
            <p className="text-sm leading-6 text-slate-300">
              <span className="font-bold text-slate-200">Summering EL Q2:</span>{" "}
              Hammarby var det bättre laget i hinmatchen (xG 1,75–0,48, dominerade 72% vinstprobabilitet) men
              fick bara 1–1. I returen i Anderlecht ledde HIF 0–1 i minut 2 men Anderlechts halvtidsbyten
              förändrade matchen helt – tre mål i 2H. Totalt 4–2 – Anderlecht vidare till EL, Hammarby
              kliver ned till UECL Playoff.
            </p>
          </div>
        </section>

        {/* ── UECL Playoff ── */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="shrink-0 text-4xl font-black text-slate-700">02</span>
            <div className="h-12 w-1 rounded-full bg-[#008050]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#00a060]">Omgång 2</p>
              <h2 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
                UEFA Conference League Playoff
              </h2>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
            <span className="shrink-0 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-300">
              Kommande · Aug 2026
            </span>
          </div>

          <div className="mb-6 rounded-2xl border border-[#008050]/30 bg-[#071a0f] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a060]">
              Insatsen
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              Vinnaren → UECL-gruppspelet 2026/27
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Hammarbys första europeiska gruppspel någonsin är inom räckhåll. Raków Częstochowa –
              polska mästare 2024/25 med UECL-gruppspelserfarenhet (2022/23, 2023/24) – är motståndaren.
              Likvärdig truppstyrka: ~€35m vs €31,55m. Tele2 Arena på en europeisk kväll är Hammarbys
              starkaste trumfkort.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "HIF Truppvärde", value: "€31,55m" },
                { label: "Raków Truppvärde", value: "~€35m" },
                { label: "Raków erfarenhet", value: "UECL-grupp ×2" },
                { label: "HIF hemma 2026", value: "22-5 · 5V-1O-1F" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-[#008050]/20 bg-[#0b2419]/60 p-3 text-center">
                  <p className="text-lg font-black text-white">{s.value}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pendingMatches.map((m) => {
              const c = outcomeColor(m.outcome);
              const card = (
                <div className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        {m.round}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{m.date}</p>
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${c.badge}`}>
                      {c.label}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{m.opponentFlag}</span>
                    <div>
                      <p className="text-base font-black text-white">
                        {m.venue === "home" ? `HIF – ${m.opponent}` : `${m.opponent} – HIF`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {m.venue === "home" ? "Hemma · Tele2 Arena" : "Borta · Częstochowa"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-5 text-slate-300">{m.highlight}</p>

                  {m.href && m.id === "uecl-po-1" && (
                    <Link
                      href={m.href}
                      className="mt-3 inline-block text-xs font-medium text-[#00a060] hover:text-[#00c070]"
                    >
                      Öppna scoutingrapport →
                    </Link>
                  )}
                  {m.sourceUrl && (
                    <p className="mt-2 text-[10px] text-slate-600">
                      Källa:{" "}
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-slate-400"
                      >
                        Twelve Earpiece Report
                      </a>
                    </p>
                  )}
                </div>
              );

              return <div key={m.id}>{card}</div>;
            })}
          </div>
        </section>

        {/* ── Tactical notes ── */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="shrink-0 text-4xl font-black text-slate-700">03</span>
            <div className="h-12 w-1 rounded-full bg-violet-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-400">Taktik</p>
              <h2 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
                Lärdomar från EL · In i UECL
              </h2>
            </div>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🔴",
                title: "Halvtid = matchvändare",
                body: "I Anderlecht-returen vände halvtidsbyten matchen – Hammarby ledde 0–1 men föll 3–1. I UECL är det avgörande att behålla organisationen i 2H även med ledning.",
                color: "border-rose-500/30 bg-rose-950/20",
              },
              {
                icon: "🟡",
                title: "Tvåmatchstie-kapital",
                body: "1–1 hemma mot Anderlecht var otillräckligt – ett mål till hade gett helt annat utgångsläge. Mot Raków: hemmavinst MED MÅL är målet, inte 0–0.",
                color: "border-amber-500/30 bg-amber-950/20",
              },
              {
                icon: "🟢",
                title: "HIF hemma = fort",
                body: "22 gjorda, 5 insläppta, 5V-1O-1F hemma 2026. Tele2 Arena är Hammarbys starkaste kort – utnyttja hemmafördelen maximalt mot Raków i hinmatchen.",
                color: "border-emerald-500/30 bg-emerald-950/20",
              },
              {
                icon: "⚡",
                title: "Press-överlägsenhet",
                body: "HIF PPDA 4,93 (1:a Allsvenskan) vs Raków PPDA ~8-9. Pressintensitet är HIF:s tydligaste fördel – tvinga Raków till fel och korta passningssekvenser under press.",
                color: "border-sky-500/30 bg-sky-950/20",
              },
              {
                icon: "🎯",
                title: "Set-piece-duell",
                body: "HIF +39 i hörnsaldo (1:a Allsvenskan). Raków topp-3 Ekstraklasa på fasta situationer offensivt. Vem vinner set-piece-striden kan avgöra aggregat.",
                color: "border-violet-500/30 bg-violet-950/20",
              },
              {
                icon: "🏆",
                title: "Historisk chans",
                body: "Hammarbys första europeiska gruppspel någonsin är ett playoff-par bort. Motivationen är tydlig – Tele2 på en europeisk kväll med Raków är ett mästerskap i sig självt.",
                color: "border-[#008050]/40 bg-[#071a0f]",
              },
            ].map((n) => (
              <div
                key={n.title}
                className={`rounded-2xl border p-5 ${n.color}`}
              >
                <span className="text-2xl">{n.icon}</span>
                <h3 className="mt-2 text-sm font-bold text-white">{n.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-300">{n.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Datakällor
          </p>
          <ul className="space-y-1 text-xs text-slate-500">
            <li>
              · Twelve Earpiece – Raków scouting:{" "}
              <a
                href="https://earpiece.twelve.football/shared-reports/8327cfe8-afa5-40ca-8b19-10da7dd5df26"
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline hover:text-sky-400"
              >
                8327cfe8
              </a>
            </li>
            <li>
              · Twelve Earpiece – Europakval 2026:{" "}
              <a
                href="https://earpiece.twelve.football/shared-reports/74257486-e0bc-4bdf-a45b-95dabaa6ac0c"
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline hover:text-sky-400"
              >
                74257486
              </a>
            </li>
            <li>
              · Twelve Earpiece – Anderlecht hinmatch:{" "}
              <a
                href="https://earpiece.twelve.football/shared-reports/d51465ed-e48b-4567-8e65-7f6167e49e9d"
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline hover:text-sky-400"
              >
                d51465ed
              </a>
            </li>
            <li>
              · Twelve Earpiece – Anderlecht retur:{" "}
              <a
                href="https://earpiece.twelve.football/shared-reports/65e75344-255e-4133-b43f-cb19713c4464"
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline hover:text-sky-400"
              >
                65e75344
              </a>
            </li>
            <li>· Transfermarkt – truppvärden Raków &amp; Hammarby (aug 2026)</li>
            <li>· Ekstraklasa 2024/25 – officiell lagstatistik</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
