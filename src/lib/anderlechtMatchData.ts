/**
 * Hammarby 1–1 Anderlecht
 * UEFA Europa League Qualification 2026 – Omgång 1
 * 23 juli 2026
 * Källa: earpiece.twelve.football/shared-reports/d51465ed-e48b-4567-8e65-7f6167e49e9d
 */

export const matchInfo = {
  homeTeam: "Hammarby",
  awayTeam: "Anderlecht",
  homeScore: 1,
  awayScore: 1,
  date: "23 juli 2026",
  competition: "UEFA Europa League – Kval 2026",
  venue: "Tele2 Arena, Stockholm",
  sourceUrl: "https://earpiece.twelve.football/shared-reports/d51465ed-e48b-4567-8e65-7f6167e49e9d",
} as const;

// ─── Laguppställningar ─────────────────────────────────────────────────────────

export interface MatchPlayer {
  number: number;
  name: string;
  goalkeeper?: boolean;
  goal?: number;            // minut
  yellowCard?: boolean;
  redCard?: boolean;
  subOff?: number;          // minut
  subOn?: number;           // minut
}

export const hammarbyLineup: MatchPlayer[] = [
  { number: 1,  name: "W. Hahn",           goalkeeper: true },
  { number: 2,  name: "H. Skoglund" },
  { number: 3,  name: "F. Winther",         yellowCard: true },
  { number: 4,  name: "V. Eriksson",        yellowCard: true },
  { number: 5,  name: "T. Tekie" },
  { number: 7,  name: "P. Abraham" },
  { number: 8,  name: "M. Karlsson" },
  { number: 9,  name: "V. Lind",            subOff: 86 },
  { number: 16, name: "N. Persson" },
  { number: 20, name: "N. Besara",          subOff: 75 },
  { number: 26, name: "Montader Madjed" },
];

export const hammarbyBench: MatchPlayer[] = [
  { number: 11, name: "O. Johansson",       subOn: 75 },
  { number: 28, name: "F. Adjei",           subOn: 86, goal: 86 },
];

export const anderlechtLineup: MatchPlayer[] = [
  { number: 26, name: "C. Coosemans",       goalkeeper: true },
  { number: 4,  name: "G. Biancone" },
  { number: 6,  name: "L. Augustinsson",    yellowCard: true, subOff: 55 },
  { number: 13, name: "N. Saliba",          yellowCard: true, redCard: true },
  { number: 27, name: "L. Pétrot" },
  { number: 24, name: "E. Llansana" },
  { number: 49, name: "J. Onia",            subOff: 82 },
  { number: 55, name: "M. Kana",            subOff: 64 },
  { number: 61, name: "J. Bethume",         subOff: 64 },
  { number: 79, name: "A. Maamar" },
  { number: 14, name: "D. Sikan",           goal: 55, subOff: 82 },
];

export const anderlechtBench: MatchPlayer[] = [
  { number: 5,  name: "M. N'Diaye",         subOn: 55 },
  { number: 9,  name: "M. Cvetković",       subOn: 64 },
  { number: 18, name: "L. Ambros",          subOn: 64 },
  { number: 2,  name: "Z. Keita",           subOn: 82 },
  { number: 68, name: "N. Kalonji",         subOn: 82 },
];

// ─── Matchstatistik ────────────────────────────────────────────────────────────

export interface MatchStat {
  label: string;
  home: number | string;
  away: number | string;
  unit?: string;
  /** higher = home advantage is good */
  direction?: "higher" | "lower" | "neutral";
}

export const matchStats: MatchStat[] = [
  { label: "xG",                     home: 1.75,  away: 0.48,  direction: "higher" },
  { label: "Bollinnehav",            home: 58,    away: 42,    unit: "%", direction: "higher" },
  { label: "Avslut",                 home: 13,    away: 9,     direction: "higher" },
  { label: "Avslut på mål",          home: 6,     away: 5,     direction: "higher" },
  { label: "Höga chanser",           home: 4,     away: 0,     direction: "higher" },
  { label: "Boxberöringar",          home: 18,    away: 10,    direction: "higher" },
  { label: "Field tilt",             home: 63,    away: 37,    unit: "%", direction: "higher" },
  { label: "Hörnor",                 home: 5,     away: 2,     direction: "higher" },
  { label: "Frisparkar begångna",    home: 13,    away: 14,    direction: "lower" },
  { label: "Gula kort",              home: 2,     away: 2,     direction: "lower" },
  { label: "Röda kort",              home: 0,     away: 1,     direction: "lower" },
  { label: "Offsides",               home: 2,     away: 4,     direction: "lower" },
  { label: "xPoäng",                 home: 2.36,  away: "-",   direction: "neutral" },
  { label: "Vinstprob.",             home: "72%", away: "8%",  direction: "neutral" },
];

// ─── Analyskategorier ──────────────────────────────────────────────────────────

export interface AnalysisMetric {
  label: string;
  value: number | string;
  unit?: string;
  note?: string;
}

export interface AnalysisSection {
  id: string;
  icon: string;
  title: string;
  subTitle: string;
  verdict: "positive" | "neutral" | "warning";
  summary: string;
  metrics: AnalysisMetric[];
}

export const analysisSections: AnalysisSection[] = [
  {
    id: "summary",
    icon: "📋",
    title: "Sammanfattning",
    subTitle: "Dominant display in possession but lacked the finishing touch",
    verdict: "neutral",
    summary:
      "Hammarby visade en stark prestation i bollinnehav och överträffade sina vanliga mätvärden, speciellt i anfallsövergångar och i att nå den sista tredjedelen. Utanför bollen matchades ligastandarden med bra försvarsspel efter röda kortet. 1-1 speglar Hammarbys dominans under många spelmoment – en solid start i UEFA Europa League-kvalet trots tidig bakåtlutning.",
    metrics: [
      { label: "xG (HIF)", value: 1.75, note: "Klart mer xG än motståndaren" },
      { label: "xG (AND)", value: 0.48 },
      { label: "xPoäng", value: 2.36, note: "Väntades vinna med stor sannolikhet" },
      { label: "Vinstprobabilitet", value: "72%", note: "Baserat på matchstatus" },
      { label: "Ball-in-play minuter", value: 52.67 },
    ],
  },
  {
    id: "defence",
    icon: "🛡️",
    title: "Försvar",
    subTitle: "Återhämtade sig snabbt efter tidig bakåtlutning",
    verdict: "positive",
    summary:
      "Hammarbys försvar var typiskt solitt och presterade på exceptionellt hög nivå jämfört med ligegenomsnitt trots tidigt insläppt mål. Defensiva aktioner högt upp på planen visade både intensitet och effektivitet i duellvinnande, vilket begränsade Anderlecht kraftigt.",
    metrics: [
      { label: "PPDA (press)", value: 5.68, note: "Lägre = hårdare press" },
      { label: "Defensiv intensitet", value: 5.46 },
      { label: "Defensiva duellvinster", value: "69%", unit: "%" },
      { label: "Defensiv aktionshöjd", value: "47,45 m", note: "Högt pressande" },
      { label: "Motståndarens passtempo", value: 19.68, note: "Kontrollerat" },
      { label: "Motst. inneh. till sista tredj.", value: "34%", unit: "%" },
      { label: "Motst. sista tredj. till box", value: "18%", unit: "%" },
      { label: "Motst. xT", value: 0.67, note: "Lågt hot skapades" },
    ],
  },
  {
    id: "def-transition",
    icon: "⚡",
    title: "Defensiv övergång",
    subTitle: "Starka defensiva övergångar minimerade Anderlecht efter tidig mål",
    verdict: "positive",
    summary:
      "Hammarby visade starka defensiva övergångar och begränsade effektivt motståndarens hot efter bollförluster. De höll hög andel återerövring inom 5 sekunder och begränsade Anderlecht till noll xG inom 10 sekunder efter återerövring.",
    metrics: [
      { label: "Bollförluster", value: 31 },
      { label: "Bollförluster – höjd", value: "66,77 m", note: "Högt på planen" },
      { label: "Återerövring inom 5s", value: "12%", unit: "%" },
      { label: "Tid till def. aktion (s)", value: 10.81 },
      { label: "Tid till återerövring (s)", value: 9.02 },
      { label: "Motst. inneh. till sista tredj. inom 10s", value: 8 },
      { label: "Motst. inneh. till box inom 10s", value: 1 },
      { label: "Motst. xT inom 10s", value: 0.54 },
      { label: "Motst. xG inom 10s", value: 0.00, note: "Noll xG efter snabb övergång" },
    ],
  },
  {
    id: "opp-chance",
    icon: "🔒",
    title: "Motståndarens chanskapande",
    subTitle: "Disciplin och kontroll – ett insläppt mål trots röda kortet",
    verdict: "positive",
    summary:
      "Hammarby uppvisade ett starkt defensivt spel och begränsade Anderlecht trots tidigt insläppt. Motståndaren fick litet antal boxberöringar och inga höga chanser. Anderlecht tvingades ta 83% av sina boxberöringar till avslut utan att skapa kvalitét.",
    metrics: [
      { label: "Motst. boxberöringar", value: 10 },
      { label: "Motst. box-till-avslut", value: "83%", unit: "%" },
      { label: "Motst. np avslut", value: 9 },
      { label: "Motst. höga chanser", value: 0, note: "Noll höga chanser tillåtna" },
      { label: "Motst. np xG", value: 0.48 },
      { label: "Motst. np mål", value: 1 },
      { label: "Motst. np xG/avslut", value: 0.05, note: "Låg snittchans per avslut" },
    ],
  },
  {
    id: "att-transition",
    icon: "🚀",
    title: "Anfallsövergång",
    subTitle: "Utmärkte sig i övergångsmöjligheter – skapade xG efter återerövring",
    verdict: "positive",
    summary:
      "Hammarbys anfallsövergångsprestanda var en blandning av typisk och något sämre exekvering totalt, men stack ut positivt mot ligagenomsnitt. De återerövrade bollen oftare och högre upp, vilket ledde till 0,41 xG inom 10 sekunder efter återerövring.",
    metrics: [
      { label: "Återerövrat", value: 36 },
      { label: "Återerövring – höjd", value: "44,80 m" },
      { label: "Inneh. behållna efter 5s", value: 26 },
      { label: "Inneh. behållna efter 5s", value: "72%", unit: "%" },
      { label: "Inneh. till sista tredj. inom 10s", value: 8 },
      { label: "Inneh. till box inom 10s", value: 3 },
      { label: "xT inom 10s efter återerövring", value: 1.06 },
      { label: "xG inom 10s efter återerövring", value: 0.41, note: "Produktiva snabba angrepp" },
    ],
  },
  {
    id: "attack",
    icon: "⚽",
    title: "Anfall",
    subTitle: "Balanserat anfall – boxeffektiviteten begränsade resultatet",
    verdict: "neutral",
    summary:
      "Hammarby presterade typiskt för dem men stack ut positivt mot tävlingsgenomsnitt. Hög bollinnehavsprocent och fler beröringar i sista tredjedelen med mer hot, men boxinträdeseffektiviteten och passtempoet hamnade under ligasnitt.",
    metrics: [
      { label: "Bollinnehav", value: "58%", unit: "%" },
      { label: "Field tilt", value: "63%", unit: "%" },
      { label: "Lång boll", value: "12%", unit: "%" },
      { label: "Passtempo", value: 18.53, note: "Något under liganorm" },
      { label: "Inneh. till sista tredj.", value: "38%", unit: "%" },
      { label: "Sista tredj. till box", value: "13%", unit: "%" },
      { label: "xT (anfall)", value: 1.96 },
    ],
  },
  {
    id: "chance-creation",
    icon: "🎯",
    title: "Chanskapande",
    subTitle: "Missade nyckelchanser trots dominant boxnärvaro",
    verdict: "warning",
    summary:
      "Hammarbys chanskapande var klart bättre än tävlingsgenomsnitt. De konverterade en hög andel innehavstillfällen till avslut med ökade boxberöringar och 4 höga chanser. Slutresultatet speglar dock att fler av dessa möjligheter borde ha konverterats.",
    metrics: [
      { label: "Boxberöringar", value: 18 },
      { label: "Box-till-avslut", value: "90%", unit: "%" },
      { label: "np Avslut", value: 13 },
      { label: "Höga chanser", value: 4, note: "Borde räckt till fler mål" },
      { label: "np xG", value: 1.75 },
      { label: "np Mål", value: 1 },
      { label: "np xG/avslut", value: 0.13, note: "Bra snittkvalité per avslut" },
    ],
  },
  {
    id: "outcome",
    icon: "📊",
    title: "Utfall",
    subTitle: "En bestämd comeback ger en poäng trots tidig kamp",
    verdict: "neutral",
    summary:
      "Ett rättvist utfall för Hammarby som lyckades hålla 1-1 mot Anderlecht. De startade dåligt med tidigt insläppt men visade motståndskraft och kvitterade sent. Anderlecht fick ett röda kort. Trots reducerat antal spelare utnyttjades inte övertaget fullt ut – indikerar förbättringsutrymme inför retur.",
    metrics: [
      { label: "Slutresultat", value: "1–1" },
      { label: "xPoäng", value: 2.36, note: "Väntades ta fler poäng" },
      { label: "Vinstprobabilitet", value: "72%", note: "Beräknat under match" },
      { label: "xG HIF", value: 1.75 },
      { label: "xG AND", value: 0.48 },
      { label: "Field tilt HIF", value: "63%", unit: "%" },
      { label: "Ball-in-play", value: "52,67 min" },
    ],
  },
];

// ─── Nyckelinsikter ─────────────────────────────────────────────────────────────

export const keyInsights = [
  {
    icon: "⚡",
    title: "xG-dominans",
    body: "Hammarby skapade 1,75 xG mot Anderlecht 0,48 – drygt 3,5 gånger mer förväntade mål. Med 2,36 xPoäng borde resultatet ha blivit bättre.",
    tone: "positive" as const,
  },
  {
    icon: "🟨",
    title: "Röda kortet",
    body: "N. Saliba (Anderlecht, #13) fick direkt rött efter gult, vilket gav HIF numerärt övertag. Övertaget utnyttjades inte fullt ut.",
    tone: "neutral" as const,
  },
  {
    icon: "🎯",
    title: "Höga chanser",
    body: "4 höga chanser för Hammarby mot 0 för Anderlecht. Trots detta bara ett mål – ett tecken på att avsluten inte satt.",
    tone: "warning" as const,
  },
  {
    icon: "🏃",
    title: "Övergångsspel",
    body: "Starka anfallsövergångar: 0,41 xG inom 10 sekunder efter återerövring. Noll xG tillåtet till Anderlecht i defensiva övergångar.",
    tone: "positive" as const,
  },
  {
    icon: "🛡️",
    title: "Presshöjd",
    body: "PPDA 5,68 visar högt presstryck – defensiva aktioner skedde på 47,45m (högt). Anderlecht fick begränsat utrymme att bygga upp.",
    tone: "positive" as const,
  },
  {
    icon: "📅",
    title: "Returmatch",
    body: "Bortamålet 1–1 innebär att Hammarby behöver vinna alternativt 0–0 i returen för vidare avancemang. Allt att spela för.",
    tone: "neutral" as const,
  },
];

// ─── Ordlista ───────────────────────────────────────────────────────────────────

export const glossary = [
  { term: "xG", explanation: "Expected Goals – sannolikheten för att en chans leder till mål baserat på historiska data." },
  { term: "xPoäng", explanation: "Expected Points – förväntade ligapoäng baserat på xG under matchen." },
  { term: "PPDA", explanation: "Passes Per Defensive Action – lägre = hårdare press. Antalet passningar motståndaren tillåts göra per defensiv aktion." },
  { term: "Field tilt", explanation: "Andel avslut som Hammarby stod för av totalt avslut i matchen. 63% = stor dominans." },
  { term: "xT", explanation: "Expected Threat – mäter hur mycket en bollrörelse ökar sannolikheten att ett mål scored." },
  { term: "Höga chanser", explanation: "Avslut med >25% sannolikhet att bli mål enligt xG-modellen." },
];
