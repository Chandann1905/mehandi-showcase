import { mediaRepository } from "@/repositories/media.repository";
import { uploadFile, deleteFile } from "@/lib/firebase";
import type { MediaFile, MediaUploadInput } from "@/types/media.types";
import type { OperationResult } from "@/types/common.types";

export class MediaService {
  async uploadMedia(
    input: MediaUploadInput,
    adminId: string
  ): Promise<OperationResult<{ id: string; url: string }>> {
    try {
      const path = `media/${input.folder}/${input.file.name}`;
      const { getUrl } = uploadFile(path, input.file);
      const url = await getUrl();

      const mediaData: Omit<MediaFile, "id" | "created_at"> = {
        file_name: input.file.name,
        file_url: url,
        thumbnail_url: url, // Assuming image for now
        folder: input.folder,
        size: input.file.size,
        mime_type: input.file.type,
        alt_text: input.alt_text || "",
        uploaded_by: adminId,
      };

      const id = await mediaRepository.create(mediaData);

      return { success: true, data: { id, url } };
    } catch (error) {
      console.error("Media upload failed:", error);
      return { success: false, error: "Failed to upload media." };
    }
  }

  async deleteMedia(mediaId: string, filePath: string): Promise<OperationResult> {
    try {
      await deleteFile(filePath);
      await mediaRepository.delete(mediaId);
      return { success: true };
    } catch (error) {
      console.error("Media deletion failed:", error);
      return { success: false, error: "Failed to delete media." };
    }
  }
}

export const mediaService = new MediaService();
