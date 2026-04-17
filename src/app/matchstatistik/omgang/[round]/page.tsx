import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MatchStatisticsHub } from "@/components/MatchStatisticsHub";
import { hammarbyRoundMatchStats } from "@/lib/matchStatisticsOverviewData";

type RouteParams = {
  params: Promise<{ round: string }>;
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { round } = await params;
  const parsedRound = Number(round);
  const roundData = hammarbyRoundMatchStats.find(
    (item) => item.gameweek === parsedRound
  );

  if (!roundData) {
    return {
      title: "Omgång hittades inte | Matchstatistik",
      description: "Den valda omgången finns inte i matchstatistiken ännu.",
    };
  }

  return {
    title: `Matchstatistik Omgång ${roundData.gameweek} | Hammarby 2026`,
    description: `${roundData.matchName} med nyckeltal, xG och lagjämförelser från bolldata.`,
  };
}

export function generateStaticParams() {
  return hammarbyRoundMatchStats.map((item) => ({
    round: String(item.gameweek),
  }));
}

export default async function MatchStatisticsRoundPage({ params }: RouteParams) {
  const { round } = await params;
  const parsedRound = Number(round);

  if (!Number.isFinite(parsedRound)) {
    notFound();
  }

  const exists = hammarbyRoundMatchStats.some(
    (item) => item.gameweek === parsedRound
  );
  if (!exists) {
    notFound();
  }

  return <MatchStatisticsHub mode="round" round={parsedRound} />;
}

