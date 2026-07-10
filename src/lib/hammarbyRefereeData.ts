// Hammarby Allsvenskan 2026 – domarstatistik per match
// Källa: bolldata.se – frisparkar (freeKicks), fouls, gula/röda kort per match
// Domarindex = (Ham. frisparkar − Motst. frisparkar) + (Motst. kort − Ham. kort)
// Positivt = fördel Hammarby, negativt = nackdel Hammarby

export interface RefereeMatchStats {
  key: string;
  gameweek: number;
  date: string;
  matchName: string;
  sourceUrl: string;
  referee: string;
  hammarby: {
    freeKicks: number;
    fouls: number;
    foulsSuffered: number;
    yellowCards: number;
    redCards: number;
    isHome: boolean;
  };
  opponent: {
    name: string;
    freeKicks: number;
    fouls: number;
    foulsSuffered: number;
    yellowCards: number;
    redCards: number;
  };
}

export const hammarbyRefereeMatches: RefereeMatchStats[] = [
  {
    key: "omgang-1",
    gameweek: 1,
    date: "2026-04-04",
    matchName: "Hammarby - Mjällby, 3-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-04/hammarby-mjallby-3-0",
    referee: "Kristoffer Karlsson",
    hammarby: { freeKicks: 2, fouls: 17, foulsSuffered: 16, yellowCards: 2, redCards: 0, isHome: true },
    opponent: { name: "Mjällby", freeKicks: 3, fouls: 16, foulsSuffered: 15, yellowCards: 4, redCards: 0 },
  },
  {
    key: "omgang-2",
    gameweek: 2,
    date: "2026-04-13",
    matchName: "Sirius - Hammarby, 2-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-13/sirius-hammarby-2-0",
    referee: "Glenn Nyberg",
    hammarby: { freeKicks: 1, fouls: 12, foulsSuffered: 14, yellowCards: 2, redCards: 0, isHome: false },
    opponent: { name: "Sirius", freeKicks: 6, fouls: 14, foulsSuffered: 12, yellowCards: 0, redCards: 0 },
  },
  {
    key: "omgang-3",
    gameweek: 3,
    date: "2026-04-18",
    matchName: "Hammarby - Örgryte, 8-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-18/hammarby-orgryte-8-1",
    referee: "Granit Maqedonci",
    hammarby: { freeKicks: 1, fouls: 8, foulsSuffered: 9, yellowCards: 0, redCards: 0, isHome: true },
    opponent: { name: "Örgryte", freeKicks: 2, fouls: 9, foulsSuffered: 8, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-4",
    gameweek: 4,
    date: "2026-04-22",
    matchName: "Hammarby - Halmstad, 1-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-22/hammarby-halmstad-1-1",
    referee: "Erik Mattsson",
    hammarby: { freeKicks: 4, fouls: 13, foulsSuffered: 14, yellowCards: 2, redCards: 0, isHome: true },
    opponent: { name: "Halmstad", freeKicks: 5, fouls: 14, foulsSuffered: 13, yellowCards: 3, redCards: 0 },
  },
  {
    key: "omgang-5",
    gameweek: 5,
    date: "2026-04-26",
    matchName: "Djurgården - Hammarby, 1-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-26/djurgarden-hammarby-1-1",
    referee: "Glenn Nyberg",
    hammarby: { freeKicks: 6, fouls: 8, foulsSuffered: 20, yellowCards: 1, redCards: 0, isHome: false },
    opponent: { name: "Djurgården", freeKicks: 1, fouls: 20, foulsSuffered: 8, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-6",
    gameweek: 6,
    date: "2026-05-03",
    matchName: "Hammarby - Västerås SK, 3-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-03/hammarby-vasteras-sk-3-0",
    referee: "Fredrik Klitte",
    hammarby: { freeKicks: 3, fouls: 10, foulsSuffered: 14, yellowCards: 1, redCards: 0, isHome: true },
    opponent: { name: "Västerås SK", freeKicks: 2, fouls: 14, foulsSuffered: 9, yellowCards: 2, redCards: 0 },
  },
  {
    key: "omgang-7",
    gameweek: 7,
    date: "2026-05-09",
    matchName: "IFK Göteborg - Hammarby, 0-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-09/ifk-goteborg-hammarby-0-1",
    referee: "Victor Wolf",
    hammarby: { freeKicks: 5, fouls: 9, foulsSuffered: 20, yellowCards: 0, redCards: 0, isHome: false },
    opponent: { name: "IFK Göteborg", freeKicks: 1, fouls: 20, foulsSuffered: 9, yellowCards: 2, redCards: 0 },
  },
  {
    key: "omgang-8",
    gameweek: 8,
    date: "2026-05-17",
    matchName: "Hammarby - Malmö FF, 4-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-17/hammarby-malmo-ff-4-1",
    referee: "Oscar Johnson",
    hammarby: { freeKicks: 4, fouls: 12, foulsSuffered: 16, yellowCards: 0, redCards: 0, isHome: true },
    opponent: { name: "Malmö FF", freeKicks: 0, fouls: 16, foulsSuffered: 12, yellowCards: 2, redCards: 0 },
  },
  {
    key: "omgang-9",
    gameweek: 9,
    date: "2026-05-24",
    matchName: "Hammarby - AIK, 1-2",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-24/hammarby-aik-1-2",
    referee: "Adam Ladebäck",
    hammarby: { freeKicks: 5, fouls: 11, foulsSuffered: 18, yellowCards: 1, redCards: 0, isHome: true },
    opponent: { name: "AIK", freeKicks: 0, fouls: 18, foulsSuffered: 11, yellowCards: 3, redCards: 0 },
  },
  {
    key: "omgang-10",
    gameweek: 10,
    date: "2026-05-31",
    matchName: "BK Häcken - Hammarby, 3-2",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-31/hacken-hammarby-3-2",
    referee: "Tess Olofsson",
    hammarby: { freeKicks: 1, fouls: 8, foulsSuffered: 11, yellowCards: 2, redCards: 0, isHome: false },
    opponent: { name: "Häcken", freeKicks: 0, fouls: 11, foulsSuffered: 8, yellowCards: 3, redCards: 0 },
  },
  {
    key: "omgang-11",
    gameweek: 11,
    date: "2026-07-05",
    matchName: "Elfsborg - Hammarby, 1-2",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-05/elfsborg-hammarby-1-2",
    referee: "Richard Sundell",
    hammarby: { freeKicks: 2, fouls: 8, foulsSuffered: 9, yellowCards: 0, redCards: 0, isHome: false },
    opponent: { name: "Elfsborg", freeKicks: 2, fouls: 9, foulsSuffered: 7, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-15",
    gameweek: 15,
    date: "2026-05-20",
    matchName: "GAIS - Hammarby, 2-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-20/gais-hammarby-2-0",
    referee: "Mohammed Al Hakim",
    hammarby: { freeKicks: 5, fouls: 11, foulsSuffered: 15, yellowCards: 1, redCards: 1, isHome: false },
    opponent: { name: "GAIS", freeKicks: 1, fouls: 15, foulsSuffered: 10, yellowCards: 2, redCards: 0 },
  },
];

export function calcDomarindex(match: RefereeMatchStats): number {
  const freeKickDiff = match.hammarby.freeKicks - match.opponent.freeKicks;
  const hamCards = match.hammarby.yellowCards + match.hammarby.redCards * 2;
  const oppCards = match.opponent.yellowCards + match.opponent.redCards * 2;
  return freeKickDiff + (oppCards - hamCards);
}

export function calcFreeKickDiff(match: RefereeMatchStats): number {
  return match.hammarby.freeKicks - match.opponent.freeKicks;
}

export function calcCardDiff(match: RefereeMatchStats): number {
  const hamCards = match.hammarby.yellowCards + match.hammarby.redCards * 2;
  const oppCards = match.opponent.yellowCards + match.opponent.redCards * 2;
  return oppCards - hamCards;
}
