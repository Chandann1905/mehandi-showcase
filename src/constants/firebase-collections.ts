/**
 * Firestore collection name constants.
 * Single source of truth — never hardcode collection names elsewhere.
 */
export const COLLECTIONS = {
  ADMINS: "admins",
  ROLES: "roles",
  ARTISTS: "artists",
  CITIES: "cities",
  CATEGORIES: "categories",
  COLLECTIONS: "collections",
  DESIGNS: "designs",
  DESIGN_IMAGES: "design_images",
  PACKAGES: "packages",
  BOOKINGS: "bookings",
  BOOKING_NOTES: "booking_notes",
  REVIEWS: "reviews",
  FAVORITES: "favorites",
  RECENT_VIEWS: "recent_views",
  PAGES: "pages",
  HOMEPAGE_SECTIONS: "homepage_sections",
  MENUS: "menus",
  FORMS: "forms",
  FORM_SUBMISSIONS: "form_submissions",
  MEDIA: "media",
  SEO: "seo",
  THEME: "theme",
  SETTINGS: "settings",
  AUDIT_LOGS: "audit_logs",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
