import { Hero } from "@/components/home/Hero";
import { StatsBlock } from "@/components/home/StatsBlock";
import { CampusGrid } from "@/components/home/CampusGrid";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { SponsorStrip } from "@/components/home/SponsorStrip";
import { JoinCta } from "@/components/home/JoinCta";

// Re-fetch the events feed at most once an hour.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBlock />
      <CampusGrid />
      <FeaturedEvent />
      <SponsorStrip />
      <JoinCta />
    </>
  );
}
