import {
  hammarbyMatchAnalysisRounds,
  type HammarbyMatchAnalysisRound,
} from "@/lib/hammarbyMatchAnalysisData";
import type { RoundMatchStats } from "@/lib/matchStatisticsOverviewData";

function normalizeOpponentName(name: string): string {
  return name
    .toLocaleLowerCase("sv-SE")
    .replace(/^bk\s+/, "")
    .replace(/^if\s+/, "")
    .replace(/\s+if$/, "")
    .trim();
}

export function findMatchAnalysisRoundForOverview(
  round: RoundMatchStats,
  season = 2026,
): HammarbyMatchAnalysisRound | undefined {
  const normalizedOpponent = normalizeOpponentName(round.opponent.teamName);

  return hammarbyMatchAnalysisRounds.find((analysisRound) => {
    if (analysisRound.season !== season || analysisRound.date !== round.date) {
      return false;
    }

    const analysisOpponent = normalizeOpponentName(analysisRound.opponent);
    return (
      analysisOpponent === normalizedOpponent ||
      normalizedOpponent.includes(analysisOpponent) ||
      analysisOpponent.includes(normalizedOpponent)
    );
  });
}
