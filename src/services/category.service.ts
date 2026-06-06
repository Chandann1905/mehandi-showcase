import { categoryRepository } from "@/repositories/category.repository";
import type { Category } from "@/types/category.types";

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    return categoryRepository.findAllSorted();
  }

  async createCategory(data: Partial<Category>): Promise<string> {
    return categoryRepository.create(data as Omit<Category, "id" | "created_at" | "updated_at">, "admin-id");
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<void> {
    return categoryRepository.update(id, data, "admin-id");
  }
}

export const categoryService = new CategoryService();
