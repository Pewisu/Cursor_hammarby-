export interface TeamRoundStats {
  teamName: string;
  goals: number;
  xg: number;
  shots: number;
  shotsOnTarget: number;
  possessionPercent: number;
  passes: number;
  passesSuccessful: number;
  touchesInBox: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
}

export interface RoundMatchStats {
  key: "omgang-1" | "omgang-2";
  gameweek: number;
  date: string;
  matchName: string;
  sourceUrl: string;
  hammarby: TeamRoundStats;
  opponent: TeamRoundStats;
}

export const hammarbyRoundMatchStats: RoundMatchStats[] = [
  {
    key: "omgang-1",
    gameweek: 1,
    date: "2026-04-04",
    matchName: "Hammarby - Mjällby, 3-0",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-04-04/hammarby-mjallby-3-0",
    hammarby: {
      teamName: "Hammarby",
      goals: 3,
      xg: 1.77,
      shots: 16,
      shotsOnTarget: 5,
      possessionPercent: 55,
      passes: 521,
      passesSuccessful: 457,
      touchesInBox: 16,
      corners: 2,
      fouls: 17,
      yellowCards: 2,
      redCards: 0,
    },
    opponent: {
      teamName: "Mjällby",
      goals: 0,
      xg: 0.7405,
      shots: 14,
      shotsOnTarget: 7,
      possessionPercent: 45,
      passes: 423,
      passesSuccessful: 364,
      touchesInBox: 19,
      corners: 3,
      fouls: 16,
      yellowCards: 4,
      redCards: 0,
    },
  },
  {
    key: "omgang-2",
    gameweek: 2,
    date: "2026-04-13",
    matchName: "Sirius - Hammarby, 2-0",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-04-13/sirius-hammarby-2-0",
    hammarby: {
      teamName: "Hammarby",
      goals: 0,
      xg: 1.406,
      shots: 16,
      shotsOnTarget: 3,
      possessionPercent: 68,
      passes: 689,
      passesSuccessful: 608,
      touchesInBox: 22,
      corners: 2,
      fouls: 12,
      yellowCards: 2,
      redCards: 0,
    },
    opponent: {
      teamName: "Sirius",
      goals: 2,
      xg: 0.9589,
      shots: 8,
      shotsOnTarget: 3,
      possessionPercent: 32,
      passes: 281,
      passesSuccessful: 215,
      touchesInBox: 7,
      corners: 3,
      fouls: 14,
      yellowCards: 0,
      redCards: 0,
    },
  },
];
