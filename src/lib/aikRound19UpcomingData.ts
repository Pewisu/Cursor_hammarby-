import type { UpcomingOpponentReport } from "@/lib/upcomingOpponentsData";

/**
 * Omgång 19 · AIK – Hammarby · 30 aug 2026 · Strawberry Arena
 * Källor: Twelve season report AIK (27 aug 2026) + Hammarby (20 aug 2026) + Bolldata (27 aug 2026)
 */
export const aikRound19Report: UpcomingOpponentReport = {
  round: 19,
  roundLabel: "Omgång 19",
  hidden: false,
  fixture: "AIK - Hammarby",
  dateLabel: "Söndag 30 augusti 2026 · 14:00 · Strawberry Arena, Solna",
  venueLabel: "Strawberry Arena (bortaplan)",
  comparisonLabel: "Allsvenskan 2026 · 17–18 omgångar",
  oneLineSummary:
    "Stockholmsderby borta: AIK vann 2–1 på 3Arena i maj (Hove + Celina). HIF är 2:a (36p) efter 2–0 mot GAIS. AIK är 6:a (28p) men 12:a i xP – ligans största överprestation (+0,59 p−xP). De är svaga hemma (3V–0O–4F) och sårbara i boxen (opp. np xG 2,03 · Opp. Chance Creation 14:e).",
  hifBadges: ["2:a i Allsvenskan", "36p", "Form: WDWWW"],
  opponentBadges: ["6:a i Allsvenskan", "28p", "1:a i p−xP-överprestation"],
  introStats: [
    { label: "HIF tabell / xP", value: "2:a / 2:a", tone: "emerald" },
    { label: "AIK tabell / xP", value: "6:a / 12:a", tone: "amber" },
    { label: "xP / match", value: "HIF 2,10 · AIK 1,06", tone: "blue" },
    { label: "AIK p−xP", value: "+0,59 (1:a)", tone: "amber" },
    { label: "Förra mötet", value: "AIK 2–1", tone: "amber" },
  ],
  xpComparison: {
    title: "Poäng vs xP",
    subtitle: "Twelve Outcome · AIK 27 aug · HIF 20 aug 2026",
    headline:
      "AIK tar 28 poäng men förtjänar bara ~18 xP (1,06/match, 12:a). HIF ligger rättvist 2:a i både tabell och xP (2,10/match).",
    rows: [
      {
        label: "Poäng / match",
        hammarbyValue: "2,00",
        hammarbyRank: "2:a (36p)",
        opponentValue: "1,65",
        opponentRank: "6:a (28p)",
        note: "Tabellgap 2 vs 6 – men underliggande är större.",
      },
      {
        label: "xP / match",
        hammarbyValue: "2,10",
        hammarbyRank: "2:a av 16",
        opponentValue: "1,06",
        opponentRank: "12:a av 16",
        note: "Dubbelt så hög expected points-nivå för HIF.",
      },
      {
        label: "p − xP",
        hammarbyValue: "−0,01",
        hammarbyRank: "10:e av 16",
        opponentValue: "+0,59",
        opponentRank: "1:a av 16",
        note: "AIK överpresterar mest i ligan. HIF nästan exakt på xP.",
      },
      {
        label: "Tabell vs xP-rank",
        hammarbyValue: "2:a ≈ 2:a",
        hammarbyRank: "rättvist",
        opponentValue: "6:a vs 12:a",
        opponentRank: "uppblåst",
        note: "Spela mot AIK:s spelet (12:a), inte mot poängraden (6:a).",
      },
    ],
    takeaway:
      "Derbynarrativet: AIK ser farligare ut i tabellen än i xP. HIF ska lita på processen – 2,10 xP/match mot 1,06 – och straffa den läckande boxen tills turen tar slut.",
    overperformanceTitle: "Varför överpresterar AIK?",
    overperformanceSummary:
      "Överprestationen (+0,59 p−xP, 1:a i ligan) kommer nästan helt från defensiv tur – inte från elitfinish i volym. AIK skapar lite (1,43 xG/match, 11:a) men släpper in långt färre mål än deras opp. xG säger att de borde (+0,56 mål/match i xGA−GA). Resultaten byggs av smala bortasegrar trots förlorad chansbild.",
    overperformanceDrivers: [
      {
        label: "Defensiv tur (huvudorsak)",
        value: "+9,5 mål sparade vs xGA",
        explanation:
          "Snitt xGA−GA +0,56/match. Motståndare skapar HQ-chanser (opp. np xG 2,03 · Opp. CC 14:e) men sätter dem inte – räddningar, ribba, slarv. Exempel: Häcken 0–0 (AIK 0,29 xG vs 2,44), Mjällby 1–2 (1,28 vs 4,79).",
      },
      {
        label: "Vinster trots sämre xG",
        value: "5 av 8 segrar",
        explanation:
          "Inkl. derbyt mot HIF (1,42–2,03), Göteborg, Mjällby, Örgryte och Djurgården. AIK vinner matcher de 'förlorar' under ytan – klassiskt variance-mönster.",
      },
      {
        label: "Smala resultat",
        value: "6 av 8 segrar med 1 måls marginal",
        explanation:
          "2–1 / 1–0-maskin borta. Små marginaler förstärker p−xP när finish och målvaktsspel går deras väg.",
      },
      {
        label: "Offensiv finish ≈ snitt",
        value: "GF−xG bara +0,04/match",
        explanation:
          "De gör ungefär så många mål som xG säger. Överprestationen är alltså inte 'de sätter allt' i volym – utan att motståndaren missar mer. Undantag: kliniska inhopp (Carlstrand 4 mål på ~1,2 xG).",
      },
    ],
  },
  previousMeeting: {
    date: "2026-05-24",
    fixture: "Hammarby - AIK",
    result: "1–2",
    venue: "home",
    outcome: "loss",
    halfTimeScore: "0–0",
    scorers: [
      { team: "hammarby", player: "I. Fofana", minute: 47 },
      { team: "opponent", player: "Johan Hove", minute: 57 },
      { team: "opponent", player: "Bersant Celina", minute: 83 },
    ],
    xgHammarby: 2.03,
    xgOpponent: 1.42,
    contextNote:
      "0–0 i paus. Fofana nickade in 1–0 (47'), men Hove kvitterade (57') och Celina avgjorde sent (83'). HIF hade mer xG (2,03–1,42) och fler avslut (18–11) – AIK vann på finish. Bollinnehav 50–50; AIK mer långbollar (45 vs 31).",
    keyStory:
      "Klassiskt derby där volym inte räckte. HIF skapade mer men AIK var iskalla i de få högkvalitativa lägena (Hove 0,79 xG på kvitteringen). På Strawberry Arena måste HIF omsätta field tilt och tempo i mål – och inte släppa in dem i omställningsfickor.",
    seriesTurnedNote:
      "Sedan derbyförlusten har HIF 6V–1O–1F i ligan och kommer in efter 4–0 borta mot Kalmar och 2–0 hemma mot GAIS. Formkurvan pekar upp – men AIK har också vunnit två raka (3–1 Djurgården, 4–3 Örgryte) och leder den senaste inbördes-duellen.",
  },
  mobileTakeaways: [
    "xP: HIF 2,10/match (2:a) vs AIK 1,06/match (12:a). Tabell 2 vs 6 – underliggande gapet är större.",
    "Varför AIK överpresterar: defensiv tur (+0,56 xGA−GA/match), 5/8 vinster trots sämre xG, 6/8 med 1 måls marginal.",
    "Håll koll: Beširović (mittfältsnav, 13 starter) och Carlstrand (4 mål / 229 min, klinisk).",
    "HIF 2:a (36p, 18 omg), AIK 6:a (28p, 17 omg).",
    "Förra mötet 24 maj: AIK 2–1 på 3Arena. Fofana 47', Hove 57', Celina 83'. HIF 2,03 xG – AIK 1,42.",
    "AIK hemmafacit 2026: 3V–0O–4F, 7–12 i mål. Opp. HQ-skott 5,24 · opp. np xG 2,03 = boxen läcker.",
    "Nyckel: forcera tempo, omsätt HQ-chanser (deras tur tar slut om HIF sätter), stäng Beširović→Carlstrand.",
  ],
  dataSources: [
    "Twelve season report AIK: https://reports.twelve.football/reports/aik-season-report-YkxxozHmCB.pdf (27 aug 2026)",
    "Twelve season report Hammarby: https://reports.twelve.football/reports/hammarby-season-report-N7BNDjoAkn.pdf (20 aug 2026)",
    "Bolldata lagdata/API: matches/team/stats + goals (hämtad 27 aug 2026)",
    "Bolldata match: https://bolldata.se/allsvenskan/matcher/2026/2026-05-24/hammarby-aik-1-2",
  ],
  quickStatusCards: [
    {
      title: "Hammarby just nu",
      body: "2:a (36p), 11V–3O–4F, 42–15 i mål. Ligans bästa xG (2,46) och lägsta insläppta (0,83/match). Senaste 5: WDWWW inkl. 2–0 mot GAIS.",
      tone: "emerald",
    },
    {
      title: "AIK just nu",
      body: "6:a (28p) på 17 matcher men 12:a i xP. Ligans största p−xP-gap (+0,59). Senaste: 3–1 borta mot Djurgården efter 4–3 borta mot Örgryte.",
      tone: "amber",
    },
    {
      title: "Nyckelduell: tempo vs tur",
      body: "HIF skapar mest (2,46 xG). AIK släpper till mest farligt under ytan (opp. np xG 2,03, Opp. CC 14:e) men tar poäng ändå. Derby + hemmapress – data säger HIF, historiken säger varning.",
      tone: "blue",
    },
  ],
  styleChips: [
    {
      label: "🛡️ Def. transition",
      sub: "Twelve 3:a · snabb recover + struktur",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
    {
      label: "🐢 Lågt passtempo",
      sub: "18,19 · 16:e av 16 – vill döda rytmen",
      color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300",
    },
    {
      label: "💥 Boxen läcker",
      sub: "Opp. Chance Creation 14:e · opp. np xG 2,03",
      color: "border-emerald-600/50 bg-emerald-950/60 text-emerald-200",
    },
    {
      label: "🎲 Överpresterar",
      sub: "p−xP +0,59 (1:a) · xP bara 12:a",
      color: "border-rose-600/50 bg-rose-950/60 text-rose-200",
    },
    {
      label: "🏠 Svaga hemma",
      sub: "3V–0O–4F · 7–12 i mål på Friends",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
  ],
  opponentStyle: [
    "Anfaller långsamt och kontrollerat: passtempo 18,19 (sämst i ligan), ~14 % långboll. Vill döda rytmen innan de går framåt.",
    "Penetration via carries in i boxen (23 % av box entries) mer än rena inlägg (29 %). Beširović tar emot mellan linjerna och sätter den vertikala passningen.",
    "Carlstrand är finish-vapnet sent – klinisk inhoppare (4 mål / 229 min). AIK:s anfall är medel (Attack 8 / CC 10); poängen kommer mer från defensiv tur.",
    "Stark defensiv transition (Twelve 3:a): counterpress efter bollvinst. HIF får inte tappa billigt i anfallshalvan.",
    "Svag chansbegränsning (Opp. Chance Creation 14:e): opp. HQ-skott 5,24, opp. np xG 2,03, opp. box touches 20,8 – boxen är den öppna dörren.",
    "Bolldata: 1,43 xG/match (11:a) men 1,47 mål. Defensivt 2,03 xGA (13:e) mot bara 1,47 insläppta – turen har hållit.",
  ],
  styleProfile: [
    {
      label: "Defensiv transition (Twelve)",
      value: "3:a av 16 – snabb recover + stängda ytor",
      score: 82,
      explanation:
        "AIK:s tydligaste styrka. HIF får inte tappa billigt i anfallshalvan – då startar deras struktur.",
    },
    {
      label: "Passtempo (Twelve)",
      value: "18,19 – 16:e av 16",
      score: 12,
      explanation:
        "De vill sänka tempot och kontrollera rytmen. HIF måste forcera och tvinga dem att springa.",
    },
    {
      label: "Chansbegränsning (Twelve)",
      value: "Opp. Chance Creation 14:e · opp. np xG 2,03",
      score: 22,
      explanation:
        "Största svagheten. Volym och kvalitet i boxen straffar dem – exakt HIF:s spelidé.",
    },
    {
      label: "Överprestation (Twelve Outcome)",
      value: "p−xP +0,59 (1:a) · xP 1,06 (12:a)",
      score: 35,
      explanation:
        "Poängraden ljuger uppåt. Spela mot deras spelet (svagt under ytan), inte mot tabellplatsen.",
    },
    {
      label: "Hemmaplan 2026 (Bolldata)",
      value: "3V–0O–4F · 9p · 7–12 i mål",
      score: 28,
      explanation:
        "Strawberry har inte varit en fästning. HIF:s bortafacit är ojämnt – men AIK:s hemmafacit ger öppning.",
    },
  ],
  twelvePhaseRanks: [
    {
      label: "Defence",
      hammarbyRank: 1,
      opponentRank: 7,
      talkTrack: "HIF elite i press/struktur. AIK medel – håller form men inte intensitet.",
    },
    {
      label: "Defensive Transition",
      hammarbyRank: 2,
      opponentRank: 3,
      talkTrack: "Båda topp-3. AIK:s tydligaste vapen – respektera counterpressen.",
    },
    {
      label: "Opp. Chance Creation",
      hammarbyRank: 2,
      opponentRank: 14,
      talkTrack: "Största gapet. AIK släpper till HQ-chanser – HIF ska straffa boxen.",
    },
    {
      label: "Attacking Transition",
      hammarbyRank: 1,
      opponentRank: 12,
      talkTrack: "HIF etta i omställningsattack. AIK långsamma efter bollvinst.",
    },
    {
      label: "Attack",
      hammarbyRank: 1,
      opponentRank: 8,
      talkTrack: "HIF dominerar etablerat anfall. AIK medel utan fart.",
    },
    {
      label: "Chance Creation",
      hammarbyRank: 1,
      opponentRank: 10,
      talkTrack: "HIF skapar mest och bäst. AIK snitt utan skärpa.",
    },
    {
      label: "Outcome",
      hammarbyRank: 1,
      opponentRank: 8,
      talkTrack: "HIF omsätter spelet. AIK poängsatta via överprestation.",
    },
  ],
  bolldataRankings: [
    {
      label: "xG / match",
      group: "offensiv",
      hammarbyValue: "2,46",
      hammarbyRank: 1,
      opponentValue: "1,43",
      opponentRank: 11,
      talkTrack: "HIF skapar mest. AIK under snittet – stor offensiv klyfta.",
    },
    {
      label: "Gjorda mål / match",
      group: "offensiv",
      hammarbyValue: "2,33",
      hammarbyRank: 2,
      opponentValue: "1,47",
      opponentRank: 8,
      talkTrack: "HIF sätter fler. AIK medel i finish.",
    },
    {
      label: "Avslut / match",
      group: "offensiv",
      hammarbyValue: "20,4",
      hammarbyRank: 1,
      opponentValue: "12,5",
      opponentRank: 9,
      talkTrack: "Volymfördel HIF – exakt vapnet mot AIK:s läckande box.",
    },
    {
      label: "Skott på mål / match",
      group: "offensiv",
      hammarbyValue: "7,2",
      hammarbyRank: 1,
      opponentValue: "4,5",
      opponentRank: 8,
      talkTrack: "HIF träffar mål oftare. Kräv samma i derbyt.",
    },
    {
      label: "Boxberöringar / match",
      group: "offensiv",
      hammarbyValue: "31,8",
      hammarbyRank: 1,
      opponentValue: "19,9",
      opponentRank: 12,
      talkTrack: "HIF lever i straffområdet. AIK kommer dit för sällan.",
    },
    {
      label: "Nyckelpassningar / match",
      group: "offensiv",
      hammarbyValue: "6,39",
      hammarbyRank: 1,
      opponentValue: "3,71",
      opponentRank: 14,
      talkTrack: "Kreativ klyfta. Besara/Abraham ska diktera sista passningen.",
    },
    {
      label: "Bollinnehav %",
      group: "offensiv",
      hammarbyValue: "60,4%",
      hammarbyRank: 1,
      opponentValue: "54,2%",
      opponentRank: 3,
      talkTrack: "Båda vill ha boll – men HIF gör mer med den.",
    },
    {
      label: "xGA / match",
      group: "defensiv",
      hammarbyValue: "1,22",
      hammarbyRank: 2,
      opponentValue: "2,03",
      opponentRank: 13,
      talkTrack: "AIK släpper till näst mest xG – öppet mål för HIF:s anfall.",
    },
    {
      label: "Insläppta / match",
      group: "defensiv",
      hammarbyValue: "0,83",
      hammarbyRank: 1,
      opponentValue: "1,47",
      opponentRank: 8,
      talkTrack: "HIF tightast i verkliga mål. AIK medel – och underliggande sämre.",
    },
    {
      label: "Recoveries / match",
      group: "defensiv",
      hammarbyValue: "87,9",
      hammarbyRank: 4,
      opponentValue: "78,9",
      opponentRank: 14,
      talkTrack: "HIF vinner bollen oftare. AIK mer sparsam med dueller.",
    },
    {
      label: "Långa bollar / match",
      group: "stil",
      hammarbyValue: "35,2",
      hammarbyRank: 16,
      opponentValue: "42,2",
      opponentRank: 12,
      talkTrack: "AIK mer direkt. HIF kort-kort – andraboll vid deras långa.",
    },
    {
      label: "Progressiva passningar",
      group: "stil",
      hammarbyValue: "74,9",
      hammarbyRank: 2,
      opponentValue: "66,1",
      opponentRank: 14,
      talkTrack: "HIF driver framåt. AIK mer laterala trots possession.",
    },
    {
      label: "Passningsprecision",
      group: "stil",
      hammarbyValue: "86,8%",
      hammarbyRank: 1,
      opponentValue: "83,1%",
      opponentRank: 8,
      talkTrack: "HIF säkrare under press – viktigt mot deras counterpress.",
    },
    {
      label: "xP / match (Twelve)",
      group: "stil",
      hammarbyValue: "2,10",
      hammarbyRank: 2,
      opponentValue: "1,06",
      opponentRank: 12,
      talkTrack: "Dubbelt så hög xP-nivå. AIK 6:a i poäng men 12:a i xP.",
    },
    {
      label: "p − xP (Twelve)",
      group: "stil",
      hammarbyValue: "−0,01",
      hammarbyRank: 10,
      opponentValue: "+0,59",
      opponentRank: 1,
      talkTrack: "AIK överpresterar mest i ligan. HIF nästan exakt på expected.",
    },
  ],
  spiderComparison: [
    {
      label: "xG / match",
      hammarbyValue: "2,46",
      opponentValue: "1,43",
      hammarbyScore: 100,
      opponentScore: 58,
      note: "HIF 1:a, AIK 11:a. Tydlig offensiv fördel.",
    },
    {
      label: "xP / match",
      hammarbyValue: "2,10",
      opponentValue: "1,06",
      hammarbyScore: 100,
      opponentScore: 50,
      note: "HIF 2:a, AIK 12:a. Underliggande gapet är större än tabellen.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,4",
      opponentValue: "12,5",
      hammarbyScore: 100,
      opponentScore: 61,
      note: "Volymfördel HIF – vapnet mot läckande box.",
    },
    {
      label: "Bollinnehav (%)",
      hammarbyValue: "60%",
      opponentValue: "54%",
      hammarbyScore: 100,
      opponentScore: 85,
      note: "Båda vill ha boll. Tempo och penetration avgör.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,22",
      opponentValue: "2,03",
      hammarbyScore: 95,
      opponentScore: 40,
      note: "AIK släpper till klart mer xG – sårbara defensivt.",
    },
    {
      label: "Passtempo",
      hammarbyValue: "högt",
      opponentValue: "18,19 (16:e)",
      hammarbyScore: 90,
      opponentScore: 15,
      note: "AIK sist i tempo. Forcera – låt dem inte sakta ner derbyt.",
    },
  ],
  rankedMetrics: [
    {
      label: "xP / match",
      hammarbyValue: "2,10",
      hammarbyRank: "2:a av 16",
      opponentValue: "1,06",
      opponentRank: "12:a av 16",
      note: "Tydligaste underliggande gapet. AIK:s tabell ljuger uppåt.",
    },
    {
      label: "p − xP",
      hammarbyValue: "−0,01",
      hammarbyRank: "10:e av 16",
      opponentValue: "+0,59",
      opponentRank: "1:a av 16",
      note: "AIK överpresterar mest i ligan. HIF nästan exakt på xP.",
    },
    {
      label: "xG / match",
      hammarbyValue: "2,46",
      hammarbyRank: "1:a av 16",
      opponentValue: "1,43",
      opponentRank: "11:a av 16",
      note: "Hammarby skapar mest. AIK under snittet.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,22",
      hammarbyRank: "2:a av 16",
      opponentValue: "2,03",
      opponentRank: "13:e av 16",
      note: "AIK släpper till näst mest xG – boxen är öppen.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,4",
      hammarbyRank: "1:a av 16",
      opponentValue: "12,5",
      opponentRank: "9:a av 16",
      note: "Volymfördel HIF. Förra mötet: 18–11 men AIK vann på finish.",
    },
    {
      label: "Passtempo (Twelve)",
      hammarbyValue: "högt press-tempo",
      hammarbyRank: "topp",
      opponentValue: "18,19",
      opponentRank: "16:e av 16",
      note: "AIK sist. Tempokampen är matchnyckeln.",
    },
  ],
  goalWindows: [
    { window: "0–15'", hammarbyGoals: 6, opponentConcededGoals: 5 },
    { window: "16–30'", hammarbyGoals: 4, opponentConcededGoals: 4 },
    { window: "31–45+'", hammarbyGoals: 8, opponentConcededGoals: 3 },
    { window: "46–60'", hammarbyGoals: 10, opponentConcededGoals: 3 },
    { window: "61–75'", hammarbyGoals: 8, opponentConcededGoals: 3 },
    { window: "76–90+'", hammarbyGoals: 5, opponentConcededGoals: 6 },
  ],
  goalTypeNotes: [
    {
      label: "AIK sårbar tidigt & sent",
      value: "5 insläppta 0–15 · 6 insläppta 76–90+",
      interpretation:
        "Öppningen och slutet är AIK:s svagaste fönster. Sätt ton tidigt och behåll intensitet sent.",
    },
    {
      label: "HIF starkast 46–60",
      value: "10 mål i 46–60'",
      interpretation:
        "Andra halvlekens start är HIF:s mest produktiva period – perfekt mot ett AIK som ofta tappat sent.",
    },
    {
      label: "Förra mötets facit",
      value: "Fofana 47' · Hove 57' · Celina 83'",
      interpretation:
        "AIK vann på finish trots sämre xG. Den här gången: omsätt volym, stäng deras få HQ-lägen.",
    },
    {
      label: "AIK hemmafacit",
      value: "3V–0O–4F · 7–12 i mål",
      interpretation:
        "Strawberry har inte varit fästning 2026. HIF ska attackera hemmaplansmyten direkt.",
    },
  ],
  trafficLightCards: [
    {
      metric: "Förra mötet",
      bigNumber: "1–2",
      badge: "AIK VANN I MAJ",
      color: "red",
      rankNote: "Fofana 47' · Hove 57' · Celina 83' · HIF 2,03 xG",
      explanation:
        "HIF hade mer xG och fler avslut men förlorade på finish. Samma misstag – låta AIK få ett fåtal iskalla lägen – får inte upprepas på Strawberry.",
      podcastComment:
        "Vi skapade mer, de satte mer. Derbyt avgörs inte av volym ensam – men utan volym i boxen vinner vi inte heller.",
    },
    {
      metric: "xP-jämförelse",
      bigNumber: "2,10 vs 1,06",
      badge: "HIF 2:A · AIK 12:A I xP",
      color: "green",
      rankNote: "Poäng 2:a/6:a · p−xP −0,01 vs +0,59",
      explanation:
        "HIF har 2,10 xP/match (2:a) och ligger rättvist i tabellen. AIK har 1,06 xP/match (12:a) men 28 poäng (6:a) – ligans största överprestation (+0,59). Spela mot spelet, inte poängraden.",
      podcastComment:
        "Det här är poddens viktigaste siffra: 2,10 mot 1,06 i xP. Tabellen säger 2 vs 6. Underliggande säger topp mot bottenhalva.",
    },
    {
      metric: "AIK p−xP",
      bigNumber: "+0,59",
      badge: "1:A I ÖVERPRESTATION",
      color: "yellow",
      rankNote: "Defensiv tur · 5/8 vinster trots sämre xG",
      explanation:
        "Huvudorsak: xGA−GA +0,56/match (+9,5 mål 'sparade'). AIK skapar lite men vinner smala matcher trots förlorad chansbild – variance, inte underliggande dominans.",
      podcastComment:
        "De är inte bättre än xP – de har haft tur i boxen bakåt. Om HIF sätter sina HQ-chanser tar överprestationen slut.",
    },
  ],
  spotlightKey:
    "Matchnyckel: forcera tempot mot ligans långsammaste passtempo, fyll boxen (AIK Opp. CC 14:e) och straffa deras usla hemmafacit innan derbyt låser sig. Respektera defensiv transition (Twelve 3:a) – inga billiga tapp högt – men lita på att underliggande spelet (xP 12:a, xGA 2,03) inte matchar poängraden. Revansch för 1–2 i maj kräver finish, inte bara field tilt.",
  hammarbyPlan: {
    withBall: [
      "Forcera tempot OMEDELBART. AIK passtempo 18,19 (16:e) – spela i HIF:s rytm och tvinga dem att springa i egen arena.",
      "Attackera boxen med volym: AIK släpper till 5,24 HQ-skott och 2,03 opp. np xG/match. Halvrum + sista passning, inte ytterskott.",
      "Cirkulera under deras counterpress (Def. Transition 3:a). HIF:s 86,8 % passningsprecision är vapnet – tappa inte billigt högt.",
      "Utnyttja Attacking Transition-fördelen (Twelve 1:a vs 12:a). När AIK backar efter egen press – slå vertikalt direkt in i boxen.",
    ],
    withoutBall: [
      "Pressa HÖGT men SMART (PPDA-duell: HIF 5,05 vs AIK 6,65). Pressa första passningen – AIK vill ha tid på bollen.",
      "Stäng Beširović mellan linjerna och Carlstrand i boxen. Beširović är navet (13 starter); Carlstrand straffar slarv (4 mål / 229 min).",
      "Begränsa carries in i boxen (23 % av AIK:s box entries). Tvinga dem ut mot kanten och inlägg där HIF är starkare.",
      "Vid bollvinst: AIK Att. Transition 12:a – de är långsamma framåt. Straffa den ytan bakom deras linje direkt.",
    ],
    matchManagement: [
      "0–15: tryck DIREKT. AIK släpper in 5 mål i öppningen. Sätt ton på Strawberry innan hemmapubliken hinner växa.",
      "46–60: HIF:s bästa fönster (10 mål). Extra energi efter paus – förra derbyt vändes just där.",
      "76–90+: AIK:s variance-zon – Carlstrand och sena mål. Håll struktur OCH intensitet; deras överprestation lever här.",
      "Vid ledning: AIK överpresterar via defensiv tur, inte elitvolym. Kontrollera bollen, ge dem ytterskott, döda omställningarna.",
    ],
  },
  playersToWatch: [
    {
      name: "Dino Beširović",
      position: "Midfielder · Bosnien/Hercegovina",
      scoutBadge: "🧠 13 starter · mittfältets nav",
      stats: [
        { label: "Mål", value: "1" },
        { label: "Assist", value: "2" },
        { label: "Min", value: "1179" },
      ],
      threat:
        "Startat alla 13 matcher han spelat. Länkspelare som tar emot mellan linjerna, sätter tempo och hittar den vertikala passningen. Inte AIK:s målrobot – men den som får deras låga passtempo att ändå nå boxen.",
      motivation:
        "Stäng vändningen. Pressa första mottagningen, tvinga honom bakåt/sidledes. När Beširović får tid får Carlstrand och Hove ytor framför sig.",
    },
    {
      name: "Linus Carlstrand",
      position: "Forward · Sverige",
      scoutBadge: "🎯 4 mål på 229 min · 4 på ~1,2 xG",
      stats: [
        { label: "Mål", value: "4" },
        { label: "Assist", value: "1" },
        { label: "Min", value: "229" },
      ],
      threat:
        "Klinisk inhoppare/finish-specialist: 4 mål på bara 229 minuter och ~1,2 xG i de målen – extrem överkonvertering. Farligast sent (bl.a. 83') när HIF:s backlinje tröttnar. En del av AIK:s poängvariance i boxen.",
      motivation:
        "Koncentration 60–90' och vid inbyten. Markera tight i boxen, vinn förstakontakt vid inlägg/andraboll. Ge honom inte frilägen – det är exakt så AIK tar 'orättvisa' poäng.",
    },
  ],
  refereePreview: {
    name: "Glenn Nyberg",
    role: "Huvuddomare",
    fixtureLabel: "AIK – Hammarby · Omgång 19 · 30 aug 2026",
    talkTrack:
      "Glenn Nyberg dömer derbyt på Strawberry Arena. HIF har mött honom två gånger i Allsvenskan 2026 – båda borta. Sirius 2–0 (domarindex 0) och Djurgården 1–1 (+12). Snitt +6: fler regelfel dömda mot motståndaren (fouls snitt 10–17), medan gula gått lätt mer åt HIF (1,5–0,5/match).",
    takeaways: [
      "2 HIF-matcher 2026 (båda borta) · snitt domarindex +6.",
      "Djurgården omg 5: regelfel 8–20, gula 1–1, index +12.",
      "Sirius omg 2: regelfel 12–14, gula 2–0, index 0 – jämnare linje.",
    ],
  },
  headToHead: {
    sampleSize: 5,
    description:
      "Senaste 5 Allsvenskan-derbyna 2024–2026. Jämnt facit (2V–1O–2F) – AIK vann senaste mötet, HIF de två hemmamötena före det.",
    summaryCards: [
      {
        title: "Senaste mötet",
        value: "HIF 1–2 AIK (maj 2026)",
        note: "Fofana · Hove · Celina. HIF mer xG.",
        tone: "amber",
      },
      {
        title: "Senaste på Strawberry",
        value: "AIK 0–0 HIF (maj 2025)",
        note: "Senaste bortalaget på Friends/Strawberry.",
        tone: "amber",
      },
      {
        title: "Form nu",
        value: "HIF WDWWW · AIK WDLWW",
        note: "Båda i positiv trend; HIF stabilare.",
        tone: "emerald",
      },
    ],
    trendBullets: [
      "Senaste derbyt 2026: AIK vann 2–1 trots sämre xG (1,42 vs 2,03).",
      "HIF har vunnit båda hemmamötena 2024–2025 (2–1, 2–1) – men förlorade senaste hemma.",
      "På AIK:s hemmaplan 2024–2025: 0–1 och 0–0 – HIF har inte vunnit borta i serien på sistone.",
      "Underliggande 2026: HIF Outcome 1:a, AIK xP 12:a. Kvalitetsgapet är större än tabellgapet 2 vs 6.",
    ],
    matches: [
      {
        date: "2026-05-24",
        fixture: "Hammarby - AIK",
        result: "1-2",
        venue: "home",
        outcome: "loss",
        hammarbyGoals: 1,
        opponentGoals: 2,
        hammarbyXg: 2.03,
        opponentXg: 1.42,
        hammarbyShots: 18,
        opponentShots: 11,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2026/2026-05-24/hammarby-aik-1-2",
      },
      {
        date: "2025-10-19",
        fixture: "Hammarby - AIK",
        result: "2-1",
        venue: "home",
        outcome: "win",
        hammarbyGoals: 2,
        opponentGoals: 1,
        hammarbyXg: 1.39,
        opponentXg: 1.03,
        hammarbyShots: 12,
        opponentShots: 10,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2025/2025-10-19/hammarby-aik-2-1",
      },
      {
        date: "2025-05-18",
        fixture: "AIK - Hammarby",
        result: "0-0",
        venue: "away",
        outcome: "draw",
        hammarbyGoals: 0,
        opponentGoals: 0,
        hammarbyXg: 0.63,
        opponentXg: 1.14,
        hammarbyShots: 8,
        opponentShots: 13,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2025/2025-05-18/aik-hammarby-0-0",
      },
      {
        date: "2024-09-29",
        fixture: "AIK - Hammarby",
        result: "1-0",
        venue: "away",
        outcome: "loss",
        hammarbyGoals: 0,
        opponentGoals: 1,
        hammarbyXg: 0.31,
        opponentXg: 2.04,
        hammarbyShots: 4,
        opponentShots: 10,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2024/2024-09-29/aik-hammarby-1-0",
      },
      {
        date: "2024-05-19",
        fixture: "Hammarby - AIK",
        result: "2-1",
        venue: "home",
        outcome: "win",
        hammarbyGoals: 2,
        opponentGoals: 1,
        hammarbyXg: 0.97,
        opponentXg: 0.7,
        hammarbyShots: 14,
        opponentShots: 10,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2024/2024-05-19/hammarby-aik-2-1",
      },
    ],
  },
  glossary: [
    {
      term: "Domarindex",
      explanation:
        "Netto av regelfel-differens (motståndarens fouls minus HIF:s) och kortdifferens. Positivt = fördel HIF.",
    },
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
        "Expected Points – poäng laget 'förtjänat' utifrån matchernas xG-bilder. AIK 12:a trots 6:a i tabellen.",
    },
    {
      term: "p − xP",
      explanation:
        "Poäng minus expected points. Positivt = överprestation. AIK +0,59 är ligans högsta.",
    },
    {
      term: "Passtempo",
      explanation:
        "Passningar per minut med boll. AIK:s 18,19 är sämst i ligan – de vill döda tempot.",
    },
    {
      term: "Opp. Chance Creation",
      explanation:
        "Hur bra laget begränsar motståndarens chanser. AIK 14:e = läcker många HQ-lägen.",
    },
    {
      term: "Defensive Transition",
      explanation:
        "Sekunderna efter bollförlust. AIK 3:a – deras starkaste Twelve-fas.",
    },
    {
      term: "PPDA",
      explanation:
        "Passningar per defensiv aktion. Lägre = hårdare press. HIF 5,05 · AIK 6,65.",
    },
  ],
};
