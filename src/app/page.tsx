import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-300">
            Hammarby IF Datahub
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Välj vad du vill analysera
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Börja med område och gå sedan vidare till rätt undersida: matchstatistik
            för lagets prestationer eller spelarstatistik för individdata.
          </p>
          <div className="mt-5">
            <Link
              href="/matchstatistik/sasongsanalys"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-emerald-500/15 px-4 py-2 text-sm font-bold text-amber-100 transition-colors hover:border-amber-200 hover:bg-emerald-500/25"
            >
              Gå direkt till säsongsanalys 2026 →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <Link
          href="/matchstatistik/sasongsanalys"
          className="group overflow-hidden rounded-[28px] border border-amber-300/40 bg-[#07351f] p-6 shadow-2xl shadow-emerald-950/30 transition-colors hover:border-amber-200/70 md:col-span-3"
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
                Börja här för den visuella berättelsen: Hammarby 2026 mot Allsvenskan,
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
          href="/matchstatistik"
          className="group rounded-2xl border border-blue-500/30 bg-slate-800/80 p-6 transition-colors hover:border-blue-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
            📊
          </div>
          <h2 className="text-xl font-semibold text-white">Matchstatistik</h2>
          <p className="mt-2 text-sm text-slate-300">
            Översikt med tydliga ingångar till säsongsstatistik och
            omgångsstatistik.
          </p>
          <p className="mt-4 text-sm font-medium text-blue-300 group-hover:text-blue-200">
            Öppna matchstatistik →
          </p>
        </Link>

        <Link
          href="/matchstatistik/kommande"
          className="group rounded-2xl border border-emerald-500/30 bg-slate-800/80 p-6 transition-colors hover:border-emerald-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
            🧠
          </div>
          <h2 className="text-xl font-semibold text-white">Kommande motståndare</h2>
          <p className="mt-2 text-sm text-slate-300">
            Taktisk scouting med omgångsfokus, start i omgång 7 mot IFK
            Göteborg, och tydlig jämförelse mot hur Hammarby spelar.
          </p>
          <p className="mt-4 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
            Öppna motståndaranalys →
          </p>
        </Link>

        <Link
          href="/spelarstatistik"
          className="group rounded-2xl border border-purple-500/30 bg-slate-800/80 p-6 transition-colors hover:border-purple-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
            📈
          </div>
          <h2 className="text-xl font-semibold text-white">Spelarstatistik</h2>
          <p className="mt-2 text-sm text-slate-300">
            Gå vidare till standout i omgång, löpdata per spelare eller
            spelartrender över tid med valbara KPI:er.
          </p>
          <p className="mt-4 text-sm font-medium text-purple-300 group-hover:text-purple-200">
            Öppna spelarstatistik →
          </p>
        </Link>

        <Link
          href="/spelarstatistik/speltid-alderskategori"
          className="group rounded-2xl border border-emerald-500/30 bg-slate-800/80 p-6 transition-colors hover:border-emerald-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
            🧩
          </div>
          <h2 className="text-xl font-semibold text-white">
            Speltid per ålderskategori
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Följ hur Hammarbys minuter skiftar mellan U23-U18 och seniorålder
            över 2024, 2025 och 2026.
          </p>
          <p className="mt-4 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
            Öppna åldersanalys →
          </p>
        </Link>

        <Link
          href="/truppsammansattning"
          className="group rounded-2xl border border-teal-500/30 bg-slate-800/80 p-6 transition-colors hover:border-teal-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">
            🧬
          </div>
          <h2 className="text-xl font-semibold text-white">Truppsammansättning</h2>
          <p className="mt-2 text-sm text-slate-300">
            Egen vy för Hammarbys 2026-trupp med födelseår, åldersband och
            speltid.
          </p>
          <p className="mt-4 text-sm font-medium text-teal-300 group-hover:text-teal-200">
            Öppna truppsammansättning →
          </p>
        </Link>

        <Link
          href="/spelarstatistik/omgangsstandout"
          className="group rounded-2xl border border-sky-500/30 bg-slate-800/80 p-6 transition-colors hover:border-sky-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
            ⭐
          </div>
          <h2 className="text-xl font-semibold text-white">Standout i omgång</h2>
          <p className="mt-2 text-sm text-slate-300">
            Snabbväg till ny vy som lyfter vilka spelare som sticker ut mest
            positivt och negativt i vald omgång.
          </p>
          <p className="mt-4 text-sm font-medium text-sky-300 group-hover:text-sky-200">
            Öppna standout →
          </p>
        </Link>
      </main>
    </div>
  );
}
