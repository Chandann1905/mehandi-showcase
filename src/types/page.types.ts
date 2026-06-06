import type { BaseDocument } from "./common.types";

/**
 * CMS Page document.
 * Per Database Spec §18.
 */
export interface Page extends BaseDocument {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  locale: string;
}
