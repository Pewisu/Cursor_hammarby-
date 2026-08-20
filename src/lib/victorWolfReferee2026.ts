/**
 * Victor Wolf – Allsvenskan 2026 seriematcher (huvuddomare).
 * Källa: bolldata.se matchstatistik (hämtad 20 aug 2026).
 * freeKicks = frisparkar tilldelade laget; yellow/red = kort mot laget.
 */

export interface WolfLeagueMatch {
  date: string;
  fixture: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  homeYellow: number;
  awayYellow: number;
  homeRed: number;
  awayRed: number;
  homeFreeKicks: number;
  awayFreeKicks: number;
  homeFouls: number;
  awayFouls: number;
  sourceUrl: string;
}

export const victorWolfAllsvenskan2026Matches: WolfLeagueMatch[] = [
  {
    date: "2026-04-06",
    fixture: "Elfsborg - IFK Göteborg",
    home: "Elfsborg",
    away: "IFK Göteborg",
    homeGoals: 2,
    awayGoals: 0,
    homeYellow: 1,
    awayYellow: 4,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 1,
    awayFreeKicks: 3,
    homeFouls: 12,
    awayFouls: 7,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-06/elfsborg-ifk-goteborg-2-0",
  },
  {
    date: "2026-04-12",
    fixture: "Malmö FF - GAIS",
    home: "Malmö FF",
    away: "GAIS",
    homeGoals: 3,
    awayGoals: 1,
    homeYellow: 1,
    awayYellow: 2,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 1,
    homeFouls: 13,
    awayFouls: 16,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-12/malmo-ff-gais-3-1",
  },
  {
    date: "2026-04-23",
    fixture: "Degerfors - AIK",
    home: "Degerfors",
    away: "AIK",
    homeGoals: 2,
    awayGoals: 1,
    homeYellow: 3,
    awayYellow: 4,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 3,
    homeFouls: 16,
    awayFouls: 13,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-23/degerfors-aik-2-1",
  },
  {
    date: "2026-04-26",
    fixture: "Brommapojkarna - Västerås SK",
    home: "Brommapojkarna",
    away: "Västerås SK",
    homeGoals: 1,
    awayGoals: 2,
    homeYellow: 0,
    awayYellow: 0,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 2,
    homeFouls: 8,
    awayFouls: 14,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-26/brommapojkarna-vasteras-sk-1-2",
  },
  {
    date: "2026-05-09",
    fixture: "IFK Göteborg - Hammarby",
    home: "IFK Göteborg",
    away: "Hammarby",
    homeGoals: 0,
    awayGoals: 1,
    homeYellow: 2,
    awayYellow: 0,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 1,
    awayFreeKicks: 5,
    homeFouls: 20,
    awayFouls: 9,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-09/ifk-goteborg-hammarby-0-1",
  },
  {
    date: "2026-05-30",
    fixture: "Malmö FF - Halmstad",
    home: "Malmö FF",
    away: "Halmstad",
    homeGoals: 5,
    awayGoals: 2,
    homeYellow: 1,
    awayYellow: 0,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 5,
    homeFouls: 13,
    awayFouls: 11,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-30/malmo-ff-halmstad-5-2",
  },
  {
    date: "2026-07-06",
    fixture: "Brommapojkarna - GAIS",
    home: "Brommapojkarna",
    away: "GAIS",
    homeGoals: 1,
    awayGoals: 1,
    homeYellow: 0,
    awayYellow: 2,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 0,
    awayFreeKicks: 1,
    homeFouls: 5,
    awayFouls: 9,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-06/brommapojkarna-gais-1-1",
  },
  {
    date: "2026-07-11",
    fixture: "Örgryte - Häcken",
    home: "Örgryte",
    away: "Häcken",
    homeGoals: 4,
    awayGoals: 3,
    homeYellow: 2,
    awayYellow: 2,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 2,
    homeFouls: 13,
    awayFouls: 13,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-11/orgryte-hacken-4-3",
  },
  {
    date: "2026-08-03",
    fixture: "Djurgården - Västerås SK",
    home: "Djurgården",
    away: "Västerås SK",
    homeGoals: 6,
    awayGoals: 0,
    homeYellow: 0,
    awayYellow: 3,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 3,
    awayFreeKicks: 1,
    homeFouls: 8,
    awayFouls: 15,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-03/djurgarden-vasteras-sk-6-0",
  },
  {
    date: "2026-08-10",
    fixture: "Sirius - Brommapojkarna",
    home: "Sirius",
    away: "Brommapojkarna",
    homeGoals: 2,
    awayGoals: 2,
    homeYellow: 1,
    awayYellow: 3,
    homeRed: 0,
    awayRed: 0,
    homeFreeKicks: 2,
    awayFreeKicks: 4,
    homeFouls: 18,
    awayFouls: 14,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-10/sirius-brommapojkarna-2-2",
  },
];

function avg(sum: number, n: number) {
  return Math.round((sum / n) * 10) / 10;
}

export function getVictorWolfHomeAwayProfile(matches = victorWolfAllsvenskan2026Matches) {
  const n = matches.length;
  const homeYellow = matches.reduce((s, m) => s + m.homeYellow, 0);
  const awayYellow = matches.reduce((s, m) => s + m.awayYellow, 0);
  const homeFreeKicks = matches.reduce((s, m) => s + m.homeFreeKicks, 0);
  const awayFreeKicks = matches.reduce((s, m) => s + m.awayFreeKicks, 0);
  const homeFouls = matches.reduce((s, m) => s + m.homeFouls, 0);
  const awayFouls = matches.reduce((s, m) => s + m.awayFouls, 0);
  const homeWins = matches.filter((m) => m.homeGoals > m.awayGoals).length;
  const draws = matches.filter((m) => m.homeGoals === m.awayGoals).length;
  const awayWins = matches.filter((m) => m.awayGoals > m.homeGoals).length;
  const awayMoreYellows = matches.filter((m) => m.awayYellow > m.homeYellow).length;
  const homeMoreYellows = matches.filter((m) => m.homeYellow > m.awayYellow).length;
  const equalYellows = matches.filter((m) => m.homeYellow === m.awayYellow).length;

  return {
    matches: n,
    homeYellowTotal: homeYellow,
    awayYellowTotal: awayYellow,
    homeYellowAvg: avg(homeYellow, n),
    awayYellowAvg: avg(awayYellow, n),
    homeFreeKickAvg: avg(homeFreeKicks, n),
    awayFreeKickAvg: avg(awayFreeKicks, n),
    homeFoulAvg: avg(homeFouls, n),
    awayFoulAvg: avg(awayFouls, n),
    yellowPerMatch: avg(homeYellow + awayYellow, n),
    homeWins,
    draws,
    awayWins,
    awayMoreYellows,
    homeMoreYellows,
    equalYellows,
    /** Career sample from ligan.se (all competitions in dataset) */
    careerCards: { home: 103, away: 115, source: "ligan.se" },
  };
}
