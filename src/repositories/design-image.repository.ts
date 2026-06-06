import {
  fetchCollection,
  createDocument,
  where,
  orderBy,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { DesignImage } from "@/types/design.types";

/**
 * Repository for design images (separate collection).
 */
export class DesignImageRepository {
  /**
   * Get all images for a design, sorted by order.
   */
  async findByDesign(designId: string): Promise<DesignImage[]> {
    const constraints = [
      where("design_id", "==", designId),
      orderBy("sort_order", "asc"),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.DESIGN_IMAGES,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as DesignImage
    );
  }

  /**
   * Add an image to a design.
   */
  async create(data: Omit<DesignImage, "id" | "created_at">): Promise<string> {
    const ref = await createDocument(
      COLLECTIONS.DESIGN_IMAGES,
      data as DocumentData
    );
    return ref.id;
  }

  /**
   * Update sort orders for images (drag-drop reorder).
   */
  async updateSortOrders(
    items: { id: string; sort_order: number }[]
  ): Promise<void> {
    const { updateDocument } = await import("@/lib/firebase/firestore");
    const updates = items.map((item) =>
      updateDocument(COLLECTIONS.DESIGN_IMAGES, item.id, {
        sort_order: item.sort_order,
      })
    );
    await Promise.all(updates);
  }
}

export const designImageRepository = new DesignImageRepository();
