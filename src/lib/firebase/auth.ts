import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type Auth,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { firebaseApp } from "./config";

/**
 * Firebase Auth instance (singleton).
 */
export const auth: Auth = getAuth(firebaseApp);

/**
 * Sign in with email and password.
 * Used exclusively for admin authentication (per TRD §9).
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthChange(
  callback: (user: User | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user (or null).
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Get the current user's ID token for server-side verification.
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}
