"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { hammarbyRefereeMatches, calcDomarindex, getDomarRating } from "@/lib/hammarbyRefereeData";

/* ─── Data ─────────────────────────────────────────────────────────── */

// All = senaste 5 matcher (för kontext). isAway markerar Häcken som bortalag.
const HACKEN_FORM = [
  { round: 10, home: "Häcken",  away: "Hammarby",  score: "3–2", outcome: "W" as const, isAway: false, note: "Förra mötet (hemma). Vann från 0–2 (HT). Svanbäck avgjorde 80'" },
  { round: 11, home: "Häcken",  away: "Djurgården", score: "2–4", outcome: "L" as const, isAway: false, note: "Hemma. Förlust 2–4 efter VM-pausen" },
  { round: 12, home: "Örgryte", away: "Häcken",    score: "4–3", outcome: "L" as const, isAway: true,  note: "Borta. Förlorade trots att de ledde" },
  { round: 13, home: "Halmstad", away: "Häcken",   score: "0–2", outcome: "W" as const, isAway: true,  note: "Borta. Senaste bortasegern (19 jul)" },
  { round: 14, home: "Häcken",  away: "AIK",       score: "0–0", outcome: "D" as const, isAway: false, note: "Hemma. 0–0, ingen hemmaseger sedan Ø10 (31 maj)" },
  { round: 15, home: "Häcken",  away: "Kalmar",    score: "1–1", outcome: "D" as const, isAway: false, note: "Hemma. Kryss. Al-Hakim dömde" },
];

// Häckens fullständiga bortastatistik 2026
const HACKEN_AWAY_2026 = [
  { round: 2,  home: "IFK Göteborg", score: "0–2", outcome: "W" as const },
  { round: 4,  home: "Västerås SK",  score: "3–3", outcome: "D" as const },
  { round: 6,  home: "Degerfors IF", score: "1–1", outcome: "D" as const },
  { round: 8,  home: "Mjällby AIF",  score: "0–1", outcome: "W" as const },
  { round: 9,  home: "IF Elfsborg",  score: "1–1", outcome: "D" as const },
  { round: 12, home: "Örgryte IS",   score: "4–3", outcome: "L" as const },
  { round: 13, home: "Halmstads BK", score: "0–2", outcome: "W" as const },
];

const PREV_MEETING = {
  score: "3–2 (HT 0–2)",
  date: "31 maj 2026",
  venue: "Bravida Arena (Häcken hemma)",
  scorers: [
    { team: "hif",    player: "Victor Lind",     minute: "9'",  note: "" },
    { team: "hif",    player: "Victor Lind",     minute: "39'", note: "" },
    { team: "hacken", player: "Amor Layouni",    minute: "48'", note: "Straff (nu lämnat klubben)" },
    { team: "hacken", player: "Silas Andersen",  minute: "55'", note: "Solo-dribbling mittplan (nu Sporting)" },
    { team: "hacken", player: "Adrian Svanbäck", minute: "80'", note: "Vinnarmål (KVAR i truppen!)" },
  ],
  xgHIF: 1.27,
  xgHacken: 2.82,
  keyStory: "Hammarby dominerade defensivt i HT och ledde 2–0. I andra halvlek tappade laget energin – Häcken fick ett tidigt straff (48') och vände matchen med Andersens solo (55') och Svanbäcks avslut (80'). Statistiskt sett dominerade Häcken hela matchen med 2,82 xG vs 1,27.",
  tacticalContext: "Matchen exponerade sårbarheten i det man-mot-man-försvar som Kalle Karlsson använde. Häcken utnyttjade det med rörelselek och positionsbyte – framför allt Silas Andersen och Layouni löpte ur sina markeringar upprepade gånger i andra halvlek. Under Rydström har försvaret strukturerats om med tydligare zonprinciper och bättre kompakthet.",
  lesson: "Håll intensiteten i hela 90 min. Tappa aldrig en 2–0-ledning mot Häcken.",
};

const PLAYERS_TO_WATCH = [
  {
    name: "Adrian Svanbäck",
    pos: "YF/RM · Sverige",
    badge: "🎯 Satte vinnarmålet i Ø10",
    stats: "4 mål + 4 assist på 12 matcher",
    threat: "Häckens farligaste spelare. Spelar som ytterforward i 4-2-3-1, drar inåt från höger mot mål. Satte 3–2 på 80' i Ø10. Farligast på genombrott och djupledslöpningar.",
    counter: "HIF:s backfyra måste skära av hans snitt inåt. Stäng höger kanal tidigt.",
    color: "border-rose-500/40 bg-rose-950/20",
  },
  {
    name: "Harun Ibrahim",
    pos: "AM/MF · Sverige (lån Sharjah)",
    badge: "🆕 Nyförvärv – debuterade Ø15",
    stats: "88 allsvenska matcher för GAIS (8 mål)",
    threat: "Ny i Häcken-systemet men välbekant i Allsvenskan. Teknisk och smart – söker halvrummet och kan vända snabbt. Spelade sin första match från start mot Kalmar i Ø15.",
    counter: "HIF:s spjutspetsar känner honom från GAIS. Stäng halvrummen och hindra honom att vända med boll.",
    color: "border-amber-500/40 bg-amber-950/20",
  },
];

const HAMMARBY_PLAN = {
  withBall: [
    "Dominera field tilt (69% vs 50%). Häcken sitter djupt – håll bollen i deras halvplan och tvinga dem att springa.",
    "Attackera CENTRALT. Häcken försvarar brett för inlägg – de centrala ytorna är öppna. Box entries via carries och kombinationsspel.",
    "Tålamod i uppspelet. Häcken faller tillbaka (DAH ~40m) – bygg upp lugnt och sök vertikala passningar genom mittfältet.",
  ],
  withoutBall: [
    "Press FULLT UT direkt. PPDA 4,9 vs ~6,0 – vi pressar nästan 50% hårdare. Störa deras uppspel och forcera bolttapp.",
    "BLOCKERA INLÄGGEN. Häckens ~42% box entries via inlägg är deras livsnerv. Halvbacks och ytterbackar stänger ytterbanorna.",
    "Kontra DIREKT vid varje bolttapp. Häcken har bara ~10% recovery within 5s – de reagerar sakta.",
  ],
  matchManagement: [
    "Hammarby gör flest mål 61–75' – behåll intensiteten hela vägen. Häckens defensiv tröttnar.",
    "LÄR av Ø10: kom ut med full intensitet i 2H. Tappa aldrig en ledning.",
    "Häcken konverterar 14% över xG – ge dem noll billiga chanser. En chans = ett potentiellt mål.",
  ],
};

const TRANSFERS = {
  sold: [
    { name: "Silas Andersen", pos: "MF", to: "Sporting Lissabon", note: "Scorade solo-dribblingsmålet i Ø10 (55'). Kreativ frirollad mittfältare – deras stora förlust" },
    { name: "Amor Layouni", pos: "MF/VY", to: "AEK Larnaca (gratis)", note: "Scorade straff i Ø10 (48') – startade Häckens comeback. Lämnade 13 juni" },
    { name: "Danilo Al Saed", pos: "VY", to: "HamKam (lån)", note: "Utlånad till norska HamKam till dec 2026" },
    { name: "Srdjan Hrstic", pos: "MF", to: "Altach", note: "Såldes för 5,5 mn kr. Viktig länk i mittfältet" },
  ],
  bought: [
    { name: "Simen Hestnes", pos: "MF", from: "KFUM Oslo", note: "30 år, norsk. Direktersättare för Andersen. Fri transfer" },
    { name: "Harun Ibrahim", pos: "MF", from: "Sharjah FC (lån)", note: "23 år, ex-GAIS (88 matcher, 8 mål). Stark mentalitet, bred" },
  ],
};

const LADEBACK_DATA = (() => {
  const match = hammarbyRefereeMatches.find((m) => m.referee === "Adam Ladebäck")!;
  return {
    match,
    domarindex: calcDomarindex(match),
    rating: getDomarRating(calcDomarindex(match)),
  };
})();

// Adam Ladebäck 2026 Allsvenskan – hemma vs borta frisparkar/kort
// Källa: bolldata.se API, 6 av 10 matcher (övriga ej tillgängliga)
const LADEBACK_MATCHES_2026 = [
  { home: "AIK",           away: "Halmstad",    h_fk: 12, a_fk: 11, h_y: 3, a_y: 1 },
  { home: "Kalmar",        away: "IFK Göteborg",h_fk: 10, a_fk:  8, h_y: 0, a_y: 3 },
  { home: "GAIS",          away: "Örgryte",     h_fk: 14, a_fk: 13, h_y: 0, a_y: 1 },
  { home: "Häcken",        away: "Malmö FF",    h_fk: 10, a_fk: 13, h_y: 3, a_y: 1 },
  { home: "Brommapojkarna",away: "Kalmar",      h_fk: 12, a_fk: 10, h_y: 4, a_y: 0 },
  { home: "Hammarby",      away: "AIK",         h_fk: 18, a_fk: 11, h_y: 1, a_y: 3, isHammarby: true },
];

// KPI rankings – Hammarby vs Häcken (Bolldata/Twelve, aug 2026)
const KPI_RANKINGS = [
  { label: "xG / match",        hif: "2,19", hif_rank: "1:a", opp: "1,65", opp_rank: "~5:e", hif_score: 100, opp_score: 63,  winner: "hif" as const },
  { label: "Avslut / match",    hif: "19,8", hif_rank: "1:a", opp: "14,9", opp_rank: "~8:e", hif_score: 100, opp_score: 60,  winner: "hif" as const },
  { label: "Field tilt (%)",    hif: "69%",  hif_rank: "~1:a", opp: "50%",  opp_rank: "~8:e", hif_score: 100, opp_score: 43,  winner: "hif" as const },
  { label: "PPDA (press)",       hif: "4,9",  hif_rank: "~1:a", opp: "6,0",  opp_rank: "~10:e",hif_score: 100, opp_score: 50,  winner: "hif" as const },
  { label: "Bollinnehav (%)",   hif: "61%",  hif_rank: "~2:a", opp: "52%",  opp_rank: "~7:e", hif_score: 100, opp_score: 70,  winner: "hif" as const },
  { label: "Boxberöringar/match",hif: "28,5", hif_rank: "~1:a", opp: "20,1", opp_rank: "~8:e", hif_score: 100, opp_score: 58,  winner: "hif" as const },
  { label: "Turnovers / match", hif: "30,5", hif_rank: "~5:e", opp: "35,0", opp_rank: "~13:e",hif_score: 78,  opp_score: 52,  winner: "hif" as const },
  { label: "Konvertering (G/xG)",hif: "~1,00",hif_rank: "~8:e", opp: "1,13", opp_rank: "~4:e", hif_score: 55,  opp_score: 75,  winner: "opp" as const },
];

const HACKEN_THREATS = [
  { icon: "⚠️", label: "Inläggsmaskin", detail: "~42% av box entries via inlägg – störst i Allsvenskan. Sadiku lever på centring.", color: "border-rose-500/40 bg-rose-950/20 text-rose-300" },
  { icon: "🎯", label: "Överkonverterar", detail: "1,87 gjorda mål vs 1,65 xG – 14% över förväntan. Varje chans är farligare än den ser ut.", color: "border-orange-500/40 bg-orange-950/20 text-orange-300" },
];

const HAMMARBY_ADVANTAGES = [
  { icon: "⚡", label: "Press 50% hårdare", detail: "PPDA 4,9 vs 6,0. Häcken tvingas göra misstag i uppspel redan från start.", color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
  { icon: "🏃", label: "Utnyttja turnovers", detail: "Häcken tappar ~35 bollar/match, bara ~10% recovery within 5s. Snabb omställning dödar dem.", color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
  { icon: "📌", label: "Hemmaplan + form", detail: "HIF: 4 hemmamatcher med 3+ mål. Häcken: inga bortamål senaste 2 bortaturer.", color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
];

const GOAL_WINDOWS = [
  { window: "0–15'",   hif: 4, opp_conceded: 2 },
  { window: "16–30'",  hif: 4, opp_conceded: 3 },
  { window: "31–45+'", hif: 6, opp_conceded: 3 },
  { window: "46–60'",  hif: 5, opp_conceded: 4 },
  { window: "61–75'",  hif: 7, opp_conceded: 3 },
  { window: "76–90+'", hif: 5, opp_conceded: 3 },
];

/* ─── Helpers ───────────────────────────────────────────────────────── */

function formatSecs(s: number) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

function OutcomeBadge({ o }: { o: "W" | "L" | "D" }) {
  const cfg = {
    W: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    L: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    D: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  }[o];
  const label = { W: "V", L: "F", D: "O" }[o];
  return (
    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-black ${cfg}`}>
      {label}
    </span>
  );
}

/* ─── Slide components ─────────────────────────────────────────────── */

function Slide1() {
  const awayW = HACKEN_AWAY_2026.filter((m) => m.outcome === "W").length;
  const awayD = HACKEN_AWAY_2026.filter((m) => m.outcome === "D").length;
  const awayL = HACKEN_AWAY_2026.filter((m) => m.outcome === "L").length;
  const awayPts = awayW * 3 + awayD;

  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-16 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-rose-500" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-400">Del 1 av 3 · Motståndaren</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-6xl">
            Häcken sedan senast
          </h2>
        </div>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* Form + bortastatistik */}
        <div className="space-y-4">
          {/* Bortastatistik 2026 — det relevanta */}
          <div className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-4">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-sky-400">
              Häcken borta 2026 (7 matcher) — spelar BORTA på 3Arena
            </p>
            <div className="mb-3 flex items-center gap-4">
              <span className="text-4xl font-black text-white">{awayW}V {awayD}O {awayL}F</span>
              <span className="rounded-full border border-sky-500/40 bg-sky-900/30 px-3 py-1 text-sm font-bold text-sky-300">
                {awayPts} poäng
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HACKEN_AWAY_2026.map((m) => (
                <div key={m.round} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-slate-600">Ø{m.round}</span>
                  <OutcomeBadge o={m.outcome} />
                  <span className="text-[10px] font-mono text-slate-500">{m.score}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Senaste bortamatch: Halmstad 0–2 (V, Ø13 · 19 jul). Däremellan bortaförlust mot Örgryte 4–3.
            </p>
          </div>

          {/* Ø10 match breakdown */}
          <div className="rounded-2xl border border-slate-600/40 bg-slate-800/30 p-4">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-slate-400">
              Senaste mötet · Ø10 · {PREV_MEETING.date}
            </p>
            <div className="mb-3 flex items-center gap-3 flex-wrap">
              <span className="text-4xl font-black text-white">{PREV_MEETING.score}</span>
              <span className="rounded-full border border-rose-500/40 bg-rose-900/20 px-2 py-0.5 text-xs font-bold text-rose-300">Häcken vann</span>
              <span className="ml-auto text-xs text-slate-500">xG HIF {PREV_MEETING.xgHIF} – Häcken {PREV_MEETING.xgHacken}</span>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {PREV_MEETING.scorers.map((s, i) => (
                <div key={i} className={`rounded-lg border px-3 py-2 text-sm ${
                  s.team === "hif"
                    ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                    : "border-rose-500/30 bg-rose-950/20 text-rose-300"
                }`}>
                  <span className="font-mono font-bold">{s.minute}</span>{" "}
                  <span className="font-semibold">{s.player}</span>
                  {s.note && <span className="ml-1 text-slate-500 text-[10px]">({s.note})</span>}
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{PREV_MEETING.keyStory}</p>
            <p className="mt-2 rounded-lg border border-violet-500/30 bg-violet-950/20 px-3 py-2 text-sm leading-relaxed text-violet-200">
              🔍 <span className="font-bold">Taktisk kontext:</span> {PREV_MEETING.tacticalContext}
            </p>
            <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-sm font-bold text-amber-300">
              ⚡ Läxa: {PREV_MEETING.lesson}
            </p>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Senaste 5 matcher (alla)
          </h3>
          <div className="space-y-2">
            {HACKEN_FORM.map((m) => (
              <div
                key={m.round}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  m.isAway
                    ? "border-sky-600/30 bg-sky-950/20"
                    : m.round === 10
                    ? "border-slate-600/40 bg-slate-800/30"
                    : "border-slate-700/20 bg-slate-900/20"
                }`}
              >
                <span className="w-8 text-right text-sm font-bold text-slate-500">Ø{m.round}</span>
                <OutcomeBadge o={m.outcome} />
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-base font-semibold text-white">
                    {m.home} <span className="text-slate-500">–</span> {m.away}
                  </span>
                  <span className={`shrink-0 rounded-md border px-2 py-0.5 text-sm font-black ${
                    m.outcome === "W" ? "border-emerald-500/40 bg-emerald-900/30 text-emerald-300"
                    : m.outcome === "L" ? "border-rose-500/40 bg-rose-900/30 text-rose-400"
                    : "border-amber-500/40 bg-amber-900/30 text-amber-300"
                  }`}>{m.score}</span>
                  {m.isAway && (
                    <span className="shrink-0 rounded border border-sky-500/40 bg-sky-900/30 px-1.5 py-0.5 text-xs font-bold text-sky-400">BORTA</span>
                  )}
                </div>
                <p className="hidden max-w-xs text-right text-sm text-slate-500 lg:block">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transfers */}
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-base font-bold uppercase tracking-widest text-rose-400">
              Transfer ut sedan Ø10
            </h3>
            <div className="space-y-2">
              {TRANSFERS.sold.map((p) => (
                <div key={p.name} className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-white">{p.name}</span>
                    <span className="text-sm text-rose-300">→ {p.to}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
              Nyförvärv
            </h3>
            <div className="space-y-2">
              {TRANSFERS.bought.map((p) => (
                <div key={p.name} className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-white">{p.name}</span>
                    <span className="text-sm text-emerald-300">← {p.from}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <p className="text-sm font-black uppercase tracking-widest text-amber-400">Sammanfattning</p>
            <p className="mt-2 text-base text-slate-200 leading-relaxed">
              Häcken tappade sin kreative motor (Andersen) och har inte hittat rytmen sedan VM-pausen. 2 av 4 hemmamatcher slutade oavgjort. De ersätter med erfarenhet men saknar Andersens direkthet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FKBar({ homeFK, awayFK, isHammarby }: { homeFK: number; awayFK: number; isHammarby?: boolean }) {
  const total = homeFK + awayFK || 1;
  const homePct = Math.round((homeFK / total) * 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-14 text-right font-mono font-bold tabular-nums ${isHammarby ? "text-emerald-300" : "text-slate-300"}`}>{homeFK}</span>
      <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div className="absolute inset-y-0 left-0 rounded-full bg-[#008050]/70" style={{ width: `${homePct}%` }} />
        <div className="absolute inset-y-0 right-0 rounded-full bg-slate-600/70" style={{ width: `${100 - homePct}%` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px bg-slate-500/50" style={{ marginLeft: `${homePct}%` }} />
        </div>
      </div>
      <span className="w-8 font-mono tabular-nums text-slate-400">{awayFK}</span>
    </div>
  );
}

function Slide2() {
  const m = LADEBACK_DATA.match;
  const idx = LADEBACK_DATA.domarindex;
  const rating = LADEBACK_DATA.rating;
  const stoppage = m.totalTimeMin - 90;
  const avgHomeFk = LADEBACK_MATCHES_2026.reduce((s, r) => s + r.h_fk, 0) / LADEBACK_MATCHES_2026.length;
  const avgAwayFk = LADEBACK_MATCHES_2026.reduce((s, r) => s + r.a_fk, 0) / LADEBACK_MATCHES_2026.length;
  const avgHomeY  = LADEBACK_MATCHES_2026.reduce((s, r) => s + r.h_y,  0) / LADEBACK_MATCHES_2026.length;
  const avgAwayY  = LADEBACK_MATCHES_2026.reduce((s, r) => s + r.a_y,  0) / LADEBACK_MATCHES_2026.length;

  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-16 lg:py-10">
      <div className="mb-5 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-violet-500" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-400">Del 2 av 3 · Domaranalys</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-6xl">Adam Ladebäck</h2>
        </div>
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <span className="rounded-full border border-violet-500/40 bg-violet-950/20 px-3 py-1 text-xs font-bold text-violet-300">FIFA-badge</span>
          <span className="rounded-full border border-slate-600/40 bg-slate-800/40 px-3 py-1 text-xs font-bold text-slate-400">2026: 10 matcher</span>
        </div>
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {/* Season summary pills */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Gula/match", value: "3,1", sub: "säsongsnitt 2026", color: "text-yellow-300" },
              { label: "Straffar totalt", value: "1", sub: "på 10 matcher", color: "text-sky-300" },
              { label: "Eff. speltid (Ham-match)", value: formatSecs(m.effectivePlayingTimeS), sub: "lägst i vår data", color: "text-sky-300" },
              { label: "Tillägg (Ham-match)", value: `+${stoppage} min`, sub: "mest i vår data", color: "text-amber-300" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">{s.label}</p>
                <p className={`mt-1 text-3xl font-black tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-600">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Per-match FK chart */}
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Frisparkar vunna — Hemmalag vs Bortalag (6 matcher 2026)
              </p>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-[#008050]/70" /> Hemma</span>
                <span className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-slate-600/70" /> Borta</span>
              </div>
            </div>
            <div className="space-y-2">
              {LADEBACK_MATCHES_2026.map((r, i) => (
                <div key={i} className={`rounded-lg px-3 py-2 ${r.isHammarby ? "border border-emerald-500/30 bg-emerald-950/20" : "bg-slate-800/20"}`}>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className={`text-sm font-semibold ${r.isHammarby ? "text-emerald-300" : "text-slate-400"}`}>
                      {r.home}(H) vs {r.away}(B){r.isHammarby ? " ← Hammarby" : ""}
                    </span>
                    <span className="text-slate-600">
                      Gula: {r.h_y}–{r.a_y}
                    </span>
                  </div>
                  <FKBar homeFK={r.h_fk} awayFK={r.a_fk} isHammarby={r.isHammarby} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-600/30 bg-slate-800/40 px-3 py-2 text-xs">
              <span className="text-base font-bold text-white">Snitt</span>
              <FKBar homeFK={Math.round(avgHomeFk * 10) / 10} awayFK={Math.round(avgAwayFk * 10) / 10} />
              <span className="text-slate-500">Gula: {avgHomeY.toFixed(1)}–{avgAwayY.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Hemmalag vinner i snitt {avgHomeFk.toFixed(1)} frisparkar, bortalag {avgAwayFk.toFixed(1)} — hemmalag +{(avgHomeFk - avgAwayFk).toFixed(1)} per match.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
            <p className="text-base font-bold text-emerald-300">
              ✅ Hammarby spelar HEMMA · Ladebäck ger hemmalag fler frisparkar (+{(avgHomeFk - avgAwayFk).toFixed(1)}/match snitt) · PlaymakerAI neutralitetsindex −6,2 (gynnar hemmalag)
            </p>
          </div>
        </div>

        {/* Rating + Ham-match details */}
        <div className="space-y-4">
          <div className={`flex flex-col items-center rounded-2xl border p-6 text-center ${rating.bg} ${rating.border}`}>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Betyg Hammarby Ø9</p>
            <p className="mt-2 text-6xl">{rating.emoji}</p>
            <p className={`mt-1 text-4xl font-black ${rating.color}`}>{rating.label}</p>
            <p className={`text-5xl font-black tabular-nums ${idx > 0 ? "text-emerald-300" : "text-rose-400"}`}>
              {idx > 0 ? `+${idx}` : idx}
            </p>
            <p className="text-[10px] text-slate-500">domarindex</p>
            <p className="mt-3 text-xs italic leading-relaxed text-slate-400">&ldquo;{rating.description}&rdquo;</p>
          </div>

          <div className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-4">
            <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm text-base font-bold text-white hover:text-slate-200">{m.matchName}</a>
            <p className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <span className="text-slate-500">Frisparkar</span>
              <span className="font-mono font-bold text-emerald-300 text-right">Ham 18 – AIK 11</span>
              <span className="text-slate-500">Set piece FK</span>
              <span className="font-mono font-bold text-emerald-300 text-right">Ham 5 – AIK 0</span>
              <span className="text-slate-500">Gula</span>
              <span className="font-mono font-bold text-emerald-300 text-right">Ham 1 – AIK 4</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiBar({ hifScore, oppScore, winner }: { hifScore: number; oppScore: number; winner: "hif" | "opp" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${winner === "hif" ? "bg-[#008050]" : "bg-slate-600"}`}
          style={{ width: `${hifScore}%` }}
        />
      </div>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${winner === "opp" ? "bg-amber-500" : "bg-slate-700"}`}
          style={{ width: `${oppScore}%` }}
        />
      </div>
    </div>
  );
}

function Slide3() {
  const maxGoals = Math.max(...GOAL_WINDOWS.map((g) => Math.max(g.hif, g.opp_conceded)));

  return (
    <div className="overflow-y-auto px-8 py-8 lg:px-16 lg:py-10" style={{ maxHeight: "calc(100vh - 110px)" }}>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-[#008050]" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#008050]">Del 3 av 3 · Matchanalys</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-6xl">
            Hammarby vs BK Häcken — Data
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* KPI ranking table */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold uppercase tracking-widest text-slate-300">KPI-jämförelse · Allsvenskan 2026</h3>
            <div className="flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-5 rounded-full bg-[#008050]" /> <span className="text-emerald-300 font-bold">Hammarby</span></span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-5 rounded-full bg-amber-500" /> <span className="text-amber-300 font-bold">Häcken</span></span>
            </div>
          </div>
          <div className="space-y-3">
            {KPI_RANKINGS.map((k) => (
              <div key={k.label} className="grid items-center gap-3" style={{ gridTemplateColumns: "11rem 6rem 1fr 6rem" }}>
                <span className="text-sm text-slate-400 truncate">{k.label}</span>
                <div className="text-right">
                  <span className={`text-base font-black tabular-nums ${k.winner === "hif" ? "text-emerald-300" : "text-slate-300"}`}>{k.hif}</span>
                  <p className="text-xs text-slate-600">{k.hif_rank}</p>
                </div>
                <KpiBar hifScore={k.hif_score} oppScore={k.opp_score} winner={k.winner} />
                <div className="text-left">
                  <span className={`text-base font-black tabular-nums ${k.winner === "opp" ? "text-amber-300" : "text-slate-400"}`}>{k.opp}</span>
                  <p className="text-xs text-slate-600">{k.opp_rank}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Threats + Advantages */}
        <div className="grid gap-4 sm:grid-cols-2">
          <section>
            <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-rose-400">⚠️ Se upp med Häcken</h3>
            <div className="space-y-2">
              {HACKEN_THREATS.map((t) => (
                <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                  <p className="text-base font-black">{t.icon} {t.label}</p>
                  <p className="mt-1 text-sm opacity-80">{t.detail}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-emerald-400">✅ Hammarbys fördelar</h3>
            <div className="space-y-2">
              {HAMMARBY_ADVANTAGES.map((a) => (
                <div key={a.label} className={`rounded-xl border p-4 ${a.color}`}>
                  <p className="text-base font-black">{a.icon} {a.label}</p>
                  <p className="mt-1 text-sm opacity-80">{a.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Injury list */}
        <section className="rounded-2xl border border-rose-600/50 bg-rose-950/30 p-5">
          <h3 className="mb-3 text-base font-bold uppercase tracking-widest text-rose-300">🏥 Häcken – borta idag (skador)</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Linde",          note: "Skada · ej med i truppen" },
              { name: "Julius Lindberg",note: "Skada · ej med i truppen" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-900/20 px-4 py-3">
                <span className="text-xl">❌</span>
                <div>
                  <p className="text-base font-black text-white">{p.name}</p>
                  <p className="text-sm text-rose-300">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Players to watch */}
        <section className="rounded-2xl border border-rose-700/30 bg-slate-900/60 p-5">
          <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-rose-400">👁️ Häcken – spelare att hålla koll på</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLAYERS_TO_WATCH.map((p) => (
              <div key={p.name} className={`rounded-xl border p-4 ${p.color}`}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-black text-white text-lg">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.pos}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-600/40 bg-slate-800/50 px-2 py-0.5 text-[10px] font-bold text-slate-300">{p.badge}</span>
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">{p.stats}</p>
                <p className="text-sm leading-relaxed text-slate-300">{p.threat}</p>
                <div className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5">
                  <p className="text-xs font-bold text-emerald-400">HIF-svar: {p.counter}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hammarbys spelplan */}
        <section className="rounded-2xl border border-[#008050]/30 bg-slate-900/60 p-5">
          <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-[#008050]">🟢 Hammarbys spelplan</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-emerald-400">Med bollen</p>
              <ul className="space-y-2">
                {HAMMARBY_PLAN.withBall.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#008050]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-rose-400">Utan bollen</p>
              <ul className="space-y-2">
                {HAMMARBY_PLAN.withoutBall.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-amber-400">Matchhantering</p>
              <ul className="space-y-2">
                {HAMMARBY_PLAN.matchManagement.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Goal windows */}
        <section className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5">
          <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-slate-300">
            Mål per tidsfönster — HIF gjorda vs Häcken insläppta (2026)
          </h3>
          <div className="flex items-end gap-3">
            {GOAL_WINDOWS.map((g) => (
              <div key={g.window} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end gap-1" style={{ height: "80px" }}>
                  <div className="flex-1 rounded-t-md bg-[#008050]/70 transition-all"
                    style={{ height: `${(g.hif / maxGoals) * 80}px` }} />
                  <div className="flex-1 rounded-t-md bg-amber-500/40 transition-all"
                    style={{ height: `${(g.opp_conceded / maxGoals) * 80}px` }} />
                </div>
                <div className="flex w-full justify-between text-[10px] font-mono">
                  <span className="text-emerald-400">{g.hif}</span>
                  <span className="text-amber-400/70">{g.opp_conceded}</span>
                </div>
                <span className="text-xs text-slate-600">{g.window}</span>
              </div>
            ))}
            <div className="ml-2 space-y-1 self-center text-[9px]">
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-[#008050]/70" /> HIF gjorda</span>
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-amber-500/40" /> Häcken insläppta</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600">Hammarby farligast 61–75'. Häcken starkast i andra halvlek — håll nollan tidigt.</p>
        </section>

        {/* Häcken spelstil */}
        <section className="rounded-2xl border border-amber-600/30 bg-amber-950/10 p-5">
          <h3 className="mb-3 text-base font-bold uppercase tracking-widest text-amber-400">Häckens spelstil (Twelve)</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Inläggsberoende", value: "~42%", sub: "box entries via inlägg — störst i ligan", score: 85, color: "bg-rose-500" },
              { label: "Offensiv effektivitet", value: "1,87 mål/xG 1,65", sub: "+14% över förväntan", score: 72, color: "bg-orange-400" },
              { label: "Press-intensitet", value: "PPDA ~6,0", sub: "passivt — faller hellre tillbaka", score: 30, color: "bg-slate-500" },
              { label: "Turnovers", value: "~35/match", sub: "bland de flesta i ligan", score: 25, color: "bg-slate-500" },
              { label: "Recovery speed", value: "~10% within 5s", sub: "långsamt att reagera (Twelve)", score: 20, color: "bg-slate-600" },
              { label: "Field tilt", value: "~50%", sub: "nära ligasnittet", score: 45, color: "bg-slate-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-3">
                <p className="text-sm font-bold text-slate-200">{s.label}</p>
                <p className="mt-0.5 text-base font-black text-amber-300">{s.value}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.score}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#008050]/40 bg-[#008050]/10 p-5">
          <span className="text-3xl">🏠</span>
          <p className="text-base leading-relaxed text-emerald-100/80">
            Hammarby leder på VARJE offensiv KPI. Häcken saknar Andersen, vinner inte borta och tappar bollen ofta.
            Med Ladebäck som dömer hemmaplan och Häcken i form-dipp — <strong className="text-emerald-300">ta 3 poäng.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main presentation shell ───────────────────────────────────────── */

const SLIDES = [
  { label: "Häcken sedan senast", Component: Slide1 },
  { label: "Omgångens domare", Component: Slide2 },
  { label: "Så vinner Hammarby", Component: Slide3 },
];

export default function StorbildPage() {
  const [slide, setSlide] = useState(0);

  const prev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => setSlide((s) => Math.min(SLIDES.length - 1, s + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const { Component } = SLIDES[slide]!;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-950 text-slate-100">
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-950/95 px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/matchstatistik/kommande" className="text-sm text-neutral-600 hover:text-neutral-400">
            ← Tillbaka
          </Link>
          <span className="text-neutral-700">|</span>
          <span className="text-sm text-base font-bold text-white">Hammarby – BK Häcken</span>
          <span className="rounded-full border border-[#008050]/40 bg-[#008050]/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-[#008050]">
            Omgång 16 · 9 aug
          </span>
        </div>

        {/* Slide selector */}
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                i === slide
                  ? "bg-[#008050] text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-neutral-600">← → navigera</span>
      </div>

      {/* ── Slide content ── */}
      <div className="relative min-h-0 flex-1">
        <Component />
      </div>

      {/* ── Bottom nav ── */}
      <div className="flex shrink-0 items-center justify-between border-t border-neutral-800 bg-neutral-950/95 px-6 py-3">
        <button
          onClick={prev}
          disabled={slide === 0}
          className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-bold text-slate-300 transition-colors disabled:opacity-20 hover:border-neutral-600 hover:text-white"
        >
          ← Föregående
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === slide ? "w-8 bg-[#008050]" : "w-2.5 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={slide === SLIDES.length - 1}
          className="flex items-center gap-2 rounded-xl border border-[#008050]/50 bg-[#008050]/20 px-5 py-2.5 text-base font-bold text-emerald-300 transition-colors disabled:opacity-20 hover:border-[#008050] hover:bg-[#008050]/30"
        >
          Nästa →
        </button>
      </div>
    </div>
  );
}
