import { Metadata } from "next";
import { PublicLayout } from "@/components/layout";
import { homepageService } from "@/services/homepage.service";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedDesignsSection } from "@/components/sections/FeaturedDesignsSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Creative Mehndi Art - Premium Bridal Henna in Your City",
  description: "Book the best bridal mehndi artist. We provide premium, intricate, and deeply meaningful festive mehndi designs.",
};

export const revalidate = 3600; // Revalidate every hour or rely on on-demand ISR

export default async function HomePage() {
  const sections = await homepageService.getEnabledSections();

  return (
    <PublicLayout>
      {/* Fallback if CMS is empty */}
      {sections.length === 0 && (
        <>
          <HeroSection 
            data={{
              title: "Exquisite Mehndi Art for Your Special Day",
              subtitle: "Premium organic henna, intricate designs, and professional service.",
              cta_text: "View Gallery",
              cta_link: "/gallery",
              background_image: "https://images.unsplash.com/photo-1555026410-b97cbb9fcb60?auto=format&fit=crop&q=80&w=2000",
            }} 
          />
          <FeaturedDesignsSection />
          <CategoriesSection />
          <PackagesSection />
          <TestimonialsSection />
          <CTASection />
        </>
      )}

      {/* Dynamic CMS Sections */}
      {sections.map((section) => {
        switch (section.section_type) {
          case "hero":
            return <HeroSection key={section.id} data={section.config as any} />;
          case "featured_designs":
            return <FeaturedDesignsSection key={section.id} data={section.config as any} />;
          case "categories":
            return <CategoriesSection key={section.id} data={section.config as any} />;
          case "packages":
            return <PackagesSection key={section.id} data={section.config as any} />;
          case "reviews":
            return <TestimonialsSection key={section.id} data={section.config as any} />;
          case "cta":
            return <CTASection key={section.id} data={section.config as any} />;
          default:
            return null;
        }
      })}
    </PublicLayout>
  );
}
