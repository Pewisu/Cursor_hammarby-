import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "field-tilt",
    category: "med-boll",
    prediction:
      "Exploatera field tilt-fördelen (70% vs 46%). Elfsborg pressar passivt (PPDA 7,20) – bygg lugnt och dominera sista tredjedelen.",
    outcome:
      "Delvis. Field tilt 56% (under Hammarbys 70% snitt men fortfarande över Elfsborg). 48 possessioner i sista tredjedelen och 57% bollinnehav – territoriell kontroll fanns, men inte på toppnivå.",
    verdict: "partially",
    evidenceValue: "Field tilt 56% · 57% boll · 48 FT-poss",
    evidenceLabel: "Dominerade – men inte lika överlägset som i snitt",
  },
  {
    id: "press-advantage",
    category: "utan-boll",
    prediction:
      "Pressa med PPDA 4,19 (1:a i ligan) mot Elfsborgs passiva 7,20. Stör uppspelet och forcera deras 30,91 turnovers/match.",
    outcome:
      "Missat. PPDA 7,40 – betydligt högre (lägre press) än både plan (4,19) och säsongssnitt (6,22). Hammarby lät Elfsborg spela mer än förhandsanalysen rekommenderade.",
    verdict: "missed",
    evidenceValue: "PPDA 7,40 (vs 4,19 plan · 6,22 snitt)",
    evidenceLabel: "Passivare press än hela säsongen",
  },
  {
    id: "xg-dominance",
    category: "nyckeltal",
    prediction:
      "Hammarby 1:a i xG (2,16/match) mot Elfsborgs 1,36. Sikta på 4+ HQ-skott och utnyttja volymfördelen.",
    outcome:
      "Prickat. 2,48 np xG mot 1,03 – massiv kvalitetsfördel. 18 avslut och 9 skott på mål. Hammarby skapade chanserna som planen utlovade.",
    verdict: "spot-on",
    evidenceValue: "2,48 xG · 18 avslut · 9 på mål",
    evidenceLabel: "Offensiv dominans omsatt i data",
  },
  {
    id: "box-volume",
    category: "med-boll",
    prediction:
      "Hammarbys 28,8 boxberöringar/match (Twelve) mot Elfsborgs 15,8. Volymfördelen ska skapa tryck.",
    outcome:
      "Delvis. 22 boxberöringar (HIF) mot 18 (Elfsborg) – Hammarby ledde men inte med den dubbla marginal som i säsongssnittet. Tillräckligt för segern, inte för totalt överläge.",
    verdict: "partially",
    evidenceValue: "22 vs 18 box touches",
    evidenceLabel: "Fördel fanns – men inte lika stor som väntat",
  },
  {
    id: "limit-elfsborg-shots",
    category: "utan-boll",
    prediction:
      "Begränsa Elfsborgs få omställningar. Deras xG (1,36) och xT (1,24) per match är låga – ge dem INGA lätta kontringar.",
    outcome:
      "Prickat. Elfsborg begränsades till 14 avslut och 1,03 xG. Defensiv transition höll – bara ett mål via Sigurpálsson (76') efter att Hammarby redan ledde 2-0.",
    verdict: "spot-on",
    evidenceValue: "14 avslut · 1,03 opp. xG · 1 mål",
    evidenceLabel: "Elfsborgs låga volym begränsades effektivt",
  },
  {
    id: "second-half-danger",
    category: "matchmanagement",
    prediction:
      "Elfsborg gör 11 av 16 mål efter paus (46-90+). Håll intensiteten – andra halvlek kan bli avgörande.",
    outcome:
      "Delvis. Alla tre målen kom efter paus (49', 73', 76'). Hammarby gjorde båda sina i 2H – Elfsborg slog till sent som varnat. Segern höll men matchen var öppen till slutet.",
    verdict: "partially",
    evidenceValue: "Mål 49' · 73' · 76'",
    evidenceLabel: "Sen dramatik – precis som profilen varnade för",
  },
  {
    id: "rydstrom-debut",
    category: "matchmanagement",
    prediction:
      "Rydströms första riktiga test. Elfsborg borta blir ett tidigt riktmärke – kan offensiv dominans omsättas i poäng?",
    outcome:
      "Prickat. Bortaseger 2-1 med tydlig xG-fördel. Rydström fick Hammarbys redan starka lagdata att bita mot ett lag med bara en förlust. Tredje raka HIF-seger mot Elfsborg.",
    verdict: "spot-on",
    evidenceValue: "2-1 borta · 2,48 xG · 3:e raka segern",
    evidenceLabel: "Tränarbytet får ett tidigt godkänt",
  },
];

export const round11PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "IF Elfsborg - Hammarby",
  matchResult: "1-2 (1,03-2,48 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Offensiv dominans – passivare press",
  subheadline:
    "Hammarby vann borta med tydlig xG-fördel och begränsade Elfsborgs farliga lägen. Men pressen (PPDA 7,40) var långt från planen (4,19) – Rydström valde kontroll framför intensitet, och det räckte mot Elfsborgs passiva block.",
};
