import {
  getCollection,
  getDocRef,
  fetchDocument,
  fetchCollection,
  createDocument,
  updateDocument,
  softDeleteDocument,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type DocumentData,
  type QueryConstraint,
} from "@/lib/firebase/firestore";
import type {
  BaseDocument,
  PaginatedResult,
  QueryOptions,
  QueryFilter,
} from "@/types/common.types";

/**
 * Generic base repository providing CRUD operations for any Firestore collection.
 * All domain repositories extend this class.
 *
 * Per TRD §14: All database access goes through repositories.
 * Per DB Spec §30: Soft deletes by default.
 */
export class BaseRepository<T extends BaseDocument> {
  constructor(protected readonly collectionName: string) {}

  /**
   * Find a single document by ID.
   */
  async findById(id: string): Promise<T | null> {
    const snapshot = await fetchDocument(this.collectionName, id);
    if (!snapshot.exists()) return null;

    const data = snapshot.data() as DocumentData;
    return { id: snapshot.id, ...data } as T;
  }

  /**
   * Find a single document matching a field value.
   */
  async findByField(field: string, value: unknown): Promise<T | null> {
    const constraints: QueryConstraint[] = [
      where(field, "==", value),
      where("deleted", "==", false),
      limit(1),
    ];

    const snapshot = await fetchCollection(this.collectionName, constraints);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0]!;
    return { id: doc.id, ...doc.data() } as T;
  }

  /**
   * Find all active, non-deleted documents with optional query options.
   */
  async findAll(options?: QueryOptions): Promise<T[]> {
    const constraints = this.buildConstraints({
      ...options,
      filters: [
        { field: "deleted", operator: "==", value: false },
        { field: "active", operator: "==", value: true },
        ...(options?.filters ?? []),
      ],
    });

    const snapshot = await fetchCollection(this.collectionName, constraints);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
  }

  /**
   * Find all documents (including inactive) for admin views.
   */
  async findAllAdmin(options?: QueryOptions): Promise<T[]> {
    const constraints = this.buildConstraints({
      ...options,
      filters: [
        { field: "deleted", operator: "==", value: false },
        ...(options?.filters ?? []),
      ],
    });

    const snapshot = await fetchCollection(this.collectionName, constraints);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
  }

  /**
   * Find documents with cursor-based pagination (for infinite scroll).
   */
  async findPaginated(
    pageSize: number,
    lastDocId?: string | null,
    options?: QueryOptions
  ): Promise<PaginatedResult<T>> {
    const constraints = this.buildConstraints({
      ...options,
      filters: [
        { field: "deleted", operator: "==", value: false },
        { field: "active", operator: "==", value: true },
        ...(options?.filters ?? []),
      ],
      limit: pageSize + 1,
    });

    if (lastDocId) {
      const lastDoc = await fetchDocument(this.collectionName, lastDocId);
      if (lastDoc.exists()) {
        constraints.push(startAfter(lastDoc));
      }
    }

    const snapshot = await fetchCollection(this.collectionName, constraints);
    const docs = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as T
    );

    const hasMore = docs.length > pageSize;
    const items = hasMore ? docs.slice(0, pageSize) : docs;
    const newLastDocId = items.length > 0 ? items[items.length - 1]!.id : null;

    return {
      items,
      hasMore,
      lastDocId: newLastDocId,
    };
  }

  /**
   * Create a new document.
   */
  async create(
    data: Omit<T, keyof BaseDocument>,
    userId: string
  ): Promise<string> {
    const docData = {
      ...data,
      active: true,
      created_by: userId,
      updated_by: userId,
    } as DocumentData;

    const ref = await createDocument(this.collectionName, docData);
    return ref.id;
  }

  /**
   * Update an existing document.
   */
  async update(
    id: string,
    data: Partial<Omit<T, keyof BaseDocument>>,
    userId: string
  ): Promise<void> {
    await updateDocument(this.collectionName, id, {
      ...data,
      updated_by: userId,
    } as DocumentData);
  }

  /**
   * Soft delete a document (sets deleted: true).
   * Per DB Spec §30: Never permanently delete content.
   */
  async softDelete(id: string): Promise<void> {
    await softDeleteDocument(this.collectionName, id);
  }

  /**
   * Toggle the active status of a document.
   */
  async toggleActive(id: string, active: boolean, userId: string): Promise<void> {
    await updateDocument(this.collectionName, id, {
      active,
      updated_by: userId,
    });
  }

  /**
   * Count documents matching criteria.
   */
  async count(filters?: QueryFilter[]): Promise<number> {
    const constraints = this.buildConstraints({
      filters: [
        { field: "deleted", operator: "==", value: false },
        ...(filters ?? []),
      ],
    });

    const snapshot = await fetchCollection(this.collectionName, constraints);
    return snapshot.size;
  }

  /**
   * Build Firestore query constraints from QueryOptions.
   */
  protected buildConstraints(options?: QueryOptions): QueryConstraint[] {
    const constraints: QueryConstraint[] = [];

    if (options?.filters) {
      for (const filter of options.filters) {
        constraints.push(where(filter.field, filter.operator, filter.value));
      }
    }

    if (options?.orderBy) {
      constraints.push(
        orderBy(options.orderBy.field, options.orderBy.direction)
      );
    }

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    return constraints;
  }
}
