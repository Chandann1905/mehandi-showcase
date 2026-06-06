/**
 * Theme configuration document.
 * Per Database Spec §25 and Admin Spec §19.
 */
export interface ThemeConfig {
  id: string;
  primary_color: string;
  secondary_color: string;
  success_color: string;
  error_color: string;
  heading_font: string;
  body_font: string;
  border_radius: string;
  shadow_style: string;
  logo: string;
  logo_dark: string;
  favicon: string;
  updated_at: unknown;
}

/**
 * Default theme values (fallback when Firestore data not loaded).
 */
export const DEFAULT_THEME: ThemeConfig = {
  id: "default",
  primary_color: "#1B5E20",
  secondary_color: "#D4A017",
  success_color: "#16a34a",
  error_color: "#dc2626",
  heading_font: "Playfair Display",
  body_font: "Inter",
  border_radius: "12px",
  shadow_style: "medium",
  logo: "",
  logo_dark: "",
  favicon: "",
  updated_at: null,
};
