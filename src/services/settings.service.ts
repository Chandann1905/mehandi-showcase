import { settingsRepository } from "@/repositories/settings.repository";
import type { SiteSettings } from "@/types/settings.types";

export class SettingsService {
  async getSettings(): Promise<SiteSettings> {
    return settingsRepository.get();
  }

  async updateSettings(
    data: Partial<SiteSettings>,
    adminId: string,
    adminName: string
  ): Promise<import("@/types/common.types").OperationResult> {
    try {
      await settingsRepository.update(data, adminId);

      const { auditRepository } = await import("@/repositories/audit.repository");
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "settings",
        action: "update",
        entity_id: "global",
        entity_name: "Site Settings",
        old_data: {},
        new_data: data as Record<string, unknown>,
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to update settings:", error);
      return { success: false, error: "Failed to update settings." };
    }
  }
}

export const settingsService = new SettingsService();
