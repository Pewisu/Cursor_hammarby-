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
  title: "Revanschdagen · Hammarby vs GAIS · Big Screen Podcast",
  description:
    "Hammarby-branded big screen podcast deck inför omgång 18 mot GAIS – Twelve, Bolldata, scouting och matchplan.",
};

export default function GaisPodcastPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <GaisPodcastDeck />
    </div>
  );
}
