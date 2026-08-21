import type { Metadata } from "next";
import RefereeAnalysisDashboard from "@/components/RefereeAnalysisDashboard";

export const metadata: Metadata = {
  title: "Domaranalys 2026 | Hammarby matchstatistik",
  description:
    "Regelfel (fouls), gula och röda kort per match och domare för Hammarbys Allsvenskan 2026 – domarindex från bolldata.se.",
};

export default function DomaranalysPage() {
  return <RefereeAnalysisDashboard />;
}
