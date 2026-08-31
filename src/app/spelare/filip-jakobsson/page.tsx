import type { Metadata } from "next";
import { FilipJakobssonScoutDashboard } from "@/components/FilipJakobssonScoutDashboard";

export const metadata: Metadata = {
  title: "Filip Jakobsson – scoutinganalys | Hammarby",
  description:
    "Twelve-analys av Filip Jakobsson (Hammarby U19): spindel, rankings där han utmärker sig och sammanfattning av spelarprofilen. Satt på bänken mot GAIS.",
};

export default function FilipJakobssonScoutPage() {
  return <FilipJakobssonScoutDashboard />;
}
