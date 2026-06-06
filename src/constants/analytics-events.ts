/**
 * Firebase Analytics event constants.
 * Per Firebase Spec §18.
 */
export const ANALYTICS_EVENTS = {
  // Visitor Events
  PAGE_VIEW: "page_view",
  GALLERY_VIEW: "gallery_view",
  DESIGN_VIEW: "design_view",
  SEARCH: "search",
  FAVORITE_ADD: "favorite_add",
  FAVORITE_REMOVE: "favorite_remove",
  BOOKING_START: "booking_start",
  BOOKING_SUBMIT: "booking_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  REVIEW_SUBMIT: "review_submit",
  SHARE: "share",
  CONTACT_CLICK: "contact_click",

  // Admin Events
  ADMIN_LOGIN: "admin_login",
  ADMIN_LOGOUT: "admin_logout",
  CREATE_DESIGN: "create_design",
  UPDATE_DESIGN: "update_design",
  DELETE_DESIGN: "delete_design",
  APPROVE_REVIEW: "approve_review",
  REJECT_REVIEW: "reject_review",
  UPDATE_BOOKING: "update_booking",
  PUBLISH_PAGE: "publish_page",
  UPDATE_THEME: "update_theme",
  UPDATE_SETTINGS: "update_settings",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
