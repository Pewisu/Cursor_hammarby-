import type { Metadata } from "next";
import { AgePlayingTimeDashboard } from "@/components/AgePlayingTimeDashboard";
import { hammarbyAgePlayingTimeSeasons } from "@/lib/hammarbyAgePlayingTimeData";

export const metadata: Metadata = {
  title: "Speltid per ålderskategori | Hammarby",
  description:
    "Jämför Hammarbys speltid per ålderskategori för säsongerna 2024, 2025 och 2026 baserat på Bolldata Talangdata.",
};

export default function AgePlayingTimePage() {
  return <AgePlayingTimeDashboard seasons={hammarbyAgePlayingTimeSeasons} />;
}
