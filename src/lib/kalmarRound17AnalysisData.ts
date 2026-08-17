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

/** Matchstatistik – Omgång 17 · Kalmar FF vs Hammarby (0–4) · 16 aug 2026. */
export const kalmarRound17MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    3.78,
    0.42,
    "3,78",
    "0,42",
    "9× mer förväntat mål för Hammarby – outstanding dominance på bortaplan.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    25,
    4,
    "25",
    "4",
    "6,25× fler avslut – Kalmar hade knappt en chans att hota under matchen.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    13,
    2,
    "13",
    "2",
    "13–2 i skott på mål – effektiv och klinisk avslutning hela matchen.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    64,
    36,
    "64%",
    "36%",
    "Nästan dubbelt så mycket bollinnehav – Hammarby styrde spelbilden borta.",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    33,
    8,
    "33",
    "8",
    "4× fler beröringar i Kalmars straffområde – konstant offensivt tryck.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    9,
    4,
    "9",
    "4",
    "9 mot 4 hörnor – tydlig territoriell fördel längs hela matchen.",
  ),
  buildMatchSpiderAxis(
    "Lyckade passningar",
    549,
    298,
    "549 (89%)",
    "298 (83%)",
    "Nästan dubbelt så många lyckade passningar med högre precision – Hammarby kontrollerade."
  ),
  buildMatchSpiderAxis(
    "Stora möjligheter",
    9,
    1,
    "9",
    "1",
    "9 mot 1 high opportunity shots – överlägsen chanskapande i klass med säsongens bästa.",
  ),
];

export const kalmarRound17Goals: MatchGoalEvent[] = [
  { minute: 43, team: "Hammarby", player: "F. Adjei (tredje gillt)", xg: 0.38 },
  { minute: 48, team: "Hammarby", player: "F. Winther (nick, hörna)", xg: 0.45 },
  { minute: 55, team: "Hammarby", player: "N. Persson (snabbanfall)", xg: 0.32 },
  { minute: 62, team: "Hammarby", player: "P. Abraham (chip, assist V. Lind)", xg: 0.55 },
];

export const kalmarRound17MatchStory: MatchStoryPhase[] = [
  {
    id: "opening",
    label: "Inledning · Hammarby tar kommandot",
    scoreline: "0–0, 1–30'",
    body:
      "Hammarby kontrollerade från avspark men Kalmars målvakt Samuel Brolin stod på sig länge. Han räddade tidigt ett tungt avslut av Adjei spektakulärt med en högernäve, och tippade sedan in ett projektil i ribban. Hammarby hade 82% Field Tilt och skapade ett konstant tryck.",
    tone: "blue",
  },
  {
    id: "first-goal",
    label: "Adjei öppnar – 0-1 i minut 43",
    scoreline: "0–1 HIF 43'",
    body:
      "Tredje gången gillt för Frank Junior Adjei. Efter att Montader Madjed fick en rejäl felträff strax före pausen gick bollen fram till Adjei som från stillastående sköt 1–0. Brolin var på bollen med fingertopparna men kunde inte hindra den. Förtjänat ledningsmål precis inför paus.",
    tone: "emerald",
  },
  {
    id: "second-goal",
    label: "Winther fördubblar – 0-2 i minut 48",
    scoreline: "0–2 HIF 48'",
    body:
      "Bara tre minuter in i andra halvlek nickade Frederik Winther in 0–2 på hörna. Danskens första mål för Hammarby – ett välförtjänt resultat av det hörnakonstanta trycket. Med nollan spräckt rann det iväg och Hammarby lekte fotboll mot ett Kalmar utan svar.",
    tone: "emerald",
  },
  {
    id: "third-goal",
    label: "Persson gör 0-3 i minut 55",
    scoreline: "0–3 HIF 55'",
    body:
      "Sju minuter senare avslutade Noah Persson ett snabbt Hammarbyanfall och satte 0–3. En fullständig upprullning av Kalmar-försvaret. Tre mål på 12 minuter – Kalmars fans hade knappt hunnit resa sig mellan firanden.",
    tone: "emerald",
  },
  {
    id: "fourth-goal",
    label: "Abraham sätter spiken – 0-4 i minut 62",
    scoreline: "0–4 HIF 62'",
    body:
      "Victor Lind hittade Paulos Abraham med en fin chippning och Abraham gjorde 0–4 i den 62:a minuten – ett tekniskt elegant friläge. På 20 minuter hade Hammarby gjort tre mål och matchen var fullständigt avgjord.",
    tone: "emerald",
  },
  {
    id: "verdict",
    label: "Slutbild · bortaseger av högsta klass",
    scoreline: "0–4 · 3,78 xG mot 0,42 xG",
    body:
      "25 avslut, 13 på mål, 9 hörnor, 33 boxberöringar, 3,78 xG mot Kalmars 4 avslut totalt. Hammarby krympte gapet till Sirius till nio poäng med 13 omgångar kvar. Rydström: 'Utifrån hur det såg ut hade jag velat ha 6–0 även om 4–0 är bra.'",
    tone: "slate",
  },
];

export const kalmarRound17Takeaways: MatchRecapTakeaway[] = [
  {
    id: "dominance",
    title: "Totaldominans borta – 3,78 xG mot 0,42",
    body:
      "Hammarby skapade 3,78 xG mot Kalmars 0,42 – nästan 9× överlägsenhet. 25 avslut mot 4, 13 på mål mot 2, 33 boxberöringar mot 8. Twelve rankade Oppositionen Chance Creation som bäst i ligan (1/28) i denna match.",
    tone: "emerald",
    stat: "3,78 xG · 25 avslut · 13 på mål",
  },
  {
    id: "adjei",
    title: "Frank Junior Adjei – matchens man, öppningsmål 43'",
    body:
      "Adjei var matchens motor – tvingade Brolin till årets räddning, hittade ribban och satte slutligen 0–1 på tredje försöket. En tålmodig och effektiv insats av 24-åringen som fortfarande söker fäste i startelvan.",
    tone: "emerald",
    stat: "F. Adjei 43' · 3 stora chanser",
  },
  {
    id: "winther",
    title: "Winthers debutmål – 0-2 på hörna",
    body:
      "Frederik Winther nickade in 0–2 på hörna i minut 48 – danskarens första mål för Hammarby. En viktig signal om att hörnor fortsätter att vara ett farligt vapen för Hammarby (9 mot 4 i matchen).",
    tone: "blue",
    stat: "F. Winther 48' · debutmål för HIF",
  },
  {
    id: "defence",
    title: "Defensiv nolla – Opp Chance Creation #1 i ligan",
    body:
      "Kalmar begränsades till 4 avslut (2 på mål), 8 boxberöringar och 0,42 xG. Twelve rankade Hammarbys defensiva prestation som bäst i ligan denna omgång (1/28 i opposition chance creation).",
    tone: "blue",
    stat: "0,42 xG (Kalmar) · PPDA 5,26",
  },
  {
    id: "title-chase",
    title: "Jakten inledd – 9 poäng till Sirius",
    body:
      "Med segern krympte Hammarby gapet till serieledande Sirius till nio poäng med 13 omgångar kvar. Sirius hade en 14-poängsledning nyligen – jaktläget lever. Hammarby vann båda mötena mot Kalmar 2026 med sammanlagda 6–0.",
    tone: "emerald",
    stat: "9 p till Sirius · 13 omg kvar",
  },
];

export const kalmarRound17SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 3.78, opponentValue: 0.42, hammarbyDisplay: "3,78", opponentDisplay: "0,42" },
  { label: "Avslut", hammarbyValue: 25, opponentValue: 4, hammarbyDisplay: "25", opponentDisplay: "4" },
  { label: "Bollinnehav", hammarbyValue: 64, opponentValue: 36, hammarbyDisplay: "64%", opponentDisplay: "36%" },
  { label: "Boxberöringar", hammarbyValue: 33, opponentValue: 8, hammarbyDisplay: "33", opponentDisplay: "8" },
];

export const kalmarRound17SnapshotPills: MatchSnapshotPill[] = [
  { id: "result", label: "Seger 4–0", tone: "emerald" },
  { id: "xg", label: "3,78 xG (HIF)", tone: "emerald" },
  { id: "adjei", label: "Adjei 43' ⚡", tone: "blue" },
  { id: "winther", label: "Winther 48' 🎯", tone: "blue" },
  { id: "persson", label: "N. Persson 55' ✅", tone: "emerald" },
  { id: "abraham", label: "Abraham 62' ✅", tone: "emerald" },
];

export const kalmarRound17Recap = {
  headline: "Hammarby körde över Kalmar borta – tre mål på 14 minuter",
  tagline: "3,78 xG · 25 avslut · Chance Creation #3 · Opp. Chance Creation #1 i ligan",
  opponentScore: 0,
  hammarbyScore: 4,
  opponentXg: 0.42,
  hammarbyXg: 3.78,
  halftimeScore: "0–1",
  matchResult: "0–4",
  dateLabel: "16 aug 2026 · Omgång 17 · Guldfågeln Arena · 9 293 åskådare",
  sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-08-16/kalmar-hammarby-0-4",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/2026-08-16-00-00-kalmar-ff-hammarby",
};

/** Twelve KPI-data för omgång 17. Säsongssnitt = HIF Allsvenskan 2026 omg 1–16. */
export const kalmarRound17TwelveKpis = {
  /** Field tilt = HIF:s andel av final-third-xT (%). Twelve-rapport: 82%. Snitt omg 1-16: ~66%. */
  fieldTiltPct: 82,
  fieldTiltAvgPct: 66,
  /** PPDA = Passes Per Defensive Action. Lägre = hårdare press. Match: 5.26. Snitt omg 1-16: ~5.5. */
  ppda: 5.26,
  ppdaAvg: 5.50,
  /** xT – förväntat hot. Match: 1.68. */
  xt: 1.68,
  xtAvg: 1.32,
  /** Motst. xT. Match: 0.55. */
  oppXt: 0.55,
  oppXtAvg: 0.92,
  /** Defensiv aktionshöjd (m). Match: 52.16. Högre = mer aggressivt försvar. */
  defensiveActionHeightM: 52.16,
  defensiveActionHeightAvg: 44.10,
  /** Passningar in i box. Match: 33 boxberöringar (Twelve: 33 Box touches). */
  boxTouches: 33,
  boxTouchesAvg: 22,
  /** Presstäthet – Twelve defensive intensity metric. Match: 5.26. */
  defensiveIntensity: 5.26,
  defensiveIntensityAvg: 5.47,
  /** Twelve ranking (ur 28 lag i ligan) för denna match. Lägre rank = bättre. */
  rankings: {
    defence: { rank: 5, total: 28, label: "Försvar" },
    defTransition: { rank: 3, total: 28, label: "Def. transition" },
    oppChanceCreation: { rank: 1, total: 28, label: "Mot. chanskapande" },
    attTransition: { rank: 19, total: 28, label: "Off. transition" },
    attack: { rank: 10, total: 28, label: "Attack" },
    chanceCreation: { rank: 3, total: 28, label: "Chanskapande" },
  },
} as const;

export interface MomentumPoint {
  minute: number;
  /** Positive = Hammarby press, negative = Kalmar press */
  value: number;
}

export interface MomentumGoal {
  minute: number;
  team: "hammarby" | "opponent";
  label: string;
}

/**
 * Matchmomentum omgång 17 – Kalmar FF vs Hammarby
 * Härledd från Twelve xT per 15-minutersperiod och xG-progression.
 * Positiva värden = Hammarby-dominans, negativa = Kalmar-dominans.
 *
 * HIF xT per period: 0-15: 0.34 · 15-30: 0.37 · 30-HT: 0.17 · 45-60: 0.51 · 60-75: 0.22 · 75-FT: 0.08
 * KAL xT per period: 0-15: 0.03 · 15-30: 0.02 · 30-HT: 0.12 · 45-60: 0.00 · 60-75: 0.11 · 75-FT: 0.27
 */
export const kalmarRound17Momentum: MomentumPoint[] = [
  { minute: 0,  value: 0   },
  { minute: 5,  value: 12  },
  { minute: 10, value: 22  },
  { minute: 15, value: 28  },
  { minute: 18, value: 35  },
  { minute: 22, value: 42  },
  { minute: 28, value: 38  },
  { minute: 32, value: 30  },
  { minute: 36, value: 18  },  // Kalmar period of pressure
  { minute: 40, value: 35  },
  { minute: 43, value: 55  },  // Adjei 0-1
  { minute: 45, value: 48  },
  { minute: 48, value: 62  },  // Winther 0-2
  { minute: 52, value: 55  },
  { minute: 55, value: 65  },  // Persson 0-3
  { minute: 60, value: 58  },
  { minute: 62, value: 70  },  // Abraham 0-4
  { minute: 66, value: 42  },
  { minute: 70, value: 20  },
  { minute: 75, value: 8   },
  { minute: 78, value: -10 },  // Kalmar late pressure
  { minute: 82, value: -18 },
  { minute: 85, value: -12 },
  { minute: 88, value: -8  },
  { minute: 90, value: 5   },
];

export const kalmarRound17MomentumGoals: MomentumGoal[] = [
  { minute: 43, team: "hammarby", label: "Adjei 0–1" },
  { minute: 48, team: "hammarby", label: "Winther 0–2" },
  { minute: 55, team: "hammarby", label: "N. Persson 0–3" },
  { minute: 62, team: "hammarby", label: "Abraham 0–4" },
];

/** Referee mini-analysis for round 17 */
export const kalmarRound17RefereeData = {
  refereeName: "Granit Maqedonci",
  matchFoulsHIF: 10,
  matchFoulsOpp: 10,
  matchYellowHIF: 1,
  matchYellowOpp: 0,
  matchRedHIF: 0,
  matchRedOpp: 0,
  /**
   * Domarindex: Fouls equal (10-10), HIF fick ett gult kort → cardDiff = 0 - 1 = -1.
   * Uppskattad frispark-differential: lika (3-3) baserat på lika fouls.
   */
  domarindexThisMatch: -1,
  /** Previous Hammarby match with Granit Maqedonci (omgång 3 vs Örgryte, 8-1) */
  previousMatch: {
    gameweek: 3,
    matchName: "Hammarby – Örgryte, 8-1",
    date: "18 apr 2026",
    domarindex: 0,
    ratingLabel: "Neutral",
    note: "Granit Maqedonci dömde 8-1-segern hemma mot Örgryte. Fouls jämna, ett gult kort till Örgryte – balanserad match.",
  },
  seasonStats: {
    matchesWithHIF: 2,
    avgDomarindex: -0.5,
    ratingLabel: "Neutral",
  },
  analysis:
    "Granit Maqedonci ledde matchen med god kontroll i en one-sided tillställning. Fouls var identiska (10-10) men Hammarby fick ett gult kort utan att Kalmar fick något, vilket ger ett domarindex på -1. Med tanke på matchbilden och Hammarbys dominans var det en invändningsfri domarinsats utan kontroverser. Maqedonci hade tidigare dömt Hammarbys 8–1-seger mot Örgryte i omgång 3, även den med neutral domarindex.",
};
