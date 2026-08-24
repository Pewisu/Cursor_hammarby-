import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "early-goal-home",
    category: "matchmanagement",
    prediction:
      "Starta starkt psykologiskt – tidigt mål på 3Arena tar udden av GAIS kompaktet och tvingar dem upp.",
    outcome:
      "Prickat maximalt. Lind 5' och Abraham 10' – 2–0 innan kvartspaus. GAIS tvingades upp, field tilt nådde 100 % i 30–HT, och matchbilden var avgjord.",
    verdict: "spot-on",
    evidenceValue: "2–0 efter 11 min",
    evidenceLabel: "Blixtstarten krossade GAIS planen",
  },
  {
    id: "gais-finish-weakness",
    category: "nyckeltal",
    prediction:
      "GAIS konverterar uselt (0,63 mål/xG). Vid ledning: håll struktur, ge dem ytterskott, lita på att finishen sviker.",
    outcome:
      "Stämde. GAIS fick 1,01 xG och 3 high opportunity shots men 0 mål (1 skott på mål). HIF höll nollan trots sent tryck – finishen svek dem igen.",
    verdict: "spot-on",
    evidenceValue: "GAIS 1,01 xG → 0 mål",
    evidenceLabel: "Finish-problemet avgjorde igen",
  },
  {
    id: "second-half-threat",
    category: "utan-boll",
    prediction:
      "2H-fokus: GAIS gör 13/20 mål efter paus. Extra energi 46–60 och sista 15.",
    outcome:
      "Delvis. GAIS skapade mer xG efter paus (Twelve opp. xG-progression mot 1,01) och höjde hotet sent, men HIF höll strukturen och släppte inte in. Varningen var rätt – utförandet höll.",
    verdict: "partially",
    evidenceValue: "0 insläppta · opp. xG ökade sent",
    evidenceLabel: "Hotet kom – men nollan höll",
  },
  {
    id: "field-tilt-home",
    category: "med-boll",
    prediction:
      "3Arena är HIF:s fästning. Field tilt och press ska diktera matchbilden mot deras counterpress.",
    outcome:
      "Prickat. Field tilt 75 %, bollinnehav 66 % (74 % i 1H), PPDA 3,83. GAIS counterpress och långbollar fick aldrig grepp – särskilt inte före paus.",
    verdict: "spot-on",
    evidenceValue: "Field tilt 75 % · PPDA 3,83",
    evidenceLabel: "Hemmaplansdominansen levererade",
  },
];

export const round18PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "Hammarby – GAIS",
  matchResult: "2-0 (3,00–1,01 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Analys vs utfall",
  subheadline:
    "3 av 4 prediktioner prickat. Tidigt mål, GAIS svaga finish och field tilt hemma slog in. 2H-varningen var delvis rätt – GAIS hotade mer sent men HIF höll nollan.",
};
