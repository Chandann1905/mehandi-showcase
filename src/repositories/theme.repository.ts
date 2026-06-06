import {
  fetchDocument,
  updateDocument,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { ThemeConfig } from "@/types/theme.types";
import { DEFAULT_THEME } from "@/types/theme.types";

/**
 * Repository for theme configuration.
 * Theme is a single-document collection (id: "default").
 */
export class ThemeRepository {
  private readonly docId = "default";

  async get(): Promise<ThemeConfig> {
    try {
      const snapshot = await fetchDocument(COLLECTIONS.THEME, this.docId);
      if (!snapshot.exists()) return DEFAULT_THEME;
      return { id: snapshot.id, ...snapshot.data() } as ThemeConfig;
    } catch (error) {
      console.warn("Failed to fetch theme, using defaults.", error);
      return DEFAULT_THEME;
    }
  }

  async update(
    data: Partial<ThemeConfig>,
    userId: string
  ): Promise<void> {
    await updateDocument(COLLECTIONS.THEME, this.docId, {
      ...data,
      updated_by: userId,
    } as DocumentData);
  }
}

export const themeRepository = new ThemeRepository();
