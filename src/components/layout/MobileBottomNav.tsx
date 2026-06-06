"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Image as ImageIcon, Package, Star, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Gallery", href: "/gallery", icon: ImageIcon },
  { label: "Book", href: "/book", icon: CalendarHeart, isPrimary: true },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Reviews", href: "/reviews", icon: Star },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center justify-center p-1 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-medium transition-transform group-active:scale-95">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-1 text-[10px] font-medium text-primary">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 p-2 rounded-xl transition-colors touch-target",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1 transition-transform", isActive && "scale-110")} />
              <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
