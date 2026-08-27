import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spelare | Hammarby 2026",
  description:
    "Individuella spelarsidor och scoutinganalyser för Hammarby-spelare.",
};

const players = [
  {
    href: "/spelare/filip-jakobsson",
    name: "Filip Jakobsson",
    role: "Central mittfältare · U19",
    blurb:
      "Twelve-spindel, rankings och profil – satt på A-truppens bänk mot GAIS.",
    accent: "lime" as const,
  },
  {
    href: "/spelare/ali-habesoglu",
    name: "Ali Habeşoğlu",
    role: "Anfallare · Bodrumspor",
    blurb:
      "Luftstark poacher i Turkish 1. Lig – Twelve-spindel, rankings och profil.",
    accent: "orange" as const,
  },
  {
    href: "/spelarstatistik/besara-jamforelse",
    name: "Nahir Besara",
    role: "Offensiv mittfältare · A-trupp",
    blurb: "Säsongsjämförelse 2025 vs 2026 med Twelve- och Bolldata-rankingar.",
    accent: "amber" as const,
  },
];

const accentStyles = {
  lime: {
    border: "border-lime-500/30 hover:border-lime-400/60",
    iconBg: "bg-lime-500/20 text-lime-300",
    link: "text-lime-300 group-hover:text-lime-200",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-400/60",
    iconBg: "bg-orange-500/20 text-orange-300",
    link: "text-orange-300 group-hover:text-orange-200",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/60",
    iconBg: "bg-amber-500/20 text-amber-300",
    link: "text-amber-300 group-hover:text-amber-200",
  },
};

export default function SpelareHubPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <header className="border-b border-slate-700/50 bg-[#0f172a]/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-lime-400">
            Spelare
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Individuella spelarsidor
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Djupare profiler och scoutinganalyser per spelare – separat från
            omgångs- och lagstatistik.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {players.map((player) => {
            const style = accentStyles[player.accent];
            return (
              <Link
                key={player.href}
                href={player.href}
                className={`group rounded-2xl border bg-slate-800/80 p-6 transition-colors hover:bg-slate-800 ${style.border}`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg}`}
                >
                  👤
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {player.name}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  {player.role}
                </p>
                <p className="mt-2 text-sm text-slate-300">{player.blurb}</p>
                <p className={`mt-4 text-sm font-medium ${style.link}`}>
                  Öppna spelarsida →
                </p>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-slate-500">
          <Link href="/spelarstatistik" className="hover:text-slate-300">
            ← Tillbaka till spelarstatistik
          </Link>
        </p>
      </main>
    </div>
  );
}
