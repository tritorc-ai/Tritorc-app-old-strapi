import Link from "next/link";
import {
  getBrand,
  getCaseStudies,
  getCertifications,
  getImageUrls,
  getImpactStats,
  getJourney,
  getProducts,
  getServices,
  getServiceSections,
} from "@/lib/strapi";
import { Hero } from "@/components/app/Hero";
import { FindMyToolCta } from "@/components/app/FindMyToolCta";
import { ImpactStatStrip } from "@/components/app/ImpactStatStrip";
import { CaseStudyCarousel } from "@/components/app/CaseStudyCarousel";
import { CertificationsSection } from "@/components/app/CertificationsSection";
import { JourneyTimeline } from "@/components/app/JourneyTimeline";
import { ServicesPreviewGrid } from "@/components/app/ServicesPreviewGrid";
import { FeaturedProductsRow } from "@/components/app/FeaturedProductsRow";

export default async function HomePage() {
  const [brand, stats, caseStudies, certifications, journey, services, products, images] =
    await Promise.all([
      getBrand(),
      getImpactStats(),
      getCaseStudies(),
      getCertifications(),
      getJourney(),
      getServices(),
      getProducts(),
      getImageUrls(),
    ]);

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between bg-brand-surface px-5 pb-4 pt-[54px]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-red text-[15px] font-extrabold leading-none text-white">
            T
          </div>
          <div className="text-[19px] font-extrabold tracking-[0.03em] text-brand-dark">
            TRITORC
          </div>
        </div>
        <Link
          href="/library"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white shadow-[0_1px_2px_rgba(0,0,0,.06)]"
          aria-label="Search Library"
        >
          <div className="relative h-3.5 w-3.5 rounded-full border-2 border-brand-dark">
            <div className="absolute -bottom-1.5 -right-1.5 h-1.5 w-0.5 rotate-45 bg-brand-dark" />
          </div>
        </Link>
      </div>

      <div className="px-5">
        <Hero quote={brand.quote} since={brand.since} imageUrl={images.homeHero} />
        <FindMyToolCta />
        <ImpactStatStrip stats={stats} imageUrl={images.impactBg} />
        <CaseStudyCarousel
          caseStudies={caseStudies.map((cs) => ({ ...cs, imageUrl: images[cs.imageKey] }))}
        />
        <CertificationsSection
          certifications={certifications.map((c) => ({
            ...c,
            imageUrl: c.code === "ISO" ? images.certIso : c.code === "CE" ? images.certCe : undefined,
          }))}
        />
        <JourneyTimeline journey={journey} />
        <ServicesPreviewGrid
          services={services.map((s) => ({ ...s, imageUrl: images[s.imageKey] }))}
        />
        <FeaturedProductsRow
          products={products.slice(0, 6).map((p) => ({
            ...p,
            imageUrl: p.heroImageKey ? images[p.heroImageKey] : undefined,
          }))}
        />
        <Link
          href="/products"
          className="mb-6 block w-full rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-3.5 text-center text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,49,47,.4)]"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
