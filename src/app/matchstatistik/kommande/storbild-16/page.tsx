"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";

const report = upcomingOpponents.find((r) => !r.hidden)!;

function shortName(name: string) {
  return name.replace(/ IF$/, "").replace(/ FF$/, "").replace(/ BK$/, "").replace(/ FK$/, "");
}

const parts = report.fixture.split("-").map((p) => p.trim());
const hif = shortName(parts[0] ?? "Hammarby");
const opp = shortName(parts[1] ?? "Motståndare");

function rankPct(rank: number, total = 16) {
  return ((total - rank) / (total - 1)) * 100;
}

function OutcomeBadge({ o }: { o: "win" | "draw" | "loss" }) {
  const cfg = {
    win: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    loss: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    draw: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  }[o];
  const label = { win: "V", loss: "F", draw: "O" }[o];
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-black ${cfg}`}
    >
      {label}
    </span>
  );
}

/* ─── Slides ─────────────────────────────────────────────────────────── */

function SlideRankings() {
  const phases = report.twelvePhaseRanks ?? [];
  const rows = report.bolldataRankings ?? [];
  const off = rows.filter((r) => r.group === "offensiv");
  const def = rows.filter((r) => r.group === "defensiv");
  const stil = rows.filter((r) => r.group === "stil");

  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-14 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-[#008050]" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#008050]">
            Del 1 av 3 · Rankingtavlan
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-5xl">
            Twelve &amp; Bolldata
          </h2>
          <p className="mt-1 text-base text-slate-400">
            {hif} vs {opp} · Allsvenskan 2026 · 17 omgångar · 20 aug
          </p>
        </div>
      </div>

      <div className="grid flex-1 gap-5 xl:grid-cols-[1.1fr_1fr]">
        {/* Twelve phases */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#008050]">
                Twelve overall performance
              </p>
              <h3 className="text-xl font-black uppercase text-white">7 faser · 1 = bäst</h3>
            </div>
            <div className="flex gap-2 text-xs font-bold">
              <span className="rounded-lg border border-emerald-600/40 bg-emerald-950/40 px-2 py-1 text-emerald-200">
                {hif}
              </span>
              <span className="rounded-lg border border-amber-600/40 bg-amber-950/40 px-2 py-1 text-amber-200">
                {opp}
              </span>
            </div>
          </div>
          <div className="space-y-2.5">
            {phases.map((p) => {
              const hWins = p.hammarbyRank < p.opponentRank;
              return (
                <div
                  key={p.label}
                  className="grid grid-cols-[9rem_1fr_auto] items-center gap-3 rounded-xl border border-slate-700/40 bg-slate-950/60 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-black uppercase text-slate-100">{p.label}</p>
                    <p className="text-[11px] tabular-nums text-slate-500">
                      <span className="text-[#008050]">{p.hammarbyRank}</span>
                      <span className="mx-1">·</span>
                      <span className="text-amber-400">{p.opponentRank}</span>
                      <span> /16</span>
                    </p>
                  </div>
                  <div className="relative h-8 rounded-full border border-slate-700 bg-gradient-to-r from-rose-950/30 via-slate-900 to-emerald-950/40">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-slate-600/70" />
                    <div
                      className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border-2 border-emerald-300 bg-[#008050] text-[11px] font-black text-white"
                      style={{ left: `${rankPct(p.hammarbyRank)}%` }}
                    >
                      {p.hammarbyRank}
                    </div>
                    <div
                      className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border-2 border-amber-200 bg-amber-500 text-[11px] font-black text-neutral-950"
                      style={{ left: `${rankPct(p.opponentRank)}%` }}
                    >
                      {p.opponentRank}
                    </div>
                  </div>
                  <p
                    className={`hidden w-40 text-xs leading-snug lg:block ${
                      hWins ? "text-emerald-300" : "text-amber-300"
                    }`}
                  >
                    {p.talkTrack}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bolldata columns */}
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
          {[
            { title: "Offensiv", items: off, accent: "text-emerald-300" },
            { title: "Defensiv", items: def, accent: "text-sky-300" },
            { title: "Stil", items: stil, accent: "text-amber-300" },
          ].map((col) => (
            <div
              key={col.title}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4"
            >
              <p className={`mb-3 text-xs font-black uppercase tracking-[0.25em] ${col.accent}`}>
                Bolldata · {col.title}
              </p>
              <div className="space-y-3">
                {col.items.map((r) => (
                  <div key={r.label}>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      {r.label}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/30 px-2 py-1.5">
                        <p className="text-[10px] text-[#008050]">
                          {hif} · {r.hammarbyRank}:a
                        </p>
                        <p className="text-base font-black tabular-nums text-emerald-100">
                          {r.hammarbyValue}
                        </p>
                      </div>
                      <div className="rounded-lg border border-amber-800/40 bg-amber-950/30 px-2 py-1.5">
                        <p className="text-[10px] text-amber-500">
                          {opp} · {r.opponentRank}:a
                        </p>
                        <p className="text-base font-black tabular-nums text-amber-100">
                          {r.opponentValue}
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">{r.talkTrack}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidePreviousAndPlan() {
  const pm = report.previousMeeting;
  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-14 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-rose-500" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-400">
            Del 2 av 3 · Förra mötet &amp; plan
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-5xl">
            Revansch på 3Arena
          </h2>
        </div>
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          {pm && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-rose-400">
                {pm.fixture} · {pm.date}
              </p>
              <div className="mb-3 flex flex-wrap items-end gap-3">
                <span className="text-6xl font-black text-white">{pm.result}</span>
                {pm.halfTimeScore && (
                  <span className="pb-2 text-sm text-slate-400">HT {pm.halfTimeScore}</span>
                )}
                <span className="ml-auto pb-2 text-sm text-slate-400">
                  xG {pm.xgHammarby}–{pm.xgOpponent}
                </span>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {pm.scorers?.map((s, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      s.team === "hammarby"
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-amber-500/30 bg-amber-950/20 text-amber-300"
                    }`}
                  >
                    <span className="font-mono font-bold">{s.minute}&apos;</span> {s.player}
                  </div>
                ))}
              </div>
              <p className="text-base leading-relaxed text-slate-300">{pm.contextNote}</p>
              <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-sm font-bold text-amber-200">
                ⚡ {pm.keyStory}
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
              Inbördes · senaste {report.headToHead?.matches.length ?? 0}
            </p>
            <div className="flex flex-wrap gap-2">
              {report.headToHead?.matches.map((m) => (
                <div
                  key={`${m.date}-${m.fixture}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-700/40 bg-slate-950/50 px-3 py-2"
                >
                  <OutcomeBadge o={m.outcome} />
                  <div>
                    <p className="text-sm font-black text-white">{m.result}</p>
                    <p className="text-[10px] text-slate-500">
                      {m.date.slice(0, 7)} · {m.venue === "home" ? "H" : "B"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {report.spotlightKey && (
            <div className="rounded-2xl border border-[#008050]/50 bg-[#008050]/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#008050]">
                X-Factor · 3 poäng
              </p>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-emerald-50">
                {report.spotlightKey}
              </p>
            </div>
          )}
          <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/20 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#008050]">
              Med boll
            </p>
            <ul className="space-y-2">
              {report.hammarbyPlan.withBall.map((pt, i) => (
                <li key={i} className="flex gap-3 text-sm leading-snug text-slate-200">
                  <span className="font-black text-[#008050]">{String(i + 1).padStart(2, "0")}</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-600/50 bg-slate-900/40 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
              Utan boll + matchledning
            </p>
            <ul className="space-y-2">
              {report.hammarbyPlan.withoutBall.map((pt, i) => (
                <li key={i} className="flex gap-3 text-sm leading-snug text-slate-200">
                  <span className="font-black text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-1.5 border-t border-slate-700 pt-3">
              {report.hammarbyPlan.matchManagement.map((pt, i) => (
                <p key={i} className="text-xs leading-snug text-slate-400">
                  ↻ {pt}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideScout() {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 py-8 lg:px-14 lg:py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-amber-500" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-400">
            Del 3 av 3 · Scouting
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white lg:text-5xl">
            Spelare &amp; målfönster
          </h2>
        </div>
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-4 md:grid-cols-3">
          {report.playersToWatch?.slice(0, 3).map((p) => (
            <div
              key={p.name}
              className="flex flex-col rounded-2xl border border-amber-700/30 bg-amber-950/15 p-5"
            >
              {p.scoutBadge && (
                <span className="mb-3 self-start rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-amber-300">
                  {p.scoutBadge}
                </span>
              )}
              <h3 className="text-2xl font-black text-white">{p.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                {p.position}
              </p>
              <p className="mt-3 text-sm font-semibold text-amber-200">{p.threat}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {p.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-slate-700 bg-slate-900/60 p-2 text-center"
                  >
                    <p className="text-xl font-black tabular-nums text-white">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{p.motivation}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-700/40 bg-amber-950/20 p-5">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-amber-400">
            Målfönster · HIF gjorda vs {opp} insläppta
          </p>
          <div className="space-y-2">
            {report.goalWindows.map((w) => {
              const total = w.hammarbyGoals + w.opponentConcededGoals;
              const max = Math.max(
                ...report.goalWindows.map((x) => x.hammarbyGoals + x.opponentConcededGoals),
              );
              const hot = total >= max - 1;
              return (
                <div
                  key={w.window}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                    hot
                      ? "border border-amber-500/40 bg-amber-500/15"
                      : "border border-slate-700/40 bg-slate-900/40"
                  }`}
                >
                  <span className={`text-sm font-bold ${hot ? "text-amber-200" : "text-slate-400"}`}>
                    {w.window}
                  </span>
                  <span className="text-sm font-bold">
                    <span className="text-[#008050]">{w.hammarbyGoals}</span>
                    <span className="mx-1 text-slate-600">|</span>
                    <span className="text-amber-400">{w.opponentConcededGoals}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 space-y-2">
            {report.goalTypeNotes.slice(0, 3).map((n) => (
              <div key={n.label} className="rounded-xl border border-slate-700/40 bg-slate-950/40 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {n.label}
                </p>
                <p className="text-sm font-bold text-white">{n.value}</p>
                <p className="mt-1 text-xs text-slate-400">{n.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDES = [
  { id: 0, label: "Rankingtavlan", Comp: SlideRankings },
  { id: 1, label: "Förra mötet & plan", Comp: SlidePreviousAndPlan },
  { id: 2, label: "Scouting", Comp: SlideScout },
];

export default function StorbildGaisPage() {
  const [slide, setSlide] = useState(0);
  const go = useCallback((dir: -1 | 1) => {
    setSlide((s) => Math.max(0, Math.min(SLIDES.length - 1, s + dir)));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const Active = SLIDES[slide]!.Comp;

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-slate-100">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-6 py-3">
        <Link href="/matchstatistik/kommande" className="text-sm text-slate-500 hover:text-slate-300">
          ← Kommande
        </Link>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Presentationsläge · {report.roundLabel}
          </p>
          <p className="text-sm font-black uppercase text-white">
            {hif} – {opp} · {report.dateLabel.split("·")[0]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {SLIDES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlide(s.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                slide === s.id
                  ? "bg-[#008050] text-white"
                  : "border border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Active />
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-slate-800 px-6 py-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={slide === 0}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold disabled:opacity-30"
        >
          ← Föregående
        </button>
        <p className="text-xs text-slate-600">Piltangenter / mellanslag</p>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={slide === SLIDES.length - 1}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold disabled:opacity-30"
        >
          Nästa →
        </button>
      </div>
    </div>
  );
}
