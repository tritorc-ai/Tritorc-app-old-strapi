"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/mock/content";

export interface ScrollSection {
  name: string;
  color: string;
  products: (Product & { imageUrl?: string })[];
}

// A few product types share one real photo (no dedicated shot exists for
// each specific sub-item in the media library — verified by direct search).
// Rather than show the exact same crop stacked back-to-back, each repeat
// of the same image gets a different zoom/pan so the cards read as
// distinct compositions of the same real, accurate photo.
const CROP_VARIANTS = [
  { objectPosition: "50% 50%", scale: 1 },
  { objectPosition: "20% 30%", scale: 1.6 },
  { objectPosition: "80% 70%", scale: 1.5 },
  { objectPosition: "70% 20%", scale: 1.7 },
];

export function ProductsScrollView({ sections }: { sections: ScrollSection[] }) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measured, not guessed: the page header's height varies with viewport
  // width (its subtitle can wrap to a 2nd line on narrow screens), so a
  // hardcoded pixel offset silently drifts out of sync and either overlaps
  // the header or leaves a gap. Measure the real header height at runtime.
  const [topOffset, setTopOffset] = useState(122);

  useEffect(() => {
    function measure() {
      const header = document.querySelector<HTMLElement>(".sticky.top-0");
      setTopOffset(header?.getBoundingClientRect().height ?? 122);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalProducts = useMemo(
    () => sections.reduce((sum, s) => sum + s.products.length, 0),
    [sections]
  );

  useEffect(() => {
    // This ONLY drives which dot the scroll rail highlights — purely
    // cosmetic. The actual "category stays pinned until its cards scroll
    // past, then the next one takes over" behavior below is native CSS
    // `position: sticky` on each section's own header, which needs no
    // JavaScript/scroll-listener at all to work correctly, unlike an
    // earlier version of this component that drove a single shared header
    // off a scroll-listener-computed index — if that listener ever missed
    // a tick (throttling, background tab, etc.) the whole pin/handoff
    // effect broke. Native sticky can't miss a tick; it's laid out by the
    // browser's own scroll/paint pipeline every frame.
    function updateActiveSection() {
      let newIndex = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= topOffset + 40) {
          newIndex = i;
        }
      }
      setActiveIndex(newIndex);
    }

    let throttled = false;
    function onScroll() {
      if (throttled) return;
      throttled = true;
      setTimeout(() => {
        updateActiveSection();
        throttled = false;
      }, 100);
    }

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, topOffset]);

  function scrollToSection(i: number) {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative">
      {/* Color-coded scroll rail */}
      <div className="fixed right-1.5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-[3px]">
        {sections.map((s, i) => {
          const heightPx = Math.max(14, (s.products.length / totalProducts) * 220);
          const isActive = i === activeIndex;
          return (
            <button
              key={s.name}
              aria-label={`Jump to ${s.name}`}
              onClick={() => scrollToSection(i)}
              className="rounded-full transition-all"
              style={{
                width: isActive ? 6 : 4,
                height: heightPx,
                background: s.color,
                opacity: isActive ? 1 : 0.35,
              }}
            />
          );
        })}
      </div>

      <Link
        href="/tool-selector"
        className="mb-5.5 flex items-center justify-between gap-2.5 rounded-lg bg-linear-to-br from-brand-red to-brand-red-bright px-4 py-3.5 shadow-[0_8px_18px_rgba(214,49,47,.3)]"
      >
        <div>
          <div className="text-[13.5px] font-bold leading-snug text-white">
            Not sure which tool you need?
          </div>
          <div className="mt-0.5 text-[11.5px] leading-snug text-white/85">
            Answer a few questions to get a recommendation
          </div>
        </div>
        <ArrowRight size={18} className="shrink-0 text-white" />
      </Link>

      {sections.map((section, i) => (
        <div
          key={section.name}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="mt-7 first:mt-0"
          style={{ scrollMarginTop: topOffset }}
        >
          <div
            className="sticky z-10 -mx-5 mb-3 flex items-center gap-2.5 bg-brand-surface px-5 py-2"
            style={{ top: topOffset }}
          >
            <div className="h-6 w-1 shrink-0 rounded-sm" style={{ background: section.color }} />
            <div className="text-[19px] font-bold leading-tight text-brand-dark">{section.name}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(() => {
              const seenCount = new Map<string, number>();
              return section.products.map((p) => {
                let variant = CROP_VARIANTS[0];
                if (p.imageUrl) {
                  const count = seenCount.get(p.imageUrl) ?? 0;
                  seenCount.set(p.imageUrl, count + 1);
                  variant = CROP_VARIANTS[count % CROP_VARIANTS.length];
                }
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="flex flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-[0_1px_2px_rgba(0,0,0,.03),0_8px_18px_rgba(0,0,0,.06)]"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-brand-surface">
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition: variant.objectPosition,
                            transform: `scale(${variant.scale})`,
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-[repeating-linear-gradient(135deg,#eef0f2_0px,#eef0f2_8px,#e3e7ea_8px,#e3e7ea_16px)]" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: section.color }} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-3">
                      <div className="text-[13px] font-semibold leading-snug text-brand-dark">
                        {p.name}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="font-mono text-[11px] text-brand-text-secondary">
                          {p.series}
                        </div>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-red">
                          ›
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              });
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
