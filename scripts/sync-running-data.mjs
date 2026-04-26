import fs from "node:fs";
import path from "node:path";

const API_BASE = "https://bolldata.se/api";
const ALLSVENSKAN_GQL_URI = "https://gql.sportomedia.se/graphql";
const SEASON = "2026";
const ALLSVENSKAN_LEAGUE_NAME = "allsvenskan";
const ALLSVENSKAN_SEASON_START_YEAR = Number(SEASON);
const DEFAULT_MATCH_ID = Number(process.env.MATCH_ID ?? "6529847");
const DEFAULT_MATCH_SLUG = process.env.MATCH_SLUG ?? "hammarby-mot-orgryte-is";
const DEFAULT_BOLLDATA_MATCH_API_ID = Number(process.env.BOLLDATA_MATCH_API_ID ?? "1700");
const TARGET_TEAM_NAME = "Hammarby";
const BOLLDATA_PLAYER_STATS_ENDPOINT = "matches/player/stats";
const OUT_PATH = path.resolve(process.cwd(), "src/lib/hammarbyRunningData.ts");
const SHOULD_WRITE = process.argv.includes("--write");
const BOLLDATA_MINUTES_KEYS = ["minutesOnField", "minutesPlayed", "minutes"];
const MINUTE_OUT_SENTINEL = 999999;

const LINEUPS_QUERY = `query lineups(
  $id: Int!
  $configLeagueName: String!
  $configSeasonStartYear: Int!
) {
  lineups(
    id: $id
    configLeagueName: $configLeagueName
    configSeasonStartYear: $configSeasonStartYear
  ) {
    homeTeam {
      abbrv
      starting {
        id
        displayName
        givenName
        surName
        shirtNumber
        maxSpeed
        distance
        positionText
      }
      substitutes {
        id
        displayName
        givenName
        surName
        shirtNumber
        maxSpeed
        distance
        positionText
      }
    }
    visitingTeam {
      abbrv
      starting {
        id
        displayName
        givenName
        surName
        shirtNumber
        maxSpeed
        distance
        positionText
      }
      substitutes {
        id
        displayName
        givenName
        surName
        shirtNumber
        maxSpeed
        distance
        positionText
      }
    }
  }
}`;

const MATCH_DETAILS_QUERY = `query match(
  $id: Int!
  $configLeagueName: String!
  $configSeasonStartYear: Int!
) {
  match(
    id: $id
    configLeagueName: $configLeagueName
    configSeasonStartYear: $configSeasonStartYear
  ) {
    match {
      startDate
      status
      round
      homeTeamName
      visitingTeamName
      matchEvents {
        type
        gameTime
        minuteWithStoppageTime
        teamName
        byHomeTeam
        inPlayerName
        outPlayerName
      }
    }
  }
}`;

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

function normalizeNameForLookup(value) {
  return String(value ?? "")
    .toLocaleLowerCase("sv-SE")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "");
}

function buildNameLookupKeys(displayName, firstName, lastName) {
  const keys = new Set();
  const normalizedDisplay = normalizeNameForLookup(displayName);
  const normalizedFirst = normalizeNameForLookup(firstName);
  const normalizedLast = normalizeNameForLookup(lastName);
  const normalizedFull = normalizeNameForLookup(`${firstName ?? ""} ${lastName ?? ""}`);

  if (normalizedDisplay) keys.add(normalizedDisplay);
  if (normalizedFull) keys.add(normalizedFull);
  if (normalizedLast) keys.add(normalizedLast);
  if (normalizedFirst && normalizedLast) {
    keys.add(`${normalizedFirst[0]}${normalizedLast}`);
  }

  return keys;
}

function isHammarbyTeamName(value) {
  return normalizeNameForLookup(value).includes("hammarby");
}

function splitNameParts(name) {
  const normalized = normalizeNameForLookup(name);
  if (!normalized) return { normalized: "", first: "", last: "" };
  const rawParts = String(name)
    .trim()
    .split(/\s+/)
    .map((part) => normalizeNameForLookup(part))
    .filter(Boolean);
  return {
    normalized,
    first: rawParts[0] ?? "",
    last: rawParts[rawParts.length - 1] ?? "",
  };
}

function scoreLineupNameAgainstEvent(lineupPlayer, eventPlayerName) {
  if (!eventPlayerName) return 0;
  const eventParts = splitNameParts(eventPlayerName);
  if (!eventParts.normalized) return 0;

  const lineupDisplay = normalizeNameForLookup(lineupPlayer.name);
  const lineupFull = normalizeNameForLookup(
    `${lineupPlayer.firstName ?? ""} ${lineupPlayer.lastName ?? ""}`
  );
  const lineupParts = splitNameParts(`${lineupPlayer.firstName ?? ""} ${lineupPlayer.lastName ?? ""}`);
  const displayParts = splitNameParts(lineupPlayer.name);
  const lineupFirst = lineupParts.first || displayParts.first;
  const lineupLast = lineupParts.last || displayParts.last;

  let score = 0;
  if (lineupDisplay && lineupDisplay === eventParts.normalized) score += 10;
  if (lineupFull && lineupFull === eventParts.normalized) score += 8;
  if (lineupLast && lineupLast === eventParts.last) score += 5;
  if (lineupFirst && lineupFirst === eventParts.first) score += 3;
  if (
    lineupFirst &&
    eventParts.first &&
    lineupFirst[0] &&
    eventParts.first[0] &&
    lineupFirst[0] === eventParts.first[0]
  ) {
    score += 1;
  }
  return score;
}

function resolveLineupPlayerByEventName(eventPlayerName, lineupRows) {
  let bestScore = -1;
  let bestRow = null;
  for (const lineupRow of lineupRows) {
    const score = scoreLineupNameAgainstEvent(lineupRow, eventPlayerName);
    if (score > bestScore) {
      bestScore = score;
      bestRow = lineupRow;
    }
  }
  return bestScore > 0 ? bestRow : null;
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
  const response = await fetch(url, {
    headers: {
      Accept: "application/ld+json",
    },
  });
  if (!response.ok) return null;
  return response.json();
}

async function fetchCollection(endpoint, id) {
  const payload = await fetchJson(`${API_BASE}/${endpoint}?id=${id}`);
  return payload?.["hydra:member"] ?? [];
}

function mapPositionName(positionText) {
  const normalized = normalizeNameForLookup(positionText);
  if (!normalized) return "Unknown";
  if (normalized.includes("goal")) return "Målvakt";
  if (normalized.includes("back") || normalized.includes("def")) return "Back";
  if (normalized.includes("mid")) return "Mittfältare";
  if (normalized.includes("forw") || normalized.includes("striker") || normalized.includes("anfall")) {
    return "Anfallare";
  }
  return positionText;
}

async function fetchAllsvenskanLineups(matchId) {
  const response = await fetch(ALLSVENSKAN_GQL_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: LINEUPS_QUERY,
      variables: {
        id: matchId,
        configLeagueName: ALLSVENSKAN_LEAGUE_NAME,
        configSeasonStartYear: ALLSVENSKAN_SEASON_START_YEAR,
      },
    }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  if (payload?.errors?.length) {
    return null;
  }
  return payload?.data?.lineups ?? null;
}

async function fetchAllsvenskanMatchDetails(matchId) {
  const response = await fetch(ALLSVENSKAN_GQL_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: MATCH_DETAILS_QUERY,
      variables: {
        id: matchId,
        configLeagueName: ALLSVENSKAN_LEAGUE_NAME,
        configSeasonStartYear: ALLSVENSKAN_SEASON_START_YEAR,
      },
    }),
  });
  if (!response.ok) return null;
  const payload = await response.json();
  if (payload?.errors?.length) return null;
  return payload?.data?.match?.match ?? null;
}

function deriveDurationFromAllsvenskanEvents(matchDetails, fallbackMinutes) {
  const events = matchDetails?.matchEvents ?? [];
  const maxGameTimeSeconds = Math.max(
    0,
    ...events.map((event) => toNumber(event?.gameTime) ?? 0)
  );
  if (maxGameTimeSeconds <= 0) return fallbackMinutes;
  return Number((maxGameTimeSeconds / 60).toFixed(2));
}

function normalizeAllsvenskanLineupRows(startingRows, substituteRows) {
  const normalizeRows = (rows, isStarter, startIndex) =>
    rows.map((player, index) => ({
      lineupIndex: startIndex + index,
      isStarter,
      name: player?.displayName ?? "Unknown",
      firstName: player?.givenName ?? "",
      lastName: player?.surName ?? "",
      shirtNumber: toNumber(player?.shirtNumber) ?? -1,
      position: mapPositionName(player?.positionText),
      distanceMeters: toNumber(player?.distance),
      maxSpeedKmh: toNumber(player?.maxSpeed),
    }));

  return [
    ...normalizeRows(startingRows, true, 0),
    ...normalizeRows(substituteRows, false, startingRows.length),
  ].filter((row) => row.shirtNumber !== -1);
}

function resolveMinutesPlayed(row, matchDurationMinutes) {
  const explicitMinutes = getFirstNumericValue(row, BOLLDATA_MINUTES_KEYS);
  if (explicitMinutes !== null) return Number(explicitMinutes.toFixed(2));

  const minuteIn = toNumber(row?.minuteIn);
  const minuteOutRaw = toNumber(row?.minuteOut);
  const minuteOut =
    minuteOutRaw !== null && minuteOutRaw < MINUTE_OUT_SENTINEL
      ? minuteOutRaw
      : matchDurationMinutes;
  const hasPlayed = Boolean(row?.lineup) || Boolean(row?.substitutionsIn);
  if (!hasPlayed || minuteIn === null || minuteOut === null || minuteOut < minuteIn) {
    return null;
  }

  return Number(Math.max(minuteOut - minuteIn, 0).toFixed(2));
}

function normalizeBolldataMinutesRows(rows, matchDurationMinutes) {
  return rows
    .map((row) => {
      const player = row?.PlayerTeam?.player ?? {};
      const teamName = row?.PlayerTeam?.Team?.Name ?? "";
      return {
        teamName,
        displayName: player?.Name ?? "",
        firstName: player?.firstName ?? "",
        lastName: player?.lastName ?? "",
        minutesPlayed: resolveMinutesPlayed(row, matchDurationMinutes),
      };
    })
    .filter((row) => row.teamName === TARGET_TEAM_NAME);
}

function scoreNameMatch(lineupPlayer, bolldataPlayer) {
  const lineupDisplay = normalizeNameForLookup(lineupPlayer.name);
  const lineupFull = normalizeNameForLookup(
    `${lineupPlayer.firstName ?? ""} ${lineupPlayer.lastName ?? ""}`
  );
  const lineupLast = normalizeNameForLookup(lineupPlayer.lastName);
  const lineupFirst = normalizeNameForLookup(lineupPlayer.firstName);

  const bolldataDisplay = normalizeNameForLookup(bolldataPlayer.displayName);
  const bolldataFull = normalizeNameForLookup(
    `${bolldataPlayer.firstName ?? ""} ${bolldataPlayer.lastName ?? ""}`
  );
  const bolldataLast = normalizeNameForLookup(bolldataPlayer.lastName);
  const bolldataFirst = normalizeNameForLookup(bolldataPlayer.firstName);

  let score = 0;
  if (lineupDisplay && lineupDisplay === bolldataDisplay) score += 8;
  if (lineupFull && lineupFull === bolldataFull) score += 6;
  if (lineupLast && lineupLast === bolldataLast) score += 4;
  if (lineupFirst && bolldataFirst && lineupFirst === bolldataFirst) score += 2;
  if (
    lineupFirst &&
    bolldataFirst &&
    lineupFirst[0] &&
    bolldataFirst[0] &&
    lineupFirst[0] === bolldataFirst[0]
  ) {
    score += 1;
  }
  return score;
}

function mergeRunningWithMinutes(allsvenskanRows, bolldataRows) {
  const keyToBolldataIndices = new Map();
  bolldataRows.forEach((row, index) => {
    for (const key of buildNameLookupKeys(row.displayName, row.firstName, row.lastName)) {
      const existing = keyToBolldataIndices.get(key);
      if (existing) existing.push(index);
      else keyToBolldataIndices.set(key, [index]);
    }
  });

  const usedBolldataIndices = new Set();
  const unmatched = [];

  const merged = allsvenskanRows.map((lineupPlayer) => {
    const candidateIndices = new Set();
    for (const key of buildNameLookupKeys(
      lineupPlayer.name,
      lineupPlayer.firstName,
      lineupPlayer.lastName
    )) {
      const indices = keyToBolldataIndices.get(key);
      if (!indices) continue;
      indices.forEach((index) => candidateIndices.add(index));
    }

    let bestIndex = null;
    let bestScore = -1;

    for (const index of candidateIndices) {
      if (usedBolldataIndices.has(index)) continue;
      const score = scoreNameMatch(lineupPlayer, bolldataRows[index]);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }

    if (bestIndex === null) {
      for (let index = 0; index < bolldataRows.length; index += 1) {
        if (usedBolldataIndices.has(index)) continue;
        const score = scoreNameMatch(lineupPlayer, bolldataRows[index]);
        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      }
    }

    if (bestIndex !== null && bestScore > 0) {
      usedBolldataIndices.add(bestIndex);
      return {
        ...lineupPlayer,
        minutesPlayed: bolldataRows[bestIndex].minutesPlayed,
      };
    }

    unmatched.push(lineupPlayer.name);
    return {
      ...lineupPlayer,
      minutesPlayed: null,
    };
  });

  return { merged, unmatched };
}

function deriveMinutesFromAllsvenskanSubstitutions({
  lineupTeam,
  lineupRows,
  matchDetails,
  matchDurationMinutes,
  hammarbyWasHome,
}) {
  const starterShirts = new Set(
    (lineupTeam?.starting ?? [])
      .map((player) => toNumber(player?.shirtNumber))
      .filter((value) => value !== null)
  );
  const minutesByShirt = new Map(
    lineupRows.map((row) => [
      row.shirtNumber,
      starterShirts.has(row.shirtNumber) ? matchDurationMinutes : 0,
    ])
  );
  const substitutionEvents = (matchDetails?.matchEvents ?? [])
    .filter(
      (event) =>
        event?.type === "SUBSTITUTION" &&
        (event.byHomeTeam === hammarbyWasHome || isHammarbyTeamName(event.teamName))
    )
    .sort((left, right) => (toNumber(left?.gameTime) ?? 0) - (toNumber(right?.gameTime) ?? 0));

  for (const event of substitutionEvents) {
    const minute = Number(((toNumber(event?.gameTime) ?? 0) / 60).toFixed(2));
    if (minute <= 0) continue;

    const outPlayer = resolveLineupPlayerByEventName(event.outPlayerName, lineupRows);
    if (outPlayer) {
      const previous = minutesByShirt.get(outPlayer.shirtNumber) ?? matchDurationMinutes;
      minutesByShirt.set(outPlayer.shirtNumber, Math.min(previous, minute));
    }

    const inPlayer = resolveLineupPlayerByEventName(event.inPlayerName, lineupRows);
    if (inPlayer) {
      const previous = minutesByShirt.get(inPlayer.shirtNumber) ?? 0;
      minutesByShirt.set(
        inPlayer.shirtNumber,
        Math.max(previous, Number((matchDurationMinutes - minute).toFixed(2)))
      );
    }
  }

  return minutesByShirt;
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
  const seasonMatches = seasonMatchesPayload?.["hydra:member"] ?? [];
  const targetMatch =
    seasonMatches.find((match) => Number(match?.id) === DEFAULT_BOLLDATA_MATCH_API_ID) ??
    seasonMatches.find((match) => {
      const name = String(match?.Name ?? "").toLocaleLowerCase("sv-SE");
      return (
        name.includes("hammarby") &&
        Number(match?.gameweek) >= 1
      );
    });
  const allsvenskanMatchDetails = await fetchAllsvenskanMatchDetails(DEFAULT_MATCH_ID);
  if (!allsvenskanMatchDetails) {
    console.log(
      `Could not fetch match metadata from ${ALLSVENSKAN_GQL_URI} for match ${DEFAULT_MATCH_ID}.`
    );
    process.exit(0);
  }
  if (!targetMatch && allsvenskanMatchDetails.status !== "FINISHED") {
    console.log(
      `Match ${DEFAULT_MATCH_ID} is not finished yet (${allsvenskanMatchDetails.status}). No running sync performed.`
    );
    process.exit(0);
  }
  if (targetMatch && !targetMatch.isPlayed) {
    if (allsvenskanMatchDetails.status !== "FINISHED") {
      console.log(
        `Match ${targetMatch.id} (${targetMatch.Name}) is not marked as played yet and Allsvenskan status is ${allsvenskanMatchDetails.status}. No running sync performed.`
      );
      process.exit(0);
    }
    console.log(
      `Match ${targetMatch.id} (${targetMatch.Name}) is not marked as played in bolldata yet, continuing with Allsvenskan fallback.`
    );
  }

  const fallbackTeams = {
    homeTeam: allsvenskanMatchDetails.homeTeamName ?? "Hammarby",
    awayTeam: allsvenskanMatchDetails.visitingTeamName ?? "Okänd",
  };
  const { homeTeam, awayTeam } = targetMatch
    ? parseTeamsFromMatchName(targetMatch.Name)
    : fallbackTeams;
  const hammarbyWasHome = isHammarbyTeamName(homeTeam);

  const bolldataFallbackDuration = targetMatch
    ? parseDurationToMinutes(targetMatch.totalTime, 90)
    : 90;
  const fallbackMatchDurationMinutes = deriveDurationFromAllsvenskanEvents(
    allsvenskanMatchDetails,
    bolldataFallbackDuration
  );

  let bolldataMinutesRows = [];
  if (targetMatch?.id) {
    const bolldataPlayerRows = await fetchCollection(BOLLDATA_PLAYER_STATS_ENDPOINT, targetMatch.id);
    if (bolldataPlayerRows.length > 0) {
      bolldataMinutesRows = normalizeBolldataMinutesRows(
        bolldataPlayerRows,
        fallbackMatchDurationMinutes
      );
    }
  }

  const allsvenskanLineups = await fetchAllsvenskanLineups(DEFAULT_MATCH_ID);
  if (!allsvenskanLineups) {
    console.log(
      `Could not fetch lineups/running data from ${ALLSVENSKAN_GQL_URI} for match ${DEFAULT_MATCH_ID}.`
    );
    process.exit(0);
  }

  const lineupTeam = hammarbyWasHome ? allsvenskanLineups?.homeTeam : allsvenskanLineups?.visitingTeam;
  const allsvenskanRows = normalizeAllsvenskanLineupRows(
    lineupTeam?.starting ?? [],
    lineupTeam?.substitutes ?? []
  );
  const allsvenskanRunningRows = allsvenskanRows.filter(
    (row) =>
      row.distanceMeters !== null &&
      row.maxSpeedKmh !== null &&
      row.distanceMeters > 0 &&
      row.maxSpeedKmh > 0
  );

  if (allsvenskanRunningRows.length < 8) {
    console.log(
      `Allsvenskan running data is too sparse (${allsvenskanRunningRows.length} players with distance/speed).`
    );
    process.exit(0);
  }

  const useBolldataMinutes = bolldataMinutesRows.length >= 8;
  let players = [];
  let unmatched = [];

  if (useBolldataMinutes) {
    const mergedResult = mergeRunningWithMinutes(allsvenskanRunningRows, bolldataMinutesRows);
    unmatched = mergedResult.unmatched;
    players = mergedResult.merged
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
  } else {
    const minutesByShirt = deriveMinutesFromAllsvenskanSubstitutions({
      lineupTeam,
      lineupRows: allsvenskanRows,
      matchDetails: allsvenskanMatchDetails,
      matchDurationMinutes: fallbackMatchDurationMinutes,
      hammarbyWasHome,
    });
    players = allsvenskanRunningRows
      .map((row) => {
        const minutesPlayed = minutesByShirt.get(row.shirtNumber) ?? 0;
        if (minutesPlayed <= 0 || row.distanceMeters === null || row.maxSpeedKmh === null) return null;
        return {
          name: row.name,
          shirtNumber: row.shirtNumber,
          position: row.position,
          distanceMeters: Number(row.distanceMeters.toFixed(0)),
          maxSpeedKmh: Number(row.maxSpeedKmh.toFixed(2)),
          minutesPlayed: Number(minutesPlayed.toFixed(2)),
          metersPerMinute: Number((row.distanceMeters / minutesPlayed).toFixed(2)),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.distanceMeters - a.distanceMeters);
    unmatched = allsvenskanRunningRows
      .filter((row) => (minutesByShirt.get(row.shirtNumber) ?? 0) <= 0)
      .map((row) => row.name);
  }

  if (unmatched.length > 0) {
    console.log(
      `Warning: could not confidently map minutes for: ${unmatched.join(", ")}`
    );
  }

  if (players.length < 8) {
    console.log(
      `Merged running data exists but too sparse after minute matching (${players.length} players).`
    );
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
  const matchDurationMinutes = targetMatch
    ? parseDurationToMinutes(targetMatch.totalTime, fallbackMatchDuration)
    : fallbackMatchDurationMinutes;

  const nextMatch = {
    matchId: DEFAULT_MATCH_ID,
    round: `Omgång ${targetMatch?.gameweek ?? allsvenskanMatchDetails.round}`,
    date: formatDateSv(targetMatch?.Date ?? allsvenskanMatchDetails.startDate),
    sourceUrl: `https://allsvenskan.se/matcher/${SEASON}/${DEFAULT_MATCH_ID}/${DEFAULT_MATCH_SLUG}`,
    homeTeam,
    awayTeam,
    hammarbyWasHome: isHammarbyTeamName(homeTeam),
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
    `Synced running data for ${nextMatch.round} using Allsvenskan (distance/speed) + ${useBolldataMinutes ? "bolldata" : "Allsvenskan substitutions"} (minutes) to ${path.relative(process.cwd(), OUT_PATH)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
