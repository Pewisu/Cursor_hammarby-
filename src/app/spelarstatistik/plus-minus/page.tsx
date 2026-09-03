import type { Metadata } from "next";
import { PlusMinusDashboard } from "@/components/PlusMinusDashboard";
import { hammarbyPlusMinusSeason } from "@/lib/hammarbyPlusMinusData";

export const metadata: Metadata = {
  title: "Plus/minus | Hammarby 2026",
  description:
    "Plus/minus-statistik för Hammarbyspelare i Allsvenskan 2026 – mål för och emot medan spelaren var på plan, baserat på Bolldata.",
};

export default function PlusMinusPage() {
  return <PlusMinusDashboard season={hammarbyPlusMinusSeason} />;
}
