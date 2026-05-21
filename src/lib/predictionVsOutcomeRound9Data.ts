import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "gais-undervalued",
    category: "nyckeltal",
    prediction:
      "GAIS är 3:a i xP-tabellen (14 xP) trots 9:a i poäng – mest undervärderade laget i ligan.",
    outcome:
      "Stämde. GAIS visade exakt den kvalitet som xP-tabellen pekade på. De skapade 2,64 xG och vann förtjänt.",
    verdict: "spot-on",
    evidenceValue: "GAIS 2,64 xG → 2 mål",
    evidenceLabel: "xP-tabellen hade rätt om GAIS nivå",
  },
  {
    id: "gais-defensive-quality",
    category: "nyckeltal",
    prediction:
      "GAIS har ligans 4:e bästa xGA (0,86/match) – svåra att göra mål på.",
    outcome:
      "Stämde. Hammarby skapade 1,97 xG men gjorde noll mål. GAIS defensiva kvalitet var på riktigt.",
    verdict: "spot-on",
    evidenceValue: "1,97 xG → 0 mål",
    evidenceLabel: "Stark defensiv av GAIS – Hammarby mållösa",
  },
  {
    id: "gais-long-balls",
    category: "stilprofil",
    prediction:
      "GAIS spelar direkt med flest långa bollar i ligan (55,75/match). Kräver luftdominans från CB.",
    outcome:
      "Stämde. GAIS spelade direkt och skapade hot via omställningar. Hammarby vann inte tillräckligt många andrabollsdueller.",
    verdict: "spot-on",
    evidenceValue: "GAIS 16 skott · 7 på mål · 2,64 xG",
    evidenceLabel: "Direktspelet gav GAIS farliga lägen",
  },
  {
    id: "gais-counterattack",
    category: "stilprofil",
    prediction:
      "GAIS counterpressar aggressivt – omställningarna är deras främsta vapen.",
    outcome:
      "Stämde exakt. Hammarby hade 44 turnovers (snittet ligger på 31) och GAIS fick precis de omställningar vi varnade för.",
    verdict: "spot-on",
    evidenceValue: "44 turnovers (snitt 31) · 14 opp. poss. till FT inom 10s",
    evidenceLabel: "Matchens enskilt största problem",
  },
  {
    id: "avoid-turnovers",
    category: "utan-boll",
    prediction:
      "Undvik onödiga bolltapp i anfallshalvan – GAIS omställningar är deras främsta hot.",
    outcome:
      "Misslyckades. 44 turnovers, 42% fler än snittet. GAIS fick 14 possessions till sista tredjedelen inom 10 sekunder och 8 till boxen. Precis det scenariot vi sa inte fick uppstå.",
    verdict: "missed",
    evidenceValue: "44 turnovers · 0,85 opp. xT via transition",
    evidenceLabel: "Hammarby spelade rakt in i GAIS styrka",
  },
  {
    id: "possession-control",
    category: "med-boll",
    prediction:
      "Använd bollinnehavet (61%) för att trötta ut GAIS höga press.",
    outcome:
      "Hade 61% bollinnehav men utan effekt. Field tilt bara 60% (mot 74% i snitt). Bollen nådde sista tredjedelen 39% av gångerna istället för vanliga 43%. Kontroll utan penetration.",
    verdict: "missed",
    evidenceValue: "61% boll · 60% field tilt (snitt 74%)",
    evidenceLabel: "Bollinnehav utan mening – dominans saknades",
  },
  {
    id: "attack-centrally",
    category: "med-boll",
    prediction:
      "Attackera centralt – GAIS släpper in 7 av 9 mål inifrån boxen.",
    outcome:
      "Delvis. Hammarby attackerade centralt och skapade 0,53 xG från golden zone, men konverterade noll mål trots 1,97 xG totalt. Rätt idé, noll utdelning.",
    verdict: "partially",
    evidenceValue: "1,97 xG · 16 skott · 5 HQ-skott · 0 mål",
    evidenceLabel: "Planen stämde men avslutningen brast",
  },
  {
    id: "block-long-balls",
    category: "utan-boll",
    prediction:
      "Blockera GAIS långa bollar – stå högt men med djup bakom mittfältet.",
    outcome:
      "Misslyckades. GAIS fick 33% possessions till sista tredjedelen (Hammarbys snitt att tillåta: 27%). Defensiv aktionhöjd sjönk till 42,55m (snitt 45,45m). Pressen kom inte tillräckligt högt.",
    verdict: "missed",
    evidenceValue: "42,55m aktionhöjd (snitt 45,45) · 33% opp. poss. till FT",
    evidenceLabel: "Defensiven sjönk – GAIS tog sig igenom för lätt",
  },
  {
    id: "second-half-goals",
    category: "matchmanagement",
    prediction:
      "Håll nollan i 2H: GAIS gör 8 av 10 mål i andra halvlek (4 st i 46-60).",
    outcome:
      "Delvis rätt. GAIS gjorde ett mål i varje halvlek (26' + efter rött kort). Profilen om andra halvlek stämde överlag men det röda kortet i 71:a ändrade allt.",
    verdict: "partially",
    evidenceValue: "Mål 26' (1H) + mål efter rött kort 71'",
    evidenceLabel: "Rätt varning, men rött kort avgjorde",
  },
  {
    id: "gais-conversion",
    category: "matchmanagement",
    prediction:
      "GAIS konverterar dåligt (8,2%) – tvinga dem att skjuta från sämre lägen.",
    outcome:
      "Fel. GAIS förbättrade sin konvertering till 12,5% (2 mål på 16 skott). De skapade 2,64 xG och 7 högkvalitetsskott – bättre chanser än vanligt, inte sämre.",
    verdict: "missed",
    evidenceValue: "GAIS 12,5% konvertering · 2,64 xG · 7 HQ-skott",
    evidenceLabel: "GAIS överträffade sin egen offensiva norm",
  },
  {
    id: "besara-bench",
    category: "nyckeltal",
    prediction:
      "Tian (AM) är matchvinnaren – nyckelpassningar (5,38/match) och presstriggern utan boll.",
    outcome:
      "Besara startade på bänken och kom in först i 63:e minuten. Hammarbys kreativa motor saknades i startuppställningen. Johansson startade centralt istället.",
    verdict: "missed",
    evidenceValue: "Besara 63'-90' (27 min) · startade ej",
    evidenceLabel: "Det kreativa navet saknades när det behövdes som mest",
  },
  {
    id: "red-card",
    category: "matchmanagement",
    prediction:
      "Ingen varning om disciplinrisk i förhandsanalysen.",
    outcome:
      "Rött kort i 71:a minuten. Hammarby spelade 20+ minuter i numerärt underläge. Sannolikheten att vinna sjönk från 54% till 25%.",
    verdict: "missed",
    evidenceValue: "Rött kort 71' · 10 man i 20+ min",
    evidenceLabel: "Oförutsedd händelse som avgjorde matchen",
  },
  {
    id: "press-intensity",
    category: "utan-boll",
    prediction:
      "Pressa GAIS uppspel direkt – stör den första passningen.",
    outcome:
      "Delvis. PPDA var bra (3,82) och defensiv intensitet hög (7,79), men duellvinsten sjönk till 60% mot vanliga 67%. Pressen var intensiv men inte tillräckligt effektiv.",
    verdict: "partially",
    evidenceValue: "PPDA 3,82 ✓ · Duellvinst 60% ✗ (snitt 67%)",
    evidenceLabel: "Pressade hårt men vann inte tillräckligt många dueller",
  },
  {
    id: "transition-xg",
    category: "nyckeltal",
    prediction:
      "Hammarbys omställningar ska generera xG (säsongssnitt 0,35 xG via transitions).",
    outcome:
      "Noll. 0,00 xG inom 10 sekunder efter recovery. Trots 45 recoveries och 87% behållna possessions skapades inte ett enda skottläge via omställningar.",
    verdict: "missed",
    evidenceValue: "0,00 xG via transition (snitt 0,35)",
    evidenceLabel: "Omställningarna framåt gav ingenting",
  },
];

export const round9PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "GAIS - Hammarby",
  matchResult: "2-0 (2,64-1,97 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Vad gick fel?",
  subheadline:
    "Analysen varnade för GAIS omställningar och kontringsfarliga profil. Hammarby spelade ändå rakt in i deras styrka – 44 turnovers, noll mål, och rött kort som avgjorde.",
};
