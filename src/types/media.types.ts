import type { Timestamp } from "firebase/firestore";

/**
 * Media file document.
 * Per Database Spec §23.
 */
export interface MediaFile {
  id: string;
  file_name: string;
  file_url: string;
  thumbnail_url: string;
  folder: string;
  size: number;
  mime_type: string;
  alt_text: string;
  uploaded_by: string;
  created_at: Timestamp;
}

/**
 * Media upload input.
 */
export interface MediaUploadInput {
  file: File;
  folder: string;
  alt_text?: string;
}

/**
 * Media library filters.
 */
export interface MediaFilters {
  search?: string;
  folder?: string;
  mime_type?: string;
}
