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
      "Hammarby tog initiativet territoriellt (58–71% bollinnehav i inledningen) men hade svårt att få ut max av lägena. Elfsborg var farligast i 16–30 (0,44 xG mot Hammarbys 0,32 i samma period). Abraham bröt dödläget på 49:e – 1–0 till paus efter en halvlek där Hammarby skapade mer men inte dominerade helt.",
    tone: "blue",
  },
  {
    id: "second-half",
    label: "Andra halvlek · avgörande tryck",
    scoreline: "1–0 → 1–2",
    body:
      "Efter paus ökade Hammarby tempot. Sex skott och 0,71 xG bara i 61–75 – Madjed gjorde 2–0 i 73:e. Elfsborg svarade direkt via Sigurpálsson (76'), men Hammarby höll undan. Andra halvlek gav 1,50 xG mot Elfsborgs 0,38 – matchen avgjordes i slutskedet.",
    tone: "emerald",
  },
  {
    id: "verdict",
    label: "Slutbild · vad matchen var",
    scoreline: "Mer boll, mer xG, tre poäng",
    body:
      "En kontrollerad bortaseger där Hammarby var det bättre laget i nästan alla offensiva parametrar (2,48 vs 1,03 xG, 18 vs 14 avslut, 57% bollinnehav). Men matchen var inte enkel: lägre press än planerat (PPDA 7,40), Elfsborg reducerade direkt efter 2–0, och Rydström fick se sitt lag vinna utan att dominera hela 90 minuter.",
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

export const elfsborgRound11Recap = {
  headline: "Mer boll, mer xG – Hammarby vann i Borås",
  verdict:
    "Hammarby var det bättre laget och vann rättvist 2–1, men matchen var jämnare än siffrorna antyder. Abraham gav ledning sent i första halvlek, Madjed avgjorde i 73:e, Elfsborg reducerade tre minuter senare.",
  subheadline:
    "Bortaseger mot Elfsborg (1–2) med tydlig xG-fördel (2,48–1,03). Hammarby dominerade bollinnehav och skapade fler chanser, men pressade inte lika högt som förhandsanalysen pekade på. Rydströms första riktiga test blev godkänt.",
  matchResult: "Elfsborg 1–2 Hammarby (1,03–2,48 xG)",
  dateLabel: "5 juli 2026 · Omgång 11 · Borås Arena",
  bolldataSummary:
    "Bolldata: 57% boll · 18–14 avslut · 22–18 boxberöringar · 8–3 hörnor",
  sourceUrl:
    "https://bolldata.se/allsvenskan/matcher/2026/2026-07-05/elfsborg-hammarby-1-2",
  hammarbySourceUrl:
    "https://www.hammarbyfotboll.se/matcher/2026-07-05-00-00-if-elfsborg-hammarby",
};
