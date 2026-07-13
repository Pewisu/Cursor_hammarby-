/**
 * Hammarby team distance per match — historical data.
 *
 * Season 2025: all 30 rounds, fetched from the Allsvenskan matchStats API.
 * Season 2024: matchStats API does not expose 2024 data; omitted.
 * Season 2026: covered in detail by hammarbyRunningData.ts; omitted here to avoid duplication.
 */

export interface TeamDistanceHistoryEntry {
  matchId: number;
  season: number;
  round: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  hammarbyWasHome: boolean;
  hammarbyTeamDistanceMeters: number;
}

export const hammarbyTeamDistanceHistory: TeamDistanceHistoryEntry[] = [
  { matchId: 6143153, season: 2025, round: "Omgång 1",  date: "2025-03-30", homeTeam: "Hammarby", awayTeam: "IFK Göteborg", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 115873 },
  { matchId: 6143161, season: 2025, round: "Omgång 2",  date: "2025-04-06", homeTeam: "IF Brommapojkarna", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 120545 },
  { matchId: 6143169, season: 2025, round: "Omgång 3",  date: "2025-04-13", homeTeam: "Hammarby", awayTeam: "Djurgårdens IF", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 113678 },
  { matchId: 6143181, season: 2025, round: "Omgång 4",  date: "2025-04-18", homeTeam: "Mjällby AIF", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 116395 },
  { matchId: 6143185, season: 2025, round: "Omgång 5",  date: "2025-04-23", homeTeam: "Hammarby", awayTeam: "Malmö FF", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 122411 },
  { matchId: 6143195, season: 2025, round: "Omgång 6",  date: "2025-04-27", homeTeam: "BK Häcken", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 121758 },
  { matchId: 6143202, season: 2025, round: "Omgång 7",  date: "2025-05-04", homeTeam: "Östers IF", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 122466 },
  { matchId: 6143209, season: 2025, round: "Omgång 8",  date: "2025-05-11", homeTeam: "Hammarby", awayTeam: "IFK Norrköping", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 120620 },
  { matchId: 6143217, season: 2025, round: "Omgång 9",  date: "2025-05-14", homeTeam: "Hammarby", awayTeam: "IK Sirius", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 117770 },
  { matchId: 6143224, season: 2025, round: "Omgång 10", date: "2025-05-18", homeTeam: "AIK", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 111089 },
  { matchId: 6143233, season: 2025, round: "Omgång 11", date: "2025-05-26", homeTeam: "Hammarby", awayTeam: "Degerfors IF", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 123809 },
  { matchId: 6143241, season: 2025, round: "Omgång 12", date: "2025-05-31", homeTeam: "IF Elfsborg", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 114200 },
  { matchId: 6143250, season: 2025, round: "Omgång 13", date: "2025-06-28", homeTeam: "Hammarby", awayTeam: "Halmstads BK", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 115963 },
  { matchId: 6143257, season: 2025, round: "Omgång 14", date: "2025-07-05", homeTeam: "Hammarby", awayTeam: "IFK Värnamo", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 119666 },
  { matchId: 6143266, season: 2025, round: "Omgång 15", date: "2025-07-13", homeTeam: "GAIS", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 121420 },
  { matchId: 6143273, season: 2025, round: "Omgång 16", date: "2025-07-20", homeTeam: "Hammarby", awayTeam: "IF Brommapojkarna", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 122059 },
  { matchId: 6143287, season: 2025, round: "Omgång 17", date: "2025-07-27", homeTeam: "IFK Värnamo", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 110347 },
  { matchId: 6143289, season: 2025, round: "Omgång 18", date: "2025-05-22", homeTeam: "Hammarby", awayTeam: "Mjällby AIF", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 123213 },
  { matchId: 6143301, season: 2025, round: "Omgång 19", date: "2025-08-10", homeTeam: "IFK Norrköping", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 112571 },
  { matchId: 6143304, season: 2025, round: "Omgång 20", date: "2025-08-17", homeTeam: "Hammarby", awayTeam: "GAIS", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 124685 },
  { matchId: 6143318, season: 2025, round: "Omgång 21", date: "2025-08-24", homeTeam: "IK Sirius", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 113870 },
  { matchId: 6143322, season: 2025, round: "Omgång 22", date: "2025-08-31", homeTeam: "Hammarby", awayTeam: "Östers IF", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 115846 },
  { matchId: 6143330, season: 2025, round: "Omgång 23", date: "2025-09-14", homeTeam: "Djurgårdens IF", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 74170 },
  { matchId: 6143337, season: 2025, round: "Omgång 24", date: "2025-09-21", homeTeam: "Hammarby", awayTeam: "BK Häcken", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 100627 },
  { matchId: 6143352, season: 2025, round: "Omgång 25", date: "2025-09-28", homeTeam: "Halmstads BK", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 106496 },
  { matchId: 6143356, season: 2025, round: "Omgång 26", date: "2025-10-05", homeTeam: "IFK Göteborg", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 125727 },
  { matchId: 6143361, season: 2025, round: "Omgång 27", date: "2025-10-19", homeTeam: "Hammarby", awayTeam: "AIK", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 125908 },
  { matchId: 6143373, season: 2025, round: "Omgång 28", date: "2025-10-27", homeTeam: "Malmö FF", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 121939 },
  { matchId: 6143383, season: 2025, round: "Omgång 29", date: "2025-11-03", homeTeam: "Degerfors IF", awayTeam: "Hammarby", hammarbyWasHome: false, hammarbyTeamDistanceMeters: 119896 },
  { matchId: 6143386, season: 2025, round: "Omgång 30", date: "2025-11-09", homeTeam: "Hammarby", awayTeam: "IF Elfsborg", hammarbyWasHome: true,  hammarbyTeamDistanceMeters: 119599 },
];
