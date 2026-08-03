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
            href="/matchstatistik/europakval-2026"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/60 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-100 hover:border-emerald-300 hover:bg-emerald-500/30"
          >
            🇪🇺 Ny: Europakval 2026 – EL + UECL Playoff vs Raków
          </Link>
          <Link
            href="/matchstatistik/anderlecht-kvalet-retur"
            className="inline-flex items-center gap-2 rounded-lg border border-red-400/60 bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-100 hover:border-red-300 hover:bg-red-500/30"
          >
            🇧🇪 Anderlecht 3–1 HIF – EL-kval retur 30 juli
          </Link>
          <Link
            href="/matchstatistik/anderlecht-kvalet"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-400/60 bg-sky-500/20 px-3 py-1.5 text-xs font-bold text-sky-100 hover:border-sky-300 hover:bg-sky-500/30"
          >
            🇧🇪 HIF 1–1 Anderlecht – EL-kval 23 juli
          </Link>
          <Link
            href="/matchstatistik/omgang/11"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/60 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-100 hover:border-emerald-300 hover:bg-emerald-500/30"
          >
            ⚽ Elfsborg 1-2 Hammarby (omgång 11)
          </Link>
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
              🧭 Kommande: Raków Częstochowa – UECL Playoff
            </Link>
            <Link
              href="/matchstatistik/domaranalys"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-400/60 bg-violet-500/15 px-3 py-1.5 text-xs font-bold text-violet-100 hover:border-violet-300 hover:bg-violet-500/25"
            >
              🟨 Ny: Domaranalys 2026 – frisparkar &amp; kort
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
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              UPPDATERAD · RAKÓW UECL
            </div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              🧭
            </div>
            <h2 className="text-xl font-semibold text-white">Kommande motståndare</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
              Nu: Raków Częstochowa · UECL Playoff
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Taktisk scouting inför UECL Playoff-hinmatchen mot polska mästare Raków Częstochowa: styrkor, sårbarheter, spelstil och konkret matchplan.
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

          <Link
            href="/matchstatistik/europakval-2026"
            className="group rounded-2xl border border-emerald-500/40 bg-[#071a0f] p-6 transition-colors hover:border-emerald-400/60 hover:bg-[#0b2419] md:col-span-2 lg:col-span-2"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              NY · KAMPANJÖVERSIKT
            </div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl">
              🇪🇺
            </div>
            <h2 className="text-xl font-semibold text-white">Europakval 2026 – Hammarbys väg</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
              EL Q2 Anderlecht + UECL Playoff Raków Częstochowa
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Komplett kampanjöversikt: 1–1 &amp; 3–1 mot Anderlecht (agg 4–2) → UECL Playoff vs Raków. Vinnaren → UECL-gruppspel – historisk chans för HIF.
            </p>
            <p className="mt-4 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
              Öppna kampanjöversikt →
            </p>
          </Link>

          <Link
            href="/matchstatistik/anderlecht-kvalet-retur"
            className="group rounded-2xl border border-red-500/40 bg-[#1a0a0a] p-6 transition-colors hover:border-red-400/60 hover:bg-[#1f0e0e] md:col-span-2 lg:col-span-1"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-400/10 px-2.5 py-0.5 text-[10px] font-bold text-red-300">
              NY · RETUR
            </div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-2xl">
              🇪🇺
            </div>
            <h2 className="text-xl font-semibold text-white">Anderlecht 3–1 HIF</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-red-400">
              UEFA Europa League – Kval Retur · 30 juli 2026
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Aggregat 4–2. Abraham chockade i 2' men halvtidsbyten vände. xG 4,55–1,47. Varför tog Anderlecht över i andra halvlek?
            </p>
            <p className="mt-4 text-sm font-medium text-red-300 group-hover:text-red-200">
              Öppna matchanalys + halvleksanalys →
            </p>
          </Link>

          <Link
            href="/matchstatistik/anderlecht-kvalet"
            className="group rounded-2xl border border-sky-500/30 bg-slate-800/80 p-6 transition-colors hover:border-sky-400/60 hover:bg-slate-800 md:col-span-2 lg:col-span-1"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-2xl">
              🇪🇺
            </div>
            <h2 className="text-xl font-semibold text-white">HIF 1–1 Anderlecht</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky-400">
              UEFA Europa League – Kval · 23 juli 2026
            </p>
            <p className="mt-2 text-sm text-slate-300">
              xG 1,75–0,48. 4 höga chanser. 72% vinstprobabilitet. Anderlecht fick rött – men HIF fick nöja sig med 1–1.
            </p>
            <p className="mt-4 text-sm font-medium text-sky-300 group-hover:text-sky-200">
              Öppna matchanalys →
            </p>
          </Link>

          <Link
            href="/matchstatistik/domaranalys"
            className="group rounded-2xl border border-violet-500/30 bg-slate-800/80 p-6 transition-colors hover:border-violet-400/60 hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
              🟨
            </div>
            <h2 className="text-xl font-semibold text-white">Domaranalys</h2>
            <p className="mt-2 text-sm text-slate-300">
              Frisparkar, gula och röda kort per match och domare. Domarindex
              visar nettoeffekten av domarbeslut för Hammarby i varje match.
            </p>
            <p className="mt-4 text-sm font-medium text-violet-300 group-hover:text-violet-200">
              Öppna domaranalys →
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
