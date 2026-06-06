import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Category } from "@/types/category.types";

/**
 * Repository for mehndi design categories.
 */
export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(COLLECTIONS.CATEGORIES);
  }

  /**
   * Find a category by slug.
   */
  async findBySlug(slug: string): Promise<Category | null> {
    return this.findByField("slug", slug);
  }

  /**
   * Find all categories sorted by display order.
   */
  async findAllSorted(): Promise<Category[]> {
    return this.findAll({
      orderBy: { field: "sort_order", direction: "asc" },
    });
  }

  /**
   * Update sort orders for multiple categories (drag-drop reorder).
   */
  async updateSortOrders(
    items: { id: string; sort_order: number }[],
    userId: string
  ): Promise<void> {
    const updates = items.map((item) =>
      this.update(
        item.id,
        { sort_order: item.sort_order } as Partial<Omit<Category, keyof import("@/types/common.types").BaseDocument>>,
        userId
      )
    );
    await Promise.all(updates);
  }
}

export const categoryRepository = new CategoryRepository();
