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

export interface UpcomingOpponentReport {
  round: number;
  fixture: string;
  dateLabel: string;
  oneLineSummary: string;
  mobileTakeaways: string[];
  dataSources: string[];
  quickStatusCards: {
    title: string;
    body: string;
    tone: "emerald" | "amber" | "blue";
  }[];
  opponentStyle: string[];
  rankedMetrics: RankedComparisonMetric[];
  goalWindows: GoalWindowComparison[];
  goalTypeNotes: GoalTypeNote[];
  hammarbyPlan: {
    withBall: string[];
    withoutBall: string[];
    matchManagement: string[];
  };
  glossary: GlossaryTerm[];
}

export const upcomingOpponents: UpcomingOpponentReport[] = [
  {
    round: 7,
    fixture: "Hammarby - IFK Göteborg",
    dateLabel: "Förhandsanalys efter 6 omgångar",
    oneLineSummary:
      "Kort version: Hammarby skapar mer, IFK släpper in mycket i boxen och är svagast i minut 61-75.",
    mobileTakeaways: [
      "Tryck efter paus: IFK har släppt in 5 mål i minut 61-75.",
      "Attackera boxen: IFK har släppt in 14/14 mål inne i straffområdet.",
      "Hammarby skapar klart fler lägen: 14,17 vs 8,67 målchanser per 90.",
      "IFK spelar ofta långt tidigt, så Hammarby måste ha bra balans bakåt.",
    ],
    dataSources: [
      "Twelve: IFK Göteborg Season Report 2026 (uppdaterad 5 maj 2026)",
      "Bolldata: tabell, xG/xGA, skott på mål, målchanser, måltyper och tidsfönster för insläppta mål",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (11p), 16-5 i mål. Topplag i skott på mål och chansskapande.",
        tone: "emerald",
      },
      {
        title: "IFK Göteborg just nu",
        body: "16:e i tabellen (3p), 4-14 i mål. Låg utdelning framåt och många lägen emot.",
        tone: "amber",
      },
      {
        title: "Viktig period",
        body: "IFK har släppt in 5 av 14 mål i minut 61-75.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "IFK pressar ibland högt, men försvarar ofta lågt nära eget mål.",
      "De går ofta via kantspel och inlägg.",
      "De använder många långa passningar framåt.",
      "De vinner tillbaka boll snabbt ibland, men får sällan bra utdelning direkt efter bollvinst.",
    ],
    rankedMetrics: [
      {
        label: "Skapade målchanser /90",
        hammarbyValue: "14,17",
        hammarbyRank: "1:a av 16",
        opponentValue: "8,67",
        opponentRank: "6:a av 16",
        note: "Hammarby ligger högst i serien och skapar tydligt mer.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,83",
        hammarbyRank: "1:a av 16",
        opponentValue: "4,67",
        opponentRank: "10:a av 16",
        note: "Hammarby får fler avslut som faktiskt träffar mål.",
      },
      {
        label: "xG (totalt)",
        hammarbyValue: "12,86",
        hammarbyRank: "2:a av 16",
        opponentValue: "8,32",
        opponentRank: "9:a av 16",
        note: "Hammarby skapar klart högre chanskvalitet totalt.",
      },
      {
        label: "Passningsprocent",
        hammarbyValue: "86,6%",
        hammarbyRank: "1:a av 16",
        opponentValue: "81,9%",
        opponentRank: "10:a av 16",
        note: "Hammarby har högst passningssäkerhet i serien.",
      },
      {
        label: "Bollinnehav",
        hammarbyValue: "63,5%",
        hammarbyRank: "1:a av 16",
        opponentValue: "53,3%",
        opponentRank: "6:a av 16",
        note: "Båda lag kan ha boll, men Hammarby dominerar mest i ligan.",
      },
      {
        label: "Långa pass + genomskärare /90",
        hammarbyValue: "40,67",
        hammarbyRank: "16:e av 16",
        opponentValue: "57,00",
        opponentRank: "1:a av 16",
        note: "IFK är laget som använder flest långa/vertikala passningar.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 1, opponentConcededGoals: 1 },
      { window: "16-30", hammarbyGoals: 2, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "61-75", hammarbyGoals: 4, opponentConcededGoals: 5 },
      { window: "76-90+", hammarbyGoals: 3, opponentConcededGoals: 3 },
    ],
    goalTypeNotes: [
      {
        label: "Hur IFK släpper in mål",
        value: "14 av 14 i boxen",
        interpretation: "Alla insläppta mål har kommit inne i straffområdet.",
      },
      {
        label: "Fasta bakåt (IFK)",
        value: "0 frispark, 0 hörna, 0 straff",
        interpretation: "De blir främst straffade i öppet spel.",
      },
      {
        label: "Nickmål bakåt (IFK)",
        value: "4 mål",
        interpretation: "Luftspelet i boxen är en tydlig svag punkt.",
      },
      {
        label: "IFK:s mål framåt",
        value: "4 mål totalt",
        interpretation: "1 frispark, 1 nick och låg total produktion.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Spela i ytan mellan motståndarnas mitt och kant (halvrum).",
        "Sök snett-inåt-bakåt-pass från kanten i stället för tidiga höga inlägg.",
        "Tryck på andraboll i boxen efter avslut.",
      ],
      withoutBall: [
        "Stoppa inlägg tidigt ute på kanten.",
        "Ha minst tre spelare bakom boll när Hammarby anfaller.",
        "Sätt gemensam press när IFK spelar hem till mittback eller målvakt.",
      ],
      matchManagement: [
        "Öka tempot tydligt i minut 55-75.",
        "Sätt in fart tidigt i andra halvlek om matchen låser sig.",
        "Håll tålamod och fortsätt skapa lägen i boxen.",
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
    ],
  },
];
