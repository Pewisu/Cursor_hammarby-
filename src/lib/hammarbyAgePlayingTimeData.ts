export type AgeThresholdKey = "u23" | "u22" | "u21" | "u20" | "u19" | "u18";

export type AgeThresholdMetric = {
  minutes: number;
  percentage: number;
  rank: number;
  teams: number;
};

export type AverageAgeMetric = {
  totalSquad: number;
  startingEleven: number;
  bench: number;
  substitutions: number;
  rank: number;
  teams: number;
};

export type SeniorAgeBreakdown = {
  peak: {
    minutes: number;
    ageRange: "24-29";
  };
  twilight: {
    minutes: number;
    ageRange: "30+";
  };
};

export type HammarbyAgePlayingTimeSeason = {
  season: 2024 | 2025 | 2026;
  label: string;
  status: string;
  matches: number;
  totalAvailableMinutes: number;
  sourceUrl: string;
  thresholds: Record<AgeThresholdKey, AgeThresholdMetric>;
  seniorBreakdown: SeniorAgeBreakdown;
  averageAge: AverageAgeMetric;
};

export const ageThresholdLabels: Record<AgeThresholdKey, string> = {
  u23: "Under 23",
  u22: "Under 22",
  u21: "Under 21",
  u20: "Under 20",
  u19: "Under 19",
  u18: "Under 18",
};

export const ageThresholdOrder: AgeThresholdKey[] = [
  "u23",
  "u22",
  "u21",
  "u20",
  "u19",
  "u18",
];

export const hammarbyAgePlayingTimeSeasons: HammarbyAgePlayingTimeSeason[] = [
  {
    season: 2024,
    label: "2024",
    status: "Hel säsong",
    matches: 30,
    totalAvailableMinutes: 32533,
    sourceUrl: "https://bolldata.se/talangdata?season_name=2024#team-playing-time-under-21",
    thresholds: {
      u23: { minutes: 14301, percentage: 44.0, rank: 3, teams: 16 },
      u22: { minutes: 12500, percentage: 38.4, rank: 2, teams: 16 },
      u21: { minutes: 10230, percentage: 31.4, rank: 1, teams: 16 },
      u20: { minutes: 8333, percentage: 25.6, rank: 1, teams: 16 },
      u19: { minutes: 2621, percentage: 8.1, rank: 3, teams: 16 },
      u18: { minutes: 1929, percentage: 5.9, rank: 2, teams: 16 },
    },
    seniorBreakdown: {
      peak: { minutes: 13032, ageRange: "24-29" },
      twilight: { minutes: 5200, ageRange: "30+" },
    },
    averageAge: {
      totalSquad: 23.2,
      startingEleven: 23.5,
      bench: 22.8,
      substitutions: 22.5,
      rank: 15,
      teams: 16,
    },
  },
  {
    season: 2025,
    label: "2025",
    status: "Hel säsong",
    matches: 30,
    totalAvailableMinutes: 32517,
    sourceUrl: "https://bolldata.se/talangdata?season_name=2025#team-playing-time-under-21",
    thresholds: {
      u23: { minutes: 13972, percentage: 43.0, rank: 5, teams: 16 },
      u22: { minutes: 9131, percentage: 28.1, rank: 8, teams: 16 },
      u21: { minutes: 7996, percentage: 24.6, rank: 4, teams: 16 },
      u20: { minutes: 2439, percentage: 7.5, rank: 12, teams: 16 },
      u19: { minutes: 922, percentage: 2.8, rank: 11, teams: 16 },
      u18: { minutes: 441, percentage: 1.4, rank: 9, teams: 16 },
    },
    seniorBreakdown: {
      peak: { minutes: 11717, ageRange: "24-29" },
      twilight: { minutes: 6828, ageRange: "30+" },
    },
    averageAge: {
      totalSquad: 23.8,
      startingEleven: 24.4,
      bench: 23.1,
      substitutions: 23.5,
      rank: 13,
      teams: 16,
    },
  },
  {
    season: 2026,
    label: "2026",
    status: "Pågående säsong",
    matches: 11,
    totalAvailableMinutes: 11717,
    sourceUrl: "https://bolldata.se/talangdata?season_name=2026#team-playing-time-under-21",
    thresholds: {
      u23: { minutes: 5108, percentage: 43.6, rank: 5, teams: 16 },
      u22: { minutes: 3709, percentage: 31.7, rank: 6, teams: 16 },
      u21: { minutes: 1345, percentage: 11.5, rank: 14, teams: 16 },
      u20: { minutes: 508, percentage: 4.3, rank: 13, teams: 16 },
      u19: { minutes: 4, percentage: 0.0, rank: 14, teams: 16 },
      u18: { minutes: 0, percentage: 0.0, rank: 13, teams: 16 },
    },
    seniorBreakdown: {
      peak: { minutes: 3851, ageRange: "24-29" },
      twilight: { minutes: 2758, ageRange: "30+" },
    },
    averageAge: {
      totalSquad: 23.9,
      startingEleven: 24.8,
      bench: 22.9,
      substitutions: 23.3,
      rank: 8,
      teams: 16,
    },
  },
];
