import { seoRepository } from "@/repositories/seo.repository";
import type { SEOData, SEOEntityType } from "@/types/seo.types";

export class SEOService {
  async getSEOData(entityType: SEOEntityType, entityId: string): Promise<SEOData | null> {
    return seoRepository.findByEntity(entityType, entityId);
  }

  async updateSEOData(
    entityType: SEOEntityType,
    entityId: string,
    data: Partial<SEOData>,
    adminId: string,
    adminName: string
  ): Promise<import("@/types/common.types").OperationResult> {
    try {
      const existing = await this.getSEOData(entityType, entityId);
      
      const payload: Omit<SEOData, "id"> = {
        ...existing,
        ...data,
        entity_type: entityType,
        entity_id: entityId,
      } as any;
      
      await seoRepository.upsert(payload);

      const { auditRepository } = await import("@/repositories/audit.repository");
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "seo",
        action: "update",
        entity_id: entityId,
        entity_name: `SEO Data (${entityType})`,
        old_data: (existing as unknown as Record<string, unknown>) || {},
        new_data: data as Record<string, unknown>,
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to update SEO data:", error);
      return { success: false, error: "Failed to update SEO data." };
    }
  }
}

export const seoService = new SEOService();
