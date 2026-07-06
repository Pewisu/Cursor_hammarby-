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

/** Bolldata matchjämförelse – IF Elfsborg vs Hammarby, omgång 11 (5 juli 2026). */
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
    "Hammarby vann målkampen med två skarpa avslut i andra halvlek.",
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
    "Territoriell kontroll utan boll – Hammarby styrde 57% av bollen.",
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

export const elfsborgRound11Takeaways: MatchRecapTakeaway[] = [
  {
    id: "result",
    title: "Rydström-debuten levererar",
    body: "Bortaseger i Borås (1-2) – Hammarbys tredje raka seger mot Elfsborg. Rydströms första riktiga test blev godkänt.",
    tone: "emerald",
    stat: "3 raka HIF-segrar",
  },
  {
    id: "xg",
    title: "Dominerande underliggande data",
    body: "2,48 xG mot 1,03 – Hammarby skapade klart bättre chanser. Resultatet speglar prestationen.",
    tone: "emerald",
    stat: "2,48–1,03 xG",
  },
  {
    id: "press",
    title: "Lägre press än planerat",
    body: "PPDA 7,40 mot Elfsborgs passiva 7,20 i säsongssnitt – Hammarby pressade inte lika högt som förhandsanalysen pekade på.",
    tone: "amber",
    stat: "PPDA 7,40",
  },
  {
    id: "late",
    title: "Avgörande sent",
    body: "Madjeds 2-0-mål (73') och Sigurpálssons reducering (76') – matchen avgjordes i slutskedet, precis som varningen om Elfsborgs sena mål.",
    tone: "blue",
    stat: "73' + 76'",
  },
];

export const elfsborgRound11Recap = {
  headline: "Kontrollerad bortaseger i Borås",
  subheadline:
    "Hammarby vann 2-1 borta mot Elfsborg med tydlig xG-fördel (2,48–1,03). Abraham gav ledning i första halvlek, Madjed avgjorde sent – men Elfsborg slog till direkt efter 2-0. Rydströms första riktiga test blev godkänt.",
  matchResult: "Elfsborg 1–2 Hammarby (1,03–2,48 xG)",
  dateLabel: "5 juli 2026 · Omgång 11 · Borås Arena",
  sourceUrl:
    "https://bolldata.se/allsvenskan/matcher/2026/2026-07-05/elfsborg-hammarby-1-2",
  hammarbySourceUrl:
    "https://www.hammarbyfotboll.se/matcher/2026-07-05-00-00-if-elfsborg-hammarby",
};
