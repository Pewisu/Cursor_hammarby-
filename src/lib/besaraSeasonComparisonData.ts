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

/** Bolldata.se – endast 2026 tillgängligt */
export interface BolldataStats2026 {
  season: "2026";
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
  keyPasses: number;
  keyPassesPerNinety: number;
  smartPasses: number;
  smartPassesPerNinety: number;
  cornerKicks: number;
  cornerKicksPerNinety: number;
  freekicks: number;
  freekicksDangerousArea: number;
  freekicksXA: number;
  penalties: number;
  penaltiesScored: number;
  offensiveRating: number;
  offensiveRatingPerNinety: number;
}

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
  { label: "xGChain/ball possession", category: "Effektivitet",        rank2025: 4,   total2025: 119, rank2026: 4,  total2026: 73 },
  { label: "np xG+xA per 100 touch.", category: "Effektivitet",        rank2025: 12,  total2025: 119, rank2026: 9,  total2026: 73 },
  { label: "Ball progression (xT)",   category: "Progression",         rank2025: 82,  total2025: 119, rank2026: 35, total2026: 73 },
  { label: "Pass till sista tredj.",  category: "Progression",         rank2025: 77,  total2025: 119, rank2026: 37, total2026: 73 },
];

// ─── Bolldata.se 2026 ─────────────────────────────────────────────────────────

export const bolldataStats2026: BolldataStats2026 = {
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

export const keyInsights: string[] = [
  "Mål/90 sjönk från 0,56 till 0,39 – men Assist/90 steg från 0,07 till 0,39.",
  "Kombinerat G+A/90 steg från 0,63 till 0,78 – mer produktiv per minut totalt.",
  "Rank i att skapa för lagkamrater: 39/119 (2025) → 4/73 (2026). En transformation.",
  "Chans-skapande passningar: 15/119 (2025) → 2/73 (2026) – ligatoppklass.",
  "Box Threat: fortsatt elit i båda säsongerna trots förändrad roll.",
  "Försvar är och förblir Besaras tydliga svaghetszon i båda säsongerna.",
];
