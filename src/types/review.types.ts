import type { Timestamp } from "firebase/firestore";
import type { BaseDocument } from "./common.types";

/**
 * Review status.
 * Per Database Spec §15.
 */
export type ReviewStatus = "pending" | "approved" | "rejected";

/**
 * Review document.
 * Per Database Spec §15.
 */
export interface Review extends BaseDocument {
  artist_id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  images: string[];
  verified: boolean;
  featured: boolean;
  status: ReviewStatus;
  locale: string;
}

/**
 * Review form input (visitor-facing).
 */
export interface ReviewFormInput {
  customer_name: string;
  rating: number;
  review_text: string;
  images?: File[];
}

/**
 * Review card display.
 */
export interface ReviewCard {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  images: string[];
  verified: boolean;
  featured: boolean;
  created_at: Timestamp;
}
