import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Matchstatistik | Hammarby 2026",
  description:
    "Översiktssida för matchstatistik med tydliga val mellan säsongsstatistik och omgångsstatistik.",
};

export default function MatchStatisticsRoutePage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Matchstatistik</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Välj vad du vill göra
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Välj mellan säsongsnivå och omgångsnivå. All matchanalys är uppdelad för att göra
            flödet tydligare.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/matchstatistik/sasongsanalys"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-300/50 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-amber-100 hover:border-amber-200 hover:text-amber-50"
            >
              ⭐ Säsongsanalys 2026
            </Link>
            <Link
              href="/matchstatistik/kommande"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:border-emerald-400 hover:text-emerald-100"
            >
              🧭 Nytt: Kommande motståndare (start omgång 7)
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/matchstatistik/sasongsanalys"
            className="group overflow-hidden rounded-[28px] border border-amber-300/40 bg-[#07351f] p-6 shadow-2xl shadow-emerald-950/30 transition-colors hover:border-amber-200/70 md:col-span-2 lg:col-span-3"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">
                  Entrypoint · Ny presentation
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white md:text-4xl">
                  Hammarby 2026: säsongsanalys i pitchdeck-stil
                </h2>
                <p className="mt-3 text-sm leading-6 text-emerald-50/90 md:text-base">
                  Den visuella huvudingången för Hammarby 2026 mot Allsvenskan,
                  samt jämförelse med 2024 och 2025 via Twelve och bolldata.
                </p>
              </div>
              <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left md:text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-200">Öppna</p>
                <p className="mt-1 text-lg font-black text-white group-hover:text-amber-100">
                  Säsongsanalys →
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/matchstatistik/sasong"
            className="group rounded-2xl border border-blue-500/30 bg-slate-800/80 p-6 transition-colors hover:border-blue-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
              📊
            </div>
            <h2 className="text-xl font-semibold text-white">Säsongsstatistik</h2>
            <p className="mt-2 text-sm text-slate-300">
              Fokus på säsongsjämförelser (2026 vs 2025), säsongssnitt och övergripande KPI-bild.
            </p>
            <p className="mt-4 text-sm font-medium text-blue-300 group-hover:text-blue-200">
              Öppna säsongsstatistik →
            </p>
          </Link>

          <Link
            href="/spelarstatistik/speltid-alderskategori"
            className="group rounded-2xl border border-green-500/30 bg-slate-800/80 p-6 transition-colors hover:border-green-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-300">
              🧩
            </div>
            <h2 className="text-xl font-semibold text-white">
              Speltid per ålderskategori
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Gå till jämförelsen av Hammarbys U23-U18-minuter och seniorandel
              över 2024, 2025 och 2026.
            </p>
            <p className="mt-4 text-sm font-medium text-green-300 group-hover:text-green-200">
              Öppna åldersanalys →
            </p>
          </Link>

          <Link
            href="/matchstatistik/omgang"
            className="group rounded-2xl border border-cyan-500/30 bg-slate-800/80 p-6 transition-colors hover:border-cyan-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
              🗂️
            </div>
            <h2 className="text-xl font-semibold text-white">Omgångsstatistik</h2>
            <p className="mt-2 text-sm text-slate-300">
              Välj en omgång, se matchens KPI:er och jämför mot andra omgångar eller 2025-match.
            </p>
            <p className="mt-4 text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
              Öppna omgångsstatistik →
            </p>
          </Link>

          <Link
            href="/matchstatistik/kommande"
            className="group rounded-2xl border border-emerald-500/30 bg-slate-800/80 p-6 transition-colors hover:border-emerald-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              🧭
            </div>
            <h2 className="text-xl font-semibold text-white">Kommande motståndare</h2>
            <p className="mt-2 text-sm text-slate-300">
              Taktisk scouting med fokus på nästa omgång: styrkor, sårbarheter, spelstil
              och konkret matchplan för Hammarby.
            </p>
            <p className="mt-4 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
              Öppna motståndaranalys →
            </p>
          </Link>

          <Link
            href="/matchstatistik/hammarby-vs-htff"
            className="group rounded-2xl border border-amber-400/30 bg-slate-800/80 p-6 transition-colors hover:border-amber-300/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
              🔄
            </div>
            <h2 className="text-xl font-semibold text-white">Hammarby vs HTFF</h2>
            <p className="mt-2 text-sm text-slate-300">
              Intern jämförelse mellan A-laget och talanglagets spelstil och nyckeltal
              från Twelve Football 2026.
            </p>
            <p className="mt-4 text-sm font-medium text-amber-300 group-hover:text-amber-200">
              Öppna intern jämförelse →
            </p>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
          <h3 className="text-sm font-semibold text-white">Tips för bättre överblick</h3>
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
