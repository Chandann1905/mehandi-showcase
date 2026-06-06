import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Heart, Share2, Eye } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { AppImage } from "@/components/shared/AppImage";
import { Button, buttonVariants } from "@/components/ui/button";
import { designService } from "@/services/design.service";

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const design = await designService.getDesignDetail(resolvedParams.slug);
  
  if (!design) return { title: "Design Not Found" };
  
  return {
    title: design.title,
    description: design.description,
    openGraph: {
      images: design.thumbnail_url ? [design.thumbnail_url] : [],
    },
  };
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const design = await designService.getDesignDetail(resolvedParams.slug);

  if (!design) {
    notFound();
  }

  // Use main image + additional images
  const allImages = [
    { id: "main", image_url: design.thumbnail_url },
    ...design.images
  ].filter((img): img is { id: string; image_url: string; alt_text?: string } => !!img.image_url);

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 bg-background">
        <div className="container-page">
          <Link href="/gallery" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted border border-border">
                <AppImage 
                  src={allImages[0]?.image_url || "https://placehold.co/800x1000?text=No+Image"} 
                  alt={design.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {allImages.slice(1, 5).map((img, idx) => (
                    <div key={img.id || idx} className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border cursor-pointer hover:ring-2 ring-primary transition-all">
                      <AppImage 
                        src={img.image_url} 
                        alt={`${design.title} detail`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Design Info */}
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wider text-primary">
                  {design.category_name || "Mehndi Design"}
                </span>
                <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                  <div className="flex items-center">
                    <Eye className="mr-1.5 h-4 w-4" />
                    {design.view_count || 0}
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1.5 h-4 w-4" />
                    {design.favorite_count || 0}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-foreground">
                {design.title}
              </h1>
              
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 text-muted-foreground leading-relaxed">
                <p>{design.description}</p>
              </div>

              {/* Tags */}
              {design.tags && design.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {design.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                <Link href={`/book?design=${design.id}`} className={buttonVariants({ size: "lg", className: "flex-1 rounded-full text-md bg-primary hover:bg-primary-light" })}>
                  Book This Design
                </Link>
                
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full h-11 w-11 shrink-0" aria-label="Add to favorites">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-11 w-11 shrink-0" aria-label="Share design">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
