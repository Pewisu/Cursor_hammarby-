"use client";

import { useMemo, useState } from "react";
import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";

const SPIDER_CENTER_X = 190;
const SPIDER_CENTER_Y = 165;
const SPIDER_RADIUS = 110;
const SPIDER_LABEL_RADIUS = 132;
const SPIDER_RING_STEPS = [20, 40, 60, 80, 100];

const spiderShortLabels: Record<string, string> = {
  "Lyckade anfallsaktioner / match": "Anfallsaktioner",
  "Mål / match": "Mål",
  "Gjorda mål (totalt)": "Gjorda mål",
  "xG / match": "xG",
  "Avslut / match": "Avslut",
  "Skott på mål / match": "Skott på mål",
  "Lyckade defensiva aktioner / match": "Def. aktioner",
  "Duellvinster / match": "Duellvinster",
  "Återerövringar / match": "Återerövringar",
  "Hållna nollor (%)": "Hållna nollor",
  "Bollinnehav (%)": "Bollinnehav",
  "Framåtpassningar / match": "Framåtpassningar",
};

function getSpiderPoint(index: number, total: number, score: number, radius: number) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const scaledRadius = (score / 100) * radius;

  return {
    x: SPIDER_CENTER_X + Math.cos(angle) * scaledRadius,
    y: SPIDER_CENTER_Y + Math.sin(angle) * scaledRadius,
    angle,
  };
}

function getSpiderLabelAnchor(angle: number): "start" | "middle" | "end" {
  const cosValue = Math.cos(angle);
  if (cosValue > 0.35) return "start";
  if (cosValue < -0.35) return "end";
  return "middle";
}

function getSpiderLabelDy(angle: number) {
  const sinValue = Math.sin(angle);
  if (sinValue < -0.6) return -6;
  if (sinValue > 0.6) return 10;
  return 3;
}

interface SpiderComparisonChartProps {
  axes: SpiderComparisonAxis[];
  opponentLabel?: string;
}

export default function SpiderComparisonChart({ axes, opponentLabel = "Motståndare" }: SpiderComparisonChartProps) {
  const [activeAxisIndex, setActiveAxisIndex] = useState(0);

  const {
    ringPolygons,
    hammarbyPoints,
    opponentPoints,
    hammarbyPolygonPoints,
    opponentPolygonPoints,
    axisCount,
  } = useMemo(() => {
    const currentAxisCount = axes.length;
    const currentRingPolygons = SPIDER_RING_STEPS.map((step) =>
      axes
        .map((_, index) => getSpiderPoint(index, currentAxisCount, step, SPIDER_RADIUS))
        .map((point) => `${point.x},${point.y}`)
        .join(" "),
    );
    const currentHammarbyPoints = axes.map((axis, index) =>
      getSpiderPoint(index, currentAxisCount, axis.hammarbyScore, SPIDER_RADIUS),
    );
    const currentOpponentPoints = axes.map((axis, index) =>
      getSpiderPoint(index, currentAxisCount, axis.opponentScore, SPIDER_RADIUS),
    );

    return {
      ringPolygons: currentRingPolygons,
      hammarbyPoints: currentHammarbyPoints,
      opponentPoints: currentOpponentPoints,
      hammarbyPolygonPoints: currentHammarbyPoints
        .map((point) => `${point.x},${point.y}`)
        .join(" "),
      opponentPolygonPoints: currentOpponentPoints
        .map((point) => `${point.x},${point.y}`)
        .join(" "),
      axisCount: currentAxisCount,
    };
  }, [axes]);

  const activeAxis = axes[activeAxisIndex];

  return (
    <>
      <p className="mt-1 text-xs text-emerald-200/85">
        Tryck på etiketter/punkter eller snabbknapparna för att byta mätvärde i grafen.
      </p>
      <article className="mt-3 rounded-lg border border-slate-600/60 bg-white/5 p-3">
        <div className="rounded border border-slate-600/70 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
          <p className="font-semibold uppercase tracking-wide text-slate-100">
            {activeAxis.label}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-100">
              HIF {activeAxis.hammarbyValue}
            </span>
            <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-100">
              {opponentLabel} {activeAxis.opponentValue}
            </span>
          </div>
        </div>

        <div className="mt-2 overflow-x-auto">
          <svg
            viewBox="0 0 380 340"
            className="mx-auto h-[320px] w-full min-w-[320px]"
            role="img"
            aria-label={`Radarjämförelse mellan Hammarby och ${opponentLabel}`}
          >
            {ringPolygons.map((points, index) => {
              const isOuterRing = index === ringPolygons.length - 1;

              return (
                <polygon
                  key={`ring-${SPIDER_RING_STEPS[index]}`}
                  points={points}
                  fill={isOuterRing ? "rgba(248, 250, 252, 0.04)" : "none"}
                  stroke={
                    isOuterRing ? "rgba(241, 245, 249, 0.85)" : "rgba(148, 163, 184, 0.35)"
                  }
                  strokeWidth={isOuterRing ? 2 : 1}
                />
              );
            })}

            {axes.map((axis, index) => {
              const outerPoint = getSpiderPoint(index, axisCount, 100, SPIDER_RADIUS);
              const labelPoint = getSpiderPoint(index, axisCount, 100, SPIDER_LABEL_RADIUS);
              const isActive = activeAxisIndex === index;

              return (
                <g key={axis.label}>
                  <line
                    x1={SPIDER_CENTER_X}
                    y1={SPIDER_CENTER_Y}
                    x2={outerPoint.x}
                    y2={outerPoint.y}
                    stroke={isActive ? "rgba(250, 204, 21, 0.7)" : "rgba(148, 163, 184, 0.35)"}
                    strokeWidth={isActive ? 1.5 : 1}
                  />
                  <circle
                    cx={outerPoint.x}
                    cy={outerPoint.y}
                    r={7}
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveAxisIndex(index)}
                  />
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    fontSize={9}
                    fill={isActive ? "rgb(254 240 138)" : "rgb(203 213 225)"}
                    textAnchor={getSpiderLabelAnchor(labelPoint.angle)}
                    dy={getSpiderLabelDy(labelPoint.angle)}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveAxisIndex(index)}
                  >
                    {spiderShortLabels[axis.label] ?? axis.label}
                  </text>
                </g>
              );
            })}

            <polygon
              points={opponentPolygonPoints}
              fill="rgba(251, 191, 36, 0.18)"
              stroke="rgba(253, 224, 71, 0.9)"
              strokeWidth={2}
            />
            <polygon
              points={hammarbyPolygonPoints}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="rgba(52, 211, 153, 0.95)"
              strokeWidth={2}
            />

            {axes.map((axis, index) => {
              const opponentPoint = opponentPoints[index];
              const hammarbyPoint = hammarbyPoints[index];
              const isActive = activeAxisIndex === index;

              return (
                <g key={`axis-points-${axis.label}`}>
                  <circle
                    cx={opponentPoint.x}
                    cy={opponentPoint.y}
                    r={isActive ? 4 : 2.5}
                    fill="rgb(253 224 71)"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveAxisIndex(index)}
                  />
                  <circle
                    cx={hammarbyPoint.x}
                    cy={hammarbyPoint.y}
                    r={isActive ? 4 : 2.5}
                    fill="rgb(52 211 153)"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveAxisIndex(index)}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <div className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Hammarby
          </div>
          <div className="inline-flex items-center gap-1.5 rounded border border-amber-400/35 bg-amber-400/10 px-2 py-1">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            {opponentLabel}
          </div>
        </div>
      </article>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2">
          {axes.map((axis, index) => {
            const isActive = activeAxisIndex === index;
            return (
              <button
                key={`chip-${axis.label}`}
                type="button"
                onClick={() => setActiveAxisIndex(index)}
                className={`rounded border px-2 py-1 text-[11px] transition-colors ${
                  isActive
                    ? "border-emerald-300/70 bg-emerald-500/15 text-emerald-100"
                    : "border-slate-500/50 bg-slate-700/30 text-slate-200 hover:border-emerald-300/60 hover:text-white"
                }`}
              >
                {spiderShortLabels[axis.label] ?? axis.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <div className="rounded-lg border border-slate-600/60 bg-white/5 p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">
              {activeAxis.label}
            </p>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-100">
                HIF {activeAxis.hammarbyValue}
              </span>
              <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-100">
                {opponentLabel} {activeAxis.opponentValue}
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-400">{activeAxis.note}</p>
        </div>
      </div>
    </>
  );
}
