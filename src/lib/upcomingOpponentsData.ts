export interface RankedComparisonMetric {
  label: string;
  hammarbyValue: string;
  hammarbyRank: string;
  opponentValue: string;
  opponentRank: string;
  note: string;
}

export interface GoalWindowComparison {
  window: string;
  hammarbyGoals: number;
  opponentConcededGoals: number;
}

export interface GoalTypeNote {
  label: string;
  value: string;
  interpretation: string;
}

export interface GlossaryTerm {
  term: string;
  explanation: string;
}

export interface StyleProfileSignal {
  label: string;
  value: string;
  score: number;
  explanation: string;
}

export interface SpiderComparisonAxis {
  label: string;
  hammarbyValue: string;
  opponentValue: string;
  hammarbyScore: number;
  opponentScore: number;
  note: string;
}

export interface CupSpecialSection {
  title: string;
  context: string;
  tacticalKeys: string[];
}

export interface HeadToHeadSummaryCard {
  title: string;
  value: string;
  note: string;
  tone: "emerald" | "amber" | "blue";
}

export interface HeadToHeadMeeting {
  date: string;
  fixture: string;
  result: string;
  venue: "home" | "away";
  outcome: "win" | "draw" | "loss";
  hammarbyGoals: number;
  opponentGoals: number;
  hammarbyXg: number;
  opponentXg: number;
  hammarbyShots: number;
  opponentShots: number;
  sourceUrl: string;
}

export interface HeadToHeadSection {
  sampleSize: number;
  description: string;
  summaryCards: HeadToHeadSummaryCard[];
  trendBullets: string[];
  matches: HeadToHeadMeeting[];
}

export interface PositionProfile {
  position: string;
  formation: string;
  requiredQualities: string[];
  bestFit?: string[];
  reasoning: string;
}

export interface SquadRecommendation {
  formation: string;
  formationReasoning: string;
  positions: PositionProfile[];
  rotationNotes: string[];
}

export interface PodcastNarrativeSection {
  id: string;
  title: string;
  onScreen?: string;
  narrative: string;
  beats?: string[];
}

export interface PodcastNarrative {
  intro: string;
  sections: PodcastNarrativeSection[];
  outro?: string;
}

export interface UpcomingOpponentReport {
  round: number;
  roundLabel?: string;
  fixture: string;
  dateLabel: string;
  oneLineSummary: string;
  hidden?: boolean;
  podcastNarrative?: PodcastNarrative;
  mobileTakeaways: string[];
  dataSources: string[];
  cupSpecial?: CupSpecialSection;
  headToHead?: HeadToHeadSection;
  quickStatusCards: {
    title: string;
    body: string;
    tone: "emerald" | "amber" | "blue";
  }[];
  opponentStyle: string[];
  styleProfile: StyleProfileSignal[];
  spiderComparison: SpiderComparisonAxis[];
  rankedMetrics: RankedComparisonMetric[];
  goalWindows: GoalWindowComparison[];
  goalTypeNotes: GoalTypeNote[];
  hammarbyPlan: {
    withBall: string[];
    withoutBall: string[];
    matchManagement: string[];
  };
  squadRecommendation?: SquadRecommendation;
  glossary: GlossaryTerm[];
}

export const upcomingOpponents: UpcomingOpponentReport[] = [
  {
    round: 8,
    roundLabel: "Omgång 8",
    hidden: true,
    fixture: "Hammarby - Malmö FF",
    dateLabel: "Inför 17 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season report",
    oneLineSummary:
      "Kort version: Hammarby leder många offensiva lagdata-mått i serien, medan Twelve pekar på Malmö FF:s låga försvarshöjd och svaga defensiva transitionspel som tydliga angreppspunkter.",
    mobileTakeaways: [
      "Hammarby är 2:a i tabellen (14p), Malmö FF 7:a (10p) efter 7 omgångar.",
      "Hammarby är 1:a i avslut/match och bollinnehav, samt 2:a i skott på mål/match.",
      "Malmö FF har 12 gjorda och 11 insläppta mål hittills (målskillnad +1).",
      "Hammarby producerar högre xG per match (2,09) än Malmö FF (1,45).",
      "Twelve: Malmö försvarar djupt (defensive action height 39,2 m) och återerövrar sällan inom 5 sekunder (9%).",
      "Malmö FF släpper in flest mål i tidig och sen matchfas (0-15 och 46-60).",
      "Nyckel till matchen: tryck i högt tempo och tvinga Malmö att försvara längre sekvenser utan boll.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 14 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Bolldata API: senaste 10 inbördes möten Hammarby-Malmö (matches + matches/team/stats), hämtad 14 maj 2026",
      "Twelve season report: https://reports.twelve.football/reports/malm%C3%B6-ff-season-report-BnBVWBA525.pdf (14 maj 2026)",
    ],
    headToHead: {
      sampleSize: 10,
      description:
        "Senaste 10 inbördes Allsvenska möten mellan Hammarby och Malmö FF, med resultat + underliggande matchdata.",
      summaryCards: [
        {
          title: "Resultatrad (senaste 10)",
          value: "3V-3O-4F",
          note: "Malmö leder målskillnaden 16-14 över perioden, men Hammarby har vunnit 2 av de 3 senaste.",
          tone: "amber",
        },
        {
          title: "Målprofil",
          value: "3,0 mål/match",
          note: "6 av 10 matcher gick över 2,5 mål. Båda lagen gjorde mål i 6 av 10.",
          tone: "blue",
        },
        {
          title: "Underliggande trend",
          value: "xG 0,98-1,66",
          note: "Malmö har högre snitt-xG och fler avslut i perioden (14,1 mot 10,3).",
          tone: "amber",
        },
      ],
      trendBullets: [
        "Hammarby har tagit 7 av de 9 senaste poängen mot Malmö (2 segrar, 1 oavgjord).",
        "Malmö har högre xG än Hammarby i 7 av de senaste 10 inbördes mötena.",
        "Hammarby har hållit nollan i 3 av de senaste 10 mötena.",
      ],
      matches: [
        {
          date: "2025-10-27",
          fixture: "Malmö FF - Hammarby",
          result: "1-3",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 1,
          hammarbyXg: 1.17,
          opponentXg: 1.6,
          hammarbyShots: 14,
          opponentShots: 13,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-10-27/malmo-ff-hammarby-1-3",
        },
        {
          date: "2025-04-23",
          fixture: "Hammarby - Malmö FF",
          result: "2-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 0.93,
          opponentXg: 0.65,
          hammarbyShots: 12,
          opponentShots: 9,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-04-23/hammarby-malmo-ff-2-0",
        },
        {
          date: "2024-11-02",
          fixture: "Hammarby - Malmö FF",
          result: "2-2",
          venue: "home",
          outcome: "draw",
          hammarbyGoals: 2,
          opponentGoals: 2,
          hammarbyXg: 2,
          opponentXg: 0.74,
          hammarbyShots: 13,
          opponentShots: 10,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-11-02/hammarby-malmo-ff-2-2",
        },
        {
          date: "2024-04-07",
          fixture: "Malmö FF - Hammarby",
          result: "2-0",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 0.35,
          opponentXg: 2.52,
          hammarbyShots: 6,
          opponentShots: 23,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-04-07/malmo-ff-hammarby-2-0",
        },
        {
          date: "2023-09-17",
          fixture: "Hammarby - Malmö FF",
          result: "1-3",
          venue: "home",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 3,
          hammarbyXg: 1.02,
          opponentXg: 1.48,
          hammarbyShots: 13,
          opponentShots: 9,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2023/2023-09-17/hammarby-malmo-ff-1-3",
        },
        {
          date: "2023-04-30",
          fixture: "Malmö FF - Hammarby",
          result: "4-2",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 2,
          opponentGoals: 4,
          hammarbyXg: 1.02,
          opponentXg: 2.2,
          hammarbyShots: 13,
          opponentShots: 16,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2023/2023-04-30/malmo-ff-hammarby-4-2",
        },
        {
          date: "2022-10-01",
          fixture: "Malmö FF - Hammarby",
          result: "0-0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.47,
          opponentXg: 0.9,
          hammarbyShots: 8,
          opponentShots: 10,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2022/2022-10-01/malmo-ff-hammarby-0-0",
        },
        {
          date: "2022-05-02",
          fixture: "Hammarby - Malmö FF",
          result: "0-0",
          venue: "home",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.34,
          opponentXg: 0.46,
          hammarbyShots: 8,
          opponentShots: 4,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2022/2022-05-02/hammarby-malmo-ff-0-0",
        },
        {
          date: "2021-08-29",
          fixture: "Hammarby - Malmö FF",
          result: "2-1",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 1,
          hammarbyXg: 1.74,
          opponentXg: 2.88,
          hammarbyShots: 11,
          opponentShots: 27,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2021/2021-08-29/hammarby-malmo-ff-2-1",
        },
        {
          date: "2021-04-10",
          fixture: "Malmö FF - Hammarby",
          result: "3-2",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 2,
          opponentGoals: 3,
          hammarbyXg: 0.8,
          opponentXg: 3.17,
          hammarbyShots: 5,
          opponentShots: 20,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2021/2021-04-10/malmo-ff-hammarby-3-2",
        },
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (14p), 17-5 i mål. Starkast i serien i avslut per match och bollinnehav.",
        tone: "emerald",
      },
      {
        title: "Malmö FF just nu",
        body: "7:a i tabellen (10p), 12-11 i mål. Twelve visar låg försvarshöjd och svag defensiv transition.",
        tone: "amber",
      },
      {
        title: "Viktig period",
        body: "Malmö FF har släppt in 3 mål i minut 0-15 och 3 mål i 46-60.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve beskriver Malmö som ett lag med låg blockhöjd och passivare försvarsarbete i stora delar av matcherna.",
      "I anfall växlar Malmö mellan längre bollar och bollbärande inträden i box snarare än tydlig inläggsprofil.",
      "Defensiva transitionsiffror i Twelve (bland annat recoveries within 5s på 9%) pekar på sårbarhet direkt efter bolltapp.",
      "Malmö kan ändå skapa volym i etablerat spel, men lagets totala prestationskurva är mer ojämn än Hammarbys.",
    ],
    styleProfile: [
      {
        label: "Försvarshöjd (Twelve)",
        value: "39,2 m defensive action height",
        score: 30,
        explanation: "Låg blockhöjd enligt Twelve och mer försvar nära eget mål än toppkonkurrenterna.",
      },
      {
        label: "Defensiv transition (Twelve)",
        value: "Recoveries within 5s: 9%",
        score: 25,
        explanation: "Återerövrar sällan snabbt efter bolltapp, vilket öppnar fönster för motståndaren.",
      },
      {
        label: "Direkthetsprofil (Twelve)",
        value: "Long ball 15% · field tilt 49%",
        score: 54,
        explanation: "Malmö spelar relativt direkt men utan att dominera territoriet lika tydligt.",
      },
      {
        label: "Offensiv output (Bolldata)",
        value: "xG 1,45 · 14,00 avslut/match",
        score: 66,
        explanation: "Malmö har en fungerande offensiv men ligger klart under Hammarbys volym och chansnivå.",
      },
      {
        label: "Motståndarhot (Twelve)",
        value: "Opp. np xG 1,62",
        score: 32,
        explanation: "Twelve markerar att Malmö släpper till för många kvalitativa chanser mot eget mål.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        opponentValue: "22,00",
        hammarbyScore: 100,
        opponentScore: 80,
        note: "Hammarby har högst offensiv totalvolym i serien; Malmö ligger i övre mittfält.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "17",
        opponentValue: "12",
        hammarbyScore: 89,
        opponentScore: 63,
        note: "Hammarby är tvåa i totalt gjorda mål, Malmö sexa efter sju omgångar.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        opponentValue: "1,45",
        hammarbyScore: 96,
        opponentScore: 66,
        note: "Hammarby skapar klart fler och bättre chanser per match än Malmö.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        opponentValue: "14,00",
        hammarbyScore: 100,
        opponentScore: 68,
        note: "Hammarby är etta i serien i avslut per match.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        opponentValue: "4,86",
        hammarbyScore: 95,
        opponentScore: 77,
        note: "Hammarby träffar mål oftare per match, Malmö ligger runt ligans övre mittskikt.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "69,43",
        opponentValue: "83,57",
        hammarbyScore: 69,
        opponentScore: 83,
        note: "Malmö gör fler defensiva aktioner per match, kopplat till mer tid utan boll.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "105,86",
        opponentValue: "97,71",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Hammarby är starkast i duellspelet, Malmö ligger också på en bra nivå.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "97,71",
        opponentValue: "71,86",
        hammarbyScore: 99,
        opponentScore: 73,
        note: "Hammarby vinner tillbaka bollen klart oftare per match.",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "42,9%",
        opponentValue: "28,6%",
        hammarbyScore: 100,
        opponentScore: 67,
        note: "Hammarby har fler hållna nollor hittills (3 mot Malmös 2).",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "62,3%",
        opponentValue: "50,3%",
        hammarbyScore: 100,
        opponentScore: 81,
        note: "Hammarby styr tempot via bollinnehav tydligare än Malmö.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "184,29",
        opponentValue: "139,71",
        hammarbyScore: 100,
        opponentScore: 76,
        note: "Hammarby har högst framåtriktad passningsvolym i serien.",
      },
    ],
    rankedMetrics: [
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "17",
        hammarbyRank: "2:a av 16",
        opponentValue: "12",
        opponentRank: "6:a av 16",
        note: "Hammarby ligger tydligt före Malmö i total målproduktion hittills.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        hammarbyRank: "3:a av 16",
        opponentValue: "1,45",
        opponentRank: "8:a av 16",
        note: "Hammarby skapar klart högre förväntad målproduktion.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        hammarbyRank: "2:a av 16",
        opponentValue: "4,86",
        opponentRank: "8:a av 16",
        note: "Hammarby hotar mål oftare per match än Malmö.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        hammarbyRank: "1:a av 16",
        opponentValue: "14,00",
        opponentRank: "3:a av 16",
        note: "Hammarby har tydlig volymfördel i avslut.",
      },
      {
        label: "Bollinnehav / match",
        hammarbyValue: "62,3%",
        hammarbyRank: "1:a av 16",
        opponentValue: "50,3%",
        opponentRank: "7:a av 16",
        note: "Hammarby sätter tempot med boll oftare och längre än Malmö.",
      },
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        hammarbyRank: "1:a av 16",
        opponentValue: "22,00",
        opponentRank: "6:a av 16",
        note: "Hammarby driver störst offensiv aktivitet i ligan; Malmö ligger i övre halvan.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 1, opponentConcededGoals: 3 },
      { window: "16-30", hammarbyGoals: 2, opponentConcededGoals: 1 },
      { window: "31-45+", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "46-60", hammarbyGoals: 4, opponentConcededGoals: 3 },
      { window: "61-75", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 1 },
    ],
    goalTypeNotes: [
      {
        label: "Hur Malmö släpper in mål",
        value: "10 av 11 i boxen",
        interpretation: "Merparten av insläppta mål kommer i och runt boxen, där Malmö blir straffade.",
      },
      {
        label: "Fasta/inkast bakåt (Malmö)",
        value: "5 av 11 mål",
        interpretation: "Malmö har släppt in flera mål i situationer som följer på fasta eller inkast.",
      },
      {
        label: "Nickmål bakåt (Malmö)",
        value: "0 mål",
        interpretation: "Luftduellen vid avslut har inte varit huvudproblemet; snarare timing och ytkontroll i box.",
      },
      {
        label: "Malmös mål framåt",
        value: "12 mål totalt (1,71/match)",
        interpretation: "Offensiven håller bra nivå, men med större svängningar mellan matcher än Hammarbys.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Håll hög passningsfrekvens för att dra isär Malmö och skapa centrala avslutslägen.",
        "Attackera boxen med fler andra-vågs-löpningar - Malmö släpper in majoriteten av sina mål där.",
        "Använd växelspel mellan halvrum och ytterzon för att få Malmö att försvara i längre sekvenser.",
      ],
      withoutBall: [
        "Skydda ytan bakom mittfältet direkt efter bolltapp för att minska Malmös omställningshot.",
        "Sätt tidig press på första passningen ur Malmö backlinje för att bryta deras framåtriktade progression.",
        "Lås centrala ytor i egen tredjedel och tvinga Malmö till avslut från sämre lägen.",
      ],
      matchManagement: [
        "Tryck i både inledning (0-15) och direkt efter paus (46-60), där Malmö släppt in flest mål.",
        "Behåll tålamod vid oavgjort - Hammarbys volymspel ger ofta utdelning över 90 minuter.",
        "Vid ledning: säkra mitten och andrabollen före offensiv risk för att kontrollera matchen.",
      ],
    },
    glossary: [
      {
        term: "Halvrum",
        explanation:
          "Ytan mellan mitten och kanten, ungefär mellan centrala mittfältet och ytterkorridoren.",
      },
      {
        term: "Snett-inåt-bakåt-pass",
        explanation:
          "Passning från kanten in mot ytan strax utanför straffpunkten, ofta efter att man nått kortlinjen.",
      },
      {
        term: "Andraboll",
        explanation:
          "Bollen som blir kvar efter en duell, räddning eller blockering. Ofta avgörande i boxen.",
      },
      {
        term: "Balans bakåt",
        explanation:
          "Hur laget säkrar upp bakom anfall så att motståndaren inte kan kontra med få passningar.",
      },
      {
        term: "Lagdata",
        explanation:
          "Säsongsbaserade lagmått från Bolldata (volym, effektivitet och ranking) som används för jämförelser i den här sidan.",
      },
    ],
  },
  {
    round: 15,
    roundLabel: "Omgång 15 (flyttad)",
    hidden: true,
    fixture: "GAIS - Hammarby",
    dateLabel: "Inför 22 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season insight",
    oneLineSummary:
      "Kort version: GAIS är det mest undervärderade laget i tabellen – 3:a i xP-tabellen (14 xP) men bara 9:a i poäng (9p). Högt press, direkt spel och extremt låg xGA (0,86/match) gör dem till en farligare motståndare än tabellen visar.",
    mobileTakeaways: [
      "Hammarby 2:a (17p), GAIS 9:a (9p) – men GAIS 3:a i xP-tabellen (14 xP).",
      "GAIS är obesegrade i senaste 5 matcherna (2V-3O).",
      "GAIS har ligans 4:e bästa xGA (6,87 totalt, 0,86/match) – svåra att göra mål på.",
      "GAIS spelar högt press och direkt med flest långa bollar/genomskärare i ligan (55,75/match).",
      "Twelve: GAIS counterpressar aggressivt och slår snabbt via omställningar.",
      "GAIS gör 4 av 10 mål i perioden 46-60 – farligast direkt efter paus.",
      "Nyckel: kontrollera bollinnehavet, undvik att spela rakt in i deras omställningsspel och dominera tempot.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 18 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Twelve season insight: https://reports.twelve.football/insights/how-did-gais-perform-this-season-wQ59nfcYST.pdf (18 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (17p), 21-6 i mål. 3V-2O senaste 5. Ligans starkaste offensiv (18,24 xG) och bästa hemmalag (13p, +16).",
        tone: "emerald",
      },
      {
        title: "GAIS just nu",
        body: "9:a (9p) men 3:a i xP (14!). 2V-3O senaste 5 (obesegrade). Ligans 4:e bästa defensiv per xGA.",
        tone: "amber",
      },
      {
        title: "Varning: xP-gap",
        body: "GAIS har +5 mer xP än faktiska poäng. De förtjänar fler poäng – deras prestationer har varit starka.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve beskriver GAIS som ett högt pressande lag med intensiv press – tvingar motståndare till få passningar per defensiv aktion.",
      "I anfall lutar GAIS kraftigt mot långa bollar och direktspel – 2:a i ligan i långa passningar/genomskärare (55,75/match).",
      "GAIS counterpressar aggressivt och söker omställningar direkt efter bollvinst – effektiva i transition.",
      "Penetrationen är balanserad mellan carries och inlägg – varken extremt bred eller extremt central.",
      "Defensivt har GAIS ligans 4:e lägsta xGA (0,86/match) vilket visar genuin defensiv kvalitet.",
    ],
    styleProfile: [
      {
        label: "Presshöjd (Twelve)",
        value: "Högt press med intensiv pressing",
        score: 82,
        explanation: "GAIS pressar högt och aggressivt – liknar Hammarbys egen spelstil i detta avseende.",
      },
      {
        label: "Direkthet (Bolldata)",
        value: "55,75 långa bollar+genomskärare/match (2:a i ligan)",
        score: 88,
        explanation: "GAIS spelar extremt direkt med flest långa bollar i ligan efter IFK Göteborg.",
      },
      {
        label: "Omställningshot (Twelve)",
        value: "Counter attack-profil i offensiv transition",
        score: 78,
        explanation: "Twelve pekar på en tydlig kontrings-/omställningsprofil – snabba vertikala attacker efter bollvinst.",
      },
      {
        label: "Defensiv kvalitet (Bolldata)",
        value: "xGA 0,86/match (4:e bäst i ligan)",
        score: 75,
        explanation: "Trots låg tabelplacering håller GAIS en genuin defensiv kvalitet per underliggande data.",
      },
      {
        label: "Offensiv output (Bolldata)",
        value: "xG 1,64/match · 13,75 avslut/match",
        score: 58,
        explanation: "Medelmåttig offensiv volym men skapar bra chanser per skott. Konverterar bara 8,2% av sina skott.",
      },
    ],
    spiderComparison: [
      {
        label: "Avslut / match",
        hammarbyValue: "21,50",
        opponentValue: "13,75",
        hammarbyScore: 100,
        opponentScore: 64,
        note: "Hammarby skjuter avsevärt mer – GAIS förlitar sig på färre men mer kvalitativa chanser.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,28",
        opponentValue: "1,64",
        hammarbyScore: 95,
        opponentScore: 72,
        note: "Hammarby skapar fortfarande klart fler förväntade mål per match.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "7,00",
        opponentValue: "5,13",
        hammarbyScore: 100,
        opponentScore: 73,
        note: "Hammarby når mål oftare, GAIS ligger i övre halvan.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "61,1%",
        opponentValue: "51,8%",
        hammarbyScore: 100,
        opponentScore: 85,
        note: "Hammarby dominerar bollen, GAIS ligger runt ligasnittet.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,38",
        opponentValue: "4,38",
        hammarbyScore: 100,
        opponentScore: 81,
        note: "Hammarby etta, GAIS trea – båda lagen skapar mycket via passningsspel.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,75",
        opponentValue: "79,75",
        hammarbyScore: 95,
        opponentScore: 97,
        note: "GAIS faktiskt 2:a i ligan i progressiva passningar – driver bollen framåt ofta.",
      },
      {
        label: "Långa bollar + genomskärare / match",
        hammarbyValue: "42,00",
        opponentValue: "55,75",
        hammarbyScore: 53,
        opponentScore: 100,
        note: "GAIS spelar avsevärt fler långa bollar. En tydlig stilskillnad.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,13",
        opponentValue: "0,86",
        hammarbyScore: 80,
        opponentScore: 100,
        note: "GAIS släpper till LÄGRE xG emot per match – starkare defensiv underliggande data.",
      },
      {
        label: "Framåtpassningar (%))",
        hammarbyValue: "76,9%",
        opponentValue: "70,3%",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "Hammarby har högre precision i framåtpassningar.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "21",
        opponentValue: "10",
        hammarbyScore: 100,
        opponentScore: 48,
        note: "Hammarby gör mer än dubbelt så många mål – GAIS konverterar svagt (8,2%).",
      },
      {
        label: "Konverteringsgrad (%)",
        hammarbyValue: "11,6%",
        opponentValue: "8,2%",
        hammarbyScore: 82,
        opponentScore: 58,
        note: "GAIS tar inte tillvara på sina chanser – har vunnit mer xP än poäng.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,28",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,64",
        opponentRank: "4:a av 16",
        note: "Hammarby skapar mest xG per match, GAIS ligger överraskande högt.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,13",
        hammarbyRank: "4:a av 16",
        opponentValue: "0,86",
        opponentRank: "2:a av 16",
        note: "GAIS är bättre defensivt per xGA – en potentiell utmaning.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "21,50",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,75",
        opponentRank: "6:a av 16",
        note: "Hammarbys volymfördel är markant. GAIS skjuter mer sällan.",
      },
      {
        label: "Bollinnehav",
        hammarbyValue: "61,1%",
        hammarbyRank: "1:a av 16",
        opponentValue: "51,8%",
        opponentRank: "6:a av 16",
        note: "Hammarby dominerar bollinnehavet som vanligt.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,75",
        hammarbyRank: "3:a av 16",
        opponentValue: "79,75",
        opponentRank: "2:a av 16",
        note: "GAIS ligger faktiskt före Hammarby i progressiva passningar.",
      },
      {
        label: "xP-tabell",
        hammarbyValue: "16 xP",
        hammarbyRank: "2:a av 16",
        opponentValue: "14 xP",
        opponentRank: "3:a av 16",
        note: "GAIS 3:a i xP-tabellen – har presterat på en nivå som förtjänar 14 poäng.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 2, opponentConcededGoals: 0 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Hur GAIS släpper in mål",
        value: "7 av 9 inifrån boxen",
        interpretation: "Majoriteten av insläppta mål kommer från positioner inne i straffområdet.",
      },
      {
        label: "GAIS insläppta (period)",
        value: "4 av 9 i andra halvlek",
        interpretation: "Relativt jämnt fördelat men GAIS släpper in 2 i 16-30 och 2 i 31-45+.",
      },
      {
        label: "GAIS svaga konvertering",
        value: "8,2% konverteringsgrad",
        interpretation: "GAIS skapar chanser (xG 1,64) men konverterar sämst bland topp-xG-lagen. Frustration kan uppstå.",
      },
      {
        label: "GAIS mål framåt – starkt i 2H",
        value: "8 av 10 mål i andra halvlek",
        interpretation: "GAIS gör 4 mål i 46-60 och totalt 8 av 10 i 2H. De starkaste efter paus.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Använd bollinnehavet (61%) för att trötta ut GAIS höga press – cirkulera tålmodigt och lura fram öppningar.",
        "Attackera centralt – GAIS släpper in 7 av 9 mål inifrån boxen. Använd halvrumslöpningar.",
        "Utnyttja passningstempot (86% träffsäkerhet) för att spela sig förbi GAIS press innan de hinner ställa om.",
      ],
      withoutBall: [
        "Blockera GAIS långa bollar (55,75/match) – stå högt men med djup bakom mittfältet för att fånga andrabollen.",
        "GAIS omställningsspel är deras främsta hot – undvik onödiga bolltapp i anfallshalvan.",
        "Pressa GAIS uppspel direkt – de vill slå lång snabbt efter bollvinst. Stör den första passningen.",
      ],
      matchManagement: [
        "Håll nollan i 2H: GAIS gör 8 av 10 mål i andra halvlek (4 st i 46-60). Extra fokus efter paus.",
        "Vid oavgjort vid paus: tryck direkt 46-60 när GAIS historiskt slår till. Vinn tempokampen.",
        "GAIS konverterar dåligt (8,2%) – vid ledning: tvinga dem att skjuta från sämre lägen och lita på målvakten.",
      ],
    },
    squadRecommendation: {
      formation: "4-2-3-1",
      formationReasoning:
        "Hammarbys spelstil kräver högt bollinnehav (61%), intensiv press (PPDA 3,94) och volym i avslut (21,5/match). 4-2-3-1 bibehåller vår identitet – kontroll via mittfältet, bredd via backarna, kreativitet centralt – samtidigt som dubbelankaret skyddar mot GAIS direkta omställningar.",
      positions: [
        {
          position: "Målvakt",
          formation: "MV",
          requiredQualities: [
            "Hammarbys spel: Starkt fotarbete för att starta uppspel och aktivera backlinjen i vår possessionsbaserade modell",
            "Hammarbys spel: Snabb distribution – vi vill bygga direkt efter räddning, inte slå lång",
            "Mot GAIS: Dominant i luften – GAIS slår 55+ långa bollar/match rakt in i boxen",
            "Mot GAIS: Positionering vid snabba omställningar (de söker djupled direkt efter bollvinst)",
          ],
          reasoning:
            "Målvakten är första länken i vårt uppbyggnadsspel. Mot GAIS behöver hen dessutom hantera luftbombning och snabba kontringar – men uppspelet får aldrig kompromissas.",
        },
        {
          position: "Högerback",
          formation: "HB",
          requiredQualities: [
            "Hammarbys spel: Offensiv bredd – ge bredd i anfallsfasen, överlappa och skapa 2v1 på kanten",
            "Hammarbys spel: Passningstrygghet (85%+) – stödja bollcirkulation under press",
            "Hammarbys spel: Löpkapacitet 10+ km – vår höga press kräver fysisk uthållighet",
            "Mot GAIS: Defensiv disciplin vid omställningar – inte hamna i obalans efter egna framstötar",
          ],
          reasoning:
            "I Hammarbys system är backarna offensiva nycklar som ger bredd. Mot GAIS kontringar gäller det att inte bli fångad för högt – men vi ska INTE offra offensiv bredd av rädsla.",
        },
        {
          position: "Mittbackar (2)",
          formation: "MB + MB",
          requiredQualities: [
            "Hammarbys spel: Bollspelande centralbeck – starta anfall bakifrån med progressiva passningar",
            "Hammarbys spel: Mod att driva bollen framåt när GAIS pressar (spela sig ur press)",
            "Hammarbys spel: Hög startposition – stödja vår höga press utan att tappa djup",
            "Mot GAIS: Dominant i luftdueller – vinna förstaduellen vid GAIS 55+ långa bollar/match",
            "Mot GAIS: Snabb omställning bakåt vid kontringar (GAIS söker djupled direkt)",
            "Ena CB: framåtpassare och linjebrytare. Andra CB: positionell säkring.",
          ],
          reasoning:
            "Hammarbys CB:ar är uppbyggnadens startpunkt – det är viktigare än någonsin att de vågar spela framåt under GAIS press. MEN de måste samtidigt vinna luftduellerna som kommer varje gång GAIS får bollen.",
        },
        {
          position: "Vänsterback",
          formation: "VB",
          requiredQualities: [
            "Hammarbys spel: Offensiv push – bredd i vänsterhalvrum och inlägg vid etablerat anfall",
            "Hammarbys spel: Bollsäkerhet – bidra i uppbyggnaden och cirkulationen",
            "Hammarbys spel: Löpkapacitet – understödja pressen och täcka stor yta",
            "Mot GAIS: Defensiv pålitlighet – GAIS högeryta kan exploateras vid omställningar",
            "Mot GAIS: Timing i framstötar – undvik att bli fångad i obalans vid deras kontringar",
          ],
          reasoning:
            "Samma princip som högerbacken: vår modell kräver offensiv bredd via backarna. Balansen mot GAIS kontringshot avgörs av timing och löpkapacitet, inte av att sitta kvar.",
        },
        {
          position: "Centralt mittfält (dubbelankare)",
          formation: "CDM + CDM",
          requiredQualities: [
            "Hammarbys spel: Counterpress – omedelbar press vid bolltapp (vi återerövrar inom 5s, 14% av gångerna)",
            "Mot GAIS: Andrabollsvinst – GAIS 55+ långa bollar landar här. Vinner vi andrabollen vinner vi matchen.",
            "Mot GAIS: Täcka djupled – hindra GAIS centrala löpare vid omställningar",
            "PASSNINGSROLL 1 (motorn): Hög volym (60+ passningar/match), kort-kort-kort för att sätta tempot. Styr cirkulationen, flyttar bollen sidledes snabbt och bestämmer rytmen. Hög precision (88%+) – FÅR INTE tappa enkla bollar mot GAIS counterpress.",
            "PASSNINGSROLL 1 (motorn): Progressiva passningar – driva bollen framåt vertikalt genom mittfältet med linjebrytande passnignar när ytan öppnas.",
            "PASSNINGSROLL 2 (ankaret): Positionell disciplin – säkra mittfältet och vara det trygga utspelsalternativet vid press. Enklare passningsval men felfri.",
            "PASSNINGSROLL 2 (ankaret): Recoveries och duellvinster – förstöra GAIS omställningar och vinna andrabollen. Passningen EFTER bollvinsten: snabb, säker, framåtriktad.",
            "Komplementärt par: motorn dikterar tempot med boll, ankaret skyddar utan boll. Tillsammans skapar de 86%+ passprecision och 77+ progressiva passningar/match.",
          ],
          reasoning:
            "Dubbelankaret ÄR Hammarbys spelstil. Det är härifrån vi kontrollerar matchen med 61% bollinnehav. Passningstypen avgör: motorn ska vara den som aldrig tappar bollen och styr tempot (tänk metronompassare), ankaret ska vara den som vinner duellen och sedan spelar den enkla framåtpassningen som startar anfallet. Mot GAIS är andrabollsvinsterna lika viktiga som passningarna.",
        },
        {
          position: "Offensiv mittfältare (tia)",
          formation: "AM",
          requiredQualities: [
            "Hammarbys spel: Kreativitet och nyckelpassningar (5+/match) – hjärtat i vår chansskapning",
            "Hammarbys spel: xA-produktion – den sista passningen som öppnar låst försvar",
            "Hammarbys spel: Tempo-accelerator – styra NÄR vi ökar rytmen i anfallet",
            "PASSNINGSTYP: Linjebrytare – passningar MELLAN motståndarens linjer, inte runt dem. Måste kunna hitta fickor mellan GAIS mittfält och backlinje.",
            "PASSNINGSTYP: Sista passningen in i box – passningar till straffområdet med precision och timing. xA-kvalitet i varje passningsval.",
            "PRESSROLL: Första triggern i mittfältspressen – positionerar sig mellan GAIS mittfält och backlinje för att skugga deras centrala uppspelsspelare.",
            "PRESSROLL: Stänger centrala passningsvägar – tvingar GAIS att slå lång (det vill vi, för våra CB:ar vinner luftduellerna).",
            "PRESSROLL: Vid bolltapp i anfallszon – OMEDELBAR counterpress. Tian ska vara först på bollen inom 2-3 sekunder, antingen vinna den eller fördröja GAIS omställning.",
            "Mot GAIS: Hitta mellanrum i kompakt försvar (GAIS xGA 0,86 – svårt att bryta igenom)",
          ],
          reasoning:
            "Tian har en dubbelroll: MED BOLL är hen matchvinnaren som levererar nyckelpassningar mellan linjerna (5,38/match, 1:a i ligan). UTAN BOLL är hen presstriggern som stänger GAIS centrala framspelsmöjligheter och tvingar dem att slå lång – direkt in i våra luftdominerande CB:ar. Mot GAIS kompakta block (xGA 0,86) krävs en spelare som ser passningar ingen annan ser OCH jobbar lika hårt utan boll.",
        },
        {
          position: "Högerytter / halvrum",
          formation: "RW",
          requiredQualities: [
            "Hammarbys spel: Dribbling och 1v1-kapacitet – bryta motståndarens struktur",
            "Hammarbys spel: Avslut och xG-bidrag – vi skjuter 21,5 gånger/match, kanter ska bidra",
            "Hammarbys spel: Pressarbete högt upp – första pressmomentet börjar med yttrarna",
            "Mot GAIS: Löpningar i djupled – exploatera ytan bakom GAIS höga försvarslinje",
            "Mot GAIS: Ta sig IN i boxen (7 av 9 GAIS-insläppta mål = inifrån straffområdet)",
          ],
          reasoning:
            "Hammarbys yttersspel handlar om att penetrera boxen – inte bara slå inlägg. Mot GAIS höga linje skapas extra utrymme bakom för djupledslöpningar. Kombinera det med vår 1v1-dribbling och avslutsvolym.",
        },
        {
          position: "Vänsterytter / halvrum",
          formation: "LW",
          requiredQualities: [
            "Hammarbys spel: Tempo och carries – driva bollen framåt och skapa tempoväxlingar",
            "Hammarbys spel: Bidra i uppbyggnaden – passningskvalitet för att delta i bollcirkulation",
            "Hammarbys spel: Press bakåt – del av första pressfasen, stänga ner motståndarens uppspel",
            "Mot GAIS: Exploatera ytan bakom deras höga press via snabba carries",
            "Mot GAIS: Skottförmåga från halvrum – GAIS släpper in mål centralt",
          ],
          reasoning:
            "GAIS pressar högt – det skapar ytor bakom som passar Hammarbys tempoväxlingar perfekt. Vänsteryttern ska kunna både delta i vår kontrollerade uppbyggnad OCH explodera i omställningar bakom GAIS linje.",
        },
        {
          position: "Anfallare (ensam spets)",
          formation: "ST",
          requiredQualities: [
            "Hammarbys spel: Hold-up och samband – binda mittbackar och skapa yta för framrusande mittfältare/ytter",
            "Hammarbys spel: Intelligent rörelse i boxen – vi skapar 27+ boxberöringar/match, spetsen ska vara mottagare",
            "Hammarbys spel: Pressarbete – anfallaren leder pressmomentet högt upp",
            "Hammarbys spel: Konverteringsförmåga – vi skapar 2,28 xG/match, spetsen ska leverera mål",
            "Mot GAIS: Löpningar i djupled – utnyttja ytan bakom GAIS höga presslinje",
            "Mot GAIS: Klinisk avslutning – GAIS xGA 0,86 innebär att vi får färre premium-lägen än vanligt",
          ],
          reasoning:
            "I Hammarbys system ska anfallaren vara involverad i uppspelet, pressa först och leverera mål. Mot GAIS låga xGA (0,86) kan lägena bli färre – klinisk avslutning och rörelse bakom deras höga linje blir extra avgörande.",
        },
      ],
      rotationNotes: [
        "Inhoppare 60+ (spets): fysisk profil för att utnyttja GAIS uttrötade backlinje – luftstyrka och djupledslöpningar.",
        "Inhoppare mittfält: bollsäker profil som bibehåller vårt tempo och kontroll sista 20 min vid ledning.",
        "Inhoppare kant: explosiv profil som kan avgöra 1v1 mot trötta backar – GAIS farligast 46-60, efteråt tappar de energi.",
        "Vid oavgjort sent: överväg öka bredd med en extra offensiv kantspelare – tvinga GAIS att försvara mer yta.",
      ],
    },
    glossary: [
      {
        term: "xP (Expected Points)",
        explanation:
          "Förväntade poäng baserat på xG-modellen. GAIS 14 xP vs 9 faktiska visar att de förtjänat fler poäng.",
      },
      {
        term: "Counterpress",
        explanation:
          "Att omedelbart pressa efter bolltapp för att snabbt återerövra. Både Hammarby och GAIS gör detta.",
      },
      {
        term: "Progressiva passningar",
        explanation:
          "Passningar som driver bollen framåt minst 10 meter mot motståndarens mål.",
      },
      {
        term: "Genomskärare",
        explanation:
          "Passning som bryter genom motståndarens försvarslinje – ofta en djupled bakom backlinje.",
      },
      {
        term: "Konverteringsgrad",
        explanation:
          "Andel avslut som blir mål. GAIS 8,2% indikerar att de slösar chanser.",
      },
    ],
  },
  {
    round: 9,
    roundLabel: "Omgång 9",
    hidden: true,
    fixture: "Hammarby - AIK",
    dateLabel: "Inför 25 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season report",
    oneLineSummary:
      "AIK är i uselt form (0V-2O-3F senaste 5) och har ligans lägsta passtempo (17,14). Deras defensiva transition är dock stark – de tappar bollen sällan och begränsar motståndarens snabba framstötar. Hammarby behöver forcera tempot och tvinga AIK att spela snabbare än de vill.",
    mobileTakeaways: [
      "Hammarby 2:a (17p), AIK 10:a (9p). AIK har 0V-2O-3F i senaste 5 – bottennapp.",
      "AIK har ligans lägsta passtempo (17,14) – de vill sakta ner allt. Hammarbys tempo är nyckeln.",
      "AIK tappar bollen näst minst (29,6 turnovers/match) – svårt att vinna omställningar.",
      "AIK:s defensiva transition är bäst i ligan: 1:a i att begränsa motståndaren till sista tredjedelen efter bollvinst.",
      "MEN: AIK släpper till 4,38 högkvalitetsskott/match (14:e av 16) – de är sårbara i boxen.",
      "AIK konverterar bara 8,4% av sina skott – de gör inte mål trots att de har bollen.",
      "AIK släpper in 3 mål 0-15 och 3 mål 76-90+ – sårbar tidigt och sent. Tryck där.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 21 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Twelve season report: https://reports.twelve.football/reports/aik-season-report-bkvWgR3FpH.pdf (21 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (17p), 21-8 i mål. 3V-1O-1F senaste 5. Hemmarutin: 4V-1O-0F, 19-3 i mål på Tele2.",
        tone: "emerald",
      },
      {
        title: "AIK just nu",
        body: "10:a (9p), 10-12 i mål. Bottennapp: 0V-2O-3F senaste 5. xP 10 = rätt nivå, de ÄR mediokra.",
        tone: "amber",
      },
      {
        title: "Derbymatch – men data säger klart HIF",
        body: "AIK konverterar 8,4% och skapar 0,09 xG/skott. Hammarby skapar 2,25 xG/match hemma. Stor kvalitetsskillnad.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: AIK spelar med extremt lågt passtempo (17,14 – sämst i ligan) och vill kontrollera rytmen genom tålmod.",
      "AIK bygger uppåt patient men saknar fart – de når sista tredjedelen 38% av gångerna (under snitt).",
      "Carries-fokus: AIK penetrerar boxen via dribbling (24% box entries från carries, 0,42 dribblingar/FT-possession).",
      "Defensivt: AIK faller tillbaka ELLER counterpressar beroende på situation – ingen extrem profil.",
      "Twelve: AIK har 14% final-third recoveries (bra) men bara 6,02 PPDA (passivt i press).",
    ],
    styleProfile: [
      {
        label: "Passtempo (Twelve/Bolldata)",
        value: "17,14 pass/min possession – SÄMST i ligan",
        score: 15,
        explanation: "AIK spelar extremt långsamt. De vill döda tempot och kontrollera matchen utan fart.",
      },
      {
        label: "Defensiv transition (Twelve)",
        value: "29,6 turnovers/match (2:a bäst) · 1:a i opp. FT inom 10s",
        score: 85,
        explanation: "AIK:s största styrka. De tappar sällan bollen och stänger ner motståndarens omställningar effektivt.",
      },
      {
        label: "Offensiv konvertering (Bolldata)",
        value: "8,4% konverteringsgrad · 0,09 xG/skott",
        score: 20,
        explanation: "AIK skapar chanser med låg kvalitet och konverterar dåligt. Ineffektiva framför mål.",
      },
      {
        label: "Bollinnehav (Bolldata)",
        value: "56,0% – 2:a i ligan",
        score: 72,
        explanation: "AIK vill ha bollen men gör lite med den. Possession utan penetration.",
      },
      {
        label: "Sårbarhet i box (Twelve)",
        value: "4,38 HQ-skott/match emot (14:e av 16)",
        score: 25,
        explanation: "Trots disciplinerat försvarsspel släpper AIK till många farliga chanser inne i boxen.",
      },
    ],
    spiderComparison: [
      {
        label: "Avslut / match",
        hammarbyValue: "20,89",
        opponentValue: "13,38",
        hammarbyScore: 100,
        opponentScore: 64,
        note: "Hammarby skjuter 56% mer per match. Stor volymfördel.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,25",
        opponentValue: "1,42",
        hammarbyScore: 95,
        opponentScore: 60,
        note: "Hammarby skapar 58% mer xG per match. AIK:s chanser är lågkvalitativa.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,67",
        opponentValue: "6,13",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Närmare än förväntat – AIK skjuter på mål ofta men med låg xG/skott.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "61,1%",
        opponentValue: "56,0%",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Båda lagen vill ha bollen. Tempokampen avgör vem som dominerar.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,22",
        opponentValue: "17,14",
        hammarbyScore: 95,
        opponentScore: 30,
        note: "Hammarby spelar 12% snabbare. AIK vill sänka tempot – vi måste tvinga upp det.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,11",
        opponentValue: "66,75",
        hammarbyScore: 90,
        opponentScore: 55,
        note: "Hammarby driver bollen framåt oftare. AIK är mer laterala.",
      },
      {
        label: "Konverteringsgrad",
        hammarbyValue: "10,6%",
        opponentValue: "8,4%",
        hammarbyScore: 70,
        opponentScore: 45,
        note: "Ingen av lagen konverterar bra, men Hammarby har volymfördel som kompenserar.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,30",
        opponentValue: "1,54",
        hammarbyScore: 75,
        opponentScore: 60,
        note: "AIK släpper till mer xG emot – defensivt sårbarare i boxen.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,00",
        opponentValue: "3,13",
        hammarbyScore: 100,
        opponentScore: 63,
        note: "Hammarby skapar betydligt fler nyckelpassningar. Kreativ fördel.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "34,22",
        opponentValue: "29,62",
        hammarbyScore: 60,
        opponentScore: 85,
        note: "AIK tappar bollen MER SÄLLAN. Deras disciplin gör det svårt att vinna omställningar.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,25",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,42",
        opponentRank: "7:a av 16",
        note: "Hammarby skapar mest xG i ligan. AIK ligger under snittet.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,22",
        hammarbyRank: "5:a av 16",
        opponentValue: "17,14",
        opponentRank: "16:e av 16",
        note: "AIK SIST. Deras lägsta tempo i ligan gör dem förutsägbara. Vi måste forcera.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "34,22",
        hammarbyRank: "8:a av 16",
        opponentValue: "29,62",
        opponentRank: "2:a av 16",
        note: "AIK tappar bollen näst minst. Svårt att vinna via omställningar – pressa smartare.",
      },
      {
        label: "HQ-skott emot / match",
        hammarbyValue: "2,56",
        hammarbyRank: "4:a av 16",
        opponentValue: "4,38",
        opponentRank: "14:e av 16",
        note: "AIK släpper till MÅNGA farliga skott. Deras box-försvar är en tydlig svaghet.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,89",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,38",
        opponentRank: "6:a av 16",
        note: "Hammarbys avslutsvolym är suverän. AIK:s defensiv ska utsättas för denna volym.",
      },
      {
        label: "Konverteringsgrad",
        hammarbyValue: "10,6%",
        hammarbyRank: "10:e av 16",
        opponentValue: "8,4%",
        opponentRank: "13:e av 16",
        note: "Varken Hammarby eller AIK konverterar bra. Volym avgör – och där leder Hammarby.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 2, opponentConcededGoals: 3 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 0 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 3 },
    ],
    goalTypeNotes: [
      {
        label: "Hur AIK släpper in mål",
        value: "12 av 12 inifrån boxen eller via straff/frispark",
        interpretation: "Alla mål AIK släpper in kommer från centrala/nära positioner. Penetrera boxen = mål.",
      },
      {
        label: "AIK sårbar tidigt & sent",
        value: "3 insläppta 0-15, 3 insläppta 76-90+",
        interpretation: "Hammarbys starkaste perioder (61-75: 5 mål, 76-90+: 4 mål) matchar AIK:s svagheter perfekt.",
      },
      {
        label: "AIK:s usla konvertering",
        value: "8,4% (13:e av 16)",
        interpretation: "AIK gör nästan aldrig mål. 10 mål på 107 skott. Stress dem och de konverterar ännu sämre.",
      },
      {
        label: "AIK:s mål framåt",
        value: "10 mål (1,25/match) – 3 i 16-30",
        interpretation: "AIK gör flest mål 16-30. Håll koncentrationen där men annars låg fara.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Forcera tempot OMEDELBART. AIK vill sakta ner (17,14 pass/min) – vi spelar i vårt tempo (19,22) och tvingar dem att springa.",
        "Använd Besara centralt som tempo-accelerator – snabba vertikala bollar mellan linjerna innan AIK hinner sätta sig.",
        "Attackera boxen med volym – AIK släpper in 4,38 HQ-skott/match (14:e i ligan). Fler avslut = fler mål.",
        "Breed spel via backarna för att dra isär AIK:s block – de försvarar centralt men utan intensitet (6,20 def. intensity).",
      ],
      withoutBall: [
        "Pressa HÖGT men SMART – AIK tappar bollen sällan (29,6/match). Pressa första passningen, inte desperat.",
        "Stäng av AIK:s carries/dribblingar – de penetrerar via individuella löpningar (24% box entries från carries).",
        "INTE spela rakt in i deras transition-styrka. Kontrollera bolltappens position – tappa hellre djupt än högt.",
        "Lärdomar från GAIS: 44 turnovers = döden. Mot AIK max 30 – bollsäkerhet i vårt eget uppspel.",
      ],
      matchManagement: [
        "0-15: tryck DIREKT. AIK släpper in 3 mål i öppningen. Sätt ton och ta ledningen tidigt.",
        "76-90+: AIK släpper in 3 mål sent. Behåll intensiteten och slå till vid trötthet.",
        "Vid ledning: AIK konverterar 8,4% – lita på att de INTE gör mål. Kontrollera bollen.",
        "Derbykontroll: håll disciplinen. Inget rött kort (lärdom från GAIS). Ingen onödig risk.",
      ],
    },
    glossary: [
      {
        term: "Passtempo",
        explanation:
          "Antal passningar per minut med bollen. AIK:s 17,14 är sämst i ligan – de vill döda tempot.",
      },
      {
        term: "Turnovers",
        explanation:
          "Bollförluster per match. AIK:s 29,6 (2:a bäst) gör det svårt att vinna via transitions.",
      },
      {
        term: "HQ-skott (High opportunity shots)",
        explanation:
          "Skott med >0,15 xG. AIK släpper 4,38 sådana per match = 14:e av 16 = sårbar.",
      },
      {
        term: "Defensive transition",
        explanation:
          "Vad som händer direkt efter bolltapp. AIK:s styrka: begränsar motståndarens framstötar.",
      },
      {
        term: "Carries/bollbärande",
        explanation:
          "AIK:s primära penetrationsmetod – enskilda spelare som bär bollen in i boxen.",
      },
    ],
  },
  {
    round: 10,
    roundLabel: "Omgång 10",
    hidden: true,
    fixture: "BK Häcken - Hammarby",
    dateLabel: "Inför 31 maj 2026 · uppdaterad med Twelve season reports + Bolldata lagdata",
    oneLineSummary:
      "Häcken är obesegrade (17p på 9 matcher) och överkonverterar sina chanser (1,78 mål vs 1,59 xG). Deras anfallsspel bygger på inlägg från kanterna – 42% av deras box entries kommer via inlägg. Hammarby har massiv fördel i press (PPDA 4,20 vs 6,00), field tilt (70% vs 49%) och skottvolym (20,6 vs 13,4).",
    mobileTakeaways: [
      "Häcken 2:a-3:a (~17p), Hammarby ~17p. Tät tabell i toppen.",
      "Häcken OBESEGRADE i 9 matcher – men flest oavgjorda i toppen (4 kryss). xP bara 1,64 = de överavkastnar.",
      "Häcken lever på inlägg: 0,49 inlägg/FT-possession (extremt högt) och 42% box entries via inlägg.",
      "Häcken sitter djupt: DAH 40,11m (lågt) men vinner 62% av sina defensiva dueller.",
      "Häcken tappar bollen MYCKET: 35,78 turnovers/match – exploaterbart med Hammarbys omställningar.",
      "Hammarby dominerar i press: PPDA 4,20 (1:a-klass) vs Häckens 6,00. Pressa deras uppspel.",
      "Hammarby har 70% field tilt vs Häckens 49% – vi ska äga sista tredjedelen.",
    ],
    dataSources: [
      "Twelve season report: https://reports.twelve.football/reports/h%C3%A4cken-season-report-RGe9Sn86Hx.pdf (27 maj 2026)",
      "Twelve season report: https://reports.twelve.football/reports/hammarby-season-report-XDTqQYpAHQ.pdf (27 maj 2026)",
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 27 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "~17p, 22-10 i mål. 5V-2O-3L senaste 10 (inkl. GAIS-förlust och AIK-derby). Starkt försvar (1,0 insläppta/match).",
        tone: "emerald",
      },
      {
        title: "Häcken just nu",
        body: "~17p på 9 matcher, OBESEGRADE. 1,89 mål/match men bara 1,59 xG – överkonverterar. Dalande anfallsform senaste matcherna.",
        tone: "amber",
      },
      {
        title: "Nyckelkamp: press vs inlägg",
        body: "Hammarbys höga press (PPDA 4,20) mot Häckens inläggsfokus (42% box entries). Blockera vägarna ut till kanterna = stryp deras anfallsspel.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: Häcken förlitar sig tungt på inlägg – 0,49 inlägg per FT-possession och 42% av box entries via inlägg (ligans mest inläggsberoende lag).",
      "Häcken bygger upp bakifrån (52% buildup from goalkick) men når sista tredjedelen bara 35% av gångerna (under snitt).",
      "Direkta attacker: 30% av skotten kommer via snabba, raka anfall – de söker inte tålmodig uppbyggnad.",
      "Defensivt: Häcken sitter relativt djupt (DAH 40,11m) med passivare press (PPDA 6,00). Faller hellre tillbaka än counterpressar.",
      "Twelve: Häcken har bara 10% recoveries within 5s – de är LÅNGSAMMA att återerövra bollen efter bolltapp.",
    ],
    styleProfile: [
      {
        label: "Inläggsberoende (Twelve)",
        value: "0,49 inlägg/FT-poss · 42% box entries via inlägg",
        score: 85,
        explanation: "Häckens mest utpräglade drag. Alla anfall söker vägarna ut till kanterna för att slå in bollar i boxen.",
      },
      {
        label: "Turnovers (Twelve)",
        value: "35,78/match – bland de högsta i ligan",
        score: 25,
        explanation: "Häcken tappar bollen ofta. Hammarbys omställningsspel bör kunna exploatera detta.",
      },
      {
        label: "Konvertering (Twelve)",
        value: "np Goals 1,78 vs np xG 1,59 · 12% överkonvertering",
        score: 75,
        explanation: "Häcken gör fler mål än xG motiverar – effektiva framför mål men svårt att hålla i längden.",
      },
      {
        label: "Defensiv höjd (Twelve)",
        value: "DAH 40,11m – sitter djupt",
        score: 40,
        explanation: "Häcken möter inte pressen högt. De faller tillbaka och försöker kontrollera med struktur snarare än intensitet.",
      },
      {
        label: "Field tilt (Twelve)",
        value: "49% – under snitt",
        score: 40,
        explanation: "Häcken dominerar INTE sista tredjedelen. Balanserat till motståndarens fördel offensivt.",
      },
    ],
    spiderComparison: [
      {
        label: "xG / match",
        hammarbyValue: "2,26",
        opponentValue: "1,67",
        hammarbyScore: 100,
        opponentScore: 62,
        note: "Hammarby skapar 35% mer xG per match. Tydlig kvalitetsfördel i chanskreation.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,60",
        opponentValue: "13,44",
        hammarbyScore: 100,
        opponentScore: 55,
        note: "Hammarby skjuter 53% mer per match – massiv volymfördel.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "62%",
        opponentValue: "52%",
        hammarbyScore: 100,
        opponentScore: 65,
        note: "Hammarby dominerar bollen. Häcken behöver inte bollen för att vara farliga.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,33",
        opponentValue: "19,28",
        hammarbyScore: 80,
        opponentScore: 78,
        note: "Nästan identiskt tempo – inte tempot som avgör utan PRESSEN och YTAN.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "70%",
        opponentValue: "49%",
        hammarbyScore: 100,
        opponentScore: 40,
        note: "Hammarbys STÖRSTA fördel. 70% vs 49% = vi ska leva i deras planhalva.",
      },
      {
        label: "PPDA (press)",
        hammarbyValue: "4,20",
        opponentValue: "6,00",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby pressar MYCKET hårdare. Häckens passiva press ger oss utrymme att bygga.",
      },
      {
        label: "Boxberöringar / match",
        hammarbyValue: "29,40",
        opponentValue: "21,33",
        hammarbyScore: 100,
        opponentScore: 60,
        note: "Hammarby penetrerar boxen 38% oftare – mer direkta chanser.",
      },
      {
        label: "HQ-skott / match",
        hammarbyValue: "4,70",
        opponentValue: "3,56",
        hammarbyScore: 90,
        opponentScore: 65,
        note: "Hammarby skapar fler farliga chanser per match.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "31,70",
        opponentValue: "35,78",
        hammarbyScore: 75,
        opponentScore: 55,
        note: "Häcken tappar bollen mer – Hammarbys omställningar ska straffa varje bolltapp.",
      },
      {
        label: "Def. intensitet",
        hammarbyValue: "7,47",
        opponentValue: "6,51",
        hammarbyScore: 95,
        opponentScore: 60,
        note: "Hammarby jobbar hårdare utan boll. Häcken mer avvaktande defensivt.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,26",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,67",
        opponentRank: "~5:a av 16",
        note: "Hammarby skapar mest xG i ligan. Häcken genomsnittligt offensivt.",
      },
      {
        label: "PPDA",
        hammarbyValue: "4,20",
        hammarbyRank: "~1:a av 16",
        opponentValue: "6,00",
        opponentRank: "~10:e av 16",
        note: "Hammarby pressar intensivast. Häckens passivare press ger oss fritt uppspel.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "70%",
        hammarbyRank: "~1:a av 16",
        opponentValue: "49%",
        opponentRank: "~10:e av 16",
        note: "Hammarby dominerar sista tredjedelen totalt. Häcken under snittet.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "31,70",
        hammarbyRank: "~5:a av 16",
        opponentValue: "35,78",
        opponentRank: "~13:e av 16",
        note: "Häcken tappar bollen ofta. Hammarbys höga recoveries (40,5/match) ska exploatera detta.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,60",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,44",
        opponentRank: "~8:a av 16",
        note: "Hammarbys avslutsvolym är bäst i ligan. Häcken skjuter under snittet.",
      },
      {
        label: "Konverteringsgrad (np Goals/np xG)",
        hammarbyValue: "0,96",
        hammarbyRank: "~8:a av 16",
        opponentValue: "1,12",
        opponentRank: "~4:a av 16",
        note: "Häcken konverterar BÄTTRE än förväntat. De gör mål av lite – farligt om de får chanser.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Häckens inläggsberoende",
        value: "42% box entries via inlägg, bara 15% via carries",
        interpretation: "Stäng kanterna och blockera inlägg = eliminera deras primära angreppssätt.",
      },
      {
        label: "Häcken överkonverterar",
        value: "1,78 np mål vs 1,59 np xG (12% över förväntan)",
        interpretation: "Inte hållbart. Begränsa deras chanser och regressionen gör jobbet åt oss.",
      },
      {
        label: "Häcken tappar bollen mycket",
        value: "35,78 turnovers/match · bara 10% recovery within 5s",
        interpretation: "Hammarbys omställningsspel (0,91 xT via transition) ska straffa slarvet. Press högt vid bolltapp.",
      },
      {
        label: "Häckens sjunkande anfallsform",
        value: "Twelve: 'significant decline' i anfallsproduktion senaste matcherna",
        interpretation: "Häcken är i dalande form offensivt – pressa tidigt och tvinga dem att jaga.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Exploatera field tilt-fördelen (70% vs 49%). Dominera sista tredjedelen och håll bollen där. Häcken har inte strukturen att pressa ut oss.",
        "Attackera CENTRALT. Häcken försvarar brett för att möta inlägg – deras centrala ytor bör vara öppna. Box entries via carries (21%) och kombinationsspel.",
        "Hammarbys boxberöringar (29,4/match) mot Häckens 21,3 – volymfördelen ska skapa HQ-skott. Sikta på 5+ HQ-skott.",
        "Tålamod i uppspelet. Häcken faller tillbaka (DAH 40,11m) – bygg upp lugnt och sök vertikala passningar genom mittfältet.",
      ],
      withoutBall: [
        "Press FULLT UT. PPDA 4,20 vs 6,00 – vi pressar nästan 50% hårdare. Stör deras uppspel och forcera deras 35,78 turnovers/match.",
        "BLOCKERA INLÄGGEN. Häckens 42% box entries via inlägg är deras livsnerv. Halvbacks och ytterbackar måste stänga de yttre banorna.",
        "Exploatera Häckens bolltapp (35,78/match). Hammarbys 40,5 recoveries/match och 0,91 xT via transition – kontra DIREKT vid varje turnover.",
        "Häcken recoverar bara 10% within 5s – efter bolltapp tar det lång tid för dem att organisera sig. Press omedelbart.",
      ],
      matchManagement: [
        "Hammarby gör flest mål 61-75 (5 mål) och 76-90+ (4 mål). Behåll intensiteten sent – Häckens defensiv tröttnar.",
        "Häcken konverterar bra (1,78 vs 1,59 xG) – ge dem INGA billiga chanser. Kontrollera matchen snarare än öppna den.",
        "Vid ledning: Häckens passivitet (PPDA 6,00) gör att de inte kan pressa effektivt för att vända. Kontrollera bollen.",
        "Bortamatch – men Hammarby har starkt på bortaplan (1V-2O-1L senaste 4 borta). Spela vårt spel, inte deras.",
      ],
    },
    glossary: [
      {
        term: "Field tilt",
        explanation:
          "Andel av possessionerna i sista tredjedelen. Hammarbys 70% vs Häckens 49% visar hur mycket vi dominerar i anfallarean.",
      },
      {
        term: "PPDA (Passes Per Defensive Action)",
        explanation:
          "Hur många pass motståndaren tillåts spela innan vi gör en defensiv aktion. Hammarbys 4,20 = extremt aggressiv press.",
      },
      {
        term: "Box entries from crosses",
        explanation:
          "Andel av box-penetrationerna som sker via inlägg. Häckens 42% visar deras extrema beroende av kantspel.",
      },
      {
        term: "Turnovers",
        explanation:
          "Bollförluster per match. Häckens 35,78 gör dem exponerade för omställningar – Hammarbys styrka.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder. Häckens 10% innebär att de är långsamma att reagera efter bolltapp.",
      },
    ],
  },
  {
    round: 11,
    roundLabel: "Omgång 11",
    hidden: false,
    fixture: "IF Elfsborg - Hammarby",
    dateLabel:
      "Inför 5 juli 2026 · uppdaterad med Bolldata lagdata + Twelve säsongrapport + Rydström-special",
    oneLineSummary:
      "Borta i Borås möter Hammarby ett Elfsborg som ligger en poäng före i tabellen – men skjuter minst i hela Allsvenskan. Vi dominerar lagdata offensivt, de lever på disciplin efter bolltapp. Och så är det Rydströms första riktiga test som Hammarby-tränare.",
    podcastNarrative: {
      intro:
        "Vi går igenom Elfsborg inför omgång elva – borta i Borås den femte juli. Följ med på skärmen om du tittar, annars räcker det att lyssna: varje del börjar med vad du ser, sedan vad du kan säga.",
      sections: [
        {
          id: "hook",
          title: "1. Inledning – vad handlar matchen om?",
          onScreen: "Matchrubrik, datum och den korta ingressen högst upp.",
          narrative:
            "Det här är en toppmatch i tabellens mitt – men den känns större än så. Elfsborg ligger trea med arton poäng. Hammarby fyra med sjutton. En poäng emellan, med Sirius och Häcken ovanför oss. På pappret ska vi skapa mer – men Elfsborg har bara förlorat en match på elva omgångar. De vinner inte genom att dominera, de vinner genom att vara svåra att bryta ner.",
        },
        {
          id: "status",
          title: "2. Läget just nu",
          onScreen: "Tre statuskort: Hammarby, Elfsborg och nyckelkampen press mot disciplin.",
          narrative:
            "Titta på de tre korten. Hammarby har tjugofyra gjorda och tretton insläppta – vi leder ligan i förväntade mål, i skott och i hur mycket av spelet vi lägger i deras planhalva. Men vi släpper också mer än vi gjorde förra året defensivt. Elfsborg har sexton gjorda och elva insläppta – färre matcher vunnna, men nästan aldrig slagna. Deras grej är inte anfallsvolym. De skjuter tio gånger per match – sist i hela ligan. Istället är de tredje bäst i defensiv transition: alltså hur snabbt och smart de ställer om när de tappar bollen. Det tredje kortet sammanfattar matchens kärna: vår hårda press mot deras organiserade försvar.",
          beats: [
            "Hammarby: offensiv dominans i data, svagare defensivt än 2025.",
            "Elfsborg: få skott, få förluster, stark efter bolltapp.",
            "Matchen: kan vi bryta ner ett lag som nästan aldrig imploderar?",
          ],
        },
        {
          id: "rydstrom",
          title: "3. Rydström-special",
          onScreen: "Sektionen Rydström-special med kontext och punktlista.",
          narrative:
            "Här blir det personligt. Henrik Rydström tillträdde som Hammarby-tränare i vår efter Kalle Karlsson – kontrakt till tjugohundratjugoåtta, Theo Olsson som assisterande. Han kommer senast från Columbus Crew och är känd för tydligt ledarskap och höga krav. Elfsborg borta är inte vilken match som helst: det är första gången vi verkligen får se om hans modell får våra redan starka lagdata att bli poäng. Samtidigt har Elfsborg ny tränare i Björn Hamberg. Två nya huvudmän, två lag som fortfarande formas. Rydström behöver inte riva upp Hammarbys spel – vi leder redan i xG, field tilt och press. Frågan är beslutsfattandet i sista tredjedelen, och om han hinner lägga om efter Häcken-förlusten. Elfsborg passar hans idé: de vill spela utan boll, vi ska tvinga dem att försvara länge. Men tappa inte bollen dumt centralt – då slår deras omställningsspel till.",
        },
        {
          id: "h2h",
          title: "4. Inbördes möten",
          onScreen: "Tabell med senaste tio möten, tre sammanfattningskort och trendpunkter.",
          narrative:
            "Scrolla till inbördes möten om du vill ha detaljerna. Kort sagt: Hammarby har vunnit sex, oavgjort två och förlorat två av de senaste tio – sexton mot nio i mål. Vi har tagit poäng i åtta av tio. Senaste två mötena? Tre–noll hemma i november och två–noll borta i maj – båda med tydlig fördel i förväntade mål och i skott. Men kolla det gula kortet: i Borås är det jämnare historiskt. Senaste fem bortamatcherna där är det en seger, två oavgjorda och två förluster. Senaste hemmasegern Elfsborg tog mot oss i Borås var två–noll sommaren tjugotjugotre. Så: vi äger serien nyligen, men Ryavallen ska respekteras.",
        },
        {
          id: "opponent",
          title: "5. Så spelar Elfsborg",
          onScreen: "Stapeldiagram per spelstil och punktlistan under.",
          narrative:
            "Nu motståndarprofilen. Elfsborg har fyrtiofem procent bollinnehav och fyrtiosex procent field tilt – de jagar inte territorium, de står kompakt och väntar. Deras starkaste fas är defensiv transition: tredje bäst i ligan, och de släpper bara noll komma tjugoett i förväntat mål inom tio sekunder efter att de fått tillbaka bollen. Anfallet är svagt på papper – trettonde av sexton – med ligans lägsta skottvolym. De pressar sällan: PPDA sju komma tjugo betyder att vi får tid att bygga. Nyckelspelare att nämna: Leo Östman fyra mål, Arbër Zeneli tre, Frederik Ihler två. Holmén är avstängd – det kan öppna luckor centralt.",
        },
        {
          id: "data",
          title: "6. Siffrorna – spindel och nyckeltal",
          onScreen: "Spindeldiagrammet Bolldata och rutnätet med rankade nyckeltal.",
          narrative:
            "Här blir det tydligt visuellt. Spindeldiagrammet från Bolldata: Hammarby sticker ut på anfall – nästan dubbelt så många avslut per match, betydligt högre xG, mer bollinnehav. Elfsborg är starkare på defensiva aktioner per match – logiskt när de försvarar mer. I nyckeltalen med Twelve-ranking ser du samma bild: vi är etta i xG, skott, bollinnehav, field tilt, PPDA och boxberöringar. Elfsborg är tolfte till sextonde på det mesta offensivt, men sexa i hur lite de släpper – motståndarnas xG är bara ett komma tjugofem per match. Det är matchens paradox: vi ska dominera bollen mot ett lag som är byggt för att överleva dominans.",
          beats: [
            "Hammarby etta i xG (2,16), avslut (20) och field tilt (70 %).",
            "Elfsborg sista i skottvolym (10 per match), stark i defensiv transition.",
            "PPDA 4,19 mot 7,20 – vi pressar, de står lågt.",
          ],
        },
        {
          id: "timing",
          title: "7. När ska vi slå till?",
          onScreen: "Tidsfönster för mål och målprofil-korten.",
          narrative:
            "Titta på måltiderna. Elfsborg gör elva av sexton mål efter paus – bara fem före halvtid. De vaknar i andra halvlek, särskilt sent: fyra mål mellan sjuttisex och nittio plus. Hammarby gör mest mellan trettioförsta och sextionde minuten – fem mål strax före paus och fem direkt efter. Det betyder: första halvlek kan kännas frustrerande om vi inte gör mål, men ge inte upp. Och Rydström måste ha halvtidsplanen klar – Elfsborg kommer. Begränsa deras få chanser så räcker det; de skapar sällan men är effektiva när de väl gör det.",
        },
        {
          id: "plan",
          title: "8. Matchplanen",
          onScreen: "Tre kolumner: med boll, utan boll och matchmanagement.",
          narrative:
            "Avsluta med planen – tre kolumner på skärmen. Med boll: utnyttja att de pressar passivt, bygg lugnt, attackera brett och centralt, och ha tålamod tills blocket spricker. Vi når straffområdet nästan dubbelt så ofta som de – det ska märkas. Utan boll: pressa deras uppspel hårt, stäng av Zeneli och Östman, och ge inga lätta kontringar. De tappar bollen ofta men organiserar sig snabbt. Matchmanagement: det här är ett tålamodsprov – Elfsborg har bara en förlust. Ledning ska utnyttjas, de måste jaga. Oavgjort sent? Stäng defensivt, de är farliga i slutminuterna. Och ja – en seger här sätter tonen för Rydströms höst.",
        },
      ],
      outro:
        "Sammanfattning på trettio sekunder kommer direkt under manuset om du vill avsluta snabbt. Nu vet du vad som visas – och vad du kan berätta.",
    },
    mobileTakeaways: [
      "Elfsborg trea, Hammarby fyra – en poäng emellan. Sirius leder, Häcken tvåa.",
      "Elfsborg skjuter minst i ligan men har bara en förlust på elva matcher.",
      "Hammarby leder i xG, skott, field tilt och press – Elfsborg i disciplin efter bolltapp.",
      "Elfsborg gör elva av sexton mål efter paus – andra halvlek avgörande.",
      "Inbördes: sex–två–två senaste tio. Senast tre–noll hemma och två–noll borta.",
      "Rydström mot Hamberg – två nya tränare, första riktiga testet för Henrik.",
      "Nyckeln: pressa uppspelet, dominera territorium, tappa inte bollen dumt centralt.",
    ],
    dataSources: [
      "Twelve säsongrapport Elfsborg (delad): https://earpiece.twelve.football/shared-reports/96d790ae-d5bb-4f51-8f2c-71b249b0ccdc (1 juli 2026)",
      "Twelve säsongrapport Hammarby: https://reports.twelve.football/reports/hammarby-season-report-9FKTw5a6Xg.pdf (1 juli 2026)",
      "Twelve säsongdata Hammarby 2026: hammarbySeasonAnalysisData.ts (11 omgångar)",
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 1 juli 2026)",
      "Bolldata API: matches + team-advanced för Allsvenskan 2026 (11 omgångar)",
      "Bolldata API: goals för minutfönster och målprofil",
      "Bolldata API: senaste 10 inbördes möten Hammarby-Elfsborg (hämtad 1 juli 2026)",
    ],
    cupSpecial: {
      title: "Rydström-special: ny tränare, första riktiga testet",
      context:
        "Henrik Rydström tillträdde som Hammarbys huvudtränare i vår 2026 efter Kalle Karlsson, med kontrakt till 2028 och Theo Olsson som assisterande. Rydström kommer senast från Columbus Crew och är känd för tydligt ledarskap, höga träningskrav och strukturerat bollinnehav inom ramen för klubbens spelidé. Elfsborg borta blir ett tidigt riktmärke: kan Rydström få Hammarbys redan dominanta lagdata (ligans bästa xG och avslutsvolym) att omsättas i poäng mot ett lag som bara förlorat en match? Samtidigt har Elfsborg ny manager i Björn Hamberg – två nya tränare som fortfarande formar sina lag.",
      tacticalKeys: [
        "Rydströms Hammarby bör INTE ändra grundprofilen drastiskt – Twelve visar 1:a plats i xG, field tilt och PPDA. Fokus på beslutsfattande i sista tredjedelen.",
        "Elfsborg utan boll (45% possession, Twelve) passar Rydströms filosofi – tvinga dem att försvara långa sekvenser mot våra 70% field tilt.",
        "Risk med tränarbyte: kort förberedelsetid efter Häcken-förlusten (3-2). Rydström måste balansera sin spelmodell mot matchintensitet direkt.",
        "Elfsborgs styrka är defensiv transition (3:a i ligan) – Hammarby får inte tappa boll i farliga lägen. Kontrollera tempot, undvik onödiga risker centralt.",
        "Rydström har erfarenhet av Allsvenskan och europeiskt spel – förväntas höja kraven i matchförberedelse och halvtidssnack. Andra halvlek kan bli avgörande (Elfsborg gör 69% av sina mål efter paus).",
        "Båda tränarna är nya – Hamberg har byggt Elfsborgs disciplinerade mittblock, Rydström ska få Hammarbys offensiva dominans att bita. Den som imponerar taktiskt vinner matchen.",
      ],
    },
    headToHead: {
      sampleSize: 10,
      description:
        "Hammarby har dominerat inbördes möten de senaste åren – 6 segrar, 2 oavgjorda och 2 förluster i senaste 10 mötena. Totalt 16-9 i mål. Hammarby har vunnit de två senaste (3-0 hemma nov 2025, 2-0 borta maj 2025) med tydlig xG-fördel.",
      summaryCards: [
        {
          title: "Senaste 10 möten",
          value: "6V-2O-2F (HIF)",
          note: "16-9 i mål. Hammarby har tagit poäng i 8 av 10.",
          tone: "emerald",
        },
        {
          title: "Senaste bortamatch",
          value: "0-2 (maj 2025)",
          note: "Hammarby vann i Borås med 1,55 xG mot Elfsborgs 0,80. 21-8 i avslut.",
          tone: "emerald",
        },
        {
          title: "Borta i Borås totalt",
          value: "1V-2O-2F senaste 5",
          note: "Bortamatcherna är jämnare – senaste hemmaseger i Borås var 2-0 (2023).",
          tone: "amber",
        },
      ],
      trendBullets: [
        "Hammarby har vunnit 4 av senaste 5 inbördes möten (ett oavgjort 0-0 sep 2024).",
        "Senaste två mötena: totalt 5-0 till Hammarby med underliggande xG-fördel i båda.",
        "Elfsborgs senaste hemmaseger mot HIF: 2-0 i juli 2023.",
        "Hammarby skapar konsekvent mer – i snitt 14,6 avslut/match vs Elfsborgs 11,9 i de 10 senaste mötena.",
      ],
      matches: [
        {
          date: "2025-11-09",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.668,
          opponentXg: 0.2776,
          hammarbyShots: 19,
          opponentShots: 5,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2025/2025-11-09/hammarby-elfsborg-3-0",
        },
        {
          date: "2025-05-31",
          fixture: "Elfsborg - Hammarby",
          result: "0-2",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.55,
          opponentXg: 0.8041,
          hammarbyShots: 21,
          opponentShots: 8,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2025/2025-05-31/elfsborg-hammarby-0-2",
        },
        {
          date: "2024-09-22",
          fixture: "Elfsborg - Hammarby",
          result: "0-0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.6166,
          opponentXg: 0.5577,
          hammarbyShots: 11,
          opponentShots: 10,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-09-22/elfsborg-hammarby-0-0",
        },
        {
          date: "2024-04-15",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.433,
          opponentXg: 1.144,
          hammarbyShots: 12,
          opponentShots: 17,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-04-15/hammarby-elfsborg-3-0",
        },
        {
          date: "2023-08-13",
          fixture: "Hammarby - Elfsborg",
          result: "1-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 1,
          opponentGoals: 0,
          hammarbyXg: 1.107,
          opponentXg: 0.4626,
          hammarbyShots: 13,
          opponentShots: 10,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-08-13/hammarby-elfsborg-1-0",
        },
        {
          date: "2023-07-03",
          fixture: "Elfsborg - Hammarby",
          result: "2-0",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 0.6981,
          opponentXg: 1.79,
          hammarbyShots: 11,
          opponentShots: 12,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-07-03/elfsborg-hammarby-2-0",
        },
        {
          date: "2022-10-23",
          fixture: "Elfsborg - Hammarby",
          result: "2-1",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 2,
          hammarbyXg: 0.7939,
          opponentXg: 1.413,
          hammarbyShots: 9,
          opponentShots: 11,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2022/2022-10-23/elfsborg-hammarby-2-1",
        },
        {
          date: "2022-07-17",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.245,
          opponentXg: 1.508,
          hammarbyShots: 19,
          opponentShots: 14,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2022/2022-07-17/hammarby-elfsborg-3-0",
        },
        {
          date: "2021-08-22",
          fixture: "Elfsborg - Hammarby",
          result: "2-2",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 2,
          opponentGoals: 2,
          hammarbyXg: 1.706,
          opponentXg: 0.8075,
          hammarbyShots: 13,
          opponentShots: 13,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2021/2021-08-22/elfsborg-hammarby-2-2",
        },
        {
          date: "2021-08-15",
          fixture: "Hammarby - Elfsborg",
          result: "0-2",
          venue: "home",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 1.429,
          opponentXg: 1.339,
          hammarbyShots: 18,
          opponentShots: 19,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2021/2021-08-15/hammarby-elfsborg-0-2",
        },
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "Fyra i tabellen med sjutton poäng. Tjugofyra gjorda och tretton insläppta. Vi leder ligan i förväntade mål, skott och hur mycket vi spelar i motståndarens planhalva – men släpper mer defensivt än förra året. Rydströms första riktiga test.",
        tone: "emerald",
      },
      {
        title: "Elfsborg just nu",
        body: "Trea med arton poäng. Fyra vinster, sex oavgjorda och en förlust. Sexton gjorda och elva insläppta. Skjuter minst i Allsvenskan men är tredje bäst när de ställer om efter bolltapp. Pressar sällan – vi får tid på bollen.",
        tone: "amber",
      },
      {
        title: "Matchens kärna",
        body: "Vår hårda press och territoriedominans mot deras kompakta block och snabba omställning. Kan vi bryta ner ett lag som nästan aldrig förlorar?",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: Elfsborg har 45% bollinnehav och 46% field tilt – de dominerar inte territorium utan spelar reaktivt och kompakt.",
      "Defensiv transition är Elfsborgs främsta styrka (3:a i ligan). De begränsar motståndarens hot efter bolltapp – bara 0,21 opp. xG inom 10s efter recovery.",
      "Anfallsspelet är svagt (13:e av 16): bara 32% av possessioner når sista tredjedelen och 17% av final third-possessioner når boxen.",
      "Lågintensiv press: PPDA 7,20 och defensiv intensitet 5,35 – motståndare får tid på bollen. Hammarby kan bygga upp.",
      "Twelve: Elfsborg överpresterar marginellt (1,64 poäng/match vs 1,55 xP) – de tar poäng trots svag underliggande anfallsdata.",
      "Nyckelspelare: Leo Östman (4 mål, 2,21 xG), Arbër Zeneli (3 mål), Frederik Ihler (2 mål). Holmén avstängd.",
    ],
    styleProfile: [
      {
        label: "Defensiv transition (Twelve)",
        value: "3:a av 16 · opp. xG inom 10s: 0,21",
        score: 82,
        explanation:
          "Elfsborgs starkaste fas. De organiserar sig snabbt efter bolltapp och begränsar motståndarens kontringar effektivt.",
      },
      {
        label: "Anfallsvolym (Bolldata)",
        value: "10,0 avslut/match – SISTA i Allsvenskan",
        score: 15,
        explanation:
          "Elfsborg skjuter minst i hela ligan. De skapar få chanser men förlitar sig på effektivitet.",
      },
      {
        label: "Bollinnehav (Twelve)",
        value: "45% · field tilt 46%",
        score: 35,
        explanation:
          "Lågt territorium – Elfsborg nöjer sig med att försvara och slå till på omställningar.",
      },
      {
        label: "Avslutseffektivitet (Twelve)",
        value: "np Goals 1,27 vs np xG 1,36 · 0,14 xG/skott",
        score: 68,
        explanation:
          "Trots låg volym konverterar Elfsborg hyfsat – de tar riskfyllda avslut när chanserna kommer.",
      },
      {
        label: "Pressintensitet (Twelve)",
        value: "PPDA 7,20 · def. intensitet 5,35",
        score: 30,
        explanation:
          "Passiv press – Hammarby får bygga upp. Men passiviteten är medveten inom deras kompakta block.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "26,64",
        opponentValue: "16,18",
        hammarbyScore: 100,
        opponentScore: 62,
        note: "Hammarby har ligans högsta offensiva aktivitet. Elfsborg ligger nära botten.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "24",
        opponentValue: "16",
        hammarbyScore: 89,
        opponentScore: 60,
        note: "Hammarby tvåa i total målproduktion, Elfsborg sjua efter 11 omgångar.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,20",
        opponentValue: "1,43",
        hammarbyScore: 100,
        opponentScore: 65,
        note: "Hammarby skapar 54% mer xG per match – tydlig kvalitetsfördel.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,09",
        opponentValue: "10,00",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby skjuter dubbelt så mycket – Elfsborg har ligans lägsta skottvolym.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,09",
        opponentValue: "3,64",
        hammarbyScore: 94,
        opponentScore: 56,
        note: "Hammarby träffar mål betydligt oftare per match.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "71,45",
        opponentValue: "93,36",
        hammarbyScore: 56,
        opponentScore: 73,
        note: "Elfsborg försvarar mer (mindre bollinnehav). Hammarby pressar mer med bollen.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "103,18",
        opponentValue: "90,91",
        hammarbyScore: 100,
        opponentScore: 88,
        note: "Hammarby vinner flest dueller i ligan. Elfsborg är medelmåttiga.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "93,45",
        opponentValue: "83,36",
        hammarbyScore: 94,
        opponentScore: 84,
        note: "Hammarby återerövrar bollen oftare – viktigt mot Elfsborgs låga turnovers (30,91).",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "27,3%",
        opponentValue: "27,3%",
        hammarbyScore: 81,
        opponentScore: 81,
        note: "Identisk nollaprocent – båda lagen håller nollan i drygt var fjärde match.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "59,4%",
        opponentValue: "45,6%",
        hammarbyScore: 100,
        opponentScore: 70,
        note: "Hammarby dominerar bollen. Elfsborg spelar utan boll medvetet.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "180,36",
        opponentValue: "140,09",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "Hammarby driver bollen framåt mer – passar Rydströms progression-fokus.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,16",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,36",
        opponentRank: "12:e av 16",
        note: "Twelve: Hammarby skapar klart mest xG. Elfsborg svagt offensivt (13:e i attackfasen).",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,09",
        hammarbyRank: "1:a av 16",
        opponentValue: "10,00",
        opponentRank: "16:e av 16",
        note: "Hammarby har dubbelt så hög skottvolym – Elfsborg sist i ligan.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "59,4%",
        hammarbyRank: "1:a av 16",
        opponentValue: "45,6%",
        opponentRank: "14:e av 16",
        note: "Hammarby styr matchen med bollen. Elfsborg accepterar underläge.",
      },
      {
        label: "Defensiv transition (Twelve)",
        hammarbyValue: "13,4% recovery within 5s",
        hammarbyRank: "1:a av 16",
        opponentValue: "11% recovery within 5s",
        opponentRank: "3:a av 16 (fasrank)",
        note: "Hammarby counterpressar bäst i ligan. Elfsborg är starka organiskt men långsammare att återerövra (3:a i fasen).",
      },
      {
        label: "PPDA (press)",
        hammarbyValue: "4,19",
        hammarbyRank: "1:a av 16",
        opponentValue: "7,20",
        opponentRank: "~12:e av 16",
        note: "Hammarby pressar hårdast i ligan. Elfsborgs passiva block ger oss tid – men de är disciplinerade bakom bollen.",
      },
      {
        label: "Field tilt (Twelve)",
        hammarbyValue: "69,6%",
        hammarbyRank: "1:a av 16",
        opponentValue: "46%",
        opponentRank: "~10:e av 16",
        note: "Hammarby dominerar territorium totalt. Elfsborg accepterar att spela på sin planhalva.",
      },
      {
        label: "Boxberöringar (Twelve)",
        hammarbyValue: "28,82/match",
        hammarbyRank: "1:a av 16",
        opponentValue: "15,82/match",
        opponentRank: "~12:e av 16",
        note: "Hammarby når boxen nästan dubbelt så ofta per match enligt Twelve.",
      },
      {
        label: "Motst. xG (Twelve)",
        hammarbyValue: "1,45/match",
        hammarbyRank: "9:e av 16",
        opponentValue: "1,25/match",
        opponentRank: "6:e av 16",
        note: "Hammarbys defensiva svaghet 2026 – släpper mer än fjolåret. Elfsborg begränsar motståndarchanser väl.",
      },
      {
        label: "Tabellplacering",
        hammarbyValue: "17p",
        hammarbyRank: "4:a av 16",
        opponentValue: "18p",
        opponentRank: "3:a av 16",
        note: "Elfsborg en poäng före Hammarby. Sirius leder (28p), Häcken 2:a (20p).",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 5, opponentConcededGoals: 1 },
      { window: "46-60", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "61-75", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Elfsborgs andra halvlek",
        value: "11 av 16 mål (46-90+)",
        interpretation:
          "Elfsborg vaknar efter paus – Hammarby måste hålla intensiteten hela matchen, inte bara första 45.",
      },
      {
        label: "Elfsborgs låga skottvolym",
        value: "10,0 avslut/match · 9,91 np-skott (Twelve)",
        interpretation:
          "Begränsa deras få chanser så räcker det – de skapar sällan men är effektiva (1,27 np-mål).",
      },
      {
        label: "Hammarbys målprofil",
        value: "5 mål 31-45+ och 5 mål 46-60",
        interpretation:
          "Hammarby gör flest mål strax före och efter paus – pressa hårt i dessa fönster.",
      },
      {
        label: "Elfsborgs defensiva kvalitet",
        value: "Opp. np xG 1,25/match · 1,00 insläppta/match",
        interpretation:
          "Elfsborg släpper lite trots att motståndare får passa – de begränsar chanskvalitet, inte bara volym.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Exploatera field tilt-fördelen (70% vs 46%). Elfsborg pressar passivt (PPDA 7,20) – bygg lugnt och dra isär deras kompakta block.",
        "Attackera brett och centralt. Elfsborg når boxen bara 17% av gångerna från sista tredjedelen – deras mittfält stängs, men ytorna öppnas vid snabba riktningsbyten.",
        "Rydström bör utnyttja Hammarbys Twelve-ledarskap: 1:a i xG (2,16), boxberöringar (28,8/match) och avslut (20,2). Sikta på 4+ HQ-skott.",
        "Hammarbys 28,8 boxberöringar/match (Twelve) mot Elfsborgs 15,8 – volymfördelen ska skapa tryck. Tålamod tills luckor öppnas.",
        "Undvik onödiga risker centralt. Elfsborgs defensiva transition (3:a) straffar slarv – men Hammarby har ligans bästa counterpress (13,4% recovery within 5s).",
      ],
      withoutBall: [
        "Press med Hammarbys PPDA 4,19 (1:a i ligan) mot Elfsborgs 7,20. Stör uppspelet – Elfsborg tappar bollen 30,91 gånger/match men organiserar sig snabbt (11% recovery within 5s).",
        "Stäng av Zeneli och Östman – deras främsta målskyttar. Östman har 4 mål på 2,21 xG, Zeneli 3 mål.",
        "Elfsborg slår sällan till i första halvlek (5 av 16 mål före paus) – men 11 mål efter paus. Rydström: instruera om halvtidsjusteringar.",
        "Begränsa Elfsborgs få omställningar. Deras xG (1,36) och xT (1,24) per match är låga – ge dem INGA lätta kontringar.",
        "Holmén avstängd – testa att attackera deras alternativa mittbackskombination.",
      ],
      matchManagement: [
        "Bortamatch i Borås – men Hammarby vann senast 0-2 (2025) med dominant bollinnehav. Spela vårt spel.",
        "Elfsborg har bara 1 förlust på 11 matcher – det här blir ett tålamodsprov. Rydström får inte låta frustration leda till öppen match.",
        "Vid ledning: Elfsborg måste jaga (45% bollinnehav normalt) – kontrollera tempot och utnyttja deras högre positionering.",
        "Vid oavgjort sent: Elfsborg gör 4 mål 76-90+ – stäng matchen defensivt, de är farliga i slutminuterna.",
        "Rydströms första riktiga test – resultatet sätter tonen för höstsäsongen. En seger här bekräftar att tränarbytet fungerar.",
      ],
    },
    glossary: [
      {
        term: "Defensiv transition",
        explanation:
          "Vad som händer direkt efter bolltapp. Elfsborgs styrka (3:a i ligan): de begränsar motståndarens kontringar till 0,21 xG inom 10 sekunder.",
      },
      {
        term: "PPDA",
        explanation:
          "Passes Per Defensive Action – lägre = hårdare press. Elfsborgs 7,20 innebär att de sällan pressar högt.",
      },
      {
        term: "Field tilt",
        explanation:
          "Andel av bollinnehavet i sista tredjedelen. Elfsborgs 46% visar att de inte dominerar territorium.",
      },
      {
        term: "xP (expected Points)",
        explanation:
          "Förväntade poäng baserat på matchprestationer. Elfsborg har 1,64 faktiska poäng vs 1,55 xP – marginell överavkastning.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder efter bolltapp. Hammarby leder ligan med 13,4%. Elfsborg har 11%.",
      },
      {
        term: "Rydström-special",
        explanation:
          "Henrik Rydström tillträdde som Hammarbys huvudtränare våren 2026. Elfsborg borta blir ett tidigt test av hans spelmodell.",
      },
    ],
  },
];
