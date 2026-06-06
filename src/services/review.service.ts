import { reviewRepository } from "@/repositories/review.repository";
import { auditRepository } from "@/repositories/audit.repository";
import { trackEvent } from "@/lib/firebase";
import type { Review, ReviewFormInput, ReviewStatus } from "@/types/review.types";
import type { OperationResult } from "@/types/common.types";

export class ReviewService {
  /**
   * Submit a new review from the public site.
   */
  async submitReview(input: ReviewFormInput): Promise<OperationResult> {
    try {
      const reviewData = {
        artist_id: "default",
        customer_name: input.customer_name,
        rating: input.rating,
        review_text: input.review_text,
        images: [], // Handled separately
        verified: false,
        featured: false,
        status: "pending" as ReviewStatus,
        locale: "en",
      };

      await reviewRepository.create(reviewData, "system");

      trackEvent("review_submit", {
        rating: input.rating,
      }).catch(console.error);

      return { success: true };
    } catch (error) {
      console.error("Review submission failed:", error);
      return { success: false, error: "Failed to submit review." };
    }
  }

  /**
   * Moderate a review (Admin only).
   */
  async moderateReview(
    reviewId: string,
    status: "approved" | "rejected",
    adminId: string,
    adminName: string
  ): Promise<OperationResult> {
    try {
      await reviewRepository.updateStatus(reviewId, status, adminId);

      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "reviews",
        action: status === "approved" ? "publish" : "unpublish",
        entity_id: reviewId,
        entity_name: "Review",
        old_data: {},
        new_data: { status },
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Review moderation failed:", error);
      return { success: false, error: "Failed to moderate review." };
    }
  }

  async updateReview(
    reviewId: string,
    data: Partial<Review>,
    adminId: string,
    adminName: string
  ): Promise<OperationResult> {
    try {
      await reviewRepository.update(reviewId, data, adminId);
      
      await auditRepository.create({
        admin_id: adminId,
        admin_name: adminName,
        module: "reviews",
        action: "update",
        entity_id: reviewId,
        entity_name: "Review",
        old_data: {},
        new_data: data,
        ip_address: "unknown",
      });

      return { success: true };
    } catch (error) {
      console.error("Review update failed:", error);
      return { success: false, error: "Failed to update review." };
    }
  }

  async getReviews(): Promise<Review[]> {
    return reviewRepository.findAllAdmin({
      orderBy: { field: "created_at", direction: "desc" }
    });
  }

  async getReview(id: string): Promise<Review | null> {
    return reviewRepository.findById(id);
  }
}

export const reviewService = new ReviewService();
