import { menuRepository } from "@/repositories/menu.repository";
import type { MenuItem } from "@/types/menu.types";

export class MenuService {
  async getVisibleMenus(): Promise<MenuItem[]> {
    return menuRepository.findVisible();
  }
}

export const menuService = new MenuService();
