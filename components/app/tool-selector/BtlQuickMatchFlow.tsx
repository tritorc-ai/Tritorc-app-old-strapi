"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Sparkles } from "lucide-react";
import { Header, Select, SegmentedToggle } from "@/components/app/ToolSelectorFlow";
import { BoltRangeRibbon, getBtlProductHref } from "./BtlShared";
import { ALL_BTL_BOLT_SIZES } from "@/lib/toolSelector/btlModelTable";
import {
  getFlangeNominalSizes,
  getAvailableClassesOrRatings,
  type FlangeStandard,
} from "@/lib/toolSelector/btlFlangeTable";
import { quickMatchByBoltSize, quickMatchByFlangeSpec } from "@/lib/toolSelector/selectBtlTensioner";
import type { BtlFitmentResult } from "@/lib/toolSelector/btlFitmentRules";

export interface QuickMatchSeed {
  boltSize?: string;
  flange?: { standard: FlangeStandard; nominalSize: string; classOrRating: number };
}

type Mode = "bolt" | "flange";

function QuickMatchResultCard({
  result,
  boltSize,
  onUpgrade,
}: {
  result: BtlFitmentResult;
  boltSize?: string;
  onUpgrade: () => void;
}) {
  const model = result.recommended.model;
  return (
    <div className="px-5 pb-7">
      <div className="rounded-xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,.03),0_12px_26px_rgba(0,0,0,.1)]">
        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-red">
          Recommended
        </div>
        <div className="mt-1 text-2xl font-extrabold text-brand-dark">{model.model}</div>
        <div className="mt-1 text-[13px] text-brand-text-secondary">
          Cylinder Force: {model.cylinderForceKn.toLocaleString()} kN
        </div>
        <BoltRangeRibbon boltSizes={model.boltSizes} selected={boltSize} />
        <div className="mt-4 flex gap-2.5">
          <Link
            href={getBtlProductHref(model.model)}
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

      <button
        onClick={onUpgrade}
        className="mt-4 flex w-full items-center gap-3 rounded-lg border border-dashed border-brand-red/40 bg-brand-red/5 px-4 py-3.5 text-left"
      >
        <Sparkles size={18} className="shrink-0 text-brand-red" />
        <div>
          <div className="text-[12.5px] font-semibold text-brand-dark">
            Want exact clearance numbers for your flange?
          </div>
          <div className="text-[11.5px] text-brand-text-secondary">Run the Full Fitment Check →</div>
        </div>
      </button>
    </div>
  );
}

export function BtlQuickMatchFlow({
  onBack,
  onUpgrade,
}: {
  onBack: () => void;
  onUpgrade: (seed: QuickMatchSeed) => void;
}) {
  const [mode, setMode] = useState<Mode>("bolt");
  const [boltSize, setBoltSize] = useState(ALL_BTL_BOLT_SIZES[0]);

  const [standard, setStandard] = useState<FlangeStandard>("ASME");
  const nominalOptions = useMemo(() => getFlangeNominalSizes(standard), [standard]);
  const [nominalSize, setNominalSize] = useState(nominalOptions[3] ?? nominalOptions[0]);
  const classOptions = useMemo(
    () => getAvailableClassesOrRatings(standard, nominalSize),
    [standard, nominalSize]
  );
  const [classOrRating, setClassOrRating] = useState(classOptions[1] ?? classOptions[0]);

  const [result, setResult] = useState<BtlFitmentResult | null | undefined>(undefined);

  function handleSubmit() {
    const r =
      mode === "bolt"
        ? quickMatchByBoltSize(boltSize)
        : quickMatchByFlangeSpec(standard, nominalSize, classOrRating);
    setResult(r);
  }

  if (result) {
    return (
      <div>
        <Header title="Find My Tool" onBack={() => setResult(undefined)} />
        <QuickMatchResultCard
          result={result}
          boltSize={mode === "bolt" ? boltSize : result.facts.boltSize}
          onUpgrade={() =>
            onUpgrade(
              mode === "bolt" ? { boltSize } : { flange: { standard, nominalSize, classOrRating } }
            )
          }
        />
      </div>
    );
  }

  return (
    <div>
      <Header title="Find My Tool" onBack={onBack} />
      <div className="px-5 pb-7 pt-6">
        <div className="mb-1.5 text-[13px] font-semibold text-brand-dark">How do you want to search?</div>
        <div className="mb-5">
          <SegmentedToggle
            value={mode}
            onChange={setMode}
            options={[
              { value: "bolt", label: "By Bolt Size" },
              { value: "flange", label: "By Flange Spec" },
            ]}
          />
        </div>

        {mode === "bolt" ? (
          <Select label="Bolt / Stud Size" value={boltSize} onChange={setBoltSize} options={ALL_BTL_BOLT_SIZES} />
        ) : (
          <div className="flex flex-col gap-4">
            <SegmentedToggle
              value={standard}
              onChange={(v) => {
                setStandard(v);
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
                const opts = getAvailableClassesOrRatings(standard, v);
                if (!opts.includes(classOrRating)) setClassOrRating(opts[0]);
              }}
              options={nominalOptions}
            />
            <Select
              label={standard === "ASME" ? "Pressure Class" : "Pressure Rating"}
              value={String(classOrRating)}
              onChange={(v) => setClassOrRating(Number(v))}
              options={classOptions.map((c) => String(c))}
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright py-3.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,49,47,.4)]"
        >
          Find My Tool →
        </button>
      </div>
    </div>
  );
}
