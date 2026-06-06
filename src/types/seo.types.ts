/**
 * SEO entity types.
 * Per Database Spec §24.
 */
export type SEOEntityType =
  | "home"
  | "page"
  | "design"
  | "package"
  | "category"
  | "collection";

/**
 * SEO metadata document.
 * Per Database Spec §24.
 */
export interface SEOData {
  id: string;
  entity_type: SEOEntityType;
  entity_id: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image: string;
  keywords?: string[];
}

/**
 * Structured data schema types.
 * Per TRD §23.
 */
export type StructuredDataType =
  | "LocalBusiness"
  | "FAQ"
  | "Review"
  | "Breadcrumb"
  | "ImageObject";
