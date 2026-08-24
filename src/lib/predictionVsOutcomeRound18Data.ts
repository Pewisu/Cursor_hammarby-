import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

/**
 * Förhandsanalys (Kommande · GAIS omg 18) vs utfall.
 * Planen från hammarbyPlan/spotlightKey i gaisRound18UpcomingData –
 * särskilt 1H där HIF utförde receptet nästan exakt.
 */
const predictions: PredictionItem[] = [
  {
    id: "early-goal-home",
    category: "matchmanagement",
    prediction:
      "Starta starkt psykologiskt – tidigt mål på 3Arena tar udden av GAIS kompaktet och tvingar dem upp.",
    outcome:
      "Prickat maximalt i 1H. Lind 5' (Madjed) och Abraham 10' (Lind) – 2–0 innan kvartspaus. GAIS tvingades upp, field tilt nådde 100 % i 30–HT och matchbilden var avgjord innan paus.",
    verdict: "spot-on",
    evidenceValue: "2–0 efter 11 min · HT 2–0",
    evidenceLabel: "Blixtstarten var exakt planen",
  },
  {
    id: "field-tilt-press-1h",
    category: "med-boll",
    prediction:
      "3Arena + field tilt + press ska diktera matchbilden. Cirkulera under deras höga press och omsätt dominans i boxchanser – inte halvchanser utifrån.",
    outcome:
      "1H var facit: FotMob 74 % boll, 1,78 xG, 21–2 avslut, 28–6 boxberöringar, 6–0 på mål. Twelve: boll 71–80 % per block, field tilt upp till 100 % i 30–HT, PPDA 3,83 över hela matchen. Receptet kördes rakt av.",
    verdict: "spot-on",
    evidenceValue: "1H: 74 % · 1,78 xG · 21 avslut",
    evidenceLabel: "Första halvlek = planen i praktiken",
  },
  {
    id: "box-quality",
    category: "med-boll",
    prediction:
      "Attackera straffområdet: HIF 1:a i boxberöringar. Halvrumslöpningar + sista passning – straffa dem inne i boxen.",
    outcome:
      "Stämde. Helmatch 37 boxberöringar (Bolldata) / 35 (Twelve). Båda målen kom från boxlägen (Lind 0,25 xG, Abraham 0,52 xG). 1H ensamt: 28 boxberöringar och nästan allt av matchens xG (~2,5 np-xG före paus).",
    verdict: "spot-on",
    evidenceValue: "37 box · 2 mål inne i box",
    evidenceLabel: "Boxplanen levererade båda målen",
  },
  {
    id: "gais-finish-weakness",
    category: "nyckeltal",
    prediction:
      "GAIS konverterar uselt (0,63 mål/xG). Vid ledning: håll struktur, ge dem ytterskott, lita på att finishen sviker.",
    outcome:
      "Stämde. Ledning 2–0 tidigt → GAIS fick 1,01 xG och 3 HO-shots men 0 mål (1 skott på mål). Finish-problemet som scoutingflaggan pekade på avgjorde igen.",
    verdict: "spot-on",
    evidenceValue: "GAIS 1,01 xG → 0 mål",
    evidenceLabel: "Finish-svagheten höll nollan",
  },
  {
    id: "long-balls-second-ball",
    category: "utan-boll",
    prediction:
      "Nyckel: vinna andrabollen mot deras långbollar (49/match, 1:a), blockera första långbollen och låt inte counterpressen starta kontringar.",
    outcome:
      "I 1H fick GAIS knappt ett anfallsspår – 2 avslut, 0 på mål, 0,12 xG (FotMob). HIF:s PPDA 3,83 och defensiva intensitet 8,56 stängde långbollsspelet innan det blev farligt. Först sent i 2H ökade GAIS-hotet.",
    verdict: "spot-on",
    evidenceValue: "1H: GAIS 2 avslut · 0,12 xG",
    evidenceLabel: "Långbollshotet kvävdes i 1H",
  },
  {
    id: "discipline-eleven",
    category: "matchmanagement",
    prediction:
      "Disciplin först: Skoglunds röda 70' i maj vände matchbilden. Inga onödiga gula i pressdueller – håll 11 man.",
    outcome:
      "Prickat. HIF 0 gula / 0 röda. GAIS 2 gula (Sletsjøe 42', de Brienne 75'). Domarindex +9 under Victor Wolf. Ingen upprepning av maj-fällan.",
    verdict: "spot-on",
    evidenceValue: "HIF 0 kort · GAIS 2 gula",
    evidenceLabel: "Disciplinen höll – 11 man hela vägen",
  },
  {
    id: "second-half-threat",
    category: "utan-boll",
    prediction:
      "2H-fokus: GAIS gör 13/20 mål efter paus. Extra energi 46–60 och sista 15.",
    outcome:
      "Delvis. Varningen var rätt – GAIS xG och hot ökade efter paus – men HIF höll strukturen och släppte inte in. Utförandet i 2H var kontroll, inte samma dominans som 1H.",
    verdict: "partially",
    evidenceValue: "0 insläppta · opp. xG ökade sent",
    evidenceLabel: "Hotet kom – nollan höll",
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
  headline: "Analys vs utfall · förhandsplanen höll",
  subheadline:
    "6 av 7 prediktioner prickat, 0 missade. Första halvlek var nästan en kopia av scoutingplanen: tidigt mål, field tilt, boxkvalitet, kvävd långboll och klinisk finish mot GAIS svaga konvertering. 2H-varningen var den enda som bara delvis slog in – hotet kom, nollan höll.",
};
