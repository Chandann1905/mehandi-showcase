import { adminRepository } from "@/repositories/admin.repository";
import type { Admin, AdminRole } from "@/types/auth.types";

export class AdminService {
  async getAdmin(uid: string): Promise<Admin | null> {
    return adminRepository.findByUid(uid);
  }

  async getRole(uid: string): Promise<AdminRole | null> {
    return adminRepository.getRole(uid);
  }
}

export const adminService = new AdminService();
