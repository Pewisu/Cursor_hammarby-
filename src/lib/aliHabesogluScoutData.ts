/**
 * Twelve scoutingrapport: Ali Habeşoğlu (Bodrumspor).
 * Källa: https://reports.twelve.football/reports/ali-habesoglu-scouting-report-bvhwiSBafD.pdf
 * Jämförelsegrupp: anfallare i Turkish 1. Lig 2025/2026 (n = 94).
 */

export type ScoutSpiderAxis = {
  key: string;
  label: string;
  shortLabel: string;
  percentile: number;
  rank: number;
  outOf: number;
  highlight: "strength" | "neutral" | "weakness";
};

export type ScoutStandoutMetric = {
  label: string;
  valuePer90: string;
  rank: number;
  outOf: number;
  percentile: number;
  category: string;
};

export type ScoutQualityNote = {
  name: string;
  rank: number;
  outOf: number;
  note: string;
};

export const aliHabesogluScout = {
  sourceUrl:
    "https://reports.twelve.football/reports/ali-habesoglu-scouting-report-bvhwiSBafD.pdf",
  contextNote:
    "Scoutingdata från Turkish 1. Lig 2025/2026, jämfört med övriga anfallare i ligan.",
  player: {
    name: "Ali Habeşoğlu",
    club: "Bodrumspor",
    nationality: "Turkiet",
    birthDate: "2004-07-29",
    age: 22,
    position: "Anfallare",
    strongFoot: "Högerfot",
  },
  season: {
    competition: "Turkish 1. Lig 2025/2026",
    comparisonGroup: "Anfallare i Turkish 1. Lig (94 spelare)",
    minutes: 3005,
    matches: 41,
    starts: 33,
    goals: 12,
    assists: 5,
    yellowCards: 3,
    redCards: 0,
  },
  summaryHeader:
    "Stark i luften och farlig målskytt – svagare med bollbevarande och press.",
  summary:
    "Ali Habeşoğlu är 22 år och anfallare i Bodrumspor. Under Turkish 1. Lig-säsongen 2025/2026 har han gjort 12 mål och 5 assist på 3005 minuter. Det som sticker ut är luftspelet – han tillhör ligan absolut bästa anfallare där – i kombination med måljägande, närvaro i straffområdet och starkt avslut. Han är mer straffområdesforward än länkspelare: under press tappar han ofta bollen, och hans pressarbete ligger under snittet. Profilen passar en forward som ska vinna nickdueller, ta sig in i straffområdet och avsluta – inte en modern anfallare som ska leda pressen högt.",
  narrativeBullets: [
    "12 mål och 5 assist på 41 matcher (33 starter) – etablerad anfallare i 1. Lig.",
    "5:a av 94 i luftfarlighet – bland de bästa i nickdueller, anfallande huvudspel och huvudspel.",
    "Bollbevarande (plats 79) och pressing (plats 71) – de tydligaste utvecklingsområdena.",
  ],
  strengths: [
    {
      name: "Luftfarlighet",
      rank: 5,
      outOf: 94,
      note: "Stark offensivt i luften – farlig på fasta situationer och i straffområdet.",
    },
    {
      name: "Måljägande",
      rank: 27,
      outOf: 94,
      note: "Hittar bra avslutslägen och har hög xG per skott.",
    },
    {
      name: "Löpkvalitet",
      rank: 28,
      outOf: 94,
      note: "Kommer ofta till i straffområdet och tar emot passningar där.",
    },
  ] satisfies ScoutQualityNote[],
  weaknesses: [
    {
      name: "Delaktighet",
      rank: 53,
      outOf: 94,
      note: "Få bollkontakter och få defensiva insatser – mer avslutare än uppspelspelare.",
    },
    {
      name: "Pressing",
      rank: 71,
      outOf: 94,
      note: "Låg defensiv intensitet, få brytningar och få återerövringar efter bolltapp.",
    },
    {
      name: "Bollbevarande",
      rank: 79,
      outOf: 94,
      note: "Tappar bollen ofta under press, trots att han tar emot långbollar bra.",
    },
  ] satisfies ScoutQualityNote[],
  spider: [
    {
      key: "aerialThreat",
      label: "Luftfarlighet",
      shortLabel: "Luftfarlighet",
      percentile: 95.2,
      rank: 5,
      outOf: 94,
      highlight: "strength",
    },
    {
      key: "poaching",
      label: "Måljägande",
      shortLabel: "Måljägande",
      percentile: 71.8,
      rank: 27,
      outOf: 94,
      highlight: "strength",
    },
    {
      key: "runQuality",
      label: "Löpkvalitet",
      shortLabel: "Löpkvalitet",
      percentile: 70.7,
      rank: 28,
      outOf: 94,
      highlight: "strength",
    },
    {
      key: "finishing",
      label: "Avslut",
      shortLabel: "Avslut",
      percentile: 69.7,
      rank: 29,
      outOf: 94,
      highlight: "neutral",
    },
    {
      key: "providing",
      label: "Chansskapande",
      shortLabel: "Chansskapande",
      percentile: 60.1,
      rank: 38,
      outOf: 94,
      highlight: "neutral",
    },
    {
      key: "involvement",
      label: "Delaktighet",
      shortLabel: "Delaktighet",
      percentile: 44.1,
      rank: 53,
      outOf: 94,
      highlight: "weakness",
    },
    {
      key: "pressing",
      label: "Pressing",
      shortLabel: "Pressing",
      percentile: 25.0,
      rank: 71,
      outOf: 94,
      highlight: "weakness",
    },
    {
      key: "holdUp",
      label: "Bollbevarande",
      shortLabel: "Bollbeh.",
      percentile: 16.5,
      rank: 79,
      outOf: 94,
      highlight: "weakness",
    },
  ] satisfies ScoutSpiderAxis[],
  standoutMetrics: [
    {
      label: "Luftdueller",
      valuePer90: "7,40 / 90",
      rank: 4,
      outOf: 94,
      percentile: 96.3,
      category: "Luftfarlighet",
    },
    {
      label: "Vunna luftdueller",
      valuePer90: "3,11 / 90",
      rank: 6,
      outOf: 94,
      percentile: 94.1,
      category: "Luftfarlighet",
    },
    {
      label: "Vunna anfallande luftdueller",
      valuePer90: "2,95 / 90",
      rank: 6,
      outOf: 94,
      percentile: 94.1,
      category: "Luftfarlighet",
    },
    {
      label: "Huvudspel",
      valuePer90: "1,63 / 90",
      rank: 6,
      outOf: 94,
      percentile: 94.1,
      category: "Luftfarlighet",
    },
    {
      label: "Mottagningar av långbollar",
      valuePer90: "4,13 / 90",
      rank: 13,
      outOf: 94,
      percentile: 86.7,
      category: "Bollbevarande",
    },
    {
      label: "Boxmottagningar",
      valuePer90: "4,48 / 90",
      rank: 13,
      outOf: 94,
      percentile: 86.7,
      category: "Löpkvalitet",
    },
    {
      label: "Andra assists",
      valuePer90: "0,10 / 90",
      rank: 16,
      outOf: 94,
      percentile: 83.5,
      category: "Chansskapande",
    },
    {
      label: "Skottkonvertering (np)",
      valuePer90: "19 %",
      rank: 21,
      outOf: 94,
      percentile: 78.2,
      category: "Avslut",
    },
    {
      label: "np xG per skott",
      valuePer90: "0,18",
      rank: 21,
      outOf: 94,
      percentile: 78.2,
      category: "Måljägande",
    },
    {
      label: "np xG",
      valuePer90: "0,36 / 90",
      rank: 22,
      outOf: 94,
      percentile: 77.1,
      category: "Måljägande",
    },
  ] satisfies ScoutStandoutMetric[],
} as const;

export type AliHabesogluScout = typeof aliHabesogluScout;
