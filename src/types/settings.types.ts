/**
 * Site settings document.
 * Per Database Spec §26 and Admin Spec §20.
 */
export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  google_maps_url: string;
  instagram: string;
  facebook: string;
  youtube: string;
  whatsapp_message_template: string;
  booking_confirmation_message: string;
  updated_at: unknown;
}

/**
 * Default settings (fallback).
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  id: "default",
  site_name: "Creative Mehandi Art",
  tagline: "Premium Mehndi Designs & Booking",
  phone: "",
  email: "",
  whatsapp: "",
  address: "",
  google_maps_url: "",
  instagram: "",
  facebook: "",
  youtube: "",
  whatsapp_message_template:
    "Hi! I'm {{customer_name}}. I'd like to book mehndi for {{event_date}}. My booking number is {{booking_number}}.",
  booking_confirmation_message:
    "Thank you for your booking! We'll contact you shortly.",
  updated_at: null,
};
