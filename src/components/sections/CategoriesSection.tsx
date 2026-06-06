import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AppImage } from "@/components/shared/AppImage";
import { categoryService } from "@/services/category.service";

interface CategoriesSectionProps {
  data?: any;
}

export async function CategoriesSection({ data }: CategoriesSectionProps) {
  const { title = "Shop by Category", subtitle = "Find the perfect style for your occasion." } = data || {};
  
  const categories = await categoryService.getCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-page">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 4).map((category) => (
            <Link 
              key={category.id} 
              href={`/gallery?category=${category.slug}`}
              className="group relative rounded-full overflow-hidden aspect-square border-4 border-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <AppImage 
                src={category.image_url || "https://placehold.co/400x400?text=Category"} 
                alt={category.name}
                fill
                className="group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center p-4 text-center">
                <h3 className="text-white text-lg md:text-xl font-heading font-semibold text-shadow-sm group-hover:scale-105 transition-transform">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
