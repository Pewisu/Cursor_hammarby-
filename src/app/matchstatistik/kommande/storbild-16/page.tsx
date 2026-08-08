"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { hammarbyRefereeMatches, calcDomarindex, getDomarRating } from "@/lib/hammarbyRefereeData";

/* ─── Data ─────────────────────────────────────────────────────────── */

// All = senaste 5 matcher (för kontext). isAway markerar Häcken som bortalag.
const HACKEN_FORM = [
  { round: 10, home: "Häcken",  away: "Hammarby",  score: "3–2", outcome: "W" as const, isAway: false, note: "Förra mötet (hemma). Vann från 0–2 (HT). Silas Andersen avgjorde" },
  { round: 11, home: "Häcken",  away: "Djurgårdsn", score: "2–4", outcome: "L" as const, isAway: false, note: "Hemma. Kross efter sommarpausen" },
  { round: 12, home: "Örgryte", away: "Häcken",    score: "4–3", outcome: "L" as const, isAway: true,  note: "Borta. Förlorade trots att de ledde" },
  { round: 13, home: "Halmstad", away: "Häcken",   score: "0–2", outcome: "W" as const, isAway: true,  note: "Borta. Senaste bortasegern (19 jul)" },
  { round: 14, home: "Häcken",  away: "AIK",       score: "0–0", outcome: "D" as const, isAway: false, note: "Hemma. 0–0, utan mål hemma i 180 min" },
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

const TRANSFERS = {
  sold: [
    { name: "Silas Andersen", pos: "MF", to: "Sporting Lissabon", note: "Scorade i Ø10. Kreativ frirollad mittfältare – deras stora förlust" },
  ],
  bought: [
    { name: "Simen Hestnes", pos: "MF", from: "KFUM Oslo", note: "30 år, norsk. Direktersättare för Andersen. Fri transfer" },
    { name: "Harun Ibrahim", pos: "MF", from: "Sharjah FC (lån)", note: "23 år, ex-GAIS (88 mater, 8 mål). Stark mentalitet, bred" },
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

const TACTICAL_POINTS = [
  {
    icon: "🔴",
    title: "Stäng ytterbanorna",
    body: "42% av Häckens box entries kommer via inlägg – ligans mest inläggsberoende lag (Twelve). Viktor Gyökeres-lookalike Sadiku lever på centring. Hammarby måste hålla ytterbackarna höga och stänga inläggsytorna tidigt.",
    tag: "Kritiskt",
    tagColor: "bg-rose-600/30 text-rose-300 border-rose-500/40",
  },
  {
    icon: "⚡",
    title: "Pressa direkt efter bolltapp",
    body: "Häcken reagerar långsamt vid bolttapp – bara ~10% recoveries within 5s (Twelve). Hammarbys ligaledande PPDA 4,9 vs Häckens ~6,0 ger ett pressgap på nästan 50%. Varje gång Häcken bygger upp bakifrån är vi redan på dem.",
    tag: "Fördel",
    tagColor: "bg-emerald-600/30 text-emerald-300 border-emerald-500/40",
  },
  {
    icon: "🏃",
    title: "Utnyttja övergångar",
    body: "Häcken tappar bollen ~35 ggr/match (Twelve) – fler än genomsnittet. Hammarbys snabba omställning via Elanga/Andrade är skräddarsydd för att exploatera detta. Positiva kontringar mot deras djupa försvarslinje.",
    tag: "Nyckel",
    tagColor: "bg-amber-600/30 text-amber-300 border-amber-500/40",
  },
  {
    icon: "🎯",
    title: "Kontrollera boxen",
    body: "Häcken konverterar BÄTTRE än xG motiverar. De är effektiva. Ge dem inga billiga chanceer – varje avslut de får är potentiellt mer värt än statistiken säger. Håll 0 chanser i boxen i god position.",
    tag: "Varning",
    tagColor: "bg-orange-600/30 text-orange-300 border-orange-500/40",
  },
  {
    icon: "📌",
    title: "Utnyttja hemmaplan",
    body: "Hammarby har vunnit 4 av 7 hemmamatcher med 3+ mål. Häcken har INTE vunnit borta sedan maj. Hemmaeffekten är real – ytterbankarna och publiken driver press framåt. Börja högt, håll tempot, slå tidigt.",
    tag: "Fördel",
    tagColor: "bg-emerald-600/30 text-emerald-300 border-emerald-500/40",
  },
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
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-rose-400">Del 1 av 3 · Motståndaren</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white lg:text-4xl">
            Häcken sedan senast
          </h2>
        </div>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* Form + bortastatistik */}
        <div className="space-y-4">
          {/* Bortastatistik 2026 — det relevanta */}
          <div className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-sky-400">
              Häcken borta 2026 (7 matcher) — spelar BORTA på 3Arena
            </p>
            <div className="mb-3 flex items-center gap-4">
              <span className="text-3xl font-black text-white">{awayW}V {awayD}O {awayL}F</span>
              <span className="rounded-full border border-sky-500/40 bg-sky-900/30 px-3 py-1 text-sm font-bold text-sky-300">
                {awayPts} poäng
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HACKEN_AWAY_2026.map((m) => (
                <div key={m.round} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-600">Ø{m.round}</span>
                  <OutcomeBadge o={m.outcome} />
                  <span className="text-[10px] font-mono text-slate-500">{m.score}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Senaste bortamatch: Halmstad 0–2 (V, Ø13 · 19 jul). Däremellan bortaförlust mot Örgryte 4–3.
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
                <span className="w-7 text-right text-xs font-bold text-slate-500">Ø{m.round}</span>
                <OutcomeBadge o={m.outcome} />
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {m.home} <span className="text-slate-500">–</span> {m.away}
                  </span>
                  <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-black ${
                    m.outcome === "W" ? "border-emerald-500/40 bg-emerald-900/30 text-emerald-300"
                    : m.outcome === "L" ? "border-rose-500/40 bg-rose-900/30 text-rose-400"
                    : "border-amber-500/40 bg-amber-900/30 text-amber-300"
                  }`}>{m.score}</span>
                  {m.isAway && (
                    <span className="shrink-0 rounded border border-sky-500/40 bg-sky-900/30 px-1.5 py-0.5 text-[10px] font-bold text-sky-400">BORTA</span>
                  )}
                </div>
                <p className="hidden max-w-xs text-right text-xs text-slate-500 lg:block">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transfers */}
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-rose-400">
              Transfer ut sedan Ø10
            </h3>
            <div className="space-y-2">
              {TRANSFERS.sold.map((p) => (
                <div key={p.name} className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-xs text-rose-300">→ {p.to}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{p.note}</p>
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
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-xs text-emerald-300">← {p.from}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-amber-400">Sammanfattning</p>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">
              Häcken tappade sin kreative motor (Andersen) och har inte hittat rytmen sedan VM-pausen. 2 av 4 hemmamatcher slutade oavgjort. De ersätter med erfarenhet men saknar Andersens direkthet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide2() {
  const m = LADEBACK_DATA.match;
  const idx = LADEBACK_DATA.domarindex;
  const rating = LADEBACK_DATA.rating;
  const stoppage = m.totalTimeMin - 90;

  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-16 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-violet-500" />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-violet-400">Del 2 av 3 · Domaranalys</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white lg:text-4xl">
            Omgångens domare
          </h2>
        </div>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main info */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Utsedd domare</p>
            <p className="mt-2 text-4xl font-black text-white lg:text-5xl">Adam Ladebäck</p>
            <p className="mt-1 text-sm text-slate-400">FIFA-badge · UEFA Second · Allsvenskan 2026: 10 matcher</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Gula/match</p>
              <p className="mt-1 text-3xl font-black text-yellow-300">3.1</p>
              <p className="text-[10px] text-slate-600">säsnitt 2026</p>
            </div>
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Borta fler kort</p>
              <p className="mt-1 text-3xl font-black text-rose-300">1.7</p>
              <p className="text-[10px] text-slate-600">vs 1.5 hemma</p>
            </div>
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Straffar/match</p>
              <p className="mt-1 text-3xl font-black text-sky-300">0.1</p>
              <p className="text-[10px] text-slate-600">1 på 10 matcher</p>
            </div>
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Fouls/match</p>
              <p className="mt-1 text-3xl font-black text-slate-300">23.2</p>
              <p className="text-[10px] text-slate-600">2026 Allsvenskan</p>
            </div>
          </div>

          {/* Ham vs Ladebäck */}
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Hammarbys enda match med Ladebäck i år
            </p>
            <div className="flex items-start justify-between gap-4">
              <div>
                <a
                  href={m.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-white hover:text-slate-200"
                >
                  {m.matchName}
                </a>
                <p className="text-sm text-slate-400">Omgång {m.gameweek} · {m.date}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <p className="text-[10px] text-slate-500">Eff. speltid</p>
                    <p className="font-mono text-lg font-bold text-sky-300">{formatSecs(m.effectivePlayingTimeS)}</p>
                    <p className="text-[10px] text-slate-600">Lägst i vår data</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Tillägg</p>
                    <p className="font-mono text-lg font-bold text-amber-300">+{stoppage} min</p>
                    <p className="text-[10px] text-slate-600">Mest i vår data</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Frisparkar Ham–AIK</p>
                    <p className="font-mono text-lg font-bold text-emerald-300">5 – 0</p>
                    <p className="text-[10px] text-slate-600">Extremt Hammarby</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Gula Ham–AIK</p>
                    <p className="font-mono text-lg font-bold text-emerald-300">1 – 3</p>
                    <p className="text-[10px] text-slate-600">AIK mest bestraffad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <p className="text-sm font-bold text-emerald-300">
              ✅ Hammarby spelar HEMMA — Ladebäck ger bortalagets mer kort (1.7 vs 1.5). Historiskt domarindex: <strong>+7</strong> för Hammarby.
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-4">
          <div className={`flex flex-col items-center justify-center rounded-2xl border p-8 text-center ${rating.bg} ${rating.border}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Betyg för Hammarby</p>
            <p className="mt-3 text-6xl">{rating.emoji}</p>
            <p className={`mt-2 text-4xl font-black ${rating.color}`}>{rating.label}</p>
            <p className={`mt-1 text-5xl font-black tabular-nums ${idx > 0 ? "text-emerald-300" : "text-rose-400"}`}>
              {idx > 0 ? `+${idx}` : idx}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">domarindex Ø9</p>
            <p className="mt-4 text-xs italic leading-relaxed text-slate-400">
              &ldquo;{rating.description}&rdquo;
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-4 text-xs text-slate-400">
            <p className="font-bold text-slate-300 mb-1">PlaymakerAI om Ladebäck:</p>
            <p>Neutralitetsindex −6,2 i hela Allsvenskan 2026 — dvs. han ger bortalagets mer frisparkar och kort. Med Hammarby på hemmaplan är det en fördel.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-16 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-[#008050]" />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#008050]">Del 3 av 3 · Spelplan</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white lg:text-4xl">
            Så vinner Hammarby
          </h2>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-3">
        {TACTICAL_POINTS.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-5"
          >
            <span className="text-3xl leading-none">{p.icon}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-white">{p.title}</h3>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${p.tagColor}`}>
                  {p.tag}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{p.body}</p>
            </div>
          </div>
        ))}

        {/* Summary CTA */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#008050]/40 bg-[#008050]/10 p-5 lg:col-span-2">
          <span className="text-3xl">🏠</span>
          <div>
            <p className="font-black text-white text-lg">Slutsats</p>
            <p className="text-sm leading-relaxed text-emerald-100/80">
              Hammarby är klart bättre i press och bollinnehav. Häcken saknar sin kreativa motor (Andersen) och vinner inte borta. På 3Arena, med Adam Ladebäck som dömer och Häcken i form-dipp — <strong className="text-emerald-300">ta 3 poäng.</strong>
            </p>
          </div>
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
          <span className="text-sm font-bold text-white">Hammarby – BK Häcken</span>
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
          className="flex items-center gap-2 rounded-xl border border-[#008050]/50 bg-[#008050]/20 px-5 py-2.5 text-sm font-bold text-emerald-300 transition-colors disabled:opacity-20 hover:border-[#008050] hover:bg-[#008050]/30"
        >
          Nästa →
        </button>
      </div>
    </div>
  );
}
