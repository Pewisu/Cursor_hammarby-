// Hammarby Allsvenskan 2026 – domarstatistik per match
// Källa: bolldata.se – frisparkar (freeKicks), fouls, gula/röda kort per match
// Omg. 1–11, 15: hämtad direkt från bolldata.se matchsidor
// Omg. 12 (Hammarby–Kalmar 2-0): fouls/freeKicks härledda via diff mot bolldata.se säsongsaggregat
// Domarindex = (Ham. frisparkar − Motst. frisparkar) + (Motst. kort − Ham. kort)
// Positivt = fördel Hammarby, negativt = nackdel Hammarby
// Senast uppdaterad: 15 juli 2026 (13 matcher, omgång 12 tillagd)

export interface RefereeMatchStats {
  key: string;
  gameweek: number;
  date: string;
  matchName: string;
  sourceUrl: string;
  referee: string;
  /** Effective playing time in seconds (bolldata.se effectivePlayingTimeS) */
  effectivePlayingTimeS: number;
  /** Total match duration in minutes including stoppage time */
  totalTimeMin: number;
  /** Total free kicks (set-piece) in the match */
  totalFreeKicks: number;
  /** Total cards (yellow + red) in the match */
  totalCards: number;
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
    effectivePlayingTimeS: 3116,
    totalTimeMin: 95,
    totalFreeKicks: 5,
    totalCards: 6,
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
    effectivePlayingTimeS: 3307,
    totalTimeMin: 96,
    totalFreeKicks: 7,
    totalCards: 2,
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
    effectivePlayingTimeS: 3236,
    totalTimeMin: 92,
    totalFreeKicks: 3,
    totalCards: 1,
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
    effectivePlayingTimeS: 3396,
    totalTimeMin: 98,
    totalFreeKicks: 9,
    totalCards: 5,
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
    effectivePlayingTimeS: 3125,
    totalTimeMin: 100,
    totalFreeKicks: 7,
    totalCards: 2,
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
    effectivePlayingTimeS: 3133,
    totalTimeMin: 95,
    totalFreeKicks: 5,
    totalCards: 3,
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
    effectivePlayingTimeS: 3113,
    totalTimeMin: 99,
    totalFreeKicks: 6,
    totalCards: 2,
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
    effectivePlayingTimeS: 3232,
    totalTimeMin: 94,
    totalFreeKicks: 4,
    totalCards: 2,
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
    effectivePlayingTimeS: 3021,
    totalTimeMin: 102,
    totalFreeKicks: 5,
    totalCards: 4,
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
    effectivePlayingTimeS: 3148,
    totalTimeMin: 99,
    totalFreeKicks: 1,
    totalCards: 5,
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
    effectivePlayingTimeS: 3587,
    totalTimeMin: 93,
    totalFreeKicks: 4,
    totalCards: 1,
    hammarby: { freeKicks: 2, fouls: 8, foulsSuffered: 9, yellowCards: 0, redCards: 0, isHome: false },
    opponent: { name: "Elfsborg", freeKicks: 2, fouls: 9, foulsSuffered: 7, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-12",
    gameweek: 12,
    date: "2026-07-12",
    matchName: "Hammarby - Kalmar FF, 2-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-12/hammarby-kalmar-2-0",
    referee: "Kristoffer Karlsson",
    effectivePlayingTimeS: 3786,
    totalTimeMin: 95,
    totalFreeKicks: 2,
    totalCards: 2,
    hammarby: { freeKicks: 1, fouls: 11, foulsSuffered: 11, yellowCards: 2, redCards: 0, isHome: true },
    opponent: { name: "Kalmar FF", freeKicks: 1, fouls: 11, foulsSuffered: 11, yellowCards: 0, redCards: 0 },
  },
  {
    key: "omgang-13",
    gameweek: 13,
    date: "2026-07-19",
    matchName: "Hammarby - Degerfors IF, 4-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-19/hammarby-degerfors-4-0",
    referee: "Mohammed Al Hakim",
    effectivePlayingTimeS: 3468,
    totalTimeMin: 93,
    totalFreeKicks: 7,
    totalCards: 1,
    hammarby: { freeKicks: 4, fouls: 11, foulsSuffered: 7, yellowCards: 0, redCards: 0, isHome: true },
    opponent: { name: "Degerfors IF", freeKicks: 3, fouls: 7, foulsSuffered: 11, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-14",
    gameweek: 14,
    date: "2026-07-26",
    matchName: "IF Brommapojkarna - Hammarby, 1-1",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-07-26/brommapojkarna-hammarby-1-1",
    referee: "Adi Aganovic",
    effectivePlayingTimeS: 3653,
    totalTimeMin: 94,
    totalFreeKicks: 5,
    totalCards: 2,
    hammarby: { freeKicks: 3, fouls: 13, foulsSuffered: 9, yellowCards: 1, redCards: 0, isHome: false },
    opponent: { name: "IF Brommapojkarna", freeKicks: 2, fouls: 9, foulsSuffered: 13, yellowCards: 1, redCards: 0 },
  },
  {
    key: "omgang-15",
    gameweek: 15,
    date: "2026-05-20",
    matchName: "GAIS - Hammarby, 2-0",
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-20/gais-hammarby-2-0",
    referee: "Mohammed Al Hakim",
    effectivePlayingTimeS: 3557,
    totalTimeMin: 97,
    totalFreeKicks: 6,
    totalCards: 4,
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

export type DomarRating = {
  label: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  description: string;
};

export function getDomarRating(index: number): DomarRating {
  if (index <= -6) return {
    label: "Sopa",
    emoji: "🗑️",
    color: "text-red-400",
    bg: "bg-red-950/50",
    border: "border-red-700/60",
    description: "Katastrofalt. Hammarby kördes över från första till sista minut.",
  };
  if (index <= -3) return {
    label: "Idiot",
    emoji: "🤦",
    color: "text-rose-400",
    bg: "bg-rose-950/40",
    border: "border-rose-700/50",
    description: "Upprörande domslut. Hammarby behandlades märkbart orättvist.",
  };
  if (index <= -1) return {
    label: "Svag",
    emoji: "😒",
    color: "text-orange-400",
    bg: "bg-orange-950/30",
    border: "border-orange-700/40",
    description: "Lite för mycket åt motståndarens håll. Kan göras bättre.",
  };
  if (index === 0) return {
    label: "Neutral",
    emoji: "⚖️",
    color: "text-slate-300",
    bg: "bg-slate-800/40",
    border: "border-slate-600/40",
    description: "Perfekt balans. Domarens bästa prestation är att synas minst.",
  };
  if (index <= 2) return {
    label: "Godkänd",
    emoji: "👍",
    color: "text-sky-300",
    bg: "bg-sky-950/30",
    border: "border-sky-700/40",
    description: "Tillräckligt bra. Inget att klaga på den här gången.",
  };
  if (index <= 5) return {
    label: "Bra",
    emoji: "✅",
    color: "text-emerald-300",
    bg: "bg-emerald-950/30",
    border: "border-emerald-700/40",
    description: "Tydliga beslut och rättvis hantering. Hammarby gynnades.",
  };
  return {
    label: "Utmärkt",
    emoji: "⭐",
    color: "text-yellow-300",
    bg: "bg-yellow-950/30",
    border: "border-yellow-700/40",
    description: "Exemplarisk domarinsats. Hammarby fick vad de förtjänade.",
  };
}
