import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "crossing-dependency",
    category: "stilprofil",
    prediction:
      "Häckens anfallsspel bygger på inlägg (42% box entries via inlägg). Blockera kanterna = stryp deras anfallsspel.",
    outcome:
      "FEL. Häcken behövde inga inlägg. De skapade 3,71 xG och 29 boxberöringar via omställningar och raka anfall – INTE via inläggen vi fokuserade på. Problemet var transitions, inte inlägg.",
    verdict: "missed",
    evidenceValue: "Häcken 3,71 xG · 29 box touches · 20 skott",
    evidenceLabel: "Häcken övergav sin inläggsprofil och slog till via transitions istället",
  },
  {
    id: "press-advantage",
    category: "utan-boll",
    prediction:
      "Hammarbys höga press (PPDA 4,20) mot Häckens passiva (6,00). Pressa deras uppspel och forcera deras 35,78 turnovers/match.",
    outcome:
      "Stämde i siffran men inte i effekten. PPDA 3,91 (ännu bättre). Men Hammarby HAD 49 turnovers själva (vs 31,7 snitt) – pressen blev ett tvåeggat svärd som öppnade enorma ytor.",
    verdict: "partially",
    evidenceValue: "PPDA 3,91 ✓ · 49 turnovers ✗ (vs 31,7 snitt)",
    evidenceLabel: "Hög press men Hammarby tappade bollen 54% mer än normalt",
  },
  {
    id: "exploit-turnovers",
    category: "utan-boll",
    prediction:
      "Exploatera Häckens bolltapp (35,78/match). Hammarbys 40,5 recoveries/match ska straffa varje turnover.",
    outcome:
      "TOTALT FEL. Det var HÄCKEN som exploaterade Hammarbys turnovers. 49 bolltapp → Häcken fick 17 possessions till FT inom 10s och 11 till boxen. 0,67 opp xG via transitions. Matchen avgjordes av Hammarbys egna bolltapp.",
    verdict: "missed",
    evidenceValue: "Hammarby 49 turnovers · Häcken 0,67 xG via transition",
    evidenceLabel: "Rollerna blev omvända – Hammarby var det slarvig laget",
  },
  {
    id: "field-tilt",
    category: "med-boll",
    prediction:
      "Exploatera field tilt-fördelen (70% vs 49%). Dominera sista tredjedelen. Häcken har inte strukturen att pressa ut oss.",
    outcome:
      "Delvis. Field tilt 62% (under Hammarbys 70% snitt men fortfarande dominant). 35% FT-to-box-ratio var starkt. Hammarby dominerade sista tredjedelen – men det hjälpte inte defensivt.",
    verdict: "partially",
    evidenceValue: "Field tilt 62% · FT-to-box 35% (vs 26% snitt)",
    evidenceLabel: "Dominerade framåt men blödde bakåt",
  },
  {
    id: "second-half-collapse",
    category: "matchmanagement",
    prediction:
      "Hammarby gör flest mål 61-75 och 76-90+. Behåll intensiteten sent – Häckens defensiv tröttnar.",
    outcome:
      "TOTALT OMVÄNT. Häcken skapade 0,81 xG bara i 45-60 (vs 0,32 xG hela första halvlek). Defensiv kollaps direkt efter paus – tre snabba mål. Hammarbys senhalvlek var en katastrof istället för en styrka.",
    verdict: "missed",
    evidenceValue: "Opp. xG 45-60: 0,81 · 60-75: 0,52 · 2H total: 1,79 xG",
    evidenceLabel: "Andra halvleks kollaps – värsta 15-minutersperioden på hela säsongen",
  },
  {
    id: "overconversion-warning",
    category: "nyckeltal",
    prediction:
      "Häcken konverterar bra (1,78 vs 1,59 xG) – ge dem INGA billiga chanser. Kontrollera matchen snarare än öppna den.",
    outcome:
      "Stämde som varning men vi IGNORERADE den. Häcken fick 2,95 np xG – vi öppnade matchen totalt. 5 HQ-skott emot, 27 opp box touches. Det spelade ingen roll att de överkonverterar – vi gav dem för mycket.",
    verdict: "missed",
    evidenceValue: "Opp. np xG 2,95 · 5 HQ-skott emot · 27 opp box touches",
    evidenceLabel: "Varnade för att inte ge chanser – gav dem säsongens mest",
  },
  {
    id: "box-volume",
    category: "med-boll",
    prediction:
      "Hammarbys boxberöringar (29,4/match) mot Häckens 21,3. Attackera centralt med volym.",
    outcome:
      "Stämde offensivt. 22 box touches, 5 HQ-skott, 1,94 np xG, 2 mål. Hammarbys anfall levererade – men boxberöringar räcker inte när man släpper in 3.",
    verdict: "spot-on",
    evidenceValue: "22 box touches · 5 HQ-skott · 1,94 xG → 2 mål",
    evidenceLabel: "Anfallet fungerade – försvaret förstörde allt",
  },
];

export const round10PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "BK Häcken - Hammarby",
  matchResult: "3-2 (3,71-1,94 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Andra halvleks kollaps",
  subheadline:
    "Hammarby ledde matchen men föll ihop totalt efter paus. Häcken skapade 0,81 xG bara i 45-60 (vs 0,32 hela 1H). 49 turnovers – 54% fler än snittet – öppnade ytor som Häcken utnyttjade iskall via omställningar. Analysen pekade rätt om att inte öppna matchen, men Hammarby gjorde exakt det.",
};
