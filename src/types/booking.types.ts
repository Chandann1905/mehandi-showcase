import type { Timestamp } from "firebase/firestore";
import type { BaseDocument } from "./common.types";

/**
 * Booking status workflow.
 * Per Database Spec §13 and App Flow §25.
 */
export type BookingStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled";

/**
 * Booking document.
 * Per Database Spec §13.
 */
export interface Booking extends BaseDocument {
  booking_number: string;
  artist_id: string;
  customer_name: string;
  mobile: string;
  event_date: Timestamp;
  location: string;
  package_id: string;
  design_id: string;
  notes: string;
  attachment: string;
  status: BookingStatus;
  source: BookingSource;
}

/**
 * Booking source tracking.
 */
export type BookingSource = "website" | "whatsapp" | "direct" | "referral";

/**
 * Booking note (internal admin communication).
 * Per Database Spec §14.
 */
export interface BookingNote {
  id: string;
  booking_id: string;
  admin_id: string;
  admin_name: string;
  note: string;
  created_at: Timestamp;
}

/**
 * Booking form input (visitor-facing).
 */
export interface BookingFormInput {
  customer_name: string;
  mobile: string;
  event_date: string;
  location?: string;
  notes?: string;
  attachment?: File;
  design_id?: string;
  package_id?: string;
}

/**
 * Booking list item for admin table.
 */
export interface BookingListItem {
  id: string;
  booking_number: string;
  customer_name: string;
  mobile: string;
  event_date: Timestamp;
  package_title: string;
  status: BookingStatus;
  created_at: Timestamp;
}

/**
 * Booking detail for admin view.
 */
export interface BookingDetail extends Booking {
  notes_list: BookingNote[];
  design_title: string;
  package_title: string;
}

/**
 * Valid status transitions for booking workflow.
 */
export const BOOKING_STATUS_TRANSITIONS: Record<
  BookingStatus,
  BookingStatus[]
> = {
  new: ["contacted", "cancelled"],
  contacted: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/**
 * Booking status display configuration.
 */
export const BOOKING_STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string }
> = {
  new: { label: "New", color: "info" },
  contacted: { label: "Contacted", color: "warning" },
  confirmed: { label: "Confirmed", color: "success" },
  completed: { label: "Completed", color: "success" },
  cancelled: { label: "Cancelled", color: "destructive" },
};
