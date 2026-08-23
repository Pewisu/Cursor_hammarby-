import type { Metadata } from "next";
import Link from "next/link";
import { CoachComparisonDashboard } from "@/components/CoachComparisonDashboard";
import { hammarbyMatchAnalysisRounds } from "@/lib/hammarbyMatchAnalysisRoundsData";

export const metadata: Metadata = {
  title: "Rydström vs Karlsson | Hammarby 2026",
  description:
    "Coachjämförelse: Henrik Rydströms 7 matcher och 19 poäng mot Kalle Karlssons 11 matcher och 17 poäng i Allsvenskan 2026.",
};

export default function CoachComparisonPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#5fd39a]">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">
              Rydström vs Karlsson
            </h1>
          </div>
          <div className="hidden text-right text-xs text-white/45 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: Twelve / hammarbyfotboll.se</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-black/60 px-3 py-1.5 text-white/80 hover:border-[#006633] hover:text-white"
            >
              🏠 Huvudsida
            </Link>
            <Link
              href="/matchstatistik"
              className="inline-flex text-white/60 hover:text-white"
            >
              ← Till matchstatistik
            </Link>
            <Link
              href="/matchstatistik/omgang/12"
              className="inline-flex text-[#5fd39a] hover:text-white"
            >
              Omgång 12 – Kalmar →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <CoachComparisonDashboard rounds={hammarbyMatchAnalysisRounds} />
      </main>
    </div>
  );
}
