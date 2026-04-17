import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const HAMMARBY_TEAM_ID = "-e22e517a-e8d6-5eb1-b2c8-4b6af7e751c5";
const ALLSVENSKAN_COMPETITION_ID = 808;
const TARGET_SEASONS = new Set([2025, 2026]);
const BASE_URL = "https://www.hammarbyfotboll.se";
const TWELVE_WIDGETS_API_URL = "https://twelve-widgets-api-prod.azurewebsites.net";
const MATCH_LIST_URL = `${BASE_URL}/page-data/matcher-resultat/page-data.json`;

const METRIC_KEYS = [
  "ball_possession_pct",
  "num_possessions_final_third",
  "num_box_entries",
  "xt_within_10s_after_recovery",
  "num_recoveries_att_half",
  "ppda",
  "defensive_action_height_m",
  "opp_num_box_entries",
  "time_to_defensive_action_after_loss_att_half_s",
  "xt",
  "opp_xt",
  "np_xg",
  "opp_np_xg",
  "np_xg_per_shot",
  "opp_np_xg_per_shot",
];

function toNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isAllsvenskan(title) {
  if (typeof title !== "string") return false;
  const normalized = title.toLocaleLowerCase("sv-SE");
  if (!normalized.includes("allsvenskan")) return false;
  if (normalized.includes("obos")) return false;
  if (normalized.includes("p19") || normalized.includes("f19")) return false;
  return true;
}

function inferTeamNameById(teams, teamId) {
  if (!teamId) return "Okänd";
  return teams.find((team) => String(team.team_id) === String(teamId))?.name ?? "Okänd";
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed ${response.status} for ${url}`);
  }
  return response.json();
}

async function fetchText(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed ${response.status} for ${url}`);
  }
  return response.text();
}

async function resolveTwelveApiToken(sampleMatchPath) {
  const html = await fetchText(`${BASE_URL}/matcher/${sampleMatchPath}`, {
    headers: { "user-agent": "Mozilla/5.0" },
  });

  const runtimeMatch = html.match(
    /<script[^>]+src="([^"]*webpack-runtime-[^"]+\.js)"/i
  );
  if (!runtimeMatch) {
    throw new Error("Could not find webpack runtime script in match HTML");
  }

  const runtimeUrl = new URL(runtimeMatch[1], BASE_URL).toString();
  const runtimeSource = await fetchText(runtimeUrl, {
    headers: { "user-agent": "Mozilla/5.0" },
  });

  const matchItemNamesMap = runtimeSource.match(/9522:\s*"component---src-templates-match-item-jsx"/);
  const chunkHashMap = runtimeSource.match(/9522:\s*"([a-f0-9]{20})"/);
  if (!matchItemNamesMap || !chunkHashMap) {
    throw new Error("Could not resolve match-item chunk path from webpack runtime");
  }
  const chunkPath = `component---src-templates-match-item-jsx-${chunkHashMap[1]}.js`;
  const chunkUrl = new URL(`/${chunkPath}`, BASE_URL).toString();
  const chunkSource = await fetchText(chunkUrl, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const secretMatch = chunkSource.match(/TWELVE_WIDGET_API_SECRET\s*=\s*"([^"]+)"/);
  if (!secretMatch) {
    throw new Error("Could not resolve TWELVE_WIDGET_API_SECRET from match-item chunk");
  }
  return `Bearer ${secretMatch[1]}`;
}

function buildPeriods(matchTrendsByTeam, metricKey) {
  const values = [];
  for (let slot = 0; slot < 6; slot += 1) {
    const trendSlot = matchTrendsByTeam?.[String(slot)]?.[0];
    values.push(toNumber(trendSlot?.[metricKey]));
  }
  return values;
}

async function main() {
  const listPayload = await fetchJson(MATCH_LIST_URL);
  const matches = listPayload?.result?.pageContext?.matches ?? [];

  const allsvenskanMatches = matches
    .filter((match) => {
      const season = Number(match?.season?.title);
      const isTargetSeason = TARGET_SEASONS.has(season);
      const includesHammarby =
        match?.team?.id === HAMMARBY_TEAM_ID || match?.teamExternal?.id === HAMMARBY_TEAM_ID;
      return (
        isTargetSeason &&
        includesHammarby &&
        isAllsvenskan(match?.competition?.title) &&
        match?.matchStatus === "finished" &&
        typeof match?.wyscoutId === "number"
      );
    })
    .sort((a, b) => new Date(a.startEventDate).getTime() - new Date(b.startEventDate).getTime());

  if (allsvenskanMatches.length === 0) {
    throw new Error("No finished Allsvenskan matches found for the selected seasons.");
  }

  const sampleMatchForToken = allsvenskanMatches.find((match) => match?.slug?.current);
  if (!sampleMatchForToken) {
    throw new Error("No match slug found for token bootstrap.");
  }

  const twelveToken = await resolveTwelveApiToken(sampleMatchForToken.slug.current);

  const seasonRoundCounter = new Map();
  const rounds = [];

  for (const match of allsvenskanMatches) {
    const season = Number(match.season.title);
    const currentRound = (seasonRoundCounter.get(season) ?? 0) + 1;
    seasonRoundCounter.set(season, currentRound);

    const isHome = match.team?.id === HAMMARBY_TEAM_ID;
    const slug = match?.slug?.current;
    if (!slug) continue;

    const trendsUrl = `${TWELVE_WIDGETS_API_URL}/wyscout/competitions/${ALLSVENSKAN_COMPETITION_ID}/years/${season}/matches/${match.wyscoutId}/trends?t=${Date.now()}`;
    const trendsResponse = await fetch(trendsUrl, {
      headers: {
        authorization: twelveToken,
      },
    });

    if (!trendsResponse.ok) {
      console.warn(
        `Skipping ${slug} (${match.wyscoutId}) - trends endpoint returned ${trendsResponse.status}`
      );
      continue;
    }

    const trends = await trendsResponse.json();
    const homeTeamId = String(trends?.match?.home_team_id ?? "");
    const awayTeamId = String(trends?.match?.away_team_id ?? "");
    const homeName = inferTeamNameById(trends?.teams ?? [], homeTeamId);
    const awayName = inferTeamNameById(trends?.teams ?? [], awayTeamId);
    const opponent = isHome ? awayName : homeName;
    const hammarbyTeamId = isHome
      ? String(trends?.match?.home_team_id ?? "")
      : String(trends?.match?.away_team_id ?? "");
    const opponentTeamId = isHome
      ? Number(trends?.match?.away_team_id ?? 0)
      : Number(trends?.match?.home_team_id ?? 0);
    if (!hammarbyTeamId) {
      console.warn(`Skipping ${slug} - missing Hammarby team id in trends payload`);
      continue;
    }

    const matchValues = trends?.match_values?.[hammarbyTeamId]?.["0"] ?? {};
    const matchTrendsByTeam = trends?.match_trends?.[hammarbyTeamId] ?? {};
    const seasonAverage = trends?.season_avg ?? {};

    const metrics = Object.fromEntries(
      METRIC_KEYS.map((key) => [
        key,
        {
          value: toNumber(matchValues[key]),
          seasonAverage: toNumber(seasonAverage[key]),
          periods: buildPeriods(matchTrendsByTeam, key),
        },
      ])
    );

    rounds.push({
      key: `${season}-gw-${currentRound}`,
      season,
      competition: match.competition.title,
      gameweek: currentRound,
      date: String(match.startEventDate).slice(0, 10),
      matchName: `${homeName} - ${awayName}, ${match.localScore}-${match.externalScore}`,
      opponent,
      opponentTeamId,
      isHome,
      sourceUrl: `${BASE_URL}/matcher/${slug}`,
      metrics,
    });

    await sleep(60);
  }

  const outputPath = path.join(process.cwd(), "src/lib/hammarbyMatchAnalysisRoundsData.ts");
  const output = `import type { HammarbyMatchAnalysisRound } from "@/lib/hammarbyMatchAnalysisData";

// Auto-generated by scripts/sync-match-analysis-data.mjs
// Do not edit manually.
export const hammarbyMatchAnalysisRounds: HammarbyMatchAnalysisRound[] = ${JSON.stringify(
    rounds,
    null,
    2
  )};
`;

  await writeFile(outputPath, output, "utf8");
  console.log(`Wrote ${rounds.length} rounds to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
