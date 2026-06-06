import { designRepository } from "@/repositories";
import { designImageRepository } from "@/repositories/design-image.repository";
import { auditRepository } from "@/repositories/audit.repository";
import { seoRepository } from "@/repositories/seo.repository";
import { trackEvent } from "@/lib/firebase";
import type { Design, DesignDetail, DesignFilters } from "@/types/design.types";
import type { PaginatedResult } from "@/types/common.types";

/**
 * Service for managing designs.
 * Enforces business logic, coordinates multiple repositories, and logs audits.
 */
export class DesignService {
  /**
   * Get a paginated list of active designs.
   */
  async getDesigns(
    filters: DesignFilters,
    pageSize: number,
    lastDocId?: string
  ): Promise<PaginatedResult<Design>> {
    const queryFilters: import("@/types/common.types").QueryFilter[] = [];

    if (filters.category_id) {
      queryFilters.push({ field: "category_id", operator: "==", value: filters.category_id });
    }
    if (filters.collection_id) {
      queryFilters.push({ field: "collection_ids", operator: "array-contains", value: filters.collection_id });
    }
    if (filters.featured !== undefined) {
      queryFilters.push({ field: "featured", operator: "==", value: filters.featured });
    }

    let orderBy = { field: "created_at", direction: "desc" as const };
    if (filters.sortBy === "popular") {
      orderBy = { field: "view_count", direction: "desc" as const };
    }

    // @ts-ignore
    return designRepository.findPaginated(pageSize, lastDocId, {
      filters: queryFilters,
      orderBy,
    });
  }

  /**
   * Get full design details including images and related designs.
   */
  async getDesignDetail(slug: string): Promise<DesignDetail | null> {
    const design = await designRepository.findBySlug(slug);
    if (!design) return null;

    // Fetch related images
    const images = await designImageRepository.findByDesign(design.id);

    // Track analytics (non-blocking)
    trackEvent("design_view", {
      design_id: design.id,
      design_title: design.title,
      category_id: design.category_id,
    }).catch(console.error);

    // Increment view count (non-blocking)
    designRepository.incrementViewCount(design.id).catch(console.error);

    // TODO: Fetch real category/collection names and related designs
    // For now, return stub data to satisfy the type
    return {
      ...design,
      images,
      category_name: "Category",
      collection_names: [],
      related_designs: [],
    };
  }

  /**
   * Create a new design (Admin only).
   */
  async createDesign(
    data: any,
    adminId: string = "admin-id",
    adminName: string = "Admin"
  ): Promise<string> {
    const id = await designRepository.create(data, adminId);

    // Audit log
    await auditRepository.create({
      admin_id: adminId,
      admin_name: adminName,
      module: "designs",
      action: "create",
      entity_id: id,
      entity_name: data.title,
      old_data: {},
      new_data: data,
      ip_address: "unknown",
    });

    return id;
  }

  async updateDesign(id: string, data: Partial<Design>): Promise<void> {
    await designRepository.update(id, data, "admin-id");
  }

  /**
   * Toggle favorite status for a design.
   */
  async toggleFavorite(designId: string, isFavoriting: boolean): Promise<void> {
    const delta = isFavoriting ? 1 : -1;
    await designRepository.incrementFavoriteCount(designId, delta);
    
    trackEvent(isFavoriting ? "favorite_add" : "favorite_remove", {
      design_id: designId,
    }).catch(console.error);
  }
}

export const designService = new DesignService();
