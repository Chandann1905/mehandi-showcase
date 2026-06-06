import { create } from "zustand";
import { persist } from "zustand/middleware";
import { designService } from "@/services/design.service";

interface FavoritesState {
  favorites: string[]; // Array of design IDs
  toggleFavorite: (designId: string) => Promise<void>;
  isFavorite: (designId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: async (designId: string) => {
        const { favorites } = get();
        const isFav = favorites.includes(designId);
        
        // Optimistic update
        set({
          favorites: isFav
            ? favorites.filter((id) => id !== designId)
            : [...favorites, designId],
        });

        // Background sync to Firebase analytics / stats
        try {
          await designService.toggleFavorite(designId, !isFav);
        } catch (error) {
          console.error("Failed to sync favorite status", error);
          // Revert optimistic update on failure
          set({ favorites });
        }
      },
      
      isFavorite: (designId: string) => get().favorites.includes(designId),
    }),
    {
      name: "favorites-storage", // local storage key
    }
  )
);
