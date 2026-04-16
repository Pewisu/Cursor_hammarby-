import type { Metadata } from "next";
import {
  hammarbyRunningMatches,
  type RunningMatchStat,
} from "@/lib/hammarbyRunningData";

export const metadata: Metadata = {
  title: "Hammarby löpdata | Allsvenskan 2026",
  description:
    "Löpmeter, maxhastighet och löpmeter per spelad minut för Hammarby-spelare i två Allsvenska matcher.",
};

type PlayerAggregate = {
  name: string;
  shirtNumber: number;
  position: string;
  totalDistanceMeters: number;
  totalMinutes: number;
  peakMaxSpeedKmh: number;
  matches: number;
  metersPerMinute: number;
};

function formatMeters(meters: number) {
  return `${meters.toLocaleString("sv-SE")} m`;
}

function formatKilometers(meters: number) {
  return `${(meters / 1000).toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} km`;
}

function aggregatePlayers(matches: RunningMatchStat[]): PlayerAggregate[] {
  const byPlayer = new Map<string, PlayerAggregate>();

  for (const match of matches) {
    for (const player of match.players) {
      const existing = byPlayer.get(player.name);

      if (existing) {
        existing.totalDistanceMeters += player.distanceMeters;
        existing.totalMinutes += player.minutesPlayed;
        existing.peakMaxSpeedKmh = Math.max(
          existing.peakMaxSpeedKmh,
          player.maxSpeedKmh
        );
        existing.matches += 1;
      } else {
        byPlayer.set(player.name, {
          name: player.name,
          shirtNumber: player.shirtNumber,
          position: player.position,
          totalDistanceMeters: player.distanceMeters,
          totalMinutes: player.minutesPlayed,
          peakMaxSpeedKmh: player.maxSpeedKmh,
          matches: 1,
          metersPerMinute: 0,
        });
      }
    }
  }

  const aggregated = Array.from(byPlayer.values());
  for (const player of aggregated) {
    player.metersPerMinute = player.totalDistanceMeters / player.totalMinutes;
  }

  return aggregated.sort((a, b) => b.totalDistanceMeters - a.totalDistanceMeters);
}

export default function Home() {
  const matches = hammarbyRunningMatches;
  const playerTotals = aggregatePlayers(matches);

  const overallDistance = matches.reduce(
    (sum, match) => sum + match.hammarbyTeamDistanceMeters,
    0
  );
  const overallMinutes = matches.reduce(
    (sum, match) => sum + match.hammarbyTeamMinutes,
    0
  );
  const overallMetersPerMinute = overallDistance / overallMinutes;
  const overallPeakSpeed = Math.max(
    ...matches.map((match) => match.hammarbyTopSpeedKmh)
  );

  const fastestPlayers = [...playerTotals]
    .sort((a, b) => b.peakMaxSpeedKmh - a.peakMaxSpeedKmh)
    .slice(0, 5);

  const highestTempoPlayers = [...playerTotals]
    .filter((player) => player.totalMinutes >= 20)
    .sort((a, b) => b.metersPerMinute - a.metersPerMinute)
    .slice(0, 5);

  const maxMatchDistance = Math.max(
    ...matches.map((match) => match.hammarbyTeamDistanceMeters)
  );

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-400">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">
              Löpdata per spelare (2 matcher)
            </h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: allsvenskan.se</p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Total löpsträcka</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatKilometers(overallDistance)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Snitt löpmeter/minut</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {overallMetersPerMinute.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Högsta maxhastighet</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {overallPeakSpeed.toFixed(2)} km/h
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Spelare i datan</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {playerTotals.length}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">Per match</h2>
          <p className="mt-1 text-sm text-slate-400">
            Totala löpmeter, maxhastighet och löpmeter/minut för Hammarby.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {matches.map((match) => {
              const metersPerMinute =
                match.hammarbyTeamDistanceMeters / match.hammarbyTeamMinutes;
              const distanceWidth =
                (match.hammarbyTeamDistanceMeters / maxMatchDistance) * 100;

              return (
                <article
                  key={match.matchId}
                  className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
                >
                  <p className="text-xs text-slate-400">
                    {match.round} • {match.date}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {match.homeTeam} - {match.awayTeam}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-slate-300">Löpsträcka</span>
                        <span className="font-medium text-white">
                          {formatMeters(match.hammarbyTeamDistanceMeters)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-700/70">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${distanceWidth}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-slate-800/90 p-3">
                        <p className="text-xs text-slate-400">Maxhastighet</p>
                        <p className="mt-1 font-semibold text-white">
                          {match.hammarbyTopSpeedKmh.toFixed(2)} km/h
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-800/90 p-3">
                        <p className="text-xs text-slate-400">Löpmeter/min</p>
                        <p className="mt-1 font-semibold text-white">
                          {metersPerMinute.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <a
                      href={match.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-xs text-blue-400 hover:text-blue-300"
                    >
                      Öppna matchkälla
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Per match och spelare
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Alla Hammarby-spelare med löpmeter, maxhastighet och löpmeter/minut
            i respektive match.
          </p>

          <div className="mt-5 space-y-6">
            {matches.map((match) => (
              <article
                key={`players-${match.matchId}`}
                className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60"
              >
                <div className="border-b border-slate-700/50 px-4 py-3">
                  <p className="text-xs text-slate-400">
                    {match.round} • {match.date}
                  </p>
                  <h3 className="text-sm font-semibold text-white">
                    {match.homeTeam} - {match.awayTeam}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-950/40 text-left text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Spelare</th>
                        <th className="px-4 py-3 text-right">Löpmeter</th>
                        <th className="px-4 py-3 text-right">Minuter</th>
                        <th className="px-4 py-3 text-right">Löpmeter/min</th>
                        <th className="px-4 py-3 text-right">Maxhastighet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.players.map((player) => (
                        <tr
                          key={`${match.matchId}-${player.name}`}
                          className="border-t border-slate-700/50 text-slate-200"
                        >
                          <td className="px-4 py-2.5">
                            <span className="font-medium text-white">
                              #{player.shirtNumber} {player.name}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right font-medium text-white">
                            {formatMeters(player.distanceMeters)}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {player.minutesPlayed.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {player.metersPerMinute.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {player.maxSpeedKmh.toFixed(2)} km/h
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">
              Snabbaste spelare (peak)
            </h2>
            <ul className="mt-4 space-y-2">
              {fastestPlayers.map((player) => (
                <li
                  key={player.name}
                  className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="text-slate-200">
                    #{player.shirtNumber} {player.name}
                  </span>
                  <span className="font-semibold text-white">
                    {player.peakMaxSpeedKmh.toFixed(2)} km/h
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6">
            <h2 className="text-lg font-semibold text-white">
              Högst tempo (m/min)
            </h2>
            <ul className="mt-4 space-y-2">
              {highestTempoPlayers.map((player) => (
                <li
                  key={player.name}
                  className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 text-sm"
                >
                  <span className="text-slate-200">
                    #{player.shirtNumber} {player.name}
                  </span>
                  <span className="font-semibold text-white">
                    {player.metersPerMinute.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80">
          <div className="border-b border-slate-700/50 p-6">
            <h2 className="text-lg font-semibold text-white">
              Totalt per spelare (alla matcherna)
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Löpmeter, maxhastighet och löpmeter per spelad minut.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Spelare</th>
                  <th className="px-4 py-3 text-right">Löpmeter</th>
                  <th className="px-4 py-3 text-right">Minuter</th>
                  <th className="px-4 py-3 text-right">Löpmeter/min</th>
                  <th className="px-4 py-3 text-right">Maxhastighet</th>
                  <th className="px-4 py-3 text-right">Matcher</th>
                </tr>
              </thead>
              <tbody>
                {playerTotals.map((player) => (
                  <tr
                    key={player.name}
                    className="border-t border-slate-700/50 text-slate-200"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">
                        #{player.shirtNumber} {player.name}
                      </div>
                      <div className="text-xs text-slate-400">{player.position}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-white">
                      {formatMeters(player.totalDistanceMeters)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {player.totalMinutes.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {player.metersPerMinute.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {player.peakMaxSpeedKmh.toFixed(2)} km/h
                    </td>
                    <td className="px-4 py-3 text-right">{player.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 text-xs leading-relaxed text-slate-400">
          <p>
            <strong className="text-slate-300">Metod:</strong> Löpmeter och
            maxhastighet är hämtade från matchlänkarna via samma datakälla.
            Spelade minuter är beräknade från startelva + byteshändelser med
            matchtid (inklusive stopptid), vilket möjliggör beräkning av
            löpmeter per spelad minut.
          </p>
        </footer>
      </main>
    </div>
  );
}
