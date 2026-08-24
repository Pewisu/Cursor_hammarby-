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
  title: "Kommande: FC Stockholm – Hammarby · Svenska Cupen",
  description:
    "Kommande motstånd FC Stockholm Internazionale i Svenska Cupen – Twelve Ettan-rapport, nivåskillnad och matchplan.",
};

/** Alias: samma vy som /kommande */
export default function PodcastAliasPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <GaisPodcastDeck />
    </div>
  );
}
