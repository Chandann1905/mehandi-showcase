"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settings.store";
import { cn } from "@/lib/utils";

// Static fallback menu
const DEFAULT_MENU = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "/packages" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useSettingsStore();

  // Determine if header should be transparent (e.g., on homepage hero)
  const isTransparentInitial = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isTransparent = isTransparentInitial && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isTransparent
          ? "bg-transparent py-4"
          : "glass py-3 shadow-low"
      )}
    >
      <div className="container-page flex items-center justify-between">
        <Logo variant={isTransparent ? "dark" : "light"} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {DEFAULT_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary border-b-2 border-primary"
                  : isTransparent
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/gallery" className="p-2 text-foreground/80 hover:text-primary transition-colors" aria-label="Search designs">
            <Search className="h-5 w-5" />
          </Link>
          <Button asChild variant="default" className="rounded-full px-6 bg-primary hover:bg-primary-light">
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground touch-target"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-medium animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 space-y-4">
            {DEFAULT_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 text-lg font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-4 rounded-full bg-primary hover:bg-primary-light">
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
