import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";
import type {
  MatchGoalEvent,
  MatchRecapTakeaway,
  MatchSnapshotPill,
  MatchSnapshotStat,
  MatchStoryPhase,
} from "@/lib/elfsborgRound11AnalysisData";

export interface YearOnYearRow {
  label: string;
  value2025: string;
  value2026: string;
  trend: "better" | "similar" | "worse";
  note?: string;
}

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

export const degerforsRound13MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    2.65,
    0.35,
    "2,65",
    "0,35",
    "Massiv xG-fördel – Hammarby skapade 7,6× mer förväntade mål.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    22,
    8,
    "22",
    "8",
    "Mer än dubbelt så många avslut mot ett Degerfors-lag utan offensiva resurser.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    11,
    1,
    "11",
    "1",
    "11 mot 1 – Degerfors hade nästan ingenting att visa upp på mål.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    64,
    36,
    "64%",
    "36%",
    "Hammarbys territoriella dominans speglade den slutliga 4-0-segern.",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    39,
    15,
    "39",
    "15",
    "2,6× fler boxberöringar – Hammarby penetrerade Degerfors-försvaret konsekvent.",
  ),
  buildMatchSpiderAxis(
    "Passningar (lyckade)",
    602,
    296,
    "602 (89%)",
    "296 (79%)",
    "Hammarby slog dubbelt så många lyckade passningar – full kontroll i bygget.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    6,
    2,
    "6",
    "2",
    "Fler hörnor speglar Hammarbys konstanta press mot Degerfors bakre linje.",
  ),
  buildMatchSpiderAxis(
    "Räddningar (målvakt)",
    1,
    7,
    "1",
    "7",
    "Hahn räddade 1 gång – Degerfors-keepern kämpade mot 11 skott på mål.",
  ),
];

export const degerforsRound13Goals: MatchGoalEvent[] = [
  { minute: 40, team: "Hammarby", player: "P. Abraham (assist: V. Lind)", xg: 0.18 },
  { minute: 69, team: "Hammarby", player: "M. Madjed (assist: V. Lind)", xg: 0.14 },
  { minute: 72, team: "Hammarby", player: "T. Tekie (assist: M. Karlsson)", xg: 0.22 },
  { minute: 75, team: "Hammarby", player: "M. Madjed (assist: P. Abraham)", xg: 0.31 },
];

export const degerforsRound13MatchStory: MatchStoryPhase[] = [
  {
    id: "first-half",
    label: "Första halvlek · kontrollerat",
    scoreline: "1–0 vid paus",
    body:
      "Hammarby dominerade från start och belönades med Abrahams 1-0 på en assist av Lind (40'). Degerfors – utan sina avstängda mittfältsmotorer Netabay och Fritzson – saknade helt struktur i sin press.",
    tone: "emerald",
  },
  {
    id: "second-half",
    label: "Andra halvlek · kross",
    scoreline: "1–0 → 4–0",
    body:
      "Tre mål på sex minuter efter 69'. Madjed (69' assist Lind), Tekie (72' assist Karlsson) och Madjed igen (75' assist Abraham) stängde matchen. Totalt 4-0 – Hammarbys överlägsenhet i xG (2,65–0,35) omsattes fullt ut.",
    tone: "emerald",
  },
  {
    id: "verdict",
    label: "Slutbild · rutinmässig dominans",
    scoreline: "4-0 · 2,65 xG – 0,35 xG",
    body:
      "En av säsongens mest kompletta hemmasegrar. 22 avslut, 11 på mål och 0 insläppt. Degerfors begränsades till ett enda skott på mål hela matchen.",
    tone: "slate",
  },
];

export const degerforsRound13Takeaways: MatchRecapTakeaway[] = [
  {
    id: "dominance",
    title: "Total dominans",
    body: "2,65 xG, 22 avslut, 11 skott på mål – Hammarbys bästa hemmaprestation offensivt i säsongen. Degerfors svarade med 0,35 xG och ett enda skott på mål.",
    tone: "emerald",
    stat: "2,65 xG · 4-0",
  },
  {
    id: "madjed",
    title: "Madjed avgörande",
    body: "Montader Madjed fick matchbetyget 9,3 och stod för två mål (69' och 75') efter att ha kommit in som anfallare. Paulos Abraham (8,7) och Victor Lind (8,4) var also tongivande med varsitt mål och varsin assist.",
    tone: "emerald",
    stat: "Madjed 9,3 · 2 mål",
  },
  {
    id: "suspended",
    title: "Dubbel-avstängning avgörande",
    body: "Pre-match-analysen lyfte Netabay och Fritzson som nyckelspelare – båda var avstängda. Utan deras press- och kreativitetsmotor kollapsade Degerfors mittfält fullständigt under Hammarbys press.",
    tone: "blue",
    stat: "Netabay + Fritzson 🚫",
  },
  {
    id: "defense",
    title: "Nollan hållen",
    body: "Warner Hahn räddade en gång – Degerfors behövde inte ens utmana ordentligt. Hammarbys defensiva organisation innebar att 0,35 xG var det laget tillät mot ett av ligans sämsta offensiver.",
    tone: "emerald",
    stat: "0,35 opp. xG · 0 insläppta",
  },
];

export const degerforsRound13SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 2.65, opponentValue: 0.35, hammarbyDisplay: "2,65", opponentDisplay: "0,35" },
  { label: "Avslut", hammarbyValue: 22, opponentValue: 8, hammarbyDisplay: "22", opponentDisplay: "8" },
  { label: "Bollinnehav", hammarbyValue: 64, opponentValue: 36, hammarbyDisplay: "64%", opponentDisplay: "36%" },
  { label: "Boxberöringar", hammarbyValue: 39, opponentValue: 15, hammarbyDisplay: "39", opponentDisplay: "15" },
];

export const degerforsRound13SnapshotPills: MatchSnapshotPill[] = [
  { id: "win", label: "Storseger 4-0", tone: "emerald" },
  { id: "xg", label: "2,65 xG", tone: "emerald" },
  { id: "clean-sheet", label: "Nollan hållen", tone: "emerald" },
  { id: "madjed", label: "Madjed x2 ⚡", tone: "blue" },
];

export const degerforsRound13Recap = {
  headline: "Hammarby krossade Degerfors 4-0",
  tagline: "Total dominans – tre mål på sex minuter i 2H",
  opponentScore: 0,
  hammarbyScore: 4,
  opponentXg: 0.35,
  hammarbyXg: 2.65,
  halftimeScore: "1–0",
  matchResult: "4–0",
  dateLabel: "19 juli 2026 · Omgång 13 · 3Arena",
  sourceUrl: "https://www.fotmob.com/match/5107534?tz=Europe%2FStockholm",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/",
};

/** Jämförelse: Hammarby–Degerfors hemma 2025 (Omgång 11) vs 2026 (Omgång 13) */
export const degerforsYearComparison: YearOnYearRow[] = [
  {
    label: "Resultat",
    value2025: "1-0",
    value2026: "4-0",
    trend: "better",
    note: "Från smal seger till övertygande kross",
  },
  {
    label: "Hammarby xG",
    value2025: "0,84",
    value2026: "2,65",
    trend: "better",
    note: "+1,81 xG – klart mer kreativa chanser 2026",
  },
  {
    label: "Degerfors xG",
    value2025: "0,84",
    value2026: "0,35",
    trend: "better",
    note: "Degerfors begränsades till hälften jämfört med 2025",
  },
  {
    label: "Hammarby avslut",
    value2025: "13",
    value2026: "22",
    trend: "better",
    note: "+9 avslut – tydligt mer offensiv volym",
  },
  {
    label: "Degerfors avslut",
    value2025: "13",
    value2026: "8",
    trend: "better",
    note: "Degerfors halverade sin avslutningsvolym",
  },
  {
    label: "Hammarby bollinnehav",
    value2025: "70%",
    value2026: "64%",
    trend: "similar",
    note: "Något lägre 2026 men fortfarande dominerande",
  },
  {
    label: "Hammarby skott på mål",
    value2025: "2",
    value2026: "11",
    trend: "better",
    note: "Massiv förbättring i avslutskvalitet och precision",
  },
  {
    label: "Boxberöringar (HIF)",
    value2025: "34",
    value2026: "39",
    trend: "better",
    note: "+5 boxberöringar – ännu bättre penetration 2026",
  },
  {
    label: "Mål Hammarby",
    value2025: "1",
    value2026: "4",
    trend: "better",
    note: "Från minsta möjliga seger till storseger",
  },
  {
    label: "Insläppta mål",
    value2025: "0",
    value2026: "0",
    trend: "similar",
    note: "Nollan hållen i båda matcherna",
  },
];

export const degerforsYearComparisonMeta = {
  season2025: {
    label: "Omgång 11 · 26 maj 2025",
    result: "1-0",
    scorer: "Besara 61'",
    coach: "Kim Hellberg",
    fotmobUrl: "https://www.fotmob.com/match/4692795?tz=Europe%2FStockholm",
  },
  season2026: {
    label: "Omgång 13 · 19 juli 2026",
    result: "4-0",
    scorer: "Abraham 40', Madjed 69', Tekie 72', Madjed 75'",
    coach: "Henrik Rydström",
    fotmobUrl: "https://www.fotmob.com/match/5107534?tz=Europe%2FStockholm",
  },
};
