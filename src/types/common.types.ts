import type { Timestamp } from "firebase/firestore";

/**
 * Common fields present on every primary Firestore document.
 * Per Database Spec §2.
 */
export interface BaseDocument {
  id: string;
  active: boolean;
  deleted: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  updated_by: string;
}

/**
 * Fields for creating a new document (auto-generated fields excluded).
 */
export type CreateInput<T extends BaseDocument> = Omit<
  T,
  "id" | "created_at" | "updated_at" | "created_by" | "updated_by" | "deleted"
>;

/**
 * Fields for updating a document (partial, excluding immutable fields).
 */
export type UpdateInput<T extends BaseDocument> = Partial<
  Omit<T, "id" | "created_at" | "created_by">
>;

/**
 * Sort direction for queries.
 */
export type SortDirection = "asc" | "desc";

/**
 * Pagination cursor for infinite scroll.
 */
export interface PaginationCursor {
  lastDocId: string | null;
  pageSize: number;
}

/**
 * Paginated result set.
 */
export interface PaginatedResult<T> {
  items: T[];
  hasMore: boolean;
  lastDocId: string | null;
  total?: number;
}

/**
 * Query filter for repository operations.
 */
export interface QueryFilter {
  field: string;
  operator: FirestoreOperator;
  value: unknown;
}

export type FirestoreOperator =
  | "=="
  | "!="
  | "<"
  | "<="
  | ">"
  | ">="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

/**
 * Query options for repository operations.
 */
export interface QueryOptions {
  filters?: QueryFilter[];
  orderBy?: { field: string; direction: SortDirection };
  limit?: number;
  startAfter?: string;
}

/**
 * Localization field for future multi-language support.
 * Per Database Spec §31.
 */
export type Locale = "en" | "hi" | "ar";

/**
 * Operation result for service layer responses.
 */
export interface OperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
