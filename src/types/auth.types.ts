import type { BaseDocument, Locale } from "./common.types";

/**
 * Admin user roles.
 * Per Database Spec §4.
 */
export type AdminRole = "SUPER_ADMIN" | "CONTENT_MANAGER" | "BOOKING_MANAGER";

/**
 * Role document.
 */
export interface Role extends BaseDocument {
  name: AdminRole;
  permissions: string[];
}

/**
 * Admin user document.
 * Per Database Spec §5.
 */
export interface Admin extends BaseDocument {
  firebase_uid: string;
  name: string;
  email: string;
  role_id: AdminRole;
}

/**
 * Auth state for client-side use.
 */
export interface AuthState {
  user: AuthUser | null;
  role: AdminRole | null;
  loading: boolean;
  error: string | null;
}

/**
 * Simplified user object for UI consumption.
 */
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string | null;
}

/**
 * Login credentials.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Permission check result.
 */
export interface PermissionCheck {
  allowed: boolean;
  reason?: string;
}
