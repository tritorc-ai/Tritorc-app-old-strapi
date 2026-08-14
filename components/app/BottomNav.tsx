"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Wrench, LayoutGrid, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/library", label: "Library", icon: LayoutGrid },
  { href: "/company", label: "Company", icon: Building2 },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-black/8 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pt-2 pb-safe-nav sm:max-w-none sm:justify-center sm:gap-16">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-1 sm:flex-none sm:px-4"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.8}
                className={cn(active ? "text-brand-red" : "text-brand-text-tertiary")}
              />
              <span
                className={cn(
                  "text-[11px] font-medium",
                  active ? "text-brand-red" : "text-brand-text-tertiary"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
