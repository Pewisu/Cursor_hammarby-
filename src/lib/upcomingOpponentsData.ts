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
      "Kort version: Hammarby skapar klart mer, IFK släpper in mycket i egen box och tappar ofta matchen efter paus.",
    dataSources: [
      "Twelve: IFK Göteborg Season Report 2026 (uppdaterad 5 maj 2026)",
      "Bolldata: tabell, xG/xGA, skott på mål, skapade målchanser, måltyper och insläppta mål per matchminut",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (11p), 16-5 i målskillnad. Topplag i chansskapande och skott på mål.",
        tone: "emerald",
      },
      {
        title: "IFK Göteborg just nu",
        body: "16:e plats (3p), 4-14 i mål. Klart svag utdelning framåt och hög belastning i eget straffområde.",
        tone: "amber",
      },
      {
        title: "Nyckelfönster i matchen",
        body: "IFK har släppt in 5 av 14 mål i minut 61-75. Där är Hammarby också som starkast offensivt.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "IFK pressar periodvis aktivt men försvarar ofta lågt (låg defensiv aktionhöjd).",
      "De söker ofta kantvägen: många inlägg och vertikala/långa passningar.",
      "Mycket boll i vissa matcher, men sämre kvalitet i sista tredjedelen än topplagen.",
      "Snabb återerövring finns, men deras offensiva transition ger låg utdelning.",
    ],
    comparisonCards: [
      {
        title: "Skapade målchanser /90",
        hammarby: "14,17",
        opponent: "8,67",
        insight: "Hammarby skapar betydligt fler bra situationer över tid.",
      },
      {
        title: "Skott på mål / match",
        hammarby: "6,83",
        opponent: "4,67",
        insight: "Hammarby får oftare träff på mål och tvingar fler räddningar.",
      },
      {
        title: "xG / xGA",
        hammarby: "12,86 / 6,68",
        opponent: "8,32 / 8,07",
        insight: "Hammarby har starkare total balans mellan skapade och tillåtna chanser.",
      },
      {
        title: "Målchanser emot (totalt)",
        hammarby: "36",
        opponent: "55",
        insight: "IFK tillåter mycket i egen boxzon och runt boxen.",
      },
      {
        title: "Passningsprocent",
        hammarby: "86,6%",
        opponent: "81,9%",
        insight: "Hammarby har tydligare kontroll i etablerat spel.",
      },
      {
        title: "Långa pass + genomskärare /90",
        hammarby: "40,67",
        opponent: "57,00",
        insight: "IFK går oftare tidigt framåt med längre bollar.",
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
        interpretation: "Allt insläppt har kommit inne i straffområdet.",
      },
      {
        label: "Fasta bakåt (IFK)",
        value: "0 frispark, 0 hörna, 0 straff",
        interpretation:
          "De har främst blivit straffade i öppet spel, inte på klassiska fasta situationer.",
      },
      {
        label: "Nickmål bakåt (IFK)",
        value: "4",
        interpretation: "Luftdueller och inläggsboxen är en tydlig riskzon för IFK.",
      },
      {
        label: "IFK:s mål framåt",
        value: "4 totalt (1 frispark, 1 nick)",
        interpretation: "Låg målproduktion och få spelmål över sex matcher.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Spela igenom halvrum och attackera cutback-ytan snarare än tidiga höga inlägg.",
        "Byt sida snabbt för att flytta deras låga block i sidled.",
        "Tryck på andraboll efter avslut — IFK har släppt in mycket i egen box.",
      ],
      withoutBall: [
        "Stoppa tidiga inlägg från kant direkt vid källan.",
        "Säkra restförsvar mot deras långa första pass efter bollvinst.",
        "Trigga samlad press på bakåtpass till mittback/målvakt.",
      ],
      matchManagement: [
        "Höj tempot tydligt runt minut 55-75 (IFK:s svagaste period defensivt).",
        "Byt in fart tidigt i andra halvlek om matchen står och väger.",
        "Behåll tålamodet: Hammarbys volymspel ger oftast utdelning över 90 minuter.",
      ],
    },
  },
];
