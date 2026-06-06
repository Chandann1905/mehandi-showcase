import { create } from "zustand";
import type { ThemeConfig } from "@/types/theme.types";

interface ThemeState {
  themeConfig: ThemeConfig | null;
  setThemeConfig: (config: ThemeConfig) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeConfig: null,
  setThemeConfig: (config) => set({ themeConfig: config }),
}));
