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
    "Twelve-scoutingrapport från Turkish 1. Lig 2025/2026. Jämförelse mot övriga anfallare i ligan.",
  player: {
    name: "Ali Habeşoğlu",
    club: "Bodrumspor",
    nationality: "Turkiet",
    birthDate: "2004-07-29",
    age: 22,
    position: "Anfallare",
    strongFoot: "Höger",
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
    "Luftstark poacher och målskytt – behöver utveckla hold-up och pressingspel.",
  summary:
    "Ali Habeşoğlu är en 22-årig anfallare i Bodrumspor som i Turkish 1. Lig 2025/2026 gjort 12 mål och 5 assists på 3005 minuter. Hans tydligaste styrka är luftspelet – bland de absolut bästa anfallarna i ligan – kombinerat med poaching, boxnärvaro och solid avslutning. Han är en straffområdesspelare mer än en hold-up-ni:a: under press tappar han boll ofta, och pressingspelet är under snittet. Profilen passar en target/poacher som ska vinna nickdueller, attackera boxen och avsluta – inte en modern pressande länkspelare.",
  narrativeBullets: [
    "12 mål + 5 assists på 41 matcher (33 starter) – etablerad anfallare i 1. Lig.",
    "Luftfarlighet #5/94 bland anfallare: nickvinster, anfallande nickar och headed plays i absolut toppklass.",
    "Hold-up (#79) och pressing (#71) är säsongens stora utvecklingsområden.",
  ],
  strengths: [
    {
      name: "Luftfarlighet",
      rank: 5,
      outOf: 94,
      note: "Dominerar i luften offensivt – farlig på fasta och i boxen.",
    },
    {
      name: "Poaching",
      rank: 27,
      outOf: 94,
      note: "Bra xG per skott och förmåga att hitta avslutslägen.",
    },
    {
      name: "Löpkvalitet",
      rank: 28,
      outOf: 94,
      note: "Konsekvent boxnärvaro och mottagningar i straffområdet.",
    },
  ] satisfies ScoutQualityNote[],
  weaknesses: [
    {
      name: "Delaktighet",
      rank: 53,
      outOf: 94,
      note: "Färre beröringar och defensiva aktioner – mer boxjägare än bollhållare.",
    },
    {
      name: "Pressing",
      rank: 71,
      outOf: 94,
      note: "Låg defensiv intensitet, få interceptions och counterpress-aktioner.",
    },
    {
      name: "Hold-up-spel",
      rank: 79,
      outOf: 94,
      note: "Svag bollhållning under press trots bra mottagning av långbollar.",
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
      label: "Poaching",
      shortLabel: "Poaching",
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
      label: "Hold-up-spel",
      shortLabel: "Hold-up",
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
      label: "Headed plays",
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
      category: "Hold-up",
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
      category: "Poaching",
    },
    {
      label: "np xG",
      valuePer90: "0,36 / 90",
      rank: 22,
      outOf: 94,
      percentile: 77.1,
      category: "Poaching",
    },
  ] satisfies ScoutStandoutMetric[],
} as const;

export type AliHabesogluScout = typeof aliHabesogluScout;
