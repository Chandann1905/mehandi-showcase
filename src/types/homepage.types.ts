/**
 * Homepage section types.
 * Per Database Spec §19.
 */
export type HomepageSectionType =
  | "hero"
  | "categories"
  | "featured_designs"
  | "collections"
  | "packages"
  | "reviews"
  | "faq"
  | "cta"
  | "contact";

/**
 * Homepage section document.
 */
export interface HomepageSection {
  id: string;
  section_type: HomepageSectionType;
  enabled: boolean;
  sort_order: number;
  config: HomepageSectionConfig;
}

/**
 * Section-specific configuration.
 */
export interface HomepageSectionConfig {
  title?: string;
  subtitle?: string;
  background_image?: string;
  cta_text?: string;
  cta_url?: string;
  items_count?: number;
  show_view_all?: boolean;
  custom_data?: Record<string, string>;
}

/**
 * FAQ item within the FAQ section.
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}
