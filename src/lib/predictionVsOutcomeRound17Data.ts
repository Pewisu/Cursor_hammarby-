import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "press-vs-uppbyggnad",
    category: "utan-boll",
    prediction:
      "Kalmar har ligans lägsta pass tempo (15:a, 19,13/min) och pressar sällan (PPDA 6,84). HIF:s press bör tvinga misstag och kortsluta deras uppbyggnad.",
    outcome:
      "Prickat. Hammarby pressade med PPDA 5,26 och tvingade fram 25 turnovers högt upp. Kalmars uppbyggnad kollapsade – 4 avslut totalt och 0,42 xG. Defensive action height 52,16 m visar att HIF låste spelet djupt inne på Kalmars planhalva.",
    verdict: "spot-on",
    evidenceValue: "PPDA 5,26 · Kalmar 4 avslut",
    evidenceLabel: "Press kortslöt Kalmars hela uppbyggnad",
  },
  {
    id: "duellvinner",
    category: "med-boll",
    prediction:
      "Kalmar vinner bara 57% av defensiva dueller (15:a i ligan) – HIF ska söka närkamper och andraboxar aktivt. Varje duellvinst skapar lägen.",
    outcome:
      "Prickat. Hammarby vann duellerna och skapade konstant tryck i Kalmars box (33 boxberöringar mot 4). 25 avslut uppstod ur just detta fysiska övertag. Winther nickade in 0-2 på hörna – ett direkt resultat av duellövertaget.",
    verdict: "spot-on",
    evidenceValue: "33 vs 4 boxberöringar",
    evidenceLabel: "Duellöverlägsenhet omsatt i mål",
  },
  {
    id: "xg-dominans",
    category: "nyckeltal",
    prediction:
      "HIF skapar mest xG i ligan (2,26/match). Kalmar begränsar chanser väl (3:a, opp. HQ-skott 2,56/match). Förväntat: klar xG-fördel men Kalmars organisation kan hålla nere volym.",
    outcome:
      "Klart överträffat. Hammarby nådde 3,78 xG – 67% över sitt eget snitt – och 9 high opportunity shots mot Kalmars 1. Kalmars chansbegränsning som var säsongens starkaste kort höll inte alls (1/28 i opposition chance creation för HIF).",
    verdict: "spot-on",
    evidenceValue: "3,78 xG (HIF) · 0,42 xG (Kalmar)",
    evidenceLabel: "xG-dominansen översteg alla prognoser",
  },
  {
    id: "hemmafort",
    category: "matchmanagement",
    prediction:
      "Varning: Kalmar hemma är ett helt annat lag (5V–2O–1F, 2,13p/match). Guldfågeln Arena ger dem trygghet och bättre defensiv struktur.",
    outcome:
      "Missat. Hemmafördelen materialiserades aldrig. Hammarby körde över Kalmar totalt borta – HIF:s störste allsvenska bortaseger mot Kalmar någonsin. Rydström: 'Utifrån hur det såg ut hade jag velat ha 6–0'.",
    verdict: "missed",
    evidenceValue: "0-4 borta · 3,78 xG",
    evidenceLabel: "Kalmars hemmafördel neutraliserades helt",
  },
];

export const round17PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "Kalmar FF – Hammarby",
  matchResult: "0-4 (0,42–3,78 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Analysen stämde – men utfallet sprängde alla ramar",
  subheadline:
    "Press, dueller och xG-fördel pekades ut inför matchen – alla tre slog in. Men varken Kalmars hemmastyrka (5V-2O-1F) eller deras chansbegränsning (3:a i ligan) höll mot ett Hammarby i toppform. Resultatet 0-4 med 3,78 xG var analytiskt sett osannolikt – och ändå hände det.",
};
