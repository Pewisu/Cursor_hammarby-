export interface ComparisonCard {
  title: string;
  hammarby: string;
  opponent: string;
  insight: string;
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
  comparisonCards: ComparisonCard[];
  goalWindows: GoalWindowComparison[];
  goalTypeNotes: GoalTypeNote[];
  hammarbyPlan: {
    withBall: string[];
    withoutBall: string[];
    matchManagement: string[];
  };
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
      "Hammarby har klart högre chansvolym (14,17 vs 8,67/90).",
      "IFK går ofta långt och tidigt framåt — säkra restförsvaret.",
    ],
    dataSources: [
      "Twelve: IFK Göteborg Season Report 2026 (uppdaterad 5 maj 2026)",
      "Bolldata: tabell, xG/xGA, skott på mål, skapade målchanser, måltyper och insläppta mål per matchminut",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (11p), 16-5 i mål. Topplag i skott på mål och chansskapande.",
        tone: "emerald",
      },
      {
        title: "IFK Göteborg just nu",
        body: "16:e (3p), 4-14 i mål. Låg utdelning framåt och tung belastning i egen box.",
        tone: "amber",
      },
      {
        title: "Nyckelfönster i matchen",
        body: "IFK har släppt in 5 av 14 mål i minut 61-75.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Pressar i perioder men försvarar ofta lågt nära eget mål.",
      "Söker kant och inlägg, plus många långa/vertikala passningar.",
      "Kan ha boll, men skapar mindre kvalitet än topplagen.",
      "Återerövrar snabbt men får låg utdelning i offensiv transition.",
    ],
    comparisonCards: [
      {
        title: "Skapade målchanser /90",
        hammarby: "14,17",
        opponent: "8,67",
        insight: "Tydlig Hammarby-fördel i volym.",
      },
      {
        title: "Skott på mål / match",
        hammarby: "6,83",
        opponent: "4,67",
        insight: "Hammarby träffar mål oftare.",
      },
      {
        title: "xG / xGA",
        hammarby: "12,86 / 6,68",
        opponent: "8,32 / 8,07",
        insight: "Hammarby har starkare total balans.",
      },
      {
        title: "Målchanser emot (totalt)",
        hammarby: "36",
        opponent: "55",
        insight: "IFK tillåter klart fler lägen emot.",
      },
      {
        title: "Passningsprocent",
        hammarby: "86,6%",
        opponent: "81,9%",
        insight: "Hammarby har bättre kontroll i speluppbyggnad.",
      },
      {
        title: "Långa pass + genomskärare /90",
        hammarby: "40,67",
        opponent: "57,00",
        insight: "IFK går oftare tidigt och långt.",
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
        value: "14/14 i boxen",
        interpretation: "Allt insläppt har kommit i straffområdet.",
      },
      {
        label: "Fasta bakåt (IFK)",
        value: "0 frispark, 0 hörna, 0 straff",
        interpretation: "De straffas främst i öppet spel.",
      },
      {
        label: "Nickmål bakåt (IFK)",
        value: "4",
        interpretation: "Luftdueller i boxen är en riskzon.",
      },
      {
        label: "IFK:s mål framåt",
        value: "4 totalt (1 frispark, 1 nick)",
        interpretation: "Låg målproduktion över sex matcher.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Attackera halvrum och cutback-yta.",
        "Byt sida snabbt mot deras låga block.",
        "Jaga andraboll efter avslut i boxen.",
      ],
      withoutBall: [
        "Stoppa tidiga inlägg från kant.",
        "Säkra restförsvar mot långa första pass.",
        "Pressa samlat på bakåtpass till mittback/målvakt.",
      ],
      matchManagement: [
        "Höj tempot tydligt i minut 55-75.",
        "Byt in fart tidigt i andra halvlek.",
        "Ha tålamod och fortsätt mata boxen.",
      ],
    },
  },
];
