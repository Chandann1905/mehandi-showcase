import {
  fetchCollection,
  createDocument,
  updateDocument,
  softDeleteDocument,
  where,
  orderBy,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { HomepageSection } from "@/types/homepage.types";

/**
 * Repository for dynamic homepage sections.
 */
export class HomepageRepository {
  /**
   * Get all enabled sections sorted by order.
   */
  async findEnabled(): Promise<HomepageSection[]> {
    const constraints = [
      where("enabled", "==", true),
      orderBy("sort_order", "asc"),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.HOMEPAGE_SECTIONS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as HomepageSection
    );
  }

  /**
   * Get all sections (admin view).
   */
  async findAll(): Promise<HomepageSection[]> {
    const constraints = [orderBy("sort_order", "asc")];
    const snapshot = await fetchCollection(
      COLLECTIONS.HOMEPAGE_SECTIONS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as HomepageSection
    );
  }

  /**
   * Create a homepage section.
   */
  async create(data: Omit<HomepageSection, "id">): Promise<string> {
    const ref = await createDocument(
      COLLECTIONS.HOMEPAGE_SECTIONS,
      data as DocumentData
    );
    return ref.id;
  }

  /**
   * Update a section.
   */
  async update(
    id: string,
    data: Partial<HomepageSection>
  ): Promise<void> {
    await updateDocument(
      COLLECTIONS.HOMEPAGE_SECTIONS,
      id,
      data as DocumentData
    );
  }

  /**
   * Delete a section.
   */
  async delete(id: string): Promise<void> {
    await softDeleteDocument(COLLECTIONS.HOMEPAGE_SECTIONS, id);
  }

  /**
   * Update sort orders for reordering.
   */
  async updateSortOrders(
    items: { id: string; sort_order: number }[]
  ): Promise<void> {
    const updates = items.map((item) =>
      updateDocument(COLLECTIONS.HOMEPAGE_SECTIONS, item.id, {
        sort_order: item.sort_order,
      })
    );
    await Promise.all(updates);
  }
}

export const homepageRepository = new HomepageRepository();
