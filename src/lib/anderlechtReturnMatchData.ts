/**
 * Anderlecht 3–1 Hammarby FF
 * UEFA Europa League Qualification 2026 – Omgång 2 (Retur)
 * 30 juli 2026, Lotto Park, Anderlecht
 * Källa: earpiece.twelve.football/shared-reports/65e75344-255e-4133-b43f-cb19713c4464
 *
 * Statistik: OFStats, Soccerhub, DailyGoal + Twelve Football (shared report ovan)
 * Aggregat: 4–2 till Anderlecht (avancerar). Hammarby vidare till UEFA Conference League-kval mot Rakow (Polen).
 */

export const matchInfo = {
  homeTeam: "Anderlecht",
  awayTeam: "Hammarby",
  homeScore: 3,
  awayScore: 1,
  date: "30 juli 2026",
  competition: "UEFA Europa League – Kval 2026, Retur",
  venue: "Lotto Park, Anderlecht",
  aggregate: "4–2 (Anderlecht vidare)",
  firstLegResult: "1–1 (Tele2 Arena, 23 juli)",
  sourceUrl: "https://earpiece.twelve.football/shared-reports/65e75344-255e-4133-b43f-cb19713c4464",
} as const;

// ─── Laguppställningar ─────────────────────────────────────────────────────────

export interface MatchPlayer {
  number: number;
  name: string;
  goalkeeper?: boolean;
  goal?: number;
  yellowCard?: boolean;
  redCard?: boolean;
  subOff?: number;
  subOn?: number;
  assist?: number;
}

export const anderlechtLineup: MatchPlayer[] = [
  { number: 26, name: "C. Coosemans",    goalkeeper: true },
  { number: 4,  name: "G. Biancone" },
  { number: 79, name: "A. Maamar",       assist: 48 },
  { number: 27, name: "L. Pétrot" },
  { number: 6,  name: "L. Augustinsson", yellowCard: true, subOff: 46 },
  { number: 49, name: "J. Onia-Seke",    subOff: 68 },
  { number: 55, name: "M. Kana" },
  { number: 24, name: "E. Llansana",     yellowCard: true },
  { number: 61, name: "J. Bethume",      subOff: 46 },
  { number: 14, name: "D. Sikan",        goal: 48, subOff: 84 },
  { number: 18, name: "L. Ambros",       subOff: 92 },
];

export const anderlechtBench: MatchPlayer[] = [
  { number: 5,  name: "M. Ndiaye",       subOn: 46 },
  { number: 9,  name: "M. Cvetković",    subOn: 46, goal: 81 },
  { number: 91, name: "A. Bertaccini",   subOn: 68 },
  { number: 83, name: "T. Degreef",      subOn: 84, goal: 89 },
  { number: 2,  name: "Z. Keita",        subOn: 92 },
];

export const hammarbyLineup: MatchPlayer[] = [
  { number: 1,  name: "W. Hahn",         goalkeeper: true },
  { number: 2,  name: "H. Skoglund" },
  { number: 3,  name: "F. Winther" },
  { number: 4,  name: "V. Eriksson",     yellowCard: true, subOff: 87 },
  { number: 16, name: "N. Persson" },
  { number: 5,  name: "T. Tekie" },
  { number: 8,  name: "M. Karlsson",     yellowCard: true },
  { number: 11, name: "O. Johansson",    subOff: 76 },
  { number: 26, name: "Montader Madjed", subOff: 66 },
  { number: 9,  name: "V. Lind",         subOff: 76 },
  { number: 7,  name: "P. Abraham",      goal: 2, subOff: 65 },
];

export const hammarbyBench: MatchPlayer[] = [
  { number: 17, name: "A. Boudri",       subOn: 65 },
  { number: 20, name: "N. Besara",       subOn: 66 },
  { number: 29, name: "M. Kaboré",       subOn: 76 },
  { number: 6,  name: "I. Breze Fofana", subOn: 76 },
  { number: 28, name: "F. Junior Adjei", subOn: 87 },
];

// ─── Matchstatistik ────────────────────────────────────────────────────────────

export interface MatchStat {
  label: string;
  home: number | string;
  away: number | string;
  unit?: string;
  direction?: "higher" | "lower" | "neutral";
}

export const matchStats: MatchStat[] = [
  { label: "xG",                   home: 1.21,  away: 1.61,  direction: "higher" },
  { label: "Bollinnehav",          home: 85,    away: 15,    unit: "%", direction: "higher" },
  { label: "Avslut",               home: 21,    away: 6,     direction: "higher" },
  { label: "Avslut på mål",        home: 6,     away: 3,     direction: "higher" },
  { label: "Field tilt",           home: 78,    away: 22,    unit: "%", direction: "higher" },
  { label: "Hörnor",               home: 10,    away: 0,     direction: "higher" },
  { label: "Gula kort",            home: 2,     away: 3,     direction: "lower" },
  { label: "Offsides",             home: 2,     away: 0,     direction: "lower" },
  { label: "Frisparkar",           home: 12,    away: 10,    direction: "lower" },
  { label: "Räddningar (GK)",      home: 2,     away: 3,     direction: "neutral" },
  { label: "Farliga angrepp",      home: 78,    away: 28,    direction: "higher" },
  { label: "Totala angrepp",       home: 103,   away: 63,    direction: "higher" },
];

// ─── Halvtidsstatistik ────────────────────────────────────────────────────────

export const halftimeInfo = {
  homeScore: 0,
  awayScore: 1,
  homeXg: 0.35,
  awayXg: 1.15,
  homePossession: 78,
  awayPossession: 22,
  homeShots: 12,
  awayShots: 3,
  homeCorners: 4,
  awayCorners: 0,
};

// ─── Nyckelinsikter ─────────────────────────────────────────────────────────────

export const keyInsights = [
  {
    icon: "⚡",
    title: "Abraham satte 0–1 redan i minut 2",
    body: "Victor Lind sköt mot stolpen, Paulos Abraham var snabbast på returen och nickade in från nära håll. Hammarby chockade hemmapubliken på Lotto Park redan i matchens andra minut.",
    tone: "positive" as const,
  },
  {
    icon: "🔄",
    title: "Halvtidsbyten vände loppet",
    body: "Anderlecht bytte dubbelt i paus: Ndiaye in för Augustinsson, Cvetković in för Bethume. Redan i 48' kvitterade Sikan via Maammars djupa inlägg – och Cvetković avgorde sedan matchen i 81'.",
    tone: "warning" as const,
  },
  {
    icon: "📊",
    title: "85% bollinnehav – noll hörnor",
    body: "Anderlecht dominerade med 85% bollinnehav och 10–0 i hörnor, men skapade bara 1,21 xG från 21 avslut (0,058 xG/avslut). Hammarby skapade faktiskt mer xG per avslut: 1,61 från 6 försök.",
    tone: "neutral" as const,
  },
  {
    icon: "🥅",
    title: "Hahns misstag avgjorde",
    body: "3–1-målet kom direkt ur en passningsblunder från Warner Hahn i byggnadsspelet. Degreef pressade Ibrahima Fofana hårt, snappade åt sig bollen i straffområdet och fullbordade Anderlecht seger i 89'.",
    tone: "warning" as const,
  },
  {
    icon: "📉",
    title: "Hammarby överperformade xG – ändå exit",
    body: "HIF skapade 1,61 xG (mer än Anderlechts 1,21) men förlorade 1–3. Anderlecht överkastade sitt eget xG med 1,79 mål. Utfallet förklaras mer av individuella misstag och rebound-mål än av offensiv dominans.",
    tone: "neutral" as const,
  },
  {
    icon: "🇪🇺",
    title: "HIF vidare till Conference League-kval",
    body: "Eliminerade ur Europa League. Hammarby återfår europeisk fotboll via Conference League-kvalet mot Rakow (Polen). Anderlecht möter PAOK i nästa EL-kvalsomgång.",
    tone: "neutral" as const,
  },
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
    subTitle: "Anderlecht drog ifrån med uthållighet – inte kvalité",
    verdict: "neutral",
    summary:
      "Hammarby tog en tidig chockledning via Abraham (2') men lyckades inte hålla ställningen in i halvtid. Anderlecht bytade dubbelt i paus och Sikan kvitterade i 48'. Från och med den stunden kontrollerade Anderlecht med 85% bollinnehav och 10 hörnor, medan Hammarby föll tillbaka allt djupare. Tre mål kom i andra halvlek – men bara ett kom från ett öppet spelmönster (Sikan). De två sista målen (Cvetković 81', Degreef 89') var direkt kopplade till Hammarby-misstag: en retur efter Hahns räddning och en passningsblunder i byggnadsspelet.",
    metrics: [
      { label: "Slutresultat", value: "3–1" },
      { label: "HT-ställning", value: "0–1" },
      { label: "Aggregat", value: "4–2", note: "Anderlecht vidare" },
      { label: "xG AND", value: 1.21 },
      { label: "xG HIF", value: 1.61, note: "Mer xG men förlorade" },
      { label: "Mål vs xG AND", value: "+1,79", note: "Kraftigt överkast" },
    ],
  },
  {
    id: "second-half-explanation",
    icon: "🔍",
    title: "Varför tog Anderlecht över i andra halvlek?",
    subTitle: "Fem faktorer som förklarar andra halvlekens dramaturgi",
    verdict: "warning",
    summary:
      "Anderlecht dominerade inte taktiskt överlägset i andra halvlek – de dominerade VOLYMMÄSSIGT. Snikans omedelbart kvittering 48' förändrade aggregatsituationen (nu 1–1 totalt) och tvingade Hammarby att välja mellan att anfalla eller försvara. De valde att sitta lågt, vilket gav Anderlecht fritt spelrum att bygga upp och pressa. Utmattning, halvtidsbyten och slutligen individuella fel från Hahn avgjorde.",
    metrics: [
      { label: "Bollinnehav 2:a HT", value: "~88%", unit: "", note: "Anderlecht" },
      { label: "Hörnor totalt (AND)", value: 10, note: "HIF: 0 hörnor" },
      { label: "AND-avslut 2:a HT", value: "~14", note: "av totalt 21" },
      { label: "Halvtidsbyten AND", value: 2, note: "Cvetković + Ndiaye in" },
      { label: "Minuter Cvetković", value: "45+", note: "Avgörande sub – scorade 2–1" },
      { label: "HIF-byten under 66'–87'", value: 5, note: "Desperation eller fräschhet?" },
    ],
  },
  {
    id: "halftime-shift",
    icon: "🔀",
    title: "Halvtidsbyten som vände loppet",
    subTitle: "Ndiaye + Cvetković – direkt avgörande",
    verdict: "warning",
    summary:
      "Anderlecht hade stora problem med att bryta ner Hammarby i första halvlek (0,35 xG från 12 avslut). I paus bytte tränaren Vitor Bruno dubbelt: Moussa Ndiaye in för Ludwig Augustinsson på vänsterback och Mihajlo Cvetković in för Joshua Bethume på mittfältet. Effekten var omedelbar: Sikan nickade in 1–1 i 48'. Cvetković spelade hela andra halvlek och scorade avgörande 2–1 i 81' (returen efter Hahns räddning på Ambros avslut). Bytet på LB-positionen gav dessutom Anderlecht mer offensivt stöd på sidan.",
    metrics: [
      { label: "HT: AND xG 1:a HT", value: 0.35, note: "Låg effektivitet" },
      { label: "HT: HIF xG 1:a HT", value: 1.15, note: "HIF chansen att avgöra" },
      { label: "48': Sikan 1–1", value: "48'", note: "Header på Maammars djupinlägg" },
      { label: "Cvetković mål", value: "81'", note: "Returen – 2–1" },
      { label: "Ndiaye: LB täckt", value: "46'→90+'", note: "Offensivare LB" },
    ],
  },
  {
    id: "possession-dominance",
    icon: "⚽",
    title: "Bollinnehavs­dominansen låste Hammarby",
    subTitle: "15% bollinnehav – 0 hörnor",
    verdict: "warning",
    summary:
      "Med 15% bollinnehav var Hammarby i praktiken låsta in i sin egen straffområdesregion hela andra halvlek. 0 hörnor för Hammarby mot Anderlechts 10 visar hur ensidigt matchen spelades geografiskt. Anderlecht cirklade in med 103 totala angrepp och 78 farliga angrepp. Trots detta skapades bara 1,21 xG – Anderlecht kom fram men inte till de riktigt stora chanserna. Det var volymen och det konstanta trycket snarare än enskild brilljans som till slut bröt ned Hammarbys försvar.",
    metrics: [
      { label: "Bollinnehav AND", value: "85%", unit: "" },
      { label: "Bollinnehav HIF", value: "15%", unit: "" },
      { label: "Hörnor AND / HIF", value: "10 / 0" },
      { label: "Farliga angrepp AND", value: 78 },
      { label: "AND xG/avslut", value: 0.058, note: "Låg snittchans per avslut" },
      { label: "HIF xG/avslut", value: 0.268, note: "Bättre chans­kvalité per avslut" },
    ],
  },
  {
    id: "goalkeeper-error",
    icon: "🧤",
    title: "Hahns misstag – en kostbar blunder",
    subTitle: "3–1-målet kom ur ett byggspelafel",
    verdict: "warning",
    summary:
      "Det tredje och avgörande målet (3–1, Degreef 89') kom inte från Anderlechts anfallsspel utan från ett Hammarby-misstag. Warner Hahn försökte passa ut från målvaktspositionen, men passet var dåligt och satte Ibrahima Breze Fofana under omedelbart press. Tristan Degreef (nyss inbytt i 84') snappade åt sig bollen i straffområdet och satte dit den kallt. Det liknar det andra målet (81') då Hahn räddade Ambros skott men gav returläget till Cvetković. I en match där Hammarby stod för ett osannolikt bra lågt block under 70+ minuter var det individuella misstagen – inte taktiska brister – som slutligen knäckte dem.",
    metrics: [
      { label: "81' AND: Cvetković", value: "2–1", note: "Retur efter Hahns räddning" },
      { label: "89' AND: Degreef", value: "3–1", note: "Passningsblunder av Hahn" },
      { label: "Hahns räddningar", value: 3, note: "Varav 2 gav returläge" },
      { label: "HIF xG efter 80'", value: "~0.05", note: "Ingenting att anfalla med" },
    ],
  },
  {
    id: "first-half",
    icon: "🛡️",
    title: "Första halvlek: Hammarby nära att hålla",
    subTitle: "0–1 till paus – men varken aggregat eller ögla var trygga",
    verdict: "neutral",
    summary:
      "Hammarby skapade 1,15 xG i första halvlek mot Anderlechts 0,35 – vilket tyder på att de hade chansen att ta en mer bekväm ledning in i andra halvlek. Victor Lind träffade stolpen tidigt och tvingade Coosemans till tre räddningar. Men Anderlecht behöll lugnet och Sikan kvitterade i 48' – det räckte för att helt förändra matchens psykologi.",
    metrics: [
      { label: "HT xG HIF", value: 1.15, note: "Klart bättre 1:a HT" },
      { label: "HT xG AND", value: 0.35 },
      { label: "Lind: stolpen", value: "3'", note: "Tidigt närmaste" },
      { label: "Abraham mål", value: "2'", note: "Chockstart" },
      { label: "Coosemans räddningar 1:a HT", value: 3 },
      { label: "HT-ställning", value: "0–1", note: "Hammarby ledde" },
    ],
  },
  {
    id: "aggregate",
    icon: "📅",
    title: "Aggregat och konsekvenser",
    subTitle: "Anderlecht vidare 4–2 – HIF till Conference League",
    verdict: "neutral",
    summary:
      "Med sammanlagda 4–2 avancerar Anderlecht till tredje kvalsomgången i UEFA Europa League där PAOK väntar. Hammarby faller ned till Conference League-kvalet och möter polska Rakow. Trots eliminationen var Hammarbys dubbla möte med Anderlecht en stark prestation: 1–1 hemma i den europeiska öppningen och 1,61 xG i returen. Det var i slutändan individuella misstag och Anderlechts enorma volymspel som avgjorde – inte ett taktiskt underläge.",
    metrics: [
      { label: "Aggregat", value: "4–2", note: "Anderlecht vinner" },
      { label: "Leg 1: Tele2 Arena", value: "1–1" },
      { label: "Leg 2: Lotto Park", value: "3–1" },
      { label: "Anderlecht möter", value: "PAOK (UEL Q3)" },
      { label: "Hammarby möter", value: "Rakow (UECL)" },
    ],
  },
];

// ─── Ordlista ───────────────────────────────────────────────────────────────────

export const glossary = [
  { term: "xG", explanation: "Expected Goals – sannolikheten för att ett avslut leder till mål baserat på historiska data." },
  { term: "Field tilt", explanation: "Andel avslut som ett lag stod för av totala avslut. 78% = Anderlecht tog nästan alla avslut." },
  { term: "xG/avslut", explanation: "xG dividerat med antal avslut – mäter genomsnittlig chankvalité per avslut." },
  { term: "PPDA", explanation: "Passes Per Defensive Action – lägre = hårdare press på motståndaren." },
  { term: "Farliga angrepp", explanation: "Angrepp som tar sig in i eller hotar straffområdesregionen." },
  { term: "xG-överkast", explanation: "Skillnaden mellan faktiska mål och xG. Positivt överkast = mer lyckliga/skickliga avslutningar än förväntat." },
];
