"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BtlFitmentResult, RuleCheckResult } from "@/lib/toolSelector/btlFitmentRules";

// Only BTL-19 has a real product detail page today (lib/mock/content.ts) —
// every other BTL model is real catalogue data for the fitment engine, but
// isn't (yet) a separate product listing. Fall back to the generic
// Products page rather than linking to a slug that would 404.
export function getBtlProductHref(model: string): string {
  return model === "BTL-19" ? "/products/btl-19" : "/products";
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  unit,
  optional,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unit?: string;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1.5">
        <div className="text-[12.5px] font-semibold text-brand-dark">{label}</div>
        {optional && (
          <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-brand-text-tertiary">
            Optional
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full appearance-none rounded-lg border border-black/12 bg-white px-3 py-2.75 pr-12 text-[13.5px] font-medium text-brand-dark [appearance:textfield]"
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11.5px] font-medium text-neutral-400">
            {unit}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] leading-snug text-brand-text-tertiary">{hint}</div>}
    </label>
  );
}

const VERDICT_META = {
  "full-fit": {
    label: "Full Fit",
    color: "#0d9488",
    Icon: CheckCircle2,
    note: "All fitment checks passed with healthy margins.",
  },
  "fit-with-caution": {
    label: "Fit With Caution",
    color: "#d97706",
    Icon: AlertTriangle,
    note: "Fits, but one or more margins are tight — verify actual site clearances before mobilising.",
  },
  "does-not-fit": {
    label: "Does Not Fit",
    color: "#d6312f",
    Icon: XCircle,
    note: "The closest compatible model still has a failing check — consult Tritorc engineering for a custom configuration.",
  },
} as const;

export function VerdictHero({ result }: { result: BtlFitmentResult }) {
  const meta = VERDICT_META[result.verdict];
  const Icon = meta.Icon;
  return (
    <div
      className="overflow-hidden rounded-xl border border-black/6 bg-white shadow-[0_1px_2px_rgba(0,0,0,.03),0_12px_26px_rgba(0,0,0,.1)]"
    >
      <div className="h-1.5" style={{ background: meta.color }} />
      <div className="flex items-start gap-3 p-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${meta.color}1a`, color: meta.color }}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div
            className="font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ color: meta.color }}
          >
            {meta.label}
            {!result.fullyEvaluated && " · Partial Check"}
          </div>
          <div className="mt-1 text-2xl font-extrabold text-brand-dark">{result.recommended.model.model}</div>
          <div className="mt-1 text-[13px] text-brand-text-secondary">
            Cylinder Force: {result.recommended.model.cylinderForceKn.toLocaleString()} kN · Bolt Range:{" "}
            {result.recommended.model.boltRangeLabel}
          </div>
          <div className="mt-2 text-[12px] leading-snug text-brand-text-secondary">{meta.note}</div>
        </div>
      </div>
    </div>
  );
}

const RULE_STATUS_META = {
  pass: { label: "PASS", color: "#0d9488" },
  warn: { label: "MARGINAL", color: "#d97706" },
  fail: { label: "FAIL", color: "#d6312f" },
  "not-checked": { label: "NOT CHECKED", color: "#9ca3af" },
} as const;

function ruleStatus(rule: RuleCheckResult): keyof typeof RULE_STATUS_META {
  if (!rule.evaluated) return "not-checked";
  if (!rule.pass) return "fail";
  if (rule.warn) return "warn";
  return "pass";
}

function MarginBar({ rule }: { rule: RuleCheckResult }) {
  const status = ruleStatus(rule);
  const meta = RULE_STATUS_META[status];
  if (status === "not-checked") {
    return (
      <div className="h-1.5 w-full rounded-full border border-dashed border-black/15 bg-transparent" />
    );
  }
  // Visual-only scale: margin mapped against a generous fixed band so bars
  // read consistently across rules with very different absolute magnitudes.
  const pct = Math.max(4, Math.min(100, 50 + rule.marginMm));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/6">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, background: meta.color }}
      />
    </div>
  );
}

export function RuleRow({
  rule,
  onJumpToField,
}: {
  rule: RuleCheckResult;
  onJumpToField?: () => void;
}) {
  const status = ruleStatus(rule);
  const meta = RULE_STATUS_META[status];
  return (
    <details className="group rounded-lg border border-black/6 bg-white px-3.5 py-3 open:pb-3.5">
      <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[12.5px] font-semibold text-brand-dark">{rule.label}</div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide"
              style={{ background: `${meta.color}1a`, color: meta.color }}
            >
              {meta.label}
            </span>
          </div>
          <div className="mt-1.5">
            <MarginBar rule={rule} />
          </div>
        </div>
      </summary>
      <div className="mt-3 border-t border-black/6 pt-3 text-[12px] leading-relaxed text-brand-text-secondary">
        {status === "not-checked" ? (
          <div>
            {rule.description}{" "}
            {onJumpToField && (
              <button onClick={onJumpToField} className="font-semibold text-brand-red">
                Add it →
              </button>
            )}
          </div>
        ) : (
          <>
            <div>{rule.description}</div>
            {rule.assumption ? (
              <div className="mt-1.5 italic text-brand-text-tertiary">{rule.assumption}</div>
            ) : (
              <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[11px]">
                <div>
                  <div className="text-brand-text-tertiary">Available</div>
                  <div className="font-semibold text-brand-dark">{rule.availableMm?.toFixed(1)} mm</div>
                </div>
                <div>
                  <div className="text-brand-text-tertiary">Required</div>
                  <div className="font-semibold text-brand-dark">{rule.requiredMm?.toFixed(1)} mm</div>
                </div>
                <div>
                  <div className="text-brand-text-tertiary">Margin</div>
                  <div className="font-semibold" style={{ color: meta.color }}>
                    {rule.marginMm >= 0 ? "+" : ""}
                    {rule.marginMm.toFixed(1)} mm
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </details>
  );
}

export function BoltRangeRibbon({ boltSizes, selected }: { boltSizes: string[]; selected?: string }) {
  const idx = selected ? boltSizes.indexOf(selected) : -1;
  const pct = idx >= 0 && boltSizes.length > 1 ? (idx / (boltSizes.length - 1)) * 100 : null;
  return (
    <div className="mt-3">
      <div className="relative h-1.5 rounded-full bg-brand-surface">
        <div className="h-full rounded-full bg-linear-to-r from-brand-red to-brand-red-bright" />
        {pct != null && (
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-brand-dark shadow-[0_1px_3px_rgba(0,0,0,.4)]"
            style={{ left: `${pct}%`, transform: "translate(-50%, -50%)" }}
          />
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-mono text-brand-text-tertiary">
        <span>{boltSizes[0]}</span>
        <span>{boltSizes[boltSizes.length - 1]}</span>
      </div>
    </div>
  );
}

export function ModelFilmstrip({
  result,
  selectedModel,
  onSelect,
}: {
  result: BtlFitmentResult;
  selectedModel: string;
  onSelect: (model: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {result.results.map((r) => {
        const status: "pass" | "warn" | "fail" =
          r.boltSizeCompatible === false || r.anyFail ? "fail" : r.anyWarn ? "warn" : "pass";
        const color =
          status === "pass" ? "#0d9488" : status === "warn" ? "#d97706" : "#d6312f";
        const isSelected = r.model.model === selectedModel;
        const isRecommended = r.model.model === result.recommended.model.model;
        return (
          <button
            key={r.model.model}
            onClick={() => onSelect(r.model.model)}
            className={cn(
              "flex w-24 shrink-0 flex-col gap-1 rounded-lg border bg-white px-2.5 py-2 text-left transition-transform",
              isSelected ? "scale-105 border-brand-red ring-2 ring-brand-red/30" : "border-black/8"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="text-[11.5px] font-bold text-brand-dark">{r.model.model}</div>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            </div>
            <div className="text-[9.5px] leading-snug text-brand-text-tertiary">{r.model.boltRangeLabel}</div>
            {isRecommended && (
              <div className="text-[9px] font-bold uppercase tracking-wide text-brand-red">Selected</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
