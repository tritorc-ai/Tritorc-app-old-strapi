"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/mock/content";

export interface ServiceScrollSection {
  name: string;
  color: string;
  services: (Service & { imageUrl?: string })[];
}

export function ServicesScrollView({ sections }: { sections: ServiceScrollSection[] }) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPill, setShowPill] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalServices = useMemo(
    () => sections.reduce((sum, s) => sum + s.services.length, 0),
    [sections]
  );

  useEffect(() => {
    const DETECTION_LINE = 110;

    function updateActiveSection() {
      let newIndex = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= DETECTION_LINE) {
          newIndex = i;
        }
      }
      setActiveIndex((prev) => {
        if (prev !== newIndex) {
          setShowPill(true);
          if (hideTimer.current) clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => setShowPill(false), 1200);
        }
        return newIndex;
      });
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
  }, [sections]);

  function scrollToSection(i: number) {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const active = sections[activeIndex];

  return (
    <div className="relative">
      {/* Floating current-section pill */}
      <div
        className={cn(
          "pointer-events-none fixed left-1/2 top-[64px] z-30 -translate-x-1/2 transition-all duration-300",
          showPill ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        )}
      >
        <div className="flex items-center gap-2 rounded-full bg-brand-dark/95 px-3.5 py-2 shadow-[0_8px_20px_rgba(0,0,0,.25)] backdrop-blur">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: active?.color }} />
          <span className="text-[12px] font-semibold text-white">{active?.name}</span>
        </div>
      </div>

      {/* Color-coded scroll rail */}
      <div className="fixed right-1.5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-[3px]">
        {sections.map((s, i) => {
          const heightPx = Math.max(14, (s.services.length / totalServices) * 220);
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

      {sections.map((section, i) => (
        <div
          key={section.name}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="mt-7 scroll-mt-[90px] first:mt-0"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <div className="h-6 w-1 shrink-0 rounded-sm" style={{ background: section.color }} />
            <div className="text-[19px] font-bold leading-tight text-brand-dark">
              {section.name}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {section.services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-[0_1px_2px_rgba(0,0,0,.03),0_8px_18px_rgba(0,0,0,.06)]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-brand-surface">
                  {s.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-[repeating-linear-gradient(135deg,#eef0f2_0px,#eef0f2_8px,#e3e7ea_8px,#e3e7ea_16px)]" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: section.color }} />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-3">
                  <div className="text-[13px] font-semibold leading-snug text-brand-dark">
                    {s.name}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-[11px] leading-snug text-brand-text-secondary">
                      {s.tagline}
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-red">
                      ›
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
