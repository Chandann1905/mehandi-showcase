import { Timestamp } from "firebase/firestore";
import { bookingRepository } from "@/repositories/booking.repository";
import { auditRepository } from "@/repositories/audit.repository";
import { trackEvent } from "@/lib/firebase";
import { BOOKING_STATUS_TRANSITIONS } from "@/types/booking.types";
import type { Booking, BookingFormInput, BookingStatus } from "@/types/booking.types";
import type { OperationResult } from "@/types/common.types";

/**
 * Service for booking management.
 * Enforces status transitions and analytics tracking.
 */
export class BookingService {
  /**
   * Submit a new booking from the public site.
   */
  async submitBooking(input: BookingFormInput): Promise<OperationResult<{ booking_number: string }>> {
    try {
      const bookingNumber = await bookingRepository.generateBookingNumber();
      
      const bookingData = {
        booking_number: bookingNumber,
        artist_id: "default", // MVP single artist
        customer_name: input.customer_name,
        mobile: input.mobile,
        // @ts-ignore - Need to convert string to Timestamp here in real impl
        event_date: Timestamp.fromDate(new Date(input.event_date)), 
        location: input.location || "",
        package_id: input.package_id || "",
        design_id: input.design_id || "",
        notes: input.notes || "",
        attachment: "", // Handle file upload separately and pass URL
        status: "new" as BookingStatus,
        source: "website" as const,
      };

      await bookingRepository.create(bookingData, "system");

      // Track conversion
      trackEvent("booking_submit", {
        booking_number: bookingNumber,
        package_id: input.package_id || "",
        design_id: input.design_id || "",
      }).catch(console.error);

      return {
        success: true,
        data: { booking_number: bookingNumber },
      };
    } catch (error) {
      console.error("Booking submission failed:", error);
      return {
        success: false,
        error: "Failed to submit booking. Please try again.",
      };
    }
  }

  /**
   * Update booking status (Admin only).
   */
  async updateStatus(
    bookingId: string,
    currentStatus: BookingStatus,
    newStatus: BookingStatus,
    adminId: string,
    adminName: string
  ): Promise<OperationResult> {
    // Validate transition
    const validNextStates = BOOKING_STATUS_TRANSITIONS[currentStatus];
    if (!validNextStates.includes(newStatus)) {
      return {
        success: false,
        error: `Invalid transition from ${currentStatus} to ${newStatus}`,
      };
    }

    try {
      await bookingRepository.updateStatus(bookingId, newStatus, adminId);

      // Add auto-note for status change
      await bookingRepository.addNote(
        bookingId,
        "system",
        "System",
        `Status changed from ${currentStatus} to ${newStatus} by ${adminName}`
      );

      // Audit log
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "bookings",
        action: "update",
        entity_id: bookingId,
        entity_name: `Booking`,
        old_data: { status: currentStatus },
        new_data: { status: newStatus },
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Status update failed:", error);
      return { success: false, error: "Failed to update booking status." };
    }
  }

  /**
   * Get paginated bookings (Admin).
   */
  async getBookings(filters?: any, limit?: number) {
    // In a real app we'd pass filters to repo
    return await bookingRepository.findAllAdmin({ limit });
  }

  /**
   * Simple status update for the client UI.
   */
  async updateBookingStatus(bookingId: string, newStatus: BookingStatus) {
    return await bookingRepository.updateStatus(bookingId, newStatus, "admin-system");
  }
}

export const bookingService = new BookingService();
