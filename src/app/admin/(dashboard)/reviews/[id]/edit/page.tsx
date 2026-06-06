import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { reviewService } from "@/services/review.service";

export const metadata: Metadata = {
  title: "Moderate Review",
};

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await reviewService.getReview(id);

  if (!review) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/reviews" 
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Moderate Review</h1>
          <p className="text-muted-foreground">Approve, reject, or feature this customer review</p>
        </div>
      </div>

      <div className="mt-8">
        <ReviewForm initialData={review} />
      </div>
    </div>
  );
}
