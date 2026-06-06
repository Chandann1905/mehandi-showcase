import { Metadata } from "next";
import { PublicLayout } from "@/components/layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { reviewRepository } from "@/repositories/review.repository";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials",
  description: "Read what our beautiful brides and clients have to say about our mehndi services.",
};

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await reviewRepository.findApproved(50);

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 bg-muted/30 min-h-screen">
        <div className="container-page">
          <SectionHeading 
            title="Client Testimonials" 
            subtitle="Don't just take our word for it. Read the experiences of our wonderful clients." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col hover:shadow-medium transition-shadow duration-300">
                <div className="flex space-x-1 mb-6 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < review.rating ? "fill-current" : "opacity-30"}`} 
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic mb-8 flex-1 leading-relaxed">
                  "{review.review_text}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-lg">{review.customer_name}</h4>
                    {review.verified && (
                      <span className="text-xs text-primary uppercase tracking-wider font-medium mt-1 inline-block bg-primary/10 px-2 py-0.5 rounded-sm">
                        Verified Client
                      </span>
                    )}
                  </div>
                  {/* Could add date here if it was serialized safely, e.g., created_at */}
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-20 bg-card rounded-2xl border border-border max-w-2xl mx-auto">
              <h3 className="text-xl font-heading font-semibold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to share your experience with us!</p>
            </div>
          )}

          <div className="mt-16 text-center bg-primary/5 border border-primary/10 p-10 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4 text-foreground">Have we worked together?</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              We would love to hear about your experience. Your feedback helps us grow and helps future brides make their decision.
            </p>
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary-light text-white">
              Write a Review
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
