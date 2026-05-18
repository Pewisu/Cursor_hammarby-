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
  key:
    | "omgang-1"
    | "omgang-2"
    | "omgang-3"
    | "omgang-4"
    | "omgang-5"
    | "omgang-6"
    | "omgang-7"
    | "omgang-8";
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
  {
    key: "omgang-3",
    gameweek: 3,
    date: "2026-04-18",
    matchName: "Hammarby - Örgryte, 8-1",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-04-18/hammarby-orgryte-8-1",
    hammarby: {
      teamName: "Hammarby",
      goals: 8,
      xg: 4.365,
      shots: 32,
      shotsOnTarget: 16,
      possessionPercent: 59,
      passes: 587,
      passesSuccessful: 519,
      touchesInBox: 44,
      corners: 6,
      fouls: 8,
      yellowCards: 0,
      redCards: 0,
    },
    opponent: {
      teamName: "Örgryte",
      goals: 1,
      xg: 1.457,
      shots: 12,
      shotsOnTarget: 4,
      possessionPercent: 41,
      passes: 340,
      passesSuccessful: 279,
      touchesInBox: 11,
      corners: 6,
      fouls: 9,
      yellowCards: 1,
      redCards: 0,
    },
  },
  {
    key: "omgang-4",
    gameweek: 4,
    date: "2026-04-22",
    matchName: "Hammarby - Halmstad, 1-1",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-04-22/hammarby-halmstad-1-1",
    hammarby: {
      teamName: "Hammarby",
      goals: 1,
      xg: 2.308,
      shots: 21,
      shotsOnTarget: 3,
      possessionPercent: 74,
      passes: 752,
      passesSuccessful: 652,
      touchesInBox: 35,
      corners: 9,
      fouls: 13,
      yellowCards: 2,
      redCards: 0,
    },
    opponent: {
      teamName: "Halmstad",
      goals: 1,
      xg: 2.166,
      shots: 8,
      shotsOnTarget: 3,
      possessionPercent: 26,
      passes: 207,
      passesSuccessful: 150,
      touchesInBox: 11,
      corners: 0,
      fouls: 14,
      yellowCards: 3,
      redCards: 0,
    },
  },
  {
    key: "omgang-5",
    gameweek: 5,
    date: "2026-04-26",
    matchName: "Djurgården - Hammarby, 1-1",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-04-26/djurgarden-hammarby-1-1",
    hammarby: {
      teamName: "Hammarby",
      goals: 1,
      xg: 0.8699,
      shots: 14,
      shotsOnTarget: 3,
      possessionPercent: 61,
      passes: 539,
      passesSuccessful: 460,
      touchesInBox: 23,
      corners: 2,
      fouls: 8,
      yellowCards: 1,
      redCards: 0,
    },
    opponent: {
      teamName: "Djurgården",
      goals: 1,
      xg: 0.7692,
      shots: 6,
      shotsOnTarget: 3,
      possessionPercent: 39,
      passes: 313,
      passesSuccessful: 241,
      touchesInBox: 14,
      corners: 1,
      fouls: 20,
      yellowCards: 1,
      redCards: 0,
    },
  },
  {
    key: "omgang-6",
    gameweek: 6,
    date: "2026-05-03",
    matchName: "Hammarby - Västerås SK, 3-0",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-05-03/hammarby-vasteras-sk-3-0",
    hammarby: {
      teamName: "Hammarby",
      goals: 3,
      xg: 2.118,
      shots: 32,
      shotsOnTarget: 8,
      possessionPercent: 64,
      passes: 565,
      passesSuccessful: 468,
      touchesInBox: 46,
      corners: 7,
      fouls: 10,
      yellowCards: 1,
      redCards: 0,
    },
    opponent: {
      teamName: "Västerås SK",
      goals: 0,
      xg: 0.5849,
      shots: 5,
      shotsOnTarget: 0,
      possessionPercent: 36,
      passes: 352,
      passesSuccessful: 280,
      touchesInBox: 8,
      corners: 0,
      fouls: 14,
      yellowCards: 2,
      redCards: 0,
    },
  },
  {
    key: "omgang-7",
    gameweek: 7,
    date: "2026-05-09",
    matchName: "IFK Göteborg - Hammarby, 0-1",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-05-09/ifk-goteborg-hammarby-0-1",
    hammarby: {
      teamName: "Hammarby",
      goals: 1,
      xg: 1.755,
      shots: 13,
      shotsOnTarget: 4,
      possessionPercent: 55,
      passes: 434,
      passesSuccessful: 357,
      touchesInBox: 18,
      corners: 5,
      fouls: 9,
      yellowCards: 0,
      redCards: 0,
    },
    opponent: {
      teamName: "IFK Göteborg",
      goals: 0,
      xg: 1.327,
      shots: 7,
      shotsOnTarget: 1,
      possessionPercent: 45,
      passes: 360,
      passesSuccessful: 264,
      touchesInBox: 19,
      corners: 4,
      fouls: 20,
      yellowCards: 2,
      redCards: 0,
    },
  },
  {
    key: "omgang-8",
    gameweek: 8,
    date: "2026-05-17",
    matchName: "Hammarby - Malmö FF, 4-1",
    sourceUrl:
      "https://bolldata.se/allsvenskan/matcher/2026/2026-05-17/hammarby-malmo-ff-4-1",
    hammarby: {
      teamName: "Hammarby",
      goals: 4,
      xg: 3.62,
      shots: 28,
      shotsOnTarget: 10,
      possessionPercent: 53,
      passes: 476,
      passesSuccessful: 413,
      touchesInBox: 47,
      corners: 10,
      fouls: 12,
      yellowCards: 0,
      redCards: 0,
    },
    opponent: {
      teamName: "Malmö FF",
      goals: 1,
      xg: 1.04,
      shots: 10,
      shotsOnTarget: 2,
      possessionPercent: 47,
      passes: 447,
      passesSuccessful: 386,
      touchesInBox: 19,
      corners: 3,
      fouls: 16,
      yellowCards: 2,
      redCards: 0,
    },
  },
];
