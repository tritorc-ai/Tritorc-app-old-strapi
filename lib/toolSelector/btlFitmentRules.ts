/**
 * Core BTL fitment-check engine — ported from the standalone fitment-check
 * tool's runCheck(), with one deliberate behavioral fix: when an optional
 * input needed for a rule is missing, that rule is marked `evaluated: false`
 * with a human-readable reason, rather than silently dropped from the
 * results (the source tool's actual behavior, which can make a partial
 * check display as "FULL FIT" when 2 of 4 rules never ran).
 */

import { BTL_MODELS, type BtlTensionerModel } from "./btlModelTable";
import { getNutDimension } from "./nutDimensionTable";
import { computeBoltToBoltMm, computeBoltToPipeMm } from "./btlFlangeTable";

export type RuleId = "pipeClearance" | "stackHeight" | "boltCenterClearance" | "toolOdClearance";

export interface BtlFitFacts {
  pcdMm?: number;
  numBolts?: number;
  boltToBoltMm?: number; // derived from pcdMm+numBolts if omitted
  pipeOdMm?: number; // omit -> pipeClearance rule not evaluated
  boltSize?: string;
  studProtrusionMm?: number; // omit/<=0 -> stackHeight rule not evaluated
  clearanceOverStudMm?: number; // omit/<=0 -> assumed open/unobstructed overhead
  nutHeightOverrideMm?: number;
}

export interface RuleCheckResult {
  ruleId: RuleId;
  label: string;
  description: string;
  availableMm: number | null;
  requiredMm: number | null;
  marginMm: number;
  pass: boolean;
  warn: boolean;
  evaluated: boolean;
  assumption?: string;
}

export interface BtlModelCheckResult {
  model: BtlTensionerModel;
  checks: RuleCheckResult[];
  boltSizeCompatible: boolean | "unknown";
  allPass: boolean;
  anyWarn: boolean;
  anyFail: boolean;
}

export interface BtlFitmentResult {
  facts: BtlFitFacts;
  results: BtlModelCheckResult[]; // all 9 models, for the "all models" strip
  recommended: BtlModelCheckResult;
  matches: BtlTensionerModel[]; // [recommended.model, ...other viable models]
  verdict: "full-fit" | "fit-with-caution" | "does-not-fit";
  fullyEvaluated: boolean;
  skippedRules: RuleId[];
}

const RULE2_WORKING_MARGIN_MM = 12.75;
const RULE4_SAFETY_CLEARANCE_MM = 5;
const WARN_BAND_MM: Record<RuleId, number> = {
  pipeClearance: 8,
  stackHeight: 10,
  boltCenterClearance: 5,
  toolOdClearance: 5,
};

function resolveBoltToBoltMm(facts: BtlFitFacts): number | null {
  if (facts.boltToBoltMm != null) return facts.boltToBoltMm;
  if (facts.pcdMm != null && facts.numBolts) return computeBoltToBoltMm(facts.pcdMm, facts.numBolts);
  return null;
}

function resolveBoltToPipeMm(facts: BtlFitFacts): number | null {
  if (facts.pcdMm != null && facts.pipeOdMm != null && facts.pcdMm > facts.pipeOdMm) {
    return computeBoltToPipeMm(facts.pcdMm, facts.pipeOdMm);
  }
  return null;
}

function resolveStudDiameterMm(boltSize?: string): number | null {
  if (!boltSize) return null;
  const n = parseInt(boltSize.replace(/[Mm]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function notEvaluated(ruleId: RuleId, label: string, reason: string): RuleCheckResult {
  return {
    ruleId,
    label,
    description: reason,
    availableMm: null,
    requiredMm: null,
    marginMm: 0,
    pass: false,
    warn: false,
    evaluated: false,
    assumption: reason,
  };
}

export function checkModelAgainstFacts(model: BtlTensionerModel, facts: BtlFitFacts): BtlModelCheckResult {
  const checks: RuleCheckResult[] = [];
  const boltToBoltMm = resolveBoltToBoltMm(facts);
  const boltToPipeMm = resolveBoltToPipeMm(facts);
  const studDiameterMm = resolveStudDiameterMm(facts.boltSize);

  // Rule 1 — bolt-to-pipe clearance vs half the tool OD.
  if (boltToPipeMm != null) {
    const requiredMm = model.bridgeOdMm / 2;
    const marginMm = boltToPipeMm - requiredMm;
    checks.push({
      ruleId: "pipeClearance",
      label: "Bolt-to-pipe clearance vs A/2",
      description: "Distance from bolt centre to pipe OD must exceed half the tool OD.",
      availableMm: boltToPipeMm,
      requiredMm,
      marginMm,
      pass: marginMm >= 0,
      warn: marginMm >= 0 && marginMm < WARN_BAND_MM.pipeClearance,
      evaluated: true,
    });
  } else {
    checks.push(notEvaluated("pipeClearance", "Bolt-to-pipe clearance vs A/2", "Pipe OD not supplied."));
  }

  // Rule 2 — stack height vs bridge height + working margin.
  if (facts.studProtrusionMm != null && facts.studProtrusionMm > 0) {
    const nutHeightMm = facts.nutHeightOverrideMm ?? getNutDimension(facts.boltSize ?? "")?.heightMm ?? null;
    if (nutHeightMm == null) {
      checks.push(
        notEvaluated("stackHeight", "Stack height vs D + 12.75 mm", "Nut height unknown for this bolt size.")
      );
    } else if (facts.clearanceOverStudMm != null && facts.clearanceOverStudMm > 0) {
      const availableMm = nutHeightMm + facts.studProtrusionMm + facts.clearanceOverStudMm;
      const requiredMm = model.bridgeHeightMm + RULE2_WORKING_MARGIN_MM;
      const marginMm = availableMm - requiredMm;
      checks.push({
        ruleId: "stackHeight",
        label: "Stack height vs D + 12.75 mm",
        description:
          "Nut height + stud protrusion + clearance over stud must exceed bridge height D plus a 12.75 mm working margin.",
        availableMm,
        requiredMm,
        marginMm,
        pass: marginMm >= 0,
        warn: marginMm >= 0 && marginMm < WARN_BAND_MM.stackHeight,
        evaluated: true,
      });
    } else {
      checks.push({
        ruleId: "stackHeight",
        label: "Stack height vs D + 12.75 mm",
        description: "No clearance-over-stud entered.",
        availableMm: null,
        requiredMm: model.bridgeHeightMm + RULE2_WORKING_MARGIN_MM,
        marginMm: 9999,
        pass: true,
        warn: false,
        evaluated: true,
        assumption: "Assumed open, unobstructed overhead — no clearance-over-stud entered.",
      });
    }
  } else {
    checks.push(notEvaluated("stackHeight", "Stack height vs D + 12.75 mm", "Stud protrusion not supplied."));
  }

  // Rule 3 — bolt centre-to-centre spacing vs tool inner bore.
  if (boltToBoltMm != null) {
    const requiredMm = model.innerBoreMm;
    const marginMm = boltToBoltMm - requiredMm;
    checks.push({
      ruleId: "boltCenterClearance",
      label: "Bolt C-to-C >= inner bore (B)",
      description: "Centre-to-centre distance between adjacent bolts must be at least the tool inner bore.",
      availableMm: boltToBoltMm,
      requiredMm,
      marginMm,
      pass: marginMm >= 0,
      warn: marginMm >= 0 && marginMm < WARN_BAND_MM.boltCenterClearance,
      evaluated: true,
    });
  } else {
    checks.push(
      notEvaluated("boltCenterClearance", "Bolt C-to-C >= inner bore (B)", "PCD and bolt count not supplied.")
    );
  }

  // Rule 4 — tool OD fits between adjacent bolts without collision.
  if (boltToBoltMm != null && studDiameterMm != null) {
    const availableMm = boltToBoltMm * 2 - studDiameterMm - RULE4_SAFETY_CLEARANCE_MM;
    const requiredMm = model.bridgeOdMm;
    const marginMm = availableMm - requiredMm;
    checks.push({
      ruleId: "toolOdClearance",
      label: "Tool OD (A) fits between adjacent bolts",
      description: "Max allowable tool OD = (C-to-C x 2) - stud diameter - 5 mm safety clearance.",
      availableMm,
      requiredMm,
      marginMm,
      pass: marginMm >= 0,
      warn: marginMm >= 0 && marginMm < WARN_BAND_MM.toolOdClearance,
      evaluated: true,
    });
  } else {
    checks.push(
      notEvaluated(
        "toolOdClearance",
        "Tool OD (A) fits between adjacent bolts",
        "Bolt C-to-C and/or a standard metric bolt size are required for this check."
      )
    );
  }

  const boltSizeCompatible: boolean | "unknown" =
    facts.boltSize == null ? "unknown" : model.boltSizes.includes(facts.boltSize);

  const evaluated = checks.filter((c) => c.evaluated);
  return {
    model,
    checks,
    boltSizeCompatible,
    allPass: evaluated.every((c) => c.pass) && boltSizeCompatible !== false,
    anyWarn: evaluated.some((c) => c.warn),
    anyFail: evaluated.some((c) => !c.pass) || boltSizeCompatible === false,
  };
}

/** Smallest bolt-compatible model that passes all applicable rules; falls
 * back to the smallest bolt-compatible model, then the smallest model of
 * all — relies on BTL_MODELS being ordered smallest -> largest. */
export function pickRecommendedModel(results: BtlModelCheckResult[]): BtlModelCheckResult {
  const boltCompatible = results.filter((r) => r.boltSizeCompatible !== false);
  const passing = boltCompatible.filter((r) => r.allPass);
  return passing[0] ?? boltCompatible[0] ?? results[0];
}

export function evaluateBtlFit(facts: BtlFitFacts): BtlFitmentResult {
  const results = BTL_MODELS.map((model) => checkModelAgainstFacts(model, facts));
  const recommended = pickRecommendedModel(results);
  const skippedRules = recommended.checks.filter((c) => !c.evaluated).map((c) => c.ruleId);
  const alternates = results.filter(
    (r) => r !== recommended && r.boltSizeCompatible !== false && !r.anyFail
  );

  return {
    facts,
    results,
    recommended,
    matches: [recommended.model, ...alternates.map((r) => r.model)],
    verdict: !recommended.allPass ? "does-not-fit" : recommended.anyWarn ? "fit-with-caution" : "full-fit",
    fullyEvaluated: skippedRules.length === 0,
    skippedRules,
  };
}
