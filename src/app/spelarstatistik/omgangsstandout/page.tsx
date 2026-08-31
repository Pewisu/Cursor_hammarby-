import type { Metadata } from "next";
import { PlayerRoundStandoutsDashboard } from "@/components/PlayerRoundStandoutsDashboard";
import { hammarbyPlayerTrendMatches } from "@/lib/hammarbyPlayerTrendData";
import { hammarbyRunningMatches } from "@/lib/hammarbyRunningData";

export const metadata: Metadata = {
  title: "Spelar-standout per omgång | Hammarby 2026",
  description:
    "Ny vy för att lyfta Hammarby-spelare som stack ut mest positivt och negativt i vald omgång, inklusive löpdata från Allsvenskan.",
};

export default function PlayerRoundStandoutsPage() {
  return (
    <PlayerRoundStandoutsDashboard
      matches={hammarbyPlayerTrendMatches}
      runningMatches={hammarbyRunningMatches}
    />
  );
}
