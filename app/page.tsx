import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import DestinationGrid from "@/components/DestinationGrid";
import FlashSales from "@/components/FlashSales";
import FeaturedProperties from "@/components/FeaturedProperties";
import InstantBooking from "@/components/InstantBooking";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { getSettings, getProperties, getReviews } from "@/app/actions";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    purpose?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {

  const settings = await getSettings();
  const properties = await getProperties();
  const reviews = await getReviews();

  const params = await searchParams;

  const category = params.category;
  const purpose = params.purpose;

  // Only active properties
  let filteredProperties = properties.filter(
    (p: any) => p.status === "Active"
  );

  // Filter Rent / Buy
  if (purpose) {
    filteredProperties = filteredProperties.filter(
      (p: any) =>
        p.purpose === purpose ||
        (purpose === "buy" && p.purpose === "sale")
    );
  }

  // Filter category
  if (category && category !== "all") {
    filteredProperties = filteredProperties.filter(
      (p: any) =>
        p.category === category ||
        p.type === category
    );
  }

  return (
    <>
      <Navbar settings={settings} />

      <Hero />

      <TrustBadges />

      <DestinationGrid properties={filteredProperties} />

      <FlashSales properties={properties} />

      <FeaturedProperties
        properties={properties}
      />

      <InstantBooking />

      <Reviews reviews={reviews} />

      <Footer settings={settings} />
    </>
  );
}
