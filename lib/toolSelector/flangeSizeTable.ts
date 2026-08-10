/**
 * ANSI flange bolting data, extracted from Tritorc's
 * "Bolting & Machining Solutions Cata (IND) APAC.pdf", Flange Size table (p.23).
 * Source PDF text is column-mirrored; values here were extracted with pdfplumber
 * and de-mirrored, not hand-typed from the garbled OCR text.
 */

export type PressureClass = 150 | 300 | 600 | 900 | 1500 | 2500;

export interface FlangeRow {
  nominalInches: string;
  nominalMetricMm: number;
  boltDiaInches: string;
  boltDiaMm: number;
  numBolts: number;
}

export const PRESSURE_CLASSES: PressureClass[] = [150, 300, 600, 900, 1500, 2500];

export const FLANGE_SIZE_TABLE: Record<PressureClass, FlangeRow[]> = {
  150: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "3.1/2", nominalMetricMm: 90, boltDiaInches: "5/8", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "5/8", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "3/4", boltDiaMm: 24, numBolts: 8 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 12 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "7/8", boltDiaMm: 27, numBolts: 12 },
    { nominalInches: "14", nominalMetricMm: 350, boltDiaInches: "1", boltDiaMm: 27, numBolts: 12 },
    { nominalInches: "16", nominalMetricMm: 400, boltDiaInches: "1", boltDiaMm: 30, numBolts: 16 },
    { nominalInches: "18", nominalMetricMm: 450, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 16 },
    { nominalInches: "20", nominalMetricMm: 500, boltDiaInches: "1.1/8", boltDiaMm: 33, numBolts: 20 },
    { nominalInches: "24", nominalMetricMm: 600, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 20 },
  ],
  300: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 8 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "3.1/2", nominalMetricMm: 90, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 6 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "3/4", boltDiaMm: 24, numBolts: 12 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "7/8", boltDiaMm: 27, numBolts: 12 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "1", boltDiaMm: 30, numBolts: 16 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 16 },
    { nominalInches: "14", nominalMetricMm: 350, boltDiaInches: "1.1/8", boltDiaMm: 33, numBolts: 20 },
    { nominalInches: "16", nominalMetricMm: 400, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 20 },
    { nominalInches: "18", nominalMetricMm: 450, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 24 },
    { nominalInches: "20", nominalMetricMm: 500, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 24 },
    { nominalInches: "24", nominalMetricMm: 600, boltDiaInches: "1.1/2", boltDiaMm: 42, numBolts: 24 },
  ],
  600: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "1/2", boltDiaMm: 14, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "5/8", boltDiaMm: 16, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "5/8", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 8 },
    { nominalInches: "3.1/2", nominalMetricMm: 90, boltDiaInches: "7/8", boltDiaMm: 22, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "1", boltDiaMm: 27, numBolts: 8 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "1", boltDiaMm: 27, numBolts: 12 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 12 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 16 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 20 },
    { nominalInches: "14", nominalMetricMm: 350, boltDiaInches: "1.3/8", boltDiaMm: 36, numBolts: 20 },
    { nominalInches: "16", nominalMetricMm: 400, boltDiaInches: "1.1/2", boltDiaMm: 39, numBolts: 20 },
    { nominalInches: "18", nominalMetricMm: 450, boltDiaInches: "1.5/8", boltDiaMm: 42, numBolts: 20 },
    { nominalInches: "20", nominalMetricMm: 500, boltDiaInches: "1.5/8", boltDiaMm: 42, numBolts: 24 },
    { nominalInches: "24", nominalMetricMm: 600, boltDiaInches: "1.7/8", boltDiaMm: 48, numBolts: 24 },
  ],
  900: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "1", boltDiaMm: 27, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 8 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "1", boltDiaMm: 27, numBolts: 8 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 8 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 12 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "1.3/8", boltDiaMm: 36, numBolts: 12 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "1.3/8", boltDiaMm: 35, numBolts: 16 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "1.3/8", boltDiaMm: 36, numBolts: 20 },
    { nominalInches: "14", nominalMetricMm: 350, boltDiaInches: "1.1/2", boltDiaMm: 39, numBolts: 20 },
    { nominalInches: "16", nominalMetricMm: 400, boltDiaInches: "1.5/8", boltDiaMm: 42, numBolts: 20 },
    { nominalInches: "18", nominalMetricMm: 450, boltDiaInches: "1.7/8", boltDiaMm: 48, numBolts: 20 },
    { nominalInches: "20", nominalMetricMm: 500, boltDiaInches: "2", boltDiaMm: 52, numBolts: 20 },
    { nominalInches: "24", nominalMetricMm: 600, boltDiaInches: "2.1/2", boltDiaMm: 64, numBolts: 20 },
  ],
  1500: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "1", boltDiaMm: 27, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 8 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "1", boltDiaMm: 27, numBolts: 8 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "1.1/2", boltDiaMm: 39, numBolts: 8 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "1.3/8", boltDiaMm: 36, numBolts: 12 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "1.5/8", boltDiaMm: 42, numBolts: 12 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "1.7/8", boltDiaMm: 48, numBolts: 12 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "2", boltDiaMm: 52, numBolts: 12 },
    { nominalInches: "14", nominalMetricMm: 350, boltDiaInches: "2.1/4", boltDiaMm: 56, numBolts: 16 },
    { nominalInches: "16", nominalMetricMm: 400, boltDiaInches: "2.1/2", boltDiaMm: 54, numBolts: 16 },
    { nominalInches: "18", nominalMetricMm: 450, boltDiaInches: "2.3/4", boltDiaMm: 70, numBolts: 16 },
    { nominalInches: "20", nominalMetricMm: 500, boltDiaInches: "3", boltDiaMm: 76, numBolts: 16 },
    { nominalInches: "24", nominalMetricMm: 600, boltDiaInches: "3.1/2", boltDiaMm: 90, numBolts: 16 },
  ],
  2500: [
    { nominalInches: "1/2", nominalMetricMm: 15, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "3/4", nominalMetricMm: 20, boltDiaInches: "3/4", boltDiaMm: 20, numBolts: 4 },
    { nominalInches: "1", nominalMetricMm: 25, boltDiaInches: "7/8", boltDiaMm: 24, numBolts: 4 },
    { nominalInches: "1.1/4", nominalMetricMm: 32, boltDiaInches: "1", boltDiaMm: 27, numBolts: 4 },
    { nominalInches: "1.1/2", nominalMetricMm: 40, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 4 },
    { nominalInches: "2", nominalMetricMm: 50, boltDiaInches: "1", boltDiaMm: 27, numBolts: 8 },
    { nominalInches: "2.1/2", nominalMetricMm: 65, boltDiaInches: "1.1/8", boltDiaMm: 30, numBolts: 8 },
    { nominalInches: "3", nominalMetricMm: 80, boltDiaInches: "1.1/4", boltDiaMm: 33, numBolts: 8 },
    { nominalInches: "4", nominalMetricMm: 100, boltDiaInches: "1.1/2", boltDiaMm: 39, numBolts: 8 },
    { nominalInches: "5", nominalMetricMm: 125, boltDiaInches: "1.3/4", boltDiaMm: 45, numBolts: 8 },
    { nominalInches: "6", nominalMetricMm: 150, boltDiaInches: "2", boltDiaMm: 52, numBolts: 8 },
    { nominalInches: "8", nominalMetricMm: 200, boltDiaInches: "2", boltDiaMm: 52, numBolts: 12 },
    { nominalInches: "10", nominalMetricMm: 250, boltDiaInches: "2.1/2", boltDiaMm: 64, numBolts: 12 },
    { nominalInches: "12", nominalMetricMm: 300, boltDiaInches: "2.3/4", boltDiaMm: 70, numBolts: 12 },
  ],
};

export function getFlangeRow(pressureClass: PressureClass, nominalInches: string): FlangeRow | undefined {
  return FLANGE_SIZE_TABLE[pressureClass].find((r) => r.nominalInches === nominalInches);
}

export function getAvailableNominalSizes(pressureClass: PressureClass): string[] {
  return FLANGE_SIZE_TABLE[pressureClass].map((r) => r.nominalInches);
}
