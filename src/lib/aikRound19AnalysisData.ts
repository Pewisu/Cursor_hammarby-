import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchSnapshotPill,
  MatchSnapshotStat,
  MatchStoryPhase,
} from "@/lib/elfsborgRound11AnalysisData";

/** Färgkodning: HIF-grönt + AIK-svart/guld. */
export const ROUND19_HIF_GREEN = "#006633";
export const ROUND19_HIF_LIGHT = "#5fd39a";
export const ROUND19_AIK_GOLD = "#C5A572";
export const ROUND19_AIK_MUTED = "#a8a29e";

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

/** Matchstatistik – Omgång 19 · AIK vs Hammarby (3–2) · 30 aug 2026. */
export const aikRound19MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    4.26,
    1.91,
    "4,26",
    "1,91",
    "Mer än dubbelt så mycket xG – men AIK vann på finish och omställningar.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    29,
    10,
    "29",
    "10",
    "Nästan 3× fler avslut. Volymen fanns – konverteringen saknades i de avgörande lägena.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    11,
    6,
    "11",
    "6",
    "11–6 på mål. HIF skapade mer – AIK satte tre av sex.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    56,
    44,
    "56%",
    "44%",
    "Kontroll i bollinnehav, men field tilt och tempo räckte inte när AIK kontrade.",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    39,
    16,
    "39",
    "16",
    "Boxplanen levererade volym (39) – men AIK straffade de få kontringarna.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    7,
    1,
    "7",
    "1",
    "7–1 i hörnor. Territoriell dominans utan att stänga matchen.",
  ),
  buildMatchSpiderAxis(
    "Lyckade passningar",
    449,
    324,
    "449 (89%)",
    "324 (85%)",
    "Högre precision och mer boll – spelet stämde, resultatet inte.",
  ),
  buildMatchSpiderAxis(
    "Stora möjligheter",
    12,
    6,
    "12",
    "6",
    "Twelve high opportunity shots (xG > 0,15): HIF 12, AIK 6 – AIK konverterade bättre.",
  ),
];

export const aikRound19Goals: MatchGoalEvent[] = [
  { minute: 14, team: "Hammarby", player: "F. Adjei", xg: 0.18 },
  { minute: 15, team: "AIK", player: "L. Carlstrand (assist K. Filling)", xg: 0.45 },
  { minute: 45, team: "Hammarby", player: "P. Abraham", xg: 0.52 },
  { minute: 72, team: "AIK", player: "A. Kouame (assist K. Filling)", xg: 0.35 },
  { minute: 83, team: "AIK", player: "S. Gustafsson (assist L. Camara)", xg: 0.4 },
];

export const aikRound19MatchStory: MatchStoryPhase[] = [
  {
    id: "opening-exchange",
    label: "Öppning · Adjei leder, Carlstrand kvitterar",
    scoreline: "1–1 · 15'",
    body:
      "Frank Adjei sköt in 1–0 i minut 14 via täckande försvarare. Direkt efteråt frispelade Kevin Filling (17) Linus Carlstrand till 1–1. Derbyt exploderade – och AIK:s variance-profil (kliniska inhopp/finish) syntes redan tidigt.",
    tone: "amber",
  },
  {
    id: "missed-pen-lead",
    label: "Straffmiss + Abraham 2–1 före paus",
    scoreline: "1–2 HT",
    body:
      "Hammarby fick straff som Nordfeldt räddade. Paulos Abraham tog revansch precis före paus (45+4) när Nordfeldt bjöd på retur – HT 1–2. Twelve: HIF ≈ 2,5 np-xG redan i 1H (0,18+1,10+1,21). Spelet pekade mot bortaseger.",
    tone: "emerald",
  },
  {
    id: "aik-comeback",
    label: "Andra halvlek · Kouame och Gustafsson vänder",
    scoreline: "3–2 · Filling + ungarna",
    body:
      "I 72' serverade Filling igen – inbytte Axel Kouame kvitterade till 2–2. Kort därefter byttes Filling mot Sixten Gustafsson (19). I 83' mötte Gustafsson Camaras inlägg på volley till 3–2. Scoutingvarningen om Carlstrand/sena mål och AIK:s överprestation slog in – via ungdomarna.",
    tone: "amber",
  },
  {
    id: "verdict",
    label: "Slutbild · xG-dominans utan poäng",
    scoreline: "3–2 · 4,26 xG mot 1,91",
    body:
      "Hammarby hade mer av allt under ytan (xG 4,26–1,91, 29–10 avslut, field tilt 74 %, xP 2,67, win prob 86 %) men släppte in tre mål på AIK:s omställningar. Twelve Outcome: defensive frailties cost a promising performance. Ingen revansch för maj – samma derby, samma bittra facit.",
    tone: "slate",
  },
];

export const aikRound19Takeaways: MatchRecapTakeaway[] = [
  {
    id: "xg-without-points",
    title: "xG-kungen utan poäng",
    body:
      "4,26 xG (Bolldata) / 4,61 (Twelve), 29 avslut, 12 HO-shots och 39 boxberöringar. Underliggande spelet var elite – resultatet 0 poäng. Klassiskt derby där finish och omställningar avgjorde, inte volym.",
    tone: "amber",
    stat: "4,26 xG · 2 mål · 0 p",
  },
  {
    id: "aik-variance",
    title: "AIK:s variance slog till – igen",
    body:
      "Förhandsanalysen flaggade defensiv tur och kliniska inhopp (Carlstrand). Nu startade Carlstrand och gjorde 1–1, Kouame kvitterade, 19-årige Gustafsson avgjorde. Opp. np-xG 1,82 → 3 mål. Exakt den överprestation scoutingplanen varnade för.",
    tone: "amber",
    stat: "AIK 1,91 xG → 3 mål",
  },
  {
    id: "filling-creator",
    title: "Kevin Filling – två målassister",
    body:
      "17-åringen framspelade både Carlstrand (15') och Kouame (72'). AIK:s anfallshot kom via hans löpningar i högerkanalen – precis den carry/box-entry-profil som förhandsanalysen pekade ut att stänga.",
    tone: "blue",
    stat: "Filling 2 assists · 17 år",
  },
  {
    id: "missed-penalty",
    title: "Straffmissen blev dyr",
    body:
      "Abrahams straff räddades av Nordfeldt. Han satte 2–1 före paus, men den missade straffen var ett av flera stora lägen som inte konverterades. Twelve: executed strong chance creation but couldn't finish effectively.",
    tone: "slate",
    stat: "Straff räddad · sedan 2–1",
  },
  {
    id: "age-shift",
    title: "Slutelvorna: HIF äldre, AIK yngre",
    body:
      "HIF startade ungt (snitt 23,8) men bytte in erfarenhet (Tekie, Johansson, Besara) och slutade på 26,0. AIK gick andra hållet: start 25,1 → slut 23,1 med Camara, Kouame, Gustafsson, Järeteg och Pukelis. Ungdomarna avgjorde derbyt.",
    tone: "blue",
    stat: "HIF 23,8→26,0 · AIK 25,1→23,1",
  },
  {
    id: "table",
    title: "36 poäng – bakslag i toppen",
    body:
      "Förlusten lämnar HIF på 36 poäng (11V–3O–5F) efter 19 omgångar. AIK klättrar i jakten på Europaplatser. Ingen derbyseger i Solna sedan 2017 – sviten lever.",
    tone: "slate",
    stat: "36 p · 0–3 i Solna-svit",
  },
];

export const aikRound19SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 4.26, opponentValue: 1.91, hammarbyDisplay: "4,26", opponentDisplay: "1,91" },
  { label: "Avslut", hammarbyValue: 29, opponentValue: 10, hammarbyDisplay: "29", opponentDisplay: "10" },
  { label: "Bollinnehav", hammarbyValue: 56, opponentValue: 44, hammarbyDisplay: "56%", opponentDisplay: "44%" },
  { label: "Boxberöringar", hammarbyValue: 39, opponentValue: 16, hammarbyDisplay: "39", opponentDisplay: "16" },
];

export const aikRound19SnapshotPills: MatchSnapshotPill[] = [
  { id: "result", label: "Förlust 2–3", tone: "amber" },
  { id: "ht", label: "HT 2–1 HIF", tone: "emerald" },
  { id: "xg", label: "4,26 xG (HIF)", tone: "emerald" },
  { id: "winprob", label: "Win prob 86 %", tone: "emerald" },
  { id: "adjei", label: "Adjei 14'", tone: "blue" },
  { id: "abraham", label: "Abraham 45+4", tone: "blue" },
  { id: "gustafsson", label: "Gustafsson 83' ⚡", tone: "amber" },
];

export const aikRound19Recap = {
  headline: "AIK vände derbyt – HIF dominerade utan poäng",
  tagline: "4,26 xG · Win prob 86 % · xP 2,67 · HT 2–1 · 0 poäng",
  opponentScore: 3,
  hammarbyScore: 2,
  opponentXg: 1.91,
  hammarbyXg: 4.26,
  halftimeScore: "1–2",
  matchResult: "2–3",
  dateLabel: "30 aug 2026 · Omgång 19 · Strawberry Arena · Glenn Nyberg",
  sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-30/aik-hammarby-3-2",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/2026-08-30-00-00-aik-hammarby",
  twelveReportUrl:
    "https://reports.twelve.football/reports/hammarby-match-report-vs-aik-b27nGKiMv4.pdf",
};

/**
 * Halvleksstatistik – FotMob (AIK hemma / HIF borta) + Twelve 15-min perioder.
 * FotMob visar AIK till vänster; här lagras alltid HIF-värdet som hammarby*.
 */
export const aikRound19FirstHalf = {
  title: "Första halvlek · ledning trots straffmiss",
  subtitle: "FotMob 1H: 2,39 xG och 19 avslut – HT 2–1 till HIF",
  scoreline: "1–2",
  narrative:
    "Hammarby ägde chansskapandet före paus. Adjei 14', Abraham 45+4 efter straffmiss – HT 2–1. FotMob: 55 % boll, 2,39–1,01 xG, 19–4 avslut, 28–7 boxberöringar. Twelve-perioderna: np-xG 0,18+1,10+1,21 ≈ 2,49 redan i 1H.",
  stats: [
    { label: "Bollinnehav (FotMob 1H)", hammarby: "55%", opponent: "45%", hammarbyValue: 55, opponentValue: 45 },
    { label: "xG (FotMob 1H)", hammarby: "2,39", opponent: "1,01", hammarbyValue: 2.39, opponentValue: 1.01 },
    { label: "Avslut (FotMob 1H)", hammarby: "19", opponent: "4", hammarbyValue: 19, opponentValue: 4 },
    { label: "Skott på mål", hammarby: "7", opponent: "3", hammarbyValue: 7, opponentValue: 3 },
    { label: "Boxberöringar", hammarby: "28", opponent: "7", hammarbyValue: 28, opponentValue: 7 },
    { label: "Hörnor", hammarby: "4", opponent: "0", hammarbyValue: 4, opponentValue: 0 },
    { label: "Stora möjligheter", hammarby: "3", opponent: "1", hammarbyValue: 3, opponentValue: 1 },
    { label: "Precisa passningar", hammarby: "206 (92%)", opponent: "164 (86%)", hammarbyValue: 206, opponentValue: 164 },
    { label: "Regelfel", hammarby: "6", opponent: "11", hammarbyValue: 6, opponentValue: 11 },
  ],
  twelvePeriods: {
    labels: ["0–15", "15–30", "30–HT"],
    possessionPct: [49, 70, 51],
    fieldTiltPct: [83, 100, 70],
    shots: [5, 5, 7],
    npXg: [0.18, 1.1, 1.21],
    xt: [0.21, 0.46, 0.85],
  },
  callouts: [
    "Adjei 14' + Abraham 45+4 – ledning till paus trots att Nordfeldt räddade Abrahams straff.",
    "FotMob 1H: 2,39 xG och 19 avslut – derbyt var HIF:s speelmässigt före paus.",
    "Carlstrand kvitterade 15' (1,01 xG totalt för AIK i 1H) – tidig variance som scoutingplanen varnade för.",
    "Twelve: field tilt 100 % i 15–30 och 7 avslut i 30–HT – presset hölls hela halvleken.",
  ],
} as const;

export const aikRound19SecondHalf = {
  title: "Andra halvlek · AIK vänder spelet",
  subtitle: "FotMob 2H: AIK 1,31 xG mot HIF 1,08 – Kouame 72' och Gustafsson 83'",
  scoreline: "3–2",
  narrative:
    "Efter paus vände chansbilden. FotMob 2H: AIK 1,31–1,08 i xG trots att HIF fortfarande hade mer boll (59 %) och fler avslut (13–7). Kouame kvitterade 72', Gustafsson avgjorde 83'. Twelve: field tilt föll till 43 % i 75–90 – exakt variance-zonen.",
  stats: [
    { label: "Bollinnehav (FotMob 2H)", hammarby: "59%", opponent: "41%", hammarbyValue: 59, opponentValue: 41 },
    { label: "xG (FotMob 2H)", hammarby: "1,08", opponent: "1,31", hammarbyValue: 1.08, opponentValue: 1.31 },
    { label: "Avslut (FotMob 2H)", hammarby: "13", opponent: "7", hammarbyValue: 13, opponentValue: 7 },
    { label: "Skott på mål", hammarby: "5", opponent: "3", hammarbyValue: 5, opponentValue: 3 },
    { label: "Boxberöringar", hammarby: "23", opponent: "14", hammarbyValue: 23, opponentValue: 14 },
    { label: "Hörnor", hammarby: "3", opponent: "1", hammarbyValue: 3, opponentValue: 1 },
    { label: "Stora möjligheter", hammarby: "2", opponent: "1", hammarbyValue: 2, opponentValue: 1 },
    { label: "Precisa passningar", hammarby: "248 (87%)", opponent: "160 (80%)", hammarbyValue: 248, opponentValue: 160 },
    { label: "Regelfel", hammarby: "5", opponent: "5", hammarbyValue: 5, opponentValue: 5 },
  ],
  twelvePeriods: {
    labels: ["45–60", "60–75", "75–90"],
    possessionPct: [59, 45, 73],
    fieldTiltPct: [100, 71, 43],
    shots: [3, 5, 3],
    npXg: [0.22, 0.22, 0.57],
    xt: [0.4, 0.26, 0.45],
  },
  callouts: [
    "FotMob 2H: AIK ledde xG (1,31–1,08) trots HIF:s bollinnehav 59 % – omställningarna avgjorde.",
    "Kouame 72' (assist Filling) och Gustafsson 83' (assist Camara) – AIK:s ungdomar straffade bakåtpasset.",
    "Twelve field tilt 43 % i 75–90: scoutingvarningen om variance-zonen 76–90+ slog in maximalt.",
    "HIF skapade fortfarande (13 avslut, 2 stora chanser) men missade 2 stora – finishen sviktade när det gällde.",
  ],
} as const;

/**
 * Snittålder startelva vs slutelva.
 * Ålder = hela år på matchdagen 2026-08-30 (Bolldata BirthDate).
 * Slutelva = de 11 som stod på planen vid slutsignal.
 */
export type LineupAgePlayer = {
  name: string;
  shirt: number;
  birthDate: string;
  age: number;
};

export const aikRound19LineupAges = {
  matchDate: "2026-08-30",
  sourceNote:
    "Ålder i hela år på matchdagen. Startelvor från Twelve line-ups; slutelvor = start − utbytta + inbytta.",
  hammarby: {
    starting: {
      averageAge: 23.8,
      players: [
        { name: "W. Hahn", shirt: 1, birthDate: "1992-06-15", age: 34 },
        { name: "H. Skoglund", shirt: 2, birthDate: "2004-03-01", age: 22 },
        { name: "F. Winther", shirt: 3, birthDate: "2001-01-04", age: 25 },
        { name: "V. Eriksson", shirt: 4, birthDate: "2000-09-17", age: 25 },
        { name: "P. Abraham", shirt: 7, birthDate: "2002-07-16", age: 24 },
        { name: "M. Karlsson", shirt: 8, birthDate: "2004-01-20", age: 22 },
        { name: "V. Lind", shirt: 9, birthDate: "2003-06-12", age: 23 },
        { name: "N. Persson", shirt: 16, birthDate: "2003-07-16", age: 23 },
        { name: "A. Boudri", shirt: 17, birthDate: "2004-09-29", age: 21 },
        { name: "Montader Madjed", shirt: 26, birthDate: "2005-04-24", age: 21 },
        { name: "F. Adjei", shirt: 28, birthDate: "2004-03-20", age: 22 },
      ] satisfies LineupAgePlayer[],
    },
    finishing: {
      averageAge: 26.0,
      players: [
        { name: "W. Hahn", shirt: 1, birthDate: "1992-06-15", age: 34 },
        { name: "F. Winther", shirt: 3, birthDate: "2001-01-04", age: 25 },
        { name: "T. Tekie", shirt: 5, birthDate: "1997-06-04", age: 29 },
        { name: "I. Fofana", shirt: 6, birthDate: "2002-08-15", age: 24 },
        { name: "M. Karlsson", shirt: 8, birthDate: "2004-01-20", age: 22 },
        { name: "V. Lind", shirt: 9, birthDate: "2003-06-12", age: 23 },
        { name: "O. Johansson", shirt: 11, birthDate: "1995-05-06", age: 31 },
        { name: "N. Persson", shirt: 16, birthDate: "2003-07-16", age: 23 },
        { name: "N. Besara", shirt: 20, birthDate: "1991-02-25", age: 35 },
        { name: "Montader Madjed", shirt: 26, birthDate: "2005-04-24", age: 21 },
        { name: "S. Kebbeh", shirt: 30, birthDate: "2007-02-17", age: 19 },
      ] satisfies LineupAgePlayer[],
    },
    delta: 2.2,
  },
  aik: {
    starting: {
      averageAge: 25.1,
      players: [
        { name: "H. Matthys", shirt: 3, birthDate: "1996-01-19", age: 30 },
        { name: "L. Bergquist", shirt: 5, birthDate: "2000-06-28", age: 26 },
        { name: "A. Mujanić", shirt: 7, birthDate: "2001-04-01", age: 25 },
        { name: "J. Hove", shirt: 8, birthDate: "2000-09-07", age: 25 },
        { name: "L. Carlstrand", shirt: 9, birthDate: "2004-08-31", age: 21 },
        { name: "K. Nordfeldt", shirt: 15, birthDate: "1989-06-23", age: 37 },
        { name: "A. Ali", shirt: 18, birthDate: "2002-01-22", age: 24 },
        { name: "D. Beširović", shirt: 19, birthDate: "1994-01-31", age: 32 },
        { name: "K. Filling", shirt: 29, birthDate: "2008-11-30", age: 17 },
        { name: "W. Olofsson", shirt: 34, birthDate: "2005-09-16", age: 20 },
        { name: "Y. Geiger", shirt: 46, birthDate: "2007-06-23", age: 19 },
      ] satisfies LineupAgePlayer[],
    },
    finishing: {
      averageAge: 23.1,
      players: [
        { name: "H. Matthys", shirt: 3, birthDate: "1996-01-19", age: 30 },
        { name: "J. Hove", shirt: 8, birthDate: "2000-09-07", age: 25 },
        { name: "L. Carlstrand", shirt: 9, birthDate: "2004-08-31", age: 21 },
        { name: "K. Nordfeldt", shirt: 15, birthDate: "1989-06-23", age: 37 },
        { name: "S. Gustafsson", shirt: 16, birthDate: "2007-02-05", age: 19 },
        { name: "A. Ali", shirt: 18, birthDate: "2002-01-22", age: 24 },
        { name: "L. Järeteg", shirt: 28, birthDate: "2007-01-20", age: 19 },
        { name: "W. Olofsson", shirt: 34, birthDate: "2005-09-16", age: 20 },
        { name: "L. Camara", shirt: 47, birthDate: "2007-02-07", age: 19 },
        { name: "A. Kouame", shirt: 48, birthDate: "2003-10-14", age: 22 },
        { name: "O. Pukelis", shirt: 49, birthDate: "2008-02-29", age: 18 },
      ] satisfies LineupAgePlayer[],
    },
    delta: -2.0,
  },
} as const;

/** Twelve KPI-data för omgång 19. */
export const aikRound19TwelveKpis = {
  fieldTiltPct: 74,
  fieldTiltAvgPct: 66,
  ppda: 5.63,
  ppdaAvg: 5.5,
  xt: 3.08,
  xtAvg: 1.53,
  oppXt: 1.29,
  oppXtAvg: 0.92,
  defensiveActionHeightM: 49.48,
  defensiveActionHeightAvg: 44.1,
  boxTouches: 37,
  boxTouchesAvg: 22,
  defensiveIntensity: 4.85,
  defensiveIntensityAvg: 5.47,
  highOppShots: 12,
  oppHighOppShots: 6,
  npXg: 3.85,
  oppNpXg: 1.82,
  xPoints: 2.67,
  winProbabilityPct: 86,
  drawProbabilityPct: 8,
  lossProbabilityPct: 5,
  rankings: {
    defence: { rank: 18, total: 28, label: "Försvar" },
    defTransition: { rank: 20, total: 28, label: "Def. transition" },
    oppChanceCreation: { rank: 22, total: 28, label: "Mot. chanskapande" },
    attTransition: { rank: 8, total: 28, label: "Off. transition" },
    attack: { rank: 4, total: 28, label: "Attack" },
    chanceCreation: { rank: 3, total: 28, label: "Chanskapande" },
  },
} as const;

export interface MomentumPoint {
  minute: number;
  value: number;
}

export interface MomentumGoal {
  minute: number;
  team: "hammarby" | "opponent";
  label: string;
}

/**
 * Matchmomentum omgång 19 – AIK vs Hammarby.
 * Härledd från Twelve xT/xG per period + mål. Positiva = Hammarby.
 */
export const aikRound19Momentum: MomentumPoint[] = [
  { minute: 0, value: 0 },
  { minute: 10, value: 12 },
  { minute: 14, value: 48 }, // Adjei 1-0
  { minute: 15, value: 8 }, // Carlstrand 1-1
  { minute: 25, value: 22 },
  { minute: 35, value: 35 },
  { minute: 42, value: 28 }, // straffmiss ungefär
  { minute: 45, value: 55 }, // Abraham 2-1
  { minute: 50, value: 42 },
  { minute: 60, value: 30 },
  { minute: 68, value: 22 },
  { minute: 72, value: -5 }, // Kouame 2-2
  { minute: 78, value: -8 },
  { minute: 83, value: -42 }, // Gustafsson 3-2
  { minute: 90, value: -35 },
];

export const aikRound19MomentumGoals: MomentumGoal[] = [
  { minute: 14, team: "hammarby", label: "Adjei 1–0" },
  { minute: 15, team: "opponent", label: "Carlstrand 1–1" },
  { minute: 45, team: "hammarby", label: "Abraham 2–1" },
  { minute: 72, team: "opponent", label: "Kouame 2–2" },
  { minute: 83, team: "opponent", label: "Gustafsson 3–2" },
];

/** Referee mini-analysis for round 19 – Glenn Nyberg */
export const aikRound19RefereeData = {
  refereeName: "Glenn Nyberg",
  matchFoulsHIF: 11,
  matchFoulsOpp: 16,
  matchYellowHIF: 1,
  matchYellowOpp: 4,
  matchRedHIF: 0,
  matchRedOpp: 0,
  /**
   * Domarindex: foulDiff 16−11 = +5, cardDiff 4−1 = +3 → +8.
   */
  domarindexThisMatch: 8,
  previousMatch: {
    gameweek: 5,
    matchName: "Djurgården – Hammarby, 1-1",
    date: "25 apr 2026",
    domarindex: 12,
    ratingLabel: "Grymt",
    note: "Nyberg dömde bortamatchen i omgång 5. Regelfel 8–20, gula 1–1, domarindex +12.",
  },
  seasonStats: {
    matchesWithHIF: 3,
    avgDomarindex: 7,
    ratingLabel: "Bra",
  },
  analysis:
    "Glenn Nyberg ledde derbyt på Strawberry Arena. AIK begick fler regelfel (16–11) och fick fyra gula mot HIF:s ett – domarindex +8 speglar fortsatt fördel HIF i fouls/kort. Förhandsanalysen (snitt +6 över två bortamatcher) höll ungefär: Nyberg gav HIF utrymme i duellerna, men det hjälpte inte när AIK kontrade in tre mål. Inga röda kort.",
};
