"use client";

import SpiderComparisonChart from "@/components/SpiderComparisonChart";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchSnapshotPill,
  MatchSnapshotStat,
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

const pillStyles: Record<MatchSnapshotPill["tone"], string> = {
  emerald: "border-emerald-500/35 bg-emerald-500/15 text-emerald-100",
  amber: "border-amber-400/35 bg-amber-400/15 text-amber-100",
  blue: "border-blue-400/35 bg-blue-400/15 text-blue-100",
  slate: "border-slate-500/35 bg-slate-600/15 text-slate-100",
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
  tagline: string;
  dateLabel: string;
  opponentLabel: string;
  opponentScore: number;
  hammarbyScore: number;
  opponentXg: number;
  hammarbyXg: number;
  halftimeScore: string;
  snapshotStats: MatchSnapshotStat[];
  snapshotPills: MatchSnapshotPill[];
  matchStory: MatchStoryPhase[];
  goals: MatchGoalEvent[];
  takeaways: MatchRecapTakeaway[];
  spiderAxes: SpiderComparisonAxis[];
  sourceUrl: string;
  hammarbySourceUrl?: string;
}

function getBarWidth(left: number, right: number): number {
  const total = left + right;
  if (total === 0) return 50;
  return (left / total) * 100;
}

function GoalTimeline({
  goals,
  opponentLabel,
}: {
  goals: MatchGoalEvent[];
  opponentLabel: string;
}) {
  const sortedGoals = [...goals].sort((a, b) => a.minute - b.minute);

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wide text-slate-500">
        <span>0&apos;</span>
        <span>HT</span>
        <span>90&apos;</span>
      </div>
      <div className="relative h-16 rounded-xl border border-slate-600/50 bg-slate-950/70 px-2">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-600/60" />
        <div className="absolute left-1/2 top-1 -translate-x-1/2 text-[9px] font-semibold uppercase text-slate-500">
          HT
        </div>
        <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-slate-600/50" />
        {sortedGoals.map((goal) => {
          const isHammarby = goal.team === "Hammarby";
          const leftPercent = Math.min(Math.max((goal.minute / 90) * 100, 4), 96);
          return (
            <div
              key={`${goal.minute}-${goal.player}`}
              className="absolute -translate-x-1/2"
              style={{ left: `${leftPercent}%`, top: isHammarby ? "62%" : "12%" }}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 text-[8px] font-bold ${
                  isHammarby
                    ? "border-emerald-400 bg-emerald-500 text-white"
                    : "border-amber-300 bg-amber-500 text-slate-900"
                }`}
                title={`${goal.minute}' ${goal.player}`}
              >
                ⚽
              </div>
              <p
                className={`mt-0.5 whitespace-nowrap text-[9px] font-semibold ${
                  isHammarby ? "text-emerald-200" : "text-amber-200"
                }`}
              >
                {goal.minute}&apos;
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span className="text-amber-200/90">{opponentLabel}</span>
        <span className="text-emerald-200/90">Hammarby</span>
      </div>
    </div>
  );
}

function StatBar({
  stat,
  opponentLabel,
}: {
  stat: MatchSnapshotStat;
  opponentLabel: string;
}) {
  const hammarbyWidth = getBarWidth(stat.hammarbyValue, stat.opponentValue);
  const opponentWidth = 100 - hammarbyWidth;
  const hammarbyLeads = stat.hammarbyValue >= stat.opponentValue;

  return (
    <div className="rounded-lg border border-slate-600/40 bg-slate-900/50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{stat.label}</p>
      <div className="mt-2 flex items-center justify-between text-xs font-bold">
        <span className={hammarbyLeads ? "text-emerald-200" : "text-slate-300"}>
          {stat.hammarbyDisplay}
        </span>
        <span className={!hammarbyLeads ? "text-amber-200" : "text-slate-300"}>
          {stat.opponentDisplay}
        </span>
      </div>
      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-emerald-500" style={{ width: `${hammarbyWidth}%` }} />
        <div className="h-full bg-amber-400" style={{ width: `${opponentWidth}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[9px] text-slate-500">
        <span>Hammarby</span>
        <span>{opponentLabel}</span>
      </div>
    </div>
  );
}

export default function MatchRecapSection({
  headline,
  tagline,
  dateLabel,
  opponentLabel,
  opponentScore,
  hammarbyScore,
  opponentXg,
  hammarbyXg,
  halftimeScore,
  snapshotStats,
  snapshotPills,
  matchStory,
  goals,
  takeaways,
  spiderAxes,
  sourceUrl,
  hammarbySourceUrl,
}: MatchRecapSectionProps) {
  const sortedGoals = [...goals].sort((a, b) => a.minute - b.minute);

  return (
    <section className="rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6">
      <div className="overflow-hidden rounded-2xl border border-emerald-600/30 bg-[#0f241c]">
        <div className="border-b border-emerald-800/40 px-4 py-3 md:px-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/90">{dateLabel}</p>
          <h2 className="mt-1 text-lg font-bold text-slate-50 md:text-xl">{headline}</h2>
          <p className="mt-1 text-sm text-emerald-100/85">{tagline}</p>
        </div>

        <div className="grid items-center gap-4 px-4 py-6 md:grid-cols-[1fr_auto_1fr] md:px-6">
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold text-amber-100">{opponentLabel}</p>
            <p className="mt-1 text-5xl font-black text-white md:text-6xl">{opponentScore}</p>
            <p className="mt-1 text-sm text-slate-400">xG {opponentXg.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-500">–</p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">HT {halftimeScore}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-emerald-100">Hammarby</p>
            <p className="mt-1 text-5xl font-black text-white md:text-6xl">{hammarbyScore}</p>
            <p className="mt-1 text-sm text-emerald-300/90">xG {hammarbyXg.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t border-emerald-800/30 px-4 py-4 md:px-6">
          <GoalTimeline goals={sortedGoals} opponentLabel={opponentLabel} />
        </div>

        <div className="grid gap-3 border-t border-emerald-800/30 px-4 py-4 sm:grid-cols-2 md:px-6">
          {snapshotStats.map((stat) => (
            <StatBar key={stat.label} stat={stat} opponentLabel={opponentLabel} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-emerald-800/30 px-4 py-4 md:px-6">
          {snapshotPills.map((pill) => (
            <span
              key={pill.id}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${pillStyles[pill.tone]}`}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="#match-story"
          className="rounded-lg border border-slate-600/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500"
        >
          Så gick matchen
        </a>
        <a
          href="#bolldata-spider"
          className="rounded-lg border border-emerald-600/40 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-100 hover:border-emerald-500/60"
        >
          Bolldata spindel
        </a>
        <a
          href="#match-details"
          className="rounded-lg border border-slate-600/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500"
        >
          Mål & insikter
        </a>
        <div className="ml-auto flex gap-2 text-[11px]">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-slate-600/70 px-2 py-1 text-slate-400 hover:text-white"
          >
            Bolldata ↗
          </a>
          {hammarbySourceUrl ? (
            <a
              href={hammarbySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-slate-600/70 px-2 py-1 text-slate-400 hover:text-white"
            >
              Hammarby ↗
            </a>
          ) : null}
        </div>
      </div>

      <details id="match-story" className="mt-5 rounded-xl border border-slate-600/50 bg-slate-900/40">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span className="text-emerald-300">▸</span>
            Så gick matchen
          </span>
        </summary>
        <div className="space-y-3 border-t border-slate-700/50 px-4 py-4">
          {matchStory.map((phase) => {
            const tone = storyToneStyles[phase.tone];
            return (
              <div key={phase.id} className={`rounded-xl border p-3 ${tone.border} ${tone.bg}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className={`text-sm font-semibold ${tone.label}`}>{phase.label}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tone.chip}`}>
                    {phase.scoreline}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-slate-300">{phase.body}</p>
              </div>
            );
          })}
        </div>
      </details>

      <details id="bolldata-spider" className="mt-4 rounded-xl border border-emerald-600/35 bg-[#13231d]/80">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span className="text-emerald-300">▸</span>
            Bolldata lagspindel
          </span>
        </summary>
        <div className="border-t border-emerald-800/30 px-4 py-4">
          <p className="mb-3 text-xs text-slate-400">
            Lagjämförelse från Bolldata – grönt Hammarby, gult {opponentLabel}.
          </p>
          <SpiderComparisonChart axes={spiderAxes} opponentLabel={opponentLabel} />
        </div>
      </details>

      <details id="match-details" className="mt-4 rounded-xl border border-slate-600/50 bg-slate-900/40">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span className="text-emerald-300">▸</span>
            Målföljd & vad stack ut
          </span>
        </summary>
        <div className="grid gap-4 border-t border-slate-700/50 px-4 py-4 lg:grid-cols-2">
          <div className="space-y-2">
            {sortedGoals.map((goal) => {
              const isHammarby = goal.team === "Hammarby";
              return (
                <div
                  key={`${goal.minute}-${goal.player}`}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                    isHammarby
                      ? "border-emerald-500/35 bg-emerald-500/10"
                      : "border-amber-400/30 bg-amber-400/8"
                  }`}
                >
                  <span className="w-8 text-center text-sm font-bold text-slate-200">
                    {goal.minute}&apos;
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100">{goal.player}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">xG {goal.xg.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            {takeaways.map((item) => {
              const tone = toneStyles[item.tone];
              return (
                <article key={item.id} className={`rounded-lg border p-3 ${tone.border} ${tone.bg}`}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${tone.text}`}>{item.title}</h3>
                    {item.stat ? (
                      <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${tone.chip}`}>
                        {item.stat}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </details>
    </section>
  );
}
