import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AppImage } from "@/components/shared/AppImage";
import { Button } from "@/components/ui/button";
import { designService } from "@/services/design.service";

interface FeaturedDesignsSectionProps {
  data?: any;
}

export async function FeaturedDesignsSection({ data }: FeaturedDesignsSectionProps) {
  const { title = "Featured Designs", subtitle = "Explore our most loved and trending mehndi patterns." } = data || {};
  
  // Fetch featured designs directly from service (Server Component)
  const result = await designService.getDesigns({ featured: true }, 6);
  const designs = result.items;

  if (!designs || designs.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-page">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {designs.map((design) => (
            <Link 
              key={design.id} 
              href={`/gallery/${design.slug}`}
              className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <AppImage 
                  src={design.thumbnail_url || "https://placehold.co/600x800?text=No+Image"} 
                  alt={design.title}
                  fill
                  className="group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-heading font-semibold mb-1">{design.title}</h3>
                  <div className="flex items-center text-secondary text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/gallery">View All Designs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
