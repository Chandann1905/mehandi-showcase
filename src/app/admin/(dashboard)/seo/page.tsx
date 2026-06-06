import { Metadata } from "next";
import { SEOForm } from "@/components/forms/SEOForm";
import { seoService } from "@/services/seo.service";

export const metadata: Metadata = {
  title: "SEO Management",
};

export const dynamic = "force-dynamic";

export default async function AdminSEOPage() {
  const defaultSeo = await seoService.getSEOData("home", "default");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">SEO Management</h1>
        <p className="text-muted-foreground">Configure global search engine optimization settings</p>
      </div>

      <div className="mt-8">
        <SEOForm 
          initialData={defaultSeo} 
          entityType="home" 
          entityId="default" 
        />
      </div>
    </div>
  );
}
