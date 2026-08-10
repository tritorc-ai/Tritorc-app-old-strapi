import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export function FindMyToolCta() {
  return (
    <Link
      href="/tool-selector"
      className="relative mb-7 block overflow-hidden rounded-xl bg-linear-to-br from-brand-red via-brand-red-bright to-brand-red p-5 text-left shadow-[0_14px_30px_rgba(214,49,47,0.4)]"
    >
      <div className="pointer-events-none absolute -right-5 -top-7 h-[120px] w-[120px] rounded-full bg-white/12" />
      <div className="pointer-events-none absolute bottom-[-40px] right-7 h-[90px] w-[90px] rounded-full bg-white/8" />
      <div className="relative flex items-center gap-3.5">
        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-white/18">
          <Search size={22} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white/85">
            Not sure which tool you need?
          </div>
          <div className="text-[17px] font-extrabold text-white">Find My Tool</div>
        </div>
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/22 text-white">
          <ArrowRight size={16} />
        </div>
      </div>
      <div className="relative mt-3 text-xs leading-snug text-white/85">
        Answer a couple of quick questions and get an exact model recommendation.
      </div>
    </Link>
  );
}
