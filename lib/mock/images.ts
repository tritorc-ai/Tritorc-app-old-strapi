// Curated real Strapi Media Library filenames, picked by matching their
// descriptive names to where we need a photo. Resolved to live URLs by
// lib/strapi.ts's getImageUrls().
export const IMAGE_NAMES = {
  // A real Tritorc-branded field photo (TSL torque wrench in use on a
  // flange, visible "TRITORC" markings) reads as far more authentic here
  // than a generic unbranded pipeline stock photo.
  homeHero: "product-category-torque-htw-01-ee8aa345e00b82d9.webp",
  certIso: "ppc-images-cert-iso-webp-f905a61ffa4b6ab1.webp",
  certCe: "ppc-images-cert-ce-seeklogo-png-d2009155853ba0c5.png",
  // NOTE: this file is actually a torque-wrench technical spec DIAGRAM, not
  // a facility photo — verified by visual audit. Kept under this name only
  // for the "Technical Drawing" library entry; do NOT use for facility/company
  // imagery (companyIntro below is the real photo used for that).
  productSpecDiagram: "about-page-manufacturing-afb477d59ba0afa8.webp",
  companyIntro: "about-page-introduction-9e4760a564451181.webp",
  catTorqueWrenches: "products-landing-hydraulic-torque-wrenches-and-pumps-10df1850710204b5.webp",
  catBoltTensioners: "products-landing-hydraulic-bolt-tensioners-3ceb17723d1f2112.webp",
  catWindTurbine: "ppc-images-collage-tsl-wind-turbine-white-png-6d12220863838799.png",
  productTorqueHero: "product-category-torque-htw-01-ee8aa345e00b82d9.webp",
  // Dark macro shot of a real Tritorc TSL-3 spec plate — used as the Our
  // Impact strip's background (dark + moody suits the white/red stat text).
  impactBg: "product-category-torque-htw-02-1c40d28ce0a36924.webp",
  productTensionerHero: "product-category-bolt-tensioners-hero-faab38eb2a3d52d1.webp",
  // Verified: real TSL/THL torque wrench product shots (dark macro of a
  // TSL-3 spec plate + a hex-drive wrench render) — usable as a photo
  // gallery on the torque wrench product page.
  torqueGallery3: "product-category-torque-htw-03-674d5618678d1285.webp",
  // Verified: real BTL bolt tensioner product photography set (labelled
  // BTL-9 — a different specific model than BTL-19, but same product
  // family/series, used as representative gallery shots).
  btlGallery2: "ppc-images-products-bolt-tensioners-btl-piyush-m-002-webp-0df958a640157a9e.webp",
  btlGallery3: "ppc-images-products-bolt-tensioners-btl-piyush-m-003-webp-75e5f2da1954b55c.webp",
  btlGallery4: "ppc-images-products-bolt-tensioners-btl-piyush-m-004-webp-eb5e6414a1072f6d.webp",
  svcHotTapping: "ppc-images-hottapping-hot-tapping-1-webp-746fb127b4f429dc.webp",
  svcOnSiteMachining:
    "product-category-on-site-machining-tools-and-accessories-hero-7461d76acbc4ed25.webp",
  svcPipeCutting: "product-category-tube-and-pipe-beveling-machine-hero-963e385f4effc986.webp",
  svcPipelineIntegrity: "ppc-images-hottapping-pipe-2-webp-0317805c986c7c90.webp",
  // Thematically relevant, not literal site photos of these specific projects.
  caseReliance: "ppc-images-qatar-gas-webp-959701032810fe03.webp",
  caseAdani: "ppc-images-collage-cbtl-for-wind-application-201-jpg-7423d01fb860de8a.jpg",
  caseSamsung: "ppc-images-tubing-min-jpg-05ba72638ffb7774.jpg",
  // Filename + content confirm this is the "Karabatan Onshore Facility,
  // Kazakhstan" project graphic — was previously mislabeled as Bonga FPSO.
  caseKarabatan: "ppc-images-karbatan-jpg-531c1b769b2d38b2.jpg",
  testimonial1: "ppc-images-testi-1-jpg-3d331bd251163176.jpg",
  testimonial2: "ppc-images-testimonail-jpg-ce659d725ef7f43d.jpg",
  libraryBtlPhoto: "ppc-images-products-bolt-tensioners-btl-piyush-m-001-webp-173df31de207de6a.webp",

  // Full official product catalog (tritorc.com/products) — one hero image
  // per product type, matched by descriptive Strapi filename.
  catImpactSockets: "product-category-impact-socket-family-0283e5233e82c94e.png",
  catPipeColdCutting:
    "products-landing-pipe-cold-cutting-and-beveling-machines-0d5300eec27c6be4.webp",
  catFlangeFacing: "products-landing-flange-facing-machines-282965af4982a1fd.webp",
  catTubeBeveling: "product-category-tube-and-pipe-beveling-machine-hero-963e385f4effc986.webp",
  catTubeExpanders: "product-category-tube-expanders-hero-51cb920bb24b6f66.webp",
  catTubeInstallation: "product-category-tube-installation-tools-hero-9da06b023c0f21ca.webp",
  catTubeRemoval: "products-landing-tube-removal-tools-cb610321368d343e.webp",
  catTubeCleaning: "product-category-tube-cleaners-hero-45c75b4a6c94101c.webp",
  catSingleActingCylinders: "product-category-single-acting-cylinders-hero-bc3c795ba1d5a4c5.webp",
  catDoubleActingCylinders: "product-category-double-acting-cylinders-hero-27c7e535277f4ad7.webp",
  catCylinderPowerpacks: "product-category-cylinder-powerpacks-pumps-hero-f4cc8db76ebc47ff.webp",
  catFlangeManagement: "product-category-flange-management-tools-hero-d3f5072b146ff965.webp",
  catPipeAccessories: "product-category-pipe-accessories-hero-7f537f38e8eb49ed.webp",
  catChainClamps: "products-landing-chain-clamps-f81312962c92b384.webp",

  // Real service taxonomy (7 categories, ~26 sub-services) confirmed from
  // tritorc.com/services + the official site's own repo fallback content.
  // Reusing already-verified Tritorc-branded photos where they genuinely
  // fit, rather than the official site's own (often generic/stock, and in
  // one case third-party-branded) service card images.
  svcPipeFreezing: "ppc-images-hottapping-pipe-4-png-7fff864973cb7522.png",
  svcNitrogenPurging: "ppc-images-hottapping-pipe-3-png-54218a0b38f29198.png",
  svcDryRental: "ppc-images-collage-dry-rental-gen-new-01-jpg-23d7a99e526fef90.jpg",
} as const;

export type ImageKey = keyof typeof IMAGE_NAMES;
