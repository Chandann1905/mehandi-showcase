import {
  fetchDocument,
  fetchCollection,
  where,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Admin, AdminRole } from "@/types/auth.types";

/**
 * Repository for admin user management.
 */
export class AdminRepository {
  /**
   * Find admin by Firebase UID.
   */
  async findByUid(uid: string): Promise<Admin | null> {
    const snapshot = await fetchDocument(COLLECTIONS.ADMINS, uid);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Admin;
  }

  /**
   * Get the role for a given admin UID.
   */
  async getRole(uid: string): Promise<AdminRole | null> {
    const admin = await this.findByUid(uid);
    if (!admin || !admin.active) return null;
    return admin.role_id;
  }

  /**
   * Check if a user is an admin.
   */
  async isAdmin(uid: string): Promise<boolean> {
    const admin = await this.findByUid(uid);
    return admin !== null && admin.active;
  }

  /**
   * Get dashboard statistics (Placeholder for now, usually aggregates or specific stats document)
   */
  async getDashboardStats() {
    return {
      totalBookings: 124,
      newBookingsThisWeek: 12,
      totalDesigns: 45,
      totalCategories: 6,
      pendingReviews: 3,
      totalRevenue: 245000,
    };
  }
}

export const adminRepository = new AdminRepository();
