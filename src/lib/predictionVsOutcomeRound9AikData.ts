import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "aik-conversion",
    category: "nyckeltal",
    prediction:
      "AIK konverterar bara 8,4% av sina skott – de gör inte mål trots att de har bollen.",
    outcome:
      "FEL. AIK konverterade 18,2% (2 mål på 11 skott) och överträffade sin xG (1,37). De var iskalla när det gällde – raka motsatsen till profilen.",
    verdict: "missed",
    evidenceValue: "AIK 18,2% konvertering (vs 8,4% säsong)",
    evidenceLabel: "Derbyfokus slog ut dålig statistik",
  },
  {
    id: "tempo-control",
    category: "stilprofil",
    prediction:
      "Forcera tempot – AIK har ligans lägsta passtempo (17,14). Hammarby spelar i sitt tempo (19,22) och tvingar AIK att springa.",
    outcome:
      "Delvis. Hammarbys passtempo var 20,58 (bra). Men bollinnehavet landade på bara 53% (vs 61% snitt) – AIK lyckades sakta ner matchen mer än förväntat.",
    verdict: "partially",
    evidenceValue: "20,58 pass tempo ✓ · 53% boll (vs 61% snitt) ✗",
    evidenceLabel: "Tempot var högt men AIK tog bollen oftare än väntat",
  },
  {
    id: "press-quality",
    category: "utan-boll",
    prediction:
      "Pressa HÖGT men SMART – AIK tappar sällan bollen (29,6/match). Pressa första passningen.",
    outcome:
      "Misslyckades. PPDA 6,76 (vs 5,81 snitt) = lägre pressintensitet. Duellvinst bara 53% (vs snitt). Pressen saknade skärpa och AIK kunde spela sig ur.",
    verdict: "missed",
    evidenceValue: "PPDA 6,76 (vs 5,81 snitt) · Duellvinst 53%",
    evidenceLabel: "Passiv press → AIK fick andrum att bygga spel",
  },
  {
    id: "box-volume",
    category: "med-boll",
    prediction:
      "Attackera boxen med volym – AIK släpper in 4,38 HQ-skott/match (14:e i ligan).",
    outcome:
      "Stämde. 22 boxberöringar, 6 HQ-skott, 17 avslut och 2,0 xG. Chanserna fanns – men bara 1 mål. Slutprodukten saknades, inte strategin.",
    verdict: "spot-on",
    evidenceValue: "22 box touches · 6 HQ-skott · 2,0 xG → 1 mål",
    evidenceLabel: "Rätt plan, usel avslutning (5,9% konvertering)",
  },
  {
    id: "turnover-control",
    category: "utan-boll",
    prediction:
      "Lärdomar från GAIS: 44 turnovers = döden. Mot AIK max 30 – bollsäkerhet i uppspelet.",
    outcome:
      "Stämde. Hammarby hade 30 turnovers – precis på gränsen. Dessutom 0,76 xT via omställningar (över snittet 0,67). Bollsäkerheten var en klar förbättring från GAIS.",
    verdict: "spot-on",
    evidenceValue: "30 turnovers (vs 44 mot GAIS) · 0,76 xT transition",
    evidenceLabel: "GAIS-lärdomen togs – men det räckte inte",
  },
  {
    id: "early-goals",
    category: "matchmanagement",
    prediction:
      "0-15: tryck DIREKT. AIK släpper in 3 mål i öppningen. Sätt ton och ta ledningen tidigt.",
    outcome:
      "Misslyckades. Inga mål i första perioden. Hammarbys xG 0-15 var bara 0,32 – långt under den explosiva start som planen krävde. AIK kontrollerade inledningen.",
    verdict: "missed",
    evidenceValue: "0,32 xG (0-15 min) · 0 mål",
    evidenceLabel: "Ingen tidig dominans – AIK stod emot",
  },
  {
    id: "discipline",
    category: "matchmanagement",
    prediction:
      "Derbykontroll: håll disciplinen. Inget rött kort (lärdom från GAIS).",
    outcome:
      "Stämde. 1 gult kort, 0 röda. Disciplinen höll denna gång – en direkt förbättring från GAIS-matchen där rött kort avgjorde.",
    verdict: "spot-on",
    evidenceValue: "1 gult · 0 röda kort",
    evidenceLabel: "Disciplinlärdomen från GAIS implementerades",
  },
];

export const round9AikPredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "Hammarby - AIK",
  matchResult: "1-2 (2,0-1,37 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Stämde analysen?",
  subheadline:
    "Strategin stämde i stora drag – boxpenetration och bollsäkerhet fungerade. Men pressen var för passiv, AIK:s konvertering överraskade, och den tidiga dominansen uteblev helt.",
};
