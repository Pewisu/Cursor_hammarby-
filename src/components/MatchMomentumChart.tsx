"use client";

import type { MomentumGoal, MomentumPoint } from "@/lib/hackenRound16AnalysisData";

interface MatchMomentumChartProps {
  momentum: MomentumPoint[];
  goals: MomentumGoal[];
  homeTeam: string;
  awayTeam: string;
  /** Short label shown on the y-axis. Defaults to homeTeam */
  homeLabel?: string;
  awayLabel?: string;
  homeColor?: string;
  awayColor?: string;
  className?: string;
}

export function MatchMomentumChart({
  momentum,
  goals,
  homeTeam,
  awayTeam,
  homeLabel,
  awayLabel,
  homeColor = "#34d399",
  awayColor = "#94a3b8",
  className = "",
}: MatchMomentumChartProps) {
  const chartWidth = 800;
  const chartHeight = 220;
  const paddingLeft = 44;
  const paddingRight = 24;
  const paddingTop = 36;
  const paddingBottom = 32;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const midY = paddingTop + plotHeight / 2;

  const maxMinute = 90;
  const maxAbs = Math.max(...momentum.map((p) => Math.abs(p.value)), 1);

  function toX(minute: number) {
    return paddingLeft + (minute / maxMinute) * plotWidth;
  }

  function toY(value: number) {
    return midY - (value / maxAbs) * (plotHeight / 2);
  }

  const linePath = momentum
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.minute).toFixed(1)} ${toY(p.value).toFixed(1)}`)
    .join(" ");

  // Green fill above center (home dominance)
  const areaHome = `${momentum
    .map((p, i) => {
      const val = p.value > 0 ? p.value : 0;
      return `${i === 0 ? "M" : "L"} ${toX(p.minute).toFixed(1)} ${toY(val).toFixed(1)}`;
    })
    .join(" ")} L ${toX(maxMinute).toFixed(1)} ${midY.toFixed(1)} L ${toX(0).toFixed(1)} ${midY.toFixed(1)} Z`;

  // Opponent fill below center (away dominance)
  const areaAway = `${momentum
    .map((p, i) => {
      const val = p.value < 0 ? p.value : 0;
      return `${i === 0 ? "M" : "L"} ${toX(p.minute).toFixed(1)} ${toY(val).toFixed(1)}`;
    })
    .join(" ")} L ${toX(maxMinute).toFixed(1)} ${midY.toFixed(1)} L ${toX(0).toFixed(1)} ${midY.toFixed(1)} Z`;

  const hLabel = homeLabel ?? homeTeam.toUpperCase().slice(0, 3);
  const aLabel = awayLabel ?? awayTeam.toUpperCase().slice(0, 3);

  return (
    <div className={`overflow-hidden rounded-2xl border border-emerald-700/35 bg-[#1a2d26] ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 px-5 pt-5 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">
            Matchmomentum
          </p>
          <h3 className="mt-1 text-base font-bold text-white md:text-lg">
            Dominerande under hela 90 minuter
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Positiva värden = Hammarbys press och xT, negativa = Häckens. Härledd från Twelve xT per period.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-5 rounded-full" style={{ backgroundColor: homeColor }} />
            <span className="font-semibold text-neutral-200">{homeTeam}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-5 rounded-full" style={{ backgroundColor: awayColor }} />
            <span className="font-semibold text-neutral-400">{awayTeam}</span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto px-3 pb-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full min-w-[500px]"
          preserveAspectRatio="xMidYMid meet"
          aria-label={`Matchmomentum – ${homeTeam} vs ${awayTeam}`}
        >
          <defs>
            <linearGradient id="momHome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={homeColor} stopOpacity="0.45" />
              <stop offset="100%" stopColor={homeColor} stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="momAway" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={awayColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={awayColor} stopOpacity="0.04" />
            </linearGradient>
            {/* Glow filter for the momentum line */}
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Vertical grid lines at each 15-min mark */}
          {[0, 15, 30, 45, 60, 75, 90].map((m) => (
            <g key={m}>
              <line
                x1={toX(m)}
                y1={paddingTop}
                x2={toX(m)}
                y2={paddingTop + plotHeight}
                stroke="#2d4438"
                strokeWidth={m === 45 ? "1.5" : "1"}
                strokeDasharray={m === 45 ? "5 4" : "3 4"}
              />
              <text
                x={toX(m)}
                y={chartHeight - 6}
                textAnchor="middle"
                fill="#4b6657"
                fontSize="11"
                fontFamily="monospace"
              >
                {m === 45 ? "HT" : `${m}'`}
              </text>
            </g>
          ))}

          {/* Center baseline */}
          <line
            x1={paddingLeft}
            y1={midY}
            x2={paddingLeft + plotWidth}
            y2={midY}
            stroke="#3d6650"
            strokeWidth="1.5"
          />

          {/* y-axis labels */}
          <text
            x={paddingLeft - 6}
            y={paddingTop + 8}
            textAnchor="end"
            fill={homeColor}
            fontSize="10"
            fontWeight="bold"
          >
            {hLabel}
          </text>
          <text
            x={paddingLeft - 6}
            y={paddingTop + plotHeight - 2}
            textAnchor="end"
            fill={awayColor}
            fontSize="10"
            fontWeight="bold"
          >
            {aLabel}
          </text>

          {/* Area fills */}
          <path d={areaHome} fill="url(#momHome)" />
          <path d={areaAway} fill="url(#momAway)" />

          {/* Momentum line – glow effect */}
          <path
            d={linePath}
            fill="none"
            stroke={homeColor}
            strokeWidth="2"
            strokeOpacity="0.25"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
          />
          {/* Main line */}
          <path
            d={linePath}
            fill="none"
            stroke={homeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Goal markers */}
          {goals.map((g, i) => {
            const gColor = g.team === "hammarby" ? homeColor : awayColor;
            const x = toX(g.minute);
            const labelY = g.team === "hammarby" ? paddingTop - 4 : paddingTop + plotHeight + 16;
            return (
              <g key={i}>
                {/* Dashed vertical line */}
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={paddingTop + plotHeight}
                  stroke={gColor}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  strokeOpacity="0.75"
                />
                {/* Goal label */}
                <text
                  x={x}
                  y={labelY}
                  textAnchor="middle"
                  fill={gColor}
                  fontSize="10"
                  fontWeight="bold"
                >
                  ⚽ {g.label}
                </text>
                {/* Dot on the line */}
                <circle
                  cx={x}
                  cy={toY(momentum.find((p) => p.minute === g.minute)?.value ?? 0)}
                  r="5"
                  fill={gColor}
                  stroke="#1a2d26"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Period summary bar */}
      <div className="border-t border-emerald-700/20 px-5 py-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          xT per 15-minutersperiod
        </p>
        <div className="grid grid-cols-6 gap-1">
          {[
            { label: "0–15", hif: 0.17, hac: 0.16 },
            { label: "15–30", hif: 0.44, hac: 0.05 },
            { label: "30–HT", hif: 0.64, hac: 0.07 },
            { label: "45–60", hif: 0.23, hac: 0.09 },
            { label: "60–75", hif: 0.11, hac: 0.18 },
            { label: "75–FT", hif: 0.09, hac: 0.11 },
          ].map((period) => {
            const total = period.hif + period.hac;
            const hifPct = total > 0 ? (period.hif / total) * 100 : 50;
            const hifWins = period.hif > period.hac;
            return (
              <div key={period.label} className="flex flex-col items-center gap-1">
                <p className="text-[9px] font-semibold text-neutral-500">{period.label}</p>
                {/* Stacked bar */}
                <div className="relative h-16 w-full overflow-hidden rounded bg-[#232d27]">
                  {/* HIF bar from top */}
                  <div
                    className="absolute inset-x-0 top-0 rounded-t transition-all"
                    style={{
                      height: `${hifPct}%`,
                      backgroundColor: homeColor,
                      opacity: 0.7,
                    }}
                  />
                  {/* Häcken bar from bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-b transition-all"
                    style={{
                      height: `${100 - hifPct}%`,
                      backgroundColor: awayColor,
                      opacity: 0.5,
                    }}
                  />
                </div>
                <p className={`text-[10px] font-bold tabular-nums ${hifWins ? "text-emerald-300" : "text-slate-400"}`}>
                  {period.hif.toFixed(2)}
                </p>
                <p className="text-[10px] text-neutral-600 tabular-nums">{period.hac.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
