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
  { label: "xG",                   home: 4.55,  away: 1.47,  direction: "higher" },
  { label: "Bollinnehav",          home: 56,    away: 44,    unit: "%", direction: "higher" },
  { label: "Avslut",               home: 21,    away: 10,    direction: "higher" },
  { label: "Avslut på mål",        home: 7,     away: 4,     direction: "higher" },
  { label: "Field tilt",           home: 68,    away: 32,    unit: "%", direction: "higher" },
  { label: "Hörnor",               home: 10,    away: 0,     direction: "higher" },
  { label: "Gula kort",            home: 2,     away: 3,     direction: "lower" },
  { label: "Offsides",             home: 1,     away: 0,     direction: "lower" },
  { label: "Frisparkar begångna",  home: 13,    away: 11,    direction: "lower" },
  { label: "Räddningar (GK)",      home: 3,     away: 4,     direction: "neutral" },
];

// ─── Halvtidsstatistik ────────────────────────────────────────────────────────

export const halftimeInfo = {
  homeScore: 0,
  awayScore: 1,
  homeXg: 1.80,
  awayXg: 1.15,
  homePossession: 55,
  awayPossession: 45,
  homeShots: 12,
  awayShots: 6,
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
    title: "xG 4,55–1,47 – Anderlecht dominerade",
    body: "Anderlecht skapade 4,55 xG mot HIF:s 1,47 – tre gånger mer förväntade mål. Med 21 avslut mot HIF:s 10 och sju på mål mot fyra var dominansen verklig, inte bara volymmässig.",
    tone: "warning" as const,
  },
  {
    icon: "⚽",
    title: "Bollinnehav 56–44 – jämnare än det kändes",
    body: "Trots det extrema trycket var bollinnehavet relativt jämnt (56–44%). Anderlecht var inte mer dominanta med bollen utan mer effektiva: 4,55 xG på 21 avslut = 0,22 xG per avslut.",
    tone: "neutral" as const,
  },
  {
    icon: "🥅",
    title: "Hahns misstag avgjorde",
    body: "3–1-målet kom direkt ur en passningsblunder från Warner Hahn. Degreef pressade Ibrahima Fofana hårt, snappade åt sig bollen i straffområdet och fullbordade Anderlecht seger i 89'.",
    tone: "warning" as const,
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
    subTitle: "Anderlecht dominerade i xG och avslut – men räddades av misstag",
    verdict: "neutral",
    summary:
      "Hammarby tog en tidig chockledning via Abraham (2') men lyckades inte hålla ställningen in i halvtid. Anderlecht bytte dubbelt i paus och Sikan kvitterade i 48'. Från och med den stunden kontrollerade Anderlecht med 4,55 xG och 21 avslut mot HIF:s 1,47 och 10. Bollinnehavet var relativt jämnt (56–44%) men Anderlecht skapade tre gånger mer xG. Trots det kom de avgörande 2–1 och 3–1-målen ur Hammarby-misstag: en retur efter Hahns räddning (81') och en passningsblunder i byggnadsspelet (89').",
    metrics: [
      { label: "Slutresultat", value: "3–1" },
      { label: "HT-ställning", value: "0–1" },
      { label: "Aggregat", value: "4–2", note: "Anderlecht vidare" },
      { label: "xG AND", value: 4.55, note: "Dominant chans­skapande" },
      { label: "xG HIF", value: 1.47 },
      { label: "Bollinnehav AND", value: "56%", unit: "" },
    ],
  },
  {
    id: "second-half-explanation",
    icon: "🔍",
    title: "Varför tog Anderlecht över i andra halvlek?",
    subTitle: "Fem faktorer som förklarar andra halvlekens dramaturgi",
    verdict: "warning",
    summary:
      "Anderlecht dominerade inte bara volymmässigt – de skapade verklig chankvalité. Med 4,55 xG mot HIF:s 1,47 var dominansen statistiskt påvisbar. Anderlecht hade 56% bollinnehav (inte extremt, men nog för att styra tempot) och 10 hörnor mot noll. Sikans omedelbara kvittering i 48' förändrade aggregatsituationen (nu 1–1 totalt) och psykologin: Hammarby tvingades försvara. Halvtidsbyten adderade energi och Cvetković blev direkt avgörande. De två sista målen speglar HIF:s utmattning och individuella fel.",
    metrics: [
      { label: "xG AND", value: 4.55, note: "Stark chankvalité" },
      { label: "xG HIF", value: 1.47 },
      { label: "AND xG/avslut", value: 0.217, note: "Bra snittchans" },
      { label: "Halvtidsbyten AND", value: 2, note: "Cvetković + Ndiaye in" },
      { label: "Hörnor AND / HIF", value: "10 / 0" },
      { label: "HIF-byten 65'–87'", value: 5, note: "Försökte bryta trycket" },
    ],
  },
  {
    id: "halftime-shift",
    icon: "🔀",
    title: "Halvtidsbyten som vände loppet",
    subTitle: "Ndiaye + Cvetković – direkt avgörande",
    verdict: "warning",
    summary:
      "Anderlecht hade svårt att hitta kvalitetschanser i första halvlek men dominerade klart i xG totalt. I paus bytte tränaren Vitor Bruno dubbelt: Moussa Ndiaye in för Ludwig Augustinsson och Mihajlo Cvetković in för Joshua Bethume. Effekten var omedelbar: Sikan kvitterade i 48'. Cvetković spelade hela andra halvlek och scorade det avgörande 2–1 i 81' (returen efter Hahns räddning på Ambros avslut). Bytet adderade kreativitet centralt och Ndiaye gav mer offensivt stöd längs sidan.",
    metrics: [
      { label: "48': Sikan 1–1", value: "48'", note: "Header på Maammars djupinlägg" },
      { label: "Cvetković mål", value: "81'", note: "Returen – avgörande 2–1" },
      { label: "Ndiaye: in 46'", value: "LB", note: "Mer offensiv sida" },
      { label: "AND xG totalt", value: 4.55, note: "Tre gånger mer än HIF" },
      { label: "HIF xG totalt", value: 1.47 },
    ],
  },
  {
    id: "possession-dominance",
    icon: "⚽",
    title: "xG-dominans och avslutstryck",
    subTitle: "4,55 xG och 21 avslut – verklig dominans",
    verdict: "warning",
    summary:
      "Med 4,55 xG mot HIF:s 1,47 var Anderlechts dominans inte bara volymmässig utan kvalitativ. Bollinnehavet var 56–44% (relativt jämnt) men Anderlecht omvandlade sitt innehav till tre gånger mer xG. 10 hörnor mot noll, 7 avslut på mål mot 4, och 21 totala avslut mot 10 visar var matchen spelades. Anderlecht skapade i snitt 0,22 xG per avslut – ett klart bättre snitt än HIF:s 0,15.",
    metrics: [
      { label: "xG AND", value: 4.55 },
      { label: "xG HIF", value: 1.47 },
      { label: "Bollinnehav AND / HIF", value: "56% / 44%" },
      { label: "Hörnor AND / HIF", value: "10 / 0" },
      { label: "AND xG/avslut", value: 0.217, note: "God snittkvalité" },
      { label: "HIF xG/avslut", value: 0.147 },
    ],
  },
  {
    id: "goalkeeper-error",
    icon: "🧤",
    title: "Hahns misstag – en kostbar blunder",
    subTitle: "3–1-målet kom ur ett byggspelafel",
    verdict: "warning",
    summary:
      "Det tredje och avgörande målet (3–1, Degreef 89') kom inte från Anderlechts anfallsspel utan från ett Hammarby-misstag. Warner Hahn försökte passa ut från målvaktspositionen, men passet var dåligt och satte Ibrahima Breze Fofana under omedelbart press. Tristan Degreef (nyss inbytt i 84') snappade åt sig bollen i straffområdet och satte dit den kallt. Det liknar det andra målet (81') då Hahn räddade Ambros skott men gav returläget till Cvetković. Hahn stod för 4 räddningar men de kritiska situationerna kostade matchen.",
    metrics: [
      { label: "81' AND: Cvetković", value: "2–1", note: "Retur efter Hahns räddning" },
      { label: "89' AND: Degreef", value: "3–1", note: "Passningsblunder av Hahn" },
      { label: "Hahns räddningar", value: 4, note: "Varav 2 situationer kostade mål" },
      { label: "AND avslut på mål", value: 7, note: "Hahn räddade 4 av 7" },
    ],
  },
  {
    id: "first-half",
    icon: "🛡️",
    title: "Första halvlek: Hammarby nära att hålla",
    subTitle: "0–1 till paus – men aggregat och tryck var aldrig tryggt",
    verdict: "neutral",
    summary:
      "Hammarby chockade Anderlecht i minut 2 och höll tätt in i paus. Victor Lind träffade stolpen tidigt och Coosemans stod för tre räddningar i första halvlek. Men Anderlecht skapade xG och tryckte konstant. Sikan kvitterade i 48' – det räckte för att helt förändra matchens psykologi och aggregatsituationen.",
    metrics: [
      { label: "HT-ställning", value: "0–1", note: "Hammarby ledde" },
      { label: "Lind: stolpen", value: "3'", note: "Tidigt närmaste" },
      { label: "Abraham mål", value: "2'", note: "Chockstart" },
      { label: "Coosemans räddningar", value: 3, note: "Höll undan i 1:a HT" },
      { label: "AND halvtidsbyten", value: 2, note: "Svar i paus" },
    ],
  },
  {
    id: "aggregate",
    icon: "📅",
    title: "Aggregat och konsekvenser",
    subTitle: "Anderlecht vidare 4–2 – HIF till Conference League",
    verdict: "neutral",
    summary:
      "Med sammanlagda 4–2 avancerar Anderlecht till tredje kvalsomgången i UEFA Europa League där PAOK väntar. Hammarby faller ned till Conference League-kvalet och möter polska Rakow. Trots eliminationen var HIF:s dubbla möte med Anderlecht statistiskt komplex: 1,75 xG hemma i leg 1 och ett hederligt motstånd i returen. Det var halvtidsbyten, ett omedelbart kvitteringsmål och till sist individuella misstag som avgjorde.",
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
