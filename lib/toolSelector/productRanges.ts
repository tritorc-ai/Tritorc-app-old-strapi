/**
 * Torque wrench (TSL/THL) model ranges, extracted from "Bolting & Machining
 * Solutions Cata (IND) APAC.pdf" via pdfplumber (TSL p.1/idx3, THL p.3/idx5).
 */

export interface TorqueWrenchModel {
  model: string;
  series: "TSL" | "THL";
  minTorqueNm: number;
  maxTorqueNm: number;
}

// TSL — Square Drive
export const TSL_MODELS: TorqueWrenchModel[] = [
  { model: "TSL-07", series: "TSL", minTorqueNm: 112, maxTorqueNm: 1120 },
  { model: "TSL-1", series: "TSL", minTorqueNm: 183, maxTorqueNm: 1837 },
  { model: "TSL-3", series: "TSL", minTorqueNm: 450, maxTorqueNm: 4500 },
  { model: "TSL-5", series: "TSL", minTorqueNm: 737, maxTorqueNm: 7379 },
  { model: "TSL-8", series: "TSL", minTorqueNm: 1078, maxTorqueNm: 10780 },
  { model: "TSL-10", series: "TSL", minTorqueNm: 1551, maxTorqueNm: 15519 },
  { model: "TSL-15", series: "TSL", minTorqueNm: 2176, maxTorqueNm: 22505 },
  { model: "TSL-20", series: "TSL", minTorqueNm: 3045, maxTorqueNm: 30461 },
  { model: "TSL-25", series: "TSL", minTorqueNm: 3472, maxTorqueNm: 34725 },
  { model: "TSL-35", series: "TSL", minTorqueNm: 4866, maxTorqueNm: 48666 },
  { model: "TSL-50", series: "TSL", minTorqueNm: 6925, maxTorqueNm: 69247 },
];

// THL — Hex Drive (each catalogue model spans two reaction-pad variants;
// collapsed here into one min-max range per model for selection purposes)
export const THL_MODELS: TorqueWrenchModel[] = [
  { model: "THL-2", series: "THL", minTorqueNm: 273, maxTorqueNm: 2952 },
  { model: "THL-4", series: "THL", minTorqueNm: 607, maxTorqueNm: 6773 },
  { model: "THL-8", series: "THL", minTorqueNm: 1228, maxTorqueNm: 15890 },
  { model: "THL-14", series: "THL", minTorqueNm: 2162, maxTorqueNm: 24399 },
  { model: "THL-32", series: "THL", minTorqueNm: 5026, maxTorqueNm: 53512 },
];

export const ALL_TORQUE_WRENCH_MODELS: TorqueWrenchModel[] = [...TSL_MODELS, ...THL_MODELS];

// Bolt tensioner (BTL) model data lives in ./btlModelTable.ts — richer
// dimensional data feeding the full fitment-check engine in
// ./btlFitmentRules.ts, superseding the old size-only lookup that used to
// live here.
