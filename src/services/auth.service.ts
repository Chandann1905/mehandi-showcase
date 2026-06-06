import {
  signInWithEmail,
  signOut,
  trackEvent,
} from "@/lib/firebase";
import { adminRepository } from "@/repositories";
import { auditRepository } from "@/repositories/audit.repository";
import type { LoginCredentials } from "@/types/auth.types";
import type { OperationResult } from "@/types/common.types";

export class AuthService {
  /**
   * Login for admin users.
   */
  async login(credentials: LoginCredentials): Promise<OperationResult<{ uid: string }>> {
    try {
      const user = await signInWithEmail(credentials.email, credentials.password);
      
      // Verify admin role
      const isAdmin = await adminRepository.isAdmin(user.uid);
      
      if (!isAdmin) {
        await signOut();
        return { success: false, error: "Access denied. Admin privileges required." };
      }

      // Track login event
      trackEvent("admin_login").catch(console.error);

      // Audit log
      await auditRepository.create({
        admin_id: user.uid,
        admin_name: user.email || "Unknown",
        module: "auth",
        action: "login",
        entity_id: user.uid,
        entity_name: "Admin",
        old_data: {},
        new_data: {},
        ip_address: "unknown",
      });

      return { success: true, data: { uid: user.uid } };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Invalid email or password." };
    }
  }

  /**
   * Logout.
   */
  async logout(uid: string, email: string): Promise<void> {
    await signOut();
    
    trackEvent("admin_logout").catch(console.error);

    await auditRepository.create({
      admin_id: uid,
      admin_name: email,
      module: "auth",
      action: "logout",
      entity_id: uid,
      entity_name: "Admin",
      old_data: {},
      new_data: {},
      ip_address: "unknown",
    });
  }
}

export const authService = new AuthService();
