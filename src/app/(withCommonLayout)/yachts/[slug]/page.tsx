import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import BackToFleetLink from "@/src/components/Ui/YachtDetail/BackToFleetLink";
import QuickFactsStrip from "@/src/components/Ui/YachtDetail/QuickFactsStrip";
import YachtDescription from "@/src/components/Ui/YachtDetail/YachtDescription";
import SpecialFeatures from "@/src/components/Ui/YachtDetail/SpecialFeatures";
import YachtGallery from "@/src/components/Ui/YachtDetail/YachtGallery";
import YachtSpecifications from "@/src/components/Ui/YachtDetail/YachtSpecifications";
import LocationRates from "@/src/components/Ui/YachtDetail/LocationRates";
import YachtSidebar from "@/src/components/Ui/YachtDetail/YachtSidebar";
import RelatedYachts from "@/src/components/Ui/YachtDetail/RelatedYachts";
import YachtCta from "@/src/components/Ui/YachtDetail/YachtCta";
import { YACHT_FLEET, getYachtBySlug } from "@/src/utils/data/yachts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return YACHT_FLEET.map((yacht) => ({ slug: yacht.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    return { title: "Yacht Not Found" };
  }

  return {
    title: `${yacht.name} — ${yacht.category} for Charter`,
    description: `${yacht.name}: ${yacht.tagline}. ${yacht.length}, sleeps ${yacht.guests} guests across ${yacht.cabins} staterooms, from ${yacht.priceFrom} ${yacht.priceUnit}.`,
    openGraph: {
      title: `${yacht.name} — Eco Yachts`,
      description: yacht.tagline,
      images: [yacht.heroImage],
    },
  };
}

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    notFound();
  }

  const otherYachts = YACHT_FLEET.filter((y) => y.slug !== yacht.slug).slice(
    0,
    3,
  );

  return (
    <>
      <PageHero
        eyebrow={yacht.category}
        title={yacht.name}
        subtitle={yacht.tagline}
        image={yacht.heroImage}
        alt={`${yacht.name} — ${yacht.category} for charter`}
      />

      <QuickFactsStrip yacht={yacht} />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <BackToFleetLink />

          <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 space-y-16">
              <YachtDescription name={yacht.name} description={yacht.description} />
              <SpecialFeatures features={yacht.specialFeatures} />
              <YachtGallery name={yacht.name} gallery={yacht.gallery} />
              <YachtSpecifications specifications={yacht.specifications} />
              <LocationRates rates={yacht.rates} />
            </div>

            <YachtSidebar yacht={yacht} />
          </div>
        </div>
      </section>

      <RelatedYachts yachts={otherYachts} />
      <YachtCta yacht={yacht} />
    </>
  );
}
