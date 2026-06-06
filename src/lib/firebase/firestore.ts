import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  writeBatch,
  type Firestore,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
  type Query,
  type QueryConstraint,
  type DocumentSnapshot,
  type QuerySnapshot,
  type WhereFilterOp,
  type OrderByDirection,
  type WriteBatch,
} from "firebase/firestore";
import { firebaseApp } from "./config";

/**
 * Firestore instance (singleton).
 */
export const db: Firestore = getFirestore(firebaseApp);

/**
 * Get a collection reference.
 */
export function getCollection(
  collectionName: string
): CollectionReference<DocumentData> {
  return collection(db, collectionName);
}

/**
 * Get a document reference.
 */
export function getDocRef(
  collectionName: string,
  docId: string
): DocumentReference<DocumentData> {
  return doc(db, collectionName, docId);
}

/**
 * Fetch a single document by ID.
 */
export async function fetchDocument(
  collectionName: string,
  docId: string
): Promise<DocumentSnapshot<DocumentData>> {
  const ref = getDocRef(collectionName, docId);
  return getDoc(ref);
}

/**
 * Fetch all documents from a collection with optional constraints.
 */
export async function fetchCollection(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<QuerySnapshot<DocumentData>> {
  const ref = getCollection(collectionName);
  const q = query(ref, ...constraints);
  return getDocs(q);
}

/**
 * Create a new document (auto-generated ID).
 */
export async function createDocument(
  collectionName: string,
  data: DocumentData
): Promise<DocumentReference<DocumentData>> {
  const ref = getCollection(collectionName);
  return addDoc(ref, {
    ...data,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    deleted: false,
  });
}

/**
 * Update an existing document.
 */
export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> {
  const ref = getDocRef(collectionName, docId);
  await updateDoc(ref, {
    ...data,
    updated_at: serverTimestamp(),
  });
}

/**
 * Soft delete a document (sets deleted: true, per DB Spec §30).
 */
export async function softDeleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const ref = getDocRef(collectionName, docId);
  await updateDoc(ref, {
    deleted: true,
    active: false,
    updated_at: serverTimestamp(),
  });
}

/**
 * Hard delete a document (use sparingly — soft delete preferred).
 */
export async function hardDeleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const ref = getDocRef(collectionName, docId);
  await deleteDoc(ref);
}

/**
 * Create a write batch for atomic operations.
 * Per user rule §17: Always use transactions for critical database operations.
 */
export function createBatch(): WriteBatch {
  return writeBatch(db);
}

/**
 * Re-export Firestore query helpers for use in repositories.
 */
export {
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
  type Query,
  type QueryConstraint,
  type DocumentSnapshot,
  type QuerySnapshot,
  type WhereFilterOp,
  type OrderByDirection,
};
