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

/** Allsvenskan matchstatistik – Omgång 14 · IF Brommapojkarna vs Hammarby (1–1). */
export const brommapojkarnaRound14MatchSpider: SpiderComparisonAxis[] = [
  buildMatchSpiderAxis(
    "Avslut / match",
    24,
    6,
    "24",
    "6",
    "Hammarby skapade 4× fler avslut – massivt offensivt överläge utan belöning.",
  ),
  buildMatchSpiderAxis(
    "Skott på mål / match",
    5,
    1,
    "5",
    "1",
    "5 mot 1 – Hammarby styrde skottstatistiken men hade otur framför mål.",
  ),
  buildMatchSpiderAxis(
    "Bollinnehav (%)",
    65,
    35,
    "65%",
    "35%",
    "Nästan dubbelt så mycket bollinnehav – Hammarby dominerade territoriellt.",
  ),
  buildMatchSpiderAxis(
    "Passningar (lyckade)",
    653,
    318,
    "653",
    "318",
    "Hammarby slog mer än dubbelt så många lyckade passningar mot ett defensivt BP.",
  ),
  buildMatchSpiderAxis(
    "Frisparkar tilldelade",
    13,
    9,
    "13 (BP)",
    "9 (HIF)",
    "BP stoppade Hammarby mer fult – 13 frisparkar tilldelade mot HIF.",
  ),
  buildMatchSpiderAxis(
    "Bra chanser",
    1,
    0,
    "1",
    "0",
    "Hammarby hade matchens enda stora chans – BPs mål kom från fast situation.",
  ),
  buildMatchSpiderAxis(
    "Tacklingar",
    12,
    16,
    "12",
    "16",
    "BP tacklerade mer (16 vs 12) i sin defensiva strategi.",
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
      "Hammarby dominerade med 65% bollinnehav och 24 totala avslut i matchen, men BPs kompakta block och defensiva press höll 0-0 till paus. BP spelade på kontringar och förlitade sig på fasta situationer.",
    tone: "blue",
  },
  {
    id: "second-half-goal",
    label: "Andra halvlek · Lind sätter 1-0",
    scoreline: "0–1 HIF 79'",
    body:
      "Victor Lind satte Hammarby i ledning i minut 79 efter fortsatt tryck. Med 10 minuter kvar verkade tre poäng vara klara för bortalaget.",
    tone: "emerald",
  },
  {
    id: "equalizer",
    label: "Utkvittering i 90' · fast situation avgörande",
    scoreline: "1–1 · 90'",
    body:
      "I det sista minutet kvitterade Brommapojkarna via A. Troelsen från en fast situation. Två förlorade poäng sent – Hammarby hade dominerat men betalade dyrt för ett enda defensivt misstag.",
    tone: "amber",
  },
  {
    id: "verdict",
    label: "Slutbild · oförtjänt oavgjort",
    scoreline: "1–1 · 24 avslut, 5 på mål",
    body:
      "24 avslut, 5 på mål, 65% bollinnehav – Hammarby förtjänade tre poäng men gick hem med ett. BPs sent matchvinnande fasta situation sammanfattar frustrationen. Klassisk punkttapp mot ett bottenlag som sitter djupt.",
    tone: "slate",
  },
];

export const brommapojkarnaRound14Takeaways: MatchRecapTakeaway[] = [
  {
    id: "dominance-wasted",
    title: "Dominans utan utdelning",
    body: "24 avslut, 5 skott på mål, 65% bollinnehav – statistiken talar för Hammarby men slutresultatet gör det inte. Klassisk varning om att avslutningseffektivitet fortfarande är ett problem.",
    tone: "amber",
    stat: "24 avslut · 1-1",
  },
  {
    id: "late-equalizer",
    title: "Sen utkvittering i 90'",
    body: "A. Troelsen kvitterade för BP i 90' via en fast situation. Hammarby hade lett sedan 79' men en enda defensiv blunder kostade två poäng i en match de dominerade.",
    tone: "amber",
    stat: "BP-mål 90' · fast situation",
  },
  {
    id: "lind-goal",
    title: "Lind i ledningen",
    body: "Victor Lind satte Hammarby i ledning i minut 79 och verkade säkra tre poäng. Fortsatt viktig roll i laget trots sent mållöst tryck under stora delar av matchen.",
    tone: "emerald",
    stat: "V. Lind 79'",
  },
  {
    id: "set-piece-weakness",
    title: "Fasta situationer sårbarhet",
    body: "Brommapojkarnas kvitteringsmål kom från en fast situation i slutminuten. En påminnelse om att fasta situationer defensivt förblir en riskfaktor, oavsett hur Hammarby dominerar i öppet spel.",
    tone: "blue",
    stat: "0 insläppt öppet spel · 1 fast situation",
  },
];

export const brommapojkarnaRound14SnapshotStats: MatchSnapshotStat[] = [
  { label: "Avslut", hammarbyValue: 24, opponentValue: 6, hammarbyDisplay: "24", opponentDisplay: "6" },
  { label: "Bollinnehav", hammarbyValue: 65, opponentValue: 35, hammarbyDisplay: "65%", opponentDisplay: "35%" },
  { label: "Skott på mål", hammarbyValue: 5, opponentValue: 1, hammarbyDisplay: "5", opponentDisplay: "1" },
  { label: "Passningar", hammarbyValue: 653, opponentValue: 318, hammarbyDisplay: "653", opponentDisplay: "318" },
];

export const brommapojkarnaRound14SnapshotPills: MatchSnapshotPill[] = [
  { id: "draw", label: "Oavgjort 1-1", tone: "amber" },
  { id: "shots", label: "24 avslut (HIF)", tone: "emerald" },
  { id: "late-goal", label: "BP kvitt. 90'", tone: "amber" },
  { id: "lind", label: "V. Lind 79' ⚡", tone: "blue" },
];

export const brommapojkarnaRound14Recap = {
  headline: "Hammarby tappade poäng mot BP i 90'",
  tagline: "24 avslut och dominans – men fast situation i slutminuten straffade",
  opponentScore: 1,
  hammarbyScore: 1,
  opponentXg: 0,
  hammarbyXg: 0,
  halftimeScore: "0–0",
  matchResult: "1–1",
  dateLabel: "26 juli 2026 · Omgång 14 · Grimsta IP",
  sourceUrl:
    "https://allsvenskan.se/matcher/2026/6529936/if-brommapojkarna-mot-hammarby",
  hammarbySourceUrl: "https://www.hammarbyfotboll.se/matcher/",
};
