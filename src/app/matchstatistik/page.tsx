import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Matchstatistik | Hammarby 2026",
  description:
    "Översiktssida för matchstatistik med tydliga val mellan säsongsstatistik och omgångsstatistik.",
};

export default function MatchStatisticsRoutePage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <header className="border-b border-emerald-900/40 bg-[#0a0f0d]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">Matchstatistik</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
            Välj vad du vill göra
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Välj mellan säsongsnivå och omgångsnivå. All matchanalys är uppdelad för att göra
            flödet tydligare.
          </p>
          <div className="mt-4">
            <Link
              href="/matchstatistik/kommande"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-100 hover:border-amber-300 hover:text-amber-50"
            >
              🧭 Nytt: Kommande motståndare (start omgång 7)
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/matchstatistik/sasong"
            className="group rounded-2xl border border-emerald-500/30 bg-[#111816] p-6 transition-colors hover:border-emerald-400/55 hover:bg-[#14201d]"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-200">
              📊
            </div>
            <h2 className="text-xl font-semibold text-slate-50">Säsongsstatistik</h2>
            <p className="mt-2 text-sm text-slate-300">
              Fokus på säsongsjämförelser (2026 vs 2025), säsongssnitt och övergripande KPI-bild.
            </p>
            <p className="mt-4 text-sm font-medium text-emerald-200 group-hover:text-emerald-100">
              Öppna säsongsstatistik →
            </p>
          </Link>

          <Link
            href="/matchstatistik/omgang"
            className="group rounded-2xl border border-slate-500/45 bg-[#111816] p-6 transition-colors hover:border-slate-300/55 hover:bg-[#17201d]"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/35 text-slate-200">
              🗂️
            </div>
            <h2 className="text-xl font-semibold text-slate-50">Omgångsstatistik</h2>
            <p className="mt-2 text-sm text-slate-300">
              Välj en omgång, se matchens KPI:er och jämför mot andra omgångar eller 2025-match.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-200 group-hover:text-white">
              Öppna omgångsstatistik →
            </p>
          </Link>

          <Link
            href="/matchstatistik/kommande"
            className="group rounded-2xl border border-amber-400/35 bg-[#111816] p-6 transition-colors hover:border-amber-300/60 hover:bg-[#1a1a12] md:col-span-2"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-100">
              🧭
            </div>
            <h2 className="text-xl font-semibold text-slate-50">Kommande motståndare</h2>
            <p className="mt-2 text-sm text-slate-300">
              Taktisk scouting med fokus på nästa omgång: styrkor, sårbarheter, spelstil
              och konkret matchplan för Hammarby.
            </p>
            <p className="mt-4 text-sm font-medium text-amber-100 group-hover:text-amber-50">
              Öppna motståndaranalys →
            </p>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-900/35 bg-[#111816] p-5">
          <h3 className="text-sm font-semibold text-slate-100">Tips för bättre överblick</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>Starta i Säsongsstatistik för helhetsbilden av KPI:er och säsongsjämförelser.</li>
            <li>Byt till Omgångsstatistik när du vill djupdyka i en enskild match.</li>
            <li>Använd jämförelselägena ett i taget för tydligare tolkning.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
