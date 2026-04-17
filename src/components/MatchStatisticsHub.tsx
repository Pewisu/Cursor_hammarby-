"use client";

import Link from "next/link";
import {
  hammarbyRoundMatchStats,
  type RoundMatchStats,
} from "@/lib/matchStatisticsOverviewData";

type MatchStatisticsHubProps = {
  mode: "combined" | "round";
  round?: number;
  rounds?: RoundMatchStats[];
};

type StatRow = {
  key: string;
  label: string;
  format: "number" | "percent" | "decimal";
  home: number;
  away: number;
};

type OverviewData = {
  id: string;
  title: string;
  subtitle: string;
  dateText: string;
  leftTeam: string;
  rightTeam: string;
  sourceUrl?: string;
  stats: StatRow[];
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatValue(
  value: number,
  format: "number" | "percent" | "decimal"
): string {
  if (format === "percent") return `${value}%`;
  if (format === "decimal") return value.toFixed(2);
  return value.toString();
}

function getBarWidth(left: number, right: number): number {
  const total = left + right;
  if (total === 0) return 50;
  return (left / total) * 100;
}

function buildStatRowsFromRound(round: RoundMatchStats): StatRow[] {
  const home = round.hammarby;
  const away = round.opponent;
  const homePassAccuracy = home.passes
    ? (home.passesSuccessful / home.passes) * 100
    : 0;
  const awayPassAccuracy = away.passes
    ? (away.passesSuccessful / away.passes) * 100
    : 0;

  return [
    { key: "goals", label: "Mål", format: "number", home: home.goals, away: away.goals },
    { key: "xg", label: "xG", format: "decimal", home: home.xg, away: away.xg },
    { key: "shots", label: "Avslut", format: "number", home: home.shots, away: away.shots },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: home.shotsOnTarget,
      away: away.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: home.possessionPercent,
      away: away.possessionPercent,
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: home.passes,
      away: away.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(homePassAccuracy),
      away: Math.round(awayPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: home.touchesInBox,
      away: away.touchesInBox,
    },
    { key: "corners", label: "Hörnor", format: "number", home: home.corners, away: away.corners },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: home.fouls,
      away: away.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: home.yellowCards,
      away: away.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: home.redCards,
      away: away.redCards,
    },
  ];
}

function buildRoundOverview(round: RoundMatchStats): OverviewData {
  return {
    id: round.key,
    title: `Omgång ${round.gameweek}`,
    subtitle: round.matchName,
    dateText: formatDate(round.date),
    leftTeam: round.hammarby.teamName,
    rightTeam: round.opponent.teamName,
    sourceUrl: round.sourceUrl,
    stats: buildStatRowsFromRound(round),
  };
}

function buildCombinedOverview(items: RoundMatchStats[]): OverviewData | null {
  if (items.length === 0) return null;

  const leftTeam = "Hammarby";
  const rightTeam = "Motståndare";
  const rounds = items.map((item) => item.gameweek).sort((a, b) => a - b);
  const matchCount = items.length;
  const dateRange =
    matchCount === 1
      ? formatDate(items[0].date)
      : `${formatDate(items[0].date)} - ${formatDate(items[items.length - 1].date)}`;

  const hammarby = items.reduce(
    (acc, match) => {
      acc.goals += match.hammarby.goals;
      acc.xg += match.hammarby.xg;
      acc.shots += match.hammarby.shots;
      acc.shotsOnTarget += match.hammarby.shotsOnTarget;
      acc.possession += match.hammarby.possessionPercent;
      acc.passes += match.hammarby.passes;
      acc.passesSuccessful += match.hammarby.passesSuccessful;
      acc.touchesInBox += match.hammarby.touchesInBox;
      acc.corners += match.hammarby.corners;
      acc.fouls += match.hammarby.fouls;
      acc.yellowCards += match.hammarby.yellowCards;
      acc.redCards += match.hammarby.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const opponents = items.reduce(
    (acc, match) => {
      acc.goals += match.opponent.goals;
      acc.xg += match.opponent.xg;
      acc.shots += match.opponent.shots;
      acc.shotsOnTarget += match.opponent.shotsOnTarget;
      acc.possession += match.opponent.possessionPercent;
      acc.passes += match.opponent.passes;
      acc.passesSuccessful += match.opponent.passesSuccessful;
      acc.touchesInBox += match.opponent.touchesInBox;
      acc.corners += match.opponent.corners;
      acc.fouls += match.opponent.fouls;
      acc.yellowCards += match.opponent.yellowCards;
      acc.redCards += match.opponent.redCards;
      return acc;
    },
    {
      goals: 0,
      xg: 0,
      shots: 0,
      shotsOnTarget: 0,
      possession: 0,
      passes: 0,
      passesSuccessful: 0,
      touchesInBox: 0,
      corners: 0,
      fouls: 0,
      yellowCards: 0,
      redCards: 0,
    }
  );

  const hammarbyPassAccuracy = hammarby.passes
    ? (hammarby.passesSuccessful / hammarby.passes) * 100
    : 0;
  const opponentsPassAccuracy = opponents.passes
    ? (opponents.passesSuccessful / opponents.passes) * 100
    : 0;

  const stats: StatRow[] = [
    {
      key: "goals",
      label: "Mål",
      format: "number",
      home: hammarby.goals,
      away: opponents.goals,
    },
    {
      key: "xg",
      label: "xG",
      format: "decimal",
      home: Number(hammarby.xg.toFixed(2)),
      away: Number(opponents.xg.toFixed(2)),
    },
    {
      key: "shots",
      label: "Avslut",
      format: "number",
      home: hammarby.shots,
      away: opponents.shots,
    },
    {
      key: "shotsOnTarget",
      label: "Skott på mål",
      format: "number",
      home: hammarby.shotsOnTarget,
      away: opponents.shotsOnTarget,
    },
    {
      key: "possession",
      label: "Bollinnehav",
      format: "percent",
      home: Math.round(hammarby.possession / matchCount),
      away: Math.round(opponents.possession / matchCount),
    },
    {
      key: "passes",
      label: "Passningar",
      format: "number",
      home: hammarby.passes,
      away: opponents.passes,
    },
    {
      key: "passAccuracy",
      label: "Passningsprocent",
      format: "percent",
      home: Math.round(hammarbyPassAccuracy),
      away: Math.round(opponentsPassAccuracy),
    },
    {
      key: "touchesInBox",
      label: "Bollkontakter i box",
      format: "number",
      home: hammarby.touchesInBox,
      away: opponents.touchesInBox,
    },
    {
      key: "corners",
      label: "Hörnor",
      format: "number",
      home: hammarby.corners,
      away: opponents.corners,
    },
    {
      key: "fouls",
      label: "Regelbrott",
      format: "number",
      home: hammarby.fouls,
      away: opponents.fouls,
    },
    {
      key: "yellowCards",
      label: "Gula kort",
      format: "number",
      home: hammarby.yellowCards,
      away: opponents.yellowCards,
    },
    {
      key: "redCards",
      label: "Röda kort",
      format: "number",
      home: hammarby.redCards,
      away: opponents.redCards,
    },
  ];

  return {
    id: "combined",
    title: "Kombinerat (alla spelade omgångar)",
    subtitle: `${leftTeam} vs ${rightTeam} • Omgång ${rounds.join(", ")}`,
    dateText: dateRange,
    leftTeam,
    rightTeam,
    sourceUrl: "https://bolldata.se/",
    stats,
  };
}

export function MatchStatisticsHub({ mode, round, rounds }: MatchStatisticsHubProps) {
  const sourceRounds = rounds ?? hammarbyRoundMatchStats;
  const sortedMatches = [...sourceRounds].sort((a, b) => a.gameweek - b.gameweek);

  const roundOverview =
    mode === "round"
      ? (() => {
          const selectedRound = sortedMatches.find((item) => item.gameweek === round);
          return selectedRound ? buildRoundOverview(selectedRound) : null;
        })()
      : null;
  const combinedOverview = mode === "combined" ? buildCombinedOverview(sortedMatches) : null;
  const current = mode === "combined" ? combinedOverview : roundOverview;

  const navItems = [
    { href: "/matchstatistik", label: "Kombinerat", active: mode === "combined" },
    ...sortedMatches.map((item) => ({
      href: `/matchstatistik/omgang/${item.gameweek}`,
      label: `Omgång ${item.gameweek}`,
      active: mode === "round" && round === item.gameweek,
    })),
  ];

  if (!current || current.stats.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-slate-300">Ingen matchstatistik tillgänglig för detta val.</p>
          <Link href="/" className="mt-4 inline-flex text-sm text-blue-300 hover:text-blue-200">
            ← Till startsidan
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Matchstatistik</p>
          <h1 className="text-2xl font-bold text-white">{current.title}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {current.subtitle} • {current.dateText}
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                item.active
                  ? "border-blue-500/40 bg-blue-500/20 text-blue-200"
                  : "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-slate-600">•</span>
          <Link href="/lopdata" className="text-xs text-green-300 hover:text-green-200">
            Löpdata
          </Link>
          <Link href="/lopdata/trender" className="text-xs text-purple-300 hover:text-purple-200">
            Spelartrender
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
            Startsida
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.leftTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.home ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">{current.rightTeam}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.stats.find((stat) => stat.key === "goals")?.away ?? 0}
            </p>
            <p className="text-xs text-slate-500">Mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby xG</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {(
                current.leftTeam === "Hammarby"
                  ? current.stats.find((stat) => stat.key === "xg")?.home
                  : current.stats.find((stat) => stat.key === "xg")?.away
              )?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-xs text-slate-500">Förväntade mål</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Hammarby bollinnehav</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current.leftTeam === "Hammarby"
                ? `${current.stats.find((stat) => stat.key === "possession")?.home ?? 0}%`
                : `${current.stats.find((stat) => stat.key === "possession")?.away ?? 0}%`}
            </p>
            <p className="text-xs text-slate-500">Andel av boll</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Nyckeltal</h2>
          <p className="mt-1 text-sm text-slate-400">
            Jämförelse per lag med fokus på målproduktion, passningsspel och defensiv disciplin.
          </p>
          <div className="mt-5 space-y-4">
            {current.stats.map((stat) => {
              const leftWidth = getBarWidth(stat.home, stat.away);
              const rightWidth = 100 - leftWidth;
              return (
                <div key={stat.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-blue-200">
                      {formatValue(stat.home, stat.format)}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </span>
                    <span className="font-mono text-green-200">
                      {formatValue(stat.away, stat.format)}
                    </span>
                  </div>
                  <div className="flex h-3 gap-1 rounded-full bg-slate-700/60">
                    <div
                      className="rounded-l-full"
                      style={{
                        width: `${leftWidth}%`,
                        background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                      }}
                    />
                    <div
                      className="rounded-r-full"
                      style={{
                        width: `${rightWidth}%`,
                        background: "linear-gradient(90deg, #16a34a, #4ade80)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            Datakälla:{" "}
            <a
              href={current.sourceUrl ?? "https://bolldata.se/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200"
            >
              bolldata.se
            </a>
            . Kombinerat-läget summerar räknetal (mål, avslut, passningar osv.) och
            använder snitt för procenttal.
          </p>
        </footer>
      </main>
    </div>
  );
}
