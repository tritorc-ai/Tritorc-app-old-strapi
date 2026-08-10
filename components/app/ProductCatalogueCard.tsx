import { Download } from "lucide-react";

export function ProductCatalogueCard({
  title,
  meta,
  url,
}: {
  title: string;
  meta: string;
  url: string;
}) {
  return (
    <a
      href={url}
      download
      className="flex w-full items-center gap-3 rounded-lg border border-black/6 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,.03),0_6px_14px_rgba(0,0,0,.05)]"
    >
      <div className="flex h-13 w-10.5 shrink-0 items-center justify-center rounded-[3px] bg-brand-dark">
        <span className="font-mono text-[9px] font-bold text-white">PDF</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold leading-tight text-brand-dark">{title}</div>
        <div className="mt-0.5 text-[11.5px] leading-snug text-brand-text-secondary">{meta}</div>
      </div>
      <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
        <Download size={14} />
      </div>
    </a>
  );
}
