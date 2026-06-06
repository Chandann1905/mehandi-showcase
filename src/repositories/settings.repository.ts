import {
  fetchDocument,
  updateDocument,
  getDocRef,
  serverTimestamp,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { SiteSettings } from "@/types/settings.types";
import { DEFAULT_SETTINGS } from "@/types/settings.types";

/**
 * Repository for site-wide settings.
 * Settings is a single-document collection (id: "default").
 */
export class SettingsRepository {
  private readonly docId = "default";

  async get(): Promise<SiteSettings> {
    try {
      const snapshot = await fetchDocument(COLLECTIONS.SETTINGS, this.docId);
      if (!snapshot.exists()) return DEFAULT_SETTINGS;
      return { id: snapshot.id, ...snapshot.data() } as SiteSettings;
    } catch (error) {
      console.warn("Failed to fetch settings, using defaults.", error);
      return DEFAULT_SETTINGS;
    }
  }

  async update(
    data: Partial<SiteSettings>,
    userId: string
  ): Promise<void> {
    await updateDocument(COLLECTIONS.SETTINGS, this.docId, {
      ...data,
      updated_by: userId,
    } as DocumentData);
  }
}

export const settingsRepository = new SettingsRepository();
