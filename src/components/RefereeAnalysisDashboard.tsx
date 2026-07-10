"use client";

import Link from "next/link";
import {
  hammarbyRefereeMatches,
  calcDomarindex,
  calcFreeKickDiff,
  calcCardDiff,
  type RefereeMatchStats,
} from "@/lib/hammarbyRefereeData";

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  const months = [
    "jan", "feb", "mar", "apr", "maj", "jun",
    "jul", "aug", "sep", "okt", "nov", "dec",
  ];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
}

function IndexBar({ value, max }: { value: number; max: number }) {
  const isPositive = value >= 0;
  const pct = max > 0 ? Math.abs(value) / max : 0;
  const barWidth = `${Math.round(pct * 100)}%`;

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex h-5 w-40 items-center">
        <div className="absolute inset-0 flex">
          <div className="flex w-1/2 justify-end">
            {!isPositive && (
              <div
                className="h-full rounded-l bg-rose-500/80"
                style={{ width: barWidth }}
              />
            )}
          </div>
          <div className="flex w-1/2 justify-start">
            {isPositive && (
              <div
                className="h-full rounded-r bg-emerald-500/80"
                style={{ width: barWidth }}
              />
            )}
          </div>
        </div>
        <div className="absolute left-1/2 h-full w-px bg-slate-600" />
      </div>
      <span
        className={`w-8 text-right text-xs font-bold tabular-nums ${
          value > 0 ? "text-emerald-300" : value < 0 ? "text-rose-400" : "text-slate-400"
        }`}
      >
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );
}

function CardPip({ color }: { color: "yellow" | "red" }) {
  return (
    <span
      className={`inline-block h-3.5 w-2.5 rounded-sm border ${
        color === "yellow"
          ? "border-yellow-600 bg-yellow-400"
          : "border-red-700 bg-red-500"
      }`}
    />
  );
}

type MatchRow = {
  match: RefereeMatchStats;
  domarindex: number;
  freeKickDiff: number;
  cardDiff: number;
};

function buildRows(): MatchRow[] {
  return [...hammarbyRefereeMatches]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      match: m,
      domarindex: calcDomarindex(m),
      freeKickDiff: calcFreeKickDiff(m),
      cardDiff: calcCardDiff(m),
    }));
}

type RefereeAggregate = {
  referee: string;
  matches: MatchRow[];
  avgIndex: number;
  totalFreeKickDiff: number;
  totalCardDiff: number;
  hamTotalFK: number;
  oppTotalFK: number;
  hamTotalCards: number;
  oppTotalCards: number;
};

function buildRefereeAggregates(rows: MatchRow[]): RefereeAggregate[] {
  const map = new Map<string, MatchRow[]>();
  for (const row of rows) {
    const r = row.match.referee;
    if (!map.has(r)) map.set(r, []);
    map.get(r)!.push(row);
  }
  return Array.from(map.entries())
    .map(([referee, matches]) => {
      const avgIndex =
        matches.reduce((s, r) => s + r.domarindex, 0) / matches.length;
      const totalFreeKickDiff = matches.reduce((s, r) => s + r.freeKickDiff, 0);
      const totalCardDiff = matches.reduce((s, r) => s + r.cardDiff, 0);
      const hamTotalFK = matches.reduce((s, r) => s + r.match.hammarby.freeKicks, 0);
      const oppTotalFK = matches.reduce((s, r) => s + r.match.opponent.freeKicks, 0);
      const hamTotalCards =
        matches.reduce(
          (s, r) =>
            s + r.match.hammarby.yellowCards + r.match.hammarby.redCards * 2,
          0
        );
      const oppTotalCards =
        matches.reduce(
          (s, r) =>
            s + r.match.opponent.yellowCards + r.match.opponent.redCards * 2,
          0
        );
      return { referee, matches, avgIndex, totalFreeKickDiff, totalCardDiff, hamTotalFK, oppTotalFK, hamTotalCards, oppTotalCards };
    })
    .sort((a, b) => b.avgIndex - a.avgIndex);
}

export default function RefereeAnalysisDashboard() {
  const rows = buildRows();
  const refereeAggregates = buildRefereeAggregates(rows);
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.domarindex)), 1);
  const maxRefAbs = Math.max(
    ...refereeAggregates.map((r) => Math.abs(r.avgIndex)),
    1
  );

  const totalHamFK = rows.reduce((s, r) => s + r.match.hammarby.freeKicks, 0);
  const totalOppFK = rows.reduce((s, r) => s + r.match.opponent.freeKicks, 0);
  const totalHamY = rows.reduce((s, r) => s + r.match.hammarby.yellowCards, 0);
  const totalOppY = rows.reduce((s, r) => s + r.match.opponent.yellowCards, 0);
  const totalHamR = rows.reduce((s, r) => s + r.match.hammarby.redCards, 0);
  const totalOppR = rows.reduce((s, r) => s + r.match.opponent.redCards, 0);
  const totalIndex = rows.reduce((s, r) => s + r.domarindex, 0);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-400">
            <Link href="/matchstatistik" className="hover:text-blue-300">
              Matchstatistik
            </Link>
            <span className="text-slate-600">/</span>
            <span>Domaranalys</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Domarstatistik 2026
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Frisparkar för och emot samt gula och röda kort per match.{" "}
            <span className="font-medium text-emerald-300">Domarindex</span> =
            (Ham. frisparkar − Motst. frisparkar) + (Motst. kort − Ham. kort).
            Positivt = fördel Hammarby.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Källa: bolldata.se · omgång 1–11 + 15 · Allsvenskan 2026
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {/* Season summary */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Ham. frisparkar
            </p>
            <p className="mt-1 text-3xl font-black text-emerald-300">
              {totalHamFK}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Motst. {totalOppFK}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Ham. gula
            </p>
            <p className="mt-1 text-3xl font-black text-yellow-300">
              {totalHamY}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Motst. {totalOppY}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Ham. röda
            </p>
            <p className="mt-1 text-3xl font-black text-red-400">
              {totalHamR}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Motst. {totalOppR}</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Tot. domarindex
            </p>
            <p
              className={`mt-1 text-3xl font-black ${
                totalIndex > 0 ? "text-emerald-300" : "text-rose-400"
              }`}
            >
              {totalIndex > 0 ? `+${totalIndex}` : totalIndex}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">12 matcher</p>
          </div>
        </section>

        {/* Per-match chart + table */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h2 className="mb-4 text-base font-semibold text-white">
            Domarindex per match
          </h2>
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={row.match.key}
                className="grid items-center gap-x-3 gap-y-1 text-xs"
                style={{
                  gridTemplateColumns: "1.4rem 7rem 1fr auto",
                }}
              >
                <span className="text-right text-slate-500">
                  {row.match.gameweek}
                </span>
                <a
                  href={row.match.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-slate-300 hover:text-white"
                  title={row.match.matchName}
                >
                  {row.match.matchName.split(",")[0]}
                </a>
                <IndexBar value={row.domarindex} max={maxAbs} />
                <span className="hidden text-right text-slate-500 sm:block">
                  {row.match.referee.split(" ").slice(-1)[0]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Positiv stapel (grön) = nettofördel Hammarby. Negativ (röd) = nackdel.
          </p>
        </section>

        {/* Detailed match table */}
        <section className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/60">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700/50 text-left text-slate-400">
                <th className="px-3 py-3 font-medium">Ø</th>
                <th className="px-3 py-3 font-medium">Datum</th>
                <th className="px-3 py-3 font-medium">Match</th>
                <th className="px-3 py-3 font-medium">Domare</th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>
                  Frisparkar
                </th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>
                  Gula
                </th>
                <th className="px-3 py-3 text-center font-medium" colSpan={2}>
                  Röda
                </th>
                <th className="px-3 py-3 text-right font-medium">Index</th>
              </tr>
              <tr className="border-b border-slate-800 text-left text-slate-500">
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2" />
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center text-slate-500">Mot</th>
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center text-slate-500">Mot</th>
                <th className="px-3 pb-2 text-center text-emerald-500/70">Ham</th>
                <th className="px-3 pb-2 text-center text-slate-500">Mot</th>
                <th className="px-3 pb-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const idx = row.domarindex;
                return (
                  <tr
                    key={row.match.key}
                    className={`border-b border-slate-800/60 transition-colors hover:bg-slate-800/40 ${
                      i % 2 === 0 ? "bg-slate-900/20" : ""
                    }`}
                  >
                    <td className="px-3 py-2.5 text-slate-500">
                      {row.match.gameweek}
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">
                      {formatDate(row.match.date)}
                    </td>
                    <td className="px-3 py-2.5">
                      <a
                        href={row.match.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white"
                      >
                        {row.match.matchName}
                      </a>
                      {row.match.hammarby.isHome ? (
                        <span className="ml-1.5 rounded px-1 py-0.5 text-[10px] bg-emerald-900/40 text-emerald-400">H</span>
                      ) : (
                        <span className="ml-1.5 rounded px-1 py-0.5 text-[10px] bg-slate-700/60 text-slate-400">B</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">
                      {row.match.referee}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono font-semibold text-emerald-300">
                      {row.match.hammarby.freeKicks}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                      {row.match.opponent.freeKicks}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono font-semibold text-emerald-300">
                        {row.match.hammarby.yellowCards}
                      </span>
                      {row.match.hammarby.yellowCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.hammarby.yellowCards }).map((_, j) => (
                            <CardPip key={j} color="yellow" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono text-slate-400">
                        {row.match.opponent.yellowCards}
                      </span>
                      {row.match.opponent.yellowCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.opponent.yellowCards }).map((_, j) => (
                            <CardPip key={j} color="yellow" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono font-semibold text-emerald-300">
                        {row.match.hammarby.redCards}
                      </span>
                      {row.match.hammarby.redCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.hammarby.redCards }).map((_, j) => (
                            <CardPip key={j} color="red" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-mono text-slate-400">
                        {row.match.opponent.redCards}
                      </span>
                      {row.match.opponent.redCards > 0 && (
                        <span className="ml-1">
                          {Array.from({ length: row.match.opponent.redCards }).map((_, j) => (
                            <CardPip key={j} color="red" />
                          ))}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span
                        className={`font-mono font-bold ${
                          idx > 0
                            ? "text-emerald-300"
                            : idx < 0
                            ? "text-rose-400"
                            : "text-slate-400"
                        }`}
                      >
                        {idx > 0 ? `+${idx}` : idx}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-600/50 bg-slate-800/40 font-semibold">
                <td className="px-3 py-2.5 text-slate-400" colSpan={4}>
                  Totalt
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">
                  {totalHamFK}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                  {totalOppFK}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">
                  {totalHamY}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                  {totalOppY}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-emerald-300">
                  {totalHamR}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                  {totalOppR}
                </td>
                <td
                  className={`px-3 py-2.5 text-right font-mono font-black ${
                    totalIndex > 0 ? "text-emerald-300" : "text-rose-400"
                  }`}
                >
                  {totalIndex > 0 ? `+${totalIndex}` : totalIndex}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Per-referee chart */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h2 className="mb-1 text-base font-semibold text-white">
            Domarindex per domare (snitt)
          </h2>
          <p className="mb-4 text-xs text-slate-500">
            Sorterat från mest fördelaktig till mest ogynnsam för Hammarby.
            Domare med flera matcher visar genomsnitt.
          </p>
          <div className="space-y-3">
            {refereeAggregates.map((agg) => (
              <div key={agg.referee} className="space-y-1">
                <div
                  className="grid items-center gap-x-3 text-xs"
                  style={{ gridTemplateColumns: "9rem 1fr auto" }}
                >
                  <span className="truncate text-slate-200 font-medium">
                    {agg.referee}
                    {agg.matches.length > 1 && (
                      <span className="ml-1.5 text-slate-500">
                        ×{agg.matches.length}
                      </span>
                    )}
                  </span>
                  <IndexBar
                    value={parseFloat(agg.avgIndex.toFixed(1))}
                    max={maxRefAbs}
                  />
                  <span className="hidden text-right text-xs text-slate-500 sm:block">
                    FK {agg.hamTotalFK}–{agg.oppTotalFK} | Kort {agg.hamTotalCards}–{agg.oppTotalCards}
                  </span>
                </div>
                {agg.matches.length > 1 && (
                  <div className="ml-36 text-[10px] text-slate-600">
                    {agg.matches
                      .map(
                        (m) =>
                          `Ø${m.match.gameweek}: ${m.domarindex > 0 ? "+" : ""}${m.domarindex}`
                      )
                      .join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Note about freeKicks field */}
        <section className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4 text-xs text-slate-500">
          <p>
            <strong className="text-slate-400">Om frisparkar:</strong>{" "}
            &ldquo;Frisparkar&rdquo; i Bolldata avser direkta frisparksavslut och
            frisparkar i farliga lägen (set piece free kicks), inte totala friparkar från
            regelöverträdelser. Totala fouls per match visas i Bolldata under
            &ldquo;Fouls&rdquo;. Domarindex kombinerar frisparks­fördeln och
            kortfördeln i ett enda tal.
          </p>
        </section>
      </main>
    </div>
  );
}
