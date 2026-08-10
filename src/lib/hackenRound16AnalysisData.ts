import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchSnapshotPill,
  MatchSnapshotStat,
  MatchStoryPhase,
} from "@/lib/elfsborgRound11AnalysisData";

function toMatchSpiderScore(
  hammarbyValue: number,
  opponentValue: number,
): { hammarbyScore: number; opponentScore: number } {
  const max = Math.max(hammarbyValue, opponentValue, 0.0001);
  return {
    hammarbyScore: Math.round((hammarbyValue / max) * 100),
    opponentScore: Math.round((opponentValue / max) * 100),
  };
}

function buildMatchSpiderAxis(
  label: string,
  hammarbyValue: number,
  opponentValue: number,
  hammarbyDisplay: string,
  opponentDisplay: string,
  note: string,
): SpiderComparisonAxis {
  const scores = toMatchSpiderScore(hammarbyValue, opponentValue);
  return {
    label,
    hammarbyValue: hammarbyDisplay,
    opponentValue: opponentDisplay,
    hammarbyScore: scores.hammarbyScore,
    opponentScore: scores.opponentScore,
    note,
  };
}

/** Matchstatistik – Omgång 16 · Hammarby vs BK Häcken (3–0) · 9 aug 2026. */
export const hackenRound16MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    3.17,
    0.38,
    "3,17",
    "0,38",
    "8,3× mer förväntat mål för Hammarby – ett av säsongens starkaste xG-överlägsen.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    15,
    2,
    "15",
    "2",
    "7,5× fler avslut – Häcken hade knappt en chans att hota under hela matchen.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    9,
    0,
    "9",
    "0",
    "9–0 i skott på mål. Hahn höll nollan utan en enda räddning att göra.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    65,
    35,
    "65%",
    "35%",
    "Nästan dubbelt så mycket bollinnehav – Hammarby kontrollerade matchen helt.",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    40,
    10,
    "40",
    "10",
    "4× fler beröringar i Häckens straffområde – konstant tryck mot Häckens bakre linje.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    12,
    2,
    "12",
    "2",
    "12 mot 2 hörnor – fullständig territoriell dominans längs hela 90 minuter.",
  ),
  buildMatchSpiderAxis(
    "Lyckade passningar",
    545,
    273,
    "545 (87%)",
    "273 (80%)",
    "Dubbelt så många lyckade passningar med högre precision – Hammarby styrde spelbilden.",
  ),
  buildMatchSpiderAxis(
    "Stora möjligheter",
    10,
    1,
    "10",
    "1",
    "10 mot 1 high opportunity shots – chansöverlägsenhet i klass med säsongens bästa.",
  ),
];

export const hackenRound16Goals: MatchGoalEvent[] = [
  { minute: 29, team: "Hammarby", player: "W. Renecke (nick, assist V. Lind)", xg: 0.18 },
  { minute: 38, team: "Hammarby", player: "V. Lind (retur)", xg: 0.55 },
  { minute: 56, team: "Hammarby", player: "P. Abraham (retur)", xg: 0.28 },
];

export const hackenRound16MatchStory: MatchStoryPhase[] = [
  {
    id: "opening",
    label: "Inledning · Hammarby tar kommandot",
    scoreline: "0–0, 1–10'",
    body:
      "Hammarby tog kontroll från avspark och tryckte Häcken tillbaka tidigt. Med 65% bollinnehav och ett organiserat press stängde man ute BK Häcken som saknade skadade Julius Lindberg. Häckens målvakt David Andersson fick göra sin första start sedan april.",
    tone: "blue",
  },
  {
    id: "first-goal",
    label: "Renecke öppnar – 1-0 i minut 29",
    scoreline: "1–0 HIF 29'",
    body:
      "Victor Lind serverade en akrobatisk assist och Waylon Renecke nickade in ledningsmålet – sydafrikanens debut-mål på hemmaplan i Hammarbytröjan efter att ha anslutit från FC Köpenhamn i juli. En strängt förtjänt ledning efter ett kvarts timmes dominans.",
    tone: "emerald",
  },
  {
    id: "second-goal",
    label: "Lind fördubblar ledningen – 2-0 i minut 38",
    scoreline: "2–0 HIF 38'",
    body:
      "Bare nio minuter efter 1-0 utökade Victor Lind till 2–0 på en retur. Lind hade nu både mål och assist i matchen och befäste sin roll som Hammarbys mest avgörande spelare i 2026 (7 mål + 7 assist i Allsvenskan). Häcken var redan nedspelat vid pausvisslan.",
    tone: "emerald",
  },
  {
    id: "third-goal",
    label: "Abraham sätter spiken i kistan – 3-0 i minut 56",
    scoreline: "3–0 HIF 56'",
    body:
      "Tidigt i andra halvlek tryckte Paulos Abraham in 3–0 på en retur. Matchen var praktiskt taget avgjord och Hammarby kunde lugna ner tempot. Häcken lyckades inte producera ett enda skott på mål under hela matchen.",
    tone: "emerald",
  },
  {
    id: "second-half",
    label: "Andra halvlek · kontroll och nolla",
    scoreline: "3–0 · rent spel",
    body:
      "Med ett bekvämt 3–0 svalnade Hammarbys offensiva intensitet men den defensiva strukturen förblev orubblig. Häcken hade totalt 0,38 xG och noll skott på mål. Warner Hahn höll en behaglig nolla – säsongens mest övertygande defensiva prestation hemma.",
    tone: "blue",
  },
  {
    id: "verdict",
    label: "Slutbild · ett av säsongens mäktigaste framträdanden",
    scoreline: "3–0 · 3,17 xG mot 0,38 xG",
    body:
      "15 avslut, 9 på mål, 12 hörnor, 40 boxberöringar, 3,17 xG mot Häckens 0 skott på mål. Hammarby klev om Djurgården i tabellen och befäste andraplats i Allsvenskan. Segersiffrorna var, som FotbollDirekt noterade, i underkant.",
    tone: "slate",
  },
];

export const hackenRound16Takeaways: MatchRecapTakeaway[] = [
  {
    id: "dominance",
    title: "Fullständig dominans – 3,17 xG mot 0,38",
    body:
      "Hammarby skapade 3,17 xG mot Häckens 0,38 – 8,3× överlägsenhet. 15 avslut mot 2, 9 på mål mot 0, 40 boxberöringar mot 10. Twelve-rapporten rankar chanskapandet som 2:a bäst i ligan den här matchen.",
    tone: "emerald",
    stat: "3,17 xG · 15 avslut · 9 på mål",
  },
  {
    id: "lind",
    title: "Victor Lind – mål + assist · 7+7 i Allsvenskan 2026",
    body:
      "Lind var matchens motor med en akrobatisk assist till Renecke och ett eget mål på retur. Med 7 mål och 7 assist i Allsvenskan 2026 är 23-åringen Hammarbys absolut viktigaste spelare den här säsongen.",
    tone: "emerald",
    stat: "V. Lind: 1 mål + 1 assist",
  },
  {
    id: "renecke",
    title: "Reneckes hemmadebut-mål",
    body:
      "Waylon Renecke, 20, anslöt från FC Köpenhamn i juli och firade sitt första hemmamål i Hammarbytröjan med en nick i 29'. En lovande insats av den sydafrikanske mittbacken.",
    tone: "blue",
    stat: "W. Renecke 29' · debut hemmamål",
  },
  {
    id: "clean-sheet",
    title: "Nolla – 0 skott på mål från Häcken",
    body:
      "Warner Hahn höll nollan utan en enda räddning – Häcken lyckades inte producera ett enda skott på mål under hela matchen. Defensiv prestation rankat 2:a bäst i ligan i opposition chance creation.",
    tone: "blue",
    stat: "0 skott på mål (Häcken) · PPDA 5,70",
  },
  {
    id: "table",
    title: "Kliver om Djurgården – andraplats",
    body:
      "Med segern klättrade Hammarby förbi Djurgården och befäste andraplats i Allsvenskan bakom Sirius. Häcken lider nu av tre raka matcher utan seger.",
    tone: "emerald",
    stat: "2:a plats i Allsvenskan",
  },
];

export const hackenRound16SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 3.17, opponentValue: 0.38, hammarbyDisplay: "3,17", opponentDisplay: "0,38" },
  { label: "Avslut", hammarbyValue: 15, opponentValue: 2, hammarbyDisplay: "15", opponentDisplay: "2" },
  { label: "Bollinnehav", hammarbyValue: 65, opponentValue: 35, hammarbyDisplay: "65%", opponentDisplay: "35%" },
  { label: "Boxberöringar", hammarbyValue: 40, opponentValue: 10, hammarbyDisplay: "40", opponentDisplay: "10" },
];

export const hackenRound16SnapshotPills: MatchSnapshotPill[] = [
  { id: "result", label: "Seger 3–0", tone: "emerald" },
  { id: "xg", label: "3,17 xG (HIF)", tone: "emerald" },
  { id: "renecke", label: "Renecke 29' 🎯", tone: "blue" },
  { id: "lind", label: "V. Lind 38' ⚡", tone: "blue" },
  { id: "abraham", label: "Abraham 56' ✅", tone: "emerald" },
];

export const hackenRound16Recap = {
  headline: "Hammarby körde över Häcken – en av säsongens starkaste insatser",
  tagline: "3,17 xG · 9 skott på mål · Häcken noll skott på mål",
  opponentScore: 0,
  hammarbyScore: 3,
  opponentXg: 0.38,
  hammarbyXg: 3.17,
  halftimeScore: "2–0",
  matchResult: "3–0",
  dateLabel: "9 aug 2026 · Omgång 16 · 3Arena · ~23 000 åskådare",
  sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-09/hammarby-hacken-3-0",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/",
};

/** Twelve KPI-data för omgång 16. Säsongssnitt = HIF Allsvenskan 2026 omg 1-15. */
export const hackenRound16TwelveKpis = {
  /** Field tilt = HIF:s andel av final-third-xT (%). Twelve-rapport: 72%. Snitt omg 1-15: ~64%. */
  fieldTiltPct: 72,
  fieldTiltAvgPct: 64,
  /** PPDA = Passes Per Defensive Action. Lägre = hårdare press. Match: 5.70. Snitt omg 1-15: ~4.0. */
  ppda: 5.70,
  ppdaAvg: 4.03,
  /** xT – förväntat hot. Match: 1.67. */
  xt: 1.67,
  xtAvg: 1.28,
  /** Motst. xT. Match: 0.66. */
  oppXt: 0.66,
  oppXtAvg: 0.93,
  /** Defensiv aktionshöjd (m). Match: 42.54. Lägre = mer kompakt block. */
  defensiveActionHeightM: 42.54,
  defensiveActionHeightAvg: 44.10,
  /** Passningar in i box. Match: 34 boxberöringar (Twelve: 34 Box touches). */
  boxTouches: 34,
  boxTouchesAvg: 22,
  /** Presstäthet – Twelve defensive intensity metric. Match: 5.94. */
  defensiveIntensity: 5.94,
  defensiveIntensityAvg: 5.47,
  /** Twelve ranking (ur 28 lag i ligan) för denna match. Lägre rank = bättre. */
  rankings: {
    chanceCreation: { rank: 2, total: 28, label: "Chanskapande" },
    oppChanceCreation: { rank: 2, total: 28, label: "Mot. chanskapande" },
    attack: { rank: 21, total: 28, label: "Attack" },
    defence: { rank: 14, total: 28, label: "Försvar" },
    defTransition: { rank: 12, total: 28, label: "Def. transition" },
    attTransition: { rank: 19, total: 28, label: "Off. transition" },
  },
} as const;

export interface MomentumPoint {
  minute: number;
  /** Positive = Hammarby press, negative = Häcken press */
  value: number;
}

export interface MomentumGoal {
  minute: number;
  team: "hammarby" | "opponent";
  label: string;
}

/**
 * Matchmomentum omgång 16 – Hammarby vs BK Häcken
 * Härledd från Twelve xT per 15-minutersperiod och xG-progression.
 * Positiva värden = Hammarby-dominans, negativa = Häcken-dominans.
 *
 * xT per period (Hammarby / Häcken):
 *   0-15: 0.17 / 0.16  · 15-30: 0.44 / 0.05  · 30-HT: 0.64 / 0.07
 *   45-60: 0.23 / 0.09 · 60-75: 0.11 / 0.18  · 75-FT: 0.09 / 0.11
 */
export const hackenRound16Momentum: MomentumPoint[] = [
  { minute: 0,  value: 0   },
  { minute: 5,  value: 5   },
  { minute: 10, value: 12  },
  { minute: 15, value: 8   },
  { minute: 20, value: 28  },
  { minute: 25, value: 45  },
  { minute: 29, value: 60  },  // Renecke 1-0
  { minute: 32, value: 52  },
  { minute: 35, value: 62  },
  { minute: 38, value: 75  },  // V. Lind 2-0
  { minute: 42, value: 58  },
  { minute: 45, value: 48  },
  { minute: 48, value: 38  },
  { minute: 52, value: 45  },
  { minute: 56, value: 55  },  // P. Abraham 3-0
  { minute: 60, value: 30  },
  { minute: 63, value: 10  },
  { minute: 67, value: -8  },
  { minute: 72, value: -12 },
  { minute: 75, value: -10 },
  { minute: 80, value: -6  },
  { minute: 85, value: -4  },
  { minute: 90, value: 3   },
];

export const hackenRound16MomentumGoals: MomentumGoal[] = [
  { minute: 29, team: "hammarby", label: "Renecke 1–0" },
  { minute: 38, team: "hammarby", label: "V. Lind 2–0" },
  { minute: 56, team: "hammarby", label: "Abraham 3–0" },
];

/** Referee mini-analysis for round 16 */
export const hackenRound16RefereeData = {
  refereeName: "Adam Ladebäck",
  matchFoulsHIF: 12,
  matchFoulsOpp: 17,
  matchYellowHIF: 1,
  matchYellowOpp: 1,
  matchRedHIF: 0,
  matchRedOpp: 0,
  /** domarindex för denna match: freeKickDiff + cardDiff */
  domarindexThisMatch: 2,
  /** Previous Hammarby match with this referee (omgång 9 vs AIK) */
  previousMatch: {
    gameweek: 9,
    matchName: "Hammarby – AIK, 1-2",
    date: "24 maj 2026",
    domarindex: 5,
    ratingLabel: "Bra",
    note: "Adam Ladebäck gav Hammarby 5 frisparkar mot AIKs 0. Hammarbys enda möte med Ladebäck i år innan denna match.",
  },
  seasonStats: {
    matchesWithHIF: 2,
    avgDomarindex: 3.5,
    ratingLabel: "Bra",
  },
  analysis:
    "Adam Ladebäck ledde matchen med god kontroll. Häcken fick mer fouls mot sig (17 mot 12) vilket gav Hammarby fri­sparks­fördel. Inga röda kort och en gul varning på vardera lag – en balanserad domarinsats utan kontroverser. Ladebäcks Hammarby-index denna säsong är +3,5 i snitt (2 matcher), vilket placerar honom bland de mer Hammarby-gynnsamma domarna i 2026.",
};
