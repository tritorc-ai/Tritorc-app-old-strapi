import { FLANGE_SIZE_TABLE, PressureClass } from "./flangeSizeTable";
import {
  getImperialTorqueNm,
  getMetricTorqueNm,
  BoltGrade,
  Lubrication,
} from "./torqueSpecTable";
import { ALL_TORQUE_WRENCH_MODELS, TorqueWrenchModel } from "./productRanges";

export interface TorqueWrenchResult {
  requiredTorqueNm: number;
  boltDiaInches: string;
  numBolts: number;
  matches: TorqueWrenchModel[];
}

/**
 * Pattern B, path 1: derive required torque from a flange spec.
 * ANSI flange studs are ASTM B7/B16 (imperial), so this path doesn't need a
 * bolt-grade input — only lubrication condition, defaulted to lubricated.
 */
export function selectByFlangeSpec(
  nominalInches: string,
  pressureClass: PressureClass,
  lubrication: Lubrication = "lubricated"
): TorqueWrenchResult | null {
  const row = FLANGE_SIZE_TABLE[pressureClass].find((r) => r.nominalInches === nominalInches);
  if (!row) return null;

  const torqueNm = getImperialTorqueNm(row.boltDiaInches, lubrication);
  if (torqueNm == null) return null;

  return {
    requiredTorqueNm: torqueNm,
    boltDiaInches: row.boltDiaInches,
    numBolts: row.numBolts,
    matches: findMatchingModels(torqueNm),
  };
}

/**
 * Pattern B, path 2: user already knows their bolt spec directly.
 */
export function selectByBoltSpec(
  kind: "metric" | "imperial",
  size: string,
  grade: BoltGrade,
  lubrication: Lubrication = "lubricated"
): TorqueWrenchResult | null {
  const torqueNm =
    kind === "metric"
      ? getMetricTorqueNm(size, grade as Exclude<BoltGrade, "B7">, lubrication)
      : getImperialTorqueNm(size, lubrication);
  if (torqueNm == null) return null;

  return {
    requiredTorqueNm: torqueNm,
    boltDiaInches: size,
    numBolts: 0,
    matches: findMatchingModels(torqueNm),
  };
}

function findMatchingModels(torqueNm: number): TorqueWrenchModel[] {
  return ALL_TORQUE_WRENCH_MODELS.filter(
    (m) => torqueNm >= m.minTorqueNm && torqueNm <= m.maxTorqueNm
  ).sort((a, b) => a.maxTorqueNm - b.maxTorqueNm);
}
