"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useSettingsStore } from "@/store/settings.store";
import { useThemeStore } from "@/store/theme.store";
import type { SiteSettings } from "@/types/settings.types";
import type { ThemeConfig } from "@/types/theme.types";

interface StoreHydrationProviderProps {
  children: ReactNode;
  initialSettings: SiteSettings;
  initialTheme: ThemeConfig;
}

/**
 * Hydrates client-side Zustand stores with server-fetched data.
 */
export function StoreHydrationProvider({
  children,
  initialSettings,
  initialTheme,
}: StoreHydrationProviderProps) {
  const isHydrated = useRef(false);

  // Initialize store immediately on first render if not hydrated
  if (!isHydrated.current) {
    useSettingsStore.getState().setSettings(initialSettings);
    useThemeStore.getState().setThemeConfig(initialTheme);
    isHydrated.current = true;
  }

  // Update CSS variables based on theme
  useEffect(() => {
    if (!initialTheme) return;
    
    const root = document.documentElement;
    if (initialTheme.primary_color) {
      // Very basic example. In reality, you'd convert hex to HSL tokens.
      // root.style.setProperty('--color-primary', hexToHSL(initialTheme.primary_color));
    }
  }, [initialTheme]);

  return <>{children}</>;
}
