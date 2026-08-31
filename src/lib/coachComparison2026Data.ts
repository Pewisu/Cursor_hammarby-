export const coachRecords2026 = {
  karlsson: {
    matches: 11,
    wins: 5,
    draws: 2,
    losses: 4,
    points: 17,
    goalsFor: 24,
    goalsAgainst: 13,
    roundsLabel: "Omg 1–10 + 15",
  },
  rydstrom: {
    matches: 8,
    wins: 6,
    draws: 1,
    losses: 1,
    points: 19,
    goalsFor: 20,
    goalsAgainst: 5,
    roundsLabel: "Omg 11–14, 16–19",
  },
} as const;

export type CoachRecord2026 =
  (typeof coachRecords2026)[keyof typeof coachRecords2026];

export function getCoachRecordAverages(record: CoachRecord2026) {
  return {
    pointsPerGame: record.points / record.matches,
    goalsForPerGame: record.goalsFor / record.matches,
    goalsAgainstPerGame: record.goalsAgainst / record.matches,
    goalDifference: record.goalsFor - record.goalsAgainst,
  };
}
