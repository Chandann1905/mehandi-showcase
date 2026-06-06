import {
  fetchCollection,
  createDocument,
  updateDocument,
  softDeleteDocument,
  where,
  orderBy,
  type DocumentData,
  type QueryConstraint,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { MediaFile, MediaFilters } from "@/types/media.types";

/**
 * Repository for media library.
 */
export class MediaRepository {
  /**
   * Get all media files.
   */
  async findAll(filters?: MediaFilters): Promise<MediaFile[]> {
    const constraints: QueryConstraint[] = [orderBy("created_at", "desc")];

    if (filters?.folder) {
      constraints.unshift(where("folder", "==", filters.folder));
    }

    const snapshot = await fetchCollection(COLLECTIONS.MEDIA, constraints);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as MediaFile
    );
  }

  /**
   * Create a media record.
   */
  async create(data: Omit<MediaFile, "id" | "created_at">): Promise<string> {
    const ref = await createDocument(COLLECTIONS.MEDIA, data as DocumentData);
    return ref.id;
  }

  /**
   * Update media metadata.
   */
  async update(id: string, data: Partial<MediaFile>): Promise<void> {
    await updateDocument(COLLECTIONS.MEDIA, id, data as DocumentData);
  }

  /**
   * Delete a media record.
   */
  async delete(id: string): Promise<void> {
    await softDeleteDocument(COLLECTIONS.MEDIA, id);
  }
}

export const mediaRepository = new MediaRepository();
