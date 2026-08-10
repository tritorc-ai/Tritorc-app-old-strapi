import { BTL_MODELS, BoltTensionerModel } from "./productRanges";

export interface BoltTensionerResult {
  size: string;
  matches: BoltTensionerModel[];
}

/** Pattern A: direct bolt-size lookup, no derivation needed. */
export function selectBoltTensioner(
  kind: "metric" | "imperial",
  size: string
): BoltTensionerResult {
  const matches = BTL_MODELS.filter((m) =>
    kind === "metric" ? m.metricSizes.includes(size) : m.inchSizes.includes(size)
  );
  return { size, matches };
}
