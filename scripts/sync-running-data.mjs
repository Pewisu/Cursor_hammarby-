import fs from "node:fs";
import path from "node:path";

const API_BASE = "https://bolldata.se/api";
const SEASON = "2026";
const DEFAULT_MATCH_ID = Number(process.env.MATCH_ID ?? "6529847");
const DEFAULT_MATCH_SLUG = process.env.MATCH_SLUG ?? "hammarby-mot-orgryte-is";
const TARGET_TEAM_NAME = "Hammarby";
const OUT_PATH = path.resolve(process.cwd(), "src/lib/hammarbyRunningData.ts");
const SHOULD_WRITE = process.argv.includes("--write");

const PLAYER_DISTANCE_KEYS = [
  "distanceMeters",
  "distance_covered_m",
  "distanceCoveredMeters",
  "distanceCovered",
  "distance",
  "runDistance",
  "totalDistance",
];

const PLAYER_SPEED_KEYS = [
  "maxSpeedKmh",
  "topSpeedKmh",
  "topSpeed",
  "maxSpeed",
  "peakSpeed",
];

const PLAYER_MINUTES_KEYS = ["minutesOnField", "minutesPlayed", "minutes"];

const PLAYER_RUNNING_ENDPOINTS = [
  "matches/player/running/stats",
  "matches/running/player/stats",
  "matches/player/physical/stats",
  "matches/player/gps/stats",
  "matches/player/tracking/stats",
  "matches/player/load/stats",
  // Fallback in case running values are added here later.
  "matches/player/stats",
];

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function getFirstNumericValue(source, keys) {
  for (const key of keys) {
    const value = toNumber(source?.[key]);
    if (value !== null) return value;
  }
  return null;
}

function extractArrayLiteral(fileContents, exportName) {
  const exportToken = `export const ${exportName}`;
  const exportIndex = fileContents.indexOf(exportToken);
  if (exportIndex === -1) {
    throw new Error(`Could not locate export "${exportName}" in running data file.`);
  }
  const arrayStart = fileContents.indexOf("[", exportIndex);
  const arrayEnd = fileContents.lastIndexOf("];");
  if (arrayStart === -1 || arrayEnd === -1 || arrayEnd <= arrayStart) {
    throw new Error(`Could not parse array for export "${exportName}".`);
  }
  const arrayLiteral = fileContents.slice(arrayStart, arrayEnd + 1);
  return Function(`"use strict"; return (${arrayLiteral});`)();
}

function parseTeamsFromMatchName(matchName) {
  const [matchPart] = String(matchName ?? "").split(",");
  const [homeTeam, awayTeam] = matchPart
    .split(" - ")
    .map((value) => value.trim())
    .filter(Boolean);
  return {
    homeTeam: homeTeam ?? "Hammarby",
    awayTeam: awayTeam ?? "Okänd",
  };
}

function formatDateSv(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return String(dateInput);
  return date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function parseDurationToMinutes(totalTimeValue, fallbackMinutes) {
  const raw = String(totalTimeValue ?? "").trim();
  const parts = raw.split(":").map((value) => Number(value));
  if (parts.length === 2 && parts.every(Number.isFinite)) {
    return Number((parts[0] + parts[1] / 60).toFixed(2));
  }
  if (parts.length === 3 && parts.every(Number.isFinite)) {
    return Number((parts[0] * 60 + parts[1] + parts[2] / 60).toFixed(2));
  }
  return fallbackMinutes;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!response.ok) return null;
  return response.json();
}

async function fetchCollection(endpoint, id) {
  const payload = await fetchJson(`${API_BASE}/${endpoint}?id=${id}`);
  return payload?.["hydra:member"] ?? [];
}

function normalizeRunningPlayerRows(rows) {
  return rows
    .map((row) => {
      const player = row?.PlayerTeam?.player ?? {};
      const teamName = row?.PlayerTeam?.Team?.Name ?? "";
      const distanceMeters = getFirstNumericValue(row, PLAYER_DISTANCE_KEYS);
      const maxSpeedKmh = getFirstNumericValue(row, PLAYER_SPEED_KEYS);
      const minutesPlayed = getFirstNumericValue(row, PLAYER_MINUTES_KEYS);
      return {
        teamName,
        name: player.Name ?? "Unknown",
        shirtNumber:
          toNumber(player.number) ??
          toNumber(player.shirtNumber) ??
          toNumber(player.shirtNo) ??
          -1,
        position: player.roleName ?? "Unknown",
        distanceMeters,
        maxSpeedKmh,
        minutesPlayed,
      };
    })
    .filter((row) => row.teamName === TARGET_TEAM_NAME);
}

function hasUsefulRunningMetrics(rows) {
  const withDistance = rows.filter((row) => row.distanceMeters !== null).length;
  const withSpeed = rows.filter((row) => row.maxSpeedKmh !== null).length;
  const withMinutes = rows.filter((row) => row.minutesPlayed !== null).length;
  return withDistance >= 8 && withSpeed >= 8 && withMinutes >= 8;
}

async function resolveRunningRows(matchApiId) {
  for (const endpoint of PLAYER_RUNNING_ENDPOINTS) {
    const rows = await fetchCollection(endpoint, matchApiId);
    if (rows.length === 0) continue;
    const normalized = normalizeRunningPlayerRows(rows);
    if (hasUsefulRunningMetrics(normalized)) {
      return { endpoint, rows: normalized };
    }
  }
  return null;
}

function buildTypeScriptFile(serializedMatches) {
  return `export interface RunningPlayerStat {
  name: string;
  shirtNumber: number;
  position: string;
  distanceMeters: number;
  maxSpeedKmh: number;
  minutesPlayed: number;
  metersPerMinute: number;
}

export interface RunningMatchStat {
  matchId: number;
  round: string;
  date: string;
  sourceUrl: string;
  homeTeam: string;
  awayTeam: string;
  hammarbyWasHome: boolean;
  matchDurationMinutes: number;
  hammarbyTeamDistanceMeters: number;
  hammarbyTeamMinutes: number;
  hammarbyTopSpeedKmh: number;
  players: RunningPlayerStat[];
}

export const hammarbyRunningMatches: RunningMatchStat[] = ${JSON.stringify(
    serializedMatches,
    null,
    2
  )};
`;
}

function upsertMatch(existingMatches, nextMatch) {
  const matchIndex = existingMatches.findIndex((match) => match.matchId === nextMatch.matchId);
  if (matchIndex >= 0) {
    existingMatches[matchIndex] = nextMatch;
  } else {
    existingMatches.push(nextMatch);
  }
  return existingMatches.sort((a, b) => {
    const aRound = Number(String(a.round ?? "").replace(/[^\d]/g, "")) || 0;
    const bRound = Number(String(b.round ?? "").replace(/[^\d]/g, "")) || 0;
    return aRound - bRound;
  });
}

async function main() {
  const seasonMatchesPayload = await fetchJson(
    `${API_BASE}/matches?season_name=${encodeURIComponent(SEASON)}`
  );
  if (!seasonMatchesPayload) {
    throw new Error("Could not fetch matches from bolldata API.");
  }

  const seasonMatches = seasonMatchesPayload["hydra:member"] ?? [];
  const targetMatch = seasonMatches.find((match) => {
    const name = String(match?.Name ?? "").toLocaleLowerCase("sv-SE");
    return (
      name.includes("hammarby") &&
      (name.includes("örgryte") || name.includes("orgryte")) &&
      Number(match?.gameweek) === 3
    );
  });

  if (!targetMatch) {
    console.log("No Hammarby vs Örgryte match found in current API season list.");
    process.exit(0);
  }

  if (!targetMatch.isPlayed) {
    console.log(
      `Match ${targetMatch.id} (${targetMatch.Name}) is not marked as played yet. No running sync performed.`
    );
    process.exit(0);
  }

  const runningData = await resolveRunningRows(targetMatch.id);
  if (!runningData) {
    console.log(
      `Match ${targetMatch.id} is played but running metrics are not exposed yet on known API endpoints.`
    );
    process.exit(0);
  }

  const players = runningData.rows
    .filter(
      (row) =>
        row.distanceMeters !== null &&
        row.maxSpeedKmh !== null &&
        row.minutesPlayed !== null &&
        row.minutesPlayed > 0
    )
    .map((row) => {
      const metersPerMinute = row.distanceMeters / row.minutesPlayed;
      return {
        name: row.name,
        shirtNumber: row.shirtNumber,
        position: row.position,
        distanceMeters: Number(row.distanceMeters.toFixed(0)),
        maxSpeedKmh: Number(row.maxSpeedKmh.toFixed(2)),
        minutesPlayed: Number(row.minutesPlayed.toFixed(2)),
        metersPerMinute: Number(metersPerMinute.toFixed(2)),
      };
    })
    .sort((a, b) => b.distanceMeters - a.distanceMeters);

  if (players.length < 8) {
    console.log("Running data exists but too sparse for a reliable import. Aborting sync.");
    process.exit(0);
  }

  const hammarbyTeamDistanceMeters = players.reduce((sum, player) => sum + player.distanceMeters, 0);
  const hammarbyTeamMinutes = Number(
    players.reduce((sum, player) => sum + player.minutesPlayed, 0).toFixed(2)
  );
  const hammarbyTopSpeedKmh = Number(
    Math.max(...players.map((player) => player.maxSpeedKmh)).toFixed(2)
  );
  const fallbackMatchDuration = Number(
    Math.max(...players.map((player) => player.minutesPlayed)).toFixed(2)
  );
  const matchDurationMinutes = parseDurationToMinutes(targetMatch.totalTime, fallbackMatchDuration);

  const { homeTeam, awayTeam } = parseTeamsFromMatchName(targetMatch.Name);
  const nextMatch = {
    matchId: DEFAULT_MATCH_ID,
    round: `Omgång ${targetMatch.gameweek}`,
    date: formatDateSv(targetMatch.Date),
    sourceUrl: `https://allsvenskan.se/matcher/${SEASON}/${DEFAULT_MATCH_ID}/${DEFAULT_MATCH_SLUG}`,
    homeTeam,
    awayTeam,
    hammarbyWasHome: homeTeam === TARGET_TEAM_NAME,
    matchDurationMinutes,
    hammarbyTeamDistanceMeters,
    hammarbyTeamMinutes,
    hammarbyTopSpeedKmh,
    players,
  };

  if (!SHOULD_WRITE) {
    console.log("Running data detected and normalized:");
    console.log(JSON.stringify(nextMatch, null, 2));
    console.log("Run with --write to update src/lib/hammarbyRunningData.ts");
    process.exit(0);
  }

  const fileContents = fs.readFileSync(OUT_PATH, "utf8");
  const existingMatches = extractArrayLiteral(fileContents, "hammarbyRunningMatches");
  const mergedMatches = upsertMatch(existingMatches, nextMatch);
  fs.writeFileSync(OUT_PATH, buildTypeScriptFile(mergedMatches), "utf8");

  console.log(
    `Synced running data for match ${nextMatch.round} via ${runningData.endpoint} to ${path.relative(
      process.cwd(),
      OUT_PATH
    )}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
