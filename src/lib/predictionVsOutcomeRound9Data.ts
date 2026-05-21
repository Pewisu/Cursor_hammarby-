import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "gais-undervalued",
    category: "nyckeltal",
    prediction:
      "GAIS 3:a i xP-tabellen (14 xP) trots 9:a i poäng – det mest undervärderade laget i ligan.",
    outcome:
      "Stämde. GAIS visade exakt den kvalitet som xP-tabellen antydde. De skapade 2,64 xG och vann förtjänt.",
    verdict: "spot-on",
    evidenceValue: "GAIS 2,64 xG → 2 mål",
    evidenceLabel: "xP-tabellen hade rätt – GAIS är bättre än tabellen visar",
  },
  {
    id: "gais-defensive-quality",
    category: "nyckeltal",
    prediction:
      "GAIS har ligans 4:e bästa xGA (0,86/match) – svåra att göra mål på.",
    outcome:
      "Stämde helt. Hammarby skapade 1,97 xG men gjorde NÄT MÅL. GAIS defensiva kvalitet var verklig.",
    verdict: "spot-on",
    evidenceValue: "1,97 xG → 0 mål (0% konvertering)",
    evidenceLabel: "GAIS stängde ner Hammarby offensivt",
  },
  {
    id: "gais-long-balls",
    category: "stilprofil",
    prediction:
      "GAIS spelar direkt med flest långa bollar i ligan (55,75/match). Kräver luftdominans.",
    outcome:
      "Stämde. GAIS spelade direkt och skapade hot via omställningar. Hammarby vann inte andrabollarna tillräckligt.",
    verdict: "spot-on",
    evidenceValue: "GAIS 16 skott · 7 på mål · 2,64 xG",
    evidenceLabel: "Direktspelet gav GAIS farliga chanser",
  },
  {
    id: "gais-counterattack",
    category: "stilprofil",
    prediction:
      "GAIS counterpressar aggressivt – Hammarbys omställningsspel är deras främsta hot.",
    outcome:
      "Stämde EXAKT. Hammarby hade 44 turnovers (vs 31 snitt) – GAIS fick exakt de omställningar vi varnade för.",
    verdict: "spot-on",
    evidenceValue: "44 turnovers (vs 31 snitt) · 14 opp. poss. FT inom 10s",
    evidenceLabel: "Det enskilt största problemet i matchen",
  },
  {
    id: "avoid-turnovers",
    category: "utan-boll",
    prediction:
      "GAIS omställningsspel är deras främsta hot – undvik onödiga bolltapp i anfallshalvan.",
    outcome:
      "MISSLYCKADES TOTALT. 44 turnovers – 42% fler än snittet. GAIS fick 14 possessions till sista tredjedelen inom 10s och 8 till boxen. Exakt det vi sa inte fick hända.",
    verdict: "missed",
    evidenceValue: "44 turnovers · 0,85 opp. xT via transition",
    evidenceLabel: "Matchens avgörande faktor – vi spelade rakt in i deras styrka",
  },
  {
    id: "possession-control",
    category: "med-boll",
    prediction:
      "Använd bollinnehavet (61%) för att trötta ut GAIS höga press.",
    outcome:
      "Hade 61% bollinnehav men det var STERILT. Field tilt bara 60% (vs 74% snitt). Bollen nådde sista tredjedelen 39% av gångerna (vs 43% snitt). Kontroll utan penetration.",
    verdict: "missed",
    evidenceValue: "61% boll · 60% field tilt (vs 74% snitt)",
    evidenceLabel: "Possession utan mening – bollinnehav ≠ dominans",
  },
  {
    id: "attack-centrally",
    category: "med-boll",
    prediction:
      "Attackera centralt – GAIS släpper in 7 av 9 mål inifrån boxen.",
    outcome:
      "Delvis. Hammarby attackerade centralt (0,53 xG golden zone) men konverterade NOLL mål från 1,97 xG. Skapade chanser men slutprodukten saknades.",
    verdict: "partially",
    evidenceValue: "1,97 xG · 16 skott · 5 HQ-skott · 0 mål",
    evidenceLabel: "Rätt strategi, usel avslutning",
  },
  {
    id: "block-long-balls",
    category: "utan-boll",
    prediction:
      "Blockera GAIS långa bollar – stå högt men med djup bakom mittfältet.",
    outcome:
      "Misslyckades. GAIS fick 33% possessions till sista tredjedelen (vs 27% Hammarby-snitt att tillåta). Defensiv action height sjönk till 42,55m (vs 45,45 snitt). Pressen var inte tillräckligt hög.",
    verdict: "missed",
    evidenceValue: "42,55m DAH (vs 45,45 snitt) · 33% opp. poss. FT",
    evidenceLabel: "Defensiven sjönk – GAIS tog sig igenom",
  },
  {
    id: "second-half-goals",
    category: "matchmanagement",
    prediction:
      "Håll nollan i 2H: GAIS gör 8 av 10 mål i andra halvlek (4 st i 46-60).",
    outcome:
      "Stämde delvis – GAIS gjorde båda målen (26' och efter rött kort). Varningen om andra halvlek var rätt i profilen men matchen avgjordes av rött kort i 71:a.",
    verdict: "partially",
    evidenceValue: "Mål 26' (1H) + mål efter rött kort 71'",
    evidenceLabel: "Rätt varning men rött kort ändrade allt",
  },
  {
    id: "gais-conversion",
    category: "matchmanagement",
    prediction:
      "GAIS konverterar dåligt (8,2%) – vid ledning: tvinga dem att skjuta från sämre lägen.",
    outcome:
      "FEL. GAIS förbättrade sin konvertering till 12,5% (2 mål på 16 skott). Deras xG var 2,64 – de skapade BÄTTRE chanser än vanligt, inte sämre.",
    verdict: "missed",
    evidenceValue: "GAIS 12,5% konvertering · 2,64 xG · 7 HQ-skott",
    evidenceLabel: "GAIS överträffade sin egen norm offensivt",
  },
  {
    id: "besara-bench",
    category: "nyckeltal",
    prediction:
      "Tian (AM) är matchvinnaren med nyckelpassningar (5,38/match) och presstriggern utan boll.",
    outcome:
      "Besara startade på BÄNKEN och kom in först i 63:e minuten. Hammarbys kreativa nav saknades i 70 minuter. Johansson startade centralt istället.",
    verdict: "missed",
    evidenceValue: "Besara 63'-90' (27 min) · Startade ej",
    evidenceLabel: "Matchens kreativa hjärta saknades i startuppställningen",
  },
  {
    id: "red-card",
    category: "matchmanagement",
    prediction:
      "Ingen varning om disciplinrisk i förhandsanalysen.",
    outcome:
      "Rött kort i 71:a minuten förstörde matchen. Hammarby spelade 20+ minuter i numerärt underläge. Win probability sjönk från 54% till 25%.",
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
      "PPDA var 3,82 (bra) och defensiv intensitet 7,79. Pressen VAR intensiv – men duellvinsten sjönk till 60% (vs 67% snitt). Pressen hade intensitet men saknade kvalitet.",
    verdict: "partially",
    evidenceValue: "PPDA 3,82 ✓ · Duellvinst 60% ✗ (vs 67% snitt)",
    evidenceLabel: "Pressade hårt men vann inte duellerna",
  },
  {
    id: "transition-xg",
    category: "nyckeltal",
    prediction:
      "Hammarbys omställningar ska generera xG-hot (säsongssnitt 0,35 xG via transitions).",
    outcome:
      "NOLL. 0,00 xG inom 10s efter recovery. Trots 45 recoveries och 87% behållna possessions skapades inte ett enda skottläge via omställningar.",
    verdict: "missed",
    evidenceValue: "0,00 xG via transition (vs 0,35 snitt)",
    evidenceLabel: "Totalt misslyckade omställningar framåt",
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
    "Analysen varnade för GAIS omställningar och kontringsfarliga profil. Hammarby spelade ändå rakt in i deras styrka med 44 turnovers och tappade matchen efter rött kort.",
};
