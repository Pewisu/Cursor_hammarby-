import type { PredictionVsOutcomeProps } from "@/components/PredictionVsOutcome";
import type { PredictionItem } from "@/components/PredictionVsOutcome";

const predictions: PredictionItem[] = [
  {
    id: "suspended-midfield",
    category: "utan-boll",
    prediction:
      "Netabay (CM/press) och Fritzson (10:a) BÅDA AVSTÄNGDA – exploatera kaos i deras mittfält med tempo och direktspel från start.",
    outcome:
      "Prickat. Utan sina mittfältsmotorer kollapsade Degerfors press fullständigt. Hammarby spelade snabbt igenom linjer och skapade 2,65 xG – mer än dubbelt Hammarbys säsongssnitt mot Degerfors 2025.",
    verdict: "spot-on",
    evidenceValue: "2,65 xG · 4-0 · 22 avslut",
    evidenceLabel: "Mittfäldskaos utnyttjat fullt ut",
  },
  {
    id: "box-penetration",
    category: "med-boll",
    prediction:
      "Degerfors final third to box% 16 (sämst i ligan) – de kan inte försvara inne i boxen. Hammarby bör skapa högt antal boxberöringar och boxinträden.",
    outcome:
      "Prickat. 39 boxberöringar mot Degerfors 15. Hammarby penetrerade straffboxen 2,6× fler gånger. Degerfors begränsades till 0,35 xG – sämst möjliga offensiv.",
    verdict: "spot-on",
    evidenceValue: "39 vs 15 boxberöringar",
    evidenceLabel: "Boxpenetration helt som planerat",
  },
  {
    id: "score-window",
    category: "med-boll",
    prediction:
      "Tryck 46–60' – HIF:s bästa fönster (6 mål) och Degerfors mest sårbara (4 insläppta). Sätt 2-0 och stäng matchen.",
    outcome:
      "Delvis. Hammarby ledde 1-0 vid paus (40') och genomförde krosskrossningen strax efter det planerade fönstret: 69', 72', 75'. Inte exakt i 46-60' men principen – hårt tryck i andra halvlek – stämde.",
    verdict: "partially",
    evidenceValue: "Mål: 40' · 69' · 72' · 75'",
    evidenceLabel: "Rätt strategi, lite senare än planerat",
  },
  {
    id: "xg-quality",
    category: "nyckeltal",
    prediction:
      "Hammarby 1:a i xG (2,19/match) mot Degerfors 16:e (1,04). Sikta på tydlig xG-fördel och hög skottkvalitet.",
    outcome:
      "Prickat. Hammarby 2,65 xG – 0,35 för Degerfors. xG-kvoten 7,6:1 är exceptionell. Degerfors begränsades till 8 avslut varav bara 1 på mål.",
    verdict: "spot-on",
    evidenceValue: "2,65 xG (HIF) · 0,35 xG (DIF)",
    evidenceLabel: "xG-dominans långt över planen",
  },
  {
    id: "clean-sheet",
    category: "utan-boll",
    prediction:
      "Täck kantspelet (37% av deras boxinträden via inlägg) och noga vid fasta situationer (4 av 12 mål via huvud).",
    outcome:
      "Prickat. Nollan hållen – Degerfors hade ett enda skott på mål hela matchen. Hammarbys defensiva organisation begränsade inläggshotet och nickduellar vann Hammarbys CBs.",
    verdict: "spot-on",
    evidenceValue: "0 insläppta · 1 skott på mål (DIF)",
    evidenceLabel: "Nollan hållen med full kontroll",
  },
  {
    id: "second-half-intensity",
    category: "matchmanagement",
    prediction:
      "Aldrig av i 2H – 10 av 12 Degerfors-mål i andra halvlek. Skärpa hela matchen.",
    outcome:
      "Prickat. Hammarby höll intensiteten och tillät inga Degerfors-mål. Tre mål på sex minuter visade snarare att Hammarby accelererade i andra halvlek snarare än slappnade av.",
    verdict: "spot-on",
    evidenceValue: "3 mål i 69-75' · 0 insläppta 2H",
    evidenceLabel: "Skärpa och intensitet hela matchen",
  },
];

export const round13PredictionVsOutcome: PredictionVsOutcomeProps = {
  matchName: "Hammarby – Degerfors IF",
  matchResult: "4-0 (2,65–0,35 xG)",
  predictions,
  summaryStats: {
    spotOn: predictions.filter((p) => p.verdict === "spot-on").length,
    partially: predictions.filter((p) => p.verdict === "partially").length,
    missed: predictions.filter((p) => p.verdict === "missed").length,
  },
  headline: "Exceptionell hemmaseger – analysen stämde",
  subheadline:
    "Förhandsanalysen pekade på dubbel-avstängning och Degerfors svaga boxpenetration som huvudsårbarheter. Resultatet överträffade alla prognoser: 4-0, 2,65 xG och ett enda Degerfors-skott på mål. Tre mål på sex minuter i andra halvlek bekräftade Hammarbys kapacitet att stänga matcher kliniskt.",
};
