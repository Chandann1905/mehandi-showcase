import { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AppImage } from "@/components/shared/AppImage";
import { designService } from "@/services/design.service";
import { categoryService } from "@/services/category.service";
import { Button } from "@/components/ui/button";
import { GallerySearch } from "@/components/shared/GallerySearch";

export const metadata: Metadata = {
  title: "Design Gallery",
  description: "Browse our extensive collection of beautiful bridal, festive, and modern mehndi designs.",
};

export const revalidate = 3600;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}) {
  const { category: categorySlug, sort = "newest", search = "" } = await searchParams;

  // Fetch categories for filtering
  const categories = await categoryService.getCategories();
  
  // Find category ID if slug is provided
  const activeCategory = categories.find(c => c.slug === categorySlug);

  // Fetch designs
  const filters = {
    category_id: activeCategory?.id,
    sortBy: sort as "newest" | "popular",
    search: search || undefined,
  };
  
  const result = await designService.getDesigns(filters, 24);
  const designs = result.items;

  return (
    <PublicLayout>
      <div className="pt-24 pb-12 bg-muted/30">
        <div className="container-page">
          <SectionHeading 
            title="Design Gallery" 
            subtitle={activeCategory ? `Explore our collection of ${activeCategory.name} mehndi designs.` : "Explore our complete collection of beautiful mehndi designs."}
            centered={true}
            className="mb-8"
          />

          {/* Search */}
          <GallerySearch initialValue={search} />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button 
              asChild 
              variant={!categorySlug ? "default" : "outline"}
              className="rounded-full"
            >
              <Link href="/gallery">All Designs</Link>
            </Button>
            {categories.map(category => (
              <Button 
                key={category.id}
                asChild 
                variant={categorySlug === category.slug ? "default" : "outline"}
                className="rounded-full"
              >
                <Link href={`/gallery?category=${category.slug}`}>{category.name}</Link>
              </Button>
            ))}
          </div>

          {/* Gallery Grid - CSS columns approach for basic masonry */}
          {designs.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {designs.map((design) => (
                <Link 
                  key={design.id} 
                  href={`/gallery/${design.slug}`}
                  className="group block break-inside-avoid overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    {/* Since it's a masonry layout without fixed aspect ratio, we'd ideally know the image dimensions.
                        Without them, we'll use a standard object-cover with a fixed minimum height or rely on Next Image behavior.
                        For now, aspect ratio 4/5 is standard for our thumbnails. */}
                    <div className="relative aspect-[4/5] w-full">
                      <AppImage 
                        src={design.thumbnail_url || "https://placehold.co/600x800?text=No+Image"} 
                        alt={design.title}
                        fill
                        className="group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white font-heading font-medium truncate">{design.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <h3 className="text-xl font-heading font-semibold mb-2">No designs found</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </div>
          )}

          {/* Simple pagination / Load more stub */}
          {result.hasMore && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="rounded-full">
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
