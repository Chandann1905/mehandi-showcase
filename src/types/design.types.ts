import type { BaseDocument } from "./common.types";

/**
 * Design document.
 * Per Database Spec §10.
 */
export interface Design extends BaseDocument {
  artist_id: string;
  city_id: string;
  category_id: string;
  collection_ids: string[];
  title: string;
  slug: string;
  description: string;
  tags: string[];
  featured: boolean;
  difficulty: DesignDifficulty;
  estimated_time: string;
  price_range: string;
  favorite_count: number;
  view_count: number;
  locale: string;
  thumbnail_url?: string;
}

/**
 * Design difficulty levels.
 */
export type DesignDifficulty = "easy" | "medium" | "hard" | "expert";

/**
 * Design image document.
 * Per Database Spec §11.
 */
export interface DesignImage {
  id: string;
  design_id: string;
  image_url: string;
  thumbnail_url: string;
  alt_text: string;
  sort_order: number;
  created_at: unknown;
}

/**
 * Design card display (for gallery grid).
 */
export interface DesignCard {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category_name: string;
  thumbnail_url: string;
  featured: boolean;
  favorite_count: number;
}

/**
 * Design detail display (for detail page).
 */
export interface DesignDetail extends Design {
  images: DesignImage[];
  category_name: string;
  collection_names: string[];
  related_designs: DesignCard[];
}

/**
 * Design search/filter parameters.
 */
export interface DesignFilters {
  search?: string;
  category_id?: string;
  collection_id?: string;
  tags?: string[];
  featured?: boolean;
  difficulty?: DesignDifficulty;
  sortBy?: "newest" | "popular" | "name";
}
