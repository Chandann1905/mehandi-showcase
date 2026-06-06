import { menuRepository } from "@/repositories/menu.repository";
import type { MenuItem } from "@/types/menu.types";

export class MenuService {
  async getVisibleMenus(): Promise<MenuItem[]> {
    return menuRepository.findVisible();
  }

  async getAllMenus(): Promise<MenuItem[]> {
    return menuRepository.findAll();
  }

  async createMenu(data: Omit<MenuItem, "id">, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      const id = await menuRepository.create({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { success: true, id };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async updateMenu(id: string, data: Partial<MenuItem>, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      await menuRepository.update(id, {
        ...data,
        updated_at: new Date().toISOString(),
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async deleteMenu(id: string, adminId: string): Promise<import("@/types/common.types").OperationResult> {
    try {
      await menuRepository.delete(id);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
}

export const menuService = new MenuService();
