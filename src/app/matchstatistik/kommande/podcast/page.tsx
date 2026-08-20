import type { Metadata } from "next";
import { Oswald, DM_Sans } from "next/font/google";
import GaisPodcastDeck from "@/components/podcast/GaisPodcastDeck";

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

export const metadata: Metadata = {
  title: "Kommande: Hammarby – GAIS · Omgång 18",
  description: "Kommande motstånd GAIS – Twelve, Bolldata, scouting och matchplan.",
};

/** Alias: samma vy som /kommande */
export default function PodcastAliasPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <GaisPodcastDeck />
    </div>
  );
}
