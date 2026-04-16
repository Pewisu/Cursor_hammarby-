"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

export function XgTimeline({ data }: Props) {
  const shots = data.xgTimeline;

  let homeCumulative = 0;
  let awayCumulative = 0;

  const cumulativeData: {
    minute: number;
    homeXg: number;
    awayXg: number;
  }[] = [{ minute: 0, homeXg: 0, awayXg: 0 }];

  shots
    .sort((a, b) => a.minute - b.minute)
    .forEach((shot) => {
      if (shot.team === "home") homeCumulative += shot.xg;
      else awayCumulative += shot.xg;
      cumulativeData.push({
        minute: shot.minute,
        homeXg: homeCumulative,
        awayXg: awayCumulative,
      });
    });

  cumulativeData.push({
    minute: 90,
    homeXg: homeCumulative,
    awayXg: awayCumulative,
  });

  const maxXg = Math.max(homeCumulative, awayCumulative) * 1.15;

  const chartWidth = 800;
  const chartHeight = 250;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  function toX(minute: number) {
    return paddingLeft + (minute / 90) * plotWidth;
  }
  function toY(xg: number) {
    return paddingTop + plotHeight - (xg / maxXg) * plotHeight;
  }

  function buildPath(key: "homeXg" | "awayXg") {
    return cumulativeData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.minute)} ${toY(d[key])}`)
      .join(" ");
  }

  function buildArea(key: "homeXg" | "awayXg") {
    const linePath = cumulativeData
      .map(
        (d, i) => `${i === 0 ? "M" : "L"} ${toX(d.minute)} ${toY(d[key])}`
      )
      .join(" ");
    return `${linePath} L ${toX(90)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;
  }

  const goalEvents = shots.filter((s) => s.result === "goal");

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.2s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        Kumulativ xG över tid
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Förväntade mål ackumulerat under matchens gång
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full min-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="homeGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient
              id="awayGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
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

          {/* Y-axis labels */}
          {[0, 0.5, 1.0, 1.5].filter(v => v <= maxXg).map((v) => (
            <g key={v}>
              <line
                x1={paddingLeft}
                y1={toY(v)}
                x2={paddingLeft + plotWidth}
                y2={toY(v)}
                stroke="#334155"
                strokeWidth="0.5"
              />
              <text
                x={paddingLeft - 8}
                y={toY(v) + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="10"
              >
                {v.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Area fills */}
          <path d={buildArea("homeXg")} fill="url(#homeGrad)" />
          <path d={buildArea("awayXg")} fill="url(#awayGrad)" />

          {/* Lines */}
          <path
            d={buildPath("homeXg")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d={buildPath("awayXg")}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Goal markers */}
          {goalEvents.map((g, i) => {
            const cumHome = cumulativeData.find(
              (d) => d.minute >= g.minute
            )?.homeXg ?? 0;
            const cumAway = cumulativeData.find(
              (d) => d.minute >= g.minute
            )?.awayXg ?? 0;
            const isHome = g.team === "home";
            const cx = toX(g.minute);
            const cy = toY(isHome ? cumHome : cumAway);

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={isHome ? "#3b82f6" : "#22c55e"}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  MÅL {g.minute}&apos;
                </text>
              </g>
            );
          })}

          {/* End labels */}
          <text
            x={toX(90) + 5}
            y={toY(homeCumulative) + 4}
            fill="#3b82f6"
            fontSize="11"
            fontWeight="bold"
          >
            {homeCumulative.toFixed(2)}
          </text>
          <text
            x={toX(90) + 5}
            y={toY(awayCumulative) + 4}
            fill="#22c55e"
            fontSize="11"
            fontWeight="bold"
          >
            {awayCumulative.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-slate-300">{data.home.shortName}</span>
          <span className="text-blue-400 font-mono font-semibold">
            {homeCumulative.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-300">{data.away.shortName}</span>
          <span className="text-green-400 font-mono font-semibold">
            {awayCumulative.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
