import Link from "next/link";
import type { Service } from "@/lib/mock/content";
import { SectionLabel } from "./SectionLabel";

type ServiceWithImage = Service & { imageUrl?: string };

export function ServicesPreviewGrid({ services }: { services: ServiceWithImage[] }) {
  return (
    <div className="mb-7.5">
      <SectionLabel>Services</SectionLabel>
      <div className="grid grid-cols-2 gap-2.5">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="relative flex flex-col gap-2 overflow-hidden rounded-lg p-4 shadow-[0_8px_18px_rgba(0,0,0,.18)]"
          >
            {s.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-[#1c1c1c] to-[#2a1010]" />
            )}
            <div className="absolute inset-0 [background-image:linear-gradient(0deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.25)_70%)]" />
            <div className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full bg-brand-red/28" />
            <div className="relative text-[12.5px] font-semibold leading-snug text-white">{s.name}</div>
            <div className="relative text-[11px] font-semibold text-brand-red-bright">
              Watch overview →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
