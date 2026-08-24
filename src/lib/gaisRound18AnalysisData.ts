import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchSnapshotPill,
  MatchSnapshotStat,
  MatchStoryPhase,
} from "@/lib/elfsborgRound11AnalysisData";

/** Färgkodning som på Kommande motstånd: HIF-grönt + motståndarakcent. */
export const ROUND18_HIF_GREEN = "#006633";
export const ROUND18_HIF_LIGHT = "#5fd39a";
export const ROUND18_GAIS_YELLOW = "#F5C518";
export const ROUND18_GAIS_MUTED = "#a8a29e";

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

/** Matchstatistik – Omgång 18 · Hammarby vs GAIS (2–0) · 23 aug 2026. */
export const gaisRound18MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    3.0,
    1.01,
    "3,00",
    "1,01",
    "Nästan 3× mer förväntat mål – revansch efter 0–2 i maj, den här gången med klinisk start.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    26,
    9,
    "26",
    "9",
    "Nästan 3× fler avslut. 20 av 26 kom redan i första halvlek.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    7,
    1,
    "7",
    "1",
    "7–1 i skott på mål. Hahn höll nollan – GAIS fick knappt träffa mål.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    66,
    34,
    "66%",
    "34%",
    "Dubbelt bollinnehav. I 1H var det ännu mer extremt (≈74 %).",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    37,
    7,
    "37",
    "7",
    "5× fler beröringar i GAIS straffområde – konstant tryck på 3Arena.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    8,
    1,
    "8",
    "1",
    "8 mot 1 hörnor – territoriell dominans hela matchen.",
  ),
  buildMatchSpiderAxis(
    "Lyckade passningar",
    592,
    264,
    "592 (88%)",
    "264 (77%)",
    "Mer än dubbelt så många lyckade passningar med högre precision.",
  ),
  buildMatchSpiderAxis(
    "Stora möjligheter",
    6,
    3,
    "6",
    "3",
    "Twelve high opportunity shots: HIF 6, GAIS 3 – men bara HIF satte dem.",
  ),
];

export const gaisRound18Goals: MatchGoalEvent[] = [
  { minute: 5, team: "Hammarby", player: "V. Lind (assist M. Madjed)", xg: 0.25 },
  { minute: 10, team: "Hammarby", player: "P. Abraham (assist V. Lind)", xg: 0.52 },
];

export const gaisRound18MatchStory: MatchStoryPhase[] = [
  {
    id: "opening-blitz",
    label: "Blixtstart · 2–0 på elva minuter",
    scoreline: "2–0 HIF 11'",
    body:
      "Hammarby öppnade med total dominans. Montader Madjed serverade Victor Lind till 1–0 i minut 5, och fem minuter senare assisterade Lind själv Paulos Abraham till 2–0. Twelve: två tidiga mål, explosiv attacking transition (0,43 xT inom 10s efter bollvinst i 0–15) och field tilt upp mot 100 % i slutet av halvleken.",
    tone: "emerald",
  },
  {
    id: "first-half-dominance",
    label: "Första halvlek · total överlägsenhet",
    scoreline: "2–0 HT · ~2,5 xG mot ~0,3",
    body:
      "Resten av första halvlek var en uppvisning. Twelve-perioderna visar 20 av 26 avslut före paus, bollinnehav 71–80 % per 15-minutersblock och np-xG ≈ 2,46 redan i 1H. FotMob 1H: 74 % boll, 1,78 xG, 21–2 i avslut, 6–0 på mål, 28–6 boxberöringar. GAIS fick knappt andas.",
    tone: "emerald",
  },
  {
    id: "second-half-control",
    label: "Andra halvlek · kontroll utan nya mål",
    scoreline: "2–0 · tempo ner",
    body:
      "Efter pausen sjönk anfallstempot markant (xT 0,04 i 45–60). Hammarby behöll strukturen, pressade fortfarande hårt (PPDA 3,83) och släppte inte in mål trots att GAIS skapade mer xG sent. En komfortabel, kontrollerad avslutning på 3Arena.",
    tone: "blue",
  },
  {
    id: "verdict",
    label: "Slutbild · revansch och nolla",
    scoreline: "2–0 · 3,00 xG mot 1,01",
    body:
      "Revansch för 0–2 i maj. Den här gången avgjorde HIF matchen innan kvartspaus – och höll nollan mot ligans tightaste xGA-lag. Field tilt 75 %, PPDA 3,83, 37 boxberöringar. Rydström: ytterligare tre poäng och ledning i tränarjämförelsen i totalpoäng.",
    tone: "slate",
  },
];

export const gaisRound18Takeaways: MatchRecapTakeaway[] = [
  {
    id: "first-half",
    title: "Första halvlek avgjorde allt",
    body:
      "2–0 efter 11 minuter, ~2,5 np-xG före paus och 20 av 26 avslut i 1H. Det var inte bara tidiga mål – det var 45 minuters total överlägsenhet mot ett GAIS som normalt begränsar chanser bäst i ligan.",
    tone: "emerald",
    stat: "1H: ~2,5 xG · 20 avslut · 2–0",
  },
  {
    id: "revenge",
    title: "Revansch för maj – samma resultat, omvänd roller",
    body:
      "I maj vann GAIS 2–0 på Gamla Ullevi. Nu vann HIF 2–0 hemma – med bättre finish, bättre press (PPDA 3,83) och utan röda kort. Disciplin och klinisk start var skillnaden.",
    tone: "emerald",
    stat: "Maj 0–2 → Aug 2–0",
  },
  {
    id: "lind-abraham",
    title: "Lind + Abraham – öppning på elva minuter",
    body:
      "Victor Lind (5', assist Madjed) och Paulos Abraham (10', assist Lind) satte matchen tidigt. Lind både mål och assist – återigen den mest avgörande offensiva länken.",
    tone: "blue",
    stat: "Lind 5' · Abraham 10'",
  },
  {
    id: "press",
    title: "PPDA 3,83 – säsongens hårdaste press",
    body:
      "Twelve Defence-rank 5/28 i matchen. Defensive intensity 8,56 och PPDA 3,83 är långt under säsongssnittet – GAIS fick aldrig etablera sitt långbollsspel i 1H.",
    tone: "blue",
    stat: "PPDA 3,83 · intensitet 8,56",
  },
  {
    id: "table",
    title: "36 poäng – jaktläget lever",
    body:
      "Med 11V–3O–4F och 36 poäng efter 18 omgångar fortsätter HIF jaga i toppen. Tre raka ligasegrar (Häcken, Kalmar, GAIS) med 9–0 i målskillnad.",
    tone: "emerald",
    stat: "36 p · 9–0 senaste 3",
  },
];

export const gaisRound18SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 3.0, opponentValue: 1.01, hammarbyDisplay: "3,00", opponentDisplay: "1,01" },
  { label: "Avslut", hammarbyValue: 26, opponentValue: 9, hammarbyDisplay: "26", opponentDisplay: "9" },
  { label: "Bollinnehav", hammarbyValue: 66, opponentValue: 34, hammarbyDisplay: "66%", opponentDisplay: "34%" },
  { label: "Boxberöringar", hammarbyValue: 37, opponentValue: 7, hammarbyDisplay: "37", opponentDisplay: "7" },
];

export const gaisRound18SnapshotPills: MatchSnapshotPill[] = [
  { id: "result", label: "Seger 2–0", tone: "emerald" },
  { id: "ht", label: "2–0 redan i 11'", tone: "emerald" },
  { id: "xg", label: "3,00 xG (HIF)", tone: "emerald" },
  { id: "lind", label: "Lind 5' ⚡", tone: "blue" },
  { id: "abraham", label: "Abraham 10' ✅", tone: "blue" },
  { id: "clean", label: "Nolla hemma", tone: "slate" },
];

export const gaisRound18Recap = {
  headline: "Hammarby körde över GAIS – 2–0 efter blixtstart",
  tagline: "2–0 på 11 min · 1H-dominans · Field tilt 75 % · PPDA 3,83 · Revansch för maj",
  opponentScore: 0,
  hammarbyScore: 2,
  opponentXg: 1.01,
  hammarbyXg: 3.0,
  halftimeScore: "2–0",
  matchResult: "2–0",
  dateLabel: "23 aug 2026 · Omgång 18 · 3Arena · Victor Wolf",
  sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-23/hammarby-gais-2-0",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/2026-08-23-00-00-hammarby-gais",
  twelveReportUrl:
    "https://reports.twelve.football/reports/hammarby-match-report-vs-gais-uNtaNSJMc3.pdf",
};

/** Första halvlek – FotMob + Twelve perioddata. */
export const gaisRound18FirstHalf = {
  title: "Första halvlek · total överlägsenhet",
  subtitle: "Matchen avgjordes innan kvartspaus – resten var kontroll",
  scoreline: "2–0",
  narrative:
    "Hammarby ägde första halvlek från första bollen. Två mål på elva minuter, nästan allt xG före paus och ett GAIS som knappt fick lämna egen planhalva. Twelve-perioderna bekräftar: bollinnehav 71–80 %, field tilt upp till 100 % i 30–HT, och 20 av 26 avslut före paus.",
  stats: [
    { label: "Bollinnehav (FotMob 1H)", hammarby: "74%", opponent: "26%", hammarbyValue: 74, opponentValue: 26 },
    { label: "xG (FotMob 1H)", hammarby: "1,78", opponent: "0,12", hammarbyValue: 1.78, opponentValue: 0.12 },
    { label: "Avslut (FotMob 1H)", hammarby: "21", opponent: "2", hammarbyValue: 21, opponentValue: 2 },
    { label: "Skott på mål", hammarby: "6", opponent: "0", hammarbyValue: 6, opponentValue: 0 },
    { label: "Boxberöringar", hammarby: "28", opponent: "6", hammarbyValue: 28, opponentValue: 6 },
    { label: "Hörnor", hammarby: "5", opponent: "0", hammarbyValue: 5, opponentValue: 0 },
  ],
  twelvePeriods: {
    labels: ["0–15", "15–30", "30–HT"],
    possessionPct: [80, 73, 71],
    fieldTiltPct: [86, 90, 100],
    shots: [6, 9, 5],
    npXg: [1.05, 0.62, 0.79],
    xt: [0.36, 0.46, 0.52],
  },
  callouts: [
    "Lind 5' (assist Madjed) + Abraham 10' (assist Lind) – matchen avgjord innan 12 minuter.",
    "Twelve np-xG i 1H: ≈ 2,46 av matchens 2,88–3,00 – nästan allt skapades före paus.",
    "GAIS: 2 avslut och 0 på mål i 1H (FotMob) – ligans bästa xGA-lag fick knappt ett avslut till.",
  ],
} as const;

/** Twelve KPI-data för omgång 18. Säsongssnitt ≈ omg 1–17. */
export const gaisRound18TwelveKpis = {
  fieldTiltPct: 75,
  fieldTiltAvgPct: 66,
  ppda: 3.83,
  ppdaAvg: 5.5,
  xt: 1.86,
  xtAvg: 1.32,
  oppXt: 0.86,
  oppXtAvg: 0.92,
  defensiveActionHeightM: 44.29,
  defensiveActionHeightAvg: 44.1,
  boxTouches: 35,
  boxTouchesAvg: 22,
  defensiveIntensity: 8.56,
  defensiveIntensityAvg: 5.47,
  highOppShots: 6,
  rankings: {
    defence: { rank: 5, total: 28, label: "Försvar" },
    defTransition: { rank: 16, total: 28, label: "Def. transition" },
    oppChanceCreation: { rank: 14, total: 28, label: "Mot. chanskapande" },
    attTransition: { rank: 19, total: 28, label: "Off. transition" },
    attack: { rank: 10, total: 28, label: "Attack" },
    chanceCreation: { rank: 7, total: 28, label: "Chanskapande" },
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
 * Matchmomentum omgång 18 – Hammarby vs GAIS
 * Härledd från Twelve xT/xG per period + tidiga mål.
 * Positiva = Hammarby, negativa = GAIS.
 */
export const gaisRound18Momentum: MomentumPoint[] = [
  { minute: 0, value: 0 },
  { minute: 3, value: 22 },
  { minute: 5, value: 55 }, // Lind 1-0
  { minute: 8, value: 48 },
  { minute: 10, value: 72 }, // Abraham 2-0
  { minute: 15, value: 58 },
  { minute: 20, value: 62 },
  { minute: 25, value: 55 },
  { minute: 30, value: 50 },
  { minute: 35, value: 45 },
  { minute: 40, value: 42 },
  { minute: 45, value: 38 },
  { minute: 50, value: 18 },
  { minute: 55, value: 8 },
  { minute: 60, value: 5 },
  { minute: 65, value: 12 },
  { minute: 70, value: 8 },
  { minute: 75, value: -5 },
  { minute: 80, value: -12 },
  { minute: 85, value: -8 },
  { minute: 90, value: 4 },
];

export const gaisRound18MomentumGoals: MomentumGoal[] = [
  { minute: 5, team: "hammarby", label: "Lind 1–0" },
  { minute: 10, team: "hammarby", label: "Abraham 2–0" },
];

/** Referee mini-analysis for round 18 – Victor Wolf */
export const gaisRound18RefereeData = {
  refereeName: "Victor Wolf",
  matchFoulsHIF: 11,
  matchFoulsOpp: 18,
  matchYellowHIF: 0,
  matchYellowOpp: 2,
  matchRedHIF: 0,
  matchRedOpp: 0,
  /**
   * Domarindex: foulDiff 18−11 = +7, cardDiff 2−0 = +2 → +9.
   */
  domarindexThisMatch: 9,
  previousMatch: {
    gameweek: 7,
    matchName: "IFK Göteborg – Hammarby, 0-1",
    date: "9 maj 2026",
    domarindex: 13,
    ratingLabel: "Grymt",
    note: "Victor Wolf dömde bortasegern i Göteborg. Regelfel 9–20, gula 0–2, domarindex +13 – tydlig fördel HIF.",
  },
  seasonStats: {
    matchesWithHIF: 2,
    avgDomarindex: 11,
    ratingLabel: "Grymt",
  },
  analysis:
    "Victor Wolf ledde 2–0-segern på 3Arena. GAIS begick klart fler regelfel (18–11) och fick båda gula korten (Sletsjøe 42', de Brienne 75') medan Hammarby gick kortfritt. Domarindex +9 speglar samma profil som i Göteborg i omgång 7: bortalag/motståndare får fler gula, HIF får utrymme att pressa. Inga stora kontroverser – en ren, kontrollerad match ur domarsynpunkt.",
};
