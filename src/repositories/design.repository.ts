import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Design } from "@/types/design.types";
import type { QueryFilter } from "@/types/common.types";

/**
 * Repository for mehndi design documents.
 * Per TRD §14.
 */
export class DesignRepository extends BaseRepository<Design> {
  constructor() {
    super(COLLECTIONS.DESIGNS);
  }

  /**
   * Find a design by its URL slug.
   */
  async findBySlug(slug: string): Promise<Design | null> {
    return this.findByField("slug", slug);
  }

  /**
   * Find featured designs.
   */
  async findFeatured(limitCount = 8): Promise<Design[]> {
    return this.findAll({
      filters: [{ field: "featured", operator: "==", value: true }],
      orderBy: { field: "created_at", direction: "desc" },
      limit: limitCount,
    });
  }

  /**
   * Find designs by category.
   */
  async findByCategory(categoryId: string): Promise<Design[]> {
    return this.findAll({
      filters: [{ field: "category_id", operator: "==", value: categoryId }],
      orderBy: { field: "created_at", direction: "desc" },
    });
  }

  /**
   * Find designs by collection.
   */
  async findByCollection(collectionId: string): Promise<Design[]> {
    return this.findAll({
      filters: [
        {
          field: "collection_ids",
          operator: "array-contains",
          value: collectionId,
        },
      ],
      orderBy: { field: "created_at", direction: "desc" },
    });
  }

  /**
   * Find most viewed designs.
   */
  async findPopular(limitCount = 10): Promise<Design[]> {
    return this.findAll({
      orderBy: { field: "view_count", direction: "desc" },
      limit: limitCount,
    });
  }

  /**
   * Increment the view count for a design.
   */
  async incrementViewCount(designId: string): Promise<void> {
    const design = await this.findById(designId);
    if (design) {
      await this.update(
        designId,
        { view_count: design.view_count + 1 } as Partial<Omit<Design, keyof import("@/types/common.types").BaseDocument>>,
        "system"
      );
    }
  }

  /**
   * Increment the favorite count for a design.
   */
  async incrementFavoriteCount(designId: string, delta: number): Promise<void> {
    const design = await this.findById(designId);
    if (design) {
      await this.update(
        designId,
        {
          favorite_count: Math.max(0, design.favorite_count + delta),
        } as Partial<Omit<Design, keyof import("@/types/common.types").BaseDocument>>,
        "system"
      );
    }
  }

  /**
   * Toggle featured status.
   */
  async toggleFeatured(
    designId: string,
    featured: boolean,
    userId: string
  ): Promise<void> {
    await this.update(designId, { featured } as Partial<Omit<Design, keyof import("@/types/common.types").BaseDocument>>, userId);
  }
}

export const designRepository = new DesignRepository();
