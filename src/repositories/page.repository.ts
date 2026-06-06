import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Page } from "@/types/page.types";

/**
 * Repository for CMS pages.
 */
export class PageRepository extends BaseRepository<Page> {
  constructor() {
    super(COLLECTIONS.PAGES);
  }

  async findBySlug(slug: string): Promise<Page | null> {
    return this.findByField("slug", slug);
  }

  async findPublished(): Promise<Page[]> {
    return this.findAll({
      filters: [{ field: "published", operator: "==", value: true }],
      orderBy: { field: "created_at", direction: "desc" },
    });
  }
}

export const pageRepository = new PageRepository();
