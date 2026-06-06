/**
 * Type definitions barrel export.
 * Import all types from @/types.
 */

export type {
  BaseDocument,
  CreateInput,
  UpdateInput,
  SortDirection,
  PaginationCursor,
  PaginatedResult,
  QueryFilter,
  FirestoreOperator,
  QueryOptions,
  Locale,
  OperationResult,
} from "./common.types";

export type {
  AdminRole,
  Role,
  Admin,
  AuthState,
  AuthUser,
  LoginCredentials,
  PermissionCheck,
} from "./auth.types";

export type {
  Design,
  DesignDifficulty,
  DesignImage,
  DesignCard,
  DesignDetail,
  DesignFilters,
} from "./design.types";

export type { Category, CategoryCard } from "./category.types";

export type { Collection, CollectionCard } from "./collection.types";

export type { Package, PackageCard } from "./package.types";

export type {
  BookingStatus,
  Booking,
  BookingSource,
  BookingNote,
  BookingFormInput,
  BookingListItem,
  BookingDetail,
} from "./booking.types";
export {
  BOOKING_STATUS_TRANSITIONS,
  BOOKING_STATUS_CONFIG,
} from "./booking.types";

export type {
  ReviewStatus,
  Review,
  ReviewFormInput,
  ReviewCard,
} from "./review.types";

export type { Page } from "./page.types";

export type {
  HomepageSectionType,
  HomepageSection,
  HomepageSectionConfig,
  FAQItem,
} from "./homepage.types";

export type { MenuItem, MenuTarget } from "./menu.types";

export type {
  FormFieldType,
  FormField,
  Form,
  FormSubmission,
} from "./form.types";

export type {
  SEOEntityType,
  SEOData,
  StructuredDataType,
} from "./seo.types";

export type { ThemeConfig } from "./theme.types";
export { DEFAULT_THEME } from "./theme.types";

export type { SiteSettings } from "./settings.types";
export { DEFAULT_SETTINGS } from "./settings.types";

export type {
  MediaFile,
  MediaUploadInput,
  MediaFilters,
} from "./media.types";

export type {
  AuditAction,
  AuditModule,
  AuditLog,
  AuditLogFilters,
} from "./audit.types";

export type {
  DesignViewEvent,
  BookingStartEvent,
  BookingSubmitEvent,
  WhatsAppClickEvent,
  SearchEvent,
  FavoriteEvent,
  AnalyticsSummary,
} from "./analytics.types";
