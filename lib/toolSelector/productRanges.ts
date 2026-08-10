/**
 * Torque wrench (TSL/THL) and bolt tensioner (BTL) model ranges, extracted
 * from "Bolting & Machining Solutions Cata (IND) APAC.pdf" via pdfplumber
 * (TSL p.1/idx3, THL p.3/idx5, BTL p.13/idx15).
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

export interface BoltTensionerModel {
  model: string;
  series: "BTL";
  cylinderForceKn: number;
  metricSizes: string[];
  inchSizes: string[];
}

export const BTL_MODELS: BoltTensionerModel[] = [
  { model: "BTL-3", series: "BTL", cylinderForceKn: 234.2, metricSizes: ["M16", "M18", "M20", "M22", "M24"], inchSizes: ["3/4", "7/8", "1"] },
  { model: "BTL-5", series: "BTL", cylinderForceKn: 498.2, metricSizes: ["M27", "M30", "M33", "M36"], inchSizes: ["1-1/8", "1-1/4", "1-3/8"] },
  { model: "BTL-9", series: "BTL", cylinderForceKn: 896.8, metricSizes: ["M39", "M42", "M45", "M48"], inchSizes: ["1-1/2", "1-5/8", "1-3/4", "1-7/8"] },
  { model: "BTL-13", series: "BTL", cylinderForceKn: 1245.0, metricSizes: ["M52", "M56", "M60"], inchSizes: ["2", "2-1/4"] },
  { model: "BTL-19", series: "BTL", cylinderForceKn: 1843.3, metricSizes: ["M64", "M68", "M72", "M76"], inchSizes: ["2-1/2", "2-3/4", "3"] },
  { model: "BTL-27", series: "BTL", cylinderForceKn: 2640.5, metricSizes: ["M76", "M80", "M85", "M90", "M95", "M100"], inchSizes: ["3", "3-1/4", "3-1/2", "3-3/4", "4"] },
  { model: "BTL-37", series: "BTL", cylinderForceKn: 3768.0, metricSizes: ["M90", "M95", "M100", "M110"], inchSizes: ["3-1/2", "3-3/4", "4", "4-1/4"] },
  { model: "BTL-44", series: "BTL", cylinderForceKn: 4335.0, metricSizes: ["M100", "M110", "M120", "M125"], inchSizes: ["4", "4-1/2", "4-3/4", "5"] },
  { model: "BTL-54", series: "BTL", cylinderForceKn: 5404.0, metricSizes: ["M125", "M130", "M140", "M150"], inchSizes: ["5", "5-1/4", "5-1/2", "5-3/4"] },
];

export const ALL_METRIC_BOLT_SIZES: string[] = Array.from(
  new Set(BTL_MODELS.flatMap((m) => m.metricSizes))
);

export const ALL_INCH_BOLT_SIZES: string[] = Array.from(
  new Set(BTL_MODELS.flatMap((m) => m.inchSizes))
);
