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

/** Matchstatistik – Omgång 14 · IF Brommapojkarna vs Hammarby (1–1) · 26 juli 2026. */
export const brommapojkarnaRound14MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "xG / match",
    1.98,
    0.31,
    "1,98",
    "0,31",
    "6,4× mer förväntat mål för Hammarby – massiv chansöverlägsenhet utan belöning.",
  ),
  buildMatchSpiderAxis(
    "Avslut / match",
    24,
    6,
    "24",
    "6",
    "Hammarby skapade 4× fler avslut – offensivt överläge genomgående.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    5,
    1,
    "5",
    "1",
    "5 mot 1 – Hammarby styrde skottstatistiken men Råne räddade och BP höll nollan länge.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    65,
    35,
    "65%",
    "35%",
    "Nästan dubbelt så mycket bollinnehav – territoriell dominans under hela matchen.",
  ),
  buildMatchSpiderAxis(
    "Boxberöringar / match",
    50,
    17,
    "50",
    "17",
    "3× fler beröringar i BPs straffområde – Hammarby trängde in men kunde inte omsätta det.",
  ),
  buildMatchSpiderAxis(
    "Hörnor",
    11,
    2,
    "11",
    "2",
    "11 mot 2 hörnor – konstant press mot BPs bakre linje men inga mål därifrån.",
  ),
  buildMatchSpiderAxis(
    "Lyckade passningar",
    653,
    318,
    "653 (92%)",
    "318 (85%)",
    "Hammarby slog dubbelt så många lyckade passningar med högre precision.",
  ),
  buildMatchSpiderAxis(
    "Stora möjligheter",
    1,
    0,
    "1",
    "0",
    "Hammarby hade matchens enda stora chans – BPs mål kom från fast situation, inte öppet spel.",
  ),
];

export const brommapojkarnaRound14Goals: MatchGoalEvent[] = [
  { minute: 79, team: "Hammarby", player: "V. Lind", xg: 0.0 },
  { minute: 90, team: "Brommapojkarna", player: "A. Troelsen (fast situation)", xg: 0.0 },
];

export const brommapojkarnaRound14MatchStory: MatchStoryPhase[] = [
  {
    id: "first-half",
    label: "Första halvlek · kontroll utan mål",
    scoreline: "0–0 vid paus",
    body:
      "Hammarby dominerade med 65% bollinnehav och 1,98 xG totalt, men BPs kompakta 5-4-1-block höll Hammarbys 11 hörnor och 50 boxberöringar utan genomslag. BP satt djupt och förlitade sig på kontringar.",
    tone: "blue",
  },
  {
    id: "second-half-goal",
    label: "Andra halvlek · Lind sätter 1-0",
    scoreline: "0–1 HIF 79'",
    body:
      "Victor Lind satte Hammarby i ledning i minut 79. Med 10 minuter kvar verkade tre poäng klara. Hammarby hade vid det laget skapat 1,98 xG mot BPs 0,31.",
    tone: "emerald",
  },
  {
    id: "equalizer",
    label: "Utkvittering i 90' · fast situation avgörande",
    scoreline: "1–1 · 90'",
    body:
      "I matchens sista minut kvitterade Brommapojkarna via A. Troelsen från en fast situation. Hela 1,98 xG mot 0,31 – och ändå slutade det 1-1. Defensivt misstag i slutminut kostade två poäng.",
    tone: "amber",
  },
  {
    id: "verdict",
    label: "Slutbild · oförtjänt oavgjort",
    scoreline: "1–1 · 1,98 xG mot 0,31 xG",
    body:
      "24 avslut, 50 boxberöringar, 11 hörnor, 1,98 xG – Hammarby förtjänade tre poäng men gick hem med ett. BPs mål kom från det enda som fungerade: en fast situation mot ett annars fullständigt defensivt BP-lag.",
    tone: "slate",
  },
];

export const brommapojkarnaRound14Takeaways: MatchRecapTakeaway[] = [
  {
    id: "xg-wasted",
    title: "1,98 xG – men bara 1 mål",
    body: "Hammarby skapade 1,98 xG mot BPs 0,31 – nästan 6,4× mer förväntat mål. 24 avslut, 5 på mål, 50 boxberöringar och 11 hörnor. Resultatet är ett av säsongens mest olyckliga punkttapp.",
    tone: "amber",
    stat: "1,98 xG · 24 avslut · 1-1",
  },
  {
    id: "late-equalizer",
    title: "Sen utkvittering i 90'",
    body: "A. Troelsen kvitterade för BP i 90' via en fast situation. Hammarby hade lett sedan 79' och fullständigt dominerat – ett enda defensivt misstag sent i matchen kostade två poäng.",
    tone: "amber",
    stat: "BP-mål 90' · fast situation",
  },
  {
    id: "lind-goal",
    title: "Lind i ledningen",
    body: "Victor Lind satte Hammarby i ledning i minut 79 och verkade säkra tre poäng. Viktig spelare i laget som fortsätter bidra offensivt.",
    tone: "emerald",
    stat: "V. Lind 79'",
  },
  {
    id: "box-dominance",
    title: "50 boxberöringar – utan belöning",
    body: "50 beröringar i BPs straffområde mot BPs 17 – 3× överlägsenhet inne i boxen. 11 hörnor mot BPs 2. Hammarby trängde in gång på gång men Råne och BPs defensiva block höll länge.",
    tone: "blue",
    stat: "50 vs 17 boxberöringar · 11 vs 2 hörnor",
  },
];

export const brommapojkarnaRound14SnapshotStats: MatchSnapshotStat[] = [
  { label: "xG", hammarbyValue: 1.98, opponentValue: 0.31, hammarbyDisplay: "1,98", opponentDisplay: "0,31" },
  { label: "Avslut", hammarbyValue: 24, opponentValue: 6, hammarbyDisplay: "24", opponentDisplay: "6" },
  { label: "Bollinnehav", hammarbyValue: 65, opponentValue: 35, hammarbyDisplay: "65%", opponentDisplay: "35%" },
  { label: "Boxberöringar", hammarbyValue: 50, opponentValue: 17, hammarbyDisplay: "50", opponentDisplay: "17" },
];

export const brommapojkarnaRound14SnapshotPills: MatchSnapshotPill[] = [
  { id: "draw", label: "Oavgjort 1-1", tone: "amber" },
  { id: "xg", label: "1,98 xG (HIF)", tone: "emerald" },
  { id: "late-goal", label: "BP kvitt. 90'", tone: "amber" },
  { id: "lind", label: "V. Lind 79' ⚡", tone: "blue" },
];

export const brommapojkarnaRound14Recap = {
  headline: "Hammarby tappade poäng mot BP i 90'",
  tagline: "1,98 xG och dominans – men fast situation i slutminuten straffade",
  opponentScore: 1,
  hammarbyScore: 1,
  opponentXg: 0.31,
  hammarbyXg: 1.98,
  halftimeScore: "0–0",
  matchResult: "1–1",
  dateLabel: "26 juli 2026 · Omgång 14 · Grimsta IP",
  sourceUrl:
    "https://allsvenskan.se/matcher/2026/6529936/if-brommapojkarna-mot-hammarby",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/",
};
