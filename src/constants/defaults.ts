/**
 * Application default values.
 * These serve as fallbacks when Firestore data is not yet loaded.
 */
export const DEFAULTS = {
  /** Booking number format: BK-YYYYMMDD-XXXX */
  BOOKING_NUMBER_PREFIX: "BK",

  /** Pagination */
  PAGE_SIZE: 12,
  ADMIN_PAGE_SIZE: 20,

  /** Recently viewed retention in days */
  RECENT_VIEWS_RETENTION_DAYS: 30,

  /** Maximum images per design */
  MAX_DESIGN_IMAGES: 10,

  /** Maximum images per review */
  MAX_REVIEW_IMAGES: 3,

  /** Debounce delay for search input (ms) */
  SEARCH_DEBOUNCE_MS: 300,

  /** Scroll threshold for scroll-to-top button (px) */
  SCROLL_TO_TOP_THRESHOLD: 400,

  /** Default locale */
  DEFAULT_LOCALE: "en",

  /** Default artist ID for MVP (single artist) */
  DEFAULT_ARTIST_ID: "default",

  /** Default city ID for MVP */
  DEFAULT_CITY_ID: "default",

  /** WhatsApp message template variables */
  WHATSAPP_TEMPLATE_VARS: {
    CUSTOMER_NAME: "{{customer_name}}",
    BOOKING_NUMBER: "{{booking_number}}",
    DESIGN_NAME: "{{design_name}}",
    EVENT_DATE: "{{event_date}}",
  },
} as const;
