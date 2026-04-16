import type { Metadata } from "next";
import { RunningDashboard } from "@/components/RunningDashboard";
import { hammarbyRunningMatches } from "@/lib/hammarbyRunningData";

export const metadata: Metadata = {
  title: "Hammarby löpdata | Allsvenskan 2026",
  description:
    "Löpmeter, maxhastighet och löpmeter per spelad minut för Hammarby-spelare i två Allsvenska matcher.",
};

export default function RunningDataPage() {
  return <RunningDashboard matches={hammarbyRunningMatches} />;
}

