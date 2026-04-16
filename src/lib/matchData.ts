export interface Player {
  number: number;
  name: string;
  position: string;
  minutesPlayed: number;
  subbedOff?: { minute: number; replacedBy: string };
  subbedOn?: { minute: number; replacing: string };
  goals?: number;
  assists?: number;
  yellowCard?: number;
  isCaptain?: boolean;
}

export interface MatchEvent {
  minute: number;
  type: "goal" | "yellow_card" | "substitution";
  team: "home" | "away";
  player: string;
  detail?: string;
}

export const matchData = {
  competition: "Allsvenskan",
  round: "Omgång 2",
  date: "13 april 2026",
  time: "19:00",
  referee: "Glenn Nyberg",
  assistantRef1: "Mahbod Beigi",
  assistantRef2: "Mehmet Culum",
  fourthOfficial: "Sajad Al Hakim",
  venue: "Studenternas IP, Uppsala",
  attendance: 10306,
  source: "bolldata.se",

  home: {
    name: "IK Sirius",
    shortName: "Sirius",
    logo: "🔵",
    color: "#1d4ed8",
    goals: 2,
    manager: "Andreas Engelmark",
    formation: "4-3-3" as const,
    formOverall: 80,
    leaguePosition: 1,
  },
  away: {
    name: "Hammarby IF",
    shortName: "Hammarby",
    logo: "🟢",
    color: "#16a34a",
    goals: 0,
    manager: "Kalle Karlsson",
    formation: "4-2-3-1" as const,
    formOverall: 67,
    leaguePosition: 9,
  },

  homeLineup: {
    starters: [
      { number: 34, name: "David Ćelić", position: "MV", minutesPlayed: 90 },
      { number: 22, name: "Oscar Krusnell", position: "HB", minutesPlayed: 90, assists: 1 },
      { number: 4, name: "Tobias Anker", position: "MB", minutesPlayed: 90 },
      { number: 2, name: "Mohamed Soumah", position: "MB", minutesPlayed: 90 },
      { number: 5, name: "Henrik Rönnlöf Castegren", position: "VB", minutesPlayed: 90, isCaptain: true },
      { number: 6, name: "Marcus Lindberg", position: "CM", minutesPlayed: 90 },
      { number: 10, name: "Melker Heier", position: "CM", minutesPlayed: 90 },
      { number: 24, name: "Victor Svensson", position: "CM", minutesPlayed: 71, subbedOff: { minute: 71, replacedBy: "M. Nartey" } },
      { number: 11, name: "Isak Bjerkebo", position: "LW", minutesPlayed: 89, goals: 1, subbedOff: { minute: 89, replacedBy: "V. Ekström" } },
      { number: 9, name: "Robbie Ure", position: "ST", minutesPlayed: 90, goals: 1 },
      { number: 17, name: "Neo Jönsson", position: "RW", minutesPlayed: 71, subbedOff: { minute: 71, replacedBy: "J. Persson" } },
    ] as Player[],
    subs: [
      { number: 8, name: "Matthias Nartey", position: "CM", minutesPlayed: 19, subbedOn: { minute: 71, replacing: "V. Svensson" } },
      { number: 7, name: "Joakim Persson", position: "RW", minutesPlayed: 19, subbedOn: { minute: 71, replacing: "N. Jönsson" } },
      { number: 20, name: "Victor Ekström", position: "LW", minutesPlayed: 1, subbedOn: { minute: 89, replacing: "I. Bjerkebo" } },
      { number: 1, name: "Ismael Diawara", position: "MV", minutesPlayed: 0 },
      { number: 21, name: "Charlie Nildén", position: "FB", minutesPlayed: 0 },
      { number: 25, name: "Odera Adindu", position: "CM", minutesPlayed: 0 },
      { number: 26, name: "Hugo Andersson Mella", position: "MF", minutesPlayed: 0 },
      { number: 27, name: "Ben Magnusson", position: "FB", minutesPlayed: 0 },
      { number: 12, name: "Isaac Höök", position: "MF", minutesPlayed: 0 },
    ] as Player[],
  },

  awayLineup: {
    starters: [
      { number: 1, name: "Warner Hahn", position: "MV", minutesPlayed: 90 },
      { number: 3, name: "Frederik Winther", position: "VB", minutesPlayed: 90 },
      { number: 4, name: "Victor Eriksson", position: "MB", minutesPlayed: 90, yellowCard: 80 },
      { number: 6, name: "Ibrahima Fofana", position: "MB", minutesPlayed: 63, subbedOff: { minute: 63, replacedBy: "T. Tekie" } },
      { number: 2, name: "Hampus Skoglund", position: "HB", minutesPlayed: 90, yellowCard: 66 },
      { number: 11, name: "Oscar Johansson Schellhas", position: "CDM", minutesPlayed: 77, subbedOff: { minute: 77, replacedBy: "N. Persson" } },
      { number: 8, name: "Markus Karlsson", position: "CDM", minutesPlayed: 90 },
      { number: 9, name: "Victor Lind", position: "AM", minutesPlayed: 77, subbedOff: { minute: 77, replacedBy: "O. Hagen" } },
      { number: 20, name: "Nahir Besara", position: "AM", minutesPlayed: 90, isCaptain: true },
      { number: 26, name: "Montader Madjed", position: "AM", minutesPlayed: 82, subbedOff: { minute: 82, replacedBy: "F. Adjei" } },
      { number: 29, name: "Moïse Kaboré", position: "ST", minutesPlayed: 63, subbedOff: { minute: 63, replacedBy: "P. Abraham" } },
    ] as Player[],
    subs: [
      { number: 5, name: "Tesfaldet Tekie", position: "MB", minutesPlayed: 27, subbedOn: { minute: 63, replacing: "I. Fofana" } },
      { number: 7, name: "Paulos Abraham", position: "ST", minutesPlayed: 27, subbedOn: { minute: 63, replacing: "M. Kaboré" } },
      { number: 16, name: "Noah Persson", position: "CM", minutesPlayed: 13, subbedOn: { minute: 77, replacing: "O. Johansson Schellhas" } },
      { number: 15, name: "Oscar Hagen", position: "AM", minutesPlayed: 13, subbedOn: { minute: 77, replacing: "V. Lind" } },
      { number: 28, name: "Frank Adjei", position: "AM", minutesPlayed: 8, subbedOn: { minute: 82, replacing: "M. Madjed" } },
      { number: 31, name: "Oscar Steinke Brånby", position: "MV", minutesPlayed: 0 },
      { number: 33, name: "Björn Hedlöf", position: "FB", minutesPlayed: 0 },
      { number: 27, name: "Felix Jakobsson", position: "MV", minutesPlayed: 0 },
      { number: 21, name: "Sourou Koné", position: "FB", minutesPlayed: 0 },
    ] as Player[],
  },

  matchEvents: [
    { minute: 9, type: "goal", team: "home", player: "Isak Bjerkebo", detail: "Assist: Oscar Krusnell" },
    { minute: 63, type: "substitution", team: "away", player: "Tesfaldet Tekie", detail: "In för Ibrahima Fofana" },
    { minute: 63, type: "substitution", team: "away", player: "Paulos Abraham", detail: "In för Moïse Kaboré" },
    { minute: 66, type: "yellow_card", team: "away", player: "Hampus Skoglund" },
    { minute: 70, type: "goal", team: "home", player: "Robbie Ure" },
    { minute: 71, type: "substitution", team: "home", player: "Matthias Nartey", detail: "In för Victor Svensson" },
    { minute: 71, type: "substitution", team: "home", player: "Joakim Persson", detail: "In för Neo Jönsson" },
    { minute: 77, type: "substitution", team: "away", player: "Noah Persson", detail: "In för Oscar Johansson Schellhas" },
    { minute: 77, type: "substitution", team: "away", player: "Oscar Hagen", detail: "In för Victor Lind" },
    { minute: 80, type: "yellow_card", team: "away", player: "Victor Eriksson" },
    { minute: 82, type: "substitution", team: "away", player: "Frank Adjei", detail: "In för Montader Madjed" },
    { minute: 89, type: "substitution", team: "home", player: "Victor Ekström", detail: "In för Isak Bjerkebo" },
  ] as MatchEvent[],

  teamStats: [
    { label: "xG", home: 0.96, away: 1.41, format: "decimal" },
    { label: "Avslut", home: 11, away: 16, format: "number" },
    { label: "Skott på mål", home: 4, away: 4, format: "number" },
    { label: "Skott utanför", home: 3, away: 10, format: "number" },
    { label: "Blockerade skott", home: 2, away: 2, format: "number" },
    { label: "Bollinnehav", home: 30, away: 70, format: "percent" },
    { label: "Passningar", home: 294, away: 684, format: "number" },
    { label: "Lyckade passningar", home: 214, away: 615, format: "number" },
    { label: "Passningsprocent", home: 73, away: 90, format: "percent" },
    { label: "Bollkontakter i box", home: 7, away: 22, format: "number" },
    { label: "Tacklingar", home: 13, away: 21, format: "number" },
    { label: "Vunna tacklingar", home: 85, away: 67, format: "percent" },
    { label: "Hörnor", home: 3, away: 2, format: "number" },
    { label: "Offsides", home: 1, away: 1, format: "number" },
    { label: "Regelbrott", home: 14, away: 13, format: "number" },
    { label: "Gula kort", home: 0, away: 2, format: "number" },
    { label: "Målvaktsräddningar", home: 4, away: 2, format: "number" },
    { label: "Frisparkar", home: 23, away: 17, format: "number" },
  ],

  keyInsights: [
    {
      title: "Bjerkebo satte tonen tidigt",
      description: "Isak Bjerkebo öppnade målskyttet redan i 9:e minuten efter assist från Oscar Krusnell. Det tidiga målet gav Sirius möjlighet att luta sig tillbaka och kontra.",
      type: "tactical" as const,
    },
    {
      title: "Hammarby styrde men skapade inte",
      description: "70% bollinnehav och 684 passningar (90% precision) -- men bara 4 av 16 avslut gick på mål. Hammarby saknade skärpa i sista tredjedelen.",
      type: "possession" as const,
    },
    {
      title: "Sirius kontrade effektivt",
      description: "Med bara 30% boll och 11 avslut gjorde Sirius 2 mål. 85% vunna tacklingar visar på en disciplinerad defensiv insats som skapade kontringschanser.",
      type: "efficiency" as const,
    },
    {
      title: "Ure avgjorde på kontring",
      description: "Robbie Ure satte 2-0 i minut 70 och stängde matchen. Målet kom i en period då Hammarby pressade som mest efter fem byten.",
      type: "passing" as const,
    },
    {
      title: "Ćelić höll nollan",
      description: "Målvakten David Ćelić stod för 4 räddningar och höll nollan. Sirius försvar rensade 23 gånger och höll Hammarby borta från farliga lägen.",
      type: "defensive" as const,
    },
    {
      title: "Hammarby fick kort",
      description: "Hampus Skoglund (66') och Victor Eriksson (80') fick gula kort i frustration. Sirius däremot klarade sig utan varningar.",
      type: "discipline" as const,
    },
  ],

  standoutPlayers: [
    {
      name: "Isak Bjerkebo",
      team: "home" as const,
      number: 11,
      position: "Vänsterytter",
      highlight: "Målskytt",
      stats: { mål: 1, minuter: 89, avslut: 2 },
      description: "Öppnade målskyttet i 9:e minuten med ett välplacerat skott. Var ett ständigt hot på vänsterkanten under hela matchen.",
    },
    {
      name: "Robbie Ure",
      team: "home" as const,
      number: 9,
      position: "Anfallare",
      highlight: "Målskytt",
      stats: { mål: 1, minuter: 90, avslut: 3 },
      description: "Avgjorde matchen med 2-0-målet i 70:e minuten på en klassisk kontring. Arbetade outtröttligt i 90 minuter.",
    },
    {
      name: "Oscar Krusnell",
      team: "home" as const,
      number: 22,
      position: "Högerback",
      highlight: "Assistkung",
      stats: { assist: 1, minuter: 90, tacklingar: 3 },
      description: "Slog assistpassningen till Bjerkebos 1-0-mål. Solid defensivt och vågade gå framåt i rätt lägen.",
    },
    {
      name: "David Ćelić",
      team: "home" as const,
      number: 34,
      position: "Målvakt",
      highlight: "Höll nollan",
      stats: { räddningar: 4, minuter: 90 },
      description: "Stod för 4 viktiga räddningar och höll nollan trots Hammarbys press. Trygg och samlad i målet.",
    },
    {
      name: "Nahir Besara",
      team: "away" as const,
      number: 20,
      position: "Offensiv mittfältare",
      highlight: "Kapten & bollvinnare",
      stats: { nyckelpassningar: 3, minuter: 90 },
      description: "Hammarbys kapten och mest kreativa spelare. Skapade chanser men saknade avslutare framför sig.",
    },
    {
      name: "Markus Karlsson",
      team: "away" as const,
      number: 8,
      position: "Defensivt mittfält",
      highlight: "Passningssäker",
      stats: { passningar: 82, precision: 93, minuter: 90 },
      description: "Dikterade tempo med hög passningssäkerhet. Kunde dock inte bryta ner Sirius organiserade försvar.",
    },
  ],

  xgTimeline: [
    { minute: 9, team: "home" as const, xg: 0.42, result: "goal" as const },
    { minute: 12, team: "home" as const, xg: 0.08, result: "miss" as const },
    { minute: 18, team: "away" as const, xg: 0.05, result: "miss" as const },
    { minute: 23, team: "away" as const, xg: 0.12, result: "miss" as const },
    { minute: 27, team: "away" as const, xg: 0.03, result: "miss" as const },
    { minute: 35, team: "away" as const, xg: 0.15, result: "saved" as const },
    { minute: 40, team: "away" as const, xg: 0.08, result: "miss" as const },
    { minute: 44, team: "home" as const, xg: 0.06, result: "miss" as const },
    { minute: 48, team: "away" as const, xg: 0.04, result: "miss" as const },
    { minute: 52, team: "away" as const, xg: 0.22, result: "saved" as const },
    { minute: 56, team: "home" as const, xg: 0.03, result: "miss" as const },
    { minute: 60, team: "away" as const, xg: 0.09, result: "miss" as const },
    { minute: 63, team: "away" as const, xg: 0.06, result: "miss" as const },
    { minute: 67, team: "away" as const, xg: 0.18, result: "saved" as const },
    { minute: 70, team: "home" as const, xg: 0.13, result: "goal" as const },
    { minute: 71, team: "home" as const, xg: 0.05, result: "miss" as const },
    { minute: 74, team: "away" as const, xg: 0.11, result: "miss" as const },
    { minute: 78, team: "home" as const, xg: 0.04, result: "miss" as const },
    { minute: 80, team: "away" as const, xg: 0.07, result: "miss" as const },
    { minute: 83, team: "home" as const, xg: 0.15, result: "miss" as const },
    { minute: 85, team: "away" as const, xg: 0.14, result: "miss" as const },
    { minute: 90, team: "away" as const, xg: 0.07, result: "miss" as const },
  ],

  momentum: [
    { minute: 0, value: 0 },
    { minute: 5, value: -10 },
    { minute: 9, value: 40 },
    { minute: 15, value: 20 },
    { minute: 20, value: -15 },
    { minute: 25, value: -25 },
    { minute: 30, value: -20 },
    { minute: 35, value: -10 },
    { minute: 40, value: -15 },
    { minute: 45, value: 5 },
    { minute: 50, value: -20 },
    { minute: 55, value: -35 },
    { minute: 60, value: -40 },
    { minute: 63, value: -30 },
    { minute: 66, value: -25 },
    { minute: 70, value: 35 },
    { minute: 75, value: 15 },
    { minute: 80, value: -10 },
    { minute: 85, value: -5 },
    { minute: 88, value: 10 },
    { minute: 90, value: 15 },
  ],
};
