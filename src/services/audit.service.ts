import { auditRepository } from "@/repositories/audit.repository";
import type { AuditLog, AuditModule } from "@/types/audit.types";

export class AuditService {
  async getRecentLogs(module?: AuditModule): Promise<AuditLog[]> {
    if (module) {
      return auditRepository.findByModule(module);
    }
    return auditRepository.findRecent();
  }
}

export const auditService = new AuditService();
