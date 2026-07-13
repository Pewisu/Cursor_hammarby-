import type { Metadata } from "next";
import Link from "next/link";
import { CoachComparisonDashboard } from "@/components/CoachComparisonDashboard";
import { hammarbyMatchAnalysisRounds } from "@/lib/hammarbyMatchAnalysisRoundsData";

export const metadata: Metadata = {
  title: "Rydström vs Karlsson | Hammarby 2026",
  description:
    "Coachjämförelse: Henrik Rydströms matchsnitt (Elfsborg & Kalmar) mot Kalle Karlssons snitt (omgång 1–11) i Allsvenskan 2026.",
};

export default function CoachComparisonPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-400">
              Hammarby IF
            </p>
            <h1 className="text-xl font-bold text-white">
              Rydström vs Karlsson
            </h1>
          </div>
          <div className="hidden text-right text-xs text-slate-400 md:block">
            <p>Allsvenskan 2026</p>
            <p>Källa: Twelve / hammarbyfotboll.se</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 bg-slate-900/70 px-3 py-1.5 text-slate-100 hover:border-slate-400 hover:text-white"
            >
              🏠 Huvudsida
            </Link>
            <Link
              href="/matchstatistik"
              className="inline-flex text-slate-300 hover:text-white"
            >
              ← Till matchstatistik
            </Link>
            <Link
              href="/matchstatistik/omgang/12"
              className="inline-flex text-blue-300 hover:text-blue-200"
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
