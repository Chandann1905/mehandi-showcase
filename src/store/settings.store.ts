import { create } from "zustand";
import type { SiteSettings } from "@/types/settings.types";

interface SettingsState {
  settings: SiteSettings | null;
  isLoading: boolean;
  setSettings: (settings: SiteSettings) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: true,
  setSettings: (settings) => set({ settings, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
