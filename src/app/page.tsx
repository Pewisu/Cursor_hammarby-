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
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-2">
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
          href="/spelarstatistik"
          className="group rounded-2xl border border-purple-500/30 bg-slate-800/80 p-6 transition-colors hover:border-purple-400/60 hover:bg-slate-800"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
            📈
          </div>
          <h2 className="text-xl font-semibold text-white">Spelarstatistik</h2>
          <p className="mt-2 text-sm text-slate-300">
            Gå vidare till löpdata per spelare eller spelartrender över tid
            med valbara KPI:er.
          </p>
          <p className="mt-4 text-sm font-medium text-purple-300 group-hover:text-purple-200">
            Öppna spelarstatistik →
          </p>
        </Link>
      </main>
    </div>
  );
}
