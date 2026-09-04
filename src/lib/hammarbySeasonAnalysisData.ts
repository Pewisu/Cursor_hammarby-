export type SeasonKey = "2024" | "2025" | "2026";

export type MetricDirection = "higher" | "lower";

export interface SeasonHeadline {
  season: SeasonKey;
  label: string;
  matches: number;
  record: string;
  points: number;
  pointsPerMatch: number;
  goalsFor: number;
  goalsAgainst: number;
  leaguePosition: string;
  shortRead: string;
}

export interface RankedMetric {
  id: string;
  label: string;
  explanation: string;
  valueLabel: string;
  value: number;
  rank: number;
  total: number;
  direction: MetricDirection;
  source: "Twelve" | "Bolldata";
}

export interface SeasonIdentityMetric {
  id: string;
  label: string;
  shortLabel: string;
  explanation: string;
  direction: MetricDirection;
  values: Record<
    SeasonKey,
    {
      value: number;
      valueLabel: string;
      rank: number;
      total: number;
    }
  >;
}

export interface BolldataSpiderMetric {
  id: string;
  label: string;
  shortLabel: string;
  explanation: string;
  direction: MetricDirection;
  values: Record<
    SeasonKey,
    {
      perMatch: number;
      valueLabel: string;
      rank: number;
      total: number;
    }
  >;
}

export interface GoalPatternSeasonValue {
  primary: string;
  secondary: string;
}

export interface GoalPatternInsight {
  id: string;
  title: string;
  question: string;
  takeaway: string;
  values: Record<SeasonKey, GoalPatternSeasonValue>;
}

export const seasonHeadlines: SeasonHeadline[] = [
  {
    season: "2026",
    label: "2026 hittills",
    matches: 11,
    record: "5-2-4",
    points: 17,
    pointsPerMatch: 1.55,
    goalsFor: 24,
    goalsAgainst: 13,
    leaguePosition: "4:a i aktuell tabell",
    shortRead:
      "Spelmässigt toppskikt, resultatmässigt hackigare: Hammarby skapar mest tryck i serien men har inte samma defensiva kontroll som 2025.",
  },
  {
    season: "2025",
    label: "2025",
    matches: 30,
    record: "19-5-6",
    points: 62,
    pointsPerMatch: 2.07,
    goalsFor: 60,
    goalsAgainst: 29,
    leaguePosition: "2:a i sluttabellen",
    shortRead:
      "Den kompletta referensen: hög press, bäst defensiv underliggande data och högst målproduktion.",
  },
  {
    season: "2024",
    label: "2024",
    matches: 30,
    record: "16-6-8",
    points: 54,
    pointsPerMatch: 1.8,
    goalsFor: 48,
    goalsAgainst: 25,
    leaguePosition: "2:a i sluttabellen",
    shortRead:
      "Stabil tabellsäsong, men tydligt svagare offensiv volym och färre boxaktioner än 2025 och 2026.",
  },
];

export const season2026LeagueMetrics: RankedMetric[] = [
  {
    id: "np-xg",
    label: "xG per match",
    explanation: "Kvaliteten på chanserna. Högst värde betyder att laget regelbundet skapar bra avslutslägen.",
    valueLabel: "2,16",
    value: 2.1618,
    rank: 1,
    total: 16,
    direction: "higher",
    source: "Twelve",
  },
  {
    id: "np-shots",
    label: "Avslut per match",
    explanation: "Volymen i anfallsspelet. Visar om laget kommer till många avslut, inte bara enstaka chanser.",
    valueLabel: "20,18",
    value: 20.1818,
    rank: 1,
    total: 16,
    direction: "higher",
    source: "Twelve",
  },
  {
    id: "field-tilt",
    label: "Field tilt",
    explanation: "Hur mycket av matchen som spelas nära motståndarens mål jämfört med eget mål.",
    valueLabel: "69,6%",
    value: 69.6364,
    rank: 1,
    total: 16,
    direction: "higher",
    source: "Twelve",
  },
  {
    id: "ppda",
    label: "PPDA",
    explanation: "Pressmått. Lägre tal betyder att motståndaren får färre passningar innan Hammarby sätter press.",
    valueLabel: "4,19",
    value: 4.1864,
    rank: 1,
    total: 16,
    direction: "lower",
    source: "Twelve",
  },
  {
    id: "box-touches",
    label: "Boxberöringar per match",
    explanation: "Hur ofta Hammarby får in bollen och spelarna i de farligaste ytorna.",
    valueLabel: "28,82",
    value: 28.8182,
    rank: 1,
    total: 16,
    direction: "higher",
    source: "Twelve",
  },
  {
    id: "opp-np-xg",
    label: "Motståndarnas xG per match",
    explanation: "Den tydligaste varningslampan. Här är lägre bättre, och 2026 är Hammarby bara mittenlag.",
    valueLabel: "1,45",
    value: 1.4527,
    rank: 9,
    total: 16,
    direction: "lower",
    source: "Twelve",
  },
  {
    id: "goals",
    label: "Mål per match",
    explanation: "Faktisk utdelning framåt från bolldata, oavsett hur chanserna skapades.",
    valueLabel: "2,18",
    value: 2.18,
    rank: 2,
    total: 16,
    direction: "higher",
    source: "Bolldata",
  },
  {
    id: "points",
    label: "Poäng per match",
    explanation: "Resultatet på resultattavlan. Bra, men inte lika dominant som spelprofilen.",
    valueLabel: "1,55",
    value: 1.55,
    rank: 4,
    total: 16,
    direction: "higher",
    source: "Bolldata",
  },
];

export const twelveIdentityMetrics: SeasonIdentityMetric[] = [
  {
    id: "np-goals",
    label: "Mål",
    shortLabel: "Mål",
    explanation: "Faktisk offensiv utdelning per match enligt Twelve.",
    direction: "higher",
    values: {
      "2026": { value: 2.0909, valueLabel: "2,09", rank: 3, total: 16 },
      "2025": { value: 1.9, valueLabel: "1,90", rank: 1, total: 16 },
      "2024": { value: 1.5333, valueLabel: "1,53", rank: 4, total: 16 },
    },
  },
  {
    id: "np-xg",
    label: "xG",
    shortLabel: "xG",
    explanation: "Chanskvalitet per match.",
    direction: "higher",
    values: {
      "2026": { value: 2.1618, valueLabel: "2,16", rank: 1, total: 16 },
      "2025": { value: 1.6357, valueLabel: "1,64", rank: 5, total: 16 },
      "2024": { value: 1.3133, valueLabel: "1,31", rank: 10, total: 16 },
    },
  },
  {
    id: "box-touches",
    label: "Boxberöringar",
    shortLabel: "Box",
    explanation: "Hur ofta laget når farliga ytor.",
    direction: "higher",
    values: {
      "2026": { value: 28.8182, valueLabel: "28,82", rank: 1, total: 16 },
      "2025": { value: 26.8, valueLabel: "26,80", rank: 2, total: 16 },
      "2024": { value: 17.2, valueLabel: "17,20", rank: 12, total: 16 },
    },
  },
  {
    id: "field-tilt",
    label: "Field tilt",
    shortLabel: "Territorium",
    explanation: "Territoriellt tryck nära motståndarens mål.",
    direction: "higher",
    values: {
      "2026": { value: 69.6364, valueLabel: "69,6%", rank: 1, total: 16 },
      "2025": { value: 66.8333, valueLabel: "66,8%", rank: 1, total: 16 },
      "2024": { value: 57.9667, valueLabel: "58,0%", rank: 2, total: 16 },
    },
  },
  {
    id: "ppda",
    label: "PPDA",
    shortLabel: "Press",
    explanation: "Pressintensitet, där lägre värde är bättre.",
    direction: "lower",
    values: {
      "2026": { value: 4.1864, valueLabel: "4,19", rank: 1, total: 16 },
      "2025": { value: 3.9653, valueLabel: "3,97", rank: 1, total: 16 },
      "2024": { value: 4.704, valueLabel: "4,70", rank: 1, total: 16 },
    },
  },
  {
    id: "recoveries-5s",
    label: "Återerövring inom 5s",
    shortLabel: "5s-vinst",
    explanation: "Hur ofta bollen vinns snabbt tillbaka efter tapp.",
    direction: "higher",
    values: {
      "2026": { value: 13.3636, valueLabel: "13,4%", rank: 1, total: 16 },
      "2025": { value: 15.4333, valueLabel: "15,4%", rank: 1, total: 16 },
      "2024": { value: 10.8333, valueLabel: "10,8%", rank: 10, total: 16 },
    },
  },
  {
    id: "opp-np-xg",
    label: "Motst. xG",
    shortLabel: "xG emot",
    explanation: "Chanskvalitet som Hammarby släpper till. Lägre är bättre.",
    direction: "lower",
    values: {
      "2026": { value: 1.4527, valueLabel: "1,45", rank: 9, total: 16 },
      "2025": { value: 1.0267, valueLabel: "1,03", rank: 1, total: 16 },
      "2024": { value: 1.13, valueLabel: "1,13", rank: 3, total: 16 },
    },
  },
  {
    id: "opp-shots",
    label: "Motst. avslut",
    shortLabel: "Skott emot",
    explanation: "Hur många avslut motståndarna får. Lägre är bättre.",
    direction: "lower",
    values: {
      "2026": { value: 10.5455, valueLabel: "10,55", rank: 3, total: 16 },
      "2025": { value: 9.7333, valueLabel: "9,73", rank: 1, total: 16 },
      "2024": { value: 11.9, valueLabel: "11,90", rank: 7, total: 16 },
    },
  },
];

export const bolldataSpiderMetrics: BolldataSpiderMetric[] = [
  {
    id: "points",
    label: "Poäng per match",
    shortLabel: "Poäng",
    explanation: "Resultatnivån i tabellen.",
    direction: "higher",
    values: {
      "2026": { perMatch: 1.55, valueLabel: "1,55", rank: 4, total: 16 },
      "2025": { perMatch: 2.07, valueLabel: "2,07", rank: 2, total: 16 },
      "2024": { perMatch: 1.8, valueLabel: "1,80", rank: 2, total: 16 },
    },
  },
  {
    id: "goals-for",
    label: "Mål per match",
    shortLabel: "Mål",
    explanation: "Faktisk målproduktion.",
    direction: "higher",
    values: {
      "2026": { perMatch: 2.18, valueLabel: "2,18", rank: 2, total: 16 },
      "2025": { perMatch: 2, valueLabel: "2,00", rank: 1, total: 16 },
      "2024": { perMatch: 1.6, valueLabel: "1,60", rank: 4, total: 16 },
    },
  },
  {
    id: "goals-against",
    label: "Insläppta per match",
    shortLabel: "Mål emot",
    explanation: "Defensiv utdelning. Lägre är bättre.",
    direction: "lower",
    values: {
      "2026": { perMatch: 1.18, valueLabel: "1,18", rank: 5, total: 16 },
      "2025": { perMatch: 0.97, valueLabel: "0,97", rank: 2, total: 16 },
      "2024": { perMatch: 0.83, valueLabel: "0,83", rank: 2, total: 16 },
    },
  },
  {
    id: "attacking-actions",
    label: "Lyckade anfallsaktioner",
    shortLabel: "Anfall",
    explanation: "Samlad offensiv aktivitet från bolldata.",
    direction: "higher",
    values: {
      "2026": { perMatch: 26.55, valueLabel: "26,55", rank: 1, total: 16 },
      "2025": { perMatch: 27.1, valueLabel: "27,10", rank: 1, total: 16 },
      "2024": { perMatch: 24.5, valueLabel: "24,50", rank: 7, total: 16 },
    },
  },
  {
    id: "shot-assists",
    label: "Shot assists",
    shortLabel: "Assistläge",
    explanation: "Passningar som leder till avslut.",
    direction: "higher",
    values: {
      "2026": { perMatch: 12.45, valueLabel: "12,45", rank: 1, total: 16 },
      "2025": { perMatch: 9.47, valueLabel: "9,47", rank: 2, total: 16 },
      "2024": { perMatch: 7.53, valueLabel: "7,53", rank: 10, total: 16 },
    },
  },
  {
    id: "progressive-runs",
    label: "Progressiva löpningar",
    shortLabel: "Prog. löp",
    explanation: "Bollförande progression framåt.",
    direction: "higher",
    values: {
      "2026": { perMatch: 23.18, valueLabel: "23,18", rank: 1, total: 16 },
      "2025": { perMatch: 26.6, valueLabel: "26,60", rank: 1, total: 16 },
      "2024": { perMatch: 20.6, valueLabel: "20,60", rank: 2, total: 16 },
    },
  },
  {
    id: "recoveries",
    label: "Återerövringar",
    shortLabel: "Vinner boll",
    explanation: "Hur ofta laget tar tillbaka bollen.",
    direction: "higher",
    values: {
      "2026": { perMatch: 93.45, valueLabel: "93,45", rank: 2, total: 16 },
      "2025": { perMatch: 90.03, valueLabel: "90,03", rank: 4, total: 16 },
      "2024": { perMatch: 81.3, valueLabel: "81,30", rank: 11, total: 16 },
    },
  },
  {
    id: "duel-wins",
    label: "Duellvinster",
    shortLabel: "Dueller",
    explanation: "Fysisk och individuell matchkontroll.",
    direction: "higher",
    values: {
      "2026": { perMatch: 84.55, valueLabel: "84,55", rank: 1, total: 16 },
      "2025": { perMatch: 87.93, valueLabel: "87,93", rank: 1, total: 16 },
      "2024": { perMatch: 83.33, valueLabel: "83,33", rank: 5, total: 16 },
    },
  },
];

export const goalPatternInsights: GoalPatternInsight[] = [
  {
    id: "scored-location",
    title: "Var görs målen?",
    question: "Plats för gjorda mål",
    takeaway:
      "Nej, inte som huvudförklaring. 2024 hade 19% mål utanför boxen, men 2025 var högre med 22%. 2026 ligger nära samma profil men med ännu större boxandel.",
    values: {
      "2026": {
        primary: "19/24 i box (79%)",
        secondary: "4 utanför box (17%)",
      },
      "2025": {
        primary: "44/60 i box (73%)",
        secondary: "13 utanför box (22%)",
      },
      "2024": {
        primary: "37/48 i box (77%)",
        secondary: "9 utanför box (19%)",
      },
    },
  },
  {
    id: "set-pieces-for",
    title: "Hur görs målen?",
    question: "Måltyper framåt",
    takeaway:
      "2026 har fått mycket från hörnor tidigt, men nästan inget från nickmål eller frisparkar jämfört med 2024/2025.",
    values: {
      "2026": {
        primary: "4 hörnmål · 0 frisparksmål",
        secondary: "1 nickmål · 1 straffmål",
      },
      "2025": {
        primary: "6 hörnmål · 4 frisparksmål",
        secondary: "7 nickmål · 3 straffmål",
      },
      "2024": {
        primary: "3 hörnmål · 3 frisparksmål",
        secondary: "8 nickmål · 2 straffmål",
      },
    },
  },
  {
    id: "scored-timing",
    title: "När görs målen?",
    question: "Timing för gjorda mål",
    takeaway:
      "Alla tre säsonger gör Hammarby fler mål efter paus. 2026 är mer jämn hittills, medan 2025 hade tydligast tryck i andra halvlek.",
    values: {
      "2026": {
        primary: "1H 11 · 2H 13",
        secondary: "Bäst fönster: 31-45+ och 61-75",
      },
      "2025": {
        primary: "1H 24 · 2H 36",
        secondary: "Bäst fönster: 46-60",
      },
      "2024": {
        primary: "1H 21 · 2H 27",
        secondary: "Bäst fönster: 16-30 och 61-75",
      },
    },
  },
  {
    id: "conceded-location",
    title: "Var släpps målen in?",
    question: "Plats för insläppta mål",
    takeaway:
      "Nej. 2026 liknar 2024: nästan alla insläppta kommer i boxen. Det matchar Twelve-bilden att motståndarnas chanser är för högkvalitativa.",
    values: {
      "2026": {
        primary: "11/13 i box (85%)",
        secondary: "1 utanför box (8%)",
      },
      "2025": {
        primary: "20/29 i box (69%)",
        secondary: "7 utanför box (24%)",
      },
      "2024": {
        primary: "22/25 i box (88%)",
        secondary: "3 utanför box (12%)",
      },
    },
  },
  {
    id: "set-pieces-against",
    title: "Hur släpps målen in?",
    question: "Måltyper bakåt",
    takeaway:
      "2026 har inte samma fasta-situation-volym bakåt som 2025. Den större signalen är att öppna spel-lägen i boxen blir för farliga.",
    values: {
      "2026": {
        primary: "1 hörnmål · 1 frisparksmål",
        secondary: "1 nickmål · 1 straffmål emot",
      },
      "2025": {
        primary: "6 hörnmål · 2 frisparksmål",
        secondary: "2 nickmål · 2 straffmål emot",
      },
      "2024": {
        primary: "4 hörnmål · 1 frisparksmål",
        secondary: "4 nickmål · 0 straffmål emot",
      },
    },
  },
  {
    id: "conceded-timing",
    title: "När släpps målen in?",
    question: "Timing för insläppta mål",
    takeaway:
      "Starterna sticker ut: 2026 har redan släppt 3 mål första 15 minuterna på 11 matcher. 2024 släppte bara 1 där på hela säsongen.",
    values: {
      "2026": {
        primary: "0-15: 3 insläppta",
        secondary: "1H 6 · 2H 7",
      },
      "2025": {
        primary: "0-15: 6 insläppta",
        secondary: "1H 14 · 2H 15",
      },
      "2024": {
        primary: "0-15: 1 insläppt",
        secondary: "1H 9 · 2H 16",
      },
    },
  },
];

export const sourceNotes = [
  "Twelve Earpiece shared season reports: Hammarby Swedish Allsvenskan 2026, 2025 och 2024.",
  "Twelve chart API: ranking-bar visualiseringar för respektive säsongsrapport.",
  "Bolldata lagdata, målrelaterade tabeller och team-advanced API: säsong 2026 hittills samt helsäsong 2025 och 2024.",
];
