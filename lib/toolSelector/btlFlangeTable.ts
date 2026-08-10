/**
 * ASME B16.5 / API 6A flange lookup tables, ported verbatim from the
 * standalone BTL fitment-check tool (Tritorc_BTL_Fitment_Checker_R5.html).
 *
 * Deliberately kept separate from lib/toolSelector/flangeSizeTable.ts (the
 * torque-wrench flow's flange table) rather than merged or reconciled: the
 * two tables were extracted independently and disagree on bolt size for
 * several nominal-size/class combinations (e.g. 3" @ 600# — this table says
 * M24, flangeSizeTable.ts says M20). Only this table carries PCD and pipe
 * OD, which the torque-wrench table lacks entirely, so it's the one needed
 * for real clearance/interference math. Null cells mean the source
 * catalogue has no rating for that size/class combination.
 */

import type { PressureClass } from "./flangeSizeTable";

export type FlangeStandard = "ASME" | "API";
export type ApiPressureRating = 2000 | 3000 | 5000 | 10000 | 15000 | 20000;

export interface FlangeLookupRow {
  pcdMm: number;
  numBolts: number;
  boltSize: string; // metric, e.g. "M20"
  pipeOdMm: number;
}

export const ASME_PRESSURE_CLASSES: PressureClass[] = [150, 300, 600, 900, 1500, 2500];
export const API_PRESSURE_RATINGS: ApiPressureRating[] = [2000, 3000, 5000, 10000, 15000, 20000];

type AsmeRow = Record<PressureClass, FlangeLookupRow | null>;
type ApiRow = Record<ApiPressureRating, FlangeLookupRow | null>;

export const ASME_FLANGE_TABLE: Record<string, AsmeRow> = {
  '2"': {
    150: { pcdMm: 120.7, numBolts: 4, boltSize: "M16", pipeOdMm: 60.3 },
    300: { pcdMm: 165.1, numBolts: 8, boltSize: "M16", pipeOdMm: 60.3 },
    600: { pcdMm: 165.1, numBolts: 8, boltSize: "M20", pipeOdMm: 60.3 },
    900: { pcdMm: 190.5, numBolts: 8, boltSize: "M24", pipeOdMm: 60.3 },
    1500: { pcdMm: 190.5, numBolts: 8, boltSize: "M30", pipeOdMm: 60.3 },
    2500: { pcdMm: 215.9, numBolts: 8, boltSize: "M36", pipeOdMm: 60.3 },
  },
  '3"': {
    150: { pcdMm: 152.4, numBolts: 4, boltSize: "M16", pipeOdMm: 88.9 },
    300: { pcdMm: 190.5, numBolts: 8, boltSize: "M20", pipeOdMm: 88.9 },
    600: { pcdMm: 209.6, numBolts: 8, boltSize: "M24", pipeOdMm: 88.9 },
    900: { pcdMm: 241.3, numBolts: 8, boltSize: "M30", pipeOdMm: 88.9 },
    1500: { pcdMm: 241.3, numBolts: 8, boltSize: "M36", pipeOdMm: 88.9 },
    2500: { pcdMm: 279.4, numBolts: 8, boltSize: "M48", pipeOdMm: 88.9 },
  },
  '4"': {
    150: { pcdMm: 190.5, numBolts: 8, boltSize: "M16", pipeOdMm: 114.3 },
    300: { pcdMm: 228.6, numBolts: 8, boltSize: "M20", pipeOdMm: 114.3 },
    600: { pcdMm: 254.0, numBolts: 8, boltSize: "M27", pipeOdMm: 114.3 },
    900: { pcdMm: 292.1, numBolts: 8, boltSize: "M36", pipeOdMm: 114.3 },
    1500: { pcdMm: 292.1, numBolts: 8, boltSize: "M42", pipeOdMm: 114.3 },
    2500: { pcdMm: 330.2, numBolts: 8, boltSize: "M56", pipeOdMm: 114.3 },
  },
  '6"': {
    150: { pcdMm: 241.3, numBolts: 8, boltSize: "M20", pipeOdMm: 168.3 },
    300: { pcdMm: 279.4, numBolts: 12, boltSize: "M20", pipeOdMm: 168.3 },
    600: { pcdMm: 317.5, numBolts: 12, boltSize: "M27", pipeOdMm: 168.3 },
    900: { pcdMm: 368.3, numBolts: 12, boltSize: "M36", pipeOdMm: 168.3 },
    1500: { pcdMm: 368.3, numBolts: 12, boltSize: "M45", pipeOdMm: 168.3 },
    2500: { pcdMm: 431.8, numBolts: 12, boltSize: "M64", pipeOdMm: 168.3 },
  },
  '8"': {
    150: { pcdMm: 298.5, numBolts: 8, boltSize: "M20", pipeOdMm: 219.1 },
    300: { pcdMm: 342.9, numBolts: 12, boltSize: "M24", pipeOdMm: 219.1 },
    600: { pcdMm: 381.0, numBolts: 12, boltSize: "M33", pipeOdMm: 219.1 },
    900: { pcdMm: 419.1, numBolts: 12, boltSize: "M42", pipeOdMm: 219.1 },
    1500: { pcdMm: 469.9, numBolts: 12, boltSize: "M52", pipeOdMm: 219.1 },
    2500: { pcdMm: 539.8, numBolts: 12, boltSize: "M72", pipeOdMm: 219.1 },
  },
  '10"': {
    150: { pcdMm: 362.0, numBolts: 12, boltSize: "M24", pipeOdMm: 273.1 },
    300: { pcdMm: 406.4, numBolts: 16, boltSize: "M27", pipeOdMm: 273.1 },
    600: { pcdMm: 444.5, numBolts: 16, boltSize: "M36", pipeOdMm: 273.1 },
    900: { pcdMm: 514.4, numBolts: 16, boltSize: "M48", pipeOdMm: 273.1 },
    1500: { pcdMm: 558.8, numBolts: 12, boltSize: "M64", pipeOdMm: 273.1 },
    2500: { pcdMm: 647.7, numBolts: 12, boltSize: "M85", pipeOdMm: 273.1 },
  },
  '12"': {
    150: { pcdMm: 431.8, numBolts: 12, boltSize: "M24", pipeOdMm: 323.9 },
    300: { pcdMm: 482.6, numBolts: 16, boltSize: "M30", pipeOdMm: 323.9 },
    600: { pcdMm: 520.7, numBolts: 20, boltSize: "M36", pipeOdMm: 323.9 },
    900: { pcdMm: 584.2, numBolts: 20, boltSize: "M52", pipeOdMm: 323.9 },
    1500: { pcdMm: 647.7, numBolts: 16, boltSize: "M72", pipeOdMm: 323.9 },
    2500: { pcdMm: 762.0, numBolts: 12, boltSize: "M100", pipeOdMm: 323.9 },
  },
  '14"': {
    150: { pcdMm: 476.3, numBolts: 12, boltSize: "M27", pipeOdMm: 355.6 },
    300: { pcdMm: 539.8, numBolts: 16, boltSize: "M33", pipeOdMm: 355.6 },
    600: { pcdMm: 558.8, numBolts: 20, boltSize: "M39", pipeOdMm: 355.6 },
    900: { pcdMm: 641.4, numBolts: 20, boltSize: "M52", pipeOdMm: 355.6 },
    1500: { pcdMm: 723.9, numBolts: 16, boltSize: "M85", pipeOdMm: 355.6 },
    2500: { pcdMm: 812.8, numBolts: 12, boltSize: "M110", pipeOdMm: 355.6 },
  },
  '16"': {
    150: { pcdMm: 539.8, numBolts: 16, boltSize: "M24", pipeOdMm: 406.4 },
    300: { pcdMm: 603.3, numBolts: 16, boltSize: "M36", pipeOdMm: 406.4 },
    600: { pcdMm: 647.7, numBolts: 20, boltSize: "M45", pipeOdMm: 406.4 },
    900: { pcdMm: 749.3, numBolts: 20, boltSize: "M64", pipeOdMm: 406.4 },
    1500: { pcdMm: 812.8, numBolts: 16, boltSize: "M85", pipeOdMm: 406.4 },
    2500: { pcdMm: 939.8, numBolts: 16, boltSize: "M110", pipeOdMm: 406.4 },
  },
  '18"': {
    150: { pcdMm: 577.9, numBolts: 16, boltSize: "M27", pipeOdMm: 457.2 },
    300: { pcdMm: 654.1, numBolts: 20, boltSize: "M36", pipeOdMm: 457.2 },
    600: { pcdMm: 711.2, numBolts: 20, boltSize: "M52", pipeOdMm: 457.2 },
    900: { pcdMm: 812.8, numBolts: 20, boltSize: "M72", pipeOdMm: 457.2 },
    1500: { pcdMm: 889.0, numBolts: 16, boltSize: "M100", pipeOdMm: 457.2 },
    2500: { pcdMm: 1028.7, numBolts: 16, boltSize: "M120", pipeOdMm: 457.2 },
  },
  '20"': {
    150: { pcdMm: 635.0, numBolts: 20, boltSize: "M27", pipeOdMm: 508.0 },
    300: { pcdMm: 711.2, numBolts: 20, boltSize: "M39", pipeOdMm: 508.0 },
    600: { pcdMm: 775.1, numBolts: 24, boltSize: "M52", pipeOdMm: 508.0 },
    900: { pcdMm: 876.3, numBolts: 20, boltSize: "M80", pipeOdMm: 508.0 },
    1500: { pcdMm: 952.5, numBolts: 20, boltSize: "M100", pipeOdMm: 508.0 },
    2500: { pcdMm: 1104.9, numBolts: 16, boltSize: "M125", pipeOdMm: 508.0 },
  },
  '24"': {
    150: { pcdMm: 749.3, numBolts: 20, boltSize: "M30", pipeOdMm: 609.6 },
    300: { pcdMm: 844.6, numBolts: 24, boltSize: "M42", pipeOdMm: 609.6 },
    600: { pcdMm: 914.4, numBolts: 24, boltSize: "M64", pipeOdMm: 609.6 },
    900: { pcdMm: 1022.4, numBolts: 24, boltSize: "M90", pipeOdMm: 609.6 },
    1500: { pcdMm: 1123.9, numBolts: 20, boltSize: "M110", pipeOdMm: 609.6 },
    2500: { pcdMm: 1295.4, numBolts: 20, boltSize: "M130", pipeOdMm: 609.6 },
  },
};

export const API_FLANGE_TABLE: Record<string, ApiRow> = {
  '2 1/16"': {
    2000: { pcdMm: 84, numBolts: 8, boltSize: "M20", pipeOdMm: 52.4 },
    3000: { pcdMm: 104.8, numBolts: 8, boltSize: "M24", pipeOdMm: 52.4 },
    5000: { pcdMm: 104.8, numBolts: 8, boltSize: "M24", pipeOdMm: 52.4 },
    10000: { pcdMm: 158.8, numBolts: 8, boltSize: "M27", pipeOdMm: 52.4 },
    15000: { pcdMm: 160.3, numBolts: 8, boltSize: "M30", pipeOdMm: 52.4 },
    20000: { pcdMm: 203.2, numBolts: 8, boltSize: "M36", pipeOdMm: 52.4 },
  },
  '2 9/16"': {
    2000: { pcdMm: 100, numBolts: 8, boltSize: "M24", pipeOdMm: 65.9 },
    3000: { pcdMm: 123.8, numBolts: 8, boltSize: "M27", pipeOdMm: 65.9 },
    5000: { pcdMm: 123.8, numBolts: 8, boltSize: "M27", pipeOdMm: 65.9 },
    10000: { pcdMm: 184.2, numBolts: 8, boltSize: "M30", pipeOdMm: 65.9 },
    15000: { pcdMm: 200.0, numBolts: 8, boltSize: "M33", pipeOdMm: 65.9 },
    20000: { pcdMm: 261.9, numBolts: 8, boltSize: "M42", pipeOdMm: 65.9 },
  },
  '3 1/8"': {
    2000: { pcdMm: 117, numBolts: 8, boltSize: "M24", pipeOdMm: 81.8 },
    3000: { pcdMm: 127.0, numBolts: 8, boltSize: "M24", pipeOdMm: 81.8 },
    5000: { pcdMm: 133.3, numBolts: 8, boltSize: "M27", pipeOdMm: 81.8 },
    10000: { pcdMm: 215.9, numBolts: 8, boltSize: "M36", pipeOdMm: 81.8 },
    15000: { pcdMm: 230.2, numBolts: 8, boltSize: "M39", pipeOdMm: 81.8 },
    20000: { pcdMm: 287.3, numBolts: 8, boltSize: "M48", pipeOdMm: 81.8 },
  },
  '4 1/16"': {
    2000: { pcdMm: 152, numBolts: 8, boltSize: "M27", pipeOdMm: 108.7 },
    3000: { pcdMm: 158.8, numBolts: 8, boltSize: "M30", pipeOdMm: 108.7 },
    5000: { pcdMm: 161.9, numBolts: 8, boltSize: "M33", pipeOdMm: 108.7 },
    10000: { pcdMm: 258.8, numBolts: 8, boltSize: "M42", pipeOdMm: 108.7 },
    15000: { pcdMm: 290.5, numBolts: 8, boltSize: "M48", pipeOdMm: 108.7 },
    20000: { pcdMm: 357.2, numBolts: 8, boltSize: "M60", pipeOdMm: 108.7 },
  },
  '5 1/8"': {
    2000: { pcdMm: 189, numBolts: 8, boltSize: "M30", pipeOdMm: 131.0 },
    3000: { pcdMm: 190.5, numBolts: 8, boltSize: "M33", pipeOdMm: 131.0 },
    5000: { pcdMm: 196.8, numBolts: 8, boltSize: "M39", pipeOdMm: 131.0 },
    10000: { pcdMm: 300.0, numBolts: 12, boltSize: "M45", pipeOdMm: 131.0 },
    15000: { pcdMm: 342.9, numBolts: 12, boltSize: "M52", pipeOdMm: 131.0 },
    20000: null,
  },
  '7 1/16"': {
    2000: { pcdMm: 222, numBolts: 12, boltSize: "M33", pipeOdMm: 181.8 },
    3000: { pcdMm: 235.0, numBolts: 12, boltSize: "M36", pipeOdMm: 181.8 },
    5000: { pcdMm: 228.6, numBolts: 12, boltSize: "M39", pipeOdMm: 181.8 },
    10000: { pcdMm: 403.2, numBolts: 12, boltSize: "M60", pipeOdMm: 181.8 },
    15000: { pcdMm: 428.6, numBolts: 16, boltSize: "M60", pipeOdMm: 181.8 },
    20000: { pcdMm: 554.0, numBolts: 16, boltSize: "M80", pipeOdMm: 181.8 },
  },
  '9"': {
    2000: { pcdMm: 273, numBolts: 12, boltSize: "M39", pipeOdMm: 229.4 },
    3000: { pcdMm: 298.5, numBolts: 12, boltSize: "M45", pipeOdMm: 229.4 },
    5000: { pcdMm: 292.1, numBolts: 12, boltSize: "M48", pipeOdMm: 229.4 },
    10000: { pcdMm: 476.3, numBolts: 16, boltSize: "M60", pipeOdMm: 229.4 },
    15000: { pcdMm: 552.4, numBolts: 16, boltSize: "M72", pipeOdMm: 229.4 },
    20000: { pcdMm: 685.8, numBolts: 16, boltSize: "M95", pipeOdMm: 229.4 },
  },
  '11"': {
    2000: { pcdMm: 343, numBolts: 16, boltSize: "M42", pipeOdMm: 280.2 },
    3000: { pcdMm: 368.3, numBolts: 16, boltSize: "M48", pipeOdMm: 280.2 },
    5000: { pcdMm: 368.3, numBolts: 12, boltSize: "M56", pipeOdMm: 280.2 },
    10000: { pcdMm: 565.2, numBolts: 16, boltSize: "M72", pipeOdMm: 280.2 },
    15000: { pcdMm: 711.2, numBolts: 20, boltSize: "M90", pipeOdMm: 280.2 },
    20000: { pcdMm: 749.3, numBolts: 16, boltSize: "M110", pipeOdMm: 280.2 },
  },
  '13 5/8"': {
    2000: { pcdMm: 400, numBolts: 20, boltSize: "M42", pipeOdMm: 346.9 },
    3000: { pcdMm: 419.1, numBolts: 20, boltSize: "M48", pipeOdMm: 346.9 },
    5000: null,
    10000: { pcdMm: 673.1, numBolts: 20, boltSize: "M80", pipeOdMm: 346.9 },
    15000: { pcdMm: 771.5, numBolts: 20, boltSize: "M95", pipeOdMm: 346.9 },
    20000: { pcdMm: 1016.0, numBolts: 20, boltSize: "M130", pipeOdMm: 346.9 },
  },
};

export function getFlangeNominalSizes(standard: FlangeStandard): string[] {
  return Object.keys(standard === "ASME" ? ASME_FLANGE_TABLE : API_FLANGE_TABLE);
}

export function getAvailableClassesOrRatings(
  standard: FlangeStandard,
  nominalSize: string
): number[] {
  if (standard === "ASME") {
    const row = ASME_FLANGE_TABLE[nominalSize];
    if (!row) return [];
    return ASME_PRESSURE_CLASSES.filter((c) => row[c] != null);
  }
  const row = API_FLANGE_TABLE[nominalSize];
  if (!row) return [];
  return API_PRESSURE_RATINGS.filter((r) => row[r] != null);
}

export function getFlangeLookupRow(
  standard: FlangeStandard,
  nominalSize: string,
  classOrRating: number
): FlangeLookupRow | null {
  if (standard === "ASME") {
    return ASME_FLANGE_TABLE[nominalSize]?.[classOrRating as PressureClass] ?? null;
  }
  return API_FLANGE_TABLE[nominalSize]?.[classOrRating as ApiPressureRating] ?? null;
}

/** Chord length between adjacent bolts on a bolt circle. */
export function computeBoltToBoltMm(pcdMm: number, numBolts: number): number {
  return 2 * (pcdMm / 2) * Math.sin(Math.PI / numBolts);
}

/** Radial clearance between bolt centre and pipe/bore OD. */
export function computeBoltToPipeMm(pcdMm: number, pipeOdMm: number): number {
  return (pcdMm - pipeOdMm) / 2;
}
