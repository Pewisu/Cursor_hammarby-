import type { Metadata } from "next";
import { AliHabesogluScoutDashboard } from "@/components/AliHabesogluScoutDashboard";

export const metadata: Metadata = {
  title: "Ali Habeşoğlu – scoutinganalys | Hammarby",
  description:
    "Scoutinganalys av Ali Habeşoğlu (Bodrumspor) med spindeldiagram, rankingar och profilsammanfattning från Turkish 1. Lig 2025/2026.",
};

export default function AliHabesogluScoutPage() {
  return <AliHabesogluScoutDashboard />;
}
