import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Europakval 2026 | Hammarby IF – EL & UECL",
  description:
    "Hammarby IF:s Europakval 2026: UEL Q2 mot Anderlecht (agg. 1–4) och UECL Q3 mot Raków Częstochowa. Komplett kampanjöversikt med statistik och matchlänkar.",
};

interface RoundResult {
  roundLabel: string;
  competition: string;
  leg: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  aggregate?: string;
  venue: string;
  outcome: "win" | "draw" | "loss" | "upcoming";
  xgHome?: number;
  xgAway?: number;
  note?: string;
  href?: string;
  hifIsHome: boolean;
}

const rounds: RoundResult[] = [
  {
    roundLabel: "UEL Q2 · Hinmatch",
    competition: "UEFA Europa League – Kval",
    leg: "Omgång 1 · Hinmatch",
    date: "23 Juli 2026",
    homeTeam: "Hammarby",
    awayTeam: "Anderlecht",
    homeScore: 1,
    awayScore: 1,
    venue: "Tele2 Arena, Stockholm",
    outcome: "draw",
    xgHome: 1.75,
    xgAway: 0.48,
    note: "Adjei 86' – Sikan 55'. HIF dominerade xG (1,75–0,48) men fick nöja sig med 1–1.",
    href: "/matchstatistik/anderlecht-kvalet",
    hifIsHome: true,
  },
  {
    roundLabel: "UEL Q2 · Retur",
    competition: "UEFA Europa League – Kval",
    leg: "Omgång 2 · Returmatch",
    date: "30 Juli 2026",
    homeTeam: "Anderlecht",
    awayTeam: "Hammarby",
    homeScore: 3,
    awayScore: 1,
    aggregate: "4–2 (Anderlecht vidare)",
    venue: "Lotto Park, Anderlecht",
    outcome: "loss",
    xgHome: 4.55,
    xgAway: 1.47,
    note: "Abraham 2' (HIF). Sikan 48', Cvetković 81', Degreef 89' (AND). Halvtidsbyten vände loppet.",
    href: "/matchstatistik/anderlecht-kvalet-retur",
    hifIsHome: false,
  },
  {
    roundLabel: "UECL Q3 · Hinmatch",
    competition: "UEFA Conference League – Kval",
    leg: "Q3 · Hinmatch",
    date: "7 Augusti 2026",
    homeTeam: "Hammarby",
    awayTeam: "Raków Częstochowa",
    homeScore: null,
    awayScore: null,
    venue: "Tele2 Arena, Stockholm",
    outcome: "upcoming",
    note: "Hammarby:s hemmastart i UECL Q3. Raków: Ekstraklasa 2:a, UECL-gruppspel 2023/24.",
    href: "/matchstatistik/kommande",
    hifIsHome: true,
  },
  {
    roundLabel: "UECL Q3 · Retur",
    competition: "UEFA Conference League – Kval",
    leg: "Q3 · Returmatch",
    date: "14 Augusti 2026",
    homeTeam: "Raków Częstochowa",
    awayTeam: "Hammarby",
    homeScore: null,
    awayScore: null,
    venue: "Stadion Miejski, Częstochowa",
    outcome: "upcoming",
    note: "Bortamatch i Polen. ~34 000 fans. Resultatet beror på hinmatchens utgång.",
    hifIsHome: false,
  },
];

const outcomeConfig = {
  win: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/40",
    badge: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
    label: "Vinst",
    scoreColor: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  draw: {
    border: "border-amber-500/40",
    bg: "bg-amber-950/30",
    badge: "border-amber-500/40 bg-amber-500/15 text-amber-200",
    label: "Oavgjort",
    scoreColor: "text-amber-300",
    dot: "bg-amber-400",
  },
  loss: {
    border: "border-rose-600/40",
    bg: "bg-rose-950/30",
    badge: "border-rose-600/40 bg-rose-500/15 text-rose-200",
    label: "Förlust",
    scoreColor: "text-rose-300",
    dot: "bg-rose-500",
  },
  upcoming: {
    border: "border-sky-500/30",
    bg: "bg-sky-950/20",
    badge: "border-sky-500/40 bg-sky-500/15 text-sky-200",
    label: "Kommande",
    scoreColor: "text-sky-300",
    dot: "bg-sky-400",
  },
} as const;

function MatchCard({ round }: { round: RoundResult }) {
  const cfg = outcomeConfig[round.outcome];

  const card = (
    <div
      className={`flex flex-col rounded-2xl border p-5 transition-colors ${cfg.border} ${cfg.bg} ${
        round.href ? "hover:brightness-110 cursor-pointer" : ""
      }`}
    >
      {/* Competition + round */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {round.competition}
        </span>
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cfg.badge}`}>
          {cfg.label}
        </span>
      </div>

      {/* Teams + score */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black text-slate-100">{round.homeTeam}</p>
          <p className="truncate text-xs text-slate-500">vs</p>
          <p className="truncate text-base font-black text-slate-100">{round.awayTeam}</p>
        </div>
        <div className="shrink-0 text-center">
          {round.homeScore !== null && round.awayScore !== null ? (
            <p className={`text-3xl font-black tabular-nums ${cfg.scoreColor}`}>
              {round.homeScore}–{round.awayScore}
            </p>
          ) : (
            <p className="text-lg font-bold text-sky-400">TBD</p>
          )}
          <p className="text-[10px] text-slate-600">{round.leg}</p>
        </div>
      </div>

      {/* xG bar */}
      {round.xgHome !== undefined && round.xgAway !== undefined && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px] text-slate-500">
            <span>xG {round.xgHome}</span>
            <span>xG {round.xgAway}</span>
          </div>
          <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="rounded-l-full bg-emerald-500/70"
              style={{ width: `${(round.xgHome / (round.xgHome + round.xgAway)) * 100}%` }}
            />
            <div
              className="rounded-r-full bg-amber-500/60"
              style={{ width: `${(round.xgAway / (round.xgHome + round.xgAway)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Aggregate */}
      {round.aggregate && (
        <div className="mt-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-center">
          <p className="text-xs font-black text-slate-300">Aggregat: {round.aggregate}</p>
        </div>
      )}

      {/* Date + Venue */}
      <div className="mt-3 space-y-0.5">
        <p className="text-xs font-semibold text-slate-400">{round.date}</p>
        <p className="text-[11px] text-slate-600">{round.venue}</p>
      </div>

      {/* Note */}
      {round.note && (
        <p className="mt-2.5 text-xs leading-relaxed text-slate-500">{round.note}</p>
      )}

      {/* CTA */}
      {round.href && (
        <div className="mt-4 border-t border-white/10 pt-3">
          <p className={`text-xs font-bold ${cfg.scoreColor}`}>
            {round.outcome === "upcoming" ? "Öppna motståndaranalys →" : "Öppna matchanalys →"}
          </p>
        </div>
      )}
    </div>
  );

  if (round.href) {
    return <Link href={round.href}>{card}</Link>;
  }
  return card;
}

function StageHeader({
  competition,
  round,
  status,
  color,
}: {
  competition: string;
  round: string;
  status: string;
  color: "amber" | "sky" | "rose";
}) {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    sky: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    rose: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  };
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors[color].split(" ")[0]}`}>
          {competition}
        </p>
        <h2 className="text-lg font-black uppercase tracking-wide text-slate-100">{round}</h2>
      </div>
      <span className={`rounded-full border px-3 py-0.5 text-[11px] font-bold ${colors[color]}`}>
        {status}
      </span>
    </div>
  );
}

export default function EuropaKvalPage() {
  const uelRounds = rounds.filter((r) => r.competition.includes("Europa League"));
  const ueclRounds = rounds.filter((r) => r.competition.includes("Conference League"));

  const hifGoals = rounds
    .filter((r) => r.homeScore !== null)
    .reduce((sum, r) => sum + (r.hifIsHome ? (r.homeScore ?? 0) : (r.awayScore ?? 0)), 0);
  const hifConceded = rounds
    .filter((r) => r.homeScore !== null)
    .reduce((sum, r) => sum + (r.hifIsHome ? (r.awayScore ?? 0) : (r.homeScore ?? 0)), 0);
  const completedMatches = rounds.filter((r) => r.homeScore !== null).length;

  return (
    <div className="min-h-screen bg-[#07101e]">
      {/* ── Header ── */}
      <header className="border-b border-slate-700/40 bg-[#0a1628]/90">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link href="/matchstatistik" className="text-slate-400 hover:text-slate-200">
              ← Matchstatistik
            </Link>
            <span className="text-slate-600">·</span>
            <span className="font-semibold text-sky-400">Europakval 2026</span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
              Hammarby IF · Europakval
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Europa 2026
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              UEL Q2 mot Anderlecht · UECL Q3 mot Raków Częstochowa
            </p>
          </div>

          {/* Campaign summary bar */}
          {completedMatches > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <p className="text-xs font-bold text-slate-300">
                  {completedMatches} matcher · {hifGoals}–{hifConceded} mål
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-amber-600/30 bg-amber-950/30 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <p className="text-xs font-bold text-amber-200">UEL: Anderlecht 4–2 agg.</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/30 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <p className="text-xs font-bold text-sky-200">UECL Q3: Raków (7 aug)</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8">

        {/* ── Campaign timeline ── */}
        <section className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-5 sm:p-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Kampanjtidslinje
          </p>
          <div className="relative space-y-0">
            {(
            [
              { label: "UEL Q2 Hinmatch", date: "23 Jul", result: "1–1", outcome: "draw", note: "HIF hemma" },
              { label: "UEL Q2 Retur", date: "30 Jul", result: "1–3", outcome: "loss", note: "Borta" },
              { label: "→ Faller till UECL Q3", date: "", result: "", outcome: "upcoming", note: "Agg. 2–4" },
              { label: "UECL Q3 Hinmatch", date: "7 Aug", result: "TBD", outcome: "upcoming", note: "HIF hemma" },
              { label: "UECL Q3 Retur", date: "14 Aug", result: "TBD", outcome: "upcoming", note: "Borta Polen" },
            ] as Array<{ label: string; date: string; result: string; outcome: "win" | "draw" | "loss" | "upcoming"; note: string }>
          ).map((item, i) => {
              const isDivider = item.label.startsWith("→");
              if (isDivider) {
                return (
                  <div key={i} className="flex items-center gap-3 py-2.5 pl-5">
                    <div className="h-px flex-1 bg-gradient-to-r from-rose-800/60 to-sky-800/60" />
                    <span className="text-xs font-bold text-slate-500">{item.label} – {item.note}</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-sky-800/60 to-rose-800/60" />
                  </div>
                );
              }
              const dotColor = item.outcome === "win" ? "bg-emerald-400" : item.outcome === "draw" ? "bg-amber-400" : item.outcome === "loss" ? "bg-rose-500" : "bg-sky-400";
              const scoreColor = item.outcome === "win" ? "text-emerald-300" : item.outcome === "draw" ? "text-amber-300" : item.outcome === "loss" ? "text-rose-300" : "text-sky-300";
              return (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <span className={`h-3 w-3 shrink-0 rounded-full ${dotColor}`} />
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-1">
                    <span className="text-sm font-semibold text-slate-300">{item.label}</span>
                    <div className="flex items-center gap-3">
                      {item.date && <span className="text-xs text-slate-600">{item.date}</span>}
                      {item.result && <span className={`text-sm font-black tabular-nums ${scoreColor}`}>{item.result}</span>}
                      <span className="text-xs text-slate-600">{item.note}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── UEL Q2 – Anderlecht ── */}
        <section>
          <StageHeader
            competition="UEFA Europa League"
            round="Q2 · vs Anderlecht"
            status="Anderlecht vidare 4–2 agg."
            color="rose"
          />

          <div className="mb-4 rounded-2xl border border-rose-600/30 bg-rose-950/20 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black tabular-nums text-slate-100">1–1</p>
                <p className="text-[10px] text-slate-600">Hinmatch · Tele2 Arena</p>
              </div>
              <div>
                <p className="text-2xl font-black tabular-nums text-rose-300">4–2</p>
                <p className="text-[10px] text-slate-600">Aggregat</p>
              </div>
              <div>
                <p className="text-2xl font-black tabular-nums text-slate-100">1–3</p>
                <p className="text-[10px] text-slate-600">Retur · Lotto Park</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {uelRounds.map((r) => (
              <MatchCard key={r.roundLabel} round={r} />
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-slate-700/30 bg-slate-800/20 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">Vad hände?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Hammarby dominerade <strong className="text-slate-200">hinmatchen xG-mässigt (1,75–0,48)</strong> men fick nöja sig med 1–1 efter Adjeis
              kvittering i minut 86. I returen på Lotto Park chockade <strong className="text-slate-200">Abraham i minut 2</strong>, men
              Anderlecht vände via dubbla halvtidsbyten – Sikan kvitterade i 48&apos; och Cvetković och Degreef
              stängde matchen. <strong className="text-rose-300">xG 4,55–1,47</strong> i returen – Anderlecht vann aggregatet 4–2 och avancerar till
              UEL Q3 mot PAOK.{" "}
              <strong className="text-sky-200">Hammarby faller till Conference League Q3.</strong>
            </p>
          </div>
        </section>

        {/* ── UECL Q3 – Raków ── */}
        <section>
          <StageHeader
            competition="UEFA Conference League"
            round="Q3 · vs Raków Częstochowa"
            status="Kommande · 7 Aug →"
            color="sky"
          />

          <div className="mb-4 rounded-2xl border border-sky-500/30 bg-sky-950/20 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-black text-sky-400">TBD</p>
                <p className="text-[10px] text-slate-600">Hinmatch · Tele2 Arena · 7 aug</p>
              </div>
              <div>
                <p className="text-xl font-black text-slate-500">–</p>
                <p className="text-[10px] text-slate-600">Aggregat</p>
              </div>
              <div>
                <p className="text-xl font-black text-sky-400">TBD</p>
                <p className="text-[10px] text-slate-600">Retur · Częstochowa · 14 aug</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ueclRounds.map((r) => (
              <MatchCard key={r.roundLabel} round={r} />
            ))}
          </div>

          {/* Raków info box */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-sky-500/20 bg-sky-950/15 p-4">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-sky-400">
                Om Raków Częstochowa
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex gap-2"><span className="text-sky-600">·</span><span><strong className="text-slate-300">Liga:</strong> Ekstraklasa 2:a plats 2025/26 · 1,75 p/match</span></li>
                <li className="flex gap-2"><span className="text-sky-600">·</span><span><strong className="text-slate-300">Europaerfarenhet:</strong> UECL-gruppspel 2023/24 · slog ut Djurgårdens IF Q3 2024</span></li>
                <li className="flex gap-2"><span className="text-sky-600">·</span><span><strong className="text-slate-300">Styrkor:</strong> Defensiv transition (topp 5 Ekstraklasa), aerial dominans (~58% luftdueller)</span></li>
                <li className="flex gap-2"><span className="text-sky-600">·</span><span><strong className="text-slate-300">Svagheter:</strong> Svag boxpenetration (~19% final third to box), låg konvertering (10,2%)</span></li>
                <li className="flex gap-2"><span className="text-sky-600">·</span><span><strong className="text-slate-300">Truppvärde (TM):</strong> ~€23m vs HIF €31,55m</span></li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-400">
                Hammarbys utgångspunkt
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex gap-2"><span className="text-emerald-600">·</span><span><strong className="text-slate-300">Allsvenskan:</strong> 2:a · np xG 2,21/match (1:a) · PPDA 4,93 (1:a)</span></li>
                <li className="flex gap-2"><span className="text-emerald-600">·</span><span><strong className="text-slate-300">Hemmaform:</strong> ~6V-1O-1F · ~24-6 mål · Tele2 Arena stark fästning</span></li>
                <li className="flex gap-2"><span className="text-emerald-600">·</span><span><strong className="text-slate-300">Presskvalité:</strong> Nästan dubbelt hårdare press än Raków (PPDA 4,93 vs ~9,5)</span></li>
                <li className="flex gap-2"><span className="text-emerald-600">·</span><span><strong className="text-slate-300">Nyckel:</strong> Utnyttja Raków:s svaga boxpenetration och låga press</span></li>
                <li className="flex gap-2"><span className="text-emerald-600">·</span><span><strong className="text-slate-300">Mål:</strong> Minst ett hemmamål inför bortaresan till Częstochowa</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Source note ── */}
        <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-4 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Källor:</span>{" "}
          <a
            href="https://earpiece.twelve.football/shared-reports/8327cfe8-afa5-40ca-8b19-10da7dd5df26"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline decoration-sky-400/50 underline-offset-2 hover:text-sky-300"
          >
            Twelve – Raków Earpiece-rapport
          </a>
          {" · "}
          <a
            href="https://earpiece.twelve.football/shared-reports/74257486-e0bc-4bdf-a45b-95dabaa6ac0c"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline decoration-sky-400/50 underline-offset-2 hover:text-sky-300"
          >
            Twelve – Europakval-rapport
          </a>
          {" · Twelve Football · Transfermarkt · UEFA"}
        </div>
      </main>
    </div>
  );
}
