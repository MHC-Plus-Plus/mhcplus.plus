import { Hero } from "@/components/home/Hero";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { JoinCta } from "@/components/home/JoinCta";

// Re-fetch the events feed at most once an hour.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEvent />
      <JoinCta />
    </>
  );
}
