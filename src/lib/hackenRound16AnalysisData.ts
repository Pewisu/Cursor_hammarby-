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
