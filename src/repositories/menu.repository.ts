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
import type { MenuItem } from "@/types/menu.types";

/**
 * Repository for dynamic navigation menus.
 */
export class MenuRepository {
  /**
   * Get visible menu items sorted by order.
   */
  async findVisible(): Promise<MenuItem[]> {
    const constraints = [
      where("visible", "==", true),
      orderBy("sort_order", "asc"),
    ];

    const snapshot = await fetchCollection(COLLECTIONS.MENUS, constraints);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as MenuItem
    );
  }

  /**
   * Get all menu items (admin view).
   */
  async findAll(): Promise<MenuItem[]> {
    const constraints = [orderBy("sort_order", "asc")];
    const snapshot = await fetchCollection(COLLECTIONS.MENUS, constraints);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as MenuItem
    );
  }

  async create(data: Omit<MenuItem, "id">): Promise<string> {
    const ref = await createDocument(COLLECTIONS.MENUS, data as DocumentData);
    return ref.id;
  }

  async update(id: string, data: Partial<MenuItem>): Promise<void> {
    await updateDocument(COLLECTIONS.MENUS, id, data as DocumentData);
  }

  async delete(id: string): Promise<void> {
    await softDeleteDocument(COLLECTIONS.MENUS, id);
  }

  async updateSortOrders(
    items: { id: string; sort_order: number }[]
  ): Promise<void> {
    const updates = items.map((item) =>
      updateDocument(COLLECTIONS.MENUS, item.id, {
        sort_order: item.sort_order,
      })
    );
    await Promise.all(updates);
  }
}

export const menuRepository = new MenuRepository();
