import { BaseRepository } from "./base.repository";
import { COLLECTIONS } from "@/constants/firebase-collections";
import type { Review, ReviewStatus } from "@/types/review.types";

/**
 * Repository for customer reviews.
 */
export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super(COLLECTIONS.REVIEWS);
  }

  /**
   * Find approved reviews for public display.
   */
  async findApproved(limitCount?: number): Promise<Review[]> {
    return this.findAll({
      filters: [{ field: "status", operator: "==", value: "approved" }],
      orderBy: { field: "created_at", direction: "desc" },
      limit: limitCount,
    });
  }

  /**
   * Find featured reviews (pinned first).
   */
  async findFeatured(limitCount = 6): Promise<Review[]> {
    return this.findAll({
      filters: [
        { field: "status", operator: "==", value: "approved" },
        { field: "featured", operator: "==", value: true },
      ],
      orderBy: { field: "created_at", direction: "desc" },
      limit: limitCount,
    });
  }

  /**
   * Find pending reviews for moderation.
   */
  async findPending(): Promise<Review[]> {
    return this.findAllAdmin({
      filters: [{ field: "status", operator: "==", value: "pending" }],
      orderBy: { field: "created_at", direction: "desc" },
    });
  }

  /**
   * Update review status (approve/reject).
   */
  async updateStatus(
    reviewId: string,
    status: ReviewStatus,
    userId: string
  ): Promise<void> {
    await this.update(
      reviewId,
      { status } as Partial<Omit<Review, keyof import("@/types/common.types").BaseDocument>>,
      userId
    );
  }

  /**
   * Toggle featured status.
   */
  async toggleFeatured(
    reviewId: string,
    featured: boolean,
    userId: string
  ): Promise<void> {
    await this.update(
      reviewId,
      { featured } as Partial<Omit<Review, keyof import("@/types/common.types").BaseDocument>>,
      userId
    );
  }
}

export const reviewRepository = new ReviewRepository();
