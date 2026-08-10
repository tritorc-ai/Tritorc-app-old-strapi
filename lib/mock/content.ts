// Mock content shaped like the eventual Strapi responses. This is the ONLY
// layer that gets replaced when lib/strapi.ts is wired to the real CMS.

import type { ImageKey } from "./images";

export interface ImpactStat {
  value: string;
  label: string;
}

export const IMPACT_STATS: ImpactStat[] = [
  { value: "35+", label: "Years Excellence" },
  { value: "500+", label: "Projects Done" },
  { value: "50+", label: "Global Clients" },
  { value: "100+", label: "Expert Engineers" },
];

export interface CaseStudy {
  slug: string;
  name: string;
  stat: string;
  statLabel: string;
  meta: string;
  imageKey: ImageKey;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "reliance-jamnagar",
    name: "Reliance Jamnagar Refinery, India",
    stat: "1.4M",
    statLabel: "Barrels/day processing capacity",
    meta: "Partnering with the world's largest single-site oil refinery since 2013. 144 studs detensioned in under 24 hours.",
    imageKey: "caseReliance",
  },
  {
    slug: "adani-wind",
    name: "Adani Wind Project, India",
    stat: "60",
    statLabel: "Wind turbines erected in 48 weeks",
    meta: "From base to blade — torqueing and tensioning the towers of tomorrow. 69,247 Nm torque delivered.",
    imageKey: "caseAdani",
  },
  {
    slug: "samsung-abu-dhabi",
    name: "Samsung Abu Dhabi Oil & Gas Plant",
    stat: "40,000",
    statLabel: "Tubes retubed in 7-8 days",
    meta: "Reliability re-engineered. 100% QA/QC documented, ASME/TEMA/SAES standards.",
    imageKey: "caseSamsung",
  },
  {
    // Replaces the earlier "Bonga F.P.S.O., Nigeria" entry, which had been
    // paired with this same image by mistake — the image (and its source
    // filename) is actually from Tritorc's own "Karabatan Onshore
    // Facility" success story, so the case study now matches it.
    slug: "karabatan-kazakhstan",
    name: "Karabatan Onshore Facility, Kazakhstan",
    stat: "13B",
    statLabel: "Barrels of recoverable oil, high-pressure sour gas facility",
    meta: "Empowering NCOC's high-pressure onshore facility — up to 40-80 MPa H2S sour gas. Delivered a 69,247 Nm hydraulic torque wrench, 5,406 kN bolt tensioner, and 72\" pipe cutting machine work.",
    imageKey: "caseKarabatan",
  },
];

export interface Certification {
  code: string;
  name: string;
  description: string;
}

export const CERTIFICATIONS: Certification[] = [
  { code: "ISO", name: "ISO 9001:2015", description: "Certified quality management" },
  { code: "CE", name: "CE-Certified Tools", description: "Meets EU safety standards" },
];

export interface JourneyMilestone {
  year: string;
  label: string;
}

export const JOURNEY: JourneyMilestone[] = [
  { year: "1989", label: "Founded" },
  { year: "2008", label: "UAE Expansion" },
  { year: "2012", label: "Global Reach" },
  { year: "2013", label: "In-house Manufacturing" },
  { year: "2014", label: "USA/Houston Office" },
  { year: "2016", label: "Onsite Machining" },
  { year: "2023", label: "Specialized Engineering" },
  { year: "2024", label: "Pipeline Services" },
];

export interface ServiceMediaAsset {
  id: string;
  kind: "photo" | "video";
  context: "product" | "in-use";
  url: string;
  portrait?: boolean;
}

export interface Service {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  imageKey?: ImageKey;
  directImageUrl?: string;
  media: ServiceMediaAsset[];
}

export interface ServiceCategory {
  name: string;
  imageKey?: ImageKey;
  directImageUrl?: string;
}

export interface ServiceSection {
  name: string;
  color: string;
  categories: string[];
}

// Real taxonomy confirmed directly from tritorc.com/services (live page) and
// the official site's own repo fallback content (lib/servicesContent.ts) —
// 7 categories, ~19 real sub-services. Not an invented structure.
export const SERVICE_SECTIONS: ServiceSection[] = [
  { name: "Onsite Controlled Bolting", color: "#d6312f", categories: ["Onsite Controlled Bolting"] },
  {
    name: "Onsite Machining",
    color: "#2563eb",
    categories: [
      "Pipeline Coldcutting & Bevelling",
      "Flange Facing",
      "On-Site Milling",
      "Magnetic Drilling Machine",
      "Portable Water Jet Cutting",
    ],
  },
  {
    name: "Process & Pipeline",
    color: "#0d9488",
    categories: [
      "Dewatering & Dry Air Flushing Services",
      "Hydro Testing Services",
      "Lube-oil Flushing Services",
      "Nitrogen Helium Leak Testing Services",
      "Nitrogen Purging Preservation Services",
      "Pneumatic Testing",
    ],
  },
  { name: "Retubing", color: "#7c3aed", categories: ["Retubing Services"] },
  {
    name: "Specialized Engineering",
    color: "#d97706",
    categories: [
      "Emergency Pipeline Repair Clamp",
      "Hot Tapping & Line Stopping",
      "Online Leak Sealing",
      "Pipe Freezing",
    ],
  },
  { name: "Tool Calibration", color: "#db2777", categories: ["Calibration Services"] },
  { name: "Dry Rental", color: "#4f46e5", categories: ["Dry Rental"] },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { name: "Onsite Controlled Bolting", imageKey: "productTorqueHero" },
  { name: "Pipeline Coldcutting & Bevelling", imageKey: "catPipeColdCutting" },
  { name: "Flange Facing", imageKey: "catFlangeFacing" },
  {
    name: "On-Site Milling",
    directImageUrl: "https://www.tritorc.com/assets/services/Oniste%20Machining.jpg",
  },
  {
    name: "Magnetic Drilling Machine",
    directImageUrl: "https://www.tritorc.com/assets/services/pro/mgntic.webp",
  },
  { name: "Portable Water Jet Cutting", imageKey: "svcOnSiteMachining" },
  { name: "Dewatering & Dry Air Flushing Services", imageKey: "svcPipelineIntegrity" },
  { name: "Hydro Testing Services", imageKey: "svcPipelineIntegrity" },
  { name: "Lube-oil Flushing Services", imageKey: "svcPipelineIntegrity" },
  { name: "Nitrogen Helium Leak Testing Services", imageKey: "svcPipelineIntegrity" },
  { name: "Nitrogen Purging Preservation Services", imageKey: "svcNitrogenPurging" },
  { name: "Pneumatic Testing", imageKey: "svcPipelineIntegrity" },
  {
    name: "Retubing Services",
    directImageUrl: "https://www.tritorc.com/assets/services/Retubing.jpg",
  },
  { name: "Emergency Pipeline Repair Clamp", imageKey: "svcHotTapping" },
  { name: "Hot Tapping & Line Stopping", imageKey: "svcHotTapping" },
  { name: "Online Leak Sealing", imageKey: "svcHotTapping" },
  { name: "Pipe Freezing", imageKey: "svcPipeFreezing" },
  { name: "Calibration Services", imageKey: "productSpecDiagram" },
  { name: "Dry Rental", imageKey: "svcDryRental" },
];

export const SERVICES: Service[] = [
  {
    slug: "onsite-controlled-bolting",
    name: "Onsite Controlled Bolting",
    category: "Onsite Controlled Bolting",
    tagline: "Precision torque, delivered in the field",
    description:
      "Professional controlled bolting services with precision torque application for critical industrial applications and maintenance operations.",
    imageKey: "productTorqueHero",
    media: [],
  },
  {
    slug: "pipeline-coldcutting-bevelling",
    name: "Pipeline Coldcutting & Bevelling",
    category: "Pipeline Coldcutting & Bevelling",
    tagline: "Advanced cold cutting technology",
    description: "Precise pipeline cutting and bevelling services using advanced cold cutting technology.",
    imageKey: "catPipeColdCutting",
    media: [],
  },
  {
    slug: "flange-facing",
    name: "Flange Facing",
    category: "Flange Facing",
    tagline: "Perfect sealing surfaces, every time",
    description: "Expert flange facing services to ensure perfect sealing surfaces and optimal performance.",
    imageKey: "catFlangeFacing",
    media: [],
  },
  {
    slug: "on-site-milling",
    name: "On-Site Milling",
    category: "On-Site Milling",
    tagline: "Precision milling, no facility downtime",
    description:
      "On-site milling operations brought directly to your facility, eliminating the need for costly equipment removal and transport.",
    directImageUrl: "https://www.tritorc.com/assets/services/Oniste%20Machining.jpg",
    media: [],
  },
  {
    slug: "magnetic-drilling-machine",
    name: "Magnetic Drilling Machine",
    category: "Magnetic Drilling Machine",
    tagline: "Portable, magnet-mounted precision drilling",
    description:
      "Magnetic base drilling machines for on-site hole drilling on steel structures, without the need for a fixed workshop setup.",
    directImageUrl: "https://www.tritorc.com/assets/services/pro/mgntic.webp",
    media: [],
  },
  {
    slug: "portable-water-jet-cutting",
    name: "Portable Water Jet Cutting",
    category: "Portable Water Jet Cutting",
    tagline: "Cold, spark-free cutting on site",
    description:
      "Portable water jet cutting equipment for precise, spark-free cutting in hazardous or confined industrial environments.",
    imageKey: "svcOnSiteMachining",
    media: [],
  },
  {
    slug: "dewatering-dry-air-flushing",
    name: "Dewatering & Dry Air Flushing Services",
    category: "Dewatering & Dry Air Flushing Services",
    tagline: "Pipeline commissioning support",
    description: "Complete dewatering and dry air flushing solutions for pipeline commissioning.",
    imageKey: "svcPipelineIntegrity",
    media: [],
  },
  {
    slug: "hydro-testing-services",
    name: "Hydro Testing Services",
    category: "Hydro Testing Services",
    tagline: "Verifying pipeline integrity and safety",
    description: "Comprehensive hydrostatic testing services to verify pipeline integrity and safety.",
    imageKey: "svcPipelineIntegrity",
    media: [],
  },
  {
    slug: "lube-oil-flushing-services",
    name: "Lube-oil Flushing Services",
    category: "Lube-oil Flushing Services",
    tagline: "System cleanliness and performance",
    description: "Professional lube oil flushing services for optimal system cleanliness and performance.",
    imageKey: "svcPipelineIntegrity",
    media: [],
  },
  {
    slug: "nitrogen-helium-leak-testing",
    name: "Nitrogen Helium Leak Testing Services",
    category: "Nitrogen Helium Leak Testing Services",
    tagline: "Advanced leak detection",
    description: "Advanced leak detection services using nitrogen and helium testing methods.",
    imageKey: "svcPipelineIntegrity",
    media: [],
  },
  {
    slug: "nitrogen-purging-preservation",
    name: "Nitrogen Purging Preservation Services",
    category: "Nitrogen Purging Preservation Services",
    tagline: "Protecting pipeline systems",
    description: "Nitrogen purging and preservation services to protect pipeline systems.",
    imageKey: "svcNitrogenPurging",
    media: [],
  },
  {
    slug: "pneumatic-testing",
    name: "Pneumatic Testing",
    category: "Pneumatic Testing",
    tagline: "Pressure vessel and pipeline validation",
    description: "Reliable pneumatic testing services for pressure vessel and pipeline validation.",
    imageKey: "svcPipelineIntegrity",
    media: [],
  },
  {
    slug: "retubing-services",
    name: "Retubing Services",
    category: "Retubing Services",
    tagline: "Heat exchanger tube replacement",
    description: "Complete retubing solutions for heat exchangers and industrial equipment.",
    directImageUrl: "https://www.tritorc.com/assets/services/Retubing.jpg",
    media: [],
  },
  {
    slug: "hot-tapping-line-stopping",
    name: "Hot Tapping & Line Stopping",
    category: "Hot Tapping & Line Stopping",
    tagline: "Live pipeline modification, zero downtime",
    description: "Safe hot tapping and line stopping services for live pipeline modifications.",
    imageKey: "svcHotTapping",
    media: [],
  },
  {
    slug: "emergency-pipeline-repair-clamp",
    name: "Emergency Pipeline Repair Clamp",
    category: "Emergency Pipeline Repair Clamp",
    tagline: "Immediate leak containment",
    description: "Emergency repair clamp solutions for immediate pipeline leak containment.",
    imageKey: "svcHotTapping",
    media: [],
  },
  {
    slug: "online-leak-sealing",
    name: "Online Leak Sealing",
    category: "Online Leak Sealing",
    tagline: "No system shutdown required",
    description: "Advanced online leak sealing solutions without system shutdown.",
    imageKey: "svcHotTapping",
    media: [],
  },
  {
    slug: "pipe-freezing",
    name: "Pipe Freezing",
    category: "Pipe Freezing",
    tagline: "Safe isolation without draining",
    description: "Professional pipe freezing services for safe pipeline isolation and maintenance.",
    imageKey: "svcPipeFreezing",
    media: [],
  },
  {
    slug: "calibration-services",
    name: "Calibration Services",
    category: "Calibration Services",
    tagline: "Accuracy and compliance, verified",
    description: "Precision tool calibration services to ensure accuracy and compliance.",
    imageKey: "productSpecDiagram",
    media: [],
  },
  {
    slug: "dry-rental",
    name: "Dry Rental",
    category: "Dry Rental",
    tagline: "Equipment, when and where you need it",
    description: "Equipment rental services with comprehensive dry rental solutions.",
    imageKey: "svcDryRental",
    media: [],
  },
];

export interface ProductMediaAsset {
  id: string;
  kind: "photo" | "video";
  context: "product" | "in-use";
  url: string;
  portrait?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  series: string;
  category: string;
  tagline: string;
  specs: ProductSpec[];
  media: ProductMediaAsset[];
  catalogue: { title: string; meta: string; url: string } | null;
  heroImageKey?: ImageKey;
  // Some products' real per-item photo lives on the official tritorc.com
  // site rather than in the Strapi media library (confirmed by browsing
  // tritorc.com directly) — takes priority over heroImageKey when set.
  directImageUrl?: string;
}

export interface ProductCategory {
  name: string;
  imageKey: ImageKey;
}

export interface ProductSection {
  name: string;
  color: string;
  categories: string[];
}

// Mirrors the real official catalog structure at tritorc.com/products
// (6 sections, 21 product types) — this is the definitive taxonomy, not an
// invented one. `color` drives the scroll-position rail/indicator on the
// Products page — one distinct accent per section.
export const PRODUCT_SECTIONS: ProductSection[] = [
  {
    name: "Controlled Bolting",
    color: "#d6312f",
    categories: [
      "Hydraulic Torque Wrenches and Pumps",
      "Hydraulic Bolt Tensioners",
      "Heavy Impact Sockets",
    ],
  },
  {
    name: "Onsite Machining Tools",
    color: "#2563eb",
    categories: [
      "Pipe Cold Cutting and Beveling Machines",
      "Flange Facing Machines",
      "Tube and Pipe Beveling Machine",
    ],
  },
  {
    name: "Tube Tools",
    color: "#7c3aed",
    categories: [
      "Tube Expanders",
      "Tube Installation Tools",
      "Tube Removal Tools",
      "Tube Cleaning Tools",
    ],
  },
  {
    name: "Lifting Tools",
    color: "#d97706",
    categories: ["Single-Acting Cylinders", "Double-Acting Cylinders", "Cylinder Powerpacks and Pumps"],
  },
  {
    name: "Flange Management",
    color: "#0d9488",
    categories: [
      "Heavy Duty Hydraulic Nut Splitters",
      "Light Weight Nut Splitter",
      "Low Clearance Hydraulic Flange Spreader",
      "Hydraulic Flange Spreader Standard Maxi Kit",
    ],
  },
  {
    name: "Pipe Accessories",
    color: "#db2777",
    categories: ["Fixed and Folding Pipe Stands", "Heavy Duty Beam Roller", "Chain Clamps"],
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Hydraulic Torque Wrenches and Pumps", imageKey: "catTorqueWrenches" },
  { name: "Hydraulic Bolt Tensioners", imageKey: "catBoltTensioners" },
  { name: "Heavy Impact Sockets", imageKey: "catImpactSockets" },
  { name: "Pipe Cold Cutting and Beveling Machines", imageKey: "catPipeColdCutting" },
  { name: "Flange Facing Machines", imageKey: "catFlangeFacing" },
  { name: "Tube and Pipe Beveling Machine", imageKey: "catTubeBeveling" },
  { name: "Tube Expanders", imageKey: "catTubeExpanders" },
  { name: "Tube Installation Tools", imageKey: "catTubeInstallation" },
  { name: "Tube Removal Tools", imageKey: "catTubeRemoval" },
  { name: "Tube Cleaning Tools", imageKey: "catTubeCleaning" },
  { name: "Single-Acting Cylinders", imageKey: "catSingleActingCylinders" },
  { name: "Double-Acting Cylinders", imageKey: "catDoubleActingCylinders" },
  { name: "Cylinder Powerpacks and Pumps", imageKey: "catCylinderPowerpacks" },
  { name: "Heavy Duty Hydraulic Nut Splitters", imageKey: "catFlangeManagement" },
  { name: "Light Weight Nut Splitter", imageKey: "catFlangeManagement" },
  { name: "Low Clearance Hydraulic Flange Spreader", imageKey: "catFlangeManagement" },
  { name: "Hydraulic Flange Spreader Standard Maxi Kit", imageKey: "catFlangeManagement" },
  { name: "Fixed and Folding Pipe Stands", imageKey: "catPipeAccessories" },
  { name: "Heavy Duty Beam Roller", imageKey: "catPipeAccessories" },
  { name: "Chain Clamps", imageKey: "catChainClamps" },
];

const BOLTING_CATALOGUE = {
  title: "Bolting & Machining Solutions Catalogue",
  meta: "10.9 MB · Updated Aug 2026",
  url: "#",
};
const IN_SITU_MACHINING_CATALOGUE = {
  title: "In Situ Machining Catalogue",
  meta: "6.3 MB · Updated Aug 2026",
  url: "#",
};
const TUBE_TOOL_CATALOGUE = {
  title: "Tube Tool Catalogue Final",
  meta: "14.1 MB · Updated Aug 2026",
  url: "#",
};
const SOCKETS_CATALOGUE = {
  title: "Sockets Catalogue Revised",
  meta: "8.3 MB · Updated Aug 2026",
  url: "#",
};

export const PRODUCTS: Product[] = [
  {
    slug: "tsl-20",
    name: "Square Drive Hydraulic Torque Wrench",
    series: "TSL-20",
    category: "Hydraulic Torque Wrenches and Pumps",
    tagline:
      "Make heavy-duty torque and de-torque operations easy with Tritorc's industry-proven hydraulic torque wrenches and reliable power packs to get consistent results.",
    specs: [
      { label: "Min. Torque", value: "3,045 Nm" },
      { label: "Max. Torque", value: "30,461 Nm" },
      { label: "Square Drive", value: '2.1/2"' },
      { label: "Tool Weight", value: "26 kg" },
    ],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "productTorqueHero",
  },
  {
    slug: "btl-19",
    name: "Top-Side Hydraulic Bolt Tensioner",
    series: "BTL-19",
    category: "Hydraulic Bolt Tensioners",
    tagline:
      "The various types of hydraulic bolt tensioning tools are designed and built as per industry requirements for a variety of applications.",
    specs: [
      { label: "Bolt Size Range", value: "M64 - M76" },
      { label: "Cylinder Force", value: "1,843.3 kN" },
      { label: "Weight", value: "22 kg" },
    ],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "productTensionerHero",
  },
  {
    slug: "wbt-series",
    name: "Wind Turbine Foundation Bolt Tensioner",
    series: "WBT Series",
    category: "Hydraulic Bolt Tensioners",
    tagline: "Purpose-built for wind turbine foundation bolting.",
    specs: [
      { label: "Application", value: "Foundation bolting" },
      { label: "Industry", value: "Wind Energy" },
    ],
    media: [],
    catalogue: { title: "Wind Power Catalogue", meta: "8.1 MB · Updated Aug 2026", url: "#" },
    heroImageKey: "catWindTurbine",
  },
  {
    slug: "heavy-impact-sockets",
    name: "Heavy Impact Sockets",
    series: "Impact Socket Family",
    category: "Heavy Impact Sockets",
    tagline:
      "Impact sockets that last the rigors of industrial bolting with quality backed by a lifetime warranty against any manufacturing defects.",
    specs: [],
    media: [],
    catalogue: SOCKETS_CATALOGUE,
    heroImageKey: "catImpactSockets",
  },
  {
    slug: "pipe-cold-cutting-beveling-machines",
    name: "Pipe Cold Cutting and Beveling Machines",
    series: "Cold Cutting Range",
    category: "Pipe Cold Cutting and Beveling Machines",
    tagline:
      "Slit pipe sections and prepare weld edges with accuracy and safety — split-frame design and a spark-free working method ease every operation.",
    specs: [],
    media: [],
    catalogue: IN_SITU_MACHINING_CATALOGUE,
    heroImageKey: "catPipeColdCutting",
  },
  {
    slug: "flange-facing-machines",
    name: "Flange Facing Machines",
    series: "Flange Facer Range",
    category: "Flange Facing Machines",
    tagline:
      "Proper gasket grip cannot be compromised — Tritorc's reliable flange facers provide accurate surface finish, overcoming bolted-joint flange leakages with ease.",
    specs: [],
    media: [],
    catalogue: IN_SITU_MACHINING_CATALOGUE,
    heroImageKey: "catFlangeFacing",
  },
  {
    slug: "tube-pipe-beveling-machine",
    name: "Tube and Pipe Beveling Machine",
    series: "Beveling Range",
    category: "Tube and Pipe Beveling Machine",
    tagline:
      "Precision tube and pipe beveling for reliable weld preparation, built for accuracy and safety in the field.",
    specs: [],
    media: [],
    catalogue: IN_SITU_MACHINING_CATALOGUE,
    heroImageKey: "catTubeBeveling",
  },
  {
    slug: "tube-expanders",
    name: "Tube Expanders",
    series: "Tube Expander Range",
    category: "Tube Expanders",
    tagline:
      "An incorrectly rolled tube can compromise the entire heat transfer vessel — Tritorc's industry-proven tube expanders are trusted on tubes of heat exchangers, boilers, and condensers.",
    specs: [],
    media: [],
    catalogue: TUBE_TOOL_CATALOGUE,
    heroImageKey: "catTubeExpanders",
  },
  {
    slug: "tube-installation-tools",
    name: "Tube Installation Tools",
    series: "Tube Installation Range",
    category: "Tube Installation Tools",
    tagline:
      "Install tubes without damaging them or compromising their working with highly functional tube rolling drives, tube expansion systems, and reliable accessories.",
    specs: [],
    media: [],
    catalogue: TUBE_TOOL_CATALOGUE,
    heroImageKey: "catTubeInstallation",
  },
  {
    slug: "tube-removal-tools",
    name: "Tube Removal Tools",
    series: "Tube Removal Range",
    category: "Tube Removal Tools",
    tagline:
      "Extract damaged and corroded tubes with Tritorc's efficient tube-pulling systems, tube mandrels, tube spears, and stub pullers.",
    specs: [],
    media: [],
    catalogue: TUBE_TOOL_CATALOGUE,
    heroImageKey: "catTubeRemoval",
  },
  {
    slug: "tube-cleaning-tools",
    name: "Tube Cleaning Tools",
    series: "Tube Cleaning Range",
    category: "Tube Cleaning Tools",
    tagline:
      "Tube cleaning tools like brushes, flexible shafts, and cleaning systems ensure thorough maintenance for boilers and heat exchangers.",
    specs: [],
    media: [],
    catalogue: TUBE_TOOL_CATALOGUE,
    heroImageKey: "catTubeCleaning",
  },
  {
    slug: "single-acting-cylinders",
    name: "Single-Acting Cylinders",
    series: "Lifting Cylinder Range",
    category: "Single-Acting Cylinders",
    tagline:
      "Versatile and effective single-acting lifting cylinders allow restricted space access, high tonnage, and hollow cylinder applications.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catSingleActingCylinders",
  },
  {
    slug: "double-acting-cylinders",
    name: "Double-Acting Cylinders",
    series: "Lifting Cylinder Range",
    category: "Double-Acting Cylinders",
    tagline: "Double-acting cylinders allow controlled lifting and lowering of heavy objects and accurate positioning.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catDoubleActingCylinders",
  },
  {
    slug: "cylinder-powerpacks-pumps",
    name: "Cylinder Powerpacks and Pumps",
    series: "Powerpack Range",
    category: "Cylinder Powerpacks and Pumps",
    tagline: "Reliable power packs and hand pumps that provide consistent pressure for critical load-lifting tools.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catCylinderPowerpacks",
  },
  {
    slug: "heavy-duty-nut-splitters",
    name: "Heavy Duty Hydraulic Nut Splitters",
    series: "Nut Splitter Range",
    category: "Heavy Duty Hydraulic Nut Splitters",
    tagline:
      "Meticulously designed hydraulic nut splitters for effective, safe, and damage-free removal of corroded or seized nuts sizing from 11-89 mm dia.",
    specs: [],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "catFlangeManagement",
    directImageUrl:
      "https://www.tritorc.com/assets/img/products/flange-management-tools/heavy-duty-hydraulic-nut-splitters.webp",
  },
  {
    slug: "light-weight-nut-splitter",
    name: "Light Weight Nut Splitter",
    series: "Nut Splitter Range",
    category: "Light Weight Nut Splitter",
    tagline:
      "Compatible with 6-48 mm dia nuts, our angle-headed nut splitter enables effortless, safe, and damage-free removal in confined or hard-to-reach spaces.",
    specs: [],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "catFlangeManagement",
    directImageUrl:
      "https://www.tritorc.com/assets/img/products/flange-management-tools/light-weight-nut-splitter.webp",
  },
  {
    slug: "low-clearance-flange-spreader",
    name: "Low Clearance Hydraulic Flange Spreader",
    series: "Flange Spreader Range",
    category: "Low Clearance Hydraulic Flange Spreader",
    tagline:
      "A force-controlled low-clearance flange spreader requiring just 2 mm insertion clearance effectively separates flanges in tight spaces without damaging seals.",
    specs: [],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "catFlangeManagement",
    directImageUrl:
      "https://www.tritorc.com/assets/img/products/flange-management-tools/low-clearence-hydraulic-flange-spreader.webp",
  },
  {
    slug: "flange-spreader-maxi-kit",
    name: "Hydraulic Flange Spreader Standard Maxi Kit",
    series: "Flange Spreader Range",
    category: "Hydraulic Flange Spreader Standard Maxi Kit",
    tagline:
      "Capable of controlled flange separation and expansion up to 81 mm, our hydraulic flange spreading kit delivers reliable performance across diverse industrial applications.",
    specs: [],
    media: [],
    catalogue: BOLTING_CATALOGUE,
    heroImageKey: "catFlangeManagement",
    directImageUrl:
      "https://www.tritorc.com/assets/img/products/flange-management-tools/hydraulic-flange-spreader-standard-maxi-kit.webp",
  },
  {
    slug: "fixed-folding-pipe-stands",
    name: "Fixed and Folding Pipe Stands",
    series: "Pipe Stand Range",
    category: "Fixed and Folding Pipe Stands",
    tagline:
      "Reliable fixed and folding pipe stands avoid the use of temporary platforms, keeping pipes stable in workshops and onsite operations.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catPipeAccessories",
    directImageUrl: "https://www.tritorc.com/assets/img/products/pipe-accessories/fixed-and-folding-stands.webp",
  },
  {
    slug: "heavy-duty-beam-roller",
    name: "Heavy Duty Beam Roller",
    series: "Beam Roller Range",
    category: "Heavy Duty Beam Roller",
    tagline: "Trusted tools that allow pipes to be rotated with ease while keeping them stable for welding and other operations.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catPipeAccessories",
    directImageUrl: "https://www.tritorc.com/assets/img/products/pipe-accessories/heavy-duty-beam-roller.webp",
  },
  {
    slug: "chain-clamps",
    name: "Chain Clamps",
    series: "Chain Clamp Range",
    category: "Chain Clamps",
    tagline: "Keep flanges, elbow sections, and other pipe sections steady while welding reliably with our chain clamps.",
    specs: [],
    media: [],
    catalogue: null,
    heroImageKey: "catChainClamps",
    directImageUrl: "https://www.tritorc.com/assets/img/products/pipe-accessories/scissor-clamps-1000-series.webp",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  imageKey: ImageKey;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    // This image's specific project origin isn't identifiable (generic
    // plant + tools collage), so the caption stays a general capability
    // statement rather than an invented named-client attribution.
    quote: "From refineries to remote pipelines, our tools perform where it matters most.",
    author: "Field Operations, Oil & Gas Sector",
    imageKey: "testimonial1",
  },
  {
    // Corrected: this image is Tritorc's own "The New Pamban Bridge" success
    // story graphic (visible in the image itself) — it was previously
    // mismatched with an unrelated "Adani Wind Project" quote.
    quote: "Behind the bolts of India's first vertical-lift sea bridge.",
    author: "The New Pamban Bridge, India",
    imageKey: "testimonial2",
  },
];

export interface LibraryAsset {
  id: string;
  type: "Catalogue" | "Video" | "Photo";
  title: string;
  categoryLabel: string;
  imageKey?: ImageKey;
}

export const LIBRARY_MEDIA_ASSETS: LibraryAsset[] = [
  { id: "vid-1", type: "Video", title: "HTW Demo Video", categoryLabel: "Hydraulic Torque Wrenches and Pumps", imageKey: "productTorqueHero" },
  { id: "vid-2", type: "Video", title: "WBT Series Wind Turbine Install", categoryLabel: "Hydraulic Bolt Tensioners", imageKey: "catWindTurbine" },
  { id: "vid-3", type: "Video", title: "Hot Tapping & Line Stopping Overview", categoryLabel: "Services", imageKey: "svcHotTapping" },
  { id: "photo-1", type: "Photo", title: "TSL Series Product Shot", categoryLabel: "Hydraulic Torque Wrenches and Pumps", imageKey: "productTorqueHero" },
  // Corrected: this is studio product photography, not an in-use/offshore
  // shot — the earlier title overstated what the image actually shows.
  { id: "photo-2", type: "Photo", title: "BTL Series Product Photography", categoryLabel: "Hydraulic Bolt Tensioners", imageKey: "libraryBtlPhoto" },
  // Corrected: this file is a torque wrench technical spec diagram, not a
  // facility photo — it was mislabeled "Manufacturing Facility Overview"
  // before the visual audit caught it.
  { id: "photo-3", type: "Photo", title: "Torque Wrench Technical Drawing", categoryLabel: "Hydraulic Torque Wrenches and Pumps", imageKey: "productSpecDiagram" },
  { id: "photo-4", type: "Photo", title: "Company Operations Overview", categoryLabel: "Company", imageKey: "companyIntro" },
];

export const BRAND = {
  quote:
    "At Tritorc, we don't just take on challenges — we turn them into outcomes.",
  since: "Since 1989",
};
