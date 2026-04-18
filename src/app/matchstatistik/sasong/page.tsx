import type { Metadata } from "next";
import { MatchStatisticsHub } from "@/components/MatchStatisticsHub";

export const metadata: Metadata = {
  title: "Matchstatistik Säsong | Hammarby 2026",
  description:
    "Säsongsstatistik med trend, matchanalys och säsongsjämförelser för Hammarby.",
};

export default function MatchStatisticsSeasonPage() {
  return <MatchStatisticsHub mode="combined" />;
}
