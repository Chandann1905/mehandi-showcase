import { homepageRepository } from "@/repositories/homepage.repository";
import type { HomepageSection } from "@/types/homepage.types";

export class HomepageService {
  async getEnabledSections(): Promise<HomepageSection[]> {
    return homepageRepository.findEnabled();
  }
}

export const homepageService = new HomepageService();
