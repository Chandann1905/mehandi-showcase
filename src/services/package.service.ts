import { packageRepository } from "@/repositories/package.repository";
import type { Package } from "@/types/package.types";

export class PackageService {
  async getPackages(): Promise<Package[]> {
    return packageRepository.findAllSorted();
  }

  async createPackage(data: any): Promise<string> {
    return packageRepository.create(data as Omit<Package, "id" | "created_at" | "updated_at">, "admin-id");
  }

  async updatePackage(id: string, data: Partial<Package>): Promise<void> {
    return packageRepository.update(id, data, "admin-id");
  }
}

export const packageService = new PackageService();
