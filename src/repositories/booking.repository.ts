import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import {
  fetchCollection,
  createDocument,
  where,
  orderBy,
  type DocumentData,
} from "@/lib/firebase/firestore";
import type { Booking, BookingNote, BookingStatus } from "@/types/booking.types";

/**
 * Repository for booking/lead management.
 */
export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super(COLLECTIONS.BOOKINGS);
  }

  /**
   * Find a booking by its booking number.
   */
  async findByBookingNumber(bookingNumber: string): Promise<Booking | null> {
    return this.findByField("booking_number", bookingNumber);
  }

  /**
   * Find bookings by status.
   */
  async findByStatus(status: BookingStatus): Promise<Booking[]> {
    return this.findAllAdmin({
      filters: [{ field: "status", operator: "==", value: status }],
      orderBy: { field: "created_at", direction: "desc" },
    });
  }

  /**
   * Update booking status.
   */
  async updateStatus(
    bookingId: string,
    status: BookingStatus,
    userId: string
  ): Promise<void> {
    await this.update(
      bookingId,
      { status } as Partial<Omit<Booking, keyof import("@/types/common.types").BaseDocument>>,
      userId
    );
  }

  /**
   * Get notes for a booking.
   */
  async getNotes(bookingId: string): Promise<BookingNote[]> {
    const constraints = [
      where("booking_id", "==", bookingId),
      orderBy("created_at", "asc"),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.BOOKING_NOTES,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as BookingNote
    );
  }

  /**
   * Add an internal note to a booking.
   */
  async addNote(
    bookingId: string,
    adminId: string,
    adminName: string,
    note: string
  ): Promise<string> {
    const noteData: DocumentData = {
      booking_id: bookingId,
      admin_id: adminId,
      admin_name: adminName,
      note,
    };

    const ref = await createDocument(COLLECTIONS.BOOKING_NOTES, noteData);
    return ref.id;
  }

  /**
   * Generate the next booking number.
   * Format: BK-YYYYMMDD-XXXX
   */
  async generateBookingNumber(): Promise<string> {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const prefix = `BK-${dateStr}`;

    const todayBookings = await this.findAllAdmin({
      filters: [
        {
          field: "booking_number",
          operator: ">=",
          value: prefix,
        },
        {
          field: "booking_number",
          operator: "<=",
          value: `${prefix}\uf8ff`,
        },
      ],
    });

    const nextNum = todayBookings.length + 1;
    const padded = String(nextNum).padStart(4, "0");
    return `${prefix}-${padded}`;
  }
}

export const bookingRepository = new BookingRepository();
