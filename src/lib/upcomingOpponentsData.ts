export interface OpponentComparisonMetric {
  label: string;
  hammarby: string;
  opponent: string;
  interpretation: string;
}

export interface TacticalKeyPoint {
  title: string;
  detail: string;
}

export interface TacticalPlan {
  inPossession: TacticalKeyPoint[];
  defensivePlay: TacticalKeyPoint[];
  gameManagement: TacticalKeyPoint[];
}

export interface UpcomingOpponentReport {
  round: number;
  fixture: string;
  dateLabel: string;
  context: string;
  dataSources: string[];
  statusSnapshot: {
    hammarby: string;
    opponent: string;
  };
  opponentIdentity: string[];
  strengths: string[];
  vulnerabilities: string[];
  keyMetrics: OpponentComparisonMetric[];
  tacticalPlanForHammarby: TacticalPlan;
  expectedMatchPicture: string[];
}

export const upcomingOpponents: UpcomingOpponentReport[] = [
  {
    round: 7,
    fixture: "Hammarby - IFK Göteborg",
    dateLabel: "Förhandsrapport efter 6 spelade omgångar",
    context:
      "Startpunkt för kommande motståndare: omgång 7 mot IFK Göteborg. Underlaget kombinerar Twelve-rapporten för IFK Göteborg (uppdaterad 2026-05-05) och ligavärden från bolldata.se/lagdata.",
    dataSources: [
      "Twelve: IFK Göteborg Season Report 2026 (uppdaterad 5 maj 2026)",
      "Bolldata lagdata: tabell, xG/xGA, passningar, målchanser, skott på mål, långa passningar/genomskärare",
    ],
    statusSnapshot: {
      hammarby:
        "2:a i tabellen: 11p, 16-5 i målskillnad. Ligatopp i bollinnehav (63,5%), nyckelpassningar (5,0/90), skapade målchanser (14,17/90) och skott på mål (6,83/90).",
      opponent:
        "16:e i tabellen: 3p, 4-14 i målskillnad. Underliggande data bättre än utfall (xP 1,42/match men poäng 0,50/match), vilket pekar på underprestation men tydliga strukturella problem i båda boxarna.",
    },
    opponentIdentity: [
      "Presspel: balanserat till aktivt utan boll (PPDA 5,13; relativt hög defensiv intensitet) men med låg aktionhöjd (38,69 m) vilket gör att de ofta försvarar närmare eget mål.",
      "Anfallsspel: mer uppbyggnad än ren direkthet, med tydligt kant- och inläggsfokus (0,52 inlägg per sista tredjedelsinnehav; 52% av boxinträden via inlägg).",
      "Passningsprofil: hög totalvolym men låg effektivitet framåt jämfört med Hammarby (P% 67,3 för framåtpassningar vs 77,2 för Hammarby).",
      "Transitioner: återerövrar ofta snabbt efter bolltapp, men skapar själva svag kvalitet i offensiv transition (xG inom 10 sek efter bollvinst: 0,08).",
    ],
    strengths: [
      "Vinner defensiva dueller i hög grad (68%, topp i serien) och kan stoppa framfart i första duellen.",
      "Har många progressiva passningar (71,83/90) och hög andel långa passningar/genomskärare (57,0/90), vilket kan flytta boll snabbt till kant.",
      "Skapar trots svag målproduktion en okej mängd chanser (52 skapade chanser, 8,67/90) och 12,50 np-skott/match enligt Twelve.",
    ],
    vulnerabilities: [
      "Kraftig differens mellan skapad kvalitet och faktisk utdelning: np xG 1,26 men np mål 0,67 (Twelve), samt 4 gjorda mål på 6 matcher i lagdatan.",
      "Släpper in klart fler mål än underliggande kvalitet antyder (14 insläppta, xGA 8,07) vilket tyder på problem i boxförsvar/bestraffning av misstag.",
      "Låg bollsäkerhet i offensiv transition över tid (lägst i Twelve på possessions retained after 5s och xT/xG inom 10 sek).",
      "Defensiv aktionhöjd nära eget mål (15:e nivå i rapporten) gör dem sårbara för etablerat tryck och många återkommande inlägg/andrabollar.",
    ],
    keyMetrics: [
      {
        label: "Tabell / målskillnad",
        hammarby: "11p, 16-5 (+11)",
        opponent: "3p, 4-14 (-10)",
        interpretation:
          "Stor resultatskillnad efter sex omgångar, trots att IFK:s underliggande siffror inte är lika dåliga som tabellen.",
      },
      {
        label: "xG & xGA (lagdata)",
        hammarby: "xG 12,86 / xGA 6,68",
        opponent: "xG 8,32 / xGA 8,07",
        interpretation:
          "Hammarby skapar väsentligt mer totalt, men IFK:s xGA är inte katastrofal i relation till deras insläppta mål.",
      },
      {
        label: "Skott på mål / match",
        hammarby: "6,83",
        opponent: "4,67",
        interpretation:
          "Hammarby får fler avslut på mål och bör kunna omvandla tryck till konkret hot oftare.",
      },
      {
        label: "Skapade målchanser /90",
        hammarby: "14,17",
        opponent: "8,67",
        interpretation:
          "Hammarby producerar betydligt mer chansvolym; nyckeln blir att hålla tempot uppe tills IFK:s låga block tappar kompakthet.",
      },
      {
        label: "Nyckelpassningar /90",
        hammarby: "5,00",
        opponent: "3,17",
        interpretation:
          "Hammarby har tydligare kreativ output centralt och i halvrum, IFK mer beroende av kantinlägg.",
      },
      {
        label: "Passningsprocent",
        hammarby: "86,6%",
        opponent: "81,9%",
        interpretation:
          "Hammarby har högre kontroll i possession. IFK kan pressas till sämre beslut om Hammarby håller högt återerövringstryck.",
      },
      {
        label: "Långa passningar + genomskärare /90",
        hammarby: "40,67",
        opponent: "57,00",
        interpretation:
          "IFK söker oftare längre och mer vertikala lösningar, särskilt för att nå ytor bakom ytterback och tidiga inläggslägen.",
      },
    ],
    tacticalPlanForHammarby: {
      inPossession: [
        {
          title: "Överbelasta halvrum före inlägg",
          detail:
            "IFK försvarar ofta lågt och tätt i boxlinje. Hammarby bör skapa 3v2 i halvrum för att dra isär första linjen och sedan hitta cutbacks snarare än tidiga lyft mot mittbackarna.",
        },
        {
          title: "Skifta snabbt sida mot deras låga aktionhöjd",
          detail:
            "När IFK sjunker nära eget mål uppstår yta i bortre korridor. Snabba diagonala förflyttningar via centralt nav kan ge isolerade 1v1 för Hammarbys ytter.",
        },
        {
          title: "Håll hög rytm i andrafas",
          detail:
            "Efter första avslut/inlägg: direkt återvinning och nytt inspel innan IFK hinner organisera om. Det angriper deras svaghet i långvarigt boxförsvar.",
        },
      ],
      defensivePlay: [
        {
          title: "Stoppa tidiga inlägg",
          detail:
            "IFK:s tydligaste väg in i boxen är via kant och inlägg. Prioritera att styra utåt med understöd och blockera inläggsfot tidigt.",
        },
        {
          title: "Säkra restförsvar mot långa första pass",
          detail:
            "Eftersom IFK spelar många långa/vertikala pass måste Hammarby ha rätt avstånd mellan mittback och sexa direkt vid bolltapp.",
        },
        {
          title: "Pressa uppspel på triggers",
          detail:
            "Vid passning bak till mittback/målvakt: gå med koordinerad pressvåg för att tvinga IFK till längre och mindre precisa framåtpassningar.",
        },
      ],
      gameManagement: [
        {
          title: "Var tålmodig trots låga ytor",
          detail:
            "IFK:s resultatrad kan leda till tidig frustration hos motståndare. Hammarby ska fortsätta mata kvalitet i sista tredjedelen istället för att forcera distansavslut.",
        },
        {
          title: "Öka tempot efter 55-60 minuter",
          detail:
            "Om matchen är jämn: byt in fart och djupledshot när IFK:s låga block börjar tappa synk i sidled, särskilt efter många försvarsaktioner i egen box.",
        },
      ],
    },
    expectedMatchPicture: [
      "Hammarby väntas äga boll och territorium, medan IFK försöker balansera mellan lägre block och selektivt högre press.",
      "Matchens nyckel blir om Hammarby omvandlar stort possessionsövertag till tillräckligt många avslut från centrala ytor i boxen.",
      "Om IFK får många ostörda inlägg eller tidiga långa uppspel kan de skapa hot trots lägre total kvalitet.",
    ],
  },
];
