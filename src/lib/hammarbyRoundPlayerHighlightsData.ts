export type HammarbyRoundHighlightCategory =
  | "creative"
  | "finishing"
  | "recoveries"
  | "distribution";

export type HammarbyRoundHighlightPlayer = {
  playerId: number;
  name: string;
  firstName: string;
  lastName: string;
  roleName: string;
  minutesOnField: number;
  category: HammarbyRoundHighlightCategory;
  badge: string;
  description: string;
  primaryStatLabel: string;
  primaryStatValue: number;
  secondaryStatLabel: string;
  secondaryStatValue: number;
};

export type HammarbyRoundHighlight = {
  gameweek: number;
  sourceMatchId: number;
  sourceUrl: string;
  players: HammarbyRoundHighlightPlayer[];
};

export const hammarbyRoundPlayerHighlights: HammarbyRoundHighlight[] = [
  {
    gameweek: 1,
    sourceMatchId: 1682,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-04/hammarby-mjallby-3-0",
    players: [
      {
        playerId: 3953,
        name: "N. Besara",
        firstName: "Nahir",
        lastName: "Besara",
        roleName: "Midfielder",
        minutesOnField: 92,
        category: "creative",
        badge: "Playmaker",
        description: "Stod för flest kreativa aktioner i omgången och drev Hammarbys chansskapande.",
        primaryStatLabel: "Nyckelpassningar",
        primaryStatValue: 2,
        secondaryStatLabel: "xA",
        secondaryStatValue: 0.67,
      },
      {
        playerId: 3974,
        name: "P. Abraham",
        firstName: "Paulos",
        lastName: "Abraham",
        roleName: "Forward",
        minutesOnField: 91,
        category: "finishing",
        badge: "Avslutare",
        description: "Tydligaste avslutshotet med högst xG i matchen.",
        primaryStatLabel: "xG",
        primaryStatValue: 1.1,
        secondaryStatLabel: "Skott på mål",
        secondaryStatValue: 4,
      },
      {
        playerId: 3970,
        name: "M. Karlsson",
        firstName: "Markus",
        lastName: "Karlsson",
        roleName: "Midfielder",
        minutesOnField: 95,
        category: "recoveries",
        badge: "Återerövringsmotor",
        description: "Vann tillbaka boll flest gånger och gav laget ett stabilt återerövringsspel.",
        primaryStatLabel: "Återerövringar",
        primaryStatValue: 18,
        secondaryStatLabel: "Defensiva dueller",
        secondaryStatValue: 8,
      },
      {
        playerId: 3963,
        name: "I. Fofana",
        firstName: "Ibrahima",
        lastName: "Breze Fofana",
        roleName: "Midfielder",
        minutesOnField: 95,
        category: "distribution",
        badge: "Passningsnav",
        description: "Flest passningar med hög träffprocent i uppbyggnaden.",
        primaryStatLabel: "Passningar",
        primaryStatValue: 73,
        secondaryStatLabel: "Lyckade passningar",
        secondaryStatValue: 70,
      },
    ],
  },
  {
    gameweek: 2,
    sourceMatchId: 1696,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-13/sirius-hammarby-2-0",
    players: [
      {
        playerId: 3980,
        name: "O. Hagen",
        firstName: "Oliver Jordan",
        lastName: "Hagen",
        roleName: "Forward",
        minutesOnField: 19,
        category: "creative",
        badge: "Direkt impact",
        description: "Levererade mest kreativ output per minut efter inhopp.",
        primaryStatLabel: "Nyckelpassningar",
        primaryStatValue: 1,
        secondaryStatLabel: "xA",
        secondaryStatValue: 0.32,
      },
      {
        playerId: 3976,
        name: "H. Skoglund",
        firstName: "Hampus",
        lastName: "Skoglund",
        roleName: "Defender",
        minutesOnField: 96,
        category: "finishing",
        badge: "Högst xG",
        description: "Skapade lagets högsta enskilda xG-värde i en svår bortamatch.",
        primaryStatLabel: "xG",
        primaryStatValue: 0.44,
        secondaryStatLabel: "Skott",
        secondaryStatValue: 1,
      },
      {
        playerId: 3961,
        name: "V. Eriksson",
        firstName: "Victor",
        lastName: "Eriksson",
        roleName: "Defender",
        minutesOnField: 96,
        category: "recoveries",
        badge: "Defensiv ledare",
        description: "Bar den defensiva återerövringen med högst antal bollvinster.",
        primaryStatLabel: "Återerövringar",
        primaryStatValue: 30,
        secondaryStatLabel: "Vunna defensiva dueller",
        secondaryStatValue: 9,
      },
      {
        playerId: 3959,
        name: "F. Winther",
        firstName: "Frederik",
        lastName: "Winther",
        roleName: "Defender",
        minutesOnField: 96,
        category: "distribution",
        badge: "Passningsmotor",
        description: "Flest passningar i laget och viktig i uppspelsfasen.",
        primaryStatLabel: "Passningar",
        primaryStatValue: 93,
        secondaryStatLabel: "Lyckade passningar",
        secondaryStatValue: 84,
      },
    ],
  },
  {
    gameweek: 3,
    sourceMatchId: 1700,
    sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-04-18/hammarby-orgryte-8-1",
    players: [
      {
        playerId: 3973,
        name: "V. Lind",
        firstName: "Victor",
        lastName: "Lind",
        roleName: "Forward",
        minutesOnField: 92,
        category: "creative",
        badge: "Matchregissör",
        description: "Kopplade ihop anfallsspelet med flest nyckelpassningar och högst xA.",
        primaryStatLabel: "Nyckelpassningar",
        primaryStatValue: 3,
        secondaryStatLabel: "xA",
        secondaryStatValue: 0.99,
      },
      {
        playerId: 3974,
        name: "P. Abraham",
        firstName: "Paulos",
        lastName: "Abraham",
        roleName: "Forward",
        minutesOnField: 79,
        category: "finishing",
        badge: "xG-topp",
        description: "Mest hotfull i avslutsspelet med högst xG i omgången.",
        primaryStatLabel: "xG",
        primaryStatValue: 1.22,
        secondaryStatLabel: "Skott på mål",
        secondaryStatValue: 1,
      },
      {
        playerId: 3961,
        name: "V. Eriksson",
        firstName: "Victor",
        lastName: "Eriksson",
        roleName: "Defender",
        minutesOnField: 92,
        category: "recoveries",
        badge: "Bollvinnare",
        description: "Toppar återerövringarna och stängde många omställningar tidigt.",
        primaryStatLabel: "Återerövringar",
        primaryStatValue: 17,
        secondaryStatLabel: "Vunna defensiva dueller",
        secondaryStatValue: 6,
      },
      {
        playerId: 3976,
        name: "H. Skoglund",
        firstName: "Hampus",
        lastName: "Skoglund",
        roleName: "Defender",
        minutesOnField: 92,
        category: "distribution",
        badge: "Passningsdrivare",
        description: "Hög volym i uppspel med flest passningar tillsammans med hög träff.",
        primaryStatLabel: "Passningar",
        primaryStatValue: 76,
        secondaryStatLabel: "Lyckade passningar",
        secondaryStatValue: 69,
      },
    ],
  },
];
