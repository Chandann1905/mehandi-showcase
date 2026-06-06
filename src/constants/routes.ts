/**
 * Application route constants.
 * Per TRD §11 — Public and Admin routes.
 */
export const ROUTES = {
  // Public Routes
  HOME: "/",
  DESIGNS: "/designs",
  DESIGN_DETAIL: (slug: string) => `/designs/${slug}` as const,
  PACKAGES: "/packages",
  REVIEWS: "/reviews",
  CONTACT: "/contact",
  BOOK: "/book",
  DYNAMIC_PAGE: (slug: string) => `/${slug}` as const,

  // Admin Routes
  ADMIN_LOGIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_DESIGNS: "/admin/designs",
  ADMIN_DESIGN_CREATE: "/admin/designs/create",
  ADMIN_DESIGN_EDIT: (id: string) => `/admin/designs/${id}/edit` as const,
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_COLLECTIONS: "/admin/collections",
  ADMIN_PACKAGES: "/admin/packages",
  ADMIN_BOOKINGS: "/admin/bookings",
  ADMIN_BOOKING_DETAIL: (id: string) => `/admin/bookings/${id}` as const,
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_MEDIA: "/admin/media",
  ADMIN_PAGES: "/admin/pages",
  ADMIN_PAGE_CREATE: "/admin/pages/create",
  ADMIN_PAGE_EDIT: (id: string) => `/admin/pages/${id}/edit` as const,
  ADMIN_MENUS: "/admin/menus",
  ADMIN_HOMEPAGE: "/admin/homepage",
  ADMIN_FORMS: "/admin/forms",
  ADMIN_SEO: "/admin/seo",
  ADMIN_THEME: "/admin/theme",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_AUDIT_LOGS: "/admin/audit-logs",
} as const;

/**
 * Routes that do not require authentication.
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.DESIGNS,
  ROUTES.PACKAGES,
  ROUTES.REVIEWS,
  ROUTES.CONTACT,
  ROUTES.BOOK,
] as const;

/**
 * Routes that require admin authentication.
 */
export const ADMIN_ROUTE_PREFIX = "/admin" as const;
