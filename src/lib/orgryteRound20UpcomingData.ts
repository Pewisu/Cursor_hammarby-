import type { UpcomingOpponentReport } from "@/lib/upcomingOpponentsData";

/**
 * Omgång 20 · Örgryte – Hammarby · 6 sep 2026 · Gamla Ullevi
 * Källor: Twelve season report Örgryte (3 sep 2026) + Bolldata lagdata/API (3 sep 2026)
 * HIF Twelve-fasranker återanvänds från senaste Hammarby-rapport (20 aug) där färsk saknas.
 */
export const orgryteRound20Report: UpcomingOpponentReport = {
  round: 20,
  roundLabel: "Omgång 20",
  hidden: false,
  fixture: "Örgryte - Hammarby",
  dateLabel: "Söndag 6 september 2026 · 14:00 · Gamla Ullevi, Göteborg",
  venueLabel: "Gamla Ullevi (bortaplan)",
  comparisonLabel: "Allsvenskan 2026 · 19 omgångar",
  oneLineSummary:
    "Borta på Gamla Ullevi: HIF vann 8–1 hemma i april. HIF är 2:a (36p) efter derbyförlusten mot AIK. Örgryte är 15:a (14p) – Twelve Outcome 15:a, sämst i insläppta (2,21/match) och opp. np-skott (16,7). Djup låglinje, svag transition, ineffektiv attack.",
  hifBadges: ["2:a i Allsvenskan", "36p", "Form: WWWL"],
  opponentBadges: ["15:a i Allsvenskan", "14p", "Outcome 15:a · sämst GA"],
  introStats: [
    { label: "HIF tabell", value: "2:a (36p)", tone: "emerald" },
    { label: "ÖIS tabell / xP", value: "15:a / 15:a", tone: "amber" },
    { label: "xP / match", value: "HIF topp · ÖIS 0,92", tone: "blue" },
    { label: "ÖIS p−xP", value: "−0,18 (11:e)", tone: "amber" },
    { label: "Förra mötet", value: "HIF 8–1", tone: "emerald" },
  ],
  xpComparison: {
    title: "Poäng vs xP",
    subtitle: "Twelve Outcome · ÖIS 3 sep · HIF Bolldata 19 omg / Twelve 20 aug",
    headline:
      "Örgryte tar 0,74 p/match (15:a) och förtjänar ~0,92 xP (15:a) – underliggande spelet matchar bottenplaceringen. HIF är 2:a i poäng (1,89/match) och fortsätter skapa elitnivå (2,55 xG/match).",
    rows: [
      {
        label: "Poäng / match",
        hammarbyValue: "1,89",
        hammarbyRank: "2:a (36p)",
        opponentValue: "0,74",
        opponentRank: "15:a (14p)",
        note: "Tabellgap 2 vs 15 – och det speglas i spelet.",
      },
      {
        label: "xP / match (Twelve)",
        hammarbyValue: "topp (≈2,0+)",
        hammarbyRank: "elit",
        opponentValue: "0,92",
        opponentRank: "15:a av 16",
        note: "ÖIS ligger rättvist i botten – ingen stor 'otur'-historia.",
      },
      {
        label: "p − xP",
        hammarbyValue: "nära 0",
        hammarbyRank: "rättvist",
        opponentValue: "−0,18",
        opponentRank: "11:e av 16",
        note: "ÖIS underpresterar lätt – men huvudproblemet är nivån, inte variance.",
      },
      {
        label: "Tabell vs xP-rank",
        hammarbyValue: "2:a ≈ topp",
        hammarbyRank: "rättvist",
        opponentValue: "15:a ≈ 15:a",
        opponentRank: "rättvist svagt",
        note: "Spela mot ÖIS:s spelet: läckande box + svag transition.",
      },
    ],
    takeaway:
      "Det här är inte ett 'varning för överpresterande bottenlag'. Örgryte är 15:a i både poäng och xP. HIF ska dominera field tilt, straffa boxen och inte ge dem gratis omställningar – trots derbybesvikelsen.",
    overperformanceTitle: "Varför ligger Örgryte i botten?",
    overperformanceSummary:
      "ÖIS underpresterar lätt (−0,18 p−xP) men är framför allt underliggande svaga: sämst i insläppta (2,21), näst sämst i xGA-klassen (2,14–2,15), Attack 13 / Chance Creation 11 / Outcome 15. Positiv trend i chansskapande räcker inte när defensiven läcker konstant.",
    overperformanceDrivers: [
      {
        label: "Defensiv kollaps (huvudorsak)",
        value: "2,21 insläppta · Opp. np-skott 16,7 (16:e)",
        explanation:
          "Twelve Opp. Chance Creation 14:e. Motståndare får 25,6 boxberöringar och 2,06 opp. np xG/match. Låglinje (def. action height 38,5 m) + låg intensitet (4,92, 14:e) = konstant tryck.",
      },
      {
        label: "Svag defensiv transition",
        value: "Twelve 14:e · opp. xG inom 10s 0,37",
        explanation:
          "Efter bollvinster/turnovers (36,2, 15:e) får motståndaren snabba HQ-lägen. HIF:s Attacking Transition (1:a) är exakt vapnet.",
      },
      {
        label: "Ineffektiv attack",
        value: "1,31 xG · 1,16 mål · field tilt 39 % (16:e)",
        explanation:
          "De når final third för sällan (31 %) och skapar för lite trots viss förbättring i CC på sistone. Finish ≈ xG – de är inte 'otursamma' framåt i volym.",
      },
      {
        label: "Hemmafacit ger ingen mur",
        value: "1V–5O–3F · 15–17 i mål",
        explanation:
          "Gamla Ullevi har inte varit fästning. Många oavgjorda, få segrar – HIF ska attackera hemmaplansmyten direkt.",
      },
    ],
  },
  previousMeeting: {
    date: "2026-04-18",
    fixture: "Hammarby - Örgryte",
    result: "8–1",
    venue: "home",
    outcome: "win",
    halfTimeScore: "4–1",
    scorers: [
      { team: "hammarby", player: "Noah Persson", minute: 10 },
      { team: "hammarby", player: "Nahir Besara", minute: 17 },
      { team: "hammarby", player: "Paulos Abraham", minute: 22 },
      { team: "opponent", player: "Christoffer Styffe", minute: 31 },
      { team: "hammarby", player: "Victor Lind", minute: 32 },
      { team: "hammarby", player: "Montader Madjed", minute: 56 },
      { team: "hammarby", player: "Nikola Vasić", minute: 69 },
      { team: "hammarby", player: "Nikola Vasić", minute: 78 },
      { team: "hammarby", player: "Nikola Vasić", minute: 85 },
    ],
    xgHammarby: 4.37,
    xgOpponent: 1.46,
    contextNote:
      "HIF öppnade 3–0 på 22 minuter (Persson, Besara, Abraham). Styffe reducerade (31'), Lind slog tillbaka direkt (32') – 4–1 i paus. Madjed 56' och Vasić-hattrick som inhoppare (69'/78'/85') spikade 8–1. Bolldata: 4,37–1,46 xG, 32–12 avslut, 44–11 boxberöringar.",
    keyStory:
      "Total offensiv kollaps för ÖIS på 3Arena. HIF:s press (PPDA 4,06 i matchen) och boxvolym krossade deras låglinje. På Gamla Ullevi handlar det om samma sak i mindre extrem form: field tilt, HQ-chanser, och att stänga Christoffersson/Sana i omställningsfickor.",
    seriesTurnedNote:
      "Sedan 8–1 har ÖIS fortsatt i botten (14p på 19). HIF kommer in efter derbyförlust (2–3 vs AIK) trots 4,26 xG – hunger på poäng, inte på bekräftelse av nivågapet.",
  },
  mobileTakeaways: [
    "HIF 2:a (36p), ÖIS 15:a (14p). Twelve: ÖIS Outcome 15:a, xP 0,92, p−xP −0,18.",
    "Förra mötet 18 apr: HIF 8–1. Vasić-hattrick som inhoppare. 4,37–1,46 xG.",
    "ÖIS sämst i insläppta (2,21) och opp. np-skott (16,7). Opp. Chance Creation 14:e.",
    "Stil: djup låglinje, PPDA 8,32, def. intensitet 4,92 (14:e). Bygger bakifrån (84 % buildup) men field tilt 39 % (16:e).",
    "Håll koll: Noah Christoffersson (8 mål) och Tobias Sana (5 assist, 18 starter).",
    "ÖIS hemma: 1V–5O–3F. Inget fäste – HIF ska styra tempo och boxen.",
    "Nyckel: straffa läckande box, vinna andraboll mot deras blandade långboll/build-up, stäng transition bakåt.",
    "Efter derbyförlusten: lita på processen (2,55 xG/match) – ÖIS straffar sällan volym.",
  ],
  dataSources: [
    "Twelve season report Örgryte: https://reports.twelve.football/reports/%C3%B6rgryte-season-report-qy3d4Z8ZQ9.pdf (3 sep 2026)",
    "Twelve season report Hammarby: https://reports.twelve.football/reports/hammarby-season-report-N7BNDjoAkn.pdf (20 aug 2026)",
    "Bolldata lagdata/API: matches/team/stats + goals (hämtad 3 sep 2026)",
    "Bolldata match: https://bolldata.se/allsvenskan/matcher/2026/2026-04-18/hammarby-orgryte-8-1",
  ],
  quickStatusCards: [
    {
      title: "Hammarby just nu",
      body: "2:a (36p), 11V–3O–5F, 44–18 i mål. Ligans bästa xG (2,55) och lägsta insläppta (0,95/match). Senaste: 2–3 borta mot AIK trots 4,26 xG – före det WWW mot Häcken/Kalmar/GAIS.",
      tone: "emerald",
    },
    {
      title: "Örgryte just nu",
      body: "15:a (14p) på 19 matcher, 3V–5O–11F, 22–42. Twelve Outcome 15:a. Senaste: 0–1 borta mot Göteborg efter 1–1 hemma mot Halmstad. Hemma 1V–5O–3F.",
      tone: "amber",
    },
    {
      title: "Nyckelduell: boxvolym vs låglinje",
      body: "HIF skapar mest (2,55 xG, 20,9 avslut). ÖIS släpper till 2,15 xGA och 28,3 opp. boxberöringar. Deras låglinje överlever inte HIF:s field tilt – om HIF sätter.",
      tone: "blue",
    },
  ],
  styleChips: [
    {
      label: "🛡️ Djup låglinje",
      sub: "Def. action height 38,5 m · PPDA 8,32 (14:e)",
      color: "border-sky-600/50 bg-sky-950/60 text-sky-200",
    },
    {
      label: "🧱 Passiv defensiv",
      sub: "Intensitet 4,92 (14:e) · dueller vunna 58 %",
      color: "border-sky-600/50 bg-sky-950/60 text-sky-200",
    },
    {
      label: "💥 Boxen läcker",
      sub: "Opp. CC 14:e · opp. np-skott 16,7 (16:e)",
      color: "border-emerald-600/50 bg-emerald-950/60 text-emerald-200",
    },
    {
      label: "⚙️ Bygger bakifrån",
      sub: "84 % buildup · long ball 13 % · blandad penetration",
      color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300",
    },
    {
      label: "📉 Outcome 15:a",
      sub: "0,74 p/match · xP 0,92 · field tilt 39 % (16:e)",
      color: "border-rose-600/50 bg-rose-950/60 text-rose-200",
    },
  ],
  opponentStyle: [
    "Defenderar djupt och passivt: låglinje nära eget mål, låg defensiv intensitet (4,92, 14:e), PPDA 8,32. Motståndaren får bygga utan störning.",
    "I possession: blandning av buildup bakifrån (84 % efter utspark) och normal andel långboll (13 %). Passtempo 19,48 (12:e) – varken extremt långsamt eller snabbt.",
    "Penetration via inlägg (32 % box entries) och carries (17 %), mindre dribbling. Chance creation mer direkt (27 % shots from direct) än sustained (8 %).",
    "Attacking transition svag (Twelve 14:e): få recoveries högt, låg xG inom 10s efter bollvinst (0,13, 16:e). De kontrar sällan effektivt från djupt.",
    "Defensive transition läcker (Fourteen 14:e): turnovers 36,2 (15:e), opp. xG inom 10s 0,37. Billiga tapp framför egen box straffas.",
    "Bolldata: 1,32 xG/match (14:a) men 2,15 xGA (15:a). Possession 44,6 % (15:a), passningsprecision 80,3 % (sämst).",
  ],
  styleProfile: [
    {
      label: "Chansbegränsning (Twelve)",
      value: "Opp. Chance Creation 14:e · opp. np xG 2,06",
      score: 18,
      explanation:
        "Största svagheten. HIF:s boxvolym är exakt rätt vapen – 8–1 i april var facit.",
    },
    {
      label: "Defensiv transition (Twelve)",
      value: "14:e · opp. xG inom 10s 0,37",
      score: 20,
      explanation:
        "Efter bollförlust blir det farligt fort. HIF Att. Transition 1:a ska straffa varje slarvigt tapp.",
    },
    {
      label: "Låglinje / press",
      value: "PPDA 8,32 · intensitet 4,92 (14:e)",
      score: 25,
      explanation:
        "De vill sitta lågt. HIF får tid på bollen – men måste omsätta kontroll i boxberöringar, inte ytterskott.",
    },
    {
      label: "Attack / field tilt",
      value: "Attack 13:e · field tilt 39 % (16:e)",
      score: 22,
      explanation:
        "De styr sällan matchbilden. När HIF pressar högt tvingas ÖIS ännu djupare.",
    },
    {
      label: "Hemmaplan 2026 (Bolldata)",
      value: "1V–5O–3F · 9 matcher · 15–17",
      score: 30,
      explanation:
        "Gamla Ullevi ger poäng via oavgjorda mer än segrar. HIF ska undvika 0–0-fällan med tidig intensitet.",
    },
  ],
  twelvePhaseRanks: [
    {
      label: "Defence",
      hammarbyRank: 1,
      opponentRank: 14,
      talkTrack: "HIF elite i press/struktur. ÖIS 14:e – passiv låglinje utan duellstyrka.",
    },
    {
      label: "Defensive Transition",
      hammarbyRank: 2,
      opponentRank: 14,
      talkTrack: "Stort gap. ÖIS läcker efter turnover – HIF:s snabbhet framåt avgör.",
    },
    {
      label: "Opp. Chance Creation",
      hammarbyRank: 2,
      opponentRank: 14,
      talkTrack: "ÖIS begränsar chanser uselt. Boxen är öppen – HIF ska fylla den.",
    },
    {
      label: "Attacking Transition",
      hammarbyRank: 1,
      opponentRank: 14,
      talkTrack: "HIF etta i omställningsattack. ÖIS nästan sämst på att kontra.",
    },
    {
      label: "Attack",
      hammarbyRank: 1,
      opponentRank: 13,
      talkTrack: "HIF dominerar etablerat anfall. ÖIS under snitt utan field tilt.",
    },
    {
      label: "Chance Creation",
      hammarbyRank: 1,
      opponentRank: 11,
      talkTrack: "ÖIS CC 11:e – minst dåliga fasen, men fortfarande under snitt.",
    },
    {
      label: "Outcome",
      hammarbyRank: 1,
      opponentRank: 15,
      talkTrack: "HIF omsätter spelet. ÖIS 15:a i både poäng och xP.",
    },
  ],
  bolldataRankings: [
    {
      label: "xG / match",
      group: "offensiv",
      hammarbyValue: "2,55",
      hammarbyRank: 1,
      opponentValue: "1,32",
      opponentRank: 14,
      talkTrack: "HIF skapar mest. ÖIS 14:a – stor offensiv klyfta.",
    },
    {
      label: "Gjorda mål / match",
      group: "offensiv",
      hammarbyValue: "2,32",
      hammarbyRank: 2,
      opponentValue: "1,16",
      opponentRank: 13,
      talkTrack: "HIF sätter fler. ÖIS under snitt i finish-volym.",
    },
    {
      label: "Avslut / match",
      group: "offensiv",
      hammarbyValue: "20,9",
      hammarbyRank: 1,
      opponentValue: "10,8",
      opponentRank: 13,
      talkTrack: "Volymfördel HIF – vapnet mot ÖIS:s läckande box.",
    },
    {
      label: "Skott på mål / match",
      group: "offensiv",
      hammarbyValue: "7,4",
      hammarbyRank: 1,
      opponentValue: "4,1",
      opponentRank: 13,
      talkTrack: "HIF träffar mål oftare. Kräv samma på Ullevi.",
    },
    {
      label: "Boxberöringar / match",
      group: "offensiv",
      hammarbyValue: "32,2",
      hammarbyRank: 1,
      opponentValue: "18,8",
      opponentRank: 13,
      talkTrack: "HIF lever i straffområdet. ÖIS kommer dit för sällan.",
    },
    {
      label: "Nyckelpassningar / match",
      group: "offensiv",
      hammarbyValue: "6,63",
      hammarbyRank: 1,
      opponentValue: "4,26",
      opponentRank: 10,
      talkTrack: "Kreativ fördel HIF. Besara/Abraham dikterar sista passningen.",
    },
    {
      label: "Bollinnehav %",
      group: "offensiv",
      hammarbyValue: "60,2%",
      hammarbyRank: 1,
      opponentValue: "44,6%",
      opponentRank: 15,
      talkTrack: "HIF styr bollen. ÖIS 15:a – deras låglinje bjuder på possession.",
    },
    {
      label: "xGA / match",
      group: "defensiv",
      hammarbyValue: "1,26",
      hammarbyRank: 3,
      opponentValue: "2,15",
      opponentRank: 15,
      talkTrack: "ÖIS släpper till näst mest xG-klassen – öppet mål för HIF.",
    },
    {
      label: "Insläppta / match",
      group: "defensiv",
      hammarbyValue: "0,95",
      hammarbyRank: 1,
      opponentValue: "2,21",
      opponentRank: 16,
      talkTrack: "ÖIS sämst i ligan på insläppta. HIF tightast.",
    },
    {
      label: "Opp. boxberöringar",
      group: "defensiv",
      hammarbyValue: "14,1",
      hammarbyRank: 1,
      opponentValue: "28,3",
      opponentRank: 15,
      talkTrack: "ÖIS boxen är motorväg. HIF stänger sin egen.",
    },
    {
      label: "Recoveries / match",
      group: "defensiv",
      hammarbyValue: "87,4",
      hammarbyRank: 4,
      opponentValue: "81,5",
      opponentRank: 10,
      talkTrack: "HIF vinner bollen oftare. ÖIS mer reaktiv.",
    },
    {
      label: "Långa bollar / match",
      group: "stil",
      hammarbyValue: "34,6",
      hammarbyRank: 16,
      opponentValue: "41,6",
      opponentRank: 13,
      talkTrack: "ÖIS mer direkt i volym. HIF kort-kort – andraboll vid deras långa.",
    },
    {
      label: "Progressiva passningar",
      group: "stil",
      hammarbyValue: "74,6",
      hammarbyRank: 3,
      opponentValue: "63,9",
      opponentRank: 15,
      talkTrack: "HIF driver framåt. ÖIS fastnar oftare bakom mittlinjen.",
    },
    {
      label: "Passningsprecision",
      group: "stil",
      hammarbyValue: "87,2%",
      hammarbyRank: 1,
      opponentValue: "80,3%",
      opponentRank: 16,
      talkTrack: "ÖIS sämst i precision – press belönas med turnovers.",
    },
    {
      label: "Poäng / match",
      group: "stil",
      hammarbyValue: "1,89",
      hammarbyRank: 2,
      opponentValue: "0,74",
      opponentRank: 15,
      talkTrack: "Tabellfacit i en siffra. Gapet är strukturellt.",
    },
  ],
  spiderComparison: [
    {
      label: "xG / match",
      hammarbyValue: "2,55",
      opponentValue: "1,32",
      hammarbyScore: 100,
      opponentScore: 52,
      note: "HIF 1:a, ÖIS 14:a. Tydlig offensiv fördel.",
    },
    {
      label: "xP / match",
      hammarbyValue: "≈2,0+",
      opponentValue: "0,92",
      hammarbyScore: 100,
      opponentScore: 45,
      note: "ÖIS 15:a i xP. Underliggande gapet speglar tabellen.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,9",
      opponentValue: "10,8",
      hammarbyScore: 100,
      opponentScore: 52,
      note: "Volymfördel HIF – samma vapen som i 8–1.",
    },
    {
      label: "Bollinnehav (%)",
      hammarbyValue: "60%",
      opponentValue: "45%",
      hammarbyScore: 100,
      opponentScore: 74,
      note: "HIF styr. ÖIS låglinje bjuder på boll – omsätt den.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,26",
      opponentValue: "2,15",
      hammarbyScore: 92,
      opponentScore: 35,
      note: "ÖIS släpper till klart mer xG – sårbara defensivt.",
    },
    {
      label: "Insläppta / match",
      hammarbyValue: "0,95",
      opponentValue: "2,21",
      hammarbyScore: 100,
      opponentScore: 20,
      note: "ÖIS sämst i ligan. HIF bäst. Extremt gap.",
    },
  ],
  rankedMetrics: [
    {
      label: "Poäng / match",
      hammarbyValue: "1,89",
      hammarbyRank: "2:a av 16",
      opponentValue: "0,74",
      opponentRank: "15:a av 16",
      note: "Tabellgapet är strukturellt – inte variance.",
    },
    {
      label: "xP / match (Twelve)",
      hammarbyValue: "topp",
      hammarbyRank: "elit",
      opponentValue: "0,92",
      opponentRank: "15:a av 16",
      note: "ÖIS förtjänar bottenplaceringen.",
    },
    {
      label: "xG / match",
      hammarbyValue: "2,55",
      hammarbyRank: "1:a av 16",
      opponentValue: "1,32",
      opponentRank: "14:a av 16",
      note: "Hammarby skapar mest. ÖIS under snittet.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,26",
      hammarbyRank: "3:a av 16",
      opponentValue: "2,15",
      opponentRank: "15:a av 16",
      note: "ÖIS boxen är öppen. HIF ska straffa.",
    },
    {
      label: "Insläppta / match",
      hammarbyValue: "0,95",
      hammarbyRank: "1:a av 16",
      opponentValue: "2,21",
      opponentRank: "16:e av 16",
      note: "Sämst vs bäst – tydligaste defensiva gapet.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,9",
      hammarbyRank: "1:a av 16",
      opponentValue: "10,8",
      opponentRank: "13:e av 16",
      note: "Förra mötet: 32–12. Volym vann – igen.",
    },
  ],
  goalWindows: [
    { window: "0–15'", hammarbyGoals: 7, opponentConcededGoals: 4 },
    { window: "16–30'", hammarbyGoals: 4, opponentConcededGoals: 6 },
    { window: "31–45+'", hammarbyGoals: 8, opponentConcededGoals: 9 },
    { window: "46–60'", hammarbyGoals: 12, opponentConcededGoals: 6 },
    { window: "61–75'", hammarbyGoals: 8, opponentConcededGoals: 7 },
    { window: "76–90+'", hammarbyGoals: 5, opponentConcededGoals: 9 },
  ],
  goalTypeNotes: [
    {
      label: "ÖIS sårbar sent i halvlekar",
      value: "9 insläppta 31–45+ · 9 insläppta 76–90+",
      interpretation:
        "Slutet av båda halvlekarna läcker. Håll intensitet in i paus och full tid – exakt där 8–1 också växte.",
    },
    {
      label: "HIF starkast 46–60",
      value: "12 mål i 46–60'",
      interpretation:
        "Andra halvlekens start är HIF:s mest produktiva period – perfekt mot ett ÖIS som ofta tappar struktur sent.",
    },
    {
      label: "Förra mötets facit",
      value: "4–1 HT · Vasić-hattrick 69–85'",
      interpretation:
        "Tidig knockout + sen avrättning. På Ullevi: tidig ton räcker långt mot deras hemma-oavgjorda.",
    },
    {
      label: "ÖIS hemmafacit",
      value: "1V–5O–3F · 15–17 i mål",
      interpretation:
        "De tar poäng via oavgjorda. HIF får inte nöja sig med boll – måste omsätta i mål före 70'.",
    },
  ],
  trafficLightCards: [
    {
      metric: "Förra mötet",
      bigNumber: "8–1",
      badge: "HIF KROSSADE I APRIL",
      color: "green",
      rankNote: "4,37–1,46 xG · Vasić-hattrick · 32–12 avslut",
      explanation:
        "Total dominans på 3Arena. Samma strukturella gap finns kvar – ÖIS är fortfarande 15:a. Frågan är om HIF omsätter det borta efter derbybesvikelsen.",
      podcastComment:
        "8–1 är inte facit för söndagen – men det är facit för nivåskillnaden. ÖIS har inte stängt boxen sedan dess.",
    },
    {
      metric: "xP-jämförelse",
      bigNumber: "topp vs 0,92",
      badge: "HIF ELIT · ÖIS 15:A I xP",
      color: "green",
      rankNote: "Poäng 2:a/15:a · ÖIS p−xP −0,18",
      explanation:
        "Örgryte ligger rättvist i botten. Ingen AIK-liknande överprestation att akta sig för – spelet och tabellen säger samma sak.",
      podcastComment:
        "Poddens trygghetssiffra: 0,92 xP/match för ÖIS. De är inte 'bättre än tabellen'.",
    },
    {
      metric: "ÖIS insläppta",
      bigNumber: "2,21",
      badge: "SÄMST I LIGAN",
      color: "green",
      rankNote: "Opp. np-skott 16,7 (16:e) · Opp. CC 14:e",
      explanation:
        "Defensiven är säsongens huvudproblem. Låglinje + låg intensitet + läckande transition = konstant HQ-tryck. HIF ska fylla boxen, inte nöja sig med halvchanser.",
      podcastComment:
        "2,21 insläppta per match. Det är motorvägen in i deras straffområde – Abraham och Lind ska köra den.",
    },
  ],
  spotlightKey:
    "Matchnyckel: attackera ÖIS:s låglinje med boxvolym (Opp. CC 14:e, 2,21 insläppta), forcera turnovers högt mot deras usla passningsprecision (80,3 %, 16:e) och straffa defensiv transition (Twelve 14:e). Respektera Christoffersson (8 mål) i de få kontringarna – men lita på att underliggande spelet (xP 15:a, field tilt 39 %) inte matchar någon hemmaplansmyt. Efter derbyförlusten: tidig intensitet på Ullevi, ingen 0–0-fälla.",
  hammarbyPlan: {
    withBall: [
      "Cirkulera framför deras låglinje och BRYT in i boxen. ÖIS Opp. CC 14:e / opp. np-skott 16,7 – volym och HQ, inte ytterskott.",
      "Utnyttja buildup-svagheten: 84 % av deras anfall startar bakifrån med dålig precision (80,3 %). Pressa första passningen från backlinjen.",
      "Halvrum + sista passning till Abraham/Lind/Besara. Inlägg fungerar (de släpper 32 % box entries via crosses) – blanda med carries.",
      "Vid bollvinst högt: Attacking Transition 1:a vs 14:a. Slå vertikalt direkt – deras recover efter turnover är långsam (tid till def. action 6,93 s).",
    ],
    withoutBall: [
      "Pressa MEDEL–HÖGT (deras PPDA 8,32 bjuder in). Tvinga misstag i uppbyggnad – ÖIS turnovers 36,2 (15:e).",
      "Stäng Tobias Sana (5 assist, nav) och Noah Christoffersson (8 mål) i omställningsfickor. De skapar sällan – men kliniskt när det öppnar sig.",
      "Begränsa direkta attacker (27 % av deras skott). Tvinga dem till sustained possession där field tilt (39 %) avslöjar dem.",
      "Andraboll vid deras långbollar (13 % / 41,6 långa/match). HIF recoveries 87,4 – vinn den duellen och starta om.",
    ],
    matchManagement: [
      "0–15: sätt ton DIREKT. ÖIS hemma tar många oavgjorda – tidigt mål dödar deras plan.",
      "31–45+ och 76–90+: ÖIS:s läckande fönster (9+9 insläppta). Extra energi in i paus och full tid.",
      "46–60: HIF:s bästa fönster (12 mål). Push efter paus – Madjed/Vasić-zonen från april.",
      "Vid ledning: ge dem possession i egen halvplan, stäng Sana→Christoffersson, döda kontringar. Deras Att. Transition 14:e klarar sällan att straffa.",
    ],
  },
  playersToWatch: [
    {
      name: "Noah Christoffersson",
      position: "Forward · Sverige",
      scoutBadge: "🎯 8 mål · ÖIS bästa skytt",
      stats: [
        { label: "Mål", value: "8" },
        { label: "Assist", value: "1" },
        { label: "Min", value: "1446" },
      ],
      threat:
        "Lagets tydliga målskytt: 8 mål på 18 matcher (14 starter). När ÖIS väl når boxen är det ofta via honom. Farligast i de få direkta attackerna och vid fasta.",
      motivation:
        "Markera tight i boxen, vinn förstakontakt vid inlägg. Ge honom inte frilägen i omställning – det är nästan hela deras hotbild.",
    },
    {
      name: "Tobias Sana",
      position: "Midfielder · Burkina Faso",
      scoutBadge: "🧠 5 assist · 18 starter · navet",
      stats: [
        { label: "Mål", value: "2" },
        { label: "Assist", value: "5" },
        { label: "Min", value: "1677" },
      ],
      threat:
        "Spelat alla 18 matcher från start. Lagets kreativa nav med 5 assist – den som hittar Christoffersson och styr buildup från mittfältet. Mer skapare än avslutare.",
      motivation:
        "Pressa mottagningen, tvinga honom bakåt/sidledes. När Sana får tid får ÖIS sina sällsynta HQ-lägen.",
    },
  ],
  headToHead: {
    sampleSize: 1,
    description:
      "Örgryte är nykomling 2026 – enda Allsvenskan-mötet hittills är 8–1 på 3Arena i april. Äldre H2H ligger långt tillbaka (Superettan/äldre Allsvenskan).",
    summaryCards: [
      {
        title: "Senaste mötet",
        value: "HIF 8–1 ÖIS (apr 2026)",
        note: "4,37–1,46 xG · Vasić-hattrick.",
        tone: "emerald",
      },
      {
        title: "På Gamla Ullevi 2026",
        value: "ÖIS 1V–5O–3F hemma",
        note: "Inget fäste – många oavgjorda.",
        tone: "amber",
      },
      {
        title: "Form nu",
        value: "HIF WWWL · ÖIS LLDL",
        note: "HIF stabilare trots derbyförlust.",
        tone: "emerald",
      },
    ],
    trendBullets: [
      "Enda 2026-mötet: HIF 8–1 hemma – extrem offensiv dominans.",
      "ÖIS har inte vunnit mot HIF i Allsvenskan 2026 och ligger kvar i bottenstriden.",
      "ÖIS hemmafacit (1V–5O–3F) tyder på att de tar poäng via oavgjorda – HIF måste omsätta kontroll.",
      "Underliggande: HIF Outcome/Attack topp, ÖIS Outcome 15:a. Kvalitetsgapet är större än 'bara' 2 vs 15 i tabellen.",
    ],
    matches: [
      {
        date: "2026-04-18",
        fixture: "Hammarby - Örgryte",
        result: "8-1",
        venue: "home",
        outcome: "win",
        hammarbyGoals: 8,
        opponentGoals: 1,
        hammarbyXg: 4.37,
        opponentXg: 1.46,
        hammarbyShots: 32,
        opponentShots: 12,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2026/2026-04-18/hammarby-orgryte-8-1",
      },
    ],
  },
  glossary: [
    {
      term: "Twelve-fas",
      explanation:
        "Twelve delar in lagprestation i sju faser (Defence → Outcome). Rank 1 av 16 = bäst i Allsvenskan.",
    },
    {
      term: "xGA",
      explanation:
        "Expected Goals Against – hur många mål motståndaren förväntas göra utifrån chanskvalitet.",
    },
    {
      term: "xP",
      explanation:
        "Expected Points – poäng laget 'förtjänat' utifrån matchernas xG-bilder. ÖIS 15:a (0,92/match).",
    },
    {
      term: "p − xP",
      explanation:
        "Poäng minus expected points. Negativt = underprestation. ÖIS −0,18 (11:e).",
    },
    {
      term: "Opp. Chance Creation",
      explanation:
        "Hur bra laget begränsar motståndarens chanser. ÖIS 14:e = läcker många HQ-lägen.",
    },
    {
      term: "Defensive Transition",
      explanation:
        "Sekunderna efter bollförlust. ÖIS 14:e – en av deras svagaste Twelve-faser.",
    },
    {
      term: "PPDA",
      explanation:
        "Passningar per defensiv aktion. Högre = lösare press. ÖIS 8,32 (14:e).",
    },
    {
      term: "Field tilt",
      explanation:
        "Andel final-third-possession vs motståndaren. ÖIS 39 % (16:e) – de styr sällan matchbilden.",
    },
    {
      term: "Låglinje",
      explanation:
        "Defensiv action height ~38,5 m. ÖIS sitter djupt och absorberar istället för att pressa.",
    },
  ],
};
