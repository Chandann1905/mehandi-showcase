import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "gold";
}

export function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "font-heading font-bold tracking-tight transition-opacity hover:opacity-80 flex flex-col",
        className
      )}
    >
      <span className={cn(
        "text-2xl sm:text-3xl leading-none",
        variant === "light" ? "text-foreground" : 
        variant === "gold" ? "text-secondary" : 
        "text-white"
      )}>
        Creative
      </span>
      <span className={cn(
        "text-sm sm:text-base font-medium tracking-widest uppercase ml-1",
        variant === "light" ? "text-primary" : 
        variant === "gold" ? "text-secondary-light" : 
        "text-white/80"
      )}>
        Mehndi Art
      </span>
    </Link>
  );
}
