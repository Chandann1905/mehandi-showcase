import { pageRepository } from "@/repositories/page.repository";
import type { Page } from "@/types/page.types";

export class PageService {
  async getPage(slug: string): Promise<Page | null> {
    return pageRepository.findBySlug(slug);
  }

  async getPages(): Promise<Page[]> {
    return pageRepository.findAllAdmin({
      orderBy: { field: "created_at", direction: "desc" },
    });
  }

  async getPageById(id: string): Promise<Page | null> {
    return pageRepository.findById(id);
  }

  async createPage(data: any, adminId: string, adminName: string): Promise<string> {
    const payload = {
      ...data,
      locale: "en",
    };
    const id = await pageRepository.create(payload, adminId);
    
    // Audit log
    const { auditRepository } = await import("@/repositories/audit.repository");
    await auditRepository.create({
      admin_id: adminId,
      admin_name: adminName,
      module: "pages",
      action: "create",
      entity_id: id,
      entity_name: data.title,
      old_data: {},
      new_data: payload,
      ip_address: "unknown",
    });

    return id;
  }

  async updatePage(
    id: string,
    data: Partial<Page>,
    adminId: string,
    adminName: string
  ): Promise<import("@/types/common.types").OperationResult> {
    try {
      await pageRepository.update(id, data, adminId);

      const { auditRepository } = await import("@/repositories/audit.repository");
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "pages",
        action: "update",
        entity_id: id,
        entity_name: data.title || "Page",
        old_data: {},
        new_data: data,
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to update page:", error);
      return { success: false, error: "Failed to update page." };
    }
  }

  async deletePage(id: string, adminId: string, adminName: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      await pageRepository.softDelete(id);

      const { auditRepository } = await import("@/repositories/audit.repository");
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "pages",
        action: "delete",
        entity_id: id,
        entity_name: "Page",
        old_data: {},
        new_data: { deleted: true },
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to delete page:", error);
      return { success: false, error: "Failed to delete page." };
    }
  }
}

export const pageService = new PageService();
