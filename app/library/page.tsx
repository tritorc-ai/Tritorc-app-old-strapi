import { getImageUrls, getLibraryAssets } from "@/lib/strapi";
import { PageHeader } from "@/components/app/PageHeader";
import { LibraryView } from "@/components/app/LibraryView";

export default async function LibraryPage() {
  const [assets, images] = await Promise.all([getLibraryAssets(), getImageUrls()]);
  const enriched = assets.map((a) => ({
    ...a,
    imageUrl: a.imageKey ? images[a.imageKey] : undefined,
  }));

  return (
    <div>
      <PageHeader title="Library" subtitle="Find any photo, video or catalogue fast" />
      <LibraryView assets={enriched} />
    </div>
  );
}
