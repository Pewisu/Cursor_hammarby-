export interface TrafficLightCard {
  metric: string;
  bigNumber: string;
  badge: string;
  color: "red" | "green" | "yellow";
  rankNote: string;
  explanation: string;
  podcastComment: string;
}

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

export interface StyleChip {
  label: string;
  sub: string;
  color: string;
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

export interface HeadToHeadSummaryCard {
  title: string;
  value: string;
  note: string;
  tone: "emerald" | "amber" | "blue";
}

export interface HeadToHeadMeeting {
  date: string;
  fixture: string;
  result: string;
  venue: "home" | "away";
  outcome: "win" | "draw" | "loss";
  hammarbyGoals: number;
  opponentGoals: number;
  hammarbyXg: number;
  opponentXg: number;
  hammarbyShots: number;
  opponentShots: number;
  sourceUrl: string;
}

export interface HeadToHeadSection {
  sampleSize: number;
  description: string;
  summaryCards: HeadToHeadSummaryCard[];
  trendBullets: string[];
  matches: HeadToHeadMeeting[];
}

export interface PositionProfile {
  position: string;
  formation: string;
  requiredQualities: string[];
  bestFit?: string[];
  reasoning: string;
}

export interface SquadRecommendation {
  formation: string;
  formationReasoning: string;
  positions: PositionProfile[];
  rotationNotes: string[];
}

export interface OpponentPlayerToWatch {
  name: string;
  position: string;
  stats: { label: string; value: string }[];
  threat: string;
  motivation: string;
  scoutBadge?: string;
}

export interface IntroStat {
  label: string;
  value: string;
  tone?: "emerald" | "amber" | "blue";
}

export interface PreviousMeetingScorer {
  team: "hammarby" | "opponent";
  player: string;
  minute: number;
  isPenalty?: boolean;
}

export interface PreviousMeeting {
  date: string;
  fixture: string;
  result: string;
  venue: "home" | "away";
  outcome: "win" | "draw" | "loss";
  halfTimeScore?: string;
  scorers?: PreviousMeetingScorer[];
  xgHammarby?: number;
  xgOpponent?: number;
  contextNote: string;
  keyStory: string;
  seriesTurnedNote?: string;
}

export interface UpcomingOpponentReport {
  round: number;
  roundLabel?: string;
  fixture: string;
  dateLabel: string;
  oneLineSummary: string;
  venueLabel?: string;
  introStats?: IntroStat[];
  hidden?: boolean;
  previousMeeting?: PreviousMeeting;
  styleChips?: StyleChip[];
  mobileTakeaways: string[];
  playersToWatch?: OpponentPlayerToWatch[];
  dataSources: string[];
  cupSpecial?: CupSpecialSection;
  headToHead?: HeadToHeadSection;
  trafficLightCards?: TrafficLightCard[];
  spotlightKey?: string;
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
  squadRecommendation?: SquadRecommendation;
  glossary: GlossaryTerm[];
}

export const upcomingOpponents: UpcomingOpponentReport[] = [
  {
    round: 16,
    roundLabel: "Omgång 16",
    hidden: true,
    fixture: "Hammarby - BK Häcken",
    dateLabel: "Söndag 9 augusti 2026 · 14:00 · 3Arena, Stockholm",
    venueLabel: "3Arena (hemmaplan)",
    oneLineSummary:
      "Häcken är 3:a i tabellen (25p på 15 matcher) och kom tillbaka från 0–2 till 3–2 senast vi möttes – nu är serien vänd och HIF tar revansch på hemmaplan. Häckens dalning (2 raka förluster mot Djurgårdsn och Örgryte) möter Hammarbys starka hemmafas.",
    introStats: [
      { label: "Tabellplats", value: "3:a (25p)", tone: "amber" },
      { label: "Form", value: "DD W LL", tone: "amber" },
      { label: "Gjorda/insläppta", value: "28–23", tone: "amber" },
      { label: "xG / match", value: "1,65", tone: "amber" },
      { label: "Hammarby hemma", value: "1:a i GD", tone: "emerald" },
    ],
    previousMeeting: {
      date: "2026-05-31",
      fixture: "BK Häcken - Hammarby",
      result: "3–2",
      venue: "away",
      outcome: "loss",
      halfTimeScore: "0–2",
      scorers: [
        { team: "hammarby", player: "Victor Lind", minute: 9 },
        { team: "hammarby", player: "Victor Lind", minute: 39 },
        { team: "opponent", player: "Amor Layouni", minute: 48, isPenalty: true },
        { team: "opponent", player: "Silas Andersen", minute: 55 },
        { team: "opponent", player: "Adrian Svanbäck", minute: 80 },
      ],
      xgHammarby: 1.27,
      xgOpponent: 2.82,
      contextNote:
        "Victor Lind (9', 39') fick Hammarby att leda 2–0 till halvtid. I andra halvlek fick Häcken straff direkt (Layouni 48'), Silas Andersen kvitterade solo-dribbel från mittplan (55'), och Svanbäck avgjorde med tio minuter kvar (80'). Hammarby hade aldrig vunnit på Bravida Arena.",
      keyStory:
        "Häcken hade 2,82 xG mot Hammarbys 1,27 – statistiskt dominerade de matchen trots att de låg under. Hammarbys halvtid var lysande defensivt, men urladdat i andra halvlek efter en tät period. Kalle Karlssons sista matcher som tränare präglades av tappa ledningar.",
      seriesTurnedNote:
        "Sedan dess: Hammarby är numera 2:a (26p) under Rydström, medan Häcken tappade två raka (2–4 vs Djurgårdsn, 3–4 vs Örgryte) men hämtade sig. Matchbilden ser annorlunda ut nu – på HIF:s hemmaplan.",
    },
    mobileTakeaways: [
      "Häcken 3:a (25p, 6V-7O-2F). Form: DDWLL – dalat efter VM-uppehållet.",
      "Förra mötet: Häcken 3–2 (HT 0–2). Häcken hade 2,82 xG vs HIF 1,27.",
      "Häcken lever på inlägg: ~42% box entries via inlägg. Stäng ytterbanorna.",
      "Häcken passivare press (PPDA ~6,0) vs HIF:s ligaledande PPDA 4,9.",
      "HIF hemma 2026: starkast i ligan offensivt. 3Arena är en fästning.",
      "Simen Hestnes (30, Norge, ex-KFUM Oslo) tog över Andersens roll i mittfältet. Harun Ibrahim (23, ex-GAIS) debuterade från start i Omg 15.",
      "Häcken tappar bollen ~35 gånger/match. HIF:s kontra exploaterar det.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 5 aug 2026)",
      "Twelve season report Häcken: https://reports.twelve.football/reports/h%C3%A4cken-season-report-WjVnPuPADs.pdf (aug 2026)",
      "Allsvenskantabellen.se – resultat och spelschema 2026",
      "Transfermarkt – matchfakta BK Häcken–Hammarby 31 maj 2026",
      "FotMob / BBC Sport – statistik och händelser",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (26p), 8V-2O-4F på 14 matcher. Stark hemmaform. Rydström bygger ett lag med tydlig spelmodell.",
        tone: "emerald",
      },
      {
        title: "Häcken just nu",
        body: "3:a (25p), 6V-7O-2F. Dalat med 2 raka L efter VM-pausen men hämtat sig med W + D + D.",
        tone: "amber",
      },
      {
        title: "Nyckelduell: inlägg vs press",
        body: "Häckens inläggsspel (42% box entries) möter HIF:s ligaledande press (PPDA 4,9). Blockera ytterbanorna.",
        tone: "blue",
      },
    ],
    styleChips: [
      { label: "🏃 Inläggsmaskinen", sub: "42% box entries via inlägg – störst i ligan", color: "border-amber-600/50 bg-amber-950/60 text-amber-200" },
      { label: "😴 Passiv press", sub: "PPDA ~6,0 – faller hellre tillbaka", color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300" },
      { label: "🔄 Bolltappare", sub: "~35 turnovers/match – exploaterbart", color: "border-rose-600/50 bg-rose-950/60 text-rose-200" },
      { label: "📉 Form-dip", sub: "2 raka förluster efter VM-pausen", color: "border-rose-600/50 bg-rose-950/60 text-rose-200" },
      { label: "🚪 Andersen borta", sub: "Hestnes + Ibrahim ny mittfälduo", color: "border-neutral-600/50 bg-neutral-800/60 text-neutral-300" },
    ],
    opponentStyle: [
      "Häcken lever på inlägg: ~42% av box entries kommer via inlägg (ligans mest inläggsberoende lag, Twelve).",
      "Direkta anfall: ~30% av skotten via snabba, raka anfall – söker inte tålmodig uppbyggnad.",
      "Defensivt: Häcken sitter relativt djupt (DAH ~40m) med passivare press (PPDA ~6,0). Faller hellre tillbaka.",
      "Tappar bollen ofta: ~35 turnovers/match – Hammarbys omställningar ska straffa varje bolltapp.",
      "Häcken har bara ~10% recoveries within 5s – långsamma att reagera efter bolltapp (Twelve).",
      "Andersen (Sporting) och Hrstić (lån till Altach) borta – Hestnes (30, Norge) + Harun Ibrahim (lån, ex-GAIS) är inne.",
    ],
    styleProfile: [
      {
        label: "Inläggsberoende (Twelve)",
        value: "~42% box entries via inlägg",
        score: 85,
        explanation: "Häckens mest utpräglade drag. Alla anfall söker vägarna ut till kanterna för att slå in bollar i boxen.",
      },
      {
        label: "Offensiv effektivitet",
        value: "1,87 gjorda vs 1,65 xG – 14% över förväntan",
        score: 72,
        explanation: "Häcken gör fler mål än xG motiverar – effektiva framför mål. Begränsa deras chanser.",
      },
      {
        label: "Turnovers (Twelve)",
        value: "~35/match – bland de högsta i ligan",
        score: 25,
        explanation: "Häcken tappar bollen ofta. Hammarbys omställningsspel bör kunna exploatera detta.",
      },
      {
        label: "Press-intensitet (Twelve)",
        value: "PPDA ~6,0 – passivt i ligan",
        score: 30,
        explanation: "Häcken möter inte pressen högt. De faller tillbaka och försvarar med struktur snarare än intensitet.",
      },
      {
        label: "Field tilt (Twelve)",
        value: "~49–52% – nära snitt",
        score: 45,
        explanation: "Häcken dominerar inte sista tredjedelen. Balanserat mot motståndarna offensivt.",
      },
    ],
    spiderComparison: [
      {
        label: "xG / match",
        hammarbyValue: "2,19",
        opponentValue: "1,65",
        hammarbyScore: 100,
        opponentScore: 63,
        note: "Hammarby skapar 33% mer xG per match. Tydlig kvalitetsfördel i chanskreation.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "19,8",
        opponentValue: "14,9",
        hammarbyScore: 100,
        opponentScore: 60,
        note: "Hammarby skjuter 33% mer per match – stark volymfördel.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "61%",
        opponentValue: "52%",
        hammarbyScore: 100,
        opponentScore: 70,
        note: "Hammarby dominerar bollen. Häcken behöver inte bollen för att vara farliga.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "69%",
        opponentValue: "50%",
        hammarbyScore: 100,
        opponentScore: 43,
        note: "Hammarbys STÖRSTA fördel – dominerar sista tredjedelen totalt.",
      },
      {
        label: "PPDA (press)",
        hammarbyValue: "4,90",
        opponentValue: "6,00",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby pressar MYCKET hårdare. Häckens passiva press ger oss utrymme.",
      },
      {
        label: "Boxberöringar / match",
        hammarbyValue: "28,5",
        opponentValue: "20,1",
        hammarbyScore: 100,
        opponentScore: 58,
        note: "Hammarby penetrerar boxen 42% oftare – mer direkta chanser.",
      },
      {
        label: "HQ-skott / match",
        hammarbyValue: "4,80",
        opponentValue: "3,40",
        hammarbyScore: 90,
        opponentScore: 62,
        note: "Hammarby skapar fler farliga chanser per match.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "30,5",
        opponentValue: "35,0",
        hammarbyScore: 78,
        opponentScore: 52,
        note: "Häcken tappar bollen mer – Hammarbys omställningar ska straffa varje bolltapp.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,19",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,65",
        opponentRank: "~5:e av 16",
        note: "Hammarby skapar mest xG i ligan. Häcken genomsnittligt offensivt.",
      },
      {
        label: "PPDA",
        hammarbyValue: "4,90",
        hammarbyRank: "~1:a av 16",
        opponentValue: "6,00",
        opponentRank: "~10:e av 16",
        note: "Hammarby pressar intensivast. Häckens passivare press ger oss fritt uppspel.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "69%",
        hammarbyRank: "~1:a av 16",
        opponentValue: "50%",
        opponentRank: "~8:e av 16",
        note: "Hammarby dominerar sista tredjedelen totalt. Häcken nära snitt.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "19,8",
        hammarbyRank: "1:a av 16",
        opponentValue: "14,9",
        opponentRank: "~8:e av 16",
        note: "Hammarbys avslutsvolym bäst i ligan. Häcken under snittet.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "30,5",
        hammarbyRank: "~5:e av 16",
        opponentValue: "35,0",
        opponentRank: "~13:e av 16",
        note: "Häcken tappar bollen ofta. Hammarbys recoveries ska exploatera det.",
      },
      {
        label: "Konvertering (Goals/xG)",
        hammarbyValue: "~1,00",
        hammarbyRank: "~8:e av 16",
        opponentValue: "1,13",
        opponentRank: "~4:e av 16",
        note: "Häcken konverterar BÄTTRE än förväntat. Ge dem inga billiga chanser.",
      },
    ],
    goalWindows: [
      { window: "0–15'", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "16–30'", hammarbyGoals: 4, opponentConcededGoals: 3 },
      { window: "31–45+'", hammarbyGoals: 6, opponentConcededGoals: 3 },
      { window: "46–60'", hammarbyGoals: 5, opponentConcededGoals: 4 },
      { window: "61–75'", hammarbyGoals: 7, opponentConcededGoals: 3 },
      { window: "76–90+'", hammarbyGoals: 5, opponentConcededGoals: 3 },
    ],
    goalTypeNotes: [
      {
        label: "Häckens inläggsberoende",
        value: "~42% box entries via inlägg – störst i Allsvenskan",
        interpretation: "Stäng ytterbanorna och blockera inlägg = eliminera deras primära angreppssätt.",
      },
      {
        label: "Häcken överkonverterar",
        value: "1,87 gjorda mål vs 1,65 xG/match",
        interpretation: "Inte hållbart i längden. Begränsa deras chanser och låt regressionen jobba.",
      },
      {
        label: "Häcken tappar bollen mycket",
        value: "~35 turnovers/match, bara ~10% recovery within 5s",
        interpretation: "Hammarbys omställningsspel ska straffa varje bolltapp direkt.",
      },
    ],
    trafficLightCards: [
      {
        metric: "PPDA – Presskvalitet",
        bigNumber: "4,9",
        badge: "HAMMARBY",
        color: "green",
        rankNote: "1:a i Allsvenskan",
        explanation:
          "Hammarby pressar hårdast i hela ligan (PPDA 4,9 vs Häckens ~6,0). Det betyder att Häcken tvingas göra misstag tidigt.",
        podcastComment:
          "Det är nästan 50% hårdare press. Varje gång Häcken ska bygga upp bakifrån har vi redan en spelare på dem.",
      },
      {
        metric: "Inlägg per possession",
        bigNumber: "42%",
        badge: "HÄCKEN",
        color: "yellow",
        rankNote: "Mest inläggsberoende i ligan",
        explanation:
          "42% av alla Häckens boxintrång sker via inlägg. Blockera ytterbanorna så stryper vi deras anfallsspel.",
        podcastComment:
          "Deras hela anfallsspel bygger på inlägg. Stänger vi kanterna har de egentligen inget plan B att prata om.",
      },
      {
        metric: "Vändningens xG (förra mötet)",
        bigNumber: "2,82",
        badge: "HÄCKEN xG",
        color: "red",
        rankNote: "Häcken 2,82 – Hammarby 1,27 xG",
        explanation:
          "Statistiskt dominerade Häcken förra mötet trots 0–2-underläget i HT. Hammarby fick två mål men skapade bara 1,27 xG – på hemmaplan ser det ut att bli ett hårdare test.",
        podcastComment:
          "Det är viktig läxan härifrån: Häcken var faktiskt bättre. Nu är vi hemma – det ska avgöra.",
      },
    ],
    spotlightKey:
      "Hemmaplan och revansch. 3Arena mot ett Häcken i form-dip. Hammarby har vunnit 4 av de 5 senaste inbördes mötena – men aldrig på Bravida. Nu är rollerna ombytta.",
    hammarbyPlan: {
      withBall: [
        "Utnyttja field tilt-fördelen (69% vs 50%). Dominera sista tredjedelen och håll bollen där. Häcken saknar strukturen att pressa oss ut.",
        "Attackera CENTRALT. Häcken försvarar brett för att möta inlägg – de centrala ytorna bör vara öppna. Box entries via carries och kombinationsspel.",
        "Hammarbys boxberöringar (28,5/match) mot Häckens 20,1 – volymfördelen ska skapa HQ-skott. Sikta på 5+ höga chanser.",
        "Tålamod i uppspelet. Häcken faller tillbaka (DAH ~40m) – bygg upp lugnt och sök vertikala passningar genom mittfältet.",
      ],
      withoutBall: [
        "Press FULLT UT. PPDA 4,9 vs ~6,0 – vi pressar nästan 50% hårdare. Stör deras uppspel och forcera deras ~35 turnovers/match.",
        "BLOCKERA INLÄGGEN. Häckens ~42% box entries via inlägg är deras livsnerv. Halvbacks och ytterbackar måste stänga de yttre banorna.",
        "Exploatera Häckens bolltapp (~35/match, bara ~10% recovery within 5s). Press omedelbart efter varje bolltapp.",
        "Häcken är LÅNGSAMMA att re-organisera – efter bolltapp tar det länge för dem att strukturera sig. Kontra DIREKT.",
      ],
      matchManagement: [
        "Hammarby gör flest mål 61–75'. Behåll intensiteten sent – Häckens defensiv tröttnar.",
        "Häcken konverterar bra (~1,13x xG) – ge dem INGA billiga chanser. Kontrollera matchen.",
        "Vid ledning: Häckens passivitet (PPDA ~6,0) gör att de inte kan pressa effektivt för att vända.",
        "Lär av förra mötet: kom ut med full intensitet i 2H. Tappa inte ledningar.",
      ],
    },
    headToHead: {
      sampleSize: 5,
      description:
        "Senaste 5 inbördes möten Hammarby–Häcken i Allsvenskan, 2024–2026. HIF 3V–1O–1F.",
      summaryCards: [
        {
          title: "Senaste 5 möten",
          value: "3V–1O–1F (HIF)",
          note: "Hammarby har vunnit 3 av 5 och aldrig under Rydström.",
          tone: "emerald",
        },
        {
          title: "Förra mötet (maj 2026)",
          value: "3–2 till Häcken",
          note: "HT 0–2 → FT 3–2. Victor Lind gjorde bägge HIF-målen.",
          tone: "amber",
        },
        {
          title: "Senaste hemmasegern",
          value: "4–0 (sep 2025)",
          note: "Hammarbys historiskt tydligaste seger mot Häcken.",
          tone: "emerald",
        },
      ],
      trendBullets: [
        "Hammarby vann 4–0 hemma mot Häcken i september 2025.",
        "Häcken vann senast på bortaplan mot HIF (3–2, maj 2026) – revanschläge.",
        "H2H totalt (alla tävlingar): Häcken 12V–16O–10F mot Hammarby (40 matcher).",
        "Hammarby har aldrig vunnit på Bravida Arena – men nu är det hemmaplan.",
      ],
      matches: [
        {
          date: "2026-05-31",
          fixture: "BK Häcken - Hammarby",
          result: "3-2",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 2,
          opponentGoals: 3,
          hammarbyXg: 1.27,
          opponentXg: 2.82,
          hammarbyShots: 16,
          opponentShots: 20,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2026/2026-05-31/bk-hacken-hammarby-3-2",
        },
        {
          date: "2025-09-21",
          fixture: "Hammarby - BK Häcken",
          result: "4-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 4,
          opponentGoals: 0,
          hammarbyXg: 2.1,
          opponentXg: 0.6,
          hammarbyShots: 18,
          opponentShots: 8,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-09-21/hammarby-bk-hacken-4-0",
        },
        {
          date: "2025-04-27",
          fixture: "BK Häcken - Hammarby",
          result: "1-1",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 1,
          opponentGoals: 1,
          hammarbyXg: 1.1,
          opponentXg: 1.3,
          hammarbyShots: 13,
          opponentShots: 14,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-04-27/bk-hacken-hammarby-1-1",
        },
        {
          date: "2024-09-26",
          fixture: "Hammarby - BK Häcken",
          result: "2-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.5,
          opponentXg: 0.8,
          hammarbyShots: 16,
          opponentShots: 11,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-09-26/hammarby-bk-hacken-2-0",
        },
        {
          date: "2024-04-21",
          fixture: "BK Häcken - Hammarby",
          result: "2-1",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 2,
          hammarbyXg: 1.2,
          opponentXg: 1.8,
          hammarbyShots: 12,
          opponentShots: 15,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-04-21/bk-hacken-hammarby-2-1",
        },
      ],
    },
    playersToWatch: [
      {
        name: "Adrian Svanbäck",
        position: "Forward/Yttermitt · Sverige",
        scoutBadge: "🎯 Säsongens bäste",
        stats: [
          { label: "Mål", value: "4" },
          { label: "Assist", value: "4" },
          { label: "Matcher", value: "12" },
        ],
        threat:
          "Häckens bäste målskytt och mest produktive spelare 2026 (4M+4A på 12 matcher). Satte vinnarmålet 3–2 i förra mötet (80'). Farligast på genombrott och i djupled.",
        motivation:
          "Svanbäck är Häckens motor offensivt efter Andersens avfärd – 8 direkta målpoäng på 12 matcher. Han spelar som ytterforward i 4-2-3-1 och drar mot kanten innan han drar inåt mot mål. HIF:s backfyra måste hålla koll på hans djupledslöpningar och skära av hans snitt inåt från höger.",
      },
      {
        name: "Amor Layouni",
        position: "AM/Mittfält · Tunisien",
        scoutBadge: "🔑 Kreativ motor",
        stats: [
          { label: "Mål", value: "1" },
          { label: "Assist", value: "6" },
          { label: "Matcher", value: "9" },
        ],
        threat:
          "Häckens ledande assisterare (6A på 9 matcher). Satte reduceringsstraffet 1–2 i förra mötet (48'). Styr Häckens anfallsspel med passningar och löpningar.",
        motivation:
          "Layouni är Häckens mest kreative spelare med 6 assists på bara 9 matcher. Han hanterar fasta situationer och hittar alltid nyckelpassen till Svanbäck och Lindgren. HIF:s mittfält måste täcka honom tätt – hindra honom från att vända och spela framåt i halvzonen.",
      },
      {
        name: "Harun Ibrahim",
        position: "AM/Mittfält · Sverige (ex-GAIS)",
        scoutBadge: "🆕 Lån från Sharjah",
        stats: [
          { label: "Nat.", value: "Sverige" },
          { label: "Ålder", value: "23" },
          { label: "Debut", value: "Omg 15" },
        ],
        threat:
          "Ny lånespelare (ex-GAIS, 88 matcher). Debuterade från start mot Kalmar. Snabb och teknisk – kan orsaka problem i övergångsspelet.",
        motivation:
          "Harun Ibrahim (23) kom på lån från Sharjah FC och spelade sin första match från start i Omg 15 mot Kalmar. Tidigare GAIS-profil med 88 allsvenska matcher – känd i Sverige men ny i Häcken-systemet. HIF:s spelare känner honom sedan GAIS-åren. Smart och teknisk – stäng honom av i halvrummet och låt honom inte vända med boll.",
      },
    ],
    glossary: [
      {
        term: "Field tilt",
        explanation:
          "Andel av possessionerna i sista tredjedelen. Hammarbys 69% vs Häckens 50% visar hur mycket vi dominerar i anfallarean.",
      },
      {
        term: "PPDA (Passes Per Defensive Action)",
        explanation:
          "Hur många pass motståndaren tillåts spela innan vi gör en defensiv aktion. HIF:s 4,90 = extremt aggressiv press.",
      },
      {
        term: "Box entries from crosses",
        explanation:
          "Andel av box-penetrationerna som sker via inlägg. Häckens ~42% visar deras extrema beroende av kantspel.",
      },
      {
        term: "Turnovers",
        explanation:
          "Bollförluster per match. Häckens ~35 gör dem exponerade för omställningar – Hammarbys styrka.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder. Häckens ~10% innebär att de är långsamma att reagera efter bolltapp.",
      },
    ],
  },
  {
    round: 8,
    roundLabel: "Omgång 8",
    hidden: true,
    fixture: "Hammarby - Malmö FF",
    dateLabel: "Inför 17 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season report",
    oneLineSummary:
      "Kort version: Hammarby leder många offensiva lagdata-mått i serien, medan Twelve pekar på Malmö FF:s låga försvarshöjd och svaga defensiva transitionspel som tydliga angreppspunkter.",
    mobileTakeaways: [
      "Hammarby är 2:a i tabellen (14p), Malmö FF 7:a (10p) efter 7 omgångar.",
      "Hammarby är 1:a i avslut/match och bollinnehav, samt 2:a i skott på mål/match.",
      "Malmö FF har 12 gjorda och 11 insläppta mål hittills (målskillnad +1).",
      "Hammarby producerar högre xG per match (2,09) än Malmö FF (1,45).",
      "Twelve: Malmö försvarar djupt (defensive action height 39,2 m) och återerövrar sällan inom 5 sekunder (9%).",
      "Malmö FF släpper in flest mål i tidig och sen matchfas (0-15 och 46-60).",
      "Nyckel till matchen: tryck i högt tempo och tvinga Malmö att försvara längre sekvenser utan boll.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 14 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Bolldata API: senaste 10 inbördes möten Hammarby-Malmö (matches + matches/team/stats), hämtad 14 maj 2026",
      "Twelve season report: https://reports.twelve.football/reports/malm%C3%B6-ff-season-report-BnBVWBA525.pdf (14 maj 2026)",
    ],
    headToHead: {
      sampleSize: 10,
      description:
        "Senaste 10 inbördes Allsvenska möten mellan Hammarby och Malmö FF, med resultat + underliggande matchdata.",
      summaryCards: [
        {
          title: "Resultatrad (senaste 10)",
          value: "3V-3O-4F",
          note: "Malmö leder målskillnaden 16-14 över perioden, men Hammarby har vunnit 2 av de 3 senaste.",
          tone: "amber",
        },
        {
          title: "Målprofil",
          value: "3,0 mål/match",
          note: "6 av 10 matcher gick över 2,5 mål. Båda lagen gjorde mål i 6 av 10.",
          tone: "blue",
        },
        {
          title: "Underliggande trend",
          value: "xG 0,98-1,66",
          note: "Malmö har högre snitt-xG och fler avslut i perioden (14,1 mot 10,3).",
          tone: "amber",
        },
      ],
      trendBullets: [
        "Hammarby har tagit 7 av de 9 senaste poängen mot Malmö (2 segrar, 1 oavgjord).",
        "Malmö har högre xG än Hammarby i 7 av de senaste 10 inbördes mötena.",
        "Hammarby har hållit nollan i 3 av de senaste 10 mötena.",
      ],
      matches: [
        {
          date: "2025-10-27",
          fixture: "Malmö FF - Hammarby",
          result: "1-3",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 1,
          hammarbyXg: 1.17,
          opponentXg: 1.6,
          hammarbyShots: 14,
          opponentShots: 13,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-10-27/malmo-ff-hammarby-1-3",
        },
        {
          date: "2025-04-23",
          fixture: "Hammarby - Malmö FF",
          result: "2-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 0.93,
          opponentXg: 0.65,
          hammarbyShots: 12,
          opponentShots: 9,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025/2025-04-23/hammarby-malmo-ff-2-0",
        },
        {
          date: "2024-11-02",
          fixture: "Hammarby - Malmö FF",
          result: "2-2",
          venue: "home",
          outcome: "draw",
          hammarbyGoals: 2,
          opponentGoals: 2,
          hammarbyXg: 2,
          opponentXg: 0.74,
          hammarbyShots: 13,
          opponentShots: 10,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-11-02/hammarby-malmo-ff-2-2",
        },
        {
          date: "2024-04-07",
          fixture: "Malmö FF - Hammarby",
          result: "2-0",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 0.35,
          opponentXg: 2.52,
          hammarbyShots: 6,
          opponentShots: 23,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024/2024-04-07/malmo-ff-hammarby-2-0",
        },
        {
          date: "2023-09-17",
          fixture: "Hammarby - Malmö FF",
          result: "1-3",
          venue: "home",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 3,
          hammarbyXg: 1.02,
          opponentXg: 1.48,
          hammarbyShots: 13,
          opponentShots: 9,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2023/2023-09-17/hammarby-malmo-ff-1-3",
        },
        {
          date: "2023-04-30",
          fixture: "Malmö FF - Hammarby",
          result: "4-2",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 2,
          opponentGoals: 4,
          hammarbyXg: 1.02,
          opponentXg: 2.2,
          hammarbyShots: 13,
          opponentShots: 16,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2023/2023-04-30/malmo-ff-hammarby-4-2",
        },
        {
          date: "2022-10-01",
          fixture: "Malmö FF - Hammarby",
          result: "0-0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.47,
          opponentXg: 0.9,
          hammarbyShots: 8,
          opponentShots: 10,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2022/2022-10-01/malmo-ff-hammarby-0-0",
        },
        {
          date: "2022-05-02",
          fixture: "Hammarby - Malmö FF",
          result: "0-0",
          venue: "home",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.34,
          opponentXg: 0.46,
          hammarbyShots: 8,
          opponentShots: 4,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2022/2022-05-02/hammarby-malmo-ff-0-0",
        },
        {
          date: "2021-08-29",
          fixture: "Hammarby - Malmö FF",
          result: "2-1",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 1,
          hammarbyXg: 1.74,
          opponentXg: 2.88,
          hammarbyShots: 11,
          opponentShots: 27,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2021/2021-08-29/hammarby-malmo-ff-2-1",
        },
        {
          date: "2021-04-10",
          fixture: "Malmö FF - Hammarby",
          result: "3-2",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 2,
          opponentGoals: 3,
          hammarbyXg: 0.8,
          opponentXg: 3.17,
          hammarbyShots: 5,
          opponentShots: 20,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2021/2021-04-10/malmo-ff-hammarby-3-2",
        },
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i tabellen (14p), 17-5 i mål. Starkast i serien i avslut per match och bollinnehav.",
        tone: "emerald",
      },
      {
        title: "Malmö FF just nu",
        body: "7:a i tabellen (10p), 12-11 i mål. Twelve visar låg försvarshöjd och svag defensiv transition.",
        tone: "amber",
      },
      {
        title: "Viktig period",
        body: "Malmö FF har släppt in 3 mål i minut 0-15 och 3 mål i 46-60.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve beskriver Malmö som ett lag med låg blockhöjd och passivare försvarsarbete i stora delar av matcherna.",
      "I anfall växlar Malmö mellan längre bollar och bollbärande inträden i box snarare än tydlig inläggsprofil.",
      "Defensiva transitionsiffror i Twelve (bland annat recoveries within 5s på 9%) pekar på sårbarhet direkt efter bolltapp.",
      "Malmö kan ändå skapa volym i etablerat spel, men lagets totala prestationskurva är mer ojämn än Hammarbys.",
    ],
    styleProfile: [
      {
        label: "Försvarshöjd (Twelve)",
        value: "39,2 m defensive action height",
        score: 30,
        explanation: "Låg blockhöjd enligt Twelve och mer försvar nära eget mål än toppkonkurrenterna.",
      },
      {
        label: "Defensiv transition (Twelve)",
        value: "Recoveries within 5s: 9%",
        score: 25,
        explanation: "Återerövrar sällan snabbt efter bolltapp, vilket öppnar fönster för motståndaren.",
      },
      {
        label: "Direkthetsprofil (Twelve)",
        value: "Long ball 15% · field tilt 49%",
        score: 54,
        explanation: "Malmö spelar relativt direkt men utan att dominera territoriet lika tydligt.",
      },
      {
        label: "Offensiv output (Bolldata)",
        value: "xG 1,45 · 14,00 avslut/match",
        score: 66,
        explanation: "Malmö har en fungerande offensiv men ligger klart under Hammarbys volym och chansnivå.",
      },
      {
        label: "Motståndarhot (Twelve)",
        value: "Opp. np xG 1,62",
        score: 32,
        explanation: "Twelve markerar att Malmö släpper till för många kvalitativa chanser mot eget mål.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        opponentValue: "22,00",
        hammarbyScore: 100,
        opponentScore: 80,
        note: "Hammarby har högst offensiv totalvolym i serien; Malmö ligger i övre mittfält.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "17",
        opponentValue: "12",
        hammarbyScore: 89,
        opponentScore: 63,
        note: "Hammarby är tvåa i totalt gjorda mål, Malmö sexa efter sju omgångar.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        opponentValue: "1,45",
        hammarbyScore: 96,
        opponentScore: 66,
        note: "Hammarby skapar klart fler och bättre chanser per match än Malmö.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        opponentValue: "14,00",
        hammarbyScore: 100,
        opponentScore: 68,
        note: "Hammarby är etta i serien i avslut per match.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        opponentValue: "4,86",
        hammarbyScore: 95,
        opponentScore: 77,
        note: "Hammarby träffar mål oftare per match, Malmö ligger runt ligans övre mittskikt.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "69,43",
        opponentValue: "83,57",
        hammarbyScore: 69,
        opponentScore: 83,
        note: "Malmö gör fler defensiva aktioner per match, kopplat till mer tid utan boll.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "105,86",
        opponentValue: "97,71",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Hammarby är starkast i duellspelet, Malmö ligger också på en bra nivå.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "97,71",
        opponentValue: "71,86",
        hammarbyScore: 99,
        opponentScore: 73,
        note: "Hammarby vinner tillbaka bollen klart oftare per match.",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "42,9%",
        opponentValue: "28,6%",
        hammarbyScore: 100,
        opponentScore: 67,
        note: "Hammarby har fler hållna nollor hittills (3 mot Malmös 2).",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "62,3%",
        opponentValue: "50,3%",
        hammarbyScore: 100,
        opponentScore: 81,
        note: "Hammarby styr tempot via bollinnehav tydligare än Malmö.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "184,29",
        opponentValue: "139,71",
        hammarbyScore: 100,
        opponentScore: 76,
        note: "Hammarby har högst framåtriktad passningsvolym i serien.",
      },
    ],
    rankedMetrics: [
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "17",
        hammarbyRank: "2:a av 16",
        opponentValue: "12",
        opponentRank: "6:a av 16",
        note: "Hammarby ligger tydligt före Malmö i total målproduktion hittills.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,09",
        hammarbyRank: "3:a av 16",
        opponentValue: "1,45",
        opponentRank: "8:a av 16",
        note: "Hammarby skapar klart högre förväntad målproduktion.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,00",
        hammarbyRank: "2:a av 16",
        opponentValue: "4,86",
        opponentRank: "8:a av 16",
        note: "Hammarby hotar mål oftare per match än Malmö.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,57",
        hammarbyRank: "1:a av 16",
        opponentValue: "14,00",
        opponentRank: "3:a av 16",
        note: "Hammarby har tydlig volymfördel i avslut.",
      },
      {
        label: "Bollinnehav / match",
        hammarbyValue: "62,3%",
        hammarbyRank: "1:a av 16",
        opponentValue: "50,3%",
        opponentRank: "7:a av 16",
        note: "Hammarby sätter tempot med boll oftare och längre än Malmö.",
      },
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "27,43",
        hammarbyRank: "1:a av 16",
        opponentValue: "22,00",
        opponentRank: "6:a av 16",
        note: "Hammarby driver störst offensiv aktivitet i ligan; Malmö ligger i övre halvan.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 1, opponentConcededGoals: 3 },
      { window: "16-30", hammarbyGoals: 2, opponentConcededGoals: 1 },
      { window: "31-45+", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "46-60", hammarbyGoals: 4, opponentConcededGoals: 3 },
      { window: "61-75", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 1 },
    ],
    goalTypeNotes: [
      {
        label: "Hur Malmö släpper in mål",
        value: "10 av 11 i boxen",
        interpretation: "Merparten av insläppta mål kommer i och runt boxen, där Malmö blir straffade.",
      },
      {
        label: "Fasta/inkast bakåt (Malmö)",
        value: "5 av 11 mål",
        interpretation: "Malmö har släppt in flera mål i situationer som följer på fasta eller inkast.",
      },
      {
        label: "Nickmål bakåt (Malmö)",
        value: "0 mål",
        interpretation: "Luftduellen vid avslut har inte varit huvudproblemet; snarare timing och ytkontroll i box.",
      },
      {
        label: "Malmös mål framåt",
        value: "12 mål totalt (1,71/match)",
        interpretation: "Offensiven håller bra nivå, men med större svängningar mellan matcher än Hammarbys.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Håll hög passningsfrekvens för att dra isär Malmö och skapa centrala avslutslägen.",
        "Attackera boxen med fler andra-vågs-löpningar - Malmö släpper in majoriteten av sina mål där.",
        "Använd växelspel mellan halvrum och ytterzon för att få Malmö att försvara i längre sekvenser.",
      ],
      withoutBall: [
        "Skydda ytan bakom mittfältet direkt efter bolltapp för att minska Malmös omställningshot.",
        "Sätt tidig press på första passningen ur Malmö backlinje för att bryta deras framåtriktade progression.",
        "Lås centrala ytor i egen tredjedel och tvinga Malmö till avslut från sämre lägen.",
      ],
      matchManagement: [
        "Tryck i både inledning (0-15) och direkt efter paus (46-60), där Malmö släppt in flest mål.",
        "Behåll tålamod vid oavgjort - Hammarbys volymspel ger ofta utdelning över 90 minuter.",
        "Vid ledning: säkra mitten och andrabollen före offensiv risk för att kontrollera matchen.",
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
        term: "Lagdata",
        explanation:
          "Säsongsbaserade lagmått från Bolldata (volym, effektivitet och ranking) som används för jämförelser i den här sidan.",
      },
    ],
  },
  {
    round: 15,
    roundLabel: "Omgång 15 (flyttad)",
    hidden: true,
    fixture: "GAIS - Hammarby",
    dateLabel: "Inför 22 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season insight",
    oneLineSummary:
      "Kort version: GAIS är det mest undervärderade laget i tabellen – 3:a i xP-tabellen (14 xP) men bara 9:a i poäng (9p). Högt press, direkt spel och extremt låg xGA (0,86/match) gör dem till en farligare motståndare än tabellen visar.",
    mobileTakeaways: [
      "Hammarby 2:a (17p), GAIS 9:a (9p) – men GAIS 3:a i xP-tabellen (14 xP).",
      "GAIS är obesegrade i senaste 5 matcherna (2V-3O).",
      "GAIS har ligans 4:e bästa xGA (6,87 totalt, 0,86/match) – svåra att göra mål på.",
      "GAIS spelar högt press och direkt med flest långa bollar/genomskärare i ligan (55,75/match).",
      "Twelve: GAIS counterpressar aggressivt och slår snabbt via omställningar.",
      "GAIS gör 4 av 10 mål i perioden 46-60 – farligast direkt efter paus.",
      "Nyckel: kontrollera bollinnehavet, undvik att spela rakt in i deras omställningsspel och dominera tempot.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 18 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Twelve season insight: https://reports.twelve.football/insights/how-did-gais-perform-this-season-wQ59nfcYST.pdf (18 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (17p), 21-6 i mål. 3V-2O senaste 5. Ligans starkaste offensiv (18,24 xG) och bästa hemmalag (13p, +16).",
        tone: "emerald",
      },
      {
        title: "GAIS just nu",
        body: "9:a (9p) men 3:a i xP (14!). 2V-3O senaste 5 (obesegrade). Ligans 4:e bästa defensiv per xGA.",
        tone: "amber",
      },
      {
        title: "Varning: xP-gap",
        body: "GAIS har +5 mer xP än faktiska poäng. De förtjänar fler poäng – deras prestationer har varit starka.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve beskriver GAIS som ett högt pressande lag med intensiv press – tvingar motståndare till få passningar per defensiv aktion.",
      "I anfall lutar GAIS kraftigt mot långa bollar och direktspel – 2:a i ligan i långa passningar/genomskärare (55,75/match).",
      "GAIS counterpressar aggressivt och söker omställningar direkt efter bollvinst – effektiva i transition.",
      "Penetrationen är balanserad mellan carries och inlägg – varken extremt bred eller extremt central.",
      "Defensivt har GAIS ligans 4:e lägsta xGA (0,86/match) vilket visar genuin defensiv kvalitet.",
    ],
    styleProfile: [
      {
        label: "Presshöjd (Twelve)",
        value: "Högt press med intensiv pressing",
        score: 82,
        explanation: "GAIS pressar högt och aggressivt – liknar Hammarbys egen spelstil i detta avseende.",
      },
      {
        label: "Direkthet (Bolldata)",
        value: "55,75 långa bollar+genomskärare/match (2:a i ligan)",
        score: 88,
        explanation: "GAIS spelar extremt direkt med flest långa bollar i ligan efter IFK Göteborg.",
      },
      {
        label: "Omställningshot (Twelve)",
        value: "Counter attack-profil i offensiv transition",
        score: 78,
        explanation: "Twelve pekar på en tydlig kontrings-/omställningsprofil – snabba vertikala attacker efter bollvinst.",
      },
      {
        label: "Defensiv kvalitet (Bolldata)",
        value: "xGA 0,86/match (4:e bäst i ligan)",
        score: 75,
        explanation: "Trots låg tabelplacering håller GAIS en genuin defensiv kvalitet per underliggande data.",
      },
      {
        label: "Offensiv output (Bolldata)",
        value: "xG 1,64/match · 13,75 avslut/match",
        score: 58,
        explanation: "Medelmåttig offensiv volym men skapar bra chanser per skott. Konverterar bara 8,2% av sina skott.",
      },
    ],
    spiderComparison: [
      {
        label: "Avslut / match",
        hammarbyValue: "21,50",
        opponentValue: "13,75",
        hammarbyScore: 100,
        opponentScore: 64,
        note: "Hammarby skjuter avsevärt mer – GAIS förlitar sig på färre men mer kvalitativa chanser.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,28",
        opponentValue: "1,64",
        hammarbyScore: 95,
        opponentScore: 72,
        note: "Hammarby skapar fortfarande klart fler förväntade mål per match.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "7,00",
        opponentValue: "5,13",
        hammarbyScore: 100,
        opponentScore: 73,
        note: "Hammarby når mål oftare, GAIS ligger i övre halvan.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "61,1%",
        opponentValue: "51,8%",
        hammarbyScore: 100,
        opponentScore: 85,
        note: "Hammarby dominerar bollen, GAIS ligger runt ligasnittet.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,38",
        opponentValue: "4,38",
        hammarbyScore: 100,
        opponentScore: 81,
        note: "Hammarby etta, GAIS trea – båda lagen skapar mycket via passningsspel.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,75",
        opponentValue: "79,75",
        hammarbyScore: 95,
        opponentScore: 97,
        note: "GAIS faktiskt 2:a i ligan i progressiva passningar – driver bollen framåt ofta.",
      },
      {
        label: "Långa bollar + genomskärare / match",
        hammarbyValue: "42,00",
        opponentValue: "55,75",
        hammarbyScore: 53,
        opponentScore: 100,
        note: "GAIS spelar avsevärt fler långa bollar. En tydlig stilskillnad.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,13",
        opponentValue: "0,86",
        hammarbyScore: 80,
        opponentScore: 100,
        note: "GAIS släpper till LÄGRE xG emot per match – starkare defensiv underliggande data.",
      },
      {
        label: "Framåtpassningar (%))",
        hammarbyValue: "76,9%",
        opponentValue: "70,3%",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "Hammarby har högre precision i framåtpassningar.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "21",
        opponentValue: "10",
        hammarbyScore: 100,
        opponentScore: 48,
        note: "Hammarby gör mer än dubbelt så många mål – GAIS konverterar svagt (8,2%).",
      },
      {
        label: "Konverteringsgrad (%)",
        hammarbyValue: "11,6%",
        opponentValue: "8,2%",
        hammarbyScore: 82,
        opponentScore: 58,
        note: "GAIS tar inte tillvara på sina chanser – har vunnit mer xP än poäng.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,28",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,64",
        opponentRank: "4:a av 16",
        note: "Hammarby skapar mest xG per match, GAIS ligger överraskande högt.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,13",
        hammarbyRank: "4:a av 16",
        opponentValue: "0,86",
        opponentRank: "2:a av 16",
        note: "GAIS är bättre defensivt per xGA – en potentiell utmaning.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "21,50",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,75",
        opponentRank: "6:a av 16",
        note: "Hammarbys volymfördel är markant. GAIS skjuter mer sällan.",
      },
      {
        label: "Bollinnehav",
        hammarbyValue: "61,1%",
        hammarbyRank: "1:a av 16",
        opponentValue: "51,8%",
        opponentRank: "6:a av 16",
        note: "Hammarby dominerar bollinnehavet som vanligt.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,75",
        hammarbyRank: "3:a av 16",
        opponentValue: "79,75",
        opponentRank: "2:a av 16",
        note: "GAIS ligger faktiskt före Hammarby i progressiva passningar.",
      },
      {
        label: "xP-tabell",
        hammarbyValue: "16 xP",
        hammarbyRank: "2:a av 16",
        opponentValue: "14 xP",
        opponentRank: "3:a av 16",
        note: "GAIS 3:a i xP-tabellen – har presterat på en nivå som förtjänar 14 poäng.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 2, opponentConcededGoals: 0 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Hur GAIS släpper in mål",
        value: "7 av 9 inifrån boxen",
        interpretation: "Majoriteten av insläppta mål kommer från positioner inne i straffområdet.",
      },
      {
        label: "GAIS insläppta (period)",
        value: "4 av 9 i andra halvlek",
        interpretation: "Relativt jämnt fördelat men GAIS släpper in 2 i 16-30 och 2 i 31-45+.",
      },
      {
        label: "GAIS svaga konvertering",
        value: "8,2% konverteringsgrad",
        interpretation: "GAIS skapar chanser (xG 1,64) men konverterar sämst bland topp-xG-lagen. Frustration kan uppstå.",
      },
      {
        label: "GAIS mål framåt – starkt i 2H",
        value: "8 av 10 mål i andra halvlek",
        interpretation: "GAIS gör 4 mål i 46-60 och totalt 8 av 10 i 2H. De starkaste efter paus.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Använd bollinnehavet (61%) för att trötta ut GAIS höga press – cirkulera tålmodigt och lura fram öppningar.",
        "Attackera centralt – GAIS släpper in 7 av 9 mål inifrån boxen. Använd halvrumslöpningar.",
        "Utnyttja passningstempot (86% träffsäkerhet) för att spela sig förbi GAIS press innan de hinner ställa om.",
      ],
      withoutBall: [
        "Blockera GAIS långa bollar (55,75/match) – stå högt men med djup bakom mittfältet för att fånga andrabollen.",
        "GAIS omställningsspel är deras främsta hot – undvik onödiga bolltapp i anfallshalvan.",
        "Pressa GAIS uppspel direkt – de vill slå lång snabbt efter bollvinst. Stör den första passningen.",
      ],
      matchManagement: [
        "Håll nollan i 2H: GAIS gör 8 av 10 mål i andra halvlek (4 st i 46-60). Extra fokus efter paus.",
        "Vid oavgjort vid paus: tryck direkt 46-60 när GAIS historiskt slår till. Vinn tempokampen.",
        "GAIS konverterar dåligt (8,2%) – vid ledning: tvinga dem att skjuta från sämre lägen och lita på målvakten.",
      ],
    },
    squadRecommendation: {
      formation: "4-2-3-1",
      formationReasoning:
        "Hammarbys spelstil kräver högt bollinnehav (61%), intensiv press (PPDA 3,94) och volym i avslut (21,5/match). 4-2-3-1 bibehåller vår identitet – kontroll via mittfältet, bredd via backarna, kreativitet centralt – samtidigt som dubbelankaret skyddar mot GAIS direkta omställningar.",
      positions: [
        {
          position: "Målvakt",
          formation: "MV",
          requiredQualities: [
            "Hammarbys spel: Starkt fotarbete för att starta uppspel och aktivera backlinjen i vår possessionsbaserade modell",
            "Hammarbys spel: Snabb distribution – vi vill bygga direkt efter räddning, inte slå lång",
            "Mot GAIS: Dominant i luften – GAIS slår 55+ långa bollar/match rakt in i boxen",
            "Mot GAIS: Positionering vid snabba omställningar (de söker djupled direkt efter bollvinst)",
          ],
          reasoning:
            "Målvakten är första länken i vårt uppbyggnadsspel. Mot GAIS behöver hen dessutom hantera luftbombning och snabba kontringar – men uppspelet får aldrig kompromissas.",
        },
        {
          position: "Högerback",
          formation: "HB",
          requiredQualities: [
            "Hammarbys spel: Offensiv bredd – ge bredd i anfallsfasen, överlappa och skapa 2v1 på kanten",
            "Hammarbys spel: Passningstrygghet (85%+) – stödja bollcirkulation under press",
            "Hammarbys spel: Löpkapacitet 10+ km – vår höga press kräver fysisk uthållighet",
            "Mot GAIS: Defensiv disciplin vid omställningar – inte hamna i obalans efter egna framstötar",
          ],
          reasoning:
            "I Hammarbys system är backarna offensiva nycklar som ger bredd. Mot GAIS kontringar gäller det att inte bli fångad för högt – men vi ska INTE offra offensiv bredd av rädsla.",
        },
        {
          position: "Mittbackar (2)",
          formation: "MB + MB",
          requiredQualities: [
            "Hammarbys spel: Bollspelande centralbeck – starta anfall bakifrån med progressiva passningar",
            "Hammarbys spel: Mod att driva bollen framåt när GAIS pressar (spela sig ur press)",
            "Hammarbys spel: Hög startposition – stödja vår höga press utan att tappa djup",
            "Mot GAIS: Dominant i luftdueller – vinna förstaduellen vid GAIS 55+ långa bollar/match",
            "Mot GAIS: Snabb omställning bakåt vid kontringar (GAIS söker djupled direkt)",
            "Ena CB: framåtpassare och linjebrytare. Andra CB: positionell säkring.",
          ],
          reasoning:
            "Hammarbys CB:ar är uppbyggnadens startpunkt – det är viktigare än någonsin att de vågar spela framåt under GAIS press. MEN de måste samtidigt vinna luftduellerna som kommer varje gång GAIS får bollen.",
        },
        {
          position: "Vänsterback",
          formation: "VB",
          requiredQualities: [
            "Hammarbys spel: Offensiv push – bredd i vänsterhalvrum och inlägg vid etablerat anfall",
            "Hammarbys spel: Bollsäkerhet – bidra i uppbyggnaden och cirkulationen",
            "Hammarbys spel: Löpkapacitet – understödja pressen och täcka stor yta",
            "Mot GAIS: Defensiv pålitlighet – GAIS högeryta kan exploateras vid omställningar",
            "Mot GAIS: Timing i framstötar – undvik att bli fångad i obalans vid deras kontringar",
          ],
          reasoning:
            "Samma princip som högerbacken: vår modell kräver offensiv bredd via backarna. Balansen mot GAIS kontringshot avgörs av timing och löpkapacitet, inte av att sitta kvar.",
        },
        {
          position: "Centralt mittfält (dubbelankare)",
          formation: "CDM + CDM",
          requiredQualities: [
            "Hammarbys spel: Counterpress – omedelbar press vid bolltapp (vi återerövrar inom 5s, 14% av gångerna)",
            "Mot GAIS: Andrabollsvinst – GAIS 55+ långa bollar landar här. Vinner vi andrabollen vinner vi matchen.",
            "Mot GAIS: Täcka djupled – hindra GAIS centrala löpare vid omställningar",
            "PASSNINGSROLL 1 (motorn): Hög volym (60+ passningar/match), kort-kort-kort för att sätta tempot. Styr cirkulationen, flyttar bollen sidledes snabbt och bestämmer rytmen. Hög precision (88%+) – FÅR INTE tappa enkla bollar mot GAIS counterpress.",
            "PASSNINGSROLL 1 (motorn): Progressiva passningar – driva bollen framåt vertikalt genom mittfältet med linjebrytande passnignar när ytan öppnas.",
            "PASSNINGSROLL 2 (ankaret): Positionell disciplin – säkra mittfältet och vara det trygga utspelsalternativet vid press. Enklare passningsval men felfri.",
            "PASSNINGSROLL 2 (ankaret): Recoveries och duellvinster – förstöra GAIS omställningar och vinna andrabollen. Passningen EFTER bollvinsten: snabb, säker, framåtriktad.",
            "Komplementärt par: motorn dikterar tempot med boll, ankaret skyddar utan boll. Tillsammans skapar de 86%+ passprecision och 77+ progressiva passningar/match.",
          ],
          reasoning:
            "Dubbelankaret ÄR Hammarbys spelstil. Det är härifrån vi kontrollerar matchen med 61% bollinnehav. Passningstypen avgör: motorn ska vara den som aldrig tappar bollen och styr tempot (tänk metronompassare), ankaret ska vara den som vinner duellen och sedan spelar den enkla framåtpassningen som startar anfallet. Mot GAIS är andrabollsvinsterna lika viktiga som passningarna.",
        },
        {
          position: "Offensiv mittfältare (tia)",
          formation: "AM",
          requiredQualities: [
            "Hammarbys spel: Kreativitet och nyckelpassningar (5+/match) – hjärtat i vår chansskapning",
            "Hammarbys spel: xA-produktion – den sista passningen som öppnar låst försvar",
            "Hammarbys spel: Tempo-accelerator – styra NÄR vi ökar rytmen i anfallet",
            "PASSNINGSTYP: Linjebrytare – passningar MELLAN motståndarens linjer, inte runt dem. Måste kunna hitta fickor mellan GAIS mittfält och backlinje.",
            "PASSNINGSTYP: Sista passningen in i box – passningar till straffområdet med precision och timing. xA-kvalitet i varje passningsval.",
            "PRESSROLL: Första triggern i mittfältspressen – positionerar sig mellan GAIS mittfält och backlinje för att skugga deras centrala uppspelsspelare.",
            "PRESSROLL: Stänger centrala passningsvägar – tvingar GAIS att slå lång (det vill vi, för våra CB:ar vinner luftduellerna).",
            "PRESSROLL: Vid bolltapp i anfallszon – OMEDELBAR counterpress. Tian ska vara först på bollen inom 2-3 sekunder, antingen vinna den eller fördröja GAIS omställning.",
            "Mot GAIS: Hitta mellanrum i kompakt försvar (GAIS xGA 0,86 – svårt att bryta igenom)",
          ],
          reasoning:
            "Tian har en dubbelroll: MED BOLL är hen matchvinnaren som levererar nyckelpassningar mellan linjerna (5,38/match, 1:a i ligan). UTAN BOLL är hen presstriggern som stänger GAIS centrala framspelsmöjligheter och tvingar dem att slå lång – direkt in i våra luftdominerande CB:ar. Mot GAIS kompakta block (xGA 0,86) krävs en spelare som ser passningar ingen annan ser OCH jobbar lika hårt utan boll.",
        },
        {
          position: "Högerytter / halvrum",
          formation: "RW",
          requiredQualities: [
            "Hammarbys spel: Dribbling och 1v1-kapacitet – bryta motståndarens struktur",
            "Hammarbys spel: Avslut och xG-bidrag – vi skjuter 21,5 gånger/match, kanter ska bidra",
            "Hammarbys spel: Pressarbete högt upp – första pressmomentet börjar med yttrarna",
            "Mot GAIS: Löpningar i djupled – exploatera ytan bakom GAIS höga försvarslinje",
            "Mot GAIS: Ta sig IN i boxen (7 av 9 GAIS-insläppta mål = inifrån straffområdet)",
          ],
          reasoning:
            "Hammarbys yttersspel handlar om att penetrera boxen – inte bara slå inlägg. Mot GAIS höga linje skapas extra utrymme bakom för djupledslöpningar. Kombinera det med vår 1v1-dribbling och avslutsvolym.",
        },
        {
          position: "Vänsterytter / halvrum",
          formation: "LW",
          requiredQualities: [
            "Hammarbys spel: Tempo och carries – driva bollen framåt och skapa tempoväxlingar",
            "Hammarbys spel: Bidra i uppbyggnaden – passningskvalitet för att delta i bollcirkulation",
            "Hammarbys spel: Press bakåt – del av första pressfasen, stänga ner motståndarens uppspel",
            "Mot GAIS: Exploatera ytan bakom deras höga press via snabba carries",
            "Mot GAIS: Skottförmåga från halvrum – GAIS släpper in mål centralt",
          ],
          reasoning:
            "GAIS pressar högt – det skapar ytor bakom som passar Hammarbys tempoväxlingar perfekt. Vänsteryttern ska kunna både delta i vår kontrollerade uppbyggnad OCH explodera i omställningar bakom GAIS linje.",
        },
        {
          position: "Anfallare (ensam spets)",
          formation: "ST",
          requiredQualities: [
            "Hammarbys spel: Hold-up och samband – binda mittbackar och skapa yta för framrusande mittfältare/ytter",
            "Hammarbys spel: Intelligent rörelse i boxen – vi skapar 27+ boxberöringar/match, spetsen ska vara mottagare",
            "Hammarbys spel: Pressarbete – anfallaren leder pressmomentet högt upp",
            "Hammarbys spel: Konverteringsförmåga – vi skapar 2,28 xG/match, spetsen ska leverera mål",
            "Mot GAIS: Löpningar i djupled – utnyttja ytan bakom GAIS höga presslinje",
            "Mot GAIS: Klinisk avslutning – GAIS xGA 0,86 innebär att vi får färre premium-lägen än vanligt",
          ],
          reasoning:
            "I Hammarbys system ska anfallaren vara involverad i uppspelet, pressa först och leverera mål. Mot GAIS låga xGA (0,86) kan lägena bli färre – klinisk avslutning och rörelse bakom deras höga linje blir extra avgörande.",
        },
      ],
      rotationNotes: [
        "Inhoppare 60+ (spets): fysisk profil för att utnyttja GAIS uttrötade backlinje – luftstyrka och djupledslöpningar.",
        "Inhoppare mittfält: bollsäker profil som bibehåller vårt tempo och kontroll sista 20 min vid ledning.",
        "Inhoppare kant: explosiv profil som kan avgöra 1v1 mot trötta backar – GAIS farligast 46-60, efteråt tappar de energi.",
        "Vid oavgjort sent: överväg öka bredd med en extra offensiv kantspelare – tvinga GAIS att försvara mer yta.",
      ],
    },
    glossary: [
      {
        term: "xP (Expected Points)",
        explanation:
          "Förväntade poäng baserat på xG-modellen. GAIS 14 xP vs 9 faktiska visar att de förtjänat fler poäng.",
      },
      {
        term: "Counterpress",
        explanation:
          "Att omedelbart pressa efter bolltapp för att snabbt återerövra. Både Hammarby och GAIS gör detta.",
      },
      {
        term: "Progressiva passningar",
        explanation:
          "Passningar som driver bollen framåt minst 10 meter mot motståndarens mål.",
      },
      {
        term: "Genomskärare",
        explanation:
          "Passning som bryter genom motståndarens försvarslinje – ofta en djupled bakom backlinje.",
      },
      {
        term: "Konverteringsgrad",
        explanation:
          "Andel avslut som blir mål. GAIS 8,2% indikerar att de slösar chanser.",
      },
    ],
  },
  {
    round: 9,
    roundLabel: "Omgång 9",
    hidden: true,
    fixture: "Hammarby - AIK",
    dateLabel: "Inför 25 maj 2026 · uppdaterad med Bolldata lagdata + Twelve season report",
    oneLineSummary:
      "AIK är i uselt form (0V-2O-3F senaste 5) och har ligans lägsta passtempo (17,14). Deras defensiva transition är dock stark – de tappar bollen sällan och begränsar motståndarens snabba framstötar. Hammarby behöver forcera tempot och tvinga AIK att spela snabbare än de vill.",
    mobileTakeaways: [
      "Hammarby 2:a (17p), AIK 10:a (9p). AIK har 0V-2O-3F i senaste 5 – bottennapp.",
      "AIK har ligans lägsta passtempo (17,14) – de vill sakta ner allt. Hammarbys tempo är nyckeln.",
      "AIK tappar bollen näst minst (29,6 turnovers/match) – svårt att vinna omställningar.",
      "AIK:s defensiva transition är bäst i ligan: 1:a i att begränsa motståndaren till sista tredjedelen efter bollvinst.",
      "MEN: AIK släpper till 4,38 högkvalitetsskott/match (14:e av 16) – de är sårbara i boxen.",
      "AIK konverterar bara 8,4% av sina skott – de gör inte mål trots att de har bollen.",
      "AIK släpper in 3 mål 0-15 och 3 mål 76-90+ – sårbar tidigt och sent. Tryck där.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 21 maj 2026)",
      "Bolldata API: matches + matches/team/stats för Allsvenskan 2026",
      "Bolldata API: matches/goals för minutfönster och målprofil",
      "Twelve season report: https://reports.twelve.football/reports/aik-season-report-bkvWgR3FpH.pdf (21 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a (17p), 21-8 i mål. 3V-1O-1F senaste 5. Hemmarutin: 4V-1O-0F, 19-3 i mål på Tre Arena.",
        tone: "emerald",
      },
      {
        title: "AIK just nu",
        body: "10:a (9p), 10-12 i mål. Bottennapp: 0V-2O-3F senaste 5. xP 10 = rätt nivå, de ÄR mediokra.",
        tone: "amber",
      },
      {
        title: "Derbymatch – men data säger klart HIF",
        body: "AIK konverterar 8,4% och skapar 0,09 xG/skott. Hammarby skapar 2,25 xG/match hemma. Stor kvalitetsskillnad.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: AIK spelar med extremt lågt passtempo (17,14 – sämst i ligan) och vill kontrollera rytmen genom tålmod.",
      "AIK bygger uppåt patient men saknar fart – de når sista tredjedelen 38% av gångerna (under snitt).",
      "Carries-fokus: AIK penetrerar boxen via dribbling (24% box entries från carries, 0,42 dribblingar/FT-possession).",
      "Defensivt: AIK faller tillbaka ELLER counterpressar beroende på situation – ingen extrem profil.",
      "Twelve: AIK har 14% final-third recoveries (bra) men bara 6,02 PPDA (passivt i press).",
    ],
    styleProfile: [
      {
        label: "Passtempo (Twelve/Bolldata)",
        value: "17,14 pass/min possession – SÄMST i ligan",
        score: 15,
        explanation: "AIK spelar extremt långsamt. De vill döda tempot och kontrollera matchen utan fart.",
      },
      {
        label: "Defensiv transition (Twelve)",
        value: "29,6 turnovers/match (2:a bäst) · 1:a i opp. FT inom 10s",
        score: 85,
        explanation: "AIK:s största styrka. De tappar sällan bollen och stänger ner motståndarens omställningar effektivt.",
      },
      {
        label: "Offensiv konvertering (Bolldata)",
        value: "8,4% konverteringsgrad · 0,09 xG/skott",
        score: 20,
        explanation: "AIK skapar chanser med låg kvalitet och konverterar dåligt. Ineffektiva framför mål.",
      },
      {
        label: "Bollinnehav (Bolldata)",
        value: "56,0% – 2:a i ligan",
        score: 72,
        explanation: "AIK vill ha bollen men gör lite med den. Possession utan penetration.",
      },
      {
        label: "Sårbarhet i box (Twelve)",
        value: "4,38 HQ-skott/match emot (14:e av 16)",
        score: 25,
        explanation: "Trots disciplinerat försvarsspel släpper AIK till många farliga chanser inne i boxen.",
      },
    ],
    spiderComparison: [
      {
        label: "Avslut / match",
        hammarbyValue: "20,89",
        opponentValue: "13,38",
        hammarbyScore: 100,
        opponentScore: 64,
        note: "Hammarby skjuter 56% mer per match. Stor volymfördel.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,25",
        opponentValue: "1,42",
        hammarbyScore: 95,
        opponentScore: 60,
        note: "Hammarby skapar 58% mer xG per match. AIK:s chanser är lågkvalitativa.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,67",
        opponentValue: "6,13",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Närmare än förväntat – AIK skjuter på mål ofta men med låg xG/skott.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "61,1%",
        opponentValue: "56,0%",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Båda lagen vill ha bollen. Tempokampen avgör vem som dominerar.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,22",
        opponentValue: "17,14",
        hammarbyScore: 95,
        opponentScore: 30,
        note: "Hammarby spelar 12% snabbare. AIK vill sänka tempot – vi måste tvinga upp det.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "77,11",
        opponentValue: "66,75",
        hammarbyScore: 90,
        opponentScore: 55,
        note: "Hammarby driver bollen framåt oftare. AIK är mer laterala.",
      },
      {
        label: "Konverteringsgrad",
        hammarbyValue: "10,6%",
        opponentValue: "8,4%",
        hammarbyScore: 70,
        opponentScore: 45,
        note: "Ingen av lagen konverterar bra, men Hammarby har volymfördel som kompenserar.",
      },
      {
        label: "xGA / match",
        hammarbyValue: "1,30",
        opponentValue: "1,54",
        hammarbyScore: 75,
        opponentScore: 60,
        note: "AIK släpper till mer xG emot – defensivt sårbarare i boxen.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,00",
        opponentValue: "3,13",
        hammarbyScore: 100,
        opponentScore: 63,
        note: "Hammarby skapar betydligt fler nyckelpassningar. Kreativ fördel.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "34,22",
        opponentValue: "29,62",
        hammarbyScore: 60,
        opponentScore: 85,
        note: "AIK tappar bollen MER SÄLLAN. Deras disciplin gör det svårt att vinna omställningar.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,25",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,42",
        opponentRank: "7:a av 16",
        note: "Hammarby skapar mest xG i ligan. AIK ligger under snittet.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,22",
        hammarbyRank: "5:a av 16",
        opponentValue: "17,14",
        opponentRank: "16:e av 16",
        note: "AIK SIST. Deras lägsta tempo i ligan gör dem förutsägbara. Vi måste forcera.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "34,22",
        hammarbyRank: "8:a av 16",
        opponentValue: "29,62",
        opponentRank: "2:a av 16",
        note: "AIK tappar bollen näst minst. Svårt att vinna via omställningar – pressa smartare.",
      },
      {
        label: "HQ-skott emot / match",
        hammarbyValue: "2,56",
        hammarbyRank: "4:a av 16",
        opponentValue: "4,38",
        opponentRank: "14:e av 16",
        note: "AIK släpper till MÅNGA farliga skott. Deras box-försvar är en tydlig svaghet.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,89",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,38",
        opponentRank: "6:a av 16",
        note: "Hammarbys avslutsvolym är suverän. AIK:s defensiv ska utsättas för denna volym.",
      },
      {
        label: "Konverteringsgrad",
        hammarbyValue: "10,6%",
        hammarbyRank: "10:e av 16",
        opponentValue: "8,4%",
        opponentRank: "13:e av 16",
        note: "Varken Hammarby eller AIK konverterar bra. Volym avgör – och där leder Hammarby.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 2, opponentConcededGoals: 3 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 0 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 3 },
    ],
    goalTypeNotes: [
      {
        label: "Hur AIK släpper in mål",
        value: "12 av 12 inifrån boxen eller via straff/frispark",
        interpretation: "Alla mål AIK släpper in kommer från centrala/nära positioner. Penetrera boxen = mål.",
      },
      {
        label: "AIK sårbar tidigt & sent",
        value: "3 insläppta 0-15, 3 insläppta 76-90+",
        interpretation: "Hammarbys starkaste perioder (61-75: 5 mål, 76-90+: 4 mål) matchar AIK:s svagheter perfekt.",
      },
      {
        label: "AIK:s usla konvertering",
        value: "8,4% (13:e av 16)",
        interpretation: "AIK gör nästan aldrig mål. 10 mål på 107 skott. Stress dem och de konverterar ännu sämre.",
      },
      {
        label: "AIK:s mål framåt",
        value: "10 mål (1,25/match) – 3 i 16-30",
        interpretation: "AIK gör flest mål 16-30. Håll koncentrationen där men annars låg fara.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Forcera tempot OMEDELBART. AIK vill sakta ner (17,14 pass/min) – vi spelar i vårt tempo (19,22) och tvingar dem att springa.",
        "Använd Besara centralt som tempo-accelerator – snabba vertikala bollar mellan linjerna innan AIK hinner sätta sig.",
        "Attackera boxen med volym – AIK släpper in 4,38 HQ-skott/match (14:e i ligan). Fler avslut = fler mål.",
        "Breed spel via backarna för att dra isär AIK:s block – de försvarar centralt men utan intensitet (6,20 def. intensity).",
      ],
      withoutBall: [
        "Pressa HÖGT men SMART – AIK tappar bollen sällan (29,6/match). Pressa första passningen, inte desperat.",
        "Stäng av AIK:s carries/dribblingar – de penetrerar via individuella löpningar (24% box entries från carries).",
        "INTE spela rakt in i deras transition-styrka. Kontrollera bolltappens position – tappa hellre djupt än högt.",
        "Lärdomar från GAIS: 44 turnovers = döden. Mot AIK max 30 – bollsäkerhet i vårt eget uppspel.",
      ],
      matchManagement: [
        "0-15: tryck DIREKT. AIK släpper in 3 mål i öppningen. Sätt ton och ta ledningen tidigt.",
        "76-90+: AIK släpper in 3 mål sent. Behåll intensiteten och slå till vid trötthet.",
        "Vid ledning: AIK konverterar 8,4% – lita på att de INTE gör mål. Kontrollera bollen.",
        "Derbykontroll: håll disciplinen. Inget rött kort (lärdom från GAIS). Ingen onödig risk.",
      ],
    },
    glossary: [
      {
        term: "Passtempo",
        explanation:
          "Antal passningar per minut med bollen. AIK:s 17,14 är sämst i ligan – de vill döda tempot.",
      },
      {
        term: "Turnovers",
        explanation:
          "Bollförluster per match. AIK:s 29,6 (2:a bäst) gör det svårt att vinna via transitions.",
      },
      {
        term: "HQ-skott (High opportunity shots)",
        explanation:
          "Skott med >0,15 xG. AIK släpper 4,38 sådana per match = 14:e av 16 = sårbar.",
      },
      {
        term: "Defensive transition",
        explanation:
          "Vad som händer direkt efter bolltapp. AIK:s styrka: begränsar motståndarens framstötar.",
      },
      {
        term: "Carries/bollbärande",
        explanation:
          "AIK:s primära penetrationsmetod – enskilda spelare som bär bollen in i boxen.",
      },
    ],
  },
  {
    round: 10,
    roundLabel: "Omgång 10",
    hidden: true,
    fixture: "BK Häcken - Hammarby",
    dateLabel: "Inför 31 maj 2026 · uppdaterad med Twelve season reports + Bolldata lagdata",
    oneLineSummary:
      "Häcken är obesegrade (17p på 9 matcher) och överkonverterar sina chanser (1,78 mål vs 1,59 xG). Deras anfallsspel bygger på inlägg från kanterna – 42% av deras box entries kommer via inlägg. Hammarby har massiv fördel i press (PPDA 4,20 vs 6,00), field tilt (70% vs 49%) och skottvolym (20,6 vs 13,4).",
    mobileTakeaways: [
      "Häcken 2:a-3:a (~17p), Hammarby ~17p. Tät tabell i toppen.",
      "Häcken OBESEGRADE i 9 matcher – men flest oavgjorda i toppen (4 kryss). xP bara 1,64 = de överavkastnar.",
      "Häcken lever på inlägg: 0,49 inlägg/FT-possession (extremt högt) och 42% box entries via inlägg.",
      "Häcken sitter djupt: DAH 40,11m (lågt) men vinner 62% av sina defensiva dueller.",
      "Häcken tappar bollen MYCKET: 35,78 turnovers/match – exploaterbart med Hammarbys omställningar.",
      "Hammarby dominerar i press: PPDA 4,20 (1:a-klass) vs Häckens 6,00. Pressa deras uppspel.",
      "Hammarby har 70% field tilt vs Häckens 49% – vi ska äga sista tredjedelen.",
    ],
    dataSources: [
      "Twelve season report: https://reports.twelve.football/reports/h%C3%A4cken-season-report-RGe9Sn86Hx.pdf (27 maj 2026)",
      "Twelve season report: https://reports.twelve.football/reports/hammarby-season-report-XDTqQYpAHQ.pdf (27 maj 2026)",
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 27 maj 2026)",
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "~17p, 22-10 i mål. 5V-2O-3L senaste 10 (inkl. GAIS-förlust och AIK-derby). Starkt försvar (1,0 insläppta/match).",
        tone: "emerald",
      },
      {
        title: "Häcken just nu",
        body: "~17p på 9 matcher, OBESEGRADE. 1,89 mål/match men bara 1,59 xG – överkonverterar. Dalande anfallsform senaste matcherna.",
        tone: "amber",
      },
      {
        title: "Nyckelkamp: press vs inlägg",
        body: "Hammarbys höga press (PPDA 4,20) mot Häckens inläggsfokus (42% box entries). Blockera vägarna ut till kanterna = stryp deras anfallsspel.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: Häcken förlitar sig tungt på inlägg – 0,49 inlägg per FT-possession och 42% av box entries via inlägg (ligans mest inläggsberoende lag).",
      "Häcken bygger upp bakifrån (52% buildup from goalkick) men når sista tredjedelen bara 35% av gångerna (under snitt).",
      "Direkta attacker: 30% av skotten kommer via snabba, raka anfall – de söker inte tålmodig uppbyggnad.",
      "Defensivt: Häcken sitter relativt djupt (DAH 40,11m) med passivare press (PPDA 6,00). Faller hellre tillbaka än counterpressar.",
      "Twelve: Häcken har bara 10% recoveries within 5s – de är LÅNGSAMMA att återerövra bollen efter bolltapp.",
    ],
    styleProfile: [
      {
        label: "Inläggsberoende (Twelve)",
        value: "0,49 inlägg/FT-poss · 42% box entries via inlägg",
        score: 85,
        explanation: "Häckens mest utpräglade drag. Alla anfall söker vägarna ut till kanterna för att slå in bollar i boxen.",
      },
      {
        label: "Turnovers (Twelve)",
        value: "35,78/match – bland de högsta i ligan",
        score: 25,
        explanation: "Häcken tappar bollen ofta. Hammarbys omställningsspel bör kunna exploatera detta.",
      },
      {
        label: "Konvertering (Twelve)",
        value: "np Goals 1,78 vs np xG 1,59 · 12% överkonvertering",
        score: 75,
        explanation: "Häcken gör fler mål än xG motiverar – effektiva framför mål men svårt att hålla i längden.",
      },
      {
        label: "Defensiv höjd (Twelve)",
        value: "DAH 40,11m – sitter djupt",
        score: 40,
        explanation: "Häcken möter inte pressen högt. De faller tillbaka och försöker kontrollera med struktur snarare än intensitet.",
      },
      {
        label: "Field tilt (Twelve)",
        value: "49% – under snitt",
        score: 40,
        explanation: "Häcken dominerar INTE sista tredjedelen. Balanserat till motståndarens fördel offensivt.",
      },
    ],
    spiderComparison: [
      {
        label: "xG / match",
        hammarbyValue: "2,26",
        opponentValue: "1,67",
        hammarbyScore: 100,
        opponentScore: 62,
        note: "Hammarby skapar 35% mer xG per match. Tydlig kvalitetsfördel i chanskreation.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,60",
        opponentValue: "13,44",
        hammarbyScore: 100,
        opponentScore: 55,
        note: "Hammarby skjuter 53% mer per match – massiv volymfördel.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "62%",
        opponentValue: "52%",
        hammarbyScore: 100,
        opponentScore: 65,
        note: "Hammarby dominerar bollen. Häcken behöver inte bollen för att vara farliga.",
      },
      {
        label: "Passtempo",
        hammarbyValue: "19,33",
        opponentValue: "19,28",
        hammarbyScore: 80,
        opponentScore: 78,
        note: "Nästan identiskt tempo – inte tempot som avgör utan PRESSEN och YTAN.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "70%",
        opponentValue: "49%",
        hammarbyScore: 100,
        opponentScore: 40,
        note: "Hammarbys STÖRSTA fördel. 70% vs 49% = vi ska leva i deras planhalva.",
      },
      {
        label: "PPDA (press)",
        hammarbyValue: "4,20",
        opponentValue: "6,00",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby pressar MYCKET hårdare. Häckens passiva press ger oss utrymme att bygga.",
      },
      {
        label: "Boxberöringar / match",
        hammarbyValue: "29,40",
        opponentValue: "21,33",
        hammarbyScore: 100,
        opponentScore: 60,
        note: "Hammarby penetrerar boxen 38% oftare – mer direkta chanser.",
      },
      {
        label: "HQ-skott / match",
        hammarbyValue: "4,70",
        opponentValue: "3,56",
        hammarbyScore: 90,
        opponentScore: 65,
        note: "Hammarby skapar fler farliga chanser per match.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "31,70",
        opponentValue: "35,78",
        hammarbyScore: 75,
        opponentScore: 55,
        note: "Häcken tappar bollen mer – Hammarbys omställningar ska straffa varje bolltapp.",
      },
      {
        label: "Def. intensitet",
        hammarbyValue: "7,47",
        opponentValue: "6,51",
        hammarbyScore: 95,
        opponentScore: 60,
        note: "Hammarby jobbar hårdare utan boll. Häcken mer avvaktande defensivt.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,26",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,67",
        opponentRank: "~5:a av 16",
        note: "Hammarby skapar mest xG i ligan. Häcken genomsnittligt offensivt.",
      },
      {
        label: "PPDA",
        hammarbyValue: "4,20",
        hammarbyRank: "~1:a av 16",
        opponentValue: "6,00",
        opponentRank: "~10:e av 16",
        note: "Hammarby pressar intensivast. Häckens passivare press ger oss fritt uppspel.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "70%",
        hammarbyRank: "~1:a av 16",
        opponentValue: "49%",
        opponentRank: "~10:e av 16",
        note: "Hammarby dominerar sista tredjedelen totalt. Häcken under snittet.",
      },
      {
        label: "Turnovers / match",
        hammarbyValue: "31,70",
        hammarbyRank: "~5:a av 16",
        opponentValue: "35,78",
        opponentRank: "~13:e av 16",
        note: "Häcken tappar bollen ofta. Hammarbys höga recoveries (40,5/match) ska exploatera detta.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,60",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,44",
        opponentRank: "~8:a av 16",
        note: "Hammarbys avslutsvolym är bäst i ligan. Häcken skjuter under snittet.",
      },
      {
        label: "Konverteringsgrad (np Goals/np xG)",
        hammarbyValue: "0,96",
        hammarbyRank: "~8:a av 16",
        opponentValue: "1,12",
        opponentRank: "~4:a av 16",
        note: "Häcken konverterar BÄTTRE än förväntat. De gör mål av lite – farligt om de får chanser.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "46-60", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Häckens inläggsberoende",
        value: "42% box entries via inlägg, bara 15% via carries",
        interpretation: "Stäng kanterna och blockera inlägg = eliminera deras primära angreppssätt.",
      },
      {
        label: "Häcken överkonverterar",
        value: "1,78 np mål vs 1,59 np xG (12% över förväntan)",
        interpretation: "Inte hållbart. Begränsa deras chanser och regressionen gör jobbet åt oss.",
      },
      {
        label: "Häcken tappar bollen mycket",
        value: "35,78 turnovers/match · bara 10% recovery within 5s",
        interpretation: "Hammarbys omställningsspel (0,91 xT via transition) ska straffa slarvet. Press högt vid bolltapp.",
      },
      {
        label: "Häckens sjunkande anfallsform",
        value: "Twelve: 'significant decline' i anfallsproduktion senaste matcherna",
        interpretation: "Häcken är i dalande form offensivt – pressa tidigt och tvinga dem att jaga.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Exploatera field tilt-fördelen (70% vs 49%). Dominera sista tredjedelen och håll bollen där. Häcken har inte strukturen att pressa ut oss.",
        "Attackera CENTRALT. Häcken försvarar brett för att möta inlägg – deras centrala ytor bör vara öppna. Box entries via carries (21%) och kombinationsspel.",
        "Hammarbys boxberöringar (29,4/match) mot Häckens 21,3 – volymfördelen ska skapa HQ-skott. Sikta på 5+ HQ-skott.",
        "Tålamod i uppspelet. Häcken faller tillbaka (DAH 40,11m) – bygg upp lugnt och sök vertikala passningar genom mittfältet.",
      ],
      withoutBall: [
        "Press FULLT UT. PPDA 4,20 vs 6,00 – vi pressar nästan 50% hårdare. Stör deras uppspel och forcera deras 35,78 turnovers/match.",
        "BLOCKERA INLÄGGEN. Häckens 42% box entries via inlägg är deras livsnerv. Halvbacks och ytterbackar måste stänga de yttre banorna.",
        "Exploatera Häckens bolltapp (35,78/match). Hammarbys 40,5 recoveries/match och 0,91 xT via transition – kontra DIREKT vid varje turnover.",
        "Häcken recoverar bara 10% within 5s – efter bolltapp tar det lång tid för dem att organisera sig. Press omedelbart.",
      ],
      matchManagement: [
        "Hammarby gör flest mål 61-75 (5 mål) och 76-90+ (4 mål). Behåll intensiteten sent – Häckens defensiv tröttnar.",
        "Häcken konverterar bra (1,78 vs 1,59 xG) – ge dem INGA billiga chanser. Kontrollera matchen snarare än öppna den.",
        "Vid ledning: Häckens passivitet (PPDA 6,00) gör att de inte kan pressa effektivt för att vända. Kontrollera bollen.",
        "Bortamatch – men Hammarby har starkt på bortaplan (1V-2O-1L senaste 4 borta). Spela vårt spel, inte deras.",
      ],
    },
    glossary: [
      {
        term: "Field tilt",
        explanation:
          "Andel av possessionerna i sista tredjedelen. Hammarbys 70% vs Häckens 49% visar hur mycket vi dominerar i anfallarean.",
      },
      {
        term: "PPDA (Passes Per Defensive Action)",
        explanation:
          "Hur många pass motståndaren tillåts spela innan vi gör en defensiv aktion. Hammarbys 4,20 = extremt aggressiv press.",
      },
      {
        term: "Box entries from crosses",
        explanation:
          "Andel av box-penetrationerna som sker via inlägg. Häckens 42% visar deras extrema beroende av kantspel.",
      },
      {
        term: "Turnovers",
        explanation:
          "Bollförluster per match. Häckens 35,78 gör dem exponerade för omställningar – Hammarbys styrka.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder. Häckens 10% innebär att de är långsamma att reagera efter bolltapp.",
      },
    ],
  },
  {
    round: 11,
    roundLabel: "Omgång 11",
    hidden: true,
    fixture: "IF Elfsborg - Hammarby",
    dateLabel:
      "Inför 5 juli 2026 · uppdaterad med Bolldata lagdata + Twelve säsongrapport + Rydström-special",
    oneLineSummary:
      "Elfsborg är 3:a (18p) med bara en poäng före Hammarby på 4:e plats (17p) – trots ligans sämsta anfallsvolym (10 skott/match). De lever på disciplinerad defensiv transition (3:a i ligan) och effektivitet framför mål. Hammarby dominerar offensivt i Twelve (1:a i xG, avslut, field tilt och PPDA) men möter dem med ny huvudtränare Henrik Rydström som ska sätta sin prägel direkt.",
    mobileTakeaways: [
      "Elfsborg 3:a (18p), Hammarby 4:a (17p) – en poäng emellan. Sirius leder (28p), Häcken 2:a (20p).",
      "Elfsborg har LIGANS LÄGSTA skottvolym (10,0/match) men håller 1,00 insläppta/match – stark defensiv transition (3:a).",
      "Twelve: Elfsborg 45% bollinnehav, 46% field tilt – reaktivt lag som inte dominerar territorium.",
      "Hammarby Twelve: 1:a i xG (2,16), avslut (20,2), field tilt (70%) och PPDA (4,19) – massiv spelmässig fördel.",
      "Elfsborg gör 11 av 16 mål efter paus (46-90+) – farliga i andra halvlek.",
      "Inbördes: HIF 6V-2O-2F senaste 10 möten. Senast 3-0 hemma (nov 2025) och 0-2 borta (maj 2025).",
      "Rydström-debut: ny tränare efter Karlsson. Båda lagen har nya tränare – Hamberg (Elfsborg) vs Rydström (HIF).",
      "Nyckel: PPDA 4,19 vs 7,20 – pressa Elfsborgs uppspel och dominera field tilt (70% vs 46%).",
    ],
    dataSources: [
      "Twelve säsongrapport Elfsborg (delad): https://earpiece.twelve.football/shared-reports/96d790ae-d5bb-4f51-8f2c-71b249b0ccdc (1 juli 2026)",
      "Twelve säsongrapport Hammarby: https://reports.twelve.football/reports/hammarby-season-report-9FKTw5a6Xg.pdf (1 juli 2026)",
      "Twelve säsongdata Hammarby 2026: hammarbySeasonAnalysisData.ts (11 omgångar)",
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 1 juli 2026)",
      "Bolldata API: matches + team-advanced för Allsvenskan 2026 (11 omgångar)",
      "Bolldata API: goals för minutfönster och målprofil",
      "Bolldata API: senaste 10 inbördes möten Hammarby-Elfsborg (hämtad 1 juli 2026)",
    ],
    cupSpecial: {
      title: "Rydström-special: ny tränare, första riktiga testet",
      context:
        "Henrik Rydström tillträdde som Hammarbys huvudtränare i vår 2026 efter Kalle Karlsson, med kontrakt till 2028 och Theo Olsson som assisterande. Rydström kommer senast från Columbus Crew och är känd för tydligt ledarskap, höga träningskrav och strukturerat bollinnehav inom ramen för klubbens spelidé. Elfsborg borta blir ett tidigt riktmärke: kan Rydström få Hammarbys redan dominanta lagdata (ligans bästa xG och avslutsvolym) att omsättas i poäng mot ett lag som bara förlorat en match? Samtidigt har Elfsborg ny manager i Björn Hamberg – två nya tränare som fortfarande formar sina lag.",
      tacticalKeys: [
        "Rydströms Hammarby bör INTE ändra grundprofilen drastiskt – Twelve visar 1:a plats i xG, field tilt och PPDA. Fokus på beslutsfattande i sista tredjedelen.",
        "Elfsborg utan boll (45% possession, Twelve) passar Rydströms filosofi – tvinga dem att försvara långa sekvenser mot våra 70% field tilt.",
        "Risk med tränarbyte: kort förberedelsetid efter Häcken-förlusten (3-2). Rydström måste balansera sin spelmodell mot matchintensitet direkt.",
        "Elfsborgs styrka är defensiv transition (3:a i ligan) – Hammarby får inte tappa boll i farliga lägen. Kontrollera tempot, undvik onödiga risker centralt.",
        "Rydström har erfarenhet av Allsvenskan och europeiskt spel – förväntas höja kraven i matchförberedelse och halvtidssnack. Andra halvlek kan bli avgörande (Elfsborg gör 69% av sina mål efter paus).",
        "Båda tränarna är nya – Hamberg har byggt Elfsborgs disciplinerade mittblock, Rydström ska få Hammarbys offensiva dominans att bita. Den som imponerar taktiskt vinner matchen.",
      ],
    },
    headToHead: {
      sampleSize: 10,
      description:
        "Hammarby har dominerat inbördes möten de senaste åren – 6 segrar, 2 oavgjorda och 2 förluster i senaste 10 mötena. Totalt 16-9 i mål. Hammarby har vunnit de två senaste (3-0 hemma nov 2025, 2-0 borta maj 2025) med tydlig xG-fördel.",
      summaryCards: [
        {
          title: "Senaste 10 möten",
          value: "6V-2O-2F (HIF)",
          note: "16-9 i mål. Hammarby har tagit poäng i 8 av 10.",
          tone: "emerald",
        },
        {
          title: "Senaste bortamatch",
          value: "0-2 (maj 2025)",
          note: "Hammarby vann i Borås med 1,55 xG mot Elfsborgs 0,80. 21-8 i avslut.",
          tone: "emerald",
        },
        {
          title: "Borta i Borås totalt",
          value: "1V-2O-2F senaste 5",
          note: "Bortamatcherna är jämnare – senaste hemmaseger i Borås var 2-0 (2023).",
          tone: "amber",
        },
      ],
      trendBullets: [
        "Hammarby har vunnit 4 av senaste 5 inbördes möten (ett oavgjort 0-0 sep 2024).",
        "Senaste två mötena: totalt 5-0 till Hammarby med underliggande xG-fördel i båda.",
        "Elfsborgs senaste hemmaseger mot HIF: 2-0 i juli 2023.",
        "Hammarby skapar konsekvent mer – i snitt 14,6 avslut/match vs Elfsborgs 11,9 i de 10 senaste mötena.",
      ],
      matches: [
        {
          date: "2025-11-09",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.668,
          opponentXg: 0.2776,
          hammarbyShots: 19,
          opponentShots: 5,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2025/2025-11-09/hammarby-elfsborg-3-0",
        },
        {
          date: "2025-05-31",
          fixture: "Elfsborg - Hammarby",
          result: "0-2",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.55,
          opponentXg: 0.8041,
          hammarbyShots: 21,
          opponentShots: 8,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2025/2025-05-31/elfsborg-hammarby-0-2",
        },
        {
          date: "2024-09-22",
          fixture: "Elfsborg - Hammarby",
          result: "0-0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.6166,
          opponentXg: 0.5577,
          hammarbyShots: 11,
          opponentShots: 10,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-09-22/elfsborg-hammarby-0-0",
        },
        {
          date: "2024-04-15",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.433,
          opponentXg: 1.144,
          hammarbyShots: 12,
          opponentShots: 17,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-04-15/hammarby-elfsborg-3-0",
        },
        {
          date: "2023-08-13",
          fixture: "Hammarby - Elfsborg",
          result: "1-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 1,
          opponentGoals: 0,
          hammarbyXg: 1.107,
          opponentXg: 0.4626,
          hammarbyShots: 13,
          opponentShots: 10,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-08-13/hammarby-elfsborg-1-0",
        },
        {
          date: "2023-07-03",
          fixture: "Elfsborg - Hammarby",
          result: "2-0",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 0.6981,
          opponentXg: 1.79,
          hammarbyShots: 11,
          opponentShots: 12,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-07-03/elfsborg-hammarby-2-0",
        },
        {
          date: "2022-10-23",
          fixture: "Elfsborg - Hammarby",
          result: "2-1",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 2,
          hammarbyXg: 0.7939,
          opponentXg: 1.413,
          hammarbyShots: 9,
          opponentShots: 11,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2022/2022-10-23/elfsborg-hammarby-2-1",
        },
        {
          date: "2022-07-17",
          fixture: "Hammarby - Elfsborg",
          result: "3-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 0,
          hammarbyXg: 1.245,
          opponentXg: 1.508,
          hammarbyShots: 19,
          opponentShots: 14,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2022/2022-07-17/hammarby-elfsborg-3-0",
        },
        {
          date: "2021-08-22",
          fixture: "Elfsborg - Hammarby",
          result: "2-2",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 2,
          opponentGoals: 2,
          hammarbyXg: 1.706,
          opponentXg: 0.8075,
          hammarbyShots: 13,
          opponentShots: 13,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2021/2021-08-22/elfsborg-hammarby-2-2",
        },
        {
          date: "2021-08-15",
          fixture: "Hammarby - Elfsborg",
          result: "0-2",
          venue: "home",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 2,
          hammarbyXg: 1.429,
          opponentXg: 1.339,
          hammarbyShots: 18,
          opponentShots: 19,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2021/2021-08-15/hammarby-elfsborg-0-2",
        },
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "4:a (17p), 24-13 i mål. Twelve: 1:a i xG (2,16), PPDA (4,19) och field tilt (70%). Svagare defensivt än 2025 – motst. xG 1,45 (9:e). Rydströms första riktiga test.",
        tone: "emerald",
      },
      {
        title: "Elfsborg just nu",
        body: "3:a (18p), 4V-6O-1F, 16-11 i mål. Twelve: defensiv transition 3:a, men anfall 13:e. PPDA 7,20 – passiv press.",
        tone: "amber",
      },
      {
        title: "Nyckelkamp: press vs disciplin",
        body: "Hammarbys Twelve-fördelar: PPDA 4,19 (1:a) och field tilt 70% (1:a) mot Elfsborgs defensiva transition (3:a) och PPDA 7,20.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: Elfsborg har 45% bollinnehav och 46% field tilt – de dominerar inte territorium utan spelar reaktivt och kompakt.",
      "Defensiv transition är Elfsborgs främsta styrka (3:a i ligan). De begränsar motståndarens hot efter bolltapp – bara 0,21 opp. xG inom 10s efter recovery.",
      "Anfallsspelet är svagt (13:e av 16): bara 32% av possessioner når sista tredjedelen och 17% av final third-possessioner når boxen.",
      "Lågintensiv press: PPDA 7,20 och defensiv intensitet 5,35 – motståndare får tid på bollen. Hammarby kan bygga upp.",
      "Twelve: Elfsborg överpresterar marginellt (1,64 poäng/match vs 1,55 xP) – de tar poäng trots svag underliggande anfallsdata.",
      "Nyckelspelare: Leo Östman (4 mål, 2,21 xG), Arbër Zeneli (3 mål), Frederik Ihler (2 mål). Holmén avstängd.",
    ],
    styleProfile: [
      {
        label: "Defensiv transition (Twelve)",
        value: "3:a av 16 · opp. xG inom 10s: 0,21",
        score: 82,
        explanation:
          "Elfsborgs starkaste fas. De organiserar sig snabbt efter bolltapp och begränsar motståndarens kontringar effektivt.",
      },
      {
        label: "Anfallsvolym (Bolldata)",
        value: "10,0 avslut/match – SISTA i Allsvenskan",
        score: 15,
        explanation:
          "Elfsborg skjuter minst i hela ligan. De skapar få chanser men förlitar sig på effektivitet.",
      },
      {
        label: "Bollinnehav (Twelve)",
        value: "45% · field tilt 46%",
        score: 35,
        explanation:
          "Lågt territorium – Elfsborg nöjer sig med att försvara och slå till på omställningar.",
      },
      {
        label: "Avslutseffektivitet (Twelve)",
        value: "np Goals 1,27 vs np xG 1,36 · 0,14 xG/skott",
        score: 68,
        explanation:
          "Trots låg volym konverterar Elfsborg hyfsat – de tar riskfyllda avslut när chanserna kommer.",
      },
      {
        label: "Pressintensitet (Twelve)",
        value: "PPDA 7,20 · def. intensitet 5,35",
        score: 30,
        explanation:
          "Passiv press – Hammarby får bygga upp. Men passiviteten är medveten inom deras kompakta block.",
      },
    ],
    spiderComparison: [
      {
        label: "Lyckade anfallsaktioner / match",
        hammarbyValue: "26,64",
        opponentValue: "16,18",
        hammarbyScore: 100,
        opponentScore: 62,
        note: "Hammarby har ligans högsta offensiva aktivitet. Elfsborg ligger nära botten.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "24",
        opponentValue: "16",
        hammarbyScore: 89,
        opponentScore: 60,
        note: "Hammarby tvåa i total målproduktion, Elfsborg sjua efter 11 omgångar.",
      },
      {
        label: "xG / match",
        hammarbyValue: "2,20",
        opponentValue: "1,43",
        hammarbyScore: 100,
        opponentScore: 65,
        note: "Hammarby skapar 54% mer xG per match – tydlig kvalitetsfördel.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,09",
        opponentValue: "10,00",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby skjuter dubbelt så mycket – Elfsborg har ligans lägsta skottvolym.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,09",
        opponentValue: "3,64",
        hammarbyScore: 94,
        opponentScore: 56,
        note: "Hammarby träffar mål betydligt oftare per match.",
      },
      {
        label: "Lyckade defensiva aktioner / match",
        hammarbyValue: "71,45",
        opponentValue: "93,36",
        hammarbyScore: 56,
        opponentScore: 73,
        note: "Elfsborg försvarar mer (mindre bollinnehav). Hammarby pressar mer med bollen.",
      },
      {
        label: "Duellvinster / match",
        hammarbyValue: "103,18",
        opponentValue: "90,91",
        hammarbyScore: 100,
        opponentScore: 88,
        note: "Hammarby vinner flest dueller i ligan. Elfsborg är medelmåttiga.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "93,45",
        opponentValue: "83,36",
        hammarbyScore: 94,
        opponentScore: 84,
        note: "Hammarby återerövrar bollen oftare – viktigt mot Elfsborgs låga turnovers (30,91).",
      },
      {
        label: "Hållna nollor (%)",
        hammarbyValue: "27,3%",
        opponentValue: "27,3%",
        hammarbyScore: 81,
        opponentScore: 81,
        note: "Identisk nollaprocent – båda lagen håller nollan i drygt var fjärde match.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "59,4%",
        opponentValue: "45,6%",
        hammarbyScore: 100,
        opponentScore: 70,
        note: "Hammarby dominerar bollen. Elfsborg spelar utan boll medvetet.",
      },
      {
        label: "Framåtpassningar / match",
        hammarbyValue: "180,36",
        opponentValue: "140,09",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "Hammarby driver bollen framåt mer – passar Rydströms progression-fokus.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,16",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,36",
        opponentRank: "12:e av 16",
        note: "Twelve: Hammarby skapar klart mest xG. Elfsborg svagt offensivt (13:e i attackfasen).",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "20,09",
        hammarbyRank: "1:a av 16",
        opponentValue: "10,00",
        opponentRank: "16:e av 16",
        note: "Hammarby har dubbelt så hög skottvolym – Elfsborg sist i ligan.",
      },
      {
        label: "Bollinnehav (%)",
        hammarbyValue: "59,4%",
        hammarbyRank: "1:a av 16",
        opponentValue: "45,6%",
        opponentRank: "14:e av 16",
        note: "Hammarby styr matchen med bollen. Elfsborg accepterar underläge.",
      },
      {
        label: "Defensiv transition (Twelve)",
        hammarbyValue: "13,4% recovery within 5s",
        hammarbyRank: "1:a av 16",
        opponentValue: "11% recovery within 5s",
        opponentRank: "3:a av 16 (fasrank)",
        note: "Hammarby counterpressar bäst i ligan. Elfsborg är starka organiskt men långsammare att återerövra (3:a i fasen).",
      },
      {
        label: "PPDA (press)",
        hammarbyValue: "4,19",
        hammarbyRank: "1:a av 16",
        opponentValue: "7,20",
        opponentRank: "~12:e av 16",
        note: "Hammarby pressar hårdast i ligan. Elfsborgs passiva block ger oss tid – men de är disciplinerade bakom bollen.",
      },
      {
        label: "Field tilt (Twelve)",
        hammarbyValue: "69,6%",
        hammarbyRank: "1:a av 16",
        opponentValue: "46%",
        opponentRank: "~10:e av 16",
        note: "Hammarby dominerar territorium totalt. Elfsborg accepterar att spela på sin planhalva.",
      },
      {
        label: "Boxberöringar (Twelve)",
        hammarbyValue: "28,82/match",
        hammarbyRank: "1:a av 16",
        opponentValue: "15,82/match",
        opponentRank: "~12:e av 16",
        note: "Hammarby når boxen nästan dubbelt så ofta per match enligt Twelve.",
      },
      {
        label: "Motst. xG (Twelve)",
        hammarbyValue: "1,45/match",
        hammarbyRank: "9:e av 16",
        opponentValue: "1,25/match",
        opponentRank: "6:e av 16",
        note: "Hammarbys defensiva svaghet 2026 – släpper mer än fjolåret. Elfsborg begränsar motståndarchanser väl.",
      },
      {
        label: "Tabellplacering",
        hammarbyValue: "17p",
        hammarbyRank: "4:a av 16",
        opponentValue: "18p",
        opponentRank: "3:a av 16",
        note: "Elfsborg en poäng före Hammarby. Sirius leder (28p), Häcken 2:a (20p).",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 5, opponentConcededGoals: 1 },
      { window: "46-60", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "61-75", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 2 },
    ],
    goalTypeNotes: [
      {
        label: "Elfsborgs andra halvlek",
        value: "11 av 16 mål (46-90+)",
        interpretation:
          "Elfsborg vaknar efter paus – Hammarby måste hålla intensiteten hela matchen, inte bara första 45.",
      },
      {
        label: "Elfsborgs låga skottvolym",
        value: "10,0 avslut/match · 9,91 np-skott (Twelve)",
        interpretation:
          "Begränsa deras få chanser så räcker det – de skapar sällan men är effektiva (1,27 np-mål).",
      },
      {
        label: "Hammarbys målprofil",
        value: "5 mål 31-45+ och 5 mål 46-60",
        interpretation:
          "Hammarby gör flest mål strax före och efter paus – pressa hårt i dessa fönster.",
      },
      {
        label: "Elfsborgs defensiva kvalitet",
        value: "Opp. np xG 1,25/match · 1,00 insläppta/match",
        interpretation:
          "Elfsborg släpper lite trots att motståndare får passa – de begränsar chanskvalitet, inte bara volym.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Exploatera field tilt-fördelen (70% vs 46%). Elfsborg pressar passivt (PPDA 7,20) – bygg lugnt och dra isär deras kompakta block.",
        "Attackera brett och centralt. Elfsborg når boxen bara 17% av gångerna från sista tredjedelen – deras mittfält stängs, men ytorna öppnas vid snabba riktningsbyten.",
        "Rydström bör utnyttja Hammarbys Twelve-ledarskap: 1:a i xG (2,16), boxberöringar (28,8/match) och avslut (20,2). Sikta på 4+ HQ-skott.",
        "Hammarbys 28,8 boxberöringar/match (Twelve) mot Elfsborgs 15,8 – volymfördelen ska skapa tryck. Tålamod tills luckor öppnas.",
        "Undvik onödiga risker centralt. Elfsborgs defensiva transition (3:a) straffar slarv – men Hammarby har ligans bästa counterpress (13,4% recovery within 5s).",
      ],
      withoutBall: [
        "Press med Hammarbys PPDA 4,19 (1:a i ligan) mot Elfsborgs 7,20. Stör uppspelet – Elfsborg tappar bollen 30,91 gånger/match men organiserar sig snabbt (11% recovery within 5s).",
        "Stäng av Zeneli och Östman – deras främsta målskyttar. Östman har 4 mål på 2,21 xG, Zeneli 3 mål.",
        "Elfsborg slår sällan till i första halvlek (5 av 16 mål före paus) – men 11 mål efter paus. Rydström: instruera om halvtidsjusteringar.",
        "Begränsa Elfsborgs få omställningar. Deras xG (1,36) och xT (1,24) per match är låga – ge dem INGA lätta kontringar.",
        "Holmén avstängd – testa att attackera deras alternativa mittbackskombination.",
      ],
      matchManagement: [
        "Bortamatch i Borås – men Hammarby vann senast 0-2 (2025) med dominant bollinnehav. Spela vårt spel.",
        "Elfsborg har bara 1 förlust på 11 matcher – det här blir ett tålamodsprov. Rydström får inte låta frustration leda till öppen match.",
        "Vid ledning: Elfsborg måste jaga (45% bollinnehav normalt) – kontrollera tempot och utnyttja deras högre positionering.",
        "Vid oavgjort sent: Elfsborg gör 4 mål 76-90+ – stäng matchen defensivt, de är farliga i slutminuterna.",
        "Rydströms första riktiga test – resultatet sätter tonen för höstsäsongen. En seger här bekräftar att tränarbytet fungerar.",
      ],
    },
    glossary: [
      {
        term: "Defensiv transition",
        explanation:
          "Vad som händer direkt efter bolltapp. Elfsborgs styrka (3:a i ligan): de begränsar motståndarens kontringar till 0,21 xG inom 10 sekunder.",
      },
      {
        term: "PPDA",
        explanation:
          "Passes Per Defensive Action – lägre = hårdare press. Elfsborgs 7,20 innebär att de sällan pressar högt.",
      },
      {
        term: "Field tilt",
        explanation:
          "Andel av bollinnehavet i sista tredjedelen. Elfsborgs 46% visar att de inte dominerar territorium.",
      },
      {
        term: "xP (expected Points)",
        explanation:
          "Förväntade poäng baserat på matchprestationer. Elfsborg har 1,64 faktiska poäng vs 1,55 xP – marginell överavkastning.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder efter bolltapp. Hammarby leder ligan med 13,4%. Elfsborg har 11%.",
      },
      {
        term: "Rydström-special",
        explanation:
          "Henrik Rydström tillträdde som Hammarbys huvudtränare våren 2026. Elfsborg borta blir ett tidigt test av hans spelmodell.",
      },
    ],
  },
  {
    round: 12,
    roundLabel: "Omgång 12",
    hidden: true,
    fixture: "Hammarby - Kalmar FF",
    dateLabel: "12 juli 2026 · Tre Arena",
    venueLabel: "Hemma · Tre Arena",
    oneLineSummary:
      "Hammarby hemma mot ett Kalmar-lag utan bortasegrar. HIF leder i xG och skottvolym.",
    introStats: [
      { label: "Tabell", value: "HIF 2:a · 20p", tone: "emerald" },
      { label: "Tabell", value: "Kalmar 12:e · 13p", tone: "amber" },
      { label: "Kalmar borta 2026", value: "0 segrar · 5 matcher", tone: "amber" },
      { label: "xG / match", value: "HIF 2,22 · Kalmar 1,48", tone: "blue" },
    ],
    mobileTakeaways: [
      "Hammarby 2:a (20p, 26-14), Kalmar 12:e (13p, 14-15) efter 11–12 omgångar.",
      "Kalmar: 0 segrar på 5 bortamatcher – men 3V-1O-1F hemma. Tre Arena ska pressa deras bortaprofil.",
      "Twelve: Kalmar np xG 1,49 men bara 1,27 mål – underpresterar (xP 1,50 vs 1,18 poäng/match).",
      "Kalmar når boxen effektivt (28% final third to box) men skjuter försiktigt (box to shot 58%).",
      "Hammarby: 1:a i skott (19,9/match), boxberöringar (28,7) och shot assists (12,0). PPDA 4,19 vs Kalmar 6,15.",
      "Kalmar släpper in 5 mål 0-15 och 5 mål 76-90+ – sårbara i inledning och slutskede.",
      "Hammarby gör flest mål 46-60 (6) – tryck direkt efter paus.",
      "Inbördes: HIF 4V-1O senaste 5 möten. Senast 3-1 hemma (2024).",
    ],
    playersToWatch: [
      {
        name: "Charles Sagoe Jr",
        position: "Forward",
        stats: [
          { label: "Assist", value: "7" },
          { label: "Nyckelpass", value: "17" },
          { label: "Dribblingar", value: "82" },
        ],
        threat: "Främsta chanskapare via kant och 1v1",
        motivation:
          "Högst dribblingsvolym i truppen. Ytterbackar måste stå tight och inte ge yta att vända inåt.",
      },
      {
        name: "Charlie Rosenqvist",
        position: "Forward",
        stats: [
          { label: "Mål", value: "5" },
          { label: "xG", value: "2,52" },
          { label: "Avslut", value: "16" },
        ],
        threat: "Primär målskytt och avslutare i boxen",
        motivation:
          "Tar de bästa lägena framför mål. Farlig vid fasta situationer och andrabollar.",
      },
      {
        name: "Rony Jansson",
        position: "Defender",
        stats: [
          { label: "Mål", value: "3" },
          { label: "Assist", value: "2" },
          { label: "Prog. pass", value: "108" },
        ],
        threat: "Driver uppspelet från defensiven",
        motivation:
          "Flest progressiva pass i laget. Pressa honom tidigt – annars hittar han Sagoe mellan linjerna.",
      },
    ],
    dataSources: [
      "Twelve säsongrapport Kalmar (delad): https://earpiece.twelve.football/shared-reports/c3893c0f-c0db-4223-9f9f-1eb629c6b774 (8 juli 2026)",
      "Twelve säsongdata Hammarby 2026: hammarbySeasonAnalysisData.ts (12 omgångar)",
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 8 juli 2026)",
      "Bolldata spelardata: https://bolldata.se/spelardata (hämtad 8 juli 2026)",
      "Bolldata API: team-advanced + goals för Allsvenskan 2026 (rättad 8 juli 2026 – skott på mål via spelardata)",
      "Bolldata API: senaste 5 inbördes möten Hammarby-Kalmar (hämtad 8 juli 2026)",
    ],
    headToHead: {
      sampleSize: 5,
      description:
        "Senaste 5 inbördes möten: Hammarby 4 segrar, 1 oavgjord. 14-5 i mål. Senaste hemmamötet på Tre Arena: 3-1 till HIF (mars 2024).",
      summaryCards: [
        {
          title: "Senaste 5 möten",
          value: "4V-1O-0F (HIF)",
          note: "14-5 i mål. Hammarby obesegrade i perioden.",
          tone: "emerald",
        },
        {
          title: "Senaste på Tre Arena",
          value: "3-1 (mars 2024)",
          note: "Hammarby vann hemma med 13-10 i avslut.",
          tone: "emerald",
        },
        {
          title: "Den här matchen",
          value: "Hemma för HIF",
          note: "Kalmar har 0 bortasegrar 2026 (0V-0O-5F). Hammarby hemma: 13p, +15 målskillnad.",
          tone: "blue",
        },
      ],
      trendBullets: [
        "Hammarby har vunnit 4 av 5 senaste mötena (ett 0-0 aug 2023).",
        "Senaste bortamötet: 4-1 till HIF (aug 2024).",
        "På Tre Arena senast: 3-1 till Hammarby (mars 2024).",
      ],
      matches: [
        {
          date: "2024-08-04",
          fixture: "Kalmar FF - Hammarby",
          result: "1-4",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 4,
          opponentGoals: 1,
          hammarbyXg: 0,
          opponentXg: 0,
          hammarbyShots: 18,
          opponentShots: 13,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-08-04/kalmar-hammarby-1-4",
        },
        {
          date: "2024-03-31",
          fixture: "Hammarby - Kalmar FF",
          result: "3-1",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 1,
          hammarbyXg: 0,
          opponentXg: 0,
          hammarbyShots: 13,
          opponentShots: 10,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2024/2024-03-31/hammarby-kalmar-3-1",
        },
        {
          date: "2023-08-20",
          fixture: "Kalmar FF - Hammarby",
          result: "0-0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0,
          opponentXg: 0,
          hammarbyShots: 8,
          opponentShots: 3,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-08-20/kalmar-hammarby-0-0",
        },
        {
          date: "2023-07-16",
          fixture: "Hammarby - Kalmar FF",
          result: "3-1",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 1,
          hammarbyXg: 0,
          opponentXg: 0,
          hammarbyShots: 12,
          opponentShots: 15,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2023/2023-07-16/hammarby-kalmar-3-1",
        },
        {
          date: "2022-10-30",
          fixture: "Hammarby - Kalmar FF",
          result: "4-2",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 4,
          opponentGoals: 2,
          hammarbyXg: 0,
          opponentXg: 0,
          hammarbyShots: 15,
          opponentShots: 9,
          sourceUrl:
            "https://bolldata.se/allsvenskan/matcher/2022/2022-10-30/hammarby-kalmar-4-2",
        },
      ],
    },
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a · 20p · 26-14. Ligaledare i xG, field tilt och PPDA. Vann senast 2-1 borta mot Elfsborg.",
        tone: "emerald",
      },
      {
        title: "Kalmar FF just nu",
        body: "12:e · 13p · 14-15. 0 segrar borta (5 matcher). Stark hemma: 3V-1O-1F. Förtjänar fler poäng (xP 1,50).",
        tone: "amber",
      },
      {
        title: "Nyckelkamp: volym vs effektivitet",
        body: "HIF:s skottvolym (19,9/match) mot Kalmar FF:s box-penetration (28%). Pressa högt – deras bortaprofil är svag.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Twelve: Kalmar spelar metodiskt med 49% bollinnehav och 52% field tilt – de bygger tålmodigt men saknar explosivitet i anfall.",
      "Kalmar når boxen effektivt: 28% av sista-tredjedel-possessioner når straffområdet (över snitt) men konverterar bara 58% av boxberöringar till skott.",
      "Lågt passtempo (18,97) och försiktig avslutning – np xG 1,49 men bara 1,27 np-mål. De skapar men avslutar inte tillräckligt aggressivt.",
      "Defensivt: PPDA 6,15 och defensiv intensitet 5,50 – mer reaktiv än Hammarby. DAH 42,47 m, de pressar ibland högt men vinner bara 60% av defensiva dueller.",
      "Twelve: Kalmar återerövrar snabbt (12% recoveries within 5s) och begränsar motståndarens xG inom 10s efter recovery till 0,27 – solid defensiv transition.",
      "Bortaprofil: 0 segrar på 5 bortamatcher, 2,20 insläppta/match borta. Hemma: 3 segrar och bara 0,80 insläppta/match.",
    ],
    styleProfile: [
      {
        label: "Box-penetration (Twelve)",
        value: "28% final third to box · 24,4 box touches/match",
        score: 78,
        explanation:
          "Kalmar FF når straffområdet effektivt från sista tredjedelen – deras främsta anfallsvapen trots låg skottvolym.",
      },
      {
        label: "Avslutseffektivitet (Twelve)",
        value: "np Goals 1,27 vs np xG 1,49 · box to shot 58%",
        score: 45,
        explanation:
          "Kalmar FF skapar chanser men konverterar under förväntan – patient men försiktig avslutning.",
      },
      {
        label: "Bortaprofil (Bolldata)",
        value: "0V-0O-5F borta · 2,20 insläppta/match",
        score: 20,
        explanation:
          "Kalmar FF har inte vunnit en enda bortamatch 2026. Hammarby hemma ska utnyttja detta.",
      },
      {
        label: "Press & intensitet (Twelve)",
        value: "PPDA 6,15 · def. intensitet 5,50",
        score: 50,
        explanation:
          "Mer reaktiv press än Hammarby (4,19). Motståndare får tid på bollen om Hammarby bygger lugnt.",
      },
      {
        label: "Defensiv transition (Twelve)",
        value: "12% recoveries within 5s · opp. xG inom 10s: 0,27",
        score: 72,
        explanation:
          "Kalmar FF återerövrar snabbt efter bolltapp och begränsar kontringar – Hammarby måste vara skarpa i omställningarna.",
      },
    ],
    spiderComparison: [
      {
        label: "xG / match",
        hammarbyValue: "2,22",
        opponentValue: "1,48",
        hammarbyScore: 100,
        opponentScore: 67,
        note: "Hammarby skapar 50% mer xG per match enligt Bolldata-spelardata.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "19,92",
        opponentValue: "13,55",
        hammarbyScore: 100,
        opponentScore: 68,
        note: "Hammarby skjuter 47% mer – Kalmar FF förlitar sig på färre men mer utvalda lägen.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,33",
        opponentValue: "4,82",
        hammarbyScore: 100,
        opponentScore: 76,
        note: "Hammarby 2:a i ligan (6,33/match). Kalmar 8:e – HIF har högre volym, Kalmar något bättre träffprocent per skott.",
      },
      {
        label: "Boxberöringar / match",
        hammarbyValue: "28,67",
        opponentValue: "25,55",
        hammarbyScore: 100,
        opponentScore: 89,
        note: "Båda lagen når boxen ofta – Kalmar FF 3:a i ligan i denna kategori.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,17",
        opponentValue: "4,91",
        hammarbyScore: 100,
        opponentScore: 95,
        note: "Nästan jämnt – Sagoe Jr driver Kalmar FF:s kreativitet med 17 nyckelpass totalt.",
      },
      {
        label: "Progressiva passningar / match",
        hammarbyValue: "73,92",
        opponentValue: "70,55",
        hammarbyScore: 100,
        opponentScore: 95,
        note: "Kalmar FF har hög progressionsvolym via Rony Jansson och mittfältet.",
      },
      {
        label: "Återerövringar / match",
        hammarbyValue: "91,67",
        opponentValue: "84,73",
        hammarbyScore: 100,
        opponentScore: 92,
        note: "Hammarby återerövrar oftare – viktigt mot Kalmar FF:s snabba recoveries (12% inom 5s).",
      },
      {
        label: "Field tilt (Twelve)",
        hammarbyValue: "70%",
        opponentValue: "52%",
        hammarbyScore: 100,
        opponentScore: 74,
        note: "Hammarby dominerar territorium. Kalmar FF runt ligasnittet.",
      },
      {
        label: "PPDA (Twelve)",
        hammarbyValue: "4,19",
        opponentValue: "6,15",
        hammarbyScore: 100,
        opponentScore: 68,
        note: "Hammarby pressar betydligt hårdare – Kalmar FF mer reaktiv.",
      },
      {
        label: "Gjorda mål (totalt)",
        hammarbyValue: "26",
        opponentValue: "14",
        hammarbyScore: 100,
        opponentScore: 54,
        note: "Hammarby har nästan dubbelt så många mål efter 11–12 omgångar.",
      },
      {
        label: "Bollinnehav (Twelve)",
        hammarbyValue: "59%",
        opponentValue: "49%",
        hammarbyScore: 100,
        opponentScore: 83,
        note: "Hammarby styr bollen mer – Kalmar FF accepterar underläge men bygger metodiskt.",
      },
    ],
    rankedMetrics: [
      {
        label: "xG / match",
        hammarbyValue: "2,22",
        hammarbyRank: "2:a av 16",
        opponentValue: "1,48",
        opponentRank: "9:e av 16",
        note: "Hammarby skapar klart mest xG. Kalmar FF medelmåttigt offensivt men når boxen effektivt.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "19,92",
        hammarbyRank: "1:a av 16",
        opponentValue: "13,55",
        opponentRank: "7:e av 16",
        note: "Hammarby har ligans högsta skottvolym – Kalmar FF i övre halvan.",
      },
      {
        label: "Boxberöringar / match",
        hammarbyValue: "28,67",
        hammarbyRank: "1:a av 16",
        opponentValue: "25,55",
        opponentRank: "3:e av 16",
        note: "Kalmar FF når boxen oftare än tabellplaceringen antyder.",
      },
      {
        label: "PPDA",
        hammarbyValue: "4,19",
        hammarbyRank: "1:a av 16",
        opponentValue: "6,15",
        opponentRank: "~9:e av 16",
        note: "Hammarby pressar intensivast. Kalmar FF ger motståndare mer tid.",
      },
      {
        label: "Field tilt (%)",
        hammarbyValue: "70%",
        hammarbyRank: "1:a av 16",
        opponentValue: "52%",
        opponentRank: "~8:e av 16",
        note: "Hammarby dominerar sista tredjedelen. Kalmar FF runt snittet.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,33",
        hammarbyRank: "2:a av 16",
        opponentValue: "4,82",
        opponentRank: "8:e av 16",
        note: "Aggregerat från Bolldata spelardata. Hammarby har fler skott på mål per match tack vare högre skottvolym.",
      },
      {
        label: "xP vs faktiska poäng",
        hammarbyValue: "1,55 xP",
        hammarbyRank: "~4:e av 16",
        opponentValue: "1,50 xP (1,18 p/match)",
        opponentRank: "~9:e av 16",
        note: "Twelve: Kalmar FF förtjänar fler poäng – de underpresterar resultatmässigt.",
      },
    ],
    goalWindows: [
      { window: "0-15", hammarbyGoals: 3, opponentConcededGoals: 5 },
      { window: "16-30", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31-45+", hammarbyGoals: 5, opponentConcededGoals: 1 },
      { window: "46-60", hammarbyGoals: 6, opponentConcededGoals: 0 },
      { window: "61-75", hammarbyGoals: 5, opponentConcededGoals: 2 },
      { window: "76-90+", hammarbyGoals: 4, opponentConcededGoals: 5 },
    ],
    goalTypeNotes: [
      {
        label: "Kalmar FF:s bortaprofil",
        value: "0V-0O-5F borta · 2,20 insläppta/match",
        interpretation:
          "Kalmar FF har inte vunnit borta 2026 (5 förluster). Hammarby hemma (13p, +15 målskillnad) ska utnyttja detta från första minuten.",
      },
      {
        label: "Kalmar FF:s sårbara fönster",
        value: "5 insläppta 0-15 och 5 insläppta 76-90+",
        interpretation:
          "Kalmar FF släpper in mål tidigt och sent – Hammarby bör trycka hårt i inledning och stänga matchen defensivt sent.",
      },
      {
        label: "Hammarbys målprofil",
        value: "6 mål 46-60 och 5 mål 31-45+",
        interpretation:
          "Hammarby gör flest mål strax före och direkt efter paus – Rydström bör instruera om halvtidsintensitet.",
      },
      {
        label: "Kalmar FF:s anfall",
        value: "np xG 1,49 · box to shot 58% (Twelve)",
        interpretation:
          "Kalmar FF når boxen men avslutar försiktigt – begränsa deras få men kvalitativa chanser så räcker det.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Exploatera field tilt-fördelen (70% vs 52%). Kalmar FF pressar reaktivt (PPDA 6,15) – bygg lugnt och dra isär deras mittblock.",
        "Attackera brett och centralt. Kalmar FF når boxen via både inlägg och carries – stäng halvrummen och tvinga dem ut på kanten.",
        "Hammarbys 19,9 avslut/match mot Kalmar FF:s 13,6 – volymfördelen ska skapa tryck. Sikta på 20+ avslut och 4+ HQ-skott.",
        "Pressa Kalmar FF:s uppspel via Rony Jansson. Tvinga långa bollar – deras bortaprofil (0 segrar) visar att de tappar kontroll utanför hemmaborgen.",
        "Utnyttja målfönstren 0-15 och 46-60 där Kalmar FF släppt in flest mål (5 respektive 0 – men Hammarby gör 6 mål 46-60).",
      ],
      withoutBall: [
        "Press med Hammarbys PPDA 4,19 mot Kalmar FF:s 6,15. Stör uppspelet – men respektera deras 12% recoveries within 5s.",
        "Stäng av Sagoe Jr och Rosenqvist – deras främsta chanskapare (7 assist respektive 5 mål). Särskilt Sagoe Jr:s dribblingar (82 försök).",
        "Kalmar FF gör 4 av 14 mål 46-60 – farliga efter paus trots lågt passtempo. Håll intensiteten i andra halvlek.",
        "Begränsa Rony Janssons progressiva passningar (108 totalt). Pressa honom tidigt – annars hittar han Sagoe mellan linjerna.",
        "Kalmar FF släpper till 1,19 opp. np xG/match (Twelve) – solid defensivt men sårbara 0-15 och 76-90+.",
      ],
      matchManagement: [
        "Hemmamatch på Tre Arena – Hammarby har 13p och +15 målskillnad hemma 2026. Spela på hemmafördelen.",
        "Kalmar FF har xP 1,50 men bara 1,18 poäng/match – de förtjänar mer. Undvik att ge dem gratis mål.",
        "Vid ledning: Kalmar FF jagar med metodiskt uppspel – kontrollera tempot och utnyttja omställningar mot deras höga positionering.",
        "Vid oavgjort sent: Kalmar FF släpper in 5 mål 76-90+ – stäng matchen defensivt, de är farliga i slutminuterna.",
        "Efter Elfsborg-segern (2-1 borta): Rydström har momentum – Kalmar borta på Tre Arena är en match Hammarby ska vinna på papperet.",
      ],
    },
    glossary: [
      {
        term: "Final third to box",
        explanation:
          "Andel av possessioner i sista tredjedelen som når straffområdet. Kalmar FF:s 28% visar effektiv box-penetration.",
      },
      {
        term: "Box to shot",
        explanation:
          "Andel av boxberöringar som blir avslut. Kalmar FF:s 58% (Twelve) visar försiktig avslutning.",
      },
      {
        term: "PPDA",
        explanation:
          "Passes Per Defensive Action – lägre = hårdare press. Kalmar FF:s 6,15 innebär mer reaktiv press än Hammarby.",
      },
      {
        term: "xP (expected Points)",
        explanation:
          "Förväntade poäng baserat på matchprestationer. Kalmar FF har 1,50 xP men bara 1,18 faktiska poäng – underpresterar.",
      },
      {
        term: "Recovery within 5s",
        explanation:
          "Andel bollåtervinningar inom 5 sekunder efter bolltapp. Kalmar FF:s 12% visar snabb counterpress.",
      },
      {
        term: "Progressiva passningar",
        explanation:
          "Passningar som driver bollen framåt minst 10 meter mot motståndarens mål. Rony Jansson leder Kalmar FF med 108.",
      },
    ],
  },
  {
    round: 13,
    hidden: true,
    roundLabel: "Omgång 13",
    fixture: "Hammarby IF - Degerfors IF",
    dateLabel: "19 juli 2026 · 3Arena",
    venueLabel: "Hemma · 3Arena",
    oneLineSummary:
      "🚫 Netabay (CM) & Fritzson (10:a) AVSTÄNGDA – Degerfors förlorar halva sitt mittfält. Pressar högt (DAH 42,4m) men skapar ingenting (np xG 1,04, sämst). 3Arena avgör.",
    introStats: [
      { label: "Tabell", value: "HIF 2:a · 23p", tone: "emerald" },
      { label: "Tabell", value: "Degerfors 13:e · 10p", tone: "amber" },
      { label: "🚫 Avstängda", value: "Netabay + Fritzson", tone: "amber" },
      { label: "DIF press (Twelve)", value: "DAH 42,4m (4:e)", tone: "blue" },
    ],
    mobileTakeaways: [
      "🚫 Netabay (CM/press) och Fritzson (10:a, 11 matcher) BÅDA AVSTÄNGDA – Degerfors förlorar hela sin mittfältsmotor.",
      "Hammarby 2:a (23p), Degerfors 13:e (10p). Tabellgap 13 poäng.",
      "Hög press (DAH 42,4m, 4:e) men kan inte ta sig in i boxen – final third to box% 16 (sämst). Kontringshotet kvarstår: 1,83s till framåtpass.",
      "Degerfors mål: 10 av 12 i 2H, 5 sent (76–90+). Aldrig av defensivt.",
      "Bästa fönstret: 46–60' (HIF 6 mål, DIF 4 insläppta). Tryck hårt direkt efter paus.",
    ],
    trafficLightCards: [
      {
        metric: "np xG per match (Twelve)",
        bigNumber: "1,04",
        badge: "SÅRBAR",
        color: "red",
        rankNote: "16:e av 16 · final third to box% 16 (16:e) · 0,10 xG/skott (16:e)",
        explanation:
          "Sämst i ligan offensivt. Trots 51% field tilt tar de sig knappt in i boxen – final third to box% 16% (sämst). 50% av skotten utifrån, extremt låg skottkvalitet. Utan Fritzson (10:a) tappar de ytterligare kreativitet.",
        podcastComment:
          "De skapar ingenting. Utan Fritzson på 10:an är det ännu sämre. Vi kan spela trygg defensivt och lägga energin på att slå igenom deras press.",
      },
      {
        metric: "Defensiv aktionshöjd (Twelve)",
        bigNumber: "42,4m",
        badge: "FARA/STYRKA",
        color: "green",
        rankNote: "4:e av 16 · PPDA 5,98 (7:e) · def. dueller 65,1% vunna (2:a!)",
        explanation:
          "Pressar HÖGT – inte ett låg-block. DAH 42,4m (4:e), PPDA 5,98 (7:e), vinner 65,1% av defensiva dueller (2:a i ligan). Snabbast att återta bollen (8,73s) och kontrerar direkt (1,83s till framåtpass). Utan Netabay tappar pressorganisationen sin dirigent.",
        podcastComment:
          "De pressar högt och vinner dueller – kan inte rulla lugnt bakifrån. Snabba, direkta val är nyckeln. Men utan Netabay är pressen okoordinerad.",
      },
      {
        metric: "Field Tilt % (Twelve)",
        bigNumber: "51%",
        badge: "MEDEL",
        color: "yellow",
        rankNote: "6:e av 16 · xPoints 1,13 vs 0,91 faktiska · borta: 6p (11:e)",
        explanation:
          "Förvånande 51% field tilt (6:e) – aktiv spelstil via hög press. Underpresterar resultatatmässigt (xP 1,13 vs 0,91 faktiska). Bättre borta (6p, 11:e) än hemma (5p, 14:e).",
        podcastComment:
          "51% field tilt trots 13:e plats – ett aktivt lag som kan tappa luften sent. Energikrävande stil, vi utnyttjar det i 2H.",
      },
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a · 23p · 28-14. Ligaledare i xG, avslut och bollinnehav. Dominant hemma (5V-1O-1F, 22-5) – starkast hemma i hela ligan.",
        tone: "emerald",
      },
      {
        title: "🚫 Degerfors – utan Netabay & Fritzson",
        body: "13:e · 10p · 12-19. Dubbel-avstängning: Netabay (CM/press) och Fritzson (10:a, 11 matcher) spelar inte. Halva mittfältet borta.",
        tone: "amber",
      },
      {
        title: "Taktisk fördel",
        body: "Utan Fritzson (10:a) tappar de sin kreative ledare. Utan Netabay tappas pressorganisationen. Utnyttja kaos i deras mittfält med tempo.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Hög press (DAH 42,4m, 4:e) – INTE låg-block. 16% av återerövringarna i motståndarens sista tredjedel. PPDA 5,98 (7:e), def. dueller 65,1% vunna (2:a).",
      "Snabb konter: snabbast i ligan att återta bollen (8,73s, 1:a) och 1,83s till framåtpassning. 69% av passningarna framåt direkt efter återerövrings.",
      "Inkörning via inlägg: 37% av boxinträden via kors. Men final third to box% 16 (sämst) – pressar högt men skapar lite inne i boxen.",
      "Mål: 10 av 12 i 2H, 5 i 76–90+. Alla 12 inifrån boxen, 4 via huvud. Direktstil – 50% av skotten utifrån.",
      "🚫 Netabay (CM, press) och Fritzson (10:a, 11 matcher) AVSTÄNGDA. Halva mittfältet borta inför denna match.",
    ],
    styleProfile: [
      {
        label: "Hög press (DAH, Twelve)",
        value: "42,42m · 4:e av 16 · PPDA 5,98 (7:e)",
        score: 83,
        explanation:
          "Degerfors pressar högt och aggressivt. 4:e i ligan i defensiv aktionshöjd, 7:e i PPDA. Hammarby måste spela snabbt och direkt under press.",
      },
      {
        label: "Defensiva dueller (Twelve)",
        value: "65,1% vunna · 2:a av 16",
        score: 92,
        explanation:
          "2:a i ligan i defensiva dueller vunna. Extremt kompetenta 1-mot-1 och i närkamper. HIF:s bärare och löpare måste räkna med starka utmaningar.",
      },
      {
        label: "Bortaprofil 2026",
        value: "1V-3O-1F · +2 GD borta",
        score: 52,
        explanation:
          "11:e i bortatabellen. Sitter djupt och räknar med att hämta en poäng i taget borta.",
      },
      {
        label: "Anfallspenetration (Twelve)",
        value: "Final third to box: 16% · 16:e (sämst)",
        score: 10,
        explanation:
          "Trots 51% field tilt och aktiv spelstil kan Degerfors INTE ta sig in i boxen. 16% final third to box = sämst i hela ligan. Deras skott är låg-kvalitet: 0,10 np xG/shot (sämst). De avlossar gärna utifrån.",
      },
      {
        label: "Konterings-hastighet (Twelve)",
        value: "1,83s till framåtpass · 8,73s till återerövrings (1:a!)",
        score: 75,
        explanation:
          "Snabbaste laget i ligan att återta bollen (8,73s). Kontrerar direkt: 1,83s till framåtpassning, 69% av passningarna framåt efter återerövrings. Hammarby förlorar INTE bollen högt upp utan att konsekvenser.",
      },
    ],
    spiderComparison: [
      {
        label: "xG / match",
        hammarbyValue: "2,19",
        opponentValue: "0,95",
        hammarbyScore: 100,
        opponentScore: 43,
        note: "Hammarby skapar 2,3× mer xG per match. Degerfors absolut sämst i ligan.",
      },
      {
        label: "Avslut / match",
        hammarbyValue: "19,77",
        opponentValue: "9,92",
        hammarbyScore: 100,
        opponentScore: 50,
        note: "Hammarby skjuter dubbelt så mycket per match.",
      },
      {
        label: "Field Tilt % (Twelve)",
        hammarbyValue: "~70%",
        opponentValue: "51%",
        hammarbyScore: 100,
        opponentScore: 73,
        note: "DIF har överraskande 51% field tilt (6:e) via hög press. Hammarby ~1:a i ligan.",
      },
      {
        label: "Nyckelpassningar / match",
        hammarbyValue: "5,15",
        opponentValue: "2,33",
        hammarbyScore: 100,
        opponentScore: 45,
        note: "Hammarby skapar 2× fler nyckelpass. Degerfors sämst i ligan.",
      },
      {
        label: "Gjorda mål",
        hammarbyValue: "28",
        opponentValue: "12",
        hammarbyScore: 100,
        opponentScore: 43,
        note: "Hammarby med 2,3× fler mål. Stark offensiv överlägsenhet.",
      },
      {
        label: "PPDA (Twelve · lägre = bättre press)",
        hammarbyValue: "~4,19",
        opponentValue: "5,98",
        hammarbyScore: 100,
        opponentScore: 70,
        note: "HIF pressar intensivast i ligan. DIF pressar solid (7:e) – INTE passivt. Notera: lägre PPDA = bättre press.",
      },
      {
        label: "Skott på mål / match",
        hammarbyValue: "6,85",
        opponentValue: "2,92",
        hammarbyScore: 100,
        opponentScore: 43,
        note: "Hammarby 2:a i ligan, Degerfors sämst (16:e).",
      },
      {
        label: "Faktiska poäng",
        hammarbyValue: "23p",
        opponentValue: "10p",
        hammarbyScore: 100,
        opponentScore: 43,
        note: "HIF 2:a i tabellen (1,77 p/match) mot Degerfors 13:e (0,83 p/match).",
      },
    ],
    rankedMetrics: [
      {
        label: "np xG / match (Twelve)",
        hammarbyValue: "~2,2",
        hammarbyRank: "1:a av 16",
        opponentValue: "1,04",
        opponentRank: "16:e av 16",
        note: "Degerfors absolut sämst. Trots aktiv spelstil skapar de ingenting farligt – 0,10 xG/skott (sämst).",
      },
      {
        label: "Final third to box % (Twelve)",
        hammarbyValue: "hög",
        hammarbyRank: "~1:a av 16",
        opponentValue: "16%",
        opponentRank: "16:e av 16",
        note: "Degerfors allra sämst på att ta sig från sista tredjedelen in i boxen. 51% field tilt men kan inte penetrera.",
      },
      {
        label: "Defensiv aktionshöjd / DAH (Twelve)",
        hammarbyValue: "~43m",
        hammarbyRank: "~3:e av 16",
        opponentValue: "42,42m",
        opponentRank: "4:e av 16",
        note: "Båda lagen pressar högt! Degerfors 4:e i ligan. Det är ett match mellan två högt pressande lag.",
      },
      {
        label: "Defensiva dueller vunna % (Twelve)",
        hammarbyValue: "55,1%",
        hammarbyRank: "1:a av 16",
        opponentValue: "65,1%",
        opponentRank: "2:a av 16",
        note: "Degerfors faktiskt BÄTTRE på defensiva dueller (65,1%, 2:a) än Hammarby (55,1%, 1:a i offensiva). HIF vinner offensiva dueller.",
      },
      {
        label: "PPDA (Twelve · lägre = hårdare press)",
        hammarbyValue: "~4,19",
        hammarbyRank: "1:a av 16",
        opponentValue: "5,98",
        opponentRank: "7:e av 16",
        note: "HIF pressar mest intensivt i ligan. DIF pressar solid (7:e) – ett aktivt, pressorienterat lag.",
      },
      {
        label: "Poäng / match",
        hammarbyValue: "1,77 (23p/13)",
        hammarbyRank: "2:a av 16",
        opponentValue: "0,83 (10p/12)",
        opponentRank: "13:e av 16",
        note: "Hammarby 2× mer poäng per match. Men DIF underpresterar – xPoints 1,13 vs 0,91 faktiska.",
      },
    ],
    goalWindows: [
      { window: "0–15'", hammarbyGoals: 4, opponentConcededGoals: 3 },
      { window: "16–30'", hammarbyGoals: 3, opponentConcededGoals: 2 },
      { window: "31–45+'", hammarbyGoals: 5, opponentConcededGoals: 3 },
      { window: "46–60'", hammarbyGoals: 6, opponentConcededGoals: 4 },
      { window: "61–75'", hammarbyGoals: 6, opponentConcededGoals: 1 },
      { window: "76–90+'", hammarbyGoals: 4, opponentConcededGoals: 4 },
    ],
    goalTypeNotes: [
      {
        label: "Degerfors offensiv profil (Bolldata + Twelve)",
        value: "12 mål – alla inifrån boxen. 4 via huvud. 37% boxinträden via inlägg.",
        interpretation:
          "Alla 12 Degerfors-mål sitter inne i straffboxen. 4 av dem är nickade. Trots att de pressar högt och har 51% field tilt kan de inte ta sig in i boxen (final third to box%: 16%, sämst). När de väl gör det korsar de helst (37% box entries from crosses). Hammarby CBs täcker nickduellar.",
      },
      {
        label: "Degerfors 2H-fokus",
        value: "10 av 12 mål gjorda i 2H (83%)",
        interpretation:
          "Nästan alla mål i andra halvlek. Degerfors sparar energi och slår till sent – 5 mål bara i 76-90+. Hammarby ska aldrig slappna av med 1-0.",
      },
      {
        label: "Degerfors sårbara tidsfönster",
        value: "46–60' (4 insläppta) och 0–15' (3 insläppta)",
        interpretation:
          "Degerfors är mest sårbar direkt efter paus och i matchens inledning. Hammarby bör starta starkt och pressa hårt i 2H-inledning.",
      },
      {
        label: "Hammarby hemma 2026",
        value: "22-5 · +17 GD (5V-1O-1F)",
        interpretation:
          "Hammarbys hemmaform är dominant – 22 gjorda och 5 insläppta på 7 hemmamatcher. Starkast hemma i hela ligan. 3Arena är ett fästning.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Spela snabbt GENOM pressen (DAH 42,4m). Direkta vertikala bollar bakom deras höga linje – utan Fritzson (10:a) saknas länken i deras mittfält.",
        "Utnyttja ytan bakom deras press. Snabba diagonaler in i djupet – de lämnar utrymme när de trycker upp.",
        "Set pieces är ett vapen: Hammarby 5:e i hörnor (+35 differens). Utan Netabay saknas deras set piece-dirigent.",
        "Tryck 0–15' (3 insläppta) och direkt efter paus 46–60' (4 insläppta, HIF:s bästa fönster med 6 mål).",
      ],
      withoutBall: [
        "Kontervakt: 1,83s till framåtpass efter återerövrings – de kontrerar DIREKT. Aldrig tappa bollen högt utan säker utväg.",
        "Täck kantspelet: 37% av deras boxinträden via inlägg. Ytterbackarna stänger inläggsmöjligheterna.",
        "Noga markering vid fasta situationer: 4 av 12 mål via huvud.",
        "Aldrig av i 2H: 10 av 12 Degerfors-mål i andra halvlek. Skärpa hela matchen.",
      ],
      matchManagement: [
        "🚫 Utan Fritzson (10:a) + Netabay (CM): kaos i mittfältet. Exploatera med tempo och direktspel från start.",
        "3Arena 2026: 22-5, starkast hemma i hela ligan.",
        "Med ledning: Håll tempot. Utan Netabay är deras pressorganisation svag – ytor öppnar sig.",
        "13 poängs tabellgap + dubbel-avstängning. Kliniskt och professionellt.",
      ],
    },
    playersToWatch: [
      {
        name: "Arman Taranis",
        position: "CF · #17",
        scoutBadge: "⚡ Hotet",
        stats: [
          { label: "Mål", value: "2" },
          { label: "Matcher", value: "8" },
          { label: "Mål/90", value: "0,68" },
        ],
        threat: "Primär målskytt – fysisk och farlig inne i boxen",
        motivation:
          "Degerfors toppskyttar (delad med Rafferty). Alla 12 mål inifrån boxen – han hittar lägen i närkamper. HIF:s CBs håller honom kort, noga i nickdueller.",
      },
      {
        name: "Daniel Sundgren",
        position: "CB · #6",
        scoutBadge: "🧭 Spelfördelaren",
        stats: [
          { label: "Assist", value: "3" },
          { label: "Mål", value: "1" },
          { label: "xA", value: "2,35" },
        ],
        threat: "Veteran-CB som driver spelet framåt och är lagets kreativa motor",
        motivation:
          "Lagets kreativa motor med 3 assist (flest i laget) och xA 2,35. Skär upp spelet från baklinjen. Pressa hans passningslinjer tidigt – han är nyckeln till det lilla de skapar.",
      },
      {
        name: "Ludvig Fritzson",
        position: "CM · 10:a · #14",
        scoutBadge: "🚫 AVSTÄNGD",
        stats: [
          { label: "Matcher", value: "11" },
          { label: "Dueller", value: "274" },
          { label: "Min", value: "1 088" },
        ],
        threat: "Kreativ 10:a, lagets mittfältsmotor – SPELAR EJ",
        motivation:
          "Fritzson (30) är Degerfors 10:a och har spelat nästan varje minut (1 088 min, 11 matcher). Med 274 dueller är han lagets mest aktiva mittfältare. Utan honom tappar de sin kreativa länk och pressorganisation – exploatera med tempo direkt.",
      },
      {
        name: "Nahom Girmai Netabay",
        position: "CM · #22",
        scoutBadge: "🚫 AVSTÄNGD",
        stats: [
          { label: "Assist", value: "2" },
          { label: "Matcher", value: "10" },
          { label: "Hörn/90", value: "2,20" },
        ],
        threat: "Pressorganisatören och set-piece-motorn – SPELAR EJ mot Hammarby",
        motivation:
          "Mittfältsmotorn i deras hög-press-system och set piece-dirigent (2,20 hörnor/90). AVSTÄNGD – utan Netabay tappas hela pressorganisationen. Hammarby exploaterar kaos i deras mittfält med snabba vertikala passningar.",
      },
    ],
    spotlightKey:
      "🚫 Netabay + Fritzson AVSTÄNGDA – spela DIREKT IGENOM deras mittfält med tempo. Utan deras pressmotor (Netabay) och kreative 10:a (Fritzson) är Degerfors okoordinerade. Tryck på 46–60' – deras mest sårbara fönster (4 insläppta) och HIF:s bästa (6 mål). Sätt 2-0 och stäng matchen.",
    headToHead: {
      sampleSize: 5,
      description:
        "Senaste 5 inbördes Allsvenska mötena. Hammarby obesegrade i 4 av 5 – 3 segrar och 1 oavgjort. Hammarby totalt 7-3 i mål över perioden.",
      summaryCards: [
        {
          title: "Senaste 5 möten",
          value: "3V – 1O – 1F",
          note: "Hammarby dominated possession in all 5 matches. Only loss away 2023.",
          tone: "emerald",
        },
        {
          title: "Mål (HIF–DIF)",
          value: "7 – 3",
          note: "Hammarby klart bäst i bollinnehav och xG i samtliga möten.",
          tone: "emerald",
        },
        {
          title: "Hemma på 3Arena",
          value: "2V – 0F",
          note: "HIF har aldrig förlorat mot Degerfors hemma i modern tid.",
          tone: "blue",
        },
      ],
      trendBullets: [
        "Hammarby vann senaste hemmamötet 1-0 (maj 2025) med 13-4 i avslut.",
        "2-1 borta vinst i Degerfors höst 2024.",
        "Enda förlusten: 1-2 borta maj 2023.",
      ],
      matches: [
        {
          date: "2025-11-03",
          fixture: "Degerfors – Hammarby",
          result: "1-1",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 1,
          opponentGoals: 1,
          hammarbyXg: 1.18,
          opponentXg: 0.71,
          hammarbyShots: 9,
          opponentShots: 5,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025",
        },
        {
          date: "2025-05-26",
          fixture: "Hammarby – Degerfors",
          result: "1-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 1,
          opponentGoals: 0,
          hammarbyXg: 1.35,
          opponentXg: 0.42,
          hammarbyShots: 13,
          opponentShots: 4,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2025",
        },
        {
          date: "2024-10-06",
          fixture: "Degerfors – Hammarby",
          result: "1-2",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 1,
          hammarbyXg: 1.72,
          opponentXg: 0.88,
          hammarbyShots: 14,
          opponentShots: 7,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024",
        },
        {
          date: "2024-04-21",
          fixture: "Hammarby – Degerfors",
          result: "2-0",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.95,
          opponentXg: 0.39,
          hammarbyShots: 16,
          opponentShots: 5,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2024",
        },
        {
          date: "2023-05-14",
          fixture: "Degerfors – Hammarby",
          result: "2-1",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 1,
          opponentGoals: 2,
          hammarbyXg: 1.44,
          opponentXg: 1.21,
          hammarbyShots: 12,
          opponentShots: 9,
          sourceUrl: "https://bolldata.se/allsvenskan/matcher/2023",
        },
      ],
    },
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 15 juli 2026 – 12–13 omgångar 2026)",
      "Bolldata spelardata: https://bolldata.se/spelardata (hämtad 15 juli 2026)",
      "Twelve säsongsrapport Degerfors 2026: https://reports.twelve.football/reports/degerfors-season-report-3KSnfQgBif.pdf (15 juli 2026)",
      "Twelve shared report Degerfors 2026 (alt. länk): https://earpiece.twelve.football/shared-reports/c9f6cba5-8699-450d-8946-cf5c87e8ebbd",
      "Degerfors IF trupp 2026: ligan.se/lag/degerfors + Transfermarkt + Flashscore (15 juli 2026)",
      "Bolldata API: historiska möten Hammarby-Degerfors (2025-05-26 och 2025-11-03)",
    ],
    glossary: [
      {
        term: "DAH – Defensiv Aktionshöjd (Twelve)",
        explanation:
          "Genomsnittlig höjd (meter från eget mål) där laget gör sina defensiva aktioner. Degerfors 42,42m (4:e) = pressen HÖGT. Visar att de INTE spelar låg-block – de är ett hög-press-lag.",
      },
      {
        term: "PPDA (Passes Per Defensive Action)",
        explanation:
          "Motståndarens passningar per defensiv aktion. Lägre = hårdare press. Degerfors 5,98 (7:e) = solid pressinglag. Hammarby ~4,19 (1:a) = ligans hårdaste press.",
      },
      {
        term: "Final third to box % (Twelve)",
        explanation:
          "Andel av possessioner i sista tredjedelen som når straffboxen. Degerfors 16% (16:e = sämst) trots 51% field tilt. Trots att de pressar högt kan de inte penetrera in i boxen.",
      },
      {
        term: "Field Tilt % (Twelve)",
        explanation:
          "Laget's andel av alla possessioner i bägge lagens sista tredjedel. Degerfors 51% (6:e) = de är territoriellt konkurrenskraftiga tack vare sin höga press och konteringsförmåga.",
      },
      {
        term: "xG per shot (np xG/shot)",
        explanation:
          "Genomsnittlig xG per icke-straff-skott. Degerfors 0,10 np xG/shot (16:e = sämst). Deras skott håller minimal kvalitet – direkta, utanför-box-avlossningar.",
      },
    ],
  },
  {
    round: 99,
    hidden: true,
    roundLabel: "EL-kval Q2 · Hinmatch",
    fixture: "Hammarby IF - Anderlecht",
    dateLabel: "Juli/Augusti 2026 · Twelve säsongsrapport Belgian Pro League 2025/26",
    venueLabel: "Hemma · 3Arena",
    oneLineSummary:
      "Anderlecht är ett belgiskt medellag (6:a, 1,38 p/match) med starkt pressingspel och exceptionell defensiv transition (2:a/16) – men svag offensiv penetration in i boxen (final third to box 21%, 13:e). Sålde nyckelspelare för €45m i sommar (De Cat €20m, Simić €15m) och får en helt ny tränare till dessa matcher. Truppvärde ~€76m vs Hammarbys €31,55m.",
    introStats: [
      { label: "Belgian Pro League", value: "6:a · 1,38 p/match", tone: "blue" },
      { label: "Truppvärde (TM)", value: "~€76m vs HIF €31,55m", tone: "amber" },
      { label: "Press (Twelve)", value: "PPDA 5,34 · 2:a av 16", tone: "blue" },
      { label: "Sommar: sålde", value: "De Cat €20m + Simić €15m + Goto €10m", tone: "amber" },
    ],
    mobileTakeaways: [
      "Truppvärde: Anderlecht ~€76m vs Hammarby €31,55m – 2,4× dyrare trupp. Belgisk Pro League är ett tydligt steg upp.",
      "Stor sommaromvälvning: sålde De Cat (€20m), Simić (€15m), Goto (€10m) = €45m ut. Ny tränare tar över inför dessa matcher – okänd taktisk profil.",
      "I ligan 25/26: hög press (PPDA 5,34, 2:a), exceptionell defensiv transition (2:a/16). Men svag boxpenetration (final third to box 21%, 13:e).",
      "Dyraste spelare: Cvetkovic (CF, 19 år, €10m), Saliba (CM, €7,5m), Ambros (AM, ny köpt för €5m), Stroeykens (AM, €4,5m).",
      "45% av skotten utifrån boxen – låg skottkvalitet trots aktivt spel. Box to shot sämst i ligan (16:e).",
      "Ny tränare = helt okänd taktisk profil. All Twelve-data speglar förra säsongens spelsystem och är osäker som prediktor.",
      "⚠️ EL-skillnad (2 matcher): pressen faller markant, mer direktspel. Offensiv transition förbättras dock (5:a/53).",
    ],
    dataSources: [
      "Twelve säsongsrapport Anderlecht – Belgian Pro League 2025/26: https://reports.twelve.football/reports/anderlecht-season-report-2Pfy5HEo4M.pdf",
      "Twelve säsongsrapport Anderlecht – UEFA EL-kval 2025 (2 matcher, litet urval): https://reports.twelve.football/reports/anderlecht-season-report-5xebc7QPQB.pdf",
      "Transfermarkt – RSC Anderlecht trupp & värden: https://www.transfermarkt.com/rsc-anderlecht/startseite/verein/58 (19 juli 2026)",
      "Transfermarkt – Hammarby IF trupp & värden: https://www.transfermarkt.com/hammarby-if/startseite/verein/1059 (19 juli 2026)",
    ],
    headToHead: {
      sampleSize: 0,
      description:
        "Hammarby IF och Anderlecht har inga kända historiska möten i UEFA-tävlingar. Detta är lagets första europeiska möte.",
      summaryCards: [
        {
          title: "Historiska möten",
          value: "Inga kända",
          note: "Första europeiska mötet för de båda lagen.",
          tone: "blue",
        },
        {
          title: "Anderlecht Pro League 25/26",
          value: "6:a · 1,38 p/match",
          note: "Genomsnittlig ligasäsong. Nedgångstrend sista 10 omgångarna.",
          tone: "amber",
        },
        {
          title: "Hammarby hemma 2026",
          value: "5V 1O 1F",
          note: "22-5 · Starkast hemma i Allsvenskan.",
          tone: "emerald",
        },
      ],
      trendBullets: [
        "Inga historiska H2H-data – första europeiska mötet.",
        "Anderlecht i belgisk liga: 6:a med 1,38 p/match, nedgångstrend sista 10 omgångar.",
        "Hammarby hemma 2026: starkast i hela Allsvenskan (22-5, 5V-1O-1F).",
        "⚠️ EL-skillnad: i Europa spelar Anderlecht med lägre press och mer direktspel (2 matcher, litet urval).",
      ],
      matches: [],
    },
    trafficLightCards: [
      {
        metric: "Defensiv transition (Twelve · liga)",
        bigNumber: "2:a / 16",
        badge: "KONTRINGSFARA",
        color: "red",
        rankNote: "30,43 bollförluster/match (1:a – minst i ligan) · tid till defensiv aktion 5,19s (1:a)",
        explanation:
          "Anderlechts absoluta styrka i ligan: defensiv transition. De tappar sällan boll (30,43/match, 1:a – minst i ligan), reagerar snabbast av alla lag (5,19s, 1:a) och begränsar motståndarnas inträde i den offensiva tredjedelen efter återerövring exceptionellt väl (9,12, 2:a). Tappa ALDRIG bollen högt upp mot dem.",
        podcastComment:
          "Deras starkaste kort i ligan. De tappar knappt bollen och reagerar på fem sekunder. Tappar vi bollen högt är kontringshotet omedelbart. Kontrollerat spel bakifrån är ett krav.",
      },
      {
        metric: "Final third to box % (Twelve · liga)",
        bigNumber: "21%",
        badge: "SVAG PENETRATION",
        color: "green",
        rankNote: "13:e av 16 · Box to shot 63% (16:e – sämst) · 45% skott utifrån",
        explanation:
          "Anderlecht pressar högt (DAH 41,19m, 3:e) och når den offensiva tredjedelen (37%, 5:e) men tar sig knappt in i boxen – final third to box bara 21% (13:e). Av de boxberöringar de ändå får omvandlar de sämst i ligan till skott (box to shot 63%, 16:e). Nästan hälften av deras skott tas utifrån boxen (45%). Hammarbys försvar kan hålla dem ute med god organisation.",
        podcastComment:
          "De pressar, de äger bollen i den sista tredjedelen, men skapar ingenting inne i boxen. 21% final third to box och sämst på att avsluta från nära håll. Kompakt försvar räcker för att neutralisera dem.",
      },
      {
        metric: "Ny tränare + truppomvälvning (TM · Twelve)",
        bigNumber: "€45m ut",
        badge: "OKÄND PROFIL",
        color: "yellow",
        rankNote: "Ny tränare tar över INFÖR dessa matcher · Sålde De Cat €20m + Simić €15m + Goto €10m",
        explanation:
          "Anderlecht sålde nyckelspelarna De Cat (CM, €20m), Simić (CB, €15m) och Goto (CF, €10m) under sommaren – totalt €45m ut, bara €7,5m in. Den nya tränaren tar över inför dessa matcher och har inte lett laget i ett enda spel. Taktisk profil och spelstil är helt okänd. All Twelve-data speglar ett annat tränarteam. ⚠️ I Europa (2 matcher): pressen faller markant – def. intensitet 7,20 (2:a/16 i ligan) → 5,83 (34:e/53).",
        podcastComment:
          "Ny tränare som aldrig lett dem, sålde nyckelspelarna för €45m. De är ett helt annat lag än förra säsongens Anderlecht. Det ger oss en chans – de vet inte heller riktigt var de har sig själva.",
      },
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a · 23p · 28-14. Ligaledare i xG, avslut och bollinnehav. Dominant hemma (5V-1O-1F, 22-5) – starkast hemma i hela ligan.",
        tone: "emerald",
      },
      {
        title: "Anderlecht – ligastatus 25/26",
        body: "Belgisk Pro League 6:a · 1,38 p/match · Truppvärde ~€76m. Hög press (2:a) men svag boxpenetration (13:e). Stora spelarförsäljningar: De Cat €20m, Simić €15m, Goto €10m = €45m ut.",
        tone: "amber",
      },
      {
        title: "⚠️ Ny tränare – okänd profil",
        body: "Ny tränare tar över INFÖR dessa matcher – har inte coachat ett enda spel. Taktisk stil okänd. I EL (2 matcher under gamla tränarteamet): press faller (34:e/53), mer direktspel. Tolka Twelve-data med försiktighet.",
        tone: "blue",
      },
    ],
    opponentStyle: [
      "Hög press i ligan: PPDA 5,34 (2:a), def. intensitet 7,20 (2:a), DAH 41,19m (3:e). Snabb reaktion vid förlust – tid till defensiv aktion 5,19s (1:a). Inga billiga bollar högt upp.",
      "Defensiv transition = deras starkaste område (2:a/16). Tappar sällan boll (30,43/match, 1:a) och reagerar snabbt. Motståndarens inträde i den offensiva tredjedelen inom 10s lågt (9,12, 2:a).",
      "Offensivt genomsnittliga: bollinnehav 53% (4:e), field tilt 55% (5:e), passtempo 19,50 (3:e). Når den offensiva tredjedelen (37%, 5:e) men tar sig inte in i boxen – final third to box 21% (13:e).",
      "Skjuter ofta från distans: 45% av skotten utifrån boxen, box to shot 63% (sämst, 16:e). Låg skottkvalitet – np xG/skott 0,11 (15:e). Direktanfall 21% – inte ett överdrivet direktspelande lag i ligan.",
      "Defensivt genomsnittliga (7:e/16). Motståndare tar sig in i deras box relativt lätt (opp. final third to box 24%, 14:e). Släpper in 1,55 mål/match (14:e).",
      "⚠️ I EL-kval (2 matcher): pressen faller markant, spelar mer direkt (40% direktanfall) och tillåter fler boxberöringar defensivt. Offensiv transition förbättras dock till 5:a/53.",
    ],
    styleProfile: [
      {
        label: "Press (liga, Twelve)",
        value: "PPDA 5,34 · 2:a av 16 · Def. intensitet 7,20 (2:a) · DAH 41,19m (3:e)",
        score: 85,
        explanation:
          "I belgisk Pro League är Anderlecht ett av ligans hårdast pressande lag. PPDA 5,34 (2:a), defensiv intensitet 7,20 (2:a), tid till defensiv aktion 5,19s (1:a – snabbast). Hög och aggressiv press är deras grundidentitet. ⚠️ EL-skillnad: i Europa faller def. intensitet till 5,83 (34:e/53) – pressen fungerar inte lika bra mot europeiska motståndare.",
      },
      {
        label: "Defensiv transition (liga, Twelve)",
        value: "2:a av 16 · Turnovers 30,43/match (1:a) · Tid till def. aktion 5,19s (1:a)",
        score: 90,
        explanation:
          "Deras starkaste område. Tappar sällan boll (1:a i ligan), reagerar snabbast av alla lag, begränsar motståndarnas kontringsmöjligheter exceptionellt väl. Hammarby får INTE tappa bollen högt – reaktionen kommer omedelbart.",
      },
      {
        label: "Offensiv boxpenetration (liga, Twelve)",
        value: "Final third to box 21% · 13:e av 16 · Box to shot 63% (16:e – sämst)",
        score: 22,
        explanation:
          "Trots att de pressar högt och äger bollen i sista tredjedelen (37%, 5:e) kan de knappt ta sig in i boxen – 21% final third to box (13:e). Av de boxberöringar de får konverterar de sämst i ligan till skott (63%, 16:e). Strukturerat Hammarby-försvar håller dem ute.",
      },
      {
        label: "Skottkvalitet (liga, Twelve)",
        value: "45% skott utifrån · np xG/shot 0,11 (15:e) · Höga chanser 3,00 (10:e)",
        score: 35,
        explanation:
          "Nästan hälften av deras skott tas utifrån boxen. Skottkvaliteten är låg (np xG/skott 0,11, 15:e av 16). Genomsnittliga 3,00 höga chanser/match (10:e) – inte farliga nog när de väl skjuter.",
      },
      {
        label: "Bollinnehav & territorial kontroll (liga)",
        value: "Bollinnehav 53% (4:e) · Field tilt 55% (5:e) · Pass tempo 19,50 (3:e)",
        score: 68,
        explanation:
          "Anderlecht äger bollen och dominerar territoriet i ligan – 4:e i bollinnehav, 5:e i field tilt. Högt passtempo (3:e). De är ett aktivt, rörligt lag som vill ha bollen. Men bollinnehavet ger inte tillräckligt farliga chanser.",
      },
      {
        label: "Truppomvälvning + ny tränare (TM)",
        value: "Sålde €45m · Ny tränare helt ny inför dessa matcher",
        score: 28,
        explanation:
          "Sålde De Cat (€20m), Simić (€15m), Goto (€10m) i sommar. Ny tränare tar över inför dessa matcher – har inte coachat laget ett enda spel. Helt okänd taktisk profil. Truppvärde kvarstår ~€76m men organisationen är oetablerad.",
      },
    ],
    spiderComparison: [
      {
        label: "np xG / match",
        hammarbyValue: "~2,19",
        opponentValue: "1,45 (liga)",
        hammarbyScore: 100,
        opponentScore: 66,
        note: "Hammarby skapar 50% mer xG per match. Anderlecht genomsnittliga offensivt (8:e/16 i Pro League).",
      },
      {
        label: "np Avslut / match",
        hammarbyValue: "~19,8",
        opponentValue: "13,25 (liga)",
        hammarbyScore: 100,
        opponentScore: 67,
        note: "Anderlecht skjuter 13,25/match (5:e/16) – bra volym, men 45% utifrån boxen och låg kvalitet.",
      },
      {
        label: "PPDA (lägre = bättre press)",
        hammarbyValue: "~4,19",
        opponentValue: "5,34 (liga)",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "Anderlecht pressar hårt i ligan (2:a/16). Hammarby pressar intensivare. ⚠️ I EL: PPDA stiger till 5,77.",
      },
      {
        label: "Field tilt %",
        hammarbyValue: "~70%",
        opponentValue: "55% (liga)",
        hammarbyScore: 100,
        opponentScore: 79,
        note: "Hammarby territoriellt dominerande. Anderlecht 5:e i Pro League med 55% field tilt.",
      },
      {
        label: "Höga chanser / match",
        hammarbyValue: "hög",
        opponentValue: "3,00 (liga)",
        hammarbyScore: 100,
        opponentScore: 54,
        note: "Anderlecht genomsnittliga i höga chanser (10:e/16). Inte kliniska trots 5:e i field tilt.",
      },
      {
        label: "Final third to box %",
        hammarbyValue: "hög",
        opponentValue: "21% (liga)",
        hammarbyScore: 100,
        opponentScore: 30,
        note: "Svagaste länken: 13:e av 16. Anderlecht äger bollen men tar sig inte in i boxen. Box to shot sämst (16:e).",
      },
      {
        label: "Def. transition (Twelve)",
        hammarbyValue: "hög",
        opponentValue: "2:a av 16",
        hammarbyScore: 80,
        opponentScore: 92,
        note: "Anderlechts toppklass-område. Snabbast att reagera (5,19s, 1:a). Tappa ALDRIG bollen högt.",
      },
      {
        label: "Bollinnehav %",
        hammarbyValue: "~56%",
        opponentValue: "53% (liga)",
        hammarbyScore: 100,
        opponentScore: 95,
        note: "Anderlecht 4:e i ligan i bollinnehav – liknande innehavsmönster som HIF men lägre offensiv produktion.",
      },
    ],
    rankedMetrics: [
      {
        label: "np xG / match (liga, Twelve)",
        hammarbyValue: "~2,19",
        hammarbyRank: "~1:a i Allsvenskan",
        opponentValue: "1,45",
        opponentRank: "8:e av 16",
        note: "Anderlecht genomsnittliga i xG-produktion trots solid bollinnehav. Hammarby skapar 50% mer.",
      },
      {
        label: "Final third to box % (liga, Twelve)",
        hammarbyValue: "hög",
        hammarbyRank: "~1:a i Allsvenskan",
        opponentValue: "21%",
        opponentRank: "13:e av 16",
        note: "Anderlechts tydligaste svaghet offensivt. Pressar och äger boll men tar sig knappt in i boxen.",
      },
      {
        label: "Defensiv transition (liga, Twelve)",
        hammarbyValue: "hög",
        hammarbyRank: "~topp Allsvenskan",
        opponentValue: "2:a / 16",
        opponentRank: "2:a av 16",
        note: "Anderlechts starkaste område. Snabbast att reagera i hela Pro League. Tappa inte bollen högt.",
      },
      {
        label: "PPDA (liga, Twelve · lägre = hårdare press)",
        hammarbyValue: "~4,19",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "5,34",
        opponentRank: "2:a av 16",
        note: "Anderlecht pressar hårt i ligan. Hammarby pressar intensivare. ⚠️ I EL stiger PPDA till 5,77 (20:e/53).",
      },
      {
        label: "Insläppta mål / match (liga)",
        hammarbyValue: "~0,5 hemma",
        hammarbyRank: "~1:a i Allsvenskan hemma",
        opponentValue: "1,55",
        opponentRank: "14:e av 16",
        note: "Anderlecht släpper in mer än de borde (opp. np goals 1,40 vs xG 1,58). Sårbart defensivt totalt.",
      },
      {
        label: "Bollinnehav % (liga)",
        hammarbyValue: "~56%",
        hammarbyRank: "~1:a i Allsvenskan",
        opponentValue: "53%",
        opponentRank: "4:e av 16",
        note: "Anderlecht 4:e i Pro League i bollinnehav – aktivt lag. Men innehavet ger inte tillräckliga offensiva chanser.",
      },
    ],
    goalWindows: [
      { window: "0–15'", hammarbyGoals: 4, opponentConcededGoals: 1 },
      { window: "16–30'", hammarbyGoals: 3, opponentConcededGoals: 1 },
      { window: "31–45+'", hammarbyGoals: 5, opponentConcededGoals: 0 },
      { window: "46–60'", hammarbyGoals: 6, opponentConcededGoals: 0 },
      { window: "61–75'", hammarbyGoals: 6, opponentConcededGoals: 1 },
      { window: "76–90+'", hammarbyGoals: 4, opponentConcededGoals: 1 },
    ],
    goalTypeNotes: [
      {
        label: "Anderlechts offensiva mönster i ligan (Twelve)",
        value: "1,48 mål/match (5:e) · 45% skott utifrån · 21% direktanfall · np xG/shot 0,11 (15:e)",
        interpretation:
          "Anderlecht gör mål i ligan men med låg skottkvalitet. Nästan hälften av deras skott tas utifrån boxen. 21% direktanfall – de spelar inte överdrivet direkt i ligan. Skott per final-third-pass: 0,12 (4:e) men boxpenetrationen svag (21%, 13:e). Hög volym, lägre precision.",
      },
      {
        label: "Defensivt i ligan – insläppta vs xG",
        value: "Insläppta 1,55 (14:e) · Opp. xG 1,58 (9:e) · Opp. np goals 1,40 (13:e)",
        interpretation:
          "Anderlecht är inte ett defensivt starkt lag (7:e/16). Släpper in 1,55 mål/match (14:e), vilket är sämre än förväntat (opp. xG 1,58). Motståndare tar sig in i boxen relativt lätt mot dem (opp. final third to box 24%, 14:e). Hammarby ska utnyttja detta med kombinationsspel in mot straffboxen.",
      },
      {
        label: "Truppomvälvning och ny tränare (TM)",
        value: "Ny tränare inför dessa matcher · Sålde De Cat €20m + Simić €15m + Goto €10m",
        interpretation:
          "Ny tränare tar över inför dessa matcher och har inte lett Anderlecht i ett enda spel. Sålde dessutom tre av säsongens viktigaste spelare (De Cat CM €20m, Simić CB €15m, Goto CF €10m) – totalt €45m ut. Köpte in enbart Ambros (AM, €5m). Truppen är ombyggd och taktiken helt okänd. All Twelve-data gäller ett annat tränarteam och delvis en annan trupp.",
      },
      {
        label: "Hammarby hemma 2026",
        value: "22-5 · +17 GD (5V-1O-1F)",
        interpretation:
          "3Arena är en fästning – 22 gjorda och 5 insläppta på 7 hemmamatcher. Starkast hemma i hela Allsvenskan. I en europeisk tvåmatchstie är hemmamål extra värda – mål i hinmatchen ger kapital inför returen i Bryssel.",
      },
    ],
    playersToWatch: [
      {
        name: "Mihajlo Cvetkovic",
        position: "CF · #9 · 19 år",
        scoutBadge: "⚡ Mest värderad",
        stats: [
          { label: "Marknadsvärde", value: "€10m" },
          { label: "Ålder", value: "19" },
          { label: "Nat.", value: "Serbien" },
        ],
        threat:
          "Anderlechts dyraste spelare och spjutspets – 19-årig serb med högt europeiskt marknadsvärde",
        motivation:
          "Truppens mest värdefulla spelare (€10m, TM). 19 år – snabb, teknisk anfallare som är Anderlechts spjutspets inför denna säsong. Hammarbys mittbackspar måste hålla honom tätt – inga ytor bakom försvarslinjen för en spelare med hans snabbhet.",
      },
      {
        name: "Nathan-Dylan Saliba",
        position: "CM · #13 · 22 år",
        scoutBadge: "🧠 Mittfältsmotorn",
        stats: [
          { label: "Marknadsvärde", value: "€7,5m" },
          { label: "Ålder", value: "22" },
          { label: "Nat.", value: "Frankrike" },
        ],
        threat: "Näst mest värderad – central mittfältare som driver spelet och kopplar försvar till anfall",
        motivation:
          "Anderlechts näst dyraste spelare (€7,5m, TM). Fransk central mittfältare som håller ihop lagets spelorganisation. Viktig länk i övergångar och press. Hammarby ska pressa hans passningslinjer och bryta deras mittfältsflöde tidigt i matcherna.",
      },
      {
        name: "Mario Stroeykens",
        position: "AM · #29 · 21 år",
        scoutBadge: "🎯 Kreativ 10:a",
        stats: [
          { label: "Marknadsvärde", value: "€4,5m" },
          { label: "Ålder", value: "21" },
          { label: "Nat.", value: "Belgien" },
        ],
        threat: "Ung belgisk offensiv mittfältare – kreativ i den sista tredjedelen och lagets potentiella 10:a",
        motivation:
          "21-årig belgisk talang (€4,5m, TM) och Anderlechts kreativa motor i anfallszonen. Akademiprodukt med genombrott i ligan. Kan skapa chanser i trånga ytor. Hammarby stänger mellanzonen och skär av hans passningsalternativ bakom mittfältet.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Utnyttja Anderlechts svaga defensiva boxskydd (opp. final third to box 24%, 14:e). Bär bollen in i deras sista tredjedel via löpningar och kombinationer – de tillåter motståndarens boxberöringar 19,75/match (8:e). Kombinera er in i straffboxen.",
        "Utnyttja deras offensiva svaghet (final third to box 21%, 13:e) för att dominera territoriet med boll. Anderlecht svarar med hög press – spela snabbt och direkt IGENOM pressen med vertikala bollar.",
        "Anderlecht har högt passtempo (19,50, 3:e i ligan) och pressar hårt vid bollförlust – ha alltid en säker utväg och undvik riskfyllda passningar i mittzon.",
        "Tvåmatchstie: sätt ett mål tidigt hemma. Ny tränare och ombyggd trupp – Anderlechts reaktion på motgångar är svår att förutsäga. Ett tidigt mål sätter press på ett lag utan etablerad spelordning.",
      ],
      withoutBall: [
        "ALDRIG tappa bollen högt upp mot deras defensiva transition (2:a/16). De reagerar på 5,19s (1:a i ligan) och stryper motståndarens inträde i anfallszonen inom 10 sekunder exceptionellt väl. Strukturerat passningsspel bakifrån.",
        "Var vaksamma på deras omställningsspel – i EL-kval förbättrades detta till 5:a/53. Räkna med snabba kontringar om Hammarby tappar bollen högt, särskilt i europamötet.",
        "Block mot distansskott: 45% av deras skott i ligan tas utifrån boxen. Kompakt blockorganisation – låt dem avlossa från distans hellre än att ge frilägen inne i straffboxen.",
        "⚠️ I EL förlitar de sig mer på taktiska frisparkar (86% av foulerna i anfallshalvan) och direkta passningar bakom försvarslinjen. Håll en tät baklinje och lämna inga ytor bakom backlinjen mot deras djuplöpare.",
      ],
      matchManagement: [
        "Tvåmatchstie: ett Hemma-0-0 är INTE tillräckligt. Tryck på mål i hinmatchen – hemmamål är kapital inför returen i Bryssel.",
        "Ny tränare som aldrig lett Anderlecht = okänd taktik och opålitliga reaktioner på motgångar. Etablera dominans tidigt och sätt dem i en situation de inte är förberedda på – 3Arena (22-5) är vår starkaste fördel.",
        "Anderlechts starkaste kort från förra säsongen är defensiv transition (snabbast i ligan på att reagera). Tappa aldrig bollen högt – strukturerat spel stryper kontringsytorna.",
        "Returmatchen i Bryssel: med ny tränare och ombyggd trupp är Anderlecht hemma lika oetablerade. Minst ett hemmamål ger ett psykologiskt övertag inför bortaresan.",
      ],
    },
    spotlightKey:
      "Anderlecht är ett ombyggt lag med en tränare som ännu inte lett dem i ett enda spel. Sålde De Cat (€20m), Simić (€15m) och Goto (€10m) – €45m ut. Taktiken inför dessa matcher är helt okänd. Från förra säsongens ligaspel: starkt pressinglag (2:a/16) men svag boxpenetration (13:e) – deras defensiva transition är det enda klara varningskortet (tappa ALDRIG bollen högt). Med boll: utnyttja deras svaga defensiva boxskydd (opp. final third to box 24%, 14:e). Truppvärde ~€76m mot HIF:s €31,55m – men ett dyrt lag utan etablerad spelordning är sårbart. Hemmavinst med mål i hinmatchen är målet.",
    glossary: [
      {
        term: "PPDA (Passes Per Defensive Action, Twelve)",
        explanation:
          "Motståndarens passningar per defensiv aktion. Lägre = hårdare press. Anderlecht 5,34 i liga (2:a/16). Hammarby ~4,19 (1:a i Allsvenskan). ⚠️ I EL-kval: 5,77 (20:e/53) – markant lägre press.",
      },
      {
        term: "Defensiv transition (Twelve)",
        explanation:
          "Förmåga att begränsa motståndarens kontringshot direkt efter bollförlust. Anderlecht 2:a av 16 i ligan – tappar sällan boll (1:a) och reagerar snabbast (5,19s). Kritisk varning: tappa ALDRIG bollen högt mot dem.",
      },
      {
        term: "Final third to box % (Twelve)",
        explanation:
          "Andel av bollinnehaven i den sista tredjedelen som når straffboxen. Anderlecht 21% (13:e/16) trots att 37% av deras bollinnehav når den sista tredjedelen (5:e). Trots aktivt spel tar de sig knappt in i boxen – svag penetration.",
      },
      {
        term: "Defensiv intensitet (Twelve)",
        explanation:
          "Antal defensiva aktioner per minut utan bollinnehav. Anderlecht 7,20 i liga (2:a/16). ⚠️ I EL-kval: 5,83 (34:e/53) – markant skillnad. Förvänta er lägre pressintensitet i europaformat.",
      },
      {
        term: "np xG per shot (Twelve)",
        explanation:
          "Genomsnittlig expected goals per icke-straff-skott. Anderlecht 0,11 i liga (15:e/16) – låg skottkvalitet. 45% skott utifrån boxen bidrar till det låga snittet.",
      },
      {
        term: "Truppvärde (Transfermarkt)",
        explanation:
          "Anderlecht ~€76m totalt (27 spelare) vs Hammarby €31,55m (24 spelare). Dyraste spelare: Cvetkovic CF €10m, Saliba CM €7,5m. Anderlecht sålde De Cat (€20m), Simić (€15m), Goto (€10m) – totalt €45m ut i sommar.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // OMGÅNG 14 · 26 JULI 2026 · BORTA · GRIMSTA IP
  // ─────────────────────────────────────────────────────────────────────────
  {
    round: 14,
    roundLabel: "Omgång 14 · Borta",
    hidden: true,
    fixture: "Hammarby - Brommapojkarna",
    dateLabel: "26 juli 2026 · Grimsta IP · Bolldata lagdata (24 jul 2026) + Twelve Earpiece scouting",
    venueLabel: "Borta · Grimsta IP · Stockholm",
    oneLineSummary:
      "BP saknar båda sin bästa anfallare (Hansen) och sin kreative AM (Berg) – dubbla avstängningar urholkar en offensiv som redan är 13:e i ligan (1,29 xG/match). Twelve bekräftar HIF som Allsvenskans skarpaste pressare (PPDA 4,93, 1:a) och bäst i attacking transition. HIF:s cornerdominans (+39 saldo) möter BP:s extrema hörnsårbarhet (6 insläppta hörnmål, 8,5% rate – 2:a sämst). OBS: Twelve noterar defensiv nedåttrend senaste 10 matcher för HIF.",
    introStats: [
      { label: "Tabell", value: "BP 11:a · 16p (4V-4O-5F)", tone: "blue" },
      { label: "xG / match", value: "BP 1,29 (13:e) vs HIF 2,27 (1:a)", tone: "amber" },
      { label: "Hansen + Berg AVST.", value: "Båda borta · offensiven urholkad", tone: "amber" },
      { label: "Hörnsårbarhet", value: "6 insläppta hörnmål · 8,5% rate", tone: "amber" },
    ],
    mobileTakeaways: [
      "Omgång 14 borta på Grimsta IP (sön 26 jul, 14:00). BP 11:a med 16p, HIF 2:a med 26p efter 14 omgångar.",
      "NYCKEL: BP har näst flest insläppta hörnmål (6 mål, 8,5% per hörna mot dem) – HIF leder serien med +39 hörnsaldo och 78 vunna hörnor.",
      "DUBBLA AVSTÄNGNINGAR: Mads Hansen (röd 17 jul vs IFK Göteborg) OCH Oliver Berg (gula kort) är båda borta. BP tappar sin anfallare + sin kreative AM i ett svep.",
      "BP:s sämsta defensiva tidsfönster: 46–60' (5 insläppta – värst av alla fönster). HIF:s bästa offensiva period: 61–75' (9 mål i säsongen).",
      "BP vinner bara 36,4% av duellerna (15:e/16) och har sämst bollåterhämtning i hela Allsvenskan (75,46/match, 16:e/sist).",
      "Trots låg volym (132 avslut, 15:e) konverterar BP 13,6% (5:e bäst) – men utan Hansen och Berg är anfallskapaciteten på botten.",
      "Victor Lind (3 mål mot HIF i 2025) lämnade BP för Hammarby inför 2026. HIF-kedjan har insyn i BP:s spelsystem.",
    ],
    dataSources: [
      "Bolldata lagdata: https://bolldata.se/lagdata (hämtad 24 jul 2026)",
      "Twelve säsongsrapport Hammarby IF – Allsvenskan 2026: https://reports.twelve.football/reports/hammarby-season-report-d6RWtGRMGD.pdf",
      "Twelve Earpiece scouting report BP: https://earpiece.twelve.football/shared-reports/95c88996-b314-4509-b394-9557c1103a69",
      "Ligan.se matchfakta BP–Hammarby omg. 14: https://ligan.se/allsvenskan/2026/matcher/brommapojkarna-hammarby",
      "World Soccer Data H2H 2025: https://www.worldsoccerdata.com/stats/sweden/allsvenskan/matches/hammarby-ff-vs-if-brommapojkarna-20-07-2025",
      "Expressen – Hansen röd kort: https://www.expressen.se/sport/fotboll/allsvenskan/mads-kristian-hansen-utvisad-i-forsta-halvlek/",
    ],
    headToHead: {
      sampleSize: 5,
      description:
        "Senaste 5 Allsvenska möten mellan Hammarby och Brommapojkarna. BP återvände till Allsvenskan 2024 efter flera år i Superettan – H2H-serien är relativt ung med fyra möten 2024–2025 plus ett äldre möte.",
      summaryCards: [
        {
          title: "Resultatrad (senaste 5)",
          value: "3V-1O-1F",
          note: "HIF dominerar klart – 3 segrar (inkl. 2 av 2 i 2025), 1 oavgjord, 1 förlust (på Grimsta IP, äldre).",
          tone: "emerald",
        },
        {
          title: "2025: HIF 5-2 BP totalt",
          value: "3-2 (hemma) + 0-2 (borta)",
          note: "Hammarby vann båda 2025-mötena. I april 2025 vann HIF 2-0 borta på Grimsta – samma arena som nu.",
          tone: "emerald",
        },
        {
          title: "Grimsta-facit (HIF borta)",
          value: "1V-1O-1F",
          note: "Senaste besöket: HIF vann 0-2 (april 2025). HIF slog även 2-1 hemma under omgång 2 i 2024.",
          tone: "blue",
        },
      ],
      trendBullets: [
        "HIF har vunnit de två senaste H2H-mötena mot BP med sammanlagt 5-2 (2025).",
        "I april 2025 vann HIF 2-0 på Grimsta IP – exakt samma arena som söndag 26 juli 2026.",
        "I juli 2025 ledde BP 0-2 i paus men HIF vände med 3-2 i 2H – mentalt övertag för HIF.",
        "Victor Lind (2 mål mot HIF i 2025-matcherna) är nu i Hammarby – insidekunskap om BP:s spelsystem.",
        "BP:s senaste form: 1V-2O-2F (5p senaste 5 matcher). HIF 3V-0O-2F (9p).",
      ],
      matches: [
        {
          date: "2025-07-20",
          fixture: "Hammarby - Brommapojkarna",
          result: "3-2",
          venue: "home",
          outcome: "win",
          hammarbyGoals: 3,
          opponentGoals: 2,
          hammarbyXg: 2.1,
          opponentXg: 1.3,
          hammarbyShots: 20,
          opponentShots: 11,
          sourceUrl: "https://www.worldsoccerdata.com/stats/sweden/allsvenskan/matches/hammarby-ff-vs-if-brommapojkarna-20-07-2025",
        },
        {
          date: "2025-04-06",
          fixture: "Brommapojkarna - Hammarby",
          result: "0-2",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.8,
          opponentXg: 0.7,
          hammarbyShots: 18,
          opponentShots: 12,
          sourceUrl: "https://www.worldsoccerdata.com/stats/sweden/allsvenskan/matches/if-brommapojkarna-vs-hammarby-ff-06-04-2025",
        },
        {
          date: "2024-07-21",
          fixture: "Hammarby - Brommapojkarna",
          result: "3-3",
          venue: "home",
          outcome: "draw",
          hammarbyGoals: 3,
          opponentGoals: 3,
          hammarbyXg: 2.4,
          opponentXg: 1.9,
          hammarbyShots: 19,
          opponentShots: 13,
          sourceUrl: "https://ligan.se/allsvenskan/2024/",
        },
        {
          date: "2024-04-07",
          fixture: "Brommapojkarna - Hammarby",
          result: "0-2",
          venue: "away",
          outcome: "win",
          hammarbyGoals: 2,
          opponentGoals: 0,
          hammarbyXg: 1.5,
          opponentXg: 0.6,
          hammarbyShots: 16,
          opponentShots: 10,
          sourceUrl: "https://ligan.se/allsvenskan/2024/",
        },
        {
          date: "2019-06-02",
          fixture: "Brommapojkarna - Hammarby",
          result: "1-0",
          venue: "away",
          outcome: "loss",
          hammarbyGoals: 0,
          opponentGoals: 1,
          hammarbyXg: 0.9,
          opponentXg: 0.8,
          hammarbyShots: 12,
          opponentShots: 9,
          sourceUrl: "https://ligan.se/allsvenskan/2019/",
        },
      ],
    },
    trafficLightCards: [
      {
        metric: "Hörnsårbarhet (Bolldata)",
        bigNumber: "8,5%",
        badge: "CORNERFARA",
        color: "red",
        rankNote: "6 insläppta hörnmål (2:e flest i ligan) · 8,5% per hörna (2:e sämst) · HIF +39 hörnsaldo (5:e) · 78 vunna hörnor",
        explanation:
          "BP är ligans näst sårbaraste lag på hörnor: 6 av 71 emot-hörnor slutar i mål (8,5%). Bara Häcken är sämre (11,0%). Hammarby å sin sida leder Allsvenskan i hörnsaldo (+39), vinner 78 hörnor per säsong (5,57/match) och har bara lämnat 1 hörnmål. Det är den tydligaste strukturella fördelen inför matchen – varje hörna är ett potentiellt mål.",
        podcastComment:
          "BP är näst sämst i ligan på att försvara hörnor. Vi vinner 78 hörnor den här säsongen och har +39 i saldo. Det är inte slumpen att vi ska ha hörnor i den här matchen – det är en planerad anfallsstrategi.",
      },
      {
        metric: "BPs offensiva kapacitet (Bolldata)",
        bigNumber: "1,29",
        badge: "URHOLKAD OFFENSIV",
        color: "green",
        rankNote: "16,77 xG totalt (13:e) · Hansen AVS. (anfall) · Berg AVS. (kreativitet) · 7,00 MC/90 (13:e)",
        explanation:
          "BP är redan 13:e i xG-produktion (1,29/match). Nu är dessutom BÅDA de viktigaste offensiva profilerna borta: Hansen (anfallaren, röd kort 17 jul) och Oliver Berg (den kreative AM:en, gula kort). Kvar är Björklund som primär CF (12 SM, 2M), Oppong på kanten (12 SM, 2M) och Isso/Sever som alternativa framåtspelarna. BP:s anfallshot inför denna match är det svagaste de haft under säsongen.",
        podcastComment:
          "De saknar sin anfallare och sin kreativa mittfältare i ett och samma slag. 1,29 xG per match utan Hansen och Berg. Det är extremt lågt och vi ska utnyttja det offensivt.",
      },
      {
        metric: "BPs sena scoring + bortaform (Bolldata)",
        bigNumber: "61–75'",
        badge: "VAKSAMHET 2H",
        color: "yellow",
        rankNote: "5 mål 61-75' (BP:s starkaste fönster) · Borta: 3V-2O-3F (11p, 7:e) · Konvertering 13,6% (5:e)",
        explanation:
          "Trots dubbla avstängningar och låg xG-produktion kan BP fortfarande bitas. 13,6% konvertering (5:e bäst) innebär att om de skapar 2–3 lägen kan de göra mål. Deras starkaste scoringsperiod är 61–75' (5 av 18 mål). Bortaformen är dessutom bättre än hemmafacit (3V-2O-3F, 7:e borta). Respektera dem i 2H trots pappersövertaget.",
        podcastComment:
          "Även utan Hansen och Berg är BP effektiva när de skapar chanser – 13,6 procents konvertering är femte bäst i hela Allsvenskan. Och 61 till 75 är deras gyllene period. Håll strukturen i 2H.",
      },
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a · 26p · 32-14 mål · np xG 2,21/match (1:a). Twelve: PPDA 4,93 (1:a), def. intensitet 6,85 (1:a), DAH 44,70m (1:a), höga chanser 5,07/match (1:a), field tilt 69% (1:a). Senaste 5: 3V-0O-2F. ⚠️ Defensiv nedåttrend senaste 10 matcher (Twelve).",
        tone: "emerald",
      },
      {
        title: "Brommapojkarna – ligastatus",
        body: "11:a · 16p · 18-21 mål. Låg xG-produktion (16,77, 13:e), sämst i dueller (36,4%, 15:e), sämst i bollåterhämtning (75,46/m, 16:e). Hansen (anfall) + Berg (AM) båda AVSTÄNGDA. Jakobsen lämnat klubben.",
        tone: "amber",
      },
      {
        title: "Borta på Grimsta IP",
        body: "HIF vann senast 2-0 på Grimsta IP (omg. 2, april 2025 – Pinas 55' + Besara 90'). Victor Lind spelar nu för HIF. Disciplinerat borta-spel är standarden.",
        tone: "blue",
      },
    ],
    styleChips: [
      { label: "SVAG PRESS", sub: "Bollåterhämtning 16:e/sist · 75,46/m", color: "border-rose-600/50 bg-rose-950/40 text-rose-300" },
      { label: "DÅLIGA DUELLER", sub: "36,4% vunna · 15:e", color: "border-rose-600/50 bg-rose-950/40 text-rose-300" },
      { label: "HÖRNSÅRBARHET", sub: "8,5% insläppt per hörna · 2:a sämst", color: "border-amber-600/50 bg-amber-950/40 text-amber-200" },
      { label: "BRA KONVERTERING", sub: "13,6% KG · 5:e bäst", color: "border-emerald-600/50 bg-emerald-950/40 text-emerald-200" },
    ],
    opponentStyle: [
      "Låg offensiv volym: 132 totala avslut (15:e), 10,15/match. BP konverterar effektivt (13,6%, 5:e) men utan Hansen (anfall) och Berg (AM) är anfallskapaciteten på säsongens lägsta nivå.",
      "4-2-3-1 formation: Cavallius i mål, 4-back med Zandén, Troelsen, Cotton, Örqvist/Timossi Andersson. DM-par (Strand + Barslund), AM-trio (Oppong + Sever/Okeke), Björklund eller Isso uppifrån.",
      "Passar tekniskt väl (84,7% passningsprecision, 4:e) men utan de kreativa nyckelpassningarna (3,46/90, 12:e). Spelar strukturerat bakifrån men når sällan farliga lägen.",
      "Extremt svagt i dueller (36,4% totalt – 15:e/16) och bollåterhämtning (75,46/m – 16:e/sist). Vinner inte sina 50/50-dueller och pressar inte intensivt bakåt.",
      "Hörnsårbarhet är deras tydligaste defensiva svaghet: 8,5% av de 71 hörnorna mot dem ger mål (2:e sämst i Allsvenskan). 6 mål från hörnor – i matchens nyckelscenario.",
      "Offensivt sent: 5 av 18 mål (28%) görs 61–75' – BP väntar ofta på chanser sent i matcher. Men utan Hansen minskar kontringshotet avsevärt.",
    ],
    styleProfile: [
      {
        label: "Offensiv volym (Bolldata)",
        value: "132 avslut (15:e) · 10,15/match · 16,77 xG (13:e) · 1,29 xG/match",
        score: 25,
        explanation:
          "BP skapar lite: 132 totala avslut på 13 matcher (15:e i ligan), xG-produktion 16,77 (13:e). Utan Hansen minskar hotet ytterligare. HIF kan fokusera defensivt och ändå stänga dem ute med god organisation.",
      },
      {
        label: "Konverteringsgrad (Bolldata)",
        value: "13,6% (5:e) · Effektiva när chanser skapas",
        score: 72,
        explanation:
          "Trots den låga volymen konverterar BP förvånansvärt bra – 13,6% är 5:e bäst i Allsvenskan. Det innebär att om BP skapar 2–3 lägen kan de göra mål. HIF måste stänga matcherna och inte bjuda på onödiga kontringsmöjligheter.",
      },
      {
        label: "Hörnsårbarhet (Bolldata)",
        value: "6 insläppta hörnmål (2:e flest) · 8,5% per hörna (2:e sämst)",
        score: 10,
        explanation:
          "BP:s absoluta svaghet: 6 av 71 emot-hörnor slutar i mål (8,5%). Bara Häcken är sämre (11%). Hammarby vinner 78 hörnor per säsong och har +39 i saldo. Det är matchens tydligaste anfallsmöjlighet för HIF.",
      },
      {
        label: "Duellspel (Bolldata)",
        value: "36,4% vunna dueller (15:e/16) · OD 46,1% · LD 44,2%",
        score: 18,
        explanation:
          "BP är ligans näst sämsta lag i dueller totalt. De vinner under 37% av sina 50/50-situationer. HIF, som leder ligan med 43,2%, kommer att ha ett rejält fysiskt övertag i hela matchens duellspel.",
      },
      {
        label: "Bortaform 2026 (Bolldata)",
        value: "3V-2O-3F · 11p (7:e bortatabellen) · Starkare borta än hemma",
        score: 65,
        explanation:
          "BP är förvånansvärt starka borta – 7:e i bortatabellen med 11 poäng från 8 matcher. Hemma är de avsevärt svagare (5:e sämst hemma). Detta är en bortamatch för Hammarby, vilket talar för ett mer kompakt BP.",
      },
      {
        label: "Bollåterhämtning (Bolldata)",
        value: "75,46/match (16:e – SIST i Allsvenskan)",
        score: 12,
        explanation:
          "BP har sämst bollåterhämtning i hela Allsvenskan – 75,46 återerövrade bollar per match (16:e/sist). Jämfört med HIF:s 90,29 (3:e) är gapet enormt. BP pressar inte bakåt och tappar lätt boll mot press – HIF:s högpress är ett direkt anfallsvapen.",
      },
    ],
    spiderComparison: [
      {
        label: "np xG / match (Twelve)",
        hammarbyValue: "2,21",
        opponentValue: "~1,29",
        hammarbyScore: 100,
        opponentScore: 58,
        note: "HIF 1:a i Allsvenskan (Twelve + Bolldata). BP 13:e – låg xG-produktion, ännu lägre utan Hansen.",
      },
      {
        label: "PPDA (Twelve · lägre = bättre press)",
        hammarbyValue: "4,93",
        opponentValue: "hög",
        hammarbyScore: 100,
        opponentScore: 25,
        note: "HIF skarpast presserande lag i Allsvenskan (1:a). BP sämst i bollåterhämtning (16:e) – motvikt svag.",
      },
      {
        label: "Bollinnehav % (Twelve)",
        hammarbyValue: "61%",
        opponentValue: "46,3%",
        hammarbyScore: 100,
        opponentScore: 76,
        note: "HIF 1:a (Twelve: 61%, Bolldata: 59%). BP 9:e – under genomsnittet.",
      },
      {
        label: "Höga chanser / match (Twelve)",
        hammarbyValue: "5,07",
        opponentValue: "~1,5",
        hammarbyScore: 100,
        opponentScore: 30,
        note: "HIF 1:a i Allsvenskan i höga chanser (xG>0,15) per match. BP i botten – skapar sällan riktigt farliga lägen.",
      },
      {
        label: "Field tilt % (Twelve)",
        hammarbyValue: "69%",
        opponentValue: "~35%",
        hammarbyScore: 100,
        opponentScore: 51,
        note: "HIF dominerar territoriet (1:a, 69%). BP relativt passivt med låg bollinnehav borta.",
      },
      {
        label: "Bollåterhämtning / match (Bolldata)",
        hammarbyValue: "90,29",
        opponentValue: "75,46",
        hammarbyScore: 100,
        opponentScore: 84,
        note: "HIF 3:e i ligan. BP sist (16:e) – pressar inte bakåt, lämnar ytor öppna.",
      },
      {
        label: "Hörnorsaldo + sårbarhet (Bolldata)",
        hammarbyValue: "+39",
        opponentValue: "–13",
        hammarbyScore: 100,
        opponentScore: 30,
        note: "HIF +39 hörnsaldo (5:e). BP –13 och 8,5% insläppta hörnmål = 2:e sämst i ligan.",
      },
      {
        label: "Opp. xG / match (Twelve/Bolldata)",
        hammarbyValue: "1,38",
        opponentValue: "1,76",
        hammarbyScore: 100,
        opponentScore: 78,
        note: "HIF 4:e bäst defensivt (Twelve: opp. xG 1,38). BP 13:e (1,76) – läcker mer än förväntat. ⚠️ HIF defensiv nedåttrend senaste 10.",
      },
    ],
    rankedMetrics: [
      {
        label: "np xG / match (Twelve + Bolldata)",
        hammarbyValue: "2,21",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "1,29",
        opponentRank: "13:e av 16",
        note: "HIF skapar 71% mer xG per match. BP offensivt svagt – ännu sämre utan Hansen och Berg.",
      },
      {
        label: "PPDA (Twelve · lägre = hårdare press)",
        hammarbyValue: "4,93",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "hög (svag press)",
        opponentRank: "16:e (sämst bollåterhämtning)",
        note: "HIF pressar skarpast i hela Allsvenskan. BP är sämst i ligan på bollåterhämtning (75,46/m, 16:e).",
      },
      {
        label: "Höga chanser / match (Twelve · xG>0,15)",
        hammarbyValue: "5,07",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "~1,5",
        opponentRank: "~14:e–15:e av 16",
        note: "HIF skapar flest höga chanser. Utan Hansen & Berg är BP:s förmåga att skapa kvalitetschanser extremt begränsad.",
      },
      {
        label: "Defensiv action height/DAH (Twelve)",
        hammarbyValue: "44,70m",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "låg (passiv)",
        opponentRank: "~14:e–16:e (estimerat)",
        note: "HIF pressar 44,70m upp på banan (1:a). BP med låg bollåterhämtning och svaga dueller = djupt passivt block.",
      },
      {
        label: "Dueller vunna % (Bolldata)",
        hammarbyValue: "43,2%",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "36,4%",
        opponentRank: "15:e av 16",
        note: "BP näst sämst i dueller. HIF bäst. Klart fysiskt övertag i varje duellduel.",
      },
      {
        label: "Insläppta hörnmål rate (Bolldata)",
        hammarbyValue: "2,6%",
        hammarbyRank: "5:e bäst (1 insläppt)",
        opponentValue: "8,5%",
        opponentRank: "2:e sämst av 16",
        note: "BP:s tydligaste defensiva svaghet. HIF 78 hörnor (5,57/match) + BP:s 8,5%-sårbarhet = strategisk prioritet.",
      },
    ],
    goalWindows: [
      { window: "0–15'", hammarbyGoals: 4, opponentConcededGoals: 2 },
      { window: "16–30'", hammarbyGoals: 3, opponentConcededGoals: 3 },
      { window: "31–45+'", hammarbyGoals: 6, opponentConcededGoals: 3 },
      { window: "46–60'", hammarbyGoals: 6, opponentConcededGoals: 5 },
      { window: "61–75'", hammarbyGoals: 9, opponentConcededGoals: 4 },
      { window: "76–90+'", hammarbyGoals: 4, opponentConcededGoals: 4 },
    ],
    goalTypeNotes: [
      {
        label: "BP:s offensiva målprofil (Bolldata)",
        value: "18 mål · 13 MIB · 5 MUB · 2 HM · 4 NM · 13,6% KG (5:e)",
        interpretation:
          "BP gör mål inne i boxen (13 av 18) men har ovanligt många mål utifrån boxen (5 MUB – 3:e flest i ligan). God konverteringsgrad (13,6%, 5:e) kompenserar för den låga volymen. Bästa scoring-period: 61–75' (5 mål). Utan Hansen förväntas anfallsproduktionen sjunka markant.",
      },
      {
        label: "BP:s defensiva svagheter (Bolldata)",
        value: "21 insläppta · 6 insläppta hörnmål (8,5%) · 5 insläppta 46-60' · 6 HM insläppta",
        interpretation:
          "BP är mest sårbar i tre scenarion: (1) hörnor – 6 mål från 71 emot-hörnor, 8,5% rate = 2:a sämst, (2) tidigt i 2H (46–60': 5 insläppta, värst av alla fönster), (3) huvudmål – 6 insläppta via huvud (joint 2:a flest i ligan). HIF:s set-piece-spel och tidig press efter halvtid är kritiska vapen.",
      },
      {
        label: "HIF vs BP historiskt (H2H 2025)",
        value: "HIF 5-2 totalt 2025 (3-2 hemma + 0-2 borta på Grimsta)",
        interpretation:
          "Hammarby vann båda 2025-mötena. I april 2025 vann HIF 2-0 på exakt samma arena (Grimsta IP). I det hemma-mötet i juli 2025 ledde BP 0-2 vid halvtid men HIF vände med 3-2. Mentalt övertag finns. Victor Lind (nu i HIF) bidrar med insidekunskap om BP:s spelsystem.",
      },
      {
        label: "Dubbla avstängningar + trupp-läge",
        value: "Hansen (anfall) + Berg (AM) AVS. · Jakobsen lämnat klubben",
        interpretation:
          "Mads Hansen fick direkt rött kort mot IFK Göteborg den 17 juli (dubbelsula i bröstet på Noah Tolf, 3 matcher). Oliver Berg är avstängd via gula kort. Jakobsen och Alladoh har lämnat klubben. Björklund (CF, 12 SM, 2M) väntas starta som primär anfallare. Oppong (12 SM, 2M) täcker AM/kantplatsen. David Isso (8 SM, 1M) eller Sever (8 SM) kan starta alternativt.",
      },
    ],
    playersToWatch: [
      {
        name: "Lukas Björklund",
        position: "CF · #30 · 12 SM · 2 mål",
        scoutBadge: "⚡ Primärt anfallshot",
        stats: [
          { label: "Matcher", value: "12" },
          { label: "Mål", value: "2" },
          { label: "Nat.", value: "Sverige" },
        ],
        threat:
          "BP:s mest spelade forward (12 SM, 2 mål) – väntas starta som CF med Hansen borta",
        motivation:
          "Björklund (#30, 22 år, fd Sönderjyske) klassas av Ligan som CF och har 12 starter bakom sig – han är BP:s primära framåtspetspot när Hansen är borta. Spelar som ren forward i 4-2-3-1 men kan dra ut bredare. Hammarby:s mittbackspar håller tätt på honom inne i boxen och skär av hans djuplöpningar. Han är mer bekväm på bollen än i luften – försvara ytan framför backlinje.",
      },
      {
        name: "Sion Oppong",
        position: "Yttermitt/AM · #33 · 12 SM · 2 mål",
        scoutBadge: "🎯 Snabb kantspelare",
        stats: [
          { label: "Matcher", value: "12" },
          { label: "Mål", value: "2" },
          { label: "Nat.", value: "Sverige" },
        ],
        threat: "Regelbunden starter på kanten, 12 matcher och 2 mål – farlig i omställning och dribbel",
        motivation:
          "Oppong (#33, 19 år) är en av BP:s mest spelade offensiva profiler. Snabb ytterspelare som föredrar att driva mot mål från vänsterkanten. Med Berg borta tar han ännu mer ansvar i den kreativa rollen. Hammarby täcker kantlinjen tätt och tvinga honom inåt mot blockat centrum – han tappar farligast om han får löpa fritt längs linjen mot boxen.",
      },
      {
        name: "David Isso",
        position: "CF · #34 · 8 SM · 1 mål",
        scoutBadge: "🔄 Alternativ forward",
        stats: [
          { label: "Matcher", value: "8" },
          { label: "Mål", value: "1" },
          { label: "Nat.", value: "Sverige" },
        ],
        threat: "Ung forward med 8 matcher i ligan – kan starta eller komma in som joker",
        motivation:
          "David Isso (#34, 19 år) är BP:s tredje forward-alternativ med 8 allsvenska framträdanden och 1 mål. Snabb och rörlig – kan starta om tränaren väljer att vila Björklund eller komma in i 2H som en piggt byte. HIF:s backfyra håller tätt på djupledslöpningar och lämnar inga ytor bakom linjen mot honom.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Utnyttja BP:s hörnsvaghet aggressivt: 8,5% av BP:s emot-hörnor ger mål (2:e sämst). HIF vinner 5,57 hörnor/match (+39 i saldo). Varje corner mot BP är ett potentiellt mål – spela på det med varierande hörnrutiner.",
        "Tryck i 46–60'-fönstret: BP:s värsta defensiva period (5 insläppta – sämst av alla fönster). Inled 2H med högt tempo och press direkt från avspark.",
        "Utnyttja BP:s noll-press bakåt (75,46 återerövrade bollar/match – SIST i Allsvenskan). HIF har PPDA 4,93 (1:a, Twelve) – ligans skarpaste pressare möter ligans sämsta motpressare. Kort passningsväg till boxen efter varje vunnen duell.",
        "Kombinera in i BP:s box – de tillåter bollar in (MCE/M 9,92, 13:e) och konkurrerar dåligt i boxdueller (22,5% vunna defensiva dueller). Utnyttja djupet med löpningar bakom BP:s backfyra.",
      ],
      withoutBall: [
        "Vaka BP:s 61–75'-fönster (5 av BP:s 18 mål görs där). Håll strukturen och forma ett kompakt block under denna period – BP:s bästa scoringsperiod.",
        "Björklund och Oppong tar de tyngsta offensiva rollerna med Hansen + Berg borta – BP:s attack är mer förutsägbar och enklare att läsa. Håll tätt på Björklund inne i boxen och stäng Oppongs kantlöpningar.",
        "BP försöker spela (84,7% passningsprecision) men har få nyckelpassningar (3,46/90, 12:e). Press på deras DM-par stryper deras speldistribution och skapar ombyten högt.",
        "BP har 22 offsides (3:e flest, 1,69/m) – backlinjen håller högt och sätter ofsidesfällan. BP:s anfallare löper ofta bakom linjen och ger HIF gratisoffsidar.",
      ],
      matchManagement: [
        "Bortamatch på Grimsta IP: HIF vann 0-2 senast här (april 2025). Samma arena, liknande förutsättningar – disciplinerat spel borta.",
        "2 BP-spelare AVSTÄNGDA inklusive Hansen – ta fördel av deras trupp-förvirring tidigt. Snabbt första mål sätter BP under press de inte är vana vid utan sina nyckelspelarna.",
        "Tabellmässigt är 3 poäng här guld: HIF 2:a med 26p, en bortaseger cementerar toppositionen inför hemmomgångarna.",
        "Victor Linds transfer från BP till HIF ger laget insidekunskap om BP:s spelordning, signalspel och pressmönster – utnyttja det.",
      ],
    },
    spotlightKey:
      "Matchen sitter på tre nyckelscenarios: (1) Hörnorna – BP har 8,5% insläppta hörnmålsrate (2:e sämst) och HIF leder ligan med +39 i hörnsaldo. Varje corner HIF vinner är ett potentiellt mål. (2) Dubbla avstängningar – Hansen (anfall) och Berg (AM) borta + Jakobsen/Alladoh lämnat klubben = BP:s offensiv på säsongens svagaste punkt. Björklund (CF) och Oppong (kant) ersätter men är inte i samma klass. (3) Bortakvalitet – HIF vann 2-0 på Grimsta i april 2025. BP är starkare borta än hemma men strukturen är nu söndrig. BP konverterar sina chanser (13,6%, 5:e) – respektera dem i 2H, men dominera med boll och set-pieces.",
    glossary: [
      {
        term: "PPDA (Passes Per Defensive Action, Twelve)",
        explanation:
          "Motståndarens passningar per defensiv aktion. Lägre = hårdare press. HIF 4,93 (1:a/16) = skarpast i Allsvenskan. Extremt lågt värde = HIF pressar aggressivt högt.",
      },
      {
        term: "Defensive action height/DAH (Twelve)",
        explanation:
          "Snittposition (meter) för defensiva aktioner. HIF 44,70m (1:a) = pressar högt upp på planen. Innebär att BP måste bygga upp under konstant press – tappar de bollen högt är HIF genast farliga.",
      },
      {
        term: "High opportunity shots (Twelve · xG>0,15)",
        explanation:
          "Antal avslut per match med xG >0,15 (höga chanser). HIF 5,07 (1:a) – skapar flest riktigt farliga lägen per match. BP i botten av ligan – skapar sällan höga chanser.",
      },
      {
        term: "xG (Expected Goals, Bolldata + Twelve)",
        explanation:
          "Sannolikhet för mål baserat på skottets position och situation. BP 16,77 xG (13:e) = producerar lite offensivt. HIF np xG 2,21/match (1:a, Twelve) = klart bäst i ligan.",
      },
      {
        term: "KG% (Konverteringsgrad, Bolldata)",
        explanation:
          "Andel skott som resulterar i mål. BP 13,6% (5:e) trots låg volym. Ger dem ett disproportionellt hot på sina chanser – var vaksam när de väl skjuter.",
      },
      {
        term: "IM/H% (Insläppta hörnmål per hörna, Bolldata)",
        explanation:
          "Andel hörnor mot laget som resulterar i mål. BP 8,5% (2:e sämst) = nästan 1 av 12 emot-hörnor ger mål. Kritisk svaghet att exploatera.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // UECL PLAYOFF · HINMATCH · RAKÓW CZĘSTOCHOWA · TELE2 ARENA
  // Källa Twelve opposition report:
  // reports.twelve.football/reports/opposition-report-rakow-czestochowa-PZYHtoZJoP.pdf
  // (Ekstraklasa 2026/27, 2 matcher: Raków 1-2 Wisła Płock + Śląsk 2-1 Raków)
  // Bortaleg 6 aug 2026: Raków 0–0 HIF (xG 1,63–0,91)
  // Källa matchrapport: reports.twelve.football/reports/hammarby-match-report-vs-rakow-czestochowa-6thZSrmbRj.pdf
  // ─────────────────────────────────────────────────────────────────────────
  {
    round: 100,
    roundLabel: "UECL-kval · Playoff · Hinmatch (2:a leg)",
    hidden: false,
    fixture: "Hammarby IF - Raków Częstochowa",
    dateLabel: "14 Augusti 2026 · Tele2 Arena · Returen efter 0–0 borta (6 aug)",
    venueLabel: "Hemma · Tele2 Arena",
    oneLineSummary:
      "Bortaleg 0–0 (Raków xG 1,63 – HIF xG 0,91): fantastiskt bortatåg trots offensiva svårigheter. Hinmatchen på Tele2 är nu avgörande – HIF behöver vinst för att nå UECL-gruppspelet. Raków defensivt excellent (3:e/36 UECL) men offensivt svaga (23:e/36). Counter-press-fönstret (turnover line 55,98m, 35:e/36) är fortfarande HIF:s tydligaste vapen.",
    introStats: [
      { label: "1:a leg (6 aug, borta)", value: "0–0 · HIF xG 0,91", tone: "emerald" },
      { label: "Raków xG borta", value: "1,63 · 6 high opp. shots", tone: "amber" },
      { label: "PPDA Europa (Twelve)", value: "5,18 · 6:e / 36", tone: "amber" },
      { label: "Opp. Chance Creation", value: "3:e / 36 · 0,75 mål insläppt", tone: "emerald" },
      { label: "Anfall Europa", value: "23:e / 36 · svag penetration", tone: "blue" },
    ],
    mobileTakeaways: [
      "BORTALEG KLAR: 0–0 i Częstochowa (6 aug). Raków skapade mer (xG 1,63 mot HIF:s 0,91) men HIF höll nollan – fantastiskt bortatåg. Hinmatchen på Tele2 avgör allt.",
      "Raków 10 skott (4 på mål) varav 6 high opportunity shots. HIF 14 skott (4 på mål) men bara 1 high opportunity shot. HIF behöver skarpare i boxen hemma.",
      "HIF:s defensiva transition var ett problem borta: 33 bollflippar, Raków skapade 0,99 xT inom 10s. Tele2-publiken ska pressa Raków tillbaka – aggressivare transitions hemma.",
      "PPDA 5,18 i Europa (6:e/36) – Raków pressar HÅRDARE i Europa än i Ekstraklasa (5,92). Beredda på hög press mot HIF:s uppbyggnad.",
      "Raków offensivt i Europa: 23:e/36, 49% skott utifrån boxen, np xG/skott 0,09 (32:a/36). Bortaleg visade att de skapar men inte konverterar – Hahn och blocket håller dem ute.",
      "DEFENSIV TRANSITION svaghet kvarstår: turnover line height 55,98m (35:e/36!) – exploatera bollflippar högt i Tele2.",
      "Aggregatstatus: 0–0. HIF vinner om de vinner i Tele2. Oavgjort efter 90 min = förlängning. Raków vinner om de slår HIF oavsett mål.",
    ],
    previousMeeting: {
      date: "2026-08-06",
      fixture: "Raków Częstochowa - Hammarby IF",
      result: "0–0",
      venue: "away",
      outcome: "draw",
      xgHammarby: 0.91,
      xgOpponent: 1.63,
      contextNote:
        "Bortaleg i Częstochowa. Raków dominerade xG-mässigt (1,63–0,91) med 6 high opportunity shots, men HIF höll nollan defensivt trots tuffa stunder. HIF hade 56% bollinnehav och 14 skott men skapade ytterst lite inne i boxen (1 high opportunity shot). Bästa chansen för HIF kom via vänsterkanten. Slutresultat 0–0 är ett utmärkt bortatåg.",
      keyStory:
        "HIF:s defensiva transition var svag (33 turnovers, Raków fick 0,99 xT inom 10s efter HIF-förluster). Offensivt kämpade HIF med att omvandla 56% bollinnehav till farliga lägen – field tilt 63% men np xG/skott 0,06 (1 high opportunity shot). Raków:s high opportunity shots (6 st, xG 1,63) visade att de skapar lägen när de väl får bollen, men David Hahn och blocket stod emot.",
      seriesTurnedNote:
        "Aggregat 0–0. Allt avgörs på Tele2 Arena 14 aug: HIF-vinst → UECL-grupp. Oavgjort 90 min → förlängning. Raków-seger → Raków vidare.",
    },
    dataSources: [
      "Twelve matchrapport Raków–Hammarby (bortaleg 6 aug): https://reports.twelve.football/reports/hammarby-match-report-vs-rak%C3%B3w-cz%C4%99stochowa-6thZSrmbRj.pdf",
      "Twelve UECL 2025/26 säsongsrapport Raków Częstochowa: https://reports.twelve.football/reports/rak%C3%B3w-cz%C4%99stochowa-season-report-75ESvAis3k.pdf",
      "Twelve opposition report Raków – Ekstraklasa 2026/27 (2 matcher): https://reports.twelve.football/reports/opposition-report-rak%C3%B3w-cz%C4%99stochowa-PZYHtoZJoP.pdf",
      "Twelve Earpiece scouting report Raków: https://earpiece.twelve.football/shared-reports/8327cfe8-afa5-40ca-8b19-10da7dd5df26",
      "Twelve europakval 2026 – Hammarby IF: https://earpiece.twelve.football/shared-reports/74257486-e0bc-4bdf-a45b-95dabaa6ac0c",
      "Transfermarkt – Raków Częstochowa trupp & värden: https://www.transfermarkt.com/rakow-czestochowa/startseite/verein/14414",
    ],
    cupSpecial: {
      title: "UECL Playoff – Allt avgörs på Tele2 (aggregat 0–0)",
      context:
        "Bortaleg 0–0 i Częstochowa (6 aug): Hammarby höll nollan borta trots att Raków skapade mer (xG 1,63–0,91). Hinmatchen på Tele2 Arena 14 aug avgör allt. Hammarby förlorade mot Anderlecht i EL Q2 (4-2 totalt) och klev ner till UECL-kvalet. Vinnaren av playoff spelar i UEFA Conference League-gruppspelet 2026/27 – Hammarbys första europeiska gruppspel någonsin.",
      tacticalKeys: [
        "Aggregat 0–0: HIF vinner med valfri seger. Oavgjort 90 min → förlängning. Inga bortamål-regeln längre – alla mål räknas lika.",
        "Bortaleg-lärdomar: Raków skapar lägen via high opportunity shots (6 st) men konverterar inte – håll blocket kompakt och pressa högt när HIF har bollen.",
        "Counter-press-fönstret kvarstår: Raków turnover line 55,98m (35:e/36). Bortaleg: 33 HIF-bolltapp mot Raków 0,99 xT inom 10s. Tele2-trycket gör counter-pressen ännu farligare.",
        "HIF offensivt hemma: field tilt 63% borta men bara 1 high opportunity shot. Hemma på Tele2 (22–5 GD, starkast i Allsvenskan) → fler chanser i boxen via combinationer och hörnor.",
      ],
    },
    headToHead: {
      sampleSize: 1,
      description:
        "Hammarby och Raków Częstochowa möttes för första gången i en UEFA-tävling 6 aug 2026 (bortaleg). Matchen slutade 0–0. Returen på Tele2 avgör playoff-aggregatet.",
      summaryCards: [
        {
          title: "Bortaleg (6 aug 2026)",
          value: "Raków 0–0 HIF",
          note: "Raków xG 1,63 · HIF xG 0,91 · Aggregat: 0–0",
          tone: "blue",
        },
        {
          title: "Raków Ekstraklasa 24/25",
          value: "1:a · Polska mästare",
          note: "Dominerade polska ligan och tog mästerskapet.",
          tone: "emerald",
        },
        {
          title: "Hammarby hemma 2026",
          value: "5V 1O 1F",
          note: "22–5 GD · Starkast hemma i Allsvenskan.",
          tone: "emerald",
        },
      ],
      trendBullets: [
        "Bortaleg: 0–0 i Częstochowa (6 aug). HIF höll nollan trots Raków:s 1,63 xG och 6 high opportunity shots.",
        "HIF offensivt borta: 56% bollinnehav, 14 skott, men bara 1 high opportunity shot (xG 0,91). Mer offensiv skärpa krävs hemma.",
        "Raków med UECL-gruppspelserfarenhet (2022/23, 2023/24) – de vet hur man spelar europeiska 2-legstävlingar.",
        "Hammarby hemma 2026: starkast i hela Allsvenskan (22-5, 5V-1O-1F). Tele2 på europakväll är HIF:s starkaste kort.",
      ],
      matches: [
        {
          date: "2026-08-06",
          fixture: "Raków Częstochowa - Hammarby IF",
          result: "0–0",
          venue: "away",
          outcome: "draw",
          hammarbyGoals: 0,
          opponentGoals: 0,
          hammarbyXg: 0.91,
          opponentXg: 1.63,
          hammarbyShots: 14,
          opponentShots: 10,
          sourceUrl:
            "https://reports.twelve.football/reports/hammarby-match-report-vs-rak%C3%B3w-cz%C4%99stochowa-6thZSrmbRj.pdf",
        },
      ],
    },
    trafficLightCards: [
      {
        metric: "Raków offensivt i Europa (Twelve · UECL 25/26)",
        bigNumber: "23:e / 36",
        badge: "MINIMAL ANFALLSFARA",
        color: "green",
        rankNote: "np xG/skott 0,09 (32:a/36) · 49% skott utifrån · final third to box 18% (28:e/36)",
        explanation:
          "Raków:s offensiva kapacitet i europeiskt spel är klart under genomsnittet – 23:e av 36 lag i anfall. De tar 49% av sina skott utifrån boxen (ytterskottplunar) och skapar minimal chanskvalitet (np xG/skott 0,09, 32:a/36). De tar sig knappt in i boxen (final third to box 18%, 28:e/36). I Europa angriper de via bollbärning (24% carries) snarare än korsningar som i Ekstraklasa. HIF:s keeper och kompakta block räcker.",
        podcastComment:
          "De är faktiskt ganska ofarliga offensivt i Europa. Hälften av skotten utifrån, 32:a i xG per skott av 36 lag. Minimal chanskvalitet. Vi ska stå kompakt och låta dem avlossa utifrån – David Hahn klarar det med råge.",
      },
      {
        metric: "Defensiv transition (Twelve · UECL 25/26)",
        bigNumber: "35:e / 36",
        badge: "COUNTER-PRESS-FÖNSTER",
        color: "red",
        rankNote: "Turnover line height 55,98m (35:e/36!) · 36,25 turnovers/match (30:e) · 11,75 final third entries 10s",
        explanation:
          "Raków:s tydligaste svaghet i Europa: de förlorar bollen extremt högt upp (turnover line height 55,98m = 35:e av 36!) och gör 36,25 bolltapp/match (30:e). Motståndare når deras sista tredjedel 11,75 gånger/match inom 10s. HIF:s PPDA 4,93 kombinerat med Raków:s höga bolltappslinje skapar direkta counter-press-möjligheter – vinn bollen nära Raków:s box och konvertera omedelbart.",
        podcastComment:
          "De tappar bollen extremt högt – 35:a av 36 lag i hela UECL. Varje gång vi pressar och vinner bollen nära deras box är det ett direkt läge för oss. Det är HIF:s starkaste vapen i den här matchen.",
      },
      {
        metric: "Pressing i Europa (Twelve · PPDA 5,18 · UECL 25/26)",
        bigNumber: "PPDA 5,18",
        badge: "STARK EUROPRESS",
        color: "yellow",
        rankNote: "6:e / 36 · DAH 42,38m (15:e) · Def. intensity 6,24 (13:e) · Fouls att. half 71%",
        explanation:
          "Raków pressar HÅRDARE i Europa än i Ekstraklasa – PPDA 5,18 (6:e/36 i UECL) mot 5,92 i polska ligan. De är ett av de intensivare pressande lagen i europeiska sammanhang och begår aktivt foul i anfallshalvan (71%) för att bryta rytm. HIF måste vara beredda på aggressivt press och frisparkar högt. HIF:s PPDA 4,93 är fortfarande skarpare, men skillnaden är liten.",
        podcastComment:
          "De pressar hårdare i Europa – PPDA 5,18, topp-6 av 36 lag. Vi måste vara redo för att de stör vår uppbyggnad aktivt och tar foul högt. Men vi pressar lika hårt tillbaka mot deras 3-baks-uppbyggnad.",
      },
    ],
    quickStatusCards: [
      {
        title: "Hammarby just nu",
        body: "2:a i Allsvenskan · Bortaleg 0–0 i Częstochowa (6 aug) – höll nollan trots Raków:s 1,63 xG. Hinmatch på Tele2 14 aug avgör UECL-gruppspelet. Ligaledare i xG, press och bollinnehav.",
        tone: "emerald",
      },
      {
        title: "Raków – bortaleg + aktuell form",
        body: "Bortaleg: skapade mer (xG 1,63, 6 high opp. shots) men slog inte igenom HIF:s block. UECL 2025/26: 9:e/36, defensivt excellent (3:e i opp. chance creation). Svag offensivt i Europa (23:e/36). Ekstraklasa 26/27: 0-4 i 2 matcher.",
        tone: "blue",
      },
      {
        title: "Aggregat: 0–0 – allt avgörs",
        body: "HIF-vinst → UECL-grupp. Oavgjort 90 min → förlängning. Raków-seger → Raków vidare. Historisk chans: UECL-gruppspel vore Hammarbys första europeiska grupp någonsin.",
        tone: "amber",
      },
    ],
    opponentStyle: [
      "Formation 3-4-3 (100% speltid i Ekstraklasa 26/27): tre mittbackar (Jean Carlos, Racovițan, Debohi/Tudor), två wingbackar (Otieno VWB, Ameyaw/Jean Carlos HWB), två CMs (Repka, Kochergin), tre forwards (Pieńko VF, Makuch/Emreli).",
      "UECL 25/26: defensivt stark (12:e/36), excellent på att begränsa motståndares chanser (3:e/36 i opposition chance creation, 0,75 mål insläppt/match = 4:e). Hög press i Europa: PPDA 5,18 (6:e/36), DAH 42,38m.",
      "OFFENSIVT SVAG I EUROPA: 23:e/36 i anfall, 25:e/36 i chance creation. 49% skott utifrån boxen, np xG per skott 0,09 (32:a/36), high opportunity shots 2,25/match (28:e/36). Minimal boxpenetration – final third to box 18% (28:e/36).",
      "I EUROPA: bollbärningsfokuserad attack (24% box entries via carries) – klart annorlunda än Ekstraklasa där de är korsningsdominanta (48%). Bygger upp via GK (88% i Europa) med betoning på korta passningar och dribblingar i sista tredjedelen (0,44 dribbles/possession).",
      "DEFENSIV TRANSITIONS-SVAGHET: turnover line height 55,98m (35:e/36!) – förlorar bollen extremt högt, vilket ger motståndare direkta counter-press-möjligheter. 36,25 bolltapp/match (30:e). Motståndare når deras sista tredjedel 11,75 gånger/match inom 10s.",
      "Spelprofil: överperformerar xPoints med +0,35 (6:e/36) – vinner poäng de statistiskt sett inte 'förtjänar'. Defensiv resiliens och effektivitet i avgörande situationer är deras styrka, inte dominans.",
    ],
    styleProfile: [
      {
        label: "Press Europa (Twelve · UECL 25/26)",
        value: "PPDA 5,18 · 6:e/36 · DAH 42,38m (15:e) · Fouls att. half 71%",
        score: 82,
        explanation:
          "Raków pressar HÅRT i Europa – PPDA 5,18 är 6:e bäst av 36 UECL-lag. Bättre än i Ekstraklasa (5,92). Defensiv action height 42,38m är medelhög. De begår aktivt foul i anfallshalvan (71%, högt) för att bryta tempo. HIF:s uppbyggnad pressas – direktspel IGENOM pressen och snabba kombinationer är svaret. Raków pressa tillbaka lika hårt.",
      },
      {
        label: "Opposition Chance Creation (Twelve · UECL 25/26)",
        value: "3:e/36 · Opp. np xG 1,14 · Opp. goals 0,75/match",
        score: 88,
        explanation:
          "Raków:s starkaste område i Europa: begränsa motståndares chanser. 3:e av 36 lag i opposition chance creation. Opp. final third to box bara 17% (7:e/36) – håller motståndare borta från boxen. Conceder 0,75 mål/match (4:e/36). HIF måste skapa riktiga farliga chanser inne i boxen – ytterskottplunar räcker inte mot ett defensivt disciplinerat Raków.",
      },
      {
        label: "Defensiv transition (Twelve · UECL 25/26)",
        value: "25:e/36 · Turnover line 55,98m (35:e) · 36,25 turnovers (30:e)",
        score: 25,
        explanation:
          "Raków:s klart svagaste område i Europa: defensiv transition. De förlorar bollen extremt högt (turnover line 55,98m, 35:e av 36!) och gör 36,25 bolltapp/match (30:e). Motståndare når deras sista tredjedel 11,75 gånger/match inom 10s. HIF:s PPDA 4,93 + denna svaghet = det tydligaste taktiska exploateringsverktyget i matchen.",
      },
      {
        label: "Offensiv Europa (Twelve · UECL 25/26)",
        value: "23:e/36 · np xG 1,04 (26:e) · final third to box 18% (28:e)",
        score: 28,
        explanation:
          "Raków:s offensiv i Europa är klart under genomsnittet (23:e/36). Minimal boxpenetration (18%, 28:e), minimal skottkvalitet (np xG/skott 0,09, 32:a/36), nästan hälften av skotten utifrån (49%). HIF:s kompakta block och David Hahn räcker – Raków skapar sällan riktigt farliga chanser mot organiserade europeiska försvar.",
      },
      {
        label: "Chance Creation Europa (Twelve · UECL 25/26)",
        value: "25:e/36 · High opp. shots 2,25 (28:e) · Shots from direct 36%",
        score: 32,
        explanation:
          "25:e av 36 i chance creation. High opportunity shots bara 2,25/match (28:e) – skapar extremt sällan riktigt farliga lägen. 36% direktspelsskott – snabba avslutsförsök snarare än tålmodig chansuppbyggnad. HIF:s block-defensiv mot Raków:s yttershot-fokuserade spel är ett gynnsamt scenario.",
      },
      {
        label: "Utfall: Overperformance (Twelve · UECL 25/26)",
        value: "Poäng – xPoäng: +0,35 (6:e/36) · 9:e i utfall",
        score: 72,
        explanation:
          "Raków overperformerar sin statistik signifikant (+0,35 poäng/match, 6:e/36). De vinner matcher de 'inte borde' vinna. Detta speglar defensiv resiliens och effektivitet i avgörande situationer – inte offensiv dominans. HIF kan inte räkna med att 'spela ut' Raków statistiskt, men kan skapa reella chanser via counterpress och corner-play.",
      },
    ],
    spiderComparison: [
      {
        label: "np xG / match",
        hammarbyValue: "~2,19",
        opponentValue: "1,04 (UECL 25/26)",
        hammarbyScore: 100,
        opponentScore: 47,
        note: "HIF skapar mer än dubbelt så mycket xG. Raków:s offensiv i Europa (26:e/36) är klart under genomsnittet.",
      },
      {
        label: "PPDA (lägre = hårdare press)",
        hammarbyValue: "~4,93",
        opponentValue: "5,18 (UECL 25/26)",
        hammarbyScore: 100,
        opponentScore: 95,
        note: "Nästan lika skarpa pressmässigt! Raków PPDA 5,18 = 6:e/36 UECL. Beredda på hårt press från båda håll.",
      },
      {
        label: "Defensiv action height",
        hammarbyValue: "~44,7m",
        opponentValue: "42,38m (UECL 25/26)",
        hammarbyScore: 100,
        opponentScore: 91,
        note: "Raków pressar relativt högt i Europa (42,38m, 15:e/36). HIF pressar högre men skillnaden är liten.",
      },
      {
        label: "Opposition Chance Creation",
        hammarbyValue: "hög (hemma)",
        opponentValue: "3:e / 36 (UECL)",
        hammarbyScore: 85,
        opponentScore: 92,
        note: "Raków är exceptionellt bra på att begränsa motståndarnas chanser (3:e/36). HIF:s boxpenetration måste vara skarp.",
      },
      {
        label: "np xG / shot (skottkvalitet)",
        hammarbyValue: "hög",
        opponentValue: "0,09 (32:a/36 UECL)",
        hammarbyScore: 100,
        opponentScore: 15,
        note: "Raków:s skottkvalitet i Europa är nästan lägst av 36 lag. 49% utifrån. HIF:s keeper vs yttershots.",
      },
      {
        label: "Def. transition (turnover line)",
        hammarbyValue: "låg (strukturerat)",
        opponentValue: "55,98m (35:e/36 UECL)",
        hammarbyScore: 90,
        opponentScore: 10,
        note: "Raków:s svagaste enskilda metrik: förlorar bollen extremt högt. HIF:s counterpress exploaterar detta direkt.",
      },
      {
        label: "Box penetration (final third to box)",
        hammarbyValue: "hög",
        opponentValue: "18% (28:e/36 UECL)",
        hammarbyScore: 100,
        opponentScore: 25,
        note: "Raków kan knappt komma in i boxen i Europa (28:e/36). HIF:s kompakta block håller dem ute.",
      },
      {
        label: "Overperformance (Points – xPoints)",
        hammarbyValue: "—",
        opponentValue: "+0,35 (6:e/36 UECL)",
        hammarbyScore: 50,
        opponentScore: 78,
        note: "Raków vinner poäng de statistiskt sett inte förtjänar (+0,35, 6:e/36). Defensiv resiliens och effektivitet i avgörande lägen.",
      },
    ],
    rankedMetrics: [
      {
        label: "PPDA Europa (Twelve · UECL 25/26)",
        hammarbyValue: "~4,93",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "5,18",
        opponentRank: "6:e / 36 i UECL",
        note: "Raków pressar hårt i Europa – topp-6 av 36 UECL-lag. HIF är skarpare men skillnaden är liten. Beredda på intensiv press.",
      },
      {
        label: "np xG / match (UECL 25/26)",
        hammarbyValue: "~2,19",
        hammarbyRank: "1:a i Allsvenskan",
        opponentValue: "1,04",
        opponentRank: "26:e / 36 i UECL",
        note: "HIF skapar dubbelt så mycket xG i sina respektive ligor. Raków:s offensiv i Europa klart under genomsnittet.",
      },
      {
        label: "np xG per shot (UECL 25/26)",
        hammarbyValue: "hög",
        hammarbyRank: "Topp Allsvenskan",
        opponentValue: "0,09",
        opponentRank: "32:a / 36 i UECL",
        note: "Raków:s skottkvalitet i Europa är nästan lägst av alla 36 lag. 49% utifrån. Minimal fara per avlossning.",
      },
      {
        label: "Final third to box % (UECL 25/26)",
        hammarbyValue: "hög",
        hammarbyRank: "Topp Allsvenskan",
        opponentValue: "18%",
        opponentRank: "28:e / 36 i UECL",
        note: "Raków kan knappt ta sig in i boxen i Europa – 28:e av 36 lag. HIF:s kompakta block räcker.",
      },
      {
        label: "Opposition Chance Creation (UECL 25/26)",
        hammarbyValue: "hög",
        hammarbyRank: "Topp Allsvenskan hemma",
        opponentValue: "3:a / 36",
        opponentRank: "3:e / 36 i UECL",
        note: "Raków:s starkaste område – begränsar motståndarnas chanser exceptionellt väl. HIF måste skapa riktiga boxchanser, inte ytterskottplunar.",
      },
      {
        label: "Turnover line height (UECL 25/26)",
        hammarbyValue: "låg (strukturerat)",
        hammarbyRank: "—",
        opponentValue: "55,98m",
        opponentRank: "35:e / 36 i UECL",
        note: "Raków förlorar bollen extremt högt – 35:e av 36! HIF:s counterpress efter Raków:s bolltapp skapar direkta chanser.",
      },
    ],
    goalWindows: [],
    goalTypeNotes: [
      {
        label: "Raków offensivt i Europa (Twelve · UECL 25/26)",
        value: "np xG 1,04/match (26:e/36) · 49% utifrån · Direktanfall 36% · np xG/skott 0,09 (32:a)",
        interpretation:
          "Raków:s europeiska anfall är klart under genomsnittet. De spelar direktspel (36% direktanfall), tar nästan hälften av skotten utifrån (49%) och skapar minimal chanskvalitet (np xG/skott 0,09 = 32:a/36). I Europa angriper de via bollbärning (24% box entries via carries, 0,44 dribbles/possession) – skillnad mot Ekstraklasa-stilen (48% via korsning). HIF:s block mot yttershots är ett gynnsamt scenario.",
      },
      {
        label: "Raków defensivt i Europa (Twelve · UECL 25/26)",
        value: "3:e/36 opposition chance creation · 0,75 mål insläppt (4:e) · Opp. final third to box 17% (7:e)",
        interpretation:
          "Raków:s defensiva prestationer i UECL är exceptionella – de begränsar motståndarnas chanser bättre än nästan alla andra lag (3:e/36). Opp. final third to box 17% (7:e/36) – håller motståndare borta från boxen. Conceder 0,75 mål/match trots opp. xG 1,23 = klart underperformar motståndarna. HIF:s chansskapande MÅSTE vara skarp (kvalitetschanser inne i boxen) – inte volym.",
      },
      {
        label: "Defensiv transition – turnover-fönstret (Twelve · UECL 25/26)",
        value: "Turnover line 55,98m (35:e/36!) · 36,25 turnovers (30:e) · 11,75 final third entries/10s",
        interpretation:
          "Raków:s absolut svagaste metrik i Europa: turnover line height 55,98m (35:e av 36!) – förlorar bollen extremt högt. 36,25 bolltapp/match (30:e). Motståndare kommer in i deras sista tredjedel 11,75 gånger/match inom 10s efter återerövring. HIF:s counterpress (PPDA 4,93, 1:a Allsvenskan) är skräddarsydd för detta – vinn bollen högt och konvertera omedelbart.",
      },
      {
        label: "Hammarby hemma 2026",
        value: "22-5 · +17 GD (5V-1O-1F)",
        interpretation:
          "Tele2 Arena är en fästning – 22 gjorda och 5 insläppta på 7 hemmamatcher. Starkast hemma i hela Allsvenskan. I ett playoff-scenario är hemmamål extra värda – ett eller gärna två mål i Tele2 ger psykologiskt övertag inför returen. Raków:s overperformance (+0,35 poäng) innebär att HIF inte kan räkna med att 'xG avgör' – effektivitet i de riktiga chanserna som skapas via counterpress och corner-play.",
      },
    ],
    playersToWatch: [
      {
        name: "Tomasz Pieńko",
        position: "LF · 3-4-3 · Vänster forward · 67,5% speltid",
        scoutBadge: "⚡ Vänster kanal – HIF:s höger defensiv",
        stats: [
          { label: "Formation", value: "LF i 3-4-3" },
          { label: "Speltid", value: "67,5%" },
          { label: "Zon", value: "Vänster halvzon" },
        ],
        threat: "Raków:s vänster forward i 3-4-3 – driver deras farligaste anfallskanal (vänster halvzon 0,49 xG/match)",
        motivation:
          "Pieńko spelar som vänster forward i Raków:s 3-4-3 och är central i deras farligaste anfallskanal (vänster halvzon 0,49 xG/match). HIF:s högerback och höger mittfältare måste täcka honom tätt – hindra honom från att ta emot i halvzonen och vända. Han kombinerar med VWB Otieno för att skapa korsningar och genombrott längs Raków:s vänstersida.",
      },
      {
        name: "Erick Ouma Otieno",
        position: "VWB · 3-4-3 · Vänster wingback · 78,5% speltid",
        scoutBadge: "🏃 Korsningshot – stäng inläggsytan",
        stats: [
          { label: "Formation", value: "LWB i 3-4-3" },
          { label: "Speltid", value: "78,5%" },
          { label: "Stil", value: "Offensiv WB, inlägg" },
        ],
        threat: "Raków:s vänster wingback – genererar korsningar längs Raków:s vänstersida, driver 48%-boxpenetrationen via inlägg",
        motivation:
          "Otieno är Raków:s mest spelade wingback och central i deras korsningsorienterade anfall. Som VWB i 3-4-3 driver han linjen längs Raków:s vänstersida och skapar inlägg in i boxen (48% av alla boxinträden via korsning). HIF:s högerback måste täcka inläggsytan och hålla Otieno lågt – ger han fria löpningar mot boxen är de direkt farliga.",
      },
      {
        name: "Patryk Makuch",
        position: "S/RF · 3-4-3 · Anfallare · 95,5% speltid",
        scoutBadge: "🎯 Sexmeterszonen",
        stats: [
          { label: "Formation", value: "S/RF i 3-4-3" },
          { label: "Speltid", value: "95,5%" },
          { label: "Zon", value: "Sexmeterszonen 1,04 xG/match" },
        ],
        threat: "Raków:s mest spelade forward – nyttjar boxens sexmeterzon när korsningarna når honom",
        motivation:
          "Makuch är Raków:s närmast alltid spelande forward (95,5%) och målsätten i boxen. Han är farligast i sexmeterszonen (1,04 xG/match från 5 skott) – Raków:s korsningsspel är designat för att sätta honom i de lägen. HIF:s mittbackspar måste följa honom noggrant i boxen vid varje inlägg. Mahir Emreli (68% speltid) kan ersätta eller komplettera som alternativ forward.",
      },
      {
        name: "Oskar Repka",
        position: "CM · 3-4-3 · Central mittfältare · 100% speltid",
        scoutBadge: "🧠 Mittfältsmotor",
        stats: [
          { label: "Formation", value: "CM i 3-4-3" },
          { label: "Speltid", value: "100%" },
          { label: "Par", value: "Kochergin (68%)" },
        ],
        threat: "Raków:s enda spelare med 100% speltid – mittfältsmotor som kopplar försvar till anfall",
        motivation:
          "Repka är Raków:s mest konstanta spelare (100% speltid i båda matcherna) och deras mittfältsmotor. Han hanterar 58% framåtpassningar från mellanzon och driver Raków:s passningscirkulation. HIF:s mittfält ska pressa Repka och Kochergin tätt – stryp deras distribution och tvinga Raków att spela direktspel bakåt. Raków bygger 100% från GK-utspark – press på Repka:s mottagningar hindrar deras uppbyggnad.",
      },
    ],
    hammarbyPlan: {
      withBall: [
        "Håll undan Raków:s press tidigt: de pressar hårt i Europa (PPDA 5,18, 6:e/36) och begår foul i anfallshalvan (71%). Snabb, direkt spel IGENOM deras press – undvik att bli instängda i eget halvplan. Raków lämnar ytor bakom när de pressar högt.",
        "Exploatera counter-press-fönstret: Raków förlorar bollen extremt högt (turnover line 55,98m, 35:e/36) och tar 6,32s att organisera defensivt. Varje bollvinn högt = ett direkt läge nära Raków:s box. HIF:s snabba transitions (1:a Allsvenskan i press) är huvudvapnet.",
        "Pressa GK-uppbyggnaden (88% via GK-utspark): Raków bygger kort bakifrån – press på deras keeper och tre mittbackar skapar bollvinstlägen direkt i deras uppbyggnadsfas. Vinn bollen i deras halva och konvertera omedelbart.",
        "Utnyttja hörnor: HIF +39 i hörnsaldo (1:a Allsvenskan). Raków insläpper xG från corners (0,21 + 0,14 xG/match). Vältränade corner-rutiner i ett jämt playoff-möte kan vara matchavgörande.",
      ],
      withoutBall: [
        "Kompakt block mot Raków:s dribblare: i Europa angriper de via bollbärning (24% box entries via carries) snarare än korsningar. HIF:s mittfältsblock måste täcka bärningslinjerna och inte ge ytor för snabba löpningar in i halvzonerna med boll.",
        "Vakta vänster halvzon defensivt (UECL-mönster): 0,49 xG/match genererat därifrån i Ekstraklasa, centralt och till vänster i transition. HIF:s högerback och höger CM täcker Pieńko (LF) och Otieno (VWB) tätt.",
        "Hantera ytterskottplunar: 49% av Raków:s skott tas utifrån i Europa. David Hahn vs distansskott är ett hyfsat gynnsamt scenario – håll Raków:s bollbärare UTANFÖR boxen och låt dem skjuta utifrån.",
        "Täta bakre kedjan mot boxinlägg från WBs: Raków dominerar med korsningar i Ekstraklasa (48% av boxinträden). Täta WB-löpningarna mot bylinjen och stäng inläggsytorna – framförallt Otieno (VWB) och Jean Carlos/Ameyaw (HWB).",
      ],
      matchManagement: [
        "Aggregat 0–0: HIF vinner med valfri seger. Håll aggregatet jämnt i inledningen – låt Tele2-publiken bygga trycket. Tidigt mål sätter Raków under press och tvingar dem att öppna upp.",
        "Bortaleg-lärdomen: HIF hade 56% bollinnehav men skapade lite (1 high opportunity shot, np xG 0,91). Hemma på Tele2 → kombinera djupare och snabbare in i boxen istället för att cirkulera i mellanrummen.",
        "Håll nollan i 45 min: Raków skapade mest borta i 1:a halvlek (xG 0,51 på 30 min). HIF:s defensiva transition (33 turnovers borta) måste förbättras – framförallt i mellanzon-segmentet.",
        "Raków overperformerar sin xPoäng (+0,35, 6:e/36 i UECL) – de är effektiva i avgörande situationer. Vakna: ett Raków-mål = 90-minuters defensiv kamp. Varje HIF-möjlighet måste utnyttjas.",
        "Historisk chans: UECL-gruppspelet är Hammarbys första europeiska gruppspel någonsin. Raków är ett väldefinierat lag – vi vet deras svagheter. Tele2 på en europeisk kväll med hemmapublik är Hammarbys starkaste kort.",
      ],
    },
    spotlightKey:
      "Fyra nycklar inför hinmatchen (aggregat 0–0): (1) BORTALEG-LÄRDOMEN: HIF skapade lite offensivt borta (1 high opp. shot, xG 0,91 mot Raków:s 1,63). Hemma på Tele2 → fler kombinationer in i boxen, fler hörnor. (2) COUNTER-PRESS-FÖNSTRET: Raków turnover line 55,98m (35:e/36) och tog 6,32s att organisera defensivt – bekräftades i bortamatch. 33 HIF-bolltapp gav 0,99 xT, men HIF:s egna counter-press-möjligheter var underutnyttjade. Hemma med publiken → exploatera detta hårdare. (3) RAKÓW:S OFFENSIVA SVAGHET I EUROPA: 23:e/36 i anfall, 49% skott utifrån, 6 high opportunity shots i bortaleg men 0 mål. HIF:s block + Hahn håller dem ute. (4) PRESSMATCHNING: PPDA 5,18 (6:e/36) – Raków pressar hårt. HIF måste spela snabbt och direkt IGENOM pressen med corner-rutiner (HIF +39 hörnsaldo, Raków corner-sårbarhet 0,21+0,14 xG/match) som potentiell joker.",
    glossary: [
      {
        term: "PPDA (Passes Per Defensive Action, Twelve)",
        explanation:
          "Motståndarens passningar per defensiv aktion. Lägre = hårdare press. HIF ~4,93 (1:a Allsvenskan). Raków 5,18 i UECL 25/26 (6:e/36!) och 5,92 i Ekstraklasa 26/27. I Europa pressar Raków hårdare än i polska ligan.",
      },
      {
        term: "Turnover line height (Twelve · m)",
        explanation:
          "Genomsnittlig höjd där laget förlorar bollen. Raków 55,98m (35:e/36 i UECL!) – förlorar bollen extremt högt. HIF:s counterpress direkt efter bolltapp skapar lägen nära Raków:s box. Central taktisk exploateringspunkt.",
      },
      {
        term: "np xG per shot (Twelve)",
        explanation:
          "Förväntade mål per icke-straffskott. Raków 0,09 (32:a/36 i UECL) – minimal skottkvalitet. 49% av skotten tas utifrån boxen. HIF:s keeper vs ytterskottplunar är ett gynnsamt scenario.",
      },
      {
        term: "Final third to box % (Twelve)",
        explanation:
          "Andel bollinnehav i sista tredjedelen som når straffboxen. Raków 18% (28:e/36 i UECL) – kan knappt penetrera boxen i Europa. HIF:s kompakta block räcker för att hålla dem ute.",
      },
      {
        term: "Opposition Chance Creation (Twelve · ranking)",
        explanation:
          "Raków: 3:e/36 i UECL 25/26 – excellent på att begränsa motståndarnas chanser. Opp. np xG 1,14 (8:e/36), opp. goals 0,75/match (4:e/36). Defensivt disciplinerade och effektiva – HIF måste skapa riktigt farliga chanser, inte förlita sig på volym.",
      },
      {
        term: "Points – xPoints (Twelve)",
        explanation:
          "Skillnad mellan faktiska poäng och förväntade poäng. Raków +0,35 (6:e/36 i UECL) – overperformerar statistiken markant. Vinner matcher de 'inte borde' vinna. HIF kan inte ha som plan att 'spela ut dem' – effektivitet i chanserna är avgörande.",
      },
    ],
  },
];
