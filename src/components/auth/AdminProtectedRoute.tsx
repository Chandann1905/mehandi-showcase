"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

export function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading, and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      // Don't redirect if we're already on the login page to prevent infinite loops
      if (pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show loading state while Firebase auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // If on login page and already authenticated, redirect to admin dashboard
  if (pathname === "/admin/login" && isAuthenticated && user?.role) {
    router.replace("/admin");
    return null;
  }

  // If not authenticated and trying to access an admin route (except login), render nothing while redirecting
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  // Otherwise, render the children
  return <>{children}</>;
}
