import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

/**
 * Förhandsanalys (Kommande · AIK omg 19) vs utfall.
 * Planen från hammarbyPlan/spotlightKey i aikRound19UpcomingData.
 */
const predictions: PredictionItem[] = [
  {
    id: "force-tempo",
    category: "med-boll",
    prediction:
      "Forcera tempot OMEDELBART. AIK passtempo 18,19 (16:e) – spela i HIF:s rytm och tvinga dem att springa i egen arena.",
    outcome:
      "Delvis. HIF hade 56 % boll och pass tempo 19,41 (Twelve) – högre än AIK – men derbyt låste sig i omställningar snarare än ett ihållande tempoövertag. Field tilt 74 % visar territoriell dominans, men AIK fick andrum nog att kontra.",
    verdict: "partially",
    evidenceValue: "Pass tempo 19,41 · field tilt 74 %",
    evidenceLabel: "Tempo/tilt fanns – matchbilden blev ändå omställningsdriven",
  },
  {
    id: "box-volume",
    category: "med-boll",
    prediction:
      "Attackera boxen med volym: AIK släpper till 5,24 HQ-skott och 2,03 opp. np xG/match. Halvrum + sista passning, inte ytterskott.",
    outcome:
      "Prickat i skapandet. 39 boxberöringar (Bolldata), 37 (Twelve), 12 HO-shots, np-xG 3,85. Båda HIF-målen kom ur boxlägen. Volymplanen levererade – finishen och bakåtpassningsspelet gjorde det inte.",
    verdict: "spot-on",
    evidenceValue: "39 box · 12 HO-shots · 3,85 np-xG",
    evidenceLabel: "Boxvolymen var exakt enligt plan",
  },
  {
    id: "no-cheap-turnovers",
    category: "med-boll",
    prediction:
      "Cirkulera under deras counterpress (Def. Transition 3:a). HIF:s passningsprecision är vapnet – tappa inte billigt högt.",
    outcome:
      "Misslyckades i de avgörande momenten. Twelve: turnovers 28, recoveries within 5s bara 3 %, slow recovery after turnovers. AIK:s xT within 10s after recovery räckte till tre mål via Filling-drivna kontringar.",
    verdict: "missed",
    evidenceValue: "Recoveries <5s: 3 % · AIK 3 omställningsmål",
    evidenceLabel: "Billiga tapp högt bestraffades hårt",
  },
  {
    id: "shut-besirovic-carlstrand",
    category: "utan-boll",
    prediction:
      "Stäng Beširović mellan linjerna och Carlstrand i boxen. Carlstrand straffar slarv (4 mål / 229 min).",
    outcome:
      "Misslyckades med Carlstrand – han startade och kvitterade redan i 15' (assist Filling). Beširović byttes ut i 40'. Hotet förflyttades till Filling/Kouame/Gustafsson, men finish-varningen om AIK:s box-variance var rätt.",
    verdict: "missed",
    evidenceValue: "Carlstrand 15' · sedan Kouame/Gustafsson",
    evidenceLabel: "Carlstrand-varningen slog in – och fler följde",
  },
  {
    id: "limit-carries",
    category: "utan-boll",
    prediction:
      "Begränsa carries in i boxen (23 % av AIK:s box entries). Tvinga dem ut mot kanten och inlägg där HIF är starkare.",
    outcome:
      "Misslyckades. Filling sprang loss i högerkanalen till båda kvitteringarna (Carlstrand, Kouame). Camaras inlägg till Gustafssons volley avgjorde. AIK:s carry/kant-hot var matchens skillnad.",
    verdict: "missed",
    evidenceValue: "Filling 2 assists · Camara→Gustafsson 83'",
    evidenceLabel: "Carry/kant-hotet avgjorde derbyt",
  },
  {
    id: "open-15-press",
    category: "matchmanagement",
    prediction:
      "0–15: tryck DIREKT. AIK släpper in 5 mål i öppningen. Sätt ton på Strawberry innan hemmapubliken hinner växa.",
    outcome:
      "Prickat i öppningen. Adjei 14' – tidig ledning borta. Men kvitteringen kom direkt (15'). Tonen sattes, poängen hölls inte kvar.",
    verdict: "partially",
    evidenceValue: "Adjei 14' · Carlstrand 15'",
    evidenceLabel: "Tidigt mål – men ledningen varade en minut",
  },
  {
    id: "late-variance-zone",
    category: "matchmanagement",
    prediction:
      "76–90+: AIK:s variance-zon – Carlstrand och sena mål. Håll struktur OCH intensitet; deras överprestation lever här.",
    outcome:
      "Prickat maximalt – och värre. Kouame 72', Gustafsson 83'. Precis den sena variance-zonen där AIK tar 'orättvisa' poäng. HIF ledde länge men tappade allt efter 70'.",
    verdict: "spot-on",
    evidenceValue: "2–2 72' · 3–2 83'",
    evidenceLabel: "Variance-zonen 70–90 avgjorde allt",
  },
];

export const round19PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "AIK – Hammarby",
  matchResult: "3-2 (1,91–4,26 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Analys vs utfall · boxplanen höll, bakåt spelet inte",
  subheadline:
    "2 av 7 prediktioner prickade, 2 delvis, 3 missade. HIF levererade boxvolym och tidigt bortamål – men tappade billigt i transition, släppte Filling/Carlstrand fritt och föll i AIK:s variance-zon 70–90. Scoutingplanen varnade rätt om sena mål; utförandet bakåt räckte inte.",
};
