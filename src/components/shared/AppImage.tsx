"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackIcon?: boolean;
}

export function AppImage({ 
  className, 
  alt, 
  fallbackIcon = true,
  ...props 
}: AppImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80 text-muted-foreground p-4 text-center">
          {fallbackIcon && <ImageIcon className="h-8 w-8 mb-2 opacity-50" />}
          <span className="text-xs uppercase tracking-wider font-medium">Image unavailable</span>
        </div>
      )}

      {/* Actual Image */}
      {!hasError && (
        <Image
          {...props}
          alt={alt || "Mehndi design"}
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100",
            props.fill ? "absolute inset-0" : ""
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
