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
  bestFit: string[];
  reasoning: string;
}

export interface SquadRecommendation {
  formation: string;
  formationReasoning: string;
  positions: PositionProfile[];
  rotationNotes: string[];
}

export interface UpcomingOpponentReport {
  round: number;
  roundLabel?: string;
  fixture: string;
  dateLabel: string;
  oneLineSummary: string;
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
    round: 9,
    roundLabel: "Omgång 9",
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
        "Mot GAIS direktspel med långa bollar krävs stabil mittbackslinje (2 CB + 2 CDM) som vinner andrabollen, plus bredd i omställningar via kanterna. 4-2-3-1 ger kontroll i mitten och explosivitet framåt.",
      positions: [
        {
          position: "Målvakt",
          formation: "MV",
          requiredQualities: [
            "Bra fotarbete för uppspel under GAIS press",
            "Stark i luften – GAIS slår många långa bollar",
            "Snabb positionering vid omställningar",
          ],
          bestFit: ["W. Hahn"],
          reasoning:
            "Hahn har varit given hela säsongen och bidrar till uppspelet. Trygg under press och stark i boxen vid inlägg/långa bollar.",
        },
        {
          position: "Högerback",
          formation: "HB",
          requiredQualities: [
            "Offensiv kraft för att ge bredd i anfallsfasen",
            "Defensiv disciplin vid GAIS omställningar",
            "God löpkapacitet – bortamatch kräver fler sprints",
          ],
          bestFit: ["H. Skoglund"],
          reasoning:
            "Skoglund har 7 starter av 8 (7,0 km/match+). Stark passningstrygghet (84%+) och bidrar offensivt. Avgörande i omställningsfasen.",
        },
        {
          position: "Mittbackar (2)",
          formation: "MB + MB",
          requiredQualities: [
            "Dominant i luften – GAIS använder långa bollar (55,75/match)",
            "Snabb omställning bakåt vid kontrar",
            "Bra bollspelande för att bygga spelet under press",
            "Stark i defensiva dueller (67%+ vinstprocent)",
          ],
          bestFit: ["F. Winther", "V. Eriksson"],
          reasoning:
            "Winther–Eriksson har startat alla 8 matcher tillsammans. Winther stark i luften och framåtpassning (79% framåt), Eriksson vinner 70%+ defensiva dueller. Kompletterande par.",
        },
        {
          position: "Vänsterback",
          formation: "VB",
          requiredQualities: [
            "Offensiv hotpunkt – GAIS halvrum på den sidan kan exponeras",
            "Hög löpkapacitet för att hänga med i GAIS direkta omställningar",
            "God crossförmåga vid etablerat anfall",
          ],
          bestFit: ["T. Tekie", "O. Hagen"],
          reasoning:
            "Tekie har startat senaste 3, Hagen har kommit in som energiinjektion. Tekie ger defensiv trygghet mot GAIS kontrande ytterspel; Hagen ger mer offensiv punch vid behov.",
        },
        {
          position: "Centralt mittfält (2 – dubbelankare)",
          formation: "CDM + CDM",
          requiredQualities: [
            "Exceptionell andrabollsvinst – avgörande mot GAIS långa bollar",
            "Counterpressförmåga (hög recovery-rate)",
            "Framåtpassning under press för att starta omställningar",
            "Hög passningsvolym och precision (86%+)",
          ],
          bestFit: ["M. Karlsson", "O. Johansson"],
          reasoning:
            "Karlsson är lagets motor (90 min i 7/8 matcher, 62+ passningar/match, 85%+ precision). Johansson Schellhas ger recoveries och defensiv balans. Dubbelankaret skyddar mot GAIS direktspel.",
        },
        {
          position: "Offensiv mittfältare (central – etta)",
          formation: "AM",
          requiredQualities: [
            "Kreativitet i trångt utrymme – GAIS kompakt defensiv",
            "Nyckelpassningar (5+ per match idealt)",
            "xA-produktion – avgörande för att bryta ner lågt block",
            "Press bakåt vid bolltapp – bidra i counterpress",
          ],
          bestFit: ["N. Besara"],
          reasoning:
            "Besara är kapten och lagets kreativa nav: 5,38 nyckelpassningar/match (1:a i ligan), stark xA-produktion och ledare i pressspelet. Matchavgörande mot kompakta lag.",
        },
        {
          position: "Högerytter / halvrum",
          formation: "RW/RAM",
          requiredQualities: [
            "Dribblingsförmåga för att bryta 1v1 mot GAIS vänsterback",
            "Mål- och avslutshot (xG-bidrag)",
            "Löpningar i djupled vid omställningar",
            "Arbetskapacitet utan boll",
          ],
          bestFit: ["M. Madjed", "P. Abraham"],
          reasoning:
            "Madjed har hög dribblingsfrekvens och hotpunkt i halvrum. Abraham ger explosivitet och xG-hot. Båda startat senaste matcherna. Madjed start, Abraham som energiinjektion 60+ min.",
        },
        {
          position: "Vänsterytter / halvrum",
          formation: "LW/LAM",
          requiredQualities: [
            "Tempo och carries för att utnyttja ytan bakom GAIS höga press",
            "Skottförmåga från halvrum (GAIS släpper in centralt)",
            "Pressarbete bakåt – skydda vänsterback vid GAIS omställningar",
          ],
          bestFit: ["F. Adjei", "N. Persson"],
          reasoning:
            "Adjei har visat explosivitet i omställningar och stark løpkapacitet. Persson ger mer kontroll och passningskvalitet. Mot GAIS direktspel kan Adjei utnyttja öppna ytor bättre.",
        },
        {
          position: "Anfallare (ensam spets)",
          formation: "ST",
          requiredQualities: [
            "Stark i duellspel – vinna nickdueller vid GAIS uppspel",
            "Intelligent rörelse i boxen (GAIS släpper in 7/9 mål inifrån box)",
            "Hold-up-spel för att binda mittbackar och skapa yta för löpare",
            "Konverteringsförmåga – göra mål på halvlägen",
          ],
          bestFit: ["P. Abraham", "V. Lind", "M. Kaboré"],
          reasoning:
            "Abraham föredras vid start med sin rörelse och xG-produktion. Lind stark som hold-up-spets om vi behöver kontroll. Kaboré ger fysik och luftstyrka – användbar mot GAIS långa bollar vid inhoppet.",
        },
      ],
      rotationNotes: [
        "Kaboré som inhoppare 60+ min för att utnyttja GAIS uttrötade backlinje med fysik och löpningar i djupled.",
        "Hagen in som vänsterback/ytter om Tekie tappar energi – ger offensiv push i slutfasen.",
        "Persson som ersättning centralt i andra halvlek om tempot sjunker – trygg bollcirkulation.",
        "V. Lind som alternativ till Abraham om vi behöver mer hold-up och kontroll 70+ min.",
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
];
