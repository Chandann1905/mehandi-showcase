/**
 * Analytics event parameter types.
 */
export interface DesignViewEvent {
  design_id: string;
  design_title: string;
  category_id: string;
}

export interface BookingStartEvent {
  design_id?: string;
  package_id?: string;
  source: string;
}

export interface BookingSubmitEvent {
  booking_number: string;
  design_id?: string;
  package_id?: string;
}

export interface WhatsAppClickEvent {
  source: string;
  design_id?: string;
  booking_number?: string;
}

export interface SearchEvent {
  query: string;
  results_count: number;
}

export interface FavoriteEvent {
  design_id: string;
  action: "add" | "remove";
}

/**
 * Dashboard analytics summary.
 */
export interface AnalyticsSummary {
  total_designs: number;
  total_bookings: number;
  total_reviews: number;
  pending_reviews: number;
  new_bookings: number;
  whatsapp_clicks: number;
  conversion_rate: number;
  popular_designs: { id: string; title: string; views: number }[];
}
