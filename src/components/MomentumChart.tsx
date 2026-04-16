"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

export function MomentumChart({ data }: Props) {
  const points = data.momentum;
  const chartWidth = 800;
  const chartHeight = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 30;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const midY = paddingTop + plotHeight / 2;

  const maxAbs = Math.max(...points.map((p) => Math.abs(p.value)));

  function toX(minute: number) {
    return paddingLeft + (minute / 90) * plotWidth;
  }

  function toY(value: number) {
    return midY - (value / maxAbs) * (plotHeight / 2);
  }

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.minute)} ${toY(p.value)}`)
    .join(" ");

  const areaPathAbove = points
    .map((p, i) => {
      const y = Math.min(toY(p.value), midY);
      return `${i === 0 ? "M" : "L"} ${toX(p.minute)} ${y}`;
    })
    .join(" ");

  const areaAbove = `${points.map((p, i) => {
    const val = p.value > 0 ? p.value : 0;
    return `${i === 0 ? "M" : "L"} ${toX(p.minute)} ${toY(val)}`;
  }).join(" ")} L ${toX(90)} ${midY} L ${toX(0)} ${midY} Z`;

  const areaBelow = `${points.map((p, i) => {
    const val = p.value < 0 ? p.value : 0;
    return `${i === 0 ? "M" : "L"} ${toX(p.minute)} ${toY(val)}`;
  }).join(" ")} L ${toX(90)} ${midY} L ${toX(0)} ${midY} Z`;

  const goalMinutes = data.xgTimeline
    .filter((s) => s.result === "goal")
    .map((s) => s.minute);

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.25s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        Matchmomentum
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Positiva värden = Sirius-press, negativa = Hammarby-press
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full min-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="momAbove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="momBelow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 15, 30, 45, 60, 75, 90].map((m) => (
            <g key={m}>
              <line
                x1={toX(m)}
                y1={paddingTop}
                x2={toX(m)}
                y2={paddingTop + plotHeight}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray={m === 45 ? "4 4" : "0"}
              />
              <text
                x={toX(m)}
                y={chartHeight - 5}
                textAnchor="middle"
                fill="#64748b"
                fontSize="11"
              >
                {m}&apos;
              </text>
            </g>
          ))}

          {/* Center line */}
          <line
            x1={paddingLeft}
            y1={midY}
            x2={paddingLeft + plotWidth}
            y2={midY}
            stroke="#475569"
            strokeWidth="1"
          />

          {/* Team labels */}
          <text
            x={paddingLeft - 5}
            y={paddingTop + 5}
            textAnchor="end"
            fill="#3b82f6"
            fontSize="10"
            fontWeight="bold"
          >
            SIR
          </text>
          <text
            x={paddingLeft - 5}
            y={paddingTop + plotHeight}
            textAnchor="end"
            fill="#22c55e"
            fontSize="10"
            fontWeight="bold"
          >
            HIF
          </text>

          {/* Area fills */}
          <path d={areaAbove} fill="url(#momAbove)" />
          <path d={areaBelow} fill="url(#momBelow)" />

          {/* Momentum line */}
          <path
            d={linePath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Goal markers */}
          {goalMinutes.map((m, i) => (
            <g key={i}>
              <line
                x1={toX(m)}
                y1={paddingTop}
                x2={toX(m)}
                y2={paddingTop + plotHeight}
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={toX(m)}
                y={paddingTop - 5}
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="10"
                fontWeight="bold"
              >
                ⚽ {m}&apos;
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
