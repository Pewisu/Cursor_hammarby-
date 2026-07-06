"use client";

import SpiderComparisonChart from "@/components/SpiderComparisonChart";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchStoryPhase,
} from "@/lib/elfsborgRound11AnalysisData";
import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";

const toneStyles: Record<
  MatchRecapTakeaway["tone"],
  { border: string; bg: string; text: string; chip: string }
> = {
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-100",
    chip: "bg-emerald-500/20 text-emerald-100",
  },
  amber: {
    border: "border-amber-400/40",
    bg: "bg-amber-400/10",
    text: "text-amber-100",
    chip: "bg-amber-400/20 text-amber-100",
  },
  blue: {
    border: "border-blue-400/40",
    bg: "bg-blue-400/10",
    text: "text-blue-100",
    chip: "bg-blue-400/20 text-blue-100",
  },
  slate: {
    border: "border-slate-500/40",
    bg: "bg-slate-600/10",
    text: "text-slate-100",
    chip: "bg-slate-600/20 text-slate-100",
  },
};

const storyToneStyles: Record<
  MatchStoryPhase["tone"],
  { border: string; bg: string; label: string; chip: string }
> = {
  emerald: {
    border: "border-emerald-500/35",
    bg: "bg-emerald-500/8",
    label: "text-emerald-200",
    chip: "border-emerald-500/30 bg-emerald-500/15 text-emerald-100",
  },
  amber: {
    border: "border-amber-400/35",
    bg: "bg-amber-400/8",
    label: "text-amber-200",
    chip: "border-amber-400/30 bg-amber-400/15 text-amber-100",
  },
  blue: {
    border: "border-blue-400/35",
    bg: "bg-blue-400/8",
    label: "text-blue-200",
    chip: "border-blue-400/30 bg-blue-400/15 text-blue-100",
  },
  slate: {
    border: "border-slate-500/35",
    bg: "bg-slate-600/8",
    label: "text-slate-200",
    chip: "border-slate-500/30 bg-slate-600/15 text-slate-100",
  },
};

export interface MatchRecapSectionProps {
  headline: string;
  verdict: string;
  subheadline: string;
  matchResult: string;
  dateLabel: string;
  bolldataSummary?: string;
  opponentLabel: string;
  matchStory: MatchStoryPhase[];
  goals: MatchGoalEvent[];
  takeaways: MatchRecapTakeaway[];
  spiderAxes: SpiderComparisonAxis[];
  sourceUrl: string;
  hammarbySourceUrl?: string;
}

export default function MatchRecapSection({
  headline,
  verdict,
  subheadline,
  matchResult,
  dateLabel,
  bolldataSummary,
  opponentLabel,
  matchStory,
  goals,
  takeaways,
  spiderAxes,
  sourceUrl,
  hammarbySourceUrl,
}: MatchRecapSectionProps) {
  const sortedGoals = [...goals].sort((a, b) => a.minute - b.minute);
  const hammarbyGoals = sortedGoals.filter((goal) => goal.team === "Hammarby").length;
  const opponentGoals = sortedGoals.filter((goal) => goal.team !== "Hammarby").length;

  return (
    <section className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-emerald-800/45 pb-5">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/90">
            Eftermatchsanalys · {dateLabel}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-50 md:text-2xl">{headline}</h2>
          <p className="mt-3 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm font-medium leading-relaxed text-emerald-50">
            {verdict}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{subheadline}</p>
          {bolldataSummary ? (
            <p className="mt-2 text-xs text-slate-400">{bolldataSummary}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-100">
            {matchResult}
          </span>
          <div className="flex gap-2 text-[11px]">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-slate-600/70 px-2 py-1 text-slate-300 hover:border-slate-500 hover:text-white"
            >
              Bolldata ↗
            </a>
            {hammarbySourceUrl ? (
              <a
                href={hammarbySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-slate-600/70 px-2 py-1 text-slate-300 hover:border-slate-500 hover:text-white"
              >
                Hammarby ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
          Så gick matchen
        </p>
        <div className="mt-3 space-y-3">
          {matchStory.map((phase) => {
            const tone = storyToneStyles[phase.tone];
            return (
              <div
                key={phase.id}
                className={`rounded-xl border p-4 ${tone.border} ${tone.bg}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className={`text-sm font-semibold ${tone.label}`}>{phase.label}</p>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${tone.chip}`}>
                    {phase.scoreline}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{phase.body}</p>
              </div>
            );
          })}
        </div>
      </article>

      <article
        id="bolldata-spider"
        className="mt-6 rounded-xl border border-emerald-600/40 bg-[#13231d]/90 p-4 md:p-5"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/90">
            Bolldata lagspindel
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            Hammarby vs {opponentLabel} · matchdata
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Samma typ av lagjämförelse som på Bolldatas matchsida – axlar från matchens
            lagstatistik (xG, avslut, bollinnehav, dueller m.m.). Grönt = Hammarby, gult ={" "}
            {opponentLabel}.
          </p>
        </div>
        <SpiderComparisonChart axes={spiderAxes} opponentLabel={opponentLabel} />
      </article>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-xl border border-slate-600/50 bg-slate-900/50 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Målföljd</p>
          <div className="mt-4 space-y-3">
            {sortedGoals.map((goal) => {
              const isHammarby = goal.team === "Hammarby";
              return (
                <div
                  key={`${goal.minute}-${goal.player}`}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                    isHammarby
                      ? "border-emerald-500/35 bg-emerald-500/10"
                      : "border-amber-400/30 bg-amber-400/8"
                  }`}
                >
                  <span className="w-10 shrink-0 text-center text-sm font-bold text-slate-200">
                    {goal.minute}&apos;
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100">{goal.player}</p>
                    <p className="text-xs text-slate-400">{goal.team}</p>
                  </div>
                  <span className="rounded border border-slate-600/60 bg-slate-950/70 px-2 py-0.5 text-[11px] text-slate-300">
                    xG {goal.xg.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 rounded-lg border border-slate-700/60 bg-slate-950/60 px-3 py-2 text-sm">
            <span className="text-amber-200">{opponentLabel}</span>
            <span className="font-bold text-white">
              {opponentGoals}–{hammarbyGoals}
            </span>
            <span className="text-emerald-200">Hammarby</span>
          </div>
        </article>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Vad stack ut
          </p>
          <div className="mt-3 grid gap-3">
            {takeaways.map((item) => {
              const tone = toneStyles[item.tone];
              return (
                <article
                  key={item.id}
                  className={`rounded-xl border p-4 ${tone.border} ${tone.bg}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${tone.text}`}>{item.title}</h3>
                    {item.stat ? (
                      <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${tone.chip}`}>
                        {item.stat}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
