import type { Metadata } from "next";
import { Oswald, DM_Sans } from "next/font/google";
import GaisPodcastDeck from "@/components/podcast/GaisPodcastDeck";
import { upcomingOpponents } from "@/lib/upcomingOpponentsData";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-podcast-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-podcast-body",
});

export function generateMetadata(): Metadata {
  const report = upcomingOpponents.find((r) => !r.hidden);
  if (!report) return { title: "Kommande motstånd | Hammarby IF" };
  const parts = report.fixture.split("-").map((p) => p.trim());
  return {
    title: `Kommande: ${parts[0] ?? "Hammarby"} – ${parts[1] ?? "Motståndare"} · ${report.roundLabel ?? ""}`,
    description: report.oneLineSummary,
  };
}

export default function KommandePage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <GaisPodcastDeck />
    </div>
  );
}
