import { notFound } from "next/navigation";
import { getCatalogueUrl, getImageUrls, getMediaByCaption, getProduct } from "@/lib/strapi";
import { ProductDetailView } from "@/components/app/ProductDetailView";
import type { ImageKey } from "@/lib/mock/images";
import type { ProductMediaAsset } from "@/lib/mock/content";

// Real, verified multi-shot product photography we found for these two
// specific products (see the visual audit) — layered on top of the mock
// `media: []` in content.ts without needing to touch that static data.
// Kept as a fallback: the caption convention below (product:<slug>:...) is
// the scalable path going forward — this hardcoded map only still matters
// for products nobody has captioned yet.
const EXTRA_GALLERY_KEYS: Record<string, ImageKey[]> = {
  "tsl-20": ["productTorqueHero", "impactBg", "torqueGallery3"],
  "btl-19": ["productTensionerHero", "libraryBtlPhoto", "btlGallery2", "btlGallery3", "btlGallery4"],
};

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const [product, images, captionMedia] = await Promise.all([
    getProduct(slug),
    getImageUrls(),
    getMediaByCaption(`product:${slug}`),
  ]);
  if (!product) notFound();

  const extraKeys = EXTRA_GALLERY_KEYS[slug] ?? [];
  const fallbackMedia: ProductMediaAsset[] = extraKeys
    .map((key, i) => {
      const url = images[key];
      if (!url) return null;
      return { id: `${slug}-gallery-${i}`, kind: "photo", context: "product", url } as ProductMediaAsset;
    })
    .filter((m): m is ProductMediaAsset => m !== null);

  // caption convention: product:<slug>:hero | thumbnail | gallery:product | gallery:in-use
  let captionHeroUrl: string | undefined;
  const captionMediaAssets: ProductMediaAsset[] = [];
  captionMedia.forEach((m, i) => {
    if (m.suffix === "hero") {
      captionHeroUrl = m.url;
    } else if (m.suffix === "gallery:product") {
      captionMediaAssets.push({ id: `${slug}-caption-${i}`, kind: "photo", context: "product", url: m.url });
    } else if (m.suffix === "gallery:in-use") {
      captionMediaAssets.push({ id: `${slug}-caption-${i}`, kind: "photo", context: "in-use", url: m.url });
    }
    // "thumbnail" is used by the Products listing page, not the detail page.
  });

  const combinedMedia =
    captionMediaAssets.length > 0
      ? [...product.media, ...captionMediaAssets]
      : fallbackMedia.length > 0
        ? [...product.media, ...fallbackMedia]
        : product.media;

  const catalogueUrl = product.catalogue ? await getCatalogueUrl(product.catalogue.title) : undefined;
  const productWithMedia = {
    ...product,
    media: combinedMedia,
    catalogue:
      product.catalogue && catalogueUrl ? { ...product.catalogue, url: catalogueUrl } : product.catalogue,
  };

  return (
    <ProductDetailView
      product={productWithMedia}
      heroImageUrl={
        captionHeroUrl ??
        product.directImageUrl ??
        (product.heroImageKey ? images[product.heroImageKey] : undefined)
      }
    />
  );
}
