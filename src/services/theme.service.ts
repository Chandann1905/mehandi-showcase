import { themeRepository } from "@/repositories/theme.repository";
import type { ThemeConfig } from "@/types/theme.types";

export class ThemeService {
  async getTheme(): Promise<ThemeConfig> {
    return themeRepository.get();
  }

  async updateTheme(
    data: Partial<ThemeConfig>,
    adminId: string,
    adminName: string
  ): Promise<import("@/types/common.types").OperationResult> {
    try {
      await themeRepository.update(data, adminId);

      const { auditRepository } = await import("@/repositories/audit.repository");
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "theme",
        action: "update",
        entity_id: "global",
        entity_name: "Theme Settings",
        old_data: {},
        new_data: data as Record<string, unknown>,
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to update theme:", error);
      return { success: false, error: "Failed to update theme." };
    }
  }
}

export const themeService = new ThemeService();
