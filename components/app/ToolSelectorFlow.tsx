"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PRESSURE_CLASSES,
  getAvailableNominalSizes,
  type PressureClass,
} from "@/lib/toolSelector/flangeSizeTable";
import { METRIC_TORQUE_TABLE, ALL_IMPERIAL_BOLT_SIZES } from "@/lib/toolSelector/torqueSpecTable";
import {
  selectByFlangeSpec,
  selectByBoltSpec,
  type TorqueWrenchResult,
} from "@/lib/toolSelector/selectTorqueWrench";
import { BtlQuickMatchFlow, type QuickMatchSeed } from "@/components/app/tool-selector/BtlQuickMatchFlow";
import { BtlFullFitmentFlow } from "@/components/app/tool-selector/BtlFullFitmentFlow";

type Category = "picker" | "torque" | "tensioner";
type TorqueMode = "flange" | "bolt-size";

export function StepBar({ step }: { step: 1 | 2 }) {
  return (
    <div className="mt-3.5 flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-brand-red text-[11px] font-bold text-white">
          1
        </div>
        <div className="text-[11px] font-semibold text-brand-dark">Configure</div>
      </div>
      <div className="h-0.5 flex-1 bg-black/10" />
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "flex h-5.5 w-5.5 items-center justify-center rounded-full text-[11px] font-bold",
            step === 2 ? "bg-brand-red text-white" : "border-2 border-black/15 text-neutral-400"
          )}
        >
          2
        </div>
        <div className="text-[11px] font-semibold text-brand-dark">Result</div>
      </div>
    </div>
  );
}

/** Multi-step progress indicator for flows with more than 2 steps (e.g. the
 * BTL Full Fitment Check). Kept separate from StepBar rather than extending
 * its props, so existing 2-step call sites (TorqueWrenchFlow, Quick Match)
 * are untouched. */
export function StepProgress({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="border-b border-black/6 bg-brand-surface px-5 pb-4">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              n < current ? "bg-brand-red" : n === current ? "bg-brand-red" : "bg-black/10"
            )}
          />
        ))}
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-brand-text-tertiary">
        Step {current} of {total} · {label}
      </div>
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[12.5px] font-semibold text-brand-dark">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-black/12 bg-white px-3 py-2.75 pr-9 text-[13.5px] font-medium text-brand-dark"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      </div>
    </label>
  );
}

export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex rounded-lg bg-[#eceef0] p-0.75">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-[12.5px] font-semibold",
            value === o.value ? "bg-brand-dark text-white" : "text-brand-text-secondary"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function TorqueResultCard({ result }: { result: TorqueWrenchResult }) {
  const [primary, ...alternates] = result.matches;
  return (
    <div className="px-5 pb-7">
      <div className="mb-4 rounded-lg border border-black/6 bg-brand-surface px-4 py-3">
        {result.numBolts > 0 && (
          <div className="text-[12.5px] text-brand-text-secondary">
            Derived: Bolt Ø {result.boltDiaInches}&quot; · {result.numBolts} bolts
          </div>
        )}
        <div className="text-[12.5px] text-brand-text-secondary">
          Required Torque: <span className="font-semibold text-brand-dark">~{result.requiredTorqueNm.toLocaleString()} Nm</span>
        </div>
      </div>

      {primary ? (
        <div className="rounded-xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,.03),0_12px_26px_rgba(0,0,0,.1)]">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-red">
            Recommended
          </div>
          <div className="mt-1 text-2xl font-extrabold text-brand-dark">{primary.model}</div>
          <div className="mt-1 text-[13px] text-brand-text-secondary">
            Range: {primary.minTorqueNm.toLocaleString()}–{primary.maxTorqueNm.toLocaleString()} Nm
          </div>
          <div className="mt-4 flex gap-2.5">
            <Link
              href="/products"
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
          {alternates.length > 0 && (
            <div className="mt-4 border-t border-black/6 pt-3">
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-text-tertiary">
                Also compatible
              </div>
              <div className="flex flex-wrap gap-1.5">
                {alternates.map((m) => (
                  <span
                    key={m.model}
                    className="rounded-full bg-brand-surface px-2.5 py-1 text-[11px] font-medium text-brand-text-secondary"
                  >
                    {m.model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-black/6 bg-white p-5 text-sm text-brand-text-secondary">
          No exact model match for this torque requirement — please contact Tritorc for a
          custom-engineered solution.
        </div>
      )}
    </div>
  );
}

function TorqueWrenchFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<TorqueMode>("flange");

  const [pressureClass, setPressureClass] = useState<PressureClass>(300);
  const nominalOptions = useMemo(() => getAvailableNominalSizes(pressureClass), [pressureClass]);
  const [nominalSize, setNominalSize] = useState(nominalOptions[10] ?? nominalOptions[0]);

  const [boltKind, setBoltKind] = useState<"metric" | "imperial">("metric");
  const [metricSize, setMetricSize] = useState(METRIC_TORQUE_TABLE[0].size);
  const [imperialSize, setImperialSize] = useState(ALL_IMPERIAL_BOLT_SIZES[0]);
  const [grade, setGrade] = useState<"8.8" | "10.9" | "12.9">("8.8");

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [lubrication, setLubrication] = useState<"lubricated" | "semi-lubricated" | "dry">(
    "lubricated"
  );

  const [result, setResult] = useState<TorqueWrenchResult | null>(null);

  function handleSubmit() {
    const r =
      mode === "flange"
        ? selectByFlangeSpec(nominalSize, pressureClass, lubrication)
        : selectByBoltSpec(
            boltKind,
            boltKind === "metric" ? metricSize : imperialSize,
            boltKind === "metric" ? grade : "B7",
            lubrication
          );
    setResult(r);
    setStep(2);
  }

  if (step === 2 && result) {
    return (
      <div>
        <Header title="Find My Tool" onBack={() => setStep(1)} step={2} />
        <TorqueResultCard result={result} />
      </div>
    );
  }

  return (
    <div>
      <Header title="Find My Tool" onBack={onBack} step={1} />
      <div className="px-5 pb-7 pt-6">
        <div className="mb-1.5 text-[13px] font-semibold text-brand-dark">
          How do you want to search?
        </div>
        <div className="mb-5">
          <SegmentedToggle
            value={mode}
            onChange={setMode}
            options={[
              { value: "flange", label: "By flange spec" },
              { value: "bolt-size", label: "By bolt size" },
            ]}
          />
        </div>

        {mode === "flange" ? (
          <div className="flex flex-col gap-4">
            <Select
              label="Pressure Class"
              value={String(pressureClass)}
              onChange={(v) => {
                const pc = Number(v) as PressureClass;
                setPressureClass(pc);
                const opts = getAvailableNominalSizes(pc);
                if (!opts.includes(nominalSize)) setNominalSize(opts[0]);
              }}
              options={PRESSURE_CLASSES.map((c) => String(c))}
            />
            <Select
              label="Nominal Pipe Size (in)"
              value={nominalSize}
              onChange={setNominalSize}
              options={nominalOptions}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <SegmentedToggle
              value={boltKind}
              onChange={setBoltKind}
              options={[
                { value: "metric", label: "Metric" },
                { value: "imperial", label: "Imperial" },
              ]}
            />
            {boltKind === "metric" ? (
              <>
                <Select
                  label="Bolt Size"
                  value={metricSize}
                  onChange={setMetricSize}
                  options={METRIC_TORQUE_TABLE.map((r) => r.size)}
                />
                <Select
                  label="Bolt Grade"
                  value={grade}
                  onChange={(v) => setGrade(v as typeof grade)}
                  options={["8.8", "10.9", "12.9"]}
                />
              </>
            ) : (
              <Select
                label='Bolt Diameter (in)'
                value={imperialSize}
                onChange={setImperialSize}
                options={ALL_IMPERIAL_BOLT_SIZES}
              />
            )}
          </div>
        )}

        <button
          onClick={() => setAdvancedOpen((v) => !v)}
          className="mt-4 text-left text-[12.5px] font-semibold text-brand-red"
        >
          {advancedOpen ? "▾" : "▸"} Advanced {mode === "flange" ? "(Lubrication)" : "(Lubrication)"}
        </button>
        {advancedOpen && (
          <div className="mt-3">
            <Select
              label="Lubrication Condition"
              value={lubrication}
              onChange={(v) => setLubrication(v as typeof lubrication)}
              options={["lubricated", "semi-lubricated", "dry"]}
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

/** Router for the "Bolt Tensioners" tile: Quick Match is the fast default
 * path; "Run Full Fitment Check" from a Quick Match result steps up into
 * the full engineering flow, carrying the already-known bolt size/flange
 * spec forward so nothing already entered has to be re-typed. */
function BoltTensionerFlow({ onBack }: { onBack: () => void }) {
  const [showFullCheck, setShowFullCheck] = useState(false);
  const [seed, setSeed] = useState<QuickMatchSeed | undefined>(undefined);

  if (showFullCheck) {
    return <BtlFullFitmentFlow seed={seed} onBack={() => setShowFullCheck(false)} />;
  }

  return (
    <BtlQuickMatchFlow
      onBack={onBack}
      onUpgrade={(s) => {
        setSeed(s);
        setShowFullCheck(true);
      }}
    />
  );
}

export function Header({ title, onBack, step }: { title: string; onBack: () => void; step?: 1 | 2 }) {
  return (
    <div className="sticky top-0 z-10 border-b border-black/6 bg-brand-surface px-5 pb-4 pt-[54px]">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-brand-dark">
          <ArrowLeft size={20} />
        </button>
        <div className="text-[17px] font-bold text-brand-dark">{title}</div>
      </div>
      {step && <StepBar step={step} />}
    </div>
  );
}

export function ToolSelectorFlow() {
  const [category, setCategory] = useState<Category>("picker");

  if (category === "torque") {
    return <TorqueWrenchFlow onBack={() => setCategory("picker")} />;
  }
  if (category === "tensioner") {
    return <BoltTensionerFlow onBack={() => setCategory("picker")} />;
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-brand-surface px-5 pb-4 pt-[54px]">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-brand-dark">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-[17px] font-bold text-brand-dark">Find My Tool</div>
        </div>
      </div>
      <div className="px-5 pb-7 pt-6">
        <div className="mb-1.5 text-[22px] font-bold leading-tight text-brand-dark">
          What are you looking for?
        </div>
        <div className="mb-5.5 text-[13px] leading-snug text-brand-text-secondary">
          Answer a couple of quick questions and we&apos;ll recommend the right model.
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCategory("torque")}
            className="relative h-37.5 overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(115deg,#4a4f55_0px,#4a4f55_16px,#3d4247_16px,#3d4247_32px)] shadow-[0_8px_18px_rgba(0,0,0,.1)]"
          >
            <div className="absolute inset-0 [background-image:linear-gradient(0deg,rgba(10,10,10,.9)_0%,rgba(10,10,10,.25)_70%)]" />
            <div className="absolute inset-x-3 bottom-3 text-left text-sm font-bold leading-tight text-white">
              Torque Wrenches
            </div>
          </button>
          <button
            onClick={() => setCategory("tensioner")}
            className="relative h-37.5 overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(115deg,#4a4f55_0px,#4a4f55_16px,#3d4247_16px,#3d4247_32px)] shadow-[0_8px_18px_rgba(0,0,0,.1)]"
          >
            <div className="absolute inset-0 [background-image:linear-gradient(0deg,rgba(10,10,10,.9)_0%,rgba(10,10,10,.25)_70%)]" />
            <div className="absolute inset-x-3 bottom-3 text-left text-sm font-bold leading-tight text-white">
              Bolt Tensioners
            </div>
          </button>
          <div className="h-37.5 rounded-[10px] bg-[repeating-linear-gradient(115deg,#e3e7ea_0px,#e3e7ea_16px,#dde1e4_16px,#dde1e4_32px)] opacity-65" />
          <Link
            href="/services"
            className="relative flex h-37.5 items-end overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(115deg,#4a4f55_0px,#4a4f55_16px,#3d4247_16px,#3d4247_32px)] p-3 shadow-[0_8px_18px_rgba(0,0,0,.1)]"
          >
            <div className="absolute inset-0 [background-image:linear-gradient(0deg,rgba(10,10,10,.9)_0%,rgba(10,10,10,.25)_70%)]" />
            <div className="relative text-left text-sm font-bold leading-tight text-white">
              Request a Quote
              <div className="mt-1 text-[11px] font-normal text-white/70">
                Hot Tapping, Machining & more
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
