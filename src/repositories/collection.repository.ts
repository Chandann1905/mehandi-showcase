import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Collection } from "@/types/collection.types";

/**
 * Repository for curated design collections.
 */
export class CollectionRepository extends BaseRepository<Collection> {
  constructor() {
    super(COLLECTIONS.COLLECTIONS);
  }

  async findBySlug(slug: string): Promise<Collection | null> {
    return this.findByField("slug", slug);
  }

  async findAllSorted(): Promise<Collection[]> {
    return this.findAll({
      orderBy: { field: "sort_order", direction: "asc" },
    });
  }
}

export const collectionRepository = new CollectionRepository();
