import type { UpcomingOpponentReport } from "@/lib/upcomingOpponentsData";

/**
 * Omgång 18 · Hammarby – GAIS · 23 aug 2026
 * Källor: Twelve season reports (20 aug 2026) + Bolldata lagdata/API (20 aug 2026)
 */
export const gaisRound18Report: UpcomingOpponentReport = {
  round: 18,
  roundLabel: "Omgång 18",
  hidden: false,
  fixture: "Hammarby - GAIS",
  dateLabel: "Söndag 23 augusti 2026 · 16:30 · 3Arena, Stockholm",
  venueLabel: "3Arena (hemmaplan)",
  comparisonLabel: "Allsvenskan 2026 · 17 omgångar",
  oneLineSummary:
    "Hemma på 3Arena: GAIS vann 2–0 i maj (Petrovic + Salter, Skoglund rött 70'). HIF är 2:a (33p) och ligans bästa hemmalag (7V–1O–1F). GAIS är 9:a (23p) men 4:a i xP och etta i xGA – stark defensiv, svag finish (0,63 mål/xG).",
  hifBadges: ["2:a i Allsvenskan", "33p", "Bästa hemmalag (22p)"],
  opponentBadges: ["9:a i Allsvenskan", "23p", "4:a i xP · 1:a xGA"],
  introStats: [
    { label: "HIF tabell", value: "2:a (33p)", tone: "emerald" },
    { label: "GAIS tabell / xP", value: "9:a / 4:a", tone: "amber" },
    { label: "Förra mötet", value: "GAIS 2–0", tone: "amber" },
    { label: "HIF form (5)", value: "4V–1O", tone: "emerald" },
    { label: "Twelve Outcome", value: "HIF 1:a · GAIS 4:a", tone: "blue" },
  ],
  previousMeeting: {
    date: "2026-05-20",
    fixture: "GAIS - Hammarby",
    result: "2–0",
    venue: "away",
    outcome: "loss",
    halfTimeScore: "1–0",
    scorers: [
      { team: "opponent", player: "Rasmus Niklasson Petrovic", minute: 25 },
      { team: "opponent", player: "Samuel Salter", minute: 80 },
    ],
    xgHammarby: 2.02,
    xgOpponent: 2.64,
    contextNote:
      "GAIS slog tidigt (Petrovic 25') och avgjorde sent (Salter 80'). Hammarby hade 61 % boll och 16 avslut – men bara 3 på mål mot GAIS 7. Hampus Skoglund fick gult 23' och rött 70' (andra gula) – HIF spelade sista 20 minuterna med 10 man.",
    keyStory:
      "Statistiskt jämn match i volym (16–16 avslut) men GAIS vann kvalitetsstriden: 2,64 xG mot 2,02 och klart fler skott på mål. HIF:s finish och det röda kortet avgjorde. På 3Arena handlar det om att omsätta dominans i mål – och undvika samma omställningsfällor.",
    seriesTurnedNote:
      "Sedan förlusten har HIF vunnit 5, spelat 1 oavgjort och förlorat 0 i ligan (exkl. den matchen i formräkningen senast) och kommer in efter 4–0 borta mot Kalmar. Formkurvan pekar rakt upp – men GAIS är fortfarande det lag som senast stängde dörren.",
  },
  mobileTakeaways: [
    "HIF 2:a (33p), GAIS 9:a (23p) – men GAIS 4:a i xP (31) och etta i xGA (1,19/match).",
    "Förra mötet 20 maj: GAIS 2–0. Petrovic 25', Salter 80'. Skoglund rött 70'.",
    "Twelve (20 aug): HIF 1:a i Defence/Attack/Chance Creation/Outcome. GAIS 1:a i Def. Transition + Opp. Chance Creation.",
    "Bolldata: HIF 1:a i xG (2,42), avslut (20,1) och boll (60 %). GAIS 1:a i långa bollar och recoveries.",
    "Domare: Victor Wolf. Tidigare HIF-match 2026: IFK Göteborg 0–1 (omg 7), domarindex +6.",
    "GAIS konverterar uselt (0,63 mål/xG, 14:e i mål/match) – HIF måste vara kliniska själva.",
    "HIF bästa hemmalag (7V–1O–1F, 22p, 29–5). Spela med field tilt och tålamod mot deras press.",
    "Nyckel: vinna andrabollen mot deras långbollar, inte ge kontringar, och straffa dem i boxen.",
  ],
  dataSources: [
    "Twelve season report GAIS: https://reports.twelve.football/reports/gais-season-report-czyVmhJaiW.pdf (20 aug 2026)",
    "Twelve season report Hammarby: https://reports.twelve.football/reports/hammarby-season-report-N7BNDjoAkn.pdf (20 aug 2026)",
    "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 20 aug 2026)",
    "Bolldata API: matches/team/stats + matches/goals + cards (Allsvenskan 2026)",
    "Bolldata match: https://bolldata.se/allsvenskan/matcher/2026/2026-05-20/gais-hammarby-2-0",
  ],
  quickStatusCards: [
    {
      title: "Hammarby just nu",
      body: "2:a (33p), 10V–3O–4F. Ligans bästa hemmalag (22p, +24). Senaste 5: 4V–1O, 14–1 i mål. Vann 4–0 borta mot Kalmar i omg 17.",
      tone: "emerald",
    },
    {
      title: "GAIS just nu",
      body: "9:a (23p) men 4:a i xP (31). Ligans lägsta xGA (1,19/match). Senaste: 0–1 hemma mot Malmö efter 2–0-seger borta mot Halmstad.",
      tone: "amber",
    },
    {
      title: "Nyckelduell: finish vs struktur",
      body: "HIF skapar mest xG (2,42). GAIS släpper till minst xGA (1,19) och är Twelve 1:a på att begränsa chanser – men gör bara 1,24 mål/match (14:e).",
      tone: "blue",
    },
  ],
  styleChips: [
    {
      label: "🛡️ Elite-defensiv",
      sub: "1:a xGA · Twelve Defence 2:a · Opp. Chance Creation 1:a",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
    {
      label: "⚡ Counterpress",
      sub: "Twelve Def. Transition 1:a · Att. Transition 2:a",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
    {
      label: "🚀 Långbollar",
      sub: "49 långa/match (1:a) – direkt efter bollvinst",
      color: "border-rose-600/50 bg-rose-950/60 text-rose-200",
    },
    {
      label: "🎯 Svag finish",
      sub: "0,63 mål/xG · 14:e i mål/match (1,24)",
      color: "border-emerald-600/50 bg-emerald-950/60 text-emerald-200",
    },
    {
      label: "📈 Undervärderade",
      sub: "9:a i poäng, 4:a i xP – mer än tabellen visar",
      color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300",
    },
  ],
  opponentStyle: [
    "Twelve: högt press + aggressiv counterpress. Defensiva aktioner högt upp (43,4 m). PPDA 5,71 – intensivt men något lägre än HIF (5,05).",
    "Direkt anfallsspel: flest långa bollar i ligan (49,2/match). Blandar build-up och långt spel; boxentries via både inlägg och carries.",
    "Exceptionell defensiv transition (Twelve 1:a): snabb bollvinst efter tapp, få motståndarintrång i box inom 10s.",
    "Bäst i ligan på att begränsa opposition chance creation (Twelve 1:a) – låga HQ-skott emot (2,59) och låg opp. np xG (1,14).",
    "Offensivt topp-4 i chansskapning (Twelve Chance Creation 4:a, Attack 3:a) men Outcome bara 4:a – poängen matchar inte underliggande spelet.",
    "Bolldata bekräftar: 33,5 xG men bara 21 mål (−13). De skapar – men sätter inte.",
  ],
  styleProfile: [
    {
      label: "Defensiv transition (Twelve)",
      value: "1:a av 16 – snabb recover + struktur",
      score: 96,
      explanation:
        "GAIS är ligans bästa lag direkt efter bollförlust. HIF får inte tappa billigt i anfallshalvan.",
    },
    {
      label: "Chansbegränsning (Twelve)",
      value: "Opp. Chance Creation 1:a · xGA 1,19 (1:a Bolldata)",
      score: 94,
      explanation:
        "De stänger ytor och kvalitet. HIF måste skapa HQ-lägen inne i boxen – inte nöja sig med halvchanser.",
    },
    {
      label: "Direkthet (Bolldata)",
      value: "49 långa bollar/match (1:a) · 52 direct/match (1:a)",
      score: 92,
      explanation:
        "Efter bollvinst går de vertikalt. Andraboll och djupled är deras livsnerv.",
    },
    {
      label: "Presshöjd (Twelve)",
      value: "High press · PPDA 5,71 · Def. intensity 5,98",
      score: 78,
      explanation:
        "Liknar HIF:s pressmodell. Skillnaden: HIF pressar ännu hårdare (PPDA 5,05, intensity 6,60).",
    },
    {
      label: "Finish / Outcome",
      value: "0,63 mål/xG · Outcome 4:a · mål/match 14:e",
      score: 28,
      explanation:
        "Största svagheten. Vid ledning: tvinga dem till sämre skottlägen och lita på att finishen sviker.",
    },
  ],
  twelvePhaseRanks: [
    {
      label: "Defence",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "Båda elite. HIF snäppet vassare i struktur och PPDA.",
    },
    {
      label: "Defensive Transition",
      hammarbyRank: 2,
      opponentRank: 1,
      talkTrack: "GAIS etta – deras counterpress är matchens största hot.",
    },
    {
      label: "Opp. Chance Creation",
      hammarbyRank: 2,
      opponentRank: 1,
      talkTrack: "GAIS stänger chanserna bäst i ligan. Kvalitet framför volym.",
    },
    {
      label: "Attacking Transition",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "HIF etta i omställningsattack. Straffa deras höga linje.",
    },
    {
      label: "Attack",
      hammarbyRank: 1,
      opponentRank: 3,
      talkTrack: "HIF dominerar etablerat anfall – field tilt hemma.",
    },
    {
      label: "Chance Creation",
      hammarbyRank: 1,
      opponentRank: 4,
      talkTrack: "HIF skapar mest och bäst. GAIS topp-4 men sämre finish.",
    },
    {
      label: "Outcome",
      hammarbyRank: 1,
      opponentRank: 4,
      talkTrack: "Poängbilden: HIF omsätter spelet, GAIS underpresterar.",
    },
  ],
  bolldataRankings: [
    {
      label: "xG / match",
      group: "offensiv",
      hammarbyValue: "2,42",
      hammarbyRank: 1,
      opponentValue: "1,97",
      opponentRank: 4,
      talkTrack: "HIF skapar mest i ligan. GAIS ändå topp-4.",
    },
    {
      label: "Gjorda mål / match",
      group: "offensiv",
      hammarbyValue: "2,35",
      hammarbyRank: 2,
      opponentValue: "1,24",
      opponentRank: 14,
      talkTrack: "Största gapet: GAIS gör för få mål för sin xG.",
    },
    {
      label: "Avslut / match",
      group: "offensiv",
      hammarbyValue: "20,1",
      hammarbyRank: 1,
      opponentValue: "15,1",
      opponentRank: 3,
      talkTrack: "Volymfördel HIF. Båda skjuter mycket.",
    },
    {
      label: "Skott på mål / match",
      group: "offensiv",
      hammarbyValue: "7,2",
      hammarbyRank: 1,
      opponentValue: "5,1",
      opponentRank: 5,
      talkTrack: "HIF träffar mål oftare – nyckel i förra mötet (3 vs 7).",
    },
    {
      label: "Boxberöringar / match",
      group: "offensiv",
      hammarbyValue: "31,5",
      hammarbyRank: 1,
      opponentValue: "27,9",
      opponentRank: 2,
      talkTrack: "Två av ligans mest boxaktiva lag.",
    },
    {
      label: "Nyckelpassningar / match",
      group: "offensiv",
      hammarbyValue: "6,12",
      hammarbyRank: 1,
      opponentValue: "6,12",
      opponentRank: 2,
      talkTrack: "Dött lopp i sista passningen – båda skapar via spel.",
    },
    {
      label: "Bollinnehav %",
      group: "offensiv",
      hammarbyValue: "60,1%",
      hammarbyRank: 1,
      opponentValue: "51,6%",
      opponentRank: 7,
      talkTrack: "HIF ska äga bollen hemma och trötta ut pressen.",
    },
    {
      label: "xGA / match",
      group: "defensiv",
      hammarbyValue: "1,23",
      hammarbyRank: 3,
      opponentValue: "1,19",
      opponentRank: 1,
      talkTrack: "GAIS släpper till minst xG – tightaste försvaret under ytan.",
    },
    {
      label: "Insläppta / match",
      group: "defensiv",
      hammarbyValue: "0,88",
      hammarbyRank: 1,
      opponentValue: "0,94",
      opponentRank: 2,
      talkTrack: "Båda håller nollan ofta. HIF snäppet vassare i verkliga mål.",
    },
    {
      label: "Recoveries / match",
      group: "defensiv",
      hammarbyValue: "87,4",
      hammarbyRank: 4,
      opponentValue: "90,9",
      opponentRank: 1,
      talkTrack: "GAIS vinner bollen oftast – counterpress i siffror.",
    },
    {
      label: "Långa bollar / match",
      group: "stil",
      hammarbyValue: "34,1",
      hammarbyRank: 16,
      opponentValue: "49,2",
      opponentRank: 1,
      talkTrack: "Stilkontrast: HIF kort-kort, GAIS vertikalt.",
    },
    {
      label: "Progressiva passningar",
      group: "stil",
      hammarbyValue: "73,7",
      hammarbyRank: 4,
      opponentValue: "76,4",
      opponentRank: 2,
      talkTrack: "GAIS driver bollen framåt oftare trots lägre bollinnehav.",
    },
    {
      label: "Passningsprecision",
      group: "stil",
      hammarbyValue: "87,0%",
      hammarbyRank: 3,
      opponentValue: "82,5%",
      opponentRank: 11,
      talkTrack: "HIF säkrare under press – viktigt mot deras counterpress.",
    },
    {
      label: "xP-tabell",
      group: "stil",
      hammarbyValue: "34 xP",
      hammarbyRank: 3,
      opponentValue: "31 xP",
      opponentRank: 4,
      talkTrack: "GAIS förtjänar mer poäng än tabellen – ta dem på allvar.",
    },
  ],
  spiderComparison: [
    {
      label: "xG / match",
      hammarbyValue: "2,42",
      opponentValue: "1,97",
      hammarbyScore: 100,
      opponentScore: 81,
      note: "HIF 1:a, GAIS 4:a. Offensiv fördel men inte walkover.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,1",
      opponentValue: "15,1",
      hammarbyScore: 100,
      opponentScore: 75,
      note: "HIF skjuter mest i ligan. GAIS ändå 3:a.",
    },
    {
      label: "Bollinnehav (%)",
      hammarbyValue: "60%",
      opponentValue: "52%",
      hammarbyScore: 100,
      opponentScore: 72,
      note: "HIF ska cirkulera och lura fram luckor i GAIS press.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,23",
      opponentValue: "1,19",
      hammarbyScore: 88,
      opponentScore: 100,
      note: "GAIS snäppet tightare defensivt per xGA.",
    },
    {
      label: "Boxberöringar",
      hammarbyValue: "31,5",
      opponentValue: "27,9",
      hammarbyScore: 100,
      opponentScore: 89,
      note: "Båda lever i straffområdet – väntat högt tempo.",
    },
    {
      label: "Långa bollar",
      hammarbyValue: "34",
      opponentValue: "49",
      hammarbyScore: 40,
      opponentScore: 100,
      note: "GAIS etta i direktspel. HIF måste vinna först- och andraboll.",
    },
  ],
  rankedMetrics: [
    {
      label: "xG / match",
      hammarbyValue: "2,42",
      hammarbyRank: "1:a av 16",
      opponentValue: "1,97",
      opponentRank: "4:a av 16",
      note: "Hammarby skapar mest. GAIS topp-4 men konverterar dåligt.",
    },
    {
      label: "xGA / match",
      hammarbyValue: "1,23",
      hammarbyRank: "3:a av 16",
      opponentValue: "1,19",
      opponentRank: "1:a av 16",
      note: "GAIS har ligans lägsta xGA – svårast att skapa kvalitet emot.",
    },
    {
      label: "Avslut / match",
      hammarbyValue: "20,1",
      hammarbyRank: "1:a av 16",
      opponentValue: "15,1",
      opponentRank: "3:a av 16",
      note: "Volymfördel HIF. Förra mötet: 16–16 men HIF bara 3 på mål.",
    },
    {
      label: "Bollinnehav",
      hammarbyValue: "60,1%",
      hammarbyRank: "1:a av 16",
      opponentValue: "51,6%",
      opponentRank: "7:a av 16",
      note: "HIF dominerar bollen hemma – använd det mot deras press.",
    },
    {
      label: "Långa bollar / match",
      hammarbyValue: "34,1",
      hammarbyRank: "16:e av 16",
      opponentValue: "49,2",
      opponentRank: "1:a av 16",
      note: "Tydlig stilskillnad. Andrabollen avgör omställningsduellen.",
    },
    {
      label: "xP-tabell",
      hammarbyValue: "34 xP",
      hammarbyRank: "3:a av 16",
      opponentValue: "31 xP",
      opponentRank: "4:a av 16",
      note: "GAIS 9:a i poäng men 4:a i xP – undervärderad motståndare.",
    },
  ],
  goalWindows: [
    { window: "0–15'", hammarbyGoals: 4, opponentConcededGoals: 1 },
    { window: "16–30'", hammarbyGoals: 4, opponentConcededGoals: 3 },
    { window: "31–45+'", hammarbyGoals: 8, opponentConcededGoals: 3 },
    { window: "46–60'", hammarbyGoals: 10, opponentConcededGoals: 3 },
    { window: "61–75'", hammarbyGoals: 8, opponentConcededGoals: 2 },
    { window: "76–90+'", hammarbyGoals: 5, opponentConcededGoals: 3 },
  ],
  goalTypeNotes: [
    {
      label: "GAIS finish-problem",
      value: "33,5 xG → 21 mål (−13)",
      interpretation:
        "De skapar topp-4-chanser men sätter dem inte. Vid ledning: håll strukturen och låt frustrationen bygga.",
    },
    {
      label: "GAIS mål framåt",
      value: "13 av 20 mål efter paus (46–90+)",
      interpretation:
        "Farligast i andra halvlek – särskilt sent (5 mål 76–90+). Intensitet i 2H är icke-förhandlingsbar.",
    },
    {
      label: "Förra mötets facit",
      value: "Petrovic 25' · Salter 80' · Skoglund rött 70'",
      interpretation:
        "Tidigt mål + sent avgörande. Disciplin i dueller och boxförsvar är avgörande på hemmaplan.",
    },
    {
      label: "HIF hemmastyrka",
      value: "7V–1O–1F hemma · 29–5 i mål",
      interpretation:
        "3Arena är HIF:s fästning 2026. Field tilt och press ska diktera matchbilden.",
    },
  ],
  trafficLightCards: [
    {
      metric: "Förra mötet",
      bigNumber: "2–0",
      badge: "GAIS VANN I MAJ",
      color: "red",
      rankNote: "Petrovic 25' · Salter 80' · Skoglund rött 70'",
      explanation:
        "GAIS vann kvalitetsstriden (2,64–2,02 xG) trots att HIF hade mer boll. Samma misstag – billiga omställningar och svag finish – får inte upprepas på 3Arena.",
      podcastComment:
        "De vann rättvist i maj. HIF har starkare form nu, men GAIS defensiv är fortfarande elite. Skillnaden avgörs i finish och disciplin.",
    },
    {
      metric: "Twelve Outcome",
      bigNumber: "1 vs 4",
      badge: "HIF 1:A · GAIS 4:A",
      color: "green",
      rankNote: "Overall performance 20 aug 2026",
      explanation:
        "Hammarby är 1:a i fem av sju Twelve-faser (Defence, Att. Transition, Attack, Chance Creation, Outcome). GAIS är 1:a i defensiv transition och chansbegränsning – specialister, inte underdogs.",
      podcastComment:
        "Titta på rankingtavlan: vi är bredare bäst, de är smalare men extremt bra där det gör ont – omställningsförsvar och stängda chanser.",
    },
    {
      metric: "GAIS xP-gap",
      bigNumber: "+8",
      badge: "xP 31 · POÄNG 23",
      color: "yellow",
      rankNote: "4:a i xP, 9:a i tabellen",
      explanation:
        "GAIS har presterat på topp-4-nivå under ytan men bara 23 poäng. Undervärdera dem inte – underliggande spelet är farligare än tabellplatsen.",
      podcastComment:
        "Tabellen ljuger lite om GAIS. xP säger topp-4. Vi måste spela mot deras spelet, inte mot deras poängrad.",
    },
  ],
  spotlightKey:
    "Matchnyckel: äg andrabollen mot deras långbollar, låt inte counterpressen starta kontringar, och omsätt 3Arenas field tilt i boxchanser av hög kvalitet. GAIS är ligans bästa på att begränsa chanser och snabbast i defensiv transition – men sämst bland topp-xG-lag på att sätta bollen i nät. Vinn duellerna, håll 11 man, och var kliniska.",
  hammarbyPlan: {
    withBall: [
      "Cirkulera under deras höga press (PPDA 5,71). Spela dig ur första vågen – HIF:s 87 % passningsprecision är vapnet mot deras counterpress.",
      "Attackera straffområdet: GAIS släpper in få men HIF är 1:a i boxberöringar (31,5). Halvrumslöpningar + sista passning – inte halvchanser utifrån.",
      "Utnyttja Attacking Transition-fördelen (Twelve 1:a vs 2:a). När GAIS backar efter egen press – slå vertikalt direkt.",
      "Tålamod hemma: 7V–1O–1F på 3Arena. Field tilt tvingar GAIS att springa; öppningarna kommer i 2H (HIF gör flest mål 46–60).",
    ],
    withoutBall: [
      "Blockera första långbollen (49/match, 1:a). Stå kompakt i mittfältet och vinn andrabollen – det är matchens duell.",
      "Respektera deras Defensive Transition (Twelve 1:a): inga slarviga tapp i anfallshalvan. Vid tapp – omedelbar counterpress eller foul högt.",
      "Petrovic + Salter i boxen: markera tight vid inlägg och andraboll. Salter har 5 mål, Petrovic avgjorde förra mötet.",
      "Milovanović (4 assists) som motor: stäng halvrummet, hindra honom att vända och slå den vertikala passningen.",
    ],
    matchManagement: [
      "Disciplin först: Skoglunds röda 70' i maj vände matchbilden. Inga onödiga gula i pressdueller.",
      "Starta starkt psykologiskt – tidigt mål på 3Arena tar udden av GAIS kompaktet och tvingar dem upp.",
      "Vid ledning: GAIS finish sviker (0,63 mål/xG). Håll struktur, ge dem ytterskott, döda omställningarna.",
      "2H-fokus: GAIS gör 13/20 mål efter paus. Extra energi 46–60 och sista 15.",
    ],
  },
  playersToWatch: [
    {
      name: "Samuel Salter",
      position: "Forward · Kanada",
      scoutBadge: "🎯 5 mål · avgjorde förra mötet (80')",
      stats: [
        { label: "Mål", value: "5" },
        { label: "Assist", value: "1" },
        { label: "Min", value: "1152" },
      ],
      threat:
        "GAIS främsta målskytt. Satte 2–0 i maj inne i boxen. Lever på andraboll och near-post-löpningar.",
      motivation:
        "Håll honom framför dig i boxen. Vid långbollar och inlägg – första kontakt. Ge honom inte samma friläge som i 80' sist.",
    },
    {
      name: "Rasmus Niklasson Petrovic",
      position: "Forward · Sverige",
      scoutBadge: "⚡ Öppningsmål 25' i förra mötet",
      stats: [
        { label: "Mål", value: "2" },
        { label: "Assist", value: "1" },
        { label: "Min", value: "1401" },
      ],
      threat:
        "Rörlig ytter/forward som straffade HIF tidigt i maj. Jobbar mellan linjerna och avslutar från halvytor.",
      motivation:
        "Skugga i halvrummet. Låt honom inte vända upp i yta efter deras långboll. Tidig press när han tar emot.",
    },
    {
      name: "William Milovanović",
      position: "Midfielder · Sverige",
      scoutBadge: "🧠 4 assists – kreativa motorn",
      stats: [
        { label: "Assist", value: "4" },
        { label: "Mål", value: "2" },
        { label: "Min", value: "1243" },
      ],
      threat:
        "Länkspelaren som sätter den sista passningen efter bollvinst. Farligast när GAIS går från recover till vertikal attack.",
      motivation:
        "Stäng vändningen. Tvinga honom bakåt eller sidledes – aldrig den fria framåtpassningen in i Petrovic/Salter.",
    },
  ],
  headToHead: {
    sampleSize: 5,
    description:
      "Senaste 5 inbördes Allsvenskan-möten 2024–2026. GAIS har övertaget på sistone (3V på senaste 3).",
    summaryCards: [
      {
        title: "Senaste mötet",
        value: "GAIS 2–0 (maj 2026)",
        note: "Petrovic + Salter. Skoglund rött 70'.",
        tone: "amber",
      },
      {
        title: "Senaste på 3Arena",
        value: "HIF 1–2 GAIS (aug 2025)",
        note: "GAIS vann även senaste hemmamötet för HIF.",
        tone: "amber",
      },
      {
        title: "Form nu",
        value: "HIF 4V–1O senast 5",
        note: "HIF starkare i aktuell form; GAIS leder den senaste inbördes-serien.",
        tone: "emerald",
      },
    ],
    trendBullets: [
      "GAIS har vunnit de tre senaste inbördes mötena (2–0, 1–2, 3–2).",
      "Förra mötet 2026: GAIS 2,64 xG – HIF 2,02 xG, men HIF 0 mål.",
      "HIF är ligans bästa hemmalag 2026 (22p på 9 matcher) – hemmaplansfördelen är tydlig.",
      "Underliggande 2026: båda topp-4 i xP. Kvalitetsmatch, inte tabellkrock 2 vs 9.",
    ],
    matches: [
      {
        date: "2026-05-20",
        fixture: "GAIS - Hammarby",
        result: "2-0",
        venue: "away",
        outcome: "loss",
        hammarbyGoals: 0,
        opponentGoals: 2,
        hammarbyXg: 2.02,
        opponentXg: 2.64,
        hammarbyShots: 16,
        opponentShots: 16,
        sourceUrl:
          "https://bolldata.se/allsvenskan/matcher/2026/2026-05-20/gais-hammarby-2-0",
      },
      {
        date: "2025-08-17",
        fixture: "Hammarby - GAIS",
        result: "1-2",
        venue: "home",
        outcome: "loss",
        hammarbyGoals: 1,
        opponentGoals: 2,
        hammarbyXg: 0,
        opponentXg: 0,
        hammarbyShots: 0,
        opponentShots: 0,
        sourceUrl: "https://www.transfermarkt.com/",
      },
      {
        date: "2025-07-13",
        fixture: "GAIS - Hammarby",
        result: "3-2",
        venue: "away",
        outcome: "loss",
        hammarbyGoals: 2,
        opponentGoals: 3,
        hammarbyXg: 0,
        opponentXg: 0,
        hammarbyShots: 0,
        opponentShots: 0,
        sourceUrl: "https://www.transfermarkt.com/",
      },
      {
        date: "2024-08-26",
        fixture: "Hammarby - GAIS",
        result: "0-0",
        venue: "home",
        outcome: "draw",
        hammarbyGoals: 0,
        opponentGoals: 0,
        hammarbyXg: 0,
        opponentXg: 0,
        hammarbyShots: 0,
        opponentShots: 0,
        sourceUrl: "https://www.transfermarkt.com/",
      },
      {
        date: "2024-07-07",
        fixture: "GAIS - Hammarby",
        result: "0-0",
        venue: "away",
        outcome: "draw",
        hammarbyGoals: 0,
        opponentGoals: 0,
        hammarbyXg: 0,
        opponentXg: 0,
        hammarbyShots: 0,
        opponentShots: 0,
        sourceUrl: "https://www.transfermarkt.com/",
      },
    ],
  },
  refereePreview: {
    name: "Victor Wolf",
    role: "Huvuddomare",
    fixtureLabel: "Hammarby – GAIS · Omgång 18 · 23 aug 2026",
    talkTrack:
      "Victor Wolf dömer på 3Arena. Enda HIF-matchen 2026 hittills: IFK Göteborg 0–1 (omg 7, 9 maj). Där fick Hammarby 5–1 i frisparkar och 0–2 i gula kort – domarindex +6. Mot GAIS, som pressar hårt och spelar många långbollar, blir dueller och andrabollar avgörande – disciplin i duellspelet minskar risken för gula i press.",
    takeaways: [
      "Wolf har dömt HIF en gång 2026 (borta mot IFK Göteborg) med starkt positivt domarindex (+6).",
      "Frisparksfördel 5–1 och kort 0–2 i den matchen – tydlig linje i duellbedömningen.",
      "GAIS spelar fysiskt i transition: håll 11 man och undvik onödiga gula i pressdueller (Skoglund rött 70' i maj).",
    ],
  },
  glossary: [
    {
      term: "Domarindex",
      explanation:
        "Netto av frisparks- och kortdifferens för Hammarby i en match. Positivt = fördel HIF, negativt = nackdel.",
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
        "Expected Points – poäng laget 'förtjänat' utifrån matchernas xG-bilder.",
    },
    {
      term: "Defensive Transition",
      explanation:
        "Sekunderna efter bollförlust: hur snabbt laget återerövrar och stänger ytor.",
    },
    {
      term: "Andraboll",
      explanation:
        "Bollen som blir kvar efter duell, nick eller block – avgörande mot GAIS långbollar.",
    },
    {
      term: "PPDA",
      explanation:
        "Passningar per defensiv aktion. Lägre = hårdare press. HIF 5,05 · GAIS 5,71.",
    },
  ],
};
