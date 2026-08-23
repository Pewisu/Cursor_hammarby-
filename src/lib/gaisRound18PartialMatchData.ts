/**
 * Delstatistik från FotMob för Hammarby–GAIS 2–0, omgång 18.
 * Kompletteras när fullständiga match- och Twelve-rapporter finns.
 */
export const gaisRound18PartialMatchData = {
  gameweek: 18,
  date: "2026-08-23",
  matchName: "Hammarby - GAIS, 2-0",
  hammarby: {
    goals: 2,
    possessionPercent: 66,
    xg: 2.47,
    shots: 28,
    shotsOnTarget: 7,
    touchesInOppositionBox: 36,
    bigChances: 4,
    bigChancesMissed: 3,
    accuratePasses: 606,
    passAccuracyPercent: 87,
    fouls: 12,
    offsides: 0,
    corners: 8,
  },
  opponent: {
    teamName: "GAIS",
    goals: 0,
    possessionPercent: 34,
    xg: 0.57,
    shots: 9,
    shotsOnTarget: 1,
    touchesInOppositionBox: 10,
    bigChances: 0,
    bigChancesMissed: 0,
    accuratePasses: 262,
    passAccuracyPercent: 74,
    fouls: 18,
    offsides: 2,
    corners: 1,
  },
} as const;
