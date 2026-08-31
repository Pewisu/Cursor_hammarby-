import type { Metadata } from "next";
import { SquadAgeStructureDashboard } from "@/components/SquadAgeStructureDashboard";
import { hammarbySquadAgeStructureSeasons } from "@/lib/hammarbySquadAgeStructureData";

export const metadata: Metadata = {
  title: "Truppsammansättning | Hammarby 2026",
  description:
    "Egen vy för Hammarbys truppsammansättning 2026 med födelseår, åldersband och speltid från Bolldata.",
};

export default function SquadCompositionPage() {
  return <SquadAgeStructureDashboard seasons={hammarbySquadAgeStructureSeasons} />;
}
