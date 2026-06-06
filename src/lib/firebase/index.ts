/**
 * Firebase SDK barrel export.
 * All Firebase access MUST go through this module — never import
 * directly from "firebase/*" outside of src/lib/firebase/.
 */

export { firebaseApp } from "./config";

export {
  auth,
  signInWithEmail,
  signOut,
  onAuthChange,
  getCurrentUser,
  getIdToken,
} from "./auth";

export {
  db,
  getCollection,
  getDocRef,
  fetchDocument,
  fetchCollection,
  createDocument,
  updateDocument,
  softDeleteDocument,
  hardDeleteDocument,
  createBatch,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "./firestore";

export {
  storage,
  getStorageRef,
  buildPath,
  validateFile,
  uploadFile,
  deleteFile,
  getFileUrl,
  listFiles,
  generateFileName,
  UPLOAD_LIMITS,
  ALLOWED_IMAGE_TYPES,
} from "./storage";

export {
  trackEvent,
  setUserProps,
  trackPageView,
} from "./analytics";
