/**
 * Bolt torque specification data, extracted from Tritorc's
 * "Bolting & Machining Solutions Cata (IND) APAC.pdf", Torque Specifications
 * table (p.24). Values pulled with pdfplumber directly (not OCR text), so
 * unlike the flange table this one didn't need de-mirroring.
 *
 * mu=0.10 = lubricated bolts, mu=0.15 = semi-lubricated, mu=0.2 = dry.
 * We default to lubricated (mu=0.10) as the common-case assumption.
 */

export type BoltGrade = "8.8" | "10.9" | "12.9" | "B7";
export type Lubrication = "lubricated" | "semi-lubricated" | "dry";

interface MetricTorqueRow {
  size: string; // e.g. "M16"
  grade88: [number, number, number]; // [lubricated, semi, dry] Nm
  grade109: [number, number, number] | null;
  grade129: [number, number, number] | null;
}

// Metric bolts, Grades 8.8 / 10.9 / 12.9
export const METRIC_TORQUE_TABLE: MetricTorqueRow[] = [
  { size: "M16", grade88: [121, 165, 208], grade109: [171, 232, 292], grade129: [205, 278, 351] },
  { size: "M18", grade88: [165, 224, 283], grade109: [233, 316, 399], grade129: [279, 379, 478] },
  { size: "M20", grade88: [237, 322, 406], grade109: [333, 452, 571], grade129: [400, 543, 685] },
  { size: "M22", grade88: [327, 443, 560], grade109: [459, 623, 787], grade129: [551, 748, 945] },
  { size: "M24", grade88: [409, 556, 702], grade109: [576, 781, 987], grade129: [691, 938, 1184] },
  { size: "M27", grade88: [608, 828, 1043], grade109: [855, 1161, 1467], grade129: [1027, 1393, 1760] },
  { size: "M30", grade88: [820, 1113, 1406], grade109: [1154, 1566, 1978], grade129: [1384, 1879, 2373] },
  { size: "M33", grade88: [1128, 1531, 1933], grade109: [1586, 2152, 2719], grade129: [1903, 2583, 3263] },
  { size: "M36", grade88: [1442, 1957, 2472], grade109: [2028, 2752, 3476], grade129: [2433, 3302, 4171] },
  { size: "M39", grade88: [1881, 2553, 3225], grade109: [2646, 3590, 4535], grade129: [3175, 4308, 5442] },
  { size: "M42", grade88: [2317, 3145, 2973], grade109: [3259, 4423, 5587], grade129: [3911, 5307, 6704] },
  { size: "M45", grade88: [2912, 3952, 4992], grade109: [4095, 5558, 7021], grade129: [4914, 6670, 8425] },
  { size: "M48", grade88: [3490, 4737, 5984], grade109: [4909, 6662, 8415], grade129: [5890, 7994, 10097] },
  { size: "M52", grade88: [4545, 6169, 7792], grade109: [6392, 8675, 10958], grade129: [7670, 10410, 13149] },
  { size: "M56", grade88: [5642, 7658, 9673], grade109: [7935, 10768, 13602], grade129: [9522, 12922, 16323] },
  { size: "M60", grade88: [7076, 9603, 12130], grade109: [9951, 13504, 17058], grade129: [11941, 16205, 20470] },
  { size: "M64", grade88: [8535, 11583, 14631], grade109: [12002, 16289, 20575], grade129: [14403, 19547, 24690] },
  { size: "M68", grade88: [10405, 14121, 17838], grade109: [14632, 19858, 25084], grade129: [17559, 23830, 30101] },
  { size: "M72", grade88: [12530, 17005, 21480], grade109: [17620, 23913, 30206], grade129: null },
  { size: "M76", grade88: [14926, 20265, 25857], grade109: [20989, 28485, 35981], grade129: null },
  { size: "M80", grade88: [17608, 23811, 30185], grade109: null, grade129: null },
  { size: "M85", grade88: [21390, 29029, 36669], grade109: null, grade129: null },
  { size: "M90", grade88: [25676, 34847, 44017], grade109: null, grade129: null },
  { size: "M95", grade88: [30500, 41393, 52286], grade109: null, grade129: null },
  { size: "M100", grade88: [35893, 48712, 61531], grade109: null, grade129: null },
  { size: "M105", grade88: [41886, 56846, 71805], grade109: null, grade129: null },
  { size: "M110", grade88: [48511, 65837, 83162], grade109: null, grade129: null },
];

// Imperial bolts, Grade B7/B16 (ASTM), keyed by bolt diameter (inches, as it
// appears in the flange table's boltDiaInches column)
export const IMPERIAL_TORQUE_TABLE: { size: string; torque: [number, number, number] }[] = [
  { size: "5/8", torque: [126, 171, 215] },
  { size: "3/4", torque: [226, 306, 387] },
  { size: "7/8", torque: [366, 496, 627] },
  { size: "1", torque: [549, 745, 941] },
  { size: "1.1/8", torque: [816, 1107, 1398] },
  { size: "1.1/4", torque: [1157, 1570, 1983] },
  { size: "1.3/8", torque: [1582, 2147, 2712] },
  { size: "1.1/2", torque: [2100, 2850, 3600] },
  { size: "1.5/8", torque: [2720, 3692, 4663] },
  { size: "1.3/4", torque: [3452, 4685, 5917] },
  { size: "1.7/8", torque: [4304, 5841, 7378] },
  { size: "2", torque: [5285, 7173, 9060] },
  { size: "2.1/4", torque: [7674, 10414, 13155] },
  { size: "2.1/2", torque: [10691, 14509, 18327] },
  { size: "2.3/4", torque: [13038, 17694, 22350] },
  { size: "3", torque: [17104, 23213, 29321] },
  { size: "3.1/4", torque: [21938, 29774, 37609] },
  { size: "3.1/2", torque: [27607, 37467, 47326] },
  { size: "3.3/4", torque: [34176, 46382, 58588] },
  { size: "4", torque: [41712, 56610, 71507] },
];

export const ALL_IMPERIAL_BOLT_SIZES: string[] = IMPERIAL_TORQUE_TABLE.map((r) => r.size);

const LUBE_INDEX: Record<Lubrication, 0 | 1 | 2> = {
  lubricated: 0,
  "semi-lubricated": 1,
  dry: 2,
};

/** Look up required torque (Nm) for a metric bolt size/grade/lubrication. */
export function getMetricTorqueNm(
  size: string,
  grade: Exclude<BoltGrade, "B7">,
  lube: Lubrication
): number | null {
  const row = METRIC_TORQUE_TABLE.find((r) => r.size === size);
  if (!row) return null;
  const key = grade === "8.8" ? "grade88" : grade === "10.9" ? "grade109" : "grade129";
  const values = row[key];
  if (!values) return null;
  return values[LUBE_INDEX[lube]];
}

/** Look up required torque (Nm) for an imperial (B7/B16) bolt diameter. */
export function getImperialTorqueNm(sizeInches: string, lube: Lubrication): number | null {
  const row = IMPERIAL_TORQUE_TABLE.find((r) => r.size === sizeInches);
  if (!row) return null;
  return row.torque[LUBE_INDEX[lube]];
}

/**
 * Rough metric->inch bolt diameter mapping so the flange table's mm bolt
 * diameter can find a matching row here even when the flange table's own
 * "boltDiaInches" string doesn't exactly match this table's imperial rows.
 * Falls back to nearest-size match.
 */
export function nearestImperialSize(mm: number): string {
  const mmToSize: [number, string][] = [
    [16, "5/8"], [20, "3/4"], [22, "7/8"], [24, "7/8"], [27, "1"],
    [30, "1.1/8"], [33, "1.1/4"], [36, "1.3/8"], [39, "1.1/2"], [42, "1.5/8"],
    [45, "1.3/4"], [48, "1.7/8"], [52, "2"], [56, "2.1/4"], [64, "2.1/2"],
    [70, "2.3/4"], [76, "3"], [85, "3.1/4"], [90, "3.1/2"],
  ];
  let closest = mmToSize[0];
  let bestDiff = Math.abs(mm - closest[0]);
  for (const entry of mmToSize) {
    const diff = Math.abs(mm - entry[0]);
    if (diff < bestDiff) {
      closest = entry;
      bestDiff = diff;
    }
  }
  return closest[1];
}
