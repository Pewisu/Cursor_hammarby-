"use client";

import { useState } from "react";

export interface PredictionItem {
  id: string;
  category: "med-boll" | "utan-boll" | "matchmanagement" | "nyckeltal" | "stilprofil";
  prediction: string;
  outcome: string;
  verdict: "spot-on" | "partially" | "missed";
  evidenceValue?: string;
  evidenceLabel?: string;
}

export interface PredictionVsOutcomeProps {
  matchName: string;
  matchResult: string;
  predictions: PredictionItem[];
  summaryStats: {
    spotOn: number;
    partially: number;
    missed: number;
  };
  headline: string;
  subheadline: string;
  embedded?: boolean;
}

const verdictConfig = {
  "spot-on": {
    label: "Prickat",
    icon: "✓",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/15",
    text: "text-emerald-200",
    barColor: "bg-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  partially: {
    label: "Delvis",
    icon: "~",
    border: "border-amber-400/50",
    bg: "bg-amber-400/15",
    text: "text-amber-200",
    barColor: "bg-amber-400",
    glow: "shadow-amber-500/20",
  },
  missed: {
    label: "Missat",
    icon: "✗",
    border: "border-rose-500/50",
    bg: "bg-rose-500/15",
    text: "text-rose-200",
    barColor: "bg-rose-400",
    glow: "shadow-rose-500/20",
  },
};

const categoryLabels: Record<PredictionItem["category"], string> = {
  "med-boll": "Med boll",
  "utan-boll": "Utan boll",
  matchmanagement: "Matchmanagement",
  nyckeltal: "Nyckeltal",
  stilprofil: "Stilprofil",
};

const categoryColors: Record<PredictionItem["category"], string> = {
  "med-boll": "border-emerald-500/30 bg-emerald-500/8",
  "utan-boll": "border-slate-500/40 bg-slate-600/15",
  matchmanagement: "border-amber-400/30 bg-amber-400/8",
  nyckeltal: "border-blue-400/30 bg-blue-400/8",
  stilprofil: "border-purple-400/30 bg-purple-400/8",
};

export default function PredictionVsOutcome({
  matchResult,
  predictions,
  summaryStats,
  headline,
  subheadline,
  embedded = false,
}: PredictionVsOutcomeProps) {
  const [activeFilter, setActiveFilter] = useState<PredictionItem["category"] | "all">("all");

  const filtered =
    activeFilter === "all"
      ? predictions
      : predictions.filter((p) => p.category === activeFilter);

  const total = summaryStats.spotOn + summaryStats.partially + summaryStats.missed;
  const spotOnPct = (summaryStats.spotOn / total) * 100;
  const partiallyPct = (summaryStats.partially / total) * 100;
  const missedPct = (summaryStats.missed / total) * 100;
  const accuracyScore = Math.round(
    ((summaryStats.spotOn * 1 + summaryStats.partially * 0.5) / total) * 100
  );

  return (
    <section
      className={
        embedded
          ? "border-t border-emerald-800/40 pt-5"
          : "rounded-2xl border border-emerald-700/35 bg-[#1a2d26] p-5 md:p-6"
      }
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-800/45 pb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/90">
            Förhandsanalys vs Utfall
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-50 md:text-2xl">
            {headline}
          </h2>
          <p className="mt-1 text-sm text-slate-300">{subheadline}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100">
            {matchResult}
          </span>
        </div>
      </div>

      {/* Big accuracy score */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#accuracy-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(accuracyScore / 100) * 327} 327`}
            />
            <defs>
              <linearGradient id="accuracy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-200">{accuracyScore}%</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Träffsäkerhet</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Baserat på {total} prediktionspunkter från förhandsanalysen
        </p>
      </div>

      {/* Verdict bar */}
      <div className="mt-6 rounded-xl border border-slate-600/50 bg-slate-800/50 p-4">
        <div className="flex h-5 overflow-hidden rounded-full">
          <div
            className="flex items-center justify-center bg-emerald-500 text-[10px] font-bold text-white transition-all duration-700"
            style={{ width: `${spotOnPct}%` }}
          >
            {summaryStats.spotOn > 0 && summaryStats.spotOn}
          </div>
          <div
            className="flex items-center justify-center bg-amber-400 text-[10px] font-bold text-slate-900 transition-all duration-700"
            style={{ width: `${partiallyPct}%` }}
          >
            {summaryStats.partially > 0 && summaryStats.partially}
          </div>
          <div
            className="flex items-center justify-center bg-rose-500 text-[10px] font-bold text-white transition-all duration-700"
            style={{ width: `${missedPct}%` }}
          >
            {summaryStats.missed > 0 && summaryStats.missed}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-emerald-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Prickat ({summaryStats.spotOn})
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-200">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            Delvis ({summaryStats.partially})
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-200">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            Missat ({summaryStats.missed})
          </span>
        </div>
      </div>

      {/* Category filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
            activeFilter === "all"
              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
              : "border-slate-600/50 bg-slate-800/50 text-slate-300 hover:border-emerald-400/40"
          }`}
        >
          Alla ({total})
        </button>
        {(Object.keys(categoryLabels) as PredictionItem["category"][]).map((cat) => {
          const count = predictions.filter((p) => p.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                activeFilter === cat
                  ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
                  : "border-slate-600/50 bg-slate-800/50 text-slate-300 hover:border-emerald-400/40"
              }`}
            >
              {categoryLabels[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Prediction cards */}
      <div className="mt-5 space-y-3">
        {filtered.map((item) => {
          const config = verdictConfig[item.verdict];
          return (
            <article
              key={item.id}
              className={`rounded-xl border ${config.border} ${config.bg} p-4 shadow-lg ${config.glow}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}
                    >
                      {config.icon}
                    </span>
                    <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${categoryColors[item.category]}`}>
                      {categoryLabels[item.category]}
                    </span>
                    <span className={`text-xs font-semibold ${config.text}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-600/40 bg-slate-900/50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Prediktion (inför match)
                      </p>
                      <p className="mt-1 text-sm text-slate-200">{item.prediction}</p>
                    </div>
                    <div className="rounded-lg border border-slate-600/40 bg-slate-900/50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Vad hände
                      </p>
                      <p className="mt-1 text-sm text-slate-200">{item.outcome}</p>
                    </div>
                  </div>

                  {item.evidenceValue && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded border border-slate-500/40 bg-slate-800/60 px-2 py-1 text-xs font-mono text-slate-200">
                        {item.evidenceValue}
                      </span>
                      {item.evidenceLabel && (
                        <span className="text-[11px] text-slate-400">{item.evidenceLabel}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-5 text-xs text-slate-500">
        Bedömning baserad på jämförelse mellan förhandsanalysen (Kommande motståndare, omgång 8)
        och faktiskt matchutfall (Twelve match report + Bolldata).
      </p>
    </section>
  );
}
