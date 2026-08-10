import { getImageUrls, getProducts } from "@/lib/strapi";
import { PRODUCT_CATEGORIES, PRODUCT_SECTIONS } from "@/lib/mock/content";
import { PageHeader } from "@/components/app/PageHeader";
import { ProductsScrollView } from "@/components/app/ProductsScrollView";

export default async function ProductsPage() {
  const [products, images] = await Promise.all([getProducts(), getImageUrls()]);
  const categoryImageByName = new Map(
    PRODUCT_CATEGORIES.map((c) => [c.name, images[c.imageKey]])
  );

  const sections = PRODUCT_SECTIONS.map((section) => ({
    name: section.name,
    color: section.color,
    products: products
      .filter((p) => section.categories.includes(p.category))
      .map((p) => ({
        ...p,
        imageUrl:
          p.directImageUrl ??
          (p.heroImageKey ? images[p.heroImageKey] : categoryImageByName.get(p.category)),
      })),
  })).filter((s) => s.products.length > 0);

  return (
    <div>
      <PageHeader title="Products" subtitle="Browse the full Tritorc catalog" />
      <div className="px-5 pb-7">
        <ProductsScrollView sections={sections} />
      </div>
    </div>
  );
}
