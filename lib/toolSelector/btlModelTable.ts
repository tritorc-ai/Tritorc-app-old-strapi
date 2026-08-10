/**
 * BTL Series hydraulic bolt tensioner dimensional data, extracted from
 * Tritorc's "BTL top side" catalogue page (TOP-SIDE BOLT TENSIONER BTL
 * SERIES) — ported from the standalone fitment-check tool's BTL_DB, which
 * itself was hand-verified against that catalogue page.
 *
 * Dimension key: A = bridge OD, B = inner bore, C = overall height,
 * D = bridge height, E = puller engagement length, F = stud engagement
 * range (min/max). All dimensions in mm.
 *
 * For BTL-37/44/54 the catalogue gives ranges for B/C/D/E rather than a
 * single value; those were collapsed to the midpoint average (B/C/D) or the
 * low end (E) by the source tool. Kept as-is rather than re-deriving, but
 * flagged here for anyone reconciling against a future catalogue revision.
 */

export interface BtlTensionerModel {
  model: string;
  series: "BTL";
  cylinderForceKn: number;
  hydraulicAreaCm2: number;
  bridgeOdMm: number; // A
  innerBoreMm: number; // B
  overallHeightMm: number; // C
  bridgeHeightMm: number; // D
  pullerEngagementMm: number; // E
  studProtrusionMinMm: number; // F_min
  studProtrusionMaxMm: number; // F_max
  weightKg: number;
  boltSizes: string[]; // metric only — the catalogue has no inch bolt sizes
  boltRangeLabel: string;
}

// Ordered smallest -> largest. pickRecommendedModel() in btlFitmentRules.ts
// relies on this order (first bolt-compatible + fully-passing model wins).
export const BTL_MODELS: BtlTensionerModel[] = [
  {
    model: "BTL-3",
    series: "BTL",
    cylinderForceKn: 234.2,
    hydraulicAreaCm2: 15.7,
    bridgeOdMm: 75,
    innerBoreMm: 32.5,
    overallHeightMm: 168,
    bridgeHeightMm: 90,
    pullerEngagementMm: 62,
    studProtrusionMinMm: 47,
    studProtrusionMaxMm: 51,
    weightKg: 3,
    boltSizes: ["M16", "M18", "M20", "M22", "M24"],
    boltRangeLabel: "M16 - M24",
  },
  {
    model: "BTL-5",
    series: "BTL",
    cylinderForceKn: 498.2,
    hydraulicAreaCm2: 33,
    bridgeOdMm: 102,
    innerBoreMm: 47,
    overallHeightMm: 187,
    bridgeHeightMm: 106,
    pullerEngagementMm: 60,
    studProtrusionMinMm: 65,
    studProtrusionMaxMm: 71,
    weightKg: 5.5,
    boltSizes: ["M27", "M30", "M33", "M36"],
    boltRangeLabel: "M27 - M36",
  },
  {
    model: "BTL-9",
    series: "BTL",
    cylinderForceKn: 896.8,
    hydraulicAreaCm2: 59.7,
    bridgeOdMm: 133,
    innerBoreMm: 61,
    overallHeightMm: 208,
    bridgeHeightMm: 120,
    pullerEngagementMm: 60,
    studProtrusionMinMm: 86,
    studProtrusionMaxMm: 93,
    weightKg: 10,
    boltSizes: ["M39", "M42", "M45", "M48"],
    boltRangeLabel: "M39 - M48",
  },
  {
    model: "BTL-13",
    series: "BTL",
    cylinderForceKn: 1245.0,
    hydraulicAreaCm2: 83,
    bridgeOdMm: 163,
    innerBoreMm: 73,
    overallHeightMm: 231,
    bridgeHeightMm: 135,
    pullerEngagementMm: 62,
    studProtrusionMinMm: 106,
    studProtrusionMaxMm: 114,
    weightKg: 16,
    boltSizes: ["M52", "M56", "M60"],
    boltRangeLabel: "M52 - M60",
  },
  {
    model: "BTL-19",
    series: "BTL",
    cylinderForceKn: 1843.3,
    hydraulicAreaCm2: 123,
    bridgeOdMm: 193,
    innerBoreMm: 86.5,
    overallHeightMm: 254,
    bridgeHeightMm: 150,
    pullerEngagementMm: 62,
    studProtrusionMinMm: 129,
    studProtrusionMaxMm: 135,
    weightKg: 22,
    boltSizes: ["M64", "M68", "M72", "M76"],
    boltRangeLabel: "M64 - M76",
  },
  {
    model: "BTL-27",
    series: "BTL",
    cylinderForceKn: 2640.5,
    hydraulicAreaCm2: 176,
    bridgeOdMm: 233,
    innerBoreMm: 110,
    overallHeightMm: 286,
    bridgeHeightMm: 180,
    pullerEngagementMm: 73,
    studProtrusionMinMm: 155,
    studProtrusionMaxMm: 167,
    weightKg: 40,
    boltSizes: ["M76", "M80", "M85", "M90", "M95", "M100"],
    boltRangeLabel: "M76 - M100",
  },
  {
    model: "BTL-37",
    series: "BTL",
    cylinderForceKn: 3768.0,
    hydraulicAreaCm2: 251,
    bridgeOdMm: 280,
    innerBoreMm: 116,
    overallHeightMm: 321,
    bridgeHeightMm: 189,
    pullerEngagementMm: 37,
    studProtrusionMinMm: 175,
    studProtrusionMaxMm: 196,
    weightKg: 64,
    boltSizes: ["M90", "M95", "M100", "M110"],
    boltRangeLabel: "M90 - M110",
  },
  {
    model: "BTL-44",
    series: "BTL",
    cylinderForceKn: 4335.0,
    hydraulicAreaCm2: 289,
    bridgeOdMm: 314,
    innerBoreMm: 130,
    overallHeightMm: 335,
    bridgeHeightMm: 200,
    pullerEngagementMm: 40,
    studProtrusionMinMm: 192,
    studProtrusionMaxMm: 233,
    weightKg: 85,
    boltSizes: ["M100", "M110", "M120", "M125"],
    boltRangeLabel: "M100 - M125",
  },
  {
    model: "BTL-54",
    series: "BTL",
    cylinderForceKn: 5404.0,
    hydraulicAreaCm2: 360,
    bridgeOdMm: 344,
    innerBoreMm: 146,
    overallHeightMm: 371,
    bridgeHeightMm: 209,
    pullerEngagementMm: 42,
    studProtrusionMinMm: 243,
    studProtrusionMaxMm: 275,
    weightKg: 125,
    boltSizes: ["M125", "M130", "M140", "M150"],
    boltRangeLabel: "M125 - M150",
  },
];

export const ALL_BTL_BOLT_SIZES: string[] = Array.from(
  new Set(BTL_MODELS.flatMap((m) => m.boltSizes))
);
