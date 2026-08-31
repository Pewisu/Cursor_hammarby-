import type { PredictionItem, PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "press-tempo",
    category: "nyckeltal",
    prediction:
      "Nyckel: tryck i högt tempo och tvinga Malmö att försvara längre sekvenser utan boll.",
    outcome:
      "Hammarby pressade aggressivt med PPDA 3,87 och skapade 28 avslut (säsongens högsta mot ett topplag). Malmö fick bara 44% bollinnehav.",
    verdict: "spot-on",
    evidenceValue: "PPDA 3,87 · 28 avslut",
    evidenceLabel: "vs säsongssnitt 3,94 PPDA och 20,6 avslut",
  },
  {
    id: "malmo-low-block",
    category: "stilprofil",
    prediction:
      "Twelve: Malmö försvarar djupt (defensive action height 39,2 m) och återerövrar sällan inom 5s (9%).",
    outcome:
      "Hammarby utnyttjade detta perfekt. 42 recoveries, recovery line på 46,78m och 1,25 xT inom 10s efter bollvinst – säsongens bästa omställningsvärden.",
    verdict: "spot-on",
    evidenceValue: "42 rec. · 46,78m · 1,25 xT",
    evidenceLabel: "Exceptionella omställningsvärden",
  },
  {
    id: "early-pressure",
    category: "matchmanagement",
    prediction:
      "Tryck i inledning (0-15) och direkt efter paus (46-60) – perioder där Malmö släppt in flest mål.",
    outcome:
      "Hammarby exploderade tidigt och gjorde 3 mål innan halvtid. xT 0-15: 0,43 (högst av alla perioder). Matchbilden var avgjord redan vid paus.",
    verdict: "spot-on",
    evidenceValue: "3-0 vid HT · 0,47 xT 0-15 (transition)",
    evidenceLabel: "Malmö hade släppt in 3 mål i 0-15 under säsongen",
  },
  {
    id: "box-attacks",
    category: "med-boll",
    prediction:
      "Attackera boxen med fler andra-vågs-löpningar – Malmö släpper in majoriteten av sina mål där.",
    outcome:
      "47 bollkontakter i box (säsongsrekord) och 7 högkvalitetsskott. Hammarby dominerade straffområdet fullständigt. 52 box touches enligt Twelve.",
    verdict: "spot-on",
    evidenceValue: "47 boxberöringar · 7 HQ-skott",
    evidenceLabel: "Säsongsrekord i boxpenetration",
  },
  {
    id: "pass-frequency",
    category: "med-boll",
    prediction:
      "Håll hög passningsfrekvens för att dra isär Malmö och skapa centrala avslutslägen.",
    outcome:
      "476 passningar (87% lyckade). Twelve: huvudsakligen centrala chanser – 0,72 xG från golden zone och halvrum. Malmö drogs isär centralt.",
    verdict: "spot-on",
    evidenceValue: "476 pass (87%) · Central xG: 1,34",
    evidenceLabel: "Potent centralt enligt Twelve",
  },
  {
    id: "halvrum-ytterzon",
    category: "med-boll",
    prediction:
      "Använd växelspel mellan halvrum och ytterzon för att få Malmö att försvara i längre sekvenser.",
    outcome:
      "Twelve bekräftar: majoriteten av xG kom från centrala zoner och halvrum. Ytterkanterna genererade dock nära noll – spelet var nästan uteslutande centralt.",
    verdict: "partially",
    evidenceValue: "0,03 xG höger kant · 0,00 vänster kant",
    evidenceLabel: "Centralt dominant, men ytterzon användes lite",
  },
  {
    id: "protect-midfield",
    category: "utan-boll",
    prediction:
      "Skydda ytan bakom mittfältet direkt efter bolltapp för att minska Malmös omställningshot.",
    outcome:
      "Hammarby tappade bollen bara 26 gånger (säsongens lägsta). Malmö fick bara 4 possessions till sista tredjedelen inom 10s. Men 0,20 opp xG via transitions – lite hög.",
    verdict: "partially",
    evidenceValue: "26 turnovers · 4 opp. poss. FT inom 10s",
    evidenceLabel: "Låg turnover, men 0,20 xG i transition",
  },
  {
    id: "early-press-backline",
    category: "utan-boll",
    prediction:
      "Sätt tidig press på första passningen ur Malmö backlinje för att bryta framåtriktad progression.",
    outcome:
      "Defensiv aktionhöjd 45,43m – i nivå med säsongssnittet. Malmö fick bara 27% possessions till sista tredjedelen. Pressen fungerade.",
    verdict: "spot-on",
    evidenceValue: "45,43m DAH · 27% opp. poss. FT",
    evidenceLabel: "Malmö stoppades effektivt",
  },
  {
    id: "lock-central",
    category: "utan-boll",
    prediction:
      "Lås centrala ytor i egen tredjedel och tvinga Malmö till avslut från sämre lägen.",
    outcome:
      "Malmö fick bara 10 avslut (2 på mål) med 0,10 xG/skott – under ligasnittet. De flesta chanser kom från vänster halvrum snarare än centralt.",
    verdict: "spot-on",
    evidenceValue: "10 skott (2 på mål) · 0,10 xG/skott",
    evidenceLabel: "Låg skottkvalitet från Malmö",
  },
  {
    id: "patience-at-draw",
    category: "matchmanagement",
    prediction:
      "Behåll tålamod vid oavgjort – Hammarbys volymspel ger ofta utdelning över 90 minuter.",
    outcome:
      "Matchen var aldrig oavgjord länge – Hammarby tog ledningen tidigt. Men den explosiva starten bekräftar volymfilosofin. 3,62 xG totalt.",
    verdict: "partially",
    evidenceValue: "3,62 xG · 4 mål",
    evidenceLabel: "Behövde inte tålamod – avgjorde direkt",
  },
  {
    id: "secure-midfield-at-lead",
    category: "matchmanagement",
    prediction:
      "Vid ledning: säkra mitten och andrabollen före offensiv risk för att kontrollera matchen.",
    outcome:
      "Hammarby kontrollerade andra halvlek efter 3-1 vid paus. Malmö fick bara 0,09 xT 45-60 och 0,23 xT 60-75. Matchen stängdes ner effektivt.",
    verdict: "spot-on",
    evidenceValue: "Opp. xT 2H: 0,50 (vs 0,91 1H)",
    evidenceLabel: "Kontrollerad andra halvlek",
  },
  {
    id: "xg-prediction",
    category: "nyckeltal",
    prediction:
      "Hammarby producerar högre xG per match (2,09) än Malmö FF (1,45).",
    outcome:
      "Hammarby: 3,62 xG (np: 2,86). Malmö: 1,04 xG. Skillnaden var ännu STÖRRE än förväntat.",
    verdict: "spot-on",
    evidenceValue: "3,62 vs 1,04 xG",
    evidenceLabel: "Förväntad: 2,09 vs 1,45 – faktisk skillnad 3x större",
  },
  {
    id: "shots-volume",
    category: "nyckeltal",
    prediction:
      "Hammarby 1:a i avslut/match (20,57). Malmö 3:a (14,00).",
    outcome:
      "Hammarby 28 avslut. Malmö 10. Ännu större gap än säsongssnitten indikerade – Hammarby helt dominanta.",
    verdict: "spot-on",
    evidenceValue: "28 vs 10 avslut",
    evidenceLabel: "Förväntad: 20,6 vs 14,0 – gapet växte",
  },
  {
    id: "goal-window-0-15",
    category: "nyckeltal",
    prediction:
      "Malmö FF har släppt in 3 mål i 0-15 under säsongen – sårbar tidigt.",
    outcome:
      "Hammarby slog till direkt med massiv xT tidigt (0,47 transitions-xT i 0-15). Första målet kom mycket tidigt.",
    verdict: "spot-on",
    evidenceValue: "0,47 xT (transition) 0-15 min",
    evidenceLabel: "Malmös kända svaghet i tidig fas exploaterades",
  },
  {
    id: "malmo-offensive-output",
    category: "stilprofil",
    prediction:
      "Malmö har fungerande offensiv (xG 1,45/match, 14 avslut) men ojämn kurva.",
    outcome:
      "Malmö fick bara 1,04 xG och 10 avslut – klart under sin egen säsongsnorm. Hammarby strypte dem helt.",
    verdict: "spot-on",
    evidenceValue: "1,04 xG · 10 avslut (under säsongssnitt)",
    evidenceLabel: "Malmö undertrycktes kraftigt",
  },
  {
    id: "malmo-transitions-weak",
    category: "stilprofil",
    prediction:
      "Malmös defensiva transition svag – recoveries within 5s bara 9%.",
    outcome:
      "Hammarby fick 13 possessions till box inom 10s efter recovery och 0,65 xG via transitions – extremvärden. Malmö kunde inte hindra Hammarbys omställningar.",
    verdict: "spot-on",
    evidenceValue: "13 poss. till box · 0,65 xG (transition)",
    evidenceLabel: "Malmös sårbarhet blev avgörande",
  },
];

export const round8PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "Hammarby - Malmö FF",
  matchResult: "4-1 (3,62-1,04 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Stämde analysen?",
  subheadline:
    "Jämförelse mellan förhandsanalysens prediktioner (inför omgång 8) och vad som faktiskt hände i Hammarby 4-1 Malmö FF.",
};
