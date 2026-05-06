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
      "Bollinnehav i serien: Hammarby 1:a av 16, IFK Göteborg 6:a av 16.",
      "IFK spelar ofta långt tidigt, så Hammarby måste ha bra balans bakåt.",
    ],
    dataSources: [
      "Twelve: IFK Göteborg Season Report 2026 (uppdaterad 5 maj 2026)",
      "Bolldata: tabell, xG/xGA, skott på mål, målchanser, måltyper och tidsfönster för insläppta mål",
      "Bolldata Jämför lag (spider): lagprestation IFK Göteborg vs Hammarby, Allsvenskan 2026",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (11p), 16-5 i mål. Topplag i skott på mål och chansskapande.",
        tone: "emerald",
      },
      {
        title: "IFK Göteborg just nu",
        body: "15:e i tabellen (3p), 4-14 i mål. Låg utdelning framåt och många lägen emot.",
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
    styleProfile: [
      {
        label: "Kant- och inläggsfokus",
        value: "52% av boxinträden via inlägg (Twelve)",
        score: 86,
        explanation: "IFK söker ofta sista passet från kanten in i boxen.",
      },
      {
        label: "Uppspel från målvakt",
        value: "56% buildup från målvaktsstart (Twelve)",
        score: 72,
        explanation: "De försöker ofta spela sig ur första pressen innan längre passning.",
      },
      {
        label: "Låg försvarshöjd",
        value: "Defensiv aktionhöjd 38,69 m (Twelve)",
        score: 28,
        explanation: "De försvarar ofta nära eget mål i längre perioder.",
      },
      {
        label: "Direkt/långt i nästa fas",
        value: "Långa pass + genomskärare: 1:a i serien",
        score: 82,
        explanation: "När yta öppnas går de tidigt framåt med längre bollar.",
      },
      {
        label: "Omställningshot efter bollvinst",
        value: "xG inom 10 sek efter bollvinst: 0,08 (Twelve)",
        score: 22,
        explanation: "De vinner boll men skapar sällan riktigt farliga lägen direkt.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "28,2",
        opponentValue: "21,7",
        hammarbyScore: 100,
        opponentScore: 77,
        note: "Hammarby ligger tydligt högre i offensiv produktion per match.",
      },
      {
        label: "Mål / match",
        hammarbyValue: "2,67",
        opponentValue: "0,67",
        hammarbyScore: 94,
        opponentScore: 24,
        note: "Hammarby är 2:a i serien i målproduktion, IFK ligger i botten.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,14",
        opponentValue: "1,39",
        hammarbyScore: 99,
        opponentScore: 64,
        note: "Hammarby är 2:a i xG bakom Sirius och skapar klart högre chanskvalitet.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "21,83",
        opponentValue: "12,67",
        hammarbyScore: 100,
        opponentScore: 58,
        note: "Hammarby kommer oftare till avslutslägen.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,83",
        opponentValue: "4,67",
        hammarbyScore: 100,
        opponentScore: 68,
        note: "Hammarby träffar mål oftare och tvingar fler räddningar.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "82,0",
        opponentValue: "107,7",
        hammarbyScore: 71,
        opponentScore: 93,
        note: "IFK gör fler defensiva aktioner per match, men det hänger också ihop med mer försvarstid.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "89,8",
        opponentValue: "80,8",
        hammarbyScore: 100,
        opponentScore: 90,
        note: "Hammarby vinner fler dueller totalt, men IFK ligger nära.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "96,0",
        opponentValue: "86,8",
        hammarbyScore: 98,
        opponentScore: 89,
        note: "Hammarby ligger nära toppnivå i serien, IFK klart lägre.",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "33%",
        opponentValue: "0%",
        hammarbyScore: 66,
        opponentScore: 0,
        note: "Hammarby har 2 av 6 hållna nollor (33%), men toppnivån i serien är 50%.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "63,5%",
        opponentValue: "53,3%",
        hammarbyScore: 100,
        opponentScore: 84,
        note: "Båda lag kan ha boll, men Hammarby styr matchtempot mer.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "192,7",
        opponentValue: "145,2",
        hammarbyScore: 100,
        opponentScore: 75,
        note: "Hammarby flyttar spelet framåt oftare per match.",
      },
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
