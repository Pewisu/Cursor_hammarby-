import fs from "node:fs";
import path from "node:path";

const SEASON = "2026";
const API_BASE = "https://bolldata.se/api";
const OUT_PATH = path.resolve(
  process.cwd(),
  "src/lib/hammarbyPlayerTrendData.ts"
);

function pct(successful, total) {
  if (!total) return 0;
  return Math.round((successful / total) * 10000) / 100;
}

function toNumber(value, decimals = 3) {
  const numeric = Number(value ?? 0);
  return Number(numeric.toFixed(decimals));
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

function buildTypeScriptFile(serializedMatches) {
  return `export interface PlayerTrendMetrics {
  passes: number;
  passAccuracy: number;
  forwardPasses: number;
  forwardPassAccuracy: number;
  passesToFinalThird: number;
  finalThirdPassAccuracy: number;
  keyPasses: number;
  xA: number;
  shots: number;
  shotsOnTarget: number;
  xG: number;
  touchesInBox: number;
  dribbles: number;
  dribbleSuccess: number;
  defensiveDuels: number;
  defensiveDuelWinRate: number;
  aerialDuels: number;
  aerialDuelWinRate: number;
  recoveries: number;
}

export interface PlayerTrendMatchPlayer {
  playerId: number;
  playerName: string;
  roleName: string;
  minutes: number;
  metrics: PlayerTrendMetrics;
}

export interface PlayerTrendMatch {
  matchId: number;
  gameweek: number;
  date: string;
  name: string;
  players: PlayerTrendMatchPlayer[];
}

export const hammarbyPlayerTrendMatches: PlayerTrendMatch[] = ${JSON.stringify(
    serializedMatches,
    null,
    2
  )};
`;
}

async function main() {
  const seasonMatches = await fetchJson(
    `${API_BASE}/matches?season_name=${encodeURIComponent(SEASON)}`
  );

  const playedHammarbyMatches = (seasonMatches["hydra:member"] ?? [])
    .filter(
      (match) =>
        typeof match.Name === "string" &&
        match.Name.includes("Hammarby") &&
        match.isPlayed
    )
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

  const transformedMatches = [];

  for (const match of playedHammarbyMatches) {
    const playersResponse = await fetchJson(
      `${API_BASE}/matches/player/stats?id=${match.id}`
    );

    const players = (playersResponse["hydra:member"] ?? [])
      .filter((row) => row?.PlayerTeam?.Team?.Name === "Hammarby")
      .map((row) => {
        const player = row.PlayerTeam?.player ?? {};
        const role = player.roleName ?? "Unknown";
        return {
          playerId: player.id ?? -1,
          playerName: player.Name ?? "Unknown",
          roleName: role,
          minutes: row.minutesOnField ?? 0,
          metrics: {
            passes: row.passes ?? 0,
            passAccuracy: pct(row.successfulPasses ?? 0, row.passes ?? 0),
            forwardPasses: row.forwardPasses ?? 0,
            forwardPassAccuracy: pct(
              row.successfulForwardPasses ?? 0,
              row.forwardPasses ?? 0
            ),
            passesToFinalThird: row.passesToFinalThird ?? 0,
            finalThirdPassAccuracy: pct(
              row.successfulPassesToFinalThird ?? 0,
              row.passesToFinalThird ?? 0
            ),
            keyPasses: row.keyPasses ?? 0,
            xA: toNumber(row.xgAssist, 3),
            shots: row.shots ?? 0,
            shotsOnTarget: row.shotsOnTarget ?? 0,
            xG: toNumber(row.xgShot, 3),
            touchesInBox: row.touchInBox ?? 0,
            dribbles: row.dribbles ?? 0,
            dribbleSuccess: pct(row.successfulDribbles ?? 0, row.dribbles ?? 0),
            defensiveDuels: row.defensiveDuels ?? 0,
            defensiveDuelWinRate: pct(
              row.defensiveDuelsWon ?? 0,
              row.defensiveDuels ?? 0
            ),
            aerialDuels: row.aerialDuels ?? 0,
            aerialDuelWinRate: pct(
              row.aerialDuelsWon ?? 0,
              row.aerialDuels ?? 0
            ),
            recoveries: row.recoveries ?? 0,
          },
        };
      })
      .sort((a, b) => a.playerName.localeCompare(b.playerName, "sv"));

    transformedMatches.push({
      matchId: match.id,
      gameweek: match.gameweek,
      date: String(match.Date).slice(0, 10),
      name: match.Name,
      players,
    });
  }

  fs.writeFileSync(OUT_PATH, buildTypeScriptFile(transformedMatches), "utf8");
  console.log(
    `Synced ${transformedMatches.length} matches to ${path.relative(
      process.cwd(),
      OUT_PATH
    )}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
