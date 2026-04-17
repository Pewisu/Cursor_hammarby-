import type { Metadata } from "next";
import { PlayerTrendsDashboard } from "@/components/PlayerTrendsDashboard";
import { hammarbyPlayerTrendMatches } from "@/lib/hammarbyPlayerTrendData";

export const metadata: Metadata = {
  title: "Hammarby spelartrender | Allsvenskan 2026",
  description:
    "Följ Hammarby-spelare över tid med relevanta matchparametrar som passningsprocent, xA, xG och defensiva dueller.",
};

export default function PlayerTrendsPage() {
  return <PlayerTrendsDashboard matches={hammarbyPlayerTrendMatches} />;
}
