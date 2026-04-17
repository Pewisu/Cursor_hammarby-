import type { Metadata } from "next";
import { MatchStatisticsHub } from "@/components/MatchStatisticsHub";

export const metadata: Metadata = {
  title: "Matchstatistik | Hammarby 2026",
  description:
    "Kombinerad matchstatistik och omgång för omgång för Hammarby i Allsvenskan 2026.",
};

export default function MatchStatisticsRoutePage() {
  return <MatchStatisticsHub mode="combined" />;
}
