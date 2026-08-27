import type { Metadata } from "next";
import { AliHabesogluScoutDashboard } from "@/components/AliHabesogluScoutDashboard";

export const metadata: Metadata = {
  title: "Ali Habeşoğlu – scoutinganalys | Hammarby",
  description:
    "Twelve-analys av Ali Habeşoğlu (Bodrumspor): spindel, rankings där han utmärker sig och sammanfattning av spelarprofilen i Turkish 1. Lig 2025/2026.",
};

export default function AliHabesogluScoutPage() {
  return <AliHabesogluScoutDashboard />;
}
