import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Package } from "@/types/package.types";

/**
 * Repository for service packages.
 */
export class PackageRepository extends BaseRepository<Package> {
  constructor() {
    super(COLLECTIONS.PACKAGES);
  }

  async findAllSorted(): Promise<Package[]> {
    return this.findAll({
      orderBy: { field: "sort_order", direction: "asc" },
    });
  }

  async findFeatured(): Promise<Package[]> {
    return this.findAll({
      filters: [{ field: "featured", operator: "==", value: true }],
      orderBy: { field: "sort_order", direction: "asc" },
    });
  }
}

export const packageRepository = new PackageRepository();
