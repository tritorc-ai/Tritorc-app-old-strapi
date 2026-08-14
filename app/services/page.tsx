import {
  getImageUrls,
  getServiceCategories,
  getServiceSections,
  getServices,
  getThumbnailMap,
} from "@/lib/strapi";
import { PageHeader } from "@/components/app/PageHeader";
import { ServicesScrollView } from "@/components/app/ServicesScrollView";

export default async function ServicesPage() {
  const [services, categories, sections, images, thumbnails] = await Promise.all([
    getServices(),
    getServiceCategories(),
    getServiceSections(),
    getImageUrls(),
    getThumbnailMap("service"),
  ]);
  const categoryImageByName = new Map(
    categories.map((c) => [c.name, c.directImageUrl ?? (c.imageKey ? images[c.imageKey] : undefined)])
  );

  const scrollSections = sections
    .map((section) => ({
      name: section.name,
      color: section.color,
      services: services
        .filter((s) => section.categories.includes(s.category))
        .map((s) => ({
          ...s,
          imageUrl:
            thumbnails[s.slug] ??
            s.directImageUrl ??
            (s.imageKey ? images[s.imageKey] : undefined) ??
            categoryImageByName.get(s.category),
        })),
    }))
    .filter((s) => s.services.length > 0);

  return (
    <div>
      <PageHeader title="Services" subtitle="Beyond the tools — on-site expertise" />
      <div className="px-5 pb-7">
        <ServicesScrollView sections={scrollSections} />
      </div>
    </div>
  );
}
