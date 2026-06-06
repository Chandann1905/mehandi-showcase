import type { BaseDocument } from "./common.types";

/**
 * Package document.
 * Per Database Spec §12.
 */
export interface Package extends BaseDocument {
  artist_id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  featured: boolean;
  sort_order: number;
  locale: string;
}

/**
 * Package card display.
 */
export interface PackageCard {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  featured: boolean;
}
