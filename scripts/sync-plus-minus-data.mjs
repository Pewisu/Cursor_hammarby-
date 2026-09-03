import fs from "node:fs";
import path from "node:path";

const SEASON = "2026";
const API_BASE = "https://bolldata.se/api";
const TARGET_TEAM = "Hammarby";
const MINUTE_OUT_SENTINEL = 999999;
const OUT_PATH = path.resolve(process.cwd(), "src/lib/hammarbyPlusMinusData.ts");

const PLAYER_ROLE_OVERRIDES = {
  "F. Adjei": "Midfielder",
  "I. Fofana": "Defender",
  "O. Hagen": "Forward",
};

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/ld+json" },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseMatchName(name) {
  const [fixturePart, scorePart] = String(name ?? "").split(",");
  const [homeTeam, awayTeam] = (fixturePart ?? "")
    .split(" - ")
    .map((value) => value.trim())
    .filter(Boolean);
  const scoreMatch = String(scorePart ?? "").match(/(\d+)\s*-\s*(\d+)/);
  return {
    homeTeam: homeTeam ?? "Okänd",
    awayTeam: awayTeam ?? "Okänd",
    homeGoals: scoreMatch ? Number(scoreMatch[1]) : 0,
    awayGoals: scoreMatch ? Number(scoreMatch[2]) : 0,
  };
}

function isOnPitch(row, goalMinute) {
  const minutes = Number(row?.minutesOnField ?? 0);
  const started = Boolean(row?.lineup);
  const cameOn = Boolean(row?.substitutionsIn);
  if (!minutes && !started && !cameOn) return false;

  const minuteIn = Number(row?.minuteIn ?? 0);
  const rawOut = row?.minuteOut;
  const minuteOut =
    rawOut === null || rawOut === undefined ? MINUTE_OUT_SENTINEL : Number(rawOut);

  return minuteIn <= goalMinute && goalMinute <= minuteOut;
}

function resolveRole(playerName, roleName) {
  return PLAYER_ROLE_OVERRIDES[playerName] ?? roleName ?? "Unknown";
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(Number(value) * factor) / factor;
}

function ratePer90(count, minutes) {
  if (!minutes) return 0;
  return round((count * 90) / minutes, 2);
}

function emptyPlayer(playerId, playerName, roleName) {
  return {
    playerId,
    playerName,
    roleName,
    matchesPlayed: 0,
    minutes: 0,
    starts: 0,
    goalsForOnPitch: 0,
    goalsAgainstOnPitch: 0,
    plusMinus: 0,
    matchLogs: [],
  };
}

function buildTypeScriptFile(payload) {
  return `/**
 * Hammarby plus/minus (Allsvenskan ${SEASON}).
 * Synkad från Bolldata: matches + matches/player/stats + matches/goals.
 * Beräkning: spelare på plan (minuteIn–minuteOut) när Hammarby gör/släpper in mål.
 * Självmål: team-fältet i Bolldata är laget som får målet på tavlan.
 * Snitt: min/match + GF/GA/+/− per 90; truppsnitt är minutviktat (rättvis referens).
 *
 * Genererad av scripts/sync-plus-minus-data.mjs – skriv inte manuellt.
 */

export type PlusMinusRole =
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Forward"
  | "Unknown";

export interface PlusMinusMatchGoal {
  minute: number;
  second: number | null;
  forHammarby: boolean;
  ownGoal: boolean;
  scorerName: string;
  scoringTeam: string;
}

export interface PlusMinusPlayerMatchLog {
  matchId: number;
  gameweek: number;
  date: string;
  matchName: string;
  opponent: string;
  isHome: boolean;
  minutes: number;
  started: boolean;
  minuteIn: number;
  minuteOut: number | null;
  goalsForOnPitch: number;
  goalsAgainstOnPitch: number;
  plusMinus: number;
}

export interface PlusMinusPlayerSeason {
  playerId: number;
  playerName: string;
  roleName: PlusMinusRole;
  matchesPlayed: number;
  minutes: number;
  minutesPerMatch: number;
  starts: number;
  goalsForOnPitch: number;
  goalsAgainstOnPitch: number;
  plusMinus: number;
  goalsForPer90: number;
  goalsAgainstPer90: number;
  plusMinusPer90: number;
  plusMinusPer90VsAvg: number;
  matchLogs: PlusMinusPlayerMatchLog[];
}

export interface PlusMinusSeasonAverages {
  /** Totala spelarminuter / antal spelarframträdanden. */
  minutesPerMatch: number;
  /** Minutviktat: sum(GF på plan) * 90 / sum(minuter). */
  goalsForPer90: number;
  /** Minutviktat: sum(GA på plan) * 90 / sum(minuter). */
  goalsAgainstPer90: number;
  /** Minutviktat: sum(+/-) * 90 / sum(minuter) ≈ lagets målskillnad per 90. */
  plusMinusPer90: number;
  totalAppearances: number;
  totalMinutes: number;
}

export interface PlusMinusMatchSummary {
  matchId: number;
  gameweek: number;
  date: string;
  matchName: string;
  opponent: string;
  isHome: boolean;
  hammarbyGoals: number;
  opponentGoals: number;
  goals: PlusMinusMatchGoal[];
  sourceUrl: string | null;
}

export interface HammarbyPlusMinusSeason {
  season: string;
  competition: string;
  generatedAt: string;
  source: string;
  matchesPlayed: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  averages: PlusMinusSeasonAverages;
  matches: PlusMinusMatchSummary[];
  players: PlusMinusPlayerSeason[];
}

export const hammarbyPlusMinusSeason: HammarbyPlusMinusSeason = ${JSON.stringify(
    payload,
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
        match.Name.includes(TARGET_TEAM) &&
        match.isPlayed
    )
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

  const playersById = new Map();
  const matchSummaries = [];
  let seasonGoalsFor = 0;
  let seasonGoalsAgainst = 0;

  for (const match of playedHammarbyMatches) {
    const parsed = parseMatchName(match.Name);
    const isHome = parsed.homeTeam === TARGET_TEAM;
    const opponent = isHome ? parsed.awayTeam : parsed.homeTeam;
    const expectedFor = isHome ? parsed.homeGoals : parsed.awayGoals;
    const expectedAgainst = isHome ? parsed.awayGoals : parsed.homeGoals;

    const [playersResponse, goalsResponse] = await Promise.all([
      fetchJson(`${API_BASE}/matches/player/stats?id=${match.id}`),
      fetchJson(`${API_BASE}/matches/goals?id=${match.id}`),
    ]);

    const hammarbyRows = (playersResponse["hydra:member"] ?? []).filter(
      (row) => row?.PlayerTeam?.Team?.Name === TARGET_TEAM
    );

    const goals = (goalsResponse?.["hydra:member"] ?? []).map((goal) => {
      const scoringTeam = goal?.team?.Name ?? "Okänd";
      const forHammarby = scoringTeam === TARGET_TEAM;
      return {
        minute: Number(goal?.minute ?? 0),
        second: typeof goal?.second === "number" ? goal.second : null,
        forHammarby,
        ownGoal: Boolean(goal?.ownGoal),
        scorerName: goal?.player?.Name ?? "Okänd",
        scoringTeam,
      };
    });

    const goalsFor = goals.filter((goal) => goal.forHammarby).length;
    const goalsAgainst = goals.filter((goal) => !goal.forHammarby).length;
    if (goalsFor !== expectedFor || goalsAgainst !== expectedAgainst) {
      throw new Error(
        `Goal tally mismatch for ${match.Name}: API ${goalsFor}-${goalsAgainst}, scoreline ${expectedFor}-${expectedAgainst}`
      );
    }

    seasonGoalsFor += goalsFor;
    seasonGoalsAgainst += goalsAgainst;

    matchSummaries.push({
      matchId: match.id,
      gameweek: Number(match.gameweek ?? 0),
      date: String(match.Date).slice(0, 10),
      matchName: match.Name,
      opponent,
      isHome,
      hammarbyGoals: goalsFor,
      opponentGoals: goalsAgainst,
      goals,
      sourceUrl: match?.pages?.sv ?? null,
    });

    for (const row of hammarbyRows) {
      const player = row?.PlayerTeam?.player ?? {};
      const playerId = Number(player.id ?? -1);
      const playerName = player.Name ?? "Unknown";
      const roleName = resolveRole(playerName, player.roleName);
      const minutes = Number(row.minutesOnField ?? 0);
      const started = Boolean(row.lineup);
      const cameOn = Boolean(row.substitutionsIn);
      if (!minutes && !started && !cameOn) continue;

      if (!playersById.has(playerId)) {
        playersById.set(playerId, emptyPlayer(playerId, playerName, roleName));
      }
      const seasonPlayer = playersById.get(playerId);
      seasonPlayer.playerName = playerName;
      seasonPlayer.roleName = roleName;

      const minuteIn = Number(row.minuteIn ?? 0);
      const rawOut = row.minuteOut;
      const minuteOut =
        rawOut === null || rawOut === undefined || Number(rawOut) >= MINUTE_OUT_SENTINEL
          ? null
          : Number(rawOut);

      let goalsForOnPitch = 0;
      let goalsAgainstOnPitch = 0;
      for (const goal of goals) {
        if (!isOnPitch(row, goal.minute)) continue;
        if (goal.forHammarby) goalsForOnPitch += 1;
        else goalsAgainstOnPitch += 1;
      }

      const plusMinus = goalsForOnPitch - goalsAgainstOnPitch;
      if (minutes > 0 || goalsForOnPitch > 0 || goalsAgainstOnPitch > 0) {
        seasonPlayer.matchesPlayed += 1;
        seasonPlayer.minutes += minutes;
        if (started) seasonPlayer.starts += 1;
        seasonPlayer.goalsForOnPitch += goalsForOnPitch;
        seasonPlayer.goalsAgainstOnPitch += goalsAgainstOnPitch;
        seasonPlayer.plusMinus += plusMinus;
        seasonPlayer.matchLogs.push({
          matchId: match.id,
          gameweek: Number(match.gameweek ?? 0),
          date: String(match.Date).slice(0, 10),
          matchName: match.Name,
          opponent,
          isHome,
          minutes,
          started,
          minuteIn,
          minuteOut,
          goalsForOnPitch,
          goalsAgainstOnPitch,
          plusMinus,
        });
      }
    }

    await sleep(120);
  }

  const rawPlayers = [...playersById.values()];
  const totalAppearances = rawPlayers.reduce(
    (sum, player) => sum + player.matchesPlayed,
    0
  );
  const totalMinutes = rawPlayers.reduce((sum, player) => sum + player.minutes, 0);
  const totalGoalsForOnPitch = rawPlayers.reduce(
    (sum, player) => sum + player.goalsForOnPitch,
    0
  );
  const totalGoalsAgainstOnPitch = rawPlayers.reduce(
    (sum, player) => sum + player.goalsAgainstOnPitch,
    0
  );
  const totalPlusMinus = rawPlayers.reduce(
    (sum, player) => sum + player.plusMinus,
    0
  );

  const averages = {
    minutesPerMatch:
      totalAppearances > 0 ? round(totalMinutes / totalAppearances, 1) : 0,
    goalsForPer90: ratePer90(totalGoalsForOnPitch, totalMinutes),
    goalsAgainstPer90: ratePer90(totalGoalsAgainstOnPitch, totalMinutes),
    plusMinusPer90: ratePer90(totalPlusMinus, totalMinutes),
    totalAppearances,
    totalMinutes,
  };

  const players = rawPlayers
    .map((player) => {
      const minutesPerMatch =
        player.matchesPlayed > 0
          ? round(player.minutes / player.matchesPlayed, 1)
          : 0;
      const goalsForPer90 = ratePer90(player.goalsForOnPitch, player.minutes);
      const goalsAgainstPer90 = ratePer90(
        player.goalsAgainstOnPitch,
        player.minutes
      );
      const plusMinusPer90 = ratePer90(player.plusMinus, player.minutes);
      return {
        ...player,
        minutesPerMatch,
        goalsForPer90,
        goalsAgainstPer90,
        plusMinusPer90,
        plusMinusPer90VsAvg: round(plusMinusPer90 - averages.plusMinusPer90, 2),
        matchLogs: player.matchLogs.sort((a, b) => a.date.localeCompare(b.date)),
      };
    })
    .sort((a, b) => {
      if (b.plusMinus !== a.plusMinus) return b.plusMinus - a.plusMinus;
      if (b.goalsForOnPitch !== a.goalsForOnPitch) {
        return b.goalsForOnPitch - a.goalsForOnPitch;
      }
      return a.playerName.localeCompare(b.playerName, "sv");
    });

  const payload = {
    season: SEASON,
    competition: "Allsvenskan",
    generatedAt: new Date().toISOString(),
    source: "Bolldata API (matches, matches/player/stats, matches/goals)",
    matchesPlayed: matchSummaries.length,
    goalsFor: seasonGoalsFor,
    goalsAgainst: seasonGoalsAgainst,
    goalDiff: seasonGoalsFor - seasonGoalsAgainst,
    averages,
    matches: matchSummaries,
    players,
  };

  fs.writeFileSync(OUT_PATH, buildTypeScriptFile(payload), "utf8");
  console.log(
    `Synced plus/minus for ${players.length} players across ${matchSummaries.length} matches (${seasonGoalsFor}-${seasonGoalsAgainst}) · snitt ${averages.minutesPerMatch} min/match, ${averages.plusMinusPer90 >= 0 ? "+" : ""}${averages.plusMinusPer90}/90 → ${path.relative(process.cwd(), OUT_PATH)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
