/**
 * Firebase Storage path constants.
 * All uploads must use these paths — never hardcode storage paths elsewhere.
 */
export const STORAGE_PATHS = {
  DESIGNS: "designs",
  REVIEWS: "reviews",
  CATEGORIES: "categories",
  HERO: "hero",
  PAGES: "pages",
  UPLOADS: "uploads",
  LOGOS: "logos",
  FAVICONS: "favicons",
  MEDIA: "media",
} as const;

/**
 * Upload size limits in bytes.
 * Per Firebase Spec §11.
 */
export const UPLOAD_LIMITS = {
  DESIGN_IMAGE: 10 * 1024 * 1024,   // 10 MB
  REVIEW_IMAGE: 5 * 1024 * 1024,    // 5 MB
  ATTACHMENT: 10 * 1024 * 1024,     // 10 MB
  LOGO: 2 * 1024 * 1024,            // 2 MB
  FAVICON: 512 * 1024,              // 512 KB
} as const;

/**
 * Allowed file types for uploads.
 */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export type StoragePath = (typeof STORAGE_PATHS)[keyof typeof STORAGE_PATHS];
