"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Wand2 } from "lucide-react";
import { Header, Select, SegmentedToggle, StepProgress } from "@/components/app/ToolSelectorFlow";
import { NumberField, VerdictHero, RuleRow, ModelFilmstrip, getBtlProductHref } from "./BtlShared";
import type { QuickMatchSeed } from "./BtlQuickMatchFlow";
import { ALL_BTL_BOLT_SIZES } from "@/lib/toolSelector/btlModelTable";
import {
  getFlangeNominalSizes,
  getAvailableClassesOrRatings,
  getFlangeLookupRow,
  computeBoltToBoltMm,
  type FlangeStandard,
} from "@/lib/toolSelector/btlFlangeTable";
import { getNutDimension } from "@/lib/toolSelector/nutDimensionTable";
import { fullFitmentCheck, getBtlBoltTorqueInfo } from "@/lib/toolSelector/selectBtlTensioner";
import type { BtlFitmentResult } from "@/lib/toolSelector/btlFitmentRules";
import type { BoltGrade, Lubrication } from "@/lib/toolSelector/torqueSpecTable";

type FlangeSource = "standard" | "custom";
type Step = 1 | 2 | 3;

const STEP_LABELS = ["Flange", "Bolt & Stud", "Grade"];

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-black/6 bg-white px-3 py-2.5 last:border-b-0">
      <div className="text-[13px] text-brand-text-secondary">{label}</div>
      <div className="text-[13px] font-semibold text-brand-red">{value}</div>
    </div>
  );
}

export function BtlFullFitmentFlow({ seed, onBack }: { seed?: QuickMatchSeed; onBack: () => void }) {
  const [step, setStep] = useState<Step>(1);

  const [flangeSource, setFlangeSource] = useState<FlangeSource>("standard");
  const [standard, setStandard] = useState<FlangeStandard>(seed?.flange?.standard ?? "ASME");
  const nominalOptions = useMemo(() => getFlangeNominalSizes(standard), [standard]);
  const [nominalSize, setNominalSize] = useState(seed?.flange?.nominalSize ?? nominalOptions[3] ?? nominalOptions[0]);
  const classOptions = useMemo(
    () => getAvailableClassesOrRatings(standard, nominalSize),
    [standard, nominalSize]
  );
  const [classOrRating, setClassOrRating] = useState(
    seed?.flange?.classOrRating ?? classOptions[1] ?? classOptions[0]
  );

  const [customPcd, setCustomPcd] = useState("");
  const [customNumBolts, setCustomNumBolts] = useState("");
  const [customPipeOd, setCustomPipeOd] = useState("");

  const standardRow = useMemo(
    () => (flangeSource === "standard" ? getFlangeLookupRow(standard, nominalSize, classOrRating) : null),
    [flangeSource, standard, nominalSize, classOrRating]
  );

  // A standard flange's own bolt size is authoritative for step 2/the
  // engine — boltSizeOverride only kicks in once the user explicitly picks
  // a different size on the current flange, and is cleared whenever the
  // flange selection itself changes (see the flange onChange handlers
  // below), so the step-1 summary card and step 2 never disagree.
  const [boltSizeOverride, setBoltSizeOverride] = useState<string | null>(null);
  const boltSize = boltSizeOverride ?? standardRow?.boltSize ?? seed?.boltSize ?? ALL_BTL_BOLT_SIZES[0];
  const [studProtrusion, setStudProtrusion] = useState("");
  const [clearanceOverStud, setClearanceOverStud] = useState("");

  const [grade, setGrade] = useState<BoltGrade>("8.8");
  const [lubrication, setLubrication] = useState<Lubrication>("lubricated");

  const [result, setResult] = useState<BtlFitmentResult | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const nutDim = getNutDimension(boltSize);
  const torqueInfo = getBtlBoltTorqueInfo(boltSize, grade, lubrication);

  function editStep(target: Step) {
    setResult(null);
    setStep(target);
  }

  function handleSubmit() {
    const r = fullFitmentCheck({
      flange:
        flangeSource === "standard"
          ? { source: "standard", standard, nominalSize, classOrRating }
          : {
              source: "custom",
              pcdMm: Number(customPcd) || 0,
              numBolts: Number(customNumBolts) || 0,
              pipeOdMm: customPipeOd ? Number(customPipeOd) : undefined,
            },
      boltSize,
      studProtrusionMm: studProtrusion ? Number(studProtrusion) : undefined,
      clearanceOverStudMm: clearanceOverStud ? Number(clearanceOverStud) : undefined,
    });
    if (r) {
      setResult(r);
      setSelectedModel(r.recommended.model.model);
    }
  }

  if (result) {
    const shown = result.results.find((r) => r.model.model === selectedModel) ?? result.recommended;
    return (
      <div>
        <Header title="Full Fitment Check" onBack={() => setResult(null)} />
        <div className="flex flex-col gap-4 px-5 pb-7 pt-4">
          <VerdictHero result={result} />

          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-text-tertiary">
              All BTL Models
            </div>
            <ModelFilmstrip
              result={result}
              selectedModel={shown.model.model}
              onSelect={setSelectedModel}
            />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-text-tertiary">
              Clearance Checks — {shown.model.model}
            </div>
            <div className="flex flex-col gap-2">
              {shown.checks.map((c) => (
                <RuleRow
                  key={c.ruleId}
                  rule={c}
                  onJumpToField={
                    c.ruleId === "stackHeight"
                      ? () => editStep(2)
                      : c.ruleId === "pipeClearance" || c.ruleId === "boltCenterClearance"
                        ? () => editStep(1)
                        : undefined
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-text-tertiary">
              Full Specification — {shown.model.model}
            </div>
            <div className="flex flex-col overflow-hidden rounded-lg border border-black/6">
              <SpecRow label="Cylinder Force" value={`${shown.model.cylinderForceKn.toLocaleString()} kN`} />
              <SpecRow label="Hydraulic Area" value={`${shown.model.hydraulicAreaCm2} cm²`} />
              <SpecRow label="Bridge OD (A)" value={`${shown.model.bridgeOdMm} mm`} />
              <SpecRow label="Inner Bore (B)" value={`${shown.model.innerBoreMm} mm`} />
              <SpecRow label="Overall Height (C)" value={`${shown.model.overallHeightMm} mm`} />
              <SpecRow label="Bridge Height (D)" value={`${shown.model.bridgeHeightMm} mm`} />
              <SpecRow label="Weight" value={`${shown.model.weightKg} kg`} />
              <SpecRow label="Bolt Range" value={shown.model.boltRangeLabel} />
            </div>
          </div>

          <div className="flex gap-2.5">
            <Link
              href={getBtlProductHref(shown.model.model)}
              className="flex-1 rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-2.75 text-center text-[13px] font-semibold text-white"
            >
              View Product
            </Link>
            <a
              href="#"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/10 py-2.75 text-[13px] font-semibold text-brand-dark"
            >
              <Download size={14} /> Spec Sheet
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Full Fitment Check"
        onBack={() => (step === 1 ? onBack() : setStep((step - 1) as Step))}
      />
      <StepProgress current={step} total={3} label={STEP_LABELS[step - 1]} />

      <div className="px-5 pb-7 pt-5">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="mb-1.5 text-[13px] font-semibold text-brand-dark">Flange Definition</div>
            <SegmentedToggle
              value={flangeSource}
              onChange={setFlangeSource}
              options={[
                { value: "standard", label: "Standard Flange" },
                { value: "custom", label: "Custom / Non-Standard" },
              ]}
            />

            {flangeSource === "standard" ? (
              <>
                <SegmentedToggle
                  value={standard}
                  onChange={(v) => {
                    setStandard(v);
                    setBoltSizeOverride(null);
                    const opts = getFlangeNominalSizes(v);
                    if (!opts.includes(nominalSize)) setNominalSize(opts[0]);
                  }}
                  options={[
                    { value: "ASME", label: "ASME B16.5" },
                    { value: "API", label: "API 6A" },
                  ]}
                />
                <Select
                  label="Flange Nominal Size"
                  value={nominalSize}
                  onChange={(v) => {
                    setNominalSize(v);
                    setBoltSizeOverride(null);
                    const opts = getAvailableClassesOrRatings(standard, v);
                    if (!opts.includes(classOrRating)) setClassOrRating(opts[0]);
                  }}
                  options={nominalOptions}
                />
                <Select
                  label={standard === "ASME" ? "Pressure Class" : "Pressure Rating"}
                  value={String(classOrRating)}
                  onChange={(v) => {
                    setClassOrRating(Number(v));
                    setBoltSizeOverride(null);
                  }}
                  options={classOptions.map((c) => String(c))}
                />

                {standardRow && (
                  <div className="rounded-lg border border-black/6 bg-brand-surface px-3.5 py-3">
                    <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wide text-brand-text-tertiary">
                      <Wand2 size={12} className="text-brand-red" /> Auto-filled from standard
                    </div>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div>
                        <div className="text-[10.5px] font-mono uppercase text-brand-text-tertiary">PCD</div>
                        <div className="text-[13px] font-semibold text-brand-dark">{standardRow.pcdMm} mm</div>
                      </div>
                      <div>
                        <div className="text-[10.5px] font-mono uppercase text-brand-text-tertiary">
                          Bolt Count
                        </div>
                        <div className="text-[13px] font-semibold text-brand-dark">{standardRow.numBolts}</div>
                      </div>
                      <div>
                        <div className="text-[10.5px] font-mono uppercase text-brand-text-tertiary">
                          Bolt Spacing
                        </div>
                        <div className="text-[13px] font-semibold text-brand-dark">
                          {computeBoltToBoltMm(standardRow.pcdMm, standardRow.numBolts).toFixed(1)} mm
                        </div>
                      </div>
                      <div>
                        <div className="text-[10.5px] font-mono uppercase text-brand-text-tertiary">
                          Bolt Size
                        </div>
                        <div className="text-[13px] font-semibold text-brand-dark">{standardRow.boltSize}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <NumberField label="Pitch Circle Diameter" value={customPcd} onChange={setCustomPcd} unit="mm" />
                <NumberField label="Number of Bolts" value={customNumBolts} onChange={setCustomNumBolts} />
                <NumberField
                  label="Pipe / Bore OD"
                  value={customPipeOd}
                  onChange={setCustomPipeOd}
                  unit="mm"
                  optional
                  hint="Leave blank to skip the bolt-to-pipe clearance check."
                />
              </>
            )}

            <button
              onClick={() => setStep(2)}
              className="mt-2 w-full rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-3.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,49,47,.4)]"
            >
              Next: Bolt & Stud →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="mb-1.5 text-[13px] font-semibold text-brand-dark">Bolt & Stud Details</div>
            <Select
              label="Bolt / Stud Size"
              value={boltSize}
              onChange={setBoltSizeOverride}
              options={ALL_BTL_BOLT_SIZES}
            />
            {nutDim && (
              <div className="flex items-center gap-1.5 text-[11px] text-brand-text-tertiary">
                <Wand2 size={12} className="text-brand-red" /> Nut AF {nutDim.afMm} mm · Height {nutDim.heightMm} mm
                (auto-filled, editable below if different)
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label="Stud Protrusion"
                value={studProtrusion}
                onChange={setStudProtrusion}
                unit="mm"
                optional
                hint="Above the nut face."
              />
              <NumberField
                label="Clearance Over Stud"
                value={clearanceOverStud}
                onChange={setClearanceOverStud}
                unit="mm"
                optional
                hint="Blank = open/unobstructed."
              />
            </div>
            <button
              onClick={() => setStep(3)}
              className="mt-2 w-full rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-3.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,49,47,.4)]"
            >
              Next: Grade & Lubrication →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="mb-1.5 text-[13px] font-semibold text-brand-dark">Bolt Grade & Lubrication</div>
            <Select
              label="Bolt Grade"
              value={grade}
              onChange={(v) => setGrade(v as BoltGrade)}
              options={["8.8", "10.9", "12.9", "B7"]}
            />
            <SegmentedToggle
              value={lubrication}
              onChange={setLubrication}
              options={[
                { value: "dry", label: "Dry" },
                { value: "semi-lubricated", label: "Semi" },
                { value: "lubricated", label: "Lubricated" },
              ]}
            />
            <div className="rounded-lg border border-black/6 bg-brand-surface px-3.5 py-3">
              <div className="text-[10.5px] font-mono font-bold uppercase tracking-wide text-brand-text-tertiary">
                Torque Spec (from Tritorc catalogue)
              </div>
              <div className="mt-1 text-[13px] font-semibold text-brand-dark">
                {torqueInfo ? `${torqueInfo.torqueNm.toLocaleString()} Nm` : "Not tabulated for this combination"}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-2 w-full rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-3.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,49,47,.4)]"
            >
              Run Fitment Check →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
