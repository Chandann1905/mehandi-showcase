import { Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { reviewService } from "@/services/review.service";
import { reviewRepository } from "@/repositories/review.repository";

interface TestimonialsSectionProps {
  data?: any;
}

export async function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const { title = "What Our Brides Say", subtitle = "Read reviews from our happy clients." } = data || {};
  
  // Directly fetching from repo since we only need a read
  const reviews = await reviewRepository.findFeatured(3);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-page">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-medium transition-shadow duration-300">
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
              
              <div>
                <h4 className="font-heading font-semibold text-foreground text-lg">{review.customer_name}</h4>
                <span className="text-sm text-primary uppercase tracking-wider font-medium mt-1 inline-block">
                  {review.verified ? "Verified Client" : "Client"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
