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

export interface UpcomingOpponentReport {
  round: number;
  roundLabel?: string;
  fixture: string;
  dateLabel: string;
  oneLineSummary: string;
  mobileTakeaways: string[];
  dataSources: string[];
  cupSpecial?: CupSpecialSection;
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
    round: 8,
    roundLabel: "Cupspecial",
    fixture: "Hammarby - Mjällby",
    dateLabel: "Inför 14 maj 2026 · uppdaterad med Twelve + Bolldata",
    oneLineSummary:
      "Kort version: Hammarby driver tempot och skapar flest lägen i serien, men Mjällby är ett topplag i omställningshot och i att bära boll in i box.",
    mobileTakeaways: [
      "Hammarby är 2:a i tabellen (14p), Mjällby 5:a (13p) efter 7 omgångar.",
      "Mjällby har släppt in alla sina mål i boxen (8 av 8).",
      "Hammarby toppar serien i avslut, skott på mål och bollinnehav per match.",
      "Mjällby är stabila i försvarsspelet men mer sårbara i defensiva omställningar.",
      "Cupspecial: matchbilden blir ofta mer direkt och tajt - fasta och första målet väger extra tungt.",
    ],
    dataSources: [
      "Twelve Insights: How did Mjällby perform this season? (hämtad 10 maj 2026)",
      "Bolldata: tabell + match-/lagstatistik för Hammarby och Mjällby efter 7 spelade omgångar",
      "Bolldata målhändelser: minutfönster och måltyper via matches/goals för spelade matcher",
    ],
    cupSpecial: {
      title: "Cupspecial: vad som brukar avgöra i den här typen av match",
      context:
        "I cupformat väger matchens första svängningar extra tungt: färre risker tas, fasta situationer får större värde och game-state styr byten tidigare.",
      tacticalKeys: [
        "Säkra upp bakom boll direkt efter egna avslut för att stänga Mjällbys kontringslägen.",
        "Tvinga Mjällby ut i ytor där de måste slå inlägg - de är farligare när de får bära in bollen centralt.",
        "Tryck hårt i början av andra halvlek där Mjällby släppt in flest mål hittills (46-60).",
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (14p), 17-5 i mål. Serieetta i flera offensiva volymmått per match.",
        tone: "emerald",
      },
      {
        title: "Mjällby just nu",
        body: "5:a i tabellen (13p), 12-8 i mål. Jämna prestationer, starka i spelvändningar och boxattacker.",
        tone: "amber",
      },
      {
        title: "Viktig period",
        body: "Mjällby har släppt in flest mål i minut 46-60 (3 av 8).",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Mjällby blandar aktiv press med ett kompakt lägre försvarsspel beroende på matchfas.",
      "I uppbyggnad lutar de mer åt kontrollerat spel än tidiga långa bollar.",
      "I sista tredjedelen skapar de ofta inträden i box via dribbling/carry snarare än många inlägg.",
      "De är effektiva i anfallstransition men kan lämna ytor bakom första presslinjen när de tappar boll.",
    ],
    styleProfile: [
      {
        label: "Balans i försvarsspelet",
        value: "Mix av press + kompakt shape (Twelve)",
        score: 74,
        explanation: "Mjällby skiftar mellan högre press och samlat lågt block utan att tappa struktur.",
      },
      {
        label: "Byggspel i första fas",
        value: "Build-up före långboll (Twelve)",
        score: 76,
        explanation: "De vill ofta etablera passningsvägar innan de går mer vertikalt.",
      },
      {
        label: "Penetration via carrying",
        value: "Fler effektiva boxinträden via carry (Twelve)",
        score: 81,
        explanation: "Bär med boll in i farliga ytor i stället för att enbart fylla med inlägg.",
      },
      {
        label: "Anfallstransition",
        value: "Konsistent hot i övergångar (Twelve)",
        score: 73,
        explanation: "De går snabbt framåt när yta öppnas och har fått bra effekt av det.",
      },
      {
        label: "Defensiv transition",
        value: "Svagare än snittet (Twelve)",
        score: 36,
        explanation: "När de tappar boll kan motståndaren hitta lägen innan Mjällby hinner samla laget.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        opponentValue: "23,86",
        hammarbyScore: 100,
        opponentScore: 87,
        note: "Båda lag ligger högt i serien, men Hammarby har högst volym hittills.",
      },
      {
        label: "Mål / match",
        hammarbyValue: "2,43",
        opponentValue: "1,71",
        hammarbyScore: 86,
        opponentScore: 61,
        note: "Hammarby ligger högre i målproduktion per match, men Mjällby är fortfarande topp-5.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        opponentValue: "1,26",
        hammarbyScore: 96,
        opponentScore: 58,
        note: "Hammarby ligger klart högre i chanskvalitet över sju spelade matcher.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        opponentValue: "12,71",
        hammarbyScore: 100,
        opponentScore: 62,
        note: "Hammarby är etta i serien i avslut per match.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        opponentValue: "5,43",
        hammarbyScore: 100,
        opponentScore: 90,
        note: "Hammarby är etta och Mjällby fyra i serien - båda testar målvakt ofta.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "69,43",
        opponentValue: "92,57",
        hammarbyScore: 68,
        opponentScore: 91,
        note: "Mjällby gör fler defensiva aktioner per match, delvis kopplat till lägre bollinnehav.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "105,86",
        opponentValue: "104,71",
        hammarbyScore: 100,
        opponentScore: 99,
        note: "Mycket jämnt i duellspelet - båda lag ligger i den övre delen av serien.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "97,71",
        opponentValue: "91,14",
        hammarbyScore: 99,
        opponentScore: 92,
        note: "Hammarby återvinner boll lite oftare, men Mjällby ligger också högt.",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "42,9%",
        opponentValue: "42,9%",
        hammarbyScore: 100,
        opponentScore: 100,
        note: "Båda lagen har 3 hållna nollor på 7 matcher.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "62,3%",
        opponentValue: "54,1%",
        hammarbyScore: 100,
        opponentScore: 87,
        note: "Hammarby styr bollinnehavet mest i serien, Mjällby ligger också i övre skiktet.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "184,29",
        opponentValue: "172,14",
        hammarbyScore: 100,
        opponentScore: 93,
        note: "Båda lag spelar framåtriktat, men Hammarby ligger marginellt högre i volym.",
      },
    ],
    rankedMetrics: [
      {
        label: "Mål / match",
        hammarbyValue: "2,43",
        hammarbyRank: "2:a av 16",
        opponentValue: "1,71",
        opponentRank: "5:a av 16",
        note: "Två topplag i produktion, men Hammarby ligger högre.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        hammarbyRank: "2:a av 16",
        opponentValue: "1,26",
        opponentRank: "10:a av 16",
        note: "Hammarby skapar klart högre förväntad målproduktion.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        hammarbyRank: "1:a av 16",
        opponentValue: "5,43",
        opponentRank: "4:a av 16",
        note: "Båda lag är starka, men Hammarby är högst i serien.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        hammarbyRank: "1:a av 16",
        opponentValue: "12,71",
        opponentRank: "6:a av 16",
        note: "Hammarby har tydlig volymfördel i avslut.",
      },
      {
        label: "Bollinnehav / match",
        hammarbyValue: "62,3%",
        hammarbyRank: "1:a av 16",
        opponentValue: "54,1%",
        opponentRank: "4:a av 16",
        note: "Hammarby sätter tempot med boll oftare, men Mjällby är inte ett lågt bollinnehavslag.",
      },
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        hammarbyRank: "1:a av 16",
        opponentValue: "23,86",
        opponentRank: "2:a av 16",
        note: "Mötet står mellan seriens två bästa lag i den här offensiva totalvolymen.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 1, opponentConcededGoals: 0 },
      { window: "16-30", hammarbyGoals: 2, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 4, opponentConcededGoals: 3 },
      { window: "61-75", hammarbyGoals: 3, opponentConcededGoals: 0 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 1 },
    ],
    goalTypeNotes: [
      {
        label: "Hur Mjällby släpper in mål",
        value: "8 av 8 i boxen",
        interpretation: "Alla insläppta mål hittills har kommit inne i straffområdet.",
      },
      {
        label: "Fasta bakåt (Mjällby)",
        value: "1 av 8 mål",
        interpretation: "Merparten av insläppta mål kommer i öppet spel, men fasta är fortfarande en möjlig väg.",
      },
      {
        label: "Nickmål bakåt (Mjällby)",
        value: "1 mål",
        interpretation: "Luftspel är inte den största svagheten, men inläggssituationer behöver ändå pressas tidigt.",
      },
      {
        label: "Mjällbys mål framåt",
        value: "12 mål totalt (1,71/match)",
        interpretation: "Stabil offensiv grundnivå, ofta via övergångar och inträden i box.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Spela igenom första pressen och attackera ytan bakom Mjällbys centrala mittfält.",
        "Sök fler cutback-lägen i boxen där Mjällby släppt in samtliga mål hittills.",
        "Variera tempot i passningsspelet för att flytta Mjällbys block och öppna centrala skottlägen.",
      ],
      withoutBall: [
        "Skydda ytan direkt efter bolltapp - Mjällby är farliga i anfallstransition.",
        "Styr dem ut mot kanten och bort från centrala carries in i box.",
        "Var aggressiva på andraboll runt egen box när Mjällby fyller på i andra våg.",
      ],
      matchManagement: [
        "Öka trycket direkt efter paus (46-60) där Mjällby haft sin svagaste period bakåt.",
        "Värdera fasta högt i cupmatch - bra leverans kan avgöra matchen.",
        "Vid ledning: prioritera kontroll på centrala ytor före alltför tidiga offensiva byten.",
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
        term: "Cupspecial",
        explanation:
          "Matchplan med extra fokus på game-state, fasta och riskkontroll eftersom marginalerna ofta är mindre i cupformat.",
      },
    ],
  },
];
