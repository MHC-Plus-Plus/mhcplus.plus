import { Hero } from "@/components/home/Hero";
import { StatsBlock } from "@/components/home/StatsBlock";
import { CampusGrid } from "@/components/home/CampusGrid";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { SponsorStrip } from "@/components/home/SponsorStrip";
import { JoinCta } from "@/components/home/JoinCta";

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
