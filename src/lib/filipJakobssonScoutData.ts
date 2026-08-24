/**
 * Twelve Earpiece-scoutingrapport: Filip Jakobsson (Hammarby U19).
 * Källa: https://earpiece.twelve.football/shared-reports/ae03b6cc-f614-4be2-a942-e9fb00378aa3
 * Jämförelsegrupp: mittfältare i Allsvenskan U19 2026 (n = 87).
 */

export type FilipSpiderAxis = {
  key: string;
  label: string;
  shortLabel: string;
  percentile: number;
  rank: number;
  outOf: number;
  highlight: "strength" | "neutral" | "weakness";
};

export type FilipStandoutMetric = {
  label: string;
  valuePer90: string;
  rank: number;
  outOf: number;
  percentile: number;
  category: string;
};

export type FilipQualityNote = {
  name: string;
  rank: number;
  outOf: number;
  note: string;
};

export const filipJakobssonScout = {
  sourceUrl:
    "https://earpiece.twelve.football/shared-reports/ae03b6cc-f614-4be2-a942-e9fb00378aa3",
  contextNote:
    "Satt på bänken i A-truppen senast mot GAIS (omg. 18). Profilen bygger på U19-säsongen 2026 i Twelve.",
  player: {
    name: "Filip Jakobsson",
    club: "Hammarby U19",
    nationality: "Sverige",
    birthDate: "2008-11-11",
    age: 17,
    position: "Central mittfältare",
  },
  season: {
    competition: "Allsvenskan U19 2026",
    comparisonGroup: "Mittfältare i Allsvenskan U19 (87 spelare)",
    minutes: 1191,
    matches: 13,
    starts: 13,
    goals: 0,
    assists: 0,
    yellowCards: 1,
    redCards: 0,
  },
  summaryHeader:
    "Bollvinnande 8:a med elitnivå i involvering och försvar – ännu inte en chansskapare.",
  summary:
    "Filip Jakobsson är en 17-årig central mittfältare i Hammarby U19 som redan tillhör toppskiktet defensivt och i bollinvolvering. Han startar varje match, tar många beröringar och driver lagets defensiva intensitet genom återerövringar, interceptions och lösbollar. Passningsspelet är progressivt – särskilt in i sista tredjedelen – men han är ännu inte en sista-pass-spelare eller ett boxhot. Profilen passar en 6/8 som ska säkra mittfältet, vinna boll och flytta laget framåt.",
  narrativeBullets: [
    "Bänkad i A-truppen mot GAIS: tydlig talangsignal, A-minuter saknas fortfarande.",
    "I U19 är han lagets defensiva motor – 1:a i delaktighet och 2:a i både aktivt och intelligent försvar bland 87 mittfältare.",
    "Progression och passningskvalitet ligger top-10; boxhot och chansskapande är utvecklingsområden.",
  ],
  strengths: [
    {
      name: "Delaktighet",
      rank: 1,
      outOf: 87,
      note: "Flest involveringar i jämförelsegruppen – bollnära och konstant i spelet.",
    },
    {
      name: "Aktivt försvarsspel",
      rank: 2,
      outOf: 87,
      note: "Vinner boll och genomför defensiva aktioner i mycket hög volym.",
    },
    {
      name: "Intelligent försvarsspel",
      rank: 2,
      outOf: 87,
      note: "Läser spelet: interceptions, lösbollar och timing framför råstyrka.",
    },
    {
      name: "Progression",
      rank: 7,
      outOf: 87,
      note: "Flyttar laget framåt via speluppbyggande och sista-tredjedels-passningar.",
    },
  ] satisfies FilipQualityNote[],
  weaknesses: [
    {
      name: "Chansskapande åt medspelare",
      rank: 48,
      outOf: 87,
      note: "Begränsat antal key passes / xA – mer bollflyttare än sista-pass-spelare.",
    },
    {
      name: "Hot i straffområdet",
      rank: 68,
      outOf: 87,
      note: "Få boxmottagningar och nästan noll målhot – förväntat för profilen, men tydligt gap.",
    },
  ] satisfies FilipQualityNote[],
  spider: [
    {
      key: "involvement",
      label: "Delaktighet",
      shortLabel: "Delaktighet",
      percentile: 98.9,
      rank: 1,
      outOf: 87,
      highlight: "strength",
    },
    {
      key: "activeDefence",
      label: "Aktivt försvarsspel",
      shortLabel: "Aktivt försvar",
      percentile: 97.7,
      rank: 2,
      outOf: 87,
      highlight: "strength",
    },
    {
      key: "intelligentDefence",
      label: "Intelligent försvarsspel",
      shortLabel: "Intelligent försvar",
      percentile: 97.7,
      rank: 2,
      outOf: 87,
      highlight: "strength",
    },
    {
      key: "progression",
      label: "Progression",
      shortLabel: "Progression",
      percentile: 92.0,
      rank: 7,
      outOf: 87,
      highlight: "strength",
    },
    {
      key: "passingQuality",
      label: "Passningskvalitet",
      shortLabel: "Passning",
      percentile: 89.7,
      rank: 9,
      outOf: 87,
      highlight: "strength",
    },
    {
      key: "effectiveness",
      label: "Effektivitet",
      shortLabel: "Effektivitet",
      percentile: 86.2,
      rank: 12,
      outOf: 87,
      highlight: "neutral",
    },
    {
      key: "providing",
      label: "Chansskapande åt medspelare",
      shortLabel: "Chansskapande",
      percentile: 44.8,
      rank: 48,
      outOf: 87,
      highlight: "weakness",
    },
    {
      key: "boxThreat",
      label: "Hot i straffområdet",
      shortLabel: "Boxhot",
      percentile: 21.8,
      rank: 68,
      outOf: 87,
      highlight: "weakness",
    },
  ] satisfies FilipSpiderAxis[],
  standoutMetrics: [
    {
      label: "Återerövringar",
      valuePer90: "6,51 / 90",
      rank: 1,
      outOf: 87,
      percentile: 98.9,
      category: "Aktivt försvar",
    },
    {
      label: "Vunna defensiva aktioner",
      valuePer90: "10,25 / 90",
      rank: 2,
      outOf: 87,
      percentile: 97.7,
      category: "Delaktighet",
    },
    {
      label: "xGBuildup",
      valuePer90: "0,80 / 90",
      rank: 2,
      outOf: 87,
      percentile: 97.7,
      category: "Delaktighet",
    },
    {
      label: "Lösbollar återerövrade",
      valuePer90: "3,99 / 90",
      rank: 2,
      outOf: 87,
      percentile: 97.7,
      category: "Intelligent försvar",
    },
    {
      label: "Passningar in i sista tredjedelen (xT)",
      valuePer90: "0,24 xT / 90",
      rank: 2,
      outOf: 87,
      percentile: 97.7,
      category: "Progression",
    },
    {
      label: "Återerövringar per motståndarinnehav",
      valuePer90: "0,06 / innehav",
      rank: 2,
      outOf: 87,
      percentile: 97.7,
      category: "Effektivitet",
    },
    {
      label: "Passningar (xT) per 100 mottagningar",
      valuePer90: "1,55",
      rank: 3,
      outOf: 87,
      percentile: 96.6,
      category: "Effektivitet",
    },
    {
      label: "Passningar (xT)",
      valuePer90: "0,61 xT / 90",
      rank: 4,
      outOf: 87,
      percentile: 95.4,
      category: "Passningskvalitet",
    },
    {
      label: "Interceptions",
      valuePer90: "4,34 / 90",
      rank: 6,
      outOf: 87,
      percentile: 93.1,
      category: "Intelligent försvar",
    },
    {
      label: "Speluppbyggande passningar",
      valuePer90: "9,09 / 90",
      rank: 8,
      outOf: 87,
      percentile: 90.8,
      category: "Progression",
    },
  ] satisfies FilipStandoutMetric[],
} as const;

export type FilipJakobssonScout = typeof filipJakobssonScout;
