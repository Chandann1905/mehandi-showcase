"use client";

import { useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth.store";
import { adminRepository } from "@/repositories/admin.repository";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom role from Firestore
        const role = await adminRepository.getRole(firebaseUser.uid);
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
