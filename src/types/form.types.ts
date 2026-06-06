import type { Timestamp } from "firebase/firestore";
import type { BaseDocument } from "./common.types";

/**
 * Form field types.
 * Per Admin Spec §16.
 */
export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "select"
  | "checkbox"
  | "file";

/**
 * Dynamic form field definition.
 */
export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder: string;
  options?: string[];
  sort_order: number;
}

/**
 * Form document.
 * Per Database Spec §21.
 */
export interface Form extends BaseDocument {
  title: string;
  slug: string;
  fields: FormField[];
}

/**
 * Form submission document.
 * Per Database Spec §22.
 */
export interface FormSubmission {
  id: string;
  form_id: string;
  data: Record<string, string | number | boolean>;
  submitted_at: Timestamp;
}
