import {
  fetchCollection,
  createDocument,
  softDeleteDocument,
  where,
  orderBy,
  limit,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { AuditLog, AuditAction, AuditModule } from "@/types/audit.types";

/**
 * Repository for audit logs.
 * Per DB Spec §27: Audit logs are immutable (no updates or deletes).
 */
export class AuditRepository {
  /**
   * Create an audit log entry.
   */
  async create(data: Omit<AuditLog, "id" | "created_at">): Promise<string> {
    const ref = await createDocument(
      COLLECTIONS.AUDIT_LOGS,
      data as DocumentData
    );
    return ref.id;
  }

  /**
   * Find recent audit logs.
   */
  async findRecent(limitCount = 50): Promise<AuditLog[]> {
    const constraints = [
      orderBy("created_at", "desc"),
      limit(limitCount),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.AUDIT_LOGS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as AuditLog
    );
  }

  /**
   * Find audit logs by module.
   */
  async findByModule(
    module: AuditModule,
    limitCount = 50
  ): Promise<AuditLog[]> {
    const constraints = [
      where("module", "==", module),
      orderBy("created_at", "desc"),
      limit(limitCount),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.AUDIT_LOGS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as AuditLog
    );
  }

  /**
   * Find audit logs by action type.
   */
  async findByAction(
    action: AuditAction,
    limitCount = 50
  ): Promise<AuditLog[]> {
    const constraints = [
      where("action", "==", action),
      orderBy("created_at", "desc"),
      limit(limitCount),
    ];

    const snapshot = await fetchCollection(
      COLLECTIONS.AUDIT_LOGS,
      constraints
    );
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as AuditLog
    );
  }
}

export const auditRepository = new AuditRepository();
