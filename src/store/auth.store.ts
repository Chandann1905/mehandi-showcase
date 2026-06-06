import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AdminRole } from "@/types/auth.types";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    role: AdminRole | null;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthState["user"]) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Initially true while Firebase auth state is resolving
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Only persist these
    }
  )
);
