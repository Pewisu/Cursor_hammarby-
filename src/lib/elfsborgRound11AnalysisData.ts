import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";

export interface MatchGoalEvent {
  minute: number;
  team: "Hammarby" | "Elfsborg";
  player: string;
  xg: number;
}

export interface MatchRecapTakeaway {
  id: string;
  title: string;
  body: string;
  tone: "emerald" | "amber" | "blue" | "slate";
  stat?: string;
}

export interface MatchStoryPhase {
  id: string;
  label: string;
  scoreline: string;
  body: string;
  tone: "emerald" | "amber" | "blue" | "slate";
}

function toMatchSpiderScore(hammarbyValue: number, opponentValue: number): {
  hammarbyScore: number;
  opponentScore: number;
} {
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

/** Bolldata lagspindel – matchdata från bolldata.se/matcher (id 4645). */
export const elfsborgRound11MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "Lyckade anfallsaktioner / match",
    20,
    15,
    "20",
    "15",
    "Hammarby skapade fler lyckade anfallsaktioner i Borås.",
  ),
  buildMatchSpiderAxis(
    "Mål / match",
    2,
    1,
    "2",
    "1",
    "Hammarby vann målkampen – båda målen i andra halvlek.",
  ),
  buildMatchSpiderAxis(
    "xG / match",
    2.48,
    1.03,
    "2,48",
    "1,03",
    "Stor xG-fördel – Hammarby skapade 2,4× mer förväntat mål.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    18,
    14,
    "18",
    "14",
    "Högre skottvolym mot ett lag som normalt skjuter minst i ligan.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    9,
    5,
    "9",
    "5",
    "Nio skott på mål mot Elfsborgs fem – trycket syntes i avsluten.",
  ),
  buildMatchSpiderAxis(
    "Lyckade defensiva aktioner / match",
    63,
    75,
    "63",
    "75",
    "Elfsborg försvarade mer (mindre bollinnehav), men släppte ändå in 2,48 xG.",
  ),
  buildMatchSpiderAxis(
    "Duellvinster / match",
    65,
    63,
    "65",
    "63",
    "Jämn duellbild – Hammarby vann knappt flest dueller.",
  ),
  buildMatchSpiderAxis(
    "Återerövringar / match",
    73,
    70,
    "73",
    "70",
    "Hammarby återerövrade marginellt oftare under matchen.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    57,
    43,
    "57%",
    "43%",
    "Territoriell kontroll – Hammarby styrde 57% av bollen.",
  ),
  buildMatchSpiderAxis(
    "Framåtpassningar / match",
    146,
    152,
    "146",
    "152",
    "Elfsborg slog fler framåtpassningar, men med lägre kvalitet i avslutet.",
  ),
];

export const elfsborgRound11Goals: MatchGoalEvent[] = [
  { minute: 49, team: "Hammarby", player: "P. Abraham", xg: 0.35 },
  { minute: 73, team: "Hammarby", player: "Montader Madjed", xg: 0.16 },
  { minute: 76, team: "Elfsborg", player: "A. Sigurpálsson", xg: 0.16 },
];

export const elfsborgRound11MatchStory: MatchStoryPhase[] = [
  {
    id: "first-half",
    label: "Första halvlek · 0–0 → 0–1",
    scoreline: "0–1 vid paus",
    body:
      "Hammarby tog bollen men hade svårt att skapa klara lägen. Elfsborg farligast i 16–30. Abraham bröt 0–0 på 49:e.",
    tone: "blue",
  },
  {
    id: "second-half",
    label: "Andra halvlek · avgörande tryck",
    scoreline: "1–0 → 1–2",
    body:
      "Hammarby tryckte på efter paus. Madjed 2–0 (73'), Sigurpálsson reducerade (76'). 1,50 xG i andra halvlek.",
    tone: "emerald",
  },
  {
    id: "verdict",
    label: "Slutbild · vad matchen var",
    scoreline: "Mer boll, mer xG, tre poäng",
    body:
      "Kontrollerad bortaseger – bättre i offensiven men lägre press (PPDA 7,40) än planerat.",
    tone: "slate",
  },
];

export const elfsborgRound11Takeaways: MatchRecapTakeaway[] = [
  {
    id: "offense",
    title: "Offensivt överläge",
    body: "2,48 xG, 18 avslut och 9 skott på mål – Hammarby skapade klart bättre chanser än ett Elfsborg-lag som normalt begränsar motståndare till 1,25 xG/match.",
    tone: "emerald",
    stat: "2,48 xG",
  },
  {
    id: "press",
    title: "Passivare press",
    body: "PPDA 7,40 – sämsta pressvärdet hittills i säsongen (12/12 i Twelve-ranking). Rydström valde kontroll framför intensitet, och det räckte mot Elfsborgs passiva block.",
    tone: "amber",
    stat: "PPDA 7,40",
  },
  {
    id: "defense",
    title: "Begränsade Elfsborgs hot",
    body: "Elfsborg hölls till 14 avslut och 1,03 xG. Defensivt transition höll – bara ett mål via Sigurpálsson efter att Hammarby redan ledde 2–0.",
    tone: "emerald",
    stat: "1,03 opp. xG",
  },
  {
    id: "rydstrom",
    title: "Rydström-debuten",
    body: "Bortaseger i Borås – tredje raka HIF-segern mot Elfsborg. Första riktiga testet för nye huvudtränaren blev godkänt, även om spelet inte nådde säsongsbästa.",
    tone: "blue",
    stat: "2–1 borta",
  },
];

export interface MatchSnapshotStat {
  label: string;
  hammarbyValue: number;
  opponentValue: number;
  hammarbyDisplay: string;
  opponentDisplay: string;
}

export interface MatchSnapshotPill {
  id: string;
  label: string;
  tone: "emerald" | "amber" | "blue" | "slate";
}

export const elfsborgRound11SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 2.48, opponentValue: 1.03, hammarbyDisplay: "2,48", opponentDisplay: "1,03" },
  { label: "Avslut", hammarbyValue: 18, opponentValue: 14, hammarbyDisplay: "18", opponentDisplay: "14" },
  { label: "Bollinnehav", hammarbyValue: 57, opponentValue: 43, hammarbyDisplay: "57%", opponentDisplay: "43%" },
  { label: "Boxberöringar", hammarbyValue: 22, opponentValue: 18, hammarbyDisplay: "22", opponentDisplay: "18" },
];

export const elfsborgRound11SnapshotPills: MatchSnapshotPill[] = [
  { id: "win", label: "Bortaseger", tone: "emerald" },
  { id: "xg", label: "2,48 xG", tone: "emerald" },
  { id: "press", label: "Lägre press", tone: "amber" },
  { id: "rydstrom", label: "Rydström-debut ✓", tone: "blue" },
];

export const elfsborgRound11Recap = {
  headline: "Hammarby vann i Borås",
  tagline: "Mer boll och xG – avgjort i andra halvlek",
  opponentScore: 1,
  hammarbyScore: 2,
  opponentXg: 1.03,
  hammarbyXg: 2.48,
  halftimeScore: "0–1",
  matchResult: "1–2",
  dateLabel: "5 juli 2026 · Omgång 11 · Borås Arena",
  sourceUrl:
    "https://bolldata.se/allsvenskan/matcher/2026/2026-07-05/elfsborg-hammarby-1-2",
  hammarbySourceUrl:
    "https://www.hammarbyfotboll.se/matcher/2026-07-05-00-00-if-elfsborg-hammarby",
};
