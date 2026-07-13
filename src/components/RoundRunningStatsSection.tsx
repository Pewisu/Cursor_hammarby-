import type { RunningMatchStat } from "@/lib/hammarbyRunningData";
import { hammarbyTeamDistanceHistory } from "@/lib/hammarbyTeamDistanceHistoryData";

/**
 * The all-time highest single-match distance recorded in Allsvenskan since
 * GPS measurements started in 2024: Besfort Zeneli (IF Elfsborg), 2025 — 14 059 m.
 * Any player exceeding ELITE_SINGLE_MATCH_THRESHOLD is considered historically elite.
 */
const ALLSVENSKAN_RECORD_DISTANCE_M = 14059;
const ELITE_SINGLE_MATCH_THRESHOLD_M = 13800;

function formatMeters(meters: number) {
  return `${meters.toLocaleString("sv-SE")} m`;
}

function formatKilometers(meters: number) {
  return `${(meters / 1000).toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} km`;
}

function formatSpeed(kmh: number) {
  return `${kmh.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km/h`;
}

function formatMetersPerMinute(value: number) {
  return `${value.toLocaleString("sv-SE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} m/min`;
}

export function getRunningMatchForGameweek(
  matches: RunningMatchStat[],
  gameweek: number
): RunningMatchStat | null {
  return matches.find((match) => match.round === `Omgång ${gameweek}`) ?? null;
}

export function RoundRunningStatsSection({
  match,
  allDetailMatches,
}: {
  match: RunningMatchStat;
  allDetailMatches?: RunningMatchStat[];
}) {
  const sortedPlayers = [...match.players].sort(
    (left, right) => right.distanceMeters - left.distanceMeters
  );
  const averageMetersPerMinute =
    match.hammarbyTeamDistanceMeters / match.hammarbyTeamMinutes;

  const combinedSorted = [
    ...(allDetailMatches ?? [match]).map((m) => ({
      matchId: m.matchId,
      dist: m.hammarbyTeamDistanceMeters,
    })),
    ...hammarbyTeamDistanceHistory
      .filter((h) => !(allDetailMatches ?? [match]).some((m) => m.matchId === h.matchId))
      .map((h) => ({ matchId: h.matchId, dist: h.hammarbyTeamDistanceMeters })),
  ].sort((a, b) => b.dist - a.dist);

  const totalMatchCount = combinedSorted.length;
  const rankIndex = combinedSorted.findIndex((e) => e.matchId === match.matchId);
  const rank = rankIndex + 1;
  const rankLabel =
    rank === 1 ? "🥇 #1" : rank === 2 ? "🥈 #2" : rank === 3 ? "🥉 #3" : `#${rank}`;
  const rankColor =
    rank === 1
      ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-200"
      : rank === 2
      ? "border-slate-400/40 bg-slate-400/10 text-slate-200"
      : rank === 3
      ? "border-orange-500/50 bg-orange-500/15 text-orange-200"
      : rank <= 10
      ? "border-green-500/40 bg-green-500/10 text-green-200"
      : "border-slate-600/40 bg-slate-600/10 text-slate-300";

  return (
    <section className="rounded-2xl border border-green-500/25 bg-slate-800/80 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-green-300">
            Löpdata · Allsvenskan
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Löpmeter & maxhastighet i {match.round.toLowerCase()}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {match.homeTeam} – {match.awayTeam} · {match.date}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {rank > 0 && (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-bold ${rankColor}`}
              title={`Rankad ${rank} av ${totalMatchCount} kända Hammarby-matcher (2025–2026) efter lagets löpsträcka`}
            >
              {rankLabel}
              <span className="text-[11px] font-normal opacity-70">/ {totalMatchCount}</span>
            </span>
          )}
          <a
            href={match.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-green-500/35 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-200 hover:border-green-400/60 hover:bg-green-500/20"
          >
            Källa: allsvenskan.se ↗
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Lagets löpsträcka</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {formatKilometers(match.hammarbyTeamDistanceMeters)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {formatMeters(match.hammarbyTeamDistanceMeters)} totalt
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Snitt tempo</p>
          <p className="mt-1 text-2xl font-bold text-green-200">
            {formatMetersPerMinute(averageMetersPerMinute)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {match.matchDurationMinutes} min matchtid
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Högsta hastighet</p>
          <p className="mt-1 text-2xl font-bold text-emerald-200">
            {formatSpeed(match.hammarbyTopSpeedKmh)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Hammarbys topp i matchen</p>
        </div>
        {rank > 0 && (
          <div className={`rounded-xl border px-4 py-3 ${
            rank <= 3 ? "border-yellow-500/40 bg-yellow-500/8" : "border-slate-700/60 bg-slate-900/50"
          }`}>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Ranking löpsträcka</p>
            <p className={`mt-1 text-2xl font-bold ${rank <= 3 ? "text-yellow-200" : "text-white"}`}>
              {rankLabel}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              av {totalMatchCount} kända Hammarby-matcher (2025–2026)
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-700/60">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-700/60 bg-slate-950/70 text-slate-400">
              <th className="px-3 py-2 font-medium">Spelare</th>
              <th className="px-3 py-2 font-medium">Pos</th>
              <th className="px-3 py-2 font-medium">Löpmeter</th>
              <th className="px-3 py-2 font-medium">m/min</th>
              <th className="px-3 py-2 font-medium">Maxhastighet</th>
              <th className="px-3 py-2 font-medium">Min</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => {
              const isElite = player.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M;
              const pctOfRecord = Math.round(
                (player.distanceMeters / ALLSVENSKAN_RECORD_DISTANCE_M) * 100
              );
              return (
                <tr
                  key={`${player.shirtNumber}-${player.name}`}
                  className={`border-b last:border-b-0 ${
                    isElite
                      ? "border-amber-500/30 bg-amber-500/8 text-slate-100"
                      : "border-slate-800/80 text-slate-200"
                  }`}
                >
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`font-semibold ${isElite ? "text-amber-100" : "text-white"}`}>
                        {index + 1}. {player.name}
                      </span>
                      <span className="text-slate-500">#{player.shirtNumber}</span>
                      {isElite && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold leading-none text-amber-300">
                          🥈 {pctOfRecord}% av Allsvenskan-rekordet
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-400">{player.position}</td>
                  <td className={`px-3 py-2 font-mono font-semibold ${isElite ? "text-amber-300" : "text-green-200"}`}>
                    {formatMeters(player.distanceMeters)}
                  </td>
                  <td className="px-3 py-2 font-mono text-slate-200">
                    {formatMetersPerMinute(player.metersPerMinute)}
                  </td>
                  <td className="px-3 py-2 font-mono text-emerald-200">
                    {formatSpeed(player.maxSpeedKmh)}
                  </td>
                  <td className="px-3 py-2 text-slate-400">{player.minutesPlayed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedPlayers.some((p) => p.distanceMeters >= ELITE_SINGLE_MATCH_THRESHOLD_M) && (
        <p className="mt-3 text-[11px] text-slate-500">
          🥈 = bland de {ELITE_SINGLE_MATCH_THRESHOLD_M.toLocaleString("sv-SE")}+ m som uppmätts i Allsvenskan sedan GPS-mätningarna startade 2024. Allsvenskan-rekordet är {ALLSVENSKAN_RECORD_DISTANCE_M.toLocaleString("sv-SE")} m (Besfort Zeneli, Elfsborg, 2025).
        </p>
      )}
    </section>
  );
}
