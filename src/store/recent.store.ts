import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentState {
  recent: string[]; // Array of design IDs
  addRecent: (designId: string) => void;
  clearRecent: () => void;
}

const MAX_RECENT = 20;

export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      recent: [],
      
      addRecent: (designId: string) => {
        const { recent } = get();
        // Remove if it exists to push to front
        const filtered = recent.filter((id) => id !== designId);
        
        set({
          // Add to beginning, keep max elements
          recent: [designId, ...filtered].slice(0, MAX_RECENT),
        });
      },

      clearRecent: () => {
        set({ recent: [] });
      }
    }),
    {
      name: "recent-storage", // local storage key
    }
  )
);
