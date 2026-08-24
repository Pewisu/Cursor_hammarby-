import type { UpcomingOpponentReport } from "@/lib/upcomingOpponentsData";

/**
 * Svenska Cupen 2026/27 · Omgång 2
 * FC Stockholm Internazionale – Hammarby · 26 aug 2026 · Stockholms Stadion
 *
 * Källor: Twelve season report Stockholm Inter (24 aug 2026) + Ettan Norra-tabell + cuphistorik
 */
export const fcStockholmCupReport: UpcomingOpponentReport = {
  round: 201,
  roundLabel: "Svenska Cupen · Omgång 2",
  hidden: false,
  fixture: "FC Stockholm - Hammarby",
  dateLabel: "Onsdag 26 augusti 2026 · 18:30 · Stockholms Stadion",
  venueLabel: "Stockholms Stadion (bortaplan)",
  comparisonLabel: "Allsvenskan vs Ettan Norra · Twelve 24 aug 2026",
  oneLineSummary:
    "Cupborta på Stockholms Stadion: FC Stockholm (Stockholm Internazionale) leder Ettan-nivå i Twelve (Outcome 2:a av 32) med hög press (PPDA 4,65) och klinisk finish (2,19 mål/match). De är två serier under HIF – men ett av Ettans bästa lag. Senaste mötet: HIF 3–0 i cupgruppspelet feb 2025.",
  hifBadges: ["2:a i Allsvenskan", "33p", "Två serier över"],
  opponentBadges: ["Ettan Norra · toppstrid", "Twelve Outcome 2/32", "PPDA 4,65"],
  introStats: [
    { label: "Turnering", value: "Svenska Cupen omg 2", tone: "blue" },
    { label: "Nivåskillnad", value: "Allsvenskan vs Ettan", tone: "emerald" },
    { label: "Inter tabell", value: "4:a Ettan Norra", tone: "amber" },
    { label: "Twelve Outcome", value: "2:a av 32 Ettan", tone: "amber" },
    { label: "Senaste cupmöte", value: "HIF 3–0 (feb 2025)", tone: "emerald" },
  ],
  previousMeeting: {
    date: "2025-02-22",
    fixture: "FC Stockholm - Hammarby",
    result: "0–3",
    venue: "away",
    outcome: "win",
    halfTimeScore: "0–0",
    scorers: [
      { team: "hammarby", player: "Jusef Erabi", minute: 65 },
      { team: "hammarby", player: "Paulos Abraham", minute: 70 },
      { team: "hammarby", player: "Abdelrahman Boudah", minute: 96 },
    ],
    contextNote:
      "Cupgruppspel på 3Arena (8 283 åskådare). 0–0 i paus trots att HIF flyttade på Inter. Erabi nickade in 1–0 (65'), Abraham gjorde 2–0 efter bollvinst högt (70'), Boudah stängde i 96'. Inter orkade inte temporna i andra halvlek när ytorna öppnades.",
    keyStory:
      "Klasskillnad i 2H: HIF vann duellerna, vann andrabollen och straffade trötta ytor. Samma recept gäller på Stockholms Stadion – tidig press, tålamod, sedan vertikalitet när Inter backar.",
    seriesTurnedNote:
      "Första cupmötet 2025 slutade 3–0 till HIF. Nu möts lagen igen i cupen – den här gången på Stockholms Stadion med Inter i stark Ettan-form 2026.",
  },
  mobileTakeaways: [
    "Svenska Cupen omg 2 · onsdag 26 aug 18:30 · Stockholms Stadion (borta).",
    "FC Stockholm = Stockholm Internazionale i Ettan Norra – två serier under Allsvenskan.",
    "Twelve (24 aug): Outcome/Attack/Chance Creation/Transitions 2:a av 32 i hela Ettan. Defence 3:a.",
    "Hög press: PPDA 4,65 · DAH 46,0 m (2:a) · field tilt 67 % · 2,19 mål/match.",
    "Svaghet: final third → box bara 19:e i Ettan (19 %) – territory utan boxpenetration.",
    "Opp. np xG 0,85 (2:a) men trend: chanser emot har ökat senaste 10 matcherna.",
    "Senaste cupmöte feb 2025: HIF 3–0 (Erabi, Abraham, Boudah) efter 0–0 i paus.",
    "Nyckel: tempo + fysik i 2H, straffa höga linjen, och var kliniska i boxen.",
  ],
  dataSources: [
    "Twelve season report Stockholm Inter: https://reports.twelve.football/reports/stockholm-inter-season-report-R6hhmGufRM.pdf (24 aug 2026)",
    "Ettan Norra 2026 tabell: https://www.svenskfotboll.se/serier-cuper/tabell-och-resultat/ettan-norra-herr-2026/133338/",
    "Svenska Cupen 2026/27 omg 2: FC Stockholm – Hammarby 26 aug 18:30 Stockholms Stadion",
    "Cupmöte 22 feb 2025: FC Stockholm 0–3 Hammarby (3Arena) – Transfermarkt / matchrapporter",
  ],
  cupSpecial: {
    title: "Svenska Cupen · nivåskillnad Ettan vs Allsvenskan",
    context:
      "FC Stockholm Internazionale spelar i Ettan Norra – två serier under Hammarby (Allsvenskan → Superettan → Ettan). Twelve rankar dem som ett av Ettans absolut bästa lag 2026 (2:a av 32 i Outcome). Cupmatcher mot lägre divisioner vinns ofta på tempo, fysik och precision i straffområdet – men Inter pressar hårt (PPDA 4,65) och konverterar bra (2,19 mål från 1,91 xG). Respektera spelet, dominera nivån.",
    tacticalKeys: [
      "Nivå: Allsvensk intensitet från start. Inter är vana vid Ettan-tempo – HIF ska höja tempot, inte sänka sig.",
      "Pressduell: Inter PPDA 4,65 liknar HIF. Spela dig ur första vågen med korta kombinationer, sedan attackera ytan bakom deras höga linje (DAH 46 m).",
      "Boxnyckel: Inter är 19:e i final third→box (19 %). HIF ska vara motsatsen – många beröringar inne i boxen, hög skottkvalitet.",
      "2H-plan: I feb 2025 öppnades matchen efter paus när Inter tröttnade. Samma mönster – håll intensiteten 60–90.",
      "Disciplin: Inter foular 68 % i anfallshalvan. Dra frisparkar, undvik egna onödiga gula i pressdueller.",
    ],
  },
  quickStatusCards: [
    {
      title: "Hammarby just nu",
      body: "2:a i Allsvenskan (33p). Ligans bästa hemmalag och Twelve-topp i Attack/Chance Creation/Outcome. Cupborta efter ligamöte med GAIS – fokus på rotation vs kvalitet.",
      tone: "emerald",
    },
    {
      title: "FC Stockholm just nu",
      body: "Ettan Norra toppstrid (4:a efter 14 omg. i publik tabell). Twelve 24 aug: 2,00 p/match, 2,19 mål, 0,94 insläppta – Outcome 2:a av 32 i hela Ettan.",
      tone: "amber",
    },
    {
      title: "Cupnyckel: nivå × press",
      body: "Inter är farliga för Ettan med hög press och finish. HIF vinner om de äger field tilt, straffar den höga linjen och omsätter boxchanser – inte om de spelar 'för försiktigt'.",
      tone: "blue",
    },
  ],
  styleChips: [
    {
      label: "⬆️ Hög press",
      sub: "PPDA 4,65 · DAH 46,0 m (2:a av 32)",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
    {
      label: "⚡ Counterpress",
      sub: "Def. Transition 2:a · Att. Transition 2:a",
      color: "border-amber-600/50 bg-amber-950/60 text-amber-200",
    },
    {
      label: "🎯 Klinisk finish",
      sub: "2,19 mål/match · np Goals 2,12 från 1,86 xG",
      color: "border-rose-600/50 bg-rose-950/60 text-rose-200",
    },
    {
      label: "🧱 Svag boxpenetration",
      sub: "Final third→box 19 % (19:e i Ettan)",
      color: "border-emerald-600/50 bg-emerald-950/60 text-emerald-200",
    },
    {
      label: "📊 Ettan-elit",
      sub: "Outcome 2:a av 32 · field tilt 67 %",
      color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300",
    },
  ],
  opponentStyle: [
    "Twelve: aggressiv hög press + counterpress. Defensiva aktioner nära motståndarmålet (DAH 46,04 m, 2:a av 32). PPDA 4,65 – intensivt i Ettan-klass.",
    "Balanserad attack: blandar build-up (60 % från målspark) och långbollar (16 %). Boxentries via inlägg (29 %) och carries (16 %).",
    "Exceptionell i båda transitionsfaserna (2:a av 32): snabb recover högt + omedelbar attack efter bollvinst (83 % possessions retained after 5s, 1:a).",
    "Chansskapning elite: 25,6 boxberöringar, 15,1 np-skott, 4,12 HQ-skott, 1,86 np xG – och de sätter dem (2,12 np-mål).",
    "Svaga punkter: final third→box bara 19:e (19 %) – de dominerar territorium (field tilt 67 %) men tar sig inte alltid in i boxen. Defensiva dueller 18:e (63 %).",
    "Trendvarning: opposition chance creation har ökat senaste 10 matcherna – defensiv stabilitet något mer porös just nu.",
  ],
  styleProfile: [
    {
      label: "Overall Outcome (Twelve · Ettan)",
      value: "2:a av 32 · 2,00 p/match · +0,04 vs xP",
      score: 94,
      explanation:
        "Inter presterar som ett topp-2-lag i hela Ettan. Cupmässigt: respektera nivån inom deras division – men HIF ska fortfarande dominera.",
    },
    {
      label: "Höjdpress (Twelve)",
      value: "PPDA 4,65 · DAH 46,0 m (2:a) · intensity 6,93",
      score: 88,
      explanation:
        "De jagar högt. HIF måste vara rena i uppspel – och sedan attackera ytan bakom linjen när pressen bryts.",
    },
    {
      label: "Transitions (Twelve)",
      value: "Def 2:a · Att 2:a · recover 42,5 m",
      score: 90,
      explanation:
        "Farligast direkt efter bollvinst. Inga slarviga tapp i anfallshalvan – counterpress eller säkert bakåtspel.",
    },
    {
      label: "Finish",
      value: "2,19 mål · 1,91 xG · överkonvertering",
      score: 85,
      explanation:
        "De sätter sina lägen. Ge dem inte HQ-skott – särskilt inte omställningslägen inne i boxen.",
    },
    {
      label: "Boxpenetration (svaghet)",
      value: "Final third→box 19 % (19:e av 32)",
      score: 35,
      explanation:
        "Tydligaste strukturella svagheten. HIF ska tvinga dem till ytterskott och stänga inläggskanaler.",
    },
  ],
  twelvePhaseRanks: [
    {
      label: "Defence",
      hammarbyRank: 1,
      opponentRank: 3,
      talkTrack: "HIF 1:a Allsvenskan · Inter 3:a Ettan (32). Båda pressar högt.",
    },
    {
      label: "Defensive Transition",
      hammarbyRank: 2,
      opponentRank: 2,
      talkTrack: "Inter 2:a i Ettan – counterpressen är deras vapen.",
    },
    {
      label: "Opp. Chance Creation",
      hammarbyRank: 2,
      opponentRank: 2,
      talkTrack: "Inter begränsar chanser väl (opp. xG 0,85) – men trenden pekar uppåt emot dem.",
    },
    {
      label: "Attacking Transition",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "HIF etta i Allsvenskan. Straffa Inter efter bollvinst bakom deras linje.",
    },
    {
      label: "Attack",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "Inter 2:a i Ettan med 57 % boll och 67 % field tilt – HIF ska äga matchbilden ändå.",
    },
    {
      label: "Chance Creation",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "Inter skapar 1,86 np xG/match i Ettan. HIF skapar mer mot tyngre motstånd.",
    },
    {
      label: "Outcome",
      hammarbyRank: 1,
      opponentRank: 2,
      talkTrack: "Båda omsätter spelet. Cupen avgörs av precision och intensitet, inte tabellrad.",
    },
  ],
  bolldataRankings: [
    {
      label: "xG / match",
      group: "offensiv",
      hammarbyValue: "2,42",
      hammarbyRank: 1,
      opponentValue: "1,91",
      opponentRank: 2,
      talkTrack: "HIF Allsvenskan 1:a · Inter Ettan topp. Absolut nivåskillnad kvarstår.",
    },
    {
      label: "Gjorda mål / match",
      group: "offensiv",
      hammarbyValue: "2,35",
      hammarbyRank: 2,
      opponentValue: "2,19",
      opponentRank: 2,
      talkTrack: "Inter är kliniska i sin liga – ta dem på allvar i boxen.",
    },
    {
      label: "np-skott / match",
      group: "offensiv",
      hammarbyValue: "20,1",
      hammarbyRank: 1,
      opponentValue: "15,1",
      opponentRank: 2,
      talkTrack: "Volymfördel HIF. Inter skjuter ändå mycket för Ettan.",
    },
    {
      label: "HQ-skott / match",
      group: "offensiv",
      hammarbyValue: "hög",
      hammarbyRank: 1,
      opponentValue: "4,12",
      opponentRank: 2,
      talkTrack: "Inter skapar många HQ-lägen – stäng halvrum och box.",
    },
    {
      label: "Bollinnehav %",
      group: "offensiv",
      hammarbyValue: "60 %",
      hammarbyRank: 1,
      opponentValue: "57 %",
      opponentRank: 2,
      talkTrack: "Inter äger bollen i Ettan. HIF ska ta över field tilt på Stadion.",
    },
    {
      label: "Field tilt %",
      group: "offensiv",
      hammarbyValue: "~69 %",
      hammarbyRank: 1,
      opponentValue: "67 %",
      opponentRank: 2,
      talkTrack: "Liknande territoriell profil – HIF måste vinna den duellen.",
    },
    {
      label: "Opp. xG / match",
      group: "defensiv",
      hammarbyValue: "1,23",
      hammarbyRank: 3,
      opponentValue: "0,85",
      opponentRank: 2,
      talkTrack: "Inter släpper till lite xG i Ettan. HIF behöver kvalitetschanser.",
    },
    {
      label: "Insläppta / match",
      group: "defensiv",
      hammarbyValue: "0,88",
      hammarbyRank: 1,
      opponentValue: "0,94",
      opponentRank: 2,
      talkTrack: "Båda håller nollan ofta i sina ligor.",
    },
    {
      label: "PPDA (press)",
      group: "stil",
      hammarbyValue: "5,05",
      hammarbyRank: 1,
      opponentValue: "4,65",
      opponentRank: 4,
      talkTrack: "Inter pressar extremt hårt för Ettan – nästan HIF-nivå i PPDA.",
    },
    {
      label: "DAH (m)",
      group: "stil",
      hammarbyValue: "~44–45",
      hammarbyRank: 1,
      opponentValue: "46,0",
      opponentRank: 2,
      talkTrack: "Inter försvarar ännu högre. Ytan bakom linjen är HIF:s vapen.",
    },
    {
      label: "Final 3rd → box %",
      group: "stil",
      hammarbyValue: "hög",
      hammarbyRank: 1,
      opponentValue: "19 %",
      opponentRank: 19,
      talkTrack: "Inter-svaghet: territory utan boxintrång. Exploatera.",
    },
    {
      label: "Långbollar %",
      group: "stil",
      hammarbyValue: "~10–12 %",
      hammarbyRank: 16,
      opponentValue: "16 %",
      opponentRank: 2,
      talkTrack: "Inter blandar mer långt spel. Andrabollen viktig.",
    },
  ],
  spiderComparison: [
    {
      label: "xG / match",
      hammarbyValue: "2,42 (Allsv)",
      opponentValue: "1,91 (Ettan)",
      hammarbyScore: 100,
      opponentScore: 79,
      note: "HIF skapar mer mot tyngre motstånd. Inter är ändå Ettan-elit offensivt.",
    },
    {
      label: "Mål / match",
      hammarbyValue: "2,35",
      opponentValue: "2,19",
      hammarbyScore: 100,
      opponentScore: 93,
      note: "Inter konverterar starkt. Ge dem inte billiga HQ-lägen.",
    },
    {
      label: "Bollinnehav (%)",
      hammarbyValue: "60 %",
      opponentValue: "57 %",
      hammarbyScore: 100,
      opponentScore: 95,
      note: "Jämna profiler i respektive liga – HIF ska äga Stadion.",
    },
    {
      label: "Field tilt (%)",
      hammarbyValue: "~69 %",
      opponentValue: "67 %",
      hammarbyScore: 100,
      opponentScore: 97,
      note: "Territoriell duell. HIF måste vinna sista tredjedelen.",
    },
    {
      label: "PPDA (lägre bättre)",
      hammarbyValue: "5,05",
      opponentValue: "4,65",
      hammarbyScore: 92,
      opponentScore: 100,
      note: "Inter pressar hårdare i PPDA-siffran – beredda på hög jakt.",
    },
    {
      label: "Opp. xG",
      hammarbyValue: "1,23",
      opponentValue: "0,85",
      hammarbyScore: 69,
      opponentScore: 100,
      note: "Inter är tightare i sin liga. HIF behöver boxkvalitet, inte volymhalvchanser.",
    },
  ],
  rankedMetrics: [
    {
      label: "Twelve Outcome",
      hammarbyValue: "1:a / 16 Allsv",
      hammarbyRank: "1:a av 16",
      opponentValue: "2:a / 32 Ettan",
      opponentRank: "2:a av 32",
      note: "Båda toppar sina ligor. Cupen handlar om att omsätta nivåskillnaden.",
    },
    {
      label: "xG / match",
      hammarbyValue: "2,42",
      hammarbyRank: "1:a Allsvenskan",
      opponentValue: "1,91",
      opponentRank: "Topp Ettan",
      note: "Absolut offensiv fördel HIF, trots Inter-dominans i Ettan.",
    },
    {
      label: "PPDA",
      hammarbyValue: "5,05",
      hammarbyRank: "1:a Allsvenskan",
      opponentValue: "4,65",
      opponentRank: "4:a av 32 Ettan",
      note: "Inter jagar hårt. Spela rent ur press, sedan djupled.",
    },
    {
      label: "DAH (m)",
      hammarbyValue: "~45",
      hammarbyRank: "Topp Allsvenskan",
      opponentValue: "46,0",
      opponentRank: "2:a av 32",
      note: "Ytan bakom Inter-linjen är den tydligaste attackvägen.",
    },
    {
      label: "Final 3rd → box %",
      hammarbyValue: "hög",
      hammarbyRank: "Topp Allsvenskan",
      opponentValue: "19 %",
      opponentRank: "19:e av 32",
      note: "Inter-svaghet att exploatera defensivt: håll dem utanför boxen.",
    },
    {
      label: "Opp. np xG",
      hammarbyValue: "~1,15–1,23",
      hammarbyRank: "Topp-3 Allsv",
      opponentValue: "0,85",
      opponentRank: "2:a av 32",
      note: "Inter begränsar chanser – HIF måste skapa riktiga boxlägen.",
    },
  ],
  goalWindows: [],
  goalTypeNotes: [
    {
      label: "Inter finish (Twelve)",
      value: "2,19 mål från 1,91 xG · np 2,12 från 1,86",
      interpretation:
        "De överkonverterar något. Låga HQ-skott emot dem är icke-förhandlingsbart – särskilt i omställningar.",
    },
    {
      label: "Inter boxproblem",
      value: "Field tilt 67 % men final 3rd→box 19:e",
      interpretation:
        "De kan äga territorium utan att skapa boxfarlighet. HIF:s block ska tvinga ytterskott och dåliga inlägg.",
    },
    {
      label: "Cupfacit feb 2025",
      value: "0–0 HT → 0–3 FT (Erabi, Abraham, Boudah)",
      interpretation:
        "Matchen öppnades i 2H när Inter tröttnade. Samma plan: tempo, fysik, sen vertikalitet.",
    },
    {
      label: "Nivåskillnad",
      value: "Allsvenskan vs Ettan Norra (två serier)",
      interpretation:
        "Statistik från olika ligor. Använd Twelve-faserna som stilguide – inte som 1:1-jämförelse av absolut kvalitet.",
    },
  ],
  trafficLightCards: [
    {
      metric: "Nivåskillnad",
      bigNumber: "2 serier",
      badge: "ALLSVENSKAN VS ETTAN",
      color: "green",
      rankNote: "Inter Outcome 2:a/32 Ettan · HIF 1:a/16 Allsvenskan",
      explanation:
        "FC Stockholm är Ettan-elit men två divisioner under. Cupmatcher mot lägre lag vinns på intensitet, boxprecision och mentalt fokus – inte på att 'spela säkert neråt'.",
      podcastComment:
        "De är bra för Ettan – Twelve säger topp två. Men det är fortfarande två serier upp till oss. Vi ska dominera utan att bli arroganta.",
    },
    {
      metric: "Inter presshöjd",
      bigNumber: "PPDA 4,65",
      badge: "HÖG JAKT",
      color: "yellow",
      rankNote: "DAH 46,0 m (2:a) · fouls att. half 68 %",
      explanation:
        "Inter jagar högt och foular ofta i anfallshalvan. Risk: de vinner boll högt. Möjlighet: yta bakom linjen + frisparkar när de tar foul.",
      podcastComment:
        "De pressar nästan som ett allsvenskt lag i PPDA. Spela rent ur första vågen – sen är ytan bakom dem öppen.",
    },
    {
      metric: "Boxpenetration",
      bigNumber: "19:e",
      badge: "SVAGHET ATT STRAFFA",
      color: "red",
      rankNote: "Final third → box 19 % · trots 67 % field tilt",
      explanation:
        "Inter dominerar territorium men tar sig sämre in i boxen. Defensivt: håll dem utanför straffområdet. Offensivt: HIF ska göra exakt tvärtom.",
      podcastComment:
        "De äger planen men inte boxen. Vi ska vara det laget som faktiskt lever inne i straffområdet.",
    },
  ],
  spotlightKey:
    "Cupnyckel: höj tempot från start, spela dig ur deras PPDA 4,65-press, och attackera ytan bakom DAH 46 m. Inter är Ettan-elit i finish och transitions – men svaga på final third→box. Dominera field tilt, skapa HQ-boxchanser, och låt 2H-fysiken avgöra som i feb 2025 (0–0 → 3–0).",
  hammarbyPlan: {
    withBall: [
      "Rena uppspel under Inter-press (PPDA 4,65). Korta kombinationer ur första vågen – sedan djupled bakom deras 46 m-linje.",
      "Prioritera boxberöringar: Inter är 19:e på final third→box. HIF ska vara kliniska inne i straffområdet, inte nöja sig med ytterskott.",
      "Utnyttja Attacking Transition (HIF 1:a). Efter bollvinst i mittfältet – vertikalitet innan Inter sätter blocket.",
      "Tålamod första 45, acceleration andra: cupfacit 2025 visar att ytorna kommer när Inter tröttnar.",
    ],
    withoutBall: [
      "Stäng HQ-lägen: Inter gör 2,19 mål/match och överkonverterar. Kompakt box, inga andrabollsgåvor.",
      "Respektera deras transitions (2:a/32): vid eget tapp i anfallshalvan – omedelbar counterpress.",
      "Sunesson (11 mål i Ettan) i boxen: första kontakt vid inlägg och recovers. Markera tight i sexmeterszonen.",
      "Tvinga dem till ytterskott: deras svaghet är just att ta sig från final third in i boxen (19 %).",
    ],
    matchManagement: [
      "Mentalitet: två serier över – men Twelve-topp i Ettan. Inget 'cupmys', full matchintensitet.",
      "Rotation vs kvalitet: behåll tillräckligt med A-lagsryggrad för press och boxdueller.",
      "Vid ledning: Inter måste öppna sig. Straffa omställningar, döda matchen med field tilt.",
      "Disciplin: Inter foular högt (68 % att. half) – dra frisparkar, undvik egna gula i jaktfaser.",
    ],
  },
  playersToWatch: [
    {
      name: "Lukas Sunesson",
      position: "Forward · Ettan Norra",
      scoutBadge: "🎯 11 mål · lagets spjutspets",
      stats: [
        { label: "Mål (Ettan)", value: "11" },
        { label: "Roll", value: "CF / spets" },
        { label: "Hot", value: "Box + andraboll" },
      ],
      threat:
        "Inter främsta målskytt 2026. Lever på boxberöringar, near-post och andraboll efter inlägg/omställningar.",
      motivation:
        "Första kontakt i straffområdet. Följ honom i löpningar bakom backlinjen när Inter går långt eller counterar.",
    },
    {
      name: "Höjdpress-kollektivet",
      position: "Mittfält / ytterpress",
      scoutBadge: "⚡ PPDA 4,65 · DAH 46 m",
      stats: [
        { label: "PPDA", value: "4,65" },
        { label: "DAH", value: "46,0 m" },
        { label: "Fouls att. half", value: "68 %" },
      ],
      threat:
        "Inte en ensam stjärna – hela laget jagar högt och vinner boll i sista tredjedelen för direkta chanser.",
      motivation:
        "Spela dig ur pressen med tre passningar, inte en. När första vågen är bruten – attackera ytan bakom.",
    },
    {
      name: "Omställningsvapnet",
      position: "Attacking Transition 2:a/32",
      scoutBadge: "🚀 0,26 xG inom 10s efter recover",
      stats: [
        { label: "Att. Transition", value: "2:a/32" },
        { label: "xG / 10s recover", value: "0,26" },
        { label: "Retain 5s", value: "83 % (1:a)" },
      ],
      threat:
        "Efter bollvinst behåller de spelet och går snabbt mot box (4,62 boxentries inom 10s efter recover).",
      motivation:
        "Vid tapp: counterpress direkt. Vid eget försvar: stäng första passningen framåt efter deras recover.",
    },
  ],
  headToHead: {
    sampleSize: 1,
    description:
      "Hammarby och FC Stockholm Internazionale möttes i Svenska Cupen gruppspel 22 feb 2025 på 3Arena. HIF vann 3–0 efter 0–0 i paus.",
    summaryCards: [
      {
        title: "Senaste cupmöte",
        value: "HIF 3–0 (feb 2025)",
        note: "Erabi 65' · Abraham 70' · Boudah 90+6'",
        tone: "emerald",
      },
      {
        title: "Arena då",
        value: "3Arena · 8 283",
        note: "Nu: Stockholms Stadion (Inter hemma)",
        tone: "blue",
      },
      {
        title: "Mönster",
        value: "0–0 HT → 3–0 FT",
        note: "2H-tempo avgjorde när Inter tröttnade",
        tone: "amber",
      },
    ],
    trendBullets: [
      "Enda moderna cupmötet: HIF 3–0 i gruppspelet 2024/25.",
      "Matchbilden öppnades efter paus – fysik och intensitet i 2H.",
      "Inter har växt till Ettan-elit 2026 (Twelve Outcome 2:a/32) – tuffare än förra cupmötet.",
      "HIF ska återupprepa receptet: tålamod, tempoökning, boxprecision.",
    ],
    matches: [
      {
        date: "2025-02-22",
        fixture: "FC Stockholm - Hammarby",
        result: "0-3",
        venue: "away",
        outcome: "win",
        hammarbyGoals: 3,
        opponentGoals: 0,
        hammarbyXg: 0,
        opponentXg: 0,
        hammarbyShots: 0,
        opponentShots: 0,
        sourceUrl:
          "https://www.transfermarkt.us/spielbericht/index/spielbericht/4555638",
      },
    ],
  },
  glossary: [
    {
      term: "Ettan Norra",
      explanation:
        "Sveriges tredje högsta serie (nivå 3). Två serier under Allsvenskan: Allsvenskan → Superettan → Ettan.",
    },
    {
      term: "Twelve-fas (32)",
      explanation:
        "I Stockholm Inter-rapporten rankas lag mot 32 Ettan-lag (Norra+Södra). Rank 1 = bäst i hela Ettan.",
    },
    {
      term: "PPDA",
      explanation:
        "Passningar per defensiv aktion. Lägre = hårdare press. Inter 4,65 · HIF ~5,05.",
    },
    {
      term: "DAH",
      explanation:
        "Defensive Action Height – snitthöjd för defensiva aktioner. Inter 46,0 m = extremt högt.",
    },
    {
      term: "Final third → box %",
      explanation:
        "Andel anfall i sista tredjedelen som når straffområdet. Inter 19 % (19:e) = svag penetration.",
    },
    {
      term: "Field tilt",
      explanation:
        "Andel passeringsförsök i sista tredjedelen. Högre = mer territoriell dominans.",
    },
    {
      term: "xG / Opp. xG",
      explanation:
        "Expected Goals för respektive emot – chanskvalitet omvandlad till förväntade mål.",
    },
  ],
};
