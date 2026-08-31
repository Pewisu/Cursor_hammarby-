import type { Metadata } from "next";
import { BesaraSeasonComparisonDashboard } from "@/components/BesaraSeasonComparisonDashboard";

export const metadata: Metadata = {
  title: "Nahir Besara – Säsongsjämförelse 2025 vs 2026 | Hammarby",
  description:
    "Djupanalys av Nahir Besaras 2025- och 2026-säsonger med data från Twelve och Bolldata: mål, assist, xG, xA och Twelve-rankingar i alla kategorier.",
};

export default function BesaraSeasonComparisonPage() {
  return <BesaraSeasonComparisonDashboard />;
}
