import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 relative inline-block">
        {title}
        <span className={cn(
          "absolute -bottom-2 h-1 bg-primary rounded-full",
          centered ? "left-1/2 -translate-x-1/2 w-16" : "left-0 w-16"
        )} />
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
