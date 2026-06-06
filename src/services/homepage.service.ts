import { homepageRepository } from "@/repositories/homepage.repository";
import type { HomepageSection } from "@/types/homepage.types";

export class HomepageService {
  async getEnabledSections(): Promise<HomepageSection[]> {
    return homepageRepository.findEnabled();
  }

  async getAllSections(): Promise<HomepageSection[]> {
    return homepageRepository.findAll();
  }

  async createSection(data: Omit<HomepageSection, "id">, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      const id = await homepageRepository.create({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      // audit
      return { success: true, id };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async updateSection(id: string, data: Partial<HomepageSection>, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      await homepageRepository.update(id, {
        ...data,
        updated_at: new Date().toISOString(),
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async deleteSection(id: string, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      await homepageRepository.delete(id);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
}

export const homepageService = new HomepageService();
