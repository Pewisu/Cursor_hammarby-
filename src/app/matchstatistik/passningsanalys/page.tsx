import type { Metadata } from "next";
import { PassingAnalysisDashboard } from "@/components/PassingAnalysisDashboard";
import { hammarbyPlayerTrendMatches } from "@/lib/hammarbyPlayerTrendData";
import { hammarbyMatchAnalysisRounds } from "@/lib/hammarbyMatchAnalysisRoundsData";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

export const metadata: Metadata = {
  title: "Passningsanalys | Hammarby 2026",
  description:
    "Var på plan passas bollen? Offensiva och defensiva nyckeltal för Hammarby IF i Allsvenskan 2026 — passningszoner, precisionsdata och jämförelse med motståndare.",
};

export default function PassingAnalysisPage() {
  return (
    <PassingAnalysisDashboard
      playerTrendMatches={hammarbyPlayerTrendMatches}
      analysisRounds={hammarbyMatchAnalysisRounds}
      overviewStats={hammarbyRoundMatchStats}
    />
  );
}
