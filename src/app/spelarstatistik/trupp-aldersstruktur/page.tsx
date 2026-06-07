import type { Metadata } from "next";
import { SquadAgeStructureDashboard } from "@/components/SquadAgeStructureDashboard";
import { hammarbySquadAgeStructure2026 } from "@/lib/hammarbySquadAgeStructureData";

export const metadata: Metadata = {
  title: "Truppens åldersstruktur | Hammarby 2026",
  description:
    "Hammarbys truppsammansättning 2026 med födelseår, åldersband och speltid från Bolldata.",
};

export default function SquadAgeStructurePage() {
  return <SquadAgeStructureDashboard season={hammarbySquadAgeStructure2026} />;
}
