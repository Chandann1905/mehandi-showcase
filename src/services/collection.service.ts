import { collectionRepository } from "@/repositories/collection.repository";
import type { Collection } from "@/types/collection.types";

export class CollectionService {
  async getCollections(): Promise<Collection[]> {
    return collectionRepository.findAllSorted();
  }
}

export const collectionService = new CollectionService();
