import { getImageUrls, getTestimonials } from "@/lib/strapi";
import { PageHeader } from "@/components/app/PageHeader";
import { SectionLabel } from "@/components/app/SectionLabel";
import { ProductCatalogueCard } from "@/components/app/ProductCatalogueCard";

export default async function CompanyPage() {
  const [testimonials, images] = await Promise.all([getTestimonials(), getImageUrls()]);
  const facilityImageUrl = images.companyIntro;

  return (
    <div>
      <PageHeader title="Company" />
      <div className="px-5 pb-7">
        <div className="relative my-3.5 flex h-40 items-end overflow-hidden rounded-lg shadow-[0_10px_24px_rgba(0,0,0,.1)]">
          {facilityImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={facilityImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef0f2_0px,#eef0f2_10px,#e3e7ea_10px,#e3e7ea_20px)]" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-linear-to-r from-brand-red to-brand-red-bright" />
          {!facilityImageUrl && (
            <div className="relative m-3.5 rounded-[3px] bg-white/85 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-black/40">
              FACILITY PHOTO
            </div>
          )}
        </div>

        <div className="text-[13.5px] leading-relaxed text-brand-text-secondary">
          Tritorc is a trusted authority in controlled bolting, on-site machining, and pipeline
          integrity solutions — delivering turnkey expertise to industrial teams across 11
          countries.
        </div>

        <div className="my-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-brand-dark px-4.5 py-5 shadow-[0_10px_24px_rgba(0,0,0,.16)]">
          <div>
            <div className="text-[22px] font-extrabold leading-none text-brand-red-bright">54+</div>
            <div className="mt-0.75 text-[11px] leading-snug text-white/60">Oil & gas projects</div>
          </div>
          <div>
            <div className="text-[22px] font-extrabold leading-none text-brand-red-bright">300+</div>
            <div className="mt-0.75 text-[11px] leading-snug text-white/60">Turbines installed</div>
          </div>
        </div>

        <SectionLabel>Company Profile</SectionLabel>
        <div className="mb-5.5">
          <ProductCatalogueCard
            title="Company Profile"
            meta="6.4 MB · Updated Jul 2026"
            url="#"
          />
        </div>

        <SectionLabel>What Clients Say</SectionLabel>
        <div className="flex gap-3 overflow-x-auto pb-1.5 [scrollbar-width:none]">
          {testimonials.map((t) => {
            const avatarUrl = images[t.imageKey];
            return (
              <div
                key={t.author}
                className="w-55 shrink-0 rounded-lg border border-black/6 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,.03),0_6px_14px_rgba(0,0,0,.05)]"
              >
                {avatarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt=""
                    className="mb-2.5 h-20 w-full rounded-md object-cover"
                  />
                )}
                <div className="text-[12.5px] italic leading-relaxed text-brand-dark">
                  &ldquo;{t.quote}&rdquo;
                </div>
                <div className="mt-2 text-[11px] font-semibold text-brand-text-secondary">
                  {t.author}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
