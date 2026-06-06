import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-destructive/5 border border-destructive/20", className)}>
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6 text-sm">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
