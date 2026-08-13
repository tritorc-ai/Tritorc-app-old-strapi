import { notFound } from "next/navigation";
import { getCatalogueUrl, getImageUrls, getService } from "@/lib/strapi";
import { ServiceDetailView } from "@/components/app/ServiceDetailView";
import type { ImageKey } from "@/lib/mock/images";
import type { ServiceMediaAsset } from "@/lib/mock/content";

// Real in-use gallery photos found in the Media Library for these specific
// services (see lib/mock/images.ts) — layered on top of the mock `media: []`
// in content.ts without needing to touch that static data, same pattern as
// the Product detail page's EXTRA_GALLERY_KEYS.
const EXTRA_GALLERY_KEYS: Record<string, ImageKey[]> = {
  "hot-tapping-line-stopping": [
    "hotTappingGallery1",
    "hotTappingGallery2",
    "hotTappingGallery3",
    "hotTappingGallery4",
    "hotTappingGallery5",
    "hotTappingOngc",
  ],
  "dry-rental": ["dryRentalEquipment"],
};

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, images] = await Promise.all([getService(slug), getImageUrls()]);
  if (!service) notFound();

  const extraKeys = EXTRA_GALLERY_KEYS[slug] ?? [];
  const extraMedia: ServiceMediaAsset[] = extraKeys
    .map((key, i) => {
      const url = images[key];
      if (!url) return null;
      return { id: `${slug}-gallery-${i}`, kind: "photo", context: "in-use", url } as ServiceMediaAsset;
    })
    .filter((m): m is ServiceMediaAsset => m !== null);

  const catalogueUrl = service.catalogue ? await getCatalogueUrl(service.catalogue.title) : undefined;
  const serviceWithMedia = {
    ...service,
    media: extraMedia.length > 0 ? [...service.media, ...extraMedia] : service.media,
    catalogue:
      service.catalogue && catalogueUrl ? { ...service.catalogue, url: catalogueUrl } : service.catalogue,
  };

  return (
    <ServiceDetailView
      service={serviceWithMedia}
      heroImageUrl={service.directImageUrl ?? (service.imageKey ? images[service.imageKey] : undefined)}
    />
  );
}
