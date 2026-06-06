import {
  fetchCollection,
  createDocument,
  updateDocument,
  where,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { SEOData, SEOEntityType } from "@/types/seo.types";

/**
 * Repository for SEO metadata.
 */
export class SEORepository {
  /**
   * Get SEO data for a specific entity.
   */
  async findByEntity(
    entityType: SEOEntityType,
    entityId: string
  ): Promise<SEOData | null> {
    const constraints = [
      where("entity_type", "==", entityType),
      where("entity_id", "==", entityId),
    ];

    const snapshot = await fetchCollection(COLLECTIONS.SEO, constraints);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0]!;
    return { id: doc.id, ...doc.data() } as SEOData;
  }

  /**
   * Create or update SEO data for an entity.
   */
  async upsert(data: Omit<SEOData, "id">): Promise<string> {
    const existing = await this.findByEntity(data.entity_type, data.entity_id);

    if (existing) {
      await updateDocument(COLLECTIONS.SEO, existing.id, data as DocumentData);
      return existing.id;
    }

    const ref = await createDocument(COLLECTIONS.SEO, data as DocumentData);
    return ref.id;
  }

  /**
   * Find all SEO entries for a given entity type.
   */
  async findByEntityType(entityType: SEOEntityType): Promise<SEOData[]> {
    const constraints = [where("entity_type", "==", entityType)];
    const snapshot = await fetchCollection(COLLECTIONS.SEO, constraints);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as SEOData
    );
  }
}

export const seoRepository = new SEORepository();
