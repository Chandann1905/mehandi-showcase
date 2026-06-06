import type { BaseDocument } from "./common.types";

/**
 * Category document.
 * Per Database Spec §8.
 */
export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon: string;
  sort_order: number;
  locale: string;
  design_count?: number;
}

/**
 * Category card display.
 */
export interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  icon: string;
  design_count: number;
}
