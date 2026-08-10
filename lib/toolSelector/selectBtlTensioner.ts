/**
 * Public entry points for the BTL bolt tensioner selector. Both Quick Match
 * and the Full Fitment Check funnel through the same evaluateBtlFit() engine
 * (see btlFitmentRules.ts) — they differ only in how many real-world facts
 * they manage to supply before calling it.
 */

import { evaluateBtlFit, type BtlFitmentResult } from "./btlFitmentRules";
import {
  getFlangeLookupRow,
  type FlangeStandard,
} from "./btlFlangeTable";
import { getMetricTorqueNm, getImperialTorqueNm, nearestImperialSize, type BoltGrade, type Lubrication } from "./torqueSpecTable";

/** Bolt size only — no geometry, so all 4 clearance rules are "not
 * evaluated." Intentionally the easy default: the source tool itself has no
 * bolt-size-only mode (it hard-requires PCD + bolt count). */
export function quickMatchByBoltSize(boltSize: string): BtlFitmentResult {
  return evaluateBtlFit({ boltSize });
}

/** Flange standard + nominal size + class/rating — 3 inputs. Pipe OD is
 * auto-filled from the catalogue row, so pipeClearance/boltCenterClearance/
 * toolOdClearance all actually run; only stackHeight (needs stud
 * protrusion) is skipped. Returns null if the combination has no catalogue
 * rating. */
export function quickMatchByFlangeSpec(
  standard: FlangeStandard,
  nominalSize: string,
  classOrRating: number
): BtlFitmentResult | null {
  const row = getFlangeLookupRow(standard, nominalSize, classOrRating);
  if (!row) return null;
  return evaluateBtlFit({
    pcdMm: row.pcdMm,
    numBolts: row.numBolts,
    boltSize: row.boltSize,
    pipeOdMm: row.pipeOdMm,
  });
}

export type FullCheckFlangeInput =
  | { source: "standard"; standard: FlangeStandard; nominalSize: string; classOrRating: number; pipeOdOverrideMm?: number }
  | { source: "custom"; pcdMm: number; numBolts: number; pipeOdMm?: number };

export interface FullCheckInput {
  flange: FullCheckFlangeInput;
  boltSize: string;
  studProtrusionMm?: number;
  clearanceOverStudMm?: number;
  nutHeightOverrideMm?: number;
}

/** Full input set — all 4 clearance rules run (subject to which optional
 * fields were actually supplied). Returns null if a standard flange lookup
 * has no catalogue rating for the given size/class. */
export function fullFitmentCheck(input: FullCheckInput): BtlFitmentResult | null {
  let pcdMm: number;
  let numBolts: number;
  let pipeOdMm: number | undefined;

  if (input.flange.source === "standard") {
    const row = getFlangeLookupRow(input.flange.standard, input.flange.nominalSize, input.flange.classOrRating);
    if (!row) return null;
    pcdMm = row.pcdMm;
    numBolts = row.numBolts;
    pipeOdMm = input.flange.pipeOdOverrideMm ?? row.pipeOdMm;
  } else {
    pcdMm = input.flange.pcdMm;
    numBolts = input.flange.numBolts;
    pipeOdMm = input.flange.pipeOdMm;
  }

  return evaluateBtlFit({
    pcdMm,
    numBolts,
    pipeOdMm,
    boltSize: input.boltSize,
    studProtrusionMm: input.studProtrusionMm,
    clearanceOverStudMm: input.clearanceOverStudMm,
    nutHeightOverrideMm: input.nutHeightOverrideMm,
  });
}

/** Informational only — reuses the existing torque table (same catalogue
 * source as the standalone tool's TORQUE_DB). Never feeds the 4 clearance
 * rules, purely a live readout for the Grade & Lubrication step. */
export function getBtlBoltTorqueInfo(
  boltSize: string,
  grade: BoltGrade,
  lubrication: Lubrication
): { torqueNm: number } | null {
  if (grade === "B7") {
    const mm = parseInt(boltSize.replace(/[Mm]/g, ""), 10);
    if (!Number.isFinite(mm)) return null;
    const torqueNm = getImperialTorqueNm(nearestImperialSize(mm), lubrication);
    return torqueNm != null ? { torqueNm } : null;
  }
  const torqueNm = getMetricTorqueNm(boltSize, grade, lubrication);
  return torqueNm != null ? { torqueNm } : null;
}
