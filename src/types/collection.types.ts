import type { BaseDocument } from "./common.types";

/**
 * Collection document (curated design groups).
 * Per Database Spec §9.
 */
export interface Collection extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  locale: string;
  design_count?: number;
}

/**
 * Collection card display.
 */
export interface CollectionCard {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  design_count: number;
}
