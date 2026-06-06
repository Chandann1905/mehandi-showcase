import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  type FirebaseStorage,
  type StorageReference,
  type UploadTask,
  type UploadMetadata,
} from "firebase/storage";
import { firebaseApp } from "./config";
import {
  UPLOAD_LIMITS,
  ALLOWED_IMAGE_TYPES,
  type StoragePath,
} from "@/constants/storage-paths";

/**
 * Firebase Storage instance (singleton).
 */
export const storage: FirebaseStorage = getStorage(firebaseApp);

/**
 * Get a storage reference for a given path.
 */
export function getStorageRef(path: string): StorageReference {
  return ref(storage, path);
}

/**
 * Build a full storage path.
 * @example buildPath("designs", "image-123.webp") → "designs/image-123.webp"
 */
export function buildPath(folder: StoragePath, fileName: string): string {
  return `${folder}/${fileName}`;
}

/**
 * Validate a file before upload.
 * Per user rule §27: Always validate uploaded files for type, size, and safety.
 */
export function validateFile(
  file: File,
  options: {
    maxSize: number;
    allowedTypes: readonly string[];
  }
): { valid: boolean; error?: string } {
  if (!options.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed. Accepted: ${options.allowedTypes.join(", ")}`,
    };
  }

  if (file.size > options.maxSize) {
    const maxMB = Math.round(options.maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `File size exceeds ${maxMB}MB limit.`,
    };
  }

  return { valid: true };
}

/**
 * Upload a file to Firebase Storage with progress tracking.
 * Returns the download URL on success.
 */
export function uploadFile(
  path: string,
  file: File,
  metadata?: UploadMetadata,
  onProgress?: (progress: number) => void
): { task: UploadTask; getUrl: () => Promise<string> } {
  const storageRef = getStorageRef(path);

  const uploadMetadata: UploadMetadata = {
    contentType: file.type,
    ...metadata,
  };

  const task = uploadBytesResumable(storageRef, file, uploadMetadata);

  if (onProgress) {
    task.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(Math.round(progress));
    });
  }

  const getUrl = async (): Promise<string> => {
    await task;
    return getDownloadURL(storageRef);
  };

  return { task, getUrl };
}

/**
 * Delete a file from Firebase Storage.
 */
export async function deleteFile(path: string): Promise<void> {
  const storageRef = getStorageRef(path);
  await deleteObject(storageRef);
}

/**
 * Get the download URL for a file.
 */
export async function getFileUrl(path: string): Promise<string> {
  const storageRef = getStorageRef(path);
  return getDownloadURL(storageRef);
}

/**
 * List all files in a storage folder.
 */
export async function listFiles(
  folderPath: string
): Promise<StorageReference[]> {
  const folderRef = getStorageRef(folderPath);
  const result = await listAll(folderRef);
  return result.items;
}

/**
 * Generate a unique filename with timestamp to prevent collisions.
 */
export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop() ?? "jpg";
  const baseName = originalName
    .split(".")
    .slice(0, -1)
    .join(".")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .substring(0, 50);

  return `${baseName}-${timestamp}-${randomSuffix}.${extension}`;
}

export {
  UPLOAD_LIMITS,
  ALLOWED_IMAGE_TYPES,
};
