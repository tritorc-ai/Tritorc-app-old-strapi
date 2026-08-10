import "server-only";

// ---------------------------------------------------------------------------
// Single seam between this app and Strapi (cms.tritorc.com).
//
// Catalogues are wired to the live CMS (see getCatalogues below). Everything
// else (stats, case studies, certifications, journey, services, products,
// testimonials) still returns mock data — those don't have populated Strapi
// content types yet, so wiring them now would just replace real placeholder
// copy with empty results. Each is a one-function swap when their content
// types are ready.
// ---------------------------------------------------------------------------

import { strapiFetch } from "./strapiClient";
import { IMAGE_NAMES, type ImageKey } from "./mock/images";
import {
  CASE_STUDIES,
  CERTIFICATIONS,
  IMPACT_STATS,
  JOURNEY,
  LIBRARY_MEDIA_ASSETS,
  PRODUCTS,
  SERVICES,
  SERVICE_CATEGORIES,
  SERVICE_SECTIONS,
  TESTIMONIALS,
  BRAND,
  type CaseStudy,
  type Certification,
  type ImpactStat,
  type JourneyMilestone,
  type LibraryAsset,
  type Product,
  type Service,
  type ServiceCategory,
  type ServiceSection,
  type Testimonial,
} from "./mock/content";

export interface StrapiMediaFile {
  id: number;
  name: string;
  url: string;
  size: number; // KB, matches Strapi's convention
  mime: string;
  caption: string | null;
  updatedAt: string;
}

// Mirrors the 18 real catalogues confirmed in the Strapi Media Library,
// tagged per the caption convention documented in the build plan.
const MOCK_CATALOGUES: StrapiMediaFile[] = [
  "Bolting & Machining Solutions Cata (IND) APAC",
  "Cement Industry Cata",
  "Company Profile (Final)",
  "Hot Tapping Cata",
  "In Situ Machining Catalogue",
  "Mining Cata",
  "Mining Leaflet",
  "Oil & Gas Leaflet - A5 FINAL (Domestic)",
  "On-Site Machining (Service)",
  "Overview of Tritorc Manufacturing Facility",
  "Pipeline Process Services",
  "Product Leaflet",
  "Sockets Catalogue Revised",
  "Testimonial Book_",
  "Tube Tool Catalogue Final",
  "Waterjet Cutting",
  "Wind Power Cata",
  "Wind Turbine Leaflet",
].map((name, i) => ({
  id: i + 1,
  name: `${name}.pdf`,
  url: "#",
  size: 5000 + i * 137,
  mime: "application/pdf",
  caption: "catalogue",
  updatedAt: "2026-08-04T07:12:00.000Z",
}));

function resolveMediaUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const baseUrl = process.env.STRAPI_API_URL?.replace(/\/+$/, "") ?? "";
  return `${baseUrl}${url}`;
}

export async function getCatalogues(): Promise<StrapiMediaFile[]> {
  const files = await strapiFetch<
    { id: number; name: string; url: string; size: number; mime: string; caption: string | null; updatedAt: string }[]
  >("/api/upload/files", {
    // $containsi (case-insensitive contains) tolerates the trailing spaces /
    // casing variance that shows up from manual admin-panel data entry —
    // an exact $eq match missed real tagged files for this reason.
    "filters[caption][$containsi]": "catalogue",
    "pagination[pageSize]": "100",
    sort: "name:asc",
  });

  // Network/config failure (Strapi unreachable, missing env) -> fall back to
  // mock so the app still renders something. A successful-but-empty result
  // (no files tagged yet) is returned as-is — that's real, current CMS state,
  // and the Library/Catalogue screens already have an empty-state UI for it.
  if (files === null) return MOCK_CATALOGUES;

  return files.map((f) => ({
    id: f.id,
    name: f.name,
    url: resolveMediaUrl(f.url),
    size: f.size,
    mime: f.mime,
    caption: f.caption,
    updatedAt: f.updatedAt,
  }));
}

/**
 * Resolves a curated set of real Media Library images (matched by filename,
 * see lib/mock/images.ts) to their live S3 URLs in one bulk request. Returns
 * an empty map on failure — callers keep their existing placeholder UI for
 * any key that doesn't resolve, exactly like the official site's fallback
 * pattern.
 */
export async function getImageUrls(): Promise<Partial<Record<ImageKey, string>>> {
  const names = Object.values(IMAGE_NAMES);
  const params: Record<string, string> = { "pagination[pageSize]": "100" };
  names.forEach((name, i) => {
    params[`filters[name][$in][${i}]`] = name;
  });

  const files = await strapiFetch<{ name: string; url: string }[]>(
    "/api/upload/files",
    params
  );
  if (files === null) return {};

  const urlByName = new Map(files.map((f) => [f.name, resolveMediaUrl(f.url)]));
  const result: Partial<Record<ImageKey, string>> = {};
  for (const [key, name] of Object.entries(IMAGE_NAMES) as [ImageKey, string][]) {
    const url = urlByName.get(name);
    if (url) result[key] = url;
  }
  return result;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  return IMPACT_STATS;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return CASE_STUDIES;
}

export async function getCertifications(): Promise<Certification[]> {
  return CERTIFICATIONS;
}

export async function getJourney(): Promise<JourneyMilestone[]> {
  return JOURNEY;
}

export async function getServices(): Promise<Service[]> {
  return SERVICES;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return SERVICES.find((s) => s.slug === slug);
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  return SERVICE_CATEGORIES;
}

export async function getServiceSections(): Promise<ServiceSection[]> {
  return SERVICE_SECTIONS;
}

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export async function getBrand() {
  return BRAND;
}

/**
 * The Library screen searches/filters across catalogues, photos, and videos
 * together. Catalogues come from Media Library `caption=catalogue` tagging;
 * photos/videos would use the extended `photo:*`/`video:*` tags documented
 * in the build plan once that content-prep work happens.
 */
export async function getLibraryAssets(): Promise<LibraryAsset[]> {
  const catalogues = await getCatalogues();
  const catalogueAssets: LibraryAsset[] = catalogues.map((c) => ({
    id: `catalogue-${c.id}`,
    type: "Catalogue",
    title: c.name.replace(/\.pdf$/i, ""),
    categoryLabel: "Catalogues",
  }));
  return [...catalogueAssets, ...LIBRARY_MEDIA_ASSETS];
}
