import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <header className="border-b border-emerald-900/40 bg-[#0a0f0d]/90">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/90">
            Hammarby IF Datahub
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
            Välj vad du vill analysera
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Börja med område och gå sedan vidare till rätt undersida: matchstatistik
            för lagets prestationer eller spelarstatistik för individdata.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <Link
          href="/matchstatistik"
          className="group rounded-2xl border border-emerald-500/30 bg-[#111816] p-6 transition-colors hover:border-emerald-400/55 hover:bg-[#14201d]"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-200">
            📊
          </div>
          <h2 className="text-xl font-semibold text-slate-50">Matchstatistik</h2>
          <p className="mt-2 text-sm text-slate-300">
            Översikt med tydliga ingångar till säsongsstatistik och
            omgångsstatistik.
          </p>
          <p className="mt-4 text-sm font-medium text-emerald-200 group-hover:text-emerald-100">
            Öppna matchstatistik →
          </p>
        </Link>

        <Link
          href="/matchstatistik/kommande"
          className="group rounded-2xl border border-amber-400/35 bg-[#111816] p-6 transition-colors hover:border-amber-300/60 hover:bg-[#1a1a12]"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-100">
            🧠
          </div>
          <h2 className="text-xl font-semibold text-slate-50">Kommande motståndare</h2>
          <p className="mt-2 text-sm text-slate-300">
            Taktisk scouting med omgångsfokus, start i omgång 7 mot IFK
            Göteborg, och tydlig jämförelse mot hur Hammarby spelar.
          </p>
          <p className="mt-4 text-sm font-medium text-amber-100 group-hover:text-amber-50">
            Öppna motståndaranalys →
          </p>
        </Link>

        <Link
          href="/spelarstatistik"
          className="group rounded-2xl border border-slate-500/45 bg-[#111816] p-6 transition-colors hover:border-slate-300/55 hover:bg-[#17201d]"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/35 text-slate-200">
            📈
          </div>
          <h2 className="text-xl font-semibold text-slate-50">Spelarstatistik</h2>
          <p className="mt-2 text-sm text-slate-300">
            Gå vidare till standout i omgång, löpdata per spelare eller
            spelartrender över tid med valbara KPI:er.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-200 group-hover:text-white">
            Öppna spelarstatistik →
          </p>
        </Link>

        <Link
          href="/spelarstatistik/omgangsstandout"
          className="group rounded-2xl border border-slate-500/45 bg-[#111816] p-6 transition-colors hover:border-slate-300/55 hover:bg-[#17201d]"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/35 text-slate-200">
            ⭐
          </div>
          <h2 className="text-xl font-semibold text-slate-50">Standout i omgång</h2>
          <p className="mt-2 text-sm text-slate-300">
            Snabbväg till ny vy som lyfter vilka spelare som sticker ut mest
            positivt och negativt i vald omgång.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-200 group-hover:text-white">
            Öppna standout →
          </p>
        </Link>
      </main>
    </div>
  );
}
