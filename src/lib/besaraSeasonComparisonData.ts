/**
 * Nahir Besara säsongsjämförelse: 2025 vs 2026
 * Källor: earpiece.twelve.football (spelarprofil/rankingsdata), bolldata.se/spelardata (2026)
 */

export type BesaraSeason = "2025" | "2026";

export interface BesaraBasicStats {
  season: BesaraSeason;
  minutesPlayed: number;
  matches: number;
  matchesFromStart: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  goalsPerNinety: number;
  assistsPerNinety: number;
  goalsPlusAssistsPerNinety: number;
}

/** Category quality ranks from Twelve (rank N of total M – lägre = bättre) */
export interface TwelveCategoryRanks {
  total: number;
  boxThreat: number;
  effectiveness: number;
  providingTeammates: number;
  involvement: number;
  progression: number;
  passingQuality: number;
  activeDefence: number;
  intelligentDefence: number;
}

export interface TwelveSubMetricRank {
  label: string;
  categoryKey: keyof TwelveCategoryRanks;
  rank2025: number;
  rank2026: number;
}

/** Bolldata.se – tillgängligt för båda säsongerna */
export interface BolldataStats {
  season: BesaraSeason;
  sm: number;
  min: number;
  goals: number;
  assists: number;
  points: number;
  pointsPercent: number;
  pointsPerNinety: number;
  goalsPerNinety: number;
  assistsPerNinety: number;
  xG: number;
  xA: number;
  xP: number;
  xGPerNinety: number;
  xAPerNinety: number;
  xPPerNinety: number;
  goalsOverXG: number;
  shotAssists: number;
  shotAssistsPerNinety: number;
  goalChances: number;
  goalChancesPerNinety: number;
  /** Nyckelpassningar – saknas för 2025 i top-20 */
  keyPasses?: number;
  keyPassesPerNinety?: number;
  /** Smarta passningar – saknas för 2025 i top-20 */
  smartPasses?: number;
  smartPassesPerNinety?: number;
  cornerKicks: number;
  cornerKicksPerNinety: number;
  freekicks: number;
  freekicksDangerousArea: number;
  freekicksXA?: number;
  penalties: number;
  penaltiesScored: number;
  /** Offensiv ranking – saknas för 2025 i top-20 */
  offensiveRating?: number;
  offensiveRatingPerNinety?: number;
}

/** @deprecated Använd BolldataStats */
export type BolldataStats2026 = BolldataStats;

// ─── Grunddata ────────────────────────────────────────────────────────────────

export const besaraBasicStats: BesaraBasicStats[] = [
  {
    season: "2025",
    minutesPlayed: 2715,
    matches: 30,
    matchesFromStart: 29,
    goals: 17,
    assists: 2,
    yellowCards: 2,
    redCards: 0,
    goalsPerNinety: parseFloat((17 / (2715 / 90)).toFixed(2)),
    assistsPerNinety: parseFloat((2 / (2715 / 90)).toFixed(2)),
    goalsPlusAssistsPerNinety: parseFloat((19 / (2715 / 90)).toFixed(2)),
  },
  {
    season: "2026",
    minutesPlayed: 1147,
    matches: 14,
    matchesFromStart: 13,
    goals: 5,
    assists: 5,
    yellowCards: 1,
    redCards: 0,
    goalsPerNinety: 0.39,
    assistsPerNinety: 0.39,
    goalsPlusAssistsPerNinety: 0.78,
  },
];

// ─── Twelve.football kategorirankar ───────────────────────────────────────────

export const twelveRanks: Record<BesaraSeason, TwelveCategoryRanks> = {
  "2025": {
    total: 119,
    boxThreat: 10,
    effectiveness: 13,
    providingTeammates: 39,
    involvement: 90,
    progression: 90,
    passingQuality: 59,
    activeDefence: 114,
    intelligentDefence: 118,
  },
  "2026": {
    total: 73,
    boxThreat: 10,
    effectiveness: 6,
    providingTeammates: 4,
    involvement: 65,
    progression: 37,
    passingQuality: 28,
    activeDefence: 48,
    intelligentDefence: 73,
  },
};

/** Konverterar rank till percentil 0–100 (100 = bäst) */
export function rankToPercentile(rank: number, total: number): number {
  return Math.round(((total - rank + 1) / total) * 100);
}

export type CategoryKey = Exclude<keyof TwelveCategoryRanks, "total">;

export const twelveCategories: { key: CategoryKey; label: string; shortLabel: string }[] = [
  { key: "boxThreat",          label: "Box Threat",           shortLabel: "Box Threat"    },
  { key: "effectiveness",      label: "Effektivitet",         shortLabel: "Effektivitet"  },
  { key: "providingTeammates", label: "Skapa för lagkamrater",shortLabel: "Skapa"         },
  { key: "passingQuality",     label: "Passningskvalitet",    shortLabel: "Pass-kvalitet" },
  { key: "progression",        label: "Progression",          shortLabel: "Progression"   },
  { key: "involvement",        label: "Involvering",          shortLabel: "Involvering"   },
  { key: "activeDefence",      label: "Aktivt försvar",       shortLabel: "Akt. försvar"  },
  { key: "intelligentDefence", label: "Intelligent försvar",  shortLabel: "Int. försvar"  },
];

// ─── Nyckeltal-submetriker ─────────────────────────────────────────────────────

export interface SubMetric {
  label: string;
  category: string;
  rank2025: number;
  total2025: number;
  rank2026: number;
  total2026: number;
}

export const twelveSubMetrics: SubMetric[] = [
  { label: "np Mål",                  category: "Box Threat",          rank2025: 3,   total2025: 119, rank2026: 9,  total2026: 73 },
  { label: "np xG",                   category: "Box Threat",          rank2025: 8,   total2025: 119, rank2026: 7,  total2026: 73 },
  { label: "Box-beröringar",          category: "Box Threat",          rank2025: 32,  total2025: 119, rank2026: 8,  total2026: 73 },
  { label: "Box-mottagningar",        category: "Box Threat",          rank2025: 30,  total2025: 119, rank2026: 11, total2026: 73 },
  { label: "Box-löpningar (carries)", category: "Box Threat",          rank2025: 46,  total2025: 119, rank2026: 8,  total2026: 73 },
  { label: "Chans-skapande passningar", category: "Passningskvalitet", rank2025: 15,  total2025: 119, rank2026: 2,  total2026: 73 },
  { label: "Passningar i sista tred.", category: "Passningskvalitet",  rank2025: 30,  total2025: 119, rank2026: 7,  total2026: 73 },
  { label: "Passningar (xT)",         category: "Passningskvalitet",   rank2025: 56,  total2025: 119, rank2026: 22, total2026: 73 },
  { label: "Assist",                  category: "Skapa",               rank2025: 65,  total2025: 119, rank2026: 9,  total2026: 73 },
  { label: "xA",                      category: "Skapa",               rank2025: 33,  total2025: 119, rank2026: 11, total2026: 73 },
  { label: "Nyckelpassningar",        category: "Skapa",               rank2025: 53,  total2025: 119, rank2026: 16, total2026: 73 },
  { label: "Djupa passningar",        category: "Skapa",               rank2025: 15,  total2025: 119, rank2026: 7,  total2026: 73 },
  { label: "np xG per avslut",        category: "Effektivitet",        rank2025: 34,  total2025: 119, rank2026: 39, total2026: 73 },
  { label: "xGChain/ball possession", category: "Effektivitet",        rank2025: 4,   total2025: 119, rank2026: 4,  total2026: 73 },
  { label: "np xG+xA per 100 touch.", category: "Effektivitet",        rank2025: 12,  total2025: 119, rank2026: 9,  total2026: 73 },
  { label: "Ball progression (xT)",   category: "Progression",         rank2025: 82,  total2025: 119, rank2026: 35, total2026: 73 },
  { label: "Pass till sista tredj.",  category: "Progression",         rank2025: 77,  total2025: 119, rank2026: 37, total2026: 73 },
];

// ─── Bolldata.se data ─────────────────────────────────────────────────────────

export const bolldataStats2025: BolldataStats = {
  season: "2025",
  sm: 30,
  min: 2719,
  goals: 17,
  assists: 2,
  points: 19,
  pointsPercent: 21.1,
  pointsPerNinety: 0.63,
  goalsPerNinety: 0.56,
  assistsPerNinety: 0.07,
  xG: 11.85,
  xA: 4.25,
  xP: 16.10,
  xGPerNinety: 0.39,
  xAPerNinety: 0.14,
  xPPerNinety: 0.53,
  goalsOverXG: parseFloat((17 - 11.85).toFixed(2)),   // +5.15 överkurs – exceptionellt avslut
  shotAssists: 49,
  shotAssistsPerNinety: 1.62,
  goalChances: 63,
  goalChancesPerNinety: 2.09,
  cornerKicks: 106,
  cornerKicksPerNinety: 3.51,
  freekicks: 40,
  freekicksDangerousArea: 16,
  penalties: 2,
  penaltiesScored: 1,
};

export const bolldataStats2026: BolldataStats = {
  season: "2026",
  sm: 14,
  min: 1147,
  goals: 5,
  assists: 5,
  points: 10,
  pointsPercent: 18.5,
  pointsPerNinety: 0.78,
  goalsPerNinety: 0.39,
  assistsPerNinety: 0.39,
  xG: 4.83,
  xA: 3.60,
  xP: 8.43,
  xGPerNinety: 0.38,
  xAPerNinety: 0.28,
  xPPerNinety: 0.66,
  goalsOverXG: 0.17,
  shotAssists: 34,
  shotAssistsPerNinety: 2.67,
  goalChances: 31,
  goalChancesPerNinety: 2.43,
  keyPasses: 16,
  keyPassesPerNinety: 1.26,
  smartPasses: 4,
  smartPassesPerNinety: 0.31,
  cornerKicks: 32,
  cornerKicksPerNinety: 2.51,
  freekicks: 32,
  freekicksDangerousArea: 6,
  freekicksXA: 0.66,
  penalties: 1,
  penaltiesScored: 1,
  offensiveRating: 557,
  offensiveRatingPerNinety: 43.71,
};

export const bolldataStatsBySeason: Record<BesaraSeason, BolldataStats> = {
  "2025": bolldataStats2025,
  "2026": bolldataStats2026,
};

// ─── Analystexter ──────────────────────────────────────────────────────────────

export interface SeasonNarrative {
  season: BesaraSeason;
  headline: string;
  subheadline: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export const seasonNarratives: SeasonNarrative[] = [
  {
    season: "2025",
    headline: "Målmaskin",
    subheadline: "Komplett allsvenskt säsong",
    summary:
      "Besara spelade hela 2025 som en av ligans mest produktiva spelare rent målmässigt. 17 mål på 30 matcher – nästan ett mål varannan match – placerade honom i topp 3 av 119 jämförbara spelare i Twelve. Skapa för lagkamrater och assist-statistiken var däremot klart svagare.",
    strengths: ["Box Threat topp 10/119", "Effektivitet topp 13/119", "np Mål rank 3/119", "np xG rank 8/119"],
    weaknesses: ["Aktivt försvar 114/119", "Intelligent försvar 118/119", "Progression 90/119", "Assist rank 65/119"],
  },
  {
    season: "2026",
    headline: "Kreativ motor",
    subheadline: "14 matcher av en pågående säsong",
    summary:
      "2026 visar en ny sida av Besara. Fortfarande ett hot i boxen (topp 10/73) och extremt effektiv (topp 6/73), men nu är han ligatoppens skickligaste spelstartare. Rank 4/73 i att skapa för lagkamrater och rank 2/73 i chans-skapande passningar visar att han blivit en komplett anfallande mittfältare.",
    strengths: ["Skapa för lagkamrater 4/73", "Effektivitet 6/73", "Box Threat 10/73", "Chans-skapande pass rank 2/73"],
    weaknesses: ["Intelligent försvar 73/73", "Involvering 65/73", "Aktivt försvar 48/73"],
  },
];

// ─── Skottkvalitet & avslut ────────────────────────────────────────────────────

export interface FinishingData {
  season: BesaraSeason;
  goals: number;
  npXG: number;
  npXGRank: number;
  npXGTotal: number;
  npXGPerShotRank: number;
  npXGPerShotTotal: number;
  boxEntriesRank: number;
  boxEntriesTotal: number;
  boxTouchesRank: number;
  boxTouchesTotal: number;
  boxReceptionsRank: number;
  boxReceptionsTotal: number;
}

export const finishingData: FinishingData[] = [
  {
    season: "2025",
    goals: 17,
    npXG: 11.85,
    npXGRank: 8,            npXGTotal: 119,
    npXGPerShotRank: 34,    npXGPerShotTotal: 119,  // ~72nd pct – bra skottpositioner
    boxEntriesRank: 46,     boxEntriesTotal: 119,   // ~61st pct
    boxTouchesRank: 32,     boxTouchesTotal: 119,   // ~73rd pct
    boxReceptionsRank: 30,  boxReceptionsTotal: 119,// ~75th pct
  },
  {
    season: "2026",
    goals: 5,
    npXG: 4.83,
    npXGRank: 7,            npXGTotal: 73,
    npXGPerShotRank: 39,    npXGPerShotTotal: 73,   // ~47th pct – sämre skottpositioner
    boxEntriesRank: 8,      boxEntriesTotal: 73,    // ~90th pct – MYCKET mer i boxen
    boxTouchesRank: 8,      boxTouchesTotal: 73,    // ~90th pct
    boxReceptionsRank: 11,  boxReceptionsTotal: 73, // ~85th pct
  },
];

export const keyInsights: string[] = [
  "Mål/90 sjönk från 0,56 till 0,39 – men Assist/90 steg från 0,07 till 0,39. Rollbyte från finisher till spelstartare.",
  "G+A/90 steg från 0,63 (2025) till 0,78 (2026) – mer total offensiv output per minut 2026.",
  "xG/90 identisk: 0,39 (2025) vs 0,38 (2026). Besara skapar lika många kvalitéchanger för sig själv per minut.",
  "2025: 17 mål på 11,85 xG = +5,15 överkurs (exceptionellt avslut). 2026: 5 mål på 4,83 xG = +0,17 (normaliserat).",
  "Skottassist/90 ökade: 1,62 (2025) → 2,67 (2026). Fler chanser skapade för lagkamrater per minut.",
  "Rank 'Skapa för lagkamrater': 39/119 (2025) → 4/73 (2026). xA/90 dubblerades: 0,14 → 0,28.",
];
