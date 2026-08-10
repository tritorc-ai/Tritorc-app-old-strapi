import { notFound } from "next/navigation";
import { getImageUrls, getProduct } from "@/lib/strapi";
import { ProductDetailView } from "@/components/app/ProductDetailView";
import type { ImageKey } from "@/lib/mock/images";
import type { ProductMediaAsset } from "@/lib/mock/content";

// Real, verified multi-shot product photography we found for these two
// specific products (see the visual audit) — layered on top of the mock
// `media: []` in content.ts without needing to touch that static data.
const EXTRA_GALLERY_KEYS: Record<string, ImageKey[]> = {
  "tsl-20": ["productTorqueHero", "impactBg", "torqueGallery3"],
  "btl-19": ["productTensionerHero", "libraryBtlPhoto", "btlGallery2", "btlGallery3", "btlGallery4"],
};

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const [product, images] = await Promise.all([getProduct(slug), getImageUrls()]);
  if (!product) notFound();

  const extraKeys = EXTRA_GALLERY_KEYS[slug] ?? [];
  const extraMedia: ProductMediaAsset[] = extraKeys
    .map((key, i) => {
      const url = images[key];
      if (!url) return null;
      return { id: `${slug}-gallery-${i}`, kind: "photo", context: "product", url } as ProductMediaAsset;
    })
    .filter((m): m is ProductMediaAsset => m !== null);

  const productWithMedia =
    extraMedia.length > 0 ? { ...product, media: [...product.media, ...extraMedia] } : product;

  return (
    <ProductDetailView
      product={productWithMedia}
      heroImageUrl={
        product.directImageUrl ?? (product.heroImageKey ? images[product.heroImageKey] : undefined)
      }
    />
  );
}
