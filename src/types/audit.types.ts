import type { Timestamp } from "firebase/firestore";

/**
 * Audit log actions.
 * Per Database Spec §27.
 */
export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "unpublish"
  | "login"
  | "logout";

/**
 * Audit log modules.
 */
export type AuditModule =
  | "designs"
  | "categories"
  | "collections"
  | "packages"
  | "bookings"
  | "reviews"
  | "pages"
  | "menus"
  | "homepage"
  | "forms"
  | "seo"
  | "theme"
  | "settings"
  | "auth"
  | "media";

/**
 * Audit log document.
 * Per Database Spec §27.
 */
export interface AuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  module: AuditModule;
  action: AuditAction;
  entity_id: string;
  entity_name: string;
  old_data: Record<string, unknown>;
  new_data: Record<string, unknown>;
  ip_address: string;
  created_at: Timestamp;
}

/**
 * Audit log filters for admin view.
 */
export interface AuditLogFilters {
  module?: AuditModule;
  action?: AuditAction;
  admin_id?: string;
  date_from?: string;
  date_to?: string;
}
