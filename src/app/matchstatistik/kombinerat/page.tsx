import type { Metadata } from "next";
import { MatchStatisticsHub } from "@/components/MatchStatisticsHub";

export const metadata: Metadata = {
  title: "Matchstatistik Kombinerat | Hammarby 2026",
  description:
    "Kombinerad matchstatistik med trend, matchanalys och säsongsjämförelser för Hammarby.",
};

export default function MatchStatisticsCombinedPage() {
  return <MatchStatisticsHub mode="combined" />;
}
